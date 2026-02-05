//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 12/3/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Centres_01
// Type                 SOURCE
//
// Brief description
// Macro to create 2d point strings for all the centre points of arcs,
// polylines and alignment strings
//---------------------------------------------------------------------
// Description
// The model to output 2d point strings is selected when you first run
// this macro, and then the option panel is popped up. The options are
// "Model For Centre", "View","Model", "String" and "Finish", which allows
// you to create centre points in different ways. Those options except
// "Finish" option can be selected as many times as you want.
//---------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------
{
  Real    mindif = 1.0e-6;
}
Integer xeqy(Real x,Real y)
// -------------------------------------------------------
// function to test if x=y within a set tolerence
// -------------------------------------------------------
{
  if(Absolute(x - y) < mindif) return(1);

  return(0);
}

Real signn(Real value)
// -------------------------------------------------------
// function to return sign of a value
// -------------------------------------------------------
{
  if(value < 0.0) {
    return(-1.0);
  } else if(value > 0.0) {
    return( 1.0);
  }
  return( 0.0);
}
Integer get_centre(Real xs,Real ys,Real xe,Real ye,Real r,Integer f,Real &xc,Real &yc)

{
  if(xeqy(r,0.0)) return(-2);

  Real dx = xe - xs;
  Real dy = ye - ys;
  Real l  = Sqrt(dx*dx + dy*dy);

  if(xeqy(xs,xe) && xeqy(ys,ye)) return(-3);

  Real l2 = 0.5*l;

  if(Absolute(r) < l2) return(-4);

  Real s       = signn(r)*((f == 0) ? 1 : -1);
  Real rminusa = Sqrt(r*r - 0.25*l*l)*s;

  xc = 0.5*(xs + xe) + rminusa*(dy/l);
  yc = 0.5*(ys + ye) - rminusa*(dx/l);

  return(0);
}

Integer number_centers(Dynamic_Element de,Model points_model)
//---------------------------------------------------------------------
// Create a 4d string with point numbers for each point in the strings
// from setout_model.
// Begin the point numbers at start_no and leave start_no as the next
// point number.
//---------------------------------------------------------------------
{
  Integer no_strings,err = 0;

  Get_number_of_items(de,no_strings);

  if(no_strings == 0) return(err);

  Text            string_type,t,name,point_text,type;
  Element         string,2d_string;
  Integer         i,j,no_points,colour,break_type,points_defined = 0,f,mode;
  Real            x,y,z,r,xc,yc,zc,xe,ye,ze,xcen[100],ycen[100];

  for (i=1;i<=no_strings;i++) {

    Get_item(de,i,string);    
    Get_type(string,string_type);

    Get_points(string,no_points);
//    Error_prompt(To_text(no_points));
    switch (string_type) {
      case "Arc" : {
        if(no_points == 0) break;
        2d_string = Create_2d(1);
        Get_arc_centre(string,x,y,z);
        Set_2d_data(2d_string,1,x,y);

        points_defined = 1;
        break;
     }
      case "Polyline" : {
        if(no_points == 0) break;
        
        Integer n=1;
        for(j=2;j<=no_points;j++) {
          Get_polyline_data(string,j,xe,ye,ze,r,f);
          Get_polyline_data(string,(j-1),x,y,z,r,f);
          if(get_centre(x,y,xe,ye,r,f,xc,yc)==0) {
            xcen[n]=xc;
            ycen[n]=yc;
            n++;
          }
        }
        2d_string = Create_2d(xcen,ycen,0.0,(n-1));
        points_defined = 1;
        Null(xcen[100]);
        Null(ycen[100]);
        break;
      }
      case "Alignment" : {

        if(no_points == 0) break;

        Integer n=1;

        no_points = no_points + 2;

        for(j=1;j<=no_points;j++) {

          Get_hip_type(string,j,type);
          if (type!="IP") {
            mode = 3;
            Get_hip_geom(string,j,mode,x,y);
            xcen[n] = x;
            ycen[n] = y;
            n++; 
          }
        }

        2d_string = Create_2d(xcen,ycen,0.0,(n-1));
        points_defined = 1;
        Null(xcen[100]);
        Null(ycen[100]);
        break;
      }
      default : {
        break;
      }
    }
// Define the colour, breakline type and name of the 4d_string to be the
// same as the original string

    if(points_defined) {
      Calc_extent(2d_string);

      Get_colour(string,colour);
      Set_colour(2d_string,colour);

//    Set_breakline(2d_string,break_type);
      Set_breakline(2d_string,0);

      Get_name(string,name);
      Set_name(2d_string,name);

      Set_model(2d_string,points_model);
      points_defined = 0;
    }

  }
  return(err);
}

