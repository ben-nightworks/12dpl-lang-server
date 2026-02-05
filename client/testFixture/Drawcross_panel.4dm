//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 15/3/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Drawcross_01
// Type                 1
//
// Brief description
// Macro to create cross for specified strings. 
//---------------------------------------------------------------------
// Description
// Macro provide a pop up panel to ask user to select view, model or
// string, the crosses will be drawn for the string or the strings in 
// the selected view or model. User can also specify cross size, colour
// for these crosses.
//---------------------------------------------------------------------
// Update/Modification
//
//   Programmer         Van Hanh Cao
//   Date              09/07/99
//   4D Model          V4.0
//   New Name          Drawcross_panel_01
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------


#include "set_ups.H"


Integer drawX(Real x, Real y, Real size, Text name, Integer colour, Dynamic_Element &crosses)
//---------------------------------------------------------------------
//---------------------------------------------------------------------
{
  Element 2d_string1 = Create_2d(2);
  Element 2d_string2 = Create_2d(2);
  
  Set_2d_data(2d_string1,0);
  Set_2d_data(2d_string2,0);
  Set_2d_data(2d_string1,1,x+size/2,y+size/2);
  Set_2d_data(2d_string1,2,x-size/2,y-size/2);

  Set_2d_data(2d_string2,1,x+size/2,y-size/2);
  Set_2d_data(2d_string2,2,x-size/2,y+size/2);
  
  Calc_extent(2d_string1);
  Calc_extent(2d_string2);
  
  Set_name(2d_string1,name);
  Set_name(2d_string2,name);
  
  Set_colour(2d_string1,colour);
  Set_colour(2d_string2,colour);

  Append(2d_string1, crosses);
  Append(2d_string2, crosses);
  
  return 0;
}
Integer draw_crosses(Element string,Real size, Integer colour,Dynamic_Element &crosses)
//---------------------------------------------------------------------
// Create a cross for each point in the strings
// from specified model.
//---------------------------------------------------------------------
{
  Integer ignored = 0;

  Text string_type;
  Get_type(string,string_type);

  Text name;
  Get_name(string,name);

  switch(string_type) {

    case "2d" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real x,y;
        Get_2d_data(string,j,x,y);

        drawX(x,y,size,name,colour,crosses);      
      } 
    } break;

    case "3d" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real x,y,z;
        Get_3d_data(string,j,x,y,z);

        drawX(x,y,size,name,colour,crosses); 
      }
    } break;

    case "4d" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real x,y,z;
        Text t;

        Get_4d_data(string,j,x,y,z,t);

        drawX(x,y,size,name,colour,crosses);
      }
    } break;

    case "Inteface" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real    x,y,z;
        Integer f;

        Get_interface_data(string,j,x,y,z,f);

        drawX(x,y,size,name,colour,crosses);
      }
    } break;

    case "Pipe" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real x,y,z;

        Get_pipe_data(string,j,x,y,z);

        drawX(x,y,size,name,colour,crosses);
      }
    } break;

    case "Arc" : {

      Real x,y,z;
      Get_arc_start(string,x,y,z);  drawX(x,y,size,name,colour,crosses); 
      Get_arc_end  (string,x,y,z);  drawX(x,y,size,name,colour,crosses);

    } break;

    case "Polyline" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real    x,y,z,r;
        Integer f;

        Get_polyline_data(string,j,x,y,z,r,f);

        drawX(x,y,size,name,colour,crosses); 
      }
     } break;

    case "Super" : {

      Integer no_points;
      Get_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Real    x,y,z,r;
        Integer f;

        Get_super_data(string,j,x,y,z,r,f);

        drawX(x,y,size,name,colour,crosses); 
      }
     } break;

    case "Alignment" :
    case "Pipeline"  : {

      Integer no_points;
      Get_hip_points(string,no_points);

      for(Integer j=1;j<=no_points;j++) {

        Text type_ip;
        Get_hip_type(string,j,type_ip);

        Integer mode;
        Real    x,y;

        if(type_ip == "IP") {

          mode = 0;
          Get_hip_geom(string,j,mode,x,y);

          drawX(x,y,size,name,colour,crosses); 

        } else {

           mode = 1;  Get_hip_geom(string,j,mode,x,y);  drawX(x,y,size,name,colour,crosses); 
           mode = 2;  Get_hip_geom(string,j,mode,x,y);  drawX(x,y,size,name,colour,crosses);
        }
      }
    } break;

    case "Tin"        :
    case "Text"       :
    case "Plot_Frame" :
    case "Circle"     :
    case "Feature"    :
    case "Drainage"   :
    case "Sewer"      : {

// in this case - do nothing !

      ignored++;

    } break;

    default : {

      ignored++;
        
    } break;
  }
  return(ignored);
}
Integer draw_crosses(Model model,Real size,Integer colour,Dynamic_Element &crosses)
//---------------------------------------------------------------------
// This function return the total length of all strings in a model
//---------------------------------------------------------------------
{
  Integer         no_model_items;
  Dynamic_Element model_items;

  Get_elements(model,model_items,no_model_items);
  
// process all elements in model

  Integer ignored = 0;

  for(Integer i=1;i<=no_model_items;i++) {

    Element elt;
    Get_item(model_items,i,elt);

    ignored += draw_crosses(elt,size,colour,crosses);
  }
  return(ignored);
}
Integer draw_crosses(View view,Real size,Integer colour,Dynamic_Element &crosses)
//---------------------------------------------------------------------
// This function return the total length of all strings in a view
//---------------------------------------------------------------------
{
  Integer       no_view_items;
  Dynamic_Text  view_items;

  View_get_models     (view       ,view_items);
  Get_number_of_items (view_items ,no_view_items);

// process all models on view

  Integer ignored = 0;

  for(Integer i=1;i<=no_view_items;i++) {
    
    Integer ierr;

    Text model_name;
    Get_item(view_items,i,model_name);

    Model model = Get_model(model_name);

    if(!Model_exists(model)) continue;

    ignored += draw_crosses(model,size,colour,crosses);
  }    
  return(ignored);
}

