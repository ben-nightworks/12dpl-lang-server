//---------------------------------------------------------------------
// Programmer           Van Hanh Cao
// Date                 14/07/99
// 4D Model             V4.0
// Version              1.0
// Macro Name           Del_empty_model_p01
// Type                 SOURCE
// Origin               Lee Gregory
//
// Brief description
// Delete a selected empty model or all empty models in a project.
//---------------------------------------------------------------------
// Description
// Delete a selected empty model or all empty models in a project.
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


Integer delete_model(Text model_name,Integer &no_deleted)
{
  Model model = Get_model(model_name);
  Integer no_elts;
  Get_number_of_items(model,no_elts);

  if(!Model_exists(model)) return(-1);

// if model empty then delete it

  if(no_elts == 0) {
    Model_delete(model);
    no_deleted++;
  }
  return(0);
}
Integer delete_all_model(Integer &no_deleted)
{
  Integer      no_models;
  Dynamic_Text project_models;

  Get_project_models (project_models);
  Get_number_of_items(project_models,no_models);
  
  no_deleted = 0;
  for(Integer i;i<=no_models;i++) {
  
    Text    model_name;
    Model   model;
    Integer no_elts;
    
    Get_item(project_models,i,model_name);
    delete_model(model_name,no_deleted);
  }
  return(0);
}
Integer update_list(Choice_Box &model_list)
{
  Integer      no_models;
  Dynamic_Text project_models;

  Get_project_models (project_models);
  Get_number_of_items(project_models,no_models);
  
  if(no_models == 0) return(-1);
  
  Dynamic_Text empty_models;
  
  for(Integer i=1;i<=no_models;i++) {
  
// validate model

    Text model_name;
    Get_item(project_models,i,model_name);
    Model model = Get_model(model_name);
    if(!Model_exists(model)) continue;
    
    Integer no_elts;
    Get_number_of_items(model,no_elts);
    if(no_elts == 0) Append(model_name,empty_models);
  }
  
  Integer no_empty = 0;
  Get_number_of_items(empty_models,no_empty);

// add to choice box

  Text list[no_empty];
  for(Integer j=1;j<=no_empty;j++) Get_item(empty_models,j,list[j]);
  Set_data(model_list,no_empty,list);

  return(0);
    
}
void manage_a_panel()
{

// create the panel

  Panel          panel   = Create_panel("Delete Empty Models");
  Message_Box    message = Create_message_box("  ");

  Choice_Box model_list = Create_choice_box("Empty model",message);
  update_list(model_list);
  
// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Button delete     = Create_button("&Delete"    ,"delete");
  Button delete_all = Create_button("Delete &All","delete all");
  Button finish     = Create_button("&Finish"    ,"finish");

  Append(delete    ,bgroup);
  Append(delete_all,bgroup);
  Append(finish    ,bgroup);
  
  Append(model_list,panel);
  Append(message,panel);
  Append(bgroup,panel);
  
  Show_widget(panel);

  Integer doit = 1;
  Integer no_deleted = 0;

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

      case Get_id(model_list) : {
      
        update_list(model_list);
        Set_data(message,"Update");
      } break;
      
      case Get_id(delete) : {

        Integer ierr;
        Text model_name;
        ierr = Validate(model_list,model_name);
        if(ierr != TRUE) break;
        
        delete_model(model_name,no_deleted);
        Set_data(message,"empty model \"" + model_name + "\" deleted");
        update_list(model_list);
        Set_data(model_list,"");
        
      } break;
      
      case Get_id(delete_all): {
      
        delete_all_model(no_deleted);
        Set_data(message,To_text(no_deleted) + " empty model(s) deleted");
        update_list(model_list); 
        Set_data(model_list,"");
        
      } break;
    }
  }
}

void main()
{
  manage_a_panel();
}

