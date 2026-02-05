//---------------------------------------------------------------------
// Programmer           Van Hanh Cao
// Date                 14 Jul 1999
// 4D Model             V4.0
// Version              1.0
// Macro Name           Newname_panel_01
// Type                 SOURCE
// Origin               Alan Gray
//
// Brief description
// routine to change names of strings
//---------------------------------------------------------------------
// Description
// routine to change names of selected strings
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

void set_names(Element string,Text stem,Integer &number)
{
  Text new_name = stem + To_text(number);
  Set_name(string,new_name);
  
  number++;
}
void set_names(Model model,Text stem,Integer &number)
{
  Integer          no_items;
  Dynamic_Element  items;
  
  Get_elements(model,items,no_items);
  
  for(Integer i=1;i<=no_items;i++) {
  
    Element elt;
    Get_item(items,i,elt);
    set_names(elt,stem,number);  
  }
}
void set_names(View view,Text stem,Integer &number)
{
  Integer      no_items;
  Dynamic_Text items;
  
  View_get_models     (view,items);
  Get_number_of_items (items,no_items);
  
  for(Integer i=1;i<=no_items;i++) {

    Text    model_name;
    Get_item(items,i,model_name);
    
    Model model = Get_model(model_name);
    if(!Model_exists(model)) continue;
    
    set_names(model,stem,number);
  }
  
}  
void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{

// create the panel

  Panel          panel   = Create_panel("Set new string name(s)");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box("  ");

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

  Model_Box model_box = Create_model_box("Model",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g2);

// page 3

  View_Box view_box = Create_view_box("View",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g3);

// top of panel

  Append(pages_box,vgroup);
  Append(pages    ,vgroup);

// setting

  Vertical_Group ogroup      = Create_vertical_group(0);
  Name_Box       name_box    = Create_name_box   ("Name stem"  ,message);
  Integer_Box    integer_box = Create_integer_box("Next number",message);

// Default values  

  Set_data(name_box,"new name");
  Set_data(integer_box ,1);
  
  Append(name_box   ,ogroup);
  Append(integer_box,ogroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Button process = Create_button("&Process","count");
  Button finish  = Create_button("&Finish" ,"finish");

  Append(process,bgroup);
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

      case Get_id(select_box) : {

        Integer ierr;

        if(cmd == "accept select") {

// validate name and text size

          Integer next;
          ierr = Validate(integer_box,next);
          if(ierr != TRUE) break;

          Text name;
          ierr = Validate(name_box,name);
          if(ierr != TRUE) break;

          Element string;

          ierr = Validate(select_box,string);
          if(ierr != TRUE) break;

// set the new name

          set_names(string,name,next);

// restart select

          Select_start(select_box);
          Set_data(integer_box,next);
          Set_data(message,"new name \"" + name + To_text(next-1) + "\" ok");
        }
      } break;
      
      case Get_id(process) : {

        Integer ierr;

// validate name and text size

        Integer next;
        ierr = Validate(integer_box,next);
        if(ierr != TRUE) break;

        Text name;
        ierr = Validate(name_box,name);
        if(ierr != TRUE) break;

// validate model

        if(page == 1) {

          Element string;

          ierr = Validate(select_box,string);
          if(ierr != TRUE) break;
          
          set_names(string,name,next);
          Set_data(message,"new name \"" + name + To_text(next-1) + "\" ok");
          
        } else if(page == 2) {

          Model model;

          ierr = Validate(model_box,GET_MODEL_ERROR,model);
          if(ierr != MODEL_EXISTS) break;
          
          Integer no_strings = next;
          
          set_names(model,name,next);
          no_strings = next - no_strings;
          Set_data(message, To_text(no_strings) + " new name(s) were set");
          
        } else if(page == 3) {

          View view;

          ierr = Validate(view_box,GET_VIEW_ERROR,view);
          if(ierr != VIEW_EXISTS) break;
          
          Integer no_strings = next;
          
          set_names(view,name,next);
          no_strings = next - no_strings;
          Set_data(message, To_text(no_strings) + " new name(s) were set");
          
        }
        Set_data(integer_box,next);

// display data

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
