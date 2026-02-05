//---------------------------------------------------------------------
// Programmer           Lee Gregory
// Date                 22/6/96
// 4D Model             V3.0
// Version              1.0
// Macro Name           Delmodel_01
// Type                 SOURCE
//
// Brief description
// Delete all empty models in a project.
//---------------------------------------------------------------------
// Description
// Delete all empty models in a project.
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
//----------------------------------------------------------------------------
// Main Program
//----------------------------------------------------------------------------
{
  Integer num_of_models,num_del_models=0;
  
//  get the array of models

  Dynamic_Text project_models;

  Get_project_models(project_models);

  Get_number_of_items(project_models,num_of_models);

  Integer i,num_of_elts;
  Model   model;
  Text    model_name;

  for (i=1;i<=num_of_models;i++) {
    Get_item(project_models,i,model_name);
    model= Get_model(model_name);
    Get_number_of_items(model,num_of_elts);

    if(num_of_elts == 0) {
      Model_delete(model);
      Prompt(" " + model_name + " deleted");
      num_del_models++;
    }
  }
 
  Prompt(" " + To_text(num_del_models) + " models deleted");
}
