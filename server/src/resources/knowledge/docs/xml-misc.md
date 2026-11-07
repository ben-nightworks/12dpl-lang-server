# XML, Map File, Project Settings, and Macro Console

> Source: 12d Model Macro Manual §5.56–§5.60 (pages 898–934)

---

## Creating Valid Names (§5.56)

Functions to validate and sanitise names for strings, models, TINs, attributes, linestyles,
symbols, and attribute paths. Illegal characters are replaced with spaces; leading/trailing
spaces are removed. The return value indicates substitutions made (0 = no changes).

Creating Valid Names
5.56 Creating Valid Names

### `Valid_string_name`

```c
Integer Valid_string_name(Text old_name,Text &valid_name)
```

Convert the Text old_name to a valid string name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2277

### `Valid_model_name`

```c
Integer Valid_model_name(Text old_name,Text &valid_name)
```

Convert the Text old_name to a valid model name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2278

### `Valid_tin_name`

```c
Integer Valid_tin_name(Text old_name,Text &valid_name)
```

Convert the Text old_name to a valid tin name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2279

### `Valid_attribute_name`

```c
Integer Valid_attribute_name(Text old_name,Text &valid_name)
```

Convert the Text old_name to a valid attribute name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. Creating Valid Names A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2280

### `Valid_attribute_path`

```c
Integer Valid_attribute_path(Text old_path,Text &valid_path)
```

Convert the Text old_path to a valid attribute path by substituting spaces for any illegal characters in old_path. The new path is returned in valid_path. The function returns one if all the characters in the old_path are valid; no substituting needed. The function returns two if the old_path contains mixture of valid and invalid characters . The function returns three if all the characters in the old_path are invalid or spaces.

> ID = 3722

### `Valid_attribute_xpath`

```c
Integer Valid_attribute_xpath(Text old_path,Text &valid_path)
```

Convert the Text old_path to a valid attribute path with potentially array syntax by substituting spaces for any illegal characters in old_path. The new path is returned in valid_path. The function returns one if all the characters in the old_path are valid; no substituting needed. The function returns two if the old_path contains mixture of valid and invalid characters . The function returns three if all the characters in the old_path are invalid or spaces. The function returns four if the path containing any invalid array syntax.

> ID = 3723

### `Valid_linestyle_name`

```c
Integer Valid_linestyle_name(Text old_name,Text &valid_name)
```

Convert the Text old_name to a valid linestyle name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2281

### `Valid_symbol_name`

```c
Integer Valid_symbol_name(Text old_name,Text &valid_name) Creating Valid Names
```

Convert the Text old_name to a valid symbol name by substituting spaces for any illegal characters in old_name; leading and trailing spaces in the new name also being removed. The new name is returned in valid_name. A function return the number of characters being substitued if there is no leading nor trailing spaces being removed.

> ID = 2282


---

## XML (§5.57)

The XML macro calls allow reading and writing XML files from 12dPL in a DOM-based manner.
Effective for small-to-medium XML files; very large files may not be supported.

`XML_Document` is the root container. `XML_Node` represents an individual element node.

For more information on the XML standard: <http://www.w3.org/XML/>

XML
5.57 XML
The XML macro calls allow the user to read or write xml files from 12dPL in a DOM based manner. 
This will be effective for small to mid size XML files, but very large XML files may not be supported.
For more information on the XML standard, see http://www.w3.org/XML/

### `Create_XML_document`

```c
XML_Document Create_XML_document()
```

This call creates a new XML document. This is the entry point for all macro code that works with XML. Existing files can then be read into the document, or the code may start to build up nodes into the document.

> ID = 2436

### `Read_XML_document`

```c
Integer Read_XML_document(XML_Document doc,Text file)
```

Reads the supplied file and loads the nodes into the supplied XML Document object. Returns 0 if successful.

> ID = 2419

### `Write_XML_document`

```c
Integer Write_XML_document(XML_Document doc,Text file)
```

Writes the supplied XML Document to the given file name. Returns 0 if successful.

> ID = 2420

Get_XML_declaration(XML_Document doc,Text &version,Text &encoding,     
Integer &standalone)
Name
Integer Get_XML_declaration(XML_Document doc,Text &version,Text &encoding,Integer &standalone)
Description
Finds and returns the values from the XML declaration in the given document. Not all documents 
may contain XML declarations.
Returns 0 if successful.
ID = 2437

XML
Set_XML_declaration(XML_Document doc,Text version,Text encoding,
    Integer standalone)
Name
Integer Set_XML_declaration(XML_Document doc,Text version,Text encoding,Integer standalone)
Description
This call sets the details for the XML declaration. If the document does not already contain an XML 
declaration, one will be added to the top of the document.
Returns 0 if successful.
ID = 2438

### `Create_node`

```c
XML_Node Create_node(Text name)
```

