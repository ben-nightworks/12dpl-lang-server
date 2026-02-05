//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 19/08/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           report4d_01
// Type                 SOURCE
//
// Brief description
// Macro to report 4d strings with x y z and 4d text or name of the 4d string.
//---------------------------------------------------------------------
// Description
// Macro to report 4d strings with x y z and 4d text or name of the 4d string.
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
  Model 	string_model;
  Text	model_name = "0";
  File  	xyz_file;
  Text  	flag = "name";
  Integer	dec_no = 3;

// menu position

  Integer menu_x = 600;
  Integer menu_y = 300;
  Integer menu_r = 1;

  Real    mindif = 1.0e-6;
}
Integer report_file()
//---------------------------------------------------------------------
// Write an xyz file for the point numbers in string_model
//---------------------------------------------------------------------
{
  Integer 	no_strings,err = 0;
  Text            	string_type,t,string_name;
  Dynamic_Element 	de;
  Element         	string;
  Integer         	i,j,no_points,point_no;
  Real            	x,y,z;
  Text		date,time;


  Date(date);
  Time(time);  
  File_write_line(xyz_file, "Model: "+model_name);
  File_write_line(xyz_file, "Time:  "+time);
  File_write_line(xyz_file, " ");
  File_write_line(xyz_file, "             X               Y                Z    Text");
  File_write_line(xyz_file, " ");

  Get_elements(string_model,de,no_strings);

  Text    fmt = "%14." + To_text(dec_no) + "lf";
  for (i=1;i<=no_strings;i++) {

    Get_item(de,i,string);    
    Get_points(string,no_points);
    if(no_points == 0) continue;

    Get_type(string,string_type);
    Get_name(string,string_name);

    if(string_type == "4d") {

      for(j=1;j<=no_points;j++) {
        Get_4d_data(string,j,x,y,z,t);
          switch(flag) {
            case "name": {
                File_write_line(xyz_file,"  "+"  "+To_text(x,fmt)+"  "+To_text(y,fmt)+
			  "  "+To_text(z,fmt)+"  "+string_name);
                break;
            }
            case "text": {

                File_write_line(xyz_file,"  "+"  "+To_text(x,fmt)+"  "+To_text(y,fmt)+
			  "  "+To_text(z,fmt)+"  "+t);
                break;
            }
            default:    {
              Prompt("Incorrect selection.");
              return 0;
            }

          }
      }
    }
  }
  return(err);
}
Text show_menu()
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{
  Text name;
  Menu menu = Create_menu("Report 4d strings");

  name = model_name;

  Create_button(menu,"Model: "     + name         , "model");
// end menu

  Create_button(menu,""               	     , "");
  Create_button(menu,"Report 4d string with name" , "name4d");
  Create_button(menu,"Report 4d string with text" , "text4d");
  Create_button(menu,"Finish"         	     , "finish");

// put up menu

  Prompt("Select an option");

  Text reply;
  if(menu_r) {
    Display_relative(menu,menu_x,menu_y,reply);
  } else {
    Display(menu,menu_x,menu_y,reply);
  }
  menu_r = 0;

  return(reply);
}

Integer ask_for_model()
// ---------------------------------------------------------------------
// get the model for the grid
// ---------------------------------------------------------------------
{
  while(1) {

    Model_prompt("Model name for the 4d string ? ",model_name);

    string_model = Get_model_create(model_name);
    if(Model_exists(string_model)) break;

    Text yn;
    Yes_no_prompt("Could not create the 4d string model - try again ? ",yn);

    if(yn == "n" || yn == "N" || yn == "no" || yn == "NO") return(-1);
  }
  return(0);
}
Integer opt_report()
{
// get the name of the setout file
  Dynamic_Element de_all;
  Text ans,file_name;

fname:
  File_prompt("Give name of the report file:","*.rpt",file_name);
  if(file_name == "") {
    Error_prompt("You should enter a file name, try again: ");
    goto fname;
  }


// if file exists, ask to Overwrite, Append or New name.
// O,o  A,a or N,n as first characters accepted

  if(File_exists(file_name)) {

    Text choice[3];

    choice[1] = "Overwrite";
    choice[2] = "Append";
    choice[3] = "New name";

choice:
    Choice_prompt("File exists - Overwrite, Append or New name",3,choice,ans);

    if(ans == choice[1]) {
      File_open(file_name,"w",xyz_file);
    } else if(ans == choice[2]) {
      File_open(file_name,"a",xyz_file);
    } else if(ans == choice[3]) {
      goto fname;
    } else {
      goto choice;
    }    
  } else {
    File_open(file_name,"w",xyz_file);
  }

  report_file();
  
  File_close(xyz_file);
  return 0;
}
void main()
{

  string_model = Get_model_create(model_name);
  while(1) {
    switch(show_menu()) {
      case "model"        : { ask_for_model();       } break;

      case "name4d"  : {
	  flag = "name";
	  opt_report();
      } break;

      case "text4d" : {
	  flag = "text";
            opt_report();
            
      } break;

      case "finish"       : { goto done;             } break;

      default : {
        Error_prompt("Unknown option - press return");
      } break;
    }
  }

done:

  Prompt("Macro finished");
}
