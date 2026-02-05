//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 7/1/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Display_linestyles_panel_01
// Type                 SOURCE
//
// Brief description
// Draw all line styles for a project
//---------------------------------------------------------------------
// Description
// Ask for model to store line styles
// Get the list of all line styles for the project
// Create a text string of the line style name
// Create a 3 points string in the line style
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

  ret = Model_prompt("Enter model for linestyle list", model_name);
  model = Get_model_create(model_name);

// Get number of rows of each column
   Integer p=35;
   Prompt("How many rows in a column<35>: ", p);
     

// Get line style array

  Dynamic_Text style_name;

  Get_all_linestyles(style_name);

// Get number of items of the text array


  Integer numberOfItem;

  Get_number_of_items(style_name, numberOfItem);

  Integer color = 1, i;
  Real    size  = 1.25, a[3], b[3], numberOfpt = 3;
  Real    x = 0.0, y = 0.0, z = 0.0, xline = 20.00, ny = 5.00;		
  Text    line_style;

  Integer n, m, xcolum=70;  //deleted p=36 here
  
  n = numberOfItem/p + 1;
 
  Dynamic_Element created;

    for (m=1; m <= n; m++) {

    a[1] = x+xline+(m-1)*xcolum;
    a[2] = x+2*xline+(m-1)*xcolum;
    a[3] = x+3*xline+(m-1)*xcolum;

    b[1] = y;
    b[2] = y;
    b[3] = y;

      for (i=(m-1)*p+1; i <=p*m; i++) {

        Integer ret1;
        
        ret1 = Get_item(style_name,i,line_style);

          if (ret1==0) {
// Create text strings of the line style names
 
            Element elt_text;

            elt_text = Create_text(line_style,(a[1]-xline),b[1],size,color);

            Integer unitMode=1;

            Set_text_units(elt_text, unitMode);
            Append(elt_text,created);

// Create 3 point line string with a line style
            Element elt_line;

            elt_line = Create_2d(a,b,z,numberOfpt);
            Set_style(elt_line,line_style);
            Set_name (elt_line,line_style);
            Append(elt_line,created);

            b[1] += ny;
            b[2] += ny;
            b[3] += ny;
          }
      }
    }
// Put all elements into user selected model

  Set_model(created, model);

  Prompt("Macro finished");

}
 
	