This call creates a new XML node. This node can have its value set, or have other children nodes appended to it. It must also be either set as the root node (see Set_Root_Node) or appended to another node (see Append_Node) to become part of a document.

> ID = 2435

### `Get_root_node`

```c
Integer Get_root_node(XML_Document doc,XML_Node &node)
```

This call finds and retrieves the node at the root of the document. This is the top level node. If there is no root node, the call will return non 0. Returns 0 if successful.

> ID = 2421

### `Set_root_node`

```c
Integer Set_root_node(XML_Document,XML_Node &node)
```

This call sets the root node (the top level node) for the given document. There must be at most one root node in a document.

> ID = 2422

### `Set_root_node_final`

```c
Integer Set_root_node_final(XML_Document,XML_Node &node) XML
```

This call sets the root node (the top level node) for the given document.There must be at most one root node in a document. The final part in the name of this call indicates that after this call, further changes to the node will not affect the document.

> ID = 7855

### `Get_number_of_nodes`

```c
Integer Get_number_of_nodes(XML_Node node)
```

This call returns the number of children nodes for the given nodes. A node may contain 0 or more children.

> ID = 2423

### `Get_child_node`

```c
Integer Get_child_node(XML_Node node,Integer index,XML_Node &child_node)
```

This call retrieves the n'th child, as specified by index, of a parent node and stores it in the child_node argument. Returns 0 if successful.

> ID = 2424

### `Get_child_node`

```c
Integer Get_child_node(XML_Node node,Text name,XML_Node &child_node)
```

This call retrieves the first instance of a child of a parent node, by its name. If there is more than one element of the same name, this call will only return the first. The retrieved node will be stored in the child_node argument. This call will return 0 if successful.

> ID = 2439

### `Append_node`

```c
Integer Append_node(XML_Node parent,XML_Node new_node)
```

This call appends a child node to a parent node. A parent node may contain 0 or more children nodes. The new_node cannot already being a child of another node; if it is the call will fail with the return value 1. This call will return 0 if successful. XML

> ID = 2425

### `Append_node_final`

```c
Integer Append_node_final(XML_Node parent,XML_Node new_node)
```

This call appends a child node to a parent node. A parent node may contain 0 or more children nodes. The new_node cannot already being a child of another node; if it is the call will fail with the return value 1. The final part in the name of this call indicates that after this call, further changes to the node will not affect the parent. This call will return 0 if successful.

> ID = 7856

### `Remove_node`

```c
Integer Remove_node(XML_Node parent,Integer index)
```

This call removes the n'th child node, as given by index, from the supplied parent node. This call will return 0 if successful.

> ID = 2426

### `Get_parent_node`

```c
Integer Get_parent_node(XML_Node child,XML_Node &parent)
```

This call will find the parent node of the supplied child and store it in the parent argument. This call will return 0 if successful.

> ID = 2427

### `Get_next_sibling_node`

```c
Integer Get_next_sibling_node(XML_Node node,XML_Node &sibling)
```

Given a node, this call will retrieve the next sibling, or same level node. In the following example, Child2 is the next sibling of Child1. <Parent> <Child1/> <Child2/> </Parent> This call will return 0 if successful. XML

> ID = 2428

### `Get_prev_sibling_node`

```c
Integer Get_prev_sibling_node(XML_Node node,XML_Node &sibling)
```

Given a node, this call will retrieve the previous sibling, or same level node. In the following example, Child1 is the previous sibling of Child2. <Parent> <Child1/> <Child2/> </Parent> This call will return 0 if successful.

> ID = 2429

### `Get_node_name`

```c
Integer Get_node_name(XML_Node node,Text &name)
```

This call will retrieve the name of a supplied node and store it in the name argument. The name of a node is the value within the brackets or tags. In the following example, MyNode is the name of the node. <MyNode>1234</MyNode> This call will return 0 if successful.

> ID = 2433

### `Get_node_attribute`

```c
Integer Get_node_attribute(XML_Node node,Text name,Text &value)
```

This call will try find an attribute of given name belonging to the supplied node, and will store the value in the value attribute. In the following example, the data stored in value will be: MyAttributeData <MyNode MyAttribute="MyAttributeData" /> This call will return 0 if successful.

> ID = 2440

### `Set_node_attribute`

```c
Integer Set_node_attribute(XML_Node node,Text name,Text value)
```

This call will set the value of an attribute attached to a node. If it does not exist, the attribute will be XML created. This call will return 0 if successful.

> ID = 2441

### `Remove_node_attribute`

```c
Integer Remove_node_attribute(XML_Node node,Text name)
```

This call will attempt to remove a node of a given name from the supplied node. This call will return 0 if successful.

> ID = 2442

### `Is_text_node`

```c
Integer Is_text_node(XML_node &node)
```

This call will attempt to determine if a node is a text only node or not. A text node is one that contains only text, and no other child nodes. This call will return 1 if the node is a text node.

> ID = 2430

