//---------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 29/11/94
// 4D Model             V3.0
// Version              1.0
// Macro Name           Longstring_01
// Type                 SOURCE
//
// Brief description
// Macro to list shortest, longest string and number of strings for each model.
//---------------------------------------------------------------------
// Description
// Macro to list shorstest, longest string and number of strings for each
// model, the longest/shortest string means that it contains max/min segments.
// Macro also list the total number of strings and average string segments.
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

Text process(Model model,Integer opt)
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
{
  Integer         no_strings;
  Dynamic_Element strings;
  
  Get_elements(model,strings,no_strings);
  
  Text model_name;
  Get_name(model,model_name);  
           
  Text    ret;    
  if(no_strings <= 0) {
    
    ret = "[nul] \"" + model_name + "\"";

  } else {
  
    Element shortest_string, 
            longest_string;
    Integer no_points_min = 0,
            no_points_max = 0,
            no_points_tot = 0;    
            
    for(Integer i=1;i<=no_strings;i++) {
    
      Element elt;
      Get_item(strings,i,elt);
      
      Integer no_points;
      Get_points(elt,no_points);
      
      if(i == 1) {
      
        shortest_string = elt; no_points_min = no_points;
        longest_string  = elt; no_points_max = no_points;
      } else {
      
        if(no_points < no_points_min) { shortest_string = elt; no_points_min = no_points; }
        if(no_points > no_points_max) { longest_string  = elt; no_points_max = no_points; }
      }
      
      no_points_tot += no_points;
    }
    Text shortest_string_name, longest_string_name;
    Get_name(shortest_string,shortest_string_name);
    Get_name(longest_string ,longest_string_name);
    
    if     (opt == 1) ret = "[min] -> " + shortest_string_name + " #pts = " + To_text(no_points_min);
    else if(opt == 2) ret = "[max] -> " + longest_string_name  + " #pts = " + To_text(no_points_max); 
    else if(opt == 3) {
    
      Text average;
      if(no_strings != 0) average = To_text(no_points_tot / no_strings); else average = "av n/a";
      ret = "[avg] #pts = " + average;
    } else ret = "unexpected error";
      
  }
  
  return ret;
}
void manage_a_panel()
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
{
  Panel          panel      = Create_panel("Number of points in model");
  Vertical_Group vgroup     = Create_vertical_group(0);
  Message_Box    message    = Create_message_box("");
  Model_Box      model_box  = Create_model_box("Model",message,CHECK_MODEL_EXISTS);
  Choice_Box     choice_box = Create_choice_box("Option",message);
  
  Append(model_box ,vgroup);
  Append(choice_box,vgroup);
  Append(message   ,vgroup);
  
  Text choices[3];
  choices[1] = "min points";
  choices[2] = "max points";
  choices[3] = "avg points";
  
  Set_data(choice_box,1,choices);
  Set_data(choice_box,2,choices);
  Set_data(choice_box,3,choices);
  
  Horizontal_Group bgroup = Create_button_group();
//  Set_border(bgroup,"Processing");
  
  Button run = Create_button("&Process","run");
  Button finish  = Create_button("&Finish" ,"finish");
  
  Append(run,bgroup);
  Append(finish ,bgroup);
  
  Append(vgroup,panel);
  Append(bgroup,panel);
  
  Show_widget(panel);
  
  Integer doit = 1;
  
  while(doit) {
  
    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg); 
    
    if(cmd == "keystroke") continue;
    
    switch(id) {
    
      case Get_id(panel): {
      
        if(cmd == "Panel Quit") doit = 0;
        
      } break;
    
      case Get_id(finish): {
      
        if(cmd == "finish") doit = 0;
      
      } break;
      
      case Get_id(run): {
      
        Integer ierr;
        
// validate model box
        
        Model model;
        ierr = Validate(model_box,GET_MODEL_ERROR,model);
        if(ierr != MODEL_EXISTS) break;

// validate choice box

        Text choice;
        ierr = Validate(choice_box,choice);
        if(ierr != TRUE) break;
        
        Text output;
        if     (choice == choices[1]) output = process(model,1);
        else if(choice == choices[2]) output = process(model,2);
        else if(choice == choices[3]) output = process(model,3);
      
        Set_data(message,output);
      
      } break;
     
    }
  
  }
  
}
void main()
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
{
  manage_a_panel();
}
