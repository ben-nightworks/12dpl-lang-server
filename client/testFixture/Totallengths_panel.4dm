//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 15/09/95
// 4D Model             V2.5
// Version              1.0
// Macro Name           Sumlengths_01
// Type                 SOURCE
//
// Brief description
// Select a model and add up lengths of all strings to
// produce a total and an average length
//---------------------------------------------------------------------
// Description
// Select a model and add up lengths of all strings to
// produce a total and an average length
//---------------------------------------------------------------------
// Update/Modification
//
//    Programmer        Van Hanh Cao
//    Date              09/07/99
//    4D Model          V4.0
//    New Name          Totallengths_panel_01
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------


#include "set_ups.H"

Integer get_length(Model model,Real &length,Integer &no_model_items)
//---------------------------------------------------------------------
// This function return the total length of all strings in a model
//---------------------------------------------------------------------
{

  Dynamic_Element model_items;

  Get_elements(model,model_items,no_model_items);
  
// Get length here

  for(Integer i=1;i<=no_model_items;i++) {

    Element elt;
    Get_item(model_items,i,elt);

    Real l;
    if(Get_length(elt,l) == 0) length += l;
  }

  return(0);
	
}
Integer get_length(View view,Real &length,Integer &no_strings)
//---------------------------------------------------------------------
// This function return the total length of all strings in a view
//---------------------------------------------------------------------
{
  Integer       no_view_items;
  Dynamic_Text  view_items;

  View_get_models     (view       ,view_items);
  Get_number_of_items (view_items ,no_view_items);

// Get length here
  for(Integer i=1;i<=no_view_items;i++) {
    
    Integer ierr;

    Text model_name;
    Get_item(view_items,i,model_name);

    Model model = Get_model(model_name);

    if(!Model_exists(model)) continue;

    Real l;
    Integer n;
    l = 0.0;
    n = 0;
		
    get_length(model,l,n);

    length += l;
    no_strings += n;

  }		
  return(0);
}

void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Panel          panel   = Create_panel("Total length of string(s)");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Set_border(vgroup,"Data");

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

  Horizontal_Group  g1	= Create_button_group();      Set_border(g1,0,0);  //  Set_border(g1,"Page 1");
  Vertical_Group    g2  = Create_vertical_group(-1);  Set_border(g2,0,0);  //  Set_border(g2,"Page 2");
  Vertical_Group    g3 	= Create_vertical_group(-1);  Set_border(g3,0,0);  //  Set_border(g3,"Page 3");

// add these groups to the pages widget

  Widget_Pages pages = Create_widget_pages();

  Append(g1,pages);
  Append(g2,pages);
  Append(g3,pages);
  
// page 1

  Select_Box select_box = Create_select_box("&Pick a string","Pick a string",SELECT_STRING,message);

  Append(select_box,g1);

// page 2

  Model_Box model_box = Create_model_box("Model name",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g2);

// page 3

  View_Box view_box = Create_view_box("View name",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g3);

// top of panel

  Append(pages_box,vgroup);
  Append(pages    ,vgroup);
  Append(message  ,vgroup);


// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button process = Create_button("&Run"     ,"count");
  Button finish  = Create_button("&Finish"  ,"finish");

  Append(process ,bgroup);
  Append(finish  ,bgroup);

  Append(vgroup  ,panel);
  Append(bgroup  ,panel);
  
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
        if(ierr != TRUE) {
          Set_data(message,"bad page");
          break;
        }
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
			
      case Get_id(model_box) : {
      
        Print(cmd + " - " + msg + "\n");
        
      	Set_data(message, "Click 'Run' to get result");
      	
      } break;
      			
      case Get_id(process) : {

// validate model

        if(page == 1) {

          Integer ierr;
          Real    length;
          Real    average;
          Integer no_strings;
          Element string;

          ierr = Validate(select_box,string);
          if(ierr != TRUE) break;
					
          Get_length(string, length);

          Text result;
          result = "Length of string: " + To_text(length,"%.3lf");
          Set_data(message, result);
          
        } else if(page == 2) {

            Integer ierr;
            Real    length     = 0.0;
            Real    average    = 0.0;
            Integer no_strings = 0;
            Model   model;

            ierr = Validate(model_box,GET_MODEL_ERROR,model);
              if(ierr != MODEL_EXISTS) break;

            get_length(model,length,no_strings);
            if (no_strings == 0) average = 0.0; else average = length / no_strings;

            Text result;
            result = "Total: " + To_text(length,"%.3lf") + "  Average: " + To_text(average,"%.3lf");
       		
            Set_data(message, result);

          } else if(page == 3) {

            Integer ierr;
            Real    length     = 0.0;
            Real    average    = 0.0;
            Integer no_strings = 0;
            View    view;

            ierr = Validate(view_box,GET_VIEW_ERROR,view);
            if(ierr != VIEW_EXISTS) break;

            get_length(view,length,no_strings);
            
            if (no_strings == 0) average = 0.0; else average = length / no_strings;

            Text result;
            result = "Total: " + To_text(length,"%.3lf") + "  Average: " + To_text(average,"%.3lf");
       		
            Set_data(message,result);

          } else {

          Set_data(message,"bad choice");
          break;
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