Integer delete_element(Dynamic_Element &de_cross)
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Integer no;
  Get_number_of_items(de_cross, no);

  for(Integer i=no;i>=1;i--) {

     Element elt;
     Get_item(de_cross, i, elt);

     Element_delete(elt);
  }
  Null(de_cross);
  return 0;
}

void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{

// have a dynamic element for undo

  Dynamic_Element undo_crosses;

// create the panel

  Panel          panel   = Create_panel("Draw Crosses for String(s)");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Set_border(vgroup,"Create");

  Integer no_choices = 3;
  Text    choices[5];

  choices[1] = "String";
  choices[2] = "Model";
  choices[3] = "View";

  Choice_Box pages_box = Create_choice_box("Data source",message);

  Set_data(pages_box,no_choices,choices);
  Set_data(pages_box,choices[2]);

  Append(pages_box,vgroup);

// create 3 vertical groups for each page of widgets

  Horizontal_Group g1 = Create_button_group();     Set_border(g1,0,0);  //  Set_border(g1,"Page 1");
  Vertical_Group   g2 = Create_vertical_group(-1); Set_border(g2,0,0);  //  Set_border(g2,"Page 2");
  Vertical_Group   g3 = Create_vertical_group(-1); Set_border(g3,0,0);  //  Set_border(g3,"Page 3");

// add these groups to the pages widget

  Widget_Pages pages = Create_widget_pages();

  Append(g1,pages);
  Append(g2,pages);
  Append(g3,pages);
  
// page 1

  Select_Box select_box = Create_select_box("&Pick a string","Pick a string",SELECT_STRING,message);

  Append(select_box,g1);

// page 2

  Model_Box model_box = Create_model_box("Model to cross",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g2);

// page 3

  View_Box view_box = Create_view_box("View to cross",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g3);

// top of panel

  Append(pages_box,vgroup);
  Append(pages    ,vgroup);

// setting

  Vertical_Group  ogroup  = Create_vertical_group(0);
  
  Set_border(ogroup,"Settings for crosses");

  Model_Box  model_box2 = Create_model_box ("Model"    ,message,CHECK_MODEL_CREATE);
  Colour_Box colour_box = Create_colour_box("Colour"   ,message);
  Real_Box   input_box  = Create_real_box  ("Text size",message);

// Default values  

  Set_data(colour_box,"green");
  Set_data(input_box ,5.0);
  
  Append(model_box2  ,ogroup);
  Append(colour_box  ,ogroup);
  Append(input_box   ,ogroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button process = Create_button("&Run"    ,"count");
  Button reset   = Create_button("&Undo"   ,"reset");
  Button finish  = Create_button("&Finish" ,"finish");

  Append(process,bgroup);
  Append(reset  ,bgroup);
  Append(finish ,bgroup);

  Append(vgroup ,panel);
  Append(ogroup ,panel);
  Append(message,panel);
  Append(bgroup ,panel);
  
// set page 2 active

  Integer page = 2;
  Set_page(pages,page);

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

      case Get_id(pages_box) : {

        Text page_text;

        Integer ierr = Validate(pages_box,page_text);
        if(ierr != TRUE) break;

        if(page_text == choices[1]) {

          page = 1;

        } else if(page_text == choices[2]) {

          page = 2;
        } else if(page_text == choices[3]) {

          page = 3;
        } else {

          page = 0;
        }

        Set_page(pages,page);

      } break;

      case Get_id(reset) : {
        
        delete_element(undo_crosses);
 
        Set_data(message,"undo completed");

      } break;

      case Get_id(process) : {

        Integer ierr;

// validate colour and text size

        Real size;
        ierr = Validate(input_box,size);
        if(ierr != TRUE) break;

        Integer colour;
        ierr = Validate(colour_box,colour);
        if(ierr != TRUE) break;
 
        Model xmodel;
        ierr = Validate(model_box2,GET_MODEL_CREATE,xmodel);
        if(ierr != MODEL_EXISTS) break;

// validate model

        Integer         ignored;
        Dynamic_Element crosses;

        if(page == 1) {

          Element string;

          ierr = Validate(select_box,string);
          if(ierr != TRUE) break;

          ignored = draw_crosses(string,size,colour,crosses);
          
        } else if(page == 2) {

          Model model;

          ierr = Validate(model_box,GET_MODEL_ERROR,model);
          if(ierr != MODEL_EXISTS) break;

          ignored = draw_crosses(model,size,colour,crosses);

        } else if(page == 3) {

          View view;

          ierr = Validate(view_box,GET_VIEW_ERROR,view);
          if(ierr != VIEW_EXISTS) break;

          ignored = draw_crosses(view,size,colour,crosses);
        }

// display data

        Set_model(crosses,xmodel);

// record undo

        Null(undo_crosses);
        Append(crosses,undo_crosses);

        if(ignored) {
          Set_data(message,"draw finished - " + To_text(ignored) + " element(s) not processed");
        } else {
          Set_data(message,"draw finished");
        }
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
