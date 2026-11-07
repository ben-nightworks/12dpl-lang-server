> **Source:** 12d Model Macro Programming Manual — §5.38 (pp.393–585), §5.39 (pp.586–600), §5.41 (pp.616–621), §5.42 (pp.622–623), §5.43 (pp.624–639), §5.44 (pp.640–643), §5.53 (pp.842–876)

# Super Strings in 12d Model

## Overview: What is a Super String

---

```
Page 392
Super String Element
 12d Model Macro Manual
5.38 Super String Element
The Super String is a very general string which was introduced to not only replace the string types 
2d, 3d, 4d, interface, face, pipe and polyline, but also to allow for combinations that were never 
allowed in the old strings. For example, to have a polyline string but with a pipe diameter, or a 2d 
string with text at each vertex. 
Different strings to cover every possible combination would have required hundreds of different 
string types. A better solution was to have one string type that has information to cover all of the 
properties of the other strings, and the ability to more easily add other properties now and in the 
future. This flexible string is the Super String.
Having all possible combinations defined for every Super String would be very inefficient for 
computer storage and processing speed, so the Super String uses the concept of dimensions to 
refer to the different types of information that could be stored in the Super String.
Each dimension is well defined and is also optional so that no unnecessary information is required 
to be stored.
A Super String always has an (x,y) value for each vertex but what other information exists for a 
particular Super String depends on what optional dimensions are defined for that Super String.
For example, there are two Height dimensions called Att_ZCoord_Value and Att_ZCoord_Array. If 
Att_ZCoord_Value is set then the super string has a constant height value for the entire string (2d 
super string), and if Att_ZCoord_Array is set, then there is a z value for each vertex (3d super 
string). If both are set then Att_ZCoord_Array takes precedence
So the two Height dimensions cover the functionality of both the old 2d string (one height for the 
entire string) and the old 3d string (different z value at each vertex). Plus the 2d super string only 
requires the storage of one height like the old 2d string and not the additional storage required for a 
z value at every vertex that the 3d string needs.
Please continue to 5.38.1 Super String Dimensions
5.38.1 Super String Dimensions
The super string supports over 50 different dimensions. 
Each dimension has a unique number and also a unique name and either the unique name or the 
dimension number can be used in calls requiring a super string dimension.
When creating a super string, the super string must be told that a particular dimension is to exist (by 
setting the dimension on or off) and there are function calls to set each dimension (Set_super_use 
calls) on or off. 
For an existing super string, there are inquiry calls to check if a particular dimension is on or off 
(Get_super_use calls). The Set_super_use and Get_super_use function calls are documented after 
the documentation on dimensions.
Some dimensions are mutually exclusive (that is, only one of them can exist) and others can exist 
together but one may take precedence over others. 
In the definitions of the dimensions, where two dimensions are listed on the one line with an or 
between them, then if both exist, the array dimension takes precedence over the value 
dimension, and the super string may compress or remove the value dimension.
Although there are calls to set each of the dimensions individually, it is also possible to set more 
than one dimension at once using flags that combine dimension values (see 5.38.1.1 Dimension 
Combinations and Super String Flags)
Page 393
Super String Element
Chapter 5  12dPL Library Calls
The dimension definitions and the user function calls are not given in dimension number order but 
for convenience are grouped together by common functionality.
Finally there are also general super string creation and data setting calls documented in the 
sections 5.38.2 Basic Super String Functionsand 5.55 General Element Operations.
For information on each of the Super String Dimensions:
See  Height Dimensions
See  Segment Radius Dimension
See  Interval Dimensions
See  Pipe/Culvert Dimensions
See  Vertex Text Dimensions
See  Vertex Text Annotation Dimensions
See  Segment Text Dimensions
See  Segment Text Annotation Dimensions
See  Point Id Dimension
See  Vertex Symbol Dimensions
See  Tinability Dimensions
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions
See  Hole Dimension
See  User Defined Vertex Attributes Dimensions
See  User Defined Segment Attributes Dimensions
See  Colour Dimension
See  Vertex Image Dimensions
See  Segment Geometry Dimension
See  Visibility Dimensions
See  Matrix Dimension
See  UID Dimensions
See  Database Point Dimensions
See  Extrude Dimensions
See  Null Levels Dimensions
For information on setting more than one dimension at once, see 5.38.1.1 Dimension Combinations 
and Super String Flags
For information on the functions for creating super strings (with flags to set dimension) and for 
loading and inquiring on the standard (x,y,z,radius,bulge) data, see 5.38.2 Basic Super String 
Functions
For information on the Super String function calls for setting and inquiring on each particular 
dimension, and calls for loading and inquiring on the particular data for that dimension:
See 5.38.3 Super String Height Functions
See 5.38.4 Super String Tinability Functions
See 5.38.5 Super String Segment Radius Functions
See 5.38.7 Super String Point Id Functions
See 5.38.8 Super String Vertex Symbol Functions
See 5.38.9 Super String Pipe/Culvert Functions
See 5.38.10 Super String Vertex Text and Annotation Functions
See 5.38.11 Super String Segment Text and Annotation Functions
See 5.38.12 Super String Fills - Hatch/Solid/Bitmap/Pattern/ACAD Pattern Functions
See 5.38.13 Super String Hole Functions
See 5.38.14 Super String Segment Colour Functions
See 5.38.15 Super String Segment Geometry Functions
See 5.38.16 Super String Extrude Functions
Page 394
Super String Element
 12d Model Macro Manual
See 5.38.18 Super String Vertex Attributes Functions
See 5.38.19 Super String Segment Attributes Functions
See 5.38.20 Super String Uid Functions
See 5.38.21 Super String Vertex Image Functions
See 5.38.22 Super String Visibility Functions
Height Dimensions
Att_ZCoord_Array        2       or only      Att_ZCoord_Value       1
If Att_ZCoord_Array  is set, then the super string has a z-value for each vertex.
If Att_ZCoord_Value  is set and Att_ZCoord_Array  not set, then the super string has one z-value 
for the entire string.
If neither dimension exists, then the string with no height. That is, it is a string with null height.
See 5.38.3 Super String Height Functionsfor calls to set/inquire on these dimensions, and to load/retrieve 
data for these dimensions.
Segment Radius Dimension
Att_Radius_Array            3
Att_Major_Array              4
If Att_Radius_Array is set, then the super string segments can be arcs, and there is an array to 
record the radius of the arc for each segment.
If Att_Major_Array is set, then there is an array to record for each segment if the arc is a major or 
minor arc. That is, the bulge value (bulge of segment b = 1 for major arc > 180 degrees, b = 0 for 
minor arc < 180 degrees).
If neither dimension is set, then all the string segments are straight lines.
NOTE: In the current implementation, the Att_Major_Array is automatically set when 
Att_Radius_Array is set.
See 5.38.5 Super String Segment Radius Functionsfor calls to set/inquire on these dimensions, and to 
load/retrieve data for these dimensions.
Interval Dimensions
Att_Interval_Value                 50
If Att_Interval_Value is set, then for triangulation purposes there is a Real interval_distance used 
to add extra temporary vertices into the super string, and a chord_arc_distance which is also 
used as a chord to arc tolerance for adding additional temporary vertices into the super string.
See 5.38.17 Super String Interval Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Point Id Dimension
Att_Point_Array                11           For a Point id at each vertex
If Att_Point_Array is set, then the super string can have a Point Id at each vertex.
See 5.38.7 Super String Point Id Functionsfor calls to set/inquire on this dimension, and to load/retrieve 
data for this dimension.
Vertex Symbol Dimensions
Att_Symbol_Array              18         or only          Att_Symbol_Value           17
If Att_Symbol_Array is set, then the super string can have symbols at each vertex.
Page 395
Super String Element
Chapter 5  12dPL Library Calls
If Att_Symbol_Value  is set and Att_Symbol_Array not set, then the super string has the one 
symbol for each vertex of the string.
See 5.38.8 Super String Vertex Symbol Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Tinability Dimensions
Att_Contour_Array                   3     This dimension applies for both vertex and segment tinability.
Att_Vertex_Tinable_Array       38    or only     Att_Vertex_Tinable_Value       37
If Att_Vertex_Tinable_Array is set, then the super string can have a different tinability at each 
vertex.
If Att_Vertex_Tinable_Value  is set and Att_Vertex_Tinable_Array not set, then the super string 
has the one tinability value to be used for all vertices of the string.
Att_Segment_Tinable_Value    39   or     Att_Segment_Tinable_Array     40
If Att_Segment_Tinable_Array is set, then the super string can have a different tinability for each 
segment.
If Att_Segment_Tinable_Value  is set and Att_Segment_Tinable_Array not set, then the super 
string has the one tinability value to be used for all segments of the string.
See 5.38.4 Super String Tinability Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Pipe/Culvert Dimensions
Att_Pipe_Justify
23
If Att_Pipe_Justify is set, then the super string has a justification for the pipe or culvert.
Att_Diameter_Value
5            or        Att_Diameter_Array           6
If Att_Diameter_Array  is set, then the super string is a round pipe has a diameter and wall 
thickness for each segment.
If Att_Diameter_Value  is set and Att_Diameter_Array  not set, then the super string is a round 
pipe has one diameter and one wall thickness value for the entire string.
Att_Culvert_Value
24          or        Att_Culvert_Array               25
If Att_Culvert_Array  is set, then the super string is a rectangular pipe (culvert) and has a width, 
height and top, bottom, left and right wall thicknesses for each segment.
If Att_Culvert_Value  is set and Att_Culvert_Array  not set, then the super string has one width, 
height, and top, bottom, left and right wall thicknesses for the entire string.
If none of the Pipe/Culvert dimensions exist, then the string is infinitesimally thin. Note that you 
cannot have both diameter dimensions and culvert dimensions.
Also having the Att_Pipe_Justify dimension by itself will do nothing. If Att_Pipe_Justify does not 
exist, the pipe/culvert are centreline based.
See 5.38.9 Super String Pipe/Culvert Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Vertex Text Dimensions
Att_Vertex_Text_Value           10     or       Att_Vertex_Text_Array          7
If Att_Vertex_Text_Array is set, then the super string can have different text at each vertex.
If Att_Vertex_Text_Value  is set and Att_Vertex_Array not set, then the super string has the same 
text for each vertex of the string.
Note that it is possible to have text associated with a vertex but it is not visible on a plan view. To be 
Page 396
Super String Element
 12d Model Macro Manual
able to draw the text on a plan view, see  Vertex Text Annotation Dimensions.
See 5.38.10 Super String Vertex Text and Annotation Functionsfor calls to set/inquire on these 
dimensions, and to load/retrieve data for these dimensions.
Vertex Text Annotation Dimensions
Att_Vertex_World_Annotate        30
Att_Vertex_Paper_Annotate        45
Att_Vertex_Annotate_Value        14       or        Att_Vertex_Annotate_Array        15
If Att_Vertex_Annotate_Array is set, then the super string can have a different annotation for the 
text at each vertex.
If Att_Vertex_Annotate_Value  is set and Att_Vertex_Annotate_Array not set, then the super 
string has the one annotation to be used for all text on all the vertices of the string.
If Att_Vertex_World_Annotate and Att_Vertex_Paper_Annotate do not exist, then the annotated text 
is device.
See 5.38.10 Super String Vertex Text and Annotation Functionsfor calls to set/inquire on these 
dimensions, and to load/retrieve data for these dimensions.
Segment Text Dimensions
Att_Segment_Text_Value       22    or        Att_Segment_Text_Array      8
If Att_Segment_Array is set, then the super string can have text for each segment.
If Att_Segment_Value  is set and Att_Segment_Array not set, then the super string has the same 
text for each segment of the string.
Note that it is possible to have text associated with a segment but it is not visible. To be able to draw 
the text, see  Segment Text Annotation Dimensions.
See 5.38.11 Super String Segment Text and Annotation Functionsfor calls to set/inquire on these 
dimensions, and to load/retrieve data for these dimensions.
Segment Text Annotation Dimensions
Att_Segment_World_Annotate        31
Att_Segment_Paper_Annotate        46
Att_Segment_Annotate_Value  20       or     Att_Segment_Annotate_Array        21
If Att_Segment_Annotate_Array is set, then the super string can have a different annotation for 
the text on each segment.
If Att_Segment_Annotate_Value  is set and Att_Segment_Annotate_Array not set, then the 
super string has the one annotation to be used for all text on all the segments of the string.
If Att_Segment_World_Annotate and Att_Segment_Paper_Annotate do not exist, then the 
annotated text is device.
See 5.38.11 Super String Segment Text and Annotation Functionsfor calls to set/inquire on these 
dimensions, and to load/retrieve data for these dimensions.
Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions
Att_Solid_Value                         28
If Att_Solid_Value is set, then the super string can be filled with a solid colour.
Att_Bitmap_Value                      29
If Att_Bitmap_Value is set, then the super string can be filled with a bitmap.
Att_Hatch_Value                       27
Page 397
Super String Element
Chapter 5  12dPL Library Calls
If Att_Hatch_Value is set, then the super string can be filled with a hatch.
Att_Pattern_Value                     33
If Att_Pattern_Value is set, then the super string can be filled with a 12d pattern.
Att_Autocad_Pattern_Value      54
If Att_Autocad_Pattern_Value is set, then the super string can be filled with an AutoCad pattern.
Note that all the Solid/Bitmap/Hatch/Pattern/Autocad_Pattern dimensions can exist. They are drawn 
in the order solid, bitmap, pattern, hatch and then Autocad pattern. Note that because the bitmap 
allows for transparency, it is possible to use one bitmap with a variety of different background 
colours.
See 5.38.12 Super String Fills - Hatch/Solid/Bitmap/Pattern/ACAD Pattern Functionsfor calls to set/
inquire on these dimensions, and to load/retrieve data for these dimensions.
Hole Dimension
Att_Hole_Value                     26
If Att_Hole_Value is set, then the super string can have zero or more super strings as internal 
holes.
So it is possible to have a solid object like a horse shoe where the holes for the nails exist so that no 
filling occurs in the nail holes. 
Note that the holes themselves may have their own solid/bitmap/hatch dimensions. 
Warning, holes may not contain their own holes in the current implementation (that is, only one 
level of holes is allowed).
See 5.38.13 Super String Hole Functionsfor calls to set/inquire on these dimensions, and to load/retrieve 
data for these dimensions.
User Defined Vertex Attributes Dimensions
Att_Vertex_Attribute_Array              16
If Att_Vertex_Attribute_Array is set, then the super string can have a different Attributes at each 
vertex.
See 5.38.18 Super String Vertex Attributes Functionsfor calls to set/inquire on these dimensions, and to 
load/retrieve data for these dimensions.
User Defined Segment Attributes Dimensions
Att_Segment_Attribute_Array           19
If Att_Segment_Attribute_Array is set, then the super string can have a different Attributes on 
each segment
See 5.38.19 Super String Segment Attributes Functionsfor calls to set/inquire on these dimensions, and 
to load/retrieve data for these dimensions.
Colour Dimension
Att_Colour_Array         9            For a colour for each segment
See 5.38.14 Super String Segment Colour Functionsfor calls to set/inquire on these dimensions, and to 
load/retrieve data for these dimensions.
Vertex Image Dimensions
Att_Vertex_Image_Value              51              For an image at each vertex
Att_Vertex_Image_Array              52              For many images at each vertex
Page 398
Super String Element
 12d Model Macro Manual
See 5.38.21 Super String Vertex Image Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Segment Geometry Dimension
Att_Geom_Array                   32              allow transitions for segments
If Att_Geom_Array is set, then each super string segment can be a line, arc, transition or offset 
transition.
See 5.38.15 Super String Segment Geometry Functionsfor calls to set/inquire on this dimension, and to 
load/retrieve data for this dimension.
Visibility Dimensions
Att_Visible_Array            12      This dimension applies for both vertex and segment visibility.
Att_Vertex_Visible_Value          41      or      Att_Vertex_Visible_Array          42
Att_Segment_Visible_Value     43    or        Att_Segment_Visible_Array   44
See 5.38.22 Super String Visibility Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Segment Linestyle Dimension
Att_Segment_Linestyle_Array            56
If Att_Segment_Linestyle_Array is set, then the super string can have linestyle for each segment.
See 5.38.6 Super String Segment Linestyle Functionsfor calls to set/inquire on these dimensions, and to 
load/retrieve data for these dimensions.
Matrix Dimension
Att_Matrix_Value                  53              ?
UID Dimensions
Att_Vertex_UID_Array              35
If Att_Vertex_Array is set, then the super string can have an Integer (referred to as a uid) stored 
at each vertex. This is mainly used by programmers to store a number on each vertex.
Att_Segment_UID_Array          36
If Att_Segment_UID_Array is set, then the super string can have an Integer (referred to as a uid) 
stored on each segment. This is mainly used by programmers to store a number on each 
segment.
See 5.38.20 Super String Uid Functionsfor calls to set/inquire on these dimensions, and to load/retrieve 
data for these dimensions.
Database Point Dimensions
Att_Database_Point_Array        47
Extrude Dimensions
Att_Extrude_Value                48
If Att_Extrude_Value is set, then the super string can have zero or more extrudes on the string.
See 5.38.16 Super String Extrude Functionsfor calls to set/inquire on these dimensions, and to load/
retrieve data for these dimensions.
Page 399
Super String Element
Chapter 5  12dPL Library Calls
Null Levels Dimensions
// only used internally - not a normal dimension
 Att_Null_Levels_Value              55
For information on setting flags to set more than one dimension at see, see 5.38.1.1 Dimension 
Combinations and Super String Flags.
For information on creating super string using the dimension flags, see 5.38.2 Basic Super String 
Functions.
Page 400
Super String Element
 12d Model Macro Manual
5.38.1.1 Dimension Combinations and Super String Flags
There is a function call for each dimension to tell the super string to use that particular dimension 
and if more than one dimension is required, then simply call each function to set each of the 
required dimensions.
It is also possible to set one or many dimensions at once through one call by using a call with 
Integer flags.
An Integer is actually made up of 32-bits and each bit can be taken to mean that if the bit is 1 then a 
particular dimension is to be set (that is used) and 0 if it is not to be set.
So for example, 0 = binary 0     would mean no dimensions are to be used.
                      1 = binary 1     would mean only the first dimension is to be used
                      2 = binary   10    would mean only the second dimension is used
                      3 = binary   11    would mean the first and second dimensions only are used
                      4 = binary 100    would mean that only the third dimensions is used
So for the nth dimension to be set, you simply add 2 raised to the power n-1 to the Integer flag.
Because an Integer is only 32-bits, one Integer can only be used for thirty two (32) dimensions.
A second Integer is required to specify the dimensions 33 to a maximum of 64.
Since there is currently under 64 dimensions, then two Integer flags (flag1, flag2) can be used to set 
all the required dimensions on/off in the one call. 
The following macros to help create the flags are defined in the include file “Setups.H”, as are all the 
Att_ dimension values.
#define concat(a,b) a##b
#define String_Super_Bit(n) (1 << concat(Att_,n))                         // for dimensions 1 to 32
#define String_Super_Bit_Ex(n) (1 << concat(Att_,n) - 32)            // for dimensions 32 to 64
// So if flag1 holds dimensions 1 to 32 (i.e. from Att_ZCoord_Value to Att_Geom_Array)
then the definition
   Integer flag1 = String_Super_Bit(ZCoord_Value) | String_Super_Bit(Radius_Array);
means that flag1 represents having the two dimensions Att_ZCoord_Value and Att_Radius_Array 
// If flag2 holds dimensions 33 to 64 (i.e. from Att_Pattern_Value to last current dimension)
then the definition
   Integer flags2 = String_Super_Bit_Ex(Pattern_Value)
                               |String_Super_Bit_Ex(Vertex_Tinable_Array);
means that flag2 represents having the two dimensions Att_Pattern_Value and 
Att_Vertex_Tinable_Array
Note that when using the String_Super_Bit and String_Super_Bit_Ex that you leave off the Att_ 
before the dimension names. The Att_ is automatically added by the #define.
As a code example, the code below defines a super string with independent heights at each vertex 
and the ability for arcs on each segment. This is the equivalent of the polyline string.
    Integer flag1 = String_Super_Bit(ZCoord_Array) | String_Super_Bit(Radius_Array);
    Integer flag2 = 0;       // no dimensions greater than 32
    Integer npts = 100;
    Element super = Create_super(flag1,flag2,npts);
For information on creating super string using the dimension flags, see 5.38.2 Basic Super String 
Functions.
Page 401
Super String Element
Chapter 5  12dPL Library Calls
5.38.2 Basic Super String Functions
The super string can have a variable number of dimensions but it must have at least (x,y) values for 
every vertex. 
There are functions to create a new super strings.
The create functions use dimension flags (or a seed super string) to specify how many vertices and 
what dimensions are created (if any).
Some of the super string create functions will also load (x,y,z,radius,bulge) data into the super string 
at creation time.
Once a super string is created, the other dimensions can be added using the use calls for that 
dimension, and the extra data for that dimension can then be loaded in. These calls are grouped 
together by super string dimension.
Also for an existing super string, there are calls to insert new vertices into the super string and to 
delete existing vertices.
See 5.38.2.1 Super String Create Functions
See 5.38.2.2 Inserting and Deleting Vertices
See 5.38.2.3 Loading and Retrieving X, Y, Z, Radius and Bulge Data
See 5.38.2.4 Getting Forward and Backward Vertex Direction
See 5.38.2.5 Getting Super String Type and Type Like
For the calls for setting/inquiring for each dimension and for loading/retrieving data for each 
dimension:
See 5.38.3 Super String Height Functions
See 5.38.14 Super String Segment Colour Functions
See 5.38.5 Super String Segment Radius Functions
See 5.38.9 Super String Pipe/Culvert Functions
See 5.38.9 Super String Pipe/Culvert Functions
See 5.38.8 Super String Vertex Symbol Functions
See 5.38.10 Super String Vertex Text and Annotation Functions
See 5.38.11 Super String Segment Text and Annotation Functions
See 5.38.4 Super String Tinability Functions
See 5.38.7 Super String Point Id Functions
See 5.38.12 Super String Fills - Hatch/Solid/Bitmap/Pattern/ACAD Pattern Functions
See 5.38.13 Super String Hole Functions
See 5.38.15 Super String Segment Geometry Functions
See 5.38.16 Super String Extrude Functions
See 5.38.18 Super String Vertex Attributes Functions
See 5.38.19 Super String Segment Attributes Functions
See 5.38.20 Super String Uid Functions
See 5.38.21 Super String Vertex Image Functions
See 5.38.22 Super String Visibility Functions
Page 402
Super String Element
 12d Model Macro Manual
5.38.2.1 Super String Create Functions
Create_super(Integer flag1,Integer num_pts)
Name
Element Create_super(Integer flag1,Integer num_pts)
Description
Create an Element of type Super with room for num_pts vertices and num_pts-1 segments if the 
string is not closed or num_pts segments if the string is closed. 
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used. See 5.38.1 Super 
String Dimensions for the values that flag1 may take.
The actual values of the arrays are set by other function calls after the string is created.
The return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null.
Note - if dimensions greater than 32 are required, then calls with two flags must be used.
For example Integer Create_super(Integer flag1, Integer flag2,Integer num_pts).
ID = 691
Create_super(Integer flag1,Integer flag2,Integer npts)
Name
Element Create_super(Integer flag1,Integer flag2,Integer npts)
Description
Do not use this one, see below.
ID = 1499
Create_super2(Integer flag1,Integer flag2,Integer npts)
Name
Element Create_super2(Integer flag1,Integer flag2,Integer npts)
Description
create super string with arrays set aside following flag1 and flag 2 (extended dimensions).
Create an Element of type Super with room for num_pts vertices and num_pts-1 segments if the 
string is not closed or num_pts segments if the string is closed. 
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used.
flag2 is used to specify which of the dimensions from 33 to 64 are used/not used.
See 5.38.1 Super String Dimensions for the values that flag1 and flag2 may take.
The actual values of the arrays are set by other function calls after the string is created.
The return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null.
ID = 8017
Create_super(Integer num_pts,Element seed)
Name
Page 403
Super String Element
Chapter 5  12dPL Library Calls
Element Create_super(Integer num_pts,Element seed)
Description
Create an Element of type Super with room for num_pts vertices and num_pts-1 segments if the 
string is not closed or num_pts segments if the string is closed.
Set the colour, name, style, flags etc. of the new string to be the same as those from the Element 
seed. Note that the seed string must also be a super string.
The actual values of the arrays are set after the string is created.
The return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null.
ID = 692
Create_super(Integer flag1,Segment seg)
Name
Element Create_super(Integer flag1,Segment seg)
Description
Create an Element of type Super with two vertices if seg is a Line, Arc or Spiral, or one vertex if seg 
is a Point. The co-ordinates for the one or two vertices are taken from seg.
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used. See 5.38.1 Super 
String Dimensions for the values that flag1 may take.
LJG? if seg is an Arc or a Spiral, then what dimensions are set and what values are they given?
The return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null.
Note - if dimensions greater than 32 are required, then calls with two flags must be used.
For example Integer Create_super(Integer flag1, Integer flag2,Segment seg).
ID = 693
Create_super(Integer flag1,Integer flag2,Segment seg) 
Name
Element Create_super(Integer flag1,Integer flag2,Segment seg) 
Description
Do not use this one, see below.
 ID = 1500
Create_super2(Integer flag1,Integer flag2,Segment seg) 
Name
Element Create_super2(Integer flag1,Integer flag2,Segment seg) 
Description
Create an Element of type Super with two vertices if seg is a Line, Arc or Spiral, or one vertex if seg 
is a Point. The co-ordinates for the one or two vertices are taken from seg.
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used.
flag2 is used to specify which of the dimensions from 33 to 64 are used/not used.
Page 404
Super String Element
 12d Model Macro Manual
See 5.38.1 Super String Dimensions for the values that flag1 and flag2 may take.
LJG? if seg is an Arc or a Spiral, then what dimensions are set and what values are they given?
The return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null.
 ID = 8018
Create_super(Integer flag1,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
num_pts)
Name
Element Create_super(Integer flag1,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_pts)
Description
Create an Element of type Super with num_pts vertices.
The basic geometry for the super string is supplied by the arrays x (x values), y (y values), z (z 
values), r (radius of segments), b (bulge of segment b = 1 for major arc > 180 degrees, b = 0 for 
minor arc < 180 degrees). 
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used.
Note that depending on the flag1 value, the z, r, b arrays may or may not be used, but the arrays 
must still be supplied. See 5.38.1 Super String Dimensions for the values that flag1 may take.
The arrays must be of length num_pts or greater.
The function return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null. 
Note - if dimensions greater than 32 are required, then calls with two flags must be used.
For example Integer Create_super(Integer flag1, Integer flag2,Real x[],Real y[],Real z[],Real 
r[],Integer b[],Integer num_pts).
ID = 690
Create_super(Integer flag1,Integer flag2,Real x[],Real y[],Real z[],Real r[],Integer 
b[],Integer num_pts) 
Name
Element Create_super(Integer flag1,Integer flag2,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
num_pts)   
Description
Do not use this one, see below. 
 ID = 1498
Create_super2(Integer flag1,Integer flag2,Real x[],Real y[],Real z[],Real r[],Integer 
b[],Integer num_pts) 
Name
Element Create_super2(Integer flag1,Integer flag2,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
num_pts)   
Description
Create an Element of type Super with num_pts vertices.
Page 405
Super String Element
Chapter 5  12dPL Library Calls
The basic geometry for the super string is supplied by the arrays x (x values), y (y values), z (z 
values), r (radius of segments), b (bulge of segment b = 1 for major arc > 180 degrees, b = 0 for 
minor arc < 180 degrees). 
flag1 is used to specify which of the dimensions from 1 to 32 are used/not used.
flag2 is used to specify which of the dimensions from 33 to 64 are used/not used.
Note that depending on the flag1 value, the z, r, b arrays may or may not be used, but the arrays 
must still be supplied. See 5.38.1 Super String Dimensions for the values that flag1 and flag2 may 
take.
The arrays must be of length num_pts or greater.
The function return value is an Element handle to the created super string.
If the Super string could not be created, then the returned Element will be null. 
 ID = 8016
Page 406
Super String Element
 12d Model Macro Manual
5.38.2.2 Inserting and Deleting Vertices
Super_insert_vertex(Element super,Integer where,Integer count)   
Name
Integer Super_insert_vertex(Element super,Integer where,Integer count) 
Description
For the super string super, insert count new vertices BEFORE vertex index where.
All the existing vertices from index position where onwards are move to after the new count 
inserted vertices. 
For example, Super_insert_vertex(super,1,10) will insert 10 new vertices before vertex index 1, and 
all the existing vertices will be moved to after vertex index 10.
Note that if the string is a closed string then the closure applies to the new last vertex.
If the Element super is not of type Super, then the function return value is set to a non zero value.
A return value of 0 indicates the function call was successful.
ID = 2168
Super_remove_vertex(Element super,Integer where,Integer count)   
Name
Integer Super_remove_vertex(Element super,Integer where,Integer count)   
Description
For the super string super, delete count existing vertices starting at vertex index where.
If there are not enough vertices to delete then the delete stops at the last vertex of the super string. 
Note that if the string is closed then the closure applies to the new last vertex.
If the Element super is not of type Super, then the function return value is set to a non zero value.
A return value of 0 indicates the function call was successful.
ID = 2169
Page 407
Super String Element
Chapter 5  12dPL Library Calls
5.38.2.3 Loading and Retrieving X, Y, Z, Radius and Bulge Data
Set_super_vertex_coord(Element super,Integer i,Real x,Real y,Real z)
Name
Integer Set_super_vertex_coord(Element super,Integer i,Real x,Real y,Real z)
Description
Set the coordinate data (x,y,z) for the i’th vertex (the vertex with index number i) of the super 
Element super where
  the x value to set is in Real x.
  the y value to set is in Real y.
  the z value to set is in Real z.
If the Element super is not of type Super, then the function return value is set to a non zero value.
A function return value of zero indicates the data was successfully set.
ID = 732
Get_super_vertex_coord(Element super,Integer i,Real &x,Real &y,Real &z)
Name
Integer Get_super_vertex_coord(Element super,Integer i,Real &x,Real &y,Real &z)
Description
Get the coordinate data (x,y,z) for the i’th vertex (the vertex with index number i) of the super 
Element super.
The x coordinate is returned in Real x.
The y coordinate is returned in Real y.
The z coordinate is returned in Real z.
If the Element super is not of type Super, then the function return value is set to a non zero value.
A return value of 0 indicates the function call was successful.
ID = 733
Set_super_data(Element super,Integer i,Real x,Real y,Real z,Real r,Integer b)
Name
 Integer Set_super_data(Element super,Integer i,Real x,Real y,Real z,Real r,Integer b)
Description
Set the (x,y,z,r,f) data for the i’th vertex of the super Element super where
   the x value to set is the Real x.
  the y value to set is the Real y.
  the z value to set is the Real z.
  the radius value to set is the Real r.
  the major/minor arc bulge value to set is the Integer b (0 for minor arc < 180 degrees, non zero for 
major arc > 180 degrees).
If the Element super is not of type Super, then the function return value is set to a non zero value.
A function return value of zero indicates the data was successfully set.
ID = 699
Page 408
Super String Element
 12d Model Macro Manual
Get_super_data(Element super,Integer i,Real &x,Real &y,Real &z,Real &r, 
Integer &b)
Name
Integer Get_super_data(Element super,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &b
Description
Get the (x,y,z,r,b data for the i’th vertex of the super string super.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
The radius value is returned in Real r.
The major/minor arc bulge value is returned in Integer b.(bulge of segment b = 1 for major arc > 180 
degrees, b = 0 for minor arc < 180 degrees).
If the Element super is not of type Super, then the function return value is set to a non zero value.
A function return value of zero indicates the data was successfully returned.
ID = 696
Set_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[], 
Integer num_pts)
Name
Integer Set_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[], Integer num_pts)
Description
Set the (x,y,z,r,b) data for the first num_pts vertices of the string Element super.
This function allows the user to modify a large number of vertices of the string in one call.
The maximum number of vertices that can be set is given by the number of vertices in the string.
The (x,y,z,r,f) values for each string vertex are given in the Real arrays x[], y[],z[],r[] and Integer 
array b[] where the (x,y,z) are coordinate, r the radius of the arc on the following segment and b is 
the bulge to say whether the arc is a major or minor arc (bulge of segment b = 1 for major arc > 180 
degrees, b = 0 for minor arc < 180 degrees).
The number of vertices to be set is given by Integer num_pts
If the Element super is not of type Super, then nothing is modified and the function return value is 
set to a non zero value.
Note: this function can not create new super Elements but only modify existing super Elements.
A function return value of zero indicates the data was set successfully.
ID = 697
Get_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
max_pts,Integer &num_pts)
Name
Integer Get_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
max_pts,Integer &num_pts)
Description
Get the (x,y,z,r,f) data for the first max_pts vertices of the super string Element super.
The (x,y,z,r,f) values at each string vertex are returned in the Real arrays x[], y[],z[],r[] and Integer 
Page 409
Super String Element
Chapter 5  12dPL Library Calls
array b[] (the arrays are x values, y values, z values, radius of segments, b is bulge to denote if the 
segment is major or minor arc (bulge of segment b = 1 for major arc > 180 degrees, b = 0 for minor 
arc < 180 degrees).
The maximum number of vertices that can be returned is given by max_pts (usually the size of the 
arrays).
The vertex data returned starts at the first vertex and goes up to the minimum of max_pts and the 
number of vertices in the string.
The actual number of vertices returned is returned by Integer num_pts
                 num_pts <= max_pts
If the Element super is not of type Super, then num_pts is returned as zero and the function return 
value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
ID = 694
Set_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
num_pts,Integer start_pt)
Name
Integer Set_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_pts,Integer 
start_pt)
Description
For the super Element super, set the (x,y,z,r,b) data for num_pts vertices, starting at vertex number 
start_pt.
This function allows the user to modify a large number of vertices of the string in one call starting at 
vertex
number start_pt rather than vertex one.
The maximum number of vertices that can be set is given by the difference between the number of 
vertices in the string and the value of start_pt.
The (x,y,z,r,f) values for the string vertices are given in the Real arrays x[], y[],z[],r[] and b[] where 
the (x,y,z) are coordinate, r the radius of the arc on the following segment and b is the bulge to say 
whether the arc is a major or minor arc (bulge of segment b = 1 for major arc > 180 degrees, b = 0 
for minor arc < 180 degrees).
The number of the first string vertex to be modified is start_pt.
The total number of vertices to be set is given by Integer num_pts
If the Element super is not of type Super, then nothing is modified and the function return value is 
set to a non zero value.
A function return value of zero indicates the data was set successfully.
Notes
(a) A start_pt of one gives the same result as the previous function.
(b) This function can not create new super strings but only modify existing super strings.
ID = 698
Get_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[], Integer 
max_pts,Integer &num_pts,Integer start_pt)
Name
Page 410
Super String Element
 12d Model Macro Manual
Integer Get_super_data(Element super,Real x[],Real y[],Real z[],Real r[],Integer b[], Integer 
max_pts,Integer &num_pts,Integer start_pt)
Description
For a super string Element super, get the (x,y,z,r,b) data for max_pts vertices starting at vertex 
number start_pt (the arrays are x values, y values, z values, radius of segments, b is if segment is 
major or minor arc). 
This routine allows the user to return the data from a super string in user specified chunks. This is 
necessary if the number of vertices in the string is greater than the size of the arrays available to 
contain the information.
As in the previous function, the maximum number of vertices that can be returned is given by 
max_pts (usually the size of the arrays).
However, for this function, the vertex data returned starts at vertex number start_pt rather than 
vertex one.
The (x,y,z,r,b) values at each string vertex are returned in the Real arrays x[], y[],z[],r[] and Integer 
array b[].
The actual number of vertices returned is given by Integer num_pts
num_pts <= max_pts
If the Element super is not of type Super, then num_pts is set to zero and the function return value 
is set to a non zero value.
Note A start_pt of one gives the same result as for the previous function.
A function return value of zero indicates the data was successfully returned.
ID = 695
Page 411
Super String Element
Chapter 5  12dPL Library Calls
5.38.2.4 Getting Forward and Backward Vertex Direction
Get_super_vertex_forward_direction(Element super,Integer vert,Real &ang)   
Name
Integer Get_super_vertex_forward_direction(Element super,Integer vert,Real &ang)   
Description
For the Element super of type Super, get the angle of the tangent at the beginning of the segment 
leaving vertex number vert. That is, the segment going from vertex vert to vertex vert+1. Return the 
angle in ang.
ang is in radians and is measured in a counterclockwise direction from the positive x-axis.
If the super string is closed, the angle will still be valid for the last vertex of the super string and it is 
the angle of the closing segment between the last vertex and the first vertex. 
If super string is open, the call fails for the last vertex and a non-zero return code is returned.
If the Element super is not of type Super, then a non-zero return code is returned
A function return value of zero indicates the angle was successfully returned.
ID = 1501
Get_super_vertex_backward_direction(Element super,Integer vert,Real &ang)   
Name
Integer Get_super_vertex_backward_direction(Element super,Integer vert,Real &ang)   
Description
For the Element super of type Super, get the angle of the tangent at the end of the segment 
entering vertex number vert. That is, the segment going from vertex vert-1 to vertex vert. Return 
the angle in ang.
ang is in radians and is measured in a counterclockwise direction from the positive x-axis.
vertex number vert forward angle 
vertex number vert+1 
forward angle 
vertex number vert 
vertex number vert+1 
tangent at beginning
of segment following 
vertex number vert
vertex number vert 
backward angle 
vertex number vert-1 
backward angle 
vertex number vert 
vertex number vert-1 
tangent at
end of segment 
going into vertex
number vert
Page 412
Super String Element
 12d Model Macro Manual
If the super string is closed, the angle will still be valid for the first vertex of the super string and it is 
the angle of the closing segment between the first vertex and the last vertex. 
If super string is open, the call fails for the first vertex and a non-zero return code is returned.
If the Element super is not of type Super, then a non-zero return code is returned
A function return value of zero indicates the angle was successfully returned.
ID = 1502
Page 413
Super String Element
Chapter 5  12dPL Library Calls
5.38.2.5 Getting Super String Type and Type Like
Get_type_like2(Element super,Integer &type) 
Name
Integer Get_type_like2(Element super,Integer &type) 
Description
In earlier versions of 12d Model, there were a large number of string types but in later versions of 
12d Model, the super string was introduced which with its possible dimensions, could replace many 
of the other strings. 
However, for some applications it was important to know if the super string was like one of the 
original strings. For example, some options required a string to be a contours string, the original 2d 
string. That is, the string has the one z-value (or height) for the entire string. So a super string that 
has a constant dimension for height, behaves like a 2d string and in that case will return the Type 
Like of 2d. 
The Type Like’s can be referred to by a number (Integer) or by text (Text).
See 5.36.1 Types of Elements for the values of the Type Like numbers and Type Like text.
The Type Like for the super string is returned in type.
If the Element string is not a super string, then a non zero function return value is returned.
A function return value of zero indicates the Type Like was returned successfully.
ID = 8012
Get_type_like(Element super,Integer &type) 
Name
Integer Get_type_like(Element super,Integer &type) 
Description
Do not use this one, please see the above call
ID = 2074
Get_type_like2(Element elt,Text &type) 
Name
Integer Get_type_like2(Element elt,Text &type) 
Description
In earlier versions of 12d Model, there were a large number of string types but in later versions of 
12d Model, the super string was introduced which with its possible dimensions, could replace many 
of the other strings. 
However, for some applications it was important to know if the super string was like one of the 
original strings. For example, some options required a string to be a contours string, the original 2d 
string. That is, the string has the one z-value (or height) for the entire string. So a super string that 
has a constant dimension for height, behaves like a 2d string and in that case will return the Type 
Like of 2d. 
The Type Like’s can be referred to by a number (Integer) or by text (Text).
See 5.36.1 Types of Elements for the values of the Type Like numbers and Type Like text.
The Text Type Like for the super string is returned in type.
Page 414
Super String Element
 12d Model Macro Manual
If the Element string is not a super string, then a non zero function return value is returned.
A function return value of zero indicates the Type Like was returned successfully.
ID = 8013
Get_type_like(Element elt,Text &type) 
Name
Integer Get_type_like(Element elt,Text &type) 
Description
Do not use this one, please see the above call.
ID = 2075
Page 415
Super String Element
Chapter 5  12dPL Library Calls
5.38.3 Super String Height Functions
For definitions of the height dimensions, see  Height Dimensions
See 5.38.3.1 Super String Use Height Functions
See 5.38.3.2 Setting Super String Height Values
Page 416
Super String Element
 12d Model Macro Manual
5.38.3.1 Super String Use Height Functions
Set_super_use_2d_level(Element super,Integer use)
Name
Integer Set_super_use_2d_level(Element super,Integer use)
Description
For the super string Element super, define whether the height dimension Att_ZCoord_Value is used 
or removed. 
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
If use is 1, the dimension is set. If use is 0, the dimension Att_ZCoord_Value is removed.
Note that if the height dimension Att_ZCoord_Array exists, this call is ignored.
If the Element super is not a super string, then a non zero function return value is returned.
A return value of 0 indicates the function call was successful.
ID = 700
Get_super_use_2d_level(Element super,Integer &use)
Name
Integer Get_super_use_2d_level(Element super,Integer &use)
Description
Query whether the dimension height dimension Att_ZCoord_Value exists for the super string super. 
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
use is returned as 1 if the dimension exists, or 0 if the dimension doesn’t exist.
If the Element super is not a super string, then a non zero function return value is returned.
A return value of 0 indicates the function call was successful.
ID = 701
Set_super_use_3d_level(Element super,Integer use)
Name
Integer Set_super_use_3d_level(Element super,Integer use)
Description
For the super string Element super, define whether the height dimension Att_ZCoord_Array is used 
or removed. 
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
If use is 1, the dimension is set. If use is 0, the dimension Att_ZCoord_Array is removed.
If the Element super is not a super string, then a non zero function return value is returned.
A return value of 0 indicates the function call was successful.
ID = 730
Get_super_use_3d_level(Element super,Integer &use)
Page 417
Super String Element
Chapter 5  12dPL Library Calls
Name
Integer Get_super_use_3d_level(Element super,Integer &use)
Description
Query whether the height dimension Att_ZCoord_Array exists for the super string super. 
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
use is returned as 1 if the dimension exists, or 0 if the dimension doesn’t exist.
If the Element super is not a super string, then a non zero function return value is returned.
A return value of 0 indicates the function call was successful.
ID = 731
Super_vertex_level_value_to_array(Element super)   
Name
Integer Super_vertex_level_value_to_array(Element super)   
Description
If for the super string super the dimension Att_ZCoord_Value exists and the dimension 
Att_ZCoord_Array does not exist then there will be one z value zval (height or level) for the entire 
string.
In this case (when the dimension Att_ZCoord_Value exists and the dimension Att_ZCoord_Array 
does not exist) this function sets the Att_ZCoord_Array dimension and creates a new z-value for 
each vertex of super and it is given the value zval.
See  Height Dimensions for information on the Height (ZCoord) dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 2174
Page 418
Super String Element
 12d Model Macro Manual
5.38.3.2 Setting Super String Height Values
Get_super_2d_level(Element elt,Real &level)
Name
Integer Get_super_2d_level(Element elt,Real &level)
Description
For the Element elt, if the height dimension Att_ZCoord_Value is set and Att_ZCoord_Array is not 
set, then the z-value for the entire string is returned in level. 
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
If the Element elt is not of type Super, or the dimension Att_ZCoord_Value is not set, this call fails 
and a non zero return value is returned.
A return value of zero indicates the function call was successful.
ID = 703
Set_super_2d_level(Element elt,Real level)
Name
Integer Set_super_2d_level(Element elt,Real level)
Description
For the Element elt of type Super, if the dimension Att_ZCoord_Value is set and Att_ZCoord_Array 
is not set, then the z-value for the entire string is set to level.
See  Height Dimensions for information on Height dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
 If the Element elt is not of type Super, or the dimension Att_ZCoord_Value is not set, this call fails 
and a non zero return value is returned.
A return value of zero indicates the function call was successful.
ID = 702
Page 419
Super String Element
Chapter 5  12dPL Library Calls
5.38.4 Super String Tinability Functions
For definitions of the Tinability dimension, see  Tinability Dimensions
See 5.38.4.1 Super String Combined Tinability
See 5.38.4.2 Super String Vertex Tinability
See 5.38.4.3 Super String Segment Tinability
Page 420
Super String Element
 12d Model Macro Manual
5.38.4.1 Super String Combined Tinability
Set_super_use_tinability(Element super,Integer use)
Name
Integer Set_super_use_tinability(Element super,Integer use)
Description
Tell the super string whether to use the two dimensions Att_Vertex_Tinable_Array and 
Att_Segment_Tinable_Array. 
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A value for use of 1 sets the dimensions and 0 removes them.
A return value of 0 indicates the function call was successful.
ID = 722
Get_super_use_tinability(Element super,Integer &use)
Name
Integer Get_super_use_tinability(Element super,Integer &use)
Description
Query whether at least one the two dimensions Att_Vertex_Tinable_Array or 
Att_Segment_Tinable_Array exists for the super string.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if at least one of the two dimensions exists.
use is returned as 0 if neither of the two dimensions exist.
A return value of 0 indicates the function call was successful.
 ID = 723
Page 421
Super String Element
Chapter 5  12dPL Library Calls
5.38.4.2 Super String Vertex Tinability
Set_super_use_vertex_tinability_value(Element super,Integer use)
Name
Integer Set_super_use_vertex_tinability_value(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Vertex_Tinable_Value is used 
or removed.
If Att_Vertex_Tinable_Value is set and Att_Vertex_Tinability_Array is not set then the tinability is the 
same for all vertices of super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the tinability is the same for all vertices.
If use is 0, the dimension is removed.
Note that if the dimension Att_Vertex_Tinable_Array exists, this call is ignored.
A return value of 0 indicates the function call was successful.
 ID = 1584
Get_super_use_vertex_tinability_value(Element super,Integer &use)
Name
Integer Get_super_use_vertex_tinability_value(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Tinable_Value exists for the super string super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
 ID = 1585
Set_super_use_vertex_tinability_array(Element super,Integer use) 
Name
Integer Set_super_use_vertex_tinability_array(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Vertex_Tinable_Array is used. 
If Att_Vertex_Tinable_Array is set then there can be a different tinability defined for each vertex of 
super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the tinability is different for each vertex.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 1586
Page 422
Super String Element
 12d Model Macro Manual
Get_super_use_vertex_tinability_array(Element super,Integer &use) 
Name
Integer Get_super_use_vertex_tinability_array(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Tinable_Array exists for the super string super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1587
Set_super_vertex_tinability(Element super,Integer vert,Integer tinability)
Name
Integer Set_super_vertex_tinability(Element super,Integer vert,Integer tinability)
Description
For the Element super (which must be of type Super), set the tinability value for vertex number vert 
to the value tinability.
If tinability is 1, the vertex is tinable.
If tinability is 0, the vertex is not tinable.
If the Element super is not of type Super, or Att_Vertex_Tinable_Array is not set for super, then a 
non-zero return code is returned.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 736
Get_super_vertex_tinability(Element super,Integer vert,Integer &tinability)
Name
Integer Get_super_vertex_tinability(Element super,Integer vert,Integer &tinability)
Description
For the Element super (which must be of type Super), get the tinability value for vertex number vert 
and return it in the Integer tinability.
If tinability is 1, the vertex is tinable.
If tinability is 0, the vertex is not tinable.
If the Element super is not of type Super, or Att_Vertex_Tinable_Array is not set for super, then a 
non-zero return code is returned.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 737
Page 423
Super String Element
Chapter 5  12dPL Library Calls
5.38.4.3 Super String Segment Tinability
Set_super_use_segment_tinability_value(Element super,Integer use) 
Name
Integer Set_super_use_segment_tinability_value(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Segment_Tinable_Value is 
used or removed. 
If Att_Segment_Tinable_Value is set and Att_Segment_Tinability_Array is not set then the tinability 
is the same for all segments of super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the tinability is the same for all segments.
If use is 0, the dimension is removed.
Note that if the dimension Att_Segment_Tinable_Array exists, this call is ignored.
A return value of 0 indicates the function call was successful.
ID = 1592
Get_super_use_segment_tinability_value(Element super,Integer &use) 
Name
Integer Get_super_use_segment_tinability_value(Element super,Integer &use) 
Description
Query whether the dimension Att_Segment_Tinable_Value exists for the super string super. 
If Att_Segment_Tinable_Value is set and Att_Segment_Tinability_Array is not set then the tinability 
is the same for all segments of super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1593
Set_super_use_segment_tinability_array(Element super,Integer use) 
Name
Integer Set_super_use_segment_tinability_array(Element super,Integer use)
Description
For Element super of type Super, define whether the dimension Att_Segment_Tinable_Array is set 
or removed. 
If Att_Segment_Tinable_Array is set then there can be a different tinability defined for each segment 
in super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the tinability is different for each segment.
If use is 0, the dimension is removed.
Page 424
Super String Element
 12d Model Macro Manual
A return value of 0 indicates the function call was successful.
ID = 1594
Get_super_use_segment_tinability_array(Element super,Integer &use) 
Name
Integer Get_super_use_segment_tinability_array(Element super,Integer &use) 
Description
Query whether the dimension Att_Segment_Tinable_Array exists for the super string super. 
If Att_Segment_Tinable_Array is set then there can be a different tinability defined for each segment 
in super.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1595
Set_super_segment_tinability(Element super,Integer seg,Integer tinability)
Name
Integer Set_super_segment_tinability(Element super,Integer seg,Integer tinability)
Description
For the Element super (which must be of type Super), set the tinability value for segment number 
seg to the value tinability.
If tinability is 1, the segment is tinable.
If tinability is 0, the segment is not tinable.
If the Element super is not of type Super, or Att_Segment_Tinable_Array is not set for super, then 
a non-zero return code is returned.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 724
Get_super_segment_tinability(Element super,Integer seg,Integer &tinability)
Name
Integer Get_super_segment_tinability(Element super,Integer seg,Integer &tinability)
Description
For the Element super (which must be of type Super), get the tinability value for segment number 
seg and return it in the Integer tinability.
If tinability is 1, the segment is tinable.
If tinability is 0, the segment is not tinable.
If the Element super is not of type Super, or Att_Segment_Tinable_Array is not set for super, then 
a non-zero return code is returned.
See  Tinability Dimensions for information on the Tinability dimensions or 5.38.1 Super String 
Page 425
Super String Element
Chapter 5  12dPL Library Calls
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 725
Page 426
Super String Element
 12d Model Macro Manual
5.38.5 Super String Segment Radius Functions
For definitions of the Segment Radius dimensions, see  Segment Radius Dimension
Set_super_use_segment_radius(Element super,Integer use)
Name
Integer Set_super_use_segment_radius(Element super,Integer use)
Description
For the super string Element super, define whether the segment radius dimension 
Att_Radius_Array is to be used or removed. 
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the segments between vertices of the super can be 
straights or arcs.
If use is 0, the dimension is removed. That is, the segments between vertices of the super can only 
be straights.
Note that if the dimension Att_Radius_Array is set then the Att_Major_Array is also automatically 
set.
A return value of 0 indicates the function call was successful.
ID = 708
Get_super_use_segment_radius(Element super,Integer &use)
Name
Integer Get_super_use_segment_radius(Element super,Integer &use)
Description
Query whether the segment radius dimension Att_Radius_Array exists for the super string.
use is returned as 1 if the dimension Att_Radius_Array exists, or 0 if the dimension doesn’t exist.
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A return value of 0 indicates the function call was successful.
ID = 709
Set_super_segment_radius(Element super,Integer seg,Real rad)
Name
Integer Set_super_segment_radius(Element super,Integer seg,Real rad)
Description
For the super string super, set the radius of segment number seg to the value rad.
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Radius_Array set.
A return value of 0 indicates the function call was successful.
ID = 710
Page 427
Super String Element
Chapter 5  12dPL Library Calls
Get_super_segment_radius(Element super,Integer seg,Real &rad)
Name
Integer Get_super_segment_radius(Element super,Integer seg,Real &rad)
Description
For the super string super, get the radius of segment number seg and return the radius in rad.
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Radius_Array set.
A return value of 0 indicates the function call was successful.
ID = 711
Set_super_segment_major(Element super,Integer seg,Integer bulge)
Name
Integer Set_super_segment_major(Element super,Integer seg,Integer bulge)
Description
For the super string super, set the major/minor arc value of segment number seg to the value 
bulge. (bulge of segment b = 1 for major arc > 180 degrees, b = 0 for minor arc < 180 degrees)
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Major_Array set.
A return value of 0 indicates the function call was successful.
ID = 712
Get_super_segment_major(Element super,Integer seg,Integer &bulge)
Name
Integer Get_super_segment_major(Element super,Integer seg,Integer &major)
Description
For the super string super, get the major/minor arc bulge of segment number seg and return the 
value in bulge (bulge of segment bulge = 1 for major arc > 180 degrees, bulge = 0 for minor arc < 
180 degrees).
See  Segment Radius Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Major_Array set.
A return value of 0 indicates the function call was successful.
ID = 713
Page 428
Super String Element
 12d Model Macro Manual
5.38.6 Super String Segment Linestyle Functions
V12+ only feature. For definitions of the Segment Linestyle dimensions, see  Segment Linestyle Dimension
Set_super_use_segment_linestyle(Element super,Integer use)
Name
Integer Set_super_use_segment_linestyle(Element super,Integer use)
Description
For the super string Element super, define whether the segment linestyle dimension 
Att_Segment_Linestyle_Array is to be used or removed. 
See  Segment Linestyle Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the segments of the super have of different linestyles.
If use is 0, the dimension is removed. That is, all the segments of the super use the string linestyle.
A return value of 0 indicates the function call was successful.
ID = 3131
Get_super_use_segment_linestyle(Element super,Integer &use)
Name
Integer Get_super_use_segment_linestyle(Element super,Integer &use)
Description
Query whether the segment radius dimension Att_Segment_Linestyle_Array exists for the super 
string.
use is returned as 1 if the dimension Att_Segment_Linestyle_Array exists, or 0 if the dimension 
doesn’t exist.
See  Segment Linestyle Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A return value of 0 indicates the function call was successful.
ID = 3132
Set_super_segment_linestyle(Element super,Integer seg,Text linestyle_name)
Name
Integer Set_super_segment_linestyle(Element super,Integer seg,Text linestyle_name)
Description
For the super string super, set the segment linestyle for segment number seg to the one with name 
linestyle_name.
See  Segment Linestyle Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Segment_Linestyle_Array set.
A return value of 0 indicates the function call was successful.
ID = 3133
Page 429
Super String Element
Chapter 5  12dPL Library Calls
Get_super_segment_linestyle(Element super,Integer seg,Text &linestyle_name)
Name
Integer Get_super_segment_linestyle(Element super,Integer seg,Text &linestyle_name)
Description
For the super string super, get the segment linestyle for segment number seg and return its name 
in linestyle_name.
See  Segment Linestyle Dimension for information on the Segment Radius dimensions or 5.38.1 
Super String Dimensionsfor information on all dimensions.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Segment_Linestyle_Array set.
A return value of 0 indicates the function call was successful.
ID = 3134
Page 430
Super String Element
 12d Model Macro Manual
5.38.7 Super String Point Id Functions
For definitions of the Point Id dimension, see  Point Id Dimension
Set_super_use_vertex_point_number(Element super,Integer use)
Name
Integer Set_super_use_vertex_point_number(Element super,Integer use)
Description
Tell the super string whether to use, remove, the dimension Att_Point_Array.
If Att_Point_Array exists, the string can have a Point Id for each vertex.
If use is 1, the dimension is set and each vertex can have a Point Id.
If use is 0, the dimension is removed.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 738
Get_super_use_vertex_point_number(Element super,Integer &use)
Name
Integer Get_super_use_vertex_point_number(Element super,Integer &use)
Description
Query whether the dimension Att_Point_Array exists for the super string. 
If Att_Point_Array exists, the string can have a Point Id for each vertex.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 739
Set_super_vertex_point_number(Element super,Integer vert,Integer point_number)
Name
 Integer Set_super_vertex_point_number(Element super,Integer vert,Integer point_number)
Description
For the Element super which must be of type Super, set the Point Id for vertex number vert to the 
have the text value of the integer point_number.
If the Element super is not of type Super, or the dimension Att_Point_Array is not set, then a non-
zero return code is returned.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
Note - in earlier versions of 12d Model (pre v6), point id’s were only integers. This was extended to 
being a text when surveying equipment allowed non-integer point ids.
A function return value of zero indicates the point id was successfully set.
Page 431
Super String Element
Chapter 5  12dPL Library Calls
ID = 740
Get_super_vertex_point_number(Element super,Integer vert,Integer 
&point_number)
Name
Integer Get_super_vertex_point_number(Element super,Integer vert,Integer &point_number)
Description
This function should no longer be used because now Point Id’s do not have to be integers.
From the Element super which must be of type Super, get the Point Id for vertex number vert and 
return it in the Integer point_number.
If the Element super is not of type Super, or the dimension Att_Point_Array is not set for super, 
then a non-zero return code is returned.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
Note - in earlier versions of 12d Model (pre v6), Point Id’s were only integers. This was extended to 
being a text when surveying equipment allowed non-integer Point Ids.
A function return value of zero indicates the point id was successfully returned.
ID = 741
Set_super_vertex_point_number(Element super,Integer vert,Text point_id 
Name
Integer Set_super_vertex_point_number(Element super,Integer vert,Text point_id) 
Description
For the Element super which must be of type Super, set the Point Id for vertex number vert to the 
text point_id.
If the Element super is not of type Super, or the dimension Att_Point_Array is not set, then a non-
zero return code is returned.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the point id was successfully set.
ID = 1625
Get_super_vertex_point_number(Element super,Integer vert,Text &point_id) 
Name
Integer Get_super_vertex_point_number(Element super,Integer vert,Text &point_id) 
Description
From the Element super which must be of type Super, get the Point Id for vertex number vert and 
return it in the Text point_id.
If the Element super is not of type Super, or the dimension Att_Point_Array is not set for super, 
then a non-zero return code is returned.
See  Point Id Dimension for information on the Point Id dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the point id was successfully returned.
Page 432
Super String Element
 12d Model Macro Manual
ID = 1626
Page 433
Super String Element
Chapter 5  12dPL Library Calls
5.38.8 Super String Vertex Symbol Functions
For definitions of the Vertex Symbols dimensions, see  Vertex Symbol Dimensions
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parameters
See 5.38.8.2 Super String Use Vertex Symbol Functions
See 5.38.8.3 Setting Super String Vertex Symbol Parameters
Page 434
Super String Element
 12d Model Macro Manual
5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parameters
Symbols can be placed on vertices of a super string. 
The displayed symbol is defined by 
(a)
the position of the super string vertex
(b)
the symbol name
(c)
angle of rotation of the symbol
(d)
defining what is known as the symbol justification point in relation to the vertex
For symbols, the symbol justification point and the angle of the symbol are defined by:
(a)
the symbol justification point is given as an x offset and a y offset from the vertex
(b)
the angle of the symbol is given as a counter clockwise angle of rotation (measured from the x-
axis) about the symbol justification point.
The vertex and justification point only coincide if the x offset and y offset values are both zero.
.
position of
the position of the
symbol justification point
angle
x offset and y offset
from the vertex
super string
vertex
is defined by the
Symbol
x offset
y offset
Page 435
Super String Element
Chapter 5  12dPL Library Calls
5.38.8.2 Super String Use Vertex Symbol Functions
Set_super_use_symbol(Element super,Integer use)
Name
Integer Set_super_use_symbol(Element super,Integer use)
Description
For Element super of type Super, define whether the vertex symbol dimension Att_Symbol_Value 
is used or removed.
See  Vertex Symbol Dimensions for information on the Vertex Symbol dimensions or 5.38.1 Super 
String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string has one symbol for all vertices.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 797
Get_super_use_symbol(Element super,Integer &use)
Name
Integer Get_super_use_symbol(Element super,Integer &use)
Description
Query whether the vertex symbol dimension Att_Symbol_Value exists for the Element super of type 
Super. 
See  Vertex Symbol Dimensions for information on the Vertex Symbol dimensions or 5.38.1 Super 
String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists. That is, the super string has one symbol for all vertices.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 798
Set_super_use_vertex_symbol(Element super,Integer use)
Name
Integer Set_super_use_vertex_symbol(Element super,Integer use)
Description
For Element super of type Super, define whether the vertex symbol dimension Att_Symbol_Array is 
used or removed.
See  Vertex Symbol Dimensions for information on the Vertex Symbol dimensions or 5.38.1 Super 
String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string has a different symbol on each vertex.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 799
Get_super_use_vertex_symbol(Element super,Integer &use)
Page 436
Super String Element
 12d Model Macro Manual
Name
Integer Get_super_use_vertex_symbol(Element super,Integer &use)
Description
Query whether the vertex symbol dimension Att_Symbol_Array exists for the super string.
See  Vertex Symbol Dimensions for information on the Vertex Symbol dimensions or 5.38.1 Super 
String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists. That is, the super string has a different symbol on each 
vertex.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 800
Super_vertex_symbol_value_to_array(Element super) 
Name
Integer Super_vertex_symbol_value_to_array(Element super) 
Description
If for the super string super the dimension Att_Symbol_Value exists and the dimension 
Att_Symbol_Array does not exist then there will be one z value zval (height or level) for the entire 
string.
In this case (when the dimension Att_Symbol_Value exists and the dimension Att_Symbol_Array 
does not exist) this function sets the Att_Symbol_Array dimension and creates a new array for 
symbol at each vertex of super.
See  Vertex Symbol Dimensions for information on the Height (ZCoord) dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 2175
Page 437
Super String Element
Chapter 5  12dPL Library Calls
5.38.8.3 Setting Super String Vertex Symbol Parameters
Set_super_vertex_symbol_style(Element super,Integer vert,Text sym)
Name
Integer Set_super_vertex_symbol_style(Element super,Integer vert,Text sym)
Description
For the super Element super, set the symbol on vertex number vert to be the symbol style named 
sym.
If there is only the one Symbol for the entire string then the symbol name for that symbol is set to 
sym regardless of the value of vert.
A return value of 0 indicates the function call was successful.
ID = 801
Get_super_vertex_symbol_style(Element super,Integer vert,Text &sym)
Name
Integer Get_super_vertex_symbol_style(Element super,Integer vert,Text &s)
Description
For the super Element super, return the name of the symbol on vertex number vert in Text sym.
If there is only the one Symbol for the entire string then the symbol name for that symbol is returned 
in sym regardless of the value of vert.
A return value of 0 indicates the function call was successful.
ID = 802
Set_super_vertex_symbol_colour(Element super,Integer vert,Integer col)
Name
Integer Set_super_vertex_symbol_colour(Element super,Integer vert,Integer col)
Description
For the super Element super, set the colour number of the symbol from the vertex number vert to 
be col.
If there is only the one Symbol for the entire string then the colour number of that symbol is set to 
col regardless of the value of vert.
A return value of 0 indicates the function call was successful.
ID = 807
Get_super_vertex_symbol_colour(Element super,Integer vert,Integer &col)
Name
Integer Get_super_vertex_symbol_colour(Element super,Integer vert,Integer &col)
Description
For the super Element super, return as col the colour number of the symbol on vertex number vert.
If there is only the one Symbol for the entire string then the colour number of that symbol is returned 
in col regardless of the value of vert.
A return value of 0 indicates the function call was successful.
Page 438
Super String Element
 12d Model Macro Manual
ID = 808
Set_super_vertex_symbol_offset_width(Element super,Integer vert,Real x_offset)
Name
Integer Set_super_vertex_symbol_offset_width(Element super,Integer vert,Real x_offset)
Description
For the super Element super, set the x offset of the symbol from vertex number vert to be x_offset.
If there is only the one Symbol for the entire string then the x offset of that symbol is set to x_offset 
regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the definition 
of x offset.
A return value of 0 indicates the function call was successful.
ID = 809
Get_super_vertex_symbol_offset_width(Element super,Integer vert,Real &x_offset)
Name
 Integer Get_super_vertex_symbol_offset_width(Element super,Integer vert,Real &x_offset)
Description
For the super Element super, return as x_offset the x offset of the symbol from vertex number vert.
If there is only the one Symbol for the entire string then the x offset of that Symbol is returned in 
x_offset regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the definition 
of x offset.
A return value of 0 indicates the function call was successful.
ID = 810
Set_super_vertex_symbol_offset_height(Element super,Integer vert,Real y_offset)
Name
Integer Set_super_vertex_symbol_offset_height(Element super,Integer vert,Real y_offset)
Description
For the super Element super, set the y offset of the symbol from the vertex number vert to be 
y_offset.
If there is only the one Symbol for the entire string then the y offset of that symbol is set to y_offset 
regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the definition 
of y offset.
A return value of 0 indicates the function call was successful.
ID = 811
Get_super_vertex_symbol_offset_height(Element super,Integer vert,Real &y_offset)
Name
Page 439
Super String Element
Chapter 5  12dPL Library Calls
Integer Get_super_vertex_symbol_offset_height(Element super,Integer vert,Real &y_offset)
Description
For the super Element super, return as y_offset the y offset of the symbol from the vertex number 
vert.
If there is only the one Symbol for the entire string then the y offset of that Symbol is returned in 
y_offset regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the 
definition of y offset.
A return value of 0 indicates the function call was successful.
ID = 812
Set_super_vertex_symbol_rotation(Element super,Integer vert,Real ang)
Name
Integer Set_super_vertex_symbol_rotation(Element super,Integer vert,Real ang)
Description
For the super Element super, set the angle of rotation of the symbol on vertex number vert to ang. 
ang is in radians and is measured counterclockwise from the x-axis.
angle is in radians and is measured counterclockwise from the x-axis.
If there is only the one Symbol for the entire string then the angle of rotation of that symbol is set to 
ang regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the 
definition of angle of rotation of the symbol.
A return value of 0 indicates the function call was successful.
ID = 803
Get_super_vertex_symbol_rotation(Element super,Integer vert,Real &angle)
Name
Integer Get_super_vertex_symbol_rotation(Element super,Integer vert,Real &angle)
Description
For the super Element super, return the angle of rotation in angle of the symbol on vertex number 
vert. 
angle is in radians and is measured counterclockwise from the x-axis.
If there is only the one angle of rotation for the entire string then the angle of rotation of that Symbol 
is returned in ang regardless of the value of vert.
See 5.38.8.1 Definitions of Super String Vertex Symbol Dimensions and Parametersfor the 
definition of angle of rotation of the symbol.
A return value of 0 indicates the function call was successful.
ID = 804
Set_super_vertex_symbol_size(Element super,Integer vert,Real sz)
Name
Integer Set_super_vertex_symbol_size(Element super,Integer vert,Real sz)
Page 440
Super String Element
 12d Model Macro Manual
Description
For the super Element super, set the size of the symbol on vertex number vert to be sz.
If there is only the one Symbol for the entire string then the size of that symbol is set to sz 
regardless of the value of vert.
A return value of 0 indicates the function call was successful.
ID = 805
Get_super_vertex_symbol_size(Element super,Integer vert,Real &sz)
Name
Integer Get_super_vertex_symbol_size(Element super,Integer vert,Real &sz)
Description
For the super Element super, return as s the size of the symbol on vertex number vert.
If there is only the one Symbol for the entire string then the size of that Symbol is returned in sz 
regardless of the value of vert.
A return value of 0 indicates the function call was successful.
ID = 806
Page 441
Super String Element
Chapter 5  12dPL Library Calls
5.38.9 Super String Pipe/Culvert Functions
For definitions of the Pipe and Culvert dimensions, see  Pipe/Culvert Dimensions
See 5.38.9.1 Definitions of Super String Pipe and Culvert Dimensions and Parameters
See 5.38.9.2 Super String Use Pipe Functions
See 5.38.9.3 Setting Super String Pipe/Culvert Parameters
Page 442
Super String Element
 12d Model Macro Manual
5.38.9.1 Definitions of Super String Pipe and Culvert Dimensions and Parameters
A super string can be super pipe string and the super pipe string can be either
(a)
a round pipe with a diameter and a thickness
or
(b)
or a rectangular pipe (culvert) with a width, height and four thicknesses (top, bottom, left right).
As a round pipe string, it can have either one diameter and one wall thickness for all segments of the 
string, or it can have different diameters and wall thicknesses for each segment of the string.
As a culvert string, it can have either one width, one height and four wall thicknesses (top, bottom, 
left and right) for all segments of the string, or it can have different heights, widths and four wall 
thicknesses (top, bottom, left and right) for each segment of the string.
The default value for wall thickness is zero.
external diameter of round pipe  = internal diameter + 2 * thickness
external width of culvert              = internal width + left thickness + right thickness
external height of culvert             = height + top thickness + bottom thickness
The thickness(es) can be applied to either the inside or the outside of a pipe. In our macro call, it is 
control by parameter internal_diameter (for round pipe) or internal_width_height (for culvert). For 
example, when internal_diameter is 1 (true), then the original diameter is the internal; hence the 
thickness would be applied outside.
The centre of the culvert is defined to be the middle of the internal pipe if internal_width_height is 1 
(true); and is defined to be the middle of the external pipe if internal_width_height is 0 (false).
In practise pipes and culverts may also have a nominal diameter, width and height but there is no 
exact relationship between the nominal values and the interior or exterior values.
Pipe/Culvert Justification
Both the super pipe string and a super culvert string are defined in space by their (x,y,z) vertices but 
depending on the justification value, the (x,y,z) can represent either:
     the invert of the pipe/culvert                         justification = 0
     the internal centre of the pipe/culvert           justification = 1
     the obvert of the pipe/culvert                        justification = 2
invert
bottom
centre
obvert or soffit
pipe super string
culvert super string
Section Through the Pipe/Culvert String
top
thickness
1/2 internal
1/2 internal width
internal
diameter
top thickness
bottom thickness
right
thickness
left thickness
height
1/2 internal width
Page 443
Super String Element
Chapter 5  12dPL Library Calls
See  Super String Use Pipe/Culvert Justify Dimensions
See 5.38.9.2 Super String Use Pipe Functions
See  Setting Super String Culvert Width, Height and Thicknesses
See 5.38.10.1 Definitions of Super String Vertex Text Dimensions, Units and Annotation Parameters
See 5.38.10.2 Super String Use Vertex Text Functions
See 5.38.10.3 Super String Use Vertex Annotation Functions
See 5.38.10.4 Setting Super String Vertex Text and Annotation Parameters
pipe super string
culvert super string
Section Through the Pipe/Culvert String
justification = 0
justification = 1
justification = 2
invert
centre
obvert
Page 444
Super String Element
 12d Model Macro Manual
5.38.9.2 Super String Use Pipe Functions
Super pipes could have a diameter with an optional thickness (round pipe), or have a width and 
height with an four optional thicknesses (rectangular pipe or culvert).
Super String Use Round Pipe Dimensions
Set_super_use_pipe(Element elt,Integer use) for V10 onwards
Set_super_use_diameter(Element elt,Integer use) for V9
Name
Integer Set_super_use_pipe(Element elt,Integer use)
Integer Set_super_use_diameter(Element elt,Integer use)
Description
For the super string Element elt, define whether the pipe/culvert dimension Att_Diameter_Value is 
used or removed. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If use is 1, the dimension Att_Diameter_Value is set That is, the pipe has one diameter and one 
thickness (V10) for the entire string (i.e. a constant pipe).
If use is 0, the dimension is removed.
Note if any other pipe/culvert dimensions exist (besides Att_Pipe_Justify), there is no change to the 
super string and this calls return a non-zero value. 
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful.
ID = 704
Get_super_use_pipe(Element elt,Integer &use) for V10 onwards
Get_super_use_diameter(Element elt,Integer &use) for V9
Name
Integer Get_super_use_pipe(Element elt,Integer &use)
Integer Get_super_use_diameter(Element elt,Integer &use)
Description
Query whether the pipe/culvert dimension Att_Diameter_Value exists for the super string elt. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists
use is returned as 0 if the dimension doesn’t exist, or if it is a variable pipe string (i.e. a 
Att_Diameter_Array exists).
Note - if it is a constant pipe string (Att_Diameter_Value exists) and a variable pipe string 
(Att_Diameter_Array exists) then the variable pipe takes precedence.
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful.
ID = 705
Set_super_use_segment_pipe(Element elt,Integer use) for V10 onwards
Page 445
Super String Element
Chapter 5  12dPL Library Calls
Set_super_use_segment_diameter(Element elt,Integer use) for V9
Name
Integer Set_super_use_segment_pipe(Element elt,Integer use)
Integer Set_super_use_segment_diameter(Element elt,Integer use)
Description
For the super string Element elt, define whether the pipe/culvert dimension Att_Diameter_Array is 
used or removed.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If use is 1, the dimension Att_Diameter_Array is set. That is, each pipe segment can have a 
different diameter and thickness (V10).
If use is 0, the dimension is removed.
Note if any other pipe/culvert dimensions exist (besides Att_Pipe_Justify), there is no change to the 
super string and this calls return a non-zero value. 
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful.
ID = 714
Get_super_use_segment_pipe(Element elt,Integer &use) for V10 onward
Get_super_use_segment_diameter(Element elt,Integer &use) for V9
Name
Integer Get_super_use_segment_pipe (Element elt,Integer &use)
Integer Get_super_use_segment_diameter (Element elt,Integer &use)
Description
Query whether the pipe/culvert dimension Att_Diameter_Array exists for the super string elt. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful.
ID = 715
Super String Use Culvert Dimensions
Set_super_use_culvert(Element super,Integer use)
Name
Integer Set_super_use_culvert(Element super,Integer use)
Description
Tell the super string whether to use or remove the pipe/culvert dimension Att_Culvert_Value. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
Page 446
Super String Element
 12d Model Macro Manual
Note if any other pipe/culvert dimensions exist (besides Att_Pipe_Justify), there is no change to the 
super string and this calls return a non-zero value. 
A return value of 0 indicates the function call was successful.
ID = 1247
Get_super_use_culvert(Element super,Integer &use)
Name
Integer Get_super_use_culvert(Element super,Integer &use)
Description
Query whether the pipe/culvert dimension Att_Culvert_Value exists for the super string.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension Att_Culvert_Value exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1246
Set_super_use_segment_culvert(Element super,Integer use)
Name
Integer Set_super_use_segment_culvert(Element super,Integer use)
Description
Tell the super string whether to use or remove the pipe/culvert dimension Att_Culvert_Array.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
Note if any other pipe/culvert dimensions exist (besides Att_Pipe_Justify), there is no change to the 
super string and this calls return a non-zero value. 
A return value of 0 indicates the function call was successful.
ID = 1251
Get_super_use_segment_culvert(Element super,Integer &use)
Name
Integer Get_super_use_segment_culvert(Element super,Integer &use)
Description
Query whether the pipe/culvert dimension Att_Culvert_Array exists for the super string. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension Att_Culvert_Array exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1250
Page 447
Super String Element
Chapter 5  12dPL Library Calls
Super String Use Pipe/Culvert Justify Dimensions
Set_super_use_pipe_justify(Element super,Integer use)
Name
Integer Set_super_use_pipe_justify(Element super,Integer use)
Description
For Element super of type Super, define whether the pipe/culvert dimension Att_Pipe_Justify is 
used or removed.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the pipe or culvert super string has a justification defined.
If use is 0, the dimension is removed.
Note: the same justification flag is used whether the super string is a round pipe or a culvert and the 
justification applies for the entire string.
A return value of 0 indicates the function call was successful.
ID = 1255
Get_super_use_pipe_justify(Element super,Integer &use)
Name
Integer Get_super_use_pipe_justify(Element super,Integer &use)
Description
Query whether the pipe/culvert dimension Att_Pipe_Justify exists for the Element super of type 
Super. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists
use is returned as 0 if the dimension doesn’t exist.
Note: the same justification flag is used whether the super string is a round pipe or a culvert and the 
justification applies for the entire string.
A return value of 0 indicates the function call was successful.
ID = 1254
Page 448
Super String Element
 12d Model Macro Manual
5.38.9.3 Setting Super String Pipe/Culvert Parameters
See  Setting Super String Pipe/Culvert Justification
See  Setting Super String Round Pipe Diameter and Thickness
See  Setting Super String Culvert Width, Height and Thicknesses
See  Superseded Setting Super String Round Pipe Diameter
See  Superseded Setting Super String Culvert Width, Height and Thicknesses
Setting Super String Pipe/Culvert Justification
Integer Set_super_pipe_justify(Element super,Integer justify)
Name
Integer Set_super_pipe_justify(Element super,Integer justify)
Description
For the Element super of type Super which is a pipe or culvert string (i.e. Att_Diameter_Value, 
Att_Diameter_Array, Att_Culvert_Value or Att_Culvert_Array has been set), set the pipe/culvert 
justification to justify.
The values for justify are given in  Pipe/Culvert Justification
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or a correct dimension is not allocated, this call fails and a 
non-zero function value is returned.
Note: the same justification flag is used whether the super string is a pipe or a culvert and the 
justification applies for the entire string.
A return value of 0 indicates the function call was successful
ID = 1256
Get_super_pipe_justify(Element super,Integer &justify)
Name
Integer Get_super_pipe_justify(Element super,Integer &justify)
Description
For the Element super of type Super which is a pipe or culvert string (i.e. Att_Diameter_Value, 
Att_Diameter_Array, Att_Culvert_Value or Att_Culvert_Array has been set), get the pipe/culvert 
justification and return it in justify. 
The values for justify are given in  Pipe/Culvert Justification
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or a correct dimension is not allocated, this call fails and a 
non-zero function value is returned.
Note: the same justification flag is used whether the super string is a pipe or a culvert and the 
justification applies for the entire string.
A return value of 0 indicates the function call was successful
ID = 1257
Page 449
Super String Element
Chapter 5  12dPL Library Calls
Setting Super String Round Pipe Diameter and Thickness
Set_super_pipe(Element super,Real diameter,Real thickness,Integer 
internal_diameter)
Name
Integer Set_super_pipe(Element super,Real diameter,Real thickness,Integer internal_diameter)   
Description
For the Element super of type Super which is a constant diameter pipe string (i.e. the dimension 
flag Att_Diameter_Value has been set and Att_Diameter_Array has not been set), set the thickness 
to thickness and the internal diameter to diameter if internal_diameter = 1 or the external diameter 
to diameter if internal_diameter is non zero.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
Note - Get_super_use_pipe can be called to make sure it is a constant diameter pipe string.
A return value of 0 indicates the function call was successful.
 ID = 2645
Get_super_pipe(Element super,Real &diameter,Real thickness,Integer 
internal_diameter)
Name
Integer Get_super_pipe(Element super,Real &diameter,Real thickness,Integer internal_diameter) 
Description
For the Element super of type Super which is a constant diameter round pipe string (i.e. 
Att_Diameter_Value has been set and Att_Diameter_Array has not been set), get the pipe thickness 
and return it in thickness and the internal diameter and return it in internal_diameter.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
Note - Get_super_use_pipe can be called to make sure it is a constant diameter round pipe string.
A return value of 0 indicates the function call was successful
ID = 2646
Set_super_segment_pipe(Element super,Integer seg,Real diameter, Real 
thickness,Integer internal_diameter)
Name
Integer Set_super_segment_pipe(Element super,Integer seg,Real diameter,Real thickness,Integer 
internal_diameter) 
Description
For the super Element super and segment number seg, set the thickness to thickness and the 
internal diameter to diameter if internal_diameter = 1 or the external diameter to diameter if 
internal_diameter is non zero.
If super is not a variable pipe string then a non zero return value is returned.
Page 450
Super String Element
 12d Model Macro Manual
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
A return value of 0 indicates the function call was successful
ID = 2649
Get_super_segment_pipe(Element super,Integer seg,Real &diameter, Real 
&thickness,Integer &internal_diameter)
Name
Integer Get_super_segment_pipe(Element super,Integer seg,Real &diameter,Real &thickness,Integer 
&internal_diameter)   
Description
For the super Element super and for segment number seg, get the pipe thickness and return it in 
thickness, and if the returned value of internal_diameter is 1 then return the internal diameter in 
diameter otherwise return the external diameter in diameter.
If super is not a variable pipe string then a non zero return value is returned.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
ID = 2650
Page 451
Super String Element
Chapter 5  12dPL Library Calls
Setting Super String Culvert Width, Height and Thicknesses
Set_super_culvert(Element super,Real width,Real height,Real left_thickness,Real 
right_thickness,Real top_thickness,Real bottom_thickness, Integer 
internal_width_height)
Name
Integer Set_super_culvert(Element super,Real width,Real height,Real left_thickness,Real right_thickness,Real 
top_thickness,Real bottom_thickness,Integer internal_width_height)   
Description
For the Element super of type Super which is a constant width and height string (i.e.the pipe/
culvert dimension flag Att_Culvert_Value has been set and Att_Culvert_Array not set), then
if internal_width_height =1 then set the culvert internal width to w and the internal height to h.
if internal_width_height is not 1 then set the culvert external width to w and the external height 
to h.
Set the left thickness to left_thickness, right thickness to right_thickness, top thickness to 
top_thickness and bottom thickness to bottom_thickness.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension Att_Culvert_Value is not allocated, this 
call fails and a non-zero function value is returned.
A return value of 0 indicates the function call was successful.
Note - Get_super_use_culvert can be called to make sure it is a constant culvert string.
ID = 2647
Get_super_culvert(Element super,Real &width,Real &height,Real 
&left_thickness,Real &right_thickness,Real &top_thickness, Real 
&bottom_thickness,Integer &internal_width_height)
Name
Integer Get_super_culvert(Element super,Real &width,Real &height,Real &left_thickness,Real 
&right_thickness,Real &top_thickness,Real &bottom_thickness,Integer &internal_width_height) 
Description
For the Element super of type Super which is a constant width and height string (i.e.the pipe/
culvert dimension flag Att_Culvert_Value has been set and Att_Culvert_Array not set), then
if internal_width_height is returned as 1 then the culvert internal width is returned in w and the 
internal height returned in h.
if internal_width_height is not returned as 1 then the culvert external width is returned in w and 
the external height returned in h.
The left thickness is returned in left_thickness, right thickness in right_thickness, top thickness in 
top_thickness and bottom thickness in bottom_thickness.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
A return value of 0 indicates the function call was successful
Note - Get_super_use_culvert can be called to make sure it is a constant culvert string.
ID = 2648
Page 452
Super String Element
 12d Model Macro Manual
Set_super_segment_culvert(Element super,Integer seg,Real width,Real height, Real 
left_thickness,Real right_thickness,Real top_thickness, Real bottom_thickness,Integer 
internal_width_height)
Name
Integer Set_super_segment_culvert(Element super,Integer seg,Real width,Real height,Real left_thickness,Real 
right_thickness,Real top_thickness,Real bottom_thickness,Integer internal_width_height)   
Description
For the Element super of type Super which has culvert widths and heights for each segment 
(i.e.the pipe/culvert dimension flag Att_Culvert_Array has been set), then for segment number seg:
if internal_width_height =1 then set the culvert internal width to w and the internal height to h.
if internal_width_height is not 1 then set the culvert external width to w and the external height 
to h.
Set the left thickness to left_thickness, right thickness to right_thickness, top thickness to 
top_thickness and bottom thickness to bottom_thickness.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension Att_Culvert_Array is not allocated, this 
call fails and a non-zero function value is returned.
A return value of 0 indicates the function call was successful.
Note - Get_super_use_segment_culvert can be called to make sure it is a variable segment culvert 
string.
ID = 2651
Get_super_segment_culvert(Element super,Integer seg,Real &width,Real 
&height,Real &left_thickness,Real &right_thickness,Real &top_thickness, Real 
&bottom_thickness,Integer &internal_width_height) For V10 only 
Name
Integer Get_super_segment_culvert(Element super,Integer seg,Real &width,Real &height,Real 
&left_thickness,Real &right_thickness,Real &top_thickness,Real &bottom_thickness,Integer 
&internal_width_height)   
Description
For the Element super of type Super which has culvert width and heights for each segment (i.e.the 
pipe/culvert dimension flag Att_Culvert_Array has been set), then for segment number seg:
if internal_width_height is returned as 1 then the culvert internal width is returned in w and the 
internal height returned in h.
if internal_width_height is not returned as 1 then the culvert external width is returned in w and 
the external height returned in h.
The left thickness is returned in left_thickness, right thickness in right_thickness, top thickness in 
top_thickness and bottom thickness in bottom_thickness.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
A return value of 0 indicates the function call was successful
Page 453
Super String Element
Chapter 5  12dPL Library Calls
Note - Get_super_use_segment_culvert can be called to make sure it is a variable segment culvert 
string.
ID = 2652
Page 454
Super String Element
 12d Model Macro Manual
Superseded Setting Super String Round Pipe Diameter
From V10 onwards, round pipe strings can have a wall thickness so the following calls that do not 
return this extra value are now superseded and should not be used.
Set_super_pipe(Element super,Real diameter) for V10 and above
Set_super_diameter(Element super,Real diameter) for V9
Name
Integer Set_super_pipe (Element super,Real diameter)
Integer Set_super_diameter (Element super,Real diameter)
Description
For the Element super of type Super which is a constant diameter pipe string (i.e. the dimension 
flag Att_Diameter_Value has been set and Att_Diameter_Array has not been set), set the diameter 
to diameter. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
Note - Get_super_use_pipe can be called to make sure it is constant diameter pipe string.
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful.
ID = 706
Get_super_pipe(Element super,Real &diameter) for V10 onwards
Get_super_diameter(Element super,Real &diameter) for V9
Name
Integer Get_super_pipe(Element super,Real &diameter)
Integer Get_super_diameter(Element super,Real &diameter)
Description
For the Element super of type Super which is a constant diameter round pipe string (i.e. 
Att_Diameter_Value has been set and Att_Diameter_Array has not been set), get the pipe diameter 
and return it in diameter.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
This function has the new name for V10 onwards. The old call will still work.
Note - Get_super_use_pipe can be called to make sure it is a constant diameter pipe string.
A return value of 0 indicates the function call was successful
ID = 707
Set_super_segment_pipe(Element super,Integer seg,Real diameter) for V10 onwards
Page 455
Super String Element
Chapter 5  12dPL Library Calls
Set_super_segment_diameter(Element super,Integer seg,Real diameter) for V9
Name
Integer Set_super_segment_pipe(Element super,Integer seg,Real diameter)
Integer Set_super_segment_diameter(Element super,Integer seg,Real diameter)
Description
For the super Element super, set the pipe diameter for segment number seg to diameter.
For V10, if super is not a variable pipe string then a non zero return value is returned.
For V10,a return value of 0 indicates the function call was successful
For V9, the return code is always 0.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
Note - for V9, no error code is set if the string in not a variable pipe string. That needs to checked 
using the Get_super_use_pipe calls.
This function has the new name for V10 onwards. The old call will still work.
A return value of 0 indicates the function call was successful
ID = 716
Get_super_segment_pipe(Element super,Integer seg,Real &diameter) for V10 onward
Get_super_segment_diameter(Element super,Integer seg,Real &diameter) for V9
Name
Integer Get_super_segment_pipe(Element super,Integer seg,Real &diameter)
Integer Get_super_segment_diameter(Element super,Integer seg,Real &diameter)
Description
This function has the new name for V10 onwards. The old call will still work.
For the super Element super, get the pipe diameter for segment number seg and return it in 
diameter.
For V10, if super is not a variable pipe string then a non zero return value is returned.
For V10,a return value of 0 indicates the function call was successful
For V9, the return code is always 0.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
Note - for V9, no error code is set if the string in not a variable pipe string. That needs to checked 
using the Get_super_use_pipe calls.
ID = 717
Page 456
Super String Element
 12d Model Macro Manual
Superseded Setting Super String Culvert Width, Height and Thicknesses
From V10 onwards, culvert strings can have four wall thicknesses (top, bottom, left and right) so the 
following calls that do not return theses extra values are now superseded and should not be used.
Set_super_culvert(Element super,Real w,Real h)
Name
Integer Set_super_culvert(Element super,Real w,Real h)
Description
For the Element super of type Super which is a constant width and height culvert string (i.e.the 
pipe/culvert dimension flag Att_Culvert_Value has been set), set the culvert width to w and the 
height to h. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated Att_Culvert_Value, this 
call fails and a non-zero function value is returned.
A return value of 0 indicates the function call was successful.
Note - Get_super_use_culvert can be called to make sure it is a constant culvert string.
ID = 1249
Get_super_culvert(Element super,Real &w,Real &h)
Name
Integer Get_super_culvert(Element super,Real &w,Real &h)
Description
For the Element super of type Super which is a constant width and height culvert string (i.e.the 
pipe/culvert dimension flag Att_Culvert_Value has been set), get the culvert width and height and 
return them in w and h respectively.
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension is not allocated, this call fails and a non-
zero function value is returned.
A return value of 0 indicates the function call was successful
Note - Get_super_use_culvert can be called to make sure it is a constant culvert string.
ID = 1248
Set_super_segment_culvert(Element super,Integer seg,Real w,Real h)
Name
Integer Set_super_segment_culvert(Element super,Integer seg,Real w,Real h)
Description
For the Element super of type Super which has culvert widths and heights for each segment(i.e.the 
pipe/culvert dimension flag Att_Culvert_Array has been set), set the culvert width and height for 
segment number seg to be w and h respectively. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension Att_Culvert_Array is not allocated, this 
call fails and a non-zero function value is returned.
Page 457
Super String Element
Chapter 5  12dPL Library Calls
A return value of 0 indicates the function call was successful.
Note - Get_super_use_segment_culvert can be called to make sure it is variable segment culvert 
string.
ID = 1253
Get_super_segment_culvert(Element super,Integer seg,Real &w,Real &h)
Name
Integer Get_super_segment_culvert(Element super,Integer seg,Real &w,Real &h)
Description
For the Element super of type Super which has culvert widths and heights for each segment(i.e.the 
pipe/culvert dimension flag Att_Culvert_Array has been set), get the culvert width and height for 
segment number seg and return them in w and h respectively. 
See  Pipe/Culvert Dimensions for information on the Pipe/Culvert dimensions or 5.38.1 Super String 
Dimensionsfor information on all dimensions.
If the Element super is not of type Super, or the dimension Att_Culvert_Array is not allocated, this 
call fails and a non-zero function value is returned.
A return value of 0 indicates the function call was successful.
Note - Get_super_use_segment_culvert can be called to make sure it is variable segment culvert 
string.
ID = 1252
Page 458
Super String Element
 12d Model Macro Manual
5.38.10 Super String Vertex Text and Annotation Functions
See 5.38.10.1 Definitions of Super String Vertex Text Dimensions, Units and Annotation Parameters
See 5.38.10.2 Super String Use Vertex Text Functions
See 5.38.10.3 Super String Use Vertex Annotation Functions
See 5.38.10.4 Setting Super String Vertex Text and Annotation Parameters
Page 459
Super String Element
Chapter 5  12dPL Library Calls
5.38.10.1 Definitions of Super String Vertex Text Dimensions, Units and Annotation 
Parameters
Super String Vertex text refers to the text at a super string vertex.
If super string text is required then the dimension to set is either 
(a)
the most common case of having a different text at each vertex (dimension 
Att_Vertex_Text_Array)
or
(b)
the rare case of just the same text that is used for every vertex (dimension 
Att_Vertex_Text_Value)
Although vertex text may be defined, it will not display in a plan view, or on a plan plot, unless a 
Vertex Text Annotation dimension has been set. A Text Annotation controls the text size, colour, 
rotation etc.
So if super string vertex text is required to be drawn on a plan view then the dimension to set is 
either 
(a)
for the case of having a different text annotation at each vertex so that the annotation attributes 
can be modified at each vertex then set dimension Att_Vertex_Annotate_Array
or
(b)
if there is just the one Annotation and its parameters are used for drawing the text on every 
vertex then set the dimension Att_Vertex_Annotate_Value (this is the case for the traditional 4d 
string).
For definitions of the Vertex Text dimensions see  Vertex Text Dimensions and the Vertex Text Annotation 
dimensions see  Vertex Text Annotation Dimensions.
Vertex Text Annotation Definitions
For vertex text, the text justification point and the direction of the text are defined by:
(a)
the direction of the text is given as a counter clockwise angle of rotation (measured from the x-
axis) about the vertex (default 0)
(b)
the justification point is given as an offset from the vertex along the line through the vertex with 
the direction of the text, and a perpendicular distance (called the raise) from that offset point to 
the justification point (default 0).
The vertex and justification point only coincide if the offset and raise values are both zero.
Finally the text can be one of nine positions defined in relation to the (x,y) coordinates of the text 
justification point:
top
3
6
9
Fred
.
position of
text vertex
the position of the
text justification
point for vertex text
angle
offset or offset width
raise 
angle, offset and raise
from the vertex
or super string
vertex
is defined by the
Vertex Text
line giving the direction
of the text
or offset height
Page 460
Super String Element
 12d Model Macro Manual
left
2
5
8
right
1
4
7
bottom
For numbers with a decimal point, the position of the decimal point gives an addition point on the 
bottom called decimal x and on the side called decimal y. So there are sixteen possible justification 
for numbers.
This is usually an Integer called the justification with a default value of 1. 
Vertex Text Annotation Units
The units for text size is specified by an Integer whose value is
(a)
 0 (the default) for the units are screen/pixel/device units
(b)
 1 for world units
(c)
2 for paper units (millimetres on a plot).
Regardless of whether there is one Vertex Text Annotation for the entire string or a different Text 
Annotation for each vertex, there is only one units for text size used for all the Vertex Text of the 
string.
The units for text are used for the size of the text, and the offsets and raises for the text. 
For Information on all the super string vertex text and vertex text annotations:
See 5.38.10.2 Super String Use Vertex Text Functions
See 5.38.10.3 Super String Use Vertex Annotation Functions
See 5.38.10.4 Setting Super String Vertex Text and Annotation Parameters
Page 461
Super String Element
Chapter 5  12dPL Library Calls
5.38.10.2 Super String Use Vertex Text Functions
For definitions of the Vertex Text dimensions, see  Vertex Text Dimensions
Set_super_use_vertex_text_value(Element super,Integer use)
Name
Integer Set_super_use_vertex_text_value(Element super,Integer use)
Description
Tell the super string super whether to use (set), or not use (remove), the dimension 
Att_Vertex_Text_Value.
A value for use of 1 sets the dimension and 0 removes it.
If Att_Vertex_Text_Value is used, then the same text is attached to all the vertices of the super 
string.
Note if the dimension Att_Vertex_Text_Array exists, this call is ignored.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1237
Get_super_use_vertex_text_value(Element super,Integer &use)
Name
Integer Get_super_use_vertex_text_value(Element super,Integer &use)
Description
Query whether the dimension Att_Vertex_Text_Value exists for the super string super. 
use is returned as 1 if the dimension Att_Vertex_Text_Value exists.
use is returned as 0 if the dimension doesn’t exist.
If the dimension Att_Vertex_Text_Value exists then the string has the same text for every vertex of 
the string.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1238
Set_super_use_vertex_text_array(Element super,Integer use)
Name
Integer Set_super_use_vertex_text_array(Element super,Integer use)
Description
Tell the super string whether to use (set), or not use (remove), the dimension 
Att_Segment_Text_Array. 
A value for use of 1 sets the dimension and 0 removes it.
If Att_Vertex_Text_Array is used, then there is different text at each vertex of the super string super.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
Page 462
Super String Element
 12d Model Macro Manual
ID = 742
Get_super_use_vertex_text_array(Element super,Integer &use)
Name
Integer Get_super_use_vertex_text_array(Element super,Integer &use)
Description
Query whether the dimension Att_Vertex_Text_Array exists (is used) for the super string super.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
If Att_Vertex_Text_Array is used, then there is different text on each vertex of the of the string.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 743
Super_vertex_text_value_to_array(Element super)   
Name
Integer Super_vertex_text_value_to_array(Element super)   
Description
If for the super string super the dimension Att_Vertex_Text_Value exists and the dimension 
Att_Vertex_Text_Array does not exist then there will be one Vertex Text txt for the entire string.
In this case (when the dimension Att_Vertex_Text_Value exists and the dimension 
Att_Vertex_Text_Array does not exist) this function sets the Att_Vertex_Text_Array dimension and 
new vertex text created for each vertex of super and the new vertex text is given the value txt.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 2177
Page 463
Super String Element
Chapter 5  12dPL Library Calls
5.38.10.3 Super String Use Vertex Annotation Functions
For definitions of the Vertex Annotation dimensions, see  Vertex Text Annotation Dimensions
Set_super_use_vertex_annotation_value(Element super,Integer use)
Name
Integer Set_super_use_vertex_annotation_value(Element super,Integer use)
Description
Tell the super string super whether to use, or not use, the dimension Att_Vertex_Annotate_Value. 
If the dimension Att_Vertex_Annotate_Value exists and the dimension Att_Vertex_Annotate_Array 
doesn’t exist then the string has the one annotation which is used for vertex text on any vertex of the 
string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
Note if the dimension Att_Vertex_Annotate_Array exists, this call is ignored.
A return value of 0 indicates the function call was successful.
ID = 750
Get_super_use_vertex_annotation_value(Element super,Integer &use)
Name
Integer Get_super_use_vertex_annotation_value(Element super,Integer &use)
Description
Query whether the dimension Att_Vertex_Annotate_Value exists for the super string super.
If the dimension Att_Vertex_Annotate_Value exists and the dimension Att_Vertex_Annotate_Array 
doesn’t exist then the string has the one annotation which is used for vertex text on any vertex of the 
string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 751
Set_super_use_vertex_annotation_array(Element super,Integer use)
Name
Integer Set_super_use_vertex_annotation_array(Element super,Integer use)
Description
Tell the super string super whether to use, or not use, the dimension Att_Vertex_Annotate_Array.
If the dimension Att_Vertex_Annotate_Array exists then the string has a different annotation for the 
vertex text on each vertex of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
Page 464
Super String Element
 12d Model Macro Manual
A return value of 0 indicates the function call was successful.
ID = 752
Get_super_use_vertex_annotation_array(Element super,Integer &use)
Name
Integer Get_super_use_vertex_annotation_array(Element super,Integer &use)
Description
Query whether the dimension Att_Vertex_Annotate_Array exists for the super string super.
If the dimension Att_Vertex_Annotate_Array exists then the string has a different annotation for the 
vertex text on each vertex of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 753
Super_vertex_annotate_value_to_array(Element elt)   
Name
Integer Super_vertex_annotate_value_to_array(Element elt)   
Description
If for the super string super the dimension Att_Vertex_Annotate_Value exists and the dimension 
Att_Vertex_Annotate_Array does not exist then there will be one Annotation annot for the entire 
string.
In this case (when the dimension Att_Vertex_Annotate_Value exists and the dimension 
Att_Vertex_Annotate_Array does not exist), this function sets the Att_Vertex_Annotate_Array 
dimension and new Annotations created for each vertex of super and the new Annotation is given 
the value annot.
See  Vertex Text Annotation Dimensions for information on the Text dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 2178
Page 465
Super String Element
Chapter 5  12dPL Library Calls
5.38.10.4 Setting Super String Vertex Text and Annotation Parameters
Set_super_vertex_text(Element super,Integer vert,Text txt)
Name
Integer Set_super_vertex_text(Element super,Integer vert,Text txt)
Description
For the super Element super, set the vertex text at vertex number vert to be txt.
If there is only one Vertex Text for all the vertices then the text for that one Vertex Text is set to txt 
regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 744
Get_super_vertex_text(Element super,Integer vert,Text &txt)
Name
Integer Get_super_vertex_text(Element super,Integer vert,Text &txt)
Description
For the super string super, return in txt the vertex text on vertex number vert.
If there is only one Vertex Text for all the vertices then the text for that one Vertex Text will be 
returned in txt regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 745
Set_super_vertex_world_text(Element super)
Name
Integer Set_super_vertex_world_text(Element)
Description
Set the units for vertex text for the super string super to World. See  Vertex Text Annotation Units.
A return value of 0 indicates the function call was successful.
ID = 747
Set_super_vertex_device_text(Element super)
Name
Integer Set_super_vertex_device_text(Element)
Description
Set the units for vertex text for the super string super to Screen (also known as Device or Pixel). 
See  Vertex Text Annotation Units.
A return value of 0 indicates the function call was successful.
ID = 746
Set_super_vertex_paper_text(Element super) 
Page 466
Super String Element
 12d Model Macro Manual
Name
Integer Set_super_vertex_paper_text(Element super) 
Description
For an Element super of type Super, set the text units for vertex text to be paper (that is millimetres).
See  Vertex Text Annotation Units for the definition of segment text units.
If there is Textstyle_Data for the vertex text then this will override the Set_super_vertex_device_text 
call.
A return value of 0 indicates the function call was successful.
ID = 1633
Set_super_vertex_text_type(Element super,Integer type)
Name
Integer Set_super_vertex_text_type(Element super,Integer type)
Description
For the super Element super, set the vertex text units to be the value of type. 
See  Vertex Text Annotation Units for the definition of vertex text units.
A return value of 0 indicates the function call was successful.
ID = 748
Get_super_vertex_text_type(Element super,Integer &type)
Name
Integer Get_super_vertex_text_type(Element super,Integer &type)
Description
For the super Element super, return in type the value for the vertex text units for the vertex text of 
the string.
See  Vertex Text Annotation Units for the definition of vertex text units.
A return value of 0 indicates the function call was successful.
ID = 749
Set_super_vertex_text_justify(Element super,Integer vert,Integer just)
Name
Integer Set_super_vertex_text_justify(Element super,Integer vert,Integer just)
Description
For the super string super, set the justification of the text on vertex number vert to just.
See  Vertex Text Annotation Definitions for the definition of justification.
If there is only one Vertex Text Annotation for all the Vertex Text then the justification for that one 
Vertex Text Annotation is set to just regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 754
Page 467
Super String Element
Chapter 5  12dPL Library Calls
Get_super_vertex_text_justify(Element super,Integer vert,Integer &just)
Name
Integer Get_super_vertex_text_justify(Element super,Integer vert,Integer &just)
Description
For the super string super, return the justification of the vertex text on vertex number vert in just.
See  Vertex Text Annotation Definitions for the definition of justification.
If there is only one Vertex Text Annotation for all the Vertex Text then the justification for that one 
Vertex Text Annotation will be returned in just regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 755
Set_super_vertex_text_offset_width(Element super,Integer vert,Real offset)
Name
Integer Set_super_vertex_text_offset_width(Element super,Integer vert,Real offset)
Description
For the super string super, set the offset (offset width) of the vertex text from vertex number vert to 
offset 
See  Vertex Text Annotation Definitions for the definition of offset (offset width).
If there is only one Vertex Text Annotation for all the Vertex Text then the offset width for that one 
Vertex Text Annotation is set to offset regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 756
Get_super_vertex_text_offset_width(Element super,Integer vert,Real &offset)
Name
Integer Get_super_vertex_text_offset_width(Element super,Integer vert,Real &offset)
Description
For the super string super, return as offset the offset (offset width) of the vertex text from vertex 
number vert.
See  Vertex Text Annotation Definitions for the definition of offset (offset width).
If there is only one Vertex Text Annotation for all the Vertex Text then the offset width for that one 
Vertex Text Annotation will be returned in offset regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 757
Set_super_vertex_text_offset_height(Element super,Integer vert,Real raise)
Name
Integer Set_super_vertex_text_offset_height(Element super,Integer vert,Real raise)
Description
For the super string super, set the raise (offset height) of the vertex text for vertex number vert to 
raise.
Page 468
Super String Element
 12d Model Macro Manual
See  Vertex Text Annotation Definitions for the definition of raise (offset height)
If there is only one Vertex Text Annotation for all the Vertex Text then the raise for that one Vertex 
Text Annotation is set to raise regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 758
Get_super_vertex_text_offset_height(Element super,Integer vert,Real &raise)
Name
Integer Get_super_vertex_text_offset_height(Element super,Integer vert,Real &raise)
Description
For the super string super, return as raise the raise of the vertex text from vertex number vert.
See  Vertex Text Annotation Definitions for the definition of raise (offset height)
If there is only one Vertex Text Annotation for all the Vertex Text then the raise for that one Vertex 
Text Annotation will be returned in raise regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 759
Set_super_vertex_text_colour(Element super,Integer vert,Integer col)
Name
Integer Set_super_vertex_text_colour(Element super,Integer vert,Integer col)
Description
For the super string super, set the colour number of the vertex text on the vertex number vert to be 
col.
If there is only one Vertex Text Annotation for all the Vertex Text then the colour number for that one 
Vertex Text Annotation is set to col regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 1091
Get_super_vertex_text_colour(Element super,Integer vert,Integer &col)
Name
Integer Get_super_vertex_text_colour(Element super,Integer vert,Integer &col)
Description
For the super string super, return as col the colour number of the vertex text on vertex number vert.
If there is only one Vertex Text Annotation for all the Vertex Text then the colour for that one Vertex 
Text Annotation will be returned in col regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 1092
Set_super_vertex_text_angle(Element super,Integer vert,Real ang)
Name
Integer Set_super_vertex_text_angle(Element super,Integer vert,Real ang)
Page 469
Super String Element
Chapter 5  12dPL Library Calls
Description
For the super string super, set the angle of rotation of the vertex text on vertex number vert to ang. 
ang is in radians and is measured counterclockwise from the x-axis.
See  Vertex Text Annotation Definitions for the definition of angle.
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation is set to ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 760
Get_super_vertex_text_angle(Element super,Integer vert,Real &ang)
Name
Integer Get_super_vertex_text_angle(Element super,Integer vert,Real &ang)
Description
For the super string super, return the angle of rotation of the vertex text on vertex number vert in 
ang. ang is measured in radians and is measured counterclockwise from the x-axis.
See  Vertex Text Annotation Definitions for the definition of angle.
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation will be returned in ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 761
Set_super_vertex_text_angle2(Element super,Integer vert,Real ang)
Name
Integer Set_super_vertex_text_angle2(Element super,Integer vert,Real ang)
Description
For the super string super, set the 3D beta angle of the vertex text on vertex number vert to ang. 
ang is in radians
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation is set to ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 3582
Get_super_vertex_text_angle2(Element super,Integer vert,Real &ang)
Name
Integer Get_super_vertex_text_angle2(Element super,Integer vert,Real &ang)
Description
For the super string super, return the 3D beta angle of the vertex text on vertex number vert in ang. 
ang is measured in radians.
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation will be returned in ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 3583
Page 470
Super String Element
 12d Model Macro Manual
Set_super_vertex_text_angle3(Element super,Integer vert,Real ang)
Name
Integer Set_super_vertex_text_angle3(Element super,Integer vert,Real ang)
Description
For the super string super, set the 3D gamma angle of the vertex text on vertex number vert to ang. 
ang is in radians
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation is set to ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 3584
Get_super_vertex_text_angle3(Element super,Integer vert,Real &ang)
Name
Integer Get_super_vertex_text_angle3(Element super,Integer vert,Real &ang)
Description
For the super string super, return the 3D gamma angle of the vertex text on vertex number vert in 
ang. ang is measured in radians.
If there is only one Vertex Text Annotation for all the Vertex Text then the angle for that one Vertex 
Text Annotation will be returned in ang regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 3585
Set_super_vertex_text_size(Element super,Integer vert,Real sz)
Name
Integer Set_super_vertex_text_size(Element super,Integer vert,Real sz)
Description
For the super Element super, set the size of the vertex text on vertex number vert to sz.
If there is only one Vertex Text Annotation for all the Vertex Text then the size for that one Vertex 
Text Annotation is set to sz regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 762
Get_super_vertex_text_size(Element super,Integer vert,Real &sz)
Name
Integer Get_super_vertex_text_size(Element super,Integer vert,Real &sz)
Description
For the super string super, return the size of the vertex text on vertex number vert as sz.
If there is only one Vertex Text Annotation for all the Vertex Text then the size for that one Vertex 
Text Annotation will be returned in sz regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
Page 471
Super String Element
Chapter 5  12dPL Library Calls
ID = 763
Set_super_vertex_text_x_factor(Element super,Integer vert,Real xf)
Name
Integer Set_super_vertex_text_x_factor(Element super,Integer vert,Real xf)
Description
For the super string super, set the x factor of the vertex text on vertex number vert to xf.
If there is only one Vertex Text Annotation for all the Vertex Text then the x factor for that one Vertex 
Text Annotation is set to xf regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 764
Get_super_vertex_text_x_factor(Element super,Integer vert,Real &xf)
Name
Integer Get_super_vertex_text_x_factor(Element super,Integer vert,Real &x)
Description
For the super string super, return in xf the x factor of the vertex text on vertex number vert.
If there is only one Vertex Text Annotation for all the Vertex Text then the x factor for that one Vertex 
Text Annotation will be returned in xf regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 765
Set_super_vertex_text_slant(Element super,Integer vert,Real sl)
Name
Integer Set_super_vertex_text_slant(Element super,Integer vert,Real sl)
Description
For the super string super, set the slant of the vertex text on vertex number vert to sl.
If there is only one Vertex Text Annotation for all the Vertex Text then the slant factor for that one 
Vertex Text Annotation is set to sl regardless of the value of vert. 
Note that the value of sl is measured as tangent here, where in 12da the value is writen in decimal 
angle.
The valid value for sl much be at least -1 and at most 1 (as the angle much be between -45 to 45 
degree).
A return value of 0 indicates the function call was successful.
ID = 766
Get_super_vertex_text_slant(Element super,Integer vert,Real &sl)
Name
Integer Get_super_vertex_text_slant(Element super,Integer vert,Real &s)
Description
For the super string super, return as sl the slant of the vertex text on vertex number vert.
Page 472
Super String Element
 12d Model Macro Manual
If there is only one Vertex Text Annotation for all the Vertex Text then the slant for that one Vertex 
Text Annotation will be returned in sl regardless of the value of vert. 
Note that the value of sl is measured as tangent here, where in 12da the value is writen in decimal 
angle.
A return value of 0 indicates the function call was successful.
ID = 767
Set_super_vertex_text_style(Element super,Integer vert,Text ts)
Name
Integer Set_super_vertex_text_style(Element super,Integer vert,Text ts)
Description
For the super string super, set the textstyle of the vertex text on vertex number vert to ts.
If there is only one Vertex Text Annotation for all the Vertex Text then the textstyle for that one Vertex 
Text Annotation is set to ts regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 768
Get_super_vertex_text_style(Element super,Integer vert,Text &ts)
Name
Integer Get_super_vertex_text_style(Element super,Integer vert,Text &ts)
Description
For the super string super, return as ts the textstyle of the vertex text on vertex number vert.
If there is only one Vertex Text Annotation for all the Vertex Text then the textstyle for that one Vertex 
Text Annotation will be returned in ts regardless of the value of vert. 
A return value of 0 indicates the function call was successful.
ID = 769
Set_super_vertex_text_ttf_underline(Element super,Integer vert,Integer underline)
 Name
Integer Set_super_vertex_text_ttf_underline(Element super super,Integer vert,Integer underline)   
Description
For the Element super of type Super, set the underline state for the vertex text on vertex number 
vert to be underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
If there is only one Vertex Text Annotation for all the Vertex Text then the underline state for that one 
Vertex Text Annotation is set to underline regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates underline was successfully set.
ID = 2600
Page 473
Super String Element
Chapter 5  12dPL Library Calls
Get_super_vertex_text_ttf_underline(Element super,Integer vert,
         Integer &underline) 
Name
Integer Get_super_vertex_text_ttf_underline(Element super,Integer vert,Integer &underline) 
Description
For the Element super of type Super, get the underline state for the vertex text on vertex number 
vert and return it as underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
If there is only one Vertex Text Annotation for all the Vertex Text then the underline state for that one 
Vertex Text Annotation will be returned in underline regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates underline was successfully returned.
 ID = 2601
Set_super_vertex_text_ttf_strikeout(Element super,Integer vert,Integer strikeout)   
Name
Integer Set_super_vertex_text_ttf_strikeout(Element super,Integer vert,Integer strikeout) 
Description
For the Element super of type Super, set the strikeout state for the vertex text on vertex number 
vert to be strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
If there is only one Vertex Text Annotation for all the Vertex Text then the strikeout state for that one 
Vertex Text Annotation is set to strikeout regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates strikeout was successfully set.
ID = 2602
Get_super_vertex_text_ttf_strikeout(Element super,Integer vert,
         Integer &strikeout) 
Name
Integer Get_super_vertex_text_ttf_strikeout(Element super,Integer vert,Integer &strikeout) 
Description
For the Element super of type Super, get the strikeout state for the vertex text on vertex number 
vert and return it as strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
If there is only one Vertex Text Annotation for all the Vertex Text then the strikeout state for that one 
Vertex Text Annotation will be returned in strikeout regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
Page 474
Super String Element
 12d Model Macro Manual
A function return value of zero indicates strikeout was successfully returned.
 ID = 2603
Set_super_vertex_text_ttf_italic(Element super,Integer vert,Integer italic)   
Name
Integer Set_super_vertex_text_ttf_italic(Element super,Integer vert,Integer italic)   
Description
For the Element super of type Super, set the italic state for the vertex text on vertex number vert to 
be italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
If there is only one Vertex Text Annotation for all the Vertex Text then the italic state for that one 
Vertex Text Annotation is set to italic regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates italic was successfully set.
ID = 2604
Get_super_vertex_text_ttf_italic(Element super,Integer vert,Integer &italic)   
Name
Integer Get_super_vertex_text_ttf_italic(Element super,Integer vert,Integer &italic) 
Description
For the Element super of type Super, get the italic state for the vertex text on vertex number vert 
and return it as italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
If there is only one Vertex Text Annotation for all the Vertex Text then the italic state for that one 
Vertex Text Annotation will be returned in italic regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates italic was successfully returned.
ID = 2605
Set_super_vertex_text_ttf_outline(Element elt,Integer vert,Integer outline) 
Name
Integer Set_super_vertex_text_ttf_outline(Element elt,Integer vert,Integer outline)   
Description
For the Element super of type Super, set the outline state for the vertex text on vertex number vert 
to be outline.
If outline = 1, then for a true type font the text will be only shown in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
If there is only one Vertex Text Annotation for all the Vertex Text then the outline state for that one 
Page 475
Super String Element
Chapter 5  12dPL Library Calls
Vertex Text Annotation is set to outline regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates outline was successfully set.
ID = 2775
Get_super_vertex_text_ttf_outline(Element elt,Integer vert,Integer &outline)   
Name
Integer Get_super_vertex_text_ttf_outline(Element elt,Integer vert,Integer &outline)   
Description
For the Element super of type Super, get the outline state for the vertex text on vertex number vert 
and return it as outline.
If outline = 1, then for a true type font the text will be shown only in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
If there is only one Vertex Text Annotation for all the Vertex Text then the outline state for that one 
Vertex Text Annotation will be returned in outline regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates outline was successfully returned.
ID = 2776
Set_super_vertex_text_ttf_weight(Element super,Integer vert,Integer weight)   
Name
Integer Set_super_vertex_text_ttf_weight(Element super,Integer vert,Integer weight) 
Description
For the Element super of type Super, set the weight for the vertex text on vertex number vert to be 
weight.
For the list of allowable weights, go to  Allowable Weights
If there is only one Vertex Text Annotation for all the Vertex Text then the weight for that one Vertex 
Text Annotation is set to weight regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates weight was successfully set.
ID = 2606
Get_super_vertex_text_ttf_weight(Element super,Integer vert,Integer &weight)   
Name
Integer Get_super_vertex_text_ttf_weight(Element super,Integer vert,Integer &weight)   
Description
For the Element super of type Super, get the weight for the vertex text on vertex number vert and 
return it as weight.
Page 476
Super String Element
 12d Model Macro Manual
For the list of allowable weights, go to  Allowable Weights
If there is only one Vertex Text Annotation for all the Vertex Text then the weight for that one Vertex 
Text Annotation will be returned in weight regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Array or Att_Vertex_Value set.
A function return value of zero indicates weight was successfully returned.
ID = 2607
Set_super_vertex_text_whiteout(Element superstring,Integer vert,Integer c) 
Name
Integer Set_super_vertex_text_whiteout(Element superstring,Integer vert,Integer c) 
Description
For vertex number vert of the Super String Element superstring, set the colour number of the 
colour used for the whiteout box around the vertex text, to be colour.
If no text whiteout is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
If there is only one Vertex Text Annotation for all the Vertex Text then the colour number of the colour 
used for the whiteout box around the vertex text for that one Vertex Text Annotation is set to c 
regardless of the value of vert. 
A function return value of zero indicates the colour number was successfully set.
ID = 2755
Get_super_vertex_text_whiteout(Element superstring,Integer vert,Integer &c) 
Name
Integer Get_super_vertex_text_whiteout(Element superstring,Integer vert,Integer &c) 
Description
For vertex number vert of the Super String Element superstring, get the colour number that is used 
for the whiteout box around the vertex text. The whiteout colour is returned as Integer colour.
NO_COLOUR is the returned as the colour number if whiteout is not being used.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
If there is only one Vertex Text Annotation for all the Vertex Text then the colour number that is used 
for the whiteout box around the vertex text for that one Vertex Text Annotation will be returned in c 
regardless of the value of vert. 
A function return value of zero indicates the colour number was successfully returned.
ID = 2756
Set_super_vertex_text_border(Element superstring,Integer vert,Integer c) 
Name
Integer Set_super_vertex_text_border(Element superstring,Integer vert,Integer c) 
Description
For vertex number vert of the Super String Element superstring, set the colour number of the 
colour used for the border of the whiteout box around the vertex text, to be c.
Page 477
Super String Element
Chapter 5  12dPL Library Calls
If no whiteout border is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
If there is only one Vertex Text Annotation for all the Vertex Text then the colour number of the colour 
used for the border of the whiteout box around the vertex text for that one Vertex Text Annotation is 
set to c regardless of the value of vert. 
A function return value of zero indicates the colour number was successfully set.
ID = 2765
Get_super_vertex_text_border(Element superstring,Integer vert,Integer &c) 
Name
Integer Get_super_vertex_text_border(Element superstring,Integer vert,Integer &c) 
Description
For vertex number vert of the Super String Element superstring, get the colour number that is used 
for the border of the whiteout box around the vertex text. The whiteout border colour is returned as 
Integer c.
NO_COLOUR is the returned as the colour number if there is no whiteout border.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
If there is only one Vertex Text Annotation for all the Vertex Text then the colour number that is used 
for the border of the whiteout box around the vertex text for that one Vertex Text Annotation will be 
returned in c regardless of the value of vert. 
A function return value of zero indicates the colour number was successfully returned.
ID = 2766
Set_super_vertex_text_border_style(Element superstring,Integer vert,Integer s) 
Name
Integer Set_super_vertex_text_border_style(Element superstring,Integer vert,Integer s) 
Description
For vertex number vert of the Super String Element superstring, set the style for the border of the 
whiteout box around the vertex text, according to Integer s.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
If there is only one Vertex Text Annotation for all the Vertex Text then the style for the border of the 
whiteout box around the vertex text for that one Vertex Text Annotation is set to s regardless of the 
value of vert. 
A function return value of zero indicates the colour number was successfully set.
ID = 3586
Page 478
Super String Element
 12d Model Macro Manual
Get_super_vertex_text_border_style(Element superstring,Integer vert,Integer &s) 
Name
Integer Get_super_vertex_text_border_style(Element superstring,Integer vert,Integer &s) 
Description
For vertex number vert of the Super String Element superstring, get the style for the border of the 
whiteout box around the vertex text. The value is returned as Integer s.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
If there is only one Vertex Text Annotation for all the Vertex Text then the style that is used for the 
border of the whiteout box around the vertex text for that one Vertex Text Annotation will be returned 
in s regardless of the value of vert. 
A function return value of zero indicates the colour number was successfully returned.
ID = 3587
Set_super_vertex_textstyle_data(Element super,Integer vert,Textstyle_Data d) 
Name
Integer Set_super_vertex_textstyle_data(Element super,Integer vert,Textstyle_Data d) 
Description
For the Element super of type Super, set the Textstyle_Data for the vertex text on vertex number 
vert to be d.
Setting a Textstyle_Data means that all the individual values that are contained in the 
Textstyle_Data are set rather than having to set each one individually.
If the value is blank in the Textstyle_Data d then the existing value is already set for the vertex text 
will be left alone.
If there is only one Vertex Text Annotation for all the Vertex Text then the Textstyle_Data for that one 
Vertex Text Annotation is set to d regardless of the value of vert. 
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Vertex_Text_Value set.
A function return value of zero indicates the Textstyle_Data was successfully set.
ID = 1663
Get_super_vertex_textstyle_data(Element elt,Integer vert,Textstyle_Data &d) 
Name
Integer Get_super_vertex_textstyle_data(Element elt,Integer vert,Textstyle_Data &d) 
Page 479
Super String Element
Chapter 5  12dPL Library Calls
Description
For the Element super of type Super, get the Textstyle_Data for the vertex text on vertex number 
vert and return it as d.
Note that the function does not concern that the vertex text exists or not.
A non-zero function return value is returned if super is not of type Super.
if super does not have the dimension Att_Vertex_Text_Value set the function returns zero, but d 
remains unchanged.
If there is only one Vertex Text Annotation for all the Vertex Text then the Textstyle_Data for that one 
Vertex Text Annotation will be returned in d regardless of the value of vert. 
A function return value of zero indicates the Textstyle_Data was successfully returned.
ID = 1664
Page 480
Super String Element
 12d Model Macro Manual
5.38.11 Super String Segment Text and Annotation Functions
See 5.38.11.1 Definitions of Super String Segment Text Dimensions, Units and Annotation 
Parameters
See 5.38.11.2 Super String Use Segment Text Functions
See 5.38.11.3 Super String Use Segment Annotation Functions
See 5.38.11.4 Setting Super String Segment Text and Annotation Parameters
Page 481
Super String Element
Chapter 5  12dPL Library Calls
5.38.11.1 Definitions of Super String Segment Text Dimensions, Units and Annotation 
Parameters
Super string Segment text is a special type of text that can only be placed on the segment of a 
super string. Unlike text at a vertex, the segment for segment text has a direction and the segment 
text is required to be parallel, or related to the segment direction.
If super string segment text is required then the dimension to set is either 
(a)
the most common case of having a different text on each segment (dimension 
Att_Segment_Text_Array)
or
(b)
the rare case of just the same text that is used for every segment (dimension 
Att_Segment_Text_Value)
Although segment text may be defined, it will not display in a plan view, or on a plan plot, unless a 
Segment Text Annotation dimension has been set. A Text Annotation controls the text size, colour, 
rotation etc.
So if super string segment text is required to be drawn on a plan view then the dimension to set is 
either 
(a)
for the case of having a different text annotation for each segment so that the annotation 
attributes can be modified for each segment then set dimension Att_Segment_Annotate_Array
or
(b)
if there is just the one Annotation and its parameters are used for drawing the text on every 
segment then set the dimension Att_Segment_Annotate_Value.
For definitions of the Vertex Text dimensions see  Segment Text Dimensions and the Vertex Text Annotation 
dimensions see  Segment Text Annotation Dimensions.
Segment Text Annotation Definitions
For segment text, the text justification point and the direction of the text are defined by:
(a)
the direction of the text is given as a counter clockwise angle of rotation, measured from the 
segment, about the centre of the segment
(b)
the justification point is given as an offset from the centre of the segment along the line through 
the centre of the segment with the direction of the text, and a perpendicular distance (called the 
raise) from that offset point to the justification point.
The direction of the text is parallel to the segment if the angle is zero.
Note that these definitions are relative to the segment and if the vertex segment in any way, then the 
.
super string vertices
angle
offset of offset width
raise or offset height
. .
.
.
the position of the
text justification
point for segment text
angle, offset and raise
from the centre of
is defined by the
the super string segment
centre of the segment
Segment Text
Fred
line giving the direction
of the text
Page 482
Super String Element
 12d Model Macro Manual
text also moves with it.
The vertex and justification point only coincide if the offset and raise values are both zero.
Finally the text can be one of nine positions defined in relation to the (x,y) coordinates of the text 
justification point:
top
3
6
9
left
2
5
8
right
1
4
7
bottom
For numbers with a decimal point, the position of the decimal point gives an addition point on the 
bottom called decimal x and on the side called decimal y. So there are sixteen possible justification 
for numbers.
This is usually an Integer called the justification with a default value of 1. 
Segment Text Annotation Units
The units for text size is specified by an Integer whose value is
(a)
 0 (the default) for the units are screen/pixel/device units
(b)
 1 for world units
(c)
2 for paper units (millimetres on a plot).
Regardless of whether there is one Segment Text Annotation for the entire string or a different Text 
Annotation for each segment, there is only one units for text size used for all the Segment Text of 
the string.
The units for text are used for the size of the text, and the offsets and raises for the text. 
For Information on all the super string segment text and segment text annotations:
See 5.38.11.2 Super String Use Segment Text Functions
See 5.38.11.3 Super String Use Segment Annotation Functions
See 5.38.11.4 Setting Super String Segment Text and Annotation Parameters
Page 483
Super String Element
Chapter 5  12dPL Library Calls
5.38.11.2 Super String Use Segment Text Functions
For definitions of the Segment Text dimensions see  Segment Text Dimensions
Set_super_use_segment_text_value(Element super,Integer use)
Name
Integer Set_super_use_segment_text_value(Element super,Integer use)
Description
Tell the super string super whether to use (set), or not use (remove) the dimension 
Att_Segment_Text_Value. 
A value for use of 1 sets the dimension and 0 removes it.
If Att_Segment_Text_Value is used, then the same text is on all the segments of the super string.
Note if the dimension Att_Segment_Text_Array exists, this call is ignored.
See  Vertex Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1239
Get_super_use_segment_text_value(Element super,Integer &use)
Name
Integer Get_super_use_segment_text_value(Element super,Integer &use)
Description
Query whether the dimension Att_Segment_Text_Value exists for the super string.
use is returned as 1 if the dimension Att_Segment_Text_Value exists. 
use is returned as 0 if the dimension doesn’t exist.
If the dimension Att_Segment_Text_Value exists then the string has the same text for every 
segment of the string.
See  Segment Text Dimensions for information on the Segment Text dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1240
Set_super_use_segment_text_array(Element super,Integer use)
Name
Integer Set_super_use_segment_text_array(Element super,Integer use)
Description
Tell the super string super whether to use (set), or not use (remove), the dimension 
Att_Segment_Text_Array.
A value for use of 1 sets the dimension and 0 removes it.
If Att_Segment_Text_Array is used, then there is different text on each segment of the of the string.
See  Segment Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
Page 484
Super String Element
 12d Model Macro Manual
ID = 1189
Get_super_use_segment_text_array(Element super,Integer &use)
Name
Integer Get_super_use_segment_text_array(Element super,Integer &use)
Description
Query whether the dimension Att_Segment_Text_Array exists for the super string super. 
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
If Att_Segment_Text_Array is used, then there is different text on each segment of the of the string.
See  Segment Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1190
Super_segment_text_value_to_array(Element super)   
Name
Integer Super_segment_text_value_to_array(Element super)   
Description
If for the super string super the dimension Att_Segment_Text_Value exists and the dimension 
Att_Segment_Text_Array does not exist then there will be one Segment Text txt for the entire string.
In this case (when the dimension Att_Segment_Text_Value exists and the dimension 
Att_Segment_Text_Array does not exist) this function sets the Att_Segment_Text_Array dimension 
and new segment text created for each segment of super and the new segment text is given the 
value txt.
See  Segment Text Dimensions for information on the Text dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 2179
Page 485
Super String Element
Chapter 5  12dPL Library Calls
5.38.11.3 Super String Use Segment Annotation Functions
For definitions of the Segment Text dimensions see  Segment Text Annotation Dimensions
Set_super_use_segment_annotation_value(Element super,Integer use)
Name
Integer Set_super_use_segment_annotation_value(Element super,Integer use)
Description
Tell the super string whether to use or remove, the dimension Att_Segment_Annotate_Value.
If the dimension Att_Segment_Annotate_Value exists and the dimension 
Att_Segment_Annotate_Array doesn’t exist then the string has the one annotation which is used for 
segment text on any segment of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
Note if the dimension Att_Segment_Annotate_Array exists, this call is ignored.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1193
Get_super_use_segment_annotation_value(Element super,Integer &use)
Name
Integer Get_super_use_segment_annotation_value(Element super,Integer &use)
Description
Query whether the dimension Att_Segment_Annotate_Value exists for the super string.
If the dimension Att_Segment_Annotate_Value exists and the dimension 
Att_Segment_Annotate_Array doesn’t exist then the string has the one annotation which is used for 
segment text on any segment of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1194
Set_super_use_segment_annotation_array(Element super,Integer use)
Name
Integer Set_super_use_segment_annotation_array(Element super,Integer use)
Description
Tell the super string whether to use or remove the dimension Att_Segment_Annotate_Array. 
If the dimension Att_Segment_Annotate_Array exists then the string has a different annotation for 
the segment text on each segment of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Page 486
Super String Element
 12d Model Macro Manual
Super String Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1195
Get_super_use_segment_annotation_array(Element super,Integer &use)
Name
 Integer Get_super_use_segment_annotation_array(Element super,Integer &use)
Description
Query whether the dimension Att_Segment_Annotate_Array exists for the super string. 
If the dimension Att_Segment_Annotate_Array exists then the string has a different annotation for 
the segment text on each segment of the string.
See  Vertex Text Annotation Dimensions for information on the Text Annotation dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1196
Super_segment_annotate_value_to_array(Element super)   
Name
Integer Super_segment_annotate_value_to_array(Element super)   
Description
If for the super string super the dimension Att_Segment_Annotate_Value exists and the dimension 
Att_Segment_Annotate_Array does not exist then there will be one Segment Text Annotate annot 
for the entire string.
In this case (when the dimension Att_Segment_Annotate_Value exists and the dimension 
Att_Segment_Annotate_Array does not exist) this function sets the Att_Segment_Annotate_Array 
dimension and new segment Annotates created for each segment of super and the new segment 
text Annotate is given the value annot
See  Segment Text Annotation Dimensions for information on the Text dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 2180
Page 487
Super String Element
Chapter 5  12dPL Library Calls
5.38.11.4 Setting Super String Segment Text and Annotation Parameters
Set_super_segment_text(Element super,Integer seg,Text text)
Name
Integer Set_super_segment_text(Element super,Integer seg,Text text)
Description
For the super Element super, set the segment text at segment number seg to be txt.
If there is only one Segment Text for all the segments then the text for that one Segment Text is set 
to txt regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1191
Get_super_segment_text(Element super,Integer seg,Text &text)
Name
Integer Get_super_segment_text(Element super,Integer seg,Text &text)
Description
For the super Element super, return in txt the segment text on segment number seg.
If there is only one Segment Text for all the segments then the text for that one Segment Text will be 
returned in txt regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1192
Set_super_segment_world_text(Element super)
Name
Integer Set_super_segment_world_text(Element super)
Description
For an Element super of type Super, set the text unit for segment text to be world text.
See  Segment Text Annotation Units for the definition of segment text units.
If there is Textstyle_Data for the segment text then this will override the 
Set_super_segment_world_text call.
A return value of 0 indicates the function call was successful.
ID = 1233
Set_super_segment_device_text(Element super)
Name
Integer Set_super_segment_device_text(Element super)
Description
For an Element super of type Super, set the text unit for segment text to be pixels (also known as 
device text or screen text).
Page 488
Super String Element
 12d Model Macro Manual
See  Segment Text Annotation Units for the definition of segment text units.
If there is Textstyle_Data for the segment text then this will override the 
Set_super_segment_device_text call.
A return value of 0 indicates the function call was successful.
ID = 1232
Set_super_segment_paper_text(Element super) 
Name
Integer Set_super_segment_paper_text(Element super) 
Description
For an Element super of type Super, set the text units for segment text to be paper (that is 
millimetres).
See  Segment Text Annotation Units for the definition of segment text units.
If there is Textstyle_Data for the segment text then this will override the 
Set_super_segment_device_text call.
A return value of 0 indicates the function call was successful.
ID = 1634
Set_super_segment_text_type(Element super,Integer type)
Name
Integer Set_super_segment_text_type(Element super,Integer type)
Description
For the super Element super, set the segment text units to the value type. 
See  Segment Text Annotation Units for the definition of segment text units.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1234
Get_super_segment_text_type(Element super,Integer &type)
Name
Integer Get_super_segment_text_type(Element super,Integer &type)
Description
For the super Element super, return in type the value of the segment text units.
See  Segment Text Annotation Units for the definition of vertex text units.
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1235
Set_super_segment_text_justify(Element super,Integer seg,Integer just)
Name
Page 489
Super String Element
Chapter 5  12dPL Library Calls
Integer Set_super_segment_text_justify(Element super,Integer seg,Integer just)
Description
For the super string super, set the justification of the segment text on segment number seg to just.
See  Segment Text Annotation Definitions for the definition of justification.
If there is only one Segment Text Annotation for all the Segment Text then the justification for that 
one Segment Text Annotation is set to just regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1197
Get_super_segment_text_justify(Element super,Integer seg,Integer &just)
Name
Integer Get_super_segment_text_justify(Element super,Integer seg,Integer &just)
Description
For the super string super, return the justification of the segment text on segment number seg in 
just.
See  Segment Text Annotation Definitions for the definition of justification.
If there is only one Segment Text Annotation for all the Segment Text then the justification for that 
one Segment Text Annotation will be returned in just regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1198
Set_super_segment_text_offset_width(Element super,Integer seg,Real off)
Name
Integer Set_super_segment_text_offset_width(Element super,Integer seg,Real o)ff
Description
For the super string super, set the offset (offset width) of the segment text on segment number seg 
to off.
See  Segment Text Annotation Definitions for the definition of offset.
If there is only one Segment Text Annotation for all the Segment Text then the offset for that one 
Segment Text Annotation is set to off regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1199
Get_super_segment_text_offset_width(Element super,Integer seg,Real &off)
Name
Integer Get_super_segment_text_offset_width(Element super,Integer seg,Real &off)
Description
For the super string super, return the offset (offset width) of the segment text on segment number 
Page 490
Super String Element
 12d Model Macro Manual
seg in off.
See  Segment Text Annotation Definitions for the definition of offset.
If there is only one Segment Text Annotation for all the Segment Text then the offset for that one 
Segment Text Annotation will be returned in off regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1200
Set_super_segment_text_offset_height(Element super,Integer seg,Real raise)
Name
Integer Set_super_segment_text_offset_height(Element super,Integer seg,Real raise)
Description
For the super string super, set the raise (offset height) of the segment text on segment number seg 
to raise.
See  Segment Text Annotation Definitions for the definition of raise.
If there is only one Segment Text Annotation for all the Segment Text then the raise for that one 
Segment Text Annotation is set to raise regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1201
Get_super_segment_text_offset_height(Element super,Integer seg,Real &raise)
Name
Integer Get_super_segment_text_offset_height(Element super,Integer seg,Real &raise)
Description
For the super string super, return the raise (offset height) of the segment text on segment number 
seg in raise.
See  Segment Text Annotation Definitions for the definition of raise.
If there is only one Segment Text Annotation for all the Segment Text then the raise for that one 
Segment Text Annotation will be returned in raise regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1202
Set_super_segment_text_colour(Element super,Integer seg,Integer col)
Name
Integer Set_super_segment_text_colour(Element super,Integer seg,Integer col)
Description
For the super string super, set the colour number of the segment text on segment number seg to 
col.
If there is only one Segment Text Annotation for all the Segment Text then the colour number for that 
one Segment Text Annotation is set to col regardless of the value of seg. 
Page 491
Super String Element
Chapter 5  12dPL Library Calls
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1213
Get_super_segment_text_colour(Element super,Integer seg,Integer &col)
Name
Integer Get_super_segment_text_colour(Element super,Integer seg,Integer &col)
Description
For the super string super, return the colour number of the segment text on segment number seg in 
col.
If there is only one Segment Text Annotation for all the Segment Text then the colour number for that 
one Segment Text Annotation will be returned in col regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1214
Set_super_segment_text_angle(Element super,Integer seg,Real ang)
Name
Integer Set_super_segment_text_angle(Element super,Integer seg,Real ang)
Description
For the super string super, set the angle of rotation of the segment text on segment number seg to 
ang. 
See  Segment Text Annotation Definitions for the definition of angle. ang is measured in radians and 
is measured counterclockwise from the direction of the segment.
If there is only one Segment Text Annotation for all the Segment Text then the angle for that one 
Segment Text Annotation is set to angle regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1203
Get_super_segment_text_angle(Element super,Integer seg,Real &ang)
Name
Integer Get_super_segment_text_angle(Element super,Integer seg,Real &ang)
Description
For the super string super, return the angle of rotation of the segment text on segment number seg 
in ang.
See  Segment Text Annotation Definitions for the definition of angle. ang is measured in radians and 
is measured counterclockwise from the direction of the segment.
If there is only one Segment Text Annotation for all the Segment Text then angle for that one 
Segment Text Annotation will be returned in ang regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
Page 492
Super String Element
 12d Model Macro Manual
ID = 1204
Set_super_segment_text_angle2(Element super,Integer seg,Real ang)
Name
Integer Set_super_segment_text_angle2(Element super,Integer seg,Real ang)
Description
For the super string super, set the 3D beta angle of the segment text on segment number seg to 
ang. ang is in radians
If there is only one Segment Text Annotation for all the Segment Text then the angle for that one 
Segment Text Annotation is set to ang regardless of the value of seg. 
A return value of 0 indicates the function call was successful.
ID = 3588
Get_super_segment_text_angle2(Element super,Integer seg,Real &ang)
Name
Integer Get_super_segment_text_angle2(Element super,Integer seg,Real &ang)
Description
For the super string super, return the 3D beta angle of the segment text on segment number seg in 
ang. ang is measured in radians.
If there is only one Segment Text Annotation for all the Segment Text then the angle for that one 
Segment Text Annotation will be returned in ang regardless of the value of seg. 
A return value of 0 indicates the function call was successful.
ID = 3589
Set_super_segment_text_angle3(Element super,Integer seg,Real ang)
Name
Integer Set_super_segment_text_angle3(Element super,Integer seg,Real ang)
Description
For the super string super, set the 3D gamma angle of the segment text on segment number seg to 
ang. ang is in radians
If there is only one Segment Text Annotation for all the Segment Text then the angle for that one 
Segment Text Annotation is set to ang regardless of the value of seg. 
A return value of 0 indicates the function call was successful.
ID = 3590
Get_super_segment_text_angle3(Element super,Integer seg,Real &ang)
Name
Integer Get_super_segment_text_angle3(Element super,Integer seg,Real &ang)
Description
For the super string super, return the 3D gamma angle of the segment text on segment number seg 
in ang. ang is measured in radians.
Page 493
Super String Element
Chapter 5  12dPL Library Calls
If there is only one Segment Text Annotation for all the Segment Text then the angle for that one 
Segment Text Annotation will be returned in ang regardless of the value of seg. 
A return value of 0 indicates the function call was successful.
ID = 3591
Set_super_segment_text_size(Element super,Integer seg,Real sz)
Name
Integer Set_super_segment_text_size(Element super,Integer seg,Real sz)
Description
For the super string super, set the size of the segment text on segment number seg to sz. 
If there is only one Segment Text Annotation for all the Segment Text then the size  for that one 
Segment Text Annotation is set to sz regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1205
Get_super_segment_text_size(Element super,Integer seg,Real &sz)
Name
Integer Get_super_segment_text_size(Element super,Integer seg,Real &sz)
Description
For the super string super, return the size of the segment text on segment number seg in sz.
If there is only one Segment Text Annotation for all the Segment Text then size for that one Segment 
Text Annotation will be returned in sz regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1206
Set_super_segment_text_x_factor(Element super,Integer seg,Real xf)
Name
Integer Set_super_segment_text_x_factor(Element super,Integer seg,Real xf)
Description
For the super string super, set the x factor of the segment text on segment number seg to xf. 
If there is only one Segment Text Annotation for all the Segment Text then the x factor  for that one 
Segment Text Annotation is set to xf regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1207
Get_super_segment_text_x_factor(Element super,Integer seg,Real &xf)
Name
Page 494
Super String Element
 12d Model Macro Manual
Integer Get_super_segment_text_x_factor(Element super,Integer seg,Real &xf)
Description
For the super string super, return the x factor of the segment text on segment number seg in xf.
If there is only one Segment Text Annotation for all the Segment Text then the x factor for that one 
Segment Text Annotation will be returned in xf regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1208
Set_super_segment_text_slant(Element super,Integer seg,Real sl)
Name
Integer Set_super_segment_text_slant(Element super,Integer seg,Real sl)
Description
For the super string super, set the slant of the segment text on segment number seg to sl. 
If there is only one Segment Text Annotation for all the Segment Text then the slant  for that one 
Segment Text Annotation is set to sl regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
Note that the value of sl is measured as tangent here, where in 12da the value is writen in decimal 
angle.
The valid value for sl much be at least -1 and at most 1 (as the angle much be between -45 to 45 
degree).
A return value of 0 indicates the function call was successful.
ID = 1209
Get_super_segment_text_slant(Element super,Integer seg,Real &sl)
Name
Integer Get_super_segment_text_slant(Element super,Integer seg,Real &sl)
Description
For the super string super, return the slant of the segment text on segment number seg in sl.
If there is only one Segment Text Annotation for all the Segment Text then the slant for that one 
Segment Text Annotation will be returned in sl regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
Note that the value of sl is measured as tangent here, where in 12da the value is writen in decimal 
angle.
A return value of 0 indicates the function call was successful.
ID = 1210
Set_super_segment_text_style(Element super,Integer seg,Text ts)
Name
Integer Set_super_segment_text_style(Element super,Integer seg,Text ts)
Description
For the super string super, set the textstyle of the segment text on segment number seg to ts. 
Page 495
Super String Element
Chapter 5  12dPL Library Calls
If there is only one Segment Text Annotation for all the Segment Text then the textstyle for that one 
Segment Text Annotation is set to ts regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1211
Get_super_segment_text_style(Element super,Integer seg,Text &ts)
Name
Integer Get_super_segment_text_style(Element super,Integer seg,Text &ts)
Description
For the super string super, return the textstyle of the segment text on segment number seg in ts.
If there is only one Segment Text Annotation for all the Segment Text then the textstyle for that one 
Segment Text Annotation will be returned in ts regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A return value of 0 indicates the function call was successful.
ID = 1212
Set_super_segment_text_ttf_underline(Element super,Integer seg,
         Integer underline)   
Name
Integer Set_super_segment_text_ttf_underline(Element super,Integer seg,Integer underline) 
Description
For the super string super, set the underline state of the segment text on segment number seg to 
underline. 
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the underline state for 
that one Segment Text Annotation is set to underline regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates underline was successfully set.
ID = 2608
Get_super_segment_text_ttf_underline(Element super,Integer seg,
         Integer &underline) 
Name
Integer Get_super_segment_text_ttf_underline(Element super,Integer seg,Integer &underline)   
Description
For the super string super, return the underline state of the segment text on segment number seg in 
underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
Page 496
Super String Element
 12d Model Macro Manual
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the underline state for 
that one Segment Text Annotation will be returned in underline regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates underline was successfully returned.
ID = 2609
Set_super_segment_text_ttf_strikeout(Element super,Integer seg,Integer strikeout)   
Name
Integer Set_super_segment_text_ttf_strikeout(Element super,Integer seg,Integer strikeout) 
Description
For the super string super, set the strikeout state of the segment text on segment number seg to 
strikeout. 
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the strikeout state for that 
one Segment Text Annotation is set to strikeout regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates strikeout was successfully set.
ID = 2610
Get_super_segment_text_ttf_strikeout(Element super,Integer seg,
         Integer &strikeout)   
Name
Integer Get_super_segment_text_ttf_strikeout(Element super,Integer seg,Integer &strikeout) 
Description
For the super string super, return the strikeout state of the segment text on segment number seg in 
strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the strikeout state for that 
one Segment Text Annotation will be returned in strikeout regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates strikeout was successfully returned.
ID = 2611
Set_super_segment_text_ttf_italic(Element super,Integer seg,Integer italic)   
Name
Integer Set_super_segment_text_ttf_italic(Element super,Integer seg,Integer italic)   
Description
Page 497
Super String Element
Chapter 5  12dPL Library Calls
For the super string super, set the italic state of the segment text on segment number seg to italic. 
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the italic state for that one 
Segment Text Annotation is set to italic regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates italic was successfully set.
ID = 2612
Get_super_segment_text_ttf_italic(Element super,Integer seg,Integer &italic)   
Name
Integer Get_super_segment_text_ttf_italic(Element super,Integer seg,Integer &italic)   
Description
For the super string super, return the italic state of the segment text on segment number seg in 
italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the italic state for that one 
Segment Text Annotation will be returned in italic regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates italic was successfully returned.
ID = 2613
Set_super_segment_text_ttf_outline(Element elt,Integer seg,Integer outline) 
Name
Integer Set_super_segment_text_ttf_outline(Element elt,Integer seg,Integer outline)   
Description
For the super string super, set the outline state of the segment text on segment number seg to 
outline. 
If outline = 1, then for a true type font the text will be only shown in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the outline state for that 
one Segment Text Annotation is set to outline regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates outline was successfully set.
ID = 2777
Get_super_segment_text_ttf_outline(Element elt,Integer seg,Integer &outline)   
Name
Page 498
Super String Element
 12d Model Macro Manual
Integer Get_super_segment_text_ttf_outline(Element elt,Integer seg,Integer &outline)   
Description
For the super string super, return the outline state of the segment text on segment number seg in 
outline.
If outline = 1, then for a true type font the text will be shown only in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the outline state for that 
one Segment Text Annotation will be returned in outline regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates outline was successfully returned.
ID = 2778
Set_super_segment_text_ttf_weight(Element super,Integer seg,Integer weight)   
Name
Integer Set_super_segment_text_ttf_weight(Element super,Integer seg,Integer weight) 
Description
For the super string super, set the weight of the segment text on segment number seg to weight. 
If there is only one Segment Text Annotation for all the Segment Text then the weight for that one 
Segment Text Annotation is set to weight regardless of the value of seg. 
For the list of allowable weights, go to  Allowable Weights
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates weight was successfully set.
ID = 2614
Get_super_segment_text_ttf_weight(Element super,Integer seg,Integer &weight)   
Name
Integer Get_super_segment_text_ttf_weight(Element super,Integer seg,Integer &weight)   
Description
For the super string super, return the weight of the segment text on segment number seg in weight.
For the list of allowable weights, go to  Allowable Weights
If there is only one Segment Text Annotation for all the Segment Text then the weight for that one 
Segment Text Annotation will be returned in weight regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates weight was successfully returned.
ID = 2615
Set_super_segment_text_whiteout(Element superstring,Integer seg,Integer c)
Name
Integer Set_super_segment_text_whiteout(Element superstring,Integer seg,Integer c)
Description
For the super string super, set the colour number of the colour used for the whiteout box around the 
segment text on segment number seg to c. 
Page 499
Super String Element
Chapter 5  12dPL Library Calls
If no text whiteout is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the colour number of the 
colour used for the whiteout box around the segment text for that one Segment Text Annotation is 
set to c regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates the colour number was successfully set.
ID = 2757
Get_super_segment_text_whiteout(Element superstring,Integer seg,Integer &c) 
Name
Integer Get_super_segment_text_whiteout(Element superstring,Integer seg,Integer &c)
Description
For the super string super, return the colour number that is used for the whiteout box around the 
segment text on segment number seg in c.
NO_COLOUR is the returned as the colour number if whiteout is not being used.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the colour number that is 
used for the whiteout box around the segment text for that one Segment Text Annotation will be 
returned in c regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates the colour number was successfully returned.
ID = 2758
Set_super_segment_text_border(Element superstring,Integer seg,Integer c) 
Name
Integer Set_super_segment_text_border(Element superstring,Integer seg,Integer c) 
Description
For the super string super, set the colour number of the colour used for the border of the whiteout 
box around the segment text on segment number seg to c. 
If no text whiteout border is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the colour number of the 
colour used for border of the whiteout box around the segment text for that one Segment Text 
Annotation is set to c regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates the colour number was successfully set.
ID = 2767
Page 500
Super String Element
 12d Model Macro Manual
Get_super_segment_text_border(Element superstring,Integer seg,Integer &c)
Name
Integer Get_super_segment_text_border(Element superstring,Integer seg,Integer &c) 
Description
For the super string super, return the colour number that is used as the border of the whiteout box 
around the segment text on segment number seg in c.
NO_COLOUR is the returned as the colour number if whiteout is not being used.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
If there is only one Segment Text Annotation for all the Segment Text then the colour number that is 
used for the border around the whiteout box around the segment text for that one Segment Text 
Annotation will be returned in c regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates the colour number was successfully returned.
ID = 2768
Set_super_segment_text_border_style(Element superstring,Integer seg,Integer s) 
Name
Integer Set_super_segment_text_border_style(Element superstring,Integer seg,Integer s) 
Description
For segment number seg of the Super String Element superstring, set the style for the border of 
the whiteout box around the segment text, according to Integer s.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
If there is only one Segment Text Annotation for all the Segment Text then the style for the border of 
the whiteout box around the segment text for that one Segment Text Annotation is set to s 
regardless of the value of seg. 
A function return value of zero indicates the colour number was successfully set.
ID = 3592
Get_super_segment_text_border_style(Element superstring,Integer seg,Integer &s) 
Name
Integer Get_super_segment_text_border_style(Element superstring,Integer seg,Integer &s) 
Description
For segment number seg of the Super String Element superstring, get the style for the border of 
Page 501
Super String Element
Chapter 5  12dPL Library Calls
the whiteout box around the segment text. The value is returned as Integer s.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
If there is only one Segment Text Annotation for all the Segment Text then the style that is used for 
the border of the whiteout box around the segment text for that one Segment Text Annotation will be 
returned in s regardless of the value of seg. 
A function return value of zero indicates the colour number was successfully returned.
ID = 3593
Set_super_segment_textstyle_data(Element elt,Integer seg,Textstyle_Data d) 
Name
Integer Set_super_segment_textstyle_data(Element elt,Integer seg,Textstyle_Data d) 
Description
For the super string super, set the Textstyle_Data of the segment text on segment number seg to d. 
Setting a Textstyle_Data means that all the individual values that are contained in the 
Textstyle_Data are set rather than having to set each one individually.
If the value is blank in the Textstyle_Data d then the value for the segment text would be left alone.
If there is only one Segment Text Annotation for all the Segment Text then the Textstyle_Data for 
that one Segment Text Annotation is set to d regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
A function return value of zero indicates the Textstyle_Data was successfully set.
ID = 1665
Get_super_segment_textstyle_data(Element elt,Integer seg,Textstyle_Data &d) 
Name
Integer Get_super_segment_textstyle_data(Element elt,Integer seg,Textstyle_Data &d) 
Description
For the super string super, return the Textstyle_Data for the segment text on segment number seg 
in d.
Using a Textstyle_Data means that all the individual values for the Segment Text Annotation are 
returned in the Textstyle_Data rather than getting each one individually.
Note that the function does not concern that the segment text exists or not.
If there is only one Segment Text Annotation for all the Segment Text then the Textstyle_Data for 
that one Segment Text Annotation will be returned in d regardless of the value of seg. 
A non-zero function return value is returned if super is not of type Super.
Page 502
Super String Element
 12d Model Macro Manual
A function return value of zero indicates the Textstyle_Data was successfully returned.
ID = 1666
Page 503
Super String Element
Chapter 5  12dPL Library Calls
5.38.12 Super String Fills - Hatch/Solid/Bitmap/Pattern/ACAD 
Pattern Functions
For definitions of the Solid, Bitmap, Hatch and Fill dimensions, see  Solid/Bitmap/Hatch/ Fill/Pattern/
ACAD Pattern Dimensions
See 5.38.12.1 Super String Hatch Functions
See 5.38.12.2 Super String Solid Fill Functions
See 5.38.12.3 Super String Bitmap Functions
See 5.38.12.4 Super String Patterns Functions
See 5.38.12.5 Super String ACAD Patterns Functions
Page 504
Super String Element
 12d Model Macro Manual
5.38.12.1 Super String Hatch Functions
Set_super_use_hatch(Element super,Integer use) 
Name
Integer Set_super_use_hatch(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Hatch_Value is used or 
removed. 
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have 2 angle hatching.
If use is 0, the dimension is removed. If the string had hatching then the hatching will be removed.
A return value of 0 indicates the function call was successful.
 ID = 1464
Get_super_use_hatch(Element super,Integer &use) 
Name
Integer Get_super_use_hatch(Element super,Integer &use) 
Description
Query whether the dimension Att_Hatch_Value exists for the super string super.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists and hatching is enabled for the string.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1465
Set_super_hatch_colour(Element super,Integer col_1,Integer col_2) 
Name
Integer Set_super_hatch_colour(Element super,Integer col_1,Integer col_2) 
Description
For the super Element super, set the colour of the first hatch lines to the Integer colour col_1and 
the colour of the second hatch lines to the Integer colour col_2.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1466
 
Get_super_hatch_colour(Element super,Integer &col_1,Integer &col_2)
Name
Integer Get_super_hatch_colour(Element super,Integer &col_1,Integer &col_2) 
Description
For the super Element super, return the colour of the first hatch lines as col_1 and the colour of the 
second hatch lines as col_2.
Page 505
Super String Element
Chapter 5  12dPL Library Calls
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1467
Set_super_hatch_angle(Element super,Real ang_1,Real ang_2)
Name
Integer Set_super_hatch_angle(Element super,Real ang_1,Real ang_2)
Description
For the super Element super, set the angle of the first hatch lines to the angle ang_1 and the angle 
of the second hatch lines to the angle ang_2. The angles are in radians and measured 
counterclockwise from the x-axis.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1468
Get_super_hatch_angle(Element super,Real &ang_1,Real &ang_2) 
Name
Integer Get_super_hatch_angle(Element super,Real &ang_1,Real &ang_2)   
Description
For the super Element super, return the angle of the first hatch lines as ang_1 and the angle of the 
second hatch lines as ang_2. The angles are in radians and measured counterclockwise from the x-
axis.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1469
Set_super_hatch_spacing(Element super,Real dist_1,Real dist_2)   
Name
Integer Set_super_hatch_spacing(Element super,Real dist_1,Real dist_2) 
Description
For the super Element super, set the distance between the first hatch lines to the dist_1 and the 
distance between the second hatch lines of dist_2. The units for dist_1 and dist_2 are given by 
other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1470
Get_super_hatch_spacing(Element super,Real &dist_1,Real &dist_2) 
Name
Integer Get_super_hatch_spacing(Element super,Real &dist_1,Real &dist_2) 
Description
Page 506
Super String Element
 12d Model Macro Manual
For the super Element super, return the distance of the first hatch lines as dist_1 and the distance 
of the second hatch lines as dist_2. The units for dist_1 and dist_2 are given by other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1471
Set_super_hatch_plot_spacing(Element super,Real dist_1,Real dist_2)
Name
Integer Set_super_hatch_plot_spacing(Element super,Real dist_1,Real dist_2) 
Description
For the super Element super, set the plotting distance between the first hatch lines to the dist_1 
and the plotting distance between the second hatch lines of dist_2. The units for dist_1 and dist_2 
are given by other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1544
Get_super_hatch_plot_spacing(Element super,Real &dist_1,Real &dist_2) 
Name
Integer Get_super_hatch_plot_spacing(Element super,Real &dist_1,Real &dist_2) 
Description
For the super Element super, return the plotting distance of the first hatch lines as dist_1 and the 
plotting distance of the second hatch lines as dist_2. The units for dist_1 and dist_2 are given by 
other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1545
Set_super_hatch_origin(Element super,Real x,Real y)   
Name
Integer Set_super_hatch_origin(Element super,Real x,Real y)   
Description
For the super Element super, both sets of hatch lines go through the point (x,y). The units for x and 
y are given by other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1472
Get_super_hatch_origin(Element super,Real &x,Real &y)   
Name
Integer Get_super_hatch_origin(Element super,Real &x,Real &y)   
Page 507
Super String Element
Chapter 5  12dPL Library Calls
Description
For the super Element super, return the origin that both sets of hatch lines go through as (x,y). The 
units for x and y are given by other calls.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1473
Set_super_hatch_device(Element super) 
Name
Integer Set_super_hatch_device(Element super)   
Description
For the super Element super, set the units for the hatch spacing and the hatch origin to be device 
units.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1474
Set_super_hatch_world(Element super) 
Name
Integer Set_super_hatch_world(Element super) 
Description
For the super Element super, set the units for the hatch spacing and the hatch origin to be world 
units.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1475
Set_super_hatch_type(Element super,Integer type)   
Name
Integer Set_super_hatch_type(Element super,Integer type)   
Description
For the super Element super, set the units for the hatch spacing and the hatch origin to be:
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1476
Get_super_hatch_type(Element super,Integer &type) 
Name
Page 508
Super String Element
 12d Model Macro Manual
Integer Get_super_hatch_type(Element super,Integer &type)
Description
For the super Element super, get the units for the hatch spacing and the hatch origin. The units are 
returned as type and the values are:
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1477
Set_super_hatch_view_angle(Element super,Integer is_relative)
Name
Integer Set_super_hatch_view_angle(Element super,Integer is_relative)
Description
For the super Element super, set the field controls whether the Angle is relative to the x axis or to 
the plotting x axis.
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 3444
Get_super_hatch_view_angle(Element super,Integer &is_relative)
Name
Integer Get_super_hatch_view_angle(Element super,Integer &is_relative)
Description
For the super Element super, get the field controls whether the Angle is relative to the x axis or to 
the plotting x axis. The field is returned as is_relative with the meaning:
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If hatching is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 3445
Page 509
Super String Element
Chapter 5  12dPL Library Calls
5.38.12.2 Super String Solid Fill Functions
Set_super_use_solid(Element super,Integer use) 
Name
Integer Set_super_use_solid(Element super,Integer use)   
Description
For the super string Element super, define whether the dimension Att_Solid_Value is used or 
removed.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have solid fill.
If use is 0, the dimension is removed. If the string had solid fill then the solid fill will be removed.
A return value of zero indicates the function call was successful.
ID = 1478
Get_super_use_solid(Element super,Integer &use) 
Name
Integer Get_super_use_solid(Element super,Integer &use) 
Description
Query whether the dimension Att_Solid_Value exists for the super string super. 
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists and solid fill is enabled for the string.
use is returned as 0 if the dimension doesn’t exist.
A return value of zero indicates the function call was successful.
 ID = 1479
Set_super_solid_colour(Element super,Integer colour) 
Name
Integer Set_super_solid_colour(Element super,Integer colour) 
Description
For the super Element super, set the colour of the solid fill to the colour number colour.
If solid fill is not enabled for super, then a non-zero return code is returned.
A return value of zero indicates the function call was successful.
ID = 1480
Get_super_solid_colour(Element super,Integer &colour)   
Name
Integer Get_super_solid_colour(Element super,Integer &colour) 
Description
For the super Element super, get the colour number of the solid fill and return it in colour.
Page 510
Super String Element
 12d Model Macro Manual
If solid fill is not enabled for super, then a non-zero return code is returned.
A return value of zero indicates the function call was successful.
ID = 1481
Set_super_solid_blend(Element super,Real blend)   
Name
Integer Set_super_solid_blend(Element super,Real blend) 
Description
For the super Element super, set the blend of the solid fill to the blend.
If solid fill is not enabled for super, then a non-zero return code is returned.
A return value of zero indicates the function call was successful.
ID = 2165
Get_super_solid_blend(Element super,Real &blend) 
Name
Integer Get_super_solid_blend(Element super,Real &blend)   
Description
For the super Element super, get the blend value of the solid fill and return it in blend.
blend will have a value between 0.0 for showing no colour fill, and 1.0 for showing full colour fill.
If solid fill is not enabled for super, then a non-zero return code is returned.
A return value of zero indicates the function call was successful.
ID = 2166
Page 511
Super String Element
Chapter 5  12dPL Library Calls
5.38.12.3 Super String Bitmap Functions
Set_super_use_bitmap(Element super,Integer use)   
Name
Integer Set_super_use_bitmap(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Bitmap_Value is used or 
removed.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have bitmap fill.
If use is 0, the dimension is removed. If the string had a bitmap fill then the bitmap fill will be 
removed.
A return value of zero indicates the function call was successful.
ID = 1482
Get_super_use_bitmap(Element super,Integer &use) 
Name
Integer Get_super_use_bitmap(Element super,Integer &use) 
Description
Query whether the dimension Att_Bitmap_Value exists for the super string super.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists and bitmap fill is enabled for the string.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
 ID = 1483
Set_super_bitmap(Element super,Text filename) 
Name
Integer Set_super_bitmap(Element super,Text filename)   
Description
For the super Element super, set the bitmap to be the image in the file of name filename.
The image can be bmps or ?.
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1484
Get_super_bitmap(Element super,Text &filename) 
Name
Integer Get_super_bitmap(Element super,Text &filename)   
Description
Page 512
Super String Element
 12d Model Macro Manual
For the super Element super, get the file name of the bitmap fill and return it in filename.
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1485
Set_super_bitmap_origin(Element super,Real x,Real y) 
Name
Integer Set_super_bitmap_origin(Element super,Real x,Real y)   
Description
For the super Element super, the left hand corner of the bitmap is placed at the point (x,y). The 
units for x and y are given in other functions.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1486
Get_super_bitmap_origin(Element super,Real &x,Real &y) 
Name
Integer Get_super_bitmap_origin(Element super,Real &x,Real &y) 
Description
For the super Element super, return the (x,y) point of the left hand corner of the bitmap. The units 
for x and y are given in other functions.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1487
Set_super_bitmap_transparent(Element super,Integer colour) 
Name
Integer Set_super_bitmap_transparent(Element super,Integer colour) 
Description
For the super Element super, set the colour with colour number colour to be transparent in the 
bitmap.
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1488
Get_super_bitmap_transparent(Element super,Integer &colour)   
Name
Integer Get_super_bitmap_transparent(Element super,Integer &colour) 
Description
For the super Element super, get the transparency colour and return it in colour.
Page 513
Super String Element
Chapter 5  12dPL Library Calls
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1489
Set_super_bitmap_device(Element super) 
Name
Integer Set_super_bitmap_device(Element super)   
Description
For the super Element super, set the units for the bitmap width and height to be device units.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 1490
Set_super_bitmap_world(Element super) 
Name
Integer Set_super_bitmap_world(Element super)   
Description
For the super Element super, set the units for the width and height of the bitmap to be world units.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1491
Set_super_bitmap_type(Element super,Integer type)   
Name
Integer Set_super_bitmap_type(Element super,Integer type)   
Description
For the super Element super, set the units for the width and height of the bitmap to be:
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1492
Get_super_bitmap_type(Element super,Integer &type)   
Name
Integer Get_super_bitmap_type(Element super,Integer &type) 
Description
For the super Element super, get the units for width and height of the bitmap. The units are returned 
as type and the values are:
Page 514
Super String Element
 12d Model Macro Manual
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1493
Set_super_bitmap_angle(Element super,Real ang)   
Name
Integer Set_super_bitmap_angle(Element super,Real ang)   
Description
For the super Element super, set the angle to rotate the bitmap to be ang. The angle is in radians 
and measured counterclockwise from the x-axis
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1494
Get_super_bitmap_angle(Element super,Real &ang)   
Name
Integer Get_super_bitmap_angle(Element super,Real &ang) 
Description
For the super Element super, get the angle of rotation of bitmap and return it in ang. The angle is in 
radians and measured counterclockwise from the x-axis
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1495
Set_super_bitmap_size(Element super,Real w,Real h) 
Name
Integer Set_super_bitmap_size(Element super,Real w,Real h) 
Description
For the super Element super, scale the bitmap to have the width w and height h in the units set in 
other bitmap calls.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1496
Get_super_bitmap_size(Element super,Real &w,Real &h) 
Name
Integer Get_super_bitmap_size(Element super,Real &w,Real &h) 
Description
Page 515
Super String Element
Chapter 5  12dPL Library Calls
For the super Element super, get the width and height that the bitmap was scaled to. The width is 
returned in w and the height in h. The units have been set in other bitmap calls.
If bitmap is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 1497
Set_super_bitmap_space(Element super,Real x,Real y) 
Name
Integer Set_super_bitmap_space(Element super,Real x,Real y)
Description
For the super Element super, set the spacing between adjacent bitmap patterns to be x in the x-
direction and y in the y-direction. The units for x and y are given in other bitmap calls. 
If bitmap pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1744
Get_super_bitmap_space(Element super,Real &x,Real &y) 
Name
Integer Get_super_bitmap_space(Element super,Real &x,Real &y) 
Description
For the super Element super, return the spacing between adjacent bitmap patterns as x in the x-
direction and y in the y-direction. The units for x and y are given in other bitmap calls. 
If bitmap pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1745
Set_super_bitmap_stagger(Element super,Real stagger)
Name
Integer Set_super_bitmap_stagger(Element super,Real stagger) 
Description
For the super Element super, set the stagger between alternate bitmap pattern rows to be stagger. 
The unit for stagger is given in other bitmap calls. 
If bitmap pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1746
Get_super_bitmap_stagger(Element super,Real &stagger) 
Name
Integer Get_super_bitmap_stagger(Element super,Real &stagger) 
Description
Page 516
Super String Element
 12d Model Macro Manual
For the super Element super, return the stagger between alternate bitmap pattern rows as stagger. 
The unit for stagger is given in other bitmap calls. 
If bitmap pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1747
Set_super_bitmap_paper(Element super) 
Name
Integer Set_super_bitmap_paper(Element super) 
Description
For the super Element super, set the units for the width, height, spacing and stagger of the bitmap 
pattern to be paper unit. 
If bitmap pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1748
Set_super_bitmap_view_angle(Element super,Integer is_relative)
Name
Integer Set_super_bitmap_view_angle(Element super,Integer is_relative)
Description
For the super Element super, set the field controls whether the Angle is relative to the x axis or to 
the plotting x axis.
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 3458
Get_super_bitmap_view_angle(Element super,Integer &is_relative)
Name
Integer Get_super_bitmap_view_angle(Element super,Integer &is_relative)
Description
For the super Element super, get the field controls whether the Angle is relative to the x axis or to 
the plotting x axis. The field is returned as is_relative with the meaning:
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If bitmap fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 3459
Page 517
Super String Element
Chapter 5  12dPL Library Calls
5.38.12.4 Super String Patterns Functions
For definitions of the Pattern dimension, see  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern 
Dimensions
Set_super_use_pattern(Element super,Integer use) 
Name
Integer Set_super_use_pattern(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Pattern_Value is used or 
removed.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have a pattern.
If use is 0, the dimension is removed. If the string had a pattern then the pattern will be removed.
A return value of 0 indicates the function call was successful.
ID = 1686
Get_super_use_pattern(Element super,Integer &use)
Name
Integer Get_super_use_pattern(Element super,Integer &use)
Description
Query whether the dimension Att_Pattern_Value exists for the super string super. 
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1693
Set_super_pattern(Element super,Text name)
Name
Integer Set_super_pattern(Element super,Text name) 
Description
For the super Element super, set the fill pattern name to be the Text name.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1687
Get_super_pattern(Element super,Text &name) 
Name
Integer Get_super_pattern(Element super,Text &name) 
Page 518
Super String Element
 12d Model Macro Manual
Description
For the super Element super, get the fill pattern name and return it in name.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1694
Set_super_pattern_colour(Element super,Integer colour) 
Name
Integer Set_super_pattern_colour(Element super,Integer colour) 
Description
For the super Element super, set the colour of the fill pattern to the colour number colour.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1688
Get_super_pattern_colour(Element super,Integer &colour)
Name
Integer Get_super_pattern_colour(Element super,Integer &colour) 
Description
For the super Element super, get the colour number of the fill pattern and return it in colour.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1695
Set_super_pattern_angle(Element super,Real angle) 
Name
Integer Set_super_pattern_angle(Element super,Real angle) 
Description
For the super Element super, set the angle of the fill pattern to the angle. The angle is in radian and 
measured counterclockwise from the x-axis. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1689
Get_super_pattern_angle(Element super,Real &angle) 
Name
Integer Get_super_pattern_angle(Element super,Real &angle) 
Description
For the super Element super, return the angle of the fill pattern as angle. The angle is in radian and 
measured counterclockwise from the x-axis. 
Page 519
Super String Element
Chapter 5  12dPL Library Calls
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1696
Set_super_pattern_size(Element super,Real size)
Name
Integer Set_super_pattern_size(Element super,Real size) 
Description
For the super Element super, set the size of the fill pattern to the Real size. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1690
Get_super_pattern_size(Element super,Real &size) 
Name
Integer Get_super_pattern_size(Element super,Real &size) 
Description
For the super Element super, return the size of the fill pattern as size. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1697
Set_super_pattern_plot_size(Element super,Real size) 
Name
Integer Set_super_pattern_plot_size(Element super,Real size) 
Description
For the super Element super, set the plotting size of the fill pattern to the Real size. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1691
Get_super_pattern_plot_size(Element super,Real &s) 
Name
Integer Get_super_pattern_plot_size(Element super,Real &s) 
Description
For the super Element super, return the plotting size of the fill pattern as size. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1698
Page 520
Super String Element
 12d Model Macro Manual
Set_super_pattern_origin(Element super,Real x,Real y) 
Name
Integer Set_super_pattern_origin(Element super,Real x,Real y) 
Description
For the super Element super, set the x-y coordinate of the origin the fill pattern to x, y. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1692
Get_super_pattern_origin(Element super,Real &x,Real &y)
Name
Integer Get_super_pattern_origin(Element super,Real &x,Real &y) 
Description
For the super Element super, return the x-y coordinate of the origin the fill pattern as x, y. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 1699
Set_super_pattern_type(Element super,Integer type)   
Name
Integer Set_super_pattern_type(Element super,Integer type)   
Description
For the super Element super, set the units for the pattern fill size, spacing and stagger to be:
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If pattern fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 3446
Get_super_pattern_type(Element super,Integer &type) 
Name
Integer Get_super_pattern_type(Element super,Integer &type)
Description
For the super Element super, get the units for the pattern fill size, spacing and stagger. The units 
are returned as type and the values are:
    if type =  0 then device units
    if type =  1 then world units
    if type =  2 then paper units
If pattern fill is not enabled for super, then a non-zero return code is returned.
Page 521
Super String Element
Chapter 5  12dPL Library Calls
A return value of 0 indicates the function call was successful.
 ID = 3447
Set_super_pattern_view_angle(Element super,Integer is_relative)
Name
Integer Set_super_pattern_view_angle(Element super,Integer is_relative)
Description
For the super Element super, set the field controls whether the Angle is relative to the x axis or to 
the plotting x axis.
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If pattern fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 3448
Get_super_pattern_view_angle(Element super,Integer &is_relative)
Name
Integer Get_super_pattern_view_angle(Element super,Integer &is_relative)
Description
For the super Element super, get the field controls whether the Angle is relative to the x axis or to 
the plotting x axis. The field is returned as is_relative with the meaning:
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If pattern fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 3449
Set_super_pattern_stagger(Element super,Real stagger) 
Name
Integer Set_super_pattern_stagger(Element super,Real stagger) 
Description
For the super Element super, set the stagger between alternate pattern fill rows to be stagger. The 
unit for stagger is given in other pattern fill calls. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3450
Get_super_pattern_stagger(Element super,Real &stagger) 
Name
Integer Get_super_pattern_stagger(Element super,Real &stagger) 
Page 522
Super String Element
 12d Model Macro Manual
Description
For the super Element super, return the stagger between alternate bitmap pattern rows as stagger. 
The unit for stagger is given in other pattern fill calls.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3451
Set_super_pattern_space(Element super,Real xspace,Real yspace) 
Name
Integer Set_super_pattern_space(Element super,Real xspace,Real yspace) 
Description
For the super Element super, set the x-y spaces of the fill pattern to xspace, yspace. The unit for 
the spaces is given in other pattern fill calls.
If pattern fill is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3452
Get_super_pattern_space(Element super,Real &xspace,Real &yspace)
Name
Integer Get_super_pattern_space(Element super,Real &xspace,Real &yspace) 
Description
For the super Element super, return the x-y spaces of the fill pattern as xspace, yspace. The unit 
for the spaces is given in other pattern fill calls.
If pattern fill is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3453
Set_super_pattern_solid_colour(Element super,Integer colour) 
Name
Integer Set_super_pattern_solid_colour(Element super,Integer colour) 
Description
For the super Element super, set the solid colour of the fill pattern to the colour number colour.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3454
Get_super_pattern_solid_colour(Element super,Integer &colour)
Name
Integer Get_super_pattern_solid_colour(Element super,Integer &colour) 
Description
Page 523
Super String Element
Chapter 5  12dPL Library Calls
For the super Element super, get the solid colour number of the fill pattern and return it in colour.
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3455
Set_super_pattern_blend(Element super,Real blend)
Name
Integer Set_super_pattern_blend(Element super,Real blend) 
Description
For the super Element super, set the solid fill blend factor of the fill pattern to the blend. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3456
Get_super_pattern_blend(Element super,Real &blend) 
Name
Integer Get_super_pattern_blend(Element super,Real &blend)
Description
For the super Element super, return the solid fill blend of the fill pattern as blend. 
If fill pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 3457
Page 524
Super String Element
 12d Model Macro Manual
5.38.12.5 Super String ACAD Patterns Functions
For definitions of the ACAD Pattern dimension, see  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern 
Dimensions
Set_super_use_acad_pattern(Element super,Integer use)   
Name
Integer Set_super_use_acad_pattern(Element super,Integer use)   
Description
For the super string Element super, define whether the dimension Att_Autocad_Pattern_Value is 
used or removed. 
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have an Autocad pattern.
If use is 0, the dimension is removed. If the string had an Autocad pattern then the Autocad pattern 
will be removed.
A return value of 0 indicates the function call was successful.
ID = 2141
Get_super_use_acad_pattern(Element super,Integer &use)   
Name
Integer Get_super_use_acad_pattern(Element super,Integer &use)   
Description
Query whether the dimension Att_Autocad_Pattern_Value exists for the super string super.
See  Solid/Bitmap/Hatch/ Fill/Pattern/ACAD Pattern Dimensions for information on this dimension or 
5.38.1 Super String Dimensionsfor information on all dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 2142
Set_super_acad_pattern(Element super,Text name)
Name
Integer Set_super_acad_pattern(Element super,Text name)
Description
For the super Element super, set the Autocad pattern name to be the Text name.
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2143
Get_super_acad_pattern(Element super,Text &name)
Name
Integer Get_super_acad_pattern(Element super,Text &name)
Page 525
Super String Element
Chapter 5  12dPL Library Calls
Description
For the super Element super, get the Autocad pattern name and return it in name.
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2144
Set_super_acad_pattern_colour(Element super,Integer colour)
Name
Integer Set_super_acad_pattern_colour(Element super,Integer colour) 
Description
For the super Element super, set the colour of the Autocad pattern to the colour number colour.
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2145
Get_super_acad_pattern_colour(Element super,Integer &colour)
Name
Integer Get_super_acad_pattern_colour(Element super,Integer &colour) 
Description
For the super Element super, get the colour number of the Autocad pattern and return it in colour.
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2146
Set_super_acad_pattern_angle(Element super,Real angle)
Name
Integer Set_super_acad_pattern_angle(Element super,Real angle)
Description
For the super Element super, set the angle of the Autocad pattern to the Real angle. The angle is in 
radian and measured counterclockwise from the x-axis. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2147
Get_super_acad_pattern_angle(Element super,Real &angle)
Name
Integer Get_super_acad_pattern_angle(Element super,Real &angle) 
Description
For the super Element super, return the angle of the Autocad pattern as angle. The angle is in 
radian and measured counterclockwise from the x-axis. 
Page 526
Super String Element
 12d Model Macro Manual
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2148
Set_super_acad_pattern_size(Element super,Real size)
Name
Integer Set_super_acad_pattern_size(Element super,Real size) 
Description
For the super Element super, set the size of the Autocad pattern to the Real size. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2149
Get_super_acad_pattern_size(Element super,Real &size)
Name
Integer Get_super_acad_pattern_size(Element super,Real &size) 
Description
For the super Element super, return the size of the Autocad pattern as size. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2150
Set_super_acad_pattern_device(Element super)
Name
Integer Set_super_acad_pattern_device(Element super)
Description
For the super Element super, set the unit for the Autocad pattern to be device unit. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2151
Set_super_acad_pattern_world(Element super)
Name
Integer Set_super_acad_pattern_world(Element super)
Description
For the super Element super, set the unit for the Autocad pattern to be world unit. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2152
Page 527
Super String Element
Chapter 5  12dPL Library Calls
Set_super_acad_pattern_paper(Element super) 
Name
Integer Set_super_acad_pattern_paper(Element super) 
Description
For the super Element super, set the unit for the Autocad pattern to be paper unit. 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2153
Set_super_acad_pattern_type(Element super,Integer type)   
Name
Integer Set_super_acad_pattern_type(Element super,Integer type)   
Description
For the super Element super, set the unit for the Autocad pattern to be: 
if type = 0 then device unit 
if type = 1 then world unit 
if type = 2 then paper unit 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2154
Get_super_acad_pattern_type(Element super,Integer &type)   
Name
Integer Get_super_acad_pattern_type(Element super,Integer &type)   
Description
For the super Element super, get the unit for the Autocad pattern. The unit is returned as super and 
the value is: 
if type = 0 then device unit 
if type = 1 then world unit 
if type = 2 then paper unit 
If Autocad pattern is not enabled for super, then a non-zero return code is returned. 
A return value of zero indicates the function call was successful. 
ID = 2155
Set_super_acad_pattern_view_angle(Element super,Integer is_relative)
Name
Integer Set_super_acad_pattern_view_angle(Element super,Integer is_relative)
Description
Page 528
Super String Element
 12d Model Macro Manual
For the super Element super, set the field controls whether the Angle is relative to the x axis or to 
the plotting x axis.
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If acad pattern fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
ID = 3460
Get_super_acad_pattern_view_angle(Element super,Integer &is_relative)
Name
Integer Get_super_acad_pattern_view_angle(Element super,Integer &is_relative)
Description
For the super Element super, get the field controls whether the Angle is relative to the x axis or to 
the plotting x axis. The field is returned as is_relative with the meaning:
if is_relative is 1 and we are plotting, Angle is measured relative to the x axis of the plot rotation.
If is_relative is 0, Angle is always absolute to the world x axis.
If acad pattern fill is not enabled for super, then a non-zero return code is returned.
A return value of 0 indicates the function call was successful.
 ID = 3461
Page 529
Super String Element
Chapter 5  12dPL Library Calls
5.38.13 Super String Hole Functions
For definitions of the Hole dimension, see  Hole Dimension
Set_super_use_hole(Element super,Integer use) 
Name
Integer Set_super_use_hole(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Hole_Value is used or 
removed.
See  Hole Dimension for information on the hole dimension or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
If use is 1, the dimension is set. That is, the super string can have holes.
If use is 0, the dimension is removed. If the string had holes then the holes will be removed.
A return value of 0 indicates the function call was successful.
ID = 1456
Get_super_use_hole(Element super,Integer &use) 
Name
Integer Get_super_use_hole(Element super,Integer &use) 
Description
Query whether the dimension Att_Hole_Value exists for the super string super.
See  Hole Dimension for information on hole dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
 ID = 1457
Super_add_hole(Element super,Element hole) 
Name
Integer Super_add_hole (Element super,Element hole) 
Description
Add the Element hole as a hole to the super Element super.
The operation will fail if super already belongs to a model and a non-zero return value returned. So 
if an existing string in a model is to be used as a hole, the string must be copied and the copy used 
as the hole.
A return value of zero indicates the function call was successful.
ID = 1460
Get_super_holes(Element super,Integer &numberless) 
Name
Page 530
Super String Element
 12d Model Macro Manual
Integer Get_super_holes(Element super,Integer &numberless) 
Description
For the Element super of type Super, the number of holes for the super string is returned as 
no_holes.
If holes are not enabled for the super string then a non-zero return code is returned and no_holes is 
set to 0.
A return value of 0 indicates the function call was successful.
ID = 1458
Super_get_hole(Element super,Integer hole_no,Element &hole) 
Name
Integer Super_get_hole(Element super,Integer hole_no,Element &hole) 
Description
For the Element super of type Super, the holes number hole_no is returned as the super Element 
hole.
If hole needs to be used in 12d Model and added to a model, then the Element hole must be 
copied and added to the model.
If hole_no is less than zero or greater than the number of holes in super, then a non-zero return 
code is returned. The Element hole is then undefined.
A return value of 0 indicates the function call was successful.
ID = 1459
Super_delete_hole(Element super,Element hole) 
Name
Integer Super_delete_hole(Element super,Element hole) 
Description
If Super_get_hole is used to get the hole hole from the Element super then this option can be used 
to delete hole from super.
A return value of zero indicates the function call was successful.
ID = 1461
Super_delete_hole(Element super,Integer hole_no) 
Name
Integer Super_delete_hole(Element super,Integer hole_no)
Description
Delete the hole number hole_no from the Element super.
 If there is no hole hole_no, the operation will fail and a non-zero return value is returned.
A return value of zero indicates the function call was successful.
 ID = 1462
Super_delete_all_holes(Element super) 
Page 531
Super String Element
Chapter 5  12dPL Library Calls
Name
Integer Super_delete_all_holes(Element super) 
Description
Delete all the holes from the Element super.
A return value of 0 indicates the function call was successful.
ID = 1463
Page 532
Super String Element
 12d Model Macro Manual
5.38.14 Super String Segment Colour Functions
For definitions of the Colour dimension, see  Colour Dimension
Set_super_use_segment_colour(Element super,Integer use)
Name
Integer Set_super_use_segment_colour(Element super,Integer use)
Description
Tell the super string whether to use or remove the colour dimension Att_Colour_Array. 
A value for use of 1 sets the dimension and 0 removes it.
See  Colour Dimension for information on Colour dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
A return value of 0 indicates the function call was successful.
ID = 726
Get_super_use_segment_colour(Element super,Integer &use)
Name
Integer Get_super_use_segment_colour(Element super,Integer &use)
Description
Query whether the colour dimension Att_Colour_Array exists for the super string. 
use is returned as 1 if the dimension Att_Colour_Array exists, or 0 if the dimension doesn’t exist.
See  Colour Dimension for information on Colour dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
A return value of 0 indicates the function call was successful.
ID = 727
Set_super_segment_colour(Element super,Integer seg,Integer colour)
Name
Integer Set_super_segment_colour(Element super,Integer seg,Integer colour)
Description
For the Element super of type Super, set the colour number for the segment number seg to be 
colour.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the colour dimension Att_Colour_Array set.
See  Colour Dimension for information on Colour dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
A function return value of zero indicates colour was successfully set.
ID = 728
Get_super_segment_colour(Element super,Integer seg,Integer &colour)
Name
Integer Get_super_segment_colour(Element super,Integer seg,Integer &colour)
Page 533
Super String Element
Chapter 5  12dPL Library Calls
Description
For the Element super of type Super, get the colour number for the segment number seg and 
return it as colour.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the colour dimension Att_Colour_Array set.
See  Colour Dimension for information on Colour dimensions or 5.38.1 Super String Dimensionsfor 
information on all dimensions.
A function return value of zero indicates colour was successfully returned.
ID = 729
Page 534
Super String Element
 12d Model Macro Manual
5.38.15 Super String Segment Geometry Functions
For definitions of the Segment Geometry dimension, see  Segment Geometry Dimension
To allow transitions to be used between vertices of a super string, the use of a Segment between 
vertices was introduced for super strings (see 5.25 Segments).
Set_super_use_segment_geometry(Element super,Integer use) 
Name
Integer Set_super_use_segment_geometry(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Geom_Array is used or 
removed.
If Att_Geom_Array exists, the string can have Segments (which can be straights, arcs or 
transitions) between the vertices of the super string.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
If use is 1, the dimension is set. That is, the segments of the super string are not just straights but of 
type Segments (which can be straights, arcs or transitions).
If use is 0, the dimension is removed. If the string had Segments for segments then they will be 
removed.
A return value of 0 indicates the function call was successful.
ID = 1838
Get_super_use_segment_geometry(Element super,Integer &use) 
Name
Integer Get_super_use_segment_geometry(Element super,Integer &use) 
Description
Query whether the dimension Att_Geom_Array exists for the super string super.
If Att_Geom_Array exists, the string can have Segments (which can be straights, arcs or 
transitions) between the vertices of the super string.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
     use is returned as 1 if the dimension exists. That is, the segments of the super string are not just 
straights but of type Segments (which can be straights, arcs or transitions).
     use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1839
Set_super_segment_spiral(Element elt,Integer seg,Spiral trans) 
Name
Integer Set_super_segment_spiral(Element elt,Integer seg,Spiral trans) 
Description
For the Element super of type Super, set the segment number seg to be the transition trans.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
Page 535
Super String Element
Chapter 5  12dPL Library Calls
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the transition was successfully set.
ID = 1840
Get_super_segment_spiral(Element elt,Integer seg,Spiral &trans) 
Name
Integer Get_super_segment_spiral(Element elt,Integer seg,Spiral &trans)
Description
For the Element super of type Super, get the Spiral for the segment number seg and return it as 
trans.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set, or if the segment is not a Spiral.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the Spiral was successfully returned.
ID = 1841
Set_super_segment_spiral(Element elt,Integer seg,Real l1,Real r1,Real a1,Real 
l2,Real r2,Real a2,Integer leading,Integer type) 
Name
Integer Set_super_segment_spiral(Element elt,Integer seg,Real l1,Real r1,Real a1,Real l2,Real r2,Real 
a2,Integer leading,Integer type) 
Description
For the Element super of type Super, set the segment number seg to be the transition of given 
input components.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the transition was successfully set.
ID = 1842
Get_super_segment_spiral(Element elt,Integer seg,Real &l1,Real &r1,Real &a1,Real 
&l2,Real &r2,Real &a2,Integer &leading,Integer &type) 
Name
Integer Get_super_segment_spiral(Element elt,Integer seg,Real &l1,Real &r1,Real &a1,Real &l2,Real 
&r2,Real &a2,Integer &leading,Integer &type)
Description
For the Element super of type Super, get the Spiral for the segment number seg and return its 
components.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
Page 536
Super String Element
 12d Model Macro Manual
the dimension Att_Geom_Array set, or if the segment is not a Spiral.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the Spiral was successfully returned.
ID = 1843
Set_super_segment_geometry(Element elt,Integer seg,Segment geom)
Name
Integer Set_super_segment_geometry(Element elt,Integer seg,Segment geom) 
Description
For the Element super of type Super, set the segment number seg to be the Segment geom.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the segment was successfully set.
 ID = 1844
Get_super_segment_geometry(Element elt,Integer seg,Segment &geom) 
Name
Integer Get_super_segment_geometry(Element elt,Integer seg,Segment &geom) 
Description
For the Element super of type Super, get the Segment for the segment number seg and return it as 
geom.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the Spiral was successfully returned.
ID = 1845
Set_super_segment_geometry(Element elt,Integer seg)
Name
Integer Set_super_segment_geometry(Element elt,Integer seg) 
Description
Clears segment number seg back to line.
A function return value of zero indicates the segment was successfully set.
 ID = 1846
Set_super_segment_curve(Element,Integer seg,Curve curve)
Name
Page 537
Super String Element
Chapter 5  12dPL Library Calls
Integer Set_super_segment_curve(Element super,Integer seg,Curve curve)
Description
For the super string super, set the geometry of segment number seg to the Curve curve.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A return value of zero indicates the function call was successful.
ID = 3820
Get_super_segment_curve(Element,Integer seg,Curve &curve)
Name
Integer Get_super_segment_curve(Element,Integer seg,Curve &curve)
Description
For the super string super, get the Curve curve of segment number seg.
A non-zero function return value is returned if super is not of type Super, or if super does not have 
the dimension Att_Geom_Array set.
See  Segment Geometry Dimension for information on the Segment Geometry dimensions or 5.38.1 
Super String Dimensions for information on all the dimensions.
A return value of zero indicates the function call was successful.
ID = 3819
Page 538
Super String Element
 12d Model Macro Manual
5.38.16 Super String Extrude Functions
For definitions of the Extrude dimensions, see  Extrude Dimensions
Extruded an Element shape along a string means to take the (x,y) profile of shape and sweeping the 
(x,y) profile perpendicularly along the string.
A super string can have a list of Elements that are all to be extruded along the string. The Elements 
in the list are extruded in the order that they are in the list.
Note: the extrudes can be added as an Element where the (x,y) or the extrudes can come from the 
extrudes.4d file. The ones from the extrudes.4d can be more complex than just a simple profile 
swept along the string and include interval extrudes.
Set_super_use_extrude(Element super,Integer use) 
Name
Integer Set_super_use_extrude(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Extrude_Value is used or 
removed.
If Att_Extrude_Value is set then an extrusion is allowed on the super string.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and an extrusion is allowed.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 1679
Get_super_use_extrude(Element super,Integer &use) 
Name
Integer Get_super_use_extrude(Element super,Integer &use) 
Description
Query whether the dimension Att_Extrude_Value exists for the super string super. 
If Att_Extrude_Value is set then an extrusion is allowed on the super string.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1680
Super_append_string_extrude(Element super,Element shape)   
Name
Integer Super_append_string_extrude(Element super,Element shape)   
Description
Page 539
Super String Element
Chapter 5  12dPL Library Calls
For the Element super of type Super which has the dimension Att_Extrude_Value set, add the 
Element shape to the list of Elements that are extruded along super. Note: shape must also be of 
type Super.
A non-zero function return value is returned if super or shape is not of type Super, or if the 
Dimension Att_Extrude_Value is not set. 
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the shape was successfully added to the list.
ID = 2643
Super_append_extrude(Element super,Text extrude_name)   
Name
Integer Super_append_extrude(Element super,Text extrude_name) 
Description
For the Element super of type Super, get the shape called extrude_name from the file extrudes.4d 
and append it to the list of extrudes for super.
Note: the extrudes in the extrudes.4d file can be more complex than just a simple profile swept 
along the string. It also included interval extrudes.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Extrude_Value is not set, or if there is no extrude_name in extrudes.4d.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1923
Super_append_string_extrude(Element string,Element shape,Integer 
use_string_colour,Integer shape_mirror,Real start_chainage,Real final_chainage)   
Name
Integer Super_append_string_extrude(Element string,Element shape,Integer use_string_colour,Integer 
shape_mirror,Real start_chainage,Real final_chainage) 
Description
what is shape_mirror 0/1
use_string_colour 1 use the shape string colour, 0 use string colour colour
<no description>
ID = 2644
Get_super_extrudes(Element super,Integer &num_extrudes) 
Name
Integer Get_super_extrudes(Element super,Integer &num_extrudes)   
Description
For the Element super of type Super and has the dimension Att_Extrude_Value set, get the number 
of Element that are in the list of extrudes for super and return it in num_extrudes.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Page 540
Super String Element
 12d Model Macro Manual
Att_Extrude_Value is not set.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1921
Super_insert_extrude(Element super,Text extrude_name,Integer where)   
Name
Integer Super_insert_extrude(Element super,Text extrude_name,Integer where) 
Description
For the Element super of type Super, get the shape called extrude_name from the file extrudes.4d 
and insert into the list of extrudes at position number where. The existing extrudes from position 
number where upwards are all moved up one position in the list.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Extrude_Value is not set, or if there is no extrude_name in extrudes.4d.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1922
Super_delete_extrude(Element super,Integer extrude_num)   
Name
Integer Super_delete_extrude(Element super,Integer extrude_num) 
Description
For the Element super of type Super, delete the extrude in position number extrude_num from the 
list of extrusions for super.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Extrude_Value is not set.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1924
Super_delete_all_extrudes(Element super)   
Name
Integer Super_delete_all_extrudes(Element super) 
Description
Delete all extrudes.
For the Element super of type Super, delete all the extrudes from the list of extrusions for super.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Extrude_Value is not set.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
Page 541
Super String Element
Chapter 5  12dPL Library Calls
A return value of 0 indicates the function call was successful.
ID = 1925
Set_super_extrude(Element super,Element shape)
Name
Integer Set_super_extrude(Element super,Element shape) 
Description
LEGACY FUNCTION - DO NOT USE
Many moons ago there was only one profile that could be extruded along the string.
Later that was modified and there is now a list of profiles that are extruded.
This call is from before there was a list and will behave as if there is no list and will delete the list. 
Hence this option should not be used.
For the Element super of type Super which has the dimension Att_Extrude_Value set, set shape to 
be the Element that is extruded along super. 
Note: shape must also be of type Super.
WARNING: If this function is called and there is a list of extrudes, the entire list will be 
deleted.
A non-zero function return value is returned if super or shape is not of type Super, or if the 
Dimension Att_Extrude_Value is not set. 
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the shape was successfully set.
ID = 1681
Get_super_extrude(Element super,Element &shape) 
Name
Integer Get_super_extrude(Element super,Element &shape) 
Description
LEGACY FUNCTION - DO NOT USE
Many moons ago there was only one profile that could be extruded along the string.
Later that was modified and there is now a list of profiles that are extruded.
This call will only return one profile. Hence this option should not be used.
For the Element super of type Super and has the dimension Att_Extrude_Value set, get the 
Element shape that defines the 2d profile that is extruded along super.
Note: shape will be of type Super.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Extrude_Value is not set.
See  Extrude Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the shape was successfully returned.
ID = 1682
Page 542
Super String Element
 12d Model Macro Manual
5.38.17 Super String Interval Functions
For definitions of the Interval dimensions, see  Interval Dimensions
If Att_Interval_Value is set, then there is a Real interval_distance and a Real chord_arc_distance for 
the super string
if the plan length of a segment is greater than interval_distance then for triangulation purposes, 
extra temporary vertices are added into the super string so that the plan distance between each 
vertex is less than interval_distance. The z-value for the temporary vertices is interpolated from the 
z-values of the adjacent real vertices of the super string. If interval_distance is equal to zero, then no 
extra temporary vertices are added.
 Also for each segment that is an arc, if the plan chord distance between the end points of the arc is 
greater than the chord_arc_distance then for triangulation purposes extra temporary vertices are 
added into the super string until the chord distance for each arc is less than chord_arc_distance. 
The z-value for the temporary vertices is interpolated from the z-values of the adjacent real vertices 
of the super string. If chord_arc_distance is equal to zero, then no extra temporary vertices are 
added
Set_super_use_interval(Element super,Integer use) 
Name
Integer Set_super_use_interval(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Interval_Value is used or 
removed.
If Att_Interval_Value is set then there is a Real interval_distance and a Real chord_arc_distance 
stored for the super string.
See  Interval Dimensions for information on the Interval dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the two intervals are stored.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 1702
Get_super_use_interval(Element super,Integer &use) 
Name
Integer Get_super_use_interval(Element super,Integer &use) 
Description
Query whether the dimension Att_Interval_Value exists for the super string super. 
If Att_Interval_Value is set then there is a Real interval_distance and a Real chord_arc_distance 
stored for the super string.
See  Interval Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1705
Page 543
Super String Element
Chapter 5  12dPL Library Calls
Set_super_interval_distance(Element super,Real value)
Name
Integer Set_super_interval_distance(Element super,Real value) 
Description
For the Element super of type Super which has the dimension Att_Interval_Value set, set the 
interval_distance to value.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Interval_Value is not set. 
See  Interval Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the interval_distance was successfully set.
 ID = 1704
Get_super_interval_distance(Element super,Real &value) 
Name
Integer Get_super_interval_distance(Element super,Real &value) 
Description
For the Element super of type Super and has the dimension Att_Interval_Value set, get the 
interval_distance for super and return it in value.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Interval_Value is not set.
See  Interval Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the interval_distance was successfully returned.
ID = 1707
Set_super_interval_chord_arc(Element super,Real value) 
Name
Integer Set_super_interval_chord_arc(Element super,Real value) 
Description
Description
For the Element super of type Super which has the dimension Att_Interval_Value set, set the 
chord_arc_distance to value.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Interval_Value is not set. 
See  Interval Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the chord_arc_distance was successfully set.
ID = 1703
Get_super_interval_chord_arc(Element super,Real &value) 
Name
Page 544
Super String Element
 12d Model Macro Manual
Integer Get_super_interval_chord_arc(Element super,Real &value) 
Description
For the Element super of type Super and has the dimension Att_Interval_Value set, get the 
chord_arc_distance for super and return it in value.
A non-zero function return value is returned if super is not of type Super, or if the Dimension 
Att_Interval_Value is not set.
See  Interval Dimensions for information on the Extrude dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A function return value of zero indicates the chord_arc_distance was successfully returned.
ID = 1706
Page 545
Super String Element
Chapter 5  12dPL Library Calls
5.38.18 Super String Vertex Attributes Functions
For definitions of the Vertex Attributes dimensions, see  User Defined Vertex Attributes Dimensions
Set_super_use_vertex_attribute(Element super,Integer use)
Name
Integer Set_super_use_vertex_attribute(Element super,Integer use)
Description
Tell the super string whether to use. or remove, the dimension Att_Vertex_Attribute_Array. 
If Att_Vertex_Attribute_Array exists then there can be a type Attributes for each vertex.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
If use is 1, the dimension is set and an Attributes is allowed on each vertex.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 770
Get_super_use_vertex_attribute(Element super,Integer &use)
Name
Integer Get_super_use_vertex_attribute(Element super,Integer &use)
Description
Query whether the dimension Att_Vertex_Attribute_Array exists for the super string. 
If Att_Vertex_Attribute_Array exists then there can be a type Attributes for each vertex.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 771
Set_super_vertex_attributes(Element super,Integer vert,Attributes att)
Name
Integer Set_super_vertex_attributes(Element super,Integer vert,Attributes att)
Description
For the Element super, set the Attributes for the vertex number vert to att.
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, then a 
non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute is successfully set.
ID = 2003
Page 546
Super String Element
 12d Model Macro Manual
Get_super_vertex_attributes(Element super,Integer vert,Attributes &att) 
Name
Integer Get_super_vertex_attributes(Element super,Integer vert,Attributes &att)
Description
For the Element super, return the Attributes for the vertex number vert as att.
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, or the 
vertex number vert has no Attributes, then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute is successfully returned.
ID = 2002
Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Uid &uid)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Uid &uid) 
Description
For the Element super, get the attribute called att_name for the vertex number vert and return the 
attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, or the 
attribute is not of type Uid then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
 ID = 2004
Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Attributes 
&att) 
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Attributes &att) 
Description
For the Element super, get the attribute called att_name for the vertex number vert and return the 
attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, or the 
attribute is not of type Attributes then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2005
Get_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Uid &uid) 
Name
Page 547
Super String Element
Chapter 5  12dPL Library Calls
Integer Get_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Uid &uid) 
Description
For the Element super, get the attribute with number att_no for the vertex number vert and return 
the attribute value in uid. The attribute must be of type Uid. 
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, or the 
attribute is not of type Uid then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 2006
Get_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Attributes &att) 
Name
Integer Get_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Attributes &att) 
Description
For the Element super, get the attribute with number att_no for the vertex number vert and return 
the attribute value in att. The attribute must be of type Attributes. 
If the Element is not of type Super, or the dimension Att_Vertex_Attribute_Array is not set, or the 
attribute is not of type Attributes then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 2007
Set_super_vertex_attribute(Element elt,Integer vert,Text att_name,Uid uid) 
Name
Integer Set_super_vertex_attribute(Element elt,Integer vert,Text att_name,Uid uid) 
Description
For the Element super and on the vertex number vert,
   if the attribute called att_name does not exist then create it as type Uid and give it the value uid.
   if the attribute called att_name does exist and it is type Uid, then set its value to uid.
If the attribute exists and is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2008
Set_super_vertex_attribute(Element elt,Integer vert,Text att_name,Attributes att) 
Name
Integer Set_super_vertex_attribute(Element elt,Integer vert,Text att_name,Attributes att) 
Page 548
Super String Element
 12d Model Macro Manual
Description
For the Element super and on the vertex number vert,
   if the attribute called att_name does not exist then create it as type Attributes and give it the value 
att.
   if the attribute called att_name does exist and it is type Attributes, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2009
Set_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Uid uid) 
Name
Integer Set_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Uid uid) 
Description
For the Element super and on the vertex number vert, if the attribute number att_no exists and it is 
of type Uid, then its value is set to uid.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Uid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 2010
Set_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Attributes att) 
Name
Integer Set_super_vertex_attribute(Element elt,Integer vert,Integer att_no,Attributes att) 
Description
For the Element super and on the vertex number vert, if the attribute number att_no exists and it is 
of type Attributes, then its value is set to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 2011
Super_vertex_attribute_exists(Element elt,Integer vert,Text att_name,Integer &num)
Name
Integer Super_vertex_attribute_exists(Element elt,Integer vert,Text att_name,Integer &num)
Description
Page 549
Super String Element
Chapter 5  12dPL Library Calls
Checks to see if for vertex number vert, an attribute of name att_name exists, and if it does, return 
the number of the attribute as num.
A non-zero function return value indicates the attribute exists and its number was successfully 
returned.
A zero function return value indicates the attribute does not exist, or the number was not 
successfully returned.
Warning - this is the opposite to most 12dPL function return values
ID = 773
Super_vertex_attribute_exists(Element elt,Integer vert,Text att_name)
Name
Integer Super_vertex_attribute_exists(Element elt,Integer vert,Text att_name)
Description
Checks to see if for vertex number vert, an attribute of name att_name exists.
A non-zero function return value indicates the attribute exists.
A zero function return value indicates the attribute does not exist.
Warning - this is the opposite to most 12dPL function return values
ID = 772
Super_vertex_attribute_delete(Element super,Integer vert,Integer att_no)
Name
Integer Super_vertex_attribute_delete(Element super,Integer vert,Integer att_no)
Description
For the Element super, delete the attribute with attribute number att_no for vertex number vert.
If the Element super is not of type Super or super has no vertex number vert, then a non-zero 
return code is returned.
A function return value of zero indicates the attribute was deleted.
ID = 775
Super_vertex_attribute_delete(Element super,Integer vert,Text att_name)
Name
Integer Super_vertex_attribute_delete(Element super,Integer vert,Text att_name)
Description
For the Element super, delete the attribute with the name att_name for vertex number vert.
If the Element super is not of type Super or super has vertex number vert, then a non-zero return 
code is returned.
A function return value of zero indicates the attribute was deleted.
ID = 774
Super_vertex_attribute_delete_all(Element super,Integer vert)
Name
Page 550
Super String Element
 12d Model Macro Manual
Integer Super_vertex_attribute_delete_all(Element super,Integer vert)
Description
Delete all the attributes of vertex number vert of the super string super.
A function return value of zero indicates the function was successful.
ID = 776
Super_vertex_attribute_dump(Element super,Integer vert)
Name
Integer Super_vertex_attribute_dump(Element super,Integer vert)
Description
Write out information to the Output Window about the vertex attributes for vertex number vert of the 
super string super.
A function return value of zero indicates the function was successful.
 ID = 777
Super_vertex_attribute_debug(Element super,Integer vert)
Name
Integer Super_vertex_attribute_debug(Element super,Integer vert)
Description
Write out even more information to the Output Window about the vertex attributes for vertex number 
vert of the super string super.
A function return value of zero indicates the function was successful.
ID = 778
Get_super_vertex_number_of_attributes(Element super,Integer vert,Integer 
&no_atts)
Name
Integer Get_super_vertex_number_of_attributes(Element super,Integer vert,Integer &no_atts)
Description
Get the total number of attributes for vertex number vert of the Element super.
The total number of attributes is returned in Integer no_atts.
A function return value of zero indicates the number of attributes was successfully returned.
ID = 779
Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Text &txt)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Text &txt)
Description
For the Element super, get the attribute called att_name for the vertex number vert and return the 
attribute value in txt. The attribute must be of type Text.
Page 551
Super String Element
Chapter 5  12dPL Library Calls
If the Element is not of type Super or the attribute is not of type Text then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 780
Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Integer &int)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Integer &int)
Description
For the Element super, get the attribute called att_name for the vertex number vert and return the 
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Super or the attribute is not of type Integer then a non-zero return value 
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 781
Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Real &real)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Text att_name,Real &real)
Description
For the Element super, get the attribute called att_name for the vertex number vert and return the 
attribute value in real. The attribute must be of type Real.
If the Element is not of type Super or the attribute is not of type Real then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 782
Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Text &txt)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Text &txt)
Description
For the Element super, get the attribute number att_no for the vertex number vert and return the 
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Super or the attribute is not of type Text then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
 ID = 783
Page 552
Super String Element
 12d Model Macro Manual
Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Integer &int)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Integer &int)
Description
For the Element super, get the attribute number att_no for the vertex number vert and return the 
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Super or the attribute is not of type Integer then a non-zero return value 
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 784
Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Real &real)
Name
Integer Get_super_vertex_attribute(Element super,Integer vert,Integer att_no,Real &real)
Description
For the Element super, get the attribute number att_no for the vertex number vert and return the 
attribute value in real. The attribute must be of type Real.
If the Element is not of type Super or the attribute is not of type Real then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 785
Get_super_vertex_attribute_name(Element super,Integer vert,Integer att_no,Text 
&txt)
Name
Integer Get_super_vertex_attribute_name(Element super,Integer vert,Integer att_no,Text &txt)
Description
For vertex number vert of the Element super, get the name of the attribute number att_no. The 
attribute name is returned in txt.
A function return value of zero indicates the attribute name was successfully returned.
ID = 786
Get_super_vertex_attribute_length(Element super,Integer vert,Text att_name,Integer 
&att_len)
Name
Integer Get_super_vertex_attribute_length(Element super,Integer vert,Text att_name,Integer &att_len)
Description
For vertex number vert of the Element super, get the length (in bytes) of the attribute with the name 
att_name. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Page 553
Super String Element
Chapter 5  12dPL Library Calls
Note - the length is useful for user attributes of type Text and Binary.
 ID = 789
Get_super_vertex_attribute_length(Element super,Integer vert,Integer att_no,Integer 
&att_len)
Name
Integer Get_super_vertex_attribute_length(Element super,Integer vert,Integer att_no,Integer &att_len)
Description
For vertex number vert of the Element super, get the length (in bytes) of the attribute number 
att_no. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for attributes of type Text and Binary.
ID = 790
Get_super_vertex_attribute_type(Element super,Integer vert,Text att_name,Integer 
&att_type)
Name
 Integer Get_super_vertex_attribute_type(Element super,Integer vert,Text att_name,Integer &att_type)
Description
For vertex number vert of the Element super, get the type of the attribute with name att_name. The 
attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.
ID = 787
Get_super_vertex_attribute_type(Element super,Integer vert,Integer att_no,Integer 
&att_type)
Name
 Integer Get_super_vertex_attribute_type(Element super,Integer vert,Integer att_no,Integer &att_type)
Description
For vertex number vert of the Element super, get the type of the attribute with attribute number 
att_no. The attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.
ID = 788
Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Text txt)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Text txt)
Description
For the Element super and on the vertex number vert,
   if the attribute called att_name does not exist then create it as type Text and give it the value txt.
   if the attribute called att_name does exist and it is type Text, then set its value to txt.
Page 554
Super String Element
 12d Model Macro Manual
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 791
Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Integer int)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Integer int)
Description
For the Element super and on the vertex number vert,
   if the attribute called att_name does not exist then create it as type Integer and give it the value 
int.
   if the attribute called att_name does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 792
Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Real real)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Text att_name,Real real)
Description
For the Element super and on the vertex number vert,
   if the attribute called att_name does not exist then create it as type Real and give it the value real.
   if the attribute called att_name does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 793
Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Text txt)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Text txt)
Description
For the Element super and on the vertex number vert,
   if the attribute with number att_no does not exist then create it as type Text and give it the value 
txt.
   if the attribute with number att_no does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
 ID = 794
Page 555
Super String Element
Chapter 5  12dPL Library Calls
Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Integer int)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Integer int)
Description
For the Element super and on the vertex number vert,
   if the attribute with number att_no does not exist then create it as type Integer and give it the 
value int.
   if the attribute with number att_no does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
 ID = 795
Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Real real)
Name
Integer Set_super_vertex_attribute(Element super,Integer vert,Integer att_no,Real real)
Description
For the Element super and on the vertex number vert,
   if the attribute with number att_no does not exist then create it as type Real and give it the value 
real.
   if the attribute with number att_no does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
ID = 796
Page 556
Super String Element
 12d Model Macro Manual
5.38.19 Super String Segment Attributes Functions
For definitions of the Segment Attributes dimensions, see  User Defined Vertex Attributes Dimensions
Set_super_use_segment_attribute(Element super,Integer use)
Name
Integer Set_super_use_segment_attribute(Element super,Integer use)
Description
Tell the super string whether to use or remove the dimension Att_Segment_Attribute_Array. 
If the dimension Att_Segment_Attribute_Array exists then there can be an Attributes on each 
segment.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it.
A return value of 0 indicates the function call was successful.
ID = 1060
Get_super_use_segment_attribute(Element super,Integer &use)
Name
Integer Get_super_use_segment_attribute(Element super,Integer &use)
Description
Query whether the dimension Att_Segment_Attribute_Array exists for the super string. 
If the dimension Att_Segment_Attribute_Array exists then there can be an Attributes on each 
segment.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1061
Get_super_segment_attributes(Element elt,Integer seg,Attributes &att) 
Name
Integer Get_super_segment_attributes(Element elt,Integer seg,Attributes &att) 
Description
For the Element super, return the Attributes for the segment number seg as att.
If the Element is not of type Super, or Att_Segment_Attribute_Array dimension is not set, or the 
segment number seg has no attribute then a non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute is successfully returned.
ID = 2012
Page 557
Super String Element
Chapter 5  12dPL Library Calls
Set_super_segment_attributes(Element elt,Integer seg,Attributes att) 
Name
Integer Set_super_segment_attributes(Element elt,Integer seg,Attributes att) 
Description
For the Element super, set the Attributes for the segment number seg to att.
If the Element is not of type Super, or Att_Segment_Attribute_Array dimension is not set, then a 
non-zero return value is returned.
See  User Defined Vertex Attributes Dimensions for information on the Attributes dimensions or 
5.38.1 Super String Dimensions for information on all the dimensions.
A function return value of zero indicates the attribute is successfully set.
ID = 2013
Get_super_segment_attribute(Element super,Integer seg,Text att_name,Uid &uid) 
Name
Integer Get_super_segment_attribute(Element super,Integer seg,Text att_name,Uid &uid) 
Description
For the Element super, get the attribute called att_name for the segment number seg and return 
the attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Super or the attribute is not of type Uid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2014
Get_super_segment_attribute(Element super,Integer seg,Text att_name,         
Attributes &att) 
Name
Integer Get_super_segment_attribute(Element super,Integer seg,Text att_name,Attributes &att) 
Description
For the Element super, get the attribute called att_name for the segment number seg and return 
the attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Super or the attribute is not of type Attributes then a non-zero return 
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2015
Get_super_segment_attribute(Element super,Integer seg,Integer att_no,Uid &uid) 
Name
Integer Get_super_segment_attribute(Element super,Integer seg,Integer att_no,Uid &uid) 
Description
Page 558
Super String Element
 12d Model Macro Manual
For the Element super, get the attribute with number att_no for the segment number seg and return 
the attribute value in uid. The attribute must be of type Uid. 
If the Element is not of type Super or the attribute is not of type Uid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 2016
Get_super_segment_attribute(Element super,Integer seg,Integer att_no,
        Attributes &att) 
Name
Integer Get_super_segment_attribute(Element super,Integer seg,Integer att_no,Attributes &att) 
Description
For the Element super, get the attribute with number att_no for the segment number seg and return 
the attribute value in att. The attribute must be of type Attributes. 
If the Element is not of type Super or the attribute is not of type Attributes then a non-zero return 
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 2017
Set_super_segment_attribute(Element super,Integer seg,Text att_name,Uid uid) 
Name
Integer Set_super_segment_attribute(Element super,Integer seg,Text att_name,Uid uid) 
Description
For the Element super and on the segment number seg,
   if the attribute called att_name does not exist then create it as type Uid and give it the value uid.
   if the attribute called att_name does exist and it is type Uid, then set its value to uid.
If the attribute exists and is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2018
Set_super_segment_attribute(Element super,Integer seg,Text att_name,
         Attributes att) 
Name
Integer Set_super_segment_attribute(Element super,Integer seg,Text att_name,Attributes att) 
Description
For the Element super and on the segment number seg,
   if the attribute called att_name does not exist then create it as type Attributes and give it the value 
att.
Page 559
Super String Element
Chapter 5  12dPL Library Calls
   if the attribute called att_name does exist and it is type Attributes, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 2019
Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Uid uid) 
Name
Integer Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Uid uid) 
Description
For the Element super and on the segment number seg, if the attribute number att_no exists and it 
is of type Uid, then its value is set to uid.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Uid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 2020
Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Attributes att) 
Name
Integer Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Attributes att) 
Description
For the Element super and on the segment number seg, if the attribute number att_no exists and it 
is of type Attributes, then its value is set to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 2021
Super_segment_attribute_exists(Element elt,Integer seg,Text att_name)
Name
Integer Super_segment_attribute_exists(Element elt,Integer seg,Text att_name)
Description
Checks to see if for segment number seg, an attribute of name att_name exists.
A non-zero function return value indicates the attribute exists.
A zero function return value indicates the attribute does not exist.
Page 560
Super String Element
 12d Model Macro Manual
Warning - this is the opposite to most 12dPL function return values
ID = 1062
Super_segment_attribute_exists(Element elt,Integer seg,Text att_name,Integer 
&num)
Name
Integer Super_segment_attribute_exists(Element elt,Integer seg,Text att_name,Integer &num)
Description
Checks to see if for segment number seg, an attribute of name att_name exists, and if it does, 
return the number of the attribute as num.
A non-zero function return value indicates the attribute exists and its number was successfully 
returned.
A zero function return value indicates the attribute does not exist, or the number was not 
successfully returned.
Warning - this is the opposite to most 12dPL function return values
ID = 1063
Super_segment_attribute_delete (Element super,Integer seg,Text att_name)
Name
Integer Super_segment_attribute_delete (Element super,Integer seg,Text att_name)
Description
For the Element super, delete the attribute with the name att_name for segment number seg.
If the Element super is not of type Super or super has no segment number seg, then a non-zero 
return code is returned.
A function return value of zero indicates the attribute was deleted.
ID = 1064
Super_segment_attribute_delete (Element super,Integer seg,Integer att_no)
Name
Integer Super_segment_attribute_delete (Element super,Integer seg,Integer att_no)
Description
For the Element super, delete the attribute with attribute number att_no for segment number seg.
If the Element super is not of type Super or super has no segment number seg, then a non-zero 
return code is returned.
A function return value of zero indicates the attribute was deleted.
ID = 1065
Super_segment_attribute_delete_all (Element super,Integer seg)
Name
Integer Super_segment_attribute_delete_all (Element super,Integer seg)
Description
Page 561
Super String Element
Chapter 5  12dPL Library Calls
Delete all the attributes of segment number seg of the super string super.
A function return value of zero indicates the function was successful.
ID = 1066
Super_segment_attribute_dump (Element super,Integer seg)
Name
Integer Super_segment_attribute_dump (Element super,Integer seg)
Description
Write out information to the Output Window about the segment attributes for segment number seg 
of the super string super.
A function return value of zero indicates the function was successful.
ID = 1067
Super_segment_attribute_debug (Element super,Integer seg)
Name
Integer Super_segment_attribute_debug (Element super,Integer seg)
Description
Write out even more information to the Output Window about the segment attributes for segment 
number seg of the super string super.
A function return value of zero indicates the function was successful.
ID = 1068
Get_super_segment_number_of_attributes(Element super,Integer seg,Integer 
&no_atts)
Name
Integer Get_super_segment_number_of_attributes(Element elt,Integer seg,Integer &no_atts)
Description
Get the total number of attributes for segment number seg of the Element super.
The total number of attributes is returned in Integer no_atts.
A function return value of zero indicates the number of attributes was successfully returned.
A return value of 0 indicates the function call was successful.
ID = 1069
Get_super_segment_attribute (Element super,Integer seg,Text att_name,Text &text)
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Text att_name,Text &text)
Description
For the Element super, get the attribute called att_name for the segment number seg and return 
the attribute value in text. The attribute must be of type Text.
If the Element is not of type Super or the attribute is not of type Text then a non-zero return value is 
returned.
Page 562
Super String Element
 12d Model Macro Manual
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1070
Get_super_segment_attribute (Element super,Integer seg,Text att_name,Integer &int)
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Text att_name,Integer &int)
Description
For the Element super, get the attribute called att_name for the segment number seg and return 
the attribute value in int. The attribute must be of type Integer.
If the Element is not of type Super or the attribute is not of type Integer then a non-zero return value 
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1071
Get_super_segment_attribute (Element super,Integer seg,Text att_name,Real &real)
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Text att_name,Real &real)
Description
For the Element super, get the attribute called att_name for the segment number seg and return 
the attribute value in real. The attribute must be of type Real.
If the Element is not of type Super or the attribute is not of type Real then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1072
Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Text &txt)
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Text &txt)
Description
For the Element super, get the attribute number att_no for the segment number seg and return the 
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Super or the attribute is not of type Text then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1073
Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Integer &int)
Page 563
Super String Element
Chapter 5  12dPL Library Calls
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Integer &int)
Description
For the Element super, get the attribute number att_no for the segment number seg and return the 
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Super or the attribute is not of type Integer then a non-zero return value 
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1074
Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Real &real)
Name
Integer Get_super_segment_attribute (Element super,Integer seg,Integer att_no,Real &real)
Description
For the Element super, get the attribute number att_no for the segment number seg and return the 
attribute value in real. The attribute must be of type Real.
If the Element is not of type Super or the attribute is not of type Real then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1075
Get_super_segment_attribute_name (Element super,Integer seg,Integer att_no,Text 
&txt)
Name
 Integer Get_super_segment_attribute_name (Element super,Integer seg,Integer att_no,Text &txt)
Description
For segment number seg of the Element super, get the name of the attribute number att_no. The 
attribute name is returned in txt.
A function return value of zero indicates the attribute name was successfully returned.
ID = 1076
Get_super_segment_attribute_type (Element super,Integer seg,Text att_name,Integer 
&att_type)
Name
Integer Get_super_segment_attribute_type (Element super,Integer seg,Text att_name,Integer &att_type)
Description
For segment number seg of the Element super, get the type of the attribute with name att_name. 
The attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.
ID = 1077
Page 564
Super String Element
 12d Model Macro Manual
Get_super_segment_attribute_type (Element super,Integer seg,Integer att_no,Integer 
&att_type)
Name
Integer Get_super_segment_attribute_type (Element super,Integer seg,Integer att_no,Integer &att_type)
Description
For segment number seg of the Element super, get the type of the attribute with attribute number 
att_no. The attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.
ID = 1078
Get_super_segment_attribute_length(Element super,Integer seg,Text 
att_name,Integer &att_len)
Name
Integer Get_super_segment_attribute_length(Element super,Integer seg,Text att_name,Integer &att_len)
Description
For segment number seg of the Element super, get the length (in bytes) of the attribute with the 
name att_name. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for user attributes of type Text and Binary.
ID = 1079
Get_super_segment_attribute_length(Element super,Integer seg,Integer 
att_no,Integer &att_len)
Name
 Integer Get_super_segment_attribute_length(Element super,Integer seg,Integer att_no,Integer &att_len)
Description
For segment number seg of the Element super, get the length (in bytes) of the attribute number 
att_no. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for attributes of type Text and Binary.
ID = 1080
Set_super_segment_attribute (Element super,Integer seg,Text att_name,Text txt)
Name
Integer Set_super_segment_attribute (Element super,Integer seg,Text att_name,Text txt)
Description
For the Element super and on the segment number seg,
   if the attribute called att_name does not exist then create it as type Text and give it the value txt.
   if the attribute called att_name does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
Page 565
Super String Element
Chapter 5  12dPL Library Calls
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1081
Set_super_segment_attribute (Element super,Integer seg,Text att_name,Integer in)
Name
Integer Set_super_segment_attribute (Element super,Integer seg,Text att_name,Integer int)
Description
For the Element super and on the segment number seg,
   if the attribute called att_name does not exist then create it as type Integer and give it the value 
int.
   if the attribute called att_name does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1082
Set_super_segment_attribute (Element super,Integer seg,Text att_name,Real real)
Name
Integer Set_super_segment_attribute (Element super,Integer seg,Text att_name,Real real)
Description
For the Element super and on the segment number seg,
   if the attribute called att_name does not exist then create it as type Real and give it the value real.
   if the attribute called att_name does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1083
Set_super_segment_attribute (Element super,Integer seg,Integer att_no,Text txt)
Name
Integer Set_super_segment_attribute (Element super,Integer seg,Integer att_no,Text txt)
Description
For the Element super and on the segment number seg,
   if the attribute with number att_no does not exist then create it as type Text and give it the value 
txt.
   if the attribute with number att_no does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
ID = 1084
Page 566
Super String Element
 12d Model Macro Manual
Set_super_segment_attribute (Element super,Integer seg,Integer att_no,Integer in)
Name
Integer Set_super_segment_attribute (Element super,Integer seg,Integer att_no,Integer int)
Description
For the Element super and on the segment number seg,
   if the attribute with number att_no does not exist then create it as type Integer and give it the 
value int.
   if the attribute with number att_no does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
ID = 1085
Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Real real)
Name
Integer Set_super_segment_attribute(Element super,Integer seg,Integer att_no,Real real)
Description
For the Element super and on the segment number seg,
   if the attribute with number att_no does not exist then create it as type Real and give it the value 
real.
   if the attribute with number att_no does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute number att_no.
ID = 1086
Page 567
Super String Element
Chapter 5  12dPL Library Calls
5.38.20 Super String Uid Functions
For definitions of the UID dimensions, see  UID Dimensions
If Att_Vertex_UID_Array is used, then there is an Integer (referred to as a uid) stored at each vertex 
of the super string. Note that this is an Integer and not a variable of type Uid.
This is used by 12d Solutions to store special backtracking numbers on each vertex (for example for 
survey data reduction or with the underlying super string in a super alignment). 
See 5.38.20.1 Super String Vertex Uid
See 5.38.20.2 Super String Segment Uid
Page 568
Super String Element
 12d Model Macro Manual
5.38.20.1 Super String Vertex Uid
Set_super_use_vertex_uid(Element super,Integer use) 
Name
Integer Set_super_use_vertex_uid(Element super,Integer use) 
Description
WARNING - Reserved for 12d Solutions Staff Only.
Tell the super string super whether to use (set), or not use (remove), the dimension 
Att_Vertex_UID_Array.
A value for use of 1 sets the dimension and 0 removes it.
If Att_Vertex_UID_Array is used, then there is an Integer (referred to as a uid) stored at each vertex 
of the super string.
This is used by 12d Solutions to store special backtracking numbers on each vertex (for example for 
survey data reduction or with the underlying super string in a super alignment). 
See  UID Dimensions for information on the Vertex UID dimension or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1572
Get_super_use_vertex_uid(Element super,Integer &use)
Name
Integer Get_super_use_vertex_uid(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_UID_Array exists (is used) for the super string super.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
If Att_Vertex_UID_Array is used, then there is an Integer (referred to as a uid) stored at each vertex 
of the super string.
This is used by 12d Solutions to store special backtracking numbers on each vertex (for example for 
survey data reduction or with the underlying super string in a super alignment). 
See  UID Dimensions for information on the Vertex UID dimension or 5.38.1 Super String 
Dimensions for information on all the dimensions.
ID = 1573
Set_super_vertex_uid(Element super,Integer vert,Integer num)
Name
Integer Set_super_vertex_uid(Element super,Integer vert,Integer num) 
Description
WARNING - Reserved for 12d Solutions Staff Only.
For the super Element super, set the vertex uid at vertex number vert to be num.
A return value of 0 indicates the function call was successful.
ID = 1574
Page 569
Super String Element
Chapter 5  12dPL Library Calls
Get_super_vertex_uid(Element super,Integer vert,Integer &num) 
Name
Integer Get_super_vertex_uid(Element super,Integer vert,Integer &num) 
Description
For the super Element super, get the vertex uid at vertex number vert and return it in num.
A return value of 0 indicates the function call was successful.
ID = 1575
Page 570
Super String Element
 12d Model Macro Manual
5.38.20.2 Super String Segment Uid
Set_super_use_segment_uid(Element super,Integer use) 
Name
Integer Set_super_use_segment_uid(Element super,Integer use) 
Description
WARNING - Reserved for 12d Solutions Staff Only.
Tell the super string super whether to use (set), or not use (remove), the dimension 
Att_Segment_UID_Array.
A value for use of 1 sets the dimension and 0 removes it.
If Att_Segment_UID_Array is used, then there is an Integer stored at each segment of the super 
string.
This is used by 12d Solutions to store special backtracking numbers on each segment (for example 
for survey data reduction or with the underlying super string in a super alignment). 
See  UID Dimensions for information on the Segment UID dimension or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 1576
Get_super_use_segment_uid(Element super,Integer &use) 
Name
Integer Get_super_use_segment_uid(Element super,Integer &use) 
Description
Query whether the dimension Att_Segment_UID_Array exists (is used) for the super string super.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
If Att_Segment_UID_Array is used, then there is an Integer stored at each segment of the super 
string.
This is used by 12d Solutions to store special backtracking numbers on each segment (for example 
for survey data reduction or with the underlying super string in a super alignment). 
See  UID Dimensions for information on the Segment UID dimension or 5.38.1 Super String 
Dimensions for information on all the dimensions.
ID = 1577
Set_super_segment_uid(Element super,Integer seg,Integer num) 
Name
Integer Set_super_segment_uid(Element super,Integer seg,Integer num) 
Description
WARNING - Reserved for 12d Solutions Staff Only.
For the super Element super, set the number called uid at segment number seg to be num.
A return value of 0 indicates the function call was successful.
ID = 1578
Page 571
Super String Element
Chapter 5  12dPL Library Calls
Get_super_segment_uid(Element super,Integer seg,Integer &num) 
Name
Integer Get_super_segment_uid(Element super,Integer seg,Integer &num) 
Description
For the super Element super, get the number called the uid on segment number seg and return it in 
num.
A return value of 0 indicates the function call was successful.
ID = 1579
Page 572
Super String Element
 12d Model Macro Manual
5.38.21 Super String Vertex Image Functions
For definitions of the Visibility dimensions, see  Vertex Image Dimensions
See 5.38.21.1 Super String Use Vertex Image Functions
See 5.38.21.2 Setting Super String Vertex Image Functions
Page 573
Super String Element
Chapter 5  12dPL Library Calls
5.38.21.1 Super String Use Vertex Image Functions
Set_super_use_vertex_image_value(Element super,Integer use) 
Name
Integer Set_super_use_vertex_image_value(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Vertex_Image_Value is used. 
If the dimension Att_Vertex_Image_Value is set then there can be one image attached to each 
vertex.
See  Vertex Image Dimensions for information on the Vertex Image dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
If use is 1, the dimension is set. That is, the super string can have an image attached to each vertex 
(it can be a different image at each vertex).
If use is 0, the dimension is removed. If the string had images then the images will be removed.
A return value of 0 indicates the function call was successful.
ID = 1767
Get_super_use_vertex_image_value(Element super,Integer &use) 
Name
Integer Get_super_use_vertex_image_value(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Image_Value exists for the super string super. 
If the dimension Att_Vertex_Image_Value is set then there can be one image attached to each 
vertex.
See  Vertex Image Dimensions for information on the Vertex Image dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1768
Set_super_use_vertex_image_array(Element super,Integer use) 
Name
Integer Set_super_use_vertex_image_array(Element super,Integer use) 
Description
For the super string Element super, define whether the dimension Att_Vertex_Image_Array is used, 
or removed, for the super string super.
If the dimension Att_Vertex_Image_Array is set then there can be more than one image attached to 
each vertex.
See  Vertex Image Dimensions for information on the Vertex Image dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
If use is 1, the dimension is set. That is, each super string vertex can have a number of images 
attached to it.
If use is 0, the dimension is removed. If the super string vertex had images then the images will be 
Page 574
Super String Element
 12d Model Macro Manual
removed.
A return value of 0 indicates the function call was successful.
ID = 1769
Get_super_use_vertex_image_array(Element super,Integer &use) 
Name
Integer Get_super_use_vertex_image_array(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Image_Array exists for the super string super. 
If the dimension Att_Vertex_Image_Array is set then there can be more than one image attached to 
each vertex.
See  Vertex Image Dimensions for information on the Vertex Image dimensions or 5.38.1 Super 
String Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists. That is, each super string vertex can have a number of 
images attached to it.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1770
Super_vertex_image_value_to_array(Element super) 
Name
Integer Super_vertex_image_value_to_array(Element super)   
Description
If for the super string super the dimension Att_Vertex_Image_Value exists and the dimension 
Att_Vertex_Image_Array does not exist then there will be one image img for the entire string.
In this case (when the dimension Att_Vertex_Image_Value exists and the dimension 
Att_ZCoord_Array does not exist) this function sets the Att_Vertex_Image_Array dimension and 
creates a new image for each vertex of super and it is given the value img.
See  Height Dimensions for information on the Height (ZCoord) dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
 ID = 2176
Page 575
Super String Element
Chapter 5  12dPL Library Calls
5.38.21.2 Setting Super String Vertex Image Functions
Super_vertex_image_delete(Element elt,Integer vertex_num,Integer image_num)
Name
Integer Super_vertex_image_delete(Element super,Integer vertex_num,Integer image_num) 
Description
For the super Element super, delete image number image_num from vertex number vertex_num.
A return value of 0 indicates the function call was successful.
 ID = 1862
Super_vertex_image_delete_all(Element super,Integer vertex_num) 
Name
Integer Super_vertex_image_delete_all(Element super,Integer vertex_num)
Description
For the super Element super, delete all the images on vertex number vertex_num.
A return value of 0 indicates the function call was successful.
ID = 1863
Get_super_vertex_number_of_images(Element super,Integer vertex_num,Integer 
&num_images) 
Name
Integer Get_super_vertex_number_of_images(Element super,Integer vertex_num,Integer &num_images) 
Description
For the super Element super, return in num_images the number of images on vertex number 
vertex_num.
A return value of 0 indicates the function call was successful.
ID = 1864
Get_super_vertex_image_type(Element elt,Integer vertex,Integer image_no,Text 
&image_type)
Name
Integer Get_super_vertex_image_type(Element elt,Integer vertex,Integer image_no,Text &image_type) 
Description
what is image_type? (it is URL etc)
<no description>
 ID = 1865
Super_vertex_add_URL(Element super,Integer vertex,Text url)
Name
Integer Super_vertex_add_URL(Element super,Integer vertex,Text url) 
Page 576
Super String Element
 12d Model Macro Manual
Description
image_vertex_array or value. Set the vertex to have text which is treated as url.
<no description>
 ID = 1771
Get_super_vertex_URL(Element elt,Integer vertex,Integer image_no,Text &url) 
Name
Integer Get_super_vertex_URL(Element elt,Integer vertex,Integer image_no,Text &url) 
Description
get url. If not url type then error.
<no description>
ID = 1866
Get_Super_vertex_plan_image(Element super,Integer vertex,Integer image_no,Text 
&url,Real &width,Real &height,Real &angle,Real &offset_x,Real &offset_y)
Name
Integer Get_Super_vertex_plan_image(Element super,Integer vertex,Integer image_no,Text &url,Real 
&width,Real &height,Real &angle,Real &offset_x,Real &offset_y) 
Description
an image type
<no description>
 ID = 1867
Page 577
Super String Element
Chapter 5  12dPL Library Calls
5.38.22 Super String Visibility Functions
For definitions of the Visibility dimensions, see  Visibility Dimensions
See 5.38.22.1 Super String Combined Visibility
See 5.38.22.2 Super String Vertex Visibility
See 5.38.22.3 Super String Segment Visibility
Page 578
Super String Element
 12d Model Macro Manual
5.38.22.1 Super String Combined Visibility
Set_super_use_visibility(Element super,Integer use)
Name
Integer Set_super_use_visibility(Element super,Integer use)
Description
Tell the super string whether to use, or remove, the dimension Att_Visible_Array.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A value for use of 1 sets the dimension and 0 removes it.
A return value of 0 indicates the function call was successful.
ID = 718
Get_super_use_visibility(Element super,Integer &use)
Name
Integer Get_super_use_visibility(Element super,Integer &use)
Description
Query whether the dimension Att_Visible_Array exists for the super string.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 719
Page 579
Super String Element
Chapter 5  12dPL Library Calls
5.38.22.2 Super String Vertex Visibility
Set_super_use_vertex_visibility_value(Element super,Integer use) 
Name
Integer Set_super_use_vertex_visibility_value(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Vertex_Visible_Value is used 
or removed.
If Att_Vertex_Visible_Value is set and Att_Vertex_Visible_Array is not set, then there is only one 
visibility value for all vertices in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If Att_Vertex_Visible_Value is set then the visibility is the same for all vertices in super.
If use is 1, the dimension is set and the visibility is the same for all vertices.
If use is 0, the dimension is removed.
Note that if the dimension Att_Vertex_Visible_Array exists, this call is ignored.
A return value of 0 indicates the function call was successful.
ID = 1580
Get_super_use_vertex_visibility_value(Element super,Integer &use)
Name
Integer Get_super_use_vertex_visibility_value(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Visible_Value exists for the super string super. If 
Att_Vertex_Visible_Value is set then there is one visibility value for all vertices in super.
If Att_Vertex_Visible_Value is set and Att_Vertex_Visible_Array is not set, then there is only one 
visibility value for all vertices in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
 ID = 1581
Set_super_use_vertex_visibility_array(Element super,Integer use) 
Name
Integer Set_super_use_vertex_visibility_array(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Vertex_Visible_Array is used 
or removed. 
If Att_Vertex_Visible_Array is set then there can be a different visibility defined for each vertex in 
super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Page 580
Super String Element
 12d Model Macro Manual
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the visibility is different for each vertex.
If use is 0, the dimension is removed.
A return value of 0 indicates the function call was successful.
ID = 1582
Get_super_use_vertex_visibility_array(Element super,Integer &use) 
Name
Integer Get_super_use_vertex_visibility_array(Element super,Integer &use) 
Description
Query whether the dimension Att_Vertex_Visible_Array exists for the super string super.
If Att_Vertex_Visible_Array is set then there can be a different visibility defined for each vertex in 
super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1583
Set_super_vertex_visibility(Element super,Integer vert,Integer visibility)
Name
Integer Set_super_vertex_visibility(Element super,Integer vert,Integer visibility)
Description
For the Element super (which must be of type Super), set the visibility value for vertex number vert 
and to visibility.
If visibility is 1, the vertex is visible.
If visibility is 0, the vertex is invisible.
If the Element super is not of type Super, or Att_Vertex_Visible_Array is not set for super, then a 
non-zero return code is returned.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 734
Get_super_vertex_visibility(Element super,Integer vert,Integer &visibility)
Name
Integer Get_super_vertex_visibility(Element super,Integer vert,Integer &visibility)
Description
For the Element super (which must be of type Super), get the visibility value for vertex number vert 
and return it in the Integer visibility.
If visibility is 1, the vertex is visible.
Page 581
Super String Element
Chapter 5  12dPL Library Calls
If visibility is 0, the vertex is invisible.
If the Element super is not of type Super, or Att_Vertex_Visible_Array is not set for super, then a 
non-zero return code is returned.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 735
Page 582
Super String Element
 12d Model Macro Manual
5.38.22.3 Super String Segment Visibility
Set_super_use_segment_visibility_value(Element super,Integer use) 
Name
Integer Set_super_use_segment_visibility_value(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Segment_Visible_Value is 
used or removed. 
If Att_Segment_Visible_Value is set and Att_Segment_Visible_Array is not set, then the visibility is 
the same for all segments in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the visibility is the same for all segments.
If use is 0, the dimension is removed.
Note that if the dimension Att_Segment_Visible_Array exists, this call is ignored.
A return value of 0 indicates the function call was successful.
ID = 1588
Get_super_use_segment_visibility_value(Element super,Integer &use) 
Name
Integer Get_super_use_segment_visibility_value(Element super,Integer &use) 
Description
Query whether the dimension Att_Segment_Visible_Value exists for the super string super.
If Att_Segment_Visible_Value is set and Att_Segment_Visible_Array is not set, then the visibility is 
the same for all segments in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1589
Set_super_use_segment_visibility_array(Element super,Integer use) 
Name
Integer Set_super_use_segment_visibility_array(Element super,Integer use) 
Description
For Element super of type Super, define whether the dimension Att_Segment_Visible_Array is 
used or removed. 
If Att_Segment_Visible_Array is set then there can be a different visibility defined for each segment 
in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
If use is 1, the dimension is set and the visibility is different for each segment.
If use is 0, the dimension is removed.
Page 583
Super String Element
Chapter 5  12dPL Library Calls
A return value of 0 indicates the function call was successful.
ID = 1590
Get_super_use_segment_visibility_array(Element super,Integer &use) 
Name
Integer Get_super_use_segment_visibility_array(Element super,Integer &use) 
Description
Query whether the dimension Att_Segment_Visible_Array exists for the super string super. 
If Att_Segment_Visible_Array is set then there can be a different visibility defined for each segment 
in super.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
use is returned as 1 if the dimension exists.
use is returned as 0 if the dimension doesn’t exist.
A return value of 0 indicates the function call was successful.
ID = 1591
Set_super_segment_visibility(Element super,Integer seg,Integer visibility)
Name
Integer Set_super_segment_visibility(Element super,Integer seg,Integer visibility)
Description
For the Element super (which must be of type Super), set the visibility value for segment number 
seg to visibility.
If visibility is 1, the segment is visible.
If visibility is 0, the segment is invisible.
If the Element super is not of type Super, or Att_Segment_Visible_Array is not set for super, then a 
non-zero return code is returned.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 720
Get_super_segment_visibility(Element super,Integer seg,Integer &visibility)
Name
Integer Get_super_segment_visibility(Element super,Integer seg,Integer &visibility)
Description
For the Element super (which must be of type Super), get the visibility value for segment number 
seg and return it in the Integer visibility.
If visibility is 1, the segment is visible.
If visibility is 0, the segment is invisible.
If the Element super is not of type Super, or Att_Segment_Visible_Array is not set for super, then a 
non-zero return code is returned.
See  Visibility Dimensions for information on the Visibility dimensions or 5.38.1 Super String 
Page 584
Super String Element
 12d Model Macro Manual
Dimensions for information on all the dimensions.
A return value of 0 indicates the function call was successful.
ID = 721

```

## Examples of Setting Up Super Strings (§5.39)

---

```
Page 585
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
5.39 Examples of Setting Up Super Strings
See 5.39.1 2d Super String
See 5.39.2 2d Super String with Arcs
See 5.39.3 3d Super String
See 5.39.4 Polyline Super String
See 5.39.5 Pipe Super String
See 5.39.6 Culvert Super String
See 5.39.7 Polyline Pipe Super String
See 5.39.8 4d Super String
Page 586
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.1 2d Super String
A 2d string consists of (x,y) values at each vertex of the string and a constant height for the entire 
string. There are only straight segments joining the vertices.
Creating a 2d Super String with Straight Segments
To defined a super string super with num_vert vertices, and for it to have a constant height 30 say:
    #include "setups.h"
    Element super;
// need dimension 1 Att_ZCoord_Value to have the value 1 and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCoord_Value);
// NOTE:  this is the same as    flag1 = 1;         // dimension 1 only
    super = Create_super(flag1, num_vert);
    Set_super_2d_level(super,30.0);
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_vertex_coord(super,i,x,y,30.0);
where (x,y) are the coordinates of the ith vertex of super, height is 30, i is the vertex index.
Checking for a 2d Super String
To check if a super string Element, super, has a constant height (z-value), use the code:
    Integer ret_h_value, use_h_value, ret_z_array, use_z_array;
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_h_value = Get_super_use_2d(super, use_h_value);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so isn’t like a 2d super string.
If the above does not hold then:
If ret_h_value is 0 and use_h_value is 0 (from the Get_super_use_2d call) then the super string 
super has a constant height dimension and is like a 2d string.
To find out the actual height of the 2d super string, use
   Real height;
   Get_super_2d_level(super,height);
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_vertex_coord(super,i,x,y,z);
where (x,y) are the coordinates of the ith vertex of super. The value z can be ignored if the height of 
the 2d string is already known.
Page 587
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
5.39.2 2d Super String with Arcs
Unlike the superseded 2d string, it is possible to defined a super string super with a constant height 
for the entire string but rather than just having straight line segments between vertices, the 
segments may be arcs.
Creating a 2d Super String with Arc Segments
So to defined a super string super with num_vert vertices, and for it to have a constant height 30 
say but also to have arc segments:
    #include "setups.h"
    Element super;
// need dimension 1 Att_ZCoord_Value, dimension 3 Att_Radius_Array and 
// dimension 4 Att_Major_Array to have the value 1 and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCoord_Value)|String_Super_Bit(Radius_Array)
                               |String_Super_Bit(Major_Array);
// NOTE:  this is the same as    flag1 = 13;         // dimensions 1, 3 and 4 only
    super = Create_super(flag1, num_vert);
    Set_super_2d_level(super,30.0);
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_data(super,i,x,y,30.0,r,b);
where (x,y) are the coordinates of the ith vertex of super and Real r and Integer b are the radius and 
major/minor arc bulge for the arc between vertex i and vertex i+1.
Checking for a 2d Super String with Arc Segments
To check if a super string Element, super, has a constant height (z-value) and arc segments, use 
the code:
    Integer ret_h_value, use_h_value, ret_z_array, use_z_array;
    Integer ret_r_array, use_r_array, ret_b_array, use_b_array;
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_h_value = Get_super_use_2d(super, use_h_value);
    ret_r_array = Get_super_use_segment_radius(super, use_r_array);
// note - setting the super string to have radius array also forces it to have a major/minor arc
// bulge array
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so isn’t like a 2d super string.
If the above does not hold then:
If ret_h_value is 0 and use_h_value is 0 (from the Get_super_use_2d call) then the super string 
super has a constant height dimension and is like a 2d string.
To find out the actual height of the 2d super string, use
   Real height;
Page 588
Examples of Setting Up Super Strings
 12d Model Macro Manual
   Get_super_2d_level(super,height);
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_data(super,i,x,y,z,r,b);
where (x,y) are the coordinates of the ith vertex of super and Real r and Integer b will give the radius 
and major/minor arc bulge. The value z can be ignored if the height of the 2d string is already 
known.
Page 589
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
5.39.3 3d Super String
A traditional 3d string consists of (x,y,z) values at each vertex of the string with straight line 
segments between each vertex.
Creating a 3d Super String with Straight Segments
To defined a super string super with num_vert vertices and different z-values at each vertex:
    #include "setups.h"
    Element super;
// need dimension 2 Att_ZCoord_Array (2) to have the value 1 and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCoord_Array);
// NOTE:  this is the same as    flag1 = 2;         // dimension 2 only
    super = Create_super(flag1, num_vert);
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the ith vertex of super.
Checking for a 3d Super String
To check if a super string Element, super, has a variable z-value, use the code:
    Integer ret_z_array, use_z_array;
    ret_z_array = Get_super_use_3d(super, use_z_array);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d super string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the ith vertex of super.
Page 590
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.4 Polyline Super String
A traditional polyline string consists of (x,y,z) values at each vertex of the string and straight line or 
arc segments between each vertex. So each vertex has values (x,y,z,r,b) where r is the radius of the 
arc from this segment to the next segment and b is a major/minor arc bulge.
Creating a Polyline Super String (3d Super String with Arc Segments)
Unlike the old 3d string, it is possible to defined a super string super with a (x,y,z) coordinates at 
each vertex but rather than just having straight line segments between vertices, the segments may 
be arcs. This is then the traditional polyline string.
So to defined a super string super with num_vert vertices, with variable z, and also to have arc 
segments:
    #include "setups.h"
    Element super;
// need dimension Att_ZCoord_Array (2), dimension Att_Radius_Array (3) and 
// dimension Att_Major_Array (4) to have the value 1 and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCord_Array)|String_Super_Bit(Radius_Array)
                               |String_Super_Bit(Major_Array);
// NOTE:  this is the same as    flag1 = 14;         // dimensions 2, 3 and 4 only
// Att_Major_Array does not actually have to be set because it is automatically set with
// Att_Radius_Array
    super = Create_super(flag1, num_vert);
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_data(super,i,x,y,y,z,r,b);
where (x,y,z) are the coordinates of the ith vertex of super and r and f are the radius and major/minor 
arc bulge for the arc between vertex i and vertex i+1.
NOTE: if the dimensions were not set when the super string was first created, then they can be 
created later using the Super_string_use calls. For example
     Set_super_use_3d_level(super,1);         // sets on the Att_ZCoord_Array dimension
Checking for a Polyline Super String
To check if a super string Element, super has a variable z-value and allows a radius for each 
segment between vertices, use the code:
    Integer ret_z_array, use_z_array;
    Integer ret_r_array, use_r_array, ret_b_array, use_b_array;
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_r_array = Get_super_use_segment_radius(super, use_r_array);
// note - setting the super string to have radius array also forces it to have a major/minor arc array
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d string.
If ret_r_array is 0 and use_r_array is 1 (from the Get_super_use_segment_radius call) then the 
Page 591
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
super string super has an array of radii for the segments and so is like a polyline string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_data(super,i,x,y,z,r,b);
where (x,y,z) are the coordinates of the ith vertex of super and Real r and Integer b will give the 
radius and major/minor arc bulge flag for the segment from vertex i to vertex i+1.
Page 592
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.5 Pipe Super String
A traditional pipe string consists of (x,y,z) values at each vertex of the string with straight line 
segments between each vertex, plus a diameter for the entire string. There is also a justification 
(invert, obvert, centre) for what ALL the z values represent for the pipe string.
Creating a Pipe Super String with Straight Segments
To defined a super string super with num_vert vertices and different z-values at each vertex, plus a 
pipe diameter and justification for the entire string:
    #include "setups.h"
    Element super;
// need dimension 2 Att_ZCoord_Array (2), Att_Pipe_Justify (23)
// and Att_Diameter_Value (5) to have the value 1, and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCoord_Array)|String_Super_Bit(Pipe_Justify)|
                               String_Super_Bit(Diameter_Value);
    super = Create_super(flag1, num_vert);
    Set_super_pipe_justify(super,2);               // obvert justification for pipe string
    Set_super_pipe(super,0.5,0.0,1));             // set the string internal diameter to 0.5 units and
                                                                       // 0 wall thickness
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the obvert of the ith vertex of super.
NOTE: if the dimensions were not set when the super string was first created, then they can be 
created later using the Super_string_use calls. For example
    Set_super_use_3d_level(super,1);         // sets on the Att_ZCoord_Array dimension
    Set_super_use_pipe(super,1);                // sets on the Att_Diameter_Value dimension
    Set_super_use_pipe_justify(super,1);    // sets on the Att_Pipe_Justify dimension
Checking for a Pipe Super String
To check if a super string Element, super, has a variable z-value, a diameter and a pipe justification, 
use the code:
    Integer ret_z_array, use_z_array;
    Integer ret_diam_value, use_diam_value;
    Integer ret_justification_value, use_justification_value;
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_diam_value = Get_super_use_pipe(super, use_diam_value);
    ret_justification_value = Get_super_use_pipe_justify(super, use_justification_value);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d super string.
Page 593
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
If ret_diam_value is 0 and use_diam_value is 1 (from the Get_super_use_pipe call) then the super 
string super has a diameter for the entire string.
If ret_justification_value is 0 and use_justification_value is 1 (from the Get_super_use_pipe_justify 
call) then the super string super has a justification value to use for each vertex of the string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the ith vertex of super.
The diameter and thickness for the super string super can be obtained by the call
    Real diameter, thickness;
    Integer internal_diameter;
   Get_super_pipe(super,diameter,internal_diameter);
The justification for the super string super can be obtained by the call
    integer justify;
   Get_super_pipe_justify(super,justify);
Page 594
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.6 Culvert Super String
A simple box culvert consists of (x,y,z) values at each vertex of the string with straight line segments 
between each vertex, plus the one width and height for the entire string. There is also a justification 
(invert, obvert, centre) for what ALL the z values represent for the pipe string.
Creating a Culvert Super String with Straight Segments
To defined a super string super with num_vert vertices and different z-values at each vertex, plus a 
constant culvert width and height and justification for the entire string:
#include "setups.h"
    Element super;
// need dimension 2 Att_ZCoord_Array (2), Att_Pipe_Justify (23) and Att_Culvert_Value (24)
// to have the value 1, and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCoord_Array)|String_Super_Bit(Pipe_Justify)|
                               String_Super_Bit(Culvert_Value);
    super = Create_super(flag1, num_vert);
    Set_super_pipe_justify(super,2);               // obvert justification for pipe string
    Set_super_culvert(super,10,5,1,1,1,1,1));             // set the string internal width to 10 units,
                                                                       // internal height to 5, and wall thickness of 1
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the obvert of the ith vertex of super.
NOTE: if the dimensions were not set when the super string was first created, then they can be 
created later using the Super_string_use calls. For example
    Set_super_use_3d_level(super,1);         // sets on the Att_ZCoord_Array dimension
    Set_super_use_pipe(super,1);                // sets on the Att_Diameter_Value dimension
    Set_super_use_pipe_justify(super,1);    // sets on the Att_Pipe_Justify dimension
Checking for a Culvert Super String with Constant Width and Height
To check if a super string Element, super, has a variable z-value, a constant width and height and a 
pipe justification, use the code:
    Integer ret_z_array, use_z_array;
    Integer ret_culvert_value, use_culvert_value;
    Integer ret_justification_value, use_justification_value;
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_culvert_value = Get_super_use_culvert(super, use_culvert_value);
    ret_justification_value = Get_super_use_pipe_justify(super, use_justification_value);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d super string.
Page 595
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
If ret_culvert_value is 0 and use_culvert_value is 1 (from the Get_super_use_culvert call) then the 
super string super has one width and height for the entire string.
If ret_justification_value is 0 and use_justification_value is 1 (from the Get_super_use_pipe_justify 
call) then the super string super has a justification value to use for each vertex of the string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_vertex_coord(super,i,x,y,z);
where (x,y,z) are the coordinates of the ith vertex of super.
The width, height and four thicknesses for the super string super can be obtained by the call
    Real width, height, left_thick, right_thick, top_thick, bottom_thick;
    Integer internal_width, height;
   Get_super_culvert(super,width,height,left_thick,right_thick,
                                   top_thick,bottom_thick,internal_width_height);
The justification for the super string super can be obtained by the call
    integer justify;
   Get_super_pipe_justify(super,justify);
Page 596
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.7 Polyline Pipe Super String
Unlike the old pipe string, it is possible to defined a super string super with a (x,y,z) coordinates at 
each vertex but rather than just having straight line segments between vertices, the segments may 
be arcs, plus a diameter and justification for the entire string. There is NO equivalent superseded 
string.
Creating a Polyline Pipe Super String
So to defined a super string super with num_vert vertices, with variable z, arc segments, diameter 
and justification:
    #include "setups.h"
    Element super;
// need dimensions Att_ZCoord_Array (2), Att_Radius_Array (3), Att_Major_Array (4),
// Att_Pipe_Justify (23) and Att_Diameter_Value (5) to have the value 1
// and all other dimensions the value 0
    Integer flag1 = String_Super_Bit(ZCord_Array)|String_Super_Bit(Radius_Array)
                               |String_Super_Bit(Major_Array)|String_Super_Bit(Pipe_Justify)
                               |String_Super_Bit(Diameter_Value);
    super = Create_super(flag1, num_vert);
    Set_super_pipe_justify(super,0);               // invert justification for polyline pipe string
    Set_super_pipe(super,0.5,0.0,1);              // set the string internal diameter to 0.5 units
//                                                                    // 0 wall thickness 
    Set_colour(super,4);               // cyan in the standard colours.4d
The data could then be loaded into super using repeated calls of
    Set_super_data(super,i,x,y,y,z,r,b);
where (x,y,z) are the coordinates of the ith vertex of super and r and b are the radius and major/
minor arc bulge for the arc between vertex i and vertex i+1.
NOTE: if the dimensions were not set when the super string was first created, then they can be 
created later using the Super_string_use calls. For example
    Set_super_use_3d_level(super,1);         // sets on the Att_ZCoord_Array dimension
    Set_super_use_segment_radius(super,1);   // sets on the Att_Radius_Array dimension
    Set_super_use_pipe(super,1);                // sets on the Att_Diameter_Value dimension
    Set_super_use_pipe_justify(super,1);    // sets on the Att_Pipe_Justify dimension
Checking for a Polyline Pipe Super String
To check if a super string Element, super has a variable z-value, allows a radius for each segment 
between vertices, and a diameter and justification for the string, use the code:
    Integer ret_z_array, use_z_array;
    Integer ret_r_array, use_r_array, ret_f_array, use_f_array;
    Integer ret_diam_value, use_diam_value;
    Integer ret_justification_value, use_justification_value;
Page 597
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_r_array = Get_super_use_segment_radius(super, use_r_array);
// note - setting the super string to have a radius array also forces it to have
// a major/minor arc array
    ret_diam_value = Get_super_use_pipe(super, use_diam_value);
    ret_justification_value = Get_super_use_pipe_justify(super, use_justification_value);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d super string.
If ret_r_array is 0 and use_r_array is 1 (from the Get_super_use_segment_radius call) then the 
super string super has an array of radii for the segments and so is like a polyline string.
If ret_diam_value is 0 and use_diam_value is 1 (from the Get_super_use_pipe call) then the super 
string super has a diameter for the entire string.
If ret_justification_value is 0 and use_justification_value is 1 (from the Get_super_use_pipe_justify 
call) then the super string super has a justification value to use for each vertex of the string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_data(super,i,x,y,z,r,b);
where (x,y,z) are the coordinates of the ith vertex of super and Real r and Integer b will give the 
radius and major/minor arc bulge for the segment from vertex i to vertex i+1.
The diameter for the super string super can be obtained by the call
    Real diameter;
   Get_super_pipe(super,diameter);
The justification for the super string super can be obtained by the call
    integer justify;
   Get_super_pipe_justify(super,justify);
Page 598
Examples of Setting Up Super Strings
 12d Model Macro Manual
5.39.8 4d Super String
A traditional 4d string consists of different (x,y,z) values at each vertex (with straight line segments 
between each vertex) and also a different text at each vertex. So each vertex has the values (x,y,z,t) 
where (x,y,z) are the coordinates of the vertex and t is the text at the vertex.
The 4d string also has drawing information to describe how the text is drawn on a plan view or plot. 
All the text is drawn in the same way.
Creating a 4d Super String with Straight Segments
To defined a super string super with num_vert vertices and different z-values and text at each 
vertex. There are only straight segments between the vertices and all the text is drawn the same 
way: World units will be used for the text size.
    #include "setups.h"
    Element super;
// need dimensions Att_ZCoord_Array (2), Att_Vertex_Text_Array (7),
// Att_Vertex_Annotate_Value (14) and Att_Vertex_World_Annotate (30) to have the value 1
// and all other dimensions are 0
    Integer flag1 = String_Super_Bit(ZCord_Array)|String_Super_Bit(Vertex_Text_Array)
                             |String_Super_Bit(Vertex_Annotate_Value)
                             |String_Super_Bit(Vertex_World_Annotate);
//
    super = Create_super(flag1, num_vert);
    Set_colour(super,4);               // cyan in the standard colours.4d
The drawing information for the text is set by
    Set_super_vertex_text_style(super,1,"Arial");       // 1 is ignored, textstyle "Arial"
    Set_super_vertex_text_colour(super,1,5);         // 1 is ignored, colour number is 5
    Set_super_vertex_text_size(super,1,2.0);         // 1 is ignored, size is 2 world units
The data could then be loaded into super using repeated calls of
    Set_super_vertex_coord(super,i,x,y,z);
    Set_super_vertex_text(super,i,txt);
where (x,y,z) are the coordinates of the ith vertex of super and txt is the Text at vertex i.
NOTE: if the dimensions were not set when the super string was first created, then they can be 
created later using the Super_string_use calls. For example
    Set_super_use_3d_level(super,1);         // sets on the Att_ZCoord_Array dimension
    Set_super_use_vertex_text_array(super,1);   // sets on the Att_Vertex_Text_Array dimension
    Set_super_use_vertex_annotation_value(super,1);   // sets on the
                                                                                //Att_Vertex_Annotate_Value dimension
Checking for a 4d Super String
To check if a super string Element, super, has a variable z-value, use the code:
    Integer ret_z_array, use_z_array, ret_t_array, use_t_array;
Page 599
Examples of Setting Up Super Strings
Chapter 5  12dPL Library Calls
    ret_z_array = Get_super_use_3d(super, use_z_array);
    ret_t_array = Get_super_use_vertex_text_array(super, use_t_array);
If ret_z_array is 0 and use_z_array is 1 (from the Get_super_use_3d call) then the super string 
super has an array of z-values and so is like a 3d super string.
If ret_t_array is 0 and use_t_array is 1 (from the Get_super_use_vertex_text_array call) then the 
super string super also has an array of text values and so is like a 4d string.
The coordinate data can be read out of the super string super using repeated calls of
   Get_super_vertex_coord(super,i,x,y,z);
   Get_super_vertex_text(super,i,txt);
where (x,y,z) are the coordinates of the ith vertex of super, and txt is the Text at the ith vertex.

```

## Arc String Element (§5.41)

---

```
Page 615
Arc String Element
Chapter 5  12dPL Library Calls
5.41 Arc String Element
A 12d Model Arc string is similar to the entity Arc in that it is a helix which projects onto an arc in the 
(x,y) plane.
The Element type Arc has a radius and three dimensional co-ordinates for its centre, start and end 
points. The radius can be positive or negative.
A positive radius indicates that the direction of travel between the start and end points is in the 
clockwise direction (right hand curve).
A negative radius indicates that the direction of travel between the start and end points is in the anti-
clockwise direction (left hand curve).
Unlike the variable of type Arc, the Element arc string has Element header information and can be 
added to 12d Model models. Thus arc strings can be drawn on a 12d Model view and stored in the 
12d Model database.
Create_arc(Arc arc)
Name
Element Create_arc(Arc arc)
Description
Create an Element of type Arc from the Arc arc.
The arc string has the same centre, radius, start and end points as the Arc arc.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 294
Create_arc(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3)
Name
Element Create_arc(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3)
Description
Create an Element of type Arc through three given points.
The arc string has start point (x1,y1,z1), an intermediate point (x2,y2,z2) on the arc and the end 
point (x3,y3,z3).
The centre and radius of the arc will be automatically calculated.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 312
Create_arc(Real xc,Real yc,Real zc,Real rad,Real xs,Real ys,Real zs,Real xe,Real 
ye,Real ze)
Name
Element Create_arc(Real xc,Real yc,Real zc,Real rad,Real xs,Real ys,Real zs,Real xe,Real ye,Real ze)
Description
Page 616
Arc String Element
 12d Model Macro Manual
Create an Element of type Arc with centre (xc,yc,zc), radius rad, start point (xs,ys,zs) and end 
point (xe,ye,ze).
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 296
Create_arc(Real xc,Real yc,Real zc,Real rad,Real xs,Real ys,Real zs,Real xe,Real 
ye,Real ze)
Name
Element Create_arc(Real xc,Real yc,Real zc,Real rad,Real xs,Real ys,Real zs,Real xe,Real ye,Real ze)
Description
Create an Element of type Arc with centre (xc,yc,zc), and radius rad.
The points (xs,ys,zs) and (xe,ye,ze) define the start and end points respectively for the arc. If either 
of the points do not lie on the plan circle with centre (xc,yc) and radius rad, then the point is dropped 
perpendicularly onto the plan circle to define the (x,y) co-ordinates for the relevant start or end point.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 296
Create_arc(Real xc,Real yc,Real zc,Real xs,Real ys,Real zs,Real sweep)
Name
Element Create_arc(Real xc,Real yc,Real zc,Real xs,Real ys,Real zs,Real sweep)
Description
Create an Element of type Arc with centre point (xc,yc,zc), start point (xs,ys,zs) and sweep angle 
sweep.
The absolute radius is calculated as the distance between the centre and start point of the arc. The 
sign of the radius comes from the sweep angle.
The sweep angle is measured in a clockwise direction from the line joining the centre to the arc start 
point. The units for sweep angles are radians.
Hence the sweep angle is measured in radians and a positive value indicates a clockwise direction 
and a positive radius.
The end point of the arc will be automatically created.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 313
Create_arc(Real xc,Real yc,Real zc,Real xs,Real ys,Real zs,Real xe,Real ye,Real 
ze,Integer dir)
Name
Element Create_arc(Real xc,Real yc,Real zc,Real xs,Real ys,Real zs,Real xe,Real ye,Real ze,Integer dir)
Description
Create an Element of type Arc with centre (xc,yc,zc), start point (xs,ys,zs) and end point 
(xe,ye,ze).
Page 617
Arc String Element
Chapter 5  12dPL Library Calls
The absolute radius is calculated as the distance between the centre and start point of the arc.
If dir is positive, the radius is taken to be positive.
If dir is negative, the radius is taken to be negative.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 314
Create_arc_2(Real xs,Real ys,Real zs,Real rad,Real arc_length,Real start_angle)
Name
Element Create_arc_2(Real xs,Real ys,Real zs,Real rad,Real arc_length,Real start_angle)
Description
Create an Element of type Arc with radius rad. The arc starts at the point (xs,ys,zs) with tangent 
angle start_angle and total arc length arc_length.
The centre and end points will be automatically created.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 316
Create_arc_3(Real xs,Real ys,Real zs,Real rad,Real arc_length,Real chord_angle)
Name
Element Create_arc_3(Real xs,Real ys,Real zs,Real rad,Real arc_length,Real chord_angle)
Description
Create an Element of type Arc with radius rad. The arc starts at the point (xs,ys,zs) with a chord 
angle chord_angle and total arc length arc_length.
The centre and end points will be automatically created.
The function return value gives the actual Element created.
If the arc string could not be created, then the returned Element will be null.
ID = 317
Set_arc_centre(Element elt,Real xc,Real yc,Real zc)
Name
Integer Set_arc_centre(Element elt,Real xc,Real yc,Real zc)
Description
Set the centre point of the Arc string given by Element elt to (xc,yc,zc).
The start and end points are also translated by the plan distance between the old and new centre.
A function return value of zero indicates the centre was successfully modified.
ID = 319
Get_arc_centre(Element elt,Real &xc,Real &yc,Real &zc)
Name
Page 618
Arc String Element
 12d Model Macro Manual
Integer Get_arc_centre(Element elt,Real &xc,Real &yc,Real &zc)
Description
Get the centre point for Arc string given by Element elt.
The centre of the arc is (xc,yc,zc).
A function return value of zero indicates the centre was successfully returned.
ID = 318
Set_arc_radius(Element elt,Real rad)
Name
Integer Set_arc_radius(Element elt,Real rad)
Description
Set the radius of the Arc string given by Element elt to rad. The new radius must be non-zero.
The start and end points are projected radially so that they still lie on the arc.
A function return value of zero indicates the radius was successfully modified.
ID = 321
Get_arc_radius(Element elt,Real &rad)
Name
Integer Get_arc_radius(Element elt,Real &rad)
Description
Get the radius for Arc string given by Element elt.
The radius is given by rad.
A function return value of zero indicates the radius was successfully returned.
ID = 320
Set_arc_start(Element elt,Real xs,Real ys,Real zs)
Name
Integer Set_arc_start(Element elt,Real xs,Real ys,Real zs)
Description
Set the start point of the Arc string given by Element elt to (xs,ys,zs).
If the start point does not lie on the arc, then the point (xs,ys,zs) is projected radially onto the arc and 
the projected point taken as the start point.
A function return value of zero indicates the start point was successfully modified.
ID = 323
Get_arc_start(Element elt,Real &xs,Real &ys,Real &zs)
Name
Integer Get_arc_start(Element elt,Real &xs,Real &ys,Real &zs)
Description
Get the start point for Arc string given by Element elt.
Page 619
Arc String Element
Chapter 5  12dPL Library Calls
The start of the arc is (xs,ys,zs).
A function return value of zero indicates that the start point was successfully returned.
ID = 322
Set_arc_end(Element elt,Real xe,Real ye,Real ze)
Name
Integer Set_arc_end(Element elt,Real xe,Real ye,Real ze)
Description
Set the end point of the Arc string given by Element elt to (xe,ye,ze).
If the end point does not lie on the arc, then the point (xe,ye,ze) is projected radially onto the arc and 
the projected point taken as the end point.
A function return value of zero indicates the end point was successfully modified.
ID = 325
Get_arc_end(Element elt,Real &xe,Real &ye,Real &ze)
Name
Integer Get_arc_end(Element elt,Real &xe,Real &ye,Real &ze)
Description
Get the end point for Arc string given by Element elt.
The end of the arc is (xe,ye,ze).
A function return value of zero indicates that the end point was successfully returned.
ID = 324
Set_arc_data(Element elt,Real xc,Real yc,Real zc, Real rad,Real xs,Real ys,Real 
zs,Real xe,Real ye,Real ze)
Name
Integer Set_arc_data(Element elt,Real xc,Real yc,Real zc,Real rad,Real xs,Real ys,Real zs,Real xe,Real 
ye,Real ze)
Description
Set the data for the Arc string given by Element elt.
The arc is given the centre (xc,yc,zc), radius rad and start and end points (xs,ys,zs) and (xe,ye,ze) 
respectively.
A function return value of zero indicates the arc data was successfully set.
ID = 327
Get_arc_data(Element elt,Real &xc,Real &yc,Real &zc,Real &rad,Real &xs,Real 
&ys,Real &zs,Real &xe,Real &ye,Real &ze)
Name
Integer Get_arc_data(Element elt,Real &xc,Real &yc,Real &zc,Real &rad,Real &xs,Real &ys,Real &zs,Real 
&xe,Real &ye,Real &ze)
Description
Get the data for the Arc string given by Element elt.
Page 620
Arc String Element
 12d Model Macro Manual
The arc has centre (xc,yc,zc), radius rad and start and end points (xs,ys,zs) and (xe,ye,ze) 
respectively.
A function return value of zero indicates that the arc date was successfully returned.
ID = 326
Set_arc_interval(Element elt,Real interval)    
Name
Integer Set_arc_interval(Element elt,Real interval)    
Description
Set the chainage interval of the Arc string given by Element elt to interval. 
A function return value of zero indicates the chainage interval was successfully modified.
ID = 2257
Get_arc_interval(Element elt,Real &interval)   
Name
Integer Get_arc_interval(Element elt,Real &interval)    
Description
Get the chainage interval for Arc string given by Element elt and assign to interval.
A function return value of zero indicates the chainage interval was successfully returned.
ID = 2258
Set_arc_chord_arc(Element elt,Real chord_arc)    
Name
Integer Set_arc_chord_arc(Element elt,Real chord_arc)   
Description
Set the chord to arc tolerance for Arc string given by Element elt to chord_arc.
A function return value of zero indicates the tolerance was successfully modified.
ID = 2259
Get_arc_chord_arc(Element elt,Real &chord_arc) 
Name
Integer Get_arc_chord_arc(Element elt,Real &chord_arc)    
Description
Get the chord to arc tolerance for Arc string given by Element elt and assign to chord_arc.
A function return value of zero indicates the tolerance was successfully returned.
ID = 2260

```

## Circle String Element (§5.42)

---

```
Page 621
Circle String Element
Chapter 5  12dPL Library Calls
5.42 Circle String Element
A 12d Model Circle string is a circle in the (x,y) plane with a constant z value (height).
Create_circle(Real xc,Real yc,Real zc,Real rad)
Name
Element Create_circle(Real xc,Real yc,Real zc,Real rad)
Description
Create an Element of type Circle with centre (xc,yc), radius rad and z value (height) zc.
The function return value gives the actual Element created.
If the circle string could not be created, then the returned Element will be null.
ID = 307
Create_circle(Real xc,Real yc,Real zc, Real xp,Real yp,Real zp)
Name
Element Create_circle(Real xc,Real yc,Real zc,Real xp,Real yp,Real zp)
Description
Create an Element of type Circle with centre (xc,yc) and point (xp,yp) on the circle.
The height of the circle is zc.
The radius of the circle will be automatically calculated.
The function return value gives the actual Element created.
If the circle string could not be created, then the returned Element will be null.
 ID = 308
Create_circle(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real 
z3)
Name
Element Create_circle(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3)
Description
Create an Element of type Circle going through the three points (x1,y1), (x2,y2) and (
x3,y3).
The height of the circle is z1.
The centre and radius of the circle will be automatically created.
The function return value gives the actual Element created.
If the circle string could not be created, then the returned Element will be null.
ID = 309
Set_circle_data(Element elt,Real xc,Real yc,Real zc,Real rad)
Name
Page 622
Circle String Element
 12d Model Macro Manual
Integer Set_circle_data(Element elt,Real xc,Real yc,Real zc,Real rad)
Description
Set the data for the Circle string given by Element elt.
The centre of the circle is set to (xc,yc,zc), the height to zc and the radius to rad.
A function return value of zero indicates success.
ID = 311
Get_circle_data(Element elt,Real &xc,Real &yc,Real &zc,Real &rad)
Name
Integer Get_circle_data(Element elt,Real &xc,Real &yc,Real &zc,Real &rad)
Description
Get the data for the Circle string given by Element elt.
The centre of the circle is (xc,yc,zc), height zc
 and radius rad.
A function return value of zero indicates success.
ID = 310

```

## Text String Element (§5.43)

---

```
Page 623
Text String Element
Chapter 5  12dPL Library Calls
5.43 Text String Element
A Text String consists of text positioned with respect to the text vertex point (x,y).
The text is defined by parameters that can be individually set, or set all at once by setting a 
Textstyle_Data. 
The current parameters contained in the Textstyle_Data structure and used for a Text String are:
the text itself, text style, colour, height, offset, raise, justification, angle, slant, xfactor, italic, 
strikeout, underlines, weight, whiteout, border and a name.
The parameters are described in the section 5.9 Textstyle Data
The following functions are used to create new text strings and make inquiries and modifications to 
existing text strings.
Create_text(Text text,Real x,Real y,Real size,Integer colour)
Name
Element Create_text(Text text,Real x,Real y,Real size,Integer colour)
Description
Creates an Element of type Text.
The Element is at position (x,y), has Text text of size size and colour colour. The other data is 
defaulted.
The function return value gives the actual Element created.
If the text string could not be created, then the returned Element will be null.
ID = 174
Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang)
Name
Element Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang)
Description
Creates an Element of type Text.
The Element is at position (x,y), has Text text of size size, colour colour and angle ang. The other 
data is defaulted.
Fred
.
position of
text vertex
the position of the
text justification
point for the text
angle
offset
raise
angle, offset and raise
from the text vertex
is defined by the
Text String
line giving the direction
of the text
Page 624
Text String Element
 12d Model Macro Manual
The function return value gives the actual Element created.
If the text string could not be created, then the returned Element will be null.
ID = 175
Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer justif)
Name
Element Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer justif)
Description
Creates an Element of type Text.
The Element is at position (x,y), has Text text of size size, colour colour, angle ang and justification 
justif. The other data is defaulted.
The function return value gives the actual Element created.
If the text string could not be created, then the returned Element will be null.
ID = 176
Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer justif, 
Integer size_mode)
Name
Element Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer justif,Integer size_mode)
Description
Creates an Element of type Text.
The Element is at position (x,y), has Text text of size size, colour colour, angle ang, justification 
justif and size mode size_mode. The other data is defaulted.
The function return value gives the actual Element created.
If the text string could not be created, then the returned Element will be null.
ID = 177
Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer 
justif,Integer size_mode,Real offset_distance,Real rise_distance)
Name
Element Create_text(Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer justif,Integer 
size_mode,Real offset_distance,Real rise_distance)
Description
Creates an Element of type Text.
The Element is at position (x,y), has Text text of size size, colour colour, angle ang, justification 
justif, size mode size_mode, offset offset_distance and rise rise_distance.
The function return value gives the actual Element created.
If the text string could not be created, then the returned Element will be null.
ID = 178
Set_text_data(Element elt,Text text,Real x,Real y,Real size,Integer colour,Real 
Page 625
Text String Element
Chapter 5  12dPL Library Calls
ang,Integer justif,Integer size_mode,Real offset_distance,Real rise_distance)
Name
Integer Set_text_data(Element elt,Text text,Real x,Real y,Real size,Integer colour,Real ang,Integer 
justif,Integer size_mode,Real offset_distance,Real rise_distance)
Description
Set values for each of the text parameters.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates that the text data was successfully set.
 ID = 180
Get_text_data(Element elt,Text &text,Real &x,Real &y,Real &size,Integer 
&colour,Real &ang,Integer &justification,Integer &size_mode,Real &offset_dist,Real 
&rise_dist)
Name
Integer Get_text_data(Element elt,Text &text,Real &x,Real &y,Real &size,Integer &colour,Real 
&ang,Integer &justification,Integer &size_mode,Real &offset_dist,Real &rise_dist)
Description
Get the values for each of the text parameters.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates that the text data was successfully returned.
ID = 179
Set_text_value(Element elt,Text text)
Name
Integer Set_text_value(Element elt,Text text)
Description
Set the actual text of the text Element elt.
The text is given as Text text.
A function return value of zero indicates the data was successfully set.
ID = 461
Get_text_value(Element elt,Text &text)
Name
Integer Get_text_value(Element elt,Text &text)
Description
Get the actual text of the text Element elt.
The text is returned as Text text.
A function return value of zero indicates the data was successfully returned.
ID = 453
Page 626
Text String Element
 12d Model Macro Manual
Set_text_textstyle_data(Element elt,Textstyle_Data d) 
Name
Integer Set_text_textstyle_data(Element elt,Textstyle_Data d) 
Description
For the Element elt of type Text, set the Textstyle_Data to be d.
Setting a Textstyle_Data means that all the individual values that are contained in the 
Textstyle_Data are set rather than having to set each one individually.
If the value is blank in the Textstyle_Data d then the value in elt would be left alone.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates the Textstyle_Data was successfully set.
ID = 1669
Get_text_textstyle_data(Element elt,Textstyle_Data &d) 
Name
Integer Get_text_textstyle_data(Element elt,Textstyle_Data &d) 
Description
For the Element elt of type Text, get the Textstyle_Data for the string and return it as d.
A non-zero function return value is returned if elt is not of type Text (and also d would be left 
unchanged) .
A function return value of zero indicates the Textstyle_Data was successfully returned.
ID = 1670
Get_text_length(Element elt,Real &length)
Name
Integer Get_text_length(Element elt,Real &length)
Description
Get the length of the characters of the text Element elt.
The text length is returned as Real length.
A function return value of zero indicates the data was successfully returned.
ID = 580
Set_text_xy(Element elt,Real x,Real y)
Name
Integer Set_text_xy(Element elt,Real x,Real y)
Description
Set the base position of for the text Element elt.
The position is given as Real (x,y).
A function return value of zero indicates the data was successfully set.
ID = 462
Page 627
Text String Element
Chapter 5  12dPL Library Calls
Get_text_xy(Element elt,Real &x,Real &y)
Name
Integer Get_text_xy(Element elt,Real &x,Real &y)
Description
Get the base position of for the text Element elt.
The position is returned as Real (x,y).
A function return value of zero indicates the data was successfully returned.
ID = 454
Set_text_xyz(Element elt,Real x,Real y,Real z)
Name
Integer Set_text_xyz(Element elt,Real x,Real y,Real z)
Description
Set the base position of for the text Element elt.
The position is given as Real (x,y,z).
A function return value of zero indicates the data was successfully set.
ID = 462
Get_text_xyz(Element elt,Real &x,Real &y,Real &z)
Name
Integer Get_text_xyz(Element elt,Real &x,Real &y,Real &z)
Description
Get the base position of for the text Element elt.
The position is returned as Real (x,y,z).
A function return value of zero indicates the data was successfully returned.
ID = 454
Set_text_units(Element elt,Integer units_mode)
Name
Integer Set_text_units(Element elt,Integer units_mode)
Description
Set the units used for the text parameters of the text Element elt.
The mode is given as Integer units_mode.
For the values of units_mode, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 466
Get_text_units(Element elt,Integer &units_mode)
Name
Integer Get_text_units(Element elt,Integer &units_mode)
Page 628
Text String Element
 12d Model Macro Manual
Description
Get the units used for the text parameters of the text Element elt.
The mode is returned as Integer units_mode.
For the values of units_mode, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 458
Set_text_size(Element elt,Real size)
Name
Integer Set_text_size(Element elt,Real size)
Description
Set the size of the characters of the text Element elt.
The text size is returned as Real size.
A function return value of zero indicates the data was successfully set.
ID = 463
Get_text_size(Element elt,Real &size)
Name
Integer Get_text_size(Element elt,Real &size)
Description
Get the size of the characters of the text Element elt.
The text size is returned as Real size.
A function return value of zero indicates the data was successfully returned.
ID = 455
Set_text_justify(Element elt,Integer justify)
Name
Integer Set_text_justify(Element elt,Integer justify)
Description
Set the justification used for the text Element elt.
The justification is given as Integer justify.
For the values of justify and their meaning, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 465
Get_text_justify(Element elt,Integer &justify)
Name
Integer Get_text_justify(Element elt,Integer &justify)
Description
Page 629
Text String Element
Chapter 5  12dPL Library Calls
Get the justification used for the text Element elt.
The justification is returned as Integer justify.
For the values of justify and their meaning, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 457
Set_text_angle(Element elt,Real ang)
Name
Integer Set_text_angle(Element elt,Real ang)
Description
Set the angle of rotation (in radians) about the text (x,y) point of the text Element elt.
The angle is given as Real ang.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 464
Get_text_angle(Element elt,Real &ang)
Name
Integer Get_text_angle(Element elt,Real &ang)
Description
Get the angle of rotation (in radians) about the text (x,y) point of the text Element elt and return the 
angle as ang.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 456
Set_text_angle2(Element elt,Real ang2)
Name
Integer Set_text_angle2(Element elt,Real ang2)
Description
Set the 3D beta angle (in radians) about the text (x,y) point of the text Element elt.
The angle is given as Real ang2.
A function return value of zero indicates the data was successfully set.
ID = 3579
Get_text_angle2(Element elt,Real &ang2)
Name
Integer Get_text_angle2(Element elt,Real &ang2)
Description
Page 630
Text String Element
 12d Model Macro Manual
Get the 3D beta angle (in radians) about the text (x,y) point of the text Element elt and return the 
angle as ang2.
A function return value of zero indicates the data was successfully returned.
ID = 3576
Set_text_angle3(Element elt,Real ang3)
Name
Integer Set_text_angle3(Element elt,Real ang3)
Description
Set the 3D gamma angle (in radians) about the text (x,y) point of the text Element elt.
The angle is given as Real ang3.
A function return value of zero indicates the data was successfully set.
ID = 3580
Get_text_angle3(Element elt,Real &ang3)
Name
Integer Get_text_angle3(Element elt,Real &ang3)
Description
Get the 3D gamma angle (in radians) about the text (x,y) point of the text Element elt and return the 
angle as ang3.
A function return value of zero indicates the data was successfully returned.
ID = 3577
Set_text_offset(Element elt,Real offset)
Name
Integer Set_text_offset(Element elt,Real offset)
Description
Set the offset distance of the text Element elt.
The offset is given as Real offset.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 467
Get_text_offset(Element elt,Real &offset)
Name
Integer Get_text_offset(Element elt,Real &offset)
Description
Get the offset distance of the text Element elt.
The offset is returned as Real offset.
For a diagram, see 5.9 Textstyle Data.
Page 631
Text String Element
Chapter 5  12dPL Library Calls
A function return value of zero indicates the data was successfully returned.
ID = 459
Set_text_rise(Element elt,Real rise)
Name
Integer Set_text_rise(Element elt,Real rise)
Description
Set the rise distance of the text Element elt.
The rise is returned as Real rise.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 468
Get_text_rise(Element elt,Real &rise)
Name
Integer Get_text_rise(Element elt,Real &rise)
Description
Get the rise distance of the text Element elt.
The rise is returned as Real rise.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
 ID = 460
Set_text_height(Element elt,Real height)
Name
Integer Set_text_height(Element elt,Real height)
Description
Set the height of the characters of the text Element elt.
The text height is given as Real height.
A function return value of zero indicates the data was successfully set.
ID = 584
Get_text_height(Element elt,Real &height)
Name
Integer Get_text_height(Element elt,Real &height)
Description
Get the height of the characters of the text Element elt.
The text height is returned as Real height.
A function return value of zero indicates the data was successfully returned.
Page 632
Text String Element
 12d Model Macro Manual
ID = 579
Set_text_slant(Element elt,Real slant)
Name
Integer Set_text_slant(Element elt,Real slant)
Description
Set the slant of the characters of the text Element elt.
The text slant is given as Real slant.
Note that the value of slant is measured as tangent here, where in 12da the value is writen in 
decimal angle.
The valid value for slant much be at least -1 and at most 1 (as the angle much be between -45 to 45 
degree).
A function return value of zero indicates the data was successfully set.
ID = 585
Get_text_slant(Element elt,Real &slant)
Name
Integer Get_text_slant(Element elt,Real &slant)
Description
Get the slant of the characters of the text Element elt.
The text slant is returned as Real slant.
Note that the value of slant is measured as tangent here, where in 12da the value is writen in 
decimal angle.
A function return value of zero indicates the data was successfully returned.
ID = 581
Set_text_style(Element elt,Text style)
Name
Integer Set_text_style(Element elt,Text style)
Description
Set the style of the characters of the text Element elt.
The text style is given as Text style.
A function return value of zero indicates the data was successfully set.
ID = 587
Get_text_style(Element elt,Text &style)
Name
Integer Get_text_style(Element elt,Text &style)
Description
Get the style of the characters of the text Element elt.
Page 633
Text String Element
Chapter 5  12dPL Library Calls
The text style is returned as Text style.
A function return value of zero indicates the data was successfully returned.
ID = 583
Set_text_x_factor(Element elt,Real xfact)
Name
Integer Set_text_x_factor(Element elt,Real xfact)
Description
Set the x factor of the characters of the text Element elt.
The text x factor is given as Real xfact.
A function return value of zero indicates the data was successfully set.
ID = 586
Get_text_x_factor(Element elt,Real &xfact)
Name
Integer Get_text_x_factor(Element elt,Real &xfact)
Description
Get the x factor of the characters of the text Element elt.
The text x factor is returned as Real xfact.
A function return value of zero indicates the data was successfully returned.
ID = 582
Set_text_ttf_underline(Element elt,Integer underline)   
Name
Integer Set_text_ttf_underline(Element elt,Integer underline) 
Description
For the Element elt of type Text, set the underline state to underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates underlined was successfully set.
ID = 2596
Get_text_ttf_underline(Element elt,Integer &underline)   
Name
Integer Get_text_ttf_underline(Element elt,Integer &underline) 
Description
For the Element elt of type Text, get the underline state and return it in underline.
Page 634
Text String Element
 12d Model Macro Manual
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates underlined was successfully returned.
ID = 2592
Set_text_ttf_strikeout(Element elt,Integer strikeout) 
Name
Integer Set_text_ttf_strikeout(Element elt,Integer strikeout)   
Description
For the Element elt of type Text, set the strikeout state to strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates strikeout was successfully set.
 ID = 2597
Get_text_ttf_strikeout(Element elt,Integer &strikeout)
Name
Integer Get_text_ttf_strikeout(Element elt,Integer &strikeout) 
Description
For the Element elt of type Text, get the strikeout state and return it in strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates strikeout was successfully returned.
ID = 2593
 Set_text_ttf_italic(Element elt,Integer italic) 
Name
Integer Set_text_ttf_italic(Element elt,Integer italic)   
Description
For the Element elt of type Text, set the italic state to italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates italic was successfully set.
Page 635
Text String Element
Chapter 5  12dPL Library Calls
ID = 2598
Get_text_ttf_italic(Element elt,Integer &italic)
Name
Integer Get_text_ttf_italic(Element elt,Integer &italic) 
Description
For the Element elt of type Text, get the italic state and return it in italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates italic was successfully returned.
ID = 2594
Set_text_ttf_outline(Element elt,Integer outline) 
Name
Integer Set_text_ttf_outline(Element elt,Integer outline)   
Description
For the Element elt of type Text, set the outline state to outline.
If outline = 1, then for a true type font the text will be only shown in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates outline was successfully set.
 ID = 2772
Get_text_ttf_outline(Element elt,Integer &outline)   
Name
Integer Get_text_ttf_outline(Element elt,Integer &outline)   
Description
For the Element elt of type Text, get the outline state and return it in outline.
If outline = 1, then for a true type font the text will be shown only in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates outline was successfully returned.
ID = 2771
Set_text_ttf_weight(Element elt,Integer weight) 
Name
Page 636
Text String Element
 12d Model Macro Manual
Integer Set_text_ttf_weight(Element elt,Integer weight)
Description
For the Element elt of type Text, set the font weight to weight.
For the list of allowable weights, go to  Allowable Weights
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates weight was successfully set.
ID = 2599
Get_text_ttf_weight(Element elt,Integer &weight) 
Name
Integer Get_text_ttf_weight(Element elt,Integer &weight) 
Description
For the Element elt of type Text, get the font weight and return it in weight.
For the list of allowable weights, go to  Allowable Weights
A non-zero function return value is returned if elt is not of type Text.
A function return value of zero indicates weight was successfully returned.
 ID = 2595
Set_text_whiteout(Element text,Integer colour) 
Name
Integer Set_text_whiteout(Element text,Integer colour) 
Description
For the Text Element text, set the colour number of the colour used for the whiteout box around the 
text, to be colour.
If no text whiteout is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully set.
ID = 2752
Get_text_whiteout(Element text,Integer &colour)
Name
Integer Get_text_whiteout(Element text,Integer &colour) 
Description
For the Text Element text, get the colour number that is used for the whiteout box around the text. 
The whiteout colour is returned as Integer colour.
NO_COLOUR is the returned as the colour number if whiteout is not being used.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
Page 637
Text String Element
Chapter 5  12dPL Library Calls
ID = 2751
Set_text_border(Element text,Integer colour)
Name
Integer Set_text_border(Element text,Integer colour) 
Description
For the Text Element text, set the colour number of the colour used for the border of the whiteout 
box around the text, to be colour.
If no whiteout border is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully set.
ID = 2762
Get_text_border(Element text,Integer &colour)
Name
Integer Get_text_border(Element text,Integer &colour) 
Description
For the Text Element text, get the colour number that is used for the border of the whiteout box 
around the text. The whiteout border colour is returned as Integer colour.
NO_COLOUR is the returned as the colour number if there is no whiteout border.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff)
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
ID = 2761
Set_text_border_style(Element text,Integer style)
Name
Integer Set_text_border_style(Element text,Integer style) 
Description
For the Text Element text, set the the border style that is used for the border of the whiteout box 
around the text accordingly to Integer style.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
Page 638
Text String Element
 12d Model Macro Manual
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the border style was successfully set.
ID = 3581
Get_text_border_style(Element text,Integer &style)
Name
Integer Get_text_border_style(Element text,Integer &style) 
Description
For the Text Element text, get the border style that is used for the border of the whiteout box around 
the text. The border style is returned as Integer style.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
ID = 3578

```

## Pipeline String Element (§5.44)

---

```
Page 639
Pipeline String Element
Chapter 5  12dPL Library Calls
5.44 Pipeline String Element
Integer Create_pipeline()
Name
Integer Create_pipeline()
Description
Create a pipeline.
A function return value of zero indicates the pipeline was created successfully.
ID = 1264
Create_pipeline(Element seed)
Name
 Integer Create_pipeline(Element seed)
Description
Create an Element of type Pipeline, and set the colour, name, style etc. of the new string to be the 
same as those from the Element seed.
A function return value of zero indicates the pipeline was created successfully.
ID = 1265
Set_pipeline_diameter(Element pipeline,Real diameter)
Name
 Integer Set_pipeline_diameter(Element pipeline,Real diameter)
Description
Set the diameter for pipeline.
Type of the diameter must be Real.
A function return value of zero indicates the diameter was successfully set.
ID = 1266
Get_pipeline_diameter(Element pipeline,Real &diameter)
Name
 Integer Get_pipeline_diameter(Element pipeline,Real &diameter)
Description
Get the diameter from the Element pipeline.
The type of diameter must be Real.
A function return value of zero indicates the diameter was returned successfully.
ID = 1268
Set_pipeline_length(Element pipeline,Real length)
Page 640
Pipeline String Element
 12d Model Macro Manual
Name
 Integer Set_pipeline_length(Element pipeline,Real length)
Description
Set the length for pipeline.
Type of the length must be Real.
A function return value of zero indicates the length was successfully set.
ID = 1267
Get_pipeline_length(Element pipeline,Real &length)
Name
 Integer Get_pipeline_length(Element pipeline,Real &length)
Description
Get the length from the Element pipeline.
The type of length must be Real.
A function return value of zero indicates the length was returned successfully.
ID = 1269
Set_pipeline_shape(Element pipeline,Integer shape)
Name
Integer Set_pipeline_shape(Element pipeline,Integer shape)
Description
Set shape shape of a pipeline Element pipeline 
A return value of zero indicates the function call was successful. 
List of values for shape
0 no pipe nor culvert 
1 pipe 
2 culvert
ID = 3024
Get_pipeline_shape(Element pipeline,Integer &shape)
Name
Integer Get_pipeline_shape(Element pipeline,Integer &shape)
Description
Get shape shape of a pipeline Element pipeline 
A return value of zero indicates the function call was successful. 
List of values for shape
0 no pipe nor culvert 
1 pipe 
2 culvert
Page 641
Pipeline String Element
Chapter 5  12dPL Library Calls
ID = 3025
Set_pipeline_justification(Element pipeline,Integer justification)
Name
Integer Set_pipeline_justification(Element pipeline,Integer justification)
Description
Set pipe culvert justification justification of a pipeline Element pipeline 
A return value of zero indicates the function call was successful. 
List of values for justification
0 invert 
1 centre 
2 obvert 
ID = 3026
Get_pipeline_justification(Element pipeline,Integer &justification)
Name
Integer Get_pipeline_justification(Element pipeline,Integer &justification)
Description
Get pipe culvert justification justification of a pipeline Element pipeline 
A return value of zero indicates the function call was successful. 
List of values for justification
0 invert 
1 centre 
2 obvert 
ID = 3027
Set_pipeline_culvert(Element pipeline,Real w,Real h)
Name
Integer Set_pipeline_culvert(Element pipeline,Real w,Real h)
Description
Set pipe culvert width w and height h of a pipeline Element pipeline 
A return value of zero indicates the function call was successful. 
ID = 3028
Get_pipeline_culvert(Element pipeline,Real &w,Real &h)
Name
Integer Get_pipeline_culvert(Element pipeline,Real &w,Real &h)
Description
Get pipe culvert width w and height h of a pipeline Element pipeline 
Page 642
Pipeline String Element
 12d Model Macro Manual
A return value of zero indicates the function call was successful. 
ID = 3029

```

## Legacy String Types — Strings Replaced by Super Strings (§5.53)

---

```
Page 841
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
5.53 Strings Replaced by Super Strings
From 12d Model 9 onwards, super strings are replacing many of the earlier string types used in 
earlier versions of 12d Model.
See 5.53.1 2d Strings
See 5.53.2 3d Strings
See 5.53.3 4d Strings
See 5.53.4 Pipe Strings
See 5.53.5 Polyline Strings
Page 842
Strings Replaced by Super Strings
 12d Model Macro Manual
5.53.1 2d Strings
A 2d string consists of (x,y) values at each point of the string and a constant height for the entire 
string.
The following functions are used to create new 2d strings and make inquiries and modifications to 
existing 2d strings.
Note: From 12d Model 9 onwards, 2d strings have been replaced by Super strings.
For setting up a Super 2d String rather than the superseded 2d string see 5.39.1 2d Super String.
Create_2d(Real x[],Real y[],Real zvalue,Integer num_pts)
Name
Element Create_2d(Real x[],Real y[],Real zvalue,Integer num_pts)
Description
Create an Element of type 2d.
The Element has num_pts points with (x,y) values given in the Real arrays x[] and y[].
The height of the string is given by the Real zvalue.
The function return value gives the actual Element created.
If the 2d string could not be created, then the returned Element will be null.
ID = 77
Create_2d(Integer num_pts)
Name
Element Create_2d(Integer num_pts)
Description
Create an Element of type 2d with room for num_pts (x,y) points.
The actual x and y values and the height of the 2d string are set after the string is created.
If the 2d string could not be created, then the returned Element will be null.
ID = 448
Create_2d(Integer num_pts,Element seed)
Name
Element Create_2d(Integer num_pts,Element seed)
Description
Create an Element of type 2d with room for num_pts (x,y) points, and set the colour, name, style 
etc. of the new string to be the same as those from the Element seed.
The actual x and y values and the height of the 2d string are set after the string is created.
If the 2d string could not be created, then the returned Element will be null.
ID = 665
Get_2d_data(Element elt,Real x[],Real y[],Real &zvalue,Integer max_pts,Integer 
&num_pts)
Name
Integer Get_2d_data(Element elt,Real x[],Real y[],Real &zvalue,Integer max_pts,Integer &num_pts)
Page 843
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Description
Get the string height and the (x,y) data for the first max_pts points of the 2d Element elt.
The x and y values at each string point are returned in the Real arrays x[] and y[].
The maximum number of points that can be returned is given by max_pts (usually the size of the 
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and 
the number of points in the string.
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
The height of the 2d string is returned in the Real zvalue.
If the Element elt is not of type 2d, then num_pts is returned as zero and the function return value is 
set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
ID = 69
Get_2d_data(Element elt,Real x[],Real y[],Real &zvalue,Integer max_pt,Integer 
&num_pts,Integer start_pt)
Name
Integer Get_2d_data(Element elt,Real x[],Real y[],Real &zvalue,Integer max_pt,Integer &num_pts,Integer 
start_pt)
Description
For a 2d Element elt, get the string height and the (x,y) data for max_pts points starting at point 
number start_pt.
This routine allows the user to return the data from a 2d string in user specified chunks. This is 
necessary if the number of points in the string is greater than the size of the arrays available to 
contain the information.
As in the previous function, the maximum number of points that can be returned is given by max_pts 
(usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point 
one.
The (x,y) values at each string point are returned in the Real arrays x[] and y[].
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
The height of the 2d string is returned in the Real zvalue.
If the Element elt is not of type 2d, then num_pts is set to zero and the function return value is set to 
a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
A start_pt of one gives the same result as for the previous function.
ID = 70
Get_2d_data(Element elt,Integer i,Real &x,Real &y)
Name
Integer Get_2d_data(Element elt,Integer i,Real &x,Real &y)
Page 844
Strings Replaced by Super Strings
 12d Model Macro Manual
Description
Get the (x,y) data for the ith point of the string.
The x value is returned in Real x.
The y value is returned in Real y.
A function return value of zero indicates the data was successfully returned.
ID = 73
Get_2d_data(Element elt,Real &z)
Name
Integer Get_2d_data(Element elt,Real &z)
Description
Get the height of the 2d string given by Element elt.
The height of the string is returned in Real z.
A function return value of zero indicates the height was successfully returned.
ID = 75
Set_2d_data(Element elt,Real x[],Real y[],Integer num_pts)
Name
Integer Set_2d_data(Element elt,Real x[],Real y[],Integer num_pts)
Description
Set the (x,y) data for the first num_pts points of the 2d Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y) values at each string point are given in the Real arrays x[] and y[].
The number of points to be set is given by Integer num_pts
If the Element elt is not of type 2d, then nothing is modified and the function return value is set to a 
non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new 2d Elements - it only modifies existing 2d Elements.
ID = 71
Set_2d_data(Element elt,Real x[],Real y[],Integer num_pts,Integer start_pt)
Name
Integer Set_2d_data(Element elt,Real x[],Real y[],Integer num_pts,Integer start_pt)
Description
For the 2d Element elt, set the (x,y) data for num_pts points starting at point number start_pt.
This function allows the user to modify a large number of points of the string in one call starting at 
point number start_pt rather than point one.
The maximum number of points that can be set is given by the difference between the number of 
points in the string and the value of start_pt.
Page 845
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
The (x,y) values for the string points are given in the Real arrays x[] and y[].
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type 2d, then nothing is modified and the function return value is set to a 
non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new 2d Elements but only modify existing 2d Elements.
ID = 72
Set_2d_data(Element elt,Integer i,Real x,Real y)
Name
Integer Set_2d_data(Element elt,Integer i,Real x,Real y)
Description
Set the (x,y) data for the ith point of the string.
The x value is given in Real x.
The y value is given in Real y.
A function return value of zero indicates the data was successfully set.
ID = 74
Set_2d_data(Element elt,Real z)
Name
Integer Set_2d_data(Element elt,Real z)
Description
Modify the height of the 2d Element elt.
The new height is given in the Real z.
A function return value of zero indicates the height was successfully set.
ID = 76
Page 846
Strings Replaced by Super Strings
 12d Model Macro Manual
5.53.2 3d Strings
A 3d string consists of (x,y,z) values at each point of the string.
The following functions are used to create new 3d strings and make inquiries and modifications to 
existing 3d strings.
Note: From 12d Model 9 onwards, 3d strings have been replaced by Super strings.
For setting up a Super 3d String rather than the superseded 3d string see 5.39.3 3d Super String.
Create_3d(Line line)
Name
Element Create_3d(Line line)
Description
Create an Element of type 3d from the Line line.
The created Element will have two points with co-ordinates equal to the end points of the Line line.
The function return value gives the actual Element created.
If the 3d string could not be created, then the returned Element will be null.
ID = 295
Create_3d(Real x[],Real y[],Real z[],Integer num_pts)
Name
Element Create_3d(Real x[],Real y[],Real z[],Integer num_pts)
Description
Create an Element of type 3d.
The Element has num_pts points with (x,y,z) values given in the Real arrays x[], y[] and z[].
The function return value gives the actual Element created.
If the 3d string could not be created, then the returned Element will be null.
ID = 84
Create_3d(Integer num_pts)
Name
Element Create_3d(Integer num_pts)
Description
Create an Element of type 3d with room for num_pts (x,y,z) points.
The actual x, y and z values of the 3d string are set after the string is created.
If the 3d string could not be created, then the returned Element will be null.
ID = 449
Create_3d(Integer num_pts,Element seed)
Name
Element Create_3d(Integer num_pts,Element seed)
Description
Page 847
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Create an Element of type 3d with room for num_pts (x,y) points, and set the colour, name, style 
etc. of the new string to be the same as those from the Element seed.
The actual x, y and z values of the 3d string are set after the string is created.
If the 3d string could not be created, then the returned Element will be null.
ID = 666
Get_3d_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer 
&num_pts)
Name
Integer Get_3d_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts)
Description
Get the (x,y,z) data for the first max_pts points of the 3d Element elt.
The (x,y,z) values at each string point are returned in the Real arrays x[], y[] and z[].
The maximum number of points that can be returned is given by max_pts (usually the size of the 
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and 
the number of points in the string.
The actual number of points returned is returned by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type 3d, then num_pts is returned as zero and the function return value is 
set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Get_3d_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer 
&num_pts,Integer start_pt)
Name
Integer Get_3d_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts,Integer 
start_pt)
Description
For a 3d Element elt, get the (x,y,z) data for max_pts points starting at point number start_pt.
This routine allows the user to return the data from a 3d string in user specified chunks. This is 
necessary if the number of points in the string is greater than the size of the arrays available to 
contain the information.
As in the previous function, the maximum number of points that can be returned is given by 
max_pts (usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point 
one.
The (x,y,z) values at each string point are returned in the Real arrays x[], y[] and z[].
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type 3d, then num_pts is set to zero and the function return value is set 
to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
Page 848
Strings Replaced by Super Strings
 12d Model Macro Manual
A start_pt of one gives the same result as for the previous function.
Get_3d_data(Element elt,Integer i, Real &x,Real &y,Real &z)
Name
Integer Get_3d_data(Element elt,Integer i, Real &x,Real &y,Real &z)
Description
Get the (x,y,z) data for the ith point of the string.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
A function return value of zero indicates the data was successfully returned.
Set_3d_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)
Name
Integer Set_3d_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)
Description
Set the (x,y,z) data for the first num_pts points of the 3d Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y,z) values for each string point are given in the Real arrays x[], y[] and z[].
The number of points to be set is given by Integer num_pts
If the Element elt is not of type 3d, then nothing is modified and the function return value is set to a 
non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new 3d Elements but only modify existing 3d Elements.
ID = 80
Set_3d_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer start_pt)
Name
Integer Set_3d_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer start_pt)
Description
For the 3d Element elt, set the (x,y,z) data for num_pts points, starting at point number start_pt.
This function allows the user to modify a large number of points of the string in one call starting at 
point number start_pt rather than point one.
The maximum number of points that can be set is given by the difference between the number of 
points in the string and the value of start_pt.
The (x,y,z) values for the string points are given in the Real arrays x[], y[] and z[].
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type 3d, then nothing is modified and the function return value is set to a 
Page 849
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
non-
zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new 3d Elements but only modify existing 3d Elements.
Set_3d_data(Element elt,Integer i,Real x,Real y,Real z)
Name
Integer Set_3d_data(Element elt,Integer i,Real x,Real y,Real z)
Description
Set the (x,y,z) data for the ith point of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
A function return value of zero indicates the data was successfully set.
ID = 83 
Page 850
Strings Replaced by Super Strings
 12d Model Macro Manual
5.53.3 4d Strings
A 4d string consists of (x,y,z,text) values at each vertex of the 4d string.
All the texts in a 4d string have the same text parameters and the parameters can be individually 
set, or all set at once by setting a Textstyle_Data.
The current parameters contained in the Textstyle_Data structure and used for the texts of a 4d 
String are:
the text itself, text style, colour, height, offset, raise, justification, angle, slant, xfactor, italic, 
strikeout, underlines, weight, whiteout, border and a name.
The parameters are described in the section 5.9 Textstyle Data
The following functions are used to create new 4d strings and make inquiries and modifications to 
existing 4d strings.
Note: From 12d Model 9 onwards, 4d strings have been replaced by Super strings.
For setting up a Super 4d String rather than the superseded 4d string see 5.39.8 4d Super String.
Create_4d(Real x[],Real y[],Real z[],Text t[],Integer num_pts)
Name
Element Create_4d(Real x[],Real y[],Real z[],Text t[],Integer num_pts)
Description
Create an Element of type 4d. The Element has num_pts points with (x,y,z,text) values given in the 
Real arrays x[], y[], z[] and Text array t[].
The function return value gives the actual Element created.
If the 4d string could not be created, then the returned Element will be null.
ID = 91
Create_4d(Integer num_pts)
Name
Element Create_4d(Integer num_pts)
Description
Create an Element of type 4d with room for num_pts (x,y,z,text) points.
The actual x, y, z and text values of the 4d string are set after the string is created.
Fred
.
position of
4d string vertex
the position of the
text justification
point for the text
angle
offset
raise
angle, offset and raise
from the 4d string vertex
is defined by the
4d String
line giving the direction
of the text
Page 851
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
If the 4d string could not be created, then the returned Element will be null.
ID = 450
Create_4d(Integer num_pts,Element seed)
Name
Element Create_4d(Integer num_pts,Element seed)
Description
Create an Element of type 4d with room for num_pts (x,y) points, and set the colour, name, style 
etc. of the new string to be the same as those from the Element seed.
The actual x, y, z and text values of the 4d string are set after the string is created.
If the 4d string could not be created, then the returned Element will be null.
ID = 667
Set_4d_data(Element elt,Real x[],Real y[],Real z[], Text t[],Integer num_pts)
Name
Integer Set_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer num_pts)
Description
Set the (x,y,z,text) data for the first num_pts points of the 4d Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y,z,text) values at each string point are given in the Real arrays x[], y[], z[] and Text array t[].
The number of points to be set is given by Integer num_pts
If the Element elt is not of type 4d, then nothing is modified and the function return value is set to a 
non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new 4d Elements but only modify existing 4d Elements.
ID = 87
Set_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer num_pts,Integer 
start_pt)
Name
Integer Set_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer num_pts,Integer start_pt)
Description
For the 4d Element elt, set the (x,y,z,text) data for num_pts points, starting at point number 
start_pt.
This function allows the user to modify a large number of points of the string in one call starting at 
point number start_pt rather than point one.
The maximum number of points that can be set is given by the difference between the number of 
points in the string and the value of start_pt.
The (x,y,z,text) values for the string points are given in the Real arrays x[], y[], z[] and Text array t[].
Page 852
Strings Replaced by Super Strings
 12d Model Macro Manual
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type 4d, then nothing is modified and the function return value is set to a 
non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new 4d Elements but only modify existing 4d Elements.
 ID = 88
Set_4d_data(Element elt,Integer i,Real x,Real y,Real z,Text t)
Name
Integer Set_4d_data(Element elt,Integer i,Real x,Real y,Real z,Text t)
Description
Set the (x,y,z,text) data for the ith point of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
The text value is given in Text t.
A function return value of zero indicates the data was successfully set.
ID = 90
Get_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer max_pts,Integer 
&num_pts)
Name
Integer Get_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer max_pts,Integer &num_pts)
Description
Get the (x,y,z,text) data for the first max_pts points of the 4d Element elt.
The (x,y,z,text) values at each string point are returned in the Real arrays x[], y[], z[] and Text array 
t[].
The maximum number of points that can be returned is given by max_pts (usually the size of the 
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and 
the number of points in the string.
The actual number of points returned is returned by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type 4d, then num_pts is set to zero and the function return value is set 
to a non-zero value.
A function return value of zero indicates the data was successfully returned.
ID = 85
Get_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer max_pts,Integer 
&num_pts,Integer start_pt)
Page 853
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Name
Integer Get_4d_data(Element elt,Real x[],Real y[],Real z[],Text t[],Integer max_pts,Integer 
&num_pts,Integer start_pt)
Description
For a 4d Element elt, get the (x,y,z,text) data for max_pts points starting at point number start_pt.
This routine allows the user to return the data from a 4d string in user specified chunks. This is 
necessary if the number of points in the string is greater than the size of the arrays available to 
contain the information.
As in the previous function, the maximum number of points that can be returned is given by 
max_pts (usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point 
one.
The (x,y,z,text) values at each string point are returned in the Real arrays x[], y[], z[] and Text array 
t[].
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type 4d, then num_pts is returned as zero and the function return value is 
set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
A start_pt of one gives the same result as for the previous function.
ID = 86
Get_4d_data(Element elt,Integer i,Real &x,Real &y,Real &z,Text &t)
Name
Integer Get_4d_data(Element elt,Integer i,Real &x,Real &y,Real &z,Text &t)
Description
Get the (x,y,z,text) data for the ith point of the string.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
The text value is returned in Text t.
A function return value of zero indicates the data was successfully returned.
ID = 89
Set_4d_textstyle_data(Element elt,Textstyle_Data d) 
Name
Integer Set_4d_textstyle_data(Element elt,Textstyle_Data d) 
Description
For the Element elt of type 4d, set the Textstyle_Data to be d.
Setting a Textstyle_Data means that all the individual values that are contained in the 
Textstyle_Data are set rather than having to set each one individually.
Page 854
Strings Replaced by Super Strings
 12d Model Macro Manual
If the value is blank in the Textstyle_Data d then the value in the 4d string would be left unchanged.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates the Textstyle_Data was successfully set.
ID = 1667
Get_4d_textstyle_data(Element elt,Textstyle_Data &d) 
Name
Integer Get_4d_textstyle_data(Element elt,Textstyle_Data &d) 
Description
For the Element elt of type 4d, get the Textstyle_Data for the string and return it as d.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates the Textstyle_Data was successfully returned.
ID = 1668
Set_4d_units(Element elt,Integer units_mode)
Name
Integer Set_4d_units(Element elt,Integer units_mode)
Description
Set the units used for the text parameters of the 4d Element elt.
The mode is given as Integer units_mode.
For the values of units_mode, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 447
Get_4d_units(Element elt,Integer &units_mode)
Name
Integer Get_4d_units(Element elt,Integer &units_mode)
Description
Get the units used for the text parameters of the 4d Element elt.
The mode is returned as Integer units_mode.
For the values of units_mode, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 441
Set_4d_size(Element elt,Real size)
Name
Integer Set_4d_size(Element elt,Real size)
Description
Set the size of the characters of the 4d text of the Element elt.
Page 855
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
The text size is given as Real size.
A function return value of zero indicates the data was successfully set.
ID = 442
Get_4d_size(Element elt,Real &size)
Name
Integer Get_4d_size(Element elt,Real &size)
Description
Get the size of the characters of the 4d text of the Element elt.
The text size is returned as Real size.
A function return value of zero indicates the data was successfully returned.
ID = 436
Set_4d_justify(Element elt,Integer justify)
Name
Integer Set_4d_justify(Element elt,Integer justify)
Description
Set the justification used for the text parameters of the 4d Element elt.
The justification is given as Integer justify.
For the values of justify and their meaning, see 5.9 Textstyle Data.
A function return vale of zero indicates the data was successfully set.
ID = 446
Get_4d_justify(Element elt,Integer &justify)
Name
Integer Get_4d_justify(Element elt,Integer &justify)
Description
Get the justification used for the text parameters of the 4d Element elt.
The justification is returned as Integer justify.
For the values of justify and their meaning, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 440
Set_4d_angle(Element elt,Real angle)
Name
Integer Set_4d_angle(Element elt,Real angle)
Description
Set the angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d Element elt.
The angle is given as Real angle.
Page 856
Strings Replaced by Super Strings
 12d Model Macro Manual
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 445
Get_4d_angle(Element elt,Real &angle)
Name
Integer Get_4d_angle(Element elt,Real &angle)
Description
Get the angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d Element elt. 
angle is measured in an anti-clockwise direction from the horizontal axis. 
The angle is returned as Real angle.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 439
Set_4d_angle2(Element elt,Real angle2)
Name
Integer Set_4d_angle2(Element elt,Real angle2)
Description
Set the 3D beta angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d Element 
elt.
The angle is given as Real angle2.
A function return value of zero indicates the data was successfully set.
ID = 3573
Get_4d_angle2(Element elt,Real &angle2)
Name
Integer Get_4d_angle2(Element elt,Real &angle2)
Description
Get the 3D beta angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d Element 
elt.. 
The angle is returned as Real angle2.
A function return value of zero indicates the data was successfully returned.
ID = 3570
Set_4d_angle3(Element elt,Real angle3)
Name
Integer Set_4d_angle3(Element elt,Real angle3)
Description
Set the 3D gamma angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d 
Element elt.
Page 857
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
The angle is given as Real angle3.
A function return value of zero indicates the data was successfully set.
ID = 3574
Get_4d_angle3(Element elt,Real &angle3)
Name
Integer Get_4d_angle2(Element elt,Real &angle3)
Description
Get the 3D gamma angle of rotation (in radians) about each 4d point (x,y) of the text of the 4d 
Element elt. 
The angle is returned as Real angle2.
A function return value of zero indicates the data was successfully returned.
ID = 3571
Set_4d_offset(Element elt,Real offset)
Name
Integer Set_4d_offset(Element elt,Real offset)
Description
Set the offset distance of the text to be used for each 4d point (x,y) for the 4d Element elt.
The offset is returned as Real offset.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 443
Get_4d_offset(Element elt,Real &offset)
Name
Integer Get_4d_offset(Element elt,Real &offset)
Description
Get the offset distance of the text to be used for each 4d point (x,y) for the 4d Element elt.
The offset is returned as Real offset.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 437
Set_4d_rise(Element elt,Real rise)
Name
Integer Set_4d_rise(Element elt,Real rise)
Description
Set the rise distance of the text to be used for each 4d point (x,y) for the 4d Element elt.
Page 858
Strings Replaced by Super Strings
 12d Model Macro Manual
The rise is given as Real rise.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully set.
ID = 444
Get_4d_rise(Element elt,Real &rise)
Name
Integer Get_4d_rise(Element elt,Real &rise)
Description
Get the rise distance of the text to be used for each 4d point (x,y) for the 4d Element elt.
The rise is returned as Real rise.
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the data was successfully returned.
ID = 438
Set_4d_height(Element elt,Real height)
Name
Integer Set_4d_height(Element elt,Real height)
Description
Set the height of the characters of the 4d text of the Element elt.
The text height is given as Real height.
A function return value of zero indicates the data was successfully set.
ID = 648
Get_4d_height(Element elt,Real &height)
Name
Integer Get_4d_height(Element elt,Real &height)
Description
Get the height of the characters of the 4d text of the Element elt.
The text height is returned as Real height.
A function return value of zero indicates the data was successfully returned.
ID = 644
Set_4d_slant(Element elt,Real slant)
Name
Integer Set_4d_slant(Element elt,Real slant)
Description
Set the slant of the characters of the 4d text of the Element elt.
The text slant is given as Real slant.
Note that the value of slant is measured as tangent here, where in 12da the value is writen in 
decimal angle.
Page 859
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
The valid value for slant much be at least -1 and at most 1 (as the angle much be between -45 to 45 
degree).
A function return value of zero indicates the data was successfully set.
ID = 649
Get_4d_slant(Element elt,Real &slant)
Name
Integer Get_4d_slant(Element elt,Real &slant)
Description
Get the slant of the characters of the 4d text of the Element elt.
The text slant is returned as Real slant.
Note that the value of slant is measured as tangent here, where in 12da the value is writen in 
decimal angle.
A function return value of zero indicates the data was successfully returned.
ID = 645
Set_4d_x_factor(Element elt,Real xfact)
Name
Integer Set_4d_x_factor(Element elt,Real xfact)
Description
Set the x factor of the characters of the 4d text of the Element elt.
The text x factor is given as Real xfact.
A function return value of zero indicates the data was successfully set.
ID = 650
Get_4d_x_factor(Element elt,Real &xfact)
Name
Integer Get_4d_x_factor(Element elt,Real &xfact)
Description
Get the x factor of the characters of the 4d text of the Element elt.
The text x factor is returned as Real xfact.
A function return value of zero indicates the data was successfully returned.
ID = 646
Set_4d_style(Element elt,Text style)
Name
Integer Set_4d_style(Element elt,Text style)
Description
Set the style of the characters of the 4d text of the Element elt.
The text style is given as Text style.
Page 860
Strings Replaced by Super Strings
 12d Model Macro Manual
A function return value of zero indicates the data was successfully set.
ID = 651
Get_4d_style(Element elt,Text &style)
Name
Integer Get_4d_style(Element elt,Text &style)
Description
Get the style of the characters of the 4d text of the Element elt.
The text style is returned as Text style.
A function return value of zero indicates the data was successfully returned.
ID = 647
Set_4d_ttf_underline(Element elt,Integer underline)   
Name
Integer Set_4d_ttf_underline(Element elt,Integer underline) 
Description
For the Element elt of type 4d, set the underline state to underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates underlined was successfully set.
ID = 2588
Get_4d_ttf_underline(Element elt,Integer &underline)   
Name
Integer Get_4d_ttf_underline(Element elt,Integer &underline) 
Description
For the Element elt of type 4d, get the underline state and return it in underline.
If underline = 1, then for a true type font the text will be underlined.
If underline = 0, then text will not be underlined.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates underlined was successfully returned.
ID = 2584
Set_4d_ttf_strikeout(Element elt,Integer strikeout)   
Name
Integer Set_4d_ttf_strikeout(Element elt,Integer strikeout) 
Description
Page 861
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
For the Element elt of type 4d, set the strikeout state to strikeout.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates strikeout was successfully set.
ID = 2589
Get_4d_ttf_strikeout(Element elt,Integer &strikeout) 
Name
Integer Get_4d_ttf_strikeout(Element elt,Integer &strikeout)   
Description
For the Element elt of type 4d, get the strikeout state and return it in strikeout.
For a diagram, see 5.9 Textstyle Data.
If strikeout = 1, then for a true type font the text will be strikeout.
If strikeout = 0, then text will not be strikeout.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates strikeout was successfully returned.
 ID = 2585
Set_4d_ttf_weight(Element elt,Integer weight)   
Name
Integer Set_4d_ttf_weight(Element elt,Integer weight) 
Description
For the Element elt of type 4d, set the font weight to weight.
For the list of allowable weights, go to  Allowable Weights
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates weight was successfully set.
ID = 2591
Get_4d_ttf_weight(Element elt,Integer &weight)   
Name
Integer Get_4d_ttf_weight(Element elt,Integer &weight) 
Description
For the Element elt of type 4d, get the font weight and return it in weight.
Allowable Weights
The allowable numbers for weight are: 
0 = FW_DONTCARE         
100 = FW_THIN             
200 = FW_EXTRALIGHT      
300 = FW_LIGHT         
Page 862
Strings Replaced by Super Strings
 12d Model Macro Manual
400 = FW_NORMAL          
500 = FW_MEDIUM          
600 = FW_SEMIBOLD         
700 = FW_BOLD            
800 = FW_EXTRABOLD       
900 = FW_HEAVY            
Note that in the distributed file set_ups.h these are defined as: 
#define FW_DONTCARE
   0
#define FW_THIN
   100
#define FW_EXTRALIGHT       200
#define FW_LIGHT 
   300
#define FW_NORMAL
   400
#define FW_MEDIUM
   500
#define FW_SEMIBOLD             600
#define FW_BOLD                      700
#define FW_EXTRABOLD          800
#define FW_HEAVY                    900
#define FW_ULTRALIGHT         FW_EXTRALIGHT
#define FW_REGULAR               FW_NORMAL
#define FW_DEMIBOLD             FW_SEMIBOLD
#define FW_ULTRABOLD          FW_EXTRABOLD
#define FW_BLACK                    FW_HEAVY
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates weight was successfully returned.
ID = 2587
Set_4d_ttf_italic(Element elt,Integer italic) 
Name
Integer Set_4d_ttf_italic(Element elt,Integer italic)   
Description
For the Element elt of type 4d, set the italic state to italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates italic was successfully set.
 ID = 2590
Get_4d_ttf_italic(Element elt,Integer &italic)   
Name
Integer Get_4d_ttf_italic(Element elt,Integer &italic)   
Description
For the Element elt of type 4d, get the italic state and return it in italic.
If italic = 1, then for a true type font the text will be italic.
If italic = 0, then text will not be italic.
Page 863
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates italic was successfully returned.
ID = 2586
Set_4d_ttf_outline(Element elt,Integer outline) 
Name
Integer Set_4d_ttf_outline(Element elt,Integer outline)   
Description
For the Element elt of type 4d, set the outline state to outline.
If outline = 1, then for a true type font the text will be only shown in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates outline was successfully set.
 ID = 2770
Get_4d_ttf_outline(Element elt,Integer &outline)   
Name
Integer Get_4d_ttf_outline(Element elt,Integer &outline)   
Description
For the Element elt of type 4d, get the outline state and return it in outline.
If outline = 1, then for a true type font the text will be shown only in outline.
If outline = 0, then text will not be only shown in outline.
For a diagram, see 5.9 Textstyle Data.
A non-zero function return value is returned if elt is not of type 4d.
A function return value of zero indicates outline was successfully returned.
ID = 2769
Set_4d_whiteout(Element element,Integer colour) 
Name
Integer Set_4d_whiteout(Element element,Integer colour) 
Description
For the 4d Element elt, set the colour number of the colour used for the whiteout box around vertex 
text, to be colour.
If no text whiteout is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully set.
ID = 2750
Page 864
Strings Replaced by Super Strings
 12d Model Macro Manual
Get_4d_whiteout(Element element,Integer &colour)
Name
Integer Get_4d_whiteout(Element element,Integer &colour) 
Description
For the 4d Element elt, get the colour number that is used for the whiteout box around vertex text. 
The whiteout colour is returned as Integer colour.
NO_COLOUR is the returned as the colour number if whiteout is not being used.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
ID = 2749
Set_4d_border(Element element,Integer colour) 
Name
Integer Set_4d_border(Element element,Integer colour) 
Description
For the 4d Element elt, set the colour number of the colour used for the border of the whiteout box 
around vertex text, to be colour.
If no whiteout border is required, then set the colour number to NO_COLOUR.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff).
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully set.
ID = 2760
Get_4d_border(Element element,Integer &colour) 
Name
Integer Get_4d_border(Element element,Integer &colour) 
Description
For the 4d Element elt, get the colour number that is used for the border of the whiteout box around 
vertex text. The whiteout border colour is returned as Integer colour.
NO_COLOUR is the returned as the colour number if there is no whiteout border.
Note: The colour number for "view colour" is VIEW_COLOUR (or 2147483647 - that is 0x7fffffff)
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
ID = 2759
Set_4d_border_style(Element element,Integer style) 
Name
Integer Set_4d_border_style(Element element,Integer style) 
Page 865
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Description
For the 4d Element elt, set the border style of the whiteout box around vertex text, according to 
Integer style.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully set.
ID = 3575
Get_4d_border_style(Element element,Integer &style) 
Name
Integer Get_4d_border_style(Element element,Integer &style) 
Description
For the 4d Element elt, get the style that is used for the border of the whiteout box around vertex 
text. The value is returned as Integer style.
      1             for rectangle
      2             for circle
      3             for capsule 
      4             for bevel 
      5             for triangle 1 (pointed at top) 
      6             for triangle 2 (flat line on top) 
      7             for pentagon 1 (pointed at top) 
      8             for pentagon 2 (flat line on top) 
      9             for hexagon 1 (pointed at top) 
      10           for hexagon 2 (flat line on top) 
      11           for octagon 1 (pointed at top) 
      12           for octagon 2 (flat line on top) 
For a diagram, see 5.9 Textstyle Data.
A function return value of zero indicates the colour number was successfully returned.
ID = 3572
Page 866
Strings Replaced by Super Strings
 12d Model Macro Manual
5.53.4 Pipe Strings
A pipe string consists of (x,y,z) values at each point of the string and a diameter for the entire string.
The following functions are used to create new pipe strings and make inquiries and modifications to 
existing pipe strings.
Note: From 12d Model 9 onwards, pipe strings have been replaced by Super strings.
Create_pipe(Real x[],Real y[],Real z[],Integer num_pts)
Name
Element Create_pipe(Real x[],Real y[],Real z[],Integer num_pts)
Description
Create an Element of type pipe.
The Element has num_pts points with (x,y,z) values given in the Real arrays x[], y[] and z[].
The function return value gives the actual Element created.
If the pipe string could not be created, then the returned Element will be null.
ID = 676
Create_pipe(Integer num_pts)
Name
Element Create_pipe(Integer num_pts)
Description
Create an Element of type pipe with room for num_pts (x,y,z) points.
The actual x, y and z values of the pipe string are set after the string is created.
If the pipe string could not be created, then the returned Element will be null.
ID = 677
Create_pipe(Integer num_pts,Element seed)
Name
Element Create_pipe(Integer num_pts,Element seed)
Description
Create an Element of type pipe with room for num_pts (x,y) points, and set the colour, name, style 
etc. of the new string to be the same as those from the Element seed.
The actual x, y and z values of the pipe string are set after the string is created.
If the pipe string could not be created, then the returned Element will be null.
ID = 678
Get_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer 
&num_pts)
Name
Integer Get_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts)
Description
Page 867
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Get the (x,y,z) data for the first max_pts points of the pipe Element elt.
The (x,y,z) values at each string point are returned in the Real arrays x[], y[] and z[].
The maximum number of points that can be returned is given by max_pts (usually the size of the 
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and 
the number of points in the string.
The actual number of points returned is returned by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type pipe, then num_pts is returned as zero and the function return value 
is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Set_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)
Name
Integer Set_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)
Description
Set the (x,y,z) data for the first num_pts points of the pipe Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y,z) values for each string point are given in the Real arrays x[], y[] and z[].
The number of points to be set is given by Integer num_pts
If the Element elt is not of type pipe, then nothing is modified and the function return value is set to 
a non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new pipe Elements but only modify existing pipe Elements.
ID = 80
Get_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer 
&num_pts,Integer start_pt)
Name
Integer Get_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts,Integer 
start_pt)
Description
For a pipe Element elt, get the (x,y,z) data for max_pts points starting at point number start_pt.
This routine allows the user to return the data from a pipe string in user specified chunks. 
This is necessary if the number of points in the string is greater than the size of the arrays available 
to contain the information.
As in the previous function, the maximum number of points that can be returned is given by 
max_pts (usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point 
one.
The (x,y,z) values at each string point are returned in the Real arrays x[], y[] and z[].
The actual number of points returned is given by Integer num_pts
Page 868
Strings Replaced by Super Strings
 12d Model Macro Manual
num_pts <= max_pts
If the Element elt is not of type pipe, then num_pts is set to zero and the function return value is set 
to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
A start_pt of one gives the same result as for the previous function.
Set_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer start_pt)
Name
Integer Set_pipe_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer start_pt)
Description
For the pipe Element elt, set the (x,y,z) data for num_pts points, starting at point number start_pt.
This function allows the user to modify a large number of points of the string in one call starting at 
point number start_pt rather than point one.
The maximum number of points that can be set is given by the difference between the number of 
points in the string and the value of start_pt.
The (x,y,z) values for the string points are given in the Real arrays x[], y[] and z[].
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type pipe, then nothing is modified and the function return value is set to 
a non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new pipe Elements but only modify existing pipe Elements.
Get_pipe_data(Element elt,Integer i, Real &x,Real &y,Real &z)
Name
Integer Get_pipe_data(Element elt,Integer i, Real &x,Real &y,Real &z)
Description
Get the (x,y,z) data for the ith point of the string.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
A function return value of zero indicates the data was successfully returned.
Set_pipe_data(Element elt,Integer i,Real x,Real y,Real z)
Name
Integer Set_pipe_data(Element elt,Integer i,Real x,Real y,Real z)
Description
Set the (x,y,z) data for the ith point of the string.
Page 869
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
A function return value of zero indicates the data was successfully set.
ID = 83
Get_pipe_diameter(Element elt,Real &diameter)
Name
Integer Get_pipe_diameter(Element elt,Real &diameter)
Description
Get the pipe diameter of the string Element elt.
The pipe diameter is returned in Real diameter.
A function return value of zero indicates the data was successfully returned.
ID = 681
Set_pipe_diameter(Element elt,Real diameter)
Name
Integer Set_pipe_diameter(Element elt,Real diameter)
Description
Set the pipe diameter of the string Element elt.
The pipe diameter is given as Real diameter.
A function return value of zero indicates the data was successfully set.
ID = 679
Get_pipe_justify(Element elt,Integer &justify)
Name
Integer Get_pipe_justify(Element elt,Integer &justify)
Description
Get the justification used for the pipe Element elt
The justification is returned as Integer justify.
A function return value of zero indicates the data was successfully returned.
ID = 682
Set_pipe_justify(Element elt,Integer justify)
Name
Integer Set_pipe_justify(Element elt,Integer justify)
Description
Set the justification used for the text parameter of the pipe Element elt.
The justification is given as Integer justify.
Page 870
Strings Replaced by Super Strings
 12d Model Macro Manual
A function return value of zero indicates the data was successfully set.
ID = 680
Page 871
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
5.53.5 Polyline Strings
A polyline string consists of (x,y,z,radius,bulge) values at each point of the string. 
For a given point, (x,y,z) defines the co-ordinates of the point, and (radius,bulge) defines an arc of 
radius radius between the point and the and the next point.
The sign of radius defines which side of the line joining the consecutive points that the arc is on 
(positive - on the left; negative - on the right) and bulge specifies whether the arc is a minor or major 
arc (0 for a minor arc < 180 degrees; 1 for a major arc > 180 degrees). The minor/major value is 
given in Integer bulge.
The following functions are used to create new polyline strings and make inquiries and modifications 
to existing polyline strings.
Note: From 12d Model 9 onwards, Polyline strings have been replaced by Super strings.
For setting up a Super Polyline String rather than the superseded polyline string see 5.39.3 3d 
Super String.
Create_polyline(Real x[],Real y[],Real z[],Real r[],Integer bulge[],Integer num_pts)
Name
Element Create_polyline(Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts)
Description
Create an Element of type polyline.
The Element has num_pts points with (x,y,z) values given in the Real arrays x[], y[] and z[], and 
arcs between consecutive points given in the Real array r[] and the Integer array bulge[].
The radius of the arc between the nth and the n+1 point is given by r[n] and the arc is on the right of 
the line joining the nth and n+1 point if r[n] is positive, and on the left if r[n] is negative. Hence the 
absolute value of r[n] gives the radius of the curve between the nth and n+1 point and the sign of 
r[n] defines what side the curve lies on.
The value of bulge[n] defines whether the arc is a minor or major arc. A value of 0 denotes a minor 
arc and 1 a major arc.
The function return value gives the actual Element created.
If the polyline string could not be created, then the returned Element will be null.
ID = 481
Create_polyline(Integer num_pts)
Name
Element Create_polyline(Integer num_pts)
Description
Create an Element of type Polyline with room for num_pts (x,y,z,r,bulge) points.
The actual x, y, z, r, and bulge values of the polyline string are set after the string is created.
If the polyline string could not be created, then the returned Element will be null.
ID = 482
Create_polyline(Integer num_pts,Element seed)
Name
Page 872
Strings Replaced by Super Strings
 12d Model Macro Manual
Element Create_polyline(Integer num_pts,Element seed)
Description
Create an Element of type Polyline with room for num_pts (x,y,z,r,bulge) points, and set the colour, 
name, style etc. of the new string to be the same as those from the Element seed.
The actual x, y, z, r, and bulge values of the polyline string are set after the string is created.
If the polyline string could not be created, then the returned Element will be null.
ID = 669
Create_polyline(Segment seg)
Name
Element Create_polyline(Segment seg)
Description
Create an Element of type Polyline from the Segment seg. The segment may be a Line, or Arc.
The created Element will have two points with co-ordinates equal to the end points of the Segment 
seg.
The function return value gives the actual Element created.
If the polyline string could not be created, then the returned Element will be null.
ID = 554
Get_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer 
max_pts,Integer &num_pts)
Name
Integer Get_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer max_pts,Integer 
&num_pts)
Description
Get the (x,y,z,r,b) data for the first max_pts points of the polyline Element elt.
The (x,y,z,r,b) values at each string point are returned in the Real arrays x[], y[], z[], r[] and b[].
The maximum number of points that can be returned is given by max_pts (usually the size of the 
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and 
the number of points in the string.
The actual number of points returned is returned by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type Polyline, then num_pts is returned as zero and the function return 
value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
ID = 483
Get_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer 
max_pts,Integer &num_pts,Integer start_pt)
Name
Integer Get_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer max_pts,Integer 
&num_pts,Integer start_pt)
Page 873
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
Description
For a polyline Element elt, get the (x,y,z,r,f) data for max_pts points starting at point number 
start_pt.
This routine allows the user to return the data from a polyline string in user specified chunks. This is 
necessary if the number of points in the string is greater than the size of the arrays available to 
contain the information.
As in the previous function, the maximum number of points that can be returned is given by 
max_pts (usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point 
one.
The (x,y,z,r,f) values at each string point are returned in the Real arrays x[], y[], z[], r[] and f[].
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type Polyline, then num_pts is set to zero and the function return value is 
set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
A start_pt of one gives the same result as for the previous function.
ID = 484
Get_polyline_data(Element elt,Integer i,Real &x,Real &y,Real &z,Real &r,Integer 
&f)
Name
Integer Get_polyline_data(Element elt,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &f)
Description
Get the (x,y,z,r,f) data for the ith point of the Polyline Element elt.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
The radius value is returned in Real r.
The minor/major value is returned in Integer f.
A function return value of zero indicates the data was successfully returned.
ID = 485
Set_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer 
num_pts)
Name
Integer Set_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts)
Description
Set the (x,y,z,r,f) data for the first num_pts points of the polyline Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y,z,r,f) values for each string point are given in the Real arrays x[], y[], z[], r[] and f[].
Page 874
Strings Replaced by Super Strings
 12d Model Macro Manual
The number of points to be set is given by Integer num_pts
If the Element elt is not of type Polyline, then nothing is modified and the function return value is set 
to a non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new Polyline Elements but only modify existing Polyline Elements.
ID = 486
Set_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer 
num_pts,Integer start_pt)
Name
Integer Set_polyline_data(Element elt,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer num_pts,Integer 
start_pt)
Description
For the polyline Element elt, set the (x,y,z,r,f) data for num_pts points, starting at point number 
start_pt.
This function allows the user to modify a large number of points of the string in one call starting at 
point number start_pt rather than point one.
The maximum number of points that can be set is given by the difference between the number of 
points in the string and the value of start_pt.
The (x,y,z,r,f) values for the string points are given in the Real arrays x[], y[], z[], r[]
 and f[].
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type Polyline, then nothing is modified and the function return value is set 
to a non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new Polyline Elements but only modify existing Polyline Elements.
ID = 487
Set_polyline_data(Element elt,Integer i,Real x,Real y,Real z,Real r,Integer f)
Name
Integer Set_polyline_data(Element elt,Integer i,Real x,Real y,Real z,Real r,Integer f)
Description
Set the (x,y,z,r,f) data for the ith point of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
The radius value is given in Real r.
The minor/major value is given in Integer f.
A function return value of zero indicates the data was successfully set.
Page 875
Strings Replaced by Super Strings
Chapter 5  12dPL Library Calls
ID = 488

```

