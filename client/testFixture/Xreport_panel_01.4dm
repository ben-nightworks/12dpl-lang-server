
// --------------------------------------------------------------------
// 4D Model             V4.0
// Version              1.0
// Macro Name           XReport_panel_01
// Type                 SOURCE
//
// Brief description
// Macro to report cross sections in CivilCAD, Moss or MainRoad QLD format.
//---------------------------------------------------------------------
// Description
// Macro to report cross sections in CivilCAD, Moss or MainRoad QLD format.
//---------------------------------------------------------------------
// Update/Modification
//
// (C) Copyright 1990-1999 by 4D Solutions Pty. Limited. All Rights Reserved
//
// This macro, or parts thereof, may not be reproduced in any form without
// permission of 4D Solutions Pty. Limited
//---------------------------------------------------------------------

// --------------------------------------------------------------------
// Macro:        XReport_panel_01
// Origin:			 XrptCivilCAD, XrptMoss, XrptQLD (Alan Gray)
// Author:       Van Hanh Cao
// Organization: 4D Solutions Pty Ltd
// Date:         Mon Jul 12 06:58:13 1999
// --------------------------------------------------------------------

#include "set_ups.H"

{
#define DESCRIPTION  "CL        DESIGN"

// report data

    Integer npts;
    Real    xarray[1000];
    Real    yarray[1000];
    Real    zarray[1000];
    Real    carray[1000];
    Text    tarray[1000];
  
}
Real distance(Real x1,Real y1,Real x2,Real y2)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Real dx = x2 - x1;
  Real dy = y2 - y1;

  return(Sqrt(dx*dx + dy*dy));
}
void cad_report_data(Element string,File report)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  if(npts == 0) return;

// calculate chainage values for xsection

  Real value;
  Text string_name;
  Text chainage;

  Get_name(string,string_name);

  if(From_text(Get_subtext(string_name,8,9999),value) == 0) {

    chainage = To_text(value,"%11.3lf");

  } else {

    chainage = "???????????";
  }

  Real chain;
  Get_chainage(string,chain);
  carray[1] = chain;

  Integer i = 1 , j = 2;

  for(;j<=npts;i=j++) {
    chain += distance(xarray[i],yarray[i],xarray[j],yarray[j]);
    carray[j] = chain;
  }

// now report xsection

  File_write_line(report,"    Cross Section \"" + string_name + "\"");
  File_write_line(report,"");
  File_write_line(report,"+----------+--------------+--------------+-------------+---------+");
  File_write_line(report,"  Chainage |    Offset    |    Height    | String Name | Description");
  File_write_line(report,"+----------+--------------+--------------+-------------+---------+");

  for(i=1;i<=npts;i++) {

    Text point_text  = To_text(i,"%5ld");
    Text offset_text = To_text(carray[i],"%12.4lf");
    Text height_text = To_text(zarray[i],"%12.4lf");
    
    Text complete_line  = "  " +
                          chainage + "  " +
                          offset_text + "  " +
                          height_text + "  " +
                          tarray[i] + DESCRIPTION;

// write out the line

    File_write_line(report,complete_line);
  }
  File_write_line(report,"+-------+--------------+--------------+----------------------+");
  File_write_line(report,"");
}
void moss_report_data(Element string,File report)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  if(npts == 0) return;

// calculate chainage values for xsection

  Real chain;
  Get_chainage(string,chain);

  carray[1] = chain;

  Integer i = 1 , j = 2;

  for(;j<=npts;i=j++) {
    chain += distance(xarray[i],yarray[i],xarray[j],yarray[j]);
    carray[j] = chain;
  }

  Text string_name;
  Get_name(string,string_name);

// now report xsection
// extract chainage from name

  Integer id;
  Get_id(string,id);

  Real xmin,xmax;
  Get_extent_x(string,xmin,xmax);  // xmax += 1.0;

  Real ymin,ymax;
  Get_extent_y(string,ymin,ymax);  // ymax += 1.0;

  File_write_line(report,"LABEL   SUBREF  CONTENTS NO.PTS    X -MIN   Y -MIN   X -MAX   Y -MAX RECORD LOC.");
  File_write_line(report,"");

  Text npts_text = To_text(npts,"%6ld");
  Text xmin_text = To_text(xmin,"%8.0lf");
  Text ymin_text = To_text(ymin,"%8.0lf");
  Text xmax_text = To_text(xmax,"%8.0lf");
  Text ymax_text = To_text(ymax,"%8.0lf");
  Text id_text   = To_text(id,"%6ld");

  Text label_line = "                         " +
                    npts_text + "  " +
                    xmin_text + " " +
                    ymin_text + " " +
                    xmax_text + " " +
                    ymax_text + " " +
                    id_text;

  File_write_line(report,label_line);
  File_write_line(report,"");

  Text chainage;
  Real value;

  if(From_text(Get_subtext(string_name,8,9999),value) == 0) {

    chainage = To_text(value,"%11.3lf");

  } else {

    chainage = "???????????";
  }

  File_write_line(report,"CHAINAGE " + chainage);
  File_write_line(report,"---------------------");
  File_write_line(report,"");
  File_write_line(report,"POINT   -----X----- -----Y------ ----Z----- ---OFFSET-- -LABEL CUT-");
  File_write_line(report,"");

  for(i=1;i<=npts;i++) {

    Text point_text  = To_text(i,"%5ld");
    Text xcoord_text = To_text(xarray[i],"%12.3lf");
    Text ycoord_text = To_text(yarray[i],"%12.3lf");
    Text zcoord_text = To_text(zarray[i],"%10.3lf");
    Text offset_text = To_text(carray[i],"%11.3lf");

    Text complete_line  = point_text + "  " +
                          xcoord_text + " " +
                          ycoord_text + " " +
                          zcoord_text + " " +
                          offset_text + " " +
                          tarray[i];

// write out the line

    File_write_line(report,complete_line);
  }
  File_write_line(report,"");
}
void qld_report_data(Element string,File report)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  if(npts == 0) return;

