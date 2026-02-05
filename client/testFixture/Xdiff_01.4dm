//---------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 16/9/96
// 4D Model             V3.0
// Version              1.0
// Macro Name           Xdiff_01
// Type                 SOURCE
//
// Brief description
// Take x,y position on a x-section string and report the z-values,
// z-values of a specified tin and difference of the values.
//---------------------------------------------------------------------
// Description
// Macro to take the (x,y) position for each point on a x-section string
// in a model and produce a report  giving the offset of the point,
// z-values at each point, the z-value on a user specified tin and the
// difference of the values. This macro only process 2d, 3d and 4d strings
//---------------------------------------------------------------------
// Update/Modification
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

void process_elt(Tin tin,Element elt,File file)
// --------------------------------------------------------------------
// Find the z-value on the tin, ztin, for each point in elt
// and write out the offset, z, ztin and diff
// Only process 2d, 3d and 4d strings
// --------------------------------------------------------------------
{
  Text    type,text,name;
  Integer i,no_pts;
  Real    x,y,z,ztin,zdiff,offset;

  Get_type(elt,type);
  Get_points(elt,no_pts);

  if(!(type =="2d" || type == "3d" || type == "4d")) return;

  Get_name(elt,name);

  File_write_line(file,"\n\n X-section  "+name);
  File_write_line(file,"\n        offset      exist rl     design rl"+
                       "          diff\n");

  for (i=1;i<=no_pts;i++) {
    if(type == "2d") {
      Get_2d_data(elt,i,x,y);
    } else if (type == "3d") {
      Get_3d_data(elt,i,x,y,z);
   } else if (type == "4d") {
      Get_4d_data(elt,i,x,y,z,text);
   }

// get value on the tin at (x,y)

    if(Tin_height(tin,x,y,ztin) != 0) continue;

    zdiff = z - ztin;

// get chainage (which is the offset for a x-section) at (x,y) point 
    
    Real xf,yf,zf,dir,off;
    Text format = "%12.3lf";
    Drop_point(elt,x,y,z,xf,y,z,offset,dir,off);
    File_write_line(file,"  "+To_text(offset,format)+"  "+To_text(ztin,format)+
                         "  "+To_text(z,format)+"  "+To_text(zdiff,format));
  }
  return;
}

void main ()
// ---------------------------------------------------------------------------
//  Macro to take the (x,y) position for each point on a string and
//  then produce a text string of the z-values at each point on the tin
// ---------------------------------------------------------------------------
{
  Text    tin_name,model_name,file_name;
  Tin     tin;
  Model   model;

// get the name of the model of x-sections

get_model:

  Model_prompt("Give the name of the x-section model :",model_name);

  if(!Model_exists(model_name)) goto get_model;

   model = Get_model(model_name);

// get the name of the tin

get_tin:

  Tin_prompt("Give the name of the tin :",tin_name);

  if(!Tin_exists(tin_name)) goto get_tin;

   tin = Get_tin(tin_name);

// Get file for the report

  File file;

get_file:

  File_prompt("Report file :","*.rpt",file_name);
  File_open(file_name,"w",file);

// Get all the strings in the model and drop their nodes onto the tin

  Dynamic_Element  strings;
  Integer          no_strings,i;
  Element          elt;

  Prompt("Processing");

  Get_elements(model,strings,no_strings);

  for (i=1;i<=no_strings;i++) {
    Get_item(strings,i,elt);
    process_elt(tin,elt,file);
  }
  
  File_close(file);
  Prompt("Finished");
}
