//---------------------------------------------------------------------
// Programmer           Lee Gregory/Alan Gray
// Date                 20/10/94
// 4D Model             V2.5
// Version              1.0
// Macro Name           Rats_01
// Type                 SOURCE
//
// Brief description
// Select an alignment string and pick a point to write information in 
// plan with spiral,tangent, arc lengths, curve radii, deflection angle.
//---------------------------------------------------------------------
// Description
// Select an alignment string and pick a point to write information in 
// plan with spiral,tangent, arc lengths, curve radii, deflection angle.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

Real atan3(Real dy,Real dx)
// -------------------------------------------------------
// return angle from 0 to 2 pi
// -------------------------------------------------------
{
  Real a , leng = Sqrt(dx*dx + dy*dy);

  if(leng < 1.0e-06) {
    a = 0.0;
  } else {
    a = Atan2(dy,dx);
    if(a < 0.0) {
      a += Two_pi();
    }
  }
  return(a);
}
Real change_of_angle(Real x1,Real y1,Real x2,Real y2,Real x3,Real y3)
// -----------------------------------------------------------------------------------------
// calculate the change of angle of the two vertors
// -----------------------------------------------------------------------------------------
{
  Real dx = x2 - x1;
  Real dy = y2 - y1;
  Real l2 = dx*dx + dy*dy;

  if(l2 < 1.0e-6) return(0.0);

  Real s  = ((x3 - x1)*dx + (y3 - y1)*dy)/l2;
  Real t  = ((y3 - y1)*dx - (x3 - x1)*dy)/l2;

  Real xn = x1 + s*dx;
  Real yn = y1 + s*dy;

  Real xa = xn - x2 , ya = yn - y2 , x = Sqrt(xa*xa + ya*ya);
  Real xb = x3 - xn , yb = y3 - yn , y = Sqrt(xb*xb + yb*yb);

  Real a  = Absolute(atan3(y,x));

  Real angle;
  if(t > 0.0) {
    if(s > 1.0) { angle =  a; } else { angle = Pi() - a; }
  } else {
    if(s > 1.0) { angle = -a; } else { angle = a - Pi(); }
  }
  return(angle);
}


void get_hip_info(Element align,Integer hip,Integer &type,
                  Real xval[],Real yval[],Real lengths[],Real &deflection)