// calculate chainage values for xsection

  Real chain;
  Get_chainage(string,chain);

  carray[1] = chain;

  Integer i = 1 , j = 2;

  for(;j<=npts;i=j++) {
    chain += distance(xarray[i],yarray[i],xarray[j],yarray[j]);
    carray[j] = chain;
  }

  Text string_name;
  Get_name(string,string_name);

// now report xsection

  File_write_line(report,"    Cross Section \"" + string_name + "\"");
  File_write_line(report,"");
  File_write_line(report,"+-------+--------------+--------------+----------------------+");
  File_write_line(report,"  Point |    Offset    |    Height    | Description");
  File_write_line(report,"+-------+--------------+--------------+----------------------+");

  for(i=1;i<=npts;i++) {

    Text point_text  = To_text(i,"%5ld");
    Text offset_text = To_text(carray[i],"%12.4lf");
    Text height_text = To_text(zarray[i],"%12.4lf");
    
    Text complete_line  = "  " +
                          point_text + " | " +
                          offset_text + " | " +
                          height_text + " | " +
                          tarray[i];

// write out the line

    File_write_line(report,complete_line);
  }
  File_write_line(report,"+-------+--------------+--------------+----------------------+");
  File_write_line(report,"");
}
void report_3d(Element string,File report,Integer rpt_type)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Get_3d_data(string,xarray,yarray,zarray,1000,npts);

  for(Integer i=1;i<=npts;i++) {
    tarray[i] = "";
  }
  
  if     (rpt_type == 1)  cad_report_data(string,report);
  else if(rpt_type == 2)  moss_report_data(string,report);
  else if(rpt_type == 3)  qld_report_data(string,report);
}
void report_4d(Element string,File report,Integer rpt_type)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Get_4d_data(string,xarray,yarray,zarray,tarray,1000,npts);

  if     (rpt_type == 1)  cad_report_data (string,report);
  else if(rpt_type == 2)  moss_report_data(string,report);
  else if(rpt_type == 3)  qld_report_data (string,report);
}
void report_model(Model model,File report,Integer rpt_type)
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
{
  Integer         no_items,i;
  Dynamic_Element items;
  
  Get_elements(model,items,no_items);

  for(i=1;i<=no_items;i++) {

    Element item;
    Get_item(items,i,item);

    Text type;
    Get_type(item,type);

    if(type == "3d") {

      report_3d(item,report,rpt_type);
      
    } else if(type == "4d") {

      report_4d(item,report,rpt_type);
    }
  }
}
void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{
  Panel          panel     = Create_panel          ("X-Sections report");
  Vertical_Group vgroup    = Create_vertical_group (0);
  Message_Box    message   = Create_message_box    (" ");
	Model_Box			 model_box = Create_model_box      ("Model of X-sections" ,message,CHECK_MODEL_EXISTS);
	Choice_Box		 rptchoice = Create_choice_box     ("Report type"					,message);
	File_Box			 file_box  = Create_file_box       ("Report file name: "  ,message,CHECK_FILE_CREATE, "*.rpt");

	Append(model_box ,vgroup);
	Append(rptchoice ,vgroup);
	Append(file_box  ,vgroup);
	Append(message	 ,vgroup);
	
// Report types

  Integer no_choices = 3;
	Text	  choices[3];
	
	choices[1] = "CivilCAD";
	choices[2] = "Moss";
	choices[3] = "MainRoad QLD";
	
	Set_data(rptchoice,no_choices,choices);
	Set_data(rptchoice,choices[1]);
	
// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Set_border(bgroup,"Processing");

  Button process = Create_button("&Report"  ,"process");
  Button finish  = Create_button("&Finish"  ,"finish");

  Append(process      ,bgroup);
  Append(finish       ,bgroup);

  Append(bgroup,vgroup);
  Append(vgroup,panel);
  
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

      case Get_id(process) : {

// validate model
			
				Integer ierr;
        Model 	model;

        ierr = Validate(model_box,GET_MODEL_ERROR,model);
        if(ierr != MODEL_EXISTS) break;

// validate choice

				Text choice;
				ierr = Validate(rptchoice,choice);
				if(ierr != TRUE) break;
				
// validate file

				Text file_name;
				
				ierr = Validate(file_box,GET_FILE_CREATE,file_name);
				if(ierr != NO_FILE) break;

				File report;
				ierr = File_open(file_name,"w",report);
				if(ierr != 0) {

          Set_focus (file_box);
          Set_cursor_position(file_box);
          
				  Set_data(message,"eek - cannot write to file");
				  break;
				}

// write to file

				if      (choice == choices[1]) report_model(model,report,1);
        else if (choice == choices[2]) report_model(model,report,2);
        else if (choice == choices[3]) report_model(model,report,3);
        else {
				
          Set_data(message,"choice error");
          break;
        }
				
// report success

        File_close(report);
        Set_data(message,"report written");
				
      } break;
    }
  }

}
void main()
// --------------------------------------------------------
// this is where the macro starts
// --------------------------------------------------------
{
  manage_a_panel();
}
