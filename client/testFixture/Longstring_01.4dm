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
void main()
{
  Dynamic_Text all_models;
  Get_project_models(all_models);

  Integer no_models;
  Get_number_of_items(all_models,no_models); 

  Integer no_strings_processed = 0;

  Menu menu = Create_menu("Shortest/Longest strings in models");

  for(Integer i=1;i<=no_models;i++) {

    Text model_name;
    Get_item(all_models,i,model_name);

    Model model = Get_model(model_name);

    Integer         no_strings;
    Dynamic_Element all_strings;

    Get_elements(model,all_strings,no_strings);

    Element shortest_string , longest_string;
    Integer no_points_min = 0 , no_points_max = 0 , no_points_tot = 0;

    if(no_strings == 0) {

      Text nul = "[nul] \"" + model_name + "\"";

      Create_button(menu,nul,"");

    } else {

      for(Integer s=1;s<=no_strings;s++) {

        Element e;
        Get_item(all_strings,s,e);

        Integer no_points;
        Get_points(e,no_points);

        if(s == 1) {
          shortest_string = e;  no_points_min = no_points;
          longest_string  = e;  no_points_max = no_points;
        } else {
          if(no_points < no_points_min) { shortest_string = e;  no_points_min = no_points; }
          if(no_points > no_points_max) { longest_string  = e;  no_points_max = no_points; }
        }
        no_points_tot += no_points;
      }
      no_strings_processed += no_strings;
    
      Text shortest_string_name;
      Get_name(shortest_string,shortest_string_name);

      Text longest_string_name;
      Get_name(longest_string,longest_string_name);

      Text av;
      if(no_strings != 0) {
        av = To_text(no_points_tot/no_strings);
      } else {
        av = "n/a";
      }

      Text min = "[min] \"" + model_name + "->" + shortest_string_name  + "\"" + " #pts=" + To_text(no_points_min);
      Text max = "[max] \"" + model_name + "->" + longest_string_name   + "\"" + " #pts=" + To_text(no_points_max);
      Text tot = "[tot] #str=" + To_text(no_strings) + " #av=" + av;

      Create_button(menu,min + "  " + max + "  " + tot,"");
    }
  }
  Create_button(menu,"","");
  Create_button(menu,"strings processed = " + To_text(no_strings_processed),"");

  Integer xcur = -1 , ycur = -1;
  Text    reply;

  Display(menu,xcur,ycur,reply);
}
