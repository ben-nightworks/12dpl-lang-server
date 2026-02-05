//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 7/1/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Textstyles_01
// Type                 SOURCE
//---------------------------------------------------------------------
// Brief description
// Draw all text styles for a project
//---------------------------------------------------------------------
// Description
// Ask for model to store text styles
// Get the list of all text styles for the project
// Create a text string of the text style name
// Create a text string of the example
// Put all strings into user selected model
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------
void main () {

  Integer ret;
  Text    model_name;
  Model   model;

// Enter model name and create model

  ret = Model_prompt("Enter model for textstyle list", model_name);
  model = Get_model_create(model_name);

// Get number of rows of each column
   Integer p=35;
   Prompt("How many rows in a column<35>: ", p);
     
// Get text style array

  Dynamic_Text style_name;

  Get_all_textstyles(style_name);

// Get number of items of the text array

  Integer numberOfItem;

  Get_number_of_items(style_name, numberOfItem);

  Integer color = 1, i;
  Real    size  = 2,  z = 0.0, xline = 20.00, ny = 5.00;
  Text    text_style;

  Integer n, m, xcolum=50; //Deleted p=36 here
  
  n = numberOfItem/p + 1;
 
  Dynamic_Element created;

    for (m=1; m <= n; m++) {
      
      Real  y = 0.0, x = 0.0+(m-1)*xcolum;

      for (i=(m-1)*p+1; i <=m*p; i++) {
 
        Integer ret1;
        ret1 = Get_item(style_name,i,text_style);

          if (ret1==0) {

            Element elt_text;

// Create text strings of the text style names

            elt_text = Create_text(text_style,x,y,size,color);

            Integer unitMode=1;

            Set_text_units(elt_text, unitMode);
            Append(elt_text,created);

// Create example text string

            Element elt_sample;
            Text    sample = "AaBaCcDd";

            elt_sample = Create_text(sample,x+xline,y,size,color+1);
            Set_text_style(elt_sample,text_style);
            Set_text_units(elt_sample, unitMode);
            Append(elt_sample,created);

            y += ny;
          }
      }
    }

// Put all elements into user selected model

  Set_model(created, model);

  Prompt("Macro finished");

}
 
	
