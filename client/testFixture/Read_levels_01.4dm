//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 5 Feb 1996
// 4D Model             V3.0
// Version              1.0
// Macro Name           Read_Levels_01
// Type                 SOURCE
//
// Brief description
// routine to change levels on 2d strings from a file
//---------------------------------------------------------------------
// Description
// routine to change levels on 2d strings from a file
//---------------------------------------------------------------------
// Update/Modification
// 4 Oct 1995 alg : updated macro to use new inbuilt calls

// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

Integer process()
// ---------------------------------------------------------------------
// ask all questions , then process
// ---------------------------------------------------------------------
{
  Text model_name;
  Model_prompt("Enter the model of 2d strings",model_name);

  if(Model_exists(model_name) == 0) return(1);

  Text file_name;
  File_prompt("Enter the file containing the 2d levels","*.lev",file_name);

  if(File_exists(file_name) == 0) return(2);

// storage for file reading

  Integer  no_strings = 0;
  Text     string_name [1024];
  Real     string_level[1024];
  Integer  string_used [1024];

// read the file

  File file;
  if(File_open(file_name,"r",file) != 0) return(3);

  Print("reading file\n");

  while(1) {

    Text text;
    if(File_read_line(file,text) != 0) break;

    Dynamic_Text words;
    From_text(text,words);

    Integer no_words;
    Get_number_of_items(words,no_words);

    if(no_words != 2) continue;

    Text word1,word2;

    if(Get_item(words,1,word1) != 0) continue;
    if(Get_item(words,2,word2) != 0) continue;

    Real level;
    if(From_text(word2,level) != 0) continue;

    if(no_strings > 1023) continue;

    no_strings++;

    string_name [no_strings] = word1;
    string_level[no_strings] = level;
    string_used [no_strings] = 0;
  }
  File_close(file);

  if(no_strings < 1) {
    Prompt("file has no valid lines\n");
    return(4);
  }

// loop through model finding all 2d strings

  Model model = Get_model(model_name);

  Integer         no_elements;
  Dynamic_Element elements;

  Get_elements(model,elements,no_elements);

  Integer count1 = 0;

  for(Integer i=1;i<=no_elements;i++) {

    Element element;
    Get_item(elements,i,element);

    Text type;
    Get_type(element,type);

    if(type != "2d") continue;

    Text name;
    Get_name(element,name);

// hunt for name in arrays

    Integer found = 0;
    for(Integer j=1;j<=no_strings;j++) {

      if(string_name[j] == name) {

        found          = 1;
        string_used[j] = 1;

        Set_2d_data(element,string_level[j]);
        break;
      }
    }
    if(found == 0) count1++;
  }
  Calc_extent(model);

  Integer count2 = 0;

  for(i=1;i<=no_strings;i++) {
    if(string_used[i] == 0) count2++;
  }

  if(count1 > 0 || count2 > 0) {

    Prompt(To_text(count1) + " names from model unused - " + To_text(count2) + " names from file unused");
    return(5);

  } else {

    Prompt("all strings in model updated");
  }
  return(0);
}
void main()
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
{
  if(process() != 0) return;
}

