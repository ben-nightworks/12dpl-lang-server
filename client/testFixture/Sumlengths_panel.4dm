//---------------------------------------------------------------------
// Programmer           Alan Gray
// Date                 15/09/95
// 4D Model             V2.5
// Version              1.0
// Macro Name           Sumlengths_01
// Type                 SOURCE
//
// Brief description
// Select a model and add up lengths of all strings to
// produce a total and an average length
//---------------------------------------------------------------------
// Description
// Select a model and add up lengths of all strings to
// produce a total and an average length
//---------------------------------------------------------------------
// Update/Modification
//
//		Programmer			Van Hanh Cao
//		Date						08/07/99
//		4D Model				V4.0
// 
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------


#include "set_ups.H"

Integer get_model_length(Model model, Text& text)
//---------------------------------------------------------------------
// This function return the total length of strings in a model
//---------------------------------------------------------------------
{

  Integer   			no_model_items;
  Dynamic_Element model_items;

  Get_elements(model,model_items,no_model_items);

  Real length = 0.0;
  
// Get length here
  for(Integer i=1;i<=no_model_items;i++) {

    Element elt;
    Get_item(model_items,i,elt);

    Real l;
    if(Get_length(elt,l) == 0) length += l;
  }
  Real avl = (no_model_items == 0) ? 0.0 : length/no_model_items;
  
  text = "Total length " + To_text(length,"%.3lf") + " Average " + To_text(avl,"%.3lf");
	
	return(0);
	
} // end get_model_length()


void main()
// --------------------------------------------------------
// this is where the macro starts
// --------------------------------------------------------
{

	Panel 						panel 	= Create_panel("Total length of all strings");
	Vertical_Group 		vgroup 	= Create_vertical_group(0);
	
	if(1) Set_border(vgroup, "-");
	
	Message_Box	  message 		=   Create_message_box(" ");
	Model_Box		  model_box 	=   Create_model_box("Model", message, CHECK_MODEL_MUST_EXIST);	
	Message_Box		result			=		Create_message_box(" ");
	
	Append(model_box,vgroup);
	Append(result		,vgroup);
	Append(message  ,vgroup);
	

// The button area

	Horizontal_Group	buttonGroup = Create_button_group();
	Set_border(buttonGroup, "Processing");
	
	Button run    = Create_button("&Run"   ,"run");
	Button finish = Create_button("&Finish","finish");
	
	Append(run   ,buttonGroup);
	Append(finish,buttonGroup);
	
	Append(buttonGroup,vgroup);
	Append(vgroup     ,panel);

	Set_data(message, "Model to sum lengths ? ");
	
	Integer doit = 1;
	
	Show_widget(panel);
	
  while(doit) {
	
    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg);  // this processes standard messages first ?

		if(cmd == "keystroke")
      continue;
    
    switch(id) {

      case Get_id(panel) : {

        if(cmd == "Panel Quit") doit = 0;

      } break;

      case Get_id(finish) : {

        if(cmd == "finish") doit = 0;

      } break;
      
      case Get_id(model_box) : {
         
      	Set_data(result,"");
      	Set_data(message, "Click 'Run' to get result");
      	      	
      } break;
      
      case Get_id(run) : {
        
// validate things

        Integer   ierr;
        Model     model;

        ierr = Validate(model_box,GET_MODEL_ERROR,model);
        if(ierr != MODEL_EXISTS) break;
        
        Set_data(message,"Finished, another model?");
        
       	Element   elt;
	      Integer   num_points;
	      Text			text;
	      
	      get_model_length(model, text);
	      
      	Set_data(result, text);
     	
      } break;
   
    } // end switch
	}

} // End main