// ----------------------------------------------------------------------------
//  Get the horizontal info for an horizontal ip 
//
//      - the co-ordinates of the special points
//      - the curve radius and curve length
//      - the left and right spiral lengths
//             
//
//  Type of HIP is returned as type where
//
//     type = 0  HIP only
//          1  Curve only
//          2  LH Spiral only
//          3  LH spiral and curve
//          4  RH spiral only
//          5  curve, RH spiral
//          6  LH spiral, RH spiral
//          7  LH spiral, curve, RH spiral
//
//   Co-ordinates of special points returned in xval[1...6],yval[1...6]
//   where the array position gives
//
//        position  1  LH tangent, TS or TC
//                  2  RH tangent, ST or CT
//                  3  curve centre
//                  4  SC
//                  5  CS
//                  6  HIP
//
//    NOTE - 
//
//       If the IP is an HIP only, 1-5 are all given the HIP co-ords.
//       If the IP has a curve and no spirals, 1 is set equal to 4 (TC=SC),
//           and 2 is set equal to 5 (CT=CS).
//
//
//
//    The curve radius, curve and spiral lengths are returned in
//     the array lengths[1...4]
//
//        position  1  circle radius
//                  2  circle length
//                  3  left spiral length
//                  4  right spiral length
//
// ----------------------------------------------------------------------------
{
  Text hip_type;
  Integer ret;

  ret = Get_hip_type(align,hip,hip_type);

// Get the co-ordinates of the special points for the HIP
 
  if(hip_type == "IP") {

//  case of HIP only with no curve or spiral

    Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);

    xval[6] = xip; yval[6] = yip;

    type = 0;

// fill in other array positions - set them all to the HIP position

    xval[1] = xip; yval[1] = yip;
    xval[2] = xip; yval[2] = yip;
    xval[3] = xip; yval[3] = yip;
    xval[4] = xip; yval[4] = yip;
    xval[5] = xip; yval[5] = yip;

  } else if(hip_type == "Curve") {

//  case of HIP with and curve and no spirals

    Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
    Real xtc,ytc;  ret = Get_hip_geom(align,hip,1,xtc,ytc); 
    Real xct,yct;  ret = Get_hip_geom(align,hip,2,xct,yct); 
    Real xcc,ycc;  ret = Get_hip_geom(align,hip,3,xcc,ycc);

    xval[1] = xtc; yval[1] = ytc;
    xval[2] = xct; yval[2] = yct;
    xval[3] = xcc; yval[3] = ycc;
    xval[6] = xip; yval[6] = yip;
       
    type = 2;

// fill in the other array positions

    xval[4] = xtc; yval[4] = ytc;
    xval[5] = xct; yval[5] = yct;

  } else if(hip_type == "Spiral") {

    Real xip,yip;  ret = Get_hip_geom(align,hip,0,xip,yip);
    Real xts,yts;  ret = Get_hip_geom(align,hip,1,xts,yts);
    Real xsc,ysc;  ret = Get_hip_geom(align,hip,4,xsc,ysc);
    Real xcs,ycs;  ret = Get_hip_geom(align,hip,5,xcs,ycs);
    Real xst,yst;  ret = Get_hip_geom(align,hip,2,xst,yst);
    Real xcc,ycc;  ret = Get_hip_geom(align,hip,3,xcc,ycc);

    Integer left_spiral  = ((xts != xsc) || (yts != ysc)) ? 1 : 0;  
    Integer right_spiral = ((xst != xcs) || (yst != ycs)) ? 1 : 0;
    Integer curve        = ((xsc != xcs) || (ysc != ycs)) ? 1 : 0;

    xval[1] = xts; yval[1] = yts;
    xval[2] = xst; yval[2] = yst;
    xval[3] = xcc; yval[3] = ycc;
    xval[4] = xsc; yval[4] = ysc;
    xval[5] = xcs; yval[5] = ycs;
    xval[6] = xip; yval[6] = yip;
 
    type = 2*curve + 2*left_spiral + 2*right_spiral;
  }

//  Get the curve radius, curve and spiral lengths

  Real x,y,radius,left_spiral,right_spiral;

  Get_hip_data(align,hip,x,y,radius,left_spiral,right_spiral);

  Real ch1,ch2,xf,yf,zf,dir,off;  // to get curve length

  if(radius != 0) {
    Drop_point(align,xval[4],yval[4],0.0,xf,yf,zf,ch1,dir,off);
    Drop_point(align,xval[5],yval[5],0.0,xf,yf,zf,ch2,dir,off);
    lengths[2] = ch2 - ch1;
  } else {
    lengths[2] = 0.0;
  }
 
  lengths[1] = radius;
  lengths[3] = left_spiral;
  lengths[4] = right_spiral;

// Get the deflection angle

  Integer no_hip;
  Get_hip_points(align,no_hip);

  if(hip == 1 || hip == no_hip) {

    deflection = 0.0;

  } else {

    Real x1,y1;  ret = Get_hip_geom(align,hip-1,0,x1,y1);
    Real x2,y2;  ret = Get_hip_geom(align,hip  ,0,x2,y2);
    Real x3,y3;  ret = Get_hip_geom(align,hip+1,0,x3,y3);

    deflection = change_of_angle(x1,y1,x2,y2,x3,y3);
  }
  return;
}
Text radians_to_dms_text(Real angle)
// ---------------------------------------------------------------------
// routine to convert a radians angle into a dd^mm'ss.ss'
// ---------------------------------------------------------------------
{
  Radians_to_degrees(angle,angle);

  Integer d,m;
  Real    s;

  Degrees_to_dms(angle,d,m,s);

  Text t = To_text(d) + "^" + To_text(m) + "'" + To_text(s,"%.0lf") + "\"";

  return(t);
}
Real distance(Real x1,Real y1,Real x2,Real y2)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Real dx = x2 - x1;
  Real dy = y2 - y1;

  return(Sqrt(dx*dx + dy*dy));
}
Element position_text(Text text,Real size,Integer colour,
                      Real x1,Real y1,Real x2,Real y2)
