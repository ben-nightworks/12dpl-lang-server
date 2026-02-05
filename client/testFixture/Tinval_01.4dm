//---------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 20/10/94
// 4D Model             V2.5
// Version              1.0
// Macro Name           Tinval_01
// Type                 SOURCE
//
// Brief description
// Take the (x,y) position for each point on a string and write z-values
// on a specified tin
//---------------------------------------------------------------------
// Description
// Macro to take the (x,y) position for each point on a string and
// then produce a text string of the z-values at each point on
// as user specified tin.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

void process_elt(Tin tin,Element elt,Model model,Real size,
                 Integer colour,Real angle,Real offset,
                 Integer decimals,Integer text_units)
// ---------------------------------------------------------------------------
// Find the z-value on the tin for each point in elt
//
// Only process 2d, 3d strings
// ---------------------------------------------------------------------------
{
  Text    type,number;
  Integer i,no_pts,justif;
  Real    x,y,z,height,rise;
  Element text_elt;

  Get_type(elt,type);
  Get_points(elt,no_pts);

  justif = 1;
  rise = 0.0;

  if(!(type =="2d" || type == "3d")) return;

  for (i=1;i<=no_pts;i++) {
    if(type == "2d") {
      Get_2d_data(elt,i,x,y);
    } else if (type == "3d") {
      Get_3d_data(elt,i,x,y,z);
    }

// get value on the tin at (x,y)

    if(Tin_height(tin,x,y,height) == 0) {
      number   = To_text(height,decimals);
      text_elt = Create_text(number,x,y,size,colour,angle,justif,
                             text_units,offset,rise);
      Set_model(text_elt,model);
    } 
  }

  return;
  
}

void main ()
// ---------------------------------------------------------------------------
//  Macro to take the (x,y) position for each point on a string and
//  then produce a text string of the z-values at each point on the tin
// ---------------------------------------------------------------------------
{

// get the name of the tin

  Text    tin_name,model_name,text_model_name,colour_name;
  Tin     tin;
  Model   model,text_model;
  Real    text_size,offset,angle,radians;
  Integer colour,decimals,text_units;

get_tin:

  Tin_prompt("Give the name of the tin :",tin_name);

  if(!Tin_exists(tin_name)) goto get_tin;

   tin = Get_tin(tin_name);

// Get model for text

model1 :

   Model_prompt("Model to drape :",model_name);
   if(!Model_exists(model_name)) goto model1;

    model = Get_model(model_name);

 
// Get model for text

model2 :

   Model_prompt("Model for text :",text_model_name);

    text_model = Get_model_create(text_model_name);

   if(!Model_exists(text_model)) goto model2;

// Get text size

text_size :

   if(Prompt("Text size :",text_size) != 0) goto text_size;
   if(Prompt("Text size (+ world, - pixel):",text_size) != 0) {
    Error_prompt("Error in label size - try again");
    goto text_size;
  }

  if(text_size == 0.0) goto text_size;

  if(text_size < 0.0) {
    text_units = 0;
    text_size = - text_size;
  } else {
    text_units = 1;
  }

// Get text colour

text_colour:

   Colour_prompt("Colour for text :",colour_name);
   if(!Colour_exists(colour_name)) goto text_colour;

    if(Convert_colour(colour_name,colour) != 0) goto text_colour;

angle:

   if(Prompt("Angle for text(degrees) :",angle) != 0) goto angle;

   Degrees_to_radians(angle,radians);

offset:

   if(Prompt("Offset for text :",offset) != 0) goto offset;

decimals:

   if(Prompt("No. decimal places for text :",decimals) != 0) goto decimals;

  decimals = Absolute(decimals);

// Get all the strings in the model and drop their nodes onto the tin

  Dynamic_Element  strings;
  Integer          no_strings,i;
  Element          elt;

  Prompt("Processing");

  Get_elements(model,strings,no_strings);

  for (i=1;i<=no_strings;i++) {
    Get_item(strings,i,elt);
    process_elt(tin,elt,text_model,text_size,colour,radians,offset,decimals,text_units);
  }
  
  Prompt("Finished");
}
