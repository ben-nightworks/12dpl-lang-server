// --------------------------------------------------------
// Programmer           Alan Gray
// Date                 05/08/97
// 4D Model             V3.2
// Version              1.0
// Macro Name           Length_3d_01
// Type                 SOURCE
//
// Brief description
// Macro to calculate a 3d length of a string
//---------------------------------------------------------------------
// Description
// Macro to calculate a 3d length of a string
//---------------------------------------------------------------------
// Update/Modification
//
//		Programmer			Van Hanh Cao
//		Date						08/07/99
//		4D Model				V4.0
//		New Name				Length_3d_panel
// 
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

#include "set_ups.H"


Integer get_3d_length(Element string, Text& result)
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{
  Text type;
  Get_type(string,type);

  Real length;

  if(type == "2d" || type == "3d" || type == "4d" || type == "Polyline" || type == "Super") {

// just get the length

    Get_length_3d(string,length);

  } else if(type == "Alignment" || type == "Pipeline" || type == "Circle" || type == "Text" || type == "Pipe") {

// convert to a 3d string first

    Element converted;
    if(Convert(string,"3d",converted) != 0) {

      result = "cannot convert string to a 3d string";
      return(-1);
    }
    Get_length_3d(converted,length);

    Element_delete(converted);

  } else {

    result = "cannot get the length of the string";
    return(-1);
  }
  result = "Length in 3d is " + To_text(length,3);

  return(0);
}

void manage_a_panel()
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{

  Panel          panel   = Create_panel("Length in 3D");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    output  = Create_message_box("No string selected");
  Message_Box    message = Create_message_box(" ");

  Append(output	,vgroup);
  Append(message,vgroup);

// The button area

  Horizontal_Group buttonGroup = Create_button_group();
  Set_border(buttonGroup, "Processing");
	
  Select_Button pick   = Create_select_button("&Pick",SELECT_STRING,message);
  Button        finish = Create_button       ("&Finish","finish");
	
  Append(pick  ,buttonGroup);
  Append(finish,buttonGroup);
	
  Append(buttonGroup,vgroup);
  Append(vgroup     ,panel);		

  Set_data(message,"Please select a string");
    
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
      	
        if(cmd == "accept select") {
        
          Element string;
          if(Validate(pick,string) != OK) break;
         
          Select_start(pick);
          	
          Text result;
          if(get_3d_length(string,result) == 1) continue;
      			
          Set_data(output,result);
        }
      } break;
    }
  }
}
void main()
//-----------------------------------------------------------------------
//
//-----------------------------------------------------------------------
{
  manage_a_panel();
}


