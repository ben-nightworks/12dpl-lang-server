//---------------------------------------------------------------------
// Programmer           Yan Lin
// Date                 15/3/97
// 4D Model             V3.1
// Version              1.0
// Macro Name           Drawcross_01
// Type                 1
//
// Brief description
// Macro to create cross for specified strings. 
//---------------------------------------------------------------------
// Description
// Macro provide a pop up panel to ask user to select view, model or
// string, the crosses will be drawn for the string or the strings in 
// the selected view or model. User can also specify cross size, colour
// for these crosses.
//---------------------------------------------------------------------
// Update/Modification
//
//		Programmer			Van Hanh Cao
//		Date						09/07/99
//		4D Model				V4.0
// 		New Name				Drawcross_panel_01
//
// (C) Copyright 1990-1997 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------


#include "set_ups.H"


// Global declaration
{

  Text    				model_name 				= "0",
  								colour_name;
  Integer 				string_colour;
  Model   				string_model;
  Text    				text_size;
  Dynamic_Element de_cross;
  
}

Integer drawX(Real x, Real y, Real size, Text name,Dynamic_Element &de)
{

	Element 2d_string1, 2d_string2;

  2d_string1 = Create_2d(2);
  2d_string2 = Create_2d(2);
  
  Set_2d_data(2d_string1,0);
  Set_2d_data(2d_string2,0);
  Set_2d_data(2d_string1,1,x+size/2,y+size/2);
  Set_2d_data(2d_string1,2,x-size/2,y-size/2);

  Set_2d_data(2d_string2,1,x+size/2,y-size/2);
  Set_2d_data(2d_string2,2,x-size/2,y+size/2);
  
  Calc_extent(2d_string1);
  Calc_extent(2d_string2);
  
  Set_name(2d_string1,name);
  Set_name(2d_string2,name);
  
  Set_colour(2d_string1,string_colour);
  Set_colour(2d_string2,string_colour);

  Append(2d_string1, de);
  Append(2d_string2, de);
  
  return 0;
}

Integer cross(Dynamic_Element &de,Model model,Real size)
//---------------------------------------------------------------------
// Create a cross for each point in the strings
// from specified model.
//---------------------------------------------------------------------
{
  Integer no_strings,err = 0;

  Get_number_of_items(de,no_strings);

  if(no_strings == 0) return(err);

  Text            string_type,t,name,type;
  Element         string,2d_string;
  Integer         i,j,no_points,colour,f,mode;
  Real            x,y,z,r,xc,yc,zc,xe,ye,ze;
//  Dynamic_Element de_cross;
  for (i=1;i<=no_strings;i++) {

    Get_item(de,i,string);    
    Get_type(string,string_type);
    Get_name(string,name);
    Get_points(string,no_points);
    switch (string_type) {
      case "2d" : {
        if(no_points == 0) break;
        for(j=1;j<=2;j++) {
          Get_2d_data(string,j,x,y);
          drawX(x,y,size,name,de_cross);      
        } 
      } break;
      case "3d" : {
        if(no_points == 0) break;
        for(j=1;j<=no_points;j++) {
          Get_3d_data(string,j,x,y,z);
          drawX(x,y,size,name,de_cross); 
        }

        break;
      }
      case "4d" : {
        if(no_points == 0) break;
        for(j=1;j<=no_points;j++) {
          Get_4d_data(string,j,x,y,z,t);
          drawX(x,y,size,name,de_cross);
        }

        break;
      }
      case "Arc" : {
        if(no_points == 0) break;
        Get_arc_start(string,x,y,z);
        drawX(x,y,size,name,de_cross); 
        Get_arc_end(string,x,y,z);
        drawX(x,y,size,name,de_cross); 
        break;
     }
      case "Polyline" : {
        if(no_points == 0) break;

        for(j=1;j<=no_points;j++) {
          Get_polyline_data(string,j,x,y,z,r,f);
          drawX(x,y,size,name,de_cross); 
        }
        break;
      }
      case "Alignment" : 
      {
        if(no_points == 0) break;
        Integer SandE=0;
        no_points = no_points + 2;
        for(j=1;j<=no_points;j++) 
        {

          Get_hip_type(string,j,type);
          if (type=="IP") 
          {
            mode = 0;
            Get_hip_geom(string,j,mode,x,y);
            drawX(x,y,size,name,de_cross); 
          }
          else 
          {

              mode = 1;
              Get_hip_geom(string,j,mode,x,y);
              drawX(x,y,size,name,de_cross); 
              mode = 2;
              Get_hip_geom(string,j,mode,x,y);
              drawX(x,y,size,name,de_cross); 
          }
        };// for

      } break;
      default : 
      {
        
      } break;
    };// switch
  };// for

  Set_model(de_cross, model);
 
  return(err);
}

