//---------------------------------------------------------------------
// Programmer           Van Hanh Cao
// Date                 16/07/99
// 4D Model             V4.0
// Version              1.0
// Macro Name           Textto3d_panel_01
// Type                 SOURCE
// Origin               Yan Lin (Textto3dstrings_01)
//
// Brief description
// Use the x,y,z of a text string and create a new 3d point string at
// the same point.
//---------------------------------------------------------------------
// Description
// User is asked to select view, model or a text string that contains
// the text strings. The macro will create a 3d point string at those text
// positions, and then put this string in a user selected model.If there
// is no user specified model, the default model "0", will be created
// and used.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1999 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

#include "set_ups.H"

#define MAX_NO_POINTS 1000

Integer get_text_points(Model model,Dynamic_Element &strings)
{

  Dynamic_Element elts;
  Integer         no_elts;
  
  Get_elements(model,elts,no_elts);
  
  for(Integer i=1;i<=no_elts;i++) {
  
    Element string;
    Get_item(elts,i,string);
    
    Text string_type;
    Get_type(string,string_type);
  
    if(string_type == "Text")  Append(string,strings);
    
  }
  return(0);
}
Integer get_text_points(View view,Dynamic_Element &strings)
{
  Dynamic_Text models;
  Integer      no_models;
  
  View_get_models(view,models);
  Get_number_of_items(models,no_models);
  
  for(Integer i=1;i<=no_models;i++) {
  
    Text model_name;
    Get_item(models,i,model_name);
    
    Model model;
    Get_model(model_name);
    if(!Model_exists(model)) continue;
    
    get_text_points(model,strings);
    
  }
  
  return(0);
}
Integer make_string(Model &tmodel,Dynamic_Element &strings,Real dx,
                    Real dy,Real maxz,Real minz)
//---------------------------------------------------------------------
// Create a 4d string with point numbers for each point in the strings
// from setout_model.
// Begin the point numbers at start_no and leave start_no as the next
// point number.
//---------------------------------------------------------------------
{
  Integer no_strings;
  Get_number_of_items(strings,no_strings);

  if(no_strings == 0) return(-1);

  Integer count = 1;
  Real	  x[MAX_NO_POINTS],y[MAX_NO_POINTS],z[MAX_NO_POINTS];
  
  for (Integer i=1;i<=no_strings;i++) {

    Text    string_type;
    Element string;
    
    Get_item(strings,i,string);    
    Get_type(string,string_type);

    if(string_type == "Text") {

      Text t_z;
      Get_text_value(string, t_z);
      
      Dynamic_Text dtext;
      From_text(t_z,dtext);
      
      Integer no_text;
      Get_number_of_items(dtext,no_text);
      if(no_text != 1) continue;

      Real temp;
      if (From_text(t_z,temp) == 0) {
      
        z[count] = temp;

        if(z[count]<maxz && z[count]>minz) {
      
          Get_text_xy(string,x[count],y[count]);
          x[count] += dx;
          y[count] += dy;
          count++;
        }
      }
    }
  }
  count--;
  
  Element new_string;
  new_string = Create_3d(x,y,z,count);
  
  Set_model(new_string, tmodel);
  Set_breakline(new_string, 0);
  Calc_extent(tmodel);
  return(0);
}
void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Panel          panel   = Create_panel("Convert text strings to 3d string");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Integer no_choices = 2;
  Text    choices[5];

  choices[1] = "Model";
  choices[2] = "View";

  Choice_Box pages_box = Create_choice_box("Data source",message);

  Set_data(pages_box,no_choices,choices);
  Set_data(pages_box,choices[1]);

  Append(pages_box,vgroup);

// create 3 vertical groups for each page of widgets

  Vertical_Group    g1  = Create_vertical_group(-1);  Set_border(g1,0,0);  //  Set_border(g1,"Page 1");
  Vertical_Group    g2 	= Create_vertical_group(-1);  Set_border(g2,0,0);  //  Set_border(g2,"Page 2");

// add these groups to the pages widget

  Widget_Pages pages = Create_widget_pages();

  Append(g1,pages);
  Append(g2,pages);

// page 1

  Model_Box model_box = Create_model_box("Model containing text",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g1);

