//---------------------------------------------------------------------
// Programmer           Unknown
// Date                 14/3/95
// 4D Model             V3.0
// Version              1.0
// Macro Name           Drapaline_01
// Type                 SOURCE
//
// Brief description
// Drapes an alignment string onto a tin. Inserting vips at even
// chainages along the alignment string.
//---------------------------------------------------------------------
// Description 
// Drapes an alignment string onto a tin. Inserting vips at even
// chainages along the alignment string.
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

  Element al_string,dup_string;
  Integer ret,ret2;

  // Get model name
  Text model_name;
  Model_prompt("Enter the model for draped string",model_name);

  Model model;
  if(model_name != "") model = Get_model_create(model_name);

  
    Prompt("Select alignment string");
align:

    ret = Select_string("Select alignment string",al_string);
    if(ret == -1) {

      Prompt("macro aborted");
      return;  	

    } else if(ret == 1) {

	  Text type_name;  
    Get_type(al_string,type_name);

    if(type_name != "Alignment") {
     Prompt("Not an alignment string - try again");
    goto align;
     }

      //Create a duplicate of the Element al_string and return it as the Element dup_string.
      //A function return value of zero indicates the duplication was successful. 

      ret2 = Element_duplicate(al_string,dup_string);
      if (ret2 == 0) {
//        Prompt("Duplication successful");         

          // Sets the 4D Model model of the Element dup_string to be Model model.
          // If elt is already in a model, then it is moved to the Model model.
          // If elt is not in a model, then elt is added to the Model model.
          // A function return value of zero indicates the model was successfully set.

          Integer ret4;
          ret4 = Set_model(dup_string,model); 
      }  
      else if (ret2 !=0)
        Prompt("Duplication unsuccessful");   

      // get name of tin to drape onto     
      Text tin_name;
      Tin_prompt("Enter the tin to drape align. string onto:",tin_name);

      Get_tin(tin_name);

      Tin tin;
      if(tin_name != "") tin = Get_tin(tin_name);
      

      // ask for increment
      Integer incr;
      Prompt("Enter vip increment:",incr); 
//      Prompt(To_text(incr));     

      // Get the start chainage of the Element elt.
      // The start chainage is returned by the Real start_chain.
      // A function return value of zero indicates the chainage was returned successfully.

      Real start_ch=0;
      Integer ret3;
      ret3 = Get_chainage(dup_string,start_ch);
      if (ret3 == 0) 
        Prompt(To_text(start_ch,3));        
      else
        Prompt("Start chainage unsuccessful");   


      // Calculate the end chainage
      // Get the plan length of the string (which equals end chainage minus the start chainage)
      // A function return value of zero indicates the plan length was successfully returned.

      Real length;
      Real end_ch,second_ch;
      Integer ret5;
      Real x,y,height,dirn;

      ret5 = Get_length(dup_string,length);
      end_ch =start_ch+length;
      Prompt("End chainage = " + To_text(end_ch,3));

      // delete existing vip points
      // Get the number of vips, num_pts, in the Alignment string dup_string.
      // A function return value of zero indicates the number of vip points was successfully returned.
      Integer num_pts,i,ret_pts;
      ret_pts=Get_vip_points(dup_string,num_pts);
      if (ret_pts==0)
        for(i=1;i<=num_pts;i++) 
          Delete_vip(dup_string,1);
        
      
      // Append Vip points

      Real chainage;
      Get_position(dup_string,start_ch,x,y,height,dirn);
      Tin_height(tin,x,y,height);
      Prompt("Vip Height " + To_text(height,3));
       if (Is_null(height)==0)     // If tin not null at start chainage
         Append_vip(dup_string,start_ch,height);   // append vip at start chainage
        
       second_ch=start_ch-Mod(start_ch,incr)+incr;  // calculate second chainage (even chainage)

      // append vips at each chainage increment, (at even chainages) until end chainage     
      for(chainage = second_ch;chainage<end_ch; chainage=chainage+incr) {

        // Get the (x,y,z) position and instantaneous direction (inst_dir - as an angle, measured in radians) of a point on the string at chainage ch.
        // A function return value of zero indicates success.
        Integer ret6;        
      
        ret6 = Get_position(dup_string,chainage,x,y,height,dirn);

        // Get the height of the tin at the point (x,y).
        // If (x,y) is outside the tin, then an error has occurred and a non zero function return value is set.
        // A function return value of zero indicates the height was successfully returned.

        Integer ret7;
        ret7 = Tin_height(tin,x,y,height);
        Prompt("Vip Height " + To_text(height,3));


        // Append a vertical intersection point (vip) with chainage-height co ordinates (chainage,height) to the 
        // Element dup_string. The parabolic curve length is set to zero.
        // The order in which the vips are appended is taken as the order of the vips in the Alignment string.
        // The vips must be appended in order of increasing chainage along the Alignment string.
        // Append_vip is used to place the first vip as well as the subsequent vips.
        // A function return value of zero indicates the vip was appended successfully.
        Integer ret8,ret9;
        ret9=Is_null(height);

        if (ret9==0) 
          ret8=Append_vip(dup_string,chainage,height);        

      } // end for() loop

      Get_position(dup_string,end_ch,x,y,height,dirn);
      Tin_height(tin,x,y,height);
      Prompt("Vip Height " + To_text(height,3));
       if (Is_null(height)==0)     // If tin not null at end chainage
         Append_vip(dup_string,end_ch,height);   // append vip at end chainage
      
    } // end else  

//  calc_extent


// end main()

}
