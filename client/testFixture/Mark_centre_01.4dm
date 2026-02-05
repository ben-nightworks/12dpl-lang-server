//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 10/2/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Mark_centre_01
// Type                 SOURCE

// Brief description
// Macro to create centre points for an alignment string on the HIP's
//---------------------------------------------------------------------
// Description
// Macre to create centre points for the ares on the HIP's for an alignment
// string. The centre point has the same name as the selected alignment
// string. The point is created as one point string.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------
void main ()  {
  Integer ret;
  Element cl;
  Real    text_size;
  Integer colour;
  Text    colour_name,model_name;
  Model   model;

  Real    x_prev_tangent,y_prev_tangent;

// Get model for text

model :

   Model_prompt("Model name for text ? ",model_name);
   if(!Model_exists(model_name)) Get_model_create(model_name);

    model = Get_model(model_name); 
// Get text size

text_size :

   if(Prompt("Text size ? ",text_size) != 0) goto text_size;

// Get text colour

text_colour:

   Colour_prompt("Colour for text ? ",colour_name);
   if(!Colour_exists(colour_name)) goto text_colour;

    if(Convert_colour(colour_name,colour) != 0) goto text_colour;


// Get alignment string


  Prompt("Select alignment string");

align:

  ret = Select_string("Select alignment string",cl);

  if(ret == -1) {
    Prompt("Finished");
    return; 
  } else if(ret != 1) {
    Prompt("Try again ");
    goto align;
  }

  Text type_name;  Get_type(cl,type_name);

  if(type_name != "Alignment") {
    Prompt("not an alignment string - try again");
    goto align;
  }

// Get Name

   Text name;
   Get_name(cl, name);

// Get number of ip points.
  Integer no_hip;
  Get_hip_points(cl,no_hip);
  if(no_hip <= 1) {

    Prompt("<= 1 HIP point");
    return;
  }
// label the alignment centre point
    Integer  mode=3,n=1;
    Text type, centre_valx, centre_valy;
    Real     x,y,z=0.0;
    Element text_x, text_y,point;
    Dynamic_Element elt_centre;
  for(Integer i=2;i<= no_hip-1;i++) {

    Get_hip_type(cl,i, type);
    if(type !="IP") {
      Get_hip_geom(cl,i,mode,x,y);
      centre_valx = "X " + To_text(x,3);
      centre_valy = "Y " + To_text(y,3);
      text_x = Create_text(centre_valx,x+0.5*text_size,y, text_size, colour,0,1,1);
      text_y = Create_text(centre_valy,x+0.5*text_size, y-text_size*1.5, text_size,colour,0,1,1);
      point = Create_2d(n);
      Set_2d_data(point,n,x,y);
      Set_name(point, name);
      Calc_extent(point);
      Append(text_x,elt_centre);
      Append(text_y,elt_centre);  
      Append(point,elt_centre);    
    }
  }
  Set_model(elt_centre, model);

  Prompt("Macro finished");  
}
