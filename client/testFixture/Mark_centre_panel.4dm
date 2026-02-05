//---------------------------------------------------------------------
// Programmer           Van Hanh Cao
// Date                 19/07/97
// 4D Model             V4.0
// Version              1.0
// Macro Name           Mark_centre_panel
// Type                 SOURCE
// Origin               Yan Lin
//
// Brief description
// Macro to create centre points for an alignment string on the HIP's
//---------------------------------------------------------------------
// Description
// Macro to create centre points for the ares on the HIP's for an alignment
// string. The centre point has the same name as the selected alignment
// string. The point is created as one point string.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

#include "set_ups.H"

Integer mark_centre(Element string,Real text_size,Integer colour,Model &model)
{

  Text string_type;
  Get_type(string,string_type);
  if(string_type != "Alignment") return(1);
  
  Text string_name;
  Get_name(string,string_name);
  
// get number of ip points

  Integer no_hips;
  Get_hip_points(string,no_hips);
  if(no_hips <= 1) return(1);
  
  Dynamic_Element centre_points;
  
  for(Integer i=2;i<=no_hips-1;i++) {
  
    Text hip_type;
    Get_hip_type(string,i,hip_type);
    if(hip_type != "IP") {
    
      Integer mode = 3;
      Real    x,y;
      Get_hip_geom(string,i,mode,x,y);
      
      Text centre_x,centre_y;
      centre_x = "X " + To_text(x,3);
      centre_y = "Y " + To_text(y,3);
      
      Element text_x,text_y,point;
      text_x = Create_text(centre_x, x+0.5*text_size, y,               text_size, colour,0,1,1);
      text_y = Create_text(centre_y, x+0.5*text_size, y-text_size*1.5, text_size, colour,0,1,1);
      
      Integer n = 1;
      point = Create_2d(n);
      Set_2d_data(point,n,x,y);
      Set_name(point,string_name);
      Calc_extent(point);
      Append(text_x,centre_points);
      Append(text_y,centre_points);
      Append(point,centre_points);
      
    }
  }
  Set_model(centre_points,model);
  return(0);

}

void manage_a_panel()
{

  Panel          panel      = Create_panel         ("Mark centre of alignment string");
  Vertical_Group vgroup     = Create_vertical_group(0);
  Message_Box    message    = Create_message_box   (" ");
  Model_Box      model_box  = Create_model_box     ("Model for text",message,CHECK_MODEL_CREATE);
  Real_Box       real_box   = Create_real_box      ("Text size"     ,message);
  Colour_Box     colour_box = Create_colour_box    ("Text colour"   ,message);
  
  Append(model_box ,vgroup);
  Append(real_box  ,vgroup);
  Append(colour_box,vgroup);
  Append(message   ,vgroup);

// The button area

  Horizontal_Group bgroup = Create_button_group();
	
  Select_Button pick   = Create_select_button("&Pick a string",SELECT_STRING,message);
  Button        finish = Create_button       ("&Finish","finish");
	
  Append(pick  ,bgroup);
  Append(finish,bgroup);
	
  Append(vgroup,panel);
  Append(bgroup,panel);		

  Show_widget(panel);
    
  Integer doit = 1;
	
  while(doit) {
	
    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg);  // this processes standard messages first ?

    if(cmd == "keystroke") continue;
    
    switch(id) {

      case Get_id(panel) : {

        if(cmd == "Panel Quit") doit = 0;
      } break;

      case Get_id(finish) : {

        if(cmd == "finish") doit = 0;
      } break;
      	
      case Get_id(pick) : {

// validation

        Integer ierr;
        Model model;
        ierr = Validate(model_box,GET_MODEL_CREATE,model);
        if(ierr != MODEL_EXISTS) break;
        
        Real text_size;
        ierr = Validate(real_box,text_size);
        if(ierr != OK) break;
        
        Integer colour;
        ierr = Validate(colour_box,colour);
        if(ierr != OK) break;
                 
        if(cmd == "accept select") {
          
          Element string;
          if(Validate(pick,string) != OK) break;   
          
          Select_start(pick);

          if(mark_centre(string,text_size,colour,model) == 1)
            Set_data(message, "invalid string or no \"Spiral\", \"Circle\" ");
          else
            Set_data(message,"centre point(s) created");
 	
        }
      } break;
    }
  }

}
void main()
{
  manage_a_panel();
}