// page 2

  View_Box view_box = Create_view_box("View name",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g2);

  Model_Box model_box2 = Create_model_box("Model for 3d points"   ,message,CHECK_MODEL_CREATE);
  Real_Box  dx_box     = Create_real_box("Horizontal offset (dx)" ,message);
  Real_Box  dy_box     = Create_real_box("Vertical offset (dy)"   ,message);
  Real_Box  maxz_box   = Create_real_box("Max z value"            ,message);
  Real_Box  minz_box   = Create_real_box("Min z value"            ,message);

  Set_optional(maxz_box,1);
  Set_optional(minz_box,1);

// default data
  
  Set_data(dx_box    ,0.0);
  Set_data(dy_box    ,0.0);

  Append(pages_box ,vgroup);
  Append(pages     ,vgroup);
  Append(model_box2,vgroup);
  Append(dx_box    ,vgroup);
  Append(dy_box    ,vgroup);
  Append(maxz_box  ,vgroup);
  Append(minz_box  ,vgroup);
  Append(message   ,vgroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Button process = Create_button("&Process" ,"count");
  Button finish  = Create_button("&Finish"  ,"finish");

  Append(process ,bgroup);
  Append(finish  ,bgroup);

  Append(vgroup  ,panel);
  Append(bgroup  ,panel);
  
// set page 1 active

  Integer page = 1;
  Set_page(pages,page);

  Show_widget(panel);

  Integer doit = 1;

  while(doit) {

    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg);  // this processes standard messages first ?

    if(cmd == "keystroke") continue;
    
    Dynamic_Element strings;

    switch(id) {

      case Get_id(panel) : {

        if(cmd == "Panel Quit") doit = 0;

      } break;

      case Get_id(finish) : {

        if(cmd == "finish") doit = 0;

      } break;

      case Get_id(pages_box) : {

        Text page_text;

        Integer ierr = Validate(pages_box,page_text);
        if(ierr != TRUE) {
          Set_data(message,"bad page");
          break;
        }
        if(page_text == choices[1]) {
        	page = 1;
        } else if(page_text == choices[2]) {
          page = 2;
        } else {
          page = 0;
        }
        Set_page(pages,page);

      } break;
      
      case Get_id(process) : {

        Integer ierr;
 
// validate model box

        Model tmodel;
        ierr = Validate(model_box2,GET_MODEL_CREATE,tmodel);
        if(ierr != MODEL_EXISTS) break;
        
        Real dx,dy;
        ierr = Validate(dx_box,dx);
        if(ierr != TRUE) break;
        ierr = Validate(dy_box,dy);
        if(ierr != TRUE) break;
        
        Real maxz =  9999.9,
             minz = -9999.9;
        
        Text temp_max,temp_min;
        
        Get_data(maxz_box,temp_max);
        if(temp_max != "") {
          
          Real temp;
          ierr = Validate(maxz_box,temp);
          if(ierr != TRUE) break;
          
          maxz = temp;
        }
        
        Get_data(minz_box,temp_min);
        if(temp_min != "") {
        
          Real temp;
          ierr = Validate(minz_box,temp);
          if(ierr != TRUE) break;
          
          minz = temp;
        }
        
        if(minz >= maxz) {
        
          Set_data(message,"max z must be greater than min z");
          break;
        }
        
        if(page == 1) {

            Model   model;

            ierr = Validate(model_box,GET_MODEL_ERROR,model);
            if(ierr != MODEL_EXISTS) break;
            get_text_points(model,strings);

          } else if(page == 2) {

            View    view;

            ierr = Validate(view_box,GET_VIEW_ERROR,view);
            if(ierr != VIEW_EXISTS) break;
            get_text_points(view,strings);

          } else {

          Set_data(message,"bad choice");
          break;
        }
        make_string(tmodel,strings,dx,dy,maxz,minz);
        Text tmodel_name;
        Get_name(tmodel,tmodel_name);
        Set_data(message,"model " + tmodel_name + " created");
        Null(strings);

      } break;
    }
  }
}
void main()
//---------------------------------------------------------
//
//---------------------------------------------------------
{
  manage_a_panel();
}