Integer opt_string(Element cross_string,Dynamic_Element &de_all)
{
  Append(cross_string,de_all);
  return (0);
}

Integer opt_model(Model_Box model_box,Dynamic_Element &de_all)
{
//  Get the model to create point numbers for
  Dynamic_Element de;
  Model cross_model;
  Text cross_model_name; 
model:
  Get_data(model_box,cross_model_name);

  if(!Model_exists(cross_model_name)) goto model;

  cross_model = Get_model(cross_model_name);

// check that there are strings in the model

  Integer no_strings,no_elt;

  Get_number_of_items(cross_model,no_strings);

  if(no_strings == 0) goto model;

//  cross_model = Get_model(cross_model_name);
  Get_elements(cross_model,de,no_elt);
  Append(de,de_all);
  Null(de);
  return (0);
}

Integer opt_view(View_Box view_box,Dynamic_Element &de_all,Text modelName)
{
//  Get the view to create point number for

  Text            cross_view_name,cross_model_name;
  View            cross_view;
  Dynamic_Text    de_names;
  Dynamic_Element de;
  Integer         i;
  Model           cross_model;
  
view:
  Get_data(view_box,cross_view_name);

  if(!View_exists(cross_view_name)) goto view;
  cross_view = Get_view(cross_view_name);

// Get the element of the view

  View_get_models(cross_view,de_names);

  Integer no_names,no_elt;

  Get_number_of_items(de_names, no_names);

  for (i=1; i<=no_names; i++) {
    Get_item(de_names, i, cross_model_name);
    cross_model = Get_model(cross_model_name);
    if (cross_model_name!=modelName) {
      Get_elements(cross_model,de,no_elt);
      Append(de,de_all);
    }
  }
  Null(de);
  return (0);
}

Integer delete_element()
{
  Integer i, no,ret;
  Element elt;

  Get_number_of_items(de_cross, no);

  for(i=no;i>=1;i--)
  {
     Get_item(de_cross, i, elt);
     ret = Element_delete(elt);
  }
  Null(de_cross);
  return 0;
}

void show_about(Panel parent)
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Panel          panel   = Create_panel("About");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Append(message,vgroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button finish = Create_button("Finish","finish");

  Append(finish,bgroup);

  Append(bgroup,vgroup);
  Append(vgroup,panel);

  Hide_widget(parent);
  Show_widget(panel);

  Integer doit = 1;

  while(doit) {

    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg);  // this processes standard messages first ?

    if(cmd == "keystroke") continue;

    switch(id) {

      case Get_id(panel) : {

        if(cmd == "Panel Quit") doit = 0;

      } break;

      case Get_id(finish) : {

        if(cmd == "finish") doit = 0;

      } break;
    }
  }
  Show_widget(parent);
}

void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Panel          panel   = Create_panel("Draw Crosses for String(s)");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

	Set_border(vgroup,"Create");

  Integer no_choices = 3;
  Text    choices[5];

	choices[1] = "String";
  choices[2] = "Model";
  choices[3] = "View";

  Choice_Box pages_box = Create_choice_box("Data source",message);

  Set_data(pages_box,no_choices,choices);
  Set_data(pages_box,choices[2]);

  Append(pages_box,vgroup);

// create 3 vertical groups for each page of widgets

	Horizontal_Group	g1	= Create_button_group();  			Set_border(g1,0,0);  //  Set_border(g1,"Page 1");
  Vertical_Group 		g2 	= Create_vertical_group(-1);  	Set_border(g2,0,0);  //  Set_border(g2,"Page 2");
  Vertical_Group 		g3 	= Create_vertical_group(-1);  	Set_border(g3,0,0);  //  Set_border(g3,"Page 3");

// add these groups to the pages widget

  Widget_Pages pages = Create_widget_pages();

	Append(g1,pages);
  Append(g2,pages);
  Append(g3,pages);
  
// page 1

#if 1

  Select_Box select_box = Create_select_box("&Pick a string","Pick a string",SELECT_STRING,message);

  Append(select_box,g1);
  
#else

	Message_Box				string_msg	= Create_message_box("No string selected");
	Select_Button			string_pick = Create_select_button("&Pick a string",SELECT_STRING,string_msg);

	Append(string_pick,g1);
	Append(string_msg ,g1);

#endif

// page 2

  Model_Box model_box = Create_model_box("Model to cross",message,CHECK_MODEL_MUST_EXIST);

  Append(model_box,g2);

// page 3

  View_Box view_box = Create_view_box("View to cross",message,CHECK_VIEW_MUST_EXIST);

  Append(view_box,g3);

// top of panel

  Append(pages_box,vgroup);
  Append(pages    ,vgroup);
  Append(message  ,vgroup);