Text get_Option()
// ----------------------------------------------------------------
// ----------------------------------------------------------------
{
  Prompt("");

  Menu menu = Create_menu("Select Option");

  Create_button(menu,"Model For Centre" ,"model_points");
  Create_button(menu,"View"             ,"view");
  Create_button(menu,"Model"            ,"model");
  Create_button(menu,"String"           ,"string");
  Create_button(menu,"Finish"           ,"finish");

  Integer error,x = 100,y = -200;
  Text    reply;

  error = Display_relative(menu,x,y,reply);

  Menu_delete(menu);

  return(reply);
}

Integer opt_string(Dynamic_Element &de_all)
{
// Get the string to create point number to
 Integer ret;
 Element setout_string;

string:
  ret = Select_string("Select a string:", setout_string);

  if(ret == -1) {
    Prompt("Finished");
    return (0); 
  } else if(ret != 1) {
    Prompt("Try again ");
    goto string;
  }
  Append(setout_string,de_all);
  return (0);
}

Integer opt_model(Dynamic_Element &de_all)
{
//  Get the model to create point numbers for
  Dynamic_Element de;
  Model setout_model;
  Text setout_model_name; 
model:
  Model_prompt("Model to set out :",setout_model_name);

  if(!Model_exists(setout_model_name)) goto model;

//  output_only  = 0;
// check that there are strings in the model

  Integer no_strings,no_elt;

  Get_number_of_items(setout_model,no_strings);

  if(no_strings == 0) goto model;

  setout_model = Get_model(setout_model_name);
  Get_elements(setout_model,de,no_elt);
  Append(de,de_all);
  Null(de);
  return (0);
}

Integer opt_view(Dynamic_Element &de_all,Text points_model_name)
{
//  Get the view to create point number for

  Text            setout_view_name,setout_model_name;
  View            setout_view;
  Dynamic_Text    de_names;
  Dynamic_Element de;
  Integer         i;
  Model           setout_model;
view:
  View_prompt("View to set out :", setout_view_name);

  if(!View_exists(setout_view_name)) goto view;
  setout_view = Get_view(setout_view_name);

// Get the element of the view

  View_get_models(setout_view,de_names);

  Integer no_names,no_elt;

  Get_number_of_items(de_names, no_names);

  for (i=1; i<=no_names; i++) {
    Get_item(de_names, i, setout_model_name);
    setout_model = Get_model(setout_model_name);
    if (setout_model_name!=points_model_name) {
      Get_elements(setout_model,de,no_elt);
      Append(de,de_all);
    }
  }
  Null(de);
  return (0);
}

void main()
//---------------------------------------------------------------------
// Main program.
//---------------------------------------------------------------------
{

  Integer err,output_only = 0,ret;
  Text    points_model_name,option = "cancel";
  File    aga_file;
  Model   points_model;
  Dynamic_Element de,de_all;

//  get the model for the point strings

 points_model:
  Model_prompt("Model for points :",points_model_name);

  option = get_Option();
  while (option != "finish") {
    switch(option) {
      case "model_points": {
        goto points_model;
      }
      case "view": {
        opt_view(de_all,points_model_name);
        break;
      }
      case "model": {
        opt_model(de_all);
        break;
      }
      case "string": {
        opt_string(de_all);
        break;
      }
      case "finish": {
        Prompt("Macro canceled");
        break;
      }
      default: {
        Prompt("Macro canceled");
        return;
      }
    }

// Create points strings for centre points
    points_model = Get_model_create(points_model_name);

    number_centers(de_all,points_model);
    Null(de_all);
    option = get_Option();
  }
  Prompt("Macro finished");
}
