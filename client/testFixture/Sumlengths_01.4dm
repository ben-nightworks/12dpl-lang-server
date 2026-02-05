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
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

void main()
{
 
// Get model for text

  Text model_name = "hinge sec";

  while(1) {

    Model_prompt("Model to sum lengths ? ",model_name);

    if(Model_exists(model_name)) break;
  }

// get all elements

  Model model = Get_model(model_name);

  Integer         no_model_items;
  Dynamic_Element model_items;

  Get_elements(model,model_items,no_model_items);

  Real length = 0.0;
  for(Integer i=1;i<=no_model_items;i++) {

    Element elt;
    Get_item(model_items,i,elt);

    Real l;
    if(Get_length(elt,l) == 0) length += l;
  }
  Real avl = (no_model_items == 0) ? 0.0 : length/no_model_items;
  Text res = "Total length of strings is " + To_text(length,"%.3lf") + " Av is " + To_text(avl,"%.3lf");

  Error_prompt(res);
}

