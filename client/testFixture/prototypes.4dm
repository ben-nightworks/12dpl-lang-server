
// ----------------------------------------------------------------------------------------------------------
//  4d supplied library calls
// ----------------------------------------------------------------------------------------------------------

 Integer Get_program_version_number       () L_Get_Program_Version_Number;
 Integer Get_program_major_version_number () L_Get_Program_Major_Version_Number;
 Integer Get_program_minor_version_number () L_Get_Program_Minor_Version_Number;
 Integer Get_program_folder_version_number() L_Get_Program_Folder_Version_Number;
 Integer Get_program_build_number         () L_Get_Program_Build_Number;
 Text    Get_program_special_build_name   () L_Get_Program_Special_Build_Name;
 Text    Get_program_patch_version_name   () L_Get_Program_Patch_Version_Name;
 Text    Get_program_full_title_name      () L_Get_Program_Full_Title_Name;
 Text    Get_program                      () L_Get_Program;
 Text    Get_program_name                 () L_Get_Program_Name;
 Text    Get_program_folder               () L_Get_Program_Folder;
 Text    Get_program_parent_folder        () L_Get_Program_Parent_Folder;

// stack trace

 void    Print_stack_trace() L_Print_Stack_Trace;
 void    Print_stack_trace(Text msg) L_Print_Stack_Trace_Msg;
 Integer Get_stack_trace(Dynamic_Integer &stack) L_Get_Stack_Trace;

// converting escape characters

 Integer Any_escape_characters    (Text text) L_Any_Escape_Characters;
 Text    Convert_escape_characters(Text text) L_Convert_Escape_Characters;

// sorting

 Integer Quick_sort(Integer count,Integer index[],Integer array[])  L_Quick_Sort_Integer;
 Integer Quick_sort(Integer count,Integer index[],Real    array[])  L_Quick_Sort_Real;
 Integer Quick_sort(Integer count,Integer index[],Text    array[])  L_Quick_Sort_Text;

// Algebra calls

// vector calls

 Integer Set_vector(Vector2 &vector,Real value) L_Vector2_Set;
 Integer Set_vector(Vector3 &vector,Real value) L_Vector3_Set;
 Integer Set_vector(Vector4 &vector,Real value) L_Vector4_Set;

 Integer Set_vector(Vector2 &vector,Real  x,Real  y)                 L_Vector2_Set_All;
 Integer Set_vector(Vector3 &vector,Real  x,Real  y,Real  z)         L_Vector3_Set_All;
 Integer Set_vector(Vector4 &vector,Real  x,Real  y,Real  z,Real  w) L_Vector4_Set_All;

 Integer Get_vector(Vector2 &vector,Real &x,Real &y)                 L_Vector2_Get_All;
 Integer Get_vector(Vector3 &vector,Real &x,Real &y,Real &z)         L_Vector3_Get_All;
 Integer Get_vector(Vector4 &vector,Real &x,Real &y,Real &z,Real &w) L_Vector4_Get_All;

 Integer Set_vector(Vector2 &vector,Integer index,Real  value) L_Vector2_Set_Index;
 Integer Set_vector(Vector3 &vector,Integer index,Real  value) L_Vector3_Set_Index;
 Integer Set_vector(Vector4 &vector,Integer index,Real  value) L_Vector4_Set_Index;

 Integer Get_vector(Vector2 &vector,Integer index,Real &value) L_Vector2_Get_Index;
 Integer Get_vector(Vector3 &vector,Integer index,Real &value) L_Vector3_Get_Index;
 Integer Get_vector(Vector4 &vector,Integer index,Real &value) L_Vector4_Get_Index;

 Real    Get_vector(Vector2 &vector,Integer index) L_Vector2_Get_Index_Ex;
 Real    Get_vector(Vector3 &vector,Integer index) L_Vector3_Get_Index_Ex;
 Real    Get_vector(Vector4 &vector,Integer index) L_Vector4_Get_Index_Ex;

 Integer Get_vector_length        (Vector2 &vector,Real &value)      L_Vector2_Get_Length;
 Integer Get_vector_length        (Vector3 &vector,Real &value)      L_Vector3_Get_Length;
 Integer Get_vector_length        (Vector4 &vector,Real &value)      L_Vector4_Get_Length;

 Real    Get_vector_length        (Vector2 &vector)      L_Vector2_Get_Length_Ex;
 Real    Get_vector_length        (Vector3 &vector)      L_Vector3_Get_Length_Ex;
 Real    Get_vector_length        (Vector4 &vector)      L_Vector4_Get_Length_Ex;

 Integer Get_vector_length_squared(Vector2 &vector,Real &value)      L_Vector2_Get_Length_Squared;
 Integer Get_vector_length_squared(Vector3 &vector,Real &value)      L_Vector3_Get_Length_Squared;
 Integer Get_vector_length_squared(Vector4 &vector,Real &value)      L_Vector4_Get_Length_Squared;

 Real    Get_vector_length_squared(Vector2 &vector)      L_Vector2_Get_Length_Squared_Ex;
 Real    Get_vector_length_squared(Vector3 &vector)      L_Vector3_Get_Length_Squared_Ex;
 Real    Get_vector_length_squared(Vector4 &vector)      L_Vector4_Get_Length_Squared_Ex;

 Integer Get_vector_normalize     (Vector2 &vector,Vector2 &normalised) L_Vector2_Get_Normalise;
 Integer Get_vector_normalize     (Vector3 &vector,Vector3 &normalised) L_Vector3_Get_Normalise;
 Integer Get_vector_normalize     (Vector4 &vector,Vector4 &normalised) L_Vector4_Get_Normalise;

 Vector2 Get_vector_normalize     (Vector2 &vector) L_Vector2_Get_Normalise_Ex;
 Vector3 Get_vector_normalize     (Vector3 &vector) L_Vector3_Get_Normalise_Ex;
 Vector4 Get_vector_normalize     (Vector4 &vector) L_Vector4_Get_Normalise_Ex;

 Integer Get_vector_homogenize    (Vector3 &vector,Vector3 &normalised) L_Vector3_Get_Homogenize;
 Integer Get_vector_homogenize    (Vector4 &vector,Vector4 &normalised) L_Vector4_Get_Homogenize;

 Vector3 Get_vector_homogenize    (Vector3 &vector) L_Vector3_Get_Homogenize_Ex;
 Vector4 Get_vector_homogenize    (Vector4 &vector) L_Vector4_Get_Homogenize_Ex;

// matrix calls

 Integer Set_matrix_zero     (Matrix3 &matrix) L_Matrix3_Set_Zero;
 Integer Set_matrix_zero     (Matrix4 &matrix) L_Matrix4_Set_Zero;

 Integer Set_matrix_identity (Matrix3 &matrix) L_Matrix3_Set_Identity;
 Integer Set_matrix_identity (Matrix4 &matrix) L_Matrix4_Set_Identity;

 Integer Set_matrix          (Matrix3 &matrix,Real value) L_Matrix3_Set;
 Integer Set_matrix          (Matrix4 &matrix,Real value) L_Matrix4_Set;

 Integer Set_matrix          (Matrix3 &vector,Integer row,Integer col,Real  value) L_Matrix3_Set_Index;
 Integer Set_matrix          (Matrix4 &vector,Integer row,Integer col,Real  value) L_Matrix4_Set_Index;

 Integer Get_matrix          (Matrix3 &vector,Integer row,Integer col,Real &value) L_Matrix3_Get_Index;
 Integer Get_matrix          (Matrix4 &vector,Integer row,Integer col,Real &value) L_Matrix4_Get_Index;

 Real    Get_matrix          (Matrix3 &vector,Integer row,Integer col) L_Matrix3_Get_Index_Ex;
 Real    Get_matrix          (Matrix4 &vector,Integer row,Integer col) L_Matrix4_Get_Index_Ex;

 Integer Set_matrix_row      (Matrix3 &matrix,Integer row,Vector3 &vector) L_Matrix3_Set_Row;
 Integer Set_matrix_row      (Matrix4 &matrix,Integer row,Vector4 &vector) L_Matrix4_Set_Row;

 Integer Get_matrix_row      (Matrix3 &matrix,Integer row,Vector3 &vector) L_Matrix3_Get_Row;
 Integer Get_matrix_row      (Matrix4 &matrix,Integer row,Vector4 &vector) L_Matrix4_Get_Row;

 Vector3 Get_matrix_row      (Matrix3 &matrix,Integer row) L_Matrix3_Get_Row_Ex;
 Vector4 Get_matrix_row      (Matrix4 &matrix,Integer row) L_Matrix4_Get_Row_Ex;

 Integer Get_matrix_transpose(Matrix3 &source,Matrix3 &target) L_Matrix3_Get_Transpose;
 Integer Get_matrix_transpose(Matrix4 &source,Matrix4 &target) L_Matrix4_Get_Transpose;

 Matrix3 Get_matrix_transpose(Matrix3 &source) L_Matrix3_Get_Transpose_Ex;
 Matrix4 Get_matrix_transpose(Matrix4 &source) L_Matrix4_Get_Transpose_Ex;

 Integer Get_matrix_inverse  (Matrix3 &source,Matrix3 &target) L_Matrix3_Get_Inverse;
 Integer Get_matrix_inverse  (Matrix4 &source,Matrix4 &target) L_Matrix4_Get_Inverse;

 Matrix3 Get_matrix_inverse  (Matrix3 &source) L_Matrix3_Get_Inverse_Ex;
 Matrix4 Get_matrix_inverse  (Matrix4 &source) L_Matrix4_Get_Inverse_Ex;

 Integer Swap_matrix_rows    (Matrix3 &matrix,Integer row1,Integer row2) L_Matrix3_Swap_Rows;
 Integer Swap_matrix_rows    (Matrix4 &matrix,Integer row1,Integer row2) L_Matrix4_Swap_Rows;

 Integer Swap_matrix_cols    (Matrix3 &matrix,Integer col1,Integer col2) L_Matrix3_Swap_Cols;
 Integer Swap_matrix_cols    (Matrix4 &matrix,Integer col1,Integer col2) L_Matrix4_Swap_Cols;

 Integer Get_translation_matrix(Vector2 &vector           ,Matrix3 &matrix) L_Matrix3_Get_Translation;
 Integer Get_translation_matrix(Vector3 &vector           ,Matrix4 &matrix) L_Matrix4_Get_Translation;

 Matrix3 Get_translation_matrix(Vector2 &vector           ) L_Matrix3_Get_Translation_Ex;
 Matrix4 Get_translation_matrix(Vector3 &vector           ) L_Matrix4_Get_Translation_Ex;

 Integer Get_rotation_matrix   (Vector2 &centre,Real angle,Matrix3 &matrix) L_Matrix3_Get_Rotation;
 Integer Get_rotation_matrix   (Vector3 &axis,Real angle  ,Matrix4 &matrix) L_Matrix4_Get_Rotation;

 Matrix3 Get_rotation_matrix   (Vector2 &centre,Real angle) L_Matrix3_Get_Rotation_Ex;
 Matrix4 Get_rotation_matrix   (Vector3 &axis,Real angle  ) L_Matrix4_Get_Rotation_Ex;

 Integer Get_scaling_matrix    (Vector2 &scale            ,Matrix3 &matrix) L_Matrix3_Get_Scale;
 Integer Get_scaling_matrix    (Vector3 &scale            ,Matrix4 &matrix) L_Matrix4_Get_Scale;

 Matrix3 Get_scaling_matrix    (Vector2 &scale            ) L_Matrix3_Get_Scale_Ex;
 Matrix4 Get_scaling_matrix    (Vector3 &scale            ) L_Matrix4_Get_Scale_Ex;

 Integer Get_perspective_matrix(Real d                    ,Matrix4 &matrix) L_Matrix4_Get_Perspective;

 Matrix4 Get_perspective_matrix(Real d                    ) L_Matrix4_Get_Perspective_Ex;

// GUID generation

 Integer GUID_Gen(Integer format,Integer classic,Integer comment,Text &guid) L_GUID_Gen;

// sort of obsolete? Use the above calls

 void Get_4dmodel_version(Integer &major,Integer &minor,Text &patch) L_Get_4D_Model_Version;

//Integer V6_only() L_V6_Only;

 Integer Create_macro(Text macro_name,Integer run_now) L_Create_Macro;

 Text    Get_macro_name() L_Get_Macro_Name;
 Integer Get_module_license(Text module_name) L_Get_Module_License;
 Text    Get_host_id() L_Get_Host_ID;

 Integer Get_number_of_command_arguments() L_Get_Number_of_Command_Arguments;
 Integer Get_command_argument(Integer argno,Text &argument) L_Get_Command_Argument;

 Integer Run_chain(Text chain) L_Run_Chain;

 Text    Language(Text english,Text foreign) L_Language_Text;

 Integer Project_save()                    L_Project_Save;
 Integer Program_exit(Integer ignore_save) L_Program_Exit;

 void    Exit(Integer code) L_Exit_Macro;
 void    Exit(Text    code) L_Exit_Macro_Text;

 void    Destroy_on_exit() L_Destroy_On_Exit;
 void    Retain_on_exit()  L_Retain_On_Exit;

 Integer Get_project_name  (Text &name) L_Get_Project_Name;
 Integer Get_user_name     (Text &name) L_Get_User_Name;
 Integer Get_project_folder(Text &name) L_Get_Project_Folder;

// lots of uid calls

 Integer Get_next_id () L_Get_Next_ID;
 Uid     Get_next_uid() L_Get_Next_UID;

 Integer Get_last_id () L_Get_Last_ID;
 Uid     Get_last_uid() L_Get_Last_UID;

 Integer Convert_uid (Uid     uid,Text    &txt) L_Convert_Uid_To_Text;
 Integer Convert_uid (Uid     uid,Integer &id ) L_Convert_Uid_To_Integer;
 Integer Convert_uid (Text    txt,Uid     &uid) L_Convert_Text_To_Uid;
 Integer Convert_uid (Integer id ,Uid     &uid) L_Convert_Integer_To_Uid;

 Text    To_text   (Uid  uid)           L_Uid_To_Text;
 Integer From_text (Text text,Uid &uid) L_Uid_From_Text;

 void    Null      (Uid &uid) L_Uid_Null;
 Integer Is_null   (Uid  uid) L_Uid_Is_Null;

 Integer Is_valid  (Uid  uid) L_Uid_Is_Valid;
 Integer Is_unknown(Uid  uid) L_Uid_Is_Unknown;
 Integer Is_global (Uid  uid) L_Uid_Is_Global;

// only function uids use these

 Integer Is_contour (Uid  uid) L_Uid_Is_Contour;
 Integer Is_plot    (Uid  uid) L_Uid_Is_Plot;
 Integer Is_function(Uid  uid) L_Uid_Is_Function;

// Guid calls

 Integer Convert_guid (Guid    guid,Text    &txt ) L_Convert_Guid_To_Text;
 Integer Convert_guid (Text    txt ,Guid    &guid) L_Convert_Text_To_Guid;

 Text    To_text   (Guid  guid)           L_Guid_To_Text;
 Integer From_text (Text text,Guid &guid) L_Guid_From_Text;
 
// Attribute_Blob

 Text    To_text   (Attribute_Blob  blob)           L_Attribute_Blob_To_Text;
 Integer From_text (Text text,Attribute_Blob &blob) L_Attribute_Blob_From_Text; 
 
//

 Text Getenv             (Text env) L_Getenv;
 Text Find_system_file   (Text new_file_name,Text old_file_name,Text env) L_System_Find_File;

 Integer Is_practise_version() L_Get_4D_Model_Practise_Version;

// wait for so many milli-sections

 Integer Sleep(Integer milliseconds) L_Sleep_Milliseconds;

// console calls

 void    Clear_console       ()           L_Clear_Console;

 Integer Show_console        (Integer tf) L_Show_Console;
 Integer Is_console_visible  ()           L_Console_Visible;

 Integer Float_console       (Integer tf) L_Float_Console;
 Integer Is_console_floating ()           L_Console_Floating;

 Integer Set_console_position(Integer  x,Integer  y,Integer  w,Integer  h) L_Set_Console_Position;
 Integer Get_console_position(Integer &x,Integer &y,Integer &w,Integer &h) L_Get_Console_Position;

 Integer Minimize_console    (Integer tf) L_Minimize_Console;
 Integer Is_console_minimized()           L_Console_Minimized;

 Integer Console_to_clipboard()           L_Console_To_Clipboard;

// clipboard

 Integer Set_clipboard_text(Text  text) L_Set_Clipboard_Text;
 Integer Get_clipboard_text(Text &text) L_Get_Clipboard_Text;

// undo redo

 Undo Add_undo_add   (Text name,Element elt                     ) L_Undo_Add;
 Undo Add_undo_add   (Text name,Dynamic_Element elts            ) L_Undo_Add_List;
 Undo Add_undo_change(Text name,Element original,Element updated) L_Undo_Change;
 Undo Add_undo_delete(Text name,Element old,Integer copy        ) L_Undo_Undelete;
 Undo Add_undo_range (Text name,Integer id1,Integer id2         ) L_Undo_Add_Project_ID_Range;
 Undo Add_undo_range (Text name,Uid     id1,Uid     id2         ) L_Undo_Add_Project_UID_Range;
 Undo Add_undo_list  (Text name,Undo_List list                  ) L_Undo_Add_Undo_List;

 Integer Null               (Undo_List &undo) L_Undo_List_Reset;                                // removes elements from the list
 Integer Get_number_of_items(Undo_List &undo,Integer &count) L_Undo_List_Number_of_Elements;    // the number of elements currently
 Integer Get_item           (Undo_List &undo,Integer index,Undo &undo) L_Undo_List_Get_Undo;    // gets  the zero based ith element
 Integer Set_item           (Undo_List &undo,Integer index,Undo undo)  L_Undo_List_Set_Undo;    // sets  the zero based ith element
 Integer Append             (Undo_List from,Undo_List &to) L_Undo_List_Append_Undo_List;        // append contents of one list to another
 Integer Append             (Undo      from,Undo_List &to) L_Undo_List_Append_Undo;             // append contents of one list to another

// null values

 Integer Is_null(Real value)  L_Is_Null;
 void    Null   (Real &value) L_Set_Null;

// maths calls (standard C library)

 Real Sin     (Real value) L_Sin;
 Real Cos     (Real value) L_Cos;
 Real Tan     (Real value) L_Tan;
 Real Asin    (Real value) L_Asin;
 Real Acos    (Real value) L_Acos;
 Real Atan    (Real value) L_Atan;
 Real Sinh    (Real value) L_Sinh;
 Real Cosh    (Real value) L_Cosh;
 Real Tanh    (Real value) L_Tanh;
 Real Exp     (Real value) L_Exp;
 Real Log     (Real value) L_Log;
 Real Log10   (Real value) L_Log10;
 Real Sqrt    (Real value) L_Sqrt;
 Real Ceil    (Real value) L_Ceil;
 Real Floor   (Real value) L_Floor;
 Real Absolute(Real value) L_Fabs;

 Integer Absolute(Integer) L_Iabs;

 Real Atan2   (Real dy,Real dx)       L_Atan2;
 Real Pow     (Real v1,Real v2) L_Pow;
 Real Mod     (Real v1,Real v2) L_Fmod;
 Real Ldexp   (Real v1,Integer v2)    L_Ldexp;

 Real Pi     () L_PI;                      // the value of pi
 Real Half_pi() L_Half_PI;                 // the value if half pi
 Real Two_pi () L_Two_PI;                  // the value of 2 * pi

// random number generation

 void    Set_random_number       (Integer seed,Integer method) L_Set_Random_Number;
 Integer Get_random_number       () L_Get_Random_Number;
 Real    Get_random_number_closed() L_Get_Random_Closed;
 Real    Get_random_number_open  () L_Get_Random_Open;

//

 Integer Get_billboard_size(Text name,Real &w,Real &h) L_Get_Billboard_size;

// triangle properties

 Integer Triangle_normal(Real xarray[],Real yarray[],Real zarray[],Real Normal[]) L_Triangle_Normal;

 Integer Triangle_normal(Real  x1,Real  y1,Real  z1,
                         Real  x2,Real  y2,Real  z2,
                         Real  x3,Real  y3,Real  z3,
                         Real &xn,Real &yn,Real &zn) L_Triangle_Coords_Normal;

 Integer Triangle_slope (Real xarray[],Real yarray[],Real zarray[],Real &slope) L_Triangle_Slope;

 Integer Triangle_slope (Real  x1,Real  y1,Real  z1,
                         Real  x2,Real  y2,Real  z2,
                         Real  x3,Real  y3,Real  z3,
                         Real &slope) L_Triangle_Coords_Slope;

 Integer Triangle_aspect(Real xarray[],Real yarray[],Real zarray[],Real &aspect) L_Triangle_Aspect;

 Integer Triangle_aspect(Real  x1,Real  y1,Real  z1,
                         Real  x2,Real  y2,Real  z2,
                         Real  x3,Real  y3,Real  z3,
                         Real &aspect) L_Triangle_Coords_Aspect;

// angle conversions

 // type        measured from                 measured in
 // --------------------------------------------------------------
 // angles      horizontal anti-clockwise     radians
 // bearings    from north clockwise          radians
 // degrees     n/a                           decimal degrees
 // hp_degrees  n/a                           hp degrees ddd.mmsss

 Integer Radians_to_degrees   (Real rad,Real &deg) L_Radians_to_Degrees;
 Integer Degrees_to_radians   (Real deg,Real &rad) L_Degrees_to_Radians;
 Integer Radians_to_hp_degrees(Real rad,Real &hp_deg) L_Radians_to_HP_Degrees;
 Integer Hp_degrees_to_radians(Real hp_deg,Real &rad) L_HP_Degrees_to_Radians;
 Integer Degrees_to_hp_degrees(Real deg,Real &hp_deg) L_Degrees_to_HP_Degrees;
 Integer Hp_degrees_to_degrees(Real hp_deg,Real &deg) L_HP_Degrees_to_Degrees;
 Integer Degrees_to_dms       (Real deg,Integer &dd,Integer &mm,Real &ss) L_Degrees_to_DMS;
 Integer Dms_to_degrees       (Integer dd,Integer mm,Real ss,Real &deg) L_DMS_to_Degrees;
 Integer Angle_to_bearing     (Real angle,Real &bearing) L_Angle_to_Bearing;
 Integer Bearing_to_angle     (Real bearing,Real &angle) L_Bearing_to_Angle;

// system call

 Integer System(Text command_line) L_System;

 Integer Create_process(Text program_name,Text command_line,Text start_directory,Integer flags,Integer wait,Integer inherit) L_Create_Process;
 Integer Create_process(Text program_name,Text command_line,Text start_directory,Integer flags,Integer inherit,Process_Handle &handle) L_Create_Process_Ex;

 Integer Process_exists(Process_Handle handle) L_Process_Exists;

 Integer Shell_execute(Widget widget,Text operation,Text file,Text parameters,Text directory,Integer showcmd) L_Shell_Execute;

// list manipulation

 Integer Null               (Dynamic_Element &list) L_Element_List_Reset;                                        // removes elements from the list
 Integer Get_number_of_items(Dynamic_Element &list,Integer &count) L_Element_List_Number_of_Elements;                 // the number of elements currently
 Integer Get_item           (Dynamic_Element &list,Integer index,Element &element) L_Element_List_Get_Element;                // gets  the zero based ith element
 Integer Set_item           (Dynamic_Element &list,Integer index,Element element) L_Element_List_Set_Element;                  // sets  the zero based ith element
 Integer Null_item          (Dynamic_Element &list,Integer index) L_Element_List_Set_Element_Null;                     // nulls the zero based ith element
 Integer Append             (Dynamic_Element from,Dynamic_Element &to) L_Element_List_Append_Element_List;   // append contents of one list to another

// integer list manipulation

 Integer Null               (Dynamic_Integer &list) L_Integer_List_Reset;                                        // removes elements from the list
 Integer Get_number_of_items(Dynamic_Integer &list,Integer &count) L_Integer_List_Number_of_Elements;                 // the number of elements currently
 Integer Get_item           (Dynamic_Integer &list,Integer index,Integer &value) L_Integer_List_Get_Integer;                // gets  the zero based ith element
 Integer Set_item           (Dynamic_Integer &list,Integer index,Integer value) L_Integer_List_Set_Integer;                  // sets  the zero based ith element
 Integer Append             (Dynamic_Integer from,Dynamic_Integer &to) L_Integer_List_Append_Integer_List;   // append contents of one list to another
 Integer Append             (Integer from,Dynamic_Integer &to) L_Integer_Append_Integer_List;                // append contents of one list to another

// real list manipulation

 Integer Null               (Dynamic_Real &list) L_Real_List_Reset;                                              // removes elements from the list
 Integer Get_number_of_items(Dynamic_Real &list,Integer &count) L_Real_List_Number_of_Elements;                       // the number of elements currently
 Integer Get_item           (Dynamic_Real &list,Integer index,Real &value) L_Real_List_Get_Real;                            // gets  the zero based ith element
 Integer Set_item           (Dynamic_Real &list,Integer index,Real  value) L_Real_List_Set_Real;                              // sets  the zero based ith element
 Integer Append             (Dynamic_Real from,Dynamic_Real &to) L_Real_List_Append_Real_List;               // append contents of one list to another
 Integer Append             (Real from,Dynamic_Real &to) L_Real_Append_Real_List;                            // append contents of one list to another

// text list manipulation

 Integer Null               (Dynamic_Text &list) L_Text_List_Reset;                                              // removes elements from the list
 Integer Get_number_of_items(Dynamic_Text &list,Integer &count) L_Text_List_Number_of_Elements;                       // the number of elements currently
 Integer Get_item           (Dynamic_Text &list,Integer index,Text &value) L_Text_List_Get_Text;                            // gets  the zero based ith element
 Integer Set_item           (Dynamic_Text &list,Integer index,Text  value) L_Text_List_Set_Text;                              // sets  the zero based ith element
 Integer Append             (Dynamic_Text from,Dynamic_Text &to) L_Text_List_Append_Text_List;               // append contents of one list to another
 Integer Append             (Text from,Dynamic_Text &to) L_Text_Append_Text_List;                            // append contents of one list to another

// calls to get lists of elements from ID ranges
// note, if the model uid's are empty, the entire project is searched

 Integer Get_elements(Uid              function_id,
                      Uid              model_id_start,
                      Uid              model_id_final,
                      Uid              element_id_start,
                      Uid              element_id_final,
                      Integer          skip_tins,
                      Dynamic_Element &elements) L_Get_Elements_By_ID_Ranges;

 Integer Get_elements(Uid              function_id,
                      Uid              model_id_start,
                      Uid              model_id_final,
                      Uid              element_id_start,
                      Uid              element_id_final,
                      Integer          skip_tins,
                      Integer          loaded_models,
                      Dynamic_Element &elements) L_Get_Elements_By_ID_Ranges_Ex;

 Integer Get_models  (Uid              function_id,
                      Uid              model_id_start,
                      Uid              model_id_final,
                      Uid              element_id_start,
                      Uid              element_id_final,
                      Integer          skip_tins,
                      Dynamic_Text     &models) L_Get_Model_Names_By_ID_Ranges;

 Integer Get_models  (Uid              function_id,
                      Uid              model_id_start,
                      Uid              model_id_final,
                      Uid              element_id_start,
                      Uid              element_id_final,
                      Integer          skip_tins,
                      Integer          loaded_models,
                      Dynamic_Text    &models) L_Get_Model_Names_By_ID_Ranges_Ex;

 Integer Check_elements_for_clean(Uid              function_id,
                                  Uid              model_id_start,
                                  Uid              model_id_final,
                                  Uid              element_id_start,
                                  Uid              element_id_final,
                                  Integer          skip_tins) L_Check_Elements_Clean_By_ID_Ranges;

 Integer Clean_elements(Uid              function_id,
                        Uid              model_id_start,
                        Uid              model_id_final,
                        Uid              element_id_start,
                        Uid              element_id_final,
                        Integer          skip_tins) L_Clean_Elements_By_ID_Ranges;

 Integer Clean_elements(Uid              function_id,
                        Uid              model_id_start,
                        Uid              model_id_final,
                        Uid              element_id_start,
                        Uid              element_id_final,
                        Integer          skip_tins,
                        Dynamic_Element &elements) L_Clean_Elements_By_ID_Ranges_Ex;

 Integer Draw_elements (Uid              function_id,
                        Uid              model_id_start,
                        Uid              model_id_final,
                        Uid              element_id_start,
                        Uid              element_id_final,
                        Integer          skip_tins) L_Draw_Elements_By_ID_Ranges;

 Integer Draw_elements (Uid              function_id,
                        Uid              model_id_start,
                        Uid              model_id_final,
                        Uid              element_id_start,
                        Uid              element_id_final,
                        Integer          skip_tins,
                        Integer          colour) L_Draw_Elements_By_ID_Ranges_Ex;

// conversions from string to types and vice versa

 Integer From_text(Text text,Integer   &value) L_AtoI;                                   // ascii to Integer
 Integer From_text(Text text,Integer64 &value) L_Text_To_Integer64;                      // Text to Integer64
 Integer From_text(Text text,Real      &value) L_AtoD;                                   // ascii to Real

 Integer From_text(Text text,Integer   &value,Text format) L_AtoI_Format;                // ascii to Integer (using a C format)
 Integer From_text(Text text,Integer64 &value,Text format) L_Text_To_Integer64_Format;   // ascii to Integer64 (using a C format)
 Integer From_text(Text text,Real      &value,Text format) L_AtoD_Format;                // ascii to Real (using a C format)
 Integer From_text(Text text,Text      &value,Text format) L_AfromA_Format;              // ascii to ascii (using a C format)

 Integer From_text(Text text,Dynamic_Text &text) L_Text_Get_Words;        // get all words out of text
 Integer From_text(Text text,Integer delimiter,Integer separator,Dynamic_Text &text) L_Text_Get_Words_Ex;        // get all words out of text

 Text    To_text(Integer value) L_ItoA;                                         // Integer to ascii
 Text    To_text(Integer64 value) L_Integer64_To_Text;                          // Integer64 to text
 Text    To_text(Real value,Integer decimals) L_DtoA;                           // Real to ascii

 Text    To_text(Integer value  ,Text format) L_ItoA_Format;                    // Integer to ascii (using a C format)
 Text    To_text(Integer64 value,Text format) L_Integer64_To_Text_Format;       // Integer64 to text (using a C format)
 Text    To_text(Real value     ,Text format) L_DtoA_Format;                    // Real to ascii (using a C format)
 Text    To_text(Text value     ,Text format) L_AtoA_Format;                    // Text to ascii (using a C format)

 Integer Get_char(Text  t,Integer pos,Integer &c) L_Text_Get_Char;         // get character from text
 Integer Set_char(Text &t,Integer pos,Integer  c) L_Text_Set_Char;         // set character to text

// text functions

 Integer Numchr      (Text text) L_Numchr;
 Integer Find_text   (Text text,Text tofind) L_Find_Text;                   // try and find tofind within text
 Text    Get_subtext (Text text,Integer start,Integer end) L_Get_Subtext;   // get a part of a string
 void    Set_subtext (Text &text,Integer start,Text sub) L_Set_Subtext;     // set a part of a string
 Integer Text_length (Text text) L_Text_Length;                             // get length of text string in characters
 Text    Text_justify(Text text) L_Text_Justify;                            // get rid of leading/trailing spaces
 Text    Text_upper  (Text text) L_Text_Upper;                              // make text upper case
 Text    Text_lower  (Text text) L_Text_Lower;                              // make text lower case
 void    Insert_text (Text &text,Integer start,Text sub) L_Insert_Text;     // set a part of a string

// for colours

 Integer Colour_exists      (Text    name ) L_Colour_Name_Exists;                    // does a colour name exist returned non-zero indicates existance
 Integer Colour_exists      (Integer value) L_Colour_Exists;                      // does a colour number exist returned non-zero indicates existance
 Integer Convert_colour     (Text name,Integer &value) L_Colour_To_Number;            // converts colour name to a colour number returned zero indicates success
 Integer Convert_colour     (Integer value,Text &name) L_Number_To_Colour;            // converts colour number to a colour name returned zero indicates success
 Integer Convert_colour     (Integer value,Integer &red,Integer &green,Integer &blue) L_Colour_Number_To_RGB;
 Integer Get_project_colours(Dynamic_Text &colours) L_Get_Project_Colours;

// model and element manipulation

// for a model

 Integer Get_project_models(Dynamic_Text &models) L_Get_Project_Models;

 Integer Model_exists    (Text name) L_Model_Name_Exists;                      // checks if model of name exists returned non-zero indicates success
 Integer Model_exists    (Model model) L_Model_Exists;                          // checks if model handle is valid returned non-zero indicates success
 Model   Get_model       (Text name) L_Model_Get_Model;                        // gets a model handle from name, returns null handle on failure
 Model   Create_model    (Text name) L_Model_Create_Model;                     // creates a model with name, returns null handle on failure
 Model   Get_model_create(Text name) L_Model_Get_Model_Create;                 // creates model if name not found, gets handle otherwise

 Integer Get_model       (Integer model_id,Model &model) L_Get_Model_By_ID;
 Integer Get_element     (Integer model_id,Integer element_id,Element &elt) L_Get_Model_Element_By_ID;
 Integer Get_id          (Model model,Integer &id) L_Model_Get_ID;

 Integer Get_model       (Uid   model_id,Model &model) L_Get_Model_By_UID;
 Integer Get_element     (Uid   model_id,Uid element_id,Element &elt) L_Get_Model_Element_By_UID;
 Integer Get_id          (Model model,Uid &id) L_Model_Get_UID;

 Integer Get_number_of_items(Model elt,Integer &count) L_Model_Number_of_Elements;     // the number of elements in a model

 Integer Model_draw(Model model,Integer colour) L_Model_Draw_Colour;
 Integer Model_draw(Model model) L_Model_Draw;

 Integer Null(Model model) L_Model_Invalidate;                               // makes null a model handle returned zero indicates success

 Integer Get_extent_x(Model model,Real &xmin,Real &xmax) L_Model_Get_Extent_X;       // gets min and max x values returned zero indicates success
 Integer Get_extent_y(Model model,Real &ymin,Real &ymax) L_Model_Get_Extent_Y;       // gets min and max y values returned zero indicates success
 Integer Get_extent_z(Model model,Real &zmin,Real &zmax) L_Model_Get_Extent_Z;       // gets min and max z values returned zero indicates success

 Integer Calc_extent(Model model) L_Model_Calc_Extent;                       // forces recalculation of model extents returned zero
                                                                       //   indicates success

 Integer Model_rename(Text old_name,Text new_name) L_Model_Rename;
 Integer Model_delete(Model model) L_Model_Delete;                           // deletes model from project returned zero indicates success

 Integer Get_elements(Model model,Dynamic_Element &list,Integer &count) L_Get_All_Model_Elements;      // get all elements in model and adds to list returned zero
                                                                       //   indicates success

 Integer Get_time_created(Model elt,Integer &time) L_Model_Get_Time_Created;
 Integer Get_time_updated(Model elt,Integer &time) L_Model_Get_Time_Updated;
 Integer Set_time_updated(Model elt,Integer time)  L_Model_Set_Time_Updated;

// for a tin

 Tin     Get_tin(Text name) L_Tin_Get_Tin;                                  // gets a handle for an existing 4d tin returns null handle on failure
 Tin     Get_tin(Element tin) L_Element_Get_Tin;                           // gets a handle for an existing 4d tin returns null handle on failure
 Integer Get_project_tins(Dynamic_Text &tins) L_Get_Project_Tins;

 Integer Tin_exists(Text tin_name) L_Tin_Name_Exists;                  // checks if tin of name exists returned non-zero indicates success
 Integer Tin_exists(Tin tin) L_Tin_Exists;                             // checks if tin handle is valid returned non-zero indicates success
 Integer Null(Tin tin) L_Tin_Null;                                     //

 Integer Set_model(Tin tin,Model model) L_Tin_Set_Model;

// inquiries

 Integer Tin_number_of_points          (Tin tin,Integer &npts) L_Tin_Number_of_Points;
 Integer Tin_number_of_triangles       (Tin tin,Integer &ntri) L_Tin_Number_of_Triangles;
 Integer Tin_number_of_duplicate_points(Tin tin,Integer &ndup) L_Tin_Number_of_Duplicate_Points;
 Integer Tin_number_of_items           (Tin tin,Integer &nitem) L_Tin_Number_of_Items;

 Integer Tin_get_point                 (Tin tin,Integer point,Real &x,Real &y,Real &z) L_Tin_Get_Point_Coord;
 Integer Tin_get_triangle_points       (Tin tin,Integer triangle,Integer &p1,Integer &p2,Integer &p3) L_Tin_Get_Triangle_Points;
 Integer Tin_get_triangle_neighbours   (Tin tin,Integer triangle,Integer &n1,Integer &n2,Integer &n3) L_Tin_Get_Triangle_Neighbours;
 Integer Tin_get_triangle_colour       (Tin tin,Integer triangle,Integer &colour) L_Tin_Get_Triangle_Colour;
 Integer Tin_get_triangle_inside       (Tin tin,Integer triangle,Integer &inside) L_Tin_Get_Triangle_Inside;

 Integer Tin_get_triangle              (Tin tin,Integer triangle,Integer &p1,Integer &p2,Integer &p3,
                                                                 Integer &n1,Integer &n2,Integer &n3,
                                                                 Real &x1,Real &y1,Real &z1,
                                                                 Real &x2,Real &y2,Real &z2,
                                                                 Real &x3,Real &y3,Real &z3) L_Tin_Get_Triangle_Full;

 Integer Tin_get_triangle_from_point   (Tin tin,Real x,Real y,Integer &triangle) L_Tin_Get_Triangle_From_Point;
 Integer Tin_get_point_from_point      (Tin tin,Real x,Real y,Integer &point)    L_Tin_Get_Point_From_Point;

 Integer Tin_get_triangles_about_point (Tin tin,Integer triangle,Integer &no_triangles) L_Tin_Get_Triangles_About_Point;

 Integer Tin_get_triangles_about_point (Tin tin,Integer triangle,Integer max_triangles,
                                                Integer &no_triangles,
                                                Integer  triangles[],
                                                Integer  points[],
                                                Integer  status[]) L_Tin_Get_Triangles_About_Point_Full;

 Integer Tin_Plan_Area_At_Elevation   (Tin tin, Element fence, Real elevation, Real &plan_area, Real &volume) L_Tin_Plan_Area_At_Elevation;

 Integer Tin_height(Tin tin,Real x,Real y,Real &height) L_Tin_Height_Inquire;
 Integer Tin_slope (Tin tin,Real x,Real y,Real &slope) L_Tin_Slope_Inquire;
 Integer Tin_aspect(Tin tin,Real x,Real y,Real &aspect) L_Tin_Aspect_Inquire;
 Integer Tin_colour(Tin tin,Real x,Real y,Integer &colour) L_Tin_Colour_Inquire;
 Integer Tin_rename(Text old_name,Text new_name) L_Tin_Rename;
 Integer Tin_delete(Tin tin) L_Tin_Delete;

 Integer Tin_drop_point_3d(Tin tin, Real px, Real py, Real pz, Real &dx, Real &dy, Real &dz, Real &d_distance, Integer &above_tin, Integer &d_triangle, Integer &d_status) L_Tin_Drop_Point_3D;

// model tin calls

 Integer Tin_models    (Tin tin,Dynamic_Text &models) L_Tin_Models;

 Integer Triangulate   (Dynamic_Text list,Text tin_name,Integer colour,Integer preserve,Integer bubbles,Tin &tin) L_Triangulate_Model_List;
 Integer Retriangulate (Tin tin) L_Tin_Retriangulate;

 Integer Breakline     (Tin tin,Integer p1,Integer p2) L_Tin_Breakline;
 Integer Flip_triangles(Tin tin,Integer t1,Integer t2) L_Tin_Flip_Triangles;
 Integer Set_height    (Tin tin,Integer pt,Real ht)    L_Tin_Set_Height;

 Integer Draw_triangle             (Tin tin,Integer tri,Integer c) L_Tin_Draw_Triangle;
 Integer Draw_triangles_about_point(Tin tin,Integer pt ,Integer c) L_Tin_Draw_Triangles_About_Point;

 Integer Null_by_angle_length      (Tin tin,Real l1,Real a1,Real l2,Real a2) L_Tin_Null_By_Angle_Length;
 
 Integer Tin_null_by_colour (Tin tin, Integer colour,          Integer is_colour,       Integer is_reset) L_Tin_Null_By_Colour;
 Integer Tin_null_by_colours(Tin tin, Dynamic_Integer colours, Integer in_colours_list, Integer is_reset) L_Tin_Null_By_Colours;
 
 Integer Get_time_created(Tin elt,Integer &time) L_Tin_Get_Time_Created;
 Integer Get_time_updated(Tin elt,Integer &time) L_Tin_Get_Time_Updated;
 Integer Set_time_updated(Tin elt,Integer time)  L_Tin_Set_Time_Updated;

 Integer Supertin_number_of_tins(Tin supertin, Integer &ntins) L_Supertin_Number_Of_Tins;
 Integer Supertin_get_tin(Tin supertin, Integer pos, Text &name, Integer &mode, Integer &active) L_Supertin_Get_Tin;
 
// for an element

 Integer Get_id       (Element element,Integer &id) L_Element_Get_ID;                // get id returned zero indicates success
 Integer Get_id       (Element element,Uid     &id) L_Element_Get_UID;               // get id returned zero indicates success
 Integer Get_points   (Element element,Integer &numpts) L_Element_Get_Points;        // get number of points returned zero indicates success
 Integer Get_colour   (Element element,Integer &colour) L_Element_Get_Colour;        // get colour of element returned zero indicates success
 Integer Get_breakline(Element element,Integer &breakline) L_Element_Get_Breakline;           // returns 0 if its a point string and 1 if a line string
 Integer Get_type     (Element element,Integer &type) L_Element_Get_Type;                // gets a Integer reflecting string type
 Integer Get_type     (Element element,Text &type) L_Element_Get_Type_Name;              // get a Text eg "2d" "3d" "4d" "alignment" "text" "interface"
 Integer Get_name     (Element element,Text &name) L_Element_Get_Name;                   // get element name returned zero indicates success
 Integer Get_name     (Model model,Text &name) L_Model_Get_Name;                       // get model name returned zero indicates success
 Integer Get_style    (Element element,Text &style) L_Element_Get_Style;                  // get the style of the particular element returned zero indicates success
 Integer Get_chainage (Element element,Real &chainage) L_Element_Get_Chainage;               // get start chainage of string
 Integer Get_model    (Element element,Model &model) L_Element_Get_Model;                 // gets the model handle for the element returned zero indicates success

 Integer Get_weight   (Element element,Real &weight) L_Element_Get_Weight;                 // get the colour of the element
 Integer Set_weight   (Element element,Real weight)   L_Element_Set_Weight;                 // set the colour of the element

 Integer Set_colour   (Element element,Integer colour) L_Element_Set_Colour;                // set the colour of the element
 Integer Set_breakline(Element element,Integer breakline) L_Element_Set_Breakline;             // set a string with 0 it becomes a point string with non-zero
                                                                             //   it becomes a line string
 Integer Set_name     (Element element,Text name) L_Element_Set_Name;                     // set element name
 Integer Set_style    (Element element,Text style) L_Element_Set_Style;                    // set the style returned zero indicates success
 Integer Set_chainage (Element element,Real chianage) L_Element_Set_Chainage;                 // set start chainage of string
 Integer Set_model    (Element element,Model model) L_Element_Set_Model;                   // move or add element to model returned zero indicates success
 Integer Set_model    (Dynamic_Element list,Model model) L_Element_List_Set_Model;      // moves or adds all element in list to model returned zero
                                                                             //   indicates success

 Integer Get_type_like(Element element,Integer &type) L_Element_Get_Type_Like;           // if super string looks like a 2d,3d,4d,face,polyline,interface,face return(that type)
 Integer Get_type_like(Element element,Text &type) L_Element_Get_Type_Name_Like;         //

//

 Integer Get_segments(Element element,Integer &nsegs) L_String_Number_Of_Segments;
 Integer Get_segment (Element element,Integer pos,Segment &seg) L_String_Get_Segment;

//

 Integer Element_exists(Element element) L_Element_Exists;                           // checks validity of handle returned non-zero indicates existance
 Integer Null          (Element element) L_Element_Invalidate;                       // makes null an element handle returned zero indicates success
 Integer Get_extent_x  (Element element,Real &xmin,Real &xmax) L_Element_Get_Extent_X;       // gets min and max x values returned zero indicates success
 Integer Get_extent_y  (Element element,Real &ymin,Real &ymax) L_Element_Get_Extent_Y;       // gets min and max y values returned zero indicates success
 Integer Get_extent_z  (Element element,Real &zmin,Real &zmax) L_Element_Get_Extent_Z;       // gets min and max z values returned zero indicates success
 Integer Calc_extent   (Element element) L_Element_Calc_Extent;

 Integer Element_draw(Element element,Integer colour) L_Element_Draw_Colour;
 Integer Element_draw(Element element) L_Element_Draw;

 Integer Element_delete(Element element) L_Element_Delete;                        // deletes the element

 Integer Get_read_locks (Element element,Integer &no_locks) L_Get_Element_Read_Locks;
 Integer Get_write_locks(Element element,Integer &no_locks) L_Get_Element_Write_Locks;

// valid names

 Integer Valid_string_name   (Text old_name,Text &new_name) L_Valid_String_Name;
 Integer Valid_model_name    (Text old_name,Text &new_name) L_Valid_Model_Name;
 Integer Valid_tin_name      (Text old_name,Text &new_name) L_Valid_Tin_Name;
 Integer Valid_attribute_name(Text old_name,Text &new_name) L_Valid_Attribute_Name;
 Integer Valid_linestyle_name(Text old_name,Text &new_name) L_Valid_Linestyle_Name;
 Integer Valid_symbol_name   (Text old_name,Text &new_name) L_Valid_Symbol_Name;

// 2d, 3d and 4d strings consist of header information and arrays containing the point data
// arrays start at index zero and go to number of points - 1 (C style)

// extraction from existing Strings (Elements)

// 2d

 Element Create_2d(Real x[],Real y[],Real zvalue,Integer num_pts) L_Create_2D;  // create 2d string with positions specified
 Element Create_2d(Integer npts) L_Create_2D_Npts;
 Element Create_2d(Integer npts,Element seed) L_Create_2D_Seed_Npts;

 Integer Get_2d_data(Element element,Real [],Real [],Real &,Integer max_pts,
                     Integer &num_pts) L_Get_2D_Data;                                    // fill arrays of size max_pts with num_pts returned
 Integer Get_2d_data(Element element,Real [],Real [],Real &,Integer max_pts,
                     Integer &num_pts,Integer offset) L_Get_2D_Data_Offset;                 // fill arrays of size max_pts with num_pts returned
                                                                                   //   from offset

 Integer Get_2d_data(Element element,Integer i,Real &x,Real &y) L_Get_2D_Point;              // get ith x and y of string

 Integer Get_2d_data(Element element,Real &z) L_Get_2D_Level;                               // get z value for 2d string

 Integer Set_2d_data(Element element,Real x[],Real y[],Integer num_pts) L_Set_2D_Data;       // fill the string with 2d data for num_pts

 Integer Set_2d_data(Element element,Real x[],Real y[],Integer num_pts,Integer offset)
                     L_Set_2D_Data_Offset;                                            // fill the string with 2d data for num_pts at offset

 Integer Set_2d_data(Element element,Integer i,Real x,Real y) L_Set_2D_Point;                // set the ith position in string

 Integer Set_2d_data(Element element,Real) L_Set_2D_Level;                                  // sets the z value of 2d string

// 3d

 Element Create_3d(Line line) L_Create_3D_from_Line;
 Element Create_3d(Real x[],Real y[],Real z[],Integer num_pts) L_Create_3D;     // create 3d string with positions specified
 Element Create_3d(Integer npts) L_Create_3D_Npts;
 Element Create_3d(Integer npts,Element seed) L_Create_3D_Seed_Npts;

 Integer Get_3d_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                  Integer &num_pts) L_Get_3D_Data;                                    // fill arrays of size max_pts with num_pts returned

 Integer Get_3d_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                  Integer &num_pts,Integer offset) L_Get_3D_Data_Offset;                 // fill arrays of size max_pts with num_pts returned
                                                                                   //   from offset
 Integer Get_3d_data(Element element,Integer i,Real &x,Real &y,Real &z)
                  L_Get_3D_Point;                                                  // get the ith x, y and z of string

 Integer Set_3d_data(Element element,Real x[],Real y[],Real z[],Integer num_pts)
                  L_Set_3D_Data;                                                   // fill the string with 3d data for num_pts

 Integer Set_3d_data(Element element,Real x[],Real y[],Real z[],Integer num_pts,
                  Integer offset) L_Set_3D_Data_Offset;                               // fill the string with 3d data for num_pts at offset

 Integer Set_3d_data(Element element,Integer i,Real x,Real y,Real z) L_Set_3D_Point;       // set the ith position in string

// face

 Element Create_face(Real x[],Real y[],Real z[],Integer num_pts) L_Create_Face;     // create face string with positions specified
 Element Create_face(Integer npts) L_Create_Face_Npts;
 Element Create_face(Integer npts,Element seed) L_Create_Face_Seed_Npts;

 Integer Get_face_hatch_distance(Element element,Real &value) L_Get_Face_Hatch_Distance;
 Integer Set_face_hatch_distance(Element element,Real  value) L_Set_Face_Hatch_Distance;

 Integer Get_face_hatch_angle(Element element,Real &value) L_Get_Face_Hatch_Angle;
 Integer Set_face_hatch_angle(Element element,Real  value) L_Set_Face_Hatch_Angle;

 Integer Get_face_hatch_colour(Element element,Integer &value) L_Get_Face_Hatch_Colour;
 Integer Set_face_hatch_colour(Element element,Integer  value) L_Set_Face_Hatch_Colour;

 Integer Get_face_hatch_mode(Element element,Integer &value) L_Get_Face_Hatch_Mode;
 Integer Set_face_hatch_mode(Element element,Integer  value) L_Set_Face_Hatch_Mode;

 Integer Get_face_edge_colour(Element element,Integer &value) L_Get_Face_Edge_Colour;
 Integer Set_face_edge_colour(Element element,Integer  value) L_Set_Face_Edge_Colour;

 Integer Get_face_edge_mode(Element element,Integer &value) L_Get_Face_Edge_Mode;
 Integer Set_face_edge_mode(Element element,Integer  value) L_Set_Face_Edge_Mode;

 Integer Get_face_fill_mode(Element element,Integer &value) L_Get_Face_Fill_Mode;
 Integer Set_face_fill_mode(Element element,Integer  value) L_Set_Face_Fill_Mode;

// face alias calls

 Integer Get_face_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                       Integer &num_pts) L_Get_3D_Data;

 Integer Get_face_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                       Integer &num_pts,Integer offset) L_Get_3D_Data_Offset;

 Integer Get_face_data(Element element,Integer i,Real &x,Real &y,Real &z)
                       L_Get_3D_Point;

 Integer Set_face_data(Element element,Real x[],Real y[],Real z[],Integer num_pts)
                       L_Set_3D_Data;

 Integer Set_face_data(Element element,Real x[],Real y[],Real z[],Integer num_pts,
                       Integer offset) L_Set_3D_Data_Offset;

 Integer Set_face_data(Element element,Integer i,Real x,Real y,Real z) L_Set_3D_Point;

// 4d

 Element Create_4d(Real x[],Real y[],Real z[],Text t[],Integer num_pts)
                   L_Create_4D;                                                    // create 4d string with positions and text specified
 Element Create_4d(Integer npts) L_Create_4D_Npts;
 Element Create_4d(Integer npts,Element seed) L_Create_4D_Seed_Npts;

 Integer Get_4d_data(Element element,Real x[],Real y[],Real z[],Text t[],
                  Integer max_pts,Integer &num_pts) L_Get_4D_Data;                       // fill arrays of size max_pts with num_pts returned

 Integer Get_4d_data(Element element,Real x[],Real y[],Real z[],Text t[],
                  Integer max_pts,Integer &num_pts,Integer offset) L_Get_4D_Data_Offset;    // fill arrays of size max_pts with num_pts returned
                                                                                   //   from offset
 Integer Get_4d_data(Element element,Integer i,Real &x,Real &y,Real &z,Text &t)
                  L_Get_4D_Point;                                                  // get the ith x, y and z and text of string


 Integer Set_4d_textstyle_data(Element element,Textstyle_Data  d)       L_Set_4d_Textstyle_Data;
 Integer Get_4d_textstyle_data(Element element,Textstyle_Data &d)       L_Get_4d_Textstyle_Data;

 Integer Get_4d_size         (Element element,Real    &size)       L_Get_4D_Size;                   // get text info
 Integer Get_4d_offset       (Element element,Real    &offset)     L_Get_4D_Offset;
 Integer Get_4d_rise         (Element element,Real    &offset)     L_Get_4D_Rise;
 Integer Get_4d_angle        (Element element,Real    &angle)      L_Get_4D_Angle;
 Integer Get_4d_justify      (Element element,Integer &justify)    L_Get_4D_Justify;
 Integer Get_4d_units        (Element element,Integer &units)      L_Get_4D_Units;
 Integer Get_4d_height       (Element element,Real    &ht)         L_Get_4D_Height;
 Integer Get_4d_slant        (Element element,Real    &sl)         L_Get_4D_Slant;
 Integer Get_4d_x_factor     (Element element,Real    &xfact)      L_Get_4D_X_Factor;
 Integer Get_4d_style        (Element element,Text    &text)       L_Get_4D_Style;
 Integer Get_4d_whiteout     (Element element,Integer &colour)     L_Get_4D_Whiteout;
 Integer Get_4d_border       (Element element,Integer &colour)     L_Get_4D_Border;
 Integer Get_4d_ttf_underline(Element element,Integer &underline)  L_Get_4D_TTF_Underline;
 Integer Get_4d_ttf_strikeout(Element element,Integer &strikeout)  L_Get_4D_TTF_Strikeout;
 Integer Get_4d_ttf_italic   (Element element,Integer &italic)     L_Get_4D_TTF_Italic;
 Integer Get_4d_ttf_outline  (Element element,Integer &outline)    L_Get_4D_TTF_Outline;
 Integer Get_4d_ttf_weight   (Element element,Integer &weight)     L_Get_4D_TTF_Weight;

// not yet // Integer Get_4d_length  (Element element,Real &ht)         L_Get_4D_Length;

 Integer Set_4d_size         (Element element,Real    size)        L_Set_4D_Size;                   // set text info
 Integer Set_4d_offset       (Element element,Real    offset)      L_Set_4D_Offset;
 Integer Set_4d_rise         (Element element,Real    offset)      L_Set_4D_Rise;
 Integer Set_4d_angle        (Element element,Real    angle)       L_Set_4D_Angle;
 Integer Set_4d_justify      (Element element,Integer justify)     L_Set_4D_Justify;
 Integer Set_4d_units        (Element element,Integer units)       L_Set_4D_Units;
 Integer Set_4d_height       (Element element,Real    ht)          L_Set_4D_Height;
 Integer Set_4d_slant        (Element element,Real    sl)          L_Set_4D_Slant;
 Integer Set_4d_x_factor     (Element element,Real    xfact)       L_Set_4D_X_Factor;
 Integer Set_4d_style        (Element element,Text    text)        L_Set_4D_Style;
 Integer Set_4d_whiteout     (Element element,Integer colour)      L_Set_4D_Whiteout;
 Integer Set_4d_border       (Element element,Integer colour)      L_Set_4D_Border;
 Integer Set_4d_ttf_underline(Element element,Integer underline)   L_Set_4D_TTF_Underline;
 Integer Set_4d_ttf_strikeout(Element element,Integer strikeout)   L_Set_4D_TTF_Strikeout;
 Integer Set_4d_ttf_italic   (Element element,Integer italic)      L_Set_4D_TTF_Italic;
 Integer Set_4d_ttf_outline  (Element element,Integer outline)     L_Set_4D_TTF_Outline;
 Integer Set_4d_ttf_weight   (Element element,Integer weight)      L_Set_4D_TTF_Weight;

 Integer Set_4d_data(Element element,Real x[],Real y[],Real z[],Text t[],
                     Integer num_pts) L_Set_4D_Data;                                     // fill the string with 4d data for num_pts

 Integer Set_4d_data(Element element,Real x[],Real y[],Real z[],Text t[],
                     Integer num_pts,Integer offset) L_Set_4D_Data_Offset;                  // fill the string with 4d data for num_pts at offset

 Integer Set_4d_data(Element element,Integer i,Real x,Real y,Real z,Text t)
                  L_Set_4D_Point;                                                  // set the ith position in string

// pipe

 Element Create_pipe(Real x[],Real y[],Real z[],Integer num_pts) L_Create_Pipe;      // create pipe string with positions specified
 Element Create_pipe(Integer npts) L_Create_Pipe_Npts;
 Element Create_pipe(Integer npts,Element seed) L_Create_Pipe_Seed_Npts;

 Integer Set_pipe_diameter(Element element,Real diam) L_Set_Pipe_Diameter;                   // set the diameter of the pipe
 Integer Set_pipe_justify (Element element,Integer justify) L_Set_Pipe_Justify;              // set the justification of the pipe

 Integer Get_pipe_diameter(Element element,Real &diam) L_Get_Pipe_Diameter;                  // get the diameter of the pipe
 Integer Get_pipe_justify (Element element,Integer &justify) L_Get_Pipe_Justify;             // get the justification of the pipe

 Integer Get_pipe_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                  Integer &num_pts) L_Get_3D_Data;                                   // fill arrays of size max_pts with num_pts returned

 Integer Get_pipe_data(Element element,Real x[],Real y[],Real z[],Integer max_pts,
                  Integer &num_pts,Integer offset) L_Get_3D_Data_Offset;             // fill arrays of size max_pts with num_pts returned
                                                                                     // from offset
 Integer Get_pipe_data(Element element,Integer i,Real &x,Real &y,Real &z)
                  L_Get_3D_Point;                                                    // get the ith x, y and z of string

 Integer Set_pipe_data(Element element,Real x[],Real y[],Real z[],Integer num_pts)
                  L_Set_3D_Data;                                                     // fill the string with 3d data for num_pts

 Integer Set_pipe_data(Element element,Real x[],Real y[],Real z[],Integer num_pts,
                  Integer offset) L_Set_3D_Data_Offset;                              // fill the string with 3d data for num_pts at offset

 Integer Set_pipe_data(Element element,Integer i,Real x,Real y,Real z) L_Set_3D_Point;       // set the ith position in string

// alignment

// an alignment string is defined by
// (a) creating an alignment element
// (b) adding horizontal geometry
// (c) perform a calc_alignment if length is needed
// (d) adding vertical geometry
// (e) perform a calc_alignment


 Element Create_align() L_Create_Align;
 Element Create_align(Element seed) L_Create_Align_Seed;

 Integer Append_hip(Element element,Real x,Real y) L_Append_HIP;                           // appends HIP to the string

 Integer Append_hip(Element element,Real x,Real y,Real radius) L_Append_HIP_Curve;       // appends HIPs with radius fillet data

 Integer Append_hip(Element element,Real x,Real y,Real radius,
                    Real left_spiral,Real right_spiral) L_Append_HIP_Spiral;                          // appends HIPs with spiral data

 Integer Get_hip_points(Element element,Integer &num_pts) L_Get_HIP_Points;                       // get the number of HIPs in alignement string

 Integer Set_ip_draw_mode(Element element,Integer  mode) L_Alignment_Set_Draw_Mode;
 Integer Get_ip_draw_mode(Element element,Integer &mode) L_Alignment_Get_Draw_Mode;

 Integer Get_hip_id  (Element element,Integer position,Integer &id) L_Get_HIP_ID;             // get id for HIP at position
 Integer Get_hip_id  (Element element,Integer position,Uid     &id) L_Get_HIP_UID;            // get id for HIP at position
 Integer Get_hip_type(Element element,Integer position,Text &type) L_Get_HIP_Type;            // get type for HIP at position
 Integer Get_hip_geom(Element element,Integer position,Integer mode,Real &x,Real &y) L_Get_HIP_Geom;            // get x and y (of TC,CT etc) for HIP at position

 Integer Get_hip_data(Element element,Integer position,Real &x,Real &y) L_Get_HIP;            // get x and y for HIP at position

 Integer Get_hip_data(Element element,Integer position,Real &x,Real &y,Real &radius)
                      L_Get_HIP_Curve;                                                 // get x, y and radius at position

 Integer Get_hip_data(Element element,Integer position,Real &x,Real &y,Real &radius,
                      Real &left_spiral,Real &right_spiral) L_Get_HIP_Spiral;      // get x, y, z, left_spiral and right_spiral at position

 Integer Set_hip_data(Element element,Integer position,Real x,Real y) L_Set_HIP;              // set x and y at position

 Integer Set_hip_data(Element element,Integer position,Real x,Real y,Real radius)
                      L_Set_HIP_Curve;                                                 // set x, y and radius at position

 Integer Set_hip_data(Element element,Integer position,Real x,Real y,Real radius,
                      Real left_spiral,Real right_spiral) L_Set_HIP_Spiral;        // set x, y, z, left_spiral and right_spiral at position

 Integer Insert_hip(Element element,Integer position,Real x,Real y) L_Insert_HIP;             // inserts x, y before HIP position. if positon is 1
                                                                                    // greater than number of HIP points appends

 Integer Insert_hip(Element element,Integer position,Real x,Real y,Real radius)
                 L_Insert_HIP_Curve;                                                // inserts x, y, radius before HIP position. if positon
                                                                                    // is 1 greater than number of HIP points it appends

 Integer Insert_hip(Element element,Integer position,Real x,Real y,Real radius,
                    Real left_spiral,Real right_spiral) L_Insert_HIP_Spiral;       // inserts x, y, z, left_spiral, right_spiral before HIP
                                                                                    // position. if positon is 1 greater than number of HIP
                                                                                    // points it appends

 Integer Delete_hip(Element element,Integer position) L_Delete_HIP;                               // deletes HIP at position

 Integer Append_vip(Element element,Real ch,Real ht) L_Append_VIP;                         // appends VIP to the string

 Integer Append_vip(Element element,Real ch,Real ht,Real parabolic)                      // appends VIP with parabolic length data
                 L_Append_VIP_Parabola;

 Integer Append_vip(Element element,Real ch,Real ht,Real value,Integer mode)
                 L_Append_VIP_Element;                                              // appends VIP with value of mode { }

 Integer Get_vip_points(Element element,Integer &num_pts) L_Get_VIP_Points;                       // get the number of VIPs in alignement string

 Integer Get_vip_id  (Element element,Integer position,Integer &id) L_Get_VIP_ID;             // get id for VIP at position
 Integer Get_vip_id  (Element element,Integer position,Uid     &id) L_Get_VIP_UID;            // get id for VIP at position
 Integer Get_vip_type(Element element,Integer position,Text &type) L_Get_VIP_Type;            // get type for VIP at position
 Integer Get_vip_geom(Element element,Integer position,Integer mode,Real &c,Real &h) L_Get_VIP_Geom;            // get x and y (of TC,CT etc) for VIP at position

 Integer Get_vip_data(Element element,Integer position,Real &ch,Real &ht) L_Get_VIP;          // get chainage and height at position

 Integer Get_vip_data(Element element,Integer position,Real &ch,Real &ht,Real &parabolic)   // get chainage, height and parabolic length at position
                   L_Get_VIP_Parabola;

 Integer Get_vip_data(Element element,Integer position,Real &ch,Real &ht,
                   Real &value,Integer &mode) L_Get_VIP_Element;                     // get chainage, height, value and mode { } at position

 Integer Set_vip_data(Element element,Integer position,Real ch,Real ht) L_Set_VIP;            // set chainage and height at position

 Integer Set_vip_data(Element element,Integer position,Real ch,Real ht,Real parabolic)
                   L_Set_VIP_Parabola;                                              // set chainage, height and parabolic length at position

 Integer Set_vip_data(Element element,Integer position,Real ch,Real ht,Real value,
                   Integer mode) L_Set_VIP_Element;                                    // set chainage, height, value and mode { } at position

 Integer Insert_vip(Element element,Integer position,Real ch,Real ht) L_Insert_VIP;           // inserts ch, ht before VIP position. if positon is 1
                                                                                    // greater than number of VIP points appends
 Integer Insert_vip(Element element,Integer position,Real ch,Real ht,Real parabolic)
                 L_Insert_VIP_Parabola;                                             // inserts ch, ht, parabolic length before VIP position.
                                                                                    // if positon is 1 greater than number of VIP points
                                                                                    // appends
 Integer Insert_vip(Element element,Integer position,Real ch,Real ht,Real value,Integer mode)
                 L_Insert_VIP_Element;                                              // inserts ch, ht, value and mode { } before VIP
                                                                                    // position. if positon is 1 greater than number of
                                                                                    // VIP points appends

 Integer Delete_vip(Element element,Integer) L_Delete_VIP;                                        // deletes VIP at position

 Integer Calc_alignment(Element) L_Calc_Align;                                         // calculates alignment geometry from IPs

 Integer Get_alignment_vertical_position(Element alignment,Real chainage,Real &level,Real &grade,Real &mvalue) L_Alignment_Get_Vertical_Position;

// pipeline - derived from alignment (use alignment calls to get/set ips)

 Element Create_pipeline() L_Create_Pipeline;
 Element Create_pipeline(Element seed) L_Create_Pipeline_Seed;

 Integer Set_pipeline_diameter(Element pipeline,Real  diameter) L_Set_Pipeline_Diameter;
 Integer Set_pipeline_length  (Element pipeline,Real  length)   L_Set_Pipeline_Length;

 Integer Get_pipeline_diameter(Element pipeline,Real &diameter) L_Get_Pipeline_Diameter;
 Integer Get_pipeline_length  (Element pipeline,Real &length)   L_Get_Pipeline_Length;

 Integer Get_pipeline_prev_joint_chainage(Element pipeline,Real chain,Real pipe_length,Real &joint_chain) L_Get_Pipeline_Joint_Chainage_Prev;
 Integer Get_pipeline_next_joint_chainage(Element pipeline,Real chain,Real pipe_length,Real &joint_chain) L_Get_Pipeline_Joint_Chainage_Next;

 Integer Set_pipeline_shape(Element element, Integer shape) L_Set_Pipeline_Shape;
 Integer Get_pipeline_shape(Element element, Integer &shape) L_Get_Pipeline_Shape;
 Integer Set_pipeline_justification(Element element, Integer just) L_Set_Pipeline_Justification;
 Integer Get_pipeline_justification(Element element, Integer &just) L_Get_Pipeline_Justification;
 Integer Set_pipeline_culvert(Element element, Real w, Real h) L_Set_Pipeline_Culvert;
 Integer Get_pipeline_culvert(Element element, Real &w, Real &h) L_Get_Pipeline_Culvert;

// text strings

// justification is defined as
//
//                           top
//
//                   3 *     6 *     7 *
//        left       2 *     5 *     8 *        right
//                   1 *     4 *     9 *
//
//                          bottom

 Element Create_text(Text text,Real x,Real y,Real size,Integer colour)
                     L_Create_Text;                                                  // creates a text annotation at (x,y) of size and colour

 Element Create_text(Text text,Real x,Real y,Real size,Integer colour,
                     Real angle) L_Create_Text_2;                                    // creates a text annotation at (x,y) of size and colour
                                                                                     // with an angle from horizontal

 Element Create_text(Text text,Real x,Real y,Real size,Integer colour,
                     Real angle,Integer justification) L_Create_Text_3;              // creates a text annotation at (x,y) of size and colour
                                                                                     // with an angle from horizontal and a justification

 Element Create_text(Text text,Real x,Real y,Real size,Integer colour,
                     Real angle,Integer justification,Integer type) L_Create_Text_4; // creates a text annotation at (x,y) of size and colour
                                                                                     // with an angle from horizontal, a justification and a
                                                                                     // type { pixel = 0, world = 1 }

 Element Create_text(Text text,Real x,Real y,Real size,Integer colour,
                     Real angle,Integer justification,Integer type,
                     Real offset_distance,Real rise_distance) L_Create_Text_5;       // creates a text annotation at (x,y) of size and colour
                                                                                     // with an angle from horizontal, a justification a
                                                                                     // type { pixel = 0, world = 1 }, an offset distance
                                                                                     // aInteger the angle of the text and a rise_distance
                                                                                     // perpendicular to the angle of the text

 Integer Set_text_textstyle_data(Element element,Textstyle_Data  d)       L_Set_Text_Textstyle_Data;
 Integer Get_text_textstyle_data(Element element,Textstyle_Data &d)       L_Get_Text_Textstyle_Data;

 Integer Get_text_xy           (Element element,Real    &x,Real &y)  L_Get_Text_XY;                   // get text info
 Integer Get_text_xyz          (Element element,Real    &x,Real &y,Real &z)  L_Get_Text_XYZ;
 Integer Get_text_value        (Element element,Text    &value)      L_Get_Text_Value;
 Integer Get_text_size         (Element element,Real    &size)       L_Get_Text_Size;
 Integer Get_text_offset       (Element element,Real    &offset)     L_Get_Text_Offset;
 Integer Get_text_rise         (Element element,Real    &offset)     L_Get_Text_Rise;
 Integer Get_text_angle        (Element element,Real    &angle)      L_Get_Text_Angle;
 Integer Get_text_justify      (Element element,Integer &justify)    L_Get_Text_Justify;
 Integer Get_text_units        (Element element,Integer &units)      L_Get_Text_Units;
 Integer Get_text_whiteout     (Element element,Integer &colour)     L_Get_Text_Whiteout;
 Integer Get_text_border       (Element element,Integer &colour)     L_Get_Text_Border;
 Integer Get_text_ttf_underline(Element element,Integer &underline)  L_Get_Text_TTF_Underline;
 Integer Get_text_ttf_strikeout(Element element,Integer &strikeout)  L_Get_Text_TTF_Strikeout;
 Integer Get_text_ttf_italic   (Element element,Integer &italic)     L_Get_Text_TTF_Italic;
 Integer Get_text_ttf_outline  (Element element,Integer &outline)    L_Get_Text_TTF_Outline;
 Integer Get_text_ttf_weight   (Element element,Integer &weight)     L_Get_Text_TTF_Weight;

 Integer Get_text_height       (Element element,Real    &ht)         L_Get_Text_Height;   // same as Get_text_size ?
 Integer Get_text_length       (Element element,Real    &ht)         L_Get_Text_Length;
 Integer Get_text_slant        (Element element,Real    &ht)         L_Get_Text_Slant;
 Integer Get_text_x_factor     (Element element,Real    &xfact)      L_Get_Text_X_Factor;
 Integer Get_text_style        (Element element,Text    &text)       L_Get_Text_Style;

 Integer Set_text_xy           (Element element,Real    x,Real y)    L_Set_Text_XY;                   // set text info
 Integer Set_text_xyz          (Element element,Real    x,Real y,Real z)    L_Set_Text_XYZ;
 Integer Set_text_value        (Element element,Text    value)       L_Set_Text_Value;
 Integer Set_text_size         (Element element,Real    size)        L_Set_Text_Size;
 Integer Set_text_offset       (Element element,Real    offset)      L_Set_Text_Offset;
 Integer Set_text_rise         (Element element,Real    offset)      L_Set_Text_Rise;
 Integer Set_text_angle        (Element element,Real    angle)       L_Set_Text_Angle;
 Integer Set_text_justify      (Element element,Integer justify)     L_Set_Text_Justify;
 Integer Set_text_units        (Element element,Integer units)       L_Set_Text_Units;
 Integer Set_text_whiteout     (Element element,Integer colour)      L_Set_Text_Whiteout;
 Integer Set_text_border       (Element element,Integer colour)      L_Set_Text_Border;
 Integer Set_text_ttf_underline(Element element,Integer underline)   L_Set_Text_TTF_Underline;
 Integer Set_text_ttf_strikeout(Element element,Integer strikeout)   L_Set_Text_TTF_Strikeout;
 Integer Set_text_ttf_italic   (Element element,Integer italic)      L_Set_Text_TTF_Italic;
 Integer Set_text_ttf_outline  (Element element,Integer outline)     L_Set_Text_TTF_Outline;
 Integer Set_text_ttf_weight   (Element element,Integer weight)      L_Set_Text_TTF_Weight;

 Integer Set_text_height       (Element element,Real    ht)          L_Set_Text_Height;   // same as Set_text_size ?
 Integer Set_text_slant        (Element element,Real    ht)          L_Set_Text_Slant;
 Integer Set_text_x_factor     (Element element,Real    xfact)       L_Set_Text_X_Factor;
 Integer Set_text_style        (Element element,Text    text)        L_Set_Text_Style;


 Integer Get_text_data(Element elt,Text &text,Real &x,Real &y,Real &size,
                       Integer &colour,Real &angle,Integer &justification,Integer &type,
                       Real &offset_distance,Real &rise_distance) L_Get_Data_Text;  // get values for each of the text parameters

 Integer Set_text_data(Element elt,Text text,Real x,Real y,Real size,Integer colour,
                       Real angle,Integer justification,Integer type,
                       Real offset_distance,Real rise_distance) L_Set_Data_Text;    // get values for each of the text parameters

// interface strings

 Element Create_interface(Real xarray[],Real yarray[],Real zarray[],
                          Integer farray[],Integer num_pts) L_Create_Interface;            // create interface string with positions and flags
                                                                                     //   specified
 Element Create_interface(Integer npts) L_Create_Interface_Npts;
 Element Create_interface(Integer npts,Element seed) L_Create_Interface_Seed_Npts;

 Integer Get_interface_data(Element elt,Real xarray[],Real yarray[],
                         Real zarray[],Integer farray[],Integer max_pts,
                         Integer &num_pts) L_Get_Interface_Data;                        // fill arrays of size max_pts with num_pts returned

 Integer Get_interface_data(Element elt,Real xarray[],Real yarray[],
                         Real zarray[],Integer farray[],Integer max_pts,
                         Integer &num_pts,Integer offset) L_Get_Interface_Data_Offset;     // fill arrays of size max_pts with num_pts returned
                                                                                     //   from offset

 Integer Get_interface_data(Element elt,Integer i,Real &x,Real &y,Real &z,Integer &f)
                            L_Get_Interface_Point;                                     // get the ith x, y and z and text of string

 Integer Set_interface_data(Element elt,Real xarray[],Real yarray[],
                         Real zarray[],Integer farray[],Integer num_pts)
                         L_Set_Interface_Data;                                       // fill the string with interface data for num_pts

 Integer Set_interface_data(Element elt,Real xarray[],Real yarray[],
                         Real zarray[],Integer farray[],Integer num_pts,Integer offset)
                         L_Set_Interface_Data_Offset;                                // fill the string with interface data for num_pts at
                                                                                     //   offset

 Integer Set_interface_data(Element elt,Integer i,Real x,Real y,Real z,Integer f)
                         L_Set_Interface_Point;                                      // set the ith position in string



// input from user from macro console panel

 Integer Prompt           (Text msg,Text &ret)               L_CPrompt;              // prompt for Text
 Integer Prompt           (Text msg,Integer &ret)            L_IPrompt;              // prompt for Integer
 Integer Prompt           (Text msg,Real &ret)               L_DPrompt;              // prompt for Real
 void    Prompt           (Text msg)                         L_Prompt;                                                    // print a message

 Integer Model_prompt     (Text msg,Text &ret)               L_Model_Prompt;
 Integer Tin_prompt       (Text msg,Text &ret)               L_Tin_Prompt;
 Integer Tin_prompt       (Text msg,Integer mode,Text &ret)  L_Tin_Prompt_2;
 Integer Template_prompt  (Text msg,Text &ret)               L_Template_Prompt;
 Integer Colour_prompt    (Text msg,Text &ret)               L_Colour_Prompt;
 Integer File_prompt      (Text msg,Text ext,Text &ret)      L_File_Prompt;
 Integer View_prompt      (Text msg,Text &ret)               L_View_Prompt;
 Integer Error_prompt     (Text msg)                         L_Error_Prompt;
 Integer Yes_no_prompt    (Text msg,Text &ret)               L_Yes_No_Prompt;
 Integer Plotter_prompt   (Text msg,Text &ret)               L_Plotter_Prompt;
 Integer Sheet_size_prompt(Text msg,Text &ret)               L_Sheet_Size_Prompt;
 Integer Linestyle_prompt (Text msg,Text &ret)               L_Linestyle_Prompt;
 Integer Textstyle_prompt (Text msg,Text &ret)               L_Textstyle_Prompt;
 Integer Justify_prompt   (Text msg,Text &ret)               L_Justify_Prompt;
 Integer Angle_prompt     (Text msg,Text &ret)               L_Angle_Prompt;
 Integer Function_prompt  (Text msg,Text &ret)               L_Function_Prompt;
 Integer Project_prompt   (Text msg,Text &ret)               L_Project_Prompt;
 Integer Directory_prompt (Text msg,Text &ret)               L_Directory_Prompt;
 Integer Text_units_prompt(Text msg,Text &ret)               L_Text_Units_Prompt;
 Integer XYZ_prompt       (Text msg,Real &x,Real &y,Real &z) L_XYZ_Prompt;
 Integer Name_prompt      (Text msg,Text &ret)               L_Name_Prompt;

 Integer Choice_prompt    (Text msg,Integer no_choices,Text choices[],Text &ret) L_Choice_Prompt;

 Integer Panel_prompt   (Text name,Integer interactive,Integer no_fields,
                         Text field_name[],Text field_value[]) L_Panel_Prompt;

 Integer Panel_prompt   (Text name,Integer interactive,Text data) L_Panel_Prompt_SLF;

 Integer Select_string(Text msg,Element &string) L_Select_String;                      // get a string picked by the user
 Integer Select_string(Text msg,Element &string,
                       Real &x,Real &y,Real &z,
                       Real &ch,Real &ht) L_Select_String_Position;

 Integer Select_string(Text msg,Element &string,
                       Real &x,Real &y,Real &z,
                       Real &ch,Real &ht,Integer &dir) L_Select_String_Position_Dir;

// output to stderr

 void Print(Text) L_CPrint;                                                            // print Text
 void Print(Integer) L_IPrint;                                                         // print Integer
 void Print(Real) L_DPrint;                                                            // print Real
 void Print(Uid) L_Uid_Print;                                                          // print Real
 void Print() L_NPrint;                                                                // ----------------

// string functions

 Integer Get_length(Segment,Real &) L_Get_Segment_Length;                              // get plan length of string (endch - startch)
 Integer Get_length_3d(Segment,Real &) L_Get_Segment_Length_3D;                        // get plan length of string (endch - startch)

 Integer Get_length(Element element,Real &) L_Get_String_Length;                       // get plan length of string (endch - startch)
 Integer Get_length_3d(Element element,Real &) L_Get_String_Length_3D;                 // get 3d length of string (endch - startch)
 Integer Get_length_3d(Element element, Real ch, Real &len)
         L_Get_String_Length_With_Chainage_3D;                                         // get 3d length of string up until a given chainage

 Integer Get_position(Element elt,Real ch,Real &x,Real &y,Real &z,Real &dir)
                   L_Get_String_Position;                                              // get position, start chainage and direction of string

 Integer Get_position(Element elt,Real ch,Real &x,Real &y,Real &z,Real &dir,
                                  Integer &ip,Real &distance) L_Get_String_Position2;  // get position, start chainage and direction of string

 Integer Get_position(Element elt,Real ch,Real &x,Real &y,Real &z,Real &dir,
                      Real &radius,Real &grade) L_Get_String_Position_Full;            // get position, start chainage and direction of string
                                                                                       // only is true for alignment string at this stage

 Integer Drop_point(Element elt,Real xd,Real yd,Real zd,Real &xf,Real &yf,
                 Real &zf,Real &ch,Real &dir,Real &off) L_Drop_Onto_String;            // drop a point onto a string, position returned in
                                                                                       // xf, yf, zf. ch is chainage on string, dir is
                                                                                       // instantaneous direction on string and offset is the
                                                                                       // distance from the point to the drop point
 Integer Drop_point(Element elt,Real xd,Real yd,Real zd,Real &xf,Real &yf,
                 Real &zf,Real &ch,Real &dir,Real &off,
                 Segment &segment) L_Drop_Onto_String_Segment;                         // drop a point onto a string, position returned in
                                                                                       // xf, yf, zf. ch is chainage on string, dir is
                                                                                       // instantaneous direction on string and offset is the
                                                                                       // distance from the point to the drop point
 Integer Plan_area(Element element,Real &) L_Plan_Area;
 Integer Plan_area(Segment,Real &) L_Segment_Plan_Area;

 Integer Parallel      (Element in,Real d,Element &out) L_String_Parallel;
 Integer String_reverse(Element in,Element &out) L_String_Reverse;
 Integer String_replace(Element from,Element &to) L_String_Replace;

 Integer String_open  (Element s) L_String_Open;
 Integer String_close (Element s) L_String_Close;
 Integer String_closed(Element s,Integer &closed) L_String_Closed;

// misc 4d functions

 // fence the Dynamic_Element data_to_fence using the mode 0 = in, 1 = out, 2 = in and out
 // using the fence in fence_list, returning the inside in ret_inside and the
 // outside in ret_outside.
 // a returned value of zero indicates successful operation

 Integer Fence(Dynamic_Element data_to_fence,Integer mode,Dynamic_Element fence_list,Dynamic_Element &ret_inside,Dynamic_Element &ret_outside) L_Fence;


 // perform head to tail processing on in_list (list of strings) and stores it in out_list

 Integer Head_to_tail(Dynamic_Element in_list,Dynamic_Element &out_list) L_Head_To_Tail;


 // convert the strings in in_list use mode 1 = 2d->3d, 2 = 3d->2d, 3 = 4d->3d
 // and pass_others will copy other string types if non zero, the converted strings
 // are returned in out_list

 Integer Convert(Dynamic_Element in_list,Integer mode,Integer pass_others,Dynamic_Element &out_list) L_Convert;


 // filter the data from in_list using the mode 0 = 2d only, 1 = 3d only
 // if pass_others is non-zero elements that can't be processed using the mode will be copied

 Integer Filter(Dynamic_Element in_list,Integer mode,Integer pass_others,Real tolerance,Dynamic_Element &out_list) L_Filter;


 // list is the original data to be traingulated , tin_name is the destination name, colour is destination
 // tin colour a non zero value for preserve allows break lines to be preserved, a non zero value for bubbles
 // removes bubbles from the triangulation. The result is stored in tin

 Integer Triangulate(Dynamic_Element list,Text tin_name,Integer colour,Integer preserve,Integer bubbles,Tin &tin) L_Triangulate;

 // tin is the tin to contour, cmin and cmax are the minimum and maximum z values to contour between,
 // cinc is the contour increment, cref is a z value that the contour will pass through, ccol is the
 // colour of the contours, clist is where the contours are stored, binc is the increment of the bold
 // contours, bcol is the colour of the bold contours and blist is where the bold contours are stored.
 // if binc is zero then no bold contour processing is performed

 Integer Contour(Tin tin,Real cmin,Real cmax,Real cinc,Real cref,Integer ccol,Dynamic_Element &clist,Real binc,Integer bcol,Dynamic_Element &blist) L_Contour;


 // make null the triangles inside or outside a polygon
 // tin is the tin to null, poly is the polygon which restricts the nulling, mode is 0 for inside and 1 for outside

 Integer Null_triangles(Tin tin,Element poly,Integer mode) L_Tin_Null_Triangles;

 // reset triangles inside or outside a polygon
 // tin is the tin to reset, poly is the polygon which restricts the nulling, mode is 0 for inside and 1 for outside

 Integer Reset_null_triangles(Tin tin,Element poly,Integer mode) L_Tin_Reset_Null_Triangles;

 // reset the whole tin

 Integer Reset_null_triangles(Tin tin) L_Tin_Reset_All_Null_Triangles;

 // tin is the tin to drape to, model is the model of strings to be draped and draped_strings
 // is the list that the draped strings are stored in

 Integer Drape(Tin tin,Dynamic_Element model,Dynamic_Element &draped_strings) L_Drape;

 // tin is the tin to drape to, model is the model of strings to be draped and draped_strings
 // is the list that the face draped strings are stored in

 Integer Face_drape(Tin tin,Dynamic_Element model,Dynamic_Element &frace_draped_strings) L_Face_Drape;


 // end area volume from tin to rl
 // takes the volume from tin tin_1 in polygon poly to rl rl using angle ang and separation sep
 // storing report_mode { } report in file report_name ("" means no file written), returning cut
 // fill and balance

 Integer Volume(Tin tin_1,Real rl,Element poly,Real ang,Real sep,Text report_name,
                Integer report_mode,Real &cut,Real &fill,Real &balance) L_Volume_Tin_RL;


 // end area volume from tin to tin
 // takes the volume from tins tin_1 to tin_2 inside polygon poly using angle and separation sep
 // storing report_mode { } report in file report_name ("" means no file written), returning cut
 // fill and balance

 Integer Volume(Tin tin_1,Tin tin_2,Element poly,Real ang,Real sep,Text report_name,
                Integer report_mode,Real &cut,Real &fill,Real &balance) L_Volume_Tin_Tin;


// volumes between sections - sections must be linear

 Integer Volume(Dynamic_Element list_1,
                Dynamic_Element list_2,
                Integer use_pappus,
                Real &cut,Real &fill,Real &balance) L_Volume_Section_Section_Simple;

 // prismoidal (exact) volume from tin to rl
 // takes the volume from tin_1 in polygon poly to rl rl returning cut fill and balance

 Integer Volume_exact(Tin tin_1,Real rl,Element poly,Real &cut,Real &fill,Real &balance) L_Volume_Exact_Tin_RL;


 // prismoidal (exact) volume tin to tin
 // tin_1 and tin_2 are the tins, the volumes calculated inside poly, cut is the cut volume, fill is the fill volume
 // and balance is the balance

 Integer Volume_exact(Tin tin_1,Tin tin_2,Element poly,Real &cut,Real &fill,Real &balance) L_Volume_Exact_Tin_Tin;


 // perform interface aInteger tin using string with cut_slope, fill_slope, separation, search_dist and side { -ve left, +ve right }
 // storing the result in interface

 Integer Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real separation,
                   Real search_dist,Integer side,Element &int_string) L_Interface;


 // perform interface aInteger tin using string with cut_slope, fill_slope, separation, search_dist and side { -ve left, +ve right },
 // storing the result in interface with extra annotation stored in tadpoles

 Integer Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real separation,
                   Real search_dist,Integer side,Element &int_string,Dynamic_Element &tadpoles) L_Interface_Slopelines;


 // colour the tin with colour using polygon and mode { inside = 0, outside = 1 }

 Integer Colour_triangles(Tin tin,Integer colour,Element polygon,Integer mode) L_Tin_Colour_Triangles;


 // reset the tin using poly and mode { inside = 0, outside = 1 }

 Integer Reset_colour_triangles(Tin tin,Element poly,Integer mode) L_Tin_Reset_Colour_Triangles;

 // resets the whole tin to the tin colour

 Integer Reset_colour_triangles(Tin tin) L_Tin_Reset_All_Colour_Triangles;

 Integer Tin_boundary(Tin tin,Integer colour_for_strings,Dynamic_Element &boundaries) L_Tin_Boundary;

// MENUS

 Menu Create_menu(Text title) L_Create_Menu;                                                      // create menu widget
 Integer Menu_delete(Menu menu) L_Delete_Menu;

 Integer Create_button(Menu menu,Text title,Text reply) L_Create_Button;                          // append button with return value to widget
 Integer Display(Menu menu,Integer &x,Integer &y,Text &reply) L_Select_Menu;                      // get reply from widget
 Integer Display_relative(Menu menu,Integer &x,Integer &y,Text &reply) L_Select_Menu_Relative;    // get reply from widget

// panel calls

 Panel            Create_panel           (Text title)                L_Create_Panel;
 Integer          Append                 (Widget widget,Panel panel) L_Panel_Append_Widget;

 Sheet_Panel      Create_sheet_panel     (Text title)                         L_Create_Sheet_Panel;
 Integer          Append                 (Panel widget,Sheet_Panel panel)     L_Sheet_Panel_Append_Widget;
 Integer          Set_page               (Sheet_Panel panel,Integer  page_no) L_Sheet_Panel_Set_Page;
 Integer          Get_page               (Sheet_Panel panel,Integer &page_no) L_Sheet_Panel_Get_Page;
 Integer          Set_common             (Sheet_Panel panel,Widget common)    L_Sheet_Panel_Set_Common;
 Integer          Set_stacked            (Sheet_Panel panel,Integer stack)    L_Sheet_Panel_Set_Stacked;

// SLX calls

 Integer          Write_SLX(Panel panel,Text filename) L_Panel_Write_SLX;
 Integer          Read_SLX (Panel panel,Text filename) L_Panel_Read_SLX;

// control widgets

 Vertical_Group   Create_vertical_group  (Integer mode)  L_Create_Vertical_Group;
 Horizontal_Group Create_horizontal_group(Integer model) L_Create_Horizontal_Group;
 Horizontal_Group Create_button_group    ()              L_Create_Button_Group;

 Integer          Append(Widget widget,Horizontal_Group group) L_Horizontal_Group_Append_Widget;
 Integer          Append(Widget widget,Vertical_Group   group) L_Vertical_Group_Append_Widget;

 Integer          Set_border(Horizontal_Group group,Integer bx,Integer by) L_Horizontal_Group_Set_Border;
 Integer          Set_border(Vertical_Group   group,Integer bx,Integer by) L_Vertical_Group_Set_Border;

 Integer          Set_border(Horizontal_Group group,Text text) L_Horizontal_Group_Set_Border_Text;
 Integer          Set_border(Vertical_Group   group,Text text) L_Vertical_Group_Set_Border_Text;

 Integer          Set_gap   (Horizontal_Group group,Integer gap) L_Horizontal_Group_Set_Gap;
 Integer          Set_gap   (Vertical_Group   group,Integer gap) L_Vertical_Group_Set_Gap;

 Widget_Pages     Create_widget_pages()                        L_Create_Widget_Pages;

 Integer          Append     (Widget widget,Widget_Pages pages)   L_Widget_Pages_Append_Widget;
 Integer          Set_page   (Widget_Pages pages,Integer page_no) L_Widget_Pages_Set_Page;

 Integer          Set_page   (Widget_Pages pages,Widget   widget)                  L_Widget_Pages_Set_Page_from_Widget;
 Integer          Get_page   (Widget_Pages pages,Widget   widget,Integer &page_no) L_Widget_Pages_Get_Page_from_Widget;

 Tab_Box          Create_tab_box()                                 L_Create_Tab_Box;
 Integer          Append     (Widget widget,Tab_Box pages)            L_Tab_Box_Append_Widget;
 Integer          Append     (Widget widget,Text name,Tab_Box pages)  L_Tab_Box_Append_Named_Widget;
 Integer          Set_page   (Tab_Box pages,Integer  page_no)         L_Tab_Box_Set_Page;
 Integer          Get_page   (Tab_Box pages,Integer &page_no)         L_Tab_Box_Get_Page;

 Integer          Set_page   (Tab_Box pages,Widget   widget)                  L_Tab_Box_Set_Page_from_Widget;
 Integer          Get_page   (Tab_Box pages,Widget   widget,Integer &page_no) L_Tab_Box_Get_Page_from_Widget;

 Integer          Set_tab    (Tab_Box pages,Integer  page_no,Text  t) L_Tab_Box_Set_Page_Name;
 Integer          Get_tab    (Tab_Box pages,Integer  page_no,Text &t) L_Tab_Box_Get_Page_Name;
 Integer          Set_stacked(Tab_Box pages,Integer  stack)           L_Tab_Box_Set_Stack;
 Integer          Get_stacked(Tab_Box pages,Integer &stack)           L_Tab_Box_Get_Stack;

// overlay widgets

 Overlay_Widget   Create_overlay_widget  (Integer mode)                  L_Create_Overlay_Widget;
 Integer          Set_lower_widget       (Overlay_Widget w,Widget lower) L_Set_Overlay_Widget_Lower;
 Integer          Set_upper_widget       (Overlay_Widget w,Widget lower) L_Set_Overlay_Widget_Upper;

// input widgets

 Message_Box      Create_message_box     (Text title)                 L_Create_Message_Box;
 Integer          Get_data               (Message_Box box,Text &data) L_Get_Data_Message_Box;
 Integer          Set_data               (Message_Box box,Text data)  L_Set_Data_Message_Box;

 Model_Box        Create_model_box       (Text title,Message_Box message,Integer mode) L_Create_Model_Box;
 Integer          Validate               (Model_Box box,Integer mode,Model &result)    L_Validate_Model_Box;
 Integer          Get_data               (Model_Box box,Text &data)                    L_Get_Data_Model_Box;
 Integer          Set_data               (Model_Box box,Text data)                     L_Set_Data_Model_Box;

 Function_Box     Create_function_box    (Text title,Message_Box message,Integer mode,Integer type) L_Create_Function_Box;
 Integer          Validate               (Function_Box box,Integer mode,Function &result)           L_Validate_Function_Box;
 Integer          Get_data               (Function_Box box,Text    &data)                           L_Get_Data_Function_Box;
 Integer          Set_data               (Function_Box box,Text     data)                           L_Set_Data_Function_Box;
 Integer          Get_type               (Function_Box box,Integer &type)                           L_Get_Type_Function_Box;
 Integer          Set_type               (Function_Box box,Integer  type)                           L_Set_Type_Function_Box;
 Integer          Get_type               (Function_Box box,Text    &type)                           L_Get_Named_Type_Function_Box;
 Integer          Set_type               (Function_Box box,Text     type)                           L_Set_Named_Type_Function_Box;

 Angle_Box        Create_angle_box       (Text title,Message_Box message)  L_Create_Angle_Box;
 Integer          Validate               (Angle_Box box,Real &result)      L_Validate_Angle_Box;
 Integer          Get_data               (Angle_Box box,Text &data)        L_Get_Data_Angle_Box;
 Integer          Set_data               (Angle_Box box,Real  data)        L_Set_Data_Angle_Box;
 Integer          Set_data               (Angle_Box box,Text  data)        L_Set_Text_Angle_Box;

 Choice_Box       Create_choice_box      (Text title,Message_Box message)           L_Create_Choice_Box;
 Integer          Validate               (Choice_Box box,Text &result)              L_Validate_Choice_Box;
 Integer          Get_data               (Choice_Box box,Text &data)                L_Get_Data_Choice_Box;
 Integer          Set_data               (Choice_Box box,Text  data)                L_Set_Data_Choice_Box;
 Integer          Set_data               (Choice_Box box,Integer nc,Text choices[]) L_Set_List_Choice_Box;

 Colour_Box       Create_colour_box      (Text title,Message_Box message)  L_Create_Colour_Box;
 Integer          Validate               (Colour_Box box,Integer &result)  L_Validate_Colour_Box;
 Integer          Get_data               (Colour_Box box,Text    &data)    L_Get_Data_Colour_Box;
 Integer          Set_data               (Colour_Box box,Integer  data)    L_Set_Data_Colour_Box;
 Integer          Set_data               (Colour_Box box,Text     data)    L_Set_Text_Colour_Box;

 Directory_Box    Create_directory_box   (Text title,Message_Box message,Integer mode) L_Create_Directory_Box;
 Integer          Validate               (Directory_Box box,Integer mode,Text &result) L_Validate_Directory_Box;
 Integer          Get_data               (Directory_Box box,Text &data)                L_Get_Data_Directory_Box;
 Integer          Set_data               (Directory_Box box,Text  data)                L_Set_Data_Directory_Box;

 Real_Box         Create_real_box        (Text title,Message_Box message)  L_Create_Real_Box;
 Integer          Validate               (Real_Box box,Real &result)       L_Validate_Real_Box;
 Integer          Get_data               (Real_Box box,Text &data)         L_Get_Data_Real_Box;
 Integer          Set_data               (Real_Box box,Real  data)         L_Set_Data_Real_Box;
 Integer          Set_data               (Real_Box box,Text  data)         L_Set_Text_Real_Box;

 Chainage_Box     Create_chainage_box    (Text title,Message_Box message)  L_Create_Chainage_Box;
 Integer          Validate               (Chainage_Box box,Real &result)   L_Validate_Chainage_Box;
 Integer          Get_data               (Chainage_Box box,Text &data)     L_Get_Data_Chainage_Box;
 Integer          Set_data               (Chainage_Box box,Real  data)     L_Set_Data_Chainage_Box;
 Integer          Set_data               (Chainage_Box box,Text  data)     L_Set_Text_Chainage_Box;

 File_Box         Create_file_box        (Text title,Message_Box message,Integer mode,Text wild) L_Create_File_Box;
 Integer          Validate               (File_Box box,Integer mode,Text &result)                L_Validate_File_Box;
 Integer          Get_data               (File_Box box,Text &data)                               L_Get_Data_File_Box;
 Integer          Set_data               (File_Box box,Text  data)                               L_Set_Data_File_Box;
 Integer          Get_wildcard           (File_Box box,Text &data)                               L_Get_Wildcard_File_Box;
 Integer          Set_wildcard           (File_Box box,Text  data)                               L_Set_Wildcard_File_Box;
 Integer          Get_directory          (File_Box box,Text &data)                               L_Get_Directory_File_Box;
 Integer          Set_directory          (File_Box box,Text  data)                               L_Set_Directory_File_Box;
 Integer          Get_libraries          (File_Box box,Integer &data)                            L_Get_Libraries_File_Box;
 Integer          Set_libraries          (File_Box box,Integer  data)                            L_Set_Libraries_File_Box;
 Integer          Get_setups             (File_Box box,Integer &data)                            L_Get_Setups_File_Box;
 Integer          Set_setups             (File_Box box,Integer  data)                            L_Set_Setups_File_Box;
 Integer          Get_many               (File_Box box,Integer &data)                            L_Get_Many_File_Box;
 Integer          Set_many               (File_Box box,Integer  data)                            L_Set_Many_File_Box;

 Integer          Set_encoding           (File_Box box,Integer  encoding)                        L_Set_Encoding_File_Box;
 Integer          Get_encoding           (File_Box box,Integer &encoding)                        L_Get_Encoding_File_Box;
 Integer          Set_show_encodings     (File_Box box,Integer  show)                            L_Set_Show_Encodings_File_Box;
 Integer          Get_show_encodings     (File_Box box,Integer &show)                            L_Get_Show_Encodings_File_Box;

 Input_Box        Create_input_box       (Text title,Message_Box message)  L_Create_Input_Box;

 Integer          Set_multi_line         (Input_Box box,Integer  no_lines) L_Set_Multi_Line_Input_Box;
 Integer          Get_multi_line         (Input_Box box,Integer &no_lines) L_Get_Multi_Line_Input_Box;

 Integer          Validate               (Input_Box box,Text &result)      L_Validate_Input_Box;
 Integer          Get_data               (Input_Box box,Text &data)        L_Get_Data_Input_Box;
 Integer          Set_data               (Input_Box box,Text  data)        L_Set_Data_Input_Box;

 Integer_Box      Create_integer_box     (Text title,Message_Box message)  L_Create_Integer_Box;
 Integer          Validate               (Integer_Box box,Integer &result) L_Validate_Integer_Box;
 Integer          Get_data               (Integer_Box box,Text    &data)   L_Get_Data_Integer_Box;
 Integer          Set_data               (Integer_Box box,Integer  data)   L_Set_Data_Integer_Box;
 Integer          Set_data               (Integer_Box box,Text     data)   L_Set_Text_Integer_Box;

 Justify_Box      Create_justify_box     (Text title,Message_Box message)  L_Create_Justify_Box;
 Integer          Validate               (Justify_Box box,Integer &result) L_Validate_Justify_Box;
 Integer          Get_data               (Justify_Box box,Text    &data)   L_Get_Data_Justify_Box;
 Integer          Set_data               (Justify_Box box,Integer  data)   L_Set_Data_Justify_Box;
 Integer          Set_data               (Justify_Box box,Text     data)   L_Set_Text_Justify_Box;

 Linestyle_Box    Create_linestyle_box   (Text title,Message_Box message,Integer mode) L_Create_Linestyle_Box;
 Integer          Validate               (Linestyle_Box box,Integer mode,Text &result) L_Validate_Linestyle_Box;
 Integer          Get_data               (Linestyle_Box box,Text &data)                L_Get_Data_Linestyle_Box;
 Integer          Set_data               (Linestyle_Box box,Text  data)                L_Set_Data_Linestyle_Box;

 Symbol_Box       Create_symbol_box      (Text title,Message_Box message,Integer mode) L_Create_Symbol_Box;
 Integer          Validate               (Symbol_Box box,Integer mode,Text &result)    L_Validate_Symbol_Box;
 Integer          Get_data               (Symbol_Box box,Text &data)                   L_Get_Data_Symbol_Box;
 Integer          Set_data               (Symbol_Box box,Text  data)                   L_Set_Data_Symbol_Box;

 Map_File_Box     Create_map_file_box    (Text title,Message_Box message,Integer mode) L_Create_Map_File_Box;
 Integer          Validate               (Map_File_Box box,Integer mode,Text &result)  L_Validate_Map_File_Box;
 Integer          Get_data               (Map_File_Box box,Text &data)                 L_Get_Data_Map_File_Box;
 Integer          Set_data               (Map_File_Box box,Text  data)                 L_Set_Data_Map_File_Box;

 Name_Box         Create_name_box        (Text title,Message_Box message)  L_Create_Name_Box;
 Integer          Validate               (Name_Box box,Text &result)       L_Validate_Name_Box;
 Integer          Get_data               (Name_Box box,Text &data)         L_Get_Data_Name_Box;
 Integer          Set_data               (Name_Box box,Text  data)         L_Set_Data_Name_Box;

 Named_Tick_Box   Create_named_tick_box  (Text title,Integer state,Text response) L_Create_Named_Tick_Box;
 Integer          Validate               (Named_Tick_Box box,Integer &result)     L_Validate_Named_Tick_Box;
 Integer          Get_data               (Named_Tick_Box box,Text    &data)       L_Get_Data_Named_Tick_Box;
 Integer          Set_data               (Named_Tick_Box box,Integer  data)       L_Set_Bool_Named_Tick_Box;
 Integer          Set_data               (Named_Tick_Box box,Text     data)       L_Set_Data_Named_Tick_Box;

 Plotter_Box      Create_plotter_box     (Text title,Message_Box message)  L_Create_Plotter_Box;
 Integer          Validate               (Plotter_Box box,Text &result)    L_Validate_Plotter_Box;
 Integer          Get_data               (Plotter_Box box,Text &data)      L_Get_Data_Plotter_Box;
 Integer          Set_data               (Plotter_Box box,Text  data)      L_Set_Data_Plotter_Box;

 Integer          Validate               (Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text &plotter_type) L_Validate_Plotter_Box_Ex;
 Integer          Get_data               (Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text &plotter_type) L_Get_Data_Plotter_Box_Ex;
 Integer          Set_data               (Plotter_Box box,Text  plotter_mode,Text  plotter_names,Text  plotter_type) L_Set_Data_Plotter_Box_Ex;

 Report_Box       Create_report_box      (Text title,Message_Box message,Integer mode) L_Create_Report_Box;
 Integer          Validate               (Report_Box box,Integer mode,Text &result)    L_Validate_Report_Box;
 Integer          Get_data               (Report_Box box,Text &data)                   L_Get_Data_Report_Box;
 Integer          Set_data               (Report_Box box,Text  data)                   L_Set_Data_Report_Box;

 Template_Box     Create_template_box    (Text title,Message_Box message,Integer mode) L_Create_Template_Box;
 Integer          Validate               (Template_Box box,Integer mode,Text &result)  L_Validate_Template_Box;
 Integer          Get_data               (Template_Box box,Text &data)                 L_Get_Data_Template_Box;
 Integer          Set_data               (Template_Box box,Text  data)                 L_Set_Data_Template_Box;

 Sheet_Size_Box   Create_sheet_size_box  (Text title,Message_Box message)                L_Create_Sheet_Size_Box;
 Integer          Validate               (Sheet_Size_Box box,Real &w,Real &h,Text &code) L_Validate_Sheet_Size_Box;
 Integer          Get_data               (Sheet_Size_Box box,Text &data)                 L_Get_Data_Sheet_Size_Box;
 Integer          Set_data               (Sheet_Size_Box box,Text  data)                 L_Set_Data_Sheet_Size_Box;

 Text_Style_Box   Create_text_style_box  (Text title,Message_Box message)  L_Create_Text_Style_Box;
 Integer          Validate               (Text_Style_Box box,Text &result) L_Validate_Text_Style_Box;
 Integer          Get_data               (Text_Style_Box box,Text &data)   L_Get_Data_Text_Style_Box;
 Integer          Set_data               (Text_Style_Box box,Text  data)   L_Set_Data_Text_Style_Box;

 Text_Units_Box   Create_text_units_box  (Text title,Message_Box message)     L_Create_Text_Units_Box;
 Integer          Validate               (Text_Units_Box box,Integer &result) L_Validate_Text_Units_Box;
 Integer          Get_data               (Text_Units_Box box,Text    &data)   L_Get_Data_Text_Units_Box;
 Integer          Set_data               (Text_Units_Box box,Integer  data)   L_Set_Data_Text_Units_Box;
 Integer          Set_data               (Text_Units_Box box,Text     data)   L_Set_Text_Text_Units_Box;

 Tick_Box         Create_tick_box        (Message_Box message)            L_Create_Tick_Box;
 Integer          Validate               (Tick_Box box,Integer &result)   L_Validate_Tick_Box;
 Integer          Get_data               (Tick_Box box,Text    &data)     L_Get_Data_Tick_Box;
 Integer          Set_data               (Tick_Box box,Text     data)     L_Set_Data_Tick_Box;

 Tin_Box          Create_tin_box         (Text title,Message_Box message,Integer mode) L_Create_Tin_Box;
 Integer          Validate               (Tin_Box box,Integer mode,Tin &result)        L_Validate_Tin_Box;
 Integer          Get_data               (Tin_Box box,Text &data)                      L_Get_Data_Tin_Box;
 Integer          Set_data               (Tin_Box box,Text  data)                      L_Set_Data_Tin_Box;
 Integer          Set_supertin           (Tin_Box box,Integer mode)                    L_Set_Supertin_Tin_Box;

 // the following calls allow exact control on valid tins (via type, mode, and access)
 // the default control is Tin, Read, Section
 // if you want different control, you have to use the calls below

 // allowable type values are Tin=1 , Supertin = 2 , Gridtin = 3

 Integer          Set_tin_type           (Tin_Box box,Integer type)                             L_Set_Tin_Type_Box;
 Integer          Set_tin_type           (Tin_Box box,Integer type,Integer type2)               L_Set_Tin_Type2_Box;
 Integer          Set_tin_type           (Tin_Box box,Integer type,Integer type2,Integer type3) L_Set_Tin_Type3_Box;
 Integer          Set_all_tin_types      (Tin_Box box)                                          L_Set_Tin_All_Types_Box;

 // allowable mode values are Section=1 , Exact=2

 Integer          Set_tin_mode           (Tin_Box box,Integer mode)                             L_Set_Tin_Mode_Box;
 Integer          Set_tin_mode           (Tin_Box box,Integer mode,Integer mode2)               L_Set_Tin_Mode2_Box;
 Integer          Set_all_tin_modes      (Tin_Box box)                                          L_Set_Tin_All_Modes_Box;

 // allow access values are Read=1 , Write=2

 Integer          Set_tin_access         (Tin_Box box,Integer access)                           L_Set_Tin_Access_Box;
 Integer          Set_tin_access         (Tin_Box box,Integer access,Integer access2)           L_Set_Tin_Access2_Box;

 // view_box

 View_Box         Create_view_box        (Text title,Message_Box message,Integer mode) L_Create_View_Box;
 Integer          Validate               (View_Box box,Integer mode,View &result)      L_Validate_View_Box;
 Integer          Get_data               (View_Box box,Text &data)                     L_Get_Data_View_Box;
 Integer          Set_data               (View_Box box,Text  data)                     L_Set_Data_View_Box;

 // the following calls allow exact control on valid views (via type, mode)
 // the default control is ?
 // if you want different control, you have to use the calls below

 // allowable type values are Plan=1 , Perspective=2 , Section=3 , Hidden=4

 Integer          Set_view_type          (View_Box box,Integer type)                             L_Set_View_Type_Box;
 Integer          Set_view_type          (View_Box box,Integer type,Integer type2)               L_Set_View_Type2_Box;
 Integer          Set_view_type          (View_Box box,Integer type,Integer type2,Integer type3) L_Set_View_Type3_Box;
 Integer          Set_all_view_types     (View_Box box)                                          L_Set_View_All_Types_Box;

 // allowable engine values are GDI=1 , OpenGL=2 , OpenGL_GPU=3 (3 not implimented yet)

 Integer          Set_view_engine        (View_Box box,Integer mode)                             L_Set_View_Engine_Box;

 // XYZ_Box

 XYZ_Box          Create_xyz_box         (Text title,Message_Box message)      L_Create_XYZ_Box;
 Integer          Validate               (XYZ_Box box,Real &x,Real &y,Real &z) L_Validate_XYZ_Box;
 Integer          Get_data               (XYZ_Box box,Text &data)              L_Get_Data_XYZ_Box;
 Integer          Set_data               (XYZ_Box box,Real  x,Real  y,Real  z) L_Set_Data_XYZ_Box;
 Integer          Set_data               (XYZ_Box box,Text  data)              L_Set_Text_XYZ_Box;

 New_XYZ_Box      Create_new_xyz_box     (Text title,Message_Box message)          L_Create_New_XYZ_Box;
 Integer          Validate               (New_XYZ_Box box,Real &x,Real &y,Real &z) L_Validate_New_XYZ_Box;
 Integer          Get_data               (New_XYZ_Box box,Text &data)              L_Get_Data_New_XYZ_Box;
 Integer          Set_data               (New_XYZ_Box box,Real  x,Real  y,Real  z) L_Set_Data_New_XYZ_Box;
 Integer          Set_data               (New_XYZ_Box box,Text  data)              L_Set_Text_New_XYZ_Box;

 Billboard_Box    Create_billboard_box   (Text title,Message_Box message)      L_Create_Billboard_Box;
 Integer          Validate               (Billboard_Box box,Text &data)        L_Validate_Billboard_Box;
 Integer          Get_data               (Billboard_Box box,Text &data)        L_Get_Data_Billboard_Box;
 Integer          Set_data               (Billboard_Box box,Text  data)        L_Set_Data_Billboard_Box;

 Texture_Box      Create_texture_box     (Text title,Message_Box message)      L_Create_Texture_Box;
 Integer          Validate               (Texture_Box box,Text &data)          L_Validate_Texture_Box;
 Integer          Get_data               (Texture_Box box,Text &data)          L_Get_Data_Texture_Box;
 Integer          Set_data               (Texture_Box box,Text  data)          L_Set_Data_Texture_Box;

 Bitmap_Fill_Box  Create_bitmap_fill_box (Text title,Message_Box message)      L_Create_Bitmap_Fill_Box;
 Integer          Validate               (Bitmap_Fill_Box box,Text &data)      L_Validate_Bitmap_Fill_Box;
 Integer          Get_data               (Bitmap_Fill_Box box,Text &data)      L_Get_Data_Bitmap_Fill_Box;
 Integer          Set_data               (Bitmap_Fill_Box box,Text  data)      L_Set_Data_Bitmap_Fill_Box;

// attributes

 Attributes_Box   Create_attributes_box  (Text title,Message_Box message)      L_Create_Attributes_Box;
 Integer          Validate               (Attributes_Box box,Attributes &data) L_Validate_Attributes_Box;
 Integer          Get_data               (Attributes_Box box,Text &data)       L_Get_Data_Attributes_Box;
 Integer          Set_data               (Attributes_Box box,Attributes &data) L_Set_Data_Attributes_Box;
 Integer          Set_data               (Attributes_Box box,Text        data) L_Set_Text_Attributes_Box;

// date time box

 Date_Time_Box    Create_date_time_box   (Text title,Message_Box message)      L_Create_Date_Time_Box;

// form parameter
//
// Show_Date = 0
// Show_Time = 1
// Show_Date_Time = 2
// Show_Time_Decimals = 3
// Show_Date_Time_Decimals = 4

 Integer          Set_format             (Date_Time_Box box,Integer  form)     L_Set_Format_Date_Time_Box;
 Integer          Set_gmt                (Date_Time_Box box,Integer  tf)       L_Set_GMT_Date_Time_Box;

 Integer          Validate               (Date_Time_Box box,Integer &data)     L_Validate_Integer_Date_Time_Box;
 Integer          Validate               (Date_Time_Box box,Real    &data)     L_Validate_Real_Date_Time_Box;
 Integer          Validate               (Date_Time_Box box,Text    &data)     L_Validate_Date_Time_Box;
 Integer          Get_data               (Date_Time_Box box,Text    &data)     L_Get_Data_Date_Time_Box;
 Integer          Set_data               (Date_Time_Box box,Text     data)     L_Set_Data_Date_Time_Box;
 Integer          Get_data               (Date_Time_Box box,Integer &data)     L_Get_Integer_Date_Time_Box;
 Integer          Set_data               (Date_Time_Box box,Integer  data)     L_Set_Integer_Date_Time_Box;
 Integer          Get_data               (Date_Time_Box box,Real    &data)     L_Get_Real_Date_Time_Box;
 Integer          Set_data               (Date_Time_Box box,Real     data)     L_Set_Real_Date_Time_Box;

// hyperlink box

 HyperLink_Box    Create_hyperlink_box   (Text title,Message_Box message)      L_Create_HyperLink_Box;
 Integer          Validate               (HyperLink_Box box,Text &data)        L_Validate_HyperLink_Box;
 Integer          Get_data               (HyperLink_Box box,Text &data)        L_Get_Data_HyperLink_Box;
 Integer          Set_data               (HyperLink_Box box,Text  data)        L_Set_Data_HyperLink_Box;

// textstyle data calls

 Integer          Null         (Textstyle_Data textdata)                 L_Reset_Textstyle_Data;
 Integer          Null         (Textstyle_Data textdata,Integer mode)    L_Reset_Textstyle_Data_Mode;

 Integer          Set_textstyle    (Textstyle_Data textdata,Text     style)     L_Set_Textstyle_Data_Textstyle;
 Integer          Set_colour       (Textstyle_Data textdata,Integer  colour)    L_Set_Textstyle_Data_Colour;
 Integer          Set_text_type    (Textstyle_Data textdata,Integer  type)      L_Set_Textstyle_Data_Type;
 Integer          Set_size         (Textstyle_Data textdata,Real     size)      L_Set_Textstyle_Data_Size;
 Integer          Set_offset       (Textstyle_Data textdata,Real     offset)    L_Set_Textstyle_Data_Offset;
 Integer          Set_raise        (Textstyle_Data textdata,Real     raise)     L_Set_Textstyle_Data_Raise;
 Integer          Set_justify      (Textstyle_Data textdata,Integer  justify)   L_Set_Textstyle_Data_Justify;
 Integer          Set_angle        (Textstyle_Data textdata,Real     angle)     L_Set_Textstyle_Data_Angle;
 Integer          Set_slant        (Textstyle_Data textdata,Real     slant)     L_Set_Textstyle_Data_Slant;
 Integer          Set_x_factor     (Textstyle_Data textdata,Real     xfactor)   L_Set_Textstyle_Data_X_Factor;
 Integer          Set_name         (Textstyle_Data textdata,Text     name)      L_Set_Textstyle_Data_Name;
 Integer          Set_whiteout     (Textstyle_Data textdata,Integer  colour)    L_Set_Textstyle_Data_Whiteout;
 Integer          Set_border       (Textstyle_Data textdata,Integer  colour)    L_Set_Textstyle_Data_Border;
 Integer          Set_ttf_underline(Textstyle_Data textdata,Integer  underline) L_Set_Textstyle_Data_TTF_Underline;
 Integer          Set_ttf_strikeout(Textstyle_Data textdata,Integer  strikeout) L_Set_Textstyle_Data_TTF_Strikeout;
 Integer          Set_ttf_italic   (Textstyle_Data textdata,Integer  italic)    L_Set_Textstyle_Data_TTF_Italic;
 Integer          Set_ttf_outline  (Textstyle_Data textdata,Integer  outline)   L_Set_Textstyle_Data_TTF_Outline;
 Integer          Set_ttf_weight   (Textstyle_Data textdata,Integer  weight)    L_Set_Textstyle_Data_TTF_Weight;

 Integer          Get_textstyle    (Textstyle_Data textdata,Text    &style)     L_Get_Textstyle_Data_Textstyle;
 Integer          Get_colour       (Textstyle_Data textdata,Integer &colour)    L_Get_Textstyle_Data_Colour;
 Integer          Get_text_type    (Textstyle_Data textdata,Integer &type)      L_Get_Textstyle_Data_Type;
 Integer          Get_size         (Textstyle_Data textdata,Real    &size)      L_Get_Textstyle_Data_Size;
 Integer          Get_offset       (Textstyle_Data textdata,Real    &offset)    L_Get_Textstyle_Data_Offset;
 Integer          Get_raise        (Textstyle_Data textdata,Real    &raise)     L_Get_Textstyle_Data_Raise;
 Integer          Get_justify      (Textstyle_Data textdata,Integer &justify)   L_Get_Textstyle_Data_Justify;
 Integer          Get_angle        (Textstyle_Data textdata,Real    &angle)     L_Get_Textstyle_Data_Angle;
 Integer          Get_slant        (Textstyle_Data textdata,Real    &slant)     L_Get_Textstyle_Data_Slant;
 Integer          Get_x_factor     (Textstyle_Data textdata,Real    &xfactor)   L_Get_Textstyle_Data_X_Factor;
 Integer          Get_name         (Textstyle_Data textdata,Text    &name)      L_Get_Textstyle_Data_Name;
 Integer          Get_whiteout     (Textstyle_Data textdata,Integer &colour)    L_Get_Textstyle_Data_Whiteout;
 Integer          Get_border       (Textstyle_Data textdata,Integer &colour)    L_Get_Textstyle_Data_Border;
 Integer          Get_ttf_underline(Textstyle_Data textdata,Integer &underline) L_Get_Textstyle_Data_TTF_Underline;
 Integer          Get_ttf_strikeout(Textstyle_Data textdata,Integer &strikeout) L_Get_Textstyle_Data_TTF_Strikeout;
 Integer          Get_ttf_italic   (Textstyle_Data textdata,Integer &italic)    L_Get_Textstyle_Data_TTF_Italic;
 Integer          Get_ttf_outline  (Textstyle_Data textdata,Integer &outline)   L_Get_Textstyle_Data_TTF_Outline;
 Integer          Get_ttf_weight   (Textstyle_Data textdata,Integer &weight)    L_Get_Textstyle_Data_TTF_Weight;

 Integer          Get_data         (Textstyle_Data textdata,Text   &data)       L_Get_Text_Data_Textstyle_Data;
 Integer          Set_data         (Textstyle_Data textdata,Text    data)       L_Set_Text_Data_Textstyle_Data;


// more widget calls

 Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags) L_Create_Textstyle_Data_Box;
 Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags,Integer optionals) L_Create_Textstyle_Data_Box_V10;

 Integer            Validate(Textstyle_Data_Box box,Textstyle_Data &data) L_Validate_Textstyle_Data_Box;

 Integer            Set_data(Textstyle_Data_Box box,Textstyle_Data  data) L_Set_Data_Textstyle_Data_Box;
 Integer            Get_data(Textstyle_Data_Box box,Textstyle_Data &data) L_Get_Data_Textstyle_Data_Box;

 Integer            Set_data(Textstyle_Data_Box box,Text            data) L_Set_Text_Data_Textstyle_Data_Box;
 Integer            Get_data(Textstyle_Data_Box box,Text           &data) L_Get_Text_Data_Textstyle_Data_Box;

// more widget calls

 Source_Box         Create_source_box(Text text,Message_Box box,Integer flags) L_Create_Source_Box;
 Source_Box         Create_source_box(Text text,Message_Box box,Integer flags,Integer default_flag) L_Create_Source_Box_Ex;

 Integer            Validate         (Source_Box box,Dynamic_Element &elements) L_Validate_Source_Box;

 Integer            Get_data         (Source_Box box,Text &data)        L_Get_Data_Source_Box;
 Integer            Set_data         (Source_Box box,Text  data)        L_Set_Data_Source_Box;

 Integer            Read_favorite    (Source_Box box,Text  filename)    L_Read_Favorite_Source_Box;
 Integer            Write_favorite   (Source_Box box,Text  filename)    L_Write_Favorite_Source_Box;

// more widget calls - not implimented yet

 Target_Box         Create_target_box(Text text,Message_Box box,Integer flags) L_Create_Target_Box;
 Target_Box         Create_target_box(Text title,Message_Box message,Integer flags,Integer default_flag) L_Create_Target_Box_Ex;

 Integer            Validate(Target_Box box) L_Validate_Target_Box;
 Integer            Validate(Target_Box box,Integer &mode,Text &data) L_Validate_Target_Box_Ex;

// list box

 List_Box         Create_list_box        (Text title,Message_Box message,Integer nlines) L_Create_List_Box;
 Integer          Set_sort               (List_Box box,Integer  mode)                    L_Set_Sort_List_Box;
 Integer          Get_sort               (List_Box box,Integer &mode)                    L_Get_Sort_List_Box;
 Integer          Set_auto_cut_paste     (List_Box box,Integer  mode)                    L_Set_Auto_Cut_Paste_List_Box;
 Integer          Get_auto_cut_paste     (List_Box box,Integer &mode)                    L_Get_Auto_Cut_Paste_List_Box;
 Integer          Get_number_of_items    (List_Box box,Integer &count)                   L_Get_Number_Of_Items_List_Box;
 Integer          Set_selections         (List_Box box,Integer  mode)                    L_Set_Select_List_Box;
 Integer          Get_selections         (List_Box box,Integer &mode)                    L_Get_Select_List_Box;
 Integer          Set_caret              (List_Box box,Integer pos,Integer scroll)       L_Set_Caret_List_Box;
 Integer          Get_caret              (List_Box box,Integer &item)                    L_Get_Caret_List_Box;
 Integer          Delete_item            (List_Box box,Integer item)                     L_Delete_Item_List_Box;
 Integer          Insert_item            (List_Box box,Integer item,Text text)           L_Insert_Item_List_Box;
 Integer          Add_item               (List_Box box,Text text)                        L_Add_Item_List_Box;
 Integer          Get_item               (List_Box box,Integer item,Text &text)          L_Get_Item_List_Box;
 Integer          Set_selection          (List_Box box,Integer  item)                    L_Set_Selection_List_Box;
 Integer          Get_selection          (List_Box box,Integer &item)                    L_Get_Selection_List_Box;
 Integer          Get_selection_count    (List_Box box,Integer &count)                   L_Get_Select_Count_List_Box;

 Integer          Set_selection_list     (List_Box box,Integer maxc,Integer list[],Integer tf) L_Set_Selections_List_Box;
 Integer          Get_selection_list     (List_Box box,Integer maxc,Integer list[])            L_Get_Selections_List_Box;

// bitmap list box

 Bitmap_List_Box  Create_bitmap_list_box (Text title,Message_Box message,Integer nlines)        L_Create_Bitmap_List_Box;
 Integer          Set_sort               (Bitmap_List_Box box,Integer  mode)                    L_Set_Sort_Bitmap_List_Box;
 Integer          Get_sort               (Bitmap_List_Box box,Integer &mode)                    L_Get_Sort_Bitmap_List_Box;
 Integer          Set_auto_cut_paste     (Bitmap_List_Box box,Integer  mode)                    L_Set_Auto_Cut_Paste_Bitmap_List_Box;
 Integer          Get_auto_cut_paste     (Bitmap_List_Box box,Integer &mode)                    L_Get_Auto_Cut_Paste_Bitmap_List_Box;
 Integer          Set_selections         (Bitmap_List_Box box,Integer  mode)                    L_Set_Select_Bitmap_List_Box;
 Integer          Get_selections         (Bitmap_List_Box box,Integer &mode)                    L_Get_Select_Bitmap_List_Box;
 Integer          Set_caret              (Bitmap_List_Box box,Integer pos,Integer scroll)       L_Set_Caret_Bitmap_List_Box;
 Integer          Get_caret              (Bitmap_List_Box box,Integer &item)                    L_Get_Caret_Bitmap_List_Box;
 Integer          Delete_item            (Bitmap_List_Box box,Integer item)                     L_Delete_Item_Bitmap_List_Box;
 Integer          Insert_item            (Bitmap_List_Box box,Integer item,Text text)           L_Insert_Item_Bitmap_List_Box;
 Integer          Add_item               (Bitmap_List_Box box,Text text)                        L_Add_Item_Bitmap_List_Box;
 Integer          Get_item               (Bitmap_List_Box box,Integer item,Text &text)          L_Get_Item_Bitmap_List_Box;
 Integer          Set_selection          (Bitmap_List_Box box,Integer  item)                    L_Set_Selection_Bitmap_List_Box;
 Integer          Get_selection          (Bitmap_List_Box box,Integer &item)                    L_Get_Selection_Bitmap_List_Box;
 Integer          Get_selection_count    (Bitmap_List_Box box,Integer &count)                   L_Get_Select_Count_Bitmap_List_Box;

 Integer          Set_selection_list     (Bitmap_List_Box box,Integer maxc,Integer list[],Integer tf) L_Set_Selections_Bitmap_List_Box;
 Integer          Get_selection_list     (Bitmap_List_Box box,Integer maxc,Integer list[])            L_Get_Selections_Bitmap_List_Box;

// list control box

 ListCtrl_Box     Create_listctrl_box    (Text title,Message_Box message,Integer nlines) L_Create_ListCtrl_Box;

// buttons

 Button           Create_button          (Text title,Text reply) L_Create_Button_Box;
 Integer          Set_raised_button      (Button button,Integer mode) L_Set_Raised_Button_Box;

 Button           Create_child_button    (Text title) L_Create_Child_Button_Box;

 Button           Create_finish_button   (Text title,Text reply)                          L_Create_Finish_Button_Box;
 Integer          Set_finish_button      (Widget panel,Integer move_cursor)               L_Set_Finish_Button_Box;

 Button           Create_help_button     (Panel panel,Text title)                         L_Create_Help_Button_Box;

// graph box

 Graph_Box        Create_graph_box       (Text title, Integer type, Integer width, Integer height)       L_Create_Graph_Box;
 Integer          Redraw                 (Graph_Box box)                                                 L_Redraw_Graph_Box;
 Integer          Set_sub_title          (Graph_Box box, Text text)                                      L_Set_Sub_Title_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Integer value)                L_Set_Int_Property_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Text value)                   L_Set_Text_Property_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Integer index, Integer value) L_Set_Int_Property_Array_At_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Integer index, Text value)    L_Set_Text_Property_Array_At_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Integer index, Real value)    L_Set_Real_Property_Array_At_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Integer n,     Integer v [])  L_Set_Int_Property_Array_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Dynamic_Text v)               L_Set_Text_Property_Array_Graph_Box;
 Integer          Set_property           (Graph_Box box, Integer property, Dynamic_Real v)               L_Set_Real_Property_Array_Graph_Box;
 Integer          Set_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Real v)        L_Set_Graph_Data_Graph_Box;
 Integer          Set_graph_data         (Graph_Box box, Integer series, Integer axis, Integer n,     Real v [])     L_Set_Graph_Data_Array_Graph_Box;

 Integer          Start_timer            (Graph_Box box, Integer milliseconds) L_Start_Timer_Graph_Box;
 Integer          Stop_timer             (Graph_Box box)                       L_Stop_Timer_Graph_Box;

// graph box V12 only

 Integer          Get_property           (Graph_Box box, Integer property, Integer &value)                  L_Get_Int_Property_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Text &value)                     L_Get_Text_Property_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Integer index, Integer &value)   L_Get_Int_Property_Array_At_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Integer index, Real &value)      L_Get_Real_Property_Array_At_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Integer index, Text &value)      L_Get_Text_Property_Array_At_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Dynamic_Integer &v)              L_Get_Int_Property_Array_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Dynamic_Text &v)                 L_Get_Text_Property_Array_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Dynamic_Real &v)                 L_Get_Real_Property_Array_Graph_Box;

 Integer          Get_property           (Graph_Box box, Integer property, Integer starting_cell, Integer cell_count, Dynamic_Integer &v)  L_Get_Int_Property_Partial_Array_Graph_Box;
 Integer          Get_property           (Graph_Box box, Integer property, Integer starting_cell, Integer cell_count, Dynamic_Real &v)     L_Get_Real_Property_Partial_Array_Graph_Box;

 Integer          Get_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Real &v)      L_Get_Graph_Data_Graph_Box;
 Integer          Set_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Text v)       L_Set_Graph_Data_Graph_Box_Text;
 Integer          Get_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Text &v)      L_Get_Graph_Data_Graph_Box_Text;
 Integer          Set_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Integer v)    L_Set_Graph_Data_Graph_Box_Integer;
 Integer          Get_graph_data         (Graph_Box box, Integer series, Integer axis, Integer point, Integer &v)   L_Get_Graph_Data_Graph_Box_Integer;
 Integer          Get_graph_data         (Graph_Box box, Integer constant, Integer &x, Integer &y)                  L_Get_Graph_Data_Point;

 Integer          Draw_graph_table       (Graph_Box box, Integer index) L_Draw_Graph_Table;

 Integer          Convert_pixel_to_graph (Graph_Box box, Integer &nA, Integer &nX, Integer &nY, Real &fX, Real &fY, Integer bRight, Integer bTop, Integer bViceVersa) L_Convert_Pixel_To_Graph;

 Integer          Set_graph_data         (Graph_Box box, Integer property, Dynamic_Integer value, Integer num_elements) L_Set_Int_Graph_Data;
 Integer          Set_graph_data         (Graph_Box box, Integer property, Dynamic_Real    value, Integer num_elements) L_Set_Real_Graph_Data;

 Integer          Get_partial_graph_data (Graph_Box box, Integer property, Integer start_cell, Integer cell_count, Dynamic_Integer &v)   L_Get_Int_Property_Array_Graph_Box_Ex;
 Integer          Get_partial_graph_data (Graph_Box box, Integer property, Integer start_cell, Integer cell_count, Dynamic_Real &v)      L_Get_Real_Property_Array_Graph_Box_Ex;
 Integer          Get_partial_graph_data (Graph_Box box, Integer property, Integer start_cell, Integer cell_count, Dynamic_Text &v)      L_Get_Text_Property_Array_Graph_Box_Ex;

 Integer          Set_partial_graph_data (Graph_Box box, Integer property, Integer starting_cell, Dynamic_Integer v) L_Set_Int_Array_Graph_Data;
 Integer          Set_partial_graph_data (Graph_Box box, Integer property, Integer starting_cell, Dynamic_Real v)    L_Set_Real_Array_Graph_Data;
 Integer          Set_partial_graph_data (Graph_Box box, Integer property, Integer starting_cell, Dynamic_Text v)    L_Set_Text_Array_Graph_Data;

 Integer          Save_graph_to_bmp      (Graph_Box box, Integer width, Integer height,Text filename) L_Save_Graph_to_BMP_Graph_Box;
 Integer          Save_graph_to_jpg      (Graph_Box box, Integer width, Integer height,Text filename) L_Save_Graph_to_JPG_Graph_Box;
 Integer          Save_graph_to_png      (Graph_Box box, Integer width, Integer height,Text filename) L_Save_Graph_to_PNG_Graph_Box;
 Integer          Save_graph_to_svg      (Graph_Box box, Integer width, Integer height,Text filename,Integer compress) L_Save_Graph_to_SVG_Graph_Box;
 Integer          Save_graph_to_emf      (Graph_Box box, Integer width, Integer height,Text filename,Integer emf_type,Integer emf_dc,Integer emf_bitmap_gradients) L_Save_Graph_to_EMF_Graph_Box;

// display resolution

 Integer          Get_display_resolution   (Integer &width, Integer &height)                        L_Get_Display_Resolution;

// draw box calls

 Draw_Box         Create_draw_box        (Integer width,Integer height,Integer border)    L_Create_Draw_Box;
 Integer          Get_size               (Draw_Box,Integer &x,Integer &y)                 L_Get_Size_Draw_Box;
 Integer          Move_to                (Draw_Box box,Real x,Real y)                     L_Move_To_Draw_Box;
 Integer          Draw_to                (Draw_Box box,Real x,Real y)                     L_Draw_To_Draw_Box;
 Integer          Set_origin             (Draw_Box box,Real x,Real y)                     L_Set_Origin_Draw_Box;
 Integer          Set_scale              (Draw_Box box,Real xs,Real ys)                   L_Set_Scale_Draw_Box;
 Integer          Set_colour             (Draw_Box box,Integer colour)                    L_Set_Colour_Draw_Box;
 Integer          Set_colour             (Draw_Box box,Integer r,Integer g,Integer b)     L_Set_RGB_Draw_Box;
 Integer          Clear                  (Draw_Box box,Integer r,Integer g,Integer b)     L_Clear_Draw_Box;
 Integer          Set_fill_colour        (Draw_Box box,Integer r,Integer g,Integer b)     L_Set_Fill_RGB_Draw_Box;
 Integer          Draw_polygon           (Draw_Box box,Integer n,Real x[],Real y[])       L_Draw_Polygon_Draw_Box;
 Integer          Draw_polyline          (Draw_Box box,Integer n,Real x[],Real y[])       L_Draw_Polyline_Draw_Box;
 Integer          Set_rop                (Draw_Box box,Integer mode)                      L_Set_ROP_Draw_Box;
 Integer          Draw_element           (Draw_Box box,Element elt)                       L_Draw_Element_Draw_Box;
 Integer          Draw_element           (Draw_Box box,Element elt,Integer colour)        L_Draw_Element_HC_Draw_Box;

 Integer          Draw_text              (Draw_Box box,Real x,Real y,Real ht,Real angle,Text text) L_Draw_Text_Draw_Box;
 Integer          Set_text_colour        (Draw_Box box,Integer r,Integer g,Integer b)             L_Set_Text_Colour_Draw_Box;
 Integer          Set_bk_colour          (Draw_Box box,Integer r,Integer g,Integer b)             L_Set_BK_RGB_Draw_Box;
 Integer          Set_bk_mode            (Draw_Box box,Integer mode)                              L_Set_BK_Mode_Draw_Box;
 Integer          Set_text_font          (Draw_Box box,Text font)                                 L_Set_Font_Name_Draw_Box;
 Integer          Set_text_weight        (Draw_Box box,Integer weight)                            L_Set_Font_Weight_Draw_Box;
 Integer          Set_text_align         (Draw_Box box,Integer mode)                              L_Set_Text_Justify_Draw_Box;

 Integer          Draw_BMP               (Draw_Box box,Text filename,Real x,Real y)              L_Draw_BMP_Draw_Box;
 Integer          Draw_BMP               (Draw_Box box,Text filename,Real x,Real y,Integer rop3) L_Draw_BMP_ROP_Draw_Box;
 Integer          Draw_transparent_BMP   (Draw_Box box,Text filename,Real x,Real y)              L_Draw_Transparent_BMP_Draw_Box;
 Integer          Draw_transparent_BMP   (Draw_Box box,Text filename,Real x,Real y,Integer rop3) L_Draw_Transparent_BMP_ROP_Draw_Box;

 Integer          Start_batch_draw       (Draw_Box box) L_Start_Batch_Draw_Box;
 Integer          End_batch_draw         (Draw_Box box) L_End_Batch_Draw_Box;

 Integer          Draw_image             (Draw_Box box,Text filename,Real x,Real y)              L_Draw_Image_Draw_Box;
 Integer          Draw_image             (Draw_Box box,Text filename,Real x,Real y,Integer rop3) L_Draw_Image_ROP_Draw_Box;
 Integer          Draw_transparent_image (Draw_Box box,Text filename,Real x,Real y)              L_Draw_Transparent_Image_Draw_Box;
 Integer          Draw_transparent_image (Draw_Box box,Text filename,Real x,Real y,Integer rop3) L_Draw_Transparent_Image_ROP_Draw_Box;

 Integer          Get_image_size         (Text filename, Integer &width, Integer &height)        L_Get_Image_Size;

// end draw box calls

 Select_Button    Create_select_button (Text title,Integer mode,Message_Box box)                                              L_Create_Select_Button_Box;
 Integer          Validate             (Select_Button select,Element &string)                                                 L_Validate_Select_Button_Box;
 Integer          Validate             (Select_Button select,Element &string,Integer silent)                                  L_Validate_2_Select_Button_Box;
 Integer          Set_data             (Select_Button select,Element  string)                                                 L_Set_Element_Select_Button_Box;
 Integer          Set_data             (Select_Button select,Text     string)                                                 L_Set_Data_Select_Button_Box;
 Integer          Get_data             (Select_Button select,Text    &string)                                                 L_Get_Data_Select_Button_Box;
 Integer          Set_select_type      (Select_Button select,Text type)                                                       L_Set_Select_Button_Pick_Type;
 Integer          Set_select_snap_mode (Select_Button select,Integer snap_control)                                            L_Set_Select_Button_Snap_Mode;
 Integer          Set_select_snap_mode (Select_Button select,Integer snap_mode,Integer snap_control,Text snap_text)           L_Set_Select_Button_Snap_Mode_2;
 Integer          Set_select_direction (Select_Button select,Integer  dir)                                                    L_Set_Select_Button_Direction;
 Integer          Get_select_direction (Select_Button select,Integer &dir)                                                    L_Get_Select_Button_Direction;
 Integer          Set_select_coordinate(Select_Button select,Real  x,Real  y,Real  z,Real  ch,Real  ht)                       L_Set_Select_Button_Coordinate;
 Integer          Get_select_coordinate(Select_Button select,Real &x,Real &y,Real &z,Real &ch,Real &ht)                       L_Get_Select_Button_Coordinate;
 Integer          Select_start         (Select_Button select)                                                                 L_Select_Button_Start;
 Integer          Select_end           (Select_Button select)                                                                 L_Select_Button_End;

 Select_Box       Create_select_box    (Text title,Text select_title,Integer mode,Message_Box message)                        L_Create_Select_Box;
 Integer          Validate             (Select_Box select,Element &string)                                                    L_Validate_Select_Box;
 Integer          Validate             (Select_Box select,Element &string,Integer silent)                                     L_Validate_2_Select_Box;
 Integer          Set_data             (Select_Box select,Element  string)                                                    L_Set_Element_Select_Box;
 Integer          Set_data             (Select_Box select,Text     string)                                                    L_Set_Data_Select_Box;
 Integer          Get_data             (Select_Box select,Text    &string)                                                    L_Get_Data_Select_Box;
 Integer          Set_select_type      (Select_Box select,Text type)                                                          L_Set_Select_Box_Pick_Type;
 Integer          Set_select_snap_mode (Select_Box select,Integer snap_control)                                               L_Set_Select_Box_Snap_Mode;
 Integer          Set_select_snap_mode (Select_Box select,Integer snap_mode,Integer snap_control,Text snap_text)              L_Set_Select_Box_Snap_Mode_2;
 Integer          Set_select_direction (Select_Box select,Integer  dir)                                                       L_Set_Select_Box_Direction;
 Integer          Get_select_direction (Select_Box select,Integer &dir)                                                       L_Get_Select_Box_Direction;
 Integer          Set_select_coordinate(Select_Box select,Real  x,Real  y,Real  z,Real  ch,Real  ht)                          L_Set_Select_Box_Coordinate;
 Integer          Get_select_coordinate(Select_Box select,Real &x,Real &y,Real &z,Real &ch,Real &ht)                          L_Get_Select_Box_Coordinate;
 Integer          Select_start         (Select_Box select)                                                                    L_Select_Box_Start;
 Integer          Select_end           (Select_Box select)                                                                    L_Select_Box_End;

 Select_Boxes     Create_select_boxes  (Integer no_boxes,Text title[],Text select_title[],Integer mode[],Message_Box message) L_Create_Select_Boxes;
 Integer          Validate             (Select_Boxes select,Integer n,Element &string)                                        L_Validate_Select_Boxes;
 Integer          Validate             (Select_Boxes select,Integer n,Element &string,Integer silent)                         L_Validate_2_Select_Boxes;
 Integer          Set_data             (Select_Boxes select,Integer n,Element  string)                                        L_Set_Element_Select_Boxes;
 Integer          Set_data             (Select_Boxes select,Integer n,Text     string)                                        L_Set_Data_Select_Boxes;
 Integer          Get_data             (Select_Boxes select,Integer n,Text    &string)                                        L_Get_Data_Select_Boxes;
 Integer          Set_select_type      (Select_Boxes select,Integer n,Text type)                                              L_Set_Select_Boxes_Pick_Type;
 Integer          Set_select_snap_mode (Select_Boxes select,Integer n,Integer snap_control)                                   L_Set_Select_Boxes_Snap_Mode;
 Integer          Set_select_snap_mode (Select_Boxes select,Integer n,Integer snap_mode,Integer snap_control,Text snap_text)  L_Set_Select_Boxes_Snap_Mode_2;
 Integer          Set_select_direction (Select_Boxes select,Integer n,Integer  dir)                                           L_Set_Select_Boxes_Direction;
 Integer          Get_select_direction (Select_Boxes select,Integer n,Integer &dir)                                           L_Get_Select_Boxes_Direction;
 Integer          Set_select_coordinate(Select_Boxes select,Integer n,Real  x,Real  y,Real  z,Real  ch,Real  ht)              L_Set_Select_Boxes_Coordinate;
 Integer          Get_select_coordinate(Select_Boxes select,Integer n,Real &x,Real &y,Real &z,Real &ch,Real &ht)              L_Get_Select_Boxes_Coordinate;
 Integer          Select_start         (Select_Boxes select,Integer n)                                                        L_Select_Boxes_Start;
 Integer          Select_end           (Select_Boxes select,Integer n)                                                        L_Select_Boxes_End;

 New_Select_Box   Create_new_select_box(Text title,Text select_title,Integer mode,Message_Box message)                        L_Create_New_Select_Box;
 Integer          Validate             (New_Select_Box select,Element &string)                                                L_Validate_New_Select_Box;
 Integer          Validate             (New_Select_Box select,Element &string,Integer silent)                                 L_Validate_2_New_Select_Box;
 Integer          Set_data             (New_Select_Box select,Element  string)                                                L_Set_Element_New_Select_Box;
 Integer          Set_data             (New_Select_Box select,Text     string)                                                L_Set_Data_New_Select_Box;
 Integer          Get_data             (New_Select_Box select,Text    &string)                                                L_Get_Data_New_Select_Box;

 Polygon_Box      Create_polygon_box   (Text title,Text select_title,Integer mode,Message_Box message)                        L_Create_Polygon_Box;
 Integer          Validate             (Polygon_Box select,Element &string)                                                   L_Validate_Polygon_Box;
 Integer          Validate             (Polygon_Box select,Element &string,Integer silent)                                    L_Validate_2_Polygon_Box;
 Integer          Set_data             (Polygon_Box select,Element  string)                                                   L_Set_Element_Polygon_Box;
 Integer          Set_data             (Polygon_Box select,Text     string)                                                   L_Set_Data_Polygon_Box;
 Integer          Get_data             (Polygon_Box select,Text    &string)                                                   L_Get_Data_Polygon_Box;

// Integer          Pick_all(Select_Boxes);

 Integer          Set_width_in_chars (Widget widget,Integer chars) L_Set_Widget_Width_In_Chars;

 Integer          Show_widget        (Widget widget,Integer x,Integer y) L_Show_Widget_Position;
 Integer          Show_widget        (Widget widget)                     L_Show_Widget;
 Integer          Hide_widget        (Widget widget)                     L_Hide_Widget;
 Integer          Wait_on_widgets    (Integer &id,Text &cmd,Text &msg)   L_Wait_On_Widgets;
 Integer          Set_cursor_position(Widget widget)                     L_Set_Cursor_Over_Widget;

// more widget calls

 Screen_Text      Create_screen_text  (Text text)                     L_Create_Screen_Text;
 Integer          Set_data            (Screen_Text widget,Text  data) L_Set_Data_Screen_Text;
 Integer          Get_data            (Screen_Text widget,Text &data) L_Get_Data_Screen_Text;

 Text_Edit_Box    Create_text_edit_box(Text name,Message_Box box,Integer no_lines) L_Create_Text_Edit_Box;
 Integer          Set_data            (Text_Edit_Box widget,Text  data)            L_Set_Data_Text_Edit_Box;
 Integer          Get_data            (Text_Edit_Box widget,Text &data)            L_Get_Data_Text_Edit_Box;

 Integer          Set_data_backslash_n(Text_Edit_Box widget,Text  data)            L_Set_Data_Old_Text_Edit_Box;
 Integer          Get_data_backslash_n(Text_Edit_Box widget,Text &data)            L_Get_Data_Old_Text_Edit_Box;

 Integer          Set_data            (Text_Edit_Box widget,Dynamic_Text  data)    L_Set_Lines_Text_Edit_Box;
 Integer          Get_data            (Text_Edit_Box widget,Dynamic_Text &data)    L_Get_Lines_Text_Edit_Box;

 Integer          Set_word_wrap       (Text_Edit_Box widget,Integer mode)          L_Set_Word_Wrap_Text_Edit_Box;
 Integer          Get_word_wrap       (Text_Edit_Box widget,Integer &mode)         L_Get_Word_Wrap_Text_Edit_Box;

 Integer          Set_read_only       (Text_Edit_Box widget,Integer mode)          L_Set_Readonly_Text_Edit_Box;
 Integer          Get_read_only       (Text_Edit_Box widget,Integer &mode)         L_Get_Readonly_Text_Edit_Box;

 Integer          Set_vertical_scroll_bar(Text_Edit_Box widget,Integer  mode)      L_Set_Vertical_Scrollbar_Text_Edit_Box;
 Integer          Get_vertical_scroll_bar(Text_Edit_Box widget,Integer &mode)      L_Get_Vertical_Scrollbar_Text_Edit_Box;

 Integer          Set_horizontal_scroll_bar(Text_Edit_Box widget,Integer  mode)    L_Set_Horizontal_Scrollbar_Text_Edit_Box;
 Integer          Get_horizontal_scroll_bar(Text_Edit_Box widget,Integer &mode)    L_Get_Horizontal_Scrollbar_Text_Edit_Box;

// size and position widget calls

 Integer          Get_widget_position(Widget widget,Integer &x,Integer &y) L_Get_Widget_Position;
 Integer          Get_widget_size    (Widget widget,Integer &w,Integer &h) L_Get_Widget_Size;

 Integer          Set_size    (Widget widget,Integer  x,Integer  y) L_Widget_Set_Size;
 Integer          Get_size    (Widget widget,Integer &x,Integer &y) L_Widget_Get_Size;

 Integer          Set_position(Widget widget,Integer  x,Integer  y) L_Widget_Set_Position;
 Integer          Get_position(Widget widget,Integer &x,Integer &y) L_Widget_Get_Position;

// more widget calls

 Integer          Get_id             (Widget widget)              L_Get_Widget_ID;
 Integer          Use_browse_button  (Widget widget,Integer mode) L_Widget_Use_Browse;
 Integer          Show_browse_button (Widget widget,Integer mode) L_Widget_Show_Browse;
 Integer          Set_focus          (Widget widget)              L_Widget_Set_Focus;

 Integer          Set_enable         (Widget widget,Integer mode)  L_Widget_Set_Enable;
 Integer          Get_enable         (Widget widget,Integer &mode) L_Widget_Get_Enable;

 Integer          Set_visible        (Widget widget,Integer mode)  L_Widget_Set_Visible;
 Integer          Get_visible        (Widget widget,Integer &mode) L_Widget_Get_Visible;

 Integer          Set_optional       (Widget widget,Integer mode)  L_Widget_Set_Optional;
 Integer          Get_optional       (Widget widget,Integer &mode) L_Widget_Get_Optional;

 Integer          Set_name           (Widget widget,Text text)     L_Widget_Set_Name;
 Integer          Get_name           (Widget widget,Text &text)    L_Widget_Get_Name;

 Integer          Set_error_message  (Widget widget,Text text)     L_Widget_Error_Message;

// unique names for SLX / DDX

 Integer          Set_dump_name      (Widget widget,Text  text)                   L_Widget_Set_Dump_Name;
 Integer          Get_dump_name      (Widget widget,Text &text)                   L_Widget_Get_Dump_Name;
 Integer          Get_dump_name      (Widget widget,Text &text,Integer effective) L_Widget_Get_Dump_Name_Effective;

// help calls

 Integer          Set_help          (Widget widget,Integer help)                      L_Set_Widget_Help;
 Integer          Get_help          (Widget widget,Integer &help)                     L_Get_Widget_Help;
 Integer          Set_help          (Widget widget,Text help)                         L_Set_Widget_Help_Text;
 Integer          Get_help          (Widget widget,Text &help)                        L_Get_Widget_Help_Text;
 Integer          Set_tooltip       (Widget widget,Text help)                         L_Set_Widget_Help_Tooltip;
 Integer          Get_tooltip       (Widget widget,Text &help)                        L_Get_Widget_Help_Tooltip;

 Integer          Winhelp           (Widget widget,Text helpfile,Text key)                          L_Winhelp_Key;
 Integer          Winhelp           (Widget widget,Text helpfile,Integer table,Text key)            L_Winhelp_Multikey;
 Integer          Winhelp           (Widget widget,Text helpfile,Integer helpid)                    L_Winhelp_Context;
 Integer          Winhelp           (Widget widget,Text helpfile,Integer helpid,Integer popup)      L_Winhelp_Context_Popup;

 Integer          Set_cursor_position(Integer  x,Integer  y) L_Set_Cursor_Position;
 Integer          Get_cursor_position(Integer &x,Integer &y) L_Get_Cursor_Position;

// name matching

 Integer Match_name(Text name,Text match) L_Char_Match_Name;                                      // return if name matches match
 Integer Match_name(Dynamic_Element list,Text match,Dynamic_Element &matched) L_List_Match_Name;  // returns a list of all those names that match a regexp


// apply templates

 Integer Apply(Element string,Real start_ch,Real end_ch,Real separation,
               Tin tin,Text left_template,Text right_template,
               Real &cut,Real &fill,Real &balance) L_Apply_Template;             // applies the templates left_template and right_template
                                                                                 // from start_ch to end_ch with separation between sections
                                                                                 // return cut, fill and balance volumes on the tin aInteger the
                                                                                 // string

 Integer Apply(Element string,Real start_ch,Real end_ch,Real separation,
               Tin tin,Text left_template,Text right_template,
               Real &cut,Real &fill,Real &balance,
               Text report) L_Apply_Template_Report;                             // applies the templates left_template and right_template
                                                                                 // from start_ch to end_ch with seperation between sections
                                                                                 // return cut, fill and balance volumes on the tin aInteger the
                                                                                 // string, with a report stored in the file report

 Integer Apply(Element string,Real start_ch,Real end_ch,Real separation,
               Tin tin,Text left_template,Text right_template,
               Real &cut_volume,Real &fill_volume,Real &balance_volume,
               Text report,
               Integer do_strings,Dynamic_Element &strings,
               Integer do_sections,Dynamic_Element &sections,Integer section_colour,
               Integer do_polygons,Dynamic_Element &polygons,
               Integer do_differences,Dynamic_Element &differences,Integer difference_colour)
               L_Apply_Template_Full;                                         // applies the templates left_template and right_template
                                                                              // from start_ch to end_ch with seperation between sections
                                                                              // return cut, fill and balance volumes on the tin aInteger the
                                                                              // string, with a report stored in the file report,
                                                                              // if do_strings is non-zero strings are stored in strings
                                                                              // if do_sections is non-zero sections are stored in sections
                                                                              // with a colour of section_colour
                                                                              // if do_polygons is non-zero polygons are stored in polygons
                                                                              // if do_differences is non-zero differences are stored in
                                                                              // with a colour of difference_colour differences

 Integer Apply(Real x,Real y,Real z,Real dir,Tin tin,Text template,
               Element &xsect) L_Apply_Direction;

// apply many templates

 Integer Apply_many(Element string,Real separation, Tin tin,
                    Text many_template_file, Real &cut,Real &fill,Real &balance)
                    L_Apply_Many_Templates;                                      // applies the templates from many_template_file
                                                                                 // from start_ch to end_ch with separation between sections
                                                                                 // return cut, fill and balance volumes on the tin aInteger the
                                                                                 // string

 Integer Apply_many(Element string,Real separation,Tin tin,
                    Text many_template_file,Real &cut_volume,Real &fill_volume,
                    Real &balance_volume,Text report) L_Apply_Many_Templates_Report;   // applies the templates left_template and right_template
                                                                                       // from start_ch to end_ch with seperation between sections
                                                                                       // return cut, fill and balance volumes on the tin aInteger the
                                                                                       // string, with a report stored in the file report

 Integer Apply_many(Element string,Real separation,Tin tin,
                  Text many_template_file,Real &cut,Real &fill,Real &balance,
                  Text report,
                  Integer do_strings,Dynamic_Element &strings,
                  Integer do_sections,Dynamic_Element &sections,Integer section_colour,
                  Integer do_polygons,Dynamic_Element &polygons,
                  Integer do_difference,Dynamic_Element &differences,Integer difference_colour)
                  L_Apply_Many_Templates_Full;                                      // applies the templates from many_template_file
                                                                                    // from start_ch to end_ch with seperation between sections
                                                                                    // return cut, fill and balance volumes on the tin aInteger the
                                                                                    // string, with a report stored in the file report,
                                                                                    // if do_strings is non-zero strings are stored in strings
                                                                                    // if do_sections is non-zero sections are stored in sections
                                                                                    // with a colour of section_colour
                                                                                    // if do_polygons is non-zero polygons are stored in polygons
                                                                                    // if do_differences is non-zero differences are stored in
                                                                                    // with a colour of difference_colour differences

 Integer Template_exists(Text name) L_Template_Exists;     // return whether the template name exists, non-zero retuned indicates success,
                                                        //   zero failure

 Integer Get_project_templates(Dynamic_Text &templates) L_Get_Project_Templates;

// file functions

 Integer File_exists(Text file_name) L_File_Exists;        // return whether file_name exists, non-zero retuned indicates success, zero failure

 Integer File_delete(Text file_name) L_File_Delete;        // delete a file, zero retuned indicates success, non-zero failure

 Integer Backup_version_file (Text filename,Integer recycle) L_Backup_Version_File;
 Integer Restore_version_file(Text filename,Integer swap   ) L_Restore_Version_File;

 Integer Get_file_size(Text file_name, Integer &size) L_Get_File_Size; // get the size if a file - non zero return indicates failure

 Integer File_redirect(Text input_file_path, Integer read_write, Integer use_cache, Text &output_file_path) L_File_Redirect; // Synergy mostly ???
 
// directory functions

 Integer Directory_exists(Text dir_name) L_Directory_Exists;
 Integer Directory_delete(Text dir_name) L_Directory_Delete;
 Integer Directory_create(Text dir_name) L_Directory_Create;

 Integer Directory_create_recursive(Text dir_name) L_Directory_Create_Recursive;
 Integer Directory_delete_recursive(Text dir_name) L_Directory_Delete_Recursive;

 Integer Get_temporary_directory        (Text &dir_name) L_Get_Temporary_Directory;
 Integer Get_temporary_12d_directory    (Text &dir_name) L_Get_Temporary_12d_Directory;
 Integer Get_temporary_project_directory(Text &dir_name) L_Get_Temporary_Project_Directory;

// other lists in project

 Integer Get_project_functions(Dynamic_Text &functions) L_Get_Project_Functions;

// point functions

 Real Get_x(Point pt) L_Point_Get_X;
 Real Get_y(Point pt) L_Point_Get_Y;
 Real Get_z(Point pt) L_Point_Get_Z;

 Real Set_x(Point &pt,Real x) L_Point_Set_X;
 Real Set_y(Point &pt,Real y) L_Point_Set_Y;
 Real Set_z(Point &pt,Real z) L_Point_Set_Z;

// line functions

 Point Get_start(Line line) L_Line_Get_Start;
 Point Get_end  (Line line) L_Line_Get_End;

 Point Set_start(Line &line,Point start) L_Line_Set_Start;
 Point Set_end  (Line &line,Point end  ) L_Line_Set_End;

 Line  Reverse  (Line line) L_Line_Reverse;  // also the unary '-' operator reverses a line

// arc functions

 Point  Get_centre(Arc arc) L_Arc_Get_Centre;
 Real   Get_radius(Arc arc) L_Arc_Get_Radius;
 Point  Get_start (Arc arc) L_Arc_Get_Start;
 Point  Get_end   (Arc arc) L_Arc_Get_End;

 Point  Set_centre(Arc &arc,Point centre) L_Arc_Set_Centre;
 Real   Set_radius(Arc &arc,Real radius ) L_Arc_Set_Radius;
 Point  Set_start (Arc &arc,Point start ) L_Arc_Set_Start;
 Point  Set_end   (Arc &arc,Point end   ) L_Arc_Set_End;

 Arc    Reverse   (Arc line) L_Arc_Reverse;  // also the unary '-' operator reverses a arc

// spiral functions

 Integer Set_type        (Spiral spiral,Integer type   ) L_Spiral_Set_Type;
 Integer Set_leading     (Spiral spiral,Integer leading) L_Spiral_Set_Leading;
 Integer Set_length      (Spiral spiral,Real    length ) L_Spiral_Set_Full_Length;
 Integer Set_radius      (Spiral spiral,Real    radius ) L_Spiral_Set_Full_Radius;
 Integer Set_direction   (Spiral spiral,Real    angle  ) L_Spiral_Set_Anchor_Angle;
 Integer Set_anchor      (Spiral spiral,Real    point  ) L_Spiral_Set_Anchor;

 Integer Set_start_length(Spiral spiral,Real    length ) L_Spiral_Set_Start_Length;
 Integer Set_end_length  (Spiral spiral,Real    length ) L_Spiral_Set_End_Length;

 Integer Set_start_height(Spiral spiral,Real    height ) L_Spiral_Set_Start_Height;
 Integer Set_end_height  (Spiral spiral,Real    height ) L_Spiral_Set_End_Height;

 Integer Get_valid       (Spiral spiral) L_Spiral_Get_Valid;
 Integer Get_type        (Spiral spiral) L_Spiral_Get_Type;
 Integer Get_leading     (Spiral spiral) L_Spiral_Get_Leading;
 Real    Get_length      (Spiral spiral) L_Spiral_Get_Full_Length;
 Real    Get_radius      (Spiral spiral) L_Spiral_Get_Full_Radius;
 Real    Get_direction   (Spiral spiral) L_Spiral_Get_Anchor_Angle;
 Point   Get_anchor      (Spiral spiral) L_Spiral_Get_Anchor;

 Real    Get_start_length(Spiral spiral) L_Spiral_Get_Start_Length;
 Real    Get_end_length  (Spiral spiral) L_Spiral_Get_End_Length;

 Real    Get_start_height(Spiral spiral) L_Spiral_Get_Start_Height;
 Real    Get_end_height  (Spiral spiral) L_Spiral_Get_End_Height;

 Point   Get_start_point (Spiral spiral) L_Spiral_Get_Start_Point;
 Point   Get_end_point   (Spiral spiral) L_Spiral_Get_End_Point;

// evaluation calls

 Point   Get_local_point (Spiral spiral,Real l) L_Spiral_Get_Local_Point;
 Point   Get_point       (Spiral spiral,Real l) L_Spiral_Get_Point;
 Real    Get_local_angle (Spiral spiral,Real l) L_Spiral_Get_Local_Angle;
 Real    Get_angle       (Spiral spiral,Real l) L_Spiral_Get_Angle;
 Real    Get_radius      (Spiral spiral,Real l) L_Spiral_Get_Radius;
 Real    Get_shift_x     (Spiral spiral)        L_Spiral_Get_Shift_X;
 Real    Get_shift_y     (Spiral spiral)        L_Spiral_Get_Shift_Y;
 Real    Get_shift       (Spiral spiral)        L_Spiral_Get_Shift;

// general spiral calls - need spiral calls for short/long tans etc etc

 Spiral  Reverse         (Spiral spiral) L_Spiral_Reverse;  // also the unary '-' operator reverses a spiral

// curve functions

 Integer Set_type        (Curve curve,Integer type   ) L_Curve_Set_Type;
 Integer Set_leading     (Curve curve,Integer leading) L_Curve_Set_Leading;

 Integer Set_start_length(Curve curve,Real    length ) L_Curve_Set_Start_Length;
 Integer Set_end_length  (Curve curve,Real    length ) L_Curve_Set_End_Length;

 Integer Set_direction   (Curve curve,Real    angle  ) L_Curve_Set_Anchor_Angle;
 Integer Set_anchor      (Curve curve,Real    point  ) L_Curve_Set_Anchor;

 Integer Set_start_height(Curve curve,Real    height ) L_Curve_Set_Start_Height;
 Integer Set_end_height  (Curve curve,Real    height ) L_Curve_Set_End_Height;

 Integer Set_offset      (Curve curve,Real    offset ) L_Curve_Set_Offset;

 Integer Get_valid       (Curve curve) L_Curve_Get_Valid;
 Integer Get_type        (Curve curve) L_Curve_Get_Type;
 Integer Get_leading     (Curve curve) L_Curve_Get_Leading;

 Real    Get_length      (Curve curve) L_Curve_Get_Full_Length;
 Real    Get_radius      (Curve curve) L_Curve_Get_Full_Radius;

 Real    Get_start_length(Curve curve) L_Curve_Get_Start_Length;
 Real    Get_end_length  (Curve curve) L_Curve_Get_End_Length;

 Point   Get_start_point (Curve curve) L_Curve_Get_Start_Point;
 Point   Get_end_point   (Curve curve) L_Curve_Get_End_Point;

 Real    Get_direction   (Curve curve) L_Curve_Get_Anchor_Angle;
 Point   Get_anchor      (Curve curve) L_Curve_Get_Anchor;

 Point   Get_point       (Curve curve,Real l) L_Curve_Get_Point;
 Real    Get_angle       (Curve curve,Real l) L_Curve_Get_Angle;
 Real    Get_radius      (Curve curve,Real l) L_Curve_Get_Radius;
 Real    Get_offset      (Curve curve)        L_Curve_Get_Offset;
 Real    Get_mvalue      (Curve curve)        L_Curve_Get_Mvalue;

 Real    Get_shift_x     (Curve curve)        L_Curve_Get_Shift_X;
 Real    Get_shift_y     (Curve curve)        L_Curve_Get_Shift_Y;
 Real    Get_shift       (Curve curve)        L_Curve_Get_Shift;

// general curve calls - need spiral calls for short/long tans etc etc

 Curve  Reverse          (Curve curve) L_Curve_Reverse;  // also the unary '-' operator reverses a curve

// parabola functions
// Note: these calls offer an over-constrained definition
// For super strings, only centre_pt is used and the length is computed between the 2 verticii on the segment
// Also, Parabola's have only been tested verticaly on super alignment.
// the centre calls really refer to the ip location

 Point    Get_ip    (Parabola parabola) L_Parabola_Get_IP;
 Real     Get_length(Parabola parabola) L_Parabola_Get_Length;
 Point    Get_start (Parabola parabola) L_Parabola_Get_Start;
 Point    Get_end   (Parabola parabola) L_Parabola_Get_End;

 Integer  Set_ip    (Parabola &parabola,Point centre) L_Parabola_Set_IP;
 Integer  Set_length(Parabola &parabola,Real  length) L_Parabola_Set_Length;
 Integer  Set_start (Parabola &parabola,Point start ) L_Parabola_Set_Start;
 Integer  Set_end   (Parabola &parabola,Point end   ) L_Parabola_Set_End;

 Parabola Reverse   (Parabola parabola) L_Parabola_Reverse;  // also the unary '-' operator reverses a parabola

// segment functions

 Integer    Get_type (Segment segment) L_Segment_Get_Type;

 Integer    Get_point   (Segment segment,Point    &point)    L_Segment_Get_Point;
 Integer    Get_line    (Segment segment,Line     &line)     L_Segment_Get_Line;
 Integer    Get_arc     (Segment segment,Arc      &arc)      L_Segment_Get_Arc;
 Integer    Get_spiral  (Segment segment,Spiral   &spiral)   L_Segment_Get_Spiral;
 Integer    Get_curve   (Segment segment,Curve    &curve)    L_Segment_Get_Curve;
 Integer    Get_parabola(Segment segment,Parabola &parabola) L_Segment_Get_Parabola;

 Integer    Set_point   (Segment &segment,Point    point)    L_Segment_Set_Point;
 Integer    Set_line    (Segment &segment,Line     line)     L_Segment_Set_Line;
 Integer    Set_arc     (Segment &segment,Arc      arc)      L_Segment_Set_Arc;
 Integer    Set_spiral  (Segment &segment,Spiral   arc)      L_Segment_Set_Spiral;
 Integer    Set_curve   (Segment &segment,Curve    curve)    L_Segment_Set_Curve;
 Integer    Set_parbola (Segment &segment,Parabola parabola) L_Segment_Set_Parabola;

 Integer    Get_start   (Segment segment,Point &point) L_Segment_Get_Start;
 Integer    Get_end     (Segment segment,Point &point) L_Segment_Get_End;

 Integer    Set_start   (Segment &segment,Point point) L_Segment_Set_Start;
 Integer    Set_end     (Segment &segment,Point point) L_Segment_Set_End;

// geometry commands

 Segment   Reverse (Segment line) L_Segment_Reverse;  // also the unary '-' operator reverses a segment

 Integer   Parallel(Line    line   ,Real distance,Line    &paralleled) L_Parallel_Line;
 Integer   Parallel(Arc     arc    ,Real distance,Arc     &paralleled) L_Parallel_Arc;
 Integer   Parallel(Segment segment,Real distance,Segment &paralleled) L_Parallel_Segment;

 Integer   Fitarc(Segment seg_1,Segment seg_2,Real radius,Point cpt,Arc &fillet) L_Fitarc_Radius;
 Integer   Fitarc(Segment seg_1,Segment seg_2,Point  start_tp,Arc &fillet) L_Fitarc_Start_TP;
 Integer   Fitarc(Point   pt_1 ,Point   pt_2 ,Point  pt_3    ,Arc &fillet) L_Fitarc_3_Points;

 Integer   Tangent(Segment seg_1,Segment seg_2,Line &line) L_Tangent_to_Segments;

 Integer   Intersect       (Segment seg_1,Segment seg_2,Integer &no_intersects,Point &p1,Point &p2) L_Intersect_Segments;
 Integer   Offset_intersect(Segment seg_1,Real off_1,Segment seg_2,Real off_2,Integer &no_intersects,Point &p1,Point &p2) L_Offset_Intersect_Segments;
 Integer   Angle_intersect (Point pt_1,Real ang_1,Point pt_2,Real ang_2,Point &p) L_Points_Angles_Intersect;

 Integer   Intersect_extended       (Segment seg_1,Segment seg_2,Integer &no_intersects,Point &p1,Point &p2) L_Intersect_Segments_Extended;
 Integer   Offset_intersect_extended(Segment seg_1,Real off_1,Segment seg_2,Real off_2,Integer &no_intersects,Point &p1,Point &p2) L_Offset_Intersect_Segments_Extended;

//

 Real       Get_distance   (Point p1,Point p2) L_Distance_Between_Points;
 Real       Get_distance_3d(Point p1,Point p2) L_Distance_Between_Points_3D;

 Integer    Locate_point(Point from,Real angle,Real dist,Point &to) L_Locate_Angle_Distance;
 Integer    Drop_point  (Segment segment,Point pt_to_drop,Point &droped_pt) L_Drop_Point;
 Integer    Drop_point  (Segment segment,Point pt_to_drop,Point &droped_pt,Real &dist) L_Drop_Point_Distance;
 Integer    Projection  (Segment segment,Real dist,Point &projected_pt) L_Projection;
 Integer    Projection  (Segment segment,Point start_point,Real dist,Point &projected_pt) L_Projection_from_Point;

// create arcs

 Element Create_arc(Arc arc) L_Create_Arc_from_Arc;
 Element Create_arc(Real xc,Real yc,Real zc,Real rad,
                    Real xs,Real ys,Real zs,
                    Real xe,Real ye,Real ze) L_Create_Arc;

// circle / arc contruction functions

 Element Create_circle(Real xc,Real yc,Real zc,Real radius) L_Create_Circle_Centre_Radius;
 Element Create_circle(Real xc,Real yc,Real zc,Real xp,Real yp,Real zp) L_Create_Circle_Centre_Point;
 Element Create_circle(Real x1,Real y1,Real z1,
                       Real x2,Real y2,Real z2,
                       Real x3,Real y3,Real z3) L_Create_Circle_3_Points;

 Integer Get_circle_data(Element e,Real &xc,Real &yc,Real &zc,Real &radius) L_Get_Circle_Data;
 Integer Set_circle_data(Element e,Real  xc,Real  yc,Real  zc,Real  radius) L_Set_Circle_Data;

 Element Create_arc(Real x1,Real y1,Real z1,
                    Real x2,Real y2,Real z2,
                    Real x3,Real y3,Real z3) L_Create_Arc_3_Points;

 Element Create_arc(Real xc,Real yc,Real zc,
                    Real xs,Real ys,Real zs,Real sweep) L_Create_Arc_Centre_Start_Sweep;

 Element Create_arc(Real xc,Real yc,Real zc,
                    Real xs,Real ys,Real zs,
                    Real xe,Real ye,Real ze,Integer dir) L_Create_Arc_Centre_Start_End_Direction;

// this is the same as L_Create_Arc
//
// Element Create_arc(Real xc,Real yc,Real zc,Real radius,
//                    Real xs,Real ys,Real zs,
//                    Real xe,Real ye,Real ze) L_Create_Arc_Centre_Radius_Start_End;

 Element Create_arc_2(Real xs,Real ys,Real zs,Real radius,
                      Real arc_length,Real start_angle) L_Create_Arc_Start_Radius_Length_Start_Bearing;

 Element Create_arc_3(Real xs,Real ys,Real zs,Real radius,
                     Real arc_length,Real chord_angle) L_Create_Arc_Start_Radius_Length_Chord_Bearing;

 Integer    Get_arc_centre(Element elt,Real &xc,Real &yc,Real &zc) L_Get_Arc_Centre;
 Integer    Set_arc_centre(Element elt,Real  xc,Real  yc,Real  zc) L_Set_Arc_Centre;
 Integer    Get_arc_radius(Element elt,Real &radius) L_Get_Arc_Radius;
 Integer    Set_arc_radius(Element elt,Real  radius) L_Set_Arc_Radius;
 Integer    Get_arc_start (Element elt,Real &xs,Real &ys,Real &zs) L_Get_Arc_Start;
 Integer    Set_arc_start (Element elt,Real  xs,Real  ys,Real  zs) L_Set_Arc_Start;
 Integer    Get_arc_end   (Element elt,Real &xe,Real &ye,Real &ze) L_Get_Arc_End;
 Integer    Set_arc_end   (Element elt,Real  xe,Real  ye,Real  ze) L_Set_Arc_End;
 Integer    Get_arc_data  (Element elt,Real &xc,Real &yc,Real &zc,
                                    Real &radius,
                                    Real &xs,Real &ys,Real &zs,
                                    Real &xe,Real &ye,Real &ze) L_Get_Arc_Data;
 Integer    Set_arc_data  (Element elt,Real xc,Real yc,Real zc,
                                    Real radius,
                                    Real xs,Real ys,Real zs,
                                    Real xe,Real ye,Real ze) L_Set_Arc_Data;

 Integer    Set_arc_interval (Element elt,Real  interval ) L_Set_Arc_Interval;
 Integer    Get_arc_interval (Element elt,Real &interval ) L_Get_Arc_Interval;

 Integer    Set_arc_chord_arc(Element elt,Real  chord_arc) L_Set_Arc_Chord_Arc;
 Integer    Get_arc_chord_arc(Element elt,Real &chord_arc) L_Get_Arc_Chord_Arc;

//

 Integer    String_self_intersects(Element elt,Integer &intersects) L_String_Self_Intersects;
 Integer    Loop_clean(Element elt,Point pt,Element &new_elt) L_Loop_Clean;

// File IO

 Integer    File_open      (Text file_name,Text mode,File &file) L_File_Open;
 Integer    File_open      (Text file_name,Text mode,Text extended,File &file) L_File_Open_Ex;
 Integer    File_close     (File file) L_File_Close;
 Integer    File_read_line (File file,Text &text) L_File_Read_Text;
 Integer    File_write_line(File file,Text text) L_File_Write_Text;
 Integer    File_flush     (File file) L_File_Flush;
 Integer    File_rewind    (File file) L_File_Rewind;
 Integer    File_tell      (File file,Integer &pos) L_File_Tell;
 Integer    File_seek      (File file,Integer pos) L_File_Seek;

// binary calls

 Integer    File_set_endian(File file,Integer  big) L_File_Set_Endian;
 Integer    File_get_endian(File file,Integer &big) L_File_Get_Endian;

 Integer    File_read        (File file,Integer &value)                 L_File_Binary_Read_Integer;
 Integer    File_read        (File file,Real    &value)                 L_File_Binary_Read_Real;
 Integer    File_read        (File file,Integer length,Integer array[]) L_File_Binary_Read_Integer_Array;
 Integer    File_read        (File file,Integer length,Real    array[]) L_File_Binary_Read_Real_Array;
 Integer    File_read        (File file,Integer length,Text   &value)   L_File_Binary_Read_Text;
 Integer    File_read_unicode(File file,Integer length,Text   &value)   L_File_Binary_Read_Unicode_Text;

 Integer    File_write        (File file,Integer  value)                 L_File_Binary_Write_Integer;
 Integer    File_write        (File file,Real     value)                 L_File_Binary_Write_Real;
 Integer    File_write        (File file,Integer length,Integer array[]) L_File_Binary_Write_Integer_Array;
 Integer    File_write        (File file,Integer length,Real    array[]) L_File_Binary_Write_Real_Array;
 Integer    File_write        (File file,Integer length,Text    value)   L_File_Binary_Write_Text;
 Integer    File_write_unicode(File file,Integer length,Text    value)   L_File_Binary_Write_Unicode_Text;

 Integer    File_read_short (File file,Integer &value)                L_File_Binary_Read_Short;
 Integer    File_read_short (File file,Real    &value)                L_File_Binary_Read_Float;

 Integer    File_write_short(File file,Integer  value)                L_File_Binary_Write_Short;
 Integer    File_write_short(File file,Real     value)                L_File_Binary_Write_Float;

// map file calls

 Integer    Map_file_create        (Map_File &file) L_Map_File_Create;
 Integer    Map_file_open          (Text file_name,Text prefix,Integer use_ptline,Map_File &file) L_Map_File_Open;
 Integer    Map_file_close         (Map_File file) L_Map_File_Close;
 Integer    Map_file_number_of_keys(Map_File file,Integer &number) L_Map_File_Number_Of_Keys;
 Integer    Map_file_add_key       (Map_File file,          Text  key,Text  name,Text  model,Integer  colour,Integer  ptln,Text  style) L_Map_File_Add_Key;
 Integer    Map_file_get_key       (Map_File file,Integer n,Text &key,Text &name,Text &model,Integer &colour,Integer &ptln,Text &style) L_Map_File_Get_Key;
 Integer    Map_file_find_key      (Map_File file,Text key,Integer &number) L_Map_File_Find_Key;

 Integer    Map_file_add_key       (Map_File file,          Text  key,Text  name,Text  model,Integer  colour,Integer  ptln,Text  style,Real  weight) L_Map_File_Add_Key_2;
 Integer    Map_file_get_key       (Map_File file,Integer n,Text &key,Text &name,Text &model,Integer &colour,Integer &ptln,Text &style,Real &weight) L_Map_File_Get_Key_2;

// not implimented

 Integer    Map_file_save          (Map_File file) L_Map_File_Save;

// view functions

 Integer    Get_project_views(Dynamic_Text &views) L_Get_Project_Views;

 View       Get_view         (Text vname) L_View_Get_View;                        // gets a view handle from name, returns null handle on failure

 Integer    View_exists(Text) L_View_Name_Exists;                                 // checks if view of name exists returned non-zero indicates success
 Integer    View_exists(View) L_View_Exists;                                      // checks if view handle is valid returned non-zero indicates success
 Integer    Null(View)        L_View_Null;                                        //

 Integer    Calc_extent(View) L_View_Calc_Extent;                         // forces recalculation of all model extents on a view returned zero
                                                                       //   indicates success

 Integer    View_add_model   (View view,Model model) L_View_Add_Model;
 Integer    View_remove_model(View view,Model model) L_View_Remove_Model;
 Integer    View_get_models  (View view,Dynamic_Text &models) L_View_Get_Models;
 Integer    View_redraw      (View view) L_View_Redraw;
 Integer    View_get_size    (View view,Integer &width,Integer &height) L_View_Get_Size;
 Integer    View_fit         (View view) L_View_Fit;
 Integer    View_delete      (View view) L_View_Delete;
 Integer    Get_last_view    (Text &view_name) L_Get_Last_View;
 
 Integer    Get_type         (View view,Integer &) L_View_Get_Type;                  // gets a Integer reflecting view type
 Integer    Get_type         (View view,Text &) L_View_Get_Type_Name;                // get a Text eg "Plan" "Section" "Perspective" "Hidden_perspective"

 Integer    Get_name         (View view,Text &) L_View_Get_Name;                     // get a Text eg "Plan" "Section" "Perspective" "Hidden_perspective"

 Integer    Model_get_views  (Model model,Dynamic_Text &models) L_Model_Get_Views;

 Integer    Section_view_profile(View view,Element string,Integer fit_view) L_Section_View_Profile_String;

Integer View_maximize (View v) L_View_Maximize;
Integer View_minimize (View v) L_View_Minimize;
Integer View_restore  (View v) L_View_Restore ;
Integer View_create (Integer type, Text name, Integer left, Integer top, Integer width, Integer height, Integer engine_type) L_View_Create;
Integer View_move_resize (View v, Integer left, Integer top, Integer width, Integer height) L_View_Move_Resize;


Integer Plan_view_get_rotation (View v, Real &a) L_Plan_View_Get_Rotation;
Integer Plan_view_set_rotation (View v, Real a) L_Plan_View_Set_Rotation;
Integer View_set_name (View v, Text name) L_View_Set_Name;
Integer View_get_background_colour (View v, Integer &colour) L_View_Get_Background_Colour;
Integer View_set_background_colour (View v, Integer colour) L_View_Set_Background_Colour;
Integer Plan_view_get_plot_scale (View v, Real &s) L_Plan_View_Get_Plot_Scale;
Integer Plan_view_set_plot_scale (View v, Real s) L_Plan_View_Set_Plot_Scale;

Integer View_get_grid_settings (View v,Integer &draw_mode,Integer &text_x_mode,Integer &text_y_mode,Integer &grid_mode,Real &space_x,Real &space_y,Real &level,Integer &colour,Real&text_height,
                                Real    &text_plot_height, Integer &text_clour, Integer &cross_mode, Real &cross_size_pixel, Real &cross_size_mm, Text &text_style, Text &text_prefix_x, Text &text_prefix_y) L_View_Get_Grid_Settings;

Integer View_set_grid_settings (View v, Integer draw_mode,Integer text_x_mode,Integer text_y_mode,Integer grid_mode,Real space_x,Real space_y,Real level,Integer colour,Real text_height,
                                Real text_plot_height,Integer text_colour,Integer cross_mode,Real cross_size_pixel,Real cross_size_mm,Text text_style,Text text_prefix_x,Text text_prefix_y) L_View_Set_Grid_Settings;

Integer View_get_engine_type (View v, Integer &engine_type) L_View_Get_Engine_Type;
Integer View_set_engine_type (View v, Integer engine_type) L_View_Set_Engine_Type;

Integer View_set_attribute(View view,                Text attribute_name,Integer  value,Integer &internal_return) L_View_Set_Attribute_Integer;
Integer View_set_attribute(View view,                Text attribute_name,Real     value,Integer &internal_return) L_View_Set_Attribute_Real   ;
Integer View_set_attribute(View view,                Text attribute_name,Text     value,Integer &internal_return) L_View_Set_Attribute_Text   ;
Integer View_set_attribute(View view,Text model_name,Text attribute_name,Integer  value,Integer &internal_return) L_View_Set_Model_Attribute_Integer;
Integer View_set_attribute(View view,Text model_name,Text attribute_name,Real     value,Integer &internal_return) L_View_Set_Model_Attribute_Real   ;
Integer View_set_attribute(View view,Text model_name,Text attribute_name,Text     value,Integer &internal_return) L_View_Set_Model_Attribute_Text   ;
Integer View_get_attribute(View view,                Text attribute_name,Integer &value,Integer &internal_return) L_View_Get_Attribute_Integer;
Integer View_get_attribute(View view,                Text attribute_name,Real    &value,Integer &internal_return) L_View_Get_Attribute_Real   ;
Integer View_get_attribute(View view,                Text attribute_name,Text    &value,Integer &internal_return) L_View_Get_Attribute_Text   ;
Integer View_get_attribute(View view,Text model_name,Text attribute_name,Integer &value,Integer &internal_return) L_View_Get_Model_Attribute_Integer;
Integer View_get_attribute(View view,Text model_name,Text attribute_name,Real    &value,Integer &internal_return) L_View_Get_Model_Attribute_Real   ;
Integer View_get_attribute(View view,Text model_name,Text attribute_name,Text    &value,Integer &internal_return) L_View_Get_Model_Attribute_Text   ;

Integer View_remove_attribute(View view,Text attribute_name) L_View_Remove_Attribute;
Integer View_remove_attribute(View view,Text model_name,Text attribute_name) L_View_Remove_Model_Attribute   ;

Integer View_remove_draw_data_textstyle(View view,Text model_name,Text prefix,Integer &internal_return) L_View_Remove_Textstyle_Draw_Data  ;
Integer View_remove_plot_data_textstyle(View view,Text model_name,Text prefix,Integer &internal_return) L_View_Remove_Textstyle_Plot_Data  ;

Integer View_get_draw_data_textstyle_merge(View view,Text model_name,Text prefix, Textstyle_Data &d,Integer &internal_return) L_View_Get_Textstyle_Draw_Data_Merge  ;
Integer View_get_plot_data_textstyle_merge(View view,Text model_name,Text prefix, Textstyle_Data &d,Integer &internal_return) L_View_Get_Textstyle_Plot_Data_Merge  ;

Integer View_get_draw_data_textstyle(View view,Text model_name,Text prefix, Textstyle_Data &d,Integer &internal_return) L_View_Get_Textstyle_Draw_Data  ;
Integer View_get_plot_data_textstyle(View view,Text model_name,Text prefix, Textstyle_Data &d,Integer &internal_return) L_View_Get_Textstyle_Plot_Data  ;

Integer View_set_draw_data_textstyle(View view,Text model_name,Text prefix, Textstyle_Data  d,Integer &internal_return) L_View_Set_Textstyle_Draw_Data  ;
Integer View_set_plot_data_textstyle(View view,Text model_name,Text prefix, Textstyle_Data  d,Integer &internal_return) L_View_Set_Textstyle_Plot_Data  ;

Integer View_clone(View v, Text clone_name) L_View_Clone;

Integer Section_view_regenerate   (View section_view, Integer fit) L_Section_View_Regenerate;
Integer Get_section_profile_string(View section_view, Element &profile_string) L_Get_Section_Profile_String;


// more functions

 Integer    Tin_tin_intersect(Tin tin1,Tin tin2,Integer colour,Dynamic_Element &elements) L_Tin_Tin_Intersect_Threed;
 Integer    Tin_tin_intersect(Tin tin1,Tin tin2,Integer colour,Dynamic_Element &elements,Integer twod) L_Tin_Tin_Intersect;

 Integer    Tin_tin_depth_contours(Tin tin1,Tin tin2,
                                   Integer cut_colour,Integer zero_colour,Integer fill_colour,
                                   Real interval,Real start_level,Real end_level,
                                   Integer mode,Dynamic_Element &elements) L_Tin_Tin_Depth_Contours;

 Integer    Null_ht      (Dynamic_Element elements,Real ht)                 L_Null_HT_Data;
 Integer    Null_ht_range(Dynamic_Element elements,Real ht_min,Real ht_max) L_Null_HT_Range_Data;
 Integer    Reset_null_ht(Dynamic_Element elements,Real ht)                 L_Reset_Null_HT_Data;

 Integer    Translate(Dynamic_Element elements,Real dx,Real dy,Real dz)                L_Translate_Data;
 Integer    Rotate   (Dynamic_Element elements,Real xorg,Real yorg,Real angle)         L_Rotate_Data;
 Integer    Factor   (Dynamic_Element elements,Real dx,Real dy,Real dz)                L_Factor_Data;
 Integer    Swap_xy  (Dynamic_Element elements)                                        L_Swap_XY_Data;
 Integer    Helmert  (Dynamic_Element elements,Real rotate,Real scale,Real dx,Real dy) L_Helmert_Data;
 Integer    Affine   (Dynamic_Element elements,Real rotate_x,Real rotate_y,
                      Real scale_x,Real scale_y,Real dx,Real dy)                       L_Affine_Data;

 Integer    Function_rename(Text old_name,Text new_name) L_Function_Rename;
 Integer    Template_rename(Text old_name,Text new_name) L_Template_Rename;

 Integer    Set_message_text(Text text) L_Set_Message_String;
 Integer    Set_message_mode(Integer mode) L_Set_Message_Mode;

 Integer    Model_duplicate  (Model   from,Text     to) L_Model_Copy;
 Integer    Tin_duplicate    (Tin     from,Text     to) L_Tin_Copy;
 Integer    Element_duplicate(Element from,Element &to) L_Element_Copy;

// polyline

 Element Create_polyline(Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts) L_Create_Polyline;    // create polyline string with positions and radii specified
 Element Create_polyline(Integer npts) L_Create_Polyline_Npts;
 Element Create_polyline(Integer npts,Element seed) L_Create_Polyline_Seed_Npts;
 Element Create_polyline(Segment seg) L_Create_Polyline_from_Segment;


 Integer Get_polyline_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer max_pts,Integer &num_pts) L_Get_Polyline_Data;                               // fill arrays of size max_pts with num_pts returned

 Integer Get_polyline_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer max_pts,Integer &num_pts,Integer offset) L_Get_Polyline_Data_Offset;         // fill arrays of size max_pts with num_pts returned
                                                                                                                // from offset
 Integer Get_polyline_data(Element element,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &f)
                           L_Get_Polyline_Point;                                                                // get the ith x, y and z and text of string

 Integer Set_polyline_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer num_pts) L_Set_Polyline_Data;                                                // fill the string with polyline data for num_pts

 Integer Set_polyline_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer num_pts,Integer offset) L_Set_Polyline_Data_Offset;                          // fill the string with polyline data for num_pts at offset

 Integer Set_polyline_data(Element element,Integer i,Real x,Real y,Real z,Real r,Integer f) L_Set_Polyline_Point;       // set the ith position in string

// drainage - at this point - pits have to be on top of vertices

 Element Create_drainage(Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts,Integer npits) L_Create_Drainage;    // create polyline string with positions and radii specified
 Element Create_drainage(Integer npts,Integer npits) L_Create_Drainage_Npts;

 Integer Get_drainage_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer max_pts,Integer &num_pts) L_Get_Drainage_Data;                               // fill arrays of size max_pts with num_pts returned

 Integer Get_drainage_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer max_pts,Integer &num_pts,Integer offset) L_Get_Drainage_Data_Offset;         // fill arrays of size max_pts with num_pts returned
                                                                                                                // from offset
 Integer Get_drainage_data(Element element,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &f)
                           L_Get_Drainage_Point;                                                                // get the ith x, y and z and text of string

 Integer Set_drainage_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer num_pts) L_Set_Drainage_Data;                                                // fill the string with polyline data for num_pts

 Integer Set_drainage_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                           Integer num_pts,Integer offset) L_Set_Drainage_Data_Offset;                          // fill the string with polyline data for num_pts at offset

 Integer Set_drainage_data(Element element,Integer i,Real x,Real y,Real z,Real r,Integer f) L_Set_Drainage_Point;       // set the ith position in string


 Integer Set_drainage_outfall_height         (Element element,Real ht)                                                            L_Set_Drainage_Outfall_Height;
 Integer Get_drainage_outfall_height         (Element element,Real &ht)                                                           L_Get_Drainage_Outfall_Height;

 Integer Set_drainage_flow                   (Element element,Integer dir)                                                        L_Set_Drainage_Flow;
 Integer Get_drainage_flow                   (Element element,Integer &dir)                                                       L_Get_Drainage_Flow;

 Integer Set_drainage_length_mode            (Element element,Integer mode)                                                       L_Set_Drainage_Length_Mode;
 Integer Get_drainage_length_mode            (Element element,Integer mode)                                                       L_Get_Drainage_Length_Mode;

 Integer Set_drainage_ns_tin                 (Element element,Tin tin)                                                            L_Set_Drainage_NS_Tin;
 Integer Get_drainage_ns_tin                 (Element element,Tin &tin)                                                           L_Get_Drainage_NS_Tin;

 Integer Set_drainage_fs_tin                 (Element element,Tin tin)                                                            L_Set_Drainage_FS_Tin;
 Integer Get_drainage_fs_tin                 (Element element,Tin &tin)                                                           L_Get_Drainage_FS_Tin;

 Integer Set_drainage_float                  (Element element,Integer  float)                                                     L_Set_Drainage_Float;
 Integer Get_drainage_float                  (Element element,Integer &float)                                                     L_Get_Drainage_Float;

 Integer Get_drainage_pit_branches           (Element element,Integer pit,Dynamic_Element &branches)                              L_Get_Drainage_Pit_Branches;
 Integer Get_drainage_trunk                  (Element element,Element &trunk)                                                     L_Get_Drainage_Trunk;

 Integer Get_drainage_sewer                 (Element element, Integer &is_sewer)                                                  L_Get_Drainage_Sewer;
 Integer Set_drainage_sewer                 (Element element, Integer is_sewer)                                                   L_Set_Drainage_Sewer;

// Drainage Network (model) calls

 Integer Get_drainage_network                     (Model model,Drainage_Network &dn)                                              L_Get_Drainage_Network;

 Integer Get_drainage_network_number_of_pits      (Drainage_Network dn,Integer &number)                                           L_Get_Drainage_Network_Number_Of_Pits;
 Integer Get_drainage_network_number_of_pits_all  (Drainage_Network dn,Integer &number)                                           L_Get_Drainage_Network_Number_Of_Pits_All;
 Integer Get_drainage_network_number_of_outlets   (Drainage_Network dn,Integer &number)                                           L_Get_Drainage_Network_Number_Of_Outlets;

 Integer Get_drainage_network_number_of_bypasses  (Drainage_Network dn,Integer &number)                                           L_Get_Drainage_Network_Number_Of_Bypasses;

 Integer Get_drainage_network_number_of_pipes     (Drainage_Network dn,Integer &number)                                           L_Get_Drainage_Network_Number_Of_Pipes;

// get filtered arrays of connections

 Integer Get_drainage_network_pits                (Drainage_Network dn,Integer ids[],Integer types[],Integer nmax,Integer &nret)  L_Get_Drainage_Network_Pits;
 Integer Get_drainage_network_pits_all            (Drainage_Network dn,Integer ids[],Integer types[],Integer nmax,Integer &nret)  L_Get_Drainage_Network_Pits_All;
 Integer Get_drainage_network_outlets             (Drainage_Network dn,Integer ids[],Integer nmax,Integer &nret)                  L_Get_Drainage_Network_Outlets;

 Integer Get_drainage_network_bypasses            (Drainage_Network dn,Integer ids[],Integer types[],Integer nmax,Integer &nret)  L_Get_Drainage_Network_Bypasses;

 Integer Get_drainage_network_pipes               (Drainage_Network dn,Integer ids[],Integer types[],Integer nmax,Integer &nret)  L_Get_Drainage_Network_Pipes;

 // get pits and pipes via ids

 Integer Get_drainage_network_pit                 (Drainage_Network dn,Integer id,Element &element,Integer &pit)                  L_Get_Drainage_Network_Pit;
 Integer Get_drainage_network_pit                 (Drainage_Network dn,Real x,Real y,Integer &id)                                 L_Get_Drainage_Network_Pit_XY;
 Integer Get_drainage_network_pipe                (Drainage_Network dn,Integer id,Element &element,Integer &pipe,Integer &us_pit_id,Integer &ds_pit_id)             L_Get_Drainage_Network_Pipe;

// checks for pit and pipe purpose

 Integer Drainage_network_is_outlet               (Drainage_Network dn,Integer pit_id)                                            L_Drainage_Network_Is_Outlet;
 Integer Drainage_network_is_basin                (Drainage_Network dn,Integer pit_id)                                            L_Drainage_Network_Is_Basin;
 Integer Drainage_network_is_basin_link           (Drainage_Network dn,Integer pipe_id)                                           L_Drainage_Network_Is_Basin_Link;

// connection points

 Integer Set_drainage_use_connection_points(Element element,Integer  use_connection_points)                                       L_Set_Drainage_Use_Connection_Points;
 Integer Get_drainage_use_connection_points(Element element,Integer &use_connection_points)                                       L_Get_Drainage_Use_Connection_Points;

 Integer Drainage_Adjust_Pit_Connection_Points    (Element element, Integer manhole)                                              L_Drainage_Adjust_Pit_Connection_Points;
 Integer Drainage_Adjust_Pit_Connection_Points_All(Element element)                                                               L_Drainage_Adjust_Pit_Connection_Points_All;


// pipe calls

 Integer Get_drainage_pipe_velocity         (Element element,Integer pipe,Real &velocity)                                         L_Get_Drainage_Pipe_Velocity;
 Integer Get_drainage_pipe_flow             (Element element,Integer pipe,Real &flow)                                             L_Get_Drainage_Pipe_Flow;
 Integer Get_drainage_pipe_diameter         (Element element,Integer pipe,Real &diameter)                                         L_Get_Drainage_Pipe_Diameter;
 Integer Get_drainage_pipe_nominal_diameter (Element element,Integer pipe,Real &nominal_diameter)                                 L_Get_Drainage_Pipe_Nominal_Diameter;
 Integer Get_drainage_pipe_separation       (Element element,Integer pipe,Real &separation)                                       L_Get_Drainage_Pipe_Separation;

 Integer Get_drainage_pipe_width            (Element element,Integer pipe,Real &width)                                            L_Get_Drainage_Pipe_Width;
 Integer Get_drainage_pipe_top_width        (Element element,Integer pipe,Real &top_width)                                        L_Get_Drainage_Pipe_Top_Width;
 Integer Get_drainage_pipe_type             (Element element,Integer pipe,Text &type)                                             L_Get_Drainage_Pipe_Type;
 Integer Get_drainage_pipe_name             (Element element,Integer pipe,Text &name)                                             L_Get_Drainage_Pipe_Name;
 Integer Get_drainage_pipe_inverts          (Element element,Integer pipe,Real &lhs,Real &rhs)                                    L_Get_Drainage_Pipe_Inverts;
 Integer Get_drainage_pipe_hgls             (Element element,Integer pipe,Real &lhs,Real &rhs)                                    L_Get_Drainage_Pipe_HGLS;
 Integer Get_drainage_pipe_thickness        (Element element,Integer pipe,Real &top,Real &bottom,Real &left,Real &right)          L_Get_Drainage_Pipe_Thickness;
 Integer Get_drainage_pipe_sediment_depth   (Element element,Integer pipe,Real &sediment_depth)                                   L_Get_Drainage_Pipe_Sediment_Depth;

 Integer Set_drainage_pipe_velocity         (Element element,Integer pipe,Real velocity)                                          L_Set_Drainage_Pipe_Velocity;
 Integer Set_drainage_pipe_flow             (Element element,Integer pipe,Real flow)                                              L_Set_Drainage_Pipe_Flow;
 Integer Set_drainage_pipe_diameter         (Element element,Integer pipe,Real diameter)                                          L_Set_Drainage_Pipe_Diameter;
 Integer Set_drainage_pipe_nominal_diameter (Element element,Integer pipe,Real nominal_diameter)                                  L_Set_Drainage_Pipe_Nominal_Diameter;
 Integer Set_drainage_pipe_separation       (Element element,Integer pipe,Real separation)                                        L_Set_Drainage_Pipe_Separation;
 Integer Set_drainage_pipe_width            (Element element,Integer pipe,Real &width)                                            L_Set_Drainage_Pipe_Width;
 Integer Set_drainage_pipe_top_width        (Element element,Integer pipe,Real &top_width)                                        L_Set_Drainage_Pipe_Top_Width;
 Integer Set_drainage_pipe_type             (Element element,Integer pipe,Text type)                                              L_Set_Drainage_Pipe_Type;
 Integer Set_drainage_pipe_name             (Element element,Integer pipe,Text name)                                              L_Set_Drainage_Pipe_Name;
 Integer Set_drainage_pipe_inverts          (Element element,Integer pipe,Real lhs,Real rhs)                                      L_Set_Drainage_Pipe_Inverts;
 Integer Set_drainage_pipe_hgls             (Element element,Integer pipe,Real lhs,Real rhs)                                      L_Set_Drainage_Pipe_HGLS;
 Integer Set_drainage_pipe_thickness        (Element element,Integer pit,Real top,Real bottom,Real left,Real right)               L_Set_Drainage_Pipe_Thickness;
 Integer Set_drainage_pipe_sediment_depth   (Element element,Integer pit,Real sediment_depth)                                     L_Set_Drainage_Pipe_Sediment_Depth;

 Integer Get_drainage_pipe_length      (Element element,Integer pipe,Real &length)                                                L_Get_Drainage_Pipe_Length;
 Integer Get_drainage_pipe_grade       (Element element,Integer pipe,Real &grade)                                                 L_Get_Drainage_Pipe_Grade;

 Integer Get_drainage_pipe_cover       (Element element,Integer pipe,Real &minc,Real &maxc)                                       L_Get_Drainage_Pipe_Covers;
 Integer Set_drainage_pipe_cover       (Element element,Integer pipe,Real cover)                                                  L_Set_Drainage_Pipe_Cover;

 Integer Get_drainage_pipe_colour      (Element element,Integer pipe,Integer &colour)                                             L_Get_Drainage_Pipe_Colour;
 Integer Set_drainage_pipe_colour      (Element element,Integer pipe,Integer  colour)                                             L_Set_Drainage_Pipe_Colour;

 Integer Get_drainage_pipe_number_of_pipes(Element element,Integer pipe, Integer &n)                                              L_Get_Drainage_Pipe_Number_of_Pipes;
 Integer Set_drainage_pipe_number_of_pipes(Element element,Integer pipe, Integer  n)                                              L_Set_Drainage_Pipe_Number_of_Pipes;

 Integer Get_drainage_pipe_intersects_pit      (Element element,Integer pipe,Real offset, Real &lx,Real &ly,Real &lch,Real&rx,Real&ry,Real &rch)        L_Get_Drainage_Pipe_Intersects_Pit;
 Integer Get_drainage_pipe_shape               (Element element,Integer pipe,Integer mode,Real offset,Element &super_inside,Element &super_outside)     L_Get_Drainage_Pipe_Shape;
 Integer Get_drainage_pipe_shape               (Element element,Integer pipe,Integer mode,Dynamic_Element &super_inside,Dynamic_Element &super_outside) L_Get_Drainage_Pipe_Shape_All;

 Integer Get_drainage_pipe_attributes          (Element elt,Integer pipe,Attributes &att)                          L_Get_Drainage_Pipe_Attributes;
 Integer Set_drainage_pipe_attributes          (Element elt,Integer pipe,Attributes  att)                          L_Set_Drainage_Pipe_Attributes;

 Integer Drainage_pipe_attribute_exists        (Element elt,Integer pipe,Text att_name)                            L_Drainage_Pipe_Attribute_Exists;
 Integer Drainage_pipe_attribute_exists        (Element elt,Integer pipe,Text name,Integer &no)                    L_Drainage_Pipe_Attribute_Exists_No;
 Integer Drainage_pipe_attribute_delete        (Element elt,Integer pipe,Text att_name)                            L_Drainage_Pipe_Attribute_Delete_Text;
 Integer Drainage_pipe_attribute_delete        (Element elt,Integer pipe,Integer att_no)                           L_Drainage_Pipe_Attribute_Delete_No;
 Integer Drainage_pipe_attribute_delete_all    (Element elt,Integer pipe)                                          L_Drainage_Pipe_Attribute_Delete_All;
 Integer Drainage_pipe_attribute_dump          (Element elt,Integer pipe)                                          L_Drainage_Pipe_Attribute_Dump;
 Integer Drainage_pipe_attribute_debug         (Element elt,Integer pipe)                                          L_Drainage_Pipe_Attribute_Debug;
 Integer Get_drainage_pipe_number_of_attributes(Element elt,Integer pipe,Integer &no_atts)                         L_Get_Drainage_Pipe_Number_Of_Attributes;

 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Text &att)                  L_Get_Drainage_Pipe_Attribute_Text_Text;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Integer &att)               L_Get_Drainage_Pipe_Attribute_Text_Integer;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Real &att)                  L_Get_Drainage_Pipe_Attribute_Text_Real;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Uid &att)                   L_Get_Drainage_Pipe_Attribute_Text_Uid;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Attributes &att)            L_Get_Drainage_Pipe_Attribute_Text_Attribute;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Attribute_Blob &att)        L_Get_Drainage_Pipe_Attribute_Text_Attribute_Blob; 
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Integer64 &att)             L_Get_Drainage_Pipe_Attribute_Text_Integer64;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Guid &att)                  L_Get_Drainage_Pipe_Attribute_Text_Guid;
 
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Text &att)                  L_Get_Drainage_Pipe_Attribute_Text_Match_Text;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Integer &att)               L_Get_Drainage_Pipe_Attribute_Text_Match_Integer;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Real &att)                  L_Get_Drainage_Pipe_Attribute_Text_Match_Real;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Uid &att)                   L_Get_Drainage_Pipe_Attribute_Text_Match_Uid;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Attributes &att)            L_Get_Drainage_Pipe_Attribute_Text_Match_Attribute;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Attribute_Blob &att)        L_Get_Drainage_Pipe_Attribute_Text_Match_Attribute_Blob;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Integer64 &att)             L_Get_Drainage_Pipe_Attribute_Text_Match_Integer64;
 Integer Get_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Guid &att)                  L_Get_Drainage_Pipe_Attribute_Text_Match_Guid; 
 
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Text &att)                 L_Get_Drainage_Pipe_Attribute_No_Text;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Integer &att)              L_Get_Drainage_Pipe_Attribute_No_Integer;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Real &att)                 L_Get_Drainage_Pipe_Attribute_No_Real;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Uid &att)                  L_Get_Drainage_Pipe_Attribute_No_Uid;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Attributes &att)           L_Get_Drainage_Pipe_Attribute_No_Attribute;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Attribute_Blob &att)       L_Get_Drainage_Pipe_Attribute_No_Attribute_Blob;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Integer64 &att)            L_Get_Drainage_Pipe_Attribute_No_Integer64;
 Integer Get_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Guid &att)                 L_Get_Drainage_Pipe_Attribute_No_Guid;
 
 Integer Get_drainage_pipe_attribute_name      (Element elt,Integer pipe,Integer att_no,Text &name)                 L_Get_Drainage_Pipe_Attribute_Name;
 Integer Get_drainage_pipe_attribute_type      (Element elt,Integer pipe,Text att_name,Integer &att_type)    				L_Get_Drainage_Pipe_Attribute_Type_Text;
 Integer Get_drainage_pipe_attribute_type      (Element elt,Integer pipe,Integer att_name,Integer &att_type) 				L_Get_Drainage_Pipe_Attribute_Type_No;
 Integer Get_drainage_pipe_attribute_length    (Element elt,Integer pipe,Text att_name,Integer &att_len)     				L_Get_Drainage_Pipe_Attribute_Length_Text;
 Integer Get_drainage_pipe_attribute_length    (Element elt,Integer pipe,Integer att_no,Integer &att_len)    				L_Get_Drainage_Pipe_Attribute_Length_No;

 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Text att)             				L_Set_Drainage_Pipe_Attribute_Text_Text;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Integer att)          				L_Set_Drainage_Pipe_Attribute_Text_Integer;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Real att)             				L_Set_Drainage_Pipe_Attribute_Text_Real;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Uid att)              				L_Set_Drainage_Pipe_Attribute_Text_Uid;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Attributes att)       				L_Set_Drainage_Pipe_Attribute_Text_Attribute;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Attribute_Blob att)       	  L_Set_Drainage_Pipe_Attribute_Text_Attribute_Blob;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Integer64  att)              L_Set_Drainage_Pipe_Attribute_Text_Integer64;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Text att_name,Guid  att)                   L_Set_Drainage_Pipe_Attribute_Text_Guid;

 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Text att)                    L_Set_Drainage_Pipe_Attribute_Text_Match_Text;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Integer att)                 L_Set_Drainage_Pipe_Attribute_Text_Match_Integer;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Real att)                    L_Set_Drainage_Pipe_Attribute_Text_Match_Real;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Uid att)                     L_Set_Drainage_Pipe_Attribute_Text_Match_Uid;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Attributes att)              L_Set_Drainage_Pipe_Attribute_Text_Match_Attribute;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Attribute_Blob att)          L_Set_Drainage_Pipe_Attribute_Text_Match_Attribute_Blob;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Integer64  att)              L_Set_Drainage_Pipe_Attribute_Text_Match_Integer64;
 Integer Set_drainage_pipe_attribute_by_type   (Element elt,Integer pipe,Text att_name,Guid  att)                   L_Set_Drainage_Pipe_Attribute_Text_Match_Guid;
 
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Text att)            				L_Set_Drainage_Pipe_Attribute_No_Text;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Integer att)         				L_Set_Drainage_Pipe_Attribute_No_Integer;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Real att)            				L_Set_Drainage_Pipe_Attribute_No_Real;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Uid att)             				L_Set_Drainage_Pipe_Attribute_No_Uid;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Attributes att)      				L_Set_Drainage_Pipe_Attribute_No_Attribute;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Attribute_Blob att)      		L_Set_Drainage_Pipe_Attribute_No_Attribute_Blob;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Integer64  att)             L_Set_Drainage_Pipe_Attribute_No_Integer64;
 Integer Set_drainage_pipe_attribute           (Element elt,Integer pipe,Integer att_no,Guid  att)                  L_Set_Drainage_Pipe_Attribute_No_Guid;
 
// pit calls

 Integer Get_drainage_pits             					(Element element,Integer &npits)                                                          													L_Get_Drainage_Pits;
 Integer Get_drainage_pit_connection						(Element string,Integer mh_index,Integer &mh_con_type,Element &con_string,Integer &con_mh_index,Integer &con_type)  L_Get_Drainage_Pit_Connection;

 Integer Get_drainage_pit              					(Element element,Integer pit,Real &x,Real &y,Real &z)                                     L_Get_Drainage_Pit;
 Integer Get_drainage_pit_diameter     					(Element element,Integer pit,Real &diameter)                                              L_Get_Drainage_Pit_Diameter;
 Integer Get_drainage_pit_width        					(Element element,Integer pit,Real &width)                                                 L_Get_Drainage_Pit_Width;
 Integer Get_drainage_pit_length       					(Element element,Integer pit,Real &length)                                                L_Get_Drainage_Pit_Length;
 Integer Get_drainage_pit_type         					(Element element,Integer pit,Text &type)                                                  L_Get_Drainage_Pit_Type;
 Integer Get_drainage_pit_name         					(Element element,Integer pit,Text &name)                                                  L_Get_Drainage_Pit_Name;
 Integer Get_drainage_pit_inverts      					(Element element,Integer pit,Real &lhs,Real &rhs)                                         L_Get_Drainage_Pit_Inverts;
 Integer Get_drainage_pit_hgls         					(Element element,Integer pit,Real &lhs,Real &rhs)                                         L_Get_Drainage_Pit_HGLS;
 Integer Get_drainage_pit_hgl          					(Element element,Integer pit,Real &hgl)                                                   L_Get_Drainage_Pit_HGL;
 Integer Get_drainage_pit_surface_hgl  					(Element element,Integer pit,Real &hgl)                                                   L_Get_Drainage_Pit_Surface_HGL;
 Integer Get_drainage_pit_road_chainage					(Element element,Integer pit,Real &chainage)                                              L_Get_Drainage_Pit_Road_Chainage;
 Integer Get_drainage_pit_road_name    					(Element element,Integer pit,Text &name)                                                  L_Get_Drainage_Pit_Road_Name;
 Integer Get_drainage_pit_float        					(Element element,Integer pit,Integer &float)                                              L_Get_Drainage_Pit_Float;
 Integer Get_drainage_pit_float_sump   					(Element element,Integer pit,Integer &floating)                                           L_Get_Drainage_Pit_Float_Sump;
 Integer Get_drainage_pit_sump_level   					(Element element,Integer pit,Real &level)                                                 L_Get_Drainage_Pit_Sump_Level;
 Integer Get_drainage_pit_thickness    					(Element element,Integer pit,Real &bottom,Real &front,Real &back,Real &left,Real &right)  L_Get_Drainage_Pit_Thickness;
 Integer Get_drainage_pit_symbol_angle 					(Element element,Integer pit,Real &angle)                                                 L_Get_Drainage_Pit_Symbol_Angle;
 Integer Set_drainage_pit_symbol_angle_mode			(Element element,Integer pit,Integer mode)          																			L_Set_Drainage_Pit_Symbol_Angle_Mode;
 Integer Get_drainage_pit_symbol_angle_mode			(Element element,Integer pit,Integer &mode)         																			L_Get_Drainage_Pit_Symbol_Angle_Mode;
 Integer Set_drainage_pit_connection_points_mode(Element element,Integer pit,Integer mode)          																			L_Set_Drainage_Pit_Connection_Points_Mode;
 Integer Get_drainage_pit_connection_points_mode(Element element,Integer pit,Integer &mode)         																			L_Get_Drainage_Pit_Connection_Points_Mode;
 Integer Set_drainage_pit_2d_connection_mode		(Element element,Integer pit,Integer mode)          																			L_Set_Drainage_Pit_2d_Connection_Mode;
 Integer Get_drainage_pit_2d_connection_mode		(Element element,Integer pit,Integer &mode)         																			L_Get_Drainage_Pit_2d_Connection_Mode;

 Integer Set_drainage_pit              					(Element element,Integer pit,Real x,Real y,Real z)                                        L_Set_Drainage_Pit;
 Integer Set_drainage_pit_diameter     					(Element element,Integer pit,Real diameter)                                               L_Set_Drainage_Pit_Diameter;
 Integer Set_drainage_pit_width        					(Element string, Integer pit,Real width)                                                  L_Set_Drainage_Pit_Width;
 Integer Set_drainage_pit_length       					(Element string, Integer pit,Real length)                                                 L_Set_Drainage_Pit_Length;
 Integer Set_drainage_pit_type         					(Element element,Integer pit,Text type)                                                   L_Set_Drainage_Pit_Type;
 Integer Set_drainage_pit_name         					(Element element,Integer pit,Text name)                                                   L_Set_Drainage_Pit_Name;
 Integer Set_drainage_pit_inverts      					(Element element,Integer pit,Real lhs,Real rhs)                                           L_Set_Drainage_Pit_Inverts;
 Integer Set_drainage_pit_hgls         					(Element element,Integer pit,Real lhs,Real rhs)                                           L_Set_Drainage_Pit_HGLS;
 Integer Set_drainage_pit_hgl          					(Element element,Integer pit,Real hgl)                                                    L_Set_Drainage_Pit_HGL;
 Integer Set_drainage_pit_surface_hgl  					(Element element,Integer pit,Real hgl)                                                    L_Set_Drainage_Pit_Surface_HGL;
 Integer Set_drainage_pit_road_chainage					(Element element,Integer pit,Real chainage)                                               L_Set_Drainage_Pit_Road_Chainage;
 Integer Set_drainage_pit_road_name    					(Element element,Integer pit,Text name)                                                   L_Set_Drainage_Pit_Road_Name;
 Integer Set_drainage_pit_float        					(Element element,Integer pit,Integer float)                                               L_Set_Drainage_Pit_Float;
 Integer Set_drainage_pit_float_sump   					(Element element,Integer pit,Integer floating)                                            L_Set_Drainage_Pit_Float_Sump;
 Integer Set_drainage_pit_sump_level   					(Element element,Integer pit,Real level)                                                  L_Set_Drainage_Pit_Sump_Level;
 Integer Set_drainage_pit_thickness    					(Element element,Integer pit,Real bottom,Real front,Real back,Real left,Real right)       L_Set_Drainage_Pit_Thickness;
 Integer Set_drainage_pit_symbol_angle 					(Element string, Integer pit,Real angle)                                                  L_Set_Drainage_Pit_Symbol_Angle;


 Integer Get_drainage_pit_angle        					(Element element,Integer pit,Real &angle)                                                 L_Get_Drainage_Pit_Angle;
 Integer Get_drainage_pit_drop         					(Element element,Integer pit,Real &drop)                                                  L_Get_Drainage_Pit_Drop;
 Integer Get_drainage_pit_depth        					(Element element,Integer pit,Real &depth)                                                 L_Get_Drainage_Pit_Depth;
 Integer Get_drainage_pit_chainage     					(Element element,Integer pit,Real &chainage)                                              L_Get_Drainage_Pit_Chainage;

 Integer Get_drainage_pit_connection_points			(Element element,Integer pit,Real &lx,Real &ly,Real &rx,Real &ry)                         L_Get_Drainage_Pit_Connection_Points;
 Integer Get_drainage_pit_chainages        			(Element element,Integer pit,Real &ch_lcp,Real &ch_centre,Real &ch_rcp)                   L_Get_Drainage_Pit_Chainages;
 Integer Get_drainage_pit_shape            			(Element element,Integer pit,Integer mode,Element &super_inside,Element &super_outside)	  L_Get_Drainage_Pit_Shape;

 Integer Get_drainage_pit_colour       					(Element element,Integer pit,Integer &colour)                                             L_Get_Drainage_Pit_Colour;
 Integer Set_drainage_pit_colour       					(Element element,Integer pit,Integer  colour)                                             L_Set_Drainage_Pit_Colour;

// take into account trunk lines

 Integer Get_drainage_pit_angle        					(Element element,Integer pit,Real &angle,Integer trunk) 																	L_Get_Drainage_Pit_Angle_Trunk;

 Integer Get_drainage_pit_ns           					(Element element,Integer pit,Real &ht)             																				L_Get_Drainage_Pit_NS;
 Integer Get_drainage_pit_fs           					(Element element,Integer pit,Real &ht)             																				L_Get_Drainage_Pit_FS;

 Integer Get_drainage_pipe_ns          					(Element element,Integer pipe,Real ch[],Real ht[],Integer max_pts,Integer &npts)          L_Get_Drainage_Pipe_NS;
 Integer Get_drainage_pipe_fs          					(Element element,Integer pipe,Real ch[],Real ht[],Integer max_pts,Integer &npts)          L_Get_Drainage_Pipe_FS;

 Integer Get_drainage_pit_attributes          (Element elt,Integer pit,Attributes &att)                    L_Get_Drainage_Pit_Attributes;
 Integer Set_drainage_pit_attributes          (Element elt,Integer pit,Attributes  att)                    L_Set_Drainage_Pit_Attributes;

 Integer Drainage_pit_attribute_exists        (Element elt,Integer pit,Text att_name)                      L_Drainage_Pit_Attribute_Exists;
 Integer Drainage_pit_attribute_exists        (Element elt,Integer pit,Text name,Integer &no)              L_Drainage_Pit_Attribute_Exists_No;
 Integer Drainage_pit_attribute_delete        (Element elt,Integer pit,Text att_name)                      L_Drainage_Pit_Attribute_Delete_Text;
 Integer Drainage_pit_attribute_delete        (Element elt,Integer pit,Integer att_no)                     L_Drainage_Pit_Attribute_Delete_No;
 Integer Drainage_pit_attribute_delete_all    (Element elt,Integer pit)                                    L_Drainage_Pit_Attribute_Delete_All;
 Integer Drainage_pit_attribute_dump          (Element elt,Integer pit)                                    L_Drainage_Pit_Attribute_Dump;
 Integer Drainage_pit_attribute_debug         (Element elt,Integer pit)                                    L_Drainage_Pit_Attribute_Debug;
 Integer Get_drainage_pit_number_of_attributes(Element elt,Integer pit,Integer &no_atts)                   L_Get_Drainage_Pit_Number_Of_Attributes;

 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Text &att)            L_Get_Drainage_Pit_Attribute_Text_Text;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Integer &att)         L_Get_Drainage_Pit_Attribute_Text_Integer;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Real &att)            L_Get_Drainage_Pit_Attribute_Text_Real;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Uid &att)             L_Get_Drainage_Pit_Attribute_Text_Uid;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Attributes &att)      L_Get_Drainage_Pit_Attribute_Text_Attribute;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Attribute_Blob &att)  L_Get_Drainage_Pit_Attribute_Text_Attribute_Blob;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Integer64 &att)       L_Get_Drainage_Pit_Attribute_Text_Integer64;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Guid &att)            L_Get_Drainage_Pit_Attribute_Text_Guid;

 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Text &att)            L_Get_Drainage_Pit_Attribute_Text_Match_Text;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Integer &att)         L_Get_Drainage_Pit_Attribute_Text_Match_Integer;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Real &att)            L_Get_Drainage_Pit_Attribute_Text_Match_Real;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Uid &att)             L_Get_Drainage_Pit_Attribute_Text_Match_Uid;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Attributes &att)      L_Get_Drainage_Pit_Attribute_Text_Match_Attribute;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Attribute_Blob &att)  L_Get_Drainage_Pit_Attribute_Text_Match_Attribute_Blob;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Integer64 &att)       L_Get_Drainage_Pit_Attribute_Text_Match_Integer64;
 Integer Get_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Guid &att)            L_Get_Drainage_Pit_Attribute_Text_Match_Guid; 
 
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Text &att)           L_Get_Drainage_Pit_Attribute_No_Text;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Integer &att)        L_Get_Drainage_Pit_Attribute_No_Integer;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Real &att)           L_Get_Drainage_Pit_Attribute_No_Real;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Uid &att)            L_Get_Drainage_Pit_Attribute_No_Uid;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Attributes &att)     L_Get_Drainage_Pit_Attribute_No_Attribute;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Attribute_Blob &att) L_Get_Drainage_Pit_Attribute_No_Attribute_Blob;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Integer64 &att)      L_Get_Drainage_Pit_Attribute_No_Integer64;
 Integer Get_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Guid &att)           L_Get_Drainage_Pit_Attribute_No_Guid;

 Integer Get_drainage_pit_attribute_name      (Element elt,Integer pit,Integer att_no,Text &name)          L_Get_Drainage_Pit_Attribute_Name;
 Integer Get_drainage_pit_attribute_type      (Element elt,Integer pit,Text att_name,Integer &att_type)    L_Get_Drainage_Pit_Attribute_Type_Text;
 Integer Get_drainage_pit_attribute_type      (Element elt,Integer pit,Integer att_name,Integer &att_type) L_Get_Drainage_Pit_Attribute_Type_No;
 Integer Get_drainage_pit_attribute_length    (Element elt,Integer pit,Text att_name,Integer &att_len)     L_Get_Drainage_Pit_Attribute_Length_Text;
 Integer Get_drainage_pit_attribute_length    (Element elt,Integer pit,Integer att_no,Integer &att_len)    L_Get_Drainage_Pit_Attribute_Length_No;

 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Text att)             L_Set_Drainage_Pit_Attribute_Text_Text;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Integer att)          L_Set_Drainage_Pit_Attribute_Text_Integer;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Real att)             L_Set_Drainage_Pit_Attribute_Text_Real;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Uid att)              L_Set_Drainage_Pit_Attribute_Text_Uid;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Attributes att)       L_Set_Drainage_Pit_Attribute_Text_Attribute;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Attribute_Blob att)   L_Set_Drainage_Pit_Attribute_Text_Attribute_Blob;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Integer64  att)       L_Set_Drainage_Pit_Attribute_Text_Integer64;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Text att_name,Guid  att)            L_Set_Drainage_Pit_Attribute_Text_Guid;
 
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Text att)             L_Set_Drainage_Pit_Attribute_Text_Match_Text;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Integer att)          L_Set_Drainage_Pit_Attribute_Text_Match_Integer;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Real att)             L_Set_Drainage_Pit_Attribute_Text_Match_Real;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Uid att)              L_Set_Drainage_Pit_Attribute_Text_Match_Uid;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Attributes att)       L_Set_Drainage_Pit_Attribute_Text_Match_Attribute;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Attribute_Blob att)   L_Set_Drainage_Pit_Attribute_Text_Match_Attribute_Blob;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Integer64  att)       L_Set_Drainage_Pit_Attribute_Text_Match_Integer64;
 Integer Set_drainage_pit_attribute_by_type   (Element elt,Integer pit,Text att_name,Guid  att)            L_Set_Drainage_Pit_Attribute_Text_Match_Guid; 
 
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Text att)            L_Set_Drainage_Pit_Attribute_No_Text;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Integer att)         L_Set_Drainage_Pit_Attribute_No_Integer;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Real att)            L_Set_Drainage_Pit_Attribute_No_Real;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Uid att)             L_Set_Drainage_Pit_Attribute_No_Uid;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Attributes att)      L_Set_Drainage_Pit_Attribute_No_Attribute;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Attribute_Blob att)  L_Set_Drainage_Pit_Attribute_No_Attribute_Blob; 
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Integer64  att)      L_Set_Drainage_Pit_Attribute_No_Integer64;
 Integer Set_drainage_pit_attribute           (Element elt,Integer pit,Integer att_no,Guid  att)           L_Set_Drainage_Pit_Attribute_No_Guid; 
 
// house connections

 Integer Get_drainage_hcs             (Element element,Integer &no_hcs)                    L_Get_Drainage_Connections;

 Integer Get_drainage_hc              (Element element,Integer hc,Real &x,Real &y,Real &z) L_Get_Drainage_HC;
 Integer Get_drainage_hc_chainage     (Element element,Integer hc,Real &chainage)          L_Get_Drainage_HC_Chainage;
 Integer Get_drainage_hc_ip           (Element element,Integer hc,Integer &ip)             L_Get_Drainage_HC_IP;
 Integer Get_drainage_hc_side         (Element element,Integer hc,Integer &side)           L_Get_Drainage_HC_Side;
 Integer Get_drainage_hc_name         (Element element,Integer hc,Text &name)              L_Get_Drainage_HC_Name;
 Integer Get_drainage_hc_hcb          (Element element,Integer hc,Integer &hcb)            L_Get_Drainage_HC_HCB;
 Integer Get_drainage_hc_level        (Element element,Integer hc,Real &level)             L_Get_Drainage_HC_Level;
 Integer Get_drainage_hc_adopted_level(Element element,Integer hc,Real &level)             L_Get_Drainage_HC_Adopted_Level;
 Integer Get_drainage_hc_length       (Element element,Integer hc,Real &length)            L_Get_Drainage_HC_Length;
 Integer Get_drainage_hc_grade        (Element element,Integer hc,Real &grade)             L_Get_Drainage_HC_Grade;
 Integer Get_drainage_hc_depth        (Element element,Integer hc,Real &depth)             L_Get_Drainage_HC_Depth;
 Integer Get_drainage_hc_diameter     (Element element,Integer hc,Real &diameter)          L_Get_Drainage_HC_Diameter;
 Integer Get_drainage_hc_colour       (Element element,Integer hc,Integer &colour)         L_Get_Drainage_HC_Colour;
 Integer Get_drainage_hc_type         (Element element,Integer hc,Text &type)              L_Get_Drainage_HC_Type;
 Integer Get_drainage_hc_material     (Element element,Integer hc,Text &material)          L_Get_Drainage_HC_Material;
 Integer Get_drainage_hc_bush         (Element element,Integer hc,Text &bush)              L_Get_Drainage_HC_Bush;

 Integer Set_drainage_hc_side         (Element element,Integer hc,Integer side)            L_Set_Drainage_HC_Side;
 Integer Set_drainage_hc_name         (Element element,Integer hc,Text name)               L_Set_Drainage_HC_Name;
 Integer Set_drainage_hc_hcb          (Element element,Integer hc,Integer hcb)             L_Set_Drainage_HC_HCB;
 Integer Set_drainage_hc_level        (Element element,Integer hc,Real level)              L_Set_Drainage_HC_Level;
 Integer Set_drainage_hc_adopted_level(Element element,Integer hc,Real level)              L_Set_Drainage_HC_Adopted_Level;
 Integer Set_drainage_hc_length       (Element element,Integer hc,Real length)             L_Set_Drainage_HC_Length;
 Integer Set_drainage_hc_grade        (Element element,Integer hc,Real grade)              L_Set_Drainage_HC_Grade;
 Integer Set_drainage_hc_depth        (Element element,Integer hc,Real depth)              L_Set_Drainage_HC_Depth;
 Integer Set_drainage_hc_diameter     (Element element,Integer hc,Real diameter)           L_Set_Drainage_HC_Diameter;
 Integer Set_drainage_hc_colour       (Element element,Integer hc,Integer colour)          L_Set_Drainage_HC_Colour;
 Integer Set_drainage_hc_type         (Element element,Integer hc,Text type)               L_Set_Drainage_HC_Type;
 Integer Set_drainage_hc_material     (Element element,Integer hc,Text material)           L_Set_Drainage_HC_Material;
 Integer Set_drainage_hc_bush         (Element element,Integer hc,Text bush)               L_Set_Drainage_HC_Bush;

 Integer Drainage_grade_to_end          (Element element,Integer pipe,Real slope)          L_Drainage_Grade_To_End;
 Integer Drainage_default_grading_to_end(Element element,Integer pipe)                     L_Drainage_Default_Grading_To_End;

// access to drainage.4d

 Integer Get_drainage_number_of_manhole_types     (Integer &n)                   L_Get_Drainage_Number_of_Manhole_Types     ;
 Integer Get_drainage_manhole_type                (Integer i, Text &type)        L_Get_Drainage_Manhole_Type                ;
 Integer Get_drainage_manhole_length              (Text type, Real &length)      L_Get_Drainage_Manhole_Length              ;
 Integer Get_drainage_manhole_width               (Text type, Real &width)       L_Get_Drainage_Manhole_Width               ;
 Integer Get_drainage_manhole_description         (Text type, Text &description) L_Get_Drainage_Manhole_Description         ;
 Integer Get_drainage_manhole_notes               (Text type, Text &notes)       L_Get_Drainage_Manhole_Notes               ;
 Integer Get_drainage_manhole_group               (Text type, Text &group)       L_Get_Drainage_Manhole_Group               ;
 Integer Get_drainage_manhole_capacities          (Text type, Real &multi, Real &fixed, Real &percent, Real &coeff, Real &power) L_Get_Drainage_Manhole_Capacities          ;
 Integer Get_drainage_number_of_sag_curves        (Text type, Integer &n)                                                        L_Get_Drainage_Number_of_Sag_Curves        ;
 Integer Get_drainage_sag_curve_name              (Text type, Text &name)                                                        L_Get_Drainage_Sag_Curve_Name              ;
 Integer Get_drainage_manhole_capacities_sag      (Text type, Real &multi, Real &fixed, Real &percent, Real &coeff, Real &power) L_Get_Drainage_Manhole_Capacities_Sag      ;
 Integer Get_drainage_number_of_sag_curve_coords  (Text type, Integer &n)                                                        L_Get_Drainage_Number_of_Sag_Curve_Coords  ;
 Integer Get_drainage_sag_curve_coords            (Text type, Real Depth[], Real Qin[], Integer nmax, Integer &n)                L_Get_Drainage_Sag_Curve_Coords            ;
 Integer Get_drainage_number_of_grade_curves      (Text type, Integer &n)                                                        L_Get_Drainage_Number_of_Grade_Curves      ;
 Integer Get_drainage_grade_curve_name            (Text type, Integer i, Text &name)                                             L_Get_Drainage_Grade_Curve_Name            ;
 Integer Get_drainage_grade_curve_threshold       (Text type, Text name, Integer &by_grade, Real &road_grade, Integer &by_xfall, Real &road_xfall) L_Get_Drainage_Grade_Curve_Threshold       ;
 Integer Get_drainage_manhole_capacities_grade    (Text type, Text name, Real &multi, Real &fixed, Real &percent, Real &coeff, Real &power)        L_Get_Drainage_Manhole_Capacities_Grade    ;
 Integer Get_drainage_number_of_grade_curve_coords(Text type, Text name, Integer &n)                                                               L_Get_Drainage_Number_of_Grade_Curve_Coords;
 Integer Get_drainage_grade_curve_coords          (Text type, Text name, Real Qa[], Real Qin[], Integer nmax, Integer &n)                          L_Get_Drainage_Grade_Curve_Coords          ;

 Integer Get_drainage_manhole_diam                (Text type, Real &diam)       L_Get_Drainage_Manhole_Diam;
 Integer Get_drainage_manhole_config              (Text type, Text &cap_config) L_Get_Drainage_Manhole_Config;

 Integer Get_drainage_number_of_pipe_types (Integer &n) L_Get_Drainage_Number_of_Pipe_Types;
 Integer Get_drainage_pipe_type            (Integer i, Text &type) L_Get_Drainage_Pipe_Type2;
 Integer Get_drainage_pipe_roughness       (Text type, Real &roughness, Integer &roughness_type) L_Get_Drainage_Pipe_Roughness;

// more string functions

 Integer Clip_string(Element string,Real chainage1,Real chainage2,
                     Element &left_string,Element &mid_string,Element &right_string) L_Clip_String;
 Integer Clip_string(Element string,Integer direction,Real chainage1,Real chainage2,
                     Element &left_string,Element &mid_string,Element &right_string) L_Clip_String_Direction;

 Integer Split_string(Element string,Real chainage,Element &string1,Element &string2) L_Split_String;
 Integer Join_strings(Element string1,Real x1,Real y1,Real z1,
                      Element string2,Real x2,Real y2,Real z2,Element &joined_string) L_Join_Strings;

 Integer Cut_strings           (Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element &result) L_Cut_Strings;
 Integer Cut_strings_with_nulls(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element &result) L_Cut_Strings_With_Nulls;


// Element attribute functions

 Integer Get_attributes          (Element elt,Attributes &att)                    L_Get_Attributes;
 Integer Set_attributes          (Element elt,Attributes  att)                    L_Set_Attributes;

 Integer Attribute_exists        (Element elt,Text att_name)                      L_Attribute_Exists;
 Integer Attribute_exists        (Element elt,Text name,Integer &no)              L_Attribute_Exists_No;
 Integer Attribute_delete        (Element elt,Text att_name)                      L_Attribute_Delete_Text;
 Integer Attribute_delete        (Element elt,Integer att_no)                     L_Attribute_Delete_No;
 Integer Attribute_delete_all    (Element elt)                                    L_Attribute_Delete_All;
 Integer Get_number_of_attributes(Element elt,Integer &no_atts)                   L_Get_Number_Of_Attributes;

 Integer Get_attribute           (Element elt,Text att_name,Text &att)            L_Get_Attribute_Text_Text;
 Integer Get_attribute           (Element elt,Text att_name,Integer &att)         L_Get_Attribute_Text_Integer;
 Integer Get_attribute           (Element elt,Text att_name,Real &att)            L_Get_Attribute_Text_Real;
 Integer Get_attribute           (Element elt,Text att_name,Uid &att)             L_Get_Attribute_Text_Uid;
 Integer Get_attribute           (Element elt,Text att_name,Attributes &att)      L_Get_Attribute_Text_Attribute;
 Integer Get_attribute           (Element elt,Text att_name,Attribute_Blob &att)  L_Get_Attribute_Text_Attribute_Blob;
 Integer Get_attribute           (Element elt,Text att_name,Integer64 &att)       L_Get_Attribute_Text_Integer64;
 Integer Get_attribute           (Element elt,Text att_name,Guid      &att)       L_Get_Attribute_Text_Guid;
 
 Integer Get_attribute           (Element elt,Integer att_no,Text &att)           L_Get_Attribute_No_Text;
 Integer Get_attribute           (Element elt,Integer att_no,Integer &att)        L_Get_Attribute_No_Integer;
 Integer Get_attribute           (Element elt,Integer att_no,Real &att)           L_Get_Attribute_No_Real;
 Integer Get_attribute           (Element elt,Integer att_no,Uid &att)            L_Get_Attribute_No_Uid;
 Integer Get_attribute           (Element elt,Integer att_no,Attributes &att)     L_Get_Attribute_No_Attribute;
 Integer Get_attribute           (Element elt,Integer att_no,Attribute_Blob &att) L_Get_Attribute_No_Attribute_Blob;
 Integer Get_attribute           (Element elt,Integer att_no,Integer64 &att)      L_Get_Attribute_No_Integer64;
 Integer Get_attribute           (Element elt,Integer att_no,Guid &att)           L_Get_Attribute_No_Guid;

 Integer Get_attribute_by_type   (Element elt,Text att_name,Text &att)            L_Get_Attribute_Text_Match_Text;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Integer &att)         L_Get_Attribute_Text_Match_Integer;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Real &att)            L_Get_Attribute_Text_Match_Real;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Uid &att)             L_Get_Attribute_Text_Match_Uid;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Attributes &att)      L_Get_Attribute_Text_Match_Attribute;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Attribute_Blob &att)  L_Get_Attribute_Text_Match_Attribute_Blob;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Integer64 &att)       L_Get_Attribute_Text_Match_Integer64;
 Integer Get_attribute_by_type   (Element elt,Text att_name,Guid &att)            L_Get_Attribute_Text_Match_Guid;

 Integer Set_attribute_by_type   (Element elt,Text att_name,Text att)             L_Set_Attribute_Text_Match_Text;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Integer att)          L_Set_Attribute_Text_Match_Integer;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Real att)             L_Set_Attribute_Text_Match_Real;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Uid att)              L_Set_Attribute_Text_Match_Uid;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Attributes att)       L_Set_Attribute_Text_Match_Attribute;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Attribute_Blob att)   L_Set_Attribute_Text_Match_Attribute_Blob;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Integer64 att)        L_Set_Attribute_Text_Match_Integer64;
 Integer Set_attribute_by_type   (Element elt,Text att_name,Guid att)             L_Set_Attribute_Text_Match_Guid; 

 Integer Get_attribute_name      (Element elt,Integer att_no,Text &name)          L_Get_Attribute_Name;
 Integer Get_attribute_type      (Element elt,Text att_name,Integer &att_type)    L_Get_Attribute_Type_Text;
 Integer Get_attribute_type      (Element elt,Integer att_name,Integer &att_type) L_Get_Attribute_Type_No;
 Integer Get_attribute_length    (Element elt,Text att_name,Integer &att_len)     L_Get_Attribute_Length_Text;
 Integer Get_attribute_length    (Element elt,Integer att_no,Integer &att_len)    L_Get_Attribute_Length_No;

 Integer Set_attribute           (Element elt,Text att_name,Text att)             L_Set_Attribute_Text_Text;
 Integer Set_attribute           (Element elt,Text att_name,Integer att)          L_Set_Attribute_Text_Integer;
 Integer Set_attribute           (Element elt,Text att_name,Real att)             L_Set_Attribute_Text_Real;
 Integer Set_attribute           (Element elt,Text att_name,Uid att)              L_Set_Attribute_Text_Uid;
 Integer Set_attribute           (Element elt,Text att_name,Attributes att)       L_Set_Attribute_Text_Attribute;
 Integer Set_attribute           (Element elt,Text att_name,Attribute_Blob att)   L_Set_Attribute_Text_Attribute_Blob;
 Integer Set_attribute           (Element elt,Text att_name,Integer64 att)        L_Set_Attribute_Text_Integer64;
 Integer Set_attribute           (Element elt,Text att_name,Guid att)             L_Set_Attribute_Text_Guid;

 Integer Set_attribute           (Element elt,Integer att_no,Text att)            L_Set_Attribute_No_Text;
 Integer Set_attribute           (Element elt,Integer att_no,Integer att)         L_Set_Attribute_No_Integer;
 Integer Set_attribute           (Element elt,Integer att_no,Real att)            L_Set_Attribute_No_Real;
 Integer Set_attribute           (Element elt,Integer att_no,Uid att)             L_Set_Attribute_No_Uid;
 Integer Set_attribute           (Element elt,Integer att_no,Attributes att)      L_Set_Attribute_No_Attribute;
 Integer Set_attribute           (Element elt,Integer att_no,Attribute_Blob att)  L_Set_Attribute_No_Attribute_Blob;
 Integer Set_attribute           (Element elt,Integer att_no,Integer64 att)       L_Set_Attribute_No_Integer64;
 Integer Set_attribute           (Element elt,Integer att_no,Guid att)            L_Set_Attribute_No_Guid;

 Integer Attribute_dump          (Element elt) L_Attribute_Dump;
 Integer Attribute_debug         (Element elt) L_Attribute_Debug;


// Attribute functions

 Integer Attribute_exists        (Attributes attr,Text att_name)                      L_Attributes_Attribute_Exists;
 Integer Attribute_exists        (Attributes attr,Text name,Integer &no)              L_Attributes_Attribute_Exists_No;
 Integer Attribute_delete        (Attributes attr,Text att_name)                      L_Attributes_Attribute_Delete_Text;
 Integer Attribute_delete        (Attributes attr,Integer att_no)                     L_Attributes_Attribute_Delete_No;
 Integer Attribute_delete_all    (Attributes attr)                                    L_Attributes_Attribute_Delete_All;
 Integer Get_number_of_attributes(Attributes attr,Integer &no_atts)                   L_Get_Attributes_Number_Of_Attributes;

 Integer Get_attribute           (Attributes attr,Text att_name,Text &att)            L_Get_Attributes_Attribute_Text_Text;
 Integer Get_attribute           (Attributes attr,Text att_name,Integer &att)         L_Get_Attributes_Attribute_Text_Integer;
 Integer Get_attribute           (Attributes attr,Text att_name,Real &att)            L_Get_Attributes_Attribute_Text_Real;
 Integer Get_attribute           (Attributes attr,Text att_name,Uid &att)             L_Get_Attributes_Attribute_Text_Uid;
 Integer Get_attribute           (Attributes attr,Text att_name,Attributes &att)      L_Get_Attributes_Attribute_Text_Attribute;
 Integer Get_attribute           (Attributes attr,Text att_name,Attribute_Blob &att)  L_Get_Attributes_Attribute_Text_Attribute_Blob;
 Integer Get_attribute           (Attributes attr,Text att_name,Integer64 &att)       L_Get_Attributes_Attribute_Text_Integer64;
 Integer Get_attribute           (Attributes attr,Text att_name,Guid &att)            L_Get_Attributes_Attribute_Text_Guid;

 Integer Get_attribute           (Attributes attr,Integer att_no,Text &att)           L_Get_Attributes_Attribute_No_Text;
 Integer Get_attribute           (Attributes attr,Integer att_no,Integer &att)        L_Get_Attributes_Attribute_No_Integer;
 Integer Get_attribute           (Attributes attr,Integer att_no,Real &att)           L_Get_Attributes_Attribute_No_Real;
 Integer Get_attribute           (Attributes attr,Integer att_no,Uid &att)            L_Get_Attributes_Attribute_No_Uid;
 Integer Get_attribute           (Attributes attr,Integer att_no,Attributes &att)     L_Get_Attributes_Attribute_No_Attribute;
 Integer Get_attribute           (Attributes attr,Integer att_no,Attribute_Blob &att) L_Get_Attributes_Attribute_No_Attribute_Blob;
 Integer Get_attribute           (Attributes attr,Integer att_no,Integer64 &att)      L_Get_Attributes_Attribute_No_Integer64;
 Integer Get_attribute           (Attributes attr,Integer att_no,Guid &att)           L_Get_Attributes_Attribute_No_Guid;

 Integer Get_attribute_name      (Attributes attr,Integer att_no,Text &name)          L_Get_Attributes_Attribute_Name;
 Integer Get_attribute_type      (Attributes attr,Text att_name,Integer &att_type)    L_Get_Attributes_Attribute_Type_Text;
 Integer Get_attribute_type      (Attributes attr,Integer att_name,Integer &att_type) L_Get_Attributes_Attribute_Type_No;
 Integer Get_attribute_length    (Attributes attr,Text att_name,Integer &att_len)     L_Get_Attributes_Attribute_Length_Text;
 Integer Get_attribute_length    (Attributes attr,Integer att_no,Integer &att_len)    L_Get_Attributes_Attribute_Length_No;

 Integer Set_attribute           (Attributes attr,Text att_name,Text att)             L_Set_Attributes_Attribute_Text_Text;
 Integer Set_attribute           (Attributes attr,Text att_name,Integer att)          L_Set_Attributes_Attribute_Text_Integer;
 Integer Set_attribute           (Attributes attr,Text att_name,Real att)             L_Set_Attributes_Attribute_Text_Real;
 Integer Set_attribute           (Attributes attr,Text att_name,Uid att)              L_Set_Attributes_Attribute_Text_Uid;
 Integer Set_attribute           (Attributes attr,Text att_name,Attributes att)       L_Set_Attributes_Attribute_Text_Attribute;
 Integer Set_attribute           (Attributes attr,Text att_name,Attribute_Blob att)   L_Set_Attributes_Attribute_Text_Attribute_Blob;
 Integer Set_attribute           (Attributes attr,Text att_name,Integer64 att)        L_Set_Attributes_Attribute_Text_Integer64;
 Integer Set_attribute           (Attributes attr,Text att_name,Guid att)             L_Set_Attributes_Attribute_Text_Guid;

 Integer Set_attribute           (Attributes attr,Integer att_no,Text att)            L_Set_Attributes_Attribute_No_Text;
 Integer Set_attribute           (Attributes attr,Integer att_no,Integer att)         L_Set_Attributes_Attribute_No_Integer;
 Integer Set_attribute           (Attributes attr,Integer att_no,Real att)            L_Set_Attributes_Attribute_No_Real;
 Integer Set_attribute           (Attributes attr,Integer att_no,Uid att)             L_Set_Attributes_Attribute_No_Uid;
 Integer Set_attribute           (Attributes attr,Integer att_no,Attributes att)      L_Set_Attributes_Attribute_No_Attribute;
 Integer Set_attribute           (Attributes attr,Integer att_no,Attribute_Blob att)  L_Set_Attributes_Attribute_No_Attribute_Blob;
 Integer Set_attribute           (Attributes attr,Integer att_no,Integer64 att)       L_Set_Attributes_Attribute_No_Integer64;
 Integer Set_attribute           (Attributes attr,Integer att_no,Guid att)            L_Set_Attributes_Attribute_No_Guid;

 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Text &att)            L_Get_Attributes_Attribute_Text_Match_Text;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Integer &att)         L_Get_Attributes_Attribute_Text_Match_Integer;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Real &att)            L_Get_Attributes_Attribute_Text_Match_Real;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Uid &att)             L_Get_Attributes_Attribute_Text_Match_Uid;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Attributes &att)      L_Get_Attributes_Attribute_Text_Match_Attribute;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Attribute_Blob &att)  L_Get_Attributes_Attribute_Text_Match_Attribute_Blob;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Integer64 &att)       L_Get_Attributes_Attribute_Text_Match_Integer64;
 Integer Get_attribute_by_type   (Attributes attr,Text att_name,Guid &att)            L_Get_Attributes_Attribute_Text_Match_Guid;
 
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Text att)             L_Set_Attributes_Attribute_Text_Match_Text;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Integer att)          L_Set_Attributes_Attribute_Text_Match_Integer;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Real att)             L_Set_Attributes_Attribute_Text_Match_Real;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Uid att)              L_Set_Attributes_Attribute_Text_Match_Uid;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Attributes att)       L_Set_Attributes_Attribute_Text_Match_Attribute;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Attribute_Blob att)   L_Set_Attributes_Attribute_Text_Match_Attribute_Blob;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Integer64 att)        L_Set_Attributes_Attribute_Text_Match_Integer64;
 Integer Set_attribute_by_type   (Attributes attr,Text att_name,Guid att)             L_Set_Attributes_Attribute_Text_Match_Guid; 
 
 Integer Attribute_dump          (Attributes attr) L_Attributes_Attribute_Dump;
 Integer Attribute_debug         (Attributes attr) L_Attributes_Attribute_Debug;

// plot frames

 Element Create_plot_frame             (Text name)                          L_Create_Plot_Frame;

 Integer Get_plot_frame_name           (Element elt,Text &name)             L_Get_Plot_Frame_Name;
 Integer Get_plot_frame_scale          (Element elt,Real &scale)            L_Get_Plot_Frame_Scale;
 Integer Get_plot_frame_rotation       (Element elt,Real &rotation)         L_Get_Plot_Frame_Rotation;
 Integer Get_plot_frame_origin         (Element elt,Real &x,Real &y)        L_Get_Plot_Frame_Origin;
 Integer Get_plot_frame_sheet_size     (Element elt,Real &w,Real &h)        L_Get_Plot_Frame_Sheet_Size;
 Integer Get_plot_frame_sheet_size     (Element elt,Text &s)                L_Get_Plot_Frame_Sheet_Code;
 Integer Get_plot_frame_margins        (Element elt,Real &l,Real &b,
                                                    Real &r,Real &t)        L_Get_Plot_Frame_Margins;
 Integer Get_plot_frame_text_size      (Element elt,Real &text_size)        L_Get_Plot_Frame_Text_Size;
 Integer Get_plot_frame_draw_border    (Element elt,Integer &draw_border)   L_Get_Plot_Frame_Draw_Border;
 Integer Get_plot_frame_draw_viewport  (Element elt,Integer &draw_viewport) L_Get_Plot_Frame_Draw_Viewport;
 Integer Get_plot_frame_draw_title_file(Element elt,Integer &draw_title)    L_Get_Plot_Frame_Draw_Title;
 Integer Get_plot_frame_colour         (Element elt,Integer &colour)        L_Get_Plot_Frame_Colour;
 Integer Get_plot_frame_textstyle      (Element elt,Text &textstyle)        L_Get_Plot_Frame_Textstyle;
 Integer Get_plot_frame_plotter        (Element elt,Integer &plotter)       L_Get_Plot_Frame_Plotter;
 Integer Get_plot_frame_plotter_name   (Element elt,Text &plotter_name)     L_Get_Plot_Frame_Plotter_Name;
 Integer Get_plot_frame_plot_file      (Element elt,Text &plot_file)        L_Get_Plot_Frame_Plot_File;
 Integer Get_plot_frame_title_1        (Element elt,Text &title_1)          L_Get_Plot_Frame_Title_1;
 Integer Get_plot_frame_title_2        (Element elt,Text &title_2)          L_Get_Plot_Frame_Title_2;
 Integer Get_plot_frame_title_file     (Element elt,Text &title_file)       L_Get_Plot_Frame_Title_File;

 Integer Set_plot_frame_name           (Element elt,Text name)              L_Set_Plot_Frame_Name;
 Integer Set_plot_frame_scale          (Element elt,Real scale)             L_Set_Plot_Frame_Scale;
 Integer Set_plot_frame_rotation       (Element elt,Real rotation)          L_Set_Plot_Frame_Rotation;
 Integer Set_plot_frame_origin         (Element elt,Real x,Real y)          L_Set_Plot_Frame_Origin;
 Integer Set_plot_frame_sheet_size     (Element elt,Real w,Real h)          L_Set_Plot_Frame_Sheet_Size;
 Integer Set_plot_frame_sheet_size     (Element elt,Text &s)                L_Set_Plot_Frame_Sheet_Code;
 Integer Set_plot_frame_margins        (Element elt,Real l,Real b,
                                                    Real r,Real t)          L_Set_Plot_Frame_Margins;
 Integer Set_plot_frame_text_size      (Element elt,Real text_size)         L_Set_Plot_Frame_Text_Size;
 Integer Set_plot_frame_draw_border    (Element elt,Integer draw_border)    L_Set_Plot_Frame_Draw_Border;
 Integer Set_plot_frame_draw_viewport  (Element elt,Integer draw_viewport)  L_Set_Plot_Frame_Draw_Viewport;
 Integer Set_plot_frame_draw_title_file(Element elt,Integer draw_title)     L_Set_Plot_Frame_Draw_Title;
 Integer Set_plot_frame_colour         (Element elt,Integer colour)         L_Set_Plot_Frame_Colour;
 Integer Set_plot_frame_textstyle      (Element elt,Text textstyle)         L_Set_Plot_Frame_Textstyle;
 Integer Set_plot_frame_plotter        (Element elt,Integer plotter)        L_Set_Plot_Frame_Plotter;
 Integer Set_plot_frame_plotter_name   (Element elt,Text plotter_name)      L_Set_Plot_Frame_Plotter_Name;
 Integer Set_plot_frame_plot_file      (Element elt,Text plot_file)         L_Set_Plot_Frame_Plot_File;
 Integer Set_plot_frame_title_1        (Element elt,Text title_1)           L_Set_Plot_Frame_Title_1;
 Integer Set_plot_frame_title_2        (Element elt,Text title_2)           L_Set_Plot_Frame_Title_2;
 Integer Set_plot_frame_title_file     (Element elt,Text title_file)        L_Set_Plot_Frame_Title_File;

// ----------------------------------------------------
// Feature strings
// ----------------------------------------------------

 Element Create_feature() L_Create_Feature;
 Element Create_feature(Element seed) L_Create_Feature_Seed;
 Element Create_feature(Text name,Integer colour,Real xc,Real yc,Real zc,Real radius) L_Create_Feature_Full;

 Integer Set_feature_centre(Element elt,Real  x,Real  y,Real  z) L_Set_Feature_Centre;
 Integer Get_feature_centre(Element elt,Real &x,Real &y,Real &z) L_Get_Feature_Centre;

 Integer Set_feature_radius(Element elt,Real  r) L_Set_Feature_Radius;
 Integer Get_feature_radius(Element elt,Real &r) L_Get_Feature_Radius;

// ----------------------------------------------------
// new functions as of 27 sep 1995
// ----------------------------------------------------

 Integer Plot_ppf_file   (Text name) L_Plot_PPF_File;

 Integer Convert         (Element elt,Text to,Element &newelt) L_Convert_String_To_String;

 Integer Get_data        (Element elt,Integer i,Real &x,Real &y,Real &z) L_Element_Get_Vertex;
 Integer Get_end_chainage(Element elt,Real &chainage) L_Element_Get_End_Chainage;

 Integer Extend_string   (Element elt,Real before,Real after,Element &newelt) L_Extend_String;

 Integer Change_of_angle (Real x1,Real y1,Real x2,Real y2,Real x3,Real y3,Real &angle) L_Change_Of_Angle;
 Integer Change_of_angle (Line l1,Line l2,Real &angle) L_Angle_Between_Lines;

 Integer Date            (Text &date) L_Get_Date_Text;
 Integer Date            (Integer &d,Integer &m,Integer &y) L_Get_Date_Parts;

 Integer Time            (Integer &time) L_Get_Integer_Time;
 Integer Time            (Real    &time) L_Get_Real_Time;
 Integer Time            (Text    &time) L_Get_Text_Time;
 Integer Time            (Integer &h,Integer &m,Real &sec)  L_Get_Time_Parts;

 Integer Convert_time    (Integer time,Text &time)             L_Convert_Time_To_Text;
 Integer Convert_time    (Integer time,Text format,Text &time) L_Convert_Time_To_Text_Format;
 Integer Convert_time    (Text &time,Integer time)             L_Convert_Text_To_Time;

 Integer Get_time_created(Element elt,Integer &time) L_Element_Get_Time_Created;
 Integer Get_time_updated(Element elt,Integer &time) L_Element_Get_Time_Updated;
 Integer Set_time_updated(Element elt,Integer time)  L_Element_Set_Time_Updated;

 Integer Get_all_linestyles(Dynamic_Text &linestyles) L_Get_All_Linestyles;
 Integer Get_all_textstyles(Dynamic_Text &textstyles) L_Get_All_Textstyles;
 Integer Get_all_symbols   (Dynamic_Text &linestyles) L_Get_All_Symbols;
 Integer Get_all_patterns  (Dynamic_Text &linestyles) L_Get_All_Patterns;

// super string

 Element Create_super(Integer flag,              Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts) L_Create_Super;     // create super string with positions and radii specified
 Element Create_super(Integer flag,Integer flag2,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts) L_Create_Super_Ex;  // create super string with positions and radii specified

 Element Create_super(Integer flag,              Integer npts) L_Create_Super_Npts;
 Element Create_super(Integer flag,Integer flag2,Integer npts) L_Create_Super_Ex_Npts;

 Element Create_super(Integer flag,              Segment seg)  L_Create_Super_from_Segment;
 Element Create_super(Integer flag,Integer flag2,Segment seg)  L_Create_Super_Ex_from_Segment;

// seed information from an existing string

 Element Create_super(Integer npts,Element seed) L_Create_Super_Seed_Npts;

// old calls for getting geometry information

 Integer Get_super_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                        Integer max_pts,Integer &num_pts) L_Get_Super_Data;                               // fill arrays of size max_pts with num_pts returned

 Integer Get_super_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                        Integer max_pts,Integer &num_pts,Integer offset) L_Get_Super_Data_Offset;         // fill arrays of size max_pts with num_pts returned
                                                                                                            // from offset
 Integer Get_super_data(Element element,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &f)
                        L_Get_Super_Point;                                                                // get the ith x, y and z and text of string

 Integer Set_super_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                        Integer num_pts) L_Set_Super_Data;                                                // fill the string with super data for num_pts

 Integer Set_super_data(Element element,Real x[],Real y[],Real z[],Real r[],Integer f[],
                        Integer num_pts,Integer offset) L_Set_Super_Data_Offset;                          // fill the string with super data for num_pts at offset

 Integer Set_super_data(Element element,Integer i,Real x,Real y,Real z,Real r,Integer f) L_Set_Super_Point;       // set the ith position in string

// adding removing points

 Integer Super_insert_vertex(Element super,Integer where,Integer count) L_Super_Insert_Vertex;
 Integer Super_remove_vertex(Element super,Integer where,Integer count) L_Super_Remove_Vertex;

// position on section based super string - like super elevation / widening off super alignment

 Integer Get_super_section_position(Element element,Real chainage,Real &level,Real &grade,Real &mvalue) L_Get_Super_Section_Position;

// dimensions

 Integer Set_super_use_2d_level               (Element element,Integer use)                          L_Set_Super_Use_2D_Level;
 Integer Get_super_use_2d_level               (Element element,Integer &use)                         L_Get_Super_Use_2D_Level;

 Integer Set_super_2d_level                   (Element element,Real level)                           L_Set_Super_2D_Level;
 Integer Get_super_2d_level                   (Element element,Real &level)                          L_Get_Super_2D_Level;

 Integer Set_super_use_diameter               (Element element,Integer use)                          L_Set_Super_Use_Pipe;
 Integer Set_super_use_pipe                   (Element element,Integer use)                          L_Set_Super_Use_Pipe; // alias

 Integer Get_super_use_diameter               (Element element,Integer &use)                         L_Get_Super_Use_Pipe;
 Integer Get_super_use_pipe                   (Element element,Integer &use)                         L_Get_Super_Use_Pipe; // alias

// set pipe sizes

 Integer Set_super_diameter                   (Element element,Real     diameter)                    L_Set_Super_Pipe;
 Integer Set_super_pipe                       (Element element,Real     diameter)                    L_Set_Super_Pipe;  // alias
 Integer Set_super_pipe                       (Element element,Real     diameter,
                                                               Real     thickness,
                                                               Integer  internal_diameter)           L_Set_Super_Pipe_Full;

// get pipe sizes

 Integer Get_super_diameter                   (Element element,Real    &diameter)                    L_Get_Super_Pipe;
 Integer Get_super_pipe                       (Element element,Real    &diameter)                    L_Get_Super_Pipe; // alias
 Integer Get_super_pipe                       (Element element,Real    &diameter,
                                                               Real     thickness,
                                                               Integer  internal_diameter)           L_Get_Super_Pipe_Full;


 Integer Set_super_use_culvert                (Element element,Integer  use)                         L_Set_Super_Use_Culvert;
 Integer Get_super_use_culvert                (Element element,Integer &use)                         L_Get_Super_Use_Culvert;

// set culvert sizes

 Integer Set_super_culvert                    (Element element,Real     width,
                                                               Real     height)                      L_Set_Super_Culvert;

 Integer Set_super_culvert                    (Element element,Real     width,
                                                               Real     height,
                                                               Real     left_thickness,
                                                               Real     right_thickness,
                                                               Real     top_thickness,
                                                               Real     bottom_thickness,
                                                               Integer  internal_width_height)       L_Set_Super_Culvert_Full;

// get culvert sizes

 Integer Get_super_culvert                    (Element element,Real    &width,
                                                               Real    &height)                      L_Get_Super_Culvert;

 Integer Get_super_culvert                    (Element element,Real    &width,
                                                               Real    &height,
                                                               Real    &left_thickness,
                                                               Real    &right_thickness,
                                                               Real    &top_thickness,
                                                               Real    &bottom_thickness,
                                                               Integer &internal_width_height)       L_Get_Super_Culvert_Full;

// these calls now set both dimensions for vertex & segment arrays

 Integer Set_super_use_visibility             (Element element,Integer use)                          L_Set_Super_Use_Visibility;
 Integer Get_super_use_visibility             (Element element,Integer &use)                         L_Get_Super_Use_Visibility;

 Integer Set_super_use_tinability             (Element element,Integer use)                          L_Set_Super_Use_Contourability;
 Integer Get_super_use_tinability             (Element element,Integer &use)                         L_Get_Super_Use_Contourability;

// arcs dimension

 Integer Set_super_use_segment_radius         (Element element,Integer use)                          L_Set_Super_Use_Segment_Radius;
 Integer Get_super_use_segment_radius         (Element element,Integer &use)                         L_Get_Super_Use_Segment_Radius;

 Integer Set_super_segment_radius             (Element element,Integer seg,Real radius)              L_Set_Super_Segment_Radius;
 Integer Get_super_segment_radius             (Element element,Integer seg,Real &radius)             L_Get_Super_Segment_Radius;
 Integer Set_super_segment_major              (Element element,Integer seg,Integer major)            L_Set_Super_Segment_Major;
 Integer Get_super_segment_major              (Element element,Integer seg,Integer &major)           L_Get_Super_Segment_Major;

// pipes & culverts dimension

 Integer Set_super_use_segment_diameter       (Element element,Integer use)                          L_Set_Super_Use_Segment_Pipe;
 Integer Set_super_use_segment_pipe           (Element element,Integer use)                          L_Set_Super_Use_Segment_Pipe; // alias

 Integer Get_super_use_segment_diameter       (Element element,Integer &use)                         L_Get_Super_Use_Segment_Pipe;
 Integer Get_super_use_segment_pipe           (Element element,Integer &use)                         L_Get_Super_Use_Segment_Pipe; // alias

 Integer Set_super_segment_diameter           (Element element,Integer seg,Real    diameter)         L_Set_Super_Segment_Pipe;
 Integer Set_super_segment_pipe               (Element element,Integer seg,Real    diameter)         L_Set_Super_Segment_Pipe; // alias
 Integer Set_super_segment_pipe               (Element element,Integer seg,Real    diameter,
                                                                           Real    thickness,
                                                                           Integer internal_diameter)L_Set_Super_Segment_Pipe_Full;


 Integer Get_super_segment_diameter           (Element element,Integer seg,Real &diameter)           L_Get_Super_Segment_Pipe;
 Integer Get_super_segment_pipe               (Element element,Integer seg,Real &diameter)           L_Get_Super_Segment_Pipe; // alias
 Integer Get_super_segment_pipe               (Element element,Integer seg,Real    &diameter,
                                                                           Real    &thickness,
                                                                           Integer &internal_diameter) L_Get_Super_Segment_Pipe_Full;

 Integer Set_super_use_segment_culvert        (Element element,Integer use)                          L_Set_Super_Use_Segment_Culvert;
 Integer Get_super_use_segment_culvert        (Element element,Integer &use)                         L_Get_Super_Use_Segment_Culvert;

 Integer Set_super_segment_culvert            (Element element,Integer seg,Real  width,
                                                                           Real  height)             L_Set_Super_Segment_Culvert;

 Integer Set_super_segment_culvert            (Element element,Integer seg,Real     width,
                                                                           Real     height,
                                                                           Real     left_thickness,
                                                                           Real     right_thickness,
                                                                           Real     top_thickness,
                                                                           Real     bottom_thickness,
                                                                           Integer  internal_width_height) L_Set_Super_Segment_Culvert_Full;

 Integer Get_super_segment_culvert            (Element element,Integer seg,Real    &width,
                                                                           Real    &height)                L_Get_Super_Segment_Culvert;

 Integer Get_super_segment_culvert            (Element element,Integer seg,Real    &width,
                                                                           Real    &height,
                                                                           Real    &left_thickness,
                                                                           Real    &right_thickness,
                                                                           Real    &top_thickness,
                                                                           Real    &bottom_thickness,
                                                                           Integer &internal_width_height) L_Get_Super_Segment_Culvert_Full;

// general geometry on super strings

 Integer Set_super_use_segment_geometry       (Element element,Integer use)                          L_Set_Super_Use_Segment_Geometry;
 Integer Get_super_use_segment_geometry       (Element element,Integer &use)                         L_Get_Super_Use_Segment_Geometry;

 Integer Set_super_segment_spiral             (Element element,Integer seg,Spiral  spiral)           L_Set_Super_Segment_Spiral;
 Integer Get_super_segment_spiral             (Element element,Integer seg,Spiral &spiral)           L_Get_Super_Segment_Spiral;

 Integer Set_super_segment_spiral             (Element element,Integer seg,Real l1,Real r1,Real a1,
                                                                   Real l2,Real r2,Real a2,
                                                                   Integer leading,
                                                                   Integer type)             L_Set_Super_Segment_Spiral_Data;

 Integer Get_super_segment_spiral             (Element element,Integer seg,Real &l1,Real &r1,Real &a1,
                                                                   Real &l2,Real &r2,Real &a2,
                                                                   Integer &leading,
                                                                   Integer &type)            L_Get_Super_Segment_Spiral_Data;

 Integer Set_super_segment_geometry           (Element element,Integer seg,Segment  geom)            L_Set_Super_Segment_Geometry;
 Integer Get_super_segment_geometry           (Element element,Integer seg,Segment &geom)            L_Get_Super_Segment_Geometry;

 Integer Set_super_segment_geometry           (Element element,Integer seg)                          L_Set_Super_Segment_Geometry_None;

// visible segments or not

 Integer Set_super_use_segment_visibility_value(Element element,Integer use)                          L_Set_Super_Use_Segment_Visible_Value;
 Integer Get_super_use_segment_visibility_value(Element element,Integer &use)                         L_Get_Super_Use_Segment_Visible_Value;

 Integer Set_super_use_segment_visibility_array(Element element,Integer use)                          L_Set_Super_Use_Segment_Visible_Array;
 Integer Get_super_use_segment_visibility_array(Element element,Integer &use)                         L_Get_Super_Use_Segment_Visible_Array;

 Integer Set_super_segment_visibility          (Element element,Integer seg,Integer visibility)       L_Set_Super_Segment_Visibility;
 Integer Get_super_segment_visibility          (Element element,Integer seg,Integer &visibility)      L_Get_Super_Segment_Visibility;

// tinable segments or not

 Integer Set_super_use_segment_tinability_value(Element element,Integer use)                          L_Set_Super_Use_Segment_Tinable_Value;
 Integer Get_super_use_segment_tinability_value(Element element,Integer &use)                         L_Get_Super_Use_Segment_Tinable_Value;

 Integer Set_super_use_segment_tinability_array(Element element,Integer use)                          L_Set_Super_Use_Segment_Tinable_Array;
 Integer Get_super_use_segment_tinability_array(Element element,Integer &use)                         L_Get_Super_Use_Segment_Tinable_Array;

 Integer Set_super_segment_tinability          (Element element,Integer seg,Integer  tinability)      L_Set_Super_Segment_Contourability;
 Integer Get_super_segment_tinability          (Element element,Integer seg,Integer &tinability)      L_Get_Super_Segment_Contourability;

// colour of segments

 Integer Set_super_use_segment_colour         (Element element,Integer use)                          L_Set_Super_Use_Segment_Colour;
 Integer Get_super_use_segment_colour         (Element element,Integer &use)                         L_Get_Super_Use_Segment_Colour;

 Integer Set_super_segment_colour             (Element element,Integer seg,Integer colour)           L_Set_Super_Segment_Colour;
 Integer Get_super_segment_colour             (Element element,Integer seg,Integer &colour)          L_Get_Super_Segment_Colour;

 Integer Set_super_use_segment_text_value     (Element element,Integer use)                          L_Set_Super_Use_Segment_Text_Value;
 Integer Get_super_use_segment_text_value     (Element element,Integer &use)                         L_Get_Super_Use_Segment_Text_Value;

 Integer Set_super_use_segment_text_array     (Element element,Integer use)                          L_Set_Super_Use_Segment_Text_Array;
 Integer Get_super_use_segment_text_array     (Element element,Integer &use)                         L_Get_Super_Use_Segment_Text_Array;

 Integer Set_super_segment_text               (Element element,Integer seg,Text text)                L_Set_Super_Segment_Text;
 Integer Get_super_segment_text               (Element element,Integer seg,Text &text)               L_Get_Super_Segment_Text;

 Integer Set_super_use_3d_level               (Element element,Integer use)                          L_Set_Super_Use_Vertex_3D_Level;
 Integer Get_super_use_3d_level               (Element element,Integer &use)                         L_Get_Super_Use_Vertex_3D_Level;

 Integer Set_super_vertex_coord               (Element element,Integer vert,Real x,Real y,Real z)    L_Set_Super_Vertex_Coord;
 Integer Get_super_vertex_coord               (Element element,Integer vert,Real &x,Real &y,Real &z) L_Get_Super_Vertex_Coord;

// visible verticii or not

 Integer Set_super_use_vertex_visibility_value(Element element,Integer use)                          L_Set_Super_Use_Vertex_Visible_Value;
 Integer Get_super_use_vertex_visibility_value(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Visible_Value;

 Integer Set_super_use_vertex_visibility_array(Element element,Integer use)                          L_Set_Super_Use_Vertex_Visible_Array;
 Integer Get_super_use_vertex_visibility_array(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Visible_Array;

 Integer Set_super_vertex_visibility          (Element element,Integer vert,Integer visibility)      L_Set_Super_Vertex_Visibility;
 Integer Get_super_vertex_visibility          (Element element,Integer vert,Integer &visibility)     L_Get_Super_Vertex_Visibility;

// tinable verticii or not

 Integer Set_super_use_vertex_tinability_value(Element element,Integer use)                          L_Set_Super_Use_Vertex_Tinable_Value;
 Integer Get_super_use_vertex_tinability_value(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Tinable_Value;

 Integer Set_super_use_vertex_tinability_array(Element element,Integer use)                          L_Set_Super_Use_Vertex_Tinable_Array;
 Integer Get_super_use_vertex_tinability_array(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Tinable_Array;

 Integer Set_super_vertex_tinability          (Element element,Integer vert,Integer tinability)      L_Set_Super_Vertex_Contourability;
 Integer Get_super_vertex_tinability          (Element element,Integer vert,Integer &tinability)     L_Get_Super_Vertex_Contourability;

 Integer Set_super_use_vertex_point_number    (Element element,Integer use)                          L_Set_Super_Use_Vertex_Point_Number;
 Integer Get_super_use_vertex_point_number    (Element element,Integer &use)                         L_Get_Super_Use_Vertex_Point_Number;

 Integer Set_super_vertex_point_number        (Element element,Integer vert,Integer  point_number)   L_Set_Super_Vertex_Point_Number;
 Integer Get_super_vertex_point_number        (Element element,Integer vert,Integer &point_number)   L_Get_Super_Vertex_Point_Number;

 Integer Set_super_vertex_point_number        (Element element,Integer vert,Text  point_number)      L_Set_Super_Vertex_Point_ID;
 Integer Get_super_vertex_point_number        (Element element,Integer vert,Text &point_number)      L_Get_Super_Vertex_Point_ID;

 Integer Set_super_use_vertex_text_value      (Element element,Integer use)                          L_Set_Super_Use_Vertex_Text_Value;
 Integer Get_super_use_vertex_text_value      (Element element,Integer &use)                         L_Get_Super_Use_Vertex_Text_Value;

 Integer Set_super_use_vertex_text_array      (Element element,Integer use)                          L_Set_Super_Use_Vertex_Text_Array;
 Integer Get_super_use_vertex_text_array      (Element element,Integer &use)                         L_Get_Super_Use_Vertex_Text_Array;

 Integer Set_super_vertex_text                (Element element,Integer vert,Text text)               L_Set_Super_Vertex_Text;
 Integer Get_super_vertex_text                (Element element,Integer vert,Text &text)              L_Get_Super_Vertex_Text;

// vertex text drawing

 Integer Set_super_vertex_device_text         (Element)                                      L_Set_Super_Vertex_Device_Text;
 Integer Set_super_vertex_world_text          (Element)                                      L_Set_Super_Vertex_World_Text;
 Integer Set_super_vertex_paper_text          (Element)                                      L_Set_Super_Vertex_Paper_Text;

 Integer Set_super_vertex_text_type           (Element element,Integer type)                         L_Set_Super_Vertex_Text_Type;
 Integer Get_super_vertex_text_type           (Element element,Integer &type)                        L_Get_Super_Vertex_Text_Type;

 Integer Set_super_use_vertex_annotation_value(Element element,Integer use)                          L_Set_Super_Use_Vertex_Annotation_Value;
 Integer Get_super_use_vertex_annotation_value(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Annotation_Value;

 Integer Set_super_use_vertex_annotation_array(Element element,Integer use)                          L_Set_Super_Use_Vertex_Annotation_Array;
 Integer Get_super_use_vertex_annotation_array(Element element,Integer &use)                         L_Get_Super_Use_Vertex_Annotation_Array;

 Integer Set_super_vertex_textstyle_data      (Element element,Integer vert,Textstyle_Data  d)       L_Set_Super_Vertex_Textstyle_Data;
 Integer Get_super_vertex_textstyle_data      (Element element,Integer vert,Textstyle_Data &d)       L_Get_Super_Vertex_Textstyle_Data;

 Integer Set_super_vertex_text_justify        (Element element,Integer vert,Integer j)               L_Set_Super_Vertex_Text_Justify;
 Integer Get_super_vertex_text_justify        (Element element,Integer vert,Integer &j)              L_Get_Super_Vertex_Text_Justify;

 Integer Set_super_vertex_text_offset_width   (Element element,Integer vert,Real o)                  L_Set_Super_Vertex_Text_Offset_Width;
 Integer Get_super_vertex_text_offset_width   (Element element,Integer vert,Real &o)                 L_Get_Super_Vertex_Text_Offset_Width;

 Integer Set_super_vertex_text_offset_height  (Element element,Integer vert,Real o)                  L_Set_Super_Vertex_Text_Offset_Height;
 Integer Get_super_vertex_text_offset_height  (Element element,Integer vert,Real &o)                 L_Get_Super_Vertex_Text_Offset_Height;

 Integer Set_super_vertex_text_colour         (Element element,Integer vert,Integer c)               L_Set_Super_Vertex_Text_Colour;
 Integer Get_super_vertex_text_colour         (Element element,Integer vert,Integer &c)              L_Get_Super_Vertex_Text_Colour;

 Integer Set_super_vertex_text_angle          (Element element,Integer vert,Real a)                  L_Set_Super_Vertex_Text_Angle;
 Integer Get_super_vertex_text_angle          (Element element,Integer vert,Real &a)                 L_Get_Super_Vertex_Text_Angle;

 Integer Set_super_vertex_text_size           (Element element,Integer vert,Real s)                  L_Set_Super_Vertex_Text_Size;
 Integer Get_super_vertex_text_size           (Element element,Integer vert,Real &s)                 L_Get_Super_Vertex_Text_Size;

 Integer Set_super_vertex_text_x_factor       (Element element,Integer vert,Real x)                  L_Set_Super_Vertex_Text_X_Factor;
 Integer Get_super_vertex_text_x_factor       (Element element,Integer vert,Real &x)                 L_Get_Super_Vertex_Text_X_Factor;

 Integer Set_super_vertex_text_slant          (Element element,Integer vert,Real s)                  L_Set_Super_Vertex_Text_Slant;
 Integer Get_super_vertex_text_slant          (Element element,Integer vert,Real &s)                 L_Get_Super_Vertex_Text_Slant;

 Integer Set_super_vertex_text_style          (Element element,Integer vert,Text s)                  L_Set_Super_Vertex_Text_Style;
 Integer Get_super_vertex_text_style          (Element element,Integer vert,Text &s)                 L_Get_Super_Vertex_Text_Style;

 Integer Set_super_vertex_text_whiteout       (Element element,Integer vert,Integer c)               L_Set_Super_Vertex_Text_Whiteout;
 Integer Get_super_vertex_text_whiteout       (Element element,Integer vert,Integer &c)              L_Get_Super_Vertex_Text_Whiteout;

 Integer Set_super_vertex_text_border         (Element element,Integer vert,Integer c)               L_Set_Super_Vertex_Text_Border;
 Integer Get_super_vertex_text_border         (Element element,Integer vert,Integer &c)              L_Get_Super_Vertex_Text_Border;

 Integer Set_super_vertex_text_ttf_underline  (Element element,Integer vert,Integer  underline)      L_Set_Super_Vertex_Text_TTF_Underline;
 Integer Get_super_vertex_text_ttf_underline  (Element element,Integer vert,Integer &underline)      L_Get_Super_Vertex_Text_TTF_Underline;

 Integer Set_super_vertex_text_ttf_strikeout  (Element element,Integer vert,Integer  strikeout)      L_Set_Super_Vertex_Text_TTF_Strikeout;
 Integer Get_super_vertex_text_ttf_strikeout  (Element element,Integer vert,Integer &strikeout)      L_Get_Super_Vertex_Text_TTF_Strikeout;

 Integer Set_super_vertex_text_ttf_italic     (Element element,Integer vert,Integer  italic)         L_Set_Super_Vertex_Text_TTF_Italic;
 Integer Get_super_vertex_text_ttf_italic     (Element element,Integer vert,Integer &italic)         L_Get_Super_Vertex_Text_TTF_Italic;

 Integer Set_super_vertex_text_ttf_outline    (Element element,Integer vert,Integer  outline)        L_Set_Super_Vertex_Text_TTF_Outline;
 Integer Get_super_vertex_text_ttf_outline    (Element element,Integer vert,Integer &outline)        L_Get_Super_Vertex_Text_TTF_Outline;

 Integer Set_super_vertex_text_ttf_weight     (Element element,Integer vert,Integer  weight)         L_Set_Super_Vertex_Text_TTF_Weight;
 Integer Get_super_vertex_text_ttf_weight     (Element element,Integer vert,Integer &weight)         L_Get_Super_Vertex_Text_TTF_Weight;

// segment text drawing

 Integer Set_super_segment_device_text         (Element)                                      L_Set_Super_Segment_Device_Text;
 Integer Set_super_segment_world_text          (Element)                                      L_Set_Super_Segment_World_Text;
 Integer Set_super_segment_paper_text          (Element)                                      L_Set_Super_Segment_Paper_Text;

 Integer Set_super_segment_text_type           (Element element,Integer type)                         L_Set_Super_Segment_Text_Type;
 Integer Get_super_segment_text_type           (Element element,Integer &type)                        L_Get_Super_Segment_Text_Type;

 Integer Set_super_use_segment_annotation_value(Element element,Integer use)                          L_Set_Super_Use_Segment_Annotation_Value;
 Integer Get_super_use_segment_annotation_value(Element element,Integer &use)                         L_Get_Super_Use_Segment_Annotation_Value;

 Integer Set_super_use_segment_annotation_array(Element element,Integer use)                          L_Set_Super_Use_Segment_Annotation_Array;
 Integer Get_super_use_segment_annotation_array(Element element,Integer &use)                         L_Get_Super_Use_Segment_Annotation_Array;

 Integer Set_super_segment_textstyle_data      (Element element,Integer seg,Textstyle_Data  d)        L_Set_Super_Segment_Textstyle_Data;
 Integer Get_super_segment_textstyle_data      (Element element,Integer seg,Textstyle_Data &d)        L_Get_Super_Segment_Textstyle_Data;

 Integer Set_super_segment_text_justify        (Element element,Integer seg,Integer j)                L_Set_Super_Segment_Text_Justify;
 Integer Get_super_segment_text_justify        (Element element,Integer seg,Integer &j)               L_Get_Super_Segment_Text_Justify;

 Integer Set_super_segment_text_offset_width   (Element element,Integer seg,Real o)                   L_Set_Super_Segment_Text_Offset_Width;
 Integer Get_super_segment_text_offset_width   (Element element,Integer seg,Real &o)                  L_Get_Super_Segment_Text_Offset_Width;

 Integer Set_super_segment_text_offset_height  (Element element,Integer seg,Real o)                   L_Set_Super_Segment_Text_Offset_Height;
 Integer Get_super_segment_text_offset_height  (Element element,Integer seg,Real &o)                  L_Get_Super_Segment_Text_Offset_Height;

 Integer Set_super_segment_text_colour         (Element element,Integer seg,Integer c)                L_Set_Super_Segment_Text_Colour;
 Integer Get_super_segment_text_colour         (Element element,Integer seg,Integer &c)               L_Get_Super_Segment_Text_Colour;

 Integer Set_super_segment_text_angle          (Element element,Integer seg,Real a)                   L_Set_Super_Segment_Text_Angle;
 Integer Get_super_segment_text_angle          (Element element,Integer seg,Real &a)                  L_Get_Super_Segment_Text_Angle;

 Integer Set_super_segment_text_size           (Element element,Integer seg,Real s)                   L_Set_Super_Segment_Text_Size;
 Integer Get_super_segment_text_size           (Element element,Integer seg,Real &s)                  L_Get_Super_Segment_Text_Size;

 Integer Set_super_segment_text_x_factor       (Element element,Integer seg,Real x)                   L_Set_Super_Segment_Text_X_Factor;
 Integer Get_super_segment_text_x_factor       (Element element,Integer seg,Real &x)                  L_Get_Super_Segment_Text_X_Factor;

 Integer Set_super_segment_text_slant          (Element element,Integer seg,Real s)                   L_Set_Super_Segment_Text_Slant;
 Integer Get_super_segment_text_slant          (Element element,Integer seg,Real &s)                  L_Get_Super_Segment_Text_Slant;

 Integer Set_super_segment_text_style          (Element element,Integer seg,Text s)                   L_Set_Super_Segment_Text_Style;
 Integer Get_super_segment_text_style          (Element element,Integer seg,Text &s)                  L_Get_Super_Segment_Text_Style;

 Integer Set_super_segment_text_whiteout       (Element element,Integer seg,Integer c)                L_Set_Super_Segment_Text_Whiteout;
 Integer Get_super_segment_text_whiteout       (Element element,Integer seg,Integer &c)               L_Get_Super_Segment_Text_Whiteout;

 Integer Set_super_segment_text_border         (Element element,Integer seg,Integer c)                L_Set_Super_Segment_Text_Border;
 Integer Get_super_segment_text_border         (Element element,Integer seg,Integer &c)               L_Get_Super_Segment_Text_Border;

 Integer Set_super_segment_text_ttf_underline  (Element element,Integer seg,Integer  underline)       L_Set_Super_Segment_Text_TTF_Underline;
 Integer Get_super_segment_text_ttf_underline  (Element element,Integer seg,Integer &underline)       L_Get_Super_Segment_Text_TTF_Underline;

 Integer Set_super_segment_text_ttf_strikeout  (Element element,Integer seg,Integer  strikeout)       L_Set_Super_Segment_Text_TTF_Strikeout;
 Integer Get_super_segment_text_ttf_strikeout  (Element element,Integer seg,Integer &strikeout)       L_Get_Super_Segment_Text_TTF_Strikeout;

 Integer Set_super_segment_text_ttf_italic     (Element element,Integer seg,Integer  italic)          L_Set_Super_Segment_Text_TTF_Italic;
 Integer Get_super_segment_text_ttf_italic     (Element element,Integer seg,Integer &italic)          L_Get_Super_Segment_Text_TTF_Italic;

 Integer Set_super_segment_text_ttf_outline    (Element element,Integer seg,Integer  outline)         L_Set_Super_Segment_Text_TTF_Outline;
 Integer Get_super_segment_text_ttf_outline    (Element element,Integer seg,Integer &outline)         L_Get_Super_Segment_Text_TTF_Outline;

 Integer Set_super_segment_text_ttf_weight     (Element element,Integer seg,Integer  weight)          L_Set_Super_Segment_Text_TTF_Weight;
 Integer Get_super_segment_text_ttf_weight     (Element element,Integer seg,Integer &weight)          L_Get_Super_Segment_Text_TTF_Weight;

// line styles

 Integer Set_super_use_segment_linestyle (Element element,Integer use) L_Set_Super_Use_Segment_Linestyle;
 Integer Get_super_use_segment_linestyle (Element element,Integer &use) L_Get_Super_Use_Segment_Linestyle;
 Integer Set_super_segment_linestyle (Element element,Integer seg,Text linestyle_name) L_Set_Super_Segment_Linestyle;
 Integer Get_super_segment_linestyle (Element element,Integer seg,Text &linestyle_name) L_Get_Super_Segment_Linestyle;

// vertex symbols

 Integer Set_super_use_symbol                 (Element element,Integer use)                          L_Set_Super_Use_Symbol;
 Integer Get_super_use_symbol                 (Element element,Integer &use)                         L_Get_Super_Use_Symbol;

 Integer Set_super_use_vertex_symbol          (Element element,Integer use)                          L_Set_Super_Use_Vertex_Symbol;
 Integer Get_super_use_vertex_symbol          (Element element,Integer &use)                         L_Get_Super_Use_Vertex_Symbol;

 Integer Set_super_vertex_symbol_rotation     (Element element,Integer vert,Real a)                  L_Set_Super_Vertex_Symbol_Rotation;
 Integer Get_super_vertex_symbol_rotation     (Element element,Integer vert,Real &a)                 L_Get_Super_Vertex_Symbol_Rotation;

 Integer Set_super_vertex_symbol_size         (Element element,Integer vert,Real s)                  L_Set_Super_Vertex_Symbol_Size;
 Integer Get_super_vertex_symbol_size         (Element element,Integer vert,Real &s)                 L_Get_Super_Vertex_Symbol_Size;

 Integer Set_super_vertex_symbol_offset_width (Element element,Integer vert,Real o)                  L_Set_Super_Vertex_Symbol_Offset_Width;
 Integer Get_super_vertex_symbol_offset_width (Element element,Integer vert,Real &o)                 L_Get_Super_Vertex_Symbol_Offset_Width;

 Integer Set_super_vertex_symbol_offset_height(Element element,Integer vert,Real r)                  L_Set_Super_Vertex_Symbol_Offset_Height;
 Integer Get_super_vertex_symbol_offset_height(Element element,Integer vert,Real &r)                 L_Get_Super_Vertex_Symbol_Offset_Height;

 Integer Set_super_vertex_symbol_colour       (Element element,Integer vert,Integer c)               L_Set_Super_Vertex_Symbol_Colour;
 Integer Get_super_vertex_symbol_colour       (Element element,Integer vert,Integer &c)              L_Get_Super_Vertex_Symbol_Colour;

 Integer Set_super_vertex_symbol_style        (Element element,Integer vert,Text s)                  L_Set_Super_Vertex_Symbol_Style;
 Integer Get_super_vertex_symbol_style        (Element element,Integer vert,Text &s)                 L_Get_Super_Vertex_Symbol_Style;

 Integer Set_super_use_vertex_attribute       (Element element,Integer use)                          L_Set_Super_Use_Vertex_Attribute;
 Integer Get_super_use_vertex_attribute       (Element element,Integer &use)                         L_Get_Super_Use_Vertex_Attribute;

 Integer Get_super_vertex_attributes          (Element elt,Integer vert,Attributes &att)                    L_Get_Super_Vertex_Attributes;
 Integer Set_super_vertex_attributes          (Element elt,Integer vert,Attributes  att)                    L_Set_Super_Vertex_Attributes;

 Integer Super_vertex_attribute_exists        (Element elt,Integer vert,Text att_name)                      L_Super_Vertex_Attribute_Exists;
 Integer Super_vertex_attribute_exists        (Element elt,Integer vert,Text name,Integer &no)              L_Super_Vertex_Attribute_Exists_No;
 Integer Super_vertex_attribute_delete        (Element elt,Integer vert,Text att_name)                      L_Super_Vertex_Attribute_Delete_Text;
 Integer Super_vertex_attribute_delete        (Element elt,Integer vert,Integer att_no)                     L_Super_Vertex_Attribute_Delete_No;
 Integer Super_vertex_attribute_delete_all    (Element elt,Integer vert)                                    L_Super_Vertex_Attribute_Delete_All;
 Integer Super_vertex_attribute_dump          (Element elt,Integer vert)                                    L_Super_Vertex_Attribute_Dump;
 Integer Super_vertex_attribute_debug         (Element elt,Integer vert)                                    L_Super_Vertex_Attribute_Debug;
 Integer Get_super_vertex_number_of_attributes(Element elt,Integer vert,Integer &no_atts)                   L_Get_Super_Vertex_Number_Of_Attributes;

 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Text &att)            L_Get_Super_Vertex_Attribute_Text_Text;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Integer &att)         L_Get_Super_Vertex_Attribute_Text_Integer;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Real &att)            L_Get_Super_Vertex_Attribute_Text_Real;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Uid &att)             L_Get_Super_Vertex_Attribute_Text_Uid;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Attributes &att)      L_Get_Super_Vertex_Attribute_Text_Attribute;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Attribute_Blob &att)  L_Get_Super_Vertex_Attribute_Text_Attribute_Blob;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Integer64 &att)       L_Get_Super_Vertex_Attribute_Text_Integer64;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Guid &att)            L_Get_Super_Vertex_Attribute_Text_Guid;
 
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Text &att)           L_Get_Super_Vertex_Attribute_No_Text;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Integer &att)        L_Get_Super_Vertex_Attribute_No_Integer;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Real &att)           L_Get_Super_Vertex_Attribute_No_Real;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Uid &att)            L_Get_Super_Vertex_Attribute_No_Uid;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Attributes &att)     L_Get_Super_Vertex_Attribute_No_Attribute;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Attribute_Blob &att) L_Get_Super_Vertex_Attribute_No_Attribute_Blob;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Integer64 &att)      L_Get_Super_Vertex_Attribute_No_Integer64;
 Integer Get_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Guid &att)           L_Get_Super_Vertex_Attribute_No_Guid;
 
 Integer Get_super_vertex_attribute_name      (Element elt,Integer vert,Integer att_no,Text &name)          L_Get_Super_Vertex_Attribute_Name;
 Integer Get_super_vertex_attribute_type      (Element elt,Integer vert,Text att_name,Integer &att_type)    L_Get_Super_Vertex_Attribute_Type_Text;
 Integer Get_super_vertex_attribute_type      (Element elt,Integer vert,Integer att_name,Integer &att_type) L_Get_Super_Vertex_Attribute_Type_No;
 Integer Get_super_vertex_attribute_length    (Element elt,Integer vert,Text att_name,Integer &att_len)     L_Get_Super_Vertex_Attribute_Length_Text;
 Integer Get_super_vertex_attribute_length    (Element elt,Integer vert,Integer att_no,Integer &att_len)    L_Get_Super_Vertex_Attribute_Length_No;

 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Text att)             L_Set_Super_Vertex_Attribute_Text_Text;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Integer att)          L_Set_Super_Vertex_Attribute_Text_Integer;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Real att)             L_Set_Super_Vertex_Attribute_Text_Real;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Uid att)              L_Set_Super_Vertex_Attribute_Text_Uid;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Attributes att)       L_Set_Super_Vertex_Attribute_Text_Attribute;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Attribute_Blob att)   L_Set_Super_Vertex_Attribute_Text_Attribute_Blob;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Integer64  att)       L_Set_Super_Vertex_Attribute_Text_Integer64;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Text att_name,Guid  att)            L_Set_Super_Vertex_Attribute_Text_Guid;
 
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Text att)            L_Set_Super_Vertex_Attribute_No_Text;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Integer att)         L_Set_Super_Vertex_Attribute_No_Integer;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Real att)            L_Set_Super_Vertex_Attribute_No_Real;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Uid att)             L_Set_Super_Vertex_Attribute_No_Uid;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Attributes att)      L_Set_Super_Vertex_Attribute_No_Attribute;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Attribute_Blob att)  L_Set_Super_Vertex_Attribute_No_Attribute_Blob;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Integer64  att)      L_Set_Super_Vertex_Attribute_No_Integer64;
 Integer Set_super_vertex_attribute           (Element elt,Integer vert,Integer att_no,Guid  att)           L_Set_Super_Vertex_Attribute_No_Guid;
 
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Text &att)            L_Get_Super_Vertex_Attribute_Text_Match_Text;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Integer &att)         L_Get_Super_Vertex_Attribute_Text_Match_Integer;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Real &att)            L_Get_Super_Vertex_Attribute_Text_Match_Real;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Uid &att)             L_Get_Super_Vertex_Attribute_Text_Match_Uid;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Attributes &att)      L_Get_Super_Vertex_Attribute_Text_Match_Attribute;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Attribute_Blob &att)  L_Get_Super_Vertex_Attribute_Text_Match_Attribute_Blob;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Integer64 &att)       L_Get_Super_Vertex_Attribute_Text_Match_Integer64;
 Integer Get_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Guid &att)            L_Get_Super_Vertex_Attribute_Text_Match_Guid;

 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Text att)             L_Set_Super_Vertex_Attribute_Text_Match_Text;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Integer att)          L_Set_Super_Vertex_Attribute_Text_Match_Integer;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Real att)             L_Set_Super_Vertex_Attribute_Text_Match_Real;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Uid att)              L_Set_Super_Vertex_Attribute_Text_Match_Uid;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Attributes att)       L_Set_Super_Vertex_Attribute_Text_Match_Attribute;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Attribute_Blob att)   L_Set_Super_Vertex_Attribute_Text_Match_Attribute_Blob;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Integer64  att)       L_Set_Super_Vertex_Attribute_Text_Match_Integer64;
 Integer Set_super_vertex_attribute_by_type   (Element elt,Integer vert,Text att_name,Guid  att)            L_Set_Super_Vertex_Attribute_Text_Match_Guid;
 
 Integer Set_super_use_segment_attribute       (Element element,Integer use)                          L_Set_Super_Use_Segment_Attribute;
 Integer Get_super_use_segment_attribute       (Element element,Integer &use)                         L_Get_Super_Use_Segment_Attribute;

 Integer Get_super_segment_attributes          (Element elt,Integer seg,Attributes &att)                    L_Get_Super_Segment_Attributes;
 Integer Set_super_segment_attributes          (Element elt,Integer seg,Attributes  att)                    L_Set_Super_Segment_Attributes;

 Integer Super_segment_attribute_exists        (Element elt,Integer seg,Text att_name)                      L_Super_Segment_Attribute_Exists;
 Integer Super_segment_attribute_exists        (Element elt,Integer seg,Text name,Integer &no)              L_Super_Segment_Attribute_Exists_No;
 Integer Super_segment_attribute_delete        (Element elt,Integer seg,Text att_name)                      L_Super_Segment_Attribute_Delete_Text;
 Integer Super_segment_attribute_delete        (Element elt,Integer seg,Integer att_no)                     L_Super_Segment_Attribute_Delete_No;
 Integer Super_segment_attribute_delete_all    (Element elt,Integer seg)                                    L_Super_Segment_Attribute_Delete_All;
 Integer Super_segment_attribute_dump          (Element elt,Integer seg)                                    L_Super_Segment_Attribute_Dump;
 Integer Super_segment_attribute_debug         (Element elt,Integer seg)                                    L_Super_Segment_Attribute_Debug;
 Integer Get_super_segment_number_of_attributes(Element elt,Integer seg,Integer &no_atts)                   L_Get_Super_Segment_Number_Of_Attributes;

 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Text &att)            L_Get_Super_Segment_Attribute_Text_Text;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Integer &att)         L_Get_Super_Segment_Attribute_Text_Integer;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Real &att)            L_Get_Super_Segment_Attribute_Text_Real;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Uid &att)             L_Get_Super_Segment_Attribute_Text_Uid;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Attributes &att)      L_Get_Super_Segment_Attribute_Text_Attribute;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Attribute_Blob &att)  L_Get_Super_Segment_Attribute_Text_Attribute_Blob;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Integer64 &att)       L_Get_Super_Segment_Attribute_Text_Integer64;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Text att_name,Guid &att)            L_Get_Super_Segment_Attribute_Text_Guid;
 
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Text &att)           L_Get_Super_Segment_Attribute_No_Text;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Integer &att)        L_Get_Super_Segment_Attribute_No_Integer;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Real &att)           L_Get_Super_Segment_Attribute_No_Real;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Uid &att)            L_Get_Super_Segment_Attribute_No_Uid;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Attributes &att)     L_Get_Super_Segment_Attribute_No_Attribute;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Attribute_Blob &att) L_Get_Super_Segment_Attribute_No_Attribute_Blob;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Integer64 &att)      L_Get_Super_Segment_Attribute_No_Integer64;
 Integer Get_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Guid &att)           L_Get_Super_Segment_Attribute_No_Guid;
 
 Integer Get_super_segment_attribute_name      (Element elt,Integer seg,Integer att_no,Text &name)          L_Get_Super_Segment_Attribute_Name;
 Integer Get_super_segment_attribute_type      (Element elt,Integer seg,Text att_name,Integer &att_type)    L_Get_Super_Segment_Attribute_Type_Text;
 Integer Get_super_segment_attribute_type      (Element elt,Integer seg,Integer att_name,Integer &att_type) L_Get_Super_Segment_Attribute_Type_No;
 Integer Get_super_segment_attribute_length    (Element elt,Integer seg,Text att_name,Integer &att_len)     L_Get_Super_Segment_Attribute_Length_Text;
 Integer Get_super_segment_attribute_length    (Element elt,Integer seg,Integer att_no,Integer &att_len)    L_Get_Super_Segment_Attribute_Length_No;

 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Text att)             L_Set_Super_Segment_Attribute_Text_Text;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Integer att)          L_Set_Super_Segment_Attribute_Text_Integer;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Real att)             L_Set_Super_Segment_Attribute_Text_Real;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Uid att)              L_Set_Super_Segment_Attribute_Text_Uid;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Attributes att)       L_Set_Super_Segment_Attribute_Text_Attribute;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Attribute_Blob att)   L_Set_Super_Segment_Attribute_Text_Attribute_Blob;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Integer64  att)       L_Set_Super_Segment_Attribute_Text_Integer64;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Text att_name,Guid  att)            L_Set_Super_Segment_Attribute_Text_Guid;
 
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Text att)            L_Set_Super_Segment_Attribute_No_Text;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Integer att)         L_Set_Super_Segment_Attribute_No_Integer;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Real att)            L_Set_Super_Segment_Attribute_No_Real;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Uid att)             L_Set_Super_Segment_Attribute_No_Uid;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Attributes att)      L_Set_Super_Segment_Attribute_No_Attribute;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Attribute_Blob att)  L_Set_Super_Segment_Attribute_No_Attribute_Blob;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Integer64  att)      L_Set_Super_Segment_Attribute_No_Integer64;
 Integer Set_super_segment_attribute           (Element elt,Integer seg,Integer att_no,Guid  att)           L_Set_Super_Segment_Attribute_No_Guid;

 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Text &att)            L_Get_Super_Segment_Attribute_Text_Match_Text;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Integer &att)         L_Get_Super_Segment_Attribute_Text_Match_Integer;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Real &att)            L_Get_Super_Segment_Attribute_Text_Match_Real;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Uid &att)             L_Get_Super_Segment_Attribute_Text_Match_Uid;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Attributes &att)      L_Get_Super_Segment_Attribute_Text_Match_Attribute;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Attribute_Blob &att)  L_Get_Super_Segment_Attribute_Text_Match_Attribute_Blob;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Integer64 &att)       L_Get_Super_Segment_Attribute_Text_Match_Integer64;
 Integer Get_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Guid &att)            L_Get_Super_Segment_Attribute_Text_Match_Guid;

 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Text att)             L_Set_Super_Segment_Attribute_Text_Match_Text;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Integer att)          L_Set_Super_Segment_Attribute_Text_Match_Integer;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Real att)             L_Set_Super_Segment_Attribute_Text_Match_Real;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Uid att)              L_Set_Super_Segment_Attribute_Text_Match_Uid;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Attributes att)       L_Set_Super_Segment_Attribute_Text_Match_Attribute;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Attribute_Blob att)   L_Set_Super_Segment_Attribute_Text_Match_Attribute_Blob;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Integer64  att)       L_Set_Super_Segment_Attribute_Text_Match_Integer64;
 Integer Set_super_segment_attribute_by_type   (Element elt,Integer seg,Text att_name,Guid  att)            L_Set_Super_Segment_Attribute_Text_Match_Guid;
 
// super string uid calls - not the same sort of uid's as element uid's

 Integer Set_super_use_vertex_uid (Element element,Integer  use)              L_Set_Super_Use_Vertex_UID;
 Integer Get_super_use_vertex_uid (Element element,Integer &use)              L_Get_Super_Use_Vertex_UID;

 Integer Set_super_vertex_uid     (Element element,Integer vert,Integer  uid) L_Set_Super_Vertex_UID;
 Integer Get_super_vertex_uid     (Element element,Integer vert,Integer &uid) L_Get_Super_Vertex_UID;

 Integer Set_super_use_segment_uid(Element element,Integer  use)              L_Set_Super_Use_Segment_UID;
 Integer Get_super_use_segment_uid(Element element,Integer &use)              L_Get_Super_Use_Segment_UID;

 Integer Set_super_segment_uid    (Element element,Integer seg ,Integer  uid) L_Set_Super_Segment_UID;
 Integer Get_super_segment_uid    (Element element,Integer seg ,Integer &uid) L_Get_Super_Segment_UID;

// pipe calls

 Integer Set_super_use_pipe_justify(Element element,Integer  use)     L_Set_Super_Use_Pipe_Justify;
 Integer Get_super_use_pipe_justify(Element element,Integer &use)     L_Get_Super_Use_Pipe_Justify;

 Integer Set_super_pipe_justify    (Element element,Integer  justify) L_Set_Super_Pipe_Justify;
 Integer Get_super_pipe_justify    (Element element,Integer &justify) L_Get_Super_Pipe_Justify;

// function for interior holes
// note the holes must be super strings , and cannot belong to a model
// if you extract a hole from a super string , and add it to a model
// all hell will break loose.
// do not add holes to a hole (it is not defined and may crash)
// remember , you are low level programming and calling the same functions as 4D staff.

 Integer Set_super_use_hole    (Element super,Integer  use)    L_Set_Super_Use_Hole;
 Integer Get_super_use_hole    (Element super,Integer &use)    L_Get_Super_Use_Hole;

 Integer Get_super_holes       (Element super,Integer &no_holes)             L_Super_Get_No_Holes;
 Integer Super_get_hole        (Element super,Integer hole_no,Element &hole) L_Super_Get_Hole;
 Integer Super_add_hole        (Element super,Element hole)                  L_Super_Add_Hole;
 Integer Super_delete_hole     (Element super,Element hole)                  L_Super_Delete_Hole;
 Integer Super_delete_hole     (Element super,Integer hole_no)               L_Super_Delete_Hole_No;
 Integer Super_delete_all_holes(Element super)                               L_Super_Delete_All_Holes;

// functions for extrudes

 Integer Set_super_use_extrude    (Element super,Integer  use) L_Set_Super_Use_Extrude;
 Integer Get_super_use_extrude    (Element super,Integer &use) L_Get_Super_Use_Extrude;

 Integer Get_super_extrudes       (Element super,Integer &no_extrudes) L_Super_Get_No_Extrudes;

//int    get_extrude        (long extrude,Extrude_Data *&extrude_data);
//int    set_extrude        (long extrude,Extrude_Data  *extrude_data);

// library extrudes

 Integer Super_insert_extrude     (Element super,Text name,Integer where) L_Super_Insert_Library_Extrude;
 Integer Super_append_extrude     (Element super,Text name)               L_Super_Append_Library_Extrude;

 Integer Super_delete_extrude     (Element super,Integer extrude) L_Super_Remove_Extrude;
 Integer Super_delete_all_extrudes(Element super)                 L_Super_Remove_Extrude_All_Extrudes;

// legacy call - super string now supports many extrudes on a string

 Integer Set_super_extrude        (Element super,Element  elt) L_Set_Super_Extrude_Element;
 Integer Get_super_extrude        (Element super,Element &elt) L_Get_Super_Extrude_Element;

// embedded extrusions on a string

 Integer Super_append_string_extrude(Element string,
                                     Element shape) L_Super_Append_String_Extrude;

 Integer Super_append_string_extrude(Element string,
                                     Element shape,
                                     Integer use_string_colour,
                                     Integer shape_mirror,
                                     Real    start_chainage,
                                     Real    final_chainage) L_Super_Append_String_Extrude_Full;

// functions for hatching
// only one way hatch supported for now, i.e  2nd parameters of hatch_angle & hatch_spacing ignored
// there are stored (for future use)

 Integer Set_super_use_hatch         (Element super,Integer  use)    L_Set_Super_Use_Hatch;
 Integer Get_super_use_hatch         (Element super,Integer &use)    L_Get_Super_Use_Hatch;

 Integer Set_super_hatch_colour      (Element super,Integer  a,Integer  b) L_Set_Super_Hatch_Colour;
 Integer Get_super_hatch_colour      (Element super,Integer &a,Integer &b) L_Get_Super_Hatch_Colour;

 Integer Set_super_hatch_angle       (Element super,Real  a,Real  b) L_Set_Super_Hatch_Angle;
 Integer Get_super_hatch_angle       (Element super,Real &a,Real &b) L_Get_Super_Hatch_Angle;

 Integer Set_super_hatch_view_angle  (Element super,Integer  is_relative)     L_Set_Super_Hatch_View_Angle;
 Integer Get_super_hatch_view_angle  (Element super,Integer &is_relative)     L_Get_Super_Hatch_View_Angle;  
 
 Integer Set_super_hatch_spacing     (Element super,Real  x,Real  y) L_Set_Super_Hatch_Spacing;
 Integer Get_super_hatch_spacing     (Element super,Real &y,Real &y) L_Get_Super_Hatch_Spacing;

 Integer Set_super_hatch_plot_spacing(Element super,Real  x,Real  y) L_Set_Super_Hatch_Plot_Spacing;
 Integer Get_super_hatch_plot_spacing(Element super,Real &y,Real &y) L_Get_Super_Hatch_Plot_Spacing;

 Integer Set_super_hatch_origin      (Element super,Real  x,Real  y) L_Set_Super_Hatch_Origin;
 Integer Get_super_hatch_origin      (Element super,Real &x,Real &y) L_Get_Super_Hatch_Origin;

 Integer Set_super_hatch_device      (Element super)                 L_Set_Super_Hatch_Device;
 Integer Set_super_hatch_world       (Element super)                 L_Set_Super_Hatch_World;
 Integer Set_super_hatch_type        (Element super,Integer  type)   L_Set_Super_Hatch_Type;
 Integer Get_super_hatch_type        (Element super,Integer &type)   L_Get_Super_Hatch_Type;

// functions for patterns

 Integer Set_super_use_pattern         (Element super,Integer  use)             L_Set_Super_Use_Pattern;
 Integer Get_super_use_pattern         (Element super,Integer &use)             L_Get_Super_Use_Pattern;

 Integer Set_super_pattern             (Element super,Text  n)                  L_Set_Super_Pattern;
 Integer Get_super_pattern             (Element super,Text &n)                  L_Get_Super_Pattern;

 Integer Set_super_pattern_colour      (Element super,Integer  a)               L_Set_Super_Pattern_Colour;
 Integer Get_super_pattern_colour      (Element super,Integer &a)               L_Get_Super_Pattern_Colour;

 Integer Set_super_pattern_angle       (Element super,Real  a)                  L_Set_Super_Pattern_Angle;
 Integer Get_super_pattern_angle       (Element super,Real &a)                  L_Get_Super_Pattern_Angle;

 Integer Set_super_pattern_size        (Element super,Real  s)                  L_Set_Super_Pattern_Size;
 Integer Get_super_pattern_size        (Element super,Real &s)                  L_Get_Super_Pattern_Size;

 Integer Set_super_pattern_plot_size   (Element super,Real  s)                  L_Set_Super_Pattern_Plot_Size;
 Integer Get_super_pattern_plot_size   (Element super,Real &s)                  L_Get_Super_Pattern_Plot_Size;

 Integer Set_super_pattern_origin      (Element super,Real  x,Real  y)          L_Set_Super_Pattern_Origin;
 Integer Get_super_pattern_origin      (Element super,Real &x,Real &y)          L_Get_Super_Pattern_Origin;

 Integer Set_super_pattern_type        (Element super,Integer  type)            L_Set_Super_Pattern_Type;
 Integer Get_super_pattern_type        (Element super,Integer &type)            L_Get_Super_Pattern_Type; 
 
 Integer Set_super_pattern_view_angle  (Element super,Integer  is_relative)     L_Set_Super_Pattern_View_Angle;
 Integer Get_super_pattern_view_angle  (Element super,Integer &is_relative)     L_Get_Super_Pattern_View_Angle;
 
 Integer Set_super_pattern_stagger     (Element super,Real   stagger)           L_Set_Super_Pattern_Stagger;
 Integer Get_super_pattern_stagger     (Element super,Real  &stagger)           L_Get_Super_Pattern_Stagger;
 
 Integer Set_super_pattern_space       (Element super,Real  xspace,Real  yspace)L_Set_Super_Pattern_Space;
 Integer Get_super_pattern_space       (Element super,Real &xspace,Real &yspace)L_Get_Super_Pattern_Space;

 Integer Set_super_pattern_solid_colour(Element super,Integer  c)               L_Set_Super_Pattern_Solid_Colour;
 Integer Get_super_pattern_solid_colour(Element super,Integer &c)               L_Get_Super_Pattern_Solid_Colour;

 Integer Set_super_pattern_blend       (Element super,Real  blend)              L_Set_Super_Pattern_Blend;
 Integer Get_super_pattern_blend       (Element super,Real &blend)              L_Get_Super_Pattern_Blend; 
 
// functions for solid filling

 Integer Set_super_use_solid     (Element super,Integer  use)    L_Set_Super_Use_Solid;
 Integer Get_super_use_solid     (Element super,Integer &use)    L_Get_Super_Use_Solid;

 Integer Set_super_solid_colour  (Element super,Integer  colour) L_Set_Super_Solid_Colour;
 Integer Get_super_solid_colour  (Element super,Integer &colour) L_Get_Super_Solid_Colour;

 Integer Set_super_solid_blend   (Element super,Real      blend) L_Set_Super_Solid_Blend;
 Integer Get_super_solid_blend   (Element super,Real     &blend) L_Get_Super_Solid_Blend;

// functions for bitmap filling

 Integer Set_super_use_bitmap        (Element super,Integer  use)    L_Set_Super_Use_Bitmap;
 Integer Get_super_use_bitmap        (Element super,Integer &use)    L_Get_Super_Use_Bitmap;

 Integer Set_super_bitmap            (Element super,Text  filename)  L_Set_Super_Bitmap_Filename;
 Integer Get_super_bitmap            (Element super,Text &filename)  L_Get_Super_Bitmap_Filename;

 Integer Set_super_bitmap_origin     (Element super,Real  x,Real  y) L_Set_Super_Bitmap_Origin;
 Integer Get_super_bitmap_origin     (Element super,Real &x,Real &y) L_Get_Super_Bitmap_Origin;

 Integer Set_super_bitmap_space      (Element super,Real  x,Real  y) L_Set_Super_Bitmap_Space;
 Integer Get_super_bitmap_space      (Element super,Real &x,Real &y) L_Get_Super_Bitmap_Space;

 Integer Set_super_bitmap_transparent(Element super,Integer  colour) L_Set_Super_Bitmap_Transparent;
 Integer Get_super_bitmap_transparent(Element super,Integer &colour) L_Get_Super_Bitmap_Transparent;

 Integer Set_super_bitmap_angle      (Element super,Real     angle)  L_Set_Super_Bitmap_Angle;
 Integer Get_super_bitmap_angle      (Element super,Real    &angle)  L_Get_Super_Bitmap_Angle;

 Integer Set_super_bitmap_view_angle (Element super,Integer  is_relative)     L_Set_Super_Bitmap_View_Angle;
 Integer Get_super_bitmap_view_angle (Element super,Integer &is_relative)     L_Get_Super_Bitmap_View_Angle; 
 
 Integer Set_super_bitmap_stagger    (Element super,Real   stagger)  L_Set_Super_Bitmap_Stagger;
 Integer Get_super_bitmap_stagger    (Element super,Real  &stagger)  L_Get_Super_Bitmap_Stagger;

 Integer Set_super_bitmap_device     (Element super)                 L_Set_Super_Bitmap_Device;
 Integer Set_super_bitmap_world      (Element super)                 L_Set_Super_Bitmap_World;
 Integer Set_super_bitmap_paper      (Element super)                 L_Set_Super_Bitmap_Paper;
 Integer Set_super_bitmap_type       (Element super,Integer  type)   L_Set_Super_Bitmap_Type;
 Integer Get_super_bitmap_type       (Element super,Integer &type)   L_Get_Super_Bitmap_Type;

 Integer Set_super_bitmap_size       (Element super,Real  w,Real  h) L_Set_Super_Bitmap_Size;
 Integer Get_super_bitmap_size       (Element super,Real &w,Real &h) L_Get_Super_Bitmap_Size;

// functions for acad filling

 Integer Set_super_use_acad_pattern    (Element super,Integer  use)    L_Set_Super_Use_Acad_Pattern;
 Integer Get_super_use_acad_pattern    (Element super,Integer &use)    L_Get_Super_Use_Acad_Pattern;

 Integer Set_super_acad_pattern        (Element super,Text  name)      L_Set_Super_Acad_Pattern;
 Integer Get_super_acad_pattern        (Element super,Text &name)      L_Get_Super_Acad_Pattern;

 Integer Set_super_acad_pattern_colour (Element super,Integer  colour) L_Set_Super_Acad_Pattern_Colour;
 Integer Get_super_acad_pattern_colour (Element super,Integer &colour) L_Get_Super_Acad_Pattern_Colour;

 Integer Set_super_acad_pattern_angle  (Element super,Real     angle)  L_Set_Super_Acad_Pattern_Angle;
 Integer Get_super_acad_pattern_angle  (Element super,Real    &angle)  L_Get_Super_Acad_Pattern_Angle;

 Integer Set_super_acad_pattern_view_angle (Element super,Integer  is_relative)     L_Set_Super_Acad_Pattern_View_Angle;
 Integer Get_super_acad_pattern_view_angle (Element super,Integer &is_relative)     L_Get_Super_Acad_Pattern_View_Angle;  
 
 Integer Set_super_acad_pattern_size   (Element super,Real  size)      L_Set_Super_Acad_Pattern_Size;
 Integer Get_super_acad_pattern_size   (Element super,Real &size)      L_Get_Super_Acad_Pattern_Size;

 Integer Set_super_acad_pattern_device (Element super)                 L_Set_Super_Acad_Pattern_Device;
 Integer Set_super_acad_pattern_world  (Element super)                 L_Set_Super_Acad_Pattern_World;
 Integer Set_super_acad_pattern_paper  (Element super)                 L_Set_Super_Acad_Pattern_Paper;
 Integer Set_super_acad_pattern_type   (Element super,Integer  type)   L_Set_Super_Acad_Pattern_Type;
 Integer Get_super_acad_pattern_type   (Element super,Integer &type)   L_Get_Super_Acad_Pattern_Type;

// interval

 Integer Set_super_use_interval      (Element super,Integer  use)    L_Set_Super_Use_Interval;
 Integer Get_super_use_interval      (Element super,Integer &use)    L_Get_Super_Use_Interval;

 Integer Set_super_interval_chord_arc(Element super,Real  value)     L_Set_Super_Interval_Chord_Arc;
 Integer Get_super_interval_chord_arc(Element super,Real &value)     L_Get_Super_Interval_Chord_Arc;

 Integer Set_super_interval_distance (Element super,Real  value)     L_Set_Super_Interval_Distance;
 Integer Get_super_interval_distance (Element super,Real &value)     L_Get_Super_Interval_Distance;

// other super string functions

 Integer Get_super_vertex_forward_direction (Element element,Integer vert,Real &dir) L_Get_Super_Vertex_Forward_Direction;
 Integer Get_super_vertex_backward_direction(Element element,Integer vert,Real &dir) L_Get_Super_Vertex_Backward_Direction;

// vertex images

 Integer Set_super_use_vertex_image_value(Element super,Integer  use) L_Set_Super_Use_Vertex_Image_Value;
 Integer Get_super_use_vertex_image_value(Element super,Integer &use) L_Get_Super_Use_Vertex_Image_Value;

 Integer Set_super_use_vertex_image_array(Element super,Integer  use) L_Set_Super_Use_Vertex_Image_Array;
 Integer Get_super_use_vertex_image_array(Element super,Integer &use) L_Get_Super_Use_Vertex_Image_Array;

// simple calls for adding images at a vertex of a super string

 Integer Super_vertex_add_URL       (Element super,
                                     Integer vertex,
                                     Text    url) L_Super_Vertex_Image_Add_URL;

 Integer Super_vertex_add_plan_image(Element super,
                                     Integer vertex,
                                     Text    url,
                                     Real    width,
                                     Real    height,
                                     Real    angle,
                                     Real    offset_x,
                                     Real    offset_y) L_Super_Vertex_Image_Add_Plan_Image;

 Integer Super_vertex_add_billboard (Element super,
                                     Integer vertex,
                                     Text    name,
                                     Real    angle,
                                     Integer colour,
                                     Real    offset_x,
                                     Real    offset_y,
                                     Real    offset_z) L_Super_Vertex_Image_Add_Billboard;

 Integer Super_vertex_add_billboard (Element super,
                                     Integer vertex,
                                     Text    name,
                                     Integer colour,
                                     Real    factor_x,
                                     Real    factor_y,
                                     Real    factor_z,
                                     Real    rotate_x,
                                     Real    rotate_y,
                                     Real    rotate_z,
                                     Real    offset_x,
                                     Real    offset_y,
                                     Real    offset_z) L_Super_Vertex_Image_Add_Billboard_Full;

 Integer Super_vertex_add_projector (Element super,
                                     Integer vertex,
                                     Text    name,
                                     Integer colour,
                                     Real    source_x,
                                     Real    source_y,
                                     Real    source_z,
                                     Real    source_normal_x,
                                     Real    source_normal_y,
                                     Real    source_normal_z,
                                     Real    target_x,
                                     Real    target_y,
                                     Real    target_z,
                                     Real    target_normal_x,
                                     Real    target_normal_y,
                                     Real    target_normal_z,
                                     Real    field_of_view,
                                     Text    surface) L_Super_Vertex_Image_Add_Projector;

 Integer Super_vertex_add_object    (Element super,
                                     Integer vertex,
                                     Text    name,
                                     Real    size_x,
                                     Real    size_y,
                                     Real    size_z,
                                     Real    angle,
                                     Real    offset_x,
                                     Real    offset_y,
                                     Real    offset_z) L_Super_Vertex_Image_Add_Object;

 Integer Super_vertex_add_object    (Element super,
                                     Integer vertex,
                                     Text    name,
                                     Real    size_x,
                                     Real    size_y,
                                     Real    size_z,
                                     Real    rotate_x,
                                     Real    rotate_y,
                                     Real    rotate_z,
                                     Real    offset_x,
                                     Real    offset_y,
                                     Real    offset_z) L_Super_Vertex_Image_Add_Object_Full;

// manage images

 Integer Super_vertex_image_delete        (Element elt,Integer vertex,Integer image_no) L_Super_Vertex_Image_Delete;
 Integer Super_vertex_image_delete_all    (Element elt,Integer vertex)                  L_Super_Vertex_Image_Delete_All;

 Integer Get_super_vertex_number_of_images(Element  elt,Integer vertex,Integer &no_images ) L_Get_Super_Vertex_Number_Of_Images;

 Integer Get_super_vertex_image_type      (Element  elt,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &image_type) L_Get_Super_Vertex_Image_Type;

 Integer Get_super_vertex_URL             (Element  elt,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &url) L_Get_Super_Vertex_Image_URL;

 Integer Get_Super_vertex_plan_image      (Element  super,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &url,
                                           Real    &width,
                                           Real    &height,
                                           Real    &angle,
                                           Real    &offset_x,
                                           Real    &offset_y) L_Get_Super_Vertex_Image_Plan_Image;

 Integer Get_super_vertex_billboard       (Element  super,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &name,
                                           Integer &colour,
                                           Real    &factor_x,
                                           Real    &factor_y,
                                           Real    &factor_z,
                                           Real    &rotate_x,
                                           Real    &rotate_y,
                                           Real    &rotate_z,
                                           Real    &offset_x,
                                           Real    &offset_y,
                                           Real    &offset_z) L_Get_Super_Vertex_Image_Billboard;

 Integer Get_super_vertex_billboard       (Element  super,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &name,
                                           Integer &twod,
                                           Integer &colour,
                                           Real    &factor_x,
                                           Real    &factor_y,
                                           Real    &factor_z,
                                           Real    &rotate_x,
                                           Real    &rotate_y,
                                           Real    &rotate_z,
                                           Real    &offset_x,
                                           Real    &offset_y,
                                           Real    &offset_z) L_Get_Super_Vertex_Image_Billboard_Ex;

 Integer Get_Super_vertex_projector       (Element  super,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &name,
                                           Integer &colour,
                                           Real    &source_x,
                                           Real    &source_y,
                                           Real    &source_z,
                                           Real    &source_normal_x,
                                           Real    &source_normal_y,
                                           Real    &source_normal_z,
                                           Real    &target_x,
                                           Real    &target_y,
                                           Real    &target_z,
                                           Real    &target_normal_x,
                                           Real    &target_normal_y,
                                           Real    &target_normal_z,
                                           Real    &field_of_view,
                                           Text    &surface) L_Get_Super_Vertex_Image_Projector;

 Integer Get_super_vertex_object          (Element  super,
                                           Integer  vertex,
                                           Integer  image_no,
                                           Text    &name,
                                           Real    &size_x,
                                           Real    &size_y,
                                           Real    &size_z,
                                           Real    &rotate_x,
                                           Real    &rotate_y,
                                           Real    &rotate_z,
                                           Real    &offset_x,
                                           Real    &offset_y,
                                           Real    &offset_z) L_Get_Super_Vertex_Image_Object;

 Integer Super_vertex_level_value_to_array    (Element elt) L_Super_Vertex_Level_Value_To_Array;
 Integer Super_vertex_symbol_value_to_array   (Element elt) L_Super_Vertex_Symbol_Value_To_Array;
 Integer Super_vertex_image_value_to_array    (Element elt) L_Super_Vertex_Image_Value_To_Array;

 Integer Super_vertex_text_value_to_array     (Element elt) L_Super_Vertex_Text_Value_To_Array;
 Integer Super_vertex_annotate_value_to_array (Element elt) L_Super_Vertex_Annotate_Value_To_Array;

 Integer Super_segment_text_value_to_array    (Element elt) L_Super_Segment_Text_Value_To_Array;
 Integer Super_segment_annotate_value_to_array(Element elt) L_Super_Segment_Annotate_Value_To_Array;

 Integer Super_offset                         (Element super,Real offset,Integer mode,
                                               Element &super_offset) L_Super_Offset;

// ----------------------------------------------------
// Grid elements
//
// notes
//
// Grid strings are also strings
// Grid tins    are also tins
//
//
// ----------------------------------------------------

 Element Create_grid_string() L_Create_Grid_String;

// grid tin must not exist - hence why you must supply a tin name

 Tin     Create_grid_tin(Text name) L_Create_Grid_Tin;

// certain grids cannot be edited.... Tuflow cannot change heights

 Integer Can_edit_grid_data(Element elt,Integer &result) L_Grid_Can_Edit_Data;

// common calls
//
// always set geometry first, then range
// the range call will allocate the memory
//
// note to ALG: make range 1 based?

 Integer Set_grid_geometry(Element elt,Real  origin_x,Real  origin_y,Real  spacing_x,Real  spacing_y,Real  angle) L_Grid_Set_Geometry;
 Integer Get_grid_geometry(Element elt,Real &origin_x,Real &origin_y,Real &spacing_x,Real &spacing_y,Real &angle) L_Grid_Get_Geometry;

 Integer Set_grid_range   (Element elt,Integer  xmin,Integer  ymin,Integer  xmax,Integer  ymax) L_Grid_Set_Range;
 Integer Get_grid_range   (Element elt,Integer &xmin,Integer &ymin,Integer &xmax,Integer &ymax) L_Grid_Get_Range;

// counts

 Integer Grid_get_x_points(Element elt,Integer &count) L_Grid_Get_X_Count;
 Integer Grid_get_x_count (Element elt,Integer &count) L_Grid_Get_X_Count; // alias

 Integer Grid_get_y_points(Element elt,Integer &count) L_Grid_Get_Y_Count;
 Integer Grid_get_y_count (Element elt,Integer &count) L_Grid_Get_Y_Count; // alias

 Integer Grid_get_x_cells (Element elt,Integer &count) L_Grid_Get_X_Range;
 Integer Grid_get_x_range (Element elt,Integer &count) L_Grid_Get_X_Range; // alias

 Integer Grid_get_y_cells (Element elt,Integer &count) L_Grid_Get_Y_Range;
 Integer Grid_get_y_range (Element elt,Integer &count) L_Grid_Get_Y_Range; // alias

// coordinate systems

 Integer Grid_world_to_grid(Element elt,Real    world_x,Real    world_y,Real    &grid_x ,Real    &grid_y ) L_Grid_World_To_Grid;
 Integer Grid_world_to_cell(Element elt,Real    world_x,Real    world_y,Real    &cell_x ,Real    &cell_y ) L_Grid_World_To_Cell;
 Integer Grid_world_to_cell(Element elt,Real    world_x,Real    world_y,Integer &cell_x ,Integer &cell_y ) L_Grid_World_To_Cell_Integer;

 Integer Grid_grid_to_world(Element elt,Real    grid_x ,Real    grid_y ,Real    &world_x,Real    &world_y) L_Grid_Grid_To_World;
 Integer Grid_grid_to_cell (Element elt,Real    grid_x ,Real    grid_y ,Real    &cell_x ,Real    &cell_y ) L_Grid_Grid_To_Cell;
 Integer Grid_grid_to_cell (Element elt,Real    grid_x ,Real    grid_y ,Integer &cell_x ,Integer &cell_y ) L_Grid_Grid_To_Cell_Integer;

 Integer Grid_cell_to_world(Element elt,Real    cell_x ,Real    cell_y ,Real    &world_x,Real    &world_y) L_Grid_Cell_To_World;
 Integer Grid_cell_to_world(Element elt,Integer cell_x ,Integer cell_y ,Real    &world_x,Real    &world_y) L_Grid_Cell_To_World_Integer;
 Integer Grid_cell_to_grid (Element elt,Real    cell_x ,Real    cell_y ,Real    &grid_x ,Real    &grid_y ) L_Grid_Cell_To_Grid;
 Integer Grid_cell_to_grid (Element elt,Integer cell_x ,Integer cell_y ,Real    &grid_x ,Real    &grid_y ) L_Grid_Cell_To_Grid_Integer;

// it is ugly to change the grid range but leaving the grid in the same physical location

 Integer Shift_grid_range(Element elt,Integer xshift,Integer yshift) L_Grid_Range_Shift;

// heights

 Integer Set_grid_heights (Element elt)            L_Grid_Set_Heights_From_Null;
 Integer Set_grid_heights (Element elt,Real value) L_Grid_Set_Heights_From_Value;

// updating all levels on a grid from a tin

 Integer Set_grid_heights (Element elt,Tin tin) L_Grid_Set_Heights_From_Tin;

// updating all levels on a grid from strings

 Integer Set_grid_heights (Element elt,Dynamic_Element list) L_Grid_Set_Heights_From_Strings;

// heights

 Integer Set_grid_height  (Element elt,Integer xc,Integer yc,Real  ht) L_Grid_Set_Height;
 Integer Get_grid_height  (Element elt,Integer xc,Integer yc,Real &ht) L_Grid_Get_Height;

// converting between grids and other elements

 Integer Convert_grid_string_to_grid_tin(Element elt,Text tin_name,Tin &tin) L_Convert_Grid_String_To_Grid_Tin;
 Integer Convert_grid_tin_to_grid_string(Element tin,Element &elt)           L_Convert_Grid_Tin_To_Grid_String;

 Integer Convert_grid_to_strings        (Element elt,Dynamic_Element &list)  L_Convert_Grid_To_Strings;
 Integer Convert_grid_to_tin            (Element elt,Text tin_name,Tin &tin) L_Convert_Grid_To_Tin;

// merging grids

 Integer Compute_merged_grid(Dynamic_Element list,
                             Real           &origin_x,
                             Real           &origin_y,
                             Real           &spacing_x,
                             Real           &spacing_y,
                             Real           &angle,
                             Integer        &xmin,
                             Integer        &ymin,
                             Integer        &xmax,
                             Integer        &ymax) L_Compute_Merged_Grid;

 Integer Merge_grids        (Dynamic_Element list,Element grid) L_Merge_Grids;

// ----------------------------------------------------
// Super Alignment calls
// ----------------------------------------------------

// super alignment

// an super alignment string is defined by
// (a) creating an alignment element
// (b) adding horizontal geometry
// (c) perform a calc_alignment if length is needed
// (d) adding vertical geometry
// (e) perform a calc_alignment


 Element Create_super_alignment() L_Create_Super_Alignment;
 Element Create_super_alignment(Element seed) L_Create_Super_Alignment_Seed;

 Integer Get_super_alignment_valid(Element alignment,Integer &valid) L_Super_Alignment_Get_Valid;


// horizontal calls

 Integer Get_super_alignment_valid_horizontal(Element alignment,Integer &valid) L_Super_Alignment_Get_Valid_Horizontal;
 Integer Super_alignment_horz_part_append  (Element element,Text part)                  L_Super_Alignment_Horz_Part_Append;     // appends horz part to the string
 Integer Super_alignment_horz_part_insert  (Element element,Integer position,Text part) L_Super_Alignment_Horz_Part_Insert;     // inserts x, y before Part position. if positon is 1
                                                                                                                        // greater than number of parts, appends
 Integer Super_alignment_horz_part_delete  (Element element,Integer position)           L_Super_Alignment_Horz_Part_Delete;     // deletes part at position

 Integer Get_super_alignment_horz_parts    (Element element,Integer &num_parts)         L_Super_Alignment_Horz_Get_Parts;       // get the number of HIPs in alignement string

 Integer Get_super_alignment_horz_part_id  (Element element,Integer position,Integer &id  ) L_Super_Alignment_Horz_Get_Part_ID;       // get id for HIP at position
 Integer Get_super_alignment_horz_part_type(Element element,Integer position,Text    &type) L_Super_Alignment_Horz_Get_Part_Type;     // get type for HIP at position

 Integer Get_super_alignment_horz_part     (Element element,Integer position,Text    &part) L_Super_Alignment_Horz_Get_Part;

 Integer Calc_super_alignment_horz         (Element) L_Super_Alignment_Horz_Calc;

// vertical calls

 Integer Get_super_alignment_valid_vertical(Element alignment,Integer &valid) L_Super_Alignment_Get_Valid_Vertical;
 Integer Super_alignment_vert_part_append  (Element element,Text part)                  L_Super_Alignment_Vert_Part_Append;     // appends vert part to the string
 Integer Super_alignment_vert_part_insert  (Element element,Integer position,Text part) L_Super_Alignment_Vert_Part_Insert;     // inserts x, y before Part position. if positon is 1
                                                                                                                        // greater than number of parts, appends
 Integer Super_alignment_vert_part_delete  (Element element,Integer position)           L_Super_Alignment_Vert_Part_Delete;     // deletes part at position

 Integer Get_super_alignment_vert_parts    (Element element,Integer &num_parts)         L_Super_Alignment_Vert_Get_Parts;       // get the number of HIPs in alignement string

 Integer Get_super_alignment_vert_part_id  (Element element,Integer position,Integer &id  ) L_Super_Alignment_Vert_Get_Part_ID;       // get id for HIP at position
 Integer Get_super_alignment_vert_part_type(Element element,Integer position,Text    &type) L_Super_Alignment_Vert_Get_Part_Type;     // get type for HIP at position

 Integer Get_super_alignment_vert_part     (Element element,Integer position,Text    &part) L_Super_Alignment_Vert_Get_Part;

 Integer Calc_super_alignment_vert         (Element) L_Super_Alignment_Vert_Calc;

// chainage calls

// spiral type

// sync calls

// equalities

 Integer Set_super_alignment_use_equalities    (Element element,Integer  use) L_Super_Alignment_Set_Use_Equalities;
 Integer Get_super_alignment_use_equalities    (Element element,Integer &use) L_Super_Alignment_Get_Use_Equalities;

 Integer Set_super_alignment_equalities_active (Element element,Integer  use) L_Super_Alignment_Set_Equalities_Active;
 Integer Get_super_alignment_equalities_active (Element element,Integer &use) L_Super_Alignment_Get_Equalities_Active;

 Integer Super_alignment_equality_part_append  (Element element,Text part)                  L_Super_Alignment_Equality_Part_Append;     // appends equality part to the string
 Integer Super_alignment_equality_part_insert  (Element element,Integer position,Text part) L_Super_Alignment_Equality_Part_Insert;     // inserts x, y before Part position. if positon is 1
                                                                                                                        // greater than number of parts, appends
 Integer Super_alignment_equality_part_delete  (Element element,Integer position)           L_Super_Alignment_Equality_Part_Delete;     // deletes part at position

 Integer Get_super_alignment_equality_parts    (Element element,Integer &num_parts)         L_Super_Alignment_Equality_Get_Parts;       // get the number of equalities in alignment string

 Integer Get_super_alignment_equality_part_id  (Element element,Integer position,Integer &id  ) L_Super_Alignment_Equality_Get_Part_ID;       // get id for equality at position
 Integer Get_super_alignment_equality_part_type(Element element,Integer position,Text    &type) L_Super_Alignment_Equality_Get_Part_Type;     // get type for equality at position

 Integer Get_super_alignment_equality_part     (Element element,Integer position,Text    &part) L_Super_Alignment_Equality_Get_Part;

 Integer Calc_super_alignment_equalities       (Element) L_Super_Alignment_Equalities_Calc;

 Integer Get_super_alignment_equality_chainage (Element element,Real raw_chainage,Text &equality_name,Integer &equality_zone,Real &equality_offset) L_Super_Alignment_Get_Equality_Chainage;
 Integer Get_super_alignment_raw_chainage      (Element element,Text equality_name,Integer equality_zone,Real equality_offset,Real &raw_chainage)   L_Super_Alignment_Get_Raw_Chainage;

 Integer Get_super_alignment_equality_info     (Element alignment,Real chainage,Equality_Info &equality_info) L_Super_Alignment_Get_Chainage_Equality_Info;

 Integer Get_super_alignment_number_of_equalities(Element element,Integer &count)   L_Super_Alignment_Get_Number_Of_Equalities;

 Integer Get_super_alignment_equality_chainage(Element align,Integer item,Real &chainage) L_Super_Alignment_Equality_Part_Get_Chainage;

 Integer Get_super_alignment_equality_data(Element align,Integer item,
                                           Real &raw_chainage,Integer &mode,
                                           Text &equality_name,Integer &equality_zone,Real &equality_offset,
                                           Text &pre_equality_name,Integer &pre_equality_zone,Real &equality_before) L_Super_Alignment_Get_Equality_Data;

 Integer Get_super_alignment_equality_info(Element alignment,Integer item,
                                           Equality_Info &equality_info) L_Super_Alignment_Equality_Part_Get_Info;

// equality info
// valid can be
//
// 0 for Invalid,
// 1 for Valid,
// 2 for Fake,

 Integer Get_equality_info_valid    (Equality_Info &info,Integer &valid ) L_Get_Equality_Info_Valid;
 Integer Get_equality_info_name     (Equality_Info &info,Text    &name  ) L_Get_Equality_Info_Name;
 Integer Get_equality_info_zone     (Equality_Info &info,Integer &zone  ) L_Get_Equality_Info_Zone;
 Integer Get_equality_info_offset   (Equality_Info &info,Real    &offset) L_Get_Equality_Info_Offset;

// equality info for "station equations" - ie when at an equality

 Integer Get_equality_info_prevalid (Equality_Info &info,Integer &valid ) L_Get_Equality_Info_PreValid;
 Integer Get_equality_info_prename  (Equality_Info &info,Text    &name  ) L_Get_Equality_Info_PreName;
 Integer Get_equality_info_prezone  (Equality_Info &info,Integer &zone  ) L_Get_Equality_Info_PreZone;
 Integer Get_equality_info_preoffset(Equality_Info &info,Real    &offset) L_Get_Equality_Info_PreOffset;

// equality label info
//
// current supported "properties" are
//
// Integer "decimals"              // Equality chainage decimal places (negative removes trailing zeros)
// Text    "separator_1000"        // Equality chainage 1000s separator (non K-post)
// Integer "zero_pack"             // Zero-pack digits after 1000s separator
// Integer "include_name"          // Show K-post at non-zero offset (if defined)
// Integer "include_offset_space"  // Space before offset of K-post
// Integer "include_offset_plus"   // Plus sign before positive offset of K-post
// Integer "include_zone"          // Show equality zone (if defined)
// Integer "include_zone_space"    // Space before equality zone
// Text    "eq_name_pre"           // K-post pre text
// Text    "eq_name_post"          // K-post post text
// Text    "eq_zone_pre"           // Equality zone pre text
// Text    "eq_zone_post"          // Equality zone post text
// Text    "separator_eq"          // Equality chainage before/after separator ('=' used if blank)


 Integer Set_equality_label_data(Equality_Label &label,Text name,Integer  value) L_Set_Equality_Label_Integer_Value;
 Integer Set_equality_label_data(Equality_Label &label,Text name,Text     value) L_Set_Equality_Label_Text_Value;

 Integer Get_equality_label_data(Equality_Label &label,Text name,Integer &value) L_Get_Equality_Label_Integer_Value;
 Integer Get_equality_label_data(Equality_Label &label,Text name,Text    &value) L_Get_Equality_Label_Text_Value;

// label equalities

 Integer Create_equality_label(Real raw_chainage,Equality_Info &equality_info,Equality_Label &equality_label,Text &text_label) L_Equality_Info_Create_Text;

// geometry modifiers

// alignment style

 Integer Get_super_alignment_style(Element alignment, Text &style) L_Super_Alignment_Get_Alignment_Style;
 Integer Set_super_alignment_style(Element alignment, Text style)  L_Super_Alignment_Set_Alignment_Style;

// design parameters

// additional geometry

// open/closed

// get 2d/3d type strings

// valid calls

// general super alignment calls

 Element Get_super_alignment_horizontal_string(Element alignment) L_Super_Alignment_Get_Horizontal_String;
 Element Get_super_alignment_vertical_string  (Element alignment) L_Super_Alignment_Get_Vertical_String;

 Integer Get_super_alignment_vertical_position(Element alignment,Real chainage,Real &level,Real &grade,Real &mvalue) L_Super_Alignment_Get_Vertical_Position;

 Element Get_super_alignment_widening_left_side        (Element alignment) L_Super_Alignment_Get_Widening_LHS;
 Element Get_super_alignment_widening_right_side       (Element alignment) L_Super_Alignment_Get_Widening_RHS;

 Element Get_super_alignment_super_elevation_left_side (Element alignment) L_Super_Alignment_Get_Super_Elevation_LHS;
 Element Get_super_alignment_super_elevation_right_side(Element alignment) L_Super_Alignment_Get_Super_Elevation_RHS;

 Element Get_super_alignment_sight_distance_forward    (Element alignment) L_Super_Alignment_Get_Forward_Sight_Distance;
 Element Get_super_alignment_sight_distance_reverse    (Element alignment) L_Super_Alignment_Get_Reverse_Sight_Distance;

 Integer Get_super_alignment_number_of_profiles        (Element alignment,Integer &count) L_Super_Alignment_Get_Profile_Count;

 Element Get_super_alignment_profile                   (Element alignment,Integer &index) L_Super_Alignment_Get_Profile;
 Element Get_super_alignment_profile                   (Element alignment,Text     name)  L_Super_Alignment_Get_Named_Profile;

 Integer Is_super_alignment_solved                     (Element alignment)                L_Super_Alignment_Is_Solved;

 Integer Get_super_alignment_named_parts               (Element alignment,Integer vert_hori,Dynamic_Text &names)                        L_Super_Alignment_Get_Named_Parts;
 Integer Get_super_alignment_named_positions           (Element alignment,                  Dynamic_Text &names)                        L_Super_Alignment_Get_Named_Positions;
 Integer Get_super_alignment_named_part_chainage       (Element alignment,Integer vert_hori,Text name,Real &ch)                         L_Super_Alignment_Get_Named_Part_Chainage;
 Integer Get_super_alignment_named_position_chainage   (Element alignment,                  Text name,Real &ch)                         L_Super_Alignment_Get_Named_Position_Chainage;
 Integer Get_super_alignment_named_part_segments       (Element alignment,Integer vert_hori,Text name,Dynamic_Integer &segment_indices) L_Super_Alignment_Get_Named_Part_Segments;
 Integer Get_super_alignment_named_part_segment        (Element alignment,Integer vert_hori,Text name,Segment &segment)                 L_Super_Alignment_Get_Named_Part_Segment;
 Integer Get_super_alignment_named_chainage            (Element alignment,Integer vert_hori,Real ch,Text &name,Real &extension)         L_Super_Alignment_Get_Named_Chainage;
 Integer Get_super_alignment_named_segment             (Element alignment,Integer vert_hori,Real ch,Text &name)                         L_Super_Alignment_Get_Named_Segment;

// ----------------------------------------------------
// Functions
// ----------------------------------------------------

 Integer  Get_all_functions(Dynamic_Text &functions) L_Get_All_Functions;
 Function Get_function     (Text function_name)      L_Get_Function;
 Function Get_function     (Integer function_id)     L_Get_Function_From_ID;
 Function Get_function     (Uid     function_id)     L_Get_Function_From_UID;

 Integer  Function_exists  (Text function_name)      L_Function_Exists;
 Integer  Function_exists  (Integer function_id)     L_Function_Exists_From_ID;
 Integer  Function_exists  (Uid     function_id)     L_Function_Exists_From_UID;
 Integer  Function_delete  (Text function_name)      L_Function_Delete;
 Integer  Function_recalc  (Function func)           L_Function_Recalc;

 Integer  Get_id           (Function func,Integer &id) L_Function_Get_ID;
 Integer  Get_id           (Function func,Uid     &id) L_Function_Get_UID;
 Integer  Get_name         (Function func,Text &name) L_Function_Get_Name;
 Integer  Get_type         (Function func,Integer &func_type) L_Function_Get_Type; 
  
 Integer  Get_time_created (Function elt,Integer &time) L_Function_Get_Time_Created;
 Integer  Get_time_updated (Function elt,Integer &time) L_Function_Get_Time_Updated;
 Integer  Set_time_updated (Function elt,Integer time)  L_Function_Set_Time_Updated;

 Integer Get_function_attributes          (Function fcn,Attributes &att)                    L_Get_Function_Attributes;
 Integer Set_function_attributes          (Function fcn,Attributes  att)                    L_Set_Function_Attributes;

 Integer Function_attribute_exists        (Function fcn,Text att_name)                      L_Function_Attribute_Exists;
 Integer Function_attribute_exists        (Function fcn,Text name,Integer &no)              L_Function_Attribute_Exists_No;
 Integer Function_attribute_delete        (Function fcn,Text att_name)                      L_Function_Attribute_Delete_Text;
 Integer Function_attribute_delete        (Function fcn,Integer att_no)                     L_Function_Attribute_Delete_No;
 Integer Function_attribute_delete_all    (Function fcn)                                    L_Function_Attribute_Delete_All;
 Integer Function_attribute_dump          (Function fcn)                                    L_Function_Attribute_Dump;
 Integer Function_attribute_debug         (Function fcn)                                    L_Function_Attribute_Debug;
 Integer Get_function_number_of_attributes(Function fcn,Integer &no_atts)                   L_Get_Function_Number_Of_Attributes;

 Integer Get_function_attribute           (Function fcn,Text att_name,Text &att)            L_Get_Function_Attribute_Text_Text;
 Integer Get_function_attribute           (Function fcn,Text att_name,Integer &att)         L_Get_Function_Attribute_Text_Integer;
 Integer Get_function_attribute           (Function fcn,Text att_name,Real &att)            L_Get_Function_Attribute_Text_Real;
 Integer Get_function_attribute           (Function fcn,Text att_name,Uid &att)             L_Get_Function_Attribute_Text_Uid;
 Integer Get_function_attribute           (Function fcn,Text att_name,Attributes &att)      L_Get_Function_Attribute_Text_Attribute;
 Integer Get_function_attribute           (Function fcn,Text att_name,Attribute_Blob &att)  L_Get_Function_Attribute_Text_Attribute_Blob;
 Integer Get_function_attribute           (Function fcn,Text att_name,Integer64 &att)       L_Get_Function_Attribute_Text_Integer64;
 Integer Get_function_attribute           (Function fcn,Text att_name,Guid &att)            L_Get_Function_Attribute_Text_Guid;

 Integer Get_function_attribute           (Function fcn,Integer att_no,Text &att)           L_Get_Function_Attribute_No_Text;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Integer &att)        L_Get_Function_Attribute_No_Integer;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Real &att)           L_Get_Function_Attribute_No_Real;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Uid &att)            L_Get_Function_Attribute_No_Uid;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Attributes &att)     L_Get_Function_Attribute_No_Attribute;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Attribute_Blob &att) L_Get_Function_Attribute_No_Attribute_Blob;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Integer64 &att)      L_Get_Function_Attribute_No_Integer64;
 Integer Get_function_attribute           (Function fcn,Integer att_no,Guid &att)           L_Get_Function_Attribute_No_Guid;

 Integer Get_function_attribute_name      (Function fcn,Integer att_no,Text &name)          L_Get_Function_Attribute_Name;
 Integer Get_function_attribute_type      (Function fcn,Text att_name,Integer &att_type)    L_Get_Function_Attribute_Type_Text;
 Integer Get_function_attribute_type      (Function fcn,Integer att_name,Integer &att_type) L_Get_Function_Attribute_Type_No;
 Integer Get_function_attribute_length    (Function fcn,Text att_name,Integer &att_len)     L_Get_Function_Attribute_Length_Text;
 Integer Get_function_attribute_length    (Function fcn,Integer att_no,Integer &att_len)    L_Get_Function_Attribute_Length_No;

 Integer Set_function_attribute           (Function fcn,Text att_name,Text att)             L_Set_Function_Attribute_Text_Text;
 Integer Set_function_attribute           (Function fcn,Text att_name,Integer att)          L_Set_Function_Attribute_Text_Integer;
 Integer Set_function_attribute           (Function fcn,Text att_name,Real att)             L_Set_Function_Attribute_Text_Real;
 Integer Set_function_attribute           (Function fcn,Text att_name,Uid att)              L_Set_Function_Attribute_Text_Uid;
 Integer Set_function_attribute           (Function fcn,Text att_name,Attributes att)       L_Set_Function_Attribute_Text_Attribute;
 Integer Set_function_attribute           (Function fcn,Text att_name,Attribute_Blob att)   L_Set_Function_Attribute_Text_Attribute_Blob;
 Integer Set_function_attribute           (Function fcn,Text att_name,Integer64 att)        L_Set_Function_Attribute_Text_Integer64;
 Integer Set_function_attribute           (Function fcn,Text att_name,Guid att)             L_Set_Function_Attribute_Text_Guid;

 Integer Set_function_attribute           (Function fcn,Integer att_no,Text att)            L_Set_Function_Attribute_No_Text;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Integer att)         L_Set_Function_Attribute_No_Integer;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Real att)            L_Set_Function_Attribute_No_Real;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Uid att)             L_Set_Function_Attribute_No_Uid;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Attributes att)      L_Set_Function_Attribute_No_Attribute;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Attribute_Blob att)  L_Set_Function_Attribute_No_Attribute_Blob;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Integer64 att)       L_Set_Function_Attribute_No_Integer64;
 Integer Set_function_attribute           (Function fcn,Integer att_no,Guid att)            L_Set_Function_Attribute_No_Guid;

 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Text &att)            L_Get_Function_Attribute_Text_Match_Text;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Integer &att)         L_Get_Function_Attribute_Text_Match_Integer;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Real &att)            L_Get_Function_Attribute_Text_Match_Real;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Uid &att)             L_Get_Function_Attribute_Text_Match_Uid;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Attributes &att)      L_Get_Function_Attribute_Text_Match_Attribute;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Attribute_Blob &att)  L_Get_Function_Attribute_Text_Match_Attribute_Blob;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Integer64 &att)       L_Get_Function_Attribute_Text_Match_Integer64;
 Integer Get_function_attribute_by_type   (Function fcn,Text att_name,Guid &att)            L_Get_Function_Attribute_Text_Match_Guid;
 
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Text att)             L_Set_Function_Attribute_Text_Match_Text;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Integer att)          L_Set_Function_Attribute_Text_Match_Integer;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Real att)             L_Set_Function_Attribute_Text_Match_Real;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Uid att)              L_Set_Function_Attribute_Text_Match_Uid;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Attributes att)       L_Set_Function_Attribute_Text_Match_Attribute;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Attribute_Blob att)   L_Set_Function_Attribute_Text_Match_Attribute_Blob;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Integer64 att)        L_Set_Function_Attribute_Text_Match_Integer64;
 Integer Set_function_attribute_by_type   (Function fcn,Text att_name,Guid att)             L_Set_Function_Attribute_Text_Match_Guid; 
 
 
 Integer Create_apply_function     (Text    function_name,
                                    Text    left_template,
                                    Text    right_template,
                                    Text    report_file_name,
                                    Tin     tin,
                                    Element reference_string,
                                    Element hinge_string,
                                    Real    separation,
                                    Real    start_chainage,
                                    Real    end_chainage,
                                    Integer create_arcs,
                                    Integer copy_hinge,
                                    Integer partial_interfaces,
                                    Integer sections_as_4d,
                                    Integer use_stripping,
                                    Real    chord_arc_tol,
                                    Text    left_prefix,
                                    Text    right_prefix,
                                    Model   strings_model,
                                    Model   sections_model,Integer sections_colour,
                                    Model   polygons_model,
                                    Model   diffs_model,Integer diffs_colour,
                                    Apply_Function &func) L_Create_Apply_Function;

 Integer Create_apply_many_function(Text    function_name,
                                    Text    mtf_file_name,
                                    Text    report_file_name,
                                    Tin     tin,
                                    Element reference_string,
                                    Element hinge_string,
                                    Real    separation,
                                    Real    start_chainage,
                                    Real    end_chainage,
                                    Integer create_arcs,
                                    Integer copy_hinge,
                                    Integer partial_interfaces,
                                    Integer sections_as_4d,
                                    Integer use_stripping,
                                    Real    chord_arc_tol,
                                    Text    left_prefix,
                                    Text    right_prefix,
                                    Model   strings_model,
                                    Model   sections_model,Integer sections_colour,
                                    Model   polygons_model,
                                    Model   diffs_model,Integer diffs_colour,
                                    Model   boxing_strings_model,
                                    Model   boxing_sections_model,
                                    Apply_Many_Function &func) L_Create_Apply_Many_Function;

 Integer Create_kerb_return_function(Text    function_name,
                                     Element centre_line_1,
                                     Element centre_line_2,
                                     Element kerb_line_1,
                                     Element kerb_line_2,
                                     Element kerb_return,
                                     Integer reset_vg,
                                     Kerb_Return_Function &func) L_Create_Kerb_Return_Function;

 Integer Create_macro_function(Text function_name,
                               Macro_Function &func) L_Create_Macro_Function;

 Integer Get_macro_function   (Text function_name,
                               Macro_Function &func) L_Get_Macro_Function;

// ----------------------------------------------------
// survey data functions
// ----------------------------------------------------

 Integer Get_SDR_gis_string(Function function,Element &string)                                  L_SDR_Function_Get_GIS_String;
 Integer Set_SDR_gis_string(Function function,Element  string)                                  L_SDR_Function_Set_GIS_String;

 Integer Get_SDR_attributes(Function function,Integer vertex,Integer &count)                    L_SDR_Function_Get_Attribute_Count;

 Integer Get_SDR_attribute (Function function,Integer vertex,Integer index,SDR_Attribute &attr) L_SDR_Function_Get_Attribute;
 Integer Get_SDR_attribute (Function function,Integer vertex,SDR_Attribute &attr)               L_SDR_Function_Get_Attribute_0;

 Integer SDR_add_element   (Function function,Element element)                                  L_SDR_Function_Add_Element;

 Integer Get_sdr_strings   (Function function,Text code,Text strno,Dynamic_Element &list)       L_SDR_Function_Get_SDR_Strings_Full;
 Integer Get_sdr_strings   (Function function,Text code,Dynamic_Element &list)                  L_SDR_Function_Get_SDR_Strings;

 Integer Find_sdr_string   (Function function,Point point,Text code,Text strno,Element &string) L_SDR_Function_Find_SDR_String_Full;
 Integer Find_sdr_string   (Function function,Point point,Text code,Element &string)            L_SDR_Function_Find_SDR_String;

// get basic information of the attribute

 Integer Get_name           (SDR_Attribute attr,Text    &name) L_SDR_Attribute_Get_Name;
 Integer Get_level          (SDR_Attribute attr,Integer &data) L_SDR_Attribute_Get_Level;
 Integer Get_type           (SDR_Attribute attr,Text    &type) L_SDR_Attribute_Get_Type;
 Integer Get_field_type     (SDR_Attribute attr,Text    &type) L_SDR_Attribute_Get_Field_Type;

// calls for integer,real,text

 Integer Get_integer_data   (SDR_Attribute attr,Integer &data) L_SDR_Attribute_Get_Integer;
 Integer Get_real_data      (SDR_Attribute attr,Real    &data) L_SDR_Attribute_Get_Real;
 Integer Get_text_data      (SDR_Attribute attr,Text    &data) L_SDR_Attribute_Get_Text;

// calls for measurement

 Integer Get_source_data    (SDR_Attribute attr,Real &ix,Real &iy,Real &iz,Real &ih) L_SDR_Attribute_Get_Measure_Source;
 Integer Get_measure_data   (SDR_Attribute attr,Real &ha,Real &va,Real &sd,Real &th) L_SDR_Attribute_Get_Measure_Target;
 Integer Get_reduced_data   (SDR_Attribute attr,Real &tx,Real &ty,Real &tz)          L_SDR_Attribute_Get_Measure_Reduced;

// when SDR_Attribute is a group , you use the list calls

 Integer Get_number_of_items(SDR_Attribute attr,Integer &number)                       L_SDR_Attribute_Get_Number_Of_Items;
 Integer Get_item           (SDR_Attribute attr,Integer index,SDR_Attribute &sub_attr) L_SDR_Attribute_Get_Item;

// ----------------------------------------------------
// dependancy functions
// ----------------------------------------------------

 Integer Add_dependancy_file       (Macro_Function func,Text name,Text    file)     L_Macro_Function_Add_Dependancy_File;
 Integer Add_dependancy_model      (Macro_Function func,Text name,Model   model)    L_Macro_Function_Add_Dependancy_Model;
 Integer Add_dependancy_tin        (Macro_Function func,Text name,Tin     tin)      L_Macro_Function_Add_Dependancy_Tin;
 Integer Add_dependancy_template   (Macro_Function func,Text name,Text    templte)  L_Macro_Function_Add_Dependancy_Template;
 Integer Add_dependancy_element    (Macro_Function func,Text name,Element element)  L_Macro_Function_Add_Dependancy_Element;

 Integer Delete_dependancy         (Macro_Function func,Text name)                  L_Macro_Function_Delete_Dependancy;
 Integer Delete_all_dependancies   (Macro_Function func)                            L_Macro_Function_Delete_All_Dependancies;

 Integer Get_number_of_dependancies(Macro_Function func,Integer &count)             L_Macro_Function_Get_No_Dependancies;

 Integer Get_dependancy_name       (Macro_Function func,Integer i,Text    &name)    L_Macro_Function_Get_Dependancy_Name;
 Integer Get_dependancy_type       (Macro_Function func,Integer i,Text    &type)    L_Macro_Function_Get_Dependancy_Type;
 Integer Get_dependancy_file       (Macro_Function func,Integer i,Text    &file)    L_Macro_Function_Get_Dependancy_File;
 Integer Get_dependancy_model      (Macro_Function func,Integer i,Model   &model)   L_Macro_Function_Get_Dependancy_Model;
 Integer Get_dependancy_tin        (Macro_Function func,Integer i,Tin     &tin)     L_Macro_Function_Get_Dependancy_Tin;
 Integer Get_dependancy_template   (Macro_Function func,Integer i,Text    &templte) L_Macro_Function_Get_Dependancy_Template;
 Integer Get_dependancy_element    (Macro_Function func,Integer i,Element &element) L_Macro_Function_Get_Dependancy_Element;
 Integer Get_dependancy_data       (Macro_Function func,Integer i,Text    &text)    L_Macro_Function_Get_Dependancy_Data;

 Integer Get_dependancy_type       (Macro_Function func,Text name,Text    &type)    L_Macro_Function_Get_Dependancy_Name_Type;
 Integer Get_dependancy_file       (Macro_Function func,Text name,Text    &file)    L_Macro_Function_Get_Dependancy_Name_File;
 Integer Get_dependancy_model      (Macro_Function func,Text name,Model   &model)   L_Macro_Function_Get_Dependancy_Name_Model;
 Integer Get_dependancy_tin        (Macro_Function func,Text name,Tin     &tin)     L_Macro_Function_Get_Dependancy_Name_Tin;
 Integer Get_dependancy_template   (Macro_Function func,Text name,Text    &templte) L_Macro_Function_Get_Dependancy_Name_Template;
 Integer Get_dependancy_element    (Macro_Function func,Text name,Element &element) L_Macro_Function_Get_Dependancy_Name_Element;
 Integer Get_dependancy_data       (Macro_Function func,Text name,Text    &text)    L_Macro_Function_Get_Dependancy_Name_Data;

// HACK HACK - to get over a problem in the compiler on promotions

 Integer Get_function_attributes          (Macro_Function fcn,Attributes &att)                    L_Get_Function_Attributes;
 Integer Set_function_attributes          (Macro_Function fcn,Attributes  att)                    L_Set_Function_Attributes;

 Integer Function_attribute_exists        (Macro_Function fcn,Text att_name)                      L_Function_Attribute_Exists;
 Integer Function_attribute_exists        (Macro_Function fcn,Text name,Integer &no)              L_Function_Attribute_Exists_No;
 Integer Function_attribute_delete        (Macro_Function fcn,Text att_name)                      L_Function_Attribute_Delete_Text;
 Integer Function_attribute_delete        (Macro_Function fcn,Integer att_no)                     L_Function_Attribute_Delete_No;
 Integer Function_attribute_delete_all    (Macro_Function fcn)                                    L_Function_Attribute_Delete_All;
 Integer Function_attribute_dump          (Macro_Function fcn)                                    L_Function_Attribute_Dump;
 Integer Function_attribute_debug         (Macro_Function fcn)                                    L_Function_Attribute_Debug;
 Integer Get_function_number_of_attributes(Macro_Function fcn,Integer &no_atts)                   L_Get_Function_Number_Of_Attributes;

 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Text &att)            L_Get_Function_Attribute_Text_Text;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Integer &att)         L_Get_Function_Attribute_Text_Integer;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Real &att)            L_Get_Function_Attribute_Text_Real;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Uid &att)             L_Get_Function_Attribute_Text_Uid;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Attributes &att)      L_Get_Function_Attribute_Text_Attribute;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Attribute_Blob &att)  L_Get_Function_Attribute_Text_Attribute_Blob;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Integer64 &att)       L_Get_Function_Attribute_Text_Integer64;
 Integer Get_function_attribute           (Macro_Function fcn,Text att_name,Guid &att)            L_Get_Function_Attribute_Text_Guid;
 
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Text &att)           L_Get_Function_Attribute_No_Text;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Integer &att)        L_Get_Function_Attribute_No_Integer;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Real &att)           L_Get_Function_Attribute_No_Real;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Uid &att)            L_Get_Function_Attribute_No_Uid;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Attributes &att)     L_Get_Function_Attribute_No_Attribute;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Attribute_Blob &att) L_Get_Function_Attribute_No_Attribute_Blob;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Integer64 &att)      L_Get_Function_Attribute_No_Integer64;
 Integer Get_function_attribute           (Macro_Function fcn,Integer att_no,Guid &att)           L_Get_Function_Attribute_No_Guid;
 
 Integer Get_function_attribute_name      (Macro_Function fcn,Integer att_no,Text &name)          L_Get_Function_Attribute_Name;
 Integer Get_function_attribute_type      (Macro_Function fcn,Text att_name,Integer &att_type)    L_Get_Function_Attribute_Type_Text;
 Integer Get_function_attribute_type      (Macro_Function fcn,Integer att_name,Integer &att_type) L_Get_Function_Attribute_Type_No;
 Integer Get_function_attribute_length    (Macro_Function fcn,Text att_name,Integer &att_len)     L_Get_Function_Attribute_Length_Text;
 Integer Get_function_attribute_length    (Macro_Function fcn,Integer att_no,Integer &att_len)    L_Get_Function_Attribute_Length_No;

 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Text att)             L_Set_Function_Attribute_Text_Text;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Integer att)          L_Set_Function_Attribute_Text_Integer;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Real att)             L_Set_Function_Attribute_Text_Real;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Uid att)              L_Set_Function_Attribute_Text_Uid;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Attributes att)       L_Set_Function_Attribute_Text_Attribute;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Attribute_Blob att)   L_Set_Function_Attribute_Text_Attribute_Blob;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Integer64 att)        L_Set_Function_Attribute_Text_Integer64;
 Integer Set_function_attribute           (Macro_Function fcn,Text att_name,Guid att)             L_Set_Function_Attribute_Text_Guid;
 
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Text att)            L_Set_Function_Attribute_No_Text;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Integer att)         L_Set_Function_Attribute_No_Integer;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Real att)            L_Set_Function_Attribute_No_Real;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Uid att)             L_Set_Function_Attribute_No_Uid;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Attributes att)      L_Set_Function_Attribute_No_Attribute;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Attribute_Blob att)  L_Set_Function_Attribute_No_Attribute_Blob;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Integer64 att)       L_Set_Function_Attribute_No_Integer64;
 Integer Set_function_attribute           (Macro_Function fcn,Integer att_no,Guid att)            L_Set_Function_Attribute_No_Guid;
 
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Text &att)            L_Get_Function_Attribute_Text_Match_Text;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Integer &att)         L_Get_Function_Attribute_Text_Match_Integer;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Real &att)            L_Get_Function_Attribute_Text_Match_Real;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Uid &att)             L_Get_Function_Attribute_Text_Match_Uid;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Attributes &att)      L_Get_Function_Attribute_Text_Match_Attribute;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Attribute_Blob &att)  L_Get_Function_Attribute_Text_Match_Attribute_Blob;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Integer64 &att)       L_Get_Function_Attribute_Text_Match_Integer64;
 Integer Get_function_attribute_by_type   (Macro_Function fcn,Text att_name,Guid &att)            L_Get_Function_Attribute_Text_Match_Guid;
 
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Text att)             L_Set_Function_Attribute_Text_Match_Text;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Integer att)          L_Set_Function_Attribute_Text_Match_Integer;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Real att)             L_Set_Function_Attribute_Text_Match_Real;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Uid att)              L_Set_Function_Attribute_Text_Match_Uid;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Attributes att)       L_Set_Function_Attribute_Text_Match_Attribute;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Attribute_Blob att)   L_Set_Function_Attribute_Text_Match_Attribute_Blob;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Integer64 att)        L_Set_Function_Attribute_Text_Match_Integer64;
 Integer Set_function_attribute_by_type   (Macro_Function fcn,Text att_name,Guid att)             L_Set_Function_Attribute_Text_Match_Guid;  
 
// element related function calls

 Integer Get_function_id(Element element,Integer &id) L_Element_Get_Function_ID;                // get id returned zero indicates success
 Integer Set_function_id(Element element,Integer  id) L_Element_Set_Function_ID;                // set id returned zero indicates success

 Integer Get_function_id(Element element,Uid &id) L_Element_Get_Function_UID;                // get id returned zero indicates success
 Integer Set_function_id(Element element,Uid  id) L_Element_Set_Function_UID;                // set id returned zero indicates success

// file I/O

 Integer Read_4d_ascii(Text filename,Text prefix) L_Read_4DA;
 Integer Read_templates(Text filename) L_Read_Templates_File;

 Integer Read_4d_ascii(Text filename,Dynamic_Element &list) L_List_Read_4DA;

 Integer Write_4d_ascii(Element         elt,Text filename,Integer precision,Integer output_model_name) L_Write_Element_4da;
 Integer Write_4d_ascii(Dynamic_Element lst,Text filename,Integer precision,Integer output_model_name) L_Write_Element_List_4da;
 Integer Write_4d_ascii(Model           mod,Text filename,Integer precision,Integer output_model_name) L_Write_Model_4da;
 Integer Write_4d_ascii(Dynamic_Element lst,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Element_List_Ex_4da;
 Integer Write_4d_ascii(Model           mod,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Model_Ex_4da;

 Integer Write_4d_ascii(Element elt,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Element_Ex_4da;
 Integer Write_4d_ascii(Element elt,File file    ,Integer precision,Integer indent_level,Integer bool_flags,Real null_value) L_File_Write_Element_Ex_4da;
 Integer Write_4d_ascii(Element elt,File file    ,Integer precision,Integer indent_level,Text header,Integer bool_flags,Real null_value) L_File_Write_Element_H_Ex_4da;
 Integer Write_4d_ascii(Element elt,File file    ,Integer precision,Integer indent_level)             L_File_Write_Element_4da;
 Integer Write_4d_ascii(Element elt,File file    ,Integer precision,Integer indent_level,Text header) L_File_Write_Element_H_4da;

 Integer Write_XML     (Element         elt,Text filename,Integer precision,Integer output_model_name) L_Write_Element_XML;
 Integer Write_XML     (Dynamic_Element lst,Text filename,Integer precision,Integer output_model_name) L_Write_Element_List_XML;
 Integer Write_XML     (Model           mod,Text filename,Integer precision,Integer output_model_name) L_Write_Model_XML;
 Integer Write_XML     (Dynamic_Element lst,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Element_List_Ex_XML;
 Integer Write_XML     (Model           mod,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Model_Ex_XML;

 Integer Write_XML     (Element elt,Text filename,Integer precision,Integer output_model_name,Integer bool_flags,Real null_value) L_Write_Element_Ex_XML;
 Integer Write_XML     (Element elt,File file    ,Integer precision,Integer indent_level,Integer bool_flags,Real null_value) L_File_Write_Element_Ex_XML;
 Integer Write_XML     (Element elt,File file    ,Integer precision,Integer indent_level,Text header,Integer bool_flags,Real null_value) L_File_Write_Element_H_Ex_XML;
 Integer Write_XML     (Element elt,File file    ,Integer precision,Integer indent_level)             L_File_Write_Element_XML;
 Integer Write_XML     (Element elt,File file    ,Integer precision,Integer indent_level,Text header) L_File_Write_Element_H_XML;

// Project attribute functions

 Integer Get_project_attributes          (Attributes &att)                    L_Get_Project_Attributes;
 Integer Set_project_attributes          (Attributes  att)                    L_Set_Project_Attributes;

 Integer Project_attribute_exists        (Text att_name)                      L_Project_Attribute_Exists;
 Integer Project_attribute_exists        (Text name,Integer &no)              L_Project_Attribute_Exists_No;
 Integer Project_attribute_delete        (Text att_name)                      L_Project_Attribute_Delete_Text;
 Integer Project_attribute_delete        (Integer att_no)                     L_Project_Attribute_Delete_No;
 Integer Project_attribute_delete_all    (Element elt)                        L_Project_Attribute_Delete_All;
 Integer Project_attribute_delete_all    ()                                   L_Project_Attribute_Delete_All_V10;
 Integer Project_attribute_dump          ()                                   L_Project_Attribute_Dump;
 Integer Project_attribute_debug         ()                                   L_Project_Attribute_Debug;
 Integer Get_project_number_of_attributes(Integer &no_atts)                   L_Get_Project_Number_Of_Attributes;

 Integer Get_project_attribute           (Text att_name,Text &att)            L_Get_Project_Attribute_Text_Text;
 Integer Get_project_attribute           (Text att_name,Integer &att)         L_Get_Project_Attribute_Text_Integer;
 Integer Get_project_attribute           (Text att_name,Real &att)            L_Get_Project_Attribute_Text_Real;
 Integer Get_project_attribute           (Text att_name,Uid &att)             L_Get_Project_Attribute_Text_Uid;
 Integer Get_project_attribute           (Text att_name,Attributes &att)      L_Get_Project_Attribute_Text_Attribute;

 Integer Get_project_attribute           (Integer att_no,Text &att)           L_Get_Project_Attribute_No_Text;
 Integer Get_project_attribute           (Integer att_no,Integer &att)        L_Get_Project_Attribute_No_Integer;
 Integer Get_project_attribute           (Integer att_no,Real &att)           L_Get_Project_Attribute_No_Real;
 Integer Get_project_attribute           (Integer att_no,Uid &att)            L_Get_Project_Attribute_No_Uid;
 Integer Get_project_attribute           (Integer att_no,Attributes &att)     L_Get_Project_Attribute_No_Attribute;

 Integer Get_project_attribute_name      (Integer att_no,Text &name)          L_Get_Project_Attribute_Name;
 Integer Get_project_attribute_type      (Text att_name,Integer &att_type)    L_Get_Project_Attribute_Type_Text;
 Integer Get_project_attribute_type      (Integer att_name,Integer &att_type) L_Get_Project_Attribute_Type_No;
 Integer Get_project_attribute_length    (Text att_name,Integer &att_len)     L_Get_Project_Attribute_Length_Text;
 Integer Get_project_attribute_length    (Integer att_no,Integer &att_len)    L_Get_Project_Attribute_Length_No;

 Integer Set_project_attribute           (Text att_name,Text att)             L_Set_Project_Attribute_Text_Text;
 Integer Set_project_attribute           (Text att_name,Integer att)          L_Set_Project_Attribute_Text_Integer;
 Integer Set_project_attribute           (Text att_name,Real att)             L_Set_Project_Attribute_Text_Real;
 Integer Set_project_attribute           (Text att_name,Uid att)              L_Set_Project_Attribute_Text_Uid;
 Integer Set_project_attribute           (Text att_name,Attributes att)       L_Set_Project_Attribute_Text_Attribute;

 Integer Set_project_attribute           (Integer att_no,Text att)            L_Set_Project_Attribute_No_Text;
 Integer Set_project_attribute           (Integer att_no,Integer att)         L_Set_Project_Attribute_No_Integer;
 Integer Set_project_attribute           (Integer att_no,Real att)            L_Set_Project_Attribute_No_Real;
 Integer Set_project_attribute           (Integer att_no,Uid att)             L_Set_Project_Attribute_No_Uid;
 Integer Set_project_attribute           (Integer att_no,Attributes att)      L_Set_Project_Attribute_No_Attribute;

// Model attribute functions

 Integer Get_model_attributes          (Model model,Attributes &att)                    L_Get_Model_Attributes;
 Integer Set_model_attributes          (Model model,Attributes  att)                    L_Set_Model_Attributes;

 Integer Model_attribute_exists        (Model model,Text att_name)                      L_Model_Attribute_Exists;
 Integer Model_attribute_exists        (Model model,Text name,Integer &no)              L_Model_Attribute_Exists_No;
 Integer Model_attribute_delete        (Model model,Text att_name)                      L_Model_Attribute_Delete_Text;
 Integer Model_attribute_delete        (Model model,Integer att_no)                     L_Model_Attribute_Delete_No;
 Integer Model_attribute_delete_all    (Model model,Element elt)                        L_Model_Attribute_Delete_All;
 Integer Model_attribute_dump          (Model model)                                    L_Model_Attribute_Dump;
 Integer Model_attribute_debug         (Model model)                                    L_Model_Attribute_Debug;
 Integer Get_model_number_of_attributes(Model model,Integer &no_atts)                   L_Get_Model_Number_Of_Attributes;

 Integer Get_model_attribute           (Model model,Text att_name,Text &att)            L_Get_Model_Attribute_Text_Text;
 Integer Get_model_attribute           (Model model,Text att_name,Integer &att)         L_Get_Model_Attribute_Text_Integer;
 Integer Get_model_attribute           (Model model,Text att_name,Real &att)            L_Get_Model_Attribute_Text_Real;
 Integer Get_model_attribute           (Model model,Text att_name,Uid &att)             L_Get_Model_Attribute_Text_Uid;
 Integer Get_model_attribute           (Model model,Text att_name,Attributes &att)      L_Get_Model_Attribute_Text_Attribute;

 Integer Get_model_attribute           (Model model,Integer att_no,Text &att)           L_Get_Model_Attribute_No_Text;
 Integer Get_model_attribute           (Model model,Integer att_no,Integer &att)        L_Get_Model_Attribute_No_Integer;
 Integer Get_model_attribute           (Model model,Integer att_no,Real &att)           L_Get_Model_Attribute_No_Real;
 Integer Get_model_attribute           (Model model,Integer att_no,Uid &att)            L_Get_Model_Attribute_No_Uid;
 Integer Get_model_attribute           (Model model,Integer att_no,Attributes &att)     L_Get_Model_Attribute_No_Attribute;

 Integer Get_model_attribute_name      (Model model,Integer att_no,Text &name)          L_Get_Model_Attribute_Name;
 Integer Get_model_attribute_type      (Model model,Text att_name,Integer &att_type)    L_Get_Model_Attribute_Type_Text;
 Integer Get_model_attribute_type      (Model model,Integer att_name,Integer &att_type) L_Get_Model_Attribute_Type_No;
 Integer Get_model_attribute_length    (Model model,Text att_name,Integer &att_len)     L_Get_Model_Attribute_Length_Text;
 Integer Get_model_attribute_length    (Model model,Integer att_no,Integer &att_len)    L_Get_Model_Attribute_Length_No;

 Integer Set_model_attribute           (Model model,Text att_name,Text att)             L_Set_Model_Attribute_Text_Text;
 Integer Set_model_attribute           (Model model,Text att_name,Integer att)          L_Set_Model_Attribute_Text_Integer;
 Integer Set_model_attribute           (Model model,Text att_name,Real att)             L_Set_Model_Attribute_Text_Real;
 Integer Set_model_attribute           (Model model,Text att_name,Uid att)              L_Set_Model_Attribute_Text_Uid;
 Integer Set_model_attribute           (Model model,Text att_name,Attributes att)       L_Set_Model_Attribute_Text_Attribute;

 Integer Set_model_attribute           (Model model,Integer att_no,Text att)            L_Set_Model_Attribute_No_Text;
 Integer Set_model_attribute           (Model model,Integer att_no,Integer att)         L_Set_Model_Attribute_No_Integer;
 Integer Set_model_attribute           (Model model,Integer att_no,Real att)            L_Set_Model_Attribute_No_Real;
 Integer Set_model_attribute           (Model model,Integer att_no,Uid att)             L_Set_Model_Attribute_No_Uid;
 Integer Set_model_attribute           (Model model,Integer att_no,Attributes att)      L_Set_Model_Attribute_No_Attribute;

// clipping functions

 Integer Rectangle_clip (Real x1,Real y1,Real x2,Real y2,
                        Integer  npts_in ,Real xarray_in [],Real yarray_in [],
                        Integer &npts_out,Real xarray_out[],Real yarray_out[]) L_Rectangle_Clip_Polygon;

 Integer Triangles_clip(Real x1,Real y1,Real x2,Real y2,Real x3,Real y3,
                        Real x4,Real y4,Real z4,
                        Real x5,Real y5,Real z5,
                        Real x6,Real y6,Real z6,
                        Integer &npts_out,
                        Real xarray_out[],Real yarray_out[],Real zarray_out[]) L_Triangle_Clip_Triangle;

 Integer Polygons_clip (Integer  npts_clip,Real xclip[],Real yclip[],
                        Integer  npts_in ,Real xarray_in [],Real yarray_in [],Real zarray_in [],
                        Integer &npts_out,Real xarray_out[],Real yarray_out[],Real yarray_out[]) L_Polygon_Clip_Polygon;

//

 Integer Boundary_polygon(Dynamic_Element list,
                          Real            seed_x,
                          Real            seed_y,
                          Real            distance,
                          Element        &result) L_Boundary_Polygon;

// GridCtrl_Box calls

GridCtrl_Box  Create_gridctrl_box(Text name, Integer num_rows, Integer num_columns, Widget column_widgets[], Integer show_nav, Message_Box messages, Integer width, Integer height)  L_Create_GridCtrl_Box;
GridCtrl_Box  Create_gridctrl_box(Text name, Integer num_rows, Integer num_columns, Widget column_widgets[], Integer column_readonly[], Integer show_nav, Message_Box messages, Integer width, Integer height)  L_Create_GridCtrl_Box2;

Integer       Load_row_from_widgets(GridCtrl_Box grid, Integer row) L_GridCtrl_Box_Load_Row_From_Widgets;
Integer       Load_widgets_from_row(GridCtrl_Box grid, Integer row) L_GridCtrl_Box_Load_Widgets_From_Row;
Integer       Get_row_count(GridCtrl_Box grid) L_GridCtrl_Box_Get_Row_Count;
Integer       Insert_row(GridCtrl_Box grid) L_GridCtrl_Box_Insert_Row;
Integer       Insert_row(GridCtrl_Box grid, Integer at, Integer is_before) L_GridCtrl_Box_Insert_Row_At;
Integer       Delete_row(GridCtrl_Box grid, Integer row) L_GridCtrl_Box_Delete_Row;
Integer       Delete_all_rows(GridCtrl_Box grid) L_GridCtrl_Box_Delete_All_Rows;
Integer       Format_grid(GridCtrl_Box grid) L_GridCtrl_Box_Format_Grid;
Integer       Get_cell(GridCtrl_Box grid, Integer row, Integer col, Text &value) L_GridCtrl_Box_Get_Cell;
Integer       Set_cell(GridCtrl_Box grid, Integer row, Integer col, Text value) L_GridCtrl_Box_Set_Cell;
Integer       Set_column_width(GridCtrl_Box grid, Integer col, Integer width) L_GridCtrl_Box_Set_Column_Width;
Integer       Set_modified(GridCtrl_Box grid, Integer modified) L_GridCtrl_Box_Set_Modified;
Integer       Set_warn_on_modified(GridCtrl_Box grid, Integer warn_on_modified) L_GridCtrl_Box_Set_Warn_On_Modified;
Integer       Get_selected_cells(GridCtrl_Box grid, Integer &start_row, Integer &start_col, Integer &end_row, Integer &end_col) L_GridCtrl_Box_Get_Selected_Cells;
Integer       Set_fixed_row_count(GridCtrl_Box grid, Integer num_fixed_Rows) L_GridCtrl_Box_Set_Fixed_Row_Count;
Integer       Get_fixed_row_count(GridCtrl_Box grid) L_GridCtrl_Box_Get_Fixed_Row_Count;
Integer       Set_cell_read_only(GridCtrl_Box grid, Integer row, Integer col, Integer read_only) L_GridCtrl_Box_Set_Cell_Read_Only;
Integer       Get_cell_read_only(GridCtrl_Box grid, Integer row, Integer col)  L_GridCtrl_Box_Get_Cell_Read_Only;


// Rainfall calls

Integer       Get_drainage_intensity(Text rainfall_filename,Integer rainfall_method,Real frequency,Real duration,Real &intensity) L_Get_Drainage_Intensity;

Integer       Get_frequency_mode(Text file,Integer &fm) L_Get_Frequency_Mode;

Integer       Get_variable_temporal_patterns(Text file,Text pattern_name,Integer pattern_type,Integer sort_data,Dynamic_Real &time[],Dynamic_Real &duration[],Dynamic_Real &value[], Integer &ret_num) L_Get_Variable_Temporal_Patterns;

Integer       Get_rainfall_temporal_patterns_enabled(Text file,Real min_freq,Real max_freq,Dynamic_Integer &storms, Integer &ret_num) L_Get_Enabled_Rainfall_Temporal_Pattern_Rows;
Integer       Get_rainfall_temporal_pattern(Text file,Integer storm_num, Integer &run, Text &zone_filter, Real &duration, Real &from_ari, Real &to_ari, Real &interval, Real pattern[], Integer max_num, Integer &ret_num) L_Get_Integer_Storm_ID_Rainfall_Temporal_Pattern;
Integer       Get_rainfall_temporal_pattern(Text file,Text storm_num,    Integer &run, Text &zone_filter, Real &duration, Real &from_ari, Real &to_ari, Real &interval, Real pattern[], Integer max_num, Integer &ret_num) L_Get_Text_Storm_ID_Rainfall_Temporal_Pattern;

Integer       Get_rainfall_temporal_pattern_ensemble(Text file,Integer storm_num, Integer &run, Text &zone_filter,Text &storm_id,Text &dur_id, Real &duration, Real &from_ari, Real &to_ari, Real &interval, Real pattern[],Integer max_num, Integer &ret_num) L_Get_Integer_Storm_ID_Rainfall_Temporal_Pattern_Ensemble;
Integer       Get_rainfall_temporal_pattern_ensemble(Text file,Text    storm_num, Integer &run, Text &zone_filter,               Text &dur_id, Real &duration, Real &from_ari, Real &to_ari, Real &interval, Real pattern[],Integer max_num, Integer &ret_num) L_Get_Text_Storm_ID_Rainfall_Temporal_Pattern_Ensemble;

Integer       Get_drainage_storm_results_list(Text model_name,Integer storm_type,Dynamic_Text &storm_att_path,Dynamic_Text &graphing_name,Dynamic_Text &storm_list,Dynamic_Text &graph_list,Dynamic_Integer &var_pattern)  L_Get_Drainage_Storm_Results_List;

Integer       Get_pump_curves(Text file, Text curve_name, Integer curve_type,Dynamic_Real &flow[],Dynamic_Real &value[], Integer &ret_num)                                                                                 L_Get_Pump_Curves;


// XML calls

XML_Document  Create_XML_document() L_XML_Document_Create;

Integer       Set_expand_includes(XML_Document doc, Integer expand) L_XML_Document_Set_Expand_Includes;

Integer       Read_XML_document  (XML_Document doc, Text  file) L_XML_Document_Read;
Integer       Write_XML_document (XML_Document doc, Text  file) L_XML_Document_Write;
Integer       Write_XML_Document (XML_Document doc, File &file) L_XML_Document_Write_Ex;

Integer       Get_XML_declaration(XML_Document doc, Text &version, Text &encoding, Integer &standalone) L_XML_Document_Get_Declaration;
Integer       Set_XML_declaration(XML_Document doc, Text version, Text encoding, Integer standalone) L_XML_Document_Set_Declaration;

Integer       Get_root_node(XML_Document doc, XML_Node &node) L_XML_Document_Get_Root_Node;
Integer       Set_root_node(XML_Document doc, XML_Node &node) L_XML_Document_Set_Root_Node;

Integer       Get_number_of_nodes(XML_Node node) L_XML_Node_Get_Number_Of_Nodes;
Integer       Get_child_node(XML_Node node, Integer index, XML_Node &child_node) L_XML_Node_Get_Child_Node;
Integer       Get_child_node(XML_Node node, Text node_name, XML_Node &child_node) L_XML_Node_Get_Child_Node_By_Name;
Integer       Append_node(XML_Node parent, XML_Node new_node) L_XML_Node_Append_Node;
Integer       Remove_node(XML_Node parent, Integer index) L_XML_Node_Remove_Node;
Integer       Get_parent_node(XML_Node child, XML_Node &parent) L_XML_Node_Get_Parent_Node;
Integer       Get_next_sibling_node(XML_Node node, XML_Node &sibling) L_XML_Node_Get_Next_Sibling_Node;
Integer       Get_prev_sibling_node(XML_Node node, XML_Node &sibling) L_XML_Node_Get_Prev_Sibling_Node;
Integer       Get_node_name(XML_Node node, Text &name) L_XML_Node_Get_Node_Name;
Integer       Get_node_attribute(XML_Node node, Text name, Text &value) L_XML_Node_Get_Attribute_Value;
Integer       Set_node_attribute(XML_Node node, Text name, Text value) L_XML_Node_Set_Attribute;
Integer       Remove_node_attribute(XML_Node node, Text name) L_XML_Node_Remove_Attribute;
XML_Node      Create_node(Text name) L_XML_Node_Create_Node;

Integer       Is_text_node(XML_Node &node) L_XML_Node_Is_Text_Element;
Integer       Get_node_text(XML_Node &node, Text &text) L_XML_Node_Get_Text_Node_Text;
Integer       Set_node_text(XML_Node &node, Text text) L_XML_Node_Set_Text_Node_Text;
XML_Node      Create_text_node(Text name, Text value) L_XML_Node_Create_Text_Node;
Integer Get_node_attributes(XML_Node node, Integer &attributes_count) L_XML_Node_Get_Number_Of_Node_Attributes;
Integer Get_node_attributes(XML_Node node, Integer &attributes_count, Dynamic_Text &names, Dynamic_Text &values) L_XML_Node_Get_Node_Attributes;
Integer Get_node_attribute (XML_Node node, Integer attribute_index, Text &name, Text &value) L_XML_Node_Get_Node_Attribute_Name_Value;


// Plot Parameter File calls

// name is one of the following
//
// section_long_plot
// section_x_plot
// melb_water_sewer_long_plot
// pipeline_long_plot
// drainage_long_plot
// drainage_plan_plot
// plot_frame_plot
// rainfall_methods
// design_parameters

Integer       Create_parameter_file                           (Plot_Parameter_File file,Text name) L_Plot_Parameter_File_Create_By_Name;

Integer       Create_section_long_plot_parameter_file         (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Section_Long_Plot;
Integer       Create_section_x_plot_parameter_file            (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Section_X_Plot;
Integer       Create_melb_water_sewer_long_plot_parameter_file(Plot_Parameter_File file) L_Plot_Parameter_File_Create_Melb_Water_Sewer_Long_Plot;
Integer       Create_pipeline_long_plot_parameter_file        (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Pipeline_Long_Plot;
Integer       Create_drainage_long_plot_parameter_file        (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Drainage_Long_Plot;
Integer       Create_drainage_plan_plot_parameter_file        (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Drainage_Plan_Plot;
Integer       Create_plot_frame_plot_parameter_file           (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Plot_Frame_Plot;
Integer       Create_rainfall_methods_parameter_file          (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Rainfall_Methods;
Integer       Create_design_parameters_parameter_file         (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Design_Parameters;
Integer       Create_perspective_plot_parameter_file          (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Perspective_Plot;
Integer       Create_section_plot_parameter_file              (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Section_Plot;
Integer       Create_water_node_diagram_plot_parameter_file   (Plot_Parameter_File file) L_Plot_Parameter_File_Create_Water_Node_Diagram_Plot;
 
Integer       Read_parameter_file  (Plot_Parameter_File file,Text filename,Integer expand_includes) L_Plot_Parameter_File_Read;
Integer       Write_parameter_file (Plot_Parameter_File file,Text filename) L_Plot_Parameter_File_Write;

Integer       Set_parameter        (Plot_Parameter_File file,Text parameter_name,Text      parameter_value) L_Plot_Parameter_File_Set;
Integer       Get_parameter        (Plot_Parameter_File file,Text parameter_name,Text     &parameter_value) L_Plot_Parameter_File_Get;

Integer       Set_parameter        (Plot_Parameter_File file,Text parameter_name,Element   parameter_value) L_Plot_Parameter_File_Set_Element;
Integer       Get_parameter        (Plot_Parameter_File file,Text parameter_name,Element  &parameter_value) L_Plot_Parameter_File_Get_Element;

Integer       Remove_parameter     (Plot_Parameter_File file,Text parameter_name) L_Plot_Parameter_File_Remove;
Integer       Parameter_exists     (Plot_Parameter_File file,Text parameter_name) L_Plot_Parameter_File_Exists;

Integer       Plot_parameter_file  (Plot_Parameter_File file) L_Plot_Parameter_File_Plot;
Integer       Plot_parameter_file  (Text                file) L_Plot_Parameter_File_Plot_File;

// ODBC calls

// Base connections

Connection Create_ODBC_connection() L_Connection_Create;
Integer    Connect(Connection connection, Text connection_string, Text user, Text password) L_Connection_Connect_With_Auth;
Integer    Connect(Connection connection, Text connection_string) L_Connection_Connect;
Integer    Close(Connection connection) L_Connection_Close;
Integer    Execute(Connection connection, Select_Query query) L_Connection_Select_Execute;
Integer    Execute(Connection connection, Select_Query query, Database_Result &result) L_Connection_Select_Execute_And_Return;
Integer    Execute(Connection connection, Insert_Query query) L_Connection_Insert_Execute;
Integer    Execute(Connection connection, Update_Query query) L_Connection_Update_Execute;
Integer    Execute(Connection connection, Delete_Query query) L_Connection_Delete_Execute;
Integer    Execute(Connection connection, Manual_Query query) L_Connection_Manual_Execute;
Integer    Execute(Connection connection, Manual_Query query, Database_Result &result) L_Connection_Manual_Execute_And_Return;
Integer    Has_error(Connection connection) L_Connection_Has_Error;
Integer    Get_last_error(Connection connection, Text &status, Text &message) L_Connection_Get_Last_Error;

// Database Results

Integer    Move_next(Database_Result result) L_Database_Result_Move_Next;
Integer    Close(Database_Result result) L_Database_Result_Close;

Integer    Get_result_column(Database_Result result, Integer column, Text &res) L_Database_Result_Get_Text_Result_Column;
Integer    Get_result_column(Database_Result result, Integer column, Integer &res) L_Database_Result_Get_Integer_Result_Column;
Integer    Get_result_column(Database_Result result, Integer column, Real &res) L_Database_Result_Get_Real_Result_Column;
Integer    Get_time_result_column(Database_Result result, Integer column, Integer &time) L_Database_Result_Get_Time_Result_Column;

Integer    Get_result_column(Database_Result result, Text column, Text &res) L_Database_Result_Get_Named_Text_Result_Column;
Integer    Get_result_column(Database_Result result, Database_Result result, Text column, Integer &res) L_Database_Result_Get_Named_Integer_Result_Column;
Integer    Get_result_column(Database_Result result, Text column, Real &res) L_Database_Result_Get_Named_Real_Result_Column;
Integer    Get_time_result_column(Database_Result result, Text column, Integer &time) L_Database_Result_Get_Named_Time_Result_Column;


// Transactions

Transaction Create_transaction(Connection connection) L_Transaction_Create;
Integer     Begin_transaction(Transaction transaction) L_Transaction_Begin;
Integer     Commit_transaction(Transaction transaction) L_Transaction_Commit;
Integer     Rollback_transaction(Transaction transaction) L_Transaction_Rollback;

// Select queries - used to retrieve data from the database

Select_Query Create_select_query() L_Select_Query_Create;
Integer      Add_table(Select_Query query, Text table_name) L_Select_Query_Add_Table;
Integer      Add_result_column(Select_Query query, Text table, Text column_name, Text return_as) L_Select_Query_Add_Result_Column_With_Return;
Integer      Add_result_column(Select_Query query, Text table, Text column_name) L_Select_Query_Add_Result_Column;
Integer      Add_group_by(Select_Query query, Text table_name, Text column_name) L_Select_Query_Add_Group_By;
Integer      Add_order_by(Select_Query query, Text table_name, Text column_name, Integer sort_ascending) L_Select_Query_Add_Order_By;
Integer      Set_limit(Select_Query query, Integer start, Integer number_to_retrieve) L_Select_Query_Set_Limit;
Integer      Add_condition(Select_Query query, Query_Condition condition) L_Select_Query_Add_Condition;

// Insert queries - used to add data to a database

Insert_Query Create_insert_query(Text table) L_Insert_Query_Create;
Integer      Add_data(Insert_Query query, Text column_name, Integer value) L_Insert_Query_Add_Integer;
Integer      Add_data(Insert_Query query, Text column_name, Text value)    L_Insert_Query_Add_Text;
Integer      Add_data(Insert_Query query, Text column_name, Real value)    L_Insert_Query_Add_Real;
Integer      Add_time_data(Insert_Query query, Text column_name, Integer time)  L_Insert_Query_Add_Time;

// Update queries - used to update data in a database

Update_Query Create_update_query(Text table) L_Update_Query_Create;
Integer      Add_data(Update_Query query, Text column_name, Integer value) L_Update_Query_Add_Integer;
Integer      Add_data(Update_Query query, Text column_name, Text value)    L_Update_Query_Add_Text;
Integer      Add_data(Update_Query query, Text column_name, Real value)    L_Update_Query_Add_Real;
Integer      Add_time_data(Update_Query query, Text column_name, Integer time)  L_Update_Query_Add_Time;
Integer      Add_condition(Update_Query query, Query_Condition condition) L_Update_Query_Add_Condition;

// Delete queries - used to delete data from a database

Delete_Query Create_delete_query(Text table) L_Delete_Query_Create;
Integer      Add_condition(Delete_Query query, Query_Condition condition) L_Delete_Query_Add_Condition;

// Manual queries - used for manual queries

Manual_Query Create_manual_query(Text query_text) L_Manual_Query_Create;
Integer Get_parameters(Manual_Query query, Parameter_Collection parameters) L_Manual_Query_Get_Parameters;

// Query Parameters

Integer Add_parameter(Parameter_Collection parameters, Integer value) L_Parameter_Collection_Add_Integer;
Integer Add_parameter(Parameter_Collection parameters, Text value) L_Parameter_Collection_Add_Text;
Integer Add_parameter(Parameter_Collection parameters, Real value) L_Parameter_Collection_Add_Real;
Integer Add_time_parameter(Parameter_Collection parameters, Integer value) L_Parameter_Collection_Add_Time;

// Query conditions

Query_Condition Create_value_condition(Text table_name, Text column_name, Integer operator, Text value) L_Text_Value_Condition_Create;
Query_Condition Create_value_condition(Text table_name, Text column_name, Integer operator, Integer value) L_Integer_Value_Condition_Create;
Query_Condition Create_value_condition(Text table_name, Text column_name, Integer operator, Real value) L_Real_Value_Condition_Create;
Query_Condition Create_time_value_condition(Text table_name, Text column_name, Integer operator, Integer value) L_Time_Value_Condition_Create;

Query_Condition Create_column_match_condition(Text left_table, Text left_column, Integer operator, Text right_table, Text right_column) L_Column_Match_Condition_Create;

Query_Condition Create_value_in_sub_query_condition(Text table_name, Text column_name, Integer not_in, Select_Query sub_query) L_Value_In_Sub_Query_Condition_Create;
Query_Condition Create_value_in_list_condition(Text table_name, Text column_name, Integer not_in, Dynamic_Integer values) L_Value_In_Integer_List_Condition_Create;
Query_Condition Create_value_in_list_condition(Text table_name, Text column_name, Integer not_in, Dynamic_Text values) L_Value_In_Text_List_Condition_Create;
Query_Condition Create_value_in_list_condition(Text table_name, Text column_name, Integer not_in, Dynamic_Real values) L_Value_In_Real_List_Condition_Create;

// Manual condition

Manual_Condition Create_manual_condition(Text sql) L_Manual_Condition_Create;
Integer Add_table(Manual_Condition manual, Text table) L_Manual_Condition_Add_Table;
Integer Get_parameters(Manual_Condition manual, Parameter_Collection &param) L_Manual_Condition_Get_Parameters;

// Tree box

Tree_Box  Create_tree_box(Text name, Text root_item_text, Integer tree_width, Integer tree_height) L_Tree_Box_Create;
Tree_Page Get_root_page(Tree_Box tree_box) L_Tree_Box_Get_Root_Page;
Integer   Set_page(Tree_Box tree_box, Widget w) L_Tree_Box_Set_Page_By_Widget;
Integer   Set_page(Tree_Box tree_box, Tree_Page page) L_Tree_Box_Set_Page_By_Page;
Integer   Set_page(Tree_Box tree_box, Text name) L_Tree_Box_Set_Page_By_Name;
Integer   Set_page(Tree_Box tree_box, Integer page_id) L_Tree_Box_Set_Page_By_ID;
Integer   Get_current_page(Tree_Box tree_box, Tree_Page &current_page) L_Tree_Box_Get_Current_Page;



// Tree page

Tree_Page Create_tree_page(Tree_Page tree_page, Text name, Integer show_border, Integer use_name_for_border) L_Tree_Page_Create_Tree_Page;
Integer   Get_number_of_pages(Tree_Page tree_page) L_Tree_Page_Get_Page_Count;
Integer   Get_page(Tree_Page parent, Integer page_index, Tree_Page &page) L_Tree_Page_Get_Page;
Integer   Has_child_page(Tree_Page parent, Tree_Page child) L_Tree_Page_Has_Child;
Integer   Has_widget(Tree_Page page, Widget w) L_Tree_Page_Has_Widget;
Text      Get_page_name(Tree_Page page) L_Tree_Page_Get_Page_Name;
Integer   Append(Widget widget, Tree_Page page) L_Tree_Page_Append_Widget;
Integer   Get_page_id(Tree_Page page) L_Tree_Page_Get_ID;

// Colour message box

Colour_Message_Box Create_colour_message_box(Text title) L_Create_Colour_Message_Box;
Integer            Set_level(Colour_Message_Box box, Integer level) L_Set_Colour_Message_Box_Level;
Integer            Set_data(Colour_Message_Box box, Text data) L_Set_Colour_Message_Box_Data;
Integer            Set_data(Colour_Message_Box box, Text data, Integer level) L_Set_Colour_Message_Box_Data_With_Level;

// Log line calls


// Log levels are General (1), Warning (2), Error (3)

Log_Line    Create_text_log_line(Text message, Integer log_level) L_Log_Line_Create_Text;
Log_Line    Create_highlight_string_log_line(Text message, Integer log_level, Uid model_id, Uid string_id) L_Log_Line_Create_Highlight_String;
Log_Line    Create_highlight_string_log_line(Text message, Integer log_level, Uid model_id, Uid string_id, Real x, Real y, Real z) L_Log_Line_Create_Highlight_String_With_Pos;
Log_Line    Create_highlight_point_log_line(Text message, Integer log_level, Real x, Real y, Real z) L_Log_Line_Create_Point;
Log_Line    Create_edit_string_log_line(Text message, Integer log_level, Uid model_id, Uid string_id) L_Log_Line_Create_Edit_String;

Log_Line    Create_macro_log_line(Text message, Integer log_level, Text macro, Text select_cmd_line) L_Log_Line_Create_Macro;
Log_Line    Create_macro_log_line(Text message, Integer log_level, Text macro, Text select_cmd_line, Dynamic_Text menu_names, Dynamic_Text menu_command_lines) L_Log_Line_Create_Macro_With_Menu;

Integer     Print_log_line(Log_Line line, Integer is_error) L_Print_Log_Line;

// Log box calls

Log_Box     Create_log_box(Text name, Integer width, Integer height) L_Log_Box_Create;
Integer     Add_log_line(Log_Box log_box, Log_Line line) L_Log_Box_Add_Line;
Integer     Clear(Log_Box box) L_Log_Box_Clear;

// Slider box calls

Slider_Box  Create_slider_box(Text name, Integer width, Integer height, Integer min_range, Integer max_range, Integer frequency, Integer horizontal) L_Slider_Box_Create;
Integer     Set_slider_position(Slider_Box box, Integer position) L_Slider_Box_Set_Pos;
Integer     Get_slider_position(Slider_Box box, Integer &position) L_Slider_Box_Get_Pos;


// 12d field calls...

 Integer TDF_Run_Pickup() L_TDF_Run_Pickup;
 Integer TDF_Run_Setout() L_TDF_Run_Setout;

 Integer TDF_Set_gui_pause_value(Integer  milli_seconds) L_TDF_Set_GUI_Pause_Value;
 Integer TDF_Get_gui_pause_value(Integer &milli_seconds) L_TDF_Get_GUI_Pause_Value;

 Integer TDF_Set_feature_group_confirm_exit(Integer  tf) L_TDF_Set_Feature_Group_Confirm_Exit;
 Integer TDF_Get_feature_group_confirm_exit(Integer &tf) L_TDF_Get_Feature_Group_Confirm_Exit;

 Integer TDF_Find_panel(Text name, Panel &p) L_TDF_Find_Panel;
 Integer TDF_Find_menu(Text name, Menu &m) L_TDF_Find_Menu;
 Integer TDF_Press_button(Panel p, Text name) L_TDF_Press_Button;
 Integer TDF_Press_button(Menu m, Text name) L_TDF_Press_Menu_Button;
 Integer TDF_Press_control_bar_button(Text name) L_TDF_Press_Control_Bar_Button;
 Integer TDF_Set_field(Panel p, Text field, Text value) L_TDF_Set_Field_Text;
 Integer TDF_Set_field(Panel p, Text field, Real value) L_TDF_Set_Field_Real;
 Integer TDF_Set_field(Panel p, Text field, Integer value) L_TDF_Set_Field_Integer;
 Integer TDF_Set_field(Panel p, Text field, Element value) L_TDF_Set_Field_Element;
 Integer TDF_Set_field(Panel p, Text field, Element value, Real x, Real y, Real z) L_TDF_Set_Field_Element_XYZ;
 Integer TDF_Run_function_key_command(Text command) L_TDF_Run_Function_Key_Command;
 Integer TDF_Wait_on_instruments(Text &instrument, Text &event, Text &msg) L_TDF_Wait_On_Instruments;
 Integer TDF_Position_TPS(Real x, Real y, Real z, Integer take_measure) L_TDF_Position_TPS_To_XYZ;
 Integer TDF_Position_TPS(Real x, Real y, Integer take_measure) L_TDF_Position_TPS_To_XY;
 Integer TDF_Set_feature_data(Text field, Text value) L_TDF_Set_Feature_Data_Text;
 Integer TDF_Set_feature_data(Text field, Real value)  L_TDF_Set_Feature_Data_Real;
 Integer TDF_Set_feature_data(Text field, Integer value)  L_TDF_Set_Feature_Data_Integer;
 Integer TDF_Open_feature_group(Text group) L_TDF_Open_Feature_Group;
 Integer TDF_Close_feature_group() L_TDF_Close_Feature_Group;
 Integer TDF_Set_angle_swing(Real swing) L_TDF_Set_Angle_Swing; // bit hacky
 Integer TDF_Open_template_control_bar() L_TDF_Open_Template_Control_Bar;
 Integer TDF_Press_template_control_bar_button(Text name) L_TDF_Press_Template_Control_Bar_Button;
 Integer TDF_Get_global_data(Text type_name, Text &value) L_TDF_Get_Global_Data_Text;
 Integer TDF_Get_global_data(Text type_name, Real &value) L_TDF_Get_Global_Data_Real;
 Integer TDF_Get_global_data(Text type_name, Integer &value) L_TDF_Get_Global_Data_Integer;
 Integer TDF_Set_global_data(Text type_name, Text value) L_TDF_Set_Global_Data_Text;
 Integer TDF_Set_global_data(Text type_name, Real value) L_TDF_Set_Global_Data_Real;
 Integer TDF_Set_global_data(Text type_name, Integer value) L_TDF_Set_Global_Data_Integer;

 Integer TDF_wait_for_timer(Integer milliseconds)       L_TDF_Wait_For_Timer;


// function property collection

 Function_Property_Collection Create_function_property_collection() L_Create_Function_Property_Collection;
 Integer Set_property(Function_Property_Collection collection, Text name, Integer value) L_Set_Function_Property_Integer;
 Integer Set_property(Function_Property_Collection collection, Text name, Real value) L_Set_Function_Property_Real;
 Integer Set_property(Function_Property_Collection collection, Text name, Text value) L_Set_Function_Property_Text;
 Integer Set_property(Function_Property_Collection collection, Text name, Tin tin) L_Set_Function_Property_Tin;
 Integer Set_property(Function_Property_Collection collection, Text name, Element element) L_Set_Function_Property_Element;
 Integer Set_property(Function_Property_Collection collection, Text name, Model model) L_Set_Function_Property_Model;
 Integer Set_property_colour(Function_Property_Collection collection, Text name, Text colour_name) L_Set_Function_Property_Colour;

 Integer Create_apply_many_function(Text function_name, Function_Property_Collection properties, Apply_Many_Function &function, Text &msg) L_Create_Apply_Many_Function_By_Properties;
 Integer Get_apply_many_function(Text function_name, Apply_Many_Function &function) L_Get_Apply_Many_Function;
 Integer Set_apply_many_function_properties(Apply_Many_Function function, Function_Property_Collection properties, Text &msg) L_Set_Apply_Many_Function_Properties;
 Integer Get_apply_many_function_properties(Apply_Many_Function func, Function_Property_Collection &properties) L_Get_Apply_Many_Function_Properties;
 Integer Get_property(Function_Property_Collection collection, Text name, Integer &value) L_Get_Function_Property_Integer;
 Integer Get_property(Function_Property_Collection collection, Text name, Real &value) L_Get_Function_Property_Real;
 Integer Get_property(Function_Property_Collection collection, Text name, Text &value) L_Get_Function_Property_Text;
 Integer Get_property(Function_Property_Collection collection, Text name, Tin &tin) L_Get_Function_Property_Tin;
 Integer Get_property(Function_Property_Collection collection, Text name, Element &element) L_Get_Function_Property_Element;
 Integer Get_property(Function_Property_Collection collection, Text name, Model &model) L_Get_Function_Property_Model;
 Integer Get_property_colour(Function_Property_Collection collection, Text name, Text &colour_name) L_Get_Function_Property_Colour;


// vis calls

 Integer Place_mesh(Real x, Real y, Real z, Integer source_type, Text source, Vector3 offset, Vector3 rotate, Vector3 scale, Element &mesh_string) L_Place_Mesh;
 Integer Place_mesh(Real x, Real y, Real z, Text source, Vector3 offset, Vector3 rotate, Vector3 scale, Tin anchor_tin, Element &mesh_string) L_Place_Anchored_Mesh;

// gis calls

 Integer GIS_Connect_to_server(Text server_name, Text output_schema_file, Text output_capabilities_file, Text &err) L_GIS_Connect_To_Server;
 Integer GIS_connect_to_server(Text server_name, Text output_schema_file, Text output_capabilities_file, Text &err) L_GIS_Connect_To_Server;

 Integer GIS_Download_feature(Text server_name, Text feature_name, Text filter,  Text map_file, Text attribute_as_z, Integer limit, Integer num_to_head_to_tail, Model m, Text &err) L_GIS_Download_Feature;
 Integer GIS_download_feature(Text server_name, Text feature_name, Text filter,  Text map_file, Text attribute_as_z, Integer limit, Integer num_to_head_to_tail, Model m, Text &err) L_GIS_Download_Feature;

 Integer GIS_Set_credentials(Text server_name, Text user, Text password) L_GIS_Set_Credentials;
 Integer GIS_set_credentials(Text server_name, Text user, Text password) L_GIS_Set_Credentials;

 // parameters to be done

 Integer GIS_Upload_feature () L_GIS_Upload_Feature;
 Integer GIS_upload_feature () L_GIS_Upload_Feature;

// ADAC XSD calls

 Integer ADAC_Get_XSD_Path(Text version, Text &path) L_XSD_Get_ADAC_Path;
 Integer ADAC_get_xsd_path(Text version, Text &path) L_XSD_Get_ADAC_Path;

 Integer XSD_Get_Type_Enumerations(Text xsd, Text schema, Text frag_path, Dynamic_Text &enums, Text &elem_type) L_XSD_Get_Type_Enumerations;
 Integer XSD_get_type_enumerations(Text xsd, Text schema, Text frag_path, Dynamic_Text &enums, Text &elem_type) L_XSD_Get_Type_Enumerations;

// Drafting calls

 Integer DRF_dimension_horizontal_points_create        (Text style_name, Text format_text, Real sx, Real sy, Real ex, Real ey, Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Horizontal_Points_Create;
 Integer DRF_dimension_vertical_points_create          (Text style_name, Text format_text, Real sx, Real sy, Real ex, Real ey, Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Vertical_Points_Create;
 Integer DRF_dimension_aligned_points_create           (Text style_name, Text format_text, Real sx, Real sy, Real ex, Real ey, Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Aligned_Points_Create;
 Integer DRF_dimension_aligned_points_fixoffset_create (Text style_name, Text format_text, Real sx, Real sy, Real ex, Real ey, Real dx, Real dy, Real fix_offset,                     Model &model, Element &out) L_DRF_Dimension_Aligned_Points_FixOffset_Create;
 Integer DRF_dimension_rotated_points_create           (Text style_name, Text format_text, Real sx, Real sy, Real ex, Real ey, Real dx, Real dy, Real rot_ang,                        Model &model, Element &out) L_DRF_Dimension_Rotated_Points_Create;
 Integer DRF_dimension_horizontal_segment_create       (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Horizontal_Segment_Create;
 Integer DRF_dimension_vertical_segment_create         (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Vertical_Segment_Create;
 Integer DRF_dimension_aligned_segment_create          (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Aligned_Segment_Create;
 Integer DRF_dimension_aligned_segment_fixoffset_create(Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy, Real fix_offset,                     Model &model, Element &out) L_DRF_Dimension_Aligned_Segment_FixOffset_Create;
 Integer DRF_dimension_rotated_segment_create          (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy, Real rot_ang,                        Model &model, Element &out) L_DRF_Dimension_Rotated_Segment_Create;
 Integer DRF_dimension_drop_perpendicular_create       (Text style_name, Text format_text, Real sx, Real sy, Segment base_seg, Real dx, Real dy, Real fix_offset,                     Model &model, Element &out) L_DRF_Dimension_Drop_Perpendicular_Create;
 Integer DRF_dimension_length_create                   (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy,                                      Model &model, Element &out) L_DRF_Dimension_Length_Create;
 Integer DRF_dimension_length_fixoffset_create         (Text style_name, Text format_text, Segment base_seg                  , Real dx, Real dy, Real fix_offset,                     Model &model, Element &out) L_DRF_Dimension_Length_FixOffset_Create;
 Integer DRF_dimension_angular_points_create           (Text style_name, Text format_text, Real sx, Real sy, Real ax, Real ay, Real ex, Real ey, Real dx, Real dy, Integer dir,       Model &model, Element &out) L_DRF_Dimension_Angular_Points_Create;
 Integer DRF_dimension_angular_segment_create          (Text style_name, Text format_text, Segment line1   , Segment line2   , Real dx, Real dy, Integer i1, Integer i2, Integer ir,  Model &model, Element &out) L_DRF_Dimension_Angular_Segment_Create;
 Integer DRF_dimension_sngular_points_create           (Text style_name, Text format_text, Real sx, Real sy, Real ax, Real ay, Real ex, Real ey, Real dx, Real dy, Integer dir,       Model &model, Element &out) L_DRF_Dimension_Angular_Points_Create;
 Integer DRF_dimension_sngular_segment_create          (Text style_name, Text format_text, Segment line1   , Segment line2   , Real dx, Real dy, Integer i1, Integer i2, Integer ir,  Model &model, Element &out) L_DRF_Dimension_Angular_Segment_Create;
 Integer DRF_dimension_radial_create                   (Text style_name, Text format_text, Segment base_arc                  , Real dx, Real dy, Integer float_dim,                   Model &model, Element &out) L_DRF_Dimension_Radial_Create;
 Integer DRF_dimension_diameter_create                 (Text style_name, Text format_text, Segment base_arc                  , Real dx, Real dy, Integer float_dim,                   Model &model, Element &out) L_DRF_Dimension_Diameter_Create;
 Integer DRF_dimension_area_create                     (Text style_name, Text format_text, Element poly_inp,                                                                          Model &model, Element &out) L_DRF_Dimension_Area_Create;

 Integer DRF_leader_create                             (Text style_name, Text leader_text, Real ax, Real ay, Real hx, Real hy,                                                        Model &model, Element &out) L_DRF_Leader_Create;

 Integer DRF_dimension_edit_move_dim                   (Real dx, Real dy, Element &e, Integer move_mode) L_DRF_Dimension_Edit_Move_Dim;
 Integer DRF_dimension_edit_move_start                 (Real sx, Real sy, Element &e, Integer move_mode) L_DRF_Dimension_Edit_Move_Start;
 Integer DRF_dimension_edit_move_end                   (Real ex, Real ey, Element &e, Integer move_mode) L_DRF_Dimension_Edit_Move_End;
 Integer DRF_leader_edit_move_hook                     (Real hx, Real hy, Element &e, Integer move_mode) L_DRF_Leader_Edit_Move_Hook;
 Integer DRF_leader_edit_move_arrow                    (Real hx, Real hy, Element &e, Integer move_mode) L_DRF_Leader_Edit_Move_Arrow;
 Integer DRF_drafting_edit_set_style                   (Text style_name,  Element &e) L_DRF_Drafting_Edit_Set_Style;
 Integer DRF_drafting_edit_set_format_text             (Text style_name,  Element &e) L_DRF_Drafting_Edit_Set_Format_Text;

Integer DRF_table_create(Text table_name, Text style_name, Integer az, Integer nr, Integer nc, Real cw, Real rh, Integer ti, Integer hi, Real px, Real py, Real ar, Model &model, Element &out) L_DRF_Table_Create;
Integer DRF_table_edit_cell(Integer rn, Integer cn, Text cc, Element &e) L_DRF_Table_Edit_Cell_Text;
Integer DRF_table_edit_cell(Integer rn, Integer cn, Real cc, Element &e) L_DRF_Table_Edit_Cell_Real;
Integer DRF_table_edit_cell(Integer rn, Integer cn, Integer cc, Element &e) L_DRF_Table_Edit_Cell_Integer;


Integer DRF_get_leader_arrow(Element leader,Real &arrow_x,Real &arrow_y) L_DRF_Get_Leader_Arrow;
Integer DRF_get_leader_hook (Element leader,Real &hook_x ,Real &hook_y ) L_DRF_Get_Leader_Hook ;
Integer DRF_get_leader_text(Element leader,Text &leader_text) L_DRF_Get_Leader_Text;
Integer DRF_set_leader_hook_angle(Element leader, Real  hook_angle) L_DRF_Set_Leader_Hook_Angle;
Integer DRF_get_leader_hook_angle(Element leader, Real &hook_angle) L_DRF_Get_Leader_Hook_Angle;

Integer DRF_get_style (Element drf,Text &style) L_DRF_Get_Style ;


Integer DRF_table_get_number_row_column(Element e, Integer &nr, Integer &nc) L_DRF_Table_Get_Number_Row_Column;
Integer DRF_table_get_row_height(Element e, Integer row_number, Real &row_height) L_DRF_Table_Get_Row_Height;
Integer DRF_table_get_column_width(Element e, Integer col_number, Real &col_width) L_DRF_Table_Get_Column_Width;
Integer DRF_table_set_row_height(Element e, Integer row_number, Real row_height) L_DRF_Table_Set_Row_Height;
Integer DRF_table_set_column_width(Element e, Integer col_number, Real col_width) L_DRF_Table_Set_Column_Width;

Integer DRF_table_set_origin  (Element table, Real  x_origin, Real  y_origin) L_DRF_Table_Set_Origin;
Integer DRF_table_get_origin  (Element table, Real &x_origin, Real &y_origin) L_DRF_Table_Get_Origin;
Integer DRF_table_set_offset  (Element table, Real  x_offset, Real  y_offset) L_DRF_Table_Set_Offset;
Integer DRF_table_get_offset  (Element table, Real &x_offset, Real &y_offset) L_DRF_Table_Get_Offset;

Integer DRF_table_set_rotation(Element table, Real  rotation) L_DRF_Table_Set_Rotation;
Integer DRF_table_get_rotation(Element table, Real &rotation) L_DRF_Table_Get_Rotation;

Integer DRF_recalc(Element &e) L_DRF_Recalc;

Integer DRF_get_dimension_styles(Dynamic_Text &styles) L_DRF_Get_Dimension_Styles;
Integer DRF_get_leader_styles   (Dynamic_Text &styles) L_DRF_Get_Leader_Styles;
Integer DRF_get_table_styles    (Dynamic_Text &styles) L_DRF_Get_Table_Styles;

Integer DRF_get_override_names(Element drf, Integer &count, Dynamic_Text &names, Dynamic_Integer &types) L_DRF_Get_Override_Names;

Integer DRF_get_override_value(Element drf, Text name, Integer &value) L_DRF_Get_Override_Value_Integer;
Integer DRF_get_override_value(Element drf, Text name, Real    &value) L_DRF_Get_Override_Value_Real;
Integer DRF_get_override_value(Element drf, Text name, Text    &value) L_DRF_Get_Override_Value_Text;
Integer DRF_set_override_value(Element drf, Text name, Integer  value) L_DRF_Set_Override_Value_Integer;
Integer DRF_set_override_value(Element drf, Text name, Real     value) L_DRF_Set_Override_Value_Real;
Integer DRF_set_override_value(Element drf, Text name, Text     value) L_DRF_Set_Override_Value_Text;
Integer DRF_clear_overrides   (Element drf                           ) L_DRF_Clear_Overrides;

Integer DRF_table_style_property    (Text style_name, Text property_name, Integer &value) L_DRF_Table_Style_Property_Integer;
Integer DRF_table_style_property    (Text style_name, Text property_name, Real    &value) L_DRF_Table_Style_Property_Real;
Integer DRF_table_style_property    (Text style_name, Text property_name, Text    &value) L_DRF_Table_Style_Property_Text;
Integer DRF_dimension_style_property(Text style_name, Text property_name, Integer &value) L_DRF_Dimension_Style_Property_Integer;
Integer DRF_dimension_style_property(Text style_name, Text property_name, Real    &value) L_DRF_Dimension_Style_Property_Real;
Integer DRF_dimension_style_property(Text style_name, Text property_name, Text    &value) L_DRF_Dimension_Style_Property_Text;
Integer DRF_leader_style_property   (Text style_name, Text property_name, Integer &value) L_DRF_Leader_Style_Property_Integer;
Integer DRF_leader_style_property   (Text style_name, Text property_name, Real    &value) L_DRF_Leader_Style_Property_Real;
Integer DRF_leader_style_property   (Text style_name, Text property_name, Text    &value) L_DRF_Leader_Style_Property_Text;


// Trimesh calls

Integer Trimesh_number_of_points (Element e,Integer &npts) L_Trimesh_Number_of_Points;
Integer Trimesh_number_of_triangles (Element e,Integer &ntrs) L_Trimesh_Number_of_Triangles;
Integer Trimesh_number_of_edges(Element e,Integer &nedges) L_Trimesh_Number_of_Edges;
Integer Trimesh_get_point_coord (Element e,Integer point,Real &x,Real &y,Real &z) L_Trimesh_Get_Point_Coord;
Integer Trimesh_get_triangle_points (Element e,Integer triangle,Integer &p1,Integer &p2,Integer &p3) L_Trimesh_Get_Triangle_Points;
Integer Trimesh_get_triangle_points_coords (Element e,Integer triangle, Integer &p1, Integer &p2, Integer &p3, Real &x1, Real &y1, Real &z1, Real &x2, Real &y2, Real &z2, Real &x3, Real &y3, Real &z3) L_Trimesh_Get_Triangle_Points_Coords;
Integer Trimesh_get_triangle_edges(Element e,Integer triangle,Integer &e1,Integer &e2,Integer &e3) L_Trimesh_Get_Triangle_Edges;
Integer Trimesh_get_edge_triangles_points(Element e,Integer edge,Integer &triangles_count,Integer &triangle1,Integer &triangle2,Integer &vertex1,Integer &vertex2) L_Trimesh_Get_Edge_Triangles_Points;
Integer Is_trimesh(Element e) L_Is_Trimesh;
Integer Get_trimesh_centroid(Element element, Real &centroid_x, Real &centroid_y, Real &centroid_z) L_Get_Trimesh_Centroid;
Integer Get_trimesh_surface_area(Element element, Real &area) L_Get_Trimesh_Surface_Area;
Integer Trimesh_closed(Element element, Integer &is_closed) L_Trimesh_Closed;
Integer Form_trimesh_from_tin(Tin tin, Text mesh_name, Real mesh_offset, Real mesh_depth, Integer colour, Element &trimesh_out) L_Form_Trimesh_From_Tin;
Integer Trimesh_get_face_colour(Element e, Integer face, Integer &colour) L_Trimesh_Get_Face_Colour;
Integer Get_trimesh_volume(Element element, Real &v) L_Get_Trimesh_Volume;
Integer Form_trimeshes_from_element(Element e, Integer flags, Integer copy_attributes, Text name_prepost, Dynamic_Element &trimeshes_out) L_Form_Trimeshes_From_Element;
Integer Form_trimesh_from_polygons(Dynamic_Element polygons, Integer vertex_info, Integer edge_info, Integer face_info, Text mesh_name, Integer mesh_colour, Element &trimesh_out, Text &return_message) L_Form_Trimesh_From_Polygons;
Integer Form_trimeshes_from_tin(Tin tin, Text mesh_name, Real mesh_offset, Real mesh_depth, Integer colour, Dynamic_Element &trimeshes_out)  L_Form_Trimeshes_From_Tin;
Integer Form_trimesh_from_points(Dynamic_Real xyzs, Dynamic_Integer face_ix, Element &trimesh_out) L_Form_Trimesh_From_Points;
Integer Form_trimesh_from_points(Dynamic_Real xyzs, Dynamic_Integer face_ix, Dynamic_Integer colour_lists, Dynamic_Integer colour_ix, Element &trimesh_out) L_Form_Trimesh_From_Points_Colours;

Integer Trimesh_get_blend_factor(Element e, Real &blend_factor) L_Trimesh_Get_Blend_Factor;
Integer Trimesh_set_blend_factor(Element e, Real  blend_factor) L_Trimesh_Set_Blend_Factor;

Integer Trimesh_get_face_infos_count  (Element e, Integer &infos_count)                                               L_Trimesh_Get_Face_Infos_Count;
Integer Trimesh_get_face_info_by_index(Element e, Integer info_index,  Integer &colour, Text &name)                   L_Trimesh_Get_Face_Info_By_Index;
Integer Trimesh_set_face_info_by_index(Element e, Integer info_index,  Integer  colour, Text  name)                   L_Trimesh_Set_Face_Info_By_Index;
Integer Trimesh_append_face_info      (Element e,                      Integer  colour, Text  name)                   L_Trimesh_Append_Face_Info;
Integer Trimesh_get_face_info_index   (Element e, Integer face_number, Integer &info_index)                           L_Trimesh_Get_Face_Info_Index;
Integer Trimesh_set_face_info_index   (Element e, Integer face_number, Integer  info_index)                           L_Trimesh_Set_Face_Info_Index;
Integer Trimesh_set_face_infos_flags  (Element e, Dynamic_Integer colours, Dynamic_Text names, Dynamic_Integer flags) L_Trimesh_Set_Face_Infos_Flags;

Integer Trimesh_get_edge_infos_count  (Element e, Integer &infos_count)                                               L_Trimesh_Get_Edge_Infos_Count;
Integer Trimesh_get_edge_info_by_index(Element e, Integer info_index,  Integer &colour, Text &name)                   L_Trimesh_Get_Edge_Info_By_Index;
Integer Trimesh_set_edge_info_by_index(Element e, Integer info_index,  Integer  colour, Text  name)                   L_Trimesh_Set_Edge_Info_By_Index;
Integer Trimesh_append_edge_info      (Element e,                      Integer colour,  Text  name)                   L_Trimesh_Append_Edge_Info; 
Integer Trimesh_get_edge_info_index   (Element e, Integer edge_number, Integer &info_index)                           L_Trimesh_Get_Edge_Info_Index;
Integer Trimesh_set_edge_info_index   (Element e, Integer edge_number, Integer  info_index)                           L_Trimesh_Set_Edge_Info_Index;
Integer Trimesh_set_edge_infos_flags  (Element e, Dynamic_Integer colours, Dynamic_Text names, Dynamic_Integer flags) L_Trimesh_Set_Edge_Infos_Flags; 
 
Integer Trimesh_drop_point_3d(
    Element trimesh, Real point_x, Real point_y, Real point_z, 
    Integer &vert_ix, Real &vert_o, Real &vert_dr_x, Real &vert_dr_y, Real &vert_dr_z,
    Integer &edge_ix, Real &edge_o, Real &edge_dr_x, Real &edge_dr_y, Real &edge_dr_z,
    Integer &face_ix, Real &face_o, Real &face_dr_x, Real &face_dr_y, Real &face_dr_z
  ) L_Trimesh_Drop_Point_3D; 
 
// sections through a trimesh

Integer Trimesh_section(
    Element         trimesh, 
    Real            point_x, 
    Real            point_y, 
    Real            point_z, 
    Real            point_direction,
    Real            point_grade,
    Real            width, 
    Real            height,
    Integer         &internal_return, 
    Integer         &result_closed,
    Integer         &size_section_points,
    Dynamic_Real    &section_xs,         
    Dynamic_Real    &section_ys,         
    Dynamic_Real    &section_world_xs,   
    Dynamic_Real    &section_world_ys,   
    Dynamic_Real    &section_world_zs,   
    Dynamic_Integer &section_edge_indexes,   
    Dynamic_Text    &section_edge_names,    
    Dynamic_Integer &section_edge_colours,    
    Dynamic_Integer &section_vertex_indexes, 
    Dynamic_Text    &section_vertex_names,  
    Dynamic_Integer &section_vertex_colours  
) L_Trimesh_Section;

Integer Trimesh_edit_set_vertex     (Element e,Integer i,Real x,Real y,Real z,Text &error)               L_Trimesh_Edit_Set_Vertex       ;
Integer Trimesh_edit_move_vertex    (Element e,Integer i,Real dx,Real dy,Real dz,Text &error)            L_Trimesh_Edit_Move_Vertex      ;
Integer Trimesh_edit_move_edge      (Element e,Integer i,Real dx,Real dy,Real dz,Text &error)            L_Trimesh_Edit_Move_Edge        ;
Integer Trimesh_edit_move_face      (Element e,Integer i,Real dx,Real dy,Real dz,Text &error)            L_Trimesh_Edit_Move_Face        ;
Integer Trimesh_edit_move_vertices  (Element e,Dynamic_Integer is,Real dx,Real dy,Real dz,Text &error)   L_Trimesh_Edit_Move_Vertices    ;
Integer Trimesh_edit_move_vertices  (Element e,Real dx,Real dy,Real dz,Text &error)                      L_Trimesh_Edit_Move_Vertices_All;
Integer Trimesh_edit_hide_vertex    (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Hide_Vertex      ;
Integer Trimesh_edit_hide_edge      (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Hide_Edge        ;
Integer Trimesh_edit_hide_face      (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Hide_Face        ;
Integer Trimesh_edit_hide_vertices  (Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Hide_Vertices    ;
Integer Trimesh_edit_hide_edges     (Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Hide_Edges       ;
Integer Trimesh_edit_hide_faces     (Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Hide_Faces       ;
Integer Trimesh_edit_remove_vertex  (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Remove_Vertex    ;
Integer Trimesh_edit_remove_edge    (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Remove_Edge      ;
Integer Trimesh_edit_remove_face    (Element e,Integer i,Text &error)                                    L_Trimesh_Edit_Remove_Face      ;
Integer Trimesh_edit_remove_vertices(Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Remove_Vertices  ;
Integer Trimesh_edit_remove_edges   (Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Remove_Edges     ;
Integer Trimesh_edit_remove_faces   (Element e,Dynamic_Integer is,Text &error)                           L_Trimesh_Edit_Remove_Faces     ;
Integer Trimesh_edit_add_vertex     (Element e,Real x,Real y,Real z,Text &error)                         L_Trimesh_Edit_Add_Vertex       ;
Integer Trimesh_edit_add_face       (Element e,Integer i,Integer j,Integer k,Text &error)                L_Trimesh_Edit_Add_Face         ;
Integer Trimesh_edit_split_edge     (Element e,Integer i,Real x,Real y,Real z,Text &error)               L_Trimesh_Edit_Split_Edge       ;


Integer Helmert_3d_Transform(Real rx, Real ry, Real rz,
                             Real scale,
                             Real tx, Real ty, Real tz,
                             Real ox, Real oy, Real oz,
                             Integer call_inverse,
                             Element &ele) L_Helmert_3d_Transform_Element;

Integer Helmert_3d_Transform(Real rx, Real ry, Real rz,
                             Real scale,
                             Real tx, Real ty, Real tz,
                             Real ox, Real oy, Real oz,
                             Integer call_inverse,
                             Dynamic_Element &ele) L_Helmert_3d_Transform_Elements;

Integer Helmert_3d_Transform(Real rx, Real ry, Real rz,
                             Real scale,
                             Real tx, Real ty, Real tz,
                             Real ox, Real oy, Real oz,
                             Integer call_inverse,
                             Real &x, Real &y, Real &z) L_Helmert_3d_Transform_XYZ;
                             
Integer Helmert_3d_Transform(Real rx, Real ry, Real rz,                             
                             Real scale,
                             Real tx, Real ty, Real tz,
                             Real ox, Real oy, Real oz,
                             Integer call_inverse,
                             Dynamic_Real &x, Dynamic_Real &y, Dynamic_Real &z) L_Helmert_3d_Transform_XYZs;


// 3d chainage calls
Integer Enable_3d (Element e) L_Enable_3D;
Integer Get_start_chainage_3d (Element e, Real &ch_3d) L_Get_Start_Chainage_3D;
Integer Get_end_chainage_3d (Element e, Real &ch_3d) L_Get_End_Chainage_3D;
Integer Get_3d_length (Element e, Real &len) L_Get_3D_Length;
Integer Chainage_2d_to_3d (Element e, Real ch_2d, Real &ch_3d) L_Chainage_2D_To_3D;
Integer Chainage_3d_to_2d (Element e, Real ch_3d, Real &ch_2d) L_Chainage_3D_To_2D;
Integer Get_position_ex_3d (Element e, Real ch_3d, Real offset, Real dz, Real &x, Real &y, Real &z, Real &dir, Real &radius, Real &grade) L_Get_Position_Ex_3D;
Integer Drop_point_3d (Element e, Real xd, Real yd, Real zd, Real &x, Real &y, Real &z, Real &l, Real &o, Real &dir, Real &radius, Real &grade) L_Drop_Point_3D;
Integer Get_position_3d(Element string, Real ch_3d, Real offset, Real dz, Real &x, Real &y, Real &z, Real &dir, Real &radius, Real &grade) L_Get_Position_3D;


Integer Tunnel_profile_3d(
  Element          ref_str            ,         //  0
  Text             tunnel_def         ,         //  1
  Dynamic_Real     point_x            ,         //  2
  Dynamic_Real     point_y            ,         //  3
  Dynamic_Real     point_z            ,         //  4
  Dynamic_Text    &e_tun_ele_name     ,         //  5
  Dynamic_Integer &e_tun_ele_idx      ,         //  6
  Dynamic_Real    &e_tun_ele_dist     ,         //  7
  Dynamic_Real    &e_tun_ele_per      ,         //  8
  Dynamic_Real    &e_tun_ele_dir      ,         //  9
  Dynamic_Real    &e_tun_ele_prev_dir ,         // 10
  Dynamic_Real    &e_tun_ele_next_dir ,         // 11
  Dynamic_Real    &e_tun_ele_radius   ,         // 12
  Dynamic_Real    &e_tun_ele_os       ,         // 13
  Dynamic_Real    &e_tun_prf_ch       ,         // 14
  Dynamic_Real    &e_ex               ,         // 15
  Dynamic_Real    &e_ey               ,         // 16
  Dynamic_Real    &e_ez               ,         // 17
  Dynamic_Integer &pd_status_3d       ,         // 18
  Dynamic_Integer &pd_status_2d       ,         // 19
  Dynamic_Real    &pd_dist_3d         ,         // 20
  Dynamic_Real    &pd_dist_2d         ,         // 21
  Dynamic_Real    &pd_sqr_vt_ch       ,         // 22
  Dynamic_Real    &pd_plm_vt_ch       ,         // 23
  Dynamic_Real    &pd_sqr_hz_ch       ,         // 24
  Dynamic_Real    &pd_plm_hz_ch       ,         // 25
  Dynamic_Real    &pd_ref_ch          ,         // 26
  Dynamic_Real    &pd_sqr_zd          ,         // 27
  Dynamic_Real    &pd_sqr_di          ,         // 28
  Dynamic_Real    &pd_plm_zd          ,         // 29
  Dynamic_Real    &pd_ref_zd          ,         // 30
  Dynamic_Real    &pd_plm_os          ,         // 31
  Dynamic_Real    &pd_sqr_os          ,         // 32
  Dynamic_Real    &pd_ref_os          ,         // 33
  Dynamic_Real    &pd_cl_grd          ,         // 34
  Text            &message                      // 35
) L_Tunnel_Profile_3D_Ex;

Integer Tunnel_profile_3d(
  Element          ref_str            ,        //  0
  Text             tunnel_def         ,        //  1
  Dynamic_Real     point_x            ,        //  2
  Dynamic_Real     point_y            ,        //  3
  Dynamic_Real     point_z            ,        //  4
  Dynamic_Text    &e_tun_ele_name     ,        //  5
  Dynamic_Integer &e_tun_ele_idx      ,        //  6
  Dynamic_Real    &e_tun_ele_dist     ,        //  7
  Dynamic_Real    &e_tun_ele_per      ,        //  8
  Dynamic_Real    &e_tun_ele_radius   ,        //  9
  Dynamic_Real    &e_tun_ele_os       ,        // 10
  Dynamic_Real    &e_tun_prf_ch       ,        // 11
  Dynamic_Real    &e_ex               ,        // 12
  Dynamic_Real    &e_ey               ,        // 13
  Dynamic_Real    &e_ez               ,        // 14
  Dynamic_Integer &pd_status_3d       ,        // 15
  Dynamic_Integer &pd_status_2d       ,        // 16
  Dynamic_Real    &pd_ref_ch          ,        // 17
  Text            &message                     // 18
) L_Tunnel_Profile_3D;

Integer Tunnel_profile_3d(
  Element          ref_str            ,         //  0
  Text             tunnel_def         ,         //  1
  Element          trimesh            ,         //  2
  Real             inner_extent       ,         //  3
  Real             outer_extent       ,         //  4
  Dynamic_Real     point_x            ,         //  5
  Dynamic_Real     point_y            ,         //  6
  Dynamic_Real     point_z            ,         //  7
  Dynamic_Text    &e_tun_ele_name     ,         //  8
  Dynamic_Integer &e_tun_ele_idx      ,         //  9
  Dynamic_Real    &e_tun_ele_dist     ,         // 10
  Dynamic_Real    &e_tun_ele_per      ,         // 11
  Dynamic_Real    &e_tun_ele_dir      ,         // 12
  Dynamic_Real    &e_tun_ele_prev_dir ,         // 13
  Dynamic_Real    &e_tun_ele_next_dir ,         // 14
  Dynamic_Real    &e_tun_ele_radius   ,         // 15
  Dynamic_Real    &e_tun_ele_os       ,         // 16
  Dynamic_Real    &e_tun_prf_ch       ,         // 17
  Dynamic_Real    &e_ex               ,         // 18
  Dynamic_Real    &e_ey               ,         // 19
  Dynamic_Real    &e_ez               ,         // 20
  Dynamic_Integer &pd_status_3d       ,         // 21
  Dynamic_Integer &pd_status_2d       ,         // 22
  Dynamic_Real    &pd_dist_3d         ,         // 23
  Dynamic_Real    &pd_dist_2d         ,         // 24
  Dynamic_Real    &pd_sqr_vt_ch       ,         // 25
  Dynamic_Real    &pd_plm_vt_ch       ,         // 26
  Dynamic_Real    &pd_sqr_hz_ch       ,         // 27
  Dynamic_Real    &pd_plm_hz_ch       ,         // 28
  Dynamic_Real    &pd_ref_ch          ,         // 29
  Dynamic_Real    &pd_sqr_zd          ,         // 30
  Dynamic_Real    &pd_sqr_di          ,         // 31
  Dynamic_Real    &pd_plm_zd          ,         // 32
  Dynamic_Real    &pd_ref_zd          ,         // 33
  Dynamic_Real    &pd_plm_os          ,         // 34
  Dynamic_Real    &pd_sqr_os          ,         // 35
  Dynamic_Real    &pd_ref_os          ,         // 36
  Dynamic_Real    &pd_cl_grd          ,         // 37
  Dynamic_Real    &trimesh_offset     ,         // 38
  Text            &message                      // 39
) L_Tunnel_Profile_3D_Trimesh_Ex;

Integer Tunnel_profile_3d(
  Element          ref_str            ,         //  0
  Text             tunnel_def         ,         //  1
  Element          trimesh            ,         //  2
  Real             inner_extent       ,         //  3
  Real             outer_extent       ,         //  4
  Dynamic_Real     point_x            ,         //  5
  Dynamic_Real     point_y            ,         //  6
  Dynamic_Real     point_z            ,         //  7
  Dynamic_Text    &e_tun_ele_name     ,         //  8
  Dynamic_Integer &e_tun_ele_idx      ,         //  9
  Dynamic_Real    &e_tun_ele_dist     ,         // 10
  Dynamic_Real    &e_tun_ele_per      ,         // 11
  Dynamic_Real    &e_tun_ele_radius   ,         // 12
  Dynamic_Real    &e_tun_ele_os       ,         // 13
  Dynamic_Real    &e_tun_prf_ch       ,         // 14
  Dynamic_Real    &e_ex               ,         // 15
  Dynamic_Real    &e_ey               ,         // 16
  Dynamic_Real    &e_ez               ,         // 17
  Dynamic_Integer &pd_status_3d       ,         // 18
  Dynamic_Integer &pd_status_2d       ,         // 19
  Dynamic_Real    &pd_ref_ch          ,         // 20
  Dynamic_Real    &trimesh_offset     ,         // 21
  Text            &message                      // 22
) L_Tunnel_Profile_3D_Trimesh;



// medial axis
Integer Medial_axis_polygon(Element element, Real &cx, Real &cy, Real &radius) L_Medial_Axis_Polygon;
Integer Medial_axis_polygon(Element element, Real &cx, Real &cy, Real &radius, Real radius_tolerance) L_Medial_Axis_Polygon_Radius_Tolerance;
Integer Get_polygon_centroid(Element polygon, Real &cx, Real &cy) L_Get_Polygon_Centroid;

// Sharing
Integer Share_status(Model m, Integer &is_share_out, Integer &is_share_in) L_Share_Status_Model;
Integer Share_status(Tin t , Integer &is_share_out, Integer &is_share_in) L_Share_Status_Tin;
Integer Share_status(Model m, Integer &is_share_out, Integer &is_share_in, Text &share_in_location) L_Share_Status_Model_Ex;
Integer Share_status(Tin t , Integer &is_share_out, Integer &is_share_in, Text &share_in_location) L_Share_Status_Tin_Ex;

// View favourite
Integer View_apply_favourite (View v, Text file_name, Text &return_message) L_View_Apply_Favourite;
Integer View_apply_position  (View v, Text file_name, Text &return_message) L_View_Apply_Position ;
Integer View_write_favourite_file (View view, Text favourite_name, Integer add_file_extension) L_View_Write_Favourite_File;
Integer View_write_position_file  (View view, Text position_name , Integer add_file_extension) L_View_Write_Position_File;
Integer View_favourite_file_exists(View view, Text favourite_name, Integer &exists) L_View_Favourite_File_Exists;
Integer View_position_file_exists (View view, Text position_name , Integer &exists) L_View_Position_File_Exists;

Integer Plan_area_signed(Element polygon,Real &area) L_Plan_Area_Signed;
Integer Set_boder_style(Textstyle_Data textdata,Integer  border_style) L_Set_Textstyle_Data_Border_Style;
Integer Get_border_style(Textstyle_Data textdata,Integer &border_style) L_Get_Textstyle_Data_Border_Style;
Integer Get_cad_controlbar(Text &name, Model &model, Integer &colour, Real &z, Text &linestyle, Real &weight, Integer &tinable) L_Get_Cad_Controlbar;


Integer Set_cad_controlbar(Text  name, Model  model, Integer  colour, Real  z, Text  linestyle, Real  weight, Integer  tinable) L_Set_Cad_Controlbar;
Integer Get_text_controlbar(Text &textstyle_name, Real &size) L_Get_Text_Controlbar;
Integer Set_text_controlbar(Text  textstyle_name, Real  size) L_Set_Text_Controlbar;
Integer Get_text_controlbar(Textstyle_Data &d) L_Get_Text_Controlbar_Full;
Integer Set_text_controlbar(Textstyle_Data  d) L_Set_Text_Controlbar_Full;
Integer Get_symbol_controlbar(Text &symbol_name, Real &size) L_Get_Symbol_Controlbar;
Integer Set_symbol_controlbar(Text  symbol_name, Real  size) L_Set_Symbol_Controlbar;
Integer Get_symbol_controlbar(Integer &use_flag, Text &symbol_name, Integer &colour, Real &size, Real &offset, Real &raise, Real &angle) L_Get_Symbol_Controlbar_Full;
Integer Set_symbol_controlbar(Integer  use_flag, Text  symbol_name, Integer  colour, Real  size, Real  offset, Real  raise, Real  angle) L_Set_Symbol_Controlbar_Full;
Integer Get_pipe_controlbar(Integer &shape, Integer &justify, Real &size1, Real &size2) L_Get_Pipe_Controlbar;
Integer Set_pipe_controlbar(Integer  shape, Integer  justify, Real  size1, Real  size2) L_Set_Pipe_Controlbar;
Integer Get_attributes_controlbar(Attributes &att) L_Get_Attributes_Controlbar;
Integer Set_attributes_controlbar(Attributes  att) L_Set_Attributes_Controlbar;







// **************************************************************************************
// DRAINAGE FUNCTIONS NOT IMPLIMENTED - NEVER
// **************************************************************************************

 Integer __Drainage_000001__() L_Get_Drainage_Pipe_Number_Of_Pegs;
 Integer __Drainage_000002__() L_Get_Drainage_Pipe_Peg;
 Integer __Drainage_000003__() L_Set_Drainage_Pipe_Peg;
 Integer __Drainage_000004__() L_Set_Drainage_Pipe_Pegs;
 Integer __Drainage_000005__() L_Get_Drainage_Pipe_Pegs;

// ******************************************************************************************
// Synergy functions - not implemented yet - coming at a later date
// ******************************************************************************************

Integer Synergy_connect(Text server, Text &err) L_Synergy_Connect;
Integer Synergy_connect(Text server, Text user, Text password, Text &err) L_Synergy_Connect_With_Credentials;
Integer Synergy_add_file(Text job, Text folder, Text local_file_path, Integer new_version_if_exists, Integer prompt_for_file_attributes, Text path_to_refs_file, Dynamic_Text &file_attribs, Dynamic_Text &change_attribs, Text &err) L_Synergy_Add_File;
Integer Synergy_add_files(Text job, Text folder, Text path_to_files, Text &err) L_Synergy_Add_Files;
Integer Synergy_cancel_checkout(Text job, Text entity_path, Text &err) L_Synergy_Cancel_Checkout;
Integer Synergy_check_in(Text job, Text path_to_entity, Dynamic_Text &file_attribs, Dynamic_Text &change_attribs, Text &err) L_Synergy_Check_In;
Integer Synergy_check_in(Text job, Text path_to_entity, Text from_local_file, Dynamic_Text &file_attribs, Dynamic_Text &change_attribs, Text &err) L_Synergy_Check_In_From_Local_File;
Integer Synergy_build_attribute_text(Text attribute_name, Text attribute_value, Dynamic_Text &attribute_list, Text &err) L_Synergy_Create_Attribute_Helper;
Integer Synergy_check_out(Text job, Text path_to_entity, Integer perform_download, Text &err) L_Synergy_Check_Out;
Integer Synergy_create_folder(Text job, Text name, Integer managed, Text &err) L_Synergy_Create_Root_Folder;
Integer Synergy_create_folder(Text job, Text parent_folder, Text name, Integer managed, Text &err) L_Synergy_Create_Folder;
Integer Synergy_create_job(Text parent, Text name, Text description, Text path_to_template_job, Dynamic_Text &attributes, Text &err) L_Synergy_Create_Sub_Job;
Integer Synergy_create_job(Text name, Text description, Text path_to_template_job, Dynamic_Text &attributes, Text &err) L_Synergy_Create_Job;
Integer Synergy_create_td_project(Text job, Text name, Text description, Integer upload, Text version_name, Dynamic_Text &attributes, Text &err) L_Synergy_Create_TD_Project;
Integer Synergy_create_td_project(Text job, Text name, Text folder_path, Text description, Integer upload, Text version_name, Dynamic_Text &attributes, Text &err) L_Synergy_Create_TD_Project_With_Folder;
Integer Synergy_edit_folder(Text job, Text folder_path, Text name, Integer is_managed, Dynamic_Text &attributes, Text &err) L_Synergy_Edit_Folder;
Integer Synergy_get(Text job, Text path_to_entity, Text &err) L_Synergy_Get_Latest;
Integer Synergy_get(Text job, Text path_to_entity, Integer version, Text &err) L_Synergy_Get_Version;
Integer Synergy_get_file_info(Text job, Text path, Attributes &attributes, Text &err) L_Synergy_Get_File_Info;
Integer Synergy_get_folder_info(Text job, Text path, Attributes &attributes, Text &err) L_Synergy_Get_Folder_Info;
Integer Synergy_get_workspace_path(Text job, Text path, Text &err) L_Synergy_Get_Workspace_Path;
Integer Synergy_prompt_for_job(Text &selected, Text &err) L_Synergy_Prompt_For_Job;
Integer Synergy_list(Text job, Integer include_deleted_files, Text &err) L_Synergy_List;
Integer Synergy_list(Text job, Text folder, Integer include_deleted_files, Text &err) L_Synergy_List_Folder;
Integer Synergy_open(Text job, Text path, Integer check_out, Text &err) L_Synergy_Open;
Integer Synergy_purge_file(Text job, Text path, Integer force) L_Synergy_Purge_File;
Integer Synergy_purge_folder(Text job, Text path, Integer force) L_Synergy_Purge_Folder;
Integer Synergy_purge_job(Text job, Integer force) L_Synergy_Purge_Job;
Integer Synergy_purge_td_project(Text job, Text path, Integer force) L_Synergy_Purge_TD_Project;

// **************************************************************************************
// PRIVATE FUNCTIONS - DO NOT DOCO (and never should be called)
// **************************************************************************************

 Integer Solve_dp2(Integer sections_no_elts,Integer max_index,
                   Real weight             ,Real max_angle     ,Real height_inc   ,Integer centre_line_fixed,
                   Real chainage[]         ,Real height_l[]    ,Real height_c[]   ,Real height_r[],
                   Integer steps           ,Integer stage_step ,
                   Real cost_table[]       ,Integer choice_i[] ,Integer choice_j[],
                   Real costs[]            ,Text file1_name    ,Message_Box message_box) L_Solve_DP2;

// phil's calls

 Integer Get_paving_cost_dp2(Element survey_string, Element prev_survey_string,
                             Integer section_strings_index,Integer prev_section_strings_index,Integer fall_strings,
                             Real height_l            ,
                             Real height_c            ,
                             Real height_r            ,
                             Real prev_height_l,
                             Real prev_height_c,
                             Real prev_height_r,
                             Real chainage            , Real prev_chainage,Real min_depth,Real min_crossfall,
                             Real left_xfall[]        , Real right_xfall[],
                             Integer left_min[]       , Integer right_min[],Real &area1,Real &area2)
                       L_Get_Paving_Cost_DP2;

 void __qvxzy_000001__() L_Element_Ctor;
 void __qvxzy_000002__() L_Element_Dtor;
 void __qvxzy_000003__() L_Element_Ctor2;
 void __qvxzy_000004__() L_Element_Assign;

 void __qvxzy_000005__() L_CCtor;
 void __qvxzy_000006__() L_CDtor;

 void __qvxzy_000007__() L_Element_List_Ctor;
 void __qvxzy_000008__() L_Element_List_Dtor;
 void __qvxzy_000009__() L_Element_List_Ctor2;
 void __qvxzy_000010__() L_Element_List_Assign;

 void __qvxzy_000011__() L_Menu_Ctor;
 void __qvxzy_000012__() L_Menu_Dtor;
 void __qvxzy_000013__() L_Menu_Ctor2;
 void __qvxzy_000014__() L_Menu_Assign;

 void __qvxzy_000015__() L_Text_List_Ctor;
 void __qvxzy_000016__() L_Text_List_Dtor;
 void __qvxzy_000017__() L_Text_List_Ctor2;
 void __qvxzy_000018__() L_Text_List_Assign;

 void __qvxzy_000019__() L_Line_Ctor;
 void __qvxzy_000020__() L_Line_Dtor;
 void __qvxzy_000021__() L_Line_Ctor2;
 void __qvxzy_000022__() L_Line_Assign;

 void __qvxzy_000023__() L_Arc_Ctor;
 void __qvxzy_000024__() L_Arc_Dtor;
 void __qvxzy_000025__() L_Arc_Ctor2;
 void __qvxzy_000026__() L_Arc_Assign;

 void __qvxzy_000027__() L_Segment_Ctor;
 void __qvxzy_000028__() L_Segment_Dtor;
 void __qvxzy_000029__() L_Segment_Ctor2;
 void __qvxzy_000030__() L_Segment_Assign;

 void __qvxzy_000031__() L_File_Ctor;
 void __qvxzy_000032__() L_File_Dtor;
 void __qvxzy_000033__() L_File_Ctor2;
 void __qvxzy_000034__() L_File_Assign;

 void __qvxzy_000035__() L_View_Ctor;
 void __qvxzy_000036__() L_View_Dtor;
 void __qvxzy_000037__() L_View_Ctor2;
 void __qvxzy_000038__() L_View_Assign;

 void __qvxzy_000039__() L_Point_Ctor;
 void __qvxzy_000040__() L_Point_Dtor;
 void __qvxzy_000041__() L_Point_Ctor2;
 void __qvxzy_000042__() L_Point_Assign;

 void __qvxzy_000043__() L_Points_Angles_Intersect_Extended;

 void __qvxzy_000044__() L_Element_to_Element_List;
 void __qvxzy_000045__() L_Model_to_Element_List;

 void __qvxzy_000046__() L_Point_to_Segment;
 void __qvxzy_000047__() L_Line_to_Segment;
 void __qvxzy_000048__() L_Arc_to_Segment;

 void __qvxzy_000049__() L_Create_Arc_Centre_Radius_Start_End;

 void __qvxzy_000050__() L_Tin_to_Element;

 void __qvxzy_000061__() L_Widget_Ctor;
 void __qvxzy_000062__() L_Widget_Dtor;
 void __qvxzy_000063__() L_Widget_Ctor2;
 void __qvxzy_000064__() L_Widget_Assign;
 void __qvxzy_000065__() L_Widget_Cast;

 void __qvxzy_000066__() L_Map_File_Ctor;
 void __qvxzy_000067__() L_Map_File_Dtor;
 void __qvxzy_000068__() L_Map_File_Ctor2;
 void __qvxzy_000069__() L_Map_File_Assign;

 void __qvxzy_000070__() L_Function_Ctor;
 void __qvxzy_000071__() L_Function_Dtor;
 void __qvxzy_000072__() L_Function_Ctor2;
 void __qvxzy_000073__() L_Function_Assign;
 void __qvxzy_000074__() L_Function_Cast;

 void __qvxzy_000075__() L_Undo_Ctor;
 void __qvxzy_000076__() L_Undo_Dtor;
 void __qvxzy_000077__() L_Undo_Ctor2;
 void __qvxzy_000078__() L_Undo_Assign;

 void __qvxzy_000079__() L_Undo_List_Ctor;
 void __qvxzy_000080__() L_Undo_List_Dtor;
 void __qvxzy_000081__() L_Undo_List_Ctor2;
 void __qvxzy_000082__() L_Undo_List_Assign;

 void __qvxzy_000083__() L_Textstyle_Data_Ctor;
 void __qvxzy_000084__() L_Textstyle_Data_Dtor;
 void __qvxzy_000085__() L_Textstyle_Data_Ctor2;
 void __qvxzy_000086__() L_Textstyle_Data_Assign;

 void __qvxzy_000087__() L_SDR_Attribute_Ctor;
 void __qvxzy_000088__() L_SDR_Attribute_Dtor;
 void __qvxzy_000089__() L_SDR_Attribute_Ctor2;
 void __qvxzy_000090__() L_SDR_Attribute_Assign;

 void __qvxzy_000091__() L_Integer_List_Ctor;
 void __qvxzy_000092__() L_Integer_List_Dtor;
 void __qvxzy_000093__() L_Integer_List_Ctor2;
 void __qvxzy_000094__() L_Integer_List_Assign;

 void __qvxzy_000095__() L_Real_List_Ctor;
 void __qvxzy_000096__() L_Real_List_Dtor;
 void __qvxzy_000097__() L_Real_List_Ctor2;
 void __qvxzy_000098__() L_Real_List_Assign;

 void __qvxzy_000099__() L_Spiral_Ctor;
 void __qvxzy_000100__() L_Spiral_Dtor;
 void __qvxzy_000101__() L_Spiral_Ctor2;
 void __qvxzy_000102__() L_Spiral_Assign;
 void __qvxzy_000103__() L_Spiral_to_Segment;

 void __qvxzy_000104__() L_Parabola_Ctor;
 void __qvxzy_000105__() L_Parabola_Dtor;
 void __qvxzy_000106__() L_Parabola_Ctor2;
 void __qvxzy_000107__() L_Parabola_Assign;
 void __qvxzy_000108__() L_Parabola_to_Segment;

 void __qvxzy_000109__() L_Uid_Ctor;
 void __qvxzy_000110__() L_Uid_Dtor;
 void __qvxzy_000111__() L_Uid_Ctor2;
 void __qvxzy_000112__() L_Uid_Assign;

 void __qvxzy_000113__() L_Attributes_Ctor;
 void __qvxzy_000114__() L_Attributes_Dtor;
 void __qvxzy_000115__() L_Attributes_Ctor2;
 void __qvxzy_000116__() L_Attributes_Assign;

 void __qvxzy_000117__() L_Equality_Info_Ctor;
 void __qvxzy_000118__() L_Equality_Info_Dtor;
 void __qvxzy_000119__() L_Equality_Info_Ctor2;
 void __qvxzy_000120__() L_Equality_Info_Assign;

 void __qvxzy_000121__() L_Equality_Label_Ctor;
 void __qvxzy_000122__() L_Equality_Label_Dtor;
 void __qvxzy_000123__() L_Equality_Label_Ctor2;
 void __qvxzy_000124__() L_Equality_Label_Assign;

 void __qvxzy_000125__() L_XML_Document_Ctor;
 void __qvxzy_000126__() L_XML_Document_Dtor;
 void __qvxzy_000127__() L_XML_Document_Ctor2;
 void __qvxzy_000128__() L_XML_Document_Assign;

 void __qvxzy_000129__() L_XML_Node_Ctor;
 void __qvxzy_000130__() L_XML_Node_Dtor;
 void __qvxzy_000131__() L_XML_Node_Ctor2;
 void __qvxzy_000132__() L_XML_Node_Assign;

 void __qvxzy_000133__() L_Plot_Parameter_File_Ctor;
 void __qvxzy_000134__() L_Plot_Parameter_File_Dtor;
 void __qvxzy_000135__() L_Plot_Parameter_File_Ctor2;
 void __qvxzy_000136__() L_Plot_Parameter_File_Assign;


 void __qvxzy_000137__() L_Connection_Ctor;
 void __qvxzy_000138__() L_Connection_Dtor;
 void __qvxzy_000139__() L_Connection_Ctor2;
 void __qvxzy_000140__() L_Connection_Assign;

 void __qvxzy_000141__() L_Transaction_Ctor;
 void __qvxzy_000142__() L_Transaction_Dtor;
 void __qvxzy_000143__() L_Transaction_Ctor2;
 void __qvxzy_000144__() L_Transaction_Assign;

 void __qvxzy_000145__() L_Database_Result_Ctor;
 void __qvxzy_000146__() L_Database_Result_Dtor;
 void __qvxzy_000147__() L_Database_Result_Ctor2;
 void __qvxzy_000148__() L_Database_Result_Assign;

 void __qvxzy_000149__() L_Query_Condition_Ctor;
 void __qvxzy_000150__() L_Query_Condition_Dtor;
 void __qvxzy_000151__() L_Query_Condition_Ctor2;
 void __qvxzy_000152__() L_Query_Condition_Assign;

 void __qvxzy_000153__() L_Parameter_Collection_Ctor;
 void __qvxzy_000154__() L_Parameter_Collection_Dtor;
 void __qvxzy_000155__() L_Parameter_Collection_Ctor2;
 void __qvxzy_000156__() L_Parameter_Collection_Assign;

 void __qvxzy_000157__() L_Database_Query_Ctor;
 void __qvxzy_000158__() L_Database_Query_Dtor;
 void __qvxzy_000159__() L_Database_Query_Ctor2;
 void __qvxzy_000160__() L_Database_Query_Assign;

 void __qvxzy_000161__() L_Tree_Page_Ctor;
 void __qvxzy_000162__() L_Tree_Page_Dtor;
 void __qvxzy_000163__() L_Tree_Page_Ctor2;
 void __qvxzy_000164__() L_Tree_Page_Assign;

 void __qvxzy_000165__() L_Process_Handle_Ctor;
 void __qvxzy_000166__() L_Process_Handle_Dtor;
 void __qvxzy_000167__() L_Process_Handle_Ctor2;
 void __qvxzy_000168__() L_Process_Handle_Assign;

 void __qvxzy_000169__() L_Log_Line_Ctor;
 void __qvxzy_000170__() L_Log_Line_Dtor;
 void __qvxzy_000171__() L_Log_Line_Ctor2;
 void __qvxzy_000172__() L_Log_Line_Assign;

 void __qvxzy_000173__() L_Function_Property_Collection_Ctor;
 void __qvxzy_000174__() L_Function_Property_Collection_Dtor;
 void __qvxzy_000175__() L_Function_Property_Collection_Ctor2;
 void __qvxzy_000176__() L_Function_Property_Collection_Assign;

 void __qvxzy_000177__() L_Curve_Ctor;
 void __qvxzy_000178__() L_Curve_Dtor;
 void __qvxzy_000179__() L_Curve_Ctor2;
 void __qvxzy_000180__() L_Curve_Assign;
 void __qvxzy_000181__() L_Curve_to_Segment;

 void __qvxzy_000182__() L_Drainage_Network_Ctor;
 void __qvxzy_000183__() L_Drainage_Network_Dtor;
 void __qvxzy_000184__() L_Drainage_Network_Ctor2;
 void __qvxzy_000185__() L_Drainage_Network_Assign;

 void __qvxzy_000186__() L_Guid_Ctor;
 void __qvxzy_000187__() L_Guid_Dtor;
 void __qvxzy_000188__() L_Guid_Ctor2;
 void __qvxzy_000189__() L_Guid_Assign;
  
 void __qvxzy_000190__() L_Attribute_Blob_Ctor;
 void __qvxzy_000191__() L_Attribute_Blob_Dtor;
 void __qvxzy_000192__() L_Attribute_Blob_Ctor2;
 void __qvxzy_000193__() L_Attribute_Blob_Assign;

