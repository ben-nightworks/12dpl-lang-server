//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 03/02/97
// 4D Model             V3.0
// Version              1.0
// Macro Name           Namecont_01
// Type                 SOURCE
//
// Brief description
// Select a model or view, or list of models to
// set the name of the contour from the contour level
//---------------------------------------------------------------------
// Description
// Select a model or view, or list of models to
// set the name of the contour from the contour level
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
 
// Choice of View, Model or List of Models
  
  Dynamic_Text model_list;
  Integer      mode,err;
  Text         ans;
  Text         choices[4];
  Text         message = "Choose where strings are to be extracted from";

  choices[1] = "View";
  choices[2] = "Model";
  choices[3] = "List of Models";
  choices[4] = "Cancel";

choice_mode:

  Null(model_list);

  if(Choice_prompt(message,4,choices,ans) != 0) goto choice_mode;

  switch(ans) {
    case choices[1] : {    // Getting a View

view_name:

      if(View_prompt("What is the View name ? ", ans) != 0 ) goto view_name;

      mode = 1;

      View view;
      view = Get_view(ans);

      if(View_exists(view) == 0) goto choice_mode;

      View_get_models(view, model_list);

    } break;

    case choices[2] : {    // Getting a single Model

model_name:

      if(Model_prompt("What is the Model name ? ", ans) != 0 ) goto model_name;

      mode = 2;

      if(Model_exists(ans) == 0) goto choice_mode;

      Append(ans, model_list);

    } break;

    case choices[3] : {    // Getting a list of Models

model_list:

      if(Model_prompt("Model name, 1 to finish, 2 to exit ", ans) != 0 ) goto model_list;

      mode = 3;

      if(ans == "2") Exit("Macro cancelled");
      if(ans == "1") break;

      if(Model_exists(ans) == 0) {
        Error_prompt("Model does not exist");
        goto model_list;
      }

      Append(ans, model_list);
      goto model_list;

    } break;

    case choices[4] : {    // Cancel selected by user

      Exit("Macro cancelled");

    } break;

    default : { goto choice_mode; } break;
  }

// Create list of elements from model_list

  Integer total_models;
  Get_number_of_items(model_list, total_models);

  Dynamic_Element element_list;
  Integer total_elements;
  Model   model;
  Text    model_name;

  for (Integer i=1;i<=total_models;i++) {

    Get_item(model_list, i, model_name);

    if(Model_exists(model_name) == 0) continue;

    model = Get_model(model_name);

    Get_elements(model, element_list, total_elements);
  }

// process all 2d strings

  for(Integer j=1;j<=total_elements;j++) {

    Element elt;
    Get_item(element_list,j,elt);

    Text type;
    Get_type(elt,type);

    if(type != "2d") continue;

    Real level;
    Get_2d_data(elt,level);

// names cannot contain a decimal point or minus sign
// factor up name by 100

    Integer iname = level*100.0;
    Text    name;

    if(iname < 0) {
      name = "minus " + To_text(-iname);
    } else {
      name = "plus " + To_text(iname);
    }

// now set the name based on the level

    err = Set_name(elt,name);
    if(err != 0) {
      Error_prompt("Set_name(" + name + ") failed with " + To_text(err));
    }
  }
  Error_prompt(To_text(total_elements) + " strings processed");

  goto choice_mode;
}

