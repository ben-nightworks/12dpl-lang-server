//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 25 Jan 1996
// 4D Model             V3.0
// Version              1.0
// Macro Name           Newnames_01
// Type                 SOURCE
//
// Brief description
// routine to change names of strings
//---------------------------------------------------------------------
// Description
// routine to change names of selected strings
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

  Real        start;
  Text        stem;
  Integer     confirm;
}

void process_strings()
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Integer number = start;

  while(1) {

// strings

    Text new_name = stem + To_text(number);

    Prompt("Select next string - new name is <" + new_name + ">");

    Element str;

    while(1) {

      Integer ret = Select_string("Select next string",str);

      if(ret == -1) {

// reset name ?

        start = number;

        return; 
      } else if(ret != 1) {
        Prompt("Try again");
      } else {

        break;
      }
    }

    if(confirm) {

// ask for new name

      Text name;
      Get_name(str,name);

      Text msg = "Name is \"" + name + "\" - Enter new name <" + new_name + ">";

      Text rep;
      Prompt(msg,rep);
    }

// set new name

    Set_name(str,new_name);

    number++;
  }
}
Integer ask_for_stem()
// ---------------------------------------------------------------------
// get the stem
// ---------------------------------------------------------------------
{
  while(1) {

    if(Prompt("End new name stem ? ",stem) == 0) break;

    Text yn;
    Yes_no_prompt("Error with stem - try again ? ",yn);

    if(yn == "n" || yn == "N" || yn == "no" || yn == "NO") return(-1);
  }
  return(0);
}
Integer ask_for_start()
// ---------------------------------------------------------------------
// get the new start
// ---------------------------------------------------------------------
{
  while(1) {

    if(Prompt("Enter new start number ? ",start) == 0) break;

    Text yn;
    Yes_no_prompt("Error with start - try again ? ",yn);

    if(yn == "n" || yn == "N" || yn == "no" || yn == "NO") return(-1);
  }
  return(0);
}
Integer ask_for_confirm()
// ---------------------------------------------------------------------
// get confirm status
// ---------------------------------------------------------------------
{
  while(1) {

    Text yn;
    if(Yes_no_prompt("Confirm new name (y/n) ? ",yn) == 0) {

      if(yn == "n" || yn == "N" || yn == "no"  || yn == "NO")  confirm = 0;
      if(yn == "y" || yn == "Y" || yn == "yes" || yn == "YES") confirm = 1;

      break;
    }
  }
  return(0);
}
Text show_menu()
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{
  Text name;
  Menu menu = Create_menu("String names");

// stem

  name = stem;
  Create_button(menu,"New stem: " + name , "stem");

// start

  name = To_text(start);
  Create_button(menu,"Start: " + name , "start");

// confirm

  name = (confirm) ? "yes" : "no";
  Create_button(menu,"Confirm: " + name , "confirm");

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

  stem    = "";
  start   = 1;
  confirm = 1;

  while(1) {
    switch(show_menu()) {
      case "stem"        : { ask_for_stem();        } break;
      case "start"       : { ask_for_start();       } break;
      case "confirm"     : { ask_for_confirm();     } break;
      case "strings"     : { process_strings();     } break;
      case "finish"      : { goto done;             } break;
      default : {
        Error_prompt("Unknown option - press return");
      } break;
    }
  }

done:

  Prompt("Finished names");
}
