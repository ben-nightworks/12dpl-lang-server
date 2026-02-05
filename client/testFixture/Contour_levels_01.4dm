//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 10/24/95
// 4D Model             V3.0
// Version              1.0
// Macro Name           Contour_Levels_01
// Type                 SOURCE
//
// Brief description
// Macro to assist in changing contour levels
//---------------------------------------------------------------------
// Description
// Macro to assist in changing contour levels
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

// menu position

  Integer     menu_x = 600;
  Integer     menu_y = 300;
  Integer     menu_r = 1;

// values

  Real level,interval;
}

void process_strings()
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Real cont_level = level;

  while(1) {

// 2d string

    Prompt("Select 2d string");

    Element twod;

    while(1) {

      Integer ret = Select_string("Select 2d string",twod);

      if(ret == -1) {
        return; 
      } else if(ret != 1) {
        Prompt("Try again");
      } else {

        Text type_name;
        Get_type(twod,type_name);

        if(type_name == "2d") break;

        Prompt("not a 2d string - try again");
      }
    }

// ask for level

    Text msg = "Enter contour height <" + To_text(cont_level,3) + ">";

    while(1) {

      Text rep;
      Prompt(msg,rep);

      if(rep == "") break;

      if(From_text(rep,cont_level) == 0) break;

      Prompt("contour height is not a number");
    }

// set level

    Set_2d_data(twod,cont_level);
    Calc_extent(twod);

    cont_level += interval;
  }
}
Integer ask_for_interval()
// ---------------------------------------------------------------------
// get the interval
// ---------------------------------------------------------------------
{
  while(1) {

    if(Prompt("Contour interval ? ",interval) == 0) break;

    Text yn;
    Yes_no_prompt("Error with text size - try again ? ",yn);

    if(yn == "n" || yn == "N" || yn == "no" || yn == "NO") return(-1);
  }
  return(0);
}
Integer ask_for_level()
// ---------------------------------------------------------------------
// get the level
// ---------------------------------------------------------------------
{
  while(1) {

    if(Prompt("Contour level ? ",level) == 0) break;

    Text yn;
    Yes_no_prompt("Error with text size - try again ? ",yn);

    if(yn == "n" || yn == "N" || yn == "no" || yn == "NO") return(-1);
  }
  return(0);
}
Text show_menu()
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{
  Text name;
  Menu menu = Create_menu("Contour heights");

// height

  name = To_text(level,2);
  Create_button(menu,"Start level: " + name , "level");

// interval

  name = To_text(interval,2);
  Create_button(menu,"Interval: " + name , "interval");

// strings

  Create_button(menu,"Change strings" , "strings");

  Create_button(menu,"Finish" , "finish");

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
void main()
// ---------------------------------------------------------------------
// this is where everything starts
// ---------------------------------------------------------------------
{

// set up defaults

  level    = 0.0;
  interval = 5.0;

  while(1) {
    switch(show_menu()) {
      case "interval"    : { ask_for_interval();    } break;
      case "level"       : { ask_for_level();       } break;
      case "strings"     : { process_strings();     } break;
      case "finish"      : { goto done;             } break;
      default : {
        Error_prompt("Unknown option - press return");
      } break;
    }
  }

done:

  Prompt("Finished levels");
}
