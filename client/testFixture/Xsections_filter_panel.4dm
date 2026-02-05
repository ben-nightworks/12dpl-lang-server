

#include "set_ups.H"


void manage_a_panel()
// ----------------------------------------------------------
// ----------------------------------------------------------
{

// create the panel

  Panel          panel   = Create_panel("Sections filter");
  Vertical_Group vgroup  = Create_vertical_group(0);
  Message_Box    message = Create_message_box(" ");

  Model_Box model_box      = Create_model_box("Model to filt",message,CHECK_MODEL_MUST_EXIST);
  Real_Box  real_box       = Create_real_box("Interval",message);
  Model_Box new_model_box  = Create_model_box("New model",message,CHECK_MODEL_CREATE);

  Append(model_box    ,vgroup);
  Append(real_box     ,vgroup);
  Append(new_model_box,vgroup);

// buttons along the bottom

  Horizontal_Group bgroup = Create_button_group();

  Button process = Create_button("&Process","count");
  Button finish  = Create_button("&Finish" ,"finish");

  Append(process,bgroup);
  Append(finish ,bgroup);
  
  Append(message,vgroup);
  Append(bgroup ,vgroup);
  Append(vgroup ,panel);
  
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

        Integer ierr;

        Model model;
        ierr = Validate(model_box,GET_MODEL_ERROR,model);
        if(ierr != MODEL_EXISTS) break;
        
        Real interval;
        ierr = Validate(real_box,interval);
        if(ierr != TRUE) break;

        if(interval <= 0) {
          
          Set_data(message,"interval must be positive");
          break;
        }

        Model new_model;
        ierr = Validate(new_model_box,GET_MODEL_CREATE,new_model);
        if(ierr != MODEL_EXISTS) break;
        
        Integer no_elts;
        Dynamic_Element elts;
        Get_elements(model,elts,no_elts);
        
        for(Integer i=1;i<=no_elts;i++) {
        
          Element elt;
          Text    elt_name;
          Get_item(elts,i,elt);
          Get_name(elt,elt_name);
          
          Dynamic_Text name_array;
          From_text(elt_name,name_array);
          
// get the first and second items

          Text design_text,ch_text;
          Real ch_real;
          
          Get_item(name_array,1,design_text);
          Get_item(name_array,2,ch_text);
         
          if(design_text != "design") {
          
            Set_data(message,"ERROR, model does not contain sections");
            break;
          }
          From_text(ch_text,ch_real);
          
          if(Mod(ch_real,interval)==0) {
            
            Element elt2;
            Element_duplicate(elt,elt2);
            Set_model(elt2,new_model);
          }
        }
        Integer no_sections=0;
        Dynamic_Element sec_elts;
        Get_elements(new_model,sec_elts,no_sections);
        Set_data(message,"#strings " + To_text(no_sections));
        Null(sec_elts);
 
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