// ----------------------------------------------------------------------------
// Routine to position text
// At the moment it centres it between (x1,y1) and (x2,y2)
// with (bottom,centre) justification
// ----------------------------------------------------------------------------
{
  Real xpos,ypos,angle;

  xpos = 0.5 * (x1 + x2);
  ypos = 0.5 * (y1 + y2);
  angle = Atan2(y2 - y1,x2 - x1);

  Element elt = Create_text(text,xpos,ypos,size,colour,angle,4,1);

  return (elt);      
} 

void main()
// ---------------------------------------------------------------
//  Select an alignment string and then label it in plan with
//  spiral lengths, curve radii and tangent length.
//
//  The positions of the labels is midway between the two critical points.
//  This should be changed to whatever is required
// ---------------------------------------------------------------
{
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

// query all alignment info

  Integer no_hip;
  Get_hip_points(cl,no_hip);
  if(no_hip <= 1) {

    Prompt("<= 1 HIP point");
    return;
  }

// label the alignment

  for(Integer i=2;i<= no_hip-1;i++) {

    Integer  type;
    Real     xval[6],yval[6],lengths[4],deflection;

    get_hip_info(cl,i,type,xval,yval,lengths,deflection);

// label the spiral lengths and curve radius

    Integer  just = 1;
    Real     xpos, ypos, angle, zpos, ch, ht;
    Text     text, msg;
    Element  elt;

    Integer curve        = (lengths[1] == 0) ? 0 : 1;
    Integer left_spiral  = (lengths[3] == 0) ? 0 : 1;
    Integer right_spiral = (lengths[4] == 0) ? 0 : 1;

// label deflection

    text = "CURVE No." + To_text(i-1);
    msg = "Indicate location of "+text;
    Prompt( msg );
    Select_string(msg,elt,xpos,ypos,zpos,ch,ht);
    
    elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
    Set_text_style( elt, "RO" );
    Calc_extent( elt );
    Set_model(elt,model);

    ypos -= 2*text_size;

// label deflection

    text = "DEF " + radians_to_dms_text(Absolute(deflection));

    elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
    Set_text_style( elt, "RO" );
    Calc_extent( elt );
    Set_model(elt,model);

    ypos -= 1.5*text_size;

// label radius

    text = "RAD " + To_text(Absolute(lengths[1]),3);
    elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
    Set_text_style( elt, "RO" );
    Calc_extent( elt );
    Set_model(elt,model);

    ypos -= 1.5*text_size;

    if(i == 1 || i == no_hip) continue;

    Real t1 = distance(xval[6],yval[6],xval[1],yval[1]);
    Real t2 = distance(xval[6],yval[6],xval[2],yval[2]);

    if(Absolute(t1 - t2) < 1.0e-6) {

// label the TAN

      text = "TAN " + To_text(t1,3);
      elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
      Set_text_style( elt, "RO" );
      Calc_extent( elt );
      Set_model(elt,model);

      ypos -= 1.5*text_size;

    } else {

// label the TAN

      text = "TAN1 " + To_text(t1,3);
      elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
      Set_text_style( elt, "RO" );
      Calc_extent( elt );
      Set_model(elt,model);

      ypos -= 1.5*text_size;

// label the TAN 1

      text = "TAN2 " + To_text(t2,3);
      elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
      Set_text_style( elt, "RO" );
      Calc_extent( elt );
      Set_model(elt,model);

      ypos -= 1.5*text_size;
    }

// label the ARC

    text = "ARC " + To_text(lengths[2],3);
    elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
    Set_text_style( elt, "RO" );
    Calc_extent( elt );
    Set_model(elt,model);

    ypos -= 1.5*text_size;

// label the SEC - drop perpendicular

    Real ch1,ch2,xf,yf,zf,dir,off;
    Drop_point(cl,xval[6],yval[6],0.0,xf,yf,zf,ch1,dir,off);

    text = "SEC " + To_text(Absolute(off),3);
    elt  = Create_text(text,xpos,ypos,text_size,colour,0.0,just,1);
    Set_text_style( elt, "RO" );
    Calc_extent( elt );
    Set_model(elt,model);

    ypos -= 1.5*text_size;
  }
  Prompt ("Finished");
}


