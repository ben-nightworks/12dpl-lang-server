//---------------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 16/9/96
// 4D Model             V3.0
// Version              1.0
// Macro Name           Aligndiff_01
// Type                 SOURCE
//
// Brief description
// Take chainage position on a alignment string and report the z-values,
// z-values of a specified tin and difference of the values.
//---------------------------------------------------------------------------
// Description
// Macro to take the (x,y) position at a regular chainage on a
// selected alignment string in and produce a report giving
// the offset of the point, z-values at each point, the z-value on a 
// user specified tin and the difference of the values. This macro only
// process alignment 2d, 3d and 4d strings
//----------------------------------------------------------------------------
// Update/Modification
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//----------------------------------------------------------------------------

void process_al_elt(Tin tin,Element elt,Real interval,File file)
// ---------------------------------------------------------------------------
// Find the z-value on the tin, ztin, for each regular chainage point along
// the given string and write out the offset, z, ztin and diff
// Only process alignment, 2d, 3d and 4d strings
// ---------------------------------------------------------------------------
{
  Text    type,text,name;
  Real    dd,start_chainage,end_chainage,x,y,z,inst_dir,ztin,zdiff;

  Get_type(elt,type);
  Get_chainage(elt,start_chainage);
  Get_end_chainage(elt,end_chainage); 

  if(!(type =="Alignment" || type =="2d" || type == "3d" || type == "4d")) return;

  Get_name(elt,name);

  File_write_line(file,"\n\n String  "+name);
  File_write_line(file,"\n      chainage      exist rl     design rl"+
                       "          diff\n");

// Real begin = (start_chainage % interval)*interval - interval;
// For now just increment from the start chainage, rather than regular chainage

  for (dd=start_chainage;dd<=end_chainage;dd+=interval) {
 
    Get_position(elt,dd,x,y,z,inst_dir);

// get value on the tin at (x,y)

    if(Tin_height(tin,x,y,ztin) != 0) continue;
    zdiff = z - ztin;

    Text format = "%12.3lf";
    File_write_line(file,"  "+To_text(dd,format)+"  "+To_text(ztin,format)+
                         "  "+To_text(z,format)+"  "+To_text(zdiff,format));
  }
  return;
}

void main ()
// ---------------------------------------------------------------------------
//  Macro to take the (x,y) position for each chainage point along a string
//  and then produce a text string of the z-values at each point on the tin
// ---------------------------------------------------------------------------
{
  Text    tin_name,file_name;
  Tin     tin;
  Integer ret;
  Element elt;
  Real    interval = 0.0;

// select the string to process

start:

  Prompt("Select alignment string");

align:

  ret = Select_string("Select alignment string",elt);

  if(ret == -1) {
    Prompt("Finished");
//  File_close(file);
    return; 
  } else if(ret != 1) {
    Prompt("Try again ");
    goto align;
  }

  Text type_name;  Get_type(elt,type_name);

  if(type_name != "Alignment") {
    Prompt("not an alignment string - try again");
    goto align;
  }

// Get chainage interval

interval:

  if(Prompt("chainage interval ? ",interval) != 0) goto interval;
  if(interval <= 0.0) goto interval;

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

  Prompt("Processing");
  process_al_elt(tin,elt,interval,file);

//goto start;

  Prompt("Finished");
  File_close(file);
}
