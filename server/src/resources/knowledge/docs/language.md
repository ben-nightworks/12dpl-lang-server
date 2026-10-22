> Source: *12d Model Macro Programming Manual*

# 12dPL Language Reference

This document covers the core language structure of 12dPL (12d Programming Language): names, variables, types, operators, flow control, preprocessor directives, blocks and scoping, and user-defined functions.

## Contents
- [2 Basic Language Structure](#2-basic-language-structure)
- [3 Functions](#3-functions)

---

## 2 Basic Language Structure

Page 13
Names
2  Basic Language Structure
See 2.1 Names
See 2.2 Reserved Names
See 2.3 White Space
See 2.4 Comments
See 2.5 Variables
See 2.6 Assignment and Operators
See 2.7 Statements and Blocks
See 2.8 Flow Control
See 2.9 Precedence of Operators
See 2.10 Preprocessing
2.1 Names
A name (also known as a word) denotes an object, a function, an enumerator, a type, or a value. 
A name is introduced into a program by a declaration.
All names must be declared before they can be used.
A name can be used only within a region of program text called its scope (discussed later).
A name has a type that determines its use.
2.2 Reserved Names
The following names (words) are reserved and cannot be used for user defined names:
Integer                   Integer64               Real                      Text                 Uid                Guid
Attribute_Blob       Attributes               Attribute                 Element           Model           View
Point                     Line                        Segment                Curve              Menu            Tin
Dynamic_Integer  Dynamic_Real       Dynamic_Text        Dynamic_Element   
Dynamic_Integer64                             Colour                    Time
Angle_Box           Apply_Function       Apply_Many_Function                   Arc
Attributes_Box      Billboard_Box         Bitmap_Fill_Box    Bitmap_List_Box                  Button
Chainage_Box      Choice_Box            Colour_Box           Colour_Message_Box
Connection            Database_Result   Date_Time_Box    Delete_Query 
Directory_Box        Drainage_Network                              Draw_Box         Equality_Info
Equality_Label       File                         File_Box               Function            Function_Box
Function_Property_Collection              Graph_Box           GridCtrl_Box     Horizontal_Group
HyperLink_Box       Input_Box              Insert_Query        Integer_Box      Integer_Set
Reserved Names

Justify_Box             Kerb_Return_Function                       Linestyle_Box   List
List_Box                 ListCtrl_Box           Log_Box               Log_Line           Macro_Function
Manual_Condition  Manual_Query       Map_File              Map_File_Box   Matrix3       Matrix4
Message_Box        Model_Box             Name_Box           Named_Tick_Box
New_Select_Box   New_XYZ_Box       Overlay_Widget   Panel                 Parabola
Parameter_Collection                           Plot_Parameter_File                      Plotter_Box
Polygon_Box          Process_Handle    Query_Condition  Real_Box          Real_Set
Report_Box            Screen_Text           SDR_Attribute     Select_Box        Select_Boxes
Select_Button         Select_Query         Selection              Sheet_Panel     Sheet_Size_Box
Slider_Box              Source_Box           Spiral                   String                 Symbol_Box
Tab_Box                 Target_Box            Template_Box     Text_Edit_Box   Text_Set
Text_Style_Box      Text_Units_Box     Textstyle_Data     Textstyle_Data_Box
Texture_Box           Tick_Box                Time_Zone_Box                            Time_Zone_Box_Box
Tin_Box                  Transaction            Tree_Box             Tree_Page        Undo           Undo_List
Update_Query        Vector2                  Vector3                 Vector4              Vertical_Group
View_Box                Widget                   Widget_Pages      XML_Document
XML_Node              XYZ_Box                                                                          
Key words for container type (where $KeyType can be any one of those 10:
Integer                   Integer64               Real                      Text                 Uid                Guid
Point                      Vector2                  Vector3                 Vector4)
$KeyType_$KeyType_Map
$KeyType_$KeyType_Multimap
$KeyType_Set
$KeyType_Multiset
example for actual key word for container: Real_Set, Text_Multiset, Integer_Text_Multimap
break           case                            char                       continue         default
do                double                         else                       float                for
goto             if                                  int                          integer            long
real              return                          short                      switch             void
while
auto             class                            const                     delete             enum
extern          friend                           inline                     new                 operator
private         protected                     public                    register            signed
sizeof          static                            struct                     template          this
throw           try                                typedef                  union               unsigned
virtual          volatile
All 12dPL variable types and 12dPL functions and user defined functions are also considered to be 
keywords and cannot be used for user defined names.
White Space
2.3 White Space
Spaces, tabs, newlines (<enter>, <CR>), form feeds, and comments are collectively known as white 
space. 
White space is ignored except for the purpose of separating names or in text between double 
quotes. Hence blank lines are ignored in a 12dPL program.
For example,
     goto             fred      ;
is the same as
  goto fred;
2.4 Comments
12dPL supports two styles of comments -
A line oriented comment
          all characters after a double slash // and up the end of a line are ignored.
A block comment
          all characters between a starting /* and a terminating */ are ignored.
An example of comments in 12dPL is
  void main()
  {
 Real y = 1; 
// the rest of this line is comment
/* this comment can carry
 over many lines until
 we get to the termination characters */
  }
Variables

2.5 Variables
Variables and constants are the basic data objects manipulated in a program.
Declarations list the names of the variables to be used, and state what type they have.
Operators specify what is to be done to variables.
Expressions combine variables and operators to produce new values.
The type of an object determines the set of values it can have and what operations can be 
performed on it.
2.5.1 Variable Names
In 12dPL, variable names must start with an alphabetic character and can consist of upper and/or 
lower case alphabetic characters, numbers and underscores (_) and there is no restriction on the 
length of variable names.
12dPL variable names are case sensitive. 
2.5.2 Variable Declarations
In 12dPL, all variables must be declared before they are used. 
A declaration consists of a variable type and a list of variable names separated by commas and 
ending the line with a semi-colon ";".
For example
Integer fred, joe, tom;
where Integer is the variable type and fred, joe and tom are the names of variables of type Integer.
2.5.3 Variable Types
There are a wide variety of 12d Model variable types supported in 12dPL. For example
(a)
void
This is a special type which is only used for functions which have no return value. All other 
functions must return one variable take as the function return value. The user does not define 
variables of this type and it is only used in function definitions.
For example:
          void     Exit(Integer code)
(b)
Mathematical Variable Types
Standard mathematical variables for calculations using the mathematical operations such as 
addition, subtraction, multiplication and division.
These variables only exist within the 12dPL program and cease to exist when it finishes.
For example, Integer, Real, Text, Vector2, Vector3, Matrix2, Marix3, Matrix4
For more information on these variables, go to 2.5.3.1 Mathematical Variable Types
(c)
Geometric Construction Variable Types
These objects are used within 12dPL macros for geometric calculations. They are only 
temporary objects and only last for the duration of the program.
Variables
For example, Point, Line, Arc, Spiral, Segment.
For more information on these variables, go to 2.5.3.2 Geometric Construction Variable Types
(d)
12d Database Handles
These variable types act as Handles to access data stored in the 12d Model database. This 
data is retrieved from and stored in the 12d Model database and so exists after the program 
terminates.
For example, Element, Dynamic_Element, Tin, Model, View, Function, Undo_List
For more information on these variables, go to 2.5.3.3 12d Model Database Handles
(e)
12d Internal Variable Types
These variables help access data stored in the 12d Model database handles. This data may be 
retrieved from and stored in 12d Model database via the handles, and so can exist after the 
program terminates.
For example, Uid, Attributes, SDR_Attributes, Blobs, Textstyle_Data.
For more information on these variables, go to 2.5.3.4 12d Internal Variable Types
(f)
12d Interface Variable Types
Variables for building interfaces, such as menus and panels, to communicate with the macro 
user.
For example, Menu, Panel, Widget, Model_Box.
For more information on these variables, go to 2.5.3.5 12d Model Interface Variable Types
(g)
File Interface Variable Types
Variables for accessing files.
For example, File, Map_File, Plot_Parameter_File, XML_Document, XML_Node.
For more information on these variables, go to 2.5.3.6 File Interface Variable Types
(h)
ODBC Database Interface Variable Types
Variables for accessing and manipulating ODBC databases.
For example, Connection, Select_Query, Insert_Query, Update_Query, Delete_Query, 
Database_Results, Transactions, Parameter_Collection, Query_Condition, Manual_Condition
For more information on these variables, go to 2.5.3.7 ODBC Database Variable Types
(i)
Arrays and Dynamic Arrays Types
Arrays are used to allocate a number of storage units that have the same type. Arrays sore a 
fixed number of items and Dynamic Arrays store a variable number of items.
For example, Real arrays, Integer, Arrays, Text Arrays, Dynamic_Text.
For more information on these variables, go to 2.5.3.8 Array Types
For a quick summary of all the 12dPL variables, go to 2.5.3.9 Summary of 12dPL Variable Types
Variables

2.5.3.1 Mathematical Variable Types
Standard mathematical variables for calculations using the mathematical operations such as 
addition, subtraction, multiplication and division.
See
 Integer
 Integer64
 Real
 Text
 Vector2
 Vector3
 Vector4
 Matrix3
 Matrix4
Integer
A 32-bit whole number. It can be positive or negative. For example -1, 0 and 1.
Integer64
A 64-bit whole number. It can be positive or negative. For example -1LL, 0 and 123456789123.
Real
A 64-bit decimal number. It can be positive or negative. For example -1.0, 0.0 and 1.0
Text
A sequence of characters. For example    Dog
Vector2
An entity consisting of two Real values. If the two real values of a Vector2 are X and Y, the values in 
a Vector2 are often expressed as (X,Y).
Vector3
An entity consisting of three Real values. If the three real values of a Vector3 are X, Y and Z, the 
values in a Vector3 are often expressed as (X,Y,Z).
Vector4
An entity consisting of four Real values. If the four real values of a Vector3 are X, Y, Z and W, the 
values in a Vector4 are often expressed as (X,Y,Z,W).
Matrix3
An entity consisting of nine Real values. The values in the Matrix3 matrix are expressed as three 
rows and three columns and indexed as matrix (row, column) and
      matrix (1,1) = a    matrix(1,2) = b    matrix(1,3) = c
      matrix (2,1) = d    matrix(2,2) = e     matrix(2,3) = f
      matrix (3,1) = g   matrix(3,2) = h     matrix(3,3) = i
where a, b, c, d, e, f, g, h and i are the nine Real values of matrix.
where a, b, c and d are the four Real values of matrix.
Matrix4
An entity consisting of sixteen Real values. The values in the Matrix4 matrix are expressed as four 
rows and four columns and indexed as matrix(row,column) and
      matrix (1,1) = a    matrix(1,2) = b    matrix(1,3) = c    matrix(1,4) = d
Variables
      matrix (2,1) = e    matrix(2,2) = f     matrix(2,3) = g    matrix(2,4) = h
      matrix (3,1) = i   matrix(3,2) = j     matrix(3,3) = k    matrix(3,4) = l
      matrix (4,1) = m   matrix(4,2) = n     matrix(4,3) = o    matrix(4,4) = p
where a, b, c, d, e, f, g, h, i, j, k, l, m, n, o and p are the sixteen Real values of matrix.
Variables

2.5.3.2 Geometric Construction Variable Types
Construction variables are used within 12dPL macros for geometric calculations but they are 
temporary objects and only last for the duration of the program.
See
 Point
 Line
 Arc
 Spiral (Transition)
 Parabola
 Segment
Point
A Point is a three dimensional point consisting of x, y and z co-ordinates (x,y,z).
A Point is a construction entity and is not stored in 12d Model models.
Line
A Line is three dimensional line joining two Points.
A Line is a construction entity and is not stored in 12d Model models.
Arc
An Arc is a helix which projects onto a circle in the (x,y) plane.
That is, in a plan projection, an Arc is a circle. But in three dimensions, the Arc has a z value (height) 
at the start of the Arc and another (possibly different) z value at the end of the Arc. The z value 
varies linearly between the start and end point of the Arc. So an Arc is NOT a circle in a plane in 3d 
space, except when it is in a plane parallel to the (x,y) plane.
In 12dPL an Arc is a construction entity and is not stored in 12d Model models.
Spiral (Transition)
An spiral is a mathematically defined transition which when projected on to the (x,y) plane, has a 
continuously varying radius going between a between a line (infinite radius) and an arc for a full 
spiral, or an arc to another arc for a partial spiral.
Note that in 12d Model, the Spiral covers the traditional clothoid spirals and also other transitions 
(such as a cubic parabola) which are not spirals in the true mathematical sense.
For more information on Spirals and Transitions, go to 5.23 Spirals and Transitionsin the chapter 5 
12dPL Library Calls
In 12dPL a Spiral is a construction entity and is not stored in 12d Model models.
Parabola
Parabolas are used in the vertical geometry of an Alignment or Super Alignment. The vertical 
geometry is defined in the (chainage, height) plane and parabolas can be place on vertical 
intersection points. So the parabola is defined in the (chainage, height) plane.
In 12dPL a Parabola is a construction entity and is not stored in 12d Model models.
Segment
A Segment is either a Point, Line, Arc, Parabola or a Spiral.
A Segment has a unique type which specifies whether it is a Point, Line, Arc, Parabola or Spiral.
A Segment is a construction entity and is not stored in 12d Model models.
See 5.25 Segments
Variables
2.5.3.3 12d Model Database Handles
Unlike construction entities, the 12d Model database handle variables are used for data from the 
12d Model project database. They could be handles for Views, Models, Elements, Functions etc.
The handles don't contain the database information but merely point to the appropriate database 
records.
Hence data created with handle variables can be stored in the 12d Model database and will exist 
after the 12dPL program terminates.
Since the handle merely points to the Project data, the handle can be changed so that it points to a 
different record without affecting the data it originally pointed to.
The 12dPL variables Element, View, Model and Macro_Function create and use handles.
Sometimes it is appropriate to set a handle so that it doesn't point to any data. This process is 
referred to as setting the handle to null.
Note that when setting a handle to null ("nulling" it), no 12d Model data is changed - the handle 
simply points to nothing.
See
 Element
 Model
 View
 Macro_Function or Function
 Undo_List
Element
The variable type Element is used to refer to the standard 12d Model entities that can be stored in 
a 12d Model models.
Elements act as handles to the data in the 112d Model database so that the data can be easily 
referred to and manipulated within a macro.
The different types of Elements are
Arc                             an arc in the (x,y) plane with linear interpolated z values (i.e. a helix). See 
5.41 Arc String Element
Circle                         a circle in the (x,y) plane with a constant z value. See 5.42 Circle String 
Element
Drainage                   string for drainage or sewer elements. See 5.45 Drainage String Element
Feature                      a circle with a z-value at the centre but only null values on the circumference. 
See 5.46 Feature String Element
Grid Tin                     See 5.48 Grid String and Grid Tin Element
Grid String                See 5.48 Grid String and Grid Tin Element
Interface                    string with (x,y,z,cut/fill flag) at each vertex. See 5.47 Interface String Element
Pipe                            string width (x,y,z) at each point and a diameter. See 5.53.4 Pipe Strings
Plot Frame                element used for production of plan plots. See 5.52 Plot Frame Element
Pipeline                     an Alignment string with a diameter. See 5.44 Pipeline String Element
Super                        general string with at least (x,y,z,radius) at each vertex. See 5.38 Super String 
Element
Super Alignment     a string with separate horizontal geometry defined by using the intersection 
point methods and other construction methods such as fixed and floating. 
Variables

See 5.40 Super Alignment String Element
SuperTin                  a list of Tins that acts as one Tin
Text                           string with text at a vertex. See 5.43 Text String Element
Tin                             triangulated irregular network - a triangulation See 5.37 Tin Element
Superseded Element Types
2d                               string with (x,y) at each vertex but constant z. See 5.53.1 2d Strings
3d                               string with (x,y,z) at vertex point. See 5.53.2 3d Strings
4d                               string with (x,y,z,text) at each vertex. See 5.53.3 4d Strings
Alignment                 string with separate horizontal and vertical geometry defined only by using the 
intersection point methods. See 5.54 Alignment String Element
Polyline                     string with (x,y,z,radius) at each vertex. See 5.53.5 Polyline Strings
The Element type is given by the Get_type(Element elt,Text text) function.
Model
The variable type Model is used as a handle to refer to 12d Model models within macros. See 5.34 
Models
View
The variable type View is used as a handle to refer to 12d Model views within macros. See 5.35 
Views
Macro_Function or Function
The variable type Macro_Function or Function is used as a handle to refer to a 12d Model function 
within macros. User defined Macro_Functions/Functions can be created from a macro. See 5.64 
12d Model Macro_Functions
Variables
2.5.3.4 12d Internal Variable Types
These variables help access data stored in the 12d Model database handles. This data may be 
retrieved from and stored in 12d Model database via the handles, and so can exist after the 
program terminates.
See
 Uid
 Guid
 Attributes
 SDR_Attribute
 Blob
 Screen_text
 Textstyle_Data
 Equality_Label
 Undo
Uid
A Unique Identifier for entities in a 12d Model database. See 5.16 Ids, Uids and Guids
Guid
A  Global Unique Identifier used for a 12d Model project. See 5.16 Ids, Uids and Guids.
Attributes
The variable type Attributes is used as a handle to refer to an 12d Model attribute structure within 
macros. 
Attributes are user defined and can be attached to Projects, Models, Elements and 
Macro_Functions/Functions.See 5.29 User Defined Attributes
SDR_Attribute
SDR_Attribute are special attributes used with the 12d Survey Data Reduction process.
Blob
A binary object.
Screen_text
See 5.61.10.30 Screen_Text.
Textstyle_Data
TextStyle_Data holds information about the text such as colour, textstyle, justification, height. See 
5.9 Textstyle Data.
Equality_Label
Equality_Label holds information for labelling text as an Equality
Undo
A variable to hold information that is placed on the 12d Model Undo system.See 5.66 Undos
Undo_List
The variable type Undo_List is a handle to a list of Undo’s. See 5.66 Undos
Variables

2.5.3.5 12d Model Interface Variable Types
The objects for building interfaces, such as menus and panels, to communicate with the macro user.
All these items are derived from a Widget and so can be used in any argument that is of type 
Widget.
See
 Widget
See
 Menu
 Panel
 Overlay_Widget
Objects for Formatting Widgets in a Panel
See
 Vertical_Group
 Horizontal_Group
 Widget_Pages
Control Objects for Placing in Horizontal/Vertical Groups and Panels
See
 Button
 Select_Button
 Angle_Box
 Attributes_Box
 Attributes_Box
 Billboard_Box
 Bitmap_Fill_Box
 Bitmap_List_Box
 Chainage_Box
 Choice_Box
 Colour_Box
 Colour_Message_Box
 Date_Time_Box
 Directory_Box
 Draw_Box
 File_Box
 Function_Box
 Graph_Box
 GridCtrl_Box
 HyperLink_Box
 Input_Box
 Integer_Box
 Justify_Box
 Linestyle_Box
 List_Box
 ListCtrl_Box
 Map_File_Box
 Message_Box
 Model_Box
 Name_Box
 Named_Tick_Box
 New_Select_Box
 New_XYZ_Box
 Plotter_Box
Variables
 Polygon_Box
 Real_Box
 Report_Box
 Select_Box
 Select_Boxes
 Sheet_Size_Box
 Source_Box
 Symbol_Box
 Tab_Box
 Target_Box
 Template_Box
 Text_Edit_Box
 Text_Style_Box
 Texture_Box
 Tree_Box
 Tree_Page ??
 Tick_Box
 Tin_Box
 View_Box
 XYZ_Box
Widget
The objects for building interfaces, such as menus and panels, to communicate with the macro user. 
All these items are derived from a Widget and so can be used in any argument that is of type 
Widget. For the Widget 12dPL calls, see 5.61 Panels and Widgets
Menu
An object that holds the data for a user defined 12d Model menu.
Panel
An object that holds the data for a user defined 12d Model panel. See 5.61 Panels and Widgets. 
Objects for Formatting Widgets in a Panel
Overlay_Widget
Sheet_Panel
Vertical_Group
Used for formatting a panel.
A Vertical_Group holds Widgets that will be placed horizontally in a Panel. See 5.61.2 Panel 
Functions
Horizontal_Group
Used for formatting a panel.
A Horizontal_Group holds Widgets that will be placed horizontally in a Panel. See 5.61.2 Panel 
Functions
Widget_Pages
A panel can have different pages. See 5.61.9 Panel Page
Control Objects for Placing in Horizontal/Vertical Groups and Panels
Button
Variables

A button on a Panel. See 5.61.13 Buttons 
Select_Button
A button on a Panel for selecting strings. See 5.61.13.3 Select_Button 
Angle_Box
A box on a Panel for inputting angle information. See 5.61.10.1 Angle_Box.
Attributes_Box
See 5.61.10.2 Attributes_Box.
Billboard_Box
A box on a Panel for selecting a billboard name from the pop-up list of project billboards. See 
5.61.10.43 Texture_Box.
Bitmap_Fill_Box
See 5.61.10.4 Bitmap_Fill_Box.
Bitmap_List_Box
Chainage_Box
See 5.61.10.5 Chainage_Box.
Choice_Box
See 5.61.10.6 Choice_Box.
Colour_Box
A box on a Panel for selecting a colour from the pop-up list of project colours. See 5.61.10.8 
Colour_Box.
Colour_Message_Box
A box on a Panel for writing messages to. Different background colours for the display area can also 
be set. See 5.61.11.1 Colour_Message_Box.
Date_Time_Box
See 5.61.10.9 Date_Time_Box.
Directory_Box
See 5.61.10.10 Directory_Box.
Draw_Box
See 5.61.10.11 Draw_Box.
File_Box
See 5.61.10.12 File_Box.
Function_Box
See 5.61.10.13 Function_Box.
Graph_Box
See .
Variables
GridCtrl_Box
See 5.61.14 GridCtrl_Box.
HyperLink_Box
See 5.61.10.14 HyperLink_Box.
Input_Box
See 5.61.10.15 Input_Box.
Integer_Box
See 5.61.10.16 Integer_Box.
Justify_Box
See 5.61.10.17 Justify_Box.
Linestyle_Box
A box on a Panel for selecting a linestyle from the pop-up list of project linestyles. See 5.61.10.18 
Linestyle_Box.
List_Box
See 5.61.10.19 List_Box.
ListCtrl_Box
Map_File_Box
See 5.61.10.20 Map_File_Box.
Message_Box
A box on a Panel for writing messages to. See 5.61.11.2 Message_Box. Also see 5.61.11.1 
Colour_Message_Box
Model_Box
A box on a Panel for creating a new model, or selecting a model from the pop-up list of project 
models. See 5.61.10.21 Model_Box.
Name_Box
See 5.61.10.22 Name_Box.
Named_Tick_Box
See 5.61.10.23 Named_Tick_Box.
New_Select_Box
See 5.61.10.24 New_Select_Box.
New_XYZ_Box
See 5.61.10.25 New_XYZ_Box.
Plotter_Box
See 5.61.10.26 Plotter_Box.
Polygon_Box
Variables

See 5.61.10.27 Polygon_Box.
Real_Box
See 5.61.10.28 Real_Box.
Report_Box
See 5.61.10.29 Report_Box.
Select_Box
See 5.61.10.31 Select_Box.
Also see  New_Select_Box
Select_Boxes
See 5.61.10.32 Select_Boxes.
Sheet_Size_Box
See 5.61.10.33 Sheet_Size_Box.
Source_Box
See 5.61.10.35 Source_Box.
Symbol_Box
See 5.61.10.36 Symbol_Box.
Tab_Box
See 5.61.10.32 Select_Boxes.
Target_Box
See 5.61.10.37 Target_Box.
Template_Box
See 5.61.10.38 Template_Box.
Text_Edit_Box
See 5.61.10.42 Text_Edit_Box.
Text_Style_Box
See 5.61.10.39 Text_Style_Box.
Texture_Box
See 5.61.10.43 Texture_Box.
Tree_Box
See 5.61.15 Tree Box Calls.
Tree_Page ??
Tick_Box
See 5.61.10.44 Tick_Box.
Tin_Box
Variables
See 5.61.10.45 Tin_Box.
View_Box
A box on a Panel for selecting a view from the pop-up list of project views. See 5.61.10.46 
View_Box.
XYZ_Box
Also see  New_XYZ_Box
Variables

2.5.3.6 File Interface Variable Types
Variables for accessing files.
See
  File
  Map_File
  Plot_Parameter_File
  XML_Document
  XML_Node
File
A file unit. See 5.17.3 Files.
Map_File
A file used for mapping element properties. See 5.58 Map File.
Plot_Parameter_File
A file unit. See 5.58 Map File.
XML_Document
The file contents are structured as an XML document. See 5.57 XML.
XML_Node
Variables
2.5.3.7 ODBC Database Variable Types
The variables are used when accessing and querying a ODBC database.
See
  Connection
  Select_Query
  Insert_Query
  Update_Query
  Delete_Query
  Database_Results
  Transactions
  Parameter_Collection
  Query_Condition
  Manual_Condition
Connection
The connection to the database.
Select_Query
Used to retrieve data from the database.
Insert_Query
Used to add data to the database.
Update_Query
Used to update data in the database.
Delete_Query
Used to delete data in the database.
Database_Results
Database results.
Transactions
Database transactions.
Parameter_Collection
Query the database parameters.
Query_Condition 
Query conditions
Manual_Condition 
Manual condition
Variables

2.5.3.8 Array Types
Arrays are used to allocate a number of storage units that have the same name.
In 12d Model, there are two types of arrays - fixed and dynamic.
Fixed arrays must have their lengths defined when the array is declared. This can either be at 
compile time when a number is used (e.g. 10) or when a variable which has been given a specific 
value before the array declaration (e.g. N).
The length of dynamic arrays can vary at any time whilst the macro is running.
See
  Fixed Arrays
  Dynamic Arrays
Fixed Arrays
A fixed array is defined by giving the size of the array (the number of storage units being set aside) 
enclosed in the square brackets [ and ] immediately after the variable name.
The size can either be a fixed number or a variable that has been assigned a value before the array 
is defined.
For example, a Real array of size 100 is defined by
Real  real_array[100];
and a Real array of size N, where N is an Integer variable, is defined by
           
Real  real_array[N];
Note that once the array is defined, the size is fixed by the value of N at the time when the array is 
defined - it does not change if N is subsequently modified.
In a macro, the individual items of an array are accessed by specifying an array subscript enclosed 
in square brackets.
For example, the tenth item of real_array is accessed by real_array[10].
Warning to C++ Programmers
This is not the same as C++ where array subscripts start at zero
Dynamic Arrays
For many 12dPL operations, an array of items is required but the size of the array is not known in 
advance or will vary as the macro runs.
For example, an array may be needed to hold Elements being selected by the user running the 
macro. The number of Elements selected would not be known in advance and could overflow any 
fixed array. Hence a fixed array is inconvenient or impossible to use.
To cover these situations, 12dPL has defined dynamic arrays that can hold an arbitrary number of 
items. At any time, the number of items in a dynamic array is known but extra items can be added at 
any time.
Like fixed arrays, the items in dynamic arrays are accessed by their unique position number. It is 
equivalent to an array subscript for a fixed array.
But unlike fixed arrays, the items of a dynamic array can only be accessed through function calls 
rather than array subscripts enclosed in square brackets.
As for an array, the dynamic array positions go from one to the number of items in the dynamic 
Variables
array.
The dynamic arrays currently supported in 12dPL are
Dynamic_Element
            a dynamic array of Elements
Dynamic_Integer
             a dynamic array of Integers.
Dynamic_Integer64
             a dynamic array of 64 bit Integers.
Dynamic_Real 
             a dynamic array of Reals.
Dynamic_Text
             a dynamic array of Texts.
Variables

2.5.3.9 Summary of 12dPL Variable Types
The 12dPL variable types are:
          void - only used in functions which return no value
Mathematical Variable Types
          Integer - 32 bit integer
          Integer64 - 64 bit integer
          Real - 64 bit IEEE Real precision floating point, 14 significant figures
          Text - one or more characters
          Vector2, Vector3, Vector4 - contain two, three and four Reals respectively
          Matrix3, Matrix4 - nine and sixteen Reals respectively
Geometric Construction Variable Types
          Point - a three dimensional point
          Line - a line between two points
          Arc - a helix
          Spiral - a transition
          Parabola - a parabola
          Segment - a Point, Line, Arc, Parabola or Spiral
12d Model Database Handles
          Element - a handle for the 12d Model strings
          Tin - a handle for 12d Model tins
          Model - a handle for 12d Model models
          View - a handle for 12d Model views
          Functions, Macro_Function - a handle for 12d Model functions
          Undo_List - a list to combine Undo’s
12d Internal Variable Types
          Uid - unique identifier for entities in a 12d Model database
          Guid - unique identifier used for a 12d Model project
          Attributes - used as a handle to refer to a 12d Model attribute structure
          SDR_Attribute - special attributes used with the 12d Survey Data Reduction process
          Blob - a binary object
          Attribute_Blob - a binary object
          Screen_Text -
          Textstyle_Data - holds information about a text such as colour, textstyle, rustication
          Equality_Label - holds information for labelling text as an Equality
12d Model Interface Variable Types
 Menu -holds the data for a user defined 12d Model menu
 Panel - holds the data for a user defined 12d Model panel
 Widget -
 Vertical_Group - holds Widgets that will be placed horizontally in a Panel
 Horizontal_Group - holds Widgets that will be placed vertically in a Panel
 Widget_Pages -
Variables
 Overlay_Widget -
 Sheet_Panel -
 Button - a button on a Panel.
 Select_Button -
 Angle_Box -
 Attributes_Box -
 Billboard_Box -
 Bitmap_Fill_Box -
 Bitmap_List_Box -
 Chainage_Box -
 Choice_Box -
 Colour_Box -
 Colour_Message_Box -
 Date_Time_Box -
 Directory_Box -
 Draw_Box -
 File_Box -
 Function_Box -
 Graph_Box -
 GridCtrl_Box -
 HyperLink_Box -
 Input_Box -
 Integer_Box -
 Justify_Box -
 Linestyle_Box -
 List_Box -
 ListCtrl_Box -
 Map_File_Box -
 Message_Box -
 Model_Box -
 Name_Box -
 Named_Tick_Box -
 New_Select_Box -
 New_XYZ_Box -
 Plotter_Box -
 Polygon_Box -
 Real_Box -
 Report_Box -
 Select_Box - see also New_Select_Box -
 Select_Boxes -
 Sheet_Size_Box -
 Source_Box -
 Symbol_Box -
 Tab_Box -
 Target_Box - // not yet implemented 
 Template_Box -
 Text_Edit_Box -
 Text_Style_Box -
 Texture_Box -
 Tree_Box -
 Tree_Page -??
 Tick_Box -
 Tin_Box -
 View_Box -
 XYZ_Box - see also New_XYZ_Box
File Interface Variable Types
Variables

 File -
 Map_File -
 Plot_Parameter_File -
 XML_Document -
 XML_Node -
ODBC Database Variable Types
 Connection - the connection to the database.
 Select_Query - used to retrieve data from the database.
 Insert_Query -used to add data to the database.
 Update_Query -used to update data in the database.
 Delete_Query - used to delete data in the database.
 Database_Results - database results.
 Transactions - database transactions.
 Parameter_Collection - query the database parameters.
 Query_Condition - query conditions
 Manual_Condition - manual condition
Array Types
 Real Array - Real[num] - a fixed array of Reals
 Integer Array - Integer[num] - a fixed array of Integers
 Text Array - Text[num]- a fixed array of Texts
 Dynamic_Element - a dynamic array of Elements
 Dynamic_Text - a dynamic array of Texts
 Dynamic_Integer - a dynamic array of Integers
 Dynamic_Integer64 - a dynamic array of 64 bits Integers
 Dynamic_Real - a dynamic array of Reals
Variables
2.5.4 Constants
There are four kinds of constants (or literals)
 Integer Constant
 Integer64 Constant
 Real Constant
 Text Constant
Variables

2.5.4.1 Integer and 64bit Integer Constant
An integer or 64bit Integer constant consists of any number of digits.
All integer and 64bit Integer constants are assumed to be in decimal notation. 
A 64bit Integer can have an optional ending of two letters L (LL)
A constant without two letters L ending greater than or equal 2 power 31 (2147483648) or smaller 
than minus 2 power 31 (-2147483648) will also be interpreted as 64bit Integer 
Examples of valid integer constants are
 1          76875
Examples of valid 64 integer constants are
 1          123LL
 2          -123456789123
Variables
2.5.4.2 Real Constant
A Real constant consists of any number of digits ending in a mandatory decimal point, followed by 
an optional fractional part and an optional exponent part. The exponent part consists of an e or E, 
and an optionally signed integer exponent.
There can be no spaces between each part of the Real constant.
Valid floating constants are
6.          
1.0          
1.0e          
1.0e+1          1.0e-1           .1e+2
Note that 1e1 is not a valid floating constant.
Variables

2.5.4.3 Text Constant
A Text constant is a sequence of characters surrounded by double quotes.
Valid Text constants are
"1"          
"1234"          !"@#$%^&"
A Text constant can also contain escape characters. For example, if you wish to have the " character 
in a Text constant, you place a \ character in front of it.
    "A silly \" symbol"     translates to
     A silly " symbol
The following escape characters are supported in Text variables:
 new-line
NL(LF)
\n
 double quote
"
\"
 backslash
\
\\
Assignment and Operators
2.6 Assignment and Operators
See
 2.6.1 Assignment
 2.6.2 Binary Arithmetic Operators and 2.6.3 Binary Arithmetic Operators for Vectors and 
Matrices
 2.6.4 Relational Operations
 2.6.5 Logical Operators
 2.6.5 Logical Operators
 2.6.6 Increment and Decrement Operators
 2.6.7 Bitwise Operators
 2.6.8 Assignment Operators
2.6.1 Assignment
Assignment
=
assignment
e.g. x = y
The Assignment = is NOT a mathematical equal.
The Assignment is to be interpreted as
the expression on the right hand side is evaluated and then the variable on the left is given that value.
So if the same variable occurs on both sides of the assignment, the current value is used in 
evaluating the right hand side and then the variable is given the new value. For example, the 
expression
x = x + 1;
means that x is given the new value that is equal to the original value plus 1.
2.6.2 Binary Arithmetic Operators
The binary arithmetic operators are
+          addition
-           subtraction
*          multiplication
/           division - note that integer division truncates any fractional part
%         modulus:  x%y where x and y are integers, produces the integer remainder when x is
            divided by y
Note that division or modulus by Integer or Integer64 zero might crash 12D.
2.6.3 Binary Arithmetic Operators for Vectors and Matrices
The binary arithmetic operators for vectors and matrices are
+          addition
-          subtraction
*          multiplication of matrices
*          dot product of vectors
Assignment and Operators

^          cross product of two vectors
where the following combinations are allowed
Vector2 + Vector2 = Vector2 Vector2 - Vector2 = Vector2
Vector3 + Vector3 = Vector3 Vector3 - Vector3 = Vector3
Vector4 + Vector4 = Vector4         Vector4 - Vector4 = Vector4
Real * Vector2 = Vector2 Vector2 * Real = Vector2 Vector2 / Real= Vector2
Real * Vector3 = Vector3 Vector3 * Real = Vector3 Vector3 / Real= Vector2
Real * Vector4 = Vector4      Vector4 * Real = Vector4             Vector4 / Real= Vector4
Vector2 * Vector2 = Real * is the dot product between the two vectors
Vector3 * Vector3 = Real * is the dot product between the two vectors
Vector4 * Vector4 = Real               * is the dot product between the two vectors
Vector2 ^ Vector2 = Vector3 ^ is the cross product between the two Vector2 vectors
                                                     Note: to form this cross product, the Vector2’s are turned into 
                                                     Vector3’s by adding the third dimension with value 0.
Vector3 ^ Vector3 = Vector3         ^ is the cross product between the two Vector3 vectors
Matrix3 + Matrix3 = Matrix3 Matrix3 - Matrix3 = Matrix3 Matrix3 * Matrix3 = Matrix3
Matrix4 + Matrix4 = Matrix4         Matrix4 - Matrix4 = Matrix4         Matrix4 * Matrix4 = Matrix4
Real * Matrix3 = Matrix3 Matrix3 * Real = Matrix3 Matrix3 / Real= Matrix3
Real * Matrix4 = Matrix4       Matrix4 * Real = Matrix4              Matrix4 / Real= Matrix4
Vector3 * Matrix3 = Vector3 Note that the Vector3 is treated as a row vector.
Matrix3 * Vector3 = Vector3           Note that the Vector3 is treated as a column vector.
Vector4 * Matrix4 = Vector4 Note that the Vector4 is treated as a row vector.
Matrix4 * Vector4 = Vector4           Note that the Vector4 is treated as a column vector.
A vector of dimension 2, 3 or 4 can be cast to a vector of a higher or a lower dimension.
If casting to a dimension of one higher, the new component is set by default to 1.0.
For example a Vector2 represented by (x,y) is cast to a Vector3 (x,y,1).
When casting to a dimension of one lower, the vector is homogenized and the last component 
(which has the value 1) is dropped. 
For example, a Vector4 represented by (x,y,z,w) is cast to a Vector3 as (x/w,y/w,z/w).
So for example
Vector2 * Matrix3 = Vector3             requires Vector2 say (x,y) to be cast to a Vector3 so that this
                                                         make sense and the operation is defined as (x,y,1)*Matrix3
Assignment and Operators
2.6.4 Relational Operations
The relational operators are
<                           less than
<=                         less than or equal to
>                           greater than
>=                         greater than or equal to
These operations are for Integer, Integer64, Real and Text types.
As in January 2022, although the compiler accept the syntax for the relational operations for 
Vector2, Vector3, Vector4, Matrix3, Matrix4 type, but the actual comparisions in the run time have 
not yet being implemented yet.
2.6.5 Logical Operators
The logical operators are
==                         equal to
!=                          not equal to
||                            inclusive or
&&                       and
!                            not
As in January 2022, although the compiler accept the syntax for the equal and not-equal operations 
for Vector2, Vector3, Vector4, Matrix3, Matrix4 type, but the actual comparisions in the run time 
have not yet being implemented yet.
2.6.6 Increment and Decrement Operators
The increment and decrement operators are
++                          post and pre-increment          e.g.  i++ which is shorthand for i = i + 1
--                            post and pre-decrement         e.g.  i-- which is shorthand for i = i - 1
2.6.7 Bitwise Operators
The bitwise operators are
&                         bitwise and
|                           bitwise inclusive or
^                          bitwise exclusive or
~                          one's complement (unary)
2.6.8 Assignment Operators
assignment operator
Assignment and Operators

For some operators op, the assignment operator op= is supported where for expressions expr1 and 
expr2:
expr1  op= expr2
means
expr1 = (expr1) op (expr2)
where the supported assignment operators for op= are
 += -= *= /=     %=
For example
x += 2  is shorthand for  x = x + 2
x *= 2  is shorthand for  x = x * 2
Statements and Blocks
2.7 Statements and Blocks
An expression such as x = 0  or i++ becomes a statement when it is followed by a semi-colon.
Curly brackets { and } (braces) are used to group declarations and statements together into a 
compound statement, or block, so that they are syntactically equivalent to a single statement. 
There is no semi-colon after the right brace that ends a block.
Blocks can be nested but cannot overlap.
Examples of statements are
x = 0;
i++;
fred = 2 * joe + 9.0;
An example of a compound statement or block is 
{
 x = 0;
 i++;
 fred = 2 * joe + 9.0;
}
For more information, see 3.12 Blocks and Scopes.
Flow Control

2.8 Flow Control
In a macro, the normal processing flow is that a statement is processed and then the following 
statement is processed.
The flow control statements of a language change the order in which statements are processed.
12dPL supports a subset of the C++ flow control statements but before they can be examined, we 
need to look at logical expressions.
2.8.1 Logical Expressions
Many flow control statements include expressions that must be logically evaluated. 
That is, the flow control statements use expressions that must be evaluated as being either true or 
false.
For example,
a is equal to b             a == b
a is not equal to b       a != b
a is less than b           a < b
Following C++, 12dPL extends the expressions that have a truth value to any expression that can 
be evaluated arithmetically by the simple rule:
an expression is considered to be true if its value is non-zero, otherwise it is considered 
to be false.
Hence the truth value of an arithmetic expression is equivalent to:
 "value of the expression" is not equal to zero
For example, the expression
a + b
is true when the sum a+b is non-zero.
Any expression that can be evaluated logically (that is, as either true or false) will be called a logical 
expression.
2.8.2 12dPL Flow Controls
The flow control statements supported by 12dPL are listed below and each will be defined in the 
following sections
2.8.3 if, else, else if 
 2.8.4 Conditional Expression
 2.8.5 Switch
 2.8.6 While Loop
 2.8.7 For Loop
 2.8.8 Do While Loop
 2.8.9 Continue
 2.8.10 Break
 2.8.11 Goto and Labels
Flow Control
2.8.3 if, else, else if
12dPL supports the standard C++ if, else and else if structures.
if
if (logical_expression)
       statement
is interpreted as:
  If logical_expression is true then execute the statement.
  If logical_expression is false then skip the statement.
For example
if (x == 5) {
      x = x + 1;
      y = x * y;
}
Notice that in this example the statement consists of the block 
{ x = x + 1;
   y = x * y;
}
The expressions in the block are only executed if x is equal to 5.
else
if (logical_expression) 
     statement1
else
     statement2
is interpreted as
If logical_expression is true then execute statement1.
If logical_expression is false then execute statement2.
else if
if (logical_expression1) 
     statement1
else if (logical_expression2)
     statement2
else
     statement3
is interpreted as
Flow Control

If logical_expression1 is true then execute statement1.
If logical_expression1 is false then 
(if logical_expression2 is true then execute statement2 otherwise execute statement3)
2.8.4 Conditional Expression
12dPL supports the standard C++ conditional expression:
logical_expression ? expression  : expression2
is interpreted as
    if (logical_expression) then
         expression1
    else
         expression2
For example,
y = (x >= 0) ?  x : -x;
means that y is set to x if x is greater than or equal to zero, otherwise it is set to -x. Hence y is set to 
the absolute value of x.
2.8.5 Switch
12dPL supports a switch statement.
The switch statement is a multi-way decision that tests a value against a set of constants and 
branches accordingly.
In its general form, the switch structure is:
switch (expression) {
     case constant_expression : { statements }
     case constant_expression : { statements }
     default  : { statements }
}
Each case is labelled by one of more constants.
When expression is evaluated, control passes to the case that matches the expression value.
The case labelled default is executed if the expression matches none of the cases. A default is 
optional; if it isn't there and none of the cases match, no action takes place.
Once the code for one case is executed, execution falls through to the next case unless explicit 
action is taken to escape using break, return or goto statements.
A break statement transfers control to the end of the switch statement (see 2.8.10 Break).
Warning
Unlike C++, in 12dPL the statements after the case constant_expression: must be enclosed in 
curly brackets ({}).
Example
Flow Control
An example of a switch statement is:
          switch (a) {
case 1 : {
  x = y;
  break;
}
case 2: {
  x = y + 1;
  z = x * y;
}
case 3: case 4: {
  x = z + 1;
  break;
}
default : {
  y = z + 2;
  break;
}
          }
Notes
1. Some people like to put the break after the closing } for the case. For example
case 1 : {
  x = y;
} break;
2. In the switch example, if control goes to case 2, it will execute the two statements after the case 
2 label and then continue onto the statements following the case 3 label.
Restrictions
1. Currently the switch statement only supports an Integer, Integer64, Real or Text expression. All 
other expression types are not supported.
2. Statements after the case constant_expression: must be enclosed in curly brackets ({}).
Flow Control

2.8.6 While Loop
12dPL supports the standard C++ while statement.
while (logical_expression)
 statement
is interpreted as:
(a)
If logical_expression is true, execute statement and then test the logical_expression again.
(b)
repeat (a) until the logical_expression is false.
For example, in
x = 10.0;
product = 1.0;
while (x > 0) {
 product = product * x;
 
 x = x - 1;
}
the block
{  product = product * x;
 x = x - 1;
}
will be repeated until x is not greater than zero (i.e. until x is less than or to equal zero).
Flow Control
2.8.7 For Loop
12dPL supports the standard C++ for statement.
for (expression1;logical_expression;expression2)
 
statement
is interpreted as:
expression1;
while (logical_expression) {
     statement;
     expression2;
}
In long hand, this means:
(a)
first execute expression1.
(b)
if logical_expression is true, execute statement and expression2 and then test 
logical_expression again.
(c)
repeat (b) until the logical_expression is false.
For example
j = 0;
for (i = 1; i <= 10; i++) 
    j = j + i;
would sum the numbers 1 through to 10.
Notes
1. Any of the three parts expression1, logical_expression and expression2 can be omitted from 
the for statement but the semi-colons must remain.
2. If expression1 or expression2 is omitted, it is simply dropped from the expansion.
3. If the test, logical_expression is missing, it is taken as permanently true.
Restrictions
1. At this stage for(;;) is not allowed
2. At this stage, please avoid having more than one statement for expression2.
For example, avoid
for(expression1;logical_expression;i++,j++)
because j++ will not be evaluated correctly.
Flow Control

2.8.8 Do While Loop
12dPL supports the standard C++ do while statement:
do
statement
while (logical_expressions);
is interpreted as:
Execute statement and then evaluate logical_expression.
If logical_expression is true, execute statement and then test logical_expression again.
This cycle continues until logical_expression is false.
For example
i = 1;
do {
 x = x + i;
 i++;
} while (i < 10);
2.8.9 Continue
The continue statement causes the next iteration of the enclosing for, while or do while loop to 
begin.
In the while and do while, this means that the test part is executed immediately.
In the for, control passes to the evaluation of expression2, normally an increment step.
Important Note
The continue statement applies only to loops. A continue inside a switch inside a loop causes the 
next loop iteration.
2.8.10  Break
break is used to exit from a do, for, or while loop, bypassing the normal loop condition. It is also 
used to exit from a switch statement.
In a switch statement, break keeps program execution from "falling through" to the next case. A 
break statement transfers control to the end of the switch statement.
A break only terminates the for, do, while or switch statement that contains it. It will not break out 
of any nested loops or switch statements.
Flow Control
2.8.11 Goto and Labels
12dPL supports the standard C++ goto and labels.
A label has the same form as a variable name and is followed by a colon. It can be attached to any 
statement in a function. A label name must be unique within the function.
A goto is always followed by a label and then a semi-colon.
When a goto is executed in a macro, control is immediately transferred to the statement with the 
appropriate label attached to it. There may be many gotos with the same label in the function.
An example of a label and a goto is:
for ( ... ) {
  ...
  goto error;
  ...
}
...
error:
statements
When the goto is executed, control is transferred to the label error.
Note
A goto cannot be used to jump over any variables defined at the same nested level as the goto. 
Extra curly bracket ({}) may need to be placed around the offending code to increase its level of 
nesting.
Precedence of Operators

2.9 Precedence of Operators
12dPL has the same precedence and associativity rules as C++. For convenience, the order is 
summarized in the table below.
In the table,
              operators on the same line have the same precedence;
              rows are in order of decreasing precedence.
For example, *, / and % all have the same precedence which is higher than that of binary + and -.
The "operator" () refers to function call.
Operators                                                Associativity
()     []                                                          left to right
!   ~   ++   --   +   -   *   &                            right to left
*    /    %                                                      left to right
+    -                                                             left to right
<<    >>                                                        left to right
<    <=    >    >=                                           left to right
==    !=                                                        left to right
&                                                                 left to right
^                                                                  left to right
|                                                                   left to right
&&                                                              left to right
||                                                                  left to right
?                                                                  right to left
=    +=   -=   *=   /=   %=   &=   ^=   |=       right to left
Unary + and - have higher precedence than the binary forms.
Preprocessing
2.10 Preprocessing
You can include other files by the command
#include "filename"
The example below shows how to include file "a.h" into "b.4dm.
// file a.h
Point Coord(Real x,Real y,Real z)
{
  Point p;  Set_x(p,x)   Set_y(p,y);  Set_z(p,z);
  return(p);
}
// file b.4dm
#include "a.h"
void main()
  {
  Point p = Coord(10.0,20.0,2.34);           // create a point
}
The above example is equivalent to the following one file:
Point Coord(Real x,Real y,Real z)
{
  Point p;  Set_x(p,x);  Set_y(p,y);  Set_z(p,z);
  return(p);
}
void main()
{
  Point p = Coord(10.0,20.0,2.34);            // create a point
}
Preprocessing

Functions
3  Functions
See 3.1 Functions
See 3.2 Main Function
See 3.3 User Defined Functions
See 3.6 Function Prototypes
See 3.7 Automatic Promotions
See 3.8 Passing by Value or by Reference
See 3.9 Overloading of Function Names
See 3.10 Recursion
See 3.11 Assignments Within Function Arguments
See 3.12 Blocks and Scopes
3.1 Functions
Functions can be used to break large computing tasks into smaller ones and allow users to build on 
software that already exists.
Basically a program is just a set of definitions of variables and functions. Communication between 
the functions is by function arguments, by values returned by the functions, and through global 
variables (see the section 3.12 Blocks and Scopes).
The 12dPL program file must contain a starting function called main as well as zero or more user 
defined functions. 
User defined functions must occur in the file before they are used in the program file unless a 
Function Prototype is included before the function is used. If this occurs then the user defined 
function can be defined anywhere in the file. See 3.6 Function Prototypes.
The syntax for user defined functions will be described in the following sections. See 3.3 User 
Defined Functions.
A large number of functions are supplied with 12dPL to make tasks easier for the program writer. 
These 12dPL supplied functions are predefined and nothing special is needed to use them. The 
12dPL supplied functions will all be defined later in the manual.
In 12dPL, function names must start with an alphabetic character and can consist of upper and/or 
lower case alphabetic characters, numbers and underscores (_). 
There is no restriction on the length of function names. Function names cannot be the same as any 
of the 12dPL keywords or variable names in the program.
12dPL function names are case sensitive.
Note
All 12dPL supplied functions begin with a capital letter to help avoid clashes with any user variable 
names.
Main Function

3.2 Main Function
A 12dPL program must contain a special function called main. This function is the designated start 
of the program.
The main function is simply a header void main () followed by the actual program code enclosed 
between a start brace { and an end brace }.
Hence the function called main is a header followed by a block of code:
  void  main ()
         {
             declarations and statements
             i.e. program code
         }
When a program is run, the entry point to the program file is at the beginning of the function called 
main.
Hence every program file must have one and only one function called main.
The function main is terminated when either
(a)
the last line of code in the function is run
or
(b)
a return statement
      return;
is executed in the function main.
The function main is usually referred to as the main function.
User Defined Functions
3.3 User Defined Functions
As well as the main function, a program file can also contain user defined functions.
Like the main function, user defined functions consist of a header followed by the program code 
enclosed in braces.
However the header for a user defined function must include a return type for the function and the 
order and variable types for each of the parameters of the function.
Hence each user defined function definition has the form
 return-type  function-name(argument declarations)
 {
 declarations and statements
           }
For example, a function called "user_function" which has a return type of Integer and parameters of 
type Integer, Real and Element could be: 
 Integer user_function (Integer fred, Real joe, Element tom)
 {
 program code
           }
3.4 Return Statement
The return statement in a function is the mechanism for returning a value from the called function to 
its caller using the return-type of the function.
The general definition of the return statement is:
                      return expression;
For a function with a void return-type (a void function), the expression must be empty. That is, for a 
void return-type you can only have return and no expression since no value can be returned. 
Thus for a void function the return statement is
                      return;
Also for a void function, the function will implicitly return if it reaches the end of the function without 
executing a return statement.
The function main is an example of a void function.
For a function with a non-void return-type (a non-void function), the expression after the return must 
be of the same type as the return type of the function. Hence any function with a non-void return-
type must have a return statement with the correct expression type.
The calling function is free to ignore the returned value.
Restrictions
Unlike C++, in 12dPL the last statement for a function with a non-void return type must be a return 
statement.
Array Variables as Function Arguments

3.5 Array Variables as Function Arguments
Arrays can be used a function arguments.
The declaration of an array variable as a function argument consists of the array variable type 
followed by the array name and an empty set of square brackets ([]).
For example, the function
  Integer user_function (Integer fred, Real joe[])
 {
 program code
                      }
has a Real array as the second argument.
Function Prototypes
3.6 Function Prototypes
Since all functions and variables must be defined before they are used, then for any user defined 
functions either 
(a)
the function must appear in the file before it is called by another function
or
(b)
a prototype of the function must be declared before the function is called.
A function prototype is simply a declaration of a function which specifies:
1.  the function name
2. the function return type
and
3.  the order and type of all the function parameters.
A function prototype looks like the function header except that it is terminated by a semi-colon 
instead of being followed by braces and the function code. Also, the variable names need not be 
included in the function prototype.
For example, two prototypes for the function user_function are
             Integer user_function (Integer fred, Real joe, Element tom);
             Integer user_function (Integer, Real, Element);
Thus prototypes are simply a method for defining the return type and the arguments and the 
argument types of a function so that the function can be used in a program before the code for the 
function has been found in the file.
Notes
(a)
The function main and any 12dPL supplied functions do not have to be defined or prototyped 
by the user.
(b)
A function prototype can occur more than once in a file.
(c)
The main function and all the user defined functions must exist in either the one file or be 
included from other files using the #include statement.
Automatic Promotions

3.7 Automatic Promotions
If needed, the following promotions are automatically made in the language:
                      From                                             To
                      Integer                                         Real
                      Real                                             Integer
                      Integer64                                     Real
                      Real                                             Integer64
                      Integer                                         Integer64
                      Integer64                                     Integer
                      Model                                          Dynamic_Element
                      Element                                       Dynamic_Element
                      Tin                                              Element, Dynamic_Element
                      Point                                            Segment
                      Line                                            Segment
                      Arc                                              Segment
                      Vector2                                       Vector3
                      Vector3                                       Vector4
                      Vector3                                       Vector2
                      Vector4                                       Vector3
These automatic promotions can occur 
(a)
when looking for functions with matching argument types
or
(b)
for converting expressions in a return statement to the correct return-
type required for the function.
Hence in the following example, the variable x is automatically promoted to a Real for use by the 
function silly.
 Real silly(Real x) { return(x+1); }
 void main()
 {
 Integer x = 10; 
 Real y = silly(x);
                }
For number in binary operation with mixed types, the result would be the one of the higher type, the 
type order from lowest to highest is: Integer << Integer64 << Real
For example 6 + 9LL is a 64 bit Integer 15LL         2.0 * 3LL is a Real 6.0
Note that calculation will be overflow but not auto promotion; for example 2048 * 2048 * 2048 will be 
an Integer that equal 0 (2 power 33)
Passing by Value or by Reference
3.8 Passing by Value or by Reference
12dPL follows C++ in that a function argument can be passed "by value" or "by reference".
Passed by Value
If a function argument is passed by value, then calling function only passes a temporary copy of 
the variable to the called function. Any modification of this temporary variable inside the called 
function will not affect the value of the variable in the calling function.
Hence in passed by value transfer of the argument value is only in one direction - from the calling 
function into the called function.
In 12dPL, the default for non-array arguments is passed by value.
Passed by Reference
However it is also possible to pass down the actual variables from the calling function to the 
called function. This is termed passed by reference.
If a function argument is passed by reference then any modification made to the passed variable 
within the called function will be modifying the original argument in the calling function.
Hence in passed by reference transfer of the argument value is in two directions and any 
modifications to the passed variable withing the called function will affect the variable in the calling 
function.
To denote that a variable is to be passed by reference, an ampersand (&) is placed after the type 
of the argument in the function definition and any function prototypes.
For example, in the function user_function1, the variables fred and tom are to be passed by value 
and the variable joe is to be passed by reference. The function code is:
 Integer user_function1 (Integer fred, Real &joe, Element tom)
 {
 program code
                 }
Matching prototypes for user_function1:
                 Integer user_function1 (Integer fred, Real& joe, Element tom);
                 Integer user_function1 (Integer fred, Real &joe, Element tom);
                 Integer user_function1 (Integer fred, Real & joe, Element tom);
                 Integer user_function1 (Integer, Real&, Element);
                 Integer user_function1 (Integer, Real &, Element);
If a called function is to return a value to the calling function via one of its arguments, then the 
argument must be passed by reference.
To clarify the difference between passed by value and passed by reference, consider the following 
examples:
void bad_square(Integer x) { x = x*x;}// x is passed by value
void main()
{
 Integer x = 10;
 bad_square(x);
 // pass by value
 // x still equals 10
Passing by Value or by Reference

}
void square(Integer &x) { x = x*x;}   // x is passed by reference
                      void main ()
                      {
                          Integer x = 10;
                          square(x);
                      // pass by reference
   // x now equals 100
                      }
Notes
(a)
Fixed arrays are always passed by reference.
(b)
In Fortran and Basic, all arguments are "pass by reference"
(c)
In C++ and Pascal, arguments can be passed by value or by reference 
Overloading of Function Names
3.9 Overloading of Function Names
In 12dPL, if you have a number of functions that have the same name but with a different number of 
arguments and/or different argument types, there is no need to give each function a different name.
As long as the argument numbers or argument types differ in some way, 12dPL will determine the 
correct function to call.
For example, three functions called swap have been defined but they are all different because they 
have differing argument types.
  void swap(Integer &x,Integer &y) { Integer  z = x; x = y; y = z;}
  void swap(Real &x,Real &y) { Real z = x; x = y; y = z;}
  void swap(Text &x,Text &y) { Text z = x; x = y; y = z;}
  void main()
  {
 Integer ix = 1 , iy = 2;
 Real rx = 1.0  , ry = 2; // automatic promotion of 2 to 2.0
 Text tx = "1" , ty = "2";
 swap(ix,iy);
 swap(rx,ry);
 swap(tx,ty);
  }
Note however that in some cases there may be more than one function that can be used. This is 
especially true when promotions are required to match the function.
If more than one match is found, the compiler will issue an error and display the functions that 
match. If no match is found, the compiler will display all functions which overload the specified 
function name.
 void swap(Integer &x,Integer &y) { Integer z = x; x = y;}
 void swap(Real &x,Real &y) { Real z = x; x = y;}
 void swap(Text &x,Text &y) { Text z = x; x = y;}
 void main()
 {
 Integer ix = 1 , iy = 2;
 Real rx = 1 , ry = 2;
 Text tx = "1"  , ty = "2";
 swap(ix,ry); // 2 matches
 // swap(Integer &,Integer &)
 // swap(Real &,Real &)
 swap(tx,ry);// no match
    }
An example of overloaded functions is redraw_views in 6.11 Example 6.
WARNING FOR C++ PROGRAMMERS
Since there is no explicit cast operator, the only way to cast is to introduce a temporary variable and 
use an assignment. For example, to fix the error in the above example where two matches occur, 
assign ry to an intermediate variable.
    Integer iry = ry;
    swap(ix,iry);             // ok, it uses swap(Integer &,Integer &)
    Real rix = ix;
    swap(rix,ry);            // ok, it uses swap(Real &,Real &)
Recursion

3.10 Recursion
Recursion for functions is supported.
For example,
 int fib(int n)
 {
 return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
 }
Assignments Within Function Arguments
3.11 Assignments Within Function Arguments
In 12dPL, assignments are not allowed within function arguments.
For example, in the following code fragment, y = 10.0 does not assign 10.0 to y.
 Real silly(Real x) { return(x); }
 void main()
 {
 Real y;
 Real z = silly(y=10.0);
                }
To actually assign 10.0 to y, enclose the statement in round brackets ( and ). That is
    Real z = silly((y=10.0));
assigns 10.0 to y and z.
Assignment within a call argument is being reserved for future use by 12dPL for functions with 
named arguments.
Blocks and Scopes

3.12 Blocks and Scopes
As noted earlier, a block is a code fragment contained within the characters { and } (braces).
Blocks can be nested. That is, a block may contain one or more sub-blocks. However, blocks cannot 
overlap.
Hence a closing brace } is always paired with the closest previous unpaired open brace {.
In the example below, block a is also the function body of main. Blocks b and c are sub-blocks of 
block a.
The scope of a name is the region of the program text within which the name's characteristics are 
understood.
In 12dPL, there are three kinds of scope:  local,  function,  and global (file).
Local             A name declared in a block is local to that block and can be used in the block, and in 
any blocks enclosed by the block after the point of declaration of the name. 
Function        Labels can be used anywhere in the function in which they are declared, Only labels 
have function scope.
Global           A name declared outside all functions has global (or file) scope and can be used 
anywhere after its point of declaration.
In 12dPL, variables with global (file) scope must be declared in an enclosing set of 
braces.
There can be more than one global section.
Hence, in the following example
  { Integer an_integer;
 Real a_real;
 Element an_element;
  }
  void main()
  {
--*
void main()
{
  Integer a = 1;
  {
 Integer x = 10;
 Print(x+a);  Print("\n");
  }
  {
 Real x = 10;
 Print(x+a);  Print("\n");
 }
}
block a
block b
block c
Blocks and Scopes
 fred:Integer a = 1;
 |
 {
--*
 |
 Integer x = 10;
 |
 |
 an_integer = 20;
 | block b
 |
 Print(x+a+an_integer);> |
 |
 Print("\n");
 |
 |
  }
--*
 |
 
 | block a
 {
--*
 |
 Real x = 10;
 | block c
 |
 Print(x+a);  Print("\n");
 |
 |
  }
 --*
 |
 goto fred;
 |
  }
--*
the variables an_integer, a_real and an_element have global scope and can be used anywhere in 
the file after their definition.
The Integer variable "a" has local scope and because of the position in the block, can be used inside 
blocks b and c.
The Integer variable "x" is defined in block b and has local scope. It is not usable outside that block.
The Real variable "x" is defined in block c and has local scope. It is not usable outside that block.
WARNING
A variable name may be hidden by an explicit declaration of that same name in an enclosed block.
Because of the potential for confusion, it is best to avoid variable names that are the same as a 
variables in an outer block.
Blocks and Scopes