### `Is_cdata_text_node`

```c
Integer Is_cdata_text_node(XML_node &node)
```

This call will attempt to determine if a node is a CDATA text only node or not. A text node is one that contains only text, and no other child nodes. This call will return 1 if the node is a text node, and the text must be of CDATA format.

> ID = 7951

### `Get_node_text`

```c
Integer Get_node_text(XML_Node &node,Text &text)
```

This call will attempt to retrieve the internal text value of a text node and store it in text. A text node is one that contains only text, and no other child nodes. If the node is not a text node, the call will return -1. In the following example, the value of text will be set to MyText <MyNode>MyText</MyNode> XML This call will return 0 if successful.

> ID = 2431

### `Set_node_text`

```c
Integer Set_node_text(XML_Node &node,Text value)
```

This call will set the internal text of node to the value. A text node is one that contains only text, and no other child nodes. Note that the call only work if the node is already a text node, if the node is not a text node, the call will return -1. This call will return 0 if successful.

> ID = 2432

### `Create_text_node`

```c
XML_Node Create_text_node(Text name,Text value)
```

This call will create a new text node of the given name and set the internal text to the given value. This call will return the created node.

> ID = 2434

### `Create_cdata_text_node`

```c
XML_Node Create_cdata_text_node(Text name,Text value)
```

This call will create a new CDATA text node of the given name and set the internal CDATA text to the given value. This call will return the created node.

> ID = 7901

### `Create_metadata_node`

```c
XML_Node Create_metadata_node(Integer mode)
```

This call will create a new standard 12dxml metadata node. This call will return the created node.

> ID = 7755

Get_node_attributes(XML_Node node, Integer &attributes_count)

XML
Name
Integer Get_node_attributes(XML_Node node, Integer &attributes_count)
Description
Count the number of attributes attributes_count of an XML_Node node
A return value of zero indicates the function call was successful.
ID = 3056

### `Get_node_attributes`

```c
Integer Get_node_attributes(XML_Node node, Integer &attributes_count)
```

Count the number of attributes attributes_count of an XML_Node node A return value of zero indicates the function call was successful.

> ID = 3056

Get_node_attributes(XML_Node node, Integer &attributes_count, Dynamic_Text 
&names, Dynamic_Text &values)
Name
Integer Get_node_attributes(XML_Node node, Integer &attributes_count, Dynamic_Text &names, 
Dynamic_Text &values)
Description
Count the number of attributes attributes_count of an XML_Node node
Output the list of attribute names to names
Output the list of attribute values to values
A return value of zero indicates the function call was successful.
ID = 3057

### `Get_type`

```c
Integer Get_type(XML_Node &node,Integer &type)
```

Get the Integer type of an XML_Node node Possible type 0 DOCUMENT, 1 ELEMENT, 2 COMMENT, 3 UNKNOWN, 4 TEXT, 5 DECLARATION, A return value of zero indicates the function call was successful. XML

> ID = 7809

### `Write_XML_Document`

```c
Integer Write_XML_Document(XML_Document doc,File &file)
```

Write XML_Document doc to File file. A return value of -1 indicates the File file did not exist. A return value of -2 indicates the XML_Document doc did not exist. A return value of -3 indicates the XML_Document doc was not valid. A return value of -4 indicates the saving failed. A return value of zero indicates the function call was successful.

> ID = 2951

