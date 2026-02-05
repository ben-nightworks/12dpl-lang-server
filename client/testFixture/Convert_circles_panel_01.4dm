//---------------------------------------------------------------------
// Programmer           Van Hanh Cao
// Date                 16/07/99
// 4D Model             V4.0
// Version              1.0
// Macro Name           Convert_circles_panel_01
// Type                 SOURCE
// Origin               Alan Gray (convertcircles_01)
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



Integer convert_circle(Element elt,Model &cmodel)
//---------------------------------------------------------------------
//---------------------------------------------------------------------
{
  Text type;
  Get_type(elt, type);
  
  if(type != "Circle") return(-1);
  
  Text name;
  Get_name(elt,name);
  
  Integer colour;
  Get_colour(elt,colour);
  
// get control point

  Real xd[1],yd[1],zd[1],rd;
  Get_circle_data(elt,xd[1],yd[1],zd[1],rd);
  
  Element string = Create_3d(xd,yd,zd,1);
  
  Set_name(string,name);
  Set_colour(string,colour);
  Set_breakline(string,0);
  
  Set_model(string,cmodel);
  
  return(0);
}
Integer convert_circle(Model model,Model &cmodel)
{

  if(!Model_exists(model) || !Model_exists(cmodel)) return(-1);
  
  Dynamic_Element elts;
  Integer         no_elts;
  
  Get_elements(model,elts,no_elts);
  
  for(Integer i=1;i<=no_elts;i++) {
    
    Element elt;
    Get_item(elts,i,elt);
    convert_circle(elt,cmodel);
  }
  return(0);
}
Integer convert_circle(Dynamic_Text model_list,Model &cmodel)
{
  Integer no_models;
  Get_number_of_items(model_list,no_models);
  
  for(Integer i=1;i<=no_models;i++) {
    
    Text model_name;
    Get_item(model_list,i,model_name);
    
    Model model = Get_model(model_name);
    if(!Model_exists(model)) continue;
    
    convert_circle(model,cmodel);
  }
  
  return(0);
}
void update_list(Text name,Dynamic_Text &available, Dynamic_Text &ready)
{
  Integer no_items;
  Get_number_of_items(available,no_items);

  Dynamic_Text temp = available;
  Null(available);
  for(Integer i;i<=no_items;i++) {
    
    Text temp_name;
    Get_item(temp,i,temp_name);
    
    if(temp_name != name) {
    
      Append(temp_name,available); } else {
      
      Append(temp_name,ready);
    }
    
  }
  
}
void update_choice(Dynamic_Text available,Choice_Box &choice_box)
{
  Integer no_items;
  Get_number_of_items(available,no_items);
        
  Text anames[no_items];
  for(Integer i=1;i<=no_items;i++) {
        
    Text aname;
    Get_item(available,i,aname);
    anames[i] = aname;
          
  }
  Set_data(choice_box,no_items,anames);

}
void manage_a_panel()
//---------------------------------------------------------------------
//---------------------------------------------------------------------
{
// create the panel

  Panel          panel   = Create_panel("Draw Crosses for String(s)");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Set_border(vgroup,"Source");

  Integer no_choices = 3;
  Text    choices[3];

  choices[1] = "Model";
  choices[2] = "Model List";
  choices[3] = "View";

  Choice_Box pages_box = Create_choice_box("Data source",message);

  Set_data(pages_box,no_choices,choices);
  Set_data(pages_box,choices[1]);

  Append(pages_box,vgroup);

// create 3 vertical groups for each page of widgets

  Vertical_Group g1 = Create_vertical_group(-1); Set_border(g1,0,0);  //  Set_border(g1,"Page 1");
  Vertical_Group g2 = Create_vertical_group(-1); Set_border(g2,0,0);  //  Set_border(g2,"Page 2");
  Vertical_Group g3 = Create_vertical_group(-1); Set_border(g3,0,0);  //  Set_border(g3,"Page 3");

// add these groups to the pages widget

  Widget_Pages pages = Create_widget_pages();

  Append(g1,pages);
  Append(g2,pages);
  Append(g3,pages);

// page 1

  Model_Box model_box = Create_model_box("Model to convert",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g1);
  
// page 2

  Choice_Box choice_box = Create_choice_box("Available model",message);

  Append(choice_box,g2);
  
// page 3

  View_Box view_box = Create_view_box("View to convert",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g3);

// top of panel

  Append(pages_box,vgroup);
  Append(pages    ,vgroup);

// setting

  Vertical_Group  ogroup  = Create_vertical_group(0);
  
  Set_border(ogroup,"Output");

  Model_Box  model_box2 = Create_model_box ("Model",message,CHECK_MODEL_CREATE);

// Default values  

  Append(model_box2  ,ogroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button process = Create_button("&Run"    ,"count");
  Button finish  = Create_button("&Finish" ,"finish");

  Append(process,bgroup);
  Append(finish ,bgroup);

  Append(vgroup ,panel);
  Append(ogroup ,panel);
  Append(message,panel);
  Append(bgroup ,panel);
  
// set page 2 active

  Integer page = 1;
  Set_page(pages,page);

  Show_widget(panel);

  Dynamic_Text model_list;
  Dynamic_Text available;
    
  Get_project_models(available);
  update_choice(available,choice_box);
    
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

      case Get_id(choice_box) : {
      
        Integer ierr;
        Text    name;
        ierr = Validate(choice_box,name);
        if(ierr != TRUE) break;
        
        update_list(name,available,model_list);
        update_choice(available,choice_box);
        Set_data(message,"model \"" + name + "\" added to model list");

      } break;
      
      case Get_id(process) : {

        Integer ierr;

// validate colour and text size

        Model cmodel;
        ierr = Validate(model_box2,GET_MODEL_CREATE,cmodel);
        if(ierr != MODEL_EXISTS) break;

// validate model

        if(page == 1) {

          Model model;

          ierr = Validate(model_box,GET_MODEL_ERROR,model);
          if(ierr != MODEL_EXISTS) break;
          
          Text model_name;
          Get_name(model,model_name);
          Append(model_name,model_list);

        } else if(page == 2) {

        } else if(page == 3) {

          View view;

          ierr = Validate(view_box,GET_VIEW_ERROR,view);
          if(ierr != VIEW_EXISTS) break;
          
          View_get_models(view,model_list);

        }
      
        convert_circle(model_list,cmodel);
        
        Integer no_items;
        Get_number_of_items(model_list,no_items);
        
        Text final_msg;
        for(Integer i=1;i<=no_items;i++) {
          Text mname;
          Get_item(model_list,i,mname);
          final_msg = final_msg + mname + ", ";
        }
        Set_data(message,"model(s): " + final_msg + " converted");
        Null(model_list);
        
        Get_project_models(available);
        update_choice(available,choice_box);   
        
      } break;
    }
  }
}
void main()
//---------------------------------------------------------------------
//---------------------------------------------------------------------
{
  manage_a_panel();
}

