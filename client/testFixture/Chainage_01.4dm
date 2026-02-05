//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 20/10/94
// 4D Model             V2.5
// Version              1.0
// Macro Name           Chainage_01
// Type                 SOURCE

// Brief description
// Drop points onto a centre line and write out information in a file.
//---------------------------------------------------------------------
// Description
// Macro to select a centre line and then pick points which will be
// dropped onto the centre line.

// The chainages of the dropped points are labelled and also
// written out to a file.
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
  Integer ret;

// get model for chainages

  Text model_name;
  Model_prompt("Enter the model for chainages",model_name);

  Model model;
  if(model_name != "") model = Get_model_create(model_name);

// get a file that we can append the chainages to

  Text file_name;
  Prompt("Enter the file for chainages",file_name);

  File fd;
  if(file_name != "") File_open(file_name,"a",fd);

//

  Real    size = 8.0;
  Integer colour;
  Real    angle  = 0.0;

  Convert_colour("green",colour);

//

  Element cl;

  while(1) {

    Prompt("Select centre line string.");
    ret = Select_string("Select centre line string ? ",cl);
    if(ret == -1) {

      Prompt("macro aborted");
      return;

    } else if(ret == 1) {

      while(1) {

// get control point - and drop onto centreline

        Real    xd,yd,zd,cd,hd,dd;
        Element pt;

        Prompt("Select control point.");
        ret = Select_string("Select control point",pt,xd,yd,zd,cd,hd);
        if(ret == 1) {

          Real xt,yt,zt;
          Get_position(pt,cd,xt,yt,zt,dd);

          Real xf,yf,zf,cf,df,of;

          ret = Drop_point(cl,xd,yd,zd,xf,yf,zf,cf,df,of);
          if(ret == 0) {

// display found chainage

            Text chainage = To_text(cf,"%.3lf") , message = "Chainage = " + chainage;
            Prompt(message);

            if(model_name != "") {

//          Real    angle1 = df + Half_pi();
            Real    angle1 = dd;

              Element e = Create_text("Ch " + chainage,xd,yd,size,colour,angle1);
              Set_model(e,model);
            }
            if(file_name != "") {
              File_write_line(fd,chainage);
            }
          } else {
            Error_prompt("Drop point failed");
          }
        } else {
          break;
        }
      }
    } else {
      break;
    }
  }
  if(file_name != "") File_close(fd);

  Prompt("macro finished");
} 