Write_XML(Model model,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_XML(Model model,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Description
Open the file called filename, and write the 12d XML of all the Elements in the Model model to the 
file. Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then write the name of model out to the file before the Elements.
If output_model_name = 0 then don’t write out the Model name.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Just for this macro call, there is an extra bit in the bool_flags of value 1048576. When this bit is on, 
then a valid 12D XML header and the corresponding closing tag will also be added to the output file 
to form a valid 12D XML file.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3199

### `XML_to_12da`

```c
Integer XML_to_12da(Text xml_filename,Text tda_filename)
```

From a given 12dXML file xml_filename, and write the equivalent 12d Ascii (12da) to a file tda_filename. A function return value of zero indicates the data was successfully written.

> ID = 3729

XML
Translate_XML_file(Text xml_filename,Text xslt_filename,Integer 
output_type,Integer decimal,Text output_filename)
Name
Integer Translate_XML_file(Text xml_filename,Text xslt_filename,Integer output_type,Integer decimal,Text 
output_filename)
Description
Translate a given XML report file xml_filename using the transformation given in a file 
xslt_filename; write the output to the file output_filename.
Integer output_file_type:
3 HTML; 
4 PDF; 
5 rich text format
6 text format
7 CSV
8 text report
If some Real to be convert to text in the output file, the number of decimal will be used
A function return value of zero indicates the data was successfully written.
ID = 3730

### `ADAC_get_xsd_path`

```c
Integer ADAC_get_xsd_path(Text version,Text &path)
```

Return the XSD path of ADAC version Integer version to Text path. A return value of zero indicates the function call was successful.

> ID = 2952

??? Wrong chapter 
XSD_get_type_enumerations(Text xsd,Text schema,Text frag_path,Dynamic_Text 
&enums,Text &elem_type) 
Name
Integer XSD_get_type_enumerations(Text xsd,Text schema,Text frag_path,Dynamic_Text &enums,Text 
&elem_type) 
Description
Get the enumerations for a simple or primitive type in the Text schema of file named Text xsd.
The list of enumerations is returned to Dynamic_Text enums.
The type of the enumeration list is returned to Text elem_types.
A return value of zero indicates the function call was successful.
The list of values for XSF primitive type
Text
Boolean

XML
Integer
Double
Float
Duration
Date_Time
Time
Date
ID = 2953
??? Wrong chapter


---

## Map File (§5.58)

Functions for working with 12d Model mapping files. A `Map_File` maps external string keys
to model/name/colour/linestyle/type information for data import or translation.

Map File
5.58 Map File

### `Map_file_create`

```c
Integer Map_file_create(Map_File &file)
```

Create a mapping file. The file unit is returned as Map_file file. A function return value of zero indicates the file was opened successfully.

> ID = 864

### `Map_file_open`

```c
Integer Map_file_open(Text file_name, Text prefix, Integer use_ptline,Map_File &file)
```

Open up a mapping file to read. The file unit is returned as Map_file file. The prefix of models is given as Text prefix. The string type is given as Integer use_ptline, 0 – point string 1 – line sting. A function return value of zero indicates the file was opened successfully.

> ID = 865

### `Map_file_close`

```c
Integer Map_file_close(Map_File file)
```

Close a mapping file. The file being closed is Map_file file. A function return value of zero indicates the file was closed successfully.

> ID = 866

### `Map_file_number_of_keys`

```c
Integer Map_file_number_of_keys(Map_File file,Integer &number)
```

Get the number of keys in a mapping file. The file is given as Map_file file. The number of keys is returned in Integer number. A function return value of zero indicates the number was returned successfully. Map File

> ID = 868

Map_file_add_key(Map_File file,Text key,Text name,Text model,Integer 
colour,Integer ptln,Text style)
Name
Integer Map_file_add_key(Map_File file,Text key,Text name,Text model,Integer colour,Integer ptln,Text style) 
Description
Add key to a mapping file. 
The file is given in Map_file file.
The key is given in Text key.
The string name is given in Text name.
The model name is given in Text model.
The string colour is given in Integer colour.
The string type is given in Integer ptln.
The string style is given in Text style.
A function return value of zero indicates the key was added successfully. 
 ID = 869
Map_file_get_key(Map_File file,Integer n,Text &key,Text &name,Text &model, 
Integer &colour,Integer &ptln,Text &style)
Name
Integer Map_file_get_key(Map_File file,Integer n,Text &key,Text &name,Text &model, Integer 
&colour,Integer &ptln,Text &style)
Description
Get nth key’s data from a mapping file. 
The file is given in Map_file file.
The key is returned in Text key.
The string name is returned in Text name.
The model name is returned in Text model.
The string colour is returned in Integer colour.
The string type is returned in Integer ptln.
The string style is returned in Text style.
A function return value of zero indicates the key was returned successfully. 
ID = 870

### `Map_file_find_key`

```c
Integer Map_file_find_key(Map_File file,Text key,Integer &number)
```

Find the record number from a mapping file that contains the given key. Map File The file unit is given in Map_file file. The record number is returned in Integer number. A function return value of zero indicates the key was find successfully.

> ID = 871


---

## Project Settings (§5.59)

Functions for reading and managing project settings files (`.12dsettings`).

> Note: Functions marked "internal 12D usage only" should be treated as read-only in user macros.

Project Setting
5.59 Project Setting

### `Read_project_settings_file`

```c
Integer Read_project_settings_file(Text project_settings_filename)
```

Read a project settings file (.12dsettings) into the current project. A function return value of zero indicates the file was read successfully.

> ID = 3731

### `Get_active_project_settings_profile`

```c
Integer Get_active_project_settings_profile(Text &active_profile_name)
```

Get the name active_profile_name for the active project settings profile of the current project. A function return value of zero indicates the function call was successful

> ID = 3732

### `Set_active_project_settings_profile`

```c
Integer Set_active_project_settings_profile(Text active_profile_name)
```

Set the profile of name active_profile_name as the active project settings profile of the current project. A function return value of zero indicates the function call was successful

> ID = 3733

### `Get_project_settings_profiles_count`

```c
Integer Get_project_settings_profiles_count() Description. A function return the number of project setting profiles of the current project. ID = 3734 Get_project_settings_profile_name(Integer profile_index,Text &profile_name) Name Integer Get_project_settings_profile_name(Integer profile_index,Text &profile_name) Project Setting Description. Get the profile_name of the project setting profile of given index profile_index in the current project. A function return value of zero indicates the function call was successful ID = 3735 All the calls below are for internal 12D usage only. Remove_project_setting(Text name) Name Integer Remove_project_setting(Text name)
```

A function return value of zero indicates the file was opened successfully.

> ID = 3545

### `Project_setting_exists`

```c
Integer Project_setting_exists(Text name)
```

A function return value of one indicates the setting exists; return zero otherwise.

> ID = 3546

### `Get_project_setting_integer`

```c
Integer Get_project_setting_integer(Text name)
```

> ID = 3547

### `Get_project_setting_real`

```c
Real Get_project_setting_real(Text name)
```

> ID = 3548

### `Get_project_setting_text`

```c
Text Get_project_setting_text(Text name)
```

> ID = 3549

Project Setting

### `Get_project_setting_colour`

```c
Integer Get_project_setting_colour(Text name)
```

> ID = 3551

### `Set_project_setting_integer`

```c
Integer Set_project_setting_integer(Text name,Integer value)
```

> ID = 3552

### `Set_project_setting_integer`

```c
Integer Set_project_setting_integer(Text name,Integer value)
```

> ID = 3552

### `Set_project_setting_real`

```c
Integer Set_project_setting_real(Text name,Real value)
```

> ID = 3553

### `Set_project_setting_text`

```c
Integer Set_project_setting_text(Text name,Text value)
```

> ID = 3554

### `Set_project_setting_colour`

```c
Integer Set_project_setting_colour(Text name,Integer value)
```

> ID = 3555

Set_project_setting_attributes(Text name,Attributes value)

Project Setting
Name
Integer Set_project_setting_attributes(Text name,Attributes value)
Description
ID = 3556

Project Setting


---

## Macro Console (§5.60)

Before Panels were introduced, the Macro Console was the primary user interaction method.
It provides three areas: information/error message, prompt message, and user reply,
plus optional Restart/Abort/Finish buttons.

> **Note:** The Macro Console is rarely used in newer macros. Prefer Panel-based UI.
>
> **WARNING:** Messages from one console call may be overwritten by the next before
> the user can read them.

Macro Console
Chapter   
5.60 Macro Console
Before Panels where introduced into the 12d Model Programming Language, a Macro Console 
was the only method for writing information to the user, and soliciting answers from the user.
Note: the Macro Console is rarely used in newer macros.
When a macro is invoked, a Macro Console is placed on the screen.
The Macro Console has three distinct areas
    information/error message area (or just information message area or error message area)
    prompt message area
    user reply area.
and optionally, three buttons, restart, abort and finish.
Using Macro Console functions, information can be written to the information/error message 
area and the prompt message area, and user input read in from the user reply area of the Macro 
Console.
Some of the functions have pop-ups defined (of models, tins etc.) so that information can be 
selected from pop-ups displayed by clicking  LB on the icon at the right hand end of the user reply 
area rather than being typed in by the user. Note that the icon at the right hand end of the user reply 
area changes depending on the type of Prompt.
The reply, either typed or selected from the icon popup, must be terminated by pressing the <Enter> 
key for the macro to continue.
Also the information/error message area is used to display progress information. This information 
can be standard 12dPL messages or user defined messages.
Note: Some functions also write information to the 12d Model Output Window.
WARNING: Because the Macro Console functions all use the same three areas for messages and 
input, messages from one Macro Console may be overwritten by the messages from the next Macro 
Console function before the user has a chance to see the message.
prompt message area
user reply area 
information/error
message area
icon to click on
to bring up 
choices to
select from

Macro Console

### `Set_message_mode`

```c
Integer Set_message_mode(Integer mode)
```

When macros are running, progress information can be displayed in the information/error message area. Most 12dPL computational intensive functions have standard messages that can be displayed. For example, when triangulating, regular messages showing the number of points triangulated can be displayed. Or the message running with the ticker character "/" rotating through 360 degrees. The user can have the standard 12dPL messages displayed, or replace them at any time by a user defined message (set using the function Set_message_text). If mode is set to 0 the user defined message 1 the standard 12dPL message is displayed in the information/error message area. A function return value of zero indicates the mode was successfully set.

> ID = 427

### `Set_message_text`

```c
void Set_message_text(Text msg)
```

Set the user defined information message to msg. This is a prefix for the ticker "/". When the message mode is set to 0 (using the function Set_message_mode), msg is displayed in the information/error message area. The message msg is followed by a rotating ticker (/) to indicate to the user that the macro is running. A function return value of zero indicates the message was successfully set.

> ID = 426

### `Prompt`

```c
void Prompt(Text msg)
```

Print the message msg to the prompt message area of the macro console. If another message is written to the prompt message area then the previous message will be prompt message area Macro Console Chapter overwritten by the new message.

> ID = 34

### `Prompt`

```c
Integer Prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then wait for the user to type text into the user reply area of the Macro Console. When <enter> is pressed then the text in the user reply area is returned in ret. That is, write out the message msg and get a Text ret from the Macro Console when the text is terminated by pressing <enter>. The reply is returned in Text ret. A function return value of zero indicates the text is returned successfully.

> ID = 28

### `Prompt`

```c
Integer Prompt(Text msg,Integer &ret)
```

Print the message msg to the prompt message area and then read back an Integer from the user reply area of the Macro Console. That is, write out the message msg and wait for an integer reply from the Macro Console. The reply is terminated by pressing <enter>. The reply is returned in Integer ret. A function return value of zero indicates that the Integer was returned successfully.

> ID = 26

### `Prompt`

```c
Integer Prompt(Text msg,Real &ret)
```

Print the message msg to the prompt message area and then read back a Real from the user reply area of the Macro Console. The reply is terminated by pressing <enter>. The reply is returned in Real ret. A function return value of zero indicates that the Real was returned successfully.

> ID = 27

### `Colour_prompt`

```c
Integer Colour_prompt(Text msg,Text &ret) Macro Console
```

Print the message msg to the prompt message area of the Macro Console and then read back text from the user reply area of the Macro Console as the name of a 12d Model colour. If LB is clicked on the colour choice icon at the right hand end of the user reply area, a list of all existing colours is placed in a pop-up. If a colour is selected from the pop -up (using LB), the colour name is written to the user reply area. The reply, either typed or selected from the colour pop-up, is then terminated by pressing <Enter>. If the text is a valid colour then a function return value of zero is returned and the colour name is returned in ret. If the text is not a valid colour name, then the message Error - invalid colour is written to the information message area and a non-zero function return value is returned. A function return value of zero indicates the Text ret is a valid colour name and is successfully returned. prompt message area user reply area colour choice icon information/error message area colour choice pop up information/error message area Macro Console Chapter

> ID = 404

### `Error_prompt`

```c
Integer Error_prompt(Text msg)
```

Print the message msg to the information/error message area of the Macro Console, and writes Press return to continue to the prompt message area and then waits for an <enter> in the user reply area before the macro continues. A function return value of zero indicates the function terminated successfully.

> ID = 419

### `Choice_prompt`

```c
Integer Choice_prompt(Text msg,Integer no_choices,Text choices[],Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the choice icon at the right hand end of the user reply area, user reply area, the list of text given in the Text array choices is placed in a pop-up. If one of the choices is selected from the pop-up (using LB), the choice is placed in the user reply area. The reply, either typed or selected from the choice pop-up, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the text is returned successfully.

> ID = 421

### `File_prompt`

```c
Integer File_prompt(Text msg,Text wild_card_key,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the folder icon at the right hand end of the user reply area, a list of all files in the current area which match the wild_card_key (for example, *.dat) is placed in a pop-up. If a file is information/error user reply area message area prompt message area Macro Console selected from the pop-up (using LB), the file name is placed in the user reply area. If a name is entered without a dot ending (e.g. fred and not fred.csv say) then the ending after the dot in the wild_card_key is automatically added to the name. For example, if wild_card_key = "*.rpt" and "fred" is type in as the file name, then ret will be returned as ret = "fred.rpt". The reply, either typed or selected from the file pop-up, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 405

### `Model_prompt`

```c
Integer Model_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the icon at the right hand end of the user reply area, a list of all existing models is placed in a pop-up. If a model is selected from the pop-up (using LB), the model name is placed in the user reply area. MB for "Same As" also applies. That is, If MB is clicked in the user reply area and then a string from a model on a view is selected, then the name of the model containing the selected string is written to the user reply area. The reply, either typed or selected from the model pop-up or Same As, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 401

### `Template_prompt`

```c
Integer Template_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. Click LB to on the icon to user reply area bring up the list of models msg written to prompt message area to select from Macro Console Chapter If LB is pressed on the icon at the right hand end of the user reply area, a list of all existing templates is placed in a pop-up. If a template is selected from the pop-up (using LB), the template name is placed in the user reply area. The reply, either typed or selected from the template popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the text is returned successfully.

> ID = 403

### `Tin_prompt`

```c
Integer Tin_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the tin icon at the right hand end of the user reply area, a list of all existing tins is placed in a pop-up. If a tin is selected from the pop-up (using LB), the Tin name is placed in the user reply area. The reply, either typed or selected from the Tin popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 402

### `Tin_prompt`

```c
Integer Tin_prompt(Text msg,Integer mode,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the tin icon at the right hand end of the user reply area, a list of all existing tins is placed in a pop-up. If a tin is selected from the pop-up (using LB), the Tin name is placed in the user reply area. The value of mode determines whether Super Tins are listed in the pop-up. Mode Description 0 Don’t list SuperTin. 1 List SuperTin. The reply, either typed or selected from the Tin pop-up, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 684

Macro Console

### `View_prompt`

```c
Integer View_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the view icon at the right hand end of the user reply area, a list of all existing views is placed in a pop-up. If a view is selected from the pop-up (using LB), the view name is placed in the user reply area. The reply, either typed or selected from the view popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 406

### `Yes_no_prompt`

```c
Integer Yes_no_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the choice icon at the right hand end of the user reply area, a yes/no pop-up is placed on the screen. If yes or no is selected from the pop-up (using LB), the selected test is placed in the user reply area. The reply, either typed or selected from the yes/no popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 420

### `Plotter_prompt`

```c
Integer Plotter_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the plotter icon at the right hand end of the user reply area, a list of all existing plotters is placed in a pop-up. If a plotter is selected from the pop-up (using LB), the plotter name is placed in the user reply area. The reply, either typed or selected from the plotter popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 817

Macro Console
Chapter

### `Sheet_size_prompt`

```c
Integer Sheet_size_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the choice icon at the right hand end of the user reply area, a list of all existing sheet sizes is placed in a pop-up. If a sheet size is selected from the pop-up (using LB), the sheet size name is placed in the user reply area. The reply, either typed or selected from the sheet_size popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 818

### `Linestyle_prompt`

```c
Integer Linestyle_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the linestyle icon at the right hand end of the user reply area, a list of all existing linestyles is placed in a pop-up. If a linestyle is selected from the pop-up (using LB), the linestyle name is placed in the user reply area. The reply, either typed or selected from the linestyle popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 819

### `Textstyle_prompt`

```c
Integer Textstyle_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the textstyle icon at the right hand end of the user reply area, a list of all existing textstyles is placed in a pop-up. If a textstyle is selected from the pop-up (using LB), the textstyle name is placed in the user reply area. The reply, either typed or selected from the textstyle popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. Macro Console A function return value of zero indicates the Text ret is returned successfully.

> ID = 820

### `Justify_prompt`

```c
Integer Justify_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the choice icon at the right hand end of the user reply area, a list of all existing justifications is placed in a pop-up. If a Justify is selected from the pop-up (using LB), the Justify name is placed in the user reply area. The reply, either typed or selected from the Justify popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 821

### `Angle_prompt`

```c
Integer Angle_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the angle icon at the right hand end of the user reply area, a list of Angle measure options is placed in a pop-up. If a Angle is selected from the pop-up (using LB), the Angle name is placed in the user reply area. The reply, either typed or selected from the Angle popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 822

### `Function_prompt`

```c
Integer Function_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the function icon at the right hand end of the user reply area, a list of all existing 12d Model Functions is placed in a pop-up. If a Function is selected from the pop-up (using LB), the Function name is placed in the user reply area. The reply, either typed or selected from the Function popup, must be terminated by pressing Macro Console Chapter <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 823

### `Project_prompt`

```c
Integer Project_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the icon at the right hand end of the user reply area, a list of all existing Projects in the folder is placed in a pop-up. If a Project is selected from the pop-up (using LB), the Project name is placed in the user reply area. The reply, either typed or selected from the Project popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 824

### `Directory_prompt`

```c
Integer Directory_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the folder icon at the right hand end of the user reply area, the Select Folder dialogue is opened. If a Folder is selected by clicking on it with LB and then clicking on the Select Folder button, the Folder name is placed in the user reply area. The reply, either typed or selected from the Select Folder dialogue, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 825

### `Text_units_prompt`

```c
Integer Text_units_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the choice icon at the right hand end of the user reply area, a list of all existing Text units is placed in a pop-up. If a Text_units is selected from the pop-up (using LB), the Text units Macro Console name is placed in the user reply area. The reply, either typed or selected from the Text_units popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 826

### `XYZ_prompt`

```c
Integer XYZ_prompt(Text msg,Real &x,Real &y,Real &z)
```

Print the message msg to the prompt message area and then read back what must be x-value y- value z- value with the values separated by one or more spaces. If LB is clicked on the pick icon at the right hand end of the user reply area, an XYZ pick is started and when a pick is made, the coordinates of the pick, separated by spaces, are written in the user reply area. The reply, either typed or selected from the Pick, must be terminated by pressing <Enter> for the macro to continue. The values are returned in x, y and z. A function return value of zero indicates values x, y and z are successfully returned.

> ID = 827

### `Name_prompt`

```c
Integer Name_prompt(Text msg,Text &ret)
```

Print the message msg to the prompt message area and then read back a Text from the user reply area of the Macro Console. If LB is clicked on the Name icon at the right hand end of the user reply area, a list of all existing Names is placed in a pop-up. If a Name is selected from the pop-up (using LB), the Name is placed in the user reply area. The reply, either typed or selected from the Name popup, must be terminated by pressing <Enter> for the macro to continue. The reply is returned in Text ret. A function return value of zero indicates the Text ret is returned successfully.

> ID = 828

Panel_prompt(Text panel_name, Integer interactive, Integer no_field,Text 
field_name[], Text field_value[])
Name
Integer Panel_prompt(Text panel_name,Integer interactive,Integer no_field,Text field_name[],Text 
field_value[])
Description

Macro Console
Chapter   
Pop up a panel of the name panel_name.
No_field specifies how many fields you wish to fill in for the panel. 
The name of each field is specified in Field_name array. 
The value of each field is specified in field_value array.
If interactive is 1, the panel is displayed and remains until the finish button is selected.
If interactive is 0, the panel is displayed, runs the option and then closes. 
A function return value of zero indicates success.
See example  Defining and Using Panel_prompt
ID = 685
Defining and Using Panel_prompt
 Text    panel_name;
 Integer interactive = 1;
 Integer no_fields;
 Integer code;
 Text    field_name [20];
 Text    field_value[20];
 panel_name = "Contour a Tin";
 no_fields = 0;
 no_fields++;  field_name[no_fields] = "Tin to contour";
 field_value[no_fields] = "terrain";
 no_fields++;  field_name[no_fields] = "Model for conts";
 field_value[no_fields] = "terrain contours";
 no_fields++;  field_name[no_fields] = "Cont min";
 field_value[no_fields] = "";
 no_fields++;  field_name[no_fields] = "Cont max";    
 field_value[no_fields] = "";
 no_fields++;  field_name[no_fields] = "Cont inc";
 field_value[no_fields] = "0.5";
 no_fields++;  field_name[no_fields] = "Cont ref";
 field_value[no_fields] = "0.0";
 no_fields++;  field_name[no_fields] = "Cont colour";
 field_value[no_fields] = "purple";
 no_fields++;  field_name[no_fields] = "Model for bolds";
 field_value[no_fields] = "terrain bold contours";
 no_fields++;  field_name[no_fields] = "Bold inc";      
 field_value[no_fields] = "2.5";
 no_fields++;  field_name[no_fields] = "Bold colour";    
 field_value[no_fields] = "orange";
 Prompt("Contouring");
 code = Panel_prompt(panel_name,interactive,no_fields,field_name,field_value);

### `Panel_prompt`

```c
Integer Panel_prompt(Text panel_name,Integer interactive,Text data)
```

Pop up a panel of the name panel_name. Data specifies the SLF or SLX content. Note, SLF content is deprecated and only for compatibilty purposes. Where a panel has been changed, the SLF content may no longer work. See example Macro Console below: For SLF based data If interactive is 1, the panel is displayed and remains until the finish button is selected. If interactive is 0, the panel is displayed, runs the option and then closes. For SLX based data If interactive is 0xff01, the panel is displayed and remains until the finish button is selected. If interactive is 0xff00, the panel is displayed, runs the option and then closes. A function return value of zero indicates success. See example Defining and Using Panel_prompt

> ID = 2068

Defining and Using Panel_prompt
// SLF example
 Text    panel_name;
 Integer interactive = 1;
Text      data;
 panel_name = "Contour a Tin";
  panel_data += "field \"Tin to contour\" terrain\n";
  panel_data += "field \"Model for conts\" \"terrain contours\"\n";
  panel_data += "field \"Cont inc\" \"0.5\"\n";
  panel_data += "field \"Model for bolds\" \"terrain bold contours\"\n";
  panel_data += "field \"Bold inc\" \"2.5\"\n";
  panel_data += "field \"Bold colour\" \"orange\"\n";
 Prompt("Contouring");
 code = Panel_prompt(panel_name,interactive,data);
// SLX example
  Text    panel_name = "Contour a Tin";
  Integer interactive = 0xff01;
  Text    panel_data;
  panel_data += "<input_box>";
  panel_data +=   "<name>Tin to contour</name>";

Macro Console
Chapter   
  panel_data +=   "<value>terrain</value>";
  panel_data += "</input_box>";
  panel_data += "<widget_pages>";
  panel_data +=   "<name>Mode</name>";
  panel_data +=   "<current_page>Contours</current_page>";
  panel_data +=   "<widget_page>";
  panel_data +=     "<name>Contours</name>";
  panel_data +=     "<input_box>";
  panel_data +=       "<name>Model for conts</name>";
  panel_data +=       "<value>terrain contours</value>";
  panel_data +=     "</input_box>";
  panel_data +=   "</widget_page>";
  panel_data +=   "<widget_page>";
  panel_data +=     "<name>Bold Contours</name>";
  panel_data +=     "<input_box>";
  panel_data +=       "<name>Model for bolds</name>";
  panel_data +=       "<value>terrain bold contours</value>";
  panel_data +=     "</input_box>";
  panel_data +=   "</widget_page>";
  panel_data += "</widget_pages>";
Prompt("Contouring");
 code = Panel_prompt(panel_name,interactive,panel_data);