// setting

	Vertical_Group	ogroup	= Create_vertical_group(0);
	
	Set_border(ogroup,"Settings for crosses");

	Model_Box 	model_box2 	= Create_model_box	("Model"		,message,CHECK_MODEL_MUST_EXIST);
	Colour_Box	colour_box	= Create_colour_box	("Colour"		,message);
	Input_Box		input_box		= Create_input_box	("Text size",message);
	
	
// Default values	
	Set_data(colour_box,"green");
	Set_data(input_box ,"5.0");
	
	Append(model_box2	,ogroup);
	Append(colour_box	,ogroup);
	Append(input_box	,ogroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button process = Create_button("&Run"   	 ,"count");
  Button reset	 = Create_button("&Undo"	 ,"reset");
  Button finish  = Create_button("&Finish"  ,"finish");

  Append(process      ,bgroup);
  Append(reset        ,bgroup);
  Append(finish       ,bgroup);

  Append(vgroup,panel);
  Append(ogroup,panel);
  Append(bgroup,panel);
  
// set page 2 active

  Integer page = 2;
  Set_page(pages,page);

  Show_widget(panel);

  Integer doit = 1;

  while(doit) {

    Integer id;
    Text    cmd;
    Text    msg;
    Integer ret = Wait_on_widgets(id,cmd,msg);  // this processes standard messages first ?

    if(cmd == "keystroke") continue;

  	Dynamic_Element de_all;

    switch(id) {

      case Get_id(panel) : {

        if(cmd == "Panel Quit") {
          doit = 0;
        } else if(cmd == "Panel About") {
          show_about(panel);
        }
      } break;

      case Get_id(finish) : {

        if(cmd == "finish") doit = 0;

      } break;

      case Get_id(pages_box) : {

        Text page_text;

        Integer ierr = Validate(pages_box,page_text);
        if(ierr != TRUE) {
          Set_data(message,"bad page");
          break;
        }
        if(page_text == choices[1]) {
        	page = 1;
        } else if(page_text == choices[2]) {
          page = 2;
        } else if(page_text == choices[3]) {
          page = 3;
        } else {
          page = 0;
        }
        Set_page(pages,page);

      } break;

			case Get_id(reset) : {
			
				delete_element();
				
			} break;
			
			
      case Get_id(process) : {

        Integer ierr;

// validate model

				if(page == 1) {

          Element string;

          ierr = Validate(select_box,string);
          if(ierr != TRUE) break;
          
        	Null(de_cross);
					Get_data(model_box2,model_name);
					if (model_name == "") {
						Set_data(message,"bad model name");
						break;
					} else {
						Model model = Get_model(model_name);
						ierr = Validate(model_box2,GET_MODEL_ERROR,model);
						if(ierr != MODEL_EXISTS) {
							Create_model(model_name);
							Set_data(message,"new model created");
						}
        		opt_string(string,de_all);
          }
          
				} else if(page == 2) {

          Model model;

          ierr = Validate(model_box,GET_MODEL_ERROR,model);
          if(ierr != MODEL_EXISTS) {
            Set_data(message,"bad model");
            break;
          }
          
					Null(de_cross);
					Get_data(model_box2,model_name);
					if (model_name == "") {
						Set_data(message,"bad model name");
						break;
					} else {
						Model nmodel = Get_model(model_name);
						ierr = Validate(model_box2,GET_MODEL_ERROR,nmodel);
						if(ierr != MODEL_EXISTS) {
							Create_model(model_name);
							Set_data(message,"new model created");
						}
       			opt_model(model_box,de_all);
       		}
       		
        } else if(page == 3) {

          View view;

          ierr = Validate(view_box,GET_VIEW_ERROR,view);
          if(ierr != VIEW_EXISTS) {
            Set_data(message,"bad view");
            break;
          }
  
					Null(de_cross);
					
					Get_data(model_box2,model_name);
					if (model_name == "") {
						Set_data(message,"bad model name");
						break;
					} else {
						Model model = Get_model(model_name);
						ierr = Validate(model_box2,GET_MODEL_ERROR,model);
						if(ierr != MODEL_EXISTS) {
							Create_model(model_name);
							Set_data(message,"new model created");
						}
						opt_view(view_box,de_all,model_name);
					}

        } else {

          Set_data(message,"bad choice");
          break;
        }

// display data

  			Real            size;

				Get_data(input_box ,text_size);
				Get_data(colour_box,colour_name);

     		From_text(text_size,size);
    		Convert_colour(colour_name,string_colour);
         
        ierr = Validate(model_box2,GET_MODEL_ERROR,string_model);
        if(ierr != MODEL_EXISTS) {
          Set_data(message,"bad model");
          break;				
				}
				cross(de_all,string_model,size);
				Set_data(message,"draw finished");
	    	break;
    		
      } break;
    }
  }
}


void main()
//---------------------------------------------------------
//
//---------------------------------------------------------
{

  manage_a_panel();
}


