//---------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 15/6/95
// 4D Model             V3.0
// Version              1.0
// Macro Name           Extrapolate_01
// Type                 SOURCE
//
// Brief description
// Create a new point which is extrapolated from two points.
//---------------------------------------------------------------------
// Description
// Two points and a distance are supplied and then a new point is created
// which is on the line through the two points, and the given plan distance
// from the second point. The z value of the new point
// is extrapolated from the z values of the first and second points.

// Selecting cancel instead of point 1 terminates.
// Selecting cancel instead of pt 2 repicks pt 1.
// The distance must be non-zero.
// 
// The new point has the same model and colour as pt 1.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

void main() {

// pick the first point (cancel to quit)

  Element elt1,elt2;
  Integer err;

  Real    x1,y1,z1,x2,y2,z2,c,h,dist;

first_point:

  Prompt("Select first point (cancel to end)");
  err = Select_string("Select first point (cancel to end)",elt1,x1,y1,z1,c,h);

  if(err == -1) {
    Prompt("macro finished");
    return;
  } else if(err != 1) {
    goto first_point;
  } 

// pick the second point (cancel to goto first point)

second_point:

  Prompt("Select second point (cancel to pick pt1 again)");
  err = Select_string("Select second point (cancel to pick pt1 again)",elt2,x2,y2,z2,c,h);

  if(err == -1) {
    goto first_point;
  } else if(err != 1) {
    goto second_point;
  } 

// give the distance to extend

distance:

  err = Prompt("Give the distance to extend",dist);
  if(err != 0) goto distance;

  if(Absolute(dist) < 0.000001) goto distance;

  Real x12,y12,z12,x3,y3,z3,d12,d13,lambda;

  x12 = x2 - x1;
  y12 = y2 - y1;
  z12 = z2 - z1;

  d12 = Sqrt(x12*x12 + y12*y12);

  d13 = d12 + dist;

  lambda = d13 / d12;

  x3 = x1 + lambda * x12;
  y3 = y1 + lambda * y12;
  z3 = z1 + lambda * z12;

  Error_prompt("x3 y3 z3 " +To_text(x3,1)+" "+To_text(y3,1)+" "+To_text(z3,1));

// create a new point

  Element elt3;
  Integer colour;
  Model   model;

  Get_model(elt1,model);
  Get_colour(elt1,colour);

  elt3 = Create_3d(1);

  Set_3d_data(elt3,1,x3,y3,z3);
  Set_colour(elt3,colour);
  Calc_extent(elt3);
  Set_model(elt3,model);

  goto first_point;
}
