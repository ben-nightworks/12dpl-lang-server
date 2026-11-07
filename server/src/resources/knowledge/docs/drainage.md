# Drainage String, Feature, Interface, and Face String Elements

> **Source:** 12d Model Macro Manual §5.45 (pp 644–741), §5.46 (pp 742–743), §5.47 (pp 744–747), §5.49 (pp 759–765)


## 5.45 Drainage String Element

Drainage Definitions
See  Drainage Definitions - Pits and Pipes
See  Drainage Definitions - Connection Points
See  Drainage Definitions - Flow Direction
See  Drainage Definitions - Drainage Network, Junction, Trunk
Drainage Definitions - Pits and Pipes
The drainage string is used in the Drainage modules (Drainage, Drainage Analysis and Dynamic
Drainage Analysis) and also in the Sewer (Waste Water) module.
Drainage strings have a special attribute (sewertype) to denote whether the drainage string
represents a storm water (sewertype = 0 the default) or a waste water (foul water or sewer) string
(sewertype = 1) but both will be referred to as a drainage string.
A drainage string consists of two parts:
(a)
a string of vertices with straight or arc segments that defines the underlying geometry of the
drainage string
(b)
information about pits (or maintenance holes) and pipes.
Pits (maintenance holes or manholes) can be located anywhere on the underlying string but are
normally located on actual vertices of the underlying string. There must be a pit on the first and last
vertices of the underlying string.
Pits can be circular or rectangular, and have a depth, cover, grate and sump levels as well as wall
and bottom thicknesses.
Pipe are the conduits connecting the pits, and pipes can be round or rectangular.
The number of pits is return in npits by the function  Get_drainage_pits(Element drain,Integer
&npits) and the number of pipes = number of pits - 1.
Drainage Definitions - Connection Points
PLAN VIEW
Pit 1on first vertex
Pit 2
Pit 3
Pit 5 is between two vertices
Underlying String
Pipe 4 on vertex
Pit 6 on last vertex
No pit on this vertex
Vertices
Pits on Underlying String
Pipe 1
Pipe 2
Pipe 3
Pipe 4
Pipe 5

Although a pipe must go between two pits, the ends of the pipe do not have to be on the centre of
the pit at each end but stop at what are called connection points.
If connection points are being used, then there will be
(a)
one connection point for the first pit (for the pipe leaving the first pit) and the underlying string
will have a vertex for the pit and one for the connection point
(b)
one connection point for the last pit (for the pipe entering the last pit) and the underlying string
will have a vertex for the pit and one for the connection point
(c)
 two connection points for each pit between the end pits (one for the pipe entering/leaving from
the left of the pit and the other for the pipe entering/leaving from the right of the pit) and the
underlying string will have a vertex for the pit and one for each of the two connection points
Drainage Definitions - Flow Direction
A drainage string has a flow direction which is either in the same as the direction of the drainage
string (dir = 1), or is in the opposite direction to the direction of the drainage string (dir = 0). The
direction of a string is the chainage direction of the string.
Storm water strings are usually designed with the flow direction the same as the drainage string
direction and so when profiled in a section view, most of the pipes slope down to the right.
Water water strings are usually designed with the flow direction the opposite to the drainage string
direction and so when profiled in a section view, most of the pipes slope up to the right.
PLAN VIEW
Pit 1
Pit 2
Pit 3
Pit 4
Pipe 1
Pipe 2
Pipe 3
connection point for
Pipe 1 leaving Pit 1
point for Pit 1
connection point for
Pipe 1 entering Pit 2
point for Pit 2
point for Pit 3
connection point for
Pipe 2 leaving Pit 2
connection point for
Pipe 3 leaving Pit 3
point for Pit 4
connection point for
Pipe 2 entering Pit 3
connection point for
Pipe 3 entering Pit 4
flow direction opposite to string direction
SECTION VIEW
PLAN VIEW
Pit 1
Pit 2
Pit 3
Pit 4
Pit 5
Pit 6
Pit 7
Pit 1
Pit 1
Pipe 1
Pipe 2
Pipe 3
Pipe 4
Pipe 6
Pipe 5
connection points
for Pipe 1
 flow direction the same as string direction
dir = 0
dir = 1

Drainage Definitions - Drainage Network, Junction, Trunk
In 12d Model, a drainage network is defined to be all the drainage strings in the same model. So
all the drainage strings in the same model are considered to be part of the same drainage network.
If you have two different drainage networks, then they must be in different models. In particular, all
the drainage strings of type storm water need to be in a different model to those of type waste water.
To model one drainage string AB connecting into another drainage string A in the same network
(model), the pit at the end of string AB must have exactly the same (x,y) location as the pit on the
drainage string A where the connection occurs. This situation represents a junction and the pit at
the end of AB is called the junction pit and the pit in A, is the controlling pit, and is either a trunk or
a diverging pit.
The two pits are then considered to be the same pit and all the information for the pit resides on the
controlling pit.
A branch is defined as a drainage string that flows into a non-outlet pit of another drainage string.
Thus the flow direction of the drainage string is important.
The drainage string that the water flows into from a branch drainage string is referred to as a trunk
line (for that branch string).
A trunk line may also be a branch for another downstream trunk line.
For more information on drainage strings, see the 12d Model Reference manual.
The following functions are used to create new drainage strings and make inquiries and
modifications to existing drainage strings.
- See 5.45.1 Underlying Drainage String Functions
- See 5.45.2 General Drainage String Functions
- See 5.45.3 Drainage String Pits
- See 5.45.4 Drainage Pit Type Information in the drainage.4d File
- See 5.45.5 Drainage String Pit Attributes
- See 5.45.6 Drainage String Pipes
- See 5.45.7 Drainage Pipe Type Information in the drainage.4d File
- See 5.45.8 Drainage String Pipe Attributes
- See 5.45.9 Drainage String House Connections - For Sewer Module Only
SECTION VIEW
PLAN VIEW
Pit A1
Pit A2
Pit A3
Pit A1
Pit AB2
Pit AB1
Branch AB
Trunk or Main line A
Pit A2
placing pit AB3
on A3
the bottom of pit A3 is
usually set below AB3
output level of AB3
Pit A4
Pit A3
Pit A4


### 5.45.1 Underlying Drainage String Functions

A drainage string consists of two parts:
(a)
a string of vertices with straight or arc segments that defines the underlying geometry of the
drainage string
(b)
information about pits (maintenance holes or manholes) and pipes.
See  Drainage Definitions
Creating a Drainage String

There are 3 steps to creating a drainage string and must be executed in the following order:

Step 1 – Create the underlying geometry
                Note:    The number of pits may be more or less than the number of vertices.
                               A geometry segment may have several pits.
                               A bent pipe would have a vertex in between the 2 pits.
    1 function call method
    Create_drainage(Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts, Integer
num_pits)
    2 function calls method
    Create_drainage(Integer num_verts,Integer num_pits)
    followed by either
    Set_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer
num_verts,Integer start_vert)   - arrays
    or
    Set_drainage_data(Element drain,Integer i,Real x,Real y,Real z,Real r,Integer b)
- singular
    Note: the z value is not used by the drainage string
Step 2 – Add the pits
Set_drainage_pit(Element drain,Integer p,Real x,Real y,Real z)  - z is the cover level, the sump level
is floating by default
Notes:  the x,y is dropped onto the underlying geometry to determine the location on the geometry
string (x,y,chainage) and then it is discarded.
Set_drainage_pit_thickness(Element drain,Integer p,Real bottom,Real front,Real back,Real
left,Real right) - optional

To set and lock the sump level requires 2 function calls:
Set_drainage_pit_float_sump(Element drain,Integer pit,Integer sump_float) – sump_float set to 0
Set_drainage_pit_sump_level(Element drain,Integer pit,Real level)

Step 3 – Add the Pipe inverts and dimensions

Inverts
Set_drainage_pipe_inverts(Element drain,Integer p,Real lhs,Real rhs)
or
Set_drainage_pit_inverts(Element drain,Integer p,Real lhs,Real rhs)
Dimensions
Set_drainage_pipe_diameter(Element drain,Integer p,Real diameter)
- used to draw the pipe
Set_drainage_pipe_width(Element drain,Integer pipe,Real &width)
– only needed for box culverts
Set_drainage_pipe_top_width(Element drain,Integer pipe,Real &top_width)
- only needed for trapezoidal shapes
Set_drainage_pipe_thickness(Element drain,Integer pit,Real top,Real bottom,Real left,Real right)
- optional, only top used for circular pipes
Set_drainage_pipe_number_of_pipes(Element drain,Integer pipe,Integer n)         – only needed if
more than 1 identical pipe between pits
Set_drainage_pipe_separation(Element drainage,Integer pipe,Real separation)  - only needed if
more than 1 identical pipe between pits
Set_drainage_pipe_nominal_diameter(Element drainage,Integer pipe,Real nominal_diameter)   -
used as a reference value only
The following functions are for defining the underlying geometry of the drainage string.
Drainage pit information starts in the section 5.45.3 Drainage String Pits and drainage pipe
information starts in the section 5.45.6 Drainage String Pipes.
Create_drainage(Integer num_verts,Integer num_pits)

```c
Element Create_drainage(Integer num_verts,Integer num_pits)
```
Create an Element of type Drainage with room for num_verts vertices in the underlying string, and
room for num_pits pits.
The actual data of the drainage string is set after the string is created.
If the drainage string could not be created, then the returned Element will be null.

> **ID = 490**

Create_drainage(Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts,
Integer num_pits)

```c
Element Create_drainage(Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts, Integer num_pits)
```
Create an Element of type drainage.
The Element has num_verts vertices with (x,y,z) values for the vertices given in the Real arrays x[],
y[] and z[], and the radii of the arcs for the segments between the vertices given by the Real radius
array r[] and the Integer bulge array b[] (Bulge arrayb=1 for major arc >180 degrees, b = 1 for minor

arc < 180 degrees).
The drainage string also contains Integer num_pits pits.
The function return value gives the actual Element created.
If the drainage string could not be created, then the returned Element will be null.

> **ID = 489**

Set_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer
b[],Integer num_verts)

```c
Integer Set_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts)
```
Set the (x,y,z,r,b) data for the first num_verts vertices of the drainage Element drain.
This function allows the user to modify a large number of vertices of the string in one call.
The maximum number of vertices that can be set is given by the number of vertices in the string.
The (x,y,z,r,b) values for each string vertex are given in the Real arrays x[], y[], z[], r[] and b[].
The number of vertices to be set is given by Integer num_verts
If the Element drain is not of type Drainage, then nothing is modified and the function return value is
set to a non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new Drainage Elements but only modify existing Drainage Elements.

> **ID = 2100**

Get_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer
b[],Integer max_verts,Integer &num_verts)

```c
Integer Get_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer f[],Integer max_verts,Integer &num_verts)
```
Get the (x,y,z,r,b) data for the first max_verts points of the drainage Element drain.
The (x,y,z,r,b) values at each string vertex are returned in the Real arrays x[], y[], z[], r[] and b[].
The maximum number of vertices that can be returned is given by max_verts (usually the size of
the arrays). The vertex data returned starts at the first vertex and goes up to the minimum of
max_verts and the number of vertices in the string.
The actual number of vertices returned is returned by Integer num_verts
num_verts <= max_verts
If the Element drain is not of type Drainage, then num_pts is returned as zero and the function
return value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2097**

Set_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer

b[],Integer num_verts,Integer start_vert)

```c
Integer Set_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts,Integer start_vert)
```
For the drainage Element drain, set the (x,y,z,r,b) data for num_verts vertices, starting at vertex
number start_vert.
This function allows the user to modify a large number of vertices of the string in one call starting at
vertex number start_vert rather than vertex one.
The maximum number of vertices that can be set is given by the difference between the number of
vertices in the string and the value of start_vert.
The (x,y,z,r,f) values for the string vertices are given in the Real arrays x[], y[], z[], r[] and b[].
The number of the first string vertex to be modified is start_vert.
The total number of vertices to be set is given by Integer num_verts
If the Element drain is not of type Drainage, then nothing is modified and the function return value is
set to a non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_vert of one gives the same result as the function  Set_drainage_data(Element
drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer num_verts).
(b)
This function can not create new Drainage Elements but only modify existing Drainage
Elements.

> **ID = 2101**

Get_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer
b[],Integer max_verts,Integer &num_verts,Integer start_vert)

```c
Integer Get_drainage_data(Element drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer max_verts,Integer &num_verts,Integer start_vert)
```
For a drainage Element drain, get the (x,y,z,r,b) data for max_verts points starting at vertex number
start_vert.
This routine allows the user to return the data from a drainage string in user specified chunks. This
is necessary if the number of vertices in the string is greater than the size of the arrays available to
contain the information.
The maximum number of vertices that can be returned is given by max_verts (usually the size of
the arrays). For this function, the vertex data returned starts at vertex number start_vert rather than
vertex one.
The (x,y,z,r,b) values at each string vertex are returned in the Real arrays x[], y[], z[], r[] and b[].
The actual number of vertices returned is given by Integer num_verts
num_verts <= max_verts
If the Element drain is not of type Drainage, then num_verts is set to zero and the function return
value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note

A start_vert of one gives the same result as for the function  Get_drainage_data(Element
drain,Real x[],Real y[],Real z[],Real r[],Integer b[],Integer max_verts,Integer &num_verts).

> **ID = 2098**

Set_drainage_data(Element drain,Integer i,Real x,Real y,Real z,Real r,Integer b)

```c
Integer Set_drainage_data(Element drain,Integer i,Real x,Real y,Real z,Real r,Integer b)
```
Set the (x,y,z,r,f) data for the ith vertex of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
The radius value is given in Real r.
The minor/major value is given in Integer b. if b = 0, arc < 180 degrees; if b = 1, arc >180 degrees.
A function return value of zero indicates the data was successfully set.

> **ID = 2102**

Get_drainage_data(Element drain,Integer i,Real &x,Real &y,Real &z,Real
&r,Integer &b)

```c
Integer Get_drainage_data(Element drain,Integer i,Real &x,Real &y,Real &z,Real &r,Integer &b)
```
Get the (x,y,z,r,f) data for the ith vertex of the Element drain.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
The radius value is returned in Real r.
The minor/major value is returned in Integer b.
If minor/major is 0, arc < 180.
If minor/major is 1, arc > 180
A function return value of zero indicates the data was successfully returned.

> **ID = 2099**

Go to the next section 5.45.2 General Drainage String FunctionsElement.


### 5.45.2 General Drainage String Functions

Set_drainage_outfall_height(Element drain,Real ht)

```c
Integer Set_drainage_outfall_height(Element drain,Real ht)
```
Set the outfall height of the drainage Element drain to the value ht.
A function return value of zero indicates the outfall height was successfully set.

> **ID = 491**

Get_drainage_outfall_height(Element drain,Real &ht)

```c
Integer Get_drainage_outfall_height(Element drain,Real &ht)
```
Get the outfall height of the drainage Element drain and return it as ht.
A function return value of zero indicates the outfall height was successfully returned.

> **ID = 492**

Set_drainage_ns_tin(Element drain,Tin tin)

```c
Integer Set_drainage_ns_tin(Element drain,Tin tin)
```
For the drainage string drain, set the natural surface Tin to be tin.
A function return value of zero indicates the tin was successfully set.

> **ID = 1275**

Get_drainage_ns_tin(Element drain,Tin &tin)

```c
Integer Get_drainage_ns_tin(Element drain,Tin &tin)
```
For the drainage string drain, get the natural surface Tin and return it in tin.
A function return value of zero indicates the tin was successfully returned.

> **ID = 1274**

Set_drainage_fs_tin(Element drain,Tin tin)

```c
Integer Set_drainage_fs_tin(Element drain,Tin tin)
```
For the drainage string drain, set the finished surface Tin to be tin.
A function return value of zero indicates the tin was successfully set.

> **ID = 1273**

Get_drainage_fs_tin(Element drain,Tin &tin)

```c
Integer Get_drainage_fs_tin(Element drain,Tin &tin)
```
For the drainage string drain, get the finished surface Tin and return it in tin.
A function return value of zero indicates the tin was successfully returned.

> **ID = 1272**

Set_drainage_flow(Element drain,Integer dir)

```c
Integer Set_drainage_flow(Element drain,Integer dir)
```
Set the flow direction of the drainage Element drain
The flow direction is given as Integer dir.
dir = 1 means the flow direction is the same as the string direction. That is, the flow direction is the
same as the chainage direction of the drainage string.
dir = 0 means the flow direction is opposite to the string direction. That is, the flow direction is the
opposite direction to the chainage direction of the drainage string.
See  Drainage Definitions.
A function return value of zero indicates the flow direction was successfully set.

> **ID = 539**

Get_drainage_flow(Element drain,Integer &dir)

```c
Integer Get_drainage_flow(Element drain,Integer &dir)
```
Get the flow direction of the drainage Element drain and return the flow direction dir.
dir = 1 means the flow direction is the same as the string direction. That is, the flow direction is the
same as the chainage direction of the drainage string.
dir = 0 means the flow direction is opposite to the string direction. That is, the flow direction is the
opposite direction to the chainage direction of the drainage string.
See  Drainage Definitions.
A function return value of zero indicates the flow direction was successfully returned.

> **ID = 540**

Set_drainage_float(Element drain,Integer string_pit_float)

```c
Integer Set_drainage_float(Element drain,Integer string_pit_float)
```
For the Element drain, which must be of type Drainage, set the value of the flag for the string
floating pit to string_pit_float.
Note: If a pit does not have a pit_float value set for the pit, then the pit uses the string_pit_float
value.
A pit can be given its own pit_float value using the call  Set_drainage_pit_float(Element
drain,Integer pit,Integer pit_float).
If string_pit_float = 1, the top of a pit automatically takes its level (height) from the finished surface
tin for the drainage string drain.
If string_pit_float = 0, the top of the pit level is fixed.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the string_pit_float was successfully set.

> **ID = 1271**

Get_drainage_float(Element drain,Integer &string_pit_float)

```c
Integer Get_drainage_float(Element drain,Integer &string_pit_float)
```
For the Element drain, which must be of type Drainage, return the value of the flag for the string
floating pit in string_pit_float.
Note: If a pit does not have a pit_float value set for the pit, then the pit uses the string_pit_float
value.
A pit can be given its own pit_float value using the call  Set_drainage_pit_float(Element
drain,Integer pit,Integer pit_float).
If string_pit_float = 1, the top of a pit automatically takes its level (height) from the finished surface
tin for the drainage string drain.
If string_pit_float = 0, the top of the pit level is fixed.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the string_pit_float value was successfully returned.

> **ID = 1270**

Get_drainage_trunk(Element drain,Element &trunk)

```c
Integer Get_drainage_trunk(Element drain,Element &trunk)
```
For the drainage string drain, determine if drain flows into a trunk string.
If there is a trunk string then it is returned as trunk and the function return value is 0. If a trunk
exists, then drain is a branch string.
If there is no trunk string and the downstream end of drain is an outlet then the function return
value is 44.
For all other cases, the function return value is non zero but not 44.
See  Drainage Definitions.

> **ID = 1444**

Drainage_default_grading_to_end(Element drain,Integer pipe_num)

```c
Integer Drainage_default_grading_to_end(Element drain,Integer pipe_num)
```
For the Element drain, which must be of type Drainage, grade from pipe number pipe_num to the
end of the string using the minimum grade, cover etc for the drain.
The drainage flow direction is essential to the grading algorithm.
A function return value of zero indicates the string was successfully graded.

> **ID = 1700**

Drainage_grade_to_end(Element drain,Integer pipe_num,Real slope)

```c
Integer Drainage_grade_to_end(Element drain,Integer pipe_num,Real slope)
```
For the Element drain, which must be of type Drainage, grade from pipe number pipe_num to the
end of the string using the slope slope where the units for slope are 1:in. That is, 1 vertical :in slope
horizontal
The drainage flow direction is essential to the grading algorithm.
A function return value of zero indicates the string was successfully graded.

> **ID = 1701**

Set_drainage_sewer(Element drainage,Integer type)

```c
Integer Set_drainage_sewer(Element drainage,Integer type)
```
Set the drainage sewer type of the drainage string Element drainage with the Integer type.
A return value of zero indicates the function call was successful.
The list of values for drainage sewer type
0 Drainage
1 Sewer
2 Water Supply
3 All

> **ID = 2954**

Get_drainage_sewer(Element drainage,Integer &type)

```c
Integer Get_drainage_sewer(Element drainage,Integer &type)
```
Get the drainage sewer type of the drainage string Element drainage to the Integer type.
A return value of zero indicates the function call was successful.
The list of values for drainage sewer type
0 Drainage
1 Sewer
2 Water Supply
3 All

> **ID = 2955**

Get_drainage_network_pipes_downstream(Drainage_Network dn,Integer
mode,Integer id,Dynamic_Element &elements,Dynamic_Integer &indices)

```c
Integer Get_drainage_network_pipes_downstream(Drainage_Network dn,Integer mode,Integer id,Dynamic_Element &elements,Dynamic_Integer &indices)
```
This function returns all of the pipes that exist in the Drainage_Network object dn, downstream of
the pit or pipe with the unique id (NOTE: this is NOT a pit or pipe index, it is the unique id obtained
using the calls
Get_drainage_network_pits or Get_drainage_network_pipes).
The pipe strings are returned in elements, while the pipe indices are returned in indices.
The mode declares whether you are using a pit id or pipe id:
If mode = 0, using a pit id
If mode = 1, using a pipe id
Typical return values are:
0   = success
-1  = no pipes downstream of the pit/pipe
-10 = Drainage_Network does not exist

> **ID = 7795**

Get_drainage_network_pipes_upstream(Drainage_Network dn,Integer mode,Integer
id,Dynamic_Element &elements,Dynamic_Integer &indices)

```c
Integer Get_drainage_network_pipes_upstream(Drainage_Network dn,Integer mode,Integer id,Dynamic_Element &elements,Dynamic_Integer &indices)
```
This function returns all of the pipes that exist in the Drainage_Network object dn, upstream of the
pit or pipe with the unique id (NOTE: this is NOT a pit or pipe index, it is the unique id obtained using
the calls
Get_drainage_network_pits or Get_drainage_network_pipes).
The pipe strings are returned in elements, while the pipe indices are returned in indices.
The mode declares whether you are using a pit id or pipe id:
If mode = 0, using a pit id

If mode = 1, using a pipe id
Typical return values are:
0   = success
-1  = no pipes downstream of the pit/pipe
-10 = Drainage_Network does not exist

> **ID = 7796**

Remove_drainage_pit(Element element,Integer ip)

```c
Integer Remove_drainage_pit(Element element,Integer ip)
```
Remove the node (pit) of given index ip from the drainage string Element element.

> **ID = 7810**

Insert_drainage_pit(Element element,Integer ip)

```c
Integer Insert_drainage_pit(Element element,Integer ip)
```
Insert a new node (pit) of given index ip to the drainage string Element element.

> **ID = 7811**

Go to the next section 5.45.3 Drainage String Pits

### 5.45.3 Drainage String Pits

Drainage Pit Definitions
For a circle drainage pit, the point for the pit is the centre of the circle of the pit.
For a rectangular drainage pit, the point for the pit is the centre of the internal walls of the pit and
the rotation of the pit is defined by the pit symbol angle which is measured in the counter clockwise
direction from the x-axis. The pit length is defined in the direction of the pit symbol angle and pit
width is in the direction perpendicular to the length. The front, back, left and right are all defined in
relation to line going through the centre of the pit and with the pit symbol angle.
 Drainage Pit Cross Section
PLAN VIEW
Pit p
Pit p+1
Pipe p
Pipe p+1
point for Pit p
point for Pit p+1
chainage direction
of string drain
front
 back
right
left
diameter
Circular Pit
front
thickness
length
width
Box Pit
right
left thickness
front
back
thickness
pit symbol angle
length
thickness
thickness
centre of pit

Get_drainage_pits(Element drain,Integer &npits)

```c
Integer Get_drainage_pits(Element drain,Integer &npits)
```
For the Element drain, which must of type Drainage, get the number of pits for the string and return
it in npits. The number of pipes in npits - 1.
The i’th pipe goes from the i’th pit to the (i+1)’th pit.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 530**

Set_drainage_pit(Element drain,Integer p,Real x,Real y,Real z)

```c
Integer Set_drainage_pit(Element drain,Integer p,Real x,Real y,Real z)
```
Set the x,y & z for the pth pit of the string Element drain.
The x coordinate of the pit is given as Real x.
The y coordinate of the pit is given as Real y.
The z coordinate of the pit is given as Real z.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 532**

Get_drainage_pit(Element drain,Integer p,Real &x,Real &y,Real &z)

```c
Integer Get_drainage_pit(Element drain,Integer p,Real &x,Real &y,Real &z) cover level grate level sump invert bottom of pit grate pit cover depth of pit bottom thickness right thickness left thickness SECTION VIEW
```
Get the x,y & z for the pth pit of the string Element drain.
The x coordinate of the pit is returned in Real x.
The y coordinate of the pit is returned in Real y.
The z coordinate of the pit is returned in Real z (the cover level).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 531**

Get_drainage_pit_area(Element element,Integer pit,Integer elev,Real
&sump_area,Dynamic_Real &depth-elev,Dynamic_Real &area,Integer &ret_num)

```c
Integer Get_drainage_pit_area(Element drain,Integer p,Integer elev,Real &sump_area,Dynamic_Real &depth-elev,Dynamic_Real &area,Integer &ret_num)
```
Get the plan area for the pth pit of the string Element drain at the sump [1] for all pits and \, top of
chamber[2] and bottom of riser[3] for extended pits.
Integer Get_drainage_pit_area(Element element,Integer pit,Integer elev,Real
&sump_area,Dynamic_Real &de,Dynamic_Real &area,Integer &ret_num)
elev set to a value other than zero will return elev data Dynamic_Real &depth-elev
sump_area returns the same value as area[1]. This is for easy access when ret_num = 1.
depth-elev return a Dynamic_Real with either depth or elevation values as specified in Integer elev
above.
area returns area values at the level specified in depth-elev
ret_num return the number of values in the Dynamic_Reals above. For extended nodes the area
changes with elevation and the ret_num will be greater than 1
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3796**

Set_drainage_pit_name(Element drain,Integer p,Text name)

```c
Integer Set_drainage_pit_name(Element drain,Integer p,Text name)
```
For the Element drain, which must be of type Drainage, set the name for the pth pit to name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 513**

Get_drainage_pit_name(Element drain,Integer p,Text &name)

```c
Integer Get_drainage_pit_name(Element drain,Integer p,Text &name)
```
For the Element drain, which must be of type Drainage, get the name for the pth pit and return it in
name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 507**


Set_drainage_pit_colour(Element drain,Integer p,Integer colour)

```c
Integer Set_drainage_pit_colour(Element drain,Integer pit,Integer colour)
```
For the Element drain, which must of type Drainage, set the colour of the pth pit to colour number
colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2781**

Get_drainage_pit_colour(Element drain,Integer p,Integer &colour)

```c
Integer Get_drainage_pit_colour(Element drain,Integer p,Integer &colour)
```
For the Element drain, which must of type Drainage, return the colour number of the pth pit in
colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2780**

Set_drainage_pit_diameter(Element drain,Integer p,Real diameter)

```c
Integer Set_drainage_pit_diameter(Element drain,Integer p,Real diameter)
```
For the Element drain, which must of type Drainage, set the diameter for the pth pit to diameter.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 511**

Get_drainage_pit_diameter(Element drain,Integer p,Real &diameter)

```c
Integer Get_drainage_pit_diameter(Element drain,Integer p,Real &diameter)
```
For the Element drain, which must of type Drainage, return the diameter of the pth pit in diameter.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 505**


Set_drainage_pit_symbol_angle(Element drain,Integer p,Real angle)

```c
Integer Set_drainage_pit_symbol_angle(Element drain,Integer p,Real angle)
```
For the Element drain, which must of type Drainage, set the angle for the pth pit to angle. angle is
used for both the physical pit, and a symbol used for the pit in a Drainage Plan Plot.
angle is in radians and measured in the counter clockwise direction from the x-axis.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2872**

Get_drainage_pit_symbol_angle(Element drain,Integer pit,Real &angle)

```c
Integer Get_drainage_pit_symbol_angle(Element drain,Integer pit,Real &angle)
```
For the Element drain, which must of type Drainage, return the angle of the pth pit in angle. angle
is used for both the physical pit, and a symbol used for the pit in a Drainage Plan Plot.
angle is in radians and measured in the counter clockwise direction from the x-axis.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 2871**

Set_drainage_pit_width(Element drain,Integer p,Real width)

```c
Integer Set_drainage_pit_width(Element drain,Integer p,Real width)
```
For the Element drain, which must of type Drainage, set the width for the pth pit to width.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2876**

Get_drainage_pit_width(Element drain,Integer p,Real &width)

```c
Integer Get_drainage_pit_width(Element drain,Integer p,Real &width)
```
For the Element drain, which must of type Drainage, return the width of the pth pit in width.
See  Drainage Pit Definitions.

If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 2877**

Set_drainage_pit_length(Element drain,Integer p,Real length)

```c
Integer Set_drainage_pit_length(Element drain,Integer p,Real length)
```
For the Element drain, which must of type Drainage, set the length for the pth pit to length.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2878**

Get_drainage_pit_length(Element drain,Integer p,Real &length)

```c
Integer Get_drainage_pit_length(Element drain,Integer p,Real &length)
```
For the Element drain, which must of type Drainage, return the length of the pth pit in length.
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 2879**

Set_drainage_pit_float_sump(Element drain,Integer pit,Integer sump_float)

```c
Integer Set_drainage_pit_float_sump(Element drain,Integer pit,Integer sump_float)
```
For the Element drain, which must be of type Drainage, and pit number pit, set the flag for the
floating sump invert level to sump_float.
If sump_float = 1, the invert level of the sump automatically moves to be the invert level of the
lowest pipe coming into the pit, plus the sump offset (which is defined by an attribute).
If sump_float = 0, the invert level of the sump is fixed and is explicitly set by the call
Set_drainage_pit_sump_level(Element drain,Integer pit,Real level).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the floating sump level flag was successfully set.

> **ID = 2786**

Get_drainage_pit_float_sump(Element element,Integer pit,Integer &sump_float)

```c
Integer Get_drainage_pit_float_sump(Element element,Integer pit,Integer &sump_float)
```
For the Element drain, which must be of type Drainage, and pit number pit, return the flag for the
floating sump invert level as sump_float.
If sump_float = 1, the invert level of the sump automatically moves to be the invert level of the
lowest pipe coming into the pit, plus the sump offset (which is defined by an attribute).
If sump_float = 0, the invert level of the sump is fixed and is explicitly set by the call
Set_drainage_pit_sump_level(Element drain,Integer pit,Real level).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the floating sump level flag was successfully returned.

> **ID = 2787**

Set_drainage_pit_sump_level(Element drain,Integer pit,Real level)

```c
Integer Set_drainage_pit_sump_level(Element drain,Integer pit,Real level)
```
For the Element drain, which must be of type Drainage, and pit number pit, set the pit sump invert
level to level.
This value is only used when the pit floating sump level flag is set to 1. See
Set_drainage_pit_float_sump(Element drain,Integer pit,Integer sump_float).
See  Drainage Pit Cross Section.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the sump invert level was successfully set.

> **ID = 2788**

Get_drainage_pit_sump_level(Element drain,Integer pit,Real &level)

```c
Integer Get_drainage_pit_sump_level(Element drain,Integer pit,Real &level)
```
invert of the sump
For the Element drain, which must be of type Drainage, and pit number pit, return the invert level of
the sump as level.
See  Drainage Pit Cross Section.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the sump invert level was successfully returned.

> **ID = 2789**

Set_drainage_pit_thickness(Element drain,Integer p,Real bottom,Real front,Real
back,Real left,Real right)

```c
Integer Set_drainage_pit_thickness(Element drain,Integer p,Real bottom,Real front,Real back,Real left,Real right)
```
For the Element drain, which must of type Drainage, set the thicknesses for the pth pit to bottom,
front back, left and right where
     bottom is the thickness of the bottom of the pit
     front is the thickness for a round pit and the front thickness for a rectangular pit
     back is the back thickness for a rectangular pit and not used for a round pit
     left is the left thickness for a rectangular pit and not used for a round pit
     right is the right thickness for a rectangular pit and not used for a round pit
See  Drainage Pit Definitions.
CAUTION: The Set_drainage_pit_type() and Set_drainage_pit_diameter() call will set the pit
thicknesses to the drainage.4d values.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2870**

Get_drainage_pit_thickness(Element drain,Integer p,Real &bottom,Real &front,Real
&back,Real &left,Real &right)

```c
Integer Get_drainage_pit_thickness(Element drain,Integer p,Real &bottom,Real &front,Real &back,Real &left,Real &right)
```
For the Element drain, which must of type Drainage, get the thicknesses for the pth pit and return
them in bottom, front back, left and right where
     bottom is the thickness of the bottom of the pit
     front is the thickness for a round pit, and the front thickness for a rectangular pit
     back is the back thickness for a rectangular pit and not used for a round pit
     left is the left thickness for a rectangular pit and not used for a round pit
    right is the right thickness for a rectangular pit and not used for a round pit
See  Drainage Pit Definitions.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the thicknesses was successfully returned.

> **ID = 2869**

Set_drainage_use_connection_points(Element drain,Integer use_connection_points)

```c
Integer Set_drainage_use_connection_points(Element drain,Integer use_connection_points)
```
For the Element drain, which must be of type Drainage, set whether pit connection points are used
or not.
If use_connection_points = 0, pit connection points are not used.
If use_connection_points = 1, pit connection points are used.
If connection points are to be used and there are no custom connection points defined for the pit in
the drainage.4d file, then every pipe goes to the centre of the closest rectangular side, or onto the
circle for circular pits.

If connection points are to be used and there are custom connection points defined for the pit in the
drainage.4d file, then the pipes go to the closest connection point.
See  Drainage Definitionsfor connection points.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the use_connection_points flag was successfully set.

> **ID = 2790**

Get_drainage_use_connection_points(Element drain,Integer
&use_connection_points)

```c
Integer Get_drainage_use_connection_points(Element drain,Integer &use_connection_points)
```
For the Element drain, return the pit connection point mode for the string in
use_connection_points.
If use_connection_points = 0, pit connection points are not used for drain.
If use_connection_points = 1, pit connection points are used for drain.
See  Drainage Definitionsfor connection points.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the use_connection_points flag was successfully
returned.

> **ID = 2791**

Set_drainage_pit_connection_points_mode(Element drainage,Integer pit,Integer
mode)

```c
Integer Set_drainage_pit_connection_points_mode(Element drainage,Integer pit,Integer mode)
```
Set connection points mode of the drainage string Element drainage at pit index pit to Integer
mode.
A return value of zero indicates the function call was successful.
The list of values for connection points mode:
0 Centre
1 Points
2 Perimeter
3 Unrestricted

> **ID = 2881**

???
Get_drainage_pit_connection_points_mode(Element drainage,Integer pit,Integer
&mode)

```c
Integer Get_drainage_pit_connection_points_mode(Element drainage,Integer pit,Integer &mode)
```
Get connection points mode of the drainage string Element drainage at pit index pit.
A return value of zero indicates the function call was successful.
The list of values for connection points mode
0 Centre
1 Points
2 Perimeter
3 Unrestricted

> **ID = 2882**

???
Set_drainage_pit_symbol_angle_mode(Element drainage,Integer pit,Integer mode)

```c
Integer Set_drainage_pit_symbol_angle_mode(Element drainage,Integer pit,Integer mode)
```
Set the pit symbol angle mode of the drainage string Element drainage at pit index pit to Integer
mode.
A return value of zero indicates the function call was successful.
The list of values for pit symbol angle mode
0 Floating
1 Setout String
2 Manual

> **ID = 2884**

???
Get_drainage_pit_symbol_angle_mode(Element drainage,Integer pit,Integer &mode)

```c
Integer Get_drainage_pit_symbol_angle_mode(Element drainage,Integer pit,Integer &mode)
```
Get the pit symbol angle mode of the drainage string Element drainage at pit index pit.
A return value of zero indicates the function call was successful.
The list of values for pit symbol angle mode
0 Floating
1 Setout String
2 Manual

> **ID = 2883**

???
Set_drainage_pit_2d_connection_mode(Element drainage,Integer pit,Integer mode)

```c
Integer Set_drainage_pit_2d_connection_mode(Element drainage,Integer pit,Integer mode)
```
Set the pit 2d connection mode of the drainage string Element drainage at pit index pit to Integer
mode.
A return value of zero indicates the function call was successful.
The list of values for pit 2d connection mode
0 Not set
1 Grate
2 Sump
3 Channel
4 None

> **ID = 2885**

???
Get_drainage_pit_2d_connection_mode(Element drainage,Integer pit,Integer
&mode)

```c
Integer Get_drainage_pit_2d_connection_mode(Element drainage,Integer pit,Integer &mode)
```
Get the pit 2d connection mode of the drainage string Element drainage at pit index pit.
A return value of zero indicates the function call was successful.
The list of values for pit 2d connection mode
0 Not set
1 Grate
2 Sump
3 Channel
4 None

> **ID = 2886**

???
Get_drainage_pit_connection(Element drainage,Integer mh_index,Integer
&mh_con_type,Element &con_string,Integer &con_mh_index,Integer &con_type)

```c
Integer Get_drainage_pit_connection(Element drainage,Integer mh_index,Integer &mh_con_type,Element &con_string,Integer &con_mh_index,Integer &con_type)
```
Get the pit connection information for the drainage string Element drainage at manhole index
mh_index.
A return value of zero indicates the function call was successful.

> **ID = 2889**

???

Drainage_Adjust_Pit_Connection_Points(Element drain,Integer pit)

```c
Integer Drainage_Adjust_Pit_Connection_Points(Element drain,Integer pit)
```
For the Element drain, which must be of type Drainage, recalculate the pit connection points for pit
number pit.
Note that this needs to be done if the pit was moved or changed. For example, changing the
diameter of the pit.
See  Drainage Definitionsfor connection points.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the connection points were successfully adjusted.

> **ID = 2792**

Drainage_Adjust_Pit_Connection_Points_All(Element drain)

```c
Integer Drainage_Adjust_Pit_Connection_Points_All(Element drain)
```
For the Element drain, which must be of type Drainage, recalculate the pit connection points for all
the pits in drain.
Note that this needs to be done if pits were moved or changed. For example, changing the diameter
of the pits.
See  Drainage Definitionsfor connection points.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the connection points were successfully adjusted.

> **ID = 2793**

Get_drainage_pit_connection_points(Element drain,Integer pit,Real &lx,Real
&ly,Real &rx,Real &ry)

```c
Integer Get_drainage_pit_connection_points(Element drain,Integer pit,Real &lx,Real &ly,Real &rx,Real &ry)
```
For the Element drain, which must be of type Drainage, return the pit connection points for pit
number pit.
The coordinates of the pit connection point for the pipe that comes into the pit from the left are
returned as (lx,ly).
The coordinates of the pit connection point for the pipe that goes out of the pit to the right are
returned as (rx,ry).
See  Drainage Definitionsfor connection points.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the connection points were successfully returned.

> **ID = 2847**

Set_drainage_pit_inverts(Element drain,Integer p,Real lhs,Real rhs)

```c
Integer Set_drainage_pit_inverts(Element drain,Integer p,Real lhs,Real rhs)
```
For the Element drain, which must be of type Drainage, set the invert levels of the pipes of drain
entering/leaving the pth pit.
The invert level of the pipe entering/leaving the left side of the pit is set to Real lhs.
The invert level of the pipe entering/leaving the right side of the pit is set to Real rhs.
See  Drainage Pipe Definitions for invert levels.
Note: this is setting the invert levels of the pipes entering/leaving the pth pit.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 514**

Get_drainage_pit_inverts(Element drain,Integer p,Real &lhs,Real &rhs)

```c
Integer Get_drainage_pit_inverts(Element drain,Integer p,Real &lhs,Real &rhs)
```
For the Element drain, which must be of type Drainage, get the invert levels of the pipes of drain
entering/leaving the pth pit.
The invert level of the pipe entering/leaving the left side of the pit is returned in lhs.
The invert level of the pipe entering/leaving the right side of the pit is returned in rhs.
See  Drainage Pipe Definitions for invert levels.
Note: this is getting the invert levels of the pipes entering/leaving the pth pit.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 508**

Get_drainage_pit_angle(Element drain,Integer p,Real &ang)

```c
Integer Get_drainage_pit_angle(Element drain,Integer p,Real &ang)
```
For the Element drain, which must of type Drainage, get the angle between pipes of drain entering
and leaving the pth pit, and return the angle as ang.
Note: this is not the angle of the drainage pit itself which is returned by the call
Get_drainage_pit_symbol_angle(Element drain,Integer pit,Real &angle).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 517**


Get_drainage_pit_angle (Element drain,Integer p,Real &ang,Integer trunk)

```c
Integer Get_drainage_pit_angle(Element drain,Integer p,Real &ang,Integer trunk)
```
For the Element drain, which must of type Drainage, for the pth pit, get the angle between incoming
pipe and the outgoing pipe, and return it as ang. ang is in radians.
If the drainage string is using connection points, the direction of the pipes at the connection points
are used.
If the drainage string is NOT using connection points, the direction of the pipes at the pit centre are
used.
trunk controls the action to be taken when the pit is at the downstream end of the drainage string.
If trunk in non-zero, then a trunk line will be searched for to obtain the outgoing pipe. If no trunk line
is found, ang = 0.
If trunk is zero, ang = 0.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 1294**

Get_drainage_pit_chainage(Element drain,Integer p,Real &chainage)

```c
Integer Get_drainage_pit_chainage(Element drain,Integer p,Real &chainage)
```
For the Element drain, which must be of type Drainage, return the chainage for the pth pit in
chainage.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 520**

Get_drainage_pit_chainages(Element drain,Integer pit,Real &ch_lcp,Real
&ch_centre,Real &ch_rcp)

```c
Integer Get_drainage_pit_chainages(Element drain,Integer pit,Real &ch_lcp,Real &ch_centre,Real &ch_rcp)
```
For the Element drain, which must be of type Drainage, and for pit number pit, return the chainages
of the pit connection points and the chainage of the centre of the pit.
The chainage of the pit connection point for the pipe that comes into the pit from the left is returned
as ch_lcp.
The chainage of the pit connection point for the pipe that goes out of the pit to the right is returned
as ch_rcp.
The chainage of the centre of the pit is returned as ch_centre.

If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the chainages were successfully returned.

> **ID = 2848**

Get_drainage_pit_shape(Element drain,Integer pit,Integer mode,Element
&super_inside,Element &super_outside)

```c
Integer Get_drainage_pit_shape(Element drain,Integer pit,Integer mode,Element &super_inside,Element &super_outside)
```
For the Element drain, which must be of type Drainage, return the plan shape of the inside of pit
number pit as the super string super_inside and the plan shape of the outside of the pit as
super_outside.
So for a circular pit with a wall thickness, a super string representing a circle of the diameter of the
pit is the super_inside and a circle of (diameter + 2*thickness) is the super_outside.
If mode = 0, the shapes are given the z-value of the bottom of the pit (sump bottom).
If mode = 1, the shapes are given the z-value of the invert of the sump.
If mode = 2, the shapes are given the z-value of the grate.
If mode = 3, the shapes are given the z-value of the cover.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the shapes were successfully returned.

> **ID = 2849**

Set_drainage_pit_float(Element drain,Integer pit,Integer pit_float)

```c
Integer Set_drainage_pit_float(Element drain,Integer pit,Integer pit_float)
```
For the Element drain, which must be of type Drainage, and pit number pit, set the flag for the
floating pit level to pit_float.
 mode = 3   cover level
 mode = 2   grate level
 mode = 1 sump invert
 mode = 0 bottom of pit
grate
pit cover
depth of pit

If pit_float = 1, the top of the pit automatically takes its level (height) from the finished surface tin for
the drainage string drain.
If pit_float = 0, the top of the pit level is fixed.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the pit_float value was successfully set.

> **ID = 1277**

Get_drainage_pit_float(Element drain,Integer pit,Integer &pit_float)

```c
Integer Get_drainage_pit_float(Element drain,Integer pit,Integer &pit_float)
```
For the Element drain, which must be of type Drainage, and pit number pit, return the flag for the
floating pit level as pit_float.
If pit_float = 1, the top of the pit automatically takes its level (height) from the finished surface tin for
the drainage string drain.
If pit_float = 0, the top of the pit level is fixed.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the pit_float value was successfully returned.

> **ID = 1276**

Set_drainage_pit_hgl(Element drain,Integer p,Real hgl)

```c
Integer Set_drainage_pit_hgl(Element drain,Integer p,Real hgl)
```
For the Element drain, which must be of type Drainage, set the hgl level for the centre of the pth pit
of the string to hgl.
If hgl is null then the hgl for the surface is not drawn.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 1241**

Get_drainage_pit_hgl(Element drain,Integer p,Real &hgl)

```c
Integer Get_drainage_pit_hgl(Element drain,Integer p,Real &hgl)
```
For the Element drain, which must be of type Drainage, get the hgl level for centre of the pth pit and
return it in hgl.
If hgl is null then the hgl for the surface is not drawn.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 1242**


Set_drainage_pit_surface_hgl(Element element,Integer pit,Real surface_hgl)

```c
Integer Set_drainage_pit_surface_hgl(Element element,Integer pit,Real surface_hgl)
```
For the Element drain, which must be of type Drainage, set the surface hgl level for the centre of the
pth pit of the string, to surface_hgl.
If surface_hgl is null then the hgl for the surface is not drawn.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2785**

Get_drainage_pit_surface_hgl(Element element,Integer pit,Real &surface_hgl

```c
Integer Get_drainage_pit_surface_hgl(Element element,Integer pit,Real &surface_hgl)
```
For the Element drain, which must be of type Drainage, get the surface hgl level for the centre of
the pth pit of the string, and return it in surface_hgl.
If surface_hgl is null then the hgl for the surface is not drawn.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2784**

Set_drainage_pit_hgls(Element drain,Integer p,Real lhs,Real rhs)

```c
Integer Set_drainage_pit_hgls(Element drain,Integer p,Real lhs,Real rhs)
```
For the Element drain, which must be of type Drainage, set the hgl levels of the pipes of drain
entering/leaving the pth pit.
The hgl level of the pipe entering/leaving the left side of the pit is given as Real lhs.
The hgl level of the entering/leaving right side of the pit is given as Real rhs.
Note: this is setting the hgl levels for the pipes entering/leaving the pth pit, not the hgl of the pit.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 538**

Get_drainage_pit_hgls(Element drain,Integer p,Real &lhs,Real &rhs)

```c
Integer Get_drainage_pit_hgls(Element drain,Integer p,Real &lhs,Real &rhs)
```
For the Element drain, which must be of type Drainage, get the hgl levels of the pipes of drain
entering/leaving the pth pit.
The hgl level of the pipe entering/leaving the left side of the pit is returned in Real lhs.
The hgl level of the pipe entering/leaving the right side of the pit is returned in Real rhs.
Note: this is getting the hgl levels of the pipes entering/leaving the pth pit, not the hgl of the pit.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 535**

Set_drainage_pit_road_chainage(Element drain,Integer p,Real chainage)

```c
Integer Set_drainage_pit_road_chainage(Element drain,Integer p,Real chainage)
```
For the Element drain, which must be of type Drainage, set the road chainage for the pth pit to
chainage.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 515**

Get_drainage_pit_road_chainage(Element drain,Integer p,Real &chainage)

```c
Integer Get_drainage_pit_road_chainage(Element drain,Integer p,Real &chainage)
```
For the Element drain, which must be of type Drainage, return the road chainage for the pth pit in
chainage.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 509**

Set_drainage_pit_road_name(Element drain,Integer p,Text name)

```c
Integer Set_drainage_pit_road_name(Element drain,Integer p,Text name)
```
For the Element drain, which must be of type Drainage, set the road name for the pth pit to name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 516**

Get_drainage_pit_road_name(Element drain,Integer p,Text &name)

```c
Integer Get_drainage_pit_road_name(Element drain,Integer p,Text &name)
```
For the Element drain, which must be of type Drainage, return the road name for the pth pit in
name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 510**

Set_drainage_pit_type(Element drain,Integer p,Text type)

```c
Integer Set_drainage_pit_type(Element drain,Integer p,Text type)
```
For the Element drain, which must be of type Drainage, set the type for the pth pit to type.
If the pit type type is in the drainge.4d file, then the call also sets the values for the pit to be those
given in the drainage.4d file for the pit type.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 512**

Get_drainage_pit_type(Element drain,Integer p,Text &type)

```c
Integer Get_drainage_pit_type(Element drain,Integer p,Text &type)
```
For the Element drain, which must be of type Drainage, return the type for the pth pit in type.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 506**

Get_drainage_pit_branches(Element drain,Integer p,Dynamic_Element &branches)

```c
Integer Get_drainage_pit_branches(Element drain,Integer p,Dynamic_Element &branches)
```
For the Element drain, which must be of type Drainage, this function returns a list of the branches
(each branch is a Drainage string) that flow into the pth pit of drain. The list of branches is returned
in the Dynamic_Element branches.
Note: a branch is defined as a drainage string that flows into a non-outlet pit of another drainage
string. Thus the flow direction of the drainage string is important.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 1443**


Get_drainage_pit_depth(Element drain,Integer p,Real &depth)

```c
Integer Get_drainage_pit_depth(Element drain,Integer p,Real &depth)
```
For the Element drain, which must be of type Drainage, return the depth of the pth pit in depth.
If drain is not an Element of type Drainage then a non zero function return code is returned.
See  for the def inion of pit depth.
A function return value of zero indicates the data was successfully returned.

> **ID = 519**

Get_drainage_pit_drop(Element drain,Integer p,Real &drop)

```c
Integer Get_drainage_pit_drop(Element drain,Integer p,Real &drop)
```
For the Element drain, which must be of type Drainage, return the drop through the pth pit in drop.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 518**

Get_drainage_pit_ns(Element drain,Integer n,Real &ns_ht)

```c
Integer Get_drainage_pit_ns(Element drain,Integer n,Real &ns_ht)
```
For the Element drain, which must be of type Drainage, return the height from the natural surface
tin at the location of the centre of the nth pit in ns_ht.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 521**

Get_drainage_pit_fs(Element drain,Integer n,Real &fs_ht)

```c
Integer Get_drainage_pit_fs(Element drain,Integer n,Real &fs_ht)
```
For the Element drain, which must be of type Drainage, return the height from the finished surface
tin at the location of the centre of the nth pit in fs_ht.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 522**

Set_drainage_pit_extended(Element e,Integer p,Integer extended,Integer

adjust_pit_con_points)

```c
Integer Set_drainage_pit_extended(Element e,Integer p,Integer extended,Integer adjust_pit_con_points)
```
For the Element drain, which must of type Drainage, set the extennded type for the pth pit to
extended. The list of valid type is
0 - not extended
1 - extended in the width direction
2 - extended in the length direction
If adjust_pit_con_points is not zero, recalculate the pit connection points for the pit after the
extended type being set.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3965**

Get_drainage_pit_extended(Element e,Integer p,Integer &extended)

```c
Integer Get_drainage_pit_extended(Element e,Integer p,Integer &extended)
```
For the Element drain, which must of type Drainage, return the extennded type for the pth pit in
extended. The list of valid type is
0 - not extended
1 - extended in the width direction
2 - extended in the length direction
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3966**

Set_drainage_pit_base_angle(Element e,Integer p,Real angle,Integer
adjust_pit_con_points)

```c
Integer Set_drainage_pit_base_angle(Element e,Integer p,Real angle,Integer adjust_pit_con_points)
```
For the Element drain, which must of type Drainage, set the base angle for the pth pit to angle.
If adjust_pit_con_points is not zero, recalculate the pit connection points for the pit after the angle
being set.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3967**

Get_drainage_pit_base_angle(Element e,Integer p,Real &angle)


```c
Integer Get_drainage_pit_base_angle(Element e,Integer p,Real &angle)
```
For the Element drain, which must of type Drainage, return the base angle for the pth pit in angle.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3968**

Set_drainage_pit_base_angle_mode(Element e,Integer p,Integer
base_angle_mode,Integer adjust_pit_con_points)

```c
Integer Set_drainage_pit_base_angle_mode(Element e,Integer p,Integer base_angle_mode,Integer adjust_pit_con_points)
```
For the Element drain, which must of type Drainage, set the base angle mode for the pth pit to
base_angle_mode.
If adjust_pit_con_points is not zero, recalculate the pit connection points for the pit after the angle
being set.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3969**

Get_drainage_pit_base_angle_mode(Element e,Integer p,Integer &base_angle_mode)

```c
Integer Get_drainage_pit_base_angle_mode(Element e,Integer p,Integer &base_angle_mode)
```
For the Element drain, which must of type Drainage, return the base angle mode for the pth pit in
base_angle_mode.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3970**

Set_drainage_pit_base_height(Element e,Integer p,Real pit_base_height)

```c
Integer Set_drainage_pit_base_height(Element e,Integer p,Real pit_base_height)
```
For the Element drain, which must of type Drainage, set the base height for the pth pit to
pit_base_height.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3971**


Get_drainage_pit_base_height(Element e,Integer p,Real &pit_base_height)

```c
Integer Get_drainage_pit_base_height(Element e,Integer p,Real &pit_base_height)
```
For the Element drain, which must of type Drainage, return the base height for the pth pit in
pit_base_height.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3972**

Set_drainage_pit_base_thickness_top(Element e,Integer p,Real
pit_base_thickness_top)

```c
Integer Set_drainage_pit_base_thickness_top(Element e,Integer p,Real pit_base_thickness_top)
```
For the Element drain, which must of type Drainage, set the base thickness top for the pth pit to
pit_base_thickness_top.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3973**

Get_drainage_pit_base_thickness_top(Element e,Integer p,Real
&pit_base_thickness_top)

```c
Integer Get_drainage_pit_base_thickness_top(Element e,Integer p,Real &pit_base_thickness_top)
```
For the Element drain, which must of type Drainage, return the base thickness top for the pth pit in
pit_base_thickness_top.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3974**

Set_drainage_pit_riser_thickness(Element e,Integer p,Real pit_riser_thickness,Real
pit_riser_thickness_back,Real pit_riser_thickness_left,Real pit_riser_thickness_right)

```c
Integer Set_drainage_pit_riser_thickness(Element e,Integer p,Real pit_riser_thickness,Real pit_riser_thickness_back,Real pit_riser_thickness_left,Real pit_riser_thickness_right)
```
For the Element drain, which must of type Drainage, set the riser thicknesses for the pth pit to
pit_riser_thickness, pit_riser_thickness_back, pit_riser_thickness_left,
pit_riser_thickness_right.

If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3975**

Get_drainage_pit_riser_thickness(Element e,Integer p,Real
&pit_riser_thickness,Real &pit_riser_thickness_back,Real
&pit_riser_thickness_left,Real &pit_riser_thickness_right)

```c
Integer Get_drainage_pit_riser_thickness(Element e,Integer p,Real &pit_riser_thickness,Real &pit_riser_thickness_back,Real &pit_riser_thickness_left,Real &pit_riser_thickness_right)
```
For the Element drain, which must of type Drainage, return the riser thicknesses for the pth pit in
pit_riser_thickness, pit_riser_thickness_back, pit_riser_thickness_left,
pit_riser_thickness_right.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3976**

Set_drainage_pit_riser(Element e,Integer p,Integer riser)

```c
Integer Set_drainage_pit_riser(Element e,Integer p,Integer riser)
```
For the Element drain, which must of type Drainage, set the active flag for the riser for the pth pit to
riser.(1 active, 0 not active)
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3977**

Get_drainage_pit_riser(Element e,Integer p,Integer &riser)

```c
Integer Get_drainage_pit_riser(Element e,Integer p,Integer &riser)
```
For the Element drain, which must of type Drainage, return the active flag for the riser for the pth pit
in riser.(1 active, 0 not active)
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3978**

Set_drainage_pit_riser_extended(Element e,Integer p,Integer riser_extended)

```c
Integer Set_drainage_pit_riser_extended(Element e,Integer p,Integer riser_extended)
```
For the Element drain, which must of type Drainage, set the extennded type for the riser for the pth
pit to extended. The list of valid type is
0 - not extended
1 - extended in the width direction
2 - extended in the length direction
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3979**

Get_drainage_pit_riser_extended(Element e,Integer p,Integer &riser_extended)

```c
Integer Get_drainage_pit_riser_extended(Element e,Integer p,Integer &riser_extended)
```
For the Element drain, which must of type Drainage, return the extennded type for the riser for the
pth pit in extended. The list of valid type is
0 - not extended
1 - extended in the width direction
2 - extended in the length direction
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3980**

Set_drainage_pit_riser_colour(Element e,Integer p,Integer colour)

```c
Integer Set_drainage_pit_riser_colour(Element e,Integer p,Integer colour)
```
For the Element drain, which must of type Drainage, set the colour for the riser for the pth pit to
colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3981**

Get_drainage_pit_riser_colour(Element e,Integer p,Integer &colour)

```c
Integer Get_drainage_pit_riser_colour(Element e,Integer p,Integer &colour)
```
For the Element drain, which must of type Drainage, return the colour for the riser for the pth pit in
colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3982**

Set_drainage_pit_riser_diameter(Element e,Integer p,Real pit_riser_diameter)

```c
Integer Set_drainage_pit_riser_diameter(Element e,Integer p,Real pit_riser_diameter)
```
For the Element drain, which must of type Drainage, set the diameter for the riser for the pth pit to
pit_riser_diameter.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3983**

Get_drainage_pit_riser_diameter(Element e,Integer p,Real &pit_riser_diameter)

```c
Integer Get_drainage_pit_riser_diameter(Element e,Integer p,Real &pit_riser_diameter)
```
For the Element drain, which must of type Drainage, return the diameter for the riser for the pth pit
in pit_riser_diameter.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3984**

Set_drainage_pit_riser_width(Element e,Integer p,Real pit_riser_width)

```c
Integer Set_drainage_pit_riser_width(Element e,Integer p,Real pit_riser_width)
```
For the Element drain, which must of type Drainage, set the width for the riser for the pth pit to
pit_riser_width
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3985**

Get_drainage_pit_riser_width(Element e,Integer p,Real &pit_riser_width)

```c
Integer Get_drainage_pit_riser_width(Element e,Integer p,Real &pit_riser_width)
```
For the Element drain, which must of type Drainage, return the width for the riser for the pth pit in
pit_riser_width.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3986**

Set_drainage_pit_riser_offset_xy(Element e,Integer p,Real pit_riser_offset_x,Real
pit_riser_offset_y)

```c
Integer Set_drainage_pit_riser_offset_xy(Element e,Integer p,Real pit_riser_offset_x,Real pit_riser_offset_y)
```
For the Element drain, which must of type Drainage, set the x-y offsets for the riser for the pth pit to
pit_riser_offset_x, pit_riser_offset_y
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 3987**

Get_drainage_pit_riser_offset_xy(Element e,Integer p,Real &pit_riser_offset_x,Real
&pit_riser_offset_y)

```c
Integer Get_drainage_pit_riser_offset_xy(Element e,Integer p,Real &pit_riser_offset_x,Real &pit_riser_offset_y)
```
For the Element drain, which must of type Drainage, return the x-y offsets for the riser for the pth pit
in pit_riser_offset_x, pit_riser_offset_y.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 3988**

Go to the next section 5.45.4 Drainage Pit Type Information in the drainage.4d Fileor return to 5.45
Drainage String Element.


### 5.45.4 Drainage Pit Type Information in the drainage.4d File

Get_drainage_number_of_manhole_types(Integer &num_types)

```c
Integer Get_drainage_number_of_manhole_types(Integer &num_types)
```
Get the number of pit (manhole, maintenance hole) types from the drainage.4d file and return the
number in num_types.
A function return value of zero indicates the data was successfully returned.

> **ID = 2077**

Get_drainage_manhole_type(Integer i,Text &type)

```c
Integer Get_drainage_manhole_type(Integer i,Text &type)
```
Get the name of the i’th manhole type from the drainage.4d file and return the name in type.
A function return value of zero indicates the data was successfully returned.

> **ID = 2078**

Get_drainage_manhole_length(Text type,Real &length)

```c
Integer Get_drainage_manhole_length(Text type,Real &length)
```
For the manhole of type type from the drainage.4d file, return the length as given by the keyword
"mhsize" in length (the length and width are given by the keyword "mhsize").
If there is no such manhole type, -1 is returned as the function return value.
If the length does not exist for the manhole type type, -2 is returned as the function return value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2079**

Get_drainage_manhole_width(Text type,Real &width)

```c
Integer Get_drainage_manhole_width(Text type,Real &width)
```
For the manhole of type type from the drainage.4d file, return the width as given by the keyword
"mhsize" in width (the length and width are given by the keyword "mhsize").
If there is no such manhole type, -1 is returned as the function return value.
If the width does not exist for manhole type type, -2 is returned as the function return value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2080**

Get_drainage_manhole_description(Text type,Text &description)

```c
Integer Get_drainage_manhole_description(Text type,Text &description)
```
Get the description of the manhole of type type from the drainage.4d file and return the description
in description.
If there is no such manhole type, -1 is returned as the function return value.
If the description does not exist for manhole type type, -2 is returned as the function return value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2081**

Get_drainage_manhole_notes(Text type,Text &notes)

```c
Integer Get_drainage_manhole_notes(Text type,Text &notes)
```
Get the notes of the manhole of type type from the drainage.4d file and return the notes in notes.
If there is no such manhole type, -1 is returned as the function return value.
If notes do not exist for manhole type type, -2 is returned as the function return value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2082**

Get_drainage_manhole_group(Text type,Text &group)

```c
Integer Get_drainage_manhole_group(Text type,Text &group)
```
Get the group of the manhole of type type from the drainage.4d file and return the group in group.
If there is no such manhole type, -1 is returned as the function return value.
If group does not exist for manhole type type, -2 is returned as the function return value.
A function return value of zero indicates the data was successfully returned.

> **ID = 2083**

Get_drainage_manhole_capacities(Text type,Real &multi,Real &fixed, Real
&percent,Real &coeff,Real &power)

```c
Integer Get_drainage_manhole_capacities(Text type,Real &multi,Real &fixed,Real &percent,Real &coeff,Real &power)
```
From the drainage.4d file, for the manhole of type type return the values for the generic Inlet

capacities from the file for:
          cap_multi            // if undefined the default is 1
          cap_fixed            // if undefined the default is 0
          cap_percent        // if undefined the default is 0
          cap_coeff            // if undefined the default is 0
          cap_power            // if undefined the default is 1
A function return value of zero indicates the data was successfully returned.

> **ID = 2084**

Get_drainage_number_of_sag_curves(Text type,Integer &n)

```c
Integer Get_drainage_number_of_sag_curves(Text type,Integer &n)
```
From the drainage.4d file, for the manhole of type type, get the number of sag capacity curves
(cap_curve_sag) and return the number in n.
A function return value of zero indicates the number was successfully returned.

> **ID = 2085**

Get_drainage_sag_curve_name(Text type,Text &name)

```c
Integer Get_drainage_sag_curve_name(Text type,Text &name)
```
From the drainage.4d file, for the manhole of type type, return the name of the sag capacity curve
(cap_curve_sag) in name.
A function return value of zero indicates the data was successfully returned.

> **ID = 2086**

Get_drainage_manhole_capacities_sag(Text type,Real &multi,Real &fixed,Real
&percent,Real &coeff,Real &power)

```c
Integer Get_drainage_manhole_capacities_sag(Text type,Real &multi,Real &fixed,Real &percent,Real &coeff,Real &power)
```
From the drainage.4d file, for the manhole of type type, return the sag capacity curve
(cap_curve_sag) values from the file for:
          cap_multi            // if undefined the default is 1
          cap_fixed            // if undefined the default is 0
          cap_percent        // if undefined the default is 0
          cap_coeff            // if undefined the default is 0
          cap_power            // if undefined the default is 1
A function return value of zero indicates the data was successfully returned.

> **ID = 2087**


Get_drainage_number_of_sag_curve_coords(Text type,Integer &n)

```c
Integer Get_drainage_number_of_sag_curve_coords(Text type,Integer &n)
```
From the drainage.4d file, for the manhole of type type, return the number of coordinates in the sag
capacity curve (cap_curve_sag) in n.
Note - n may be 0.
A function return value of zero indicates the number was successfully returned.

> **ID = 2088**

Get_drainage_sag_curve_coords(Text type,Real Depth[],Real Qin[],Integer
nmax,Integer &num)

```c
Integer Get_drainage_sag_curve_coords(Text type,Real Depth[],Real Qin[],Integer nmax,Integer &num)
```
From the drainage.4d file, for the manhole of type type, return the coordinates for the sag capacity
curve (cap_curve_sag) in Depth[] and Qin[].
nmax is the size of the arrays Depth[] and Qin[], and num returns the actual number of coordinates.
A function return value of zero indicates the coordinates were successfully returned.

> **ID = 2089**

Get_drainage_number_of_grade_curves(Text type,Integer &n)

```c
Integer Get_drainage_number_of_grade_curves(Text type,Integer &n)
```
From the drainage.4d file, for the manhole of type type, get the number of grade curves
(cap_curve_grade) and return the number in n.
A function return value of zero indicates the number was successfully returned.

> **ID = 2090**

Get_drainage_grade_curve_name(Text type,Integer i,Text &name)

```c
Integer Get_drainage_grade_curve_name(Text type,Integer i,Text &name)
```
From the drainage.4d file, for the manhole of type type, return the name of the i’th grade curve
(cap_curve_grade) in name.
A function return value of zero indicates the name was successfully returned.

> **ID = 2091**

Get_drainage_grade_curve_threshold(Text type,Text name,Integer &by_grade,Real
&road_grade,Integer &by_xfall,Real &road_xfall)


```c
Integer Get_drainage_grade_curve_threshold(Text type,Text name,Integer &by_grade,Real &road_grade,Integer &by_xfall,Real &road_xfall)
```
From the drainage.4d file, for the manhole of type type, and the capacity on grade curve called
name:
if the keyword "road_grade" exists then by_grade is set to 1 and the road on grade value is
returned in road_grade. Otherwise by_grade is set to 0.
if the keyword "road_crossfall" exists then by_crossfall is set to 1 and the road crossfall value is
returned in road_xfall. Otherwise by_xfall is set to 0.
A function return value of zero indicates the values were successfully returned.

> **ID = 2092**

Get_drainage_manhole_capacities_grade(Text type,Text name,Real &multi,Real
&fixed,Real &percent,Real &coeff,Real &power)

```c
Integer Get_drainage_manhole_capacities_grade(Text type,Text name,Real &multi,Real &fixed,Real &percent,Real &coeff,Real &power)
```
From the drainage.4d file, for the manhole of type type, and the capacity on grade curve called
name, return the sag capacity curve (cap_curve_grade) values from the file for:
          cap_multi            // if undefined the default is 1
          cap_fixed            // if undefined the default is 0
          cap_percent        // if undefined the default is 0
          cap_coeff            // if undefined the default is 0
          cap_power            // if undefined the default is 1
A function return value of zero indicates the data was successfully returned.

> **ID = 2093**

Get_drainage_number_of_grade_curve_coords(Text type,Text name,Integer &n)

```c
Integer Get_drainage_number_of_grade_curve_coords(Text type,Text name,Integer &n)
```
From the drainage.4d file, for the manhole of type type, and the capacity on grade curve called
name, return the number of coordinates in the on grade capacity curve (cap_curve_grade) in n.
Note - n may be 0.
A function return value of zero indicates the number was successfully returned.

> **ID = 2094**

Get_drainage_grade_curve_coords(Text type,Text name,Real Qa[],Real Qin[],Integer
nmax,Integer &n)

```c
Integer Get_drainage_grade_curve_coords(Text type,Text name,Real Qa[],Real Qin[],Integer nmax,Integer &n)
```
From the drainage.4d file, for the manhole of type type, and the capacity on grade curve called
name, return the coordinates for the on grade capacity curve (cap_curve_grade) in Qa[] and Qin[].
nmax is the size of the arrays Qa[] and Qin[], and num returns the actual number of coordinates.
A function return value of zero indicates the coordinates were successfully returned.

> **ID = 2095**

Get_drainage_manhole_config(Text type,Text &cap_config)

```c
Integer Get_drainage_manhole_config(Text type,Text &cap_config)
```
From the drainage.4d file, for the manhole of type type, return the value of the keyword "cap_config"
in cap_config.
The value of cap_config must be:
"g" - for an on grade pit
"s" - for an sag pit
or
"m" - for a manhole sealed pit.
If the value of cap_config is not "g", "s" or "m" then a non zero function return value is returned.
A function return value of zero indicates the value was successfully returned.

> **ID = 2103**

Get_drainage_manhole_diam(Text type,Real &diameter)

```c
Integer Get_drainage_manhole_diam(Text type,Real &diameter)
```
From the drainage.4d file, for the manhole of type type, return the value of the keyword "mhdiam" in
diameter.
A function return value of zero indicates the value was successfully returned.

> **ID = 2104**

Get_drainage_manhole_types(Text water_type,Dynamic_Text &types)

```c
Integer Get_drainage_manhole_types(Text water_type,Dynamic_Text &types)
```
From the drainage.4d file, for given purpose water_type, return the list of manhole types in types.
A function return value of zero indicates the types was successfully returned.

> **ID = 3860**

Go to the next section 5.45.5 Drainage String Pit Attributes
Element.


### 5.45.5 Drainage String Pit Attributes

Get_drainage_pit_attribute_length(Element drain,Integer pit,Integer att_no,Integer
&att_len)

```c
Integer Get_drainage_pit_attribute_length(Element drain,Integer pit,Integer att_no,Integer &att_len)
```
For pit number pit of the Element drain, get the length (in bytes) of the attribute number att_no. The
attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for attributes of type Text and Binary.

> **ID = 1005**

Get_drainage_pit_attribute_length(Element drain,Integer pit,Text att_name,Integer
&att_len)

```c
Integer Get_drainage_pit_attribute_length(Element drain,Integer pit,Text att_name,Integer &att_len)
```
For pit number pit of the Element drain, get the length (in bytes) of the attribute with the name
att_name. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for user attributes of type Text and Binary.

> **ID = 1004**

Get_drainage_pit_attribute_type(Element drain,Integer pit,Integer att_no,Integer
&att_type)

```c
Integer Get_drainage_pit_attribute_type(Element drain,Integer pit,Integer att_no,Integer &att_type)
```
For pit number pit of the Element drain, get the type of the attribute with attribute number att_no.
The attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.

> **ID = 1003**

Get_drainage_pit_attribute_type(Element drain,Integer pit,Text att_name,Integer
&att_type)

```c
Integer Get_drainage_pit_attribute_type(Element drain,Integer pit,Text att_name,Integer &att_type)
```
For pit number pit of the Element drain, get the type of the attribute with name att_name. The
attribute type is returned in att_type.

A function return value of zero indicates the attribute type was successfully returned.

> **ID = 1002**

Get_drainage_pit_attribute_name(Element drain,Integer pit,Integer att_no,Text
&name)

```c
Integer Get_drainage_pit_attribute_name(Element drain,Integer pit,Integer att_no,Text &name)
```
For pit number pit of the Element drain, get the name of the attribute number att_no. The attribute
name is returned in name.
A function return value of zero indicates the attribute name was successfully returned.

> **ID = 1001**

Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Real &real)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Real &real)
```
For the Element drain, get the attribute with number att_no for the pit number pit and return the
attribute value in real. The attribute must be of type Real.
If the Element is not of type Drainage or the attribute is not of type Real then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 1000**

Get_drainage_pit_attribute (Element drain,Integer pit,Integer att_no,Integer &int)

```c
Integer Get_drainage_pit_attribute (Element drain,Integer pit,Integer att_no,Integer &int)
```
For the Element drain, get the attribute with number att_no for the pit number pit and return the
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Drainage or the attribute is not of type Integer then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 999**

Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Text &txt)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Text &txt)
```
For the Element drain, get the attribute with number att_no for the pit number pit and return the
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Drainage or the attribute is not of type Text then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 998**

Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Real &real)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Real &real)
```
For the Element drain, get the attribute called att_name for the pit number pit and return the
attribute value in real. The attribute must be of type Real.
If the Element is not of type Drainage or the attribute is not of type Real then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 997**

Get_drainage_pit_number_of_attributes(Element drain,Integer pit,Integer &no_atts)

```c
Integer Get_drainage_pit_number_of_attributes(Element drain,Integer pit,Integer &no_atts)
```
Get the total number of attributes for pit number pit of the Element drain.
The total number of attributes is returned in Integer no_atts.
A function return value of zero indicates the number of attributes was successfully returned.

> **ID = 994**

Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Text &txt)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Text &txt)
```
For the Element drain, get the attribute called att_name for the pit number pit and return the
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Drainage or the attribute is not of type Text then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.

Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 995**

Get_drainage_pit_attribute (Element drain,Integer pit,Text att_name,Integer &int)

```c
Integer Get_drainage_pit_attribute (Element drain,Integer pit,Text att_name,Integer &int)
```
For the Element drain, get the attribute called att_name for the pit number pit and return the
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Drainage or the attribute is not of type Integer then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 996**

Get_drainage_pit_attributes(Element drain,Integer pit,Attributes &att)

```c
Integer Get_drainage_pit_attributes(Element drain,Integer pit,Attributes &att)
```
For the Element drain, return the Attributes for the pit number pit as att.
If the Element is not of type Drainage or the pit number pit has no attribute then a non-zero return
value is returned.
A function return value of zero indicates the attribute is successfully returned.

> **ID = 2022**

Set_drainage_pit_attributes(Element drain,Integer pit,Attributes att)

```c
Integer Set_drainage_pit_attributes(Element drain,Integer pit,Attributes att)
```
For the Element drain, set the Attributes for the pit number pit to att.
If the Element is not of type Drainage then a non-zero return value is returned.
A function return value of zero indicates the attribute is successfully set.

> **ID = 2023**

Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Uid &uid)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Uid &uid)
```
For the Element drain, get the attribute called att_name for the pit number pit and return the

attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Drainage or the attribute is not of type Uid then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2024**

Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Attributes &att)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Attributes &att)
```
For the Element drain, get the attribute called att_name for the pit number pit and return the
attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Drainage or the attribute is not of type Attributes then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2025**

Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Uid &uid)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Uid &uid)
```
For the Element drain, get the attribute with number att_no for the pit number pit and return the
attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Drainage or the attribute is not of type Uid then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number
att_no.

> **ID = 2026**

Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Attributes &att)

```c
Integer Get_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Attributes &att)
```
For the Element drain, get the attribute with number att_no for the pit number pit and return the
attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Drainage or the attribute is not of type Attributes then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number

att_no.

> **ID = 2027**

Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Uid uid)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Uid uid)
```
For the Element drain and on the pit number pit,
   if the attribute called att_name does not exist then create it as type Uid and give it the value uid.
   if the attribute called att_name does exist and it is type Uid, then set its value to uid.
If the attribute exists and is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2028**

Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Attributes att)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Attributes att)
```
For the Element drain and on the pit number pit,
   if the attribute called att_name does not exist then create it as type Attributes and give it the value
att.
   if the attribute called att_name does exist and it is type Attributes, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2029**

Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Uid uid)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Uid uid)
```
For the Element drain and on the pit number pit, if the attribute number att_no exists and it is of
type Uid, then its value is set to uid.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is
returned.
If the attribute of number att_no exists and is not of type Uid then a non-zero return value is
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> **ID = 2030**


Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Attributes att)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Attributes att)
```
For the Element drain and on the pit number pit, if the attribute number att_no exists and it is of
type Attributes, then its value is set to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is
returned.
If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> **ID = 2031**

Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Real real)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Real real)
```
For the Element drain and on the pit number pit,
   if the attribute with number att_no does not exist then create it as type Real and give it the value
real.
   if the attribute with number att_no does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute number
att_no.

> **ID = 1011**

Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Integer int)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Integer int)
```
For the Element drain and on the pit number pit,
   if the attribute with number att_no does not exist then create it as type Integer and give it the
value int.
   if the attribute with number att_no does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute number
att_no.

> **ID = 1010**


Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Text txt)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Integer att_no,Text txt)
```
For the Element drain and on the pit number pit,
   if the attribute with number att_no does not exist then create it as type Text and give it the value
txt.
   if the attribute with number att_no does exist and it is type Text then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute number
att_no.

> **ID = 1009**

Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Real real)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Real real)
```
For the Element drain and on the pit number pit,
   if the attribute called att_name does not exist then create it as type Real and give it the value real.
   if the attribute called att_name does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1008**

Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Integer int)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Integer int)
```
For the Element drain and on the pit number pit
   if the attribute called att_name does not exist then create it as type Integer and give it the value
int.
   if the attribute called att_name does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1007**

Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Text txt)

```c
Integer Set_drainage_pit_attribute(Element drain,Integer pit,Text att_name,Text txt)
```
For the Element drain and on the pit number pit,
   if the attribute called att_name does not exist then create it as type Text and give it the value txt.
   if the attribute called att_name does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pit_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1006**

Drainage_pit_attribute_exists(Element drain,Integer pit,Text att_name)

```c
Integer Drainage_pit_attribute_exists (Element drain,Integer pit,Text att_name)
```
For the Element drain, checks to see if an attribute with the name att_name exists for pit number
pit.
A non-zero function return value indicates that an attribute of that name exists.
If the attribute does not exist, or drain is not of type Drainage, or there is no pit number pit, a zero
function return value is returned.
Warning - this is the opposite of most 12dPL function return values.

> **ID = 987**

Drainage_pit_attribute_exists (Element drain,Integer pit,Text name,Integer &no)

```c
Integer Drainage_pit_attribute_exists (Element drain,Integer pit,Text name,Integer &no)
```
For the Element drain, checks to see if an attribute with the name att_name exists for pit number
pit.
If the attribute of that name exists, its attribute number is returned is no.
A non-zero function return value indicates that an attribute of that name exists.
If the attribute does not exist, or drain is not of type Drainage, or there is no pit number pit, a zero
function return value is returned.
Warning - this is the opposite of most 12dPL function return values.

> **ID = 988**

Drainage_pit_attribute_delete (Element drain,Integer pit,Text att_name)

```c
Integer Drainage_pit_attribute_delete (Element drain,Integer pit,Text att_name)
```
For the Element drain, delete the attribute with the name att_name for pit number pit.
If the Element drain is not of type Drainage or drain has no pit number pit, then a non-zero return

code is returned.
A function return value of zero indicates the attribute was deleted.

> **ID = 989**

Drainage_pit_attribute_delete (Element drain,Integer pit,Integer att_no)

```c
Integer Drainage_pit_attribute_delete (Element drain,Integer pit,Integer att_no)
```
For the Element drain, delete the attribute with attribute number att_no for pit number pit.
If the Element drain is not of type Drainage or drain has no pit number pit, then a non-zero return
code is returned.
A function return value of zero indicates the attribute was deleted.

> **ID = 990**

Drainage_pit_attribute_delete_all (Element drain,Integer pit)

```c
Integer Drainage_pit_attribute_delete_all (Element drain,Integer pit)
```
Delete all the attributes of pit number pit of the drainage string drain.
A function return value of zero indicates the function was successful.

> **ID = 991**

Drainage_pit_attribute_dump (Element drain,Integer pit)

```c
Integer Drainage_pit_attribute_dump (Element drain,Integer pit)
```
Write out information to the Output Window about the pit attributes for pit number pit of the drainage
string drain.
A function return value of zero indicates the function was successful.

> **ID = 992**

Drainage_pit_attribute_debug (Element drain,Integer pit)

```c
Integer Drainage_pit_attribute_debug (Element drain,Integer pit)
```
Write out even more information to the Output Window about the pit attributes for pit number pit of
the drainage string drain.
A function return value of zero indicates the function was successful.

> **ID = 993**


Go to the next section 5.45.6 Drainage String Pipes

### 5.45.6 Drainage String Pipes

Drainage Pipe Definitions
Drainage pipe number n goes from drainage pit number n and pit number n+1. The left end of the
pipe is the end closest to pit n, and the right end is the end closes to pit n+1.
Drainage Pipe Cross Sections
A drainage pipe can have either a Circular, Box or Trapezoid cross section depending on whether
only a diameter is defined (circular), only a diameter and a width are defined (box), or a diameter,
width and top width are defined (trapezoid). The box and trapezoid will be referred to as non round
pipes.
Pipes can also have thicknesses.
For a round pipe, there is only one thickness.
For a non round pipe, there is a top_thickness, bottom_thickness, left_thickness and
right_thickness. Note that the left and right are defined when going in the chainage direction of the
pipe.
So diameter, width and top width refer to the internal dimensions of the pipe and for a
    round pipe, the external diameter = diameter + 2 * thickness
    box pipe, the external diameter = diameter + top thickness + bottom thickness
                    the external width = width + left thickness + right thickness
    trapezoid pipe, the external diameter = diameter + top thickness + bottom thickness
                    the external width = width + left thickness + right thickness
                    the external top width = top width + left thickness + right thickness
Drainage Pipe Definitions
 pit number n
 pit number n+1
 pipe number n
 left end of pipe
 right end of pipe
 left invert level
 right invert level
 pipe thickness
Section View


diameter
width
top width = null
top width
diameter
width
diameter
top width = null
width = null
Circular
Box
Trapezoid
bottom thickness
top thickness
left thickness
right thickness
right thickness
left thickness
top
thickness
Section View

Set_drainage_pipe_inverts(Element drain,Integer p,Real lhs,Real rhs)

```c
Integer Set_drainage_pipe_inverts(Element drain,Integer p,Real lhs,Real rhs)
```
Set the pipe invert levels for the pth pipe of the string Element drain.
The invert level of the left hand end of the pipe is given as Real lhs.
The invert level of the right hand end of the pipe is given as Real rhs.
See  Drainage Pipe Definitions.
Note: pipe invert levels can also be set using the call  Set_drainage_pit_inverts(Element
drain,Integer p,Real lhs,Real rhs).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 536**

Get_drainage_pipe_inverts(Element drain,Integer p,Real &lhs,Real &rhs)

```c
Integer Get_drainage_pipe_inverts(Element drain,Integer p,Real &lhs,Real &rhs)
```
Get the pipe invert levels for the pth pipe of the string Element drain.
The invert level of the pipe of the left hand end of the pipe is returned in Real lhs.
The invert level of the right hand end of the pipe is returned in Real rhs.
See  Drainage Pipe Definitions.
Note: pipe invert levels can also be returned using the call  Get_drainage_pit_inverts(Element
drain,Integer p,Real &lhs,Real &rhs).
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 533**

Set_drainage_pipe_number_of_pipes(Element drain,Integer pipe,Integer n)

```c
Integer Set_drainage_pipe_number_of_pipes(Element drain,Integer pipe,Integer n)
```
For the Element drain, which must be of type Drainage, and for the pipe number pipe, set the
number of pipes to be n.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the number was successfully set.

> **ID = 2852**

Get_drainage_pipe_number_of_pipes(Element drain,Integer pipe,Integer &n)

```c
Integer Get_drainage_pipe_number_of_pipes(Element drain,Integer pipe,Integer &n)
```
For the Element drain, which must be of type Drainage, and for the pipe number pipe, return the
number of pipes as n.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the number was successfully returned.

> **ID = 2853**

Set_drainage_pipe_colour(Element drain,Integer p,Integer colour)

```c
Integer Set_drainage_pipe_colour(Element drain,Integer p,Integer colour)
```
Set the colour of the pth pipe of the Element drain to colour number colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2783**

Get_drainage_pipe_colour(Element drain,Integer p,Integer &colour)

```c
Integer Get_drainage_pipe_colour(Element drain,Integer p,Integer &colour)
```
Get the colour number of the pth pipe of the Element drain and return the colour number in colour.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 2782**

Set_drainage_pipe_name(Element drain,Integer p,Text name)

```c
Integer Set_drainage_pipe_name(Element drain,Integer p,Text name)
```
Set the pipe name for the pth pipe of the string Element drain.
The pipe name is given as Text name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 502**

Get_drainage_pipe_name(Element drain,Integer p,Text &name)

```c
Integer Get_drainage_pipe_name(Element drain,Integer p,Text &name)
```
Get the pipe name for the pth pipe of the string Element drain.
The pipe name is returned in Text name.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 497**

Set_drainage_pipe_type(Element drain,Integer p,Text type)

```c
Integer Set_drainage_pipe_type(Element drain,Integer p,Text type)
```
Set the pipe type for the pth pipe of the string Element drain.
The pipe type is given as Text type.
If the pipe type type is in the drainge.4d file, then the call also sets the values for the pipe to be
those given in the drainage.4d file for the pipe type.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 501**

Get_drainage_pipe_type(Element drain,Integer p,Text &type)

```c
Integer Get_drainage_pipe_type(Element drain,Integer p,Text &type)
```
Get the pipe type for the pth pipe of the string Element drain.
The pipe type is returned in Text type.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 496**

Set_drainage_pipe_cover(Element drain,Integer pipe,Real cover)

```c
Integer Set_drainage_pipe_cover(Element drain,Integer pipe,Real cover)
```
For the Element drain, which must be of type Drainage, set the minimum cover for pipe number
pipe, to cover.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 1442**

Get_drainage_pipe_cover(Element drain,Integer pipe,Real &minc,Real &maxc)


```c
Integer Get_drainage_pipe_cover(Element drain,Integer pipe,Real &minc,Real &maxc)
```
For the Element drain, which must be of type Drainage, return the minimum cover value for pipe
number pipe, in cover.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 1441**

Set_drainage_pipe_diameter(Element drain,Integer p,Real diameter)

```c
Integer Set_drainage_pipe_diameter(Element drain,Integer p,Real diameter)
```
Set the pipe diameter for the pth pipe of the string Element drain.
The pipe diameter is given as Real diameter.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 500**

Set_drainage_pipe_width(Element drain,Integer pipe,Real &width)

```c
Integer Set_drainage_pipe_width(Element drain,Integer pipe,Real &width)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, set the width of the
pipe to the value width.
If a width is not to be used then set a null value for width.
See  Drainage Pipe Cross Sections.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the width was successfully set.

> **ID = 2857**

Set_drainage_pipe_top_width(Element drain,Integer pipe,Real &top_width)

```c
Integer Set_drainage_pipe_top_width(Element drain,Integer pipe,Real &top_width)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, set the top width of
the pipe to the value top_width.
If a top width is not to be used then set a null value for top_width.
See  Drainage Pipe Cross Sections.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the top width was successfully set.

> **ID = 2858**

Get_drainage_pipe_diameter(Element drain,Integer p,Real &diameter)

```c
Integer Get_drainage_pipe_diameter(Element drain,Integer p,Real &diameter)
```
Get the pipe diameter for the pth pipe of the string Element drain.
The pipe diameter is returned in Real diameter.
See  Drainage Pipe Cross Sections.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 495**

Get_drainage_pipe_width(Element drain,Integer pipe,Real &width)

```c
Integer Get_drainage_pipe_width(Element drain,Integer pipe,Real &width)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, get the width of the
pipe and return it in width.
If a width is not to be used then a null value is returned for width.
If drain is not an Element of type Drainage then a non zero function return code is returned.
See  Drainage Pipe Cross Sections.
A function return value of zero indicates the width was successfully returned.

> **ID = 2855**

Get_drainage_pipe_top_width(Element drain,Integer pipe,Real &top_width)

```c
Integer Get_drainage_pipe_top_width(Element drain,Integer pipe,Real &top_width)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, get the top width of
the pipe and return it in top_width.
If a top width is not to be used then a null value is returned for top_width.
See  Drainage Pipe Cross Sections.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the top width was successfully returned.

> **ID = 2856**

Get_drainage_pipe_thickness(Element drain,Integer pipe,Real &top,Real
&bottom,Real &left,Real &right)

```c
Integer Get_drainage_pipe_thickness(Element drain,Integer pipe,Real &top,Real &bottom,Real &left,Real &right)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, set the pipe
thicknesses to top, bottom, left and right where
     top is the thickness for a round pipe, and the top thickness for a non round pipe.
     bottom is the thickness of the bottom of the pipe for a non round pipe.
     left is the thickness of the left of the pipe for a non round pipe.
     right is the thickness of the right of the pipe for a non round pipe.
See  Drainage Pipe Cross Sections.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the thicknesses were successfully set.

> **ID = 2867**

Set_drainage_pipe_thickness(Element drain,Integer pit,Real top,Real bottom,Real
left,Real right)

```c
Integer Set_drainage_pipe_thickness(Element drain,Integer pit,Real top,Real bottom,Real left,Real right)
```
For the Element drain, which must be of type Drainage, and pipe number pipe, return the pipe
thicknesses in top, bottom, left and right where
     top is the thickness for a round pipe, and the top thickness for a non round pipe.
     bottom is the thickness of the bottom of the pipe for a non round pipe.
     left is the thickness of the left of the pipe for a non round pipe.
     right is the thickness of the right of the pipe for a non round pipe.
See  Drainage Pipe Cross Sections.
CAUTION: The Set_drainage_pipe_type() and Set_drainage_pipe_diameter() call will set the
pipe thicknesses to the drainage.4d values.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the thicknesses were successfully returned.

> **ID = 2868**

Get_drainage_pipe_intersects_pit(Element drain,Integer pipe,Real offset,Real
&lx,Real &ly,Real &lch,Real &rx,Real &ry,Real &rch)

```c
Integer Get_drainage_pipe_intersects_pit(Element drain,Integer pipe,Real offset,Real &lx,Real &ly,Real &lch,Real &rx,Real &ry,Real &rch)
```
For the Element drain, which must be of type Drainage, and for pipe number pipe, get the (x,y)
coordinates and chainage of the intersection of the pipe offset (in the (x,y) pane) by the distance
offset, with the pits at either end of the offset pipe.
If offset is positive then the pipe is offset to the right of the original pipe, and to the left when the
offset is negative. Left and right are defined with respect to the direction of the pipe.
The coordinates of the intersection of the pipe with the left hand pit are returned as (lx,ly) and the

chainage of the intersection point as lch.
The coordinates of the intersection of the pipe with the right hand pit are returned as (rx,ry) and the
chainage of the intersection point as rch.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the values were successfully returned.

> **ID = 2851**

Get_drainage_pipe_shape(Element element,Integer pipe,Integer
mode,Dynamic_Element &super_inside,Dynamic_Element &super_outside)

```c
Integer Get_drainage_pipe_shape(Element element,Integer pipe,Integer mode,Dynamic_Element &super_inside,Dynamic_Element &super_outside)
```
For the Element drain, which must be of type Drainage, return as super strings, the shape of the
insides of the pipes in the Dynamic_Element super_inside and the shape of the outsides of the
pipes in the Dynamic_Element super_outside. The number of pipes, separation and thickness
settings are used in generating all the shapes.
So this function returns a list of the super strings that “draw” the plan view of the inside and outside
of the pipes.
For a circular pipe with wall thickness, the super_inside string is a super string with a plan box
shape with a width of the diameter of the pipe and a length equal to the length of the pipe. And
super_outside has a width equal to (diameter + 2*thickness).
For a rectangular pipe with a wall thicknesses, the super_inside is a super string with a plan box
shape with a width of the diameter of the pipe and a length equal to the length of the pipe. And
super_outside has a width equal to (diameter + left_thickness + right_thickness)
mode controls the z values assigned to the super strings.
If mode = 0, the shapes are given the z-value of the invert levels of the pipes.
If mode = 1, the shapes are given the z-value of the centre levels of the pipes.
If mode = 2, the shapes are given the z-value of the obvert levels of the pipes.
A function return value of 2 indicates the super strings could not be created.
A function return value of zero indicates the shapes were successfully returned.

> **ID = 2854**

Get_drainage_pipe_shape(Element drain,Integer pipe,Integer mode,Real
offset,Element &super_inside,Element &super_outside)

```c
Integer Get_drainage_pipe_shape(Element drain,Integer pipe,Integer mode,Real offset,Element &super_inside,Element &super_outside)
```
For the Element drain, which must be of type Drainage, return the shape of the inside of pipe
number pipe as the super string super_inside and the shape of the outside of the pipe as
super_outside, and the shapes are offset in the (x,y) plane from the pipe by the distance offset.
If offset is positive then the shapes are offset to the right of the pipe and to the left when the offset is
negative. Left and right is defined with respect to the direction of the pipe.
So this function returns a list of the super strings that “draw” the plan view of the inside and outside

of the pipe offset by the given value offset.
For for a circular pipe with a wall thickness, the super_inside is a super string with a plan box shape
with a width of the diameter of the pipe and a length equal to the length of the pipe. And
super_outside has a width equal to (diameter + 2*thickness).
For a rectangular pipe with a wall thicknesses, the super_inside is a super string with a plan box
shape with a width of the diameter of the pipe and a length equal to the length of the pipe. And
super_outside has a width equal to (diameter + left_thickness + right_thickness)
If mode = 0, the shapes are given the z-value of the invert levels of the pipe.
If mode = 1, the shapes are given the z-value of the centre levels of the pipe.
If mode = 2, the shapes are given the z-value of the obvert levels of the pipe.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the shapes were successfully returned.
Note: the number of pipes and separation are not used for generating the shapes and offset is use
instead. For generating shapes using number of pipes and separation, see
Get_drainage_pipe_shape(Element element,Integer pipe,Integer mode,Dynamic_Element
&super_inside,Dynamic_Element &super_outside)

> **ID = 2850**

Set_drainage_pipe_hgls(Element drain,Integer p,Real lhs,Real rhs)

```c
Integer Set_drainage_pipe_hgls(Element drain,Integer p,Real lhs,Real rhs)
```
Set the pipe hgl levels for the pth pipe of the string Element drain.
The hgl level of the left hand side of the pipe is set to lhs.
The hgl level of the right hand side of the pipe is set to rhs.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 537**

Get_drainage_pipe_hgls(Element drain,Integer p,Real &lhs,Real &rhs)

```c
Integer Get_drainage_pipe_hgls(Element drain,Integer p,Real &lhs,Real &rhs)
```
Get the pipe HGL levels for the pth pipe of the string Element drain.
The hgl level of the left hand side of the pipe is returned in lhs.
The hgl level of the right hand side of the pipe is returned in rhs.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 534**

Set_drainage_pipe_velocity(Element drain,Integer p,Real velocity)


```c
Integer Set_drainage_pipe_velocity(Element drain,Integer p,Real velocity)
```
Get the pipe flow velocity for the pth pipe of the string Element drain.
The velocity of the pipe is returned in Real velocity.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 499**

Get_drainage_pipe_velocity(Element drain,Integer p,Real &velocity)

```c
Integer Get_drainage_pipe_velocity(Element drain,Integer p,Real &velocity)
```
Get the flow velocity for the pth pipe of the string Element drain.
The velocity is returned in Real velocity.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 494**

Set_drainage_pipe_flow(Element drain,Integer p,Real flow)

```c
Integer Set_drainage_pipe_flow(Element drain,Integer p,Real flow)
```
Get the pipe flow volume for the pth pipe of the string Element drain.
The velocity of the pipe is returned in Real flow.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully set.

> **ID = 498**

Set_drainage_pipe_nominal_diameter(Element drainage,Integer pipe,Real
nominal_diameter)

```c
Integer Set_drainage_pipe_nominal_diameter(Element drainage,Integer pipe,Real nominal_diameter)
```
Set the pipe nominal diameter of the drainage string Element drainage at pipe index pipe to Real
nominal_diameter.
A return value of zero indicates the function call was successful.

> **ID = 2890**

Set_drainage_pipe_separation(Element drainage,Integer pipe,Real separation)

```c
Integer Set_drainage_pipe_separation(Element drainage,Integer pipe,Real separation)
```
Set the pipe separation of the drainage string Element drainage at pipe index pipe to Real
separation.
A return value of zero indicates the function call was successful.

> **ID = 2892**

Get_drainage_pipe_flow(Element drain,Integer p,Real &flow)

```c
Integer Get_drainage_pipe_flow(Element drain,Integer p,Real &flow)
```
Get the flow volume for the pth pipe of the string Element drain.
The volume is returned in Real velocity.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 493**

Get_drainage_pipe_length(Element drain,Integer p,Real &length)

```c
Integer Get_drainage_pipe_length(Element drain,Integer p,Real &length)
```
Get the pipe length for the pth pipe of the string Element drain.
The length of the pipe is returned in Real length.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 503**

Get_drainage_pipe_grade(Element drain,Integer p,Real &grade)

```c
Integer Get_drainage_pipe_grade(Element drain,Integer p,Real &grade)
```
Get the pipe grade for the pth pipe of the string Element drain.
The grade of the pipe is returned in Real grade.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 504**

Get_drainage_pipe_ns(Element drain,Integer p,Real ch[],Real ht[],Integer
max_pts,Integer &npts)

```c
Integer Get_drainage_pipe_ns(Element drain,Integer p,Real ch[],Real ht[],Integer max_pts,Integer &npts)
```
For the drainage string drain, get the heights along the pth pipe from the natural surface tin.
Because the pipe is long then there will be more than one height and the heights are returned in
chainage order along the pipe. The heights are returned in the arrays ch (for chainage) and ht.
The maximum number of natural surface points that can be returned is given by max_pts (usually
the size of the arrays).
The actual number of points of natural surface is returned in npts.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 523**

Get_drainage_pipe_fs(Element drain,Integer p,Real ch[],Real ht[],Integer
max_pts,Integer &npts)

```c
Integer Get_drainage_pipe_fs(Element drain,Integer p,Real ch[],Real ht[],Integer max_pts,Integer &npts)
```
For the drainage string drain, get the heights along the pth pipe from the finished surface tin.
Because the pipe is long then there will be more than one height and the heights are returned in
chainage order along the pipe. The heights are returned in the arrays ch (for chainage) and ht.
The maximum number of finished surface points that can be returned is given by max_pts (usually
the size of the arrays).
The actual number of points of finished surface is returned in npts.
If drain is not an Element of type Drainage then a non zero function return code is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 524**

Get_drainage_pipe_nominal_diameter(Element drainage,Integer pipe,Real
&nominal_diameter)

```c
Integer Get_drainage_pipe_nominal_diameter(Element drainage,Integer pipe,Real &nominal_diameter)
```
Get the pipe nominal diameter nominal_diameter of the drainage string Element drainage at pipe
index pipe.
A return value of zero indicates the function call was successful.

> **ID = 2891**

Get_drainage_pipe_separation(Element drainage,Integer pipe,Real &separation)

```c
Integer Get_drainage_pipe_separation(Element drainage,Integer pipe,Real &separation)
```
Get the pipe separation separation of the drainage string Element drainage at pipe index pipe.
A return value of zero indicates the function call was successful.

> **ID = 2893**

Go to the next section 5.45.7 Drainage Pipe Type Information in the drainage.4d Fileor return to


### 5.45.7 Drainage Pipe Type Information in the drainage.4d File

Get_drainage_number_of_pipe_types(Integer &n)

```c
Integer Get_drainage_number_of_pipe_types(Integer &n)
```
Get the number of pipe types (classes) from the drainage.4d file and return the number in n.
A function return value of zero indicates the data was successfully returned.

> **ID = 2271**

Get_drainage_pipe_type(Integer i,Text &type)

```c
Integer Get_drainage_pipe_type(Integer i,Text &type)
```
Get the name of the i’th pipe type (class) from the drainage.4d file and return the name in type.
A function return value of zero indicates the data was successfully returned.

> **ID = 2272**

Get_drainage_pipe_roughness(Text type,Real &roughness,Integer &roughness_type)

```c
Integer Get_drainage_pipe_roughness(Text type,Real &roughness,Integer &roughness_type)
```
For the pipe type type, return from the drainage.4d file, the roughness in roughness and roughness
type in roughness_type. Roughness type is MANNING (0) or COLEBROOK (1).
If pipe type type does not exist, then a non-zero return value is returned.
A function return value of zero indicates the data was successfully returned.

> **ID = 2273**

Get_drainage_pipe_types(Text water_type,Dynamic_Text &types)

```c
Integer Get_drainage_pipe_types(Text water_type,Dynamic_Text &types)
```
From the drainage.4d file, for given purpose water_type, return the list of pipe types in types.
A function return value of zero indicates the types was successfully returned.

> **ID = 3861**

Go to the next section 5.45.8 Drainage String Pipe AttributesElement.


### 5.45.8 Drainage String Pipe Attributes

Set_drainage_pipe_attributes(Element drain,Integer pipe,Attributes att)

```c
Integer Set_drainage_pipe_attributes(Element drain,Integer pipe,Attributes att)
```
For the Element drain, set the Attributes for the pipe number pipe to att.
If the Element is not of type Drainage then a non-zero return value is returned.
A function return value of zero indicates the attribute is successfully set.

> **ID = 2033**

Get_drainage_pipe_attributes(Element drain,Integer pipe,Attributes &att)

```c
Integer Get_drainage_pipe_attributes(Element drain,Integer pipe,Attributes &att)
```
For the Element drain, return the Attributes for the pipe number pipe as att.
If the Element is not of type Drainage or the pipe number pipe has no attribute then a non-zero
return value is returned.
A function return value of zero indicates the attribute is successfully returned.

> **ID = 2032**

Get_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Uid &uid)

```c
Integer Get_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Uid &uid)
```
For the Element drain, get the attribute called att_name for the pipe number pipe and return the
attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Drainage or the attribute is not of type Uid then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2034**

Get_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Attributes
         &att)

```c
Integer Get_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Attributes &att)
```
For the Element drain, get the attribute called att_name for the pipe number pipe and return the
attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Drainage or the attribute is not of type Attributes then a non-zero

return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2035**

Get_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Uid &uid)

```c
Integer Get_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Uid &uid)
```
For the Element drain get the attribute with number att_no for the pipe number pipe and return the
attribute value in uid. The attribute must be of type Uid.
If the Element is not of type Drainage or the attribute is not of type Uid then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number
att_no.

> **ID = 2036**

Get_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,
Attributes &att)

```c
Integer Get_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Attributes &att)
```
For the Element drain, get the attribute with number att_no for the pipe number pipe and return the
attribute value in att. The attribute must be of type Attributes.
If the Element is not of type Drainage or the attribute is not of type Attributes then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number
att_no.

> **ID = 2037**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Uid uid)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Uid uid)
```
For the Element drain and on the pipe number pipe,
   if the attribute called att_name does not exist then create it as type Uid and give it the value uid.
   if the attribute called att_name does exist and it is type Uid, then set its value to uid.
If the attribute exists and is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2038**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,
Attributes att)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Attributes att)
```
For the Element drain and on the pipe number pipe,
   if the attribute called att_name does not exist then create it as type Attributes and give it the value
att.
   if the attribute called att_name does exist and it is type Attributes, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> **ID = 2039**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Uid uid)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Uid uid)
```
For the Element drain and on the pipe number pipe, if the attribute number att_no exists and it is of
type Uid, then its value is set to uid.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is
returned.
If the attribute of number att_no exists and is not of type Uid then a non-zero return value is
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> **ID = 2040**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,
Attributes att)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Attributes att)
```
For the Element drain and on the pipe number pipe, if the attribute number att_no exists and it is of
type Attributes, then its value is set to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is
returned.
If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> **ID = 2041**

Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Text &txt)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Text &txt)
```
For the Element drain, get the attribute called att_name for the pipe number pipe and return the
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Drainage or the attribute is not of type Text then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1020**

Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Integer
&int)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Integer &int)
```
For the Element drain, get the attribute called att_name for the pipe number pipe and return the
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Drainage or the attribute is not of type Integer then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1021**

Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Real &real)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Real &real)
```
For the Element drain, get the attribute called att_name for the pipe number pipe and return the
attribute value in real. The attribute must be of type Real.
If the Element is not of type Drainage or the attribute is not of type Real then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1022**


Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Text &txt)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Text &txt)
```
For the Element drain, get the attribute with number att_no for the pipe number pipe and return the
attribute value in txt. The attribute must be of type Text.
If the Element is not of type Drainage or the attribute is not of type Text then a non-zero return value
is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 1023**

Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Integer
&int)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Integer &int)
```
For the Element drain, get the attribute with number att_no for the pipe number pipe and return the
attribute value in int. The attribute must be of type Integer.
If the Element is not of type Drainage or the attribute is not of type Integer then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 1024**

Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Real &real)

```c
Integer Get_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Real &real)
```
For the Element drain, get the attribute with number att_no for the pipe number pipe and return the
attribute value in real. The attribute must be of type Real.
If the Element is not of type Drainage or the attribute is not of type Real then a non-zero return
value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute with
attribute number att_no.

> **ID = 1025**

Drainage_pipe_attribute_exists(Element drain,Integer pipe,Text att_name)

```c
Integer Drainage_pipe_attribute_exists (Element drain,Integer pipe,Text att_name)
```
For the Element drain, checks to see if an attribute with the name att_name exists for pipe number
pipe.
A non-zero function return value indicates that an attribute of that name exists.
If the attribute does not exist, or drain is not of type Drainage, or there is no pipe number pipe, a
zero function return value is returned.
Warning this is the opposite of most 12dPL function return values.

> **ID = 1012**

Drainage_pipe_attribute_exists (Element drain, Integer pipe,Text name,Integer &no)

```c
Integer Drainage_pipe_attribute_exists (Element drain, Integer pipe,Text name,Integer &no)
```
For the Element drain, checks to see if an attribute with the name att_name exists for pipe number
pipe.
If the attribute of that name exists, its attribute number is returned is no.
A non-zero function return value indicates that an attribute of that name exists.
If the attribute does not exist, or drain is not of type Drainage, or there is no pipe number pipe, a
zero function return value is returned.
Warning this is the opposite of most 12dPL function return values.

> **ID = 1013**

Drainage_pipe_attribute_delete (Element drain,Integer pipe,Text att_name)

```c
Integer Drainage_pipe_attribute_delete (Element drain,Integer pipe,Text att_name)
```
For the Element drain, delete the attribute with the name att_name for pipe number pipe.
If the Element drain is not of type Drainage or drain has no pipe number pipe, then a non-zero
return code is returned.
A function return value of zero indicates the attribute was deleted.

> **ID = 1014**

Drainage_pipe_attribute_delete (Element drain,Integer pipe,Integer att_no)

```c
Integer Drainage_pipe_attribute_delete (Element drain,Integer pipe,Integer att_no)
```
For the Element drain, delete the attribute with attribute number att_no for pipe number pipe.
If the Element drain is not of type Drainage or drain has no pipe number pipe, then a non-zero
return code is returned.
A function return value of zero indicates the attribute was deleted.

> **ID = 1015**

Drainage_pipe_attribute_delete_all (Element drain,Integer pipe)

```c
Integer Drainage_pipe_attribute_delete_all (Element drain,Integer pipe)
```
Delete all the attributes of pipe number pipe of the drainage string drain.
A function return value of zero indicates the function was successful.

> **ID = 1016**

Drainage_pipe_attribute_dump (Element drain,Integer pipe)

```c
Integer Drainage_pipe_attribute_dump (Element drain,Integer pipe)
```
Write out information to the Output Window about the pipe attributes for pipe number pipe of the
drainage string drain.
A function return value of zero indicates the function was successful.

> **ID = 1017**

Drainage_pipe_attribute_debug (Element drain,Integer pipe)

```c
Integer Drainage_pipe_attribute_debug (Element drain,Integer pipe)
```
Write out even more information to the Output Window about the pipe attributes for pipe number
pipe of the drainage string drain.
A function return value of zero indicates the function was successful.

> **ID = 1018**

Get_drainage_pipe_number_of_attributes(Element drain,Integer pipe,Integer
&no_atts)

```c
Integer Get_drainage_pipe_number_of_attributes(Element drain,Integer pipe,Integer &no_atts)
```
Get the total number of attributes for pipe number pipe of the Element drain.
The total number of attributes is returned in Integer no_atts.
A function return value of zero indicates the number of attributes was successfully returned.

> **ID = 1019**

Get_drainage_pipe_attribute_length (Element drain,Integer pipe,Text
att_name,Integer &att_len)


```c
Integer Get_drainage_pipe_attribute_length (Element drain,Integer pipe,Text att_name,Integer &att_len)
```
For pipe number pipe of the Element drain, get the length (in bytes) of the attribute with the name
att_name. The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for user attributes of type Text and Binary.

> **ID = 1029**

Get_drainage_pipe_attribute_length (Element drain,Integer pipe,Integer
att_no,Integer &att_len)

```c
Integer Get_drainage_pipe_attribute_length (Element drain,Integer pipe,Integer att_no,Integer &att_len)
```
For pipe number pipe of the Element drain, get the length (in bytes) of the attribute number att_no.
The attribute length is returned in att_len.
A function return value of zero indicates the attribute length was successfully returned.
Note - the length is useful for attributes of type Text and Binary.

> **ID = 1030**

Get_drainage_pipe_attribute_name(Element drain,Integer pipe,Integer att_no,Text
&name)

```c
Integer Get_drainage_pipe_attribute_name(Element drain,Integer pipe,Integer att_no,Text &name)
```
For pipe number pipe of the Element drain, get the name of the attribute number att_no. The
attribute name is returned in name.
A function return value of zero indicates the attribute name was successfully returned.

> **ID = 1026**

Get_drainage_pipe_attribute_type(Element drain,Integer pipe,Text att_name,Integer
&att_type)

```c
Integer Get_drainage_pipe_attribute_type(Element drain,Integer pipe,Text att_name,Integer &att_type)
```
For pipe number pipe of the Element drain, get the type of the attribute with name att_name. The
attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.

> **ID = 1027**

Get_drainage_pipe_attribute_type(Element drain,Integer pipe,Integer att_no,Integer

&att_type

```c
Integer Get_drainage_pipe_attribute_type(Element drain,Integer pipe,Integer att_no,Integer &att_type)
```
For pipe number pipe of the Element drain, get the type of the attribute with attribute number
att_no. The attribute type is returned in att_type.
A function return value of zero indicates the attribute type was successfully returned.

> **ID = 1028**

Set_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Text txt)

```c
Integer Set_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Text txt)
```
For the Element drain and on the pipe number pipe,
   if the attribute called att_name does not exist then create it as type Text and give it the value txt.
   if the attribute called att_name does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1031**

Set_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Integer int)

```c
Integer Set_drainage_pipe_attribute (Element drain,Integer pipe,Text att_name,Integer int)
```
For the Element drain and on the pipe number pipe,
   if the attribute called att_name does not exist then create it as type Integer and give it the value
int.
   if the attribute called att_name does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1032**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Real real)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Text att_name,Real real)
```
For the Element drain and on the pipe number pipe,
   if the attribute called att_name does not exist then create it as type Real and give it the value real.
   if the attribute called att_name does exist and it is type Real, then set its value to real.

If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute called
att_name.

> **ID = 1033**

Set_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Text txt)

```c
Integer Set_drainage_pipe_attribute (Element drain,Integer pipe,Integer att_no,Text txt)
```
For the Element drain and on the pipe number pipe,
   if the attribute with number att_no does not exist then create it as type Text and give it the value
txt.
   if the attribute with number att_no does exist and it is type Text, then set its value to txt.
If the attribute exists and is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute
number att_no.

> **ID = 1034**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Integer int)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Integer int)
```
For the Element drain and on the pipe number pipe,
   if the attribute with number att_no does not exist then create it as type Integer and give it the
value int.
   if the attribute with number att_no does exist and it is type Integer, then set its value to int.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute
number att_no.

> **ID = 1035**

Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Real real)

```c
Integer Set_drainage_pipe_attribute(Element drain,Integer pipe,Integer att_no,Real real)
```
For the Element drain and on the pipe number pipe,
   if the attribute with number att_no does not exist then create it as type Real and give it the value
real.
   if the attribute with number att_no does exist and it is type Real, then set its value to real.
If the attribute exists and is not of type Real then a non-zero return value is returned.

A function return value of zero indicates the attribute value is successfully set.
Note - the Get_drainage_pipe_attribute_type call can be used to get the type of the attribute
number att_no.

> **ID = 1036**

Go to the next section 5.45.9 Drainage String House Connections - For Sewer Module Onlyor return
to 5.45 Drainage String Element.


### 5.45.9 Drainage String House Connections - For Sewer Module

Only
Get_drainage_hcs(Element drain,Integer &no_hcs)

```c
Integer Get_drainage_hcs(Element drain,Integer &no_hcs)
```
Get the number of house connections for the string Element drain.
The number of house connection is returned in Integer no_hcs.
A function return value of zero indicates the data was successfully returned.

> **ID = 590**

Get_drainage_hc(Element drain,Integer h,Real &x,Real &y,Real &z)

```c
Integer Get_drainage_hc(Element drain,Integer h,Real &x,Real &y,Real &z)
```
Get the x,y & z for the hth house connection of the string Element drain.
The x coordinate of the house connection is returned in Real x.
The y coordinate of the house connection is returned in Real y.
The z coordinate of the house connection is returned in Real z.
A function return value of zero indicates the data was successfully returned.

> **ID = 591**

Set_drainage_hc_adopted_level(Element drain,Integer hc,Real level)

```c
Integer Set_drainage_hc_adopted_level(Element drain,Integer hc,Real level)
```
For the drainage string drain, set the adopted level for the h’th house connection to level.
A function return value of zero indicates the data was successfully set.

> **ID = 1302**

Get_drainage_hc_adopted_level(Element drain,Integer h,Real &level)

```c
Integer Get_drainage_hc_adopted_level(Element drain,Integer h,Real &level)
```
Get the adopted level for the h’th house connection of the string Element drain.
The adopted level of the house connection is returned in Real level.
A function return value of zero indicates the data was successfully returned.

> **ID = 598**


Set_drainage_hc_bush(Element drain,Integer hc,Text bush)

```c
Integer Set_drainage_hc_bush(Element drain,Integer hc,Text bush)
```
For the drainage string drain, set the bush type for the h’th house connection to bush.
A function return value of zero indicates the data was successfully set.

> **ID = 1310**

Get_drainage_hc_bush(Element drain,Integer h,Text &bush)

```c
Integer Get_drainage_hc_bush(Element drain,Integer h,Text &bush)
```
Get the bush type for the h’th house connection of the string Element drain.
The bush type of the house connection is returned in Text bush.
A function return value of zero indicates the data was successfully returned.

> **ID = 606**

Set_drainage_hc_colour(Element drain,Integer hc,Integer colour)

```c
Integer Set_drainage_hc_colour(Element drain,Integer hc,Integer colour)
```
For the drainage string drain, set the colour number for the h’th house connection to colour.
A function return value of zero indicates the data was successfully set.

> **ID = 1307**

Get_drainage_hc_colour(Element drain,Integer h,Integer &colour)

```c
Integer Get_drainage_hc_colour(Element drain,Integer h,Integer &colour)
```
Get the colour for the h’th house connection of the string Element drain.
The colour of the house connection is returned in Integer colour.
A function return value of zero indicates the data was successfully returned.

> **ID = 603**

Set_drainage_hc_depth(Element drain,Integer hc,Real depth)

```c
Integer Set_drainage_hc_depth(Element drain,Integer hc,Real depth)
```
For the drainage string drain, set the depth for the h’th house connection to depth.
A function return value of zero indicates the data was successfully set.

> **ID = 1305**

Get_drainage_hc_depth(Element drain,Integer h,Real &depth)

```c
Integer Get_drainage_hc_depth(Element drain,Integer h,Real &depth)
```
Get the depth for the h’th house connection of the string Element drain.
The depth of the house connection is returned in Real depth.
A function return value of zero indicates the data was successfully returned.

> **ID = 601**

Set_drainage_hc_diameter(Element drain,Integer hc,Real diameter)

```c
Integer Set_drainage_hc_diameter(Element drain,Integer hc,Real diameter)
```
For the drainage string drain, set the diameter for the h’th house connection to diameter.
A function return value of zero indicates the data was successfully set.

> **ID = 1306**

Get_drainage_hc_diameter(Element drain,Integer h,Real &diameter)

```c
Integer Get_drainage_hc_diameter(Element drain,Integer h,Real &diameter)
```
Get the diameter for the h’th house connection of the string Element drain.
The diameter of the house connection is returned in Real diameter.
A function return value of zero indicates the data was successfully returned.

> **ID = 602**

Set_drainage_hc_grade(Element drain,Integer hc,Real grade)

```c
Integer Set_drainage_hc_grade(Element drain,Integer hc,Real grade)
```
For the drainage string drain, set the grade for the h’th house connection to grade.
A function return value of zero indicates the data was successfully set.

> **ID = 1304**

Get_drainage_hc_grade(Element drain,Integer h,Real &grade)


```c
Integer Get_drainage_hc_grade(Element drain,Integer h,Real &grade)
```
Get the grade for the h’th house connection of the string Element drain.
The grade of the house connection is returned in Real grade.
A function return value of zero indicates the data was successfully returned.

> **ID = 600**

Set_drainage_hc_hcb(Element drain,Integer hc,Integer hcb)

```c
Integer Set_drainage_hc_hcb(Element drain,Integer hc,Integer hcb)
```
For the drainage string drain, set the hcb for the h’th house connection to hcb.
A function return value of zero indicates the data was successfully set.

> **ID = 1300**

Get_drainage_hc_hcb(Element drain,Integer h,Integer &hcb)

```c
Integer Get_drainage_hc_hcb(Element drain,Integer h,Integer &hcb)
```
Get the hcb for the h’th house connection of the string Element drain.
The hcb of the house connection is returned in Integer hcb.
A function return value of zero indicates the data was successfully returned.

> **ID = 596**

Set_drainage_hc_length(Element drain,Integer hc,Real length)

```c
Integer Set_drainage_hc_length(Element drain,Integer hc,Real length)
```
For the drainage string drain, set the length for the h’th house connection to length.
A function return value of zero indicates the data was successfully set.

> **ID = 1303**

Get_drainage_hc_length(Element drain,Integer h,Real &length)

```c
Integer Get_drainage_hc_length(Element drain,Integer h,Real &length)
```
Get the length for the h’th house connection of the string Element drain.
The length of the house connection is returned in Real length.

A function return value of zero indicates the data was successfully returned.

> **ID = 599**

Set_drainage_hc_level(Element drain,Integer hc,Real level)

```c
Integer Set_drainage_hc_level(Element drain,Integer hc,Real level)
```
For the drainage string drain, set the level for the h’th house connection to level.
A function return value of zero indicates the data was successfully set.

> **ID = 1301**

Get_drainage_hc_level(Element drain,Integer h,Real &level)

```c
Integer Get_drainage_hc_level(Element drain,Integer h,Real &level)
```
Get the level for the h’th house connection of the string Element drain.
The level of the house connection is returned in Real level.
A function return value of zero indicates the data was successfully returned.

> **ID = 597**

Set_drainage_hc_material(Element drain,Integer hc,Text material)

```c
Integer Set_drainage_hc_material(Element drain,Integer hc,Text material)
```
For the drainage string drain, set the material for the h’th house connection to material.
A function return value of zero indicates the data was successfully set.

> **ID = 1309**

Get_drainage_hc_material(Element drain,Integer h,Text &material)

```c
Integer Get_drainage_hc_material(Element drain,Integer h,Text &material)
```
Get the material for the h’th house connection of the string Element drain.
The material of the house connection is returned in Text material.
A function return value of zero indicates the data was successfully returned.

> **ID = 605**

Set_drainage_hc_name(Element drain,Integer hc,Text name)

```c
Integer Set_drainage_hc_name(Element drain,Integer hc,Text name)
```
For the drainage string drain, set the name for the h’th house connection to name.
A function return value of zero indicates the data was successfully set.

> **ID = 1299**

Get_drainage_hc_name(Element drain,Integer h,Text &name)

```c
Integer Get_drainage_hc_name(Element drain,Integer h,Text &name)
```
Get the name for the h’th house connection of the string Element drain.
The name of the house connection is returned in Text name.
A function return value of zero indicates the data was successfully returned.

> **ID = 595**

Set_drainage_hc_side(Element drain,Integer hc,Integer side)

```c
Integer Set_drainage_hc_side(Element drain,Integer hc,Integer side)
```
For the drainage string drain, set the side for the h’th house connection by the value of side.
  when side = -1, the house connection is on the left side of the string.
  when side =  1, the house connection is on the right side of the string.
A function return value of zero indicates the data was successfully set.

> **ID = 1298**

Get_drainage_hc_side(Element drain,Integer h,Integer &side)

```c
Integer Get_drainage_hc_side(Element drain,Integer h,Integer &side)
```
Get the side for the h’th house connection of the string Element drain.
The side of the house connection is returned in Integer side.
If side = -1, the house connection is on the left side of the string.
If side =  1, the house connection is on the right side of the string.
A function return value of zero indicates the data was successfully returned.

> **ID = 594**

Set_drainage_hc_type(Element drain,Integer hc,Text type)

```c
Integer Set_drainage_hc_type(Element drain,Integer hc,Text type)
```
For the drainage string drain, set the hc type for the h’th house connection to type.
A function return value of zero indicates the data was successfully set.

> **ID = 1308**

Get_drainage_hc_type(Element drain,Integer h,Text &type)

```c
Integer Get_drainage_hc_type(Element drain,Integer h,Text &type)
```
Get the type for the h’th house connection of the string Element drain.
The type of the house connection is returned in Text type.
A function return value of zero indicates the data was successfully returned.

> **ID = 604**

Get_drainage_hc_chainage(Element drain,Integer h,Real &chainage)

```c
Integer Get_drainage_hc_chainage(Element drain,Integer h,Real &chainage)
```
Get the chainage for the h’th house connection of the string Element drain.
The chainage of the house connection is returned in Real chainage.
A function return value of zero indicates the data was successfully returned.

> **ID = 592**

Get_drainage_hc_ip(Element drain,Integer h,Integer &ip)

```c
Integer Get_drainage_hc_ip(Element drain,Integer h,Integer &ip)
```
Get the intersect point for the h’th house connection of the string Element drain.
The intersection point of the house connection is returned in Integer ip.
ip is zero based (i.e. the first ip = 0)
A function return value of zero indicates the data was successfully returned.

> **ID = 593**

### 5.45.10 Drainage String Property Controls - For Sewer Module

Only
Get_drainage_pcs_count(Element element,Integer &no_pcs)

```c
Integer Get_drainage_pcs_count(Element element,Integer &no_pcs))
```
Get the number of property controls for the string Element drain.
The number of property controls is returned in Integer no_pcs.
A function return value of zero indicates the data was successfully returned.

> **ID = 7676**

Get_drainage_pc_xyz(Element element,Integer pc,Real &x,Real &y,Real &z)

```c
Integer Get_drainage_pc_xyz(Element element,Integer pc,Real &x,Real &y,Real &z)
```
Get the x,y & z for the pc-th property control of the string Element drain.
The x coordinate of the property control is returned in Real x.
The y coordinate of the property control is returned in Real y.
The z coordinate of the property control is returned in Real z.
A function return value of zero indicates the data was successfully returned.

> **ID = 7677**

Get_drainage_pc_chainage(Element element,Integer pc,Real &chainage)

```c
Integer Get_drainage_pc_chainage(Element element,Integer pc,Real &chainage)
```
Get the chainage for the pc-th property control of the string Element drain.
The chainage of the property control is returned in Real chainage.
A function return value of zero indicates the data was successfully returned.

> **ID = 7678**

Get_drainage_pc_ip(Element element,Integer pc,Integer &ip)

```c
Integer Get_drainage_pc_ip(Element element,Integer pc,Integer &ip)
```
Get the intersect point for the pc-th property control of the string Element drain.
The intersection point of the property control is returned in Integer ip.
ip is zero based (i.e. the first ip = 0)
A function return value of zero indicates the data was successfully returned.

> **ID = 7679**

Get_drainage_pc_ratio(Element element,Integer pc,Real &ratio)

```c
Integer Get_drainage_pc_ratio(Element element,Integer pc,Real &ratio)
```
Get the ratio for the pc-th property control of the string Element drain.
The ratio of the property control is returned in Real ratio.
A function return value of zero indicates the data was successfully returned.

> **ID = 7680**

Get_drainage_pc_name(Element element,Integer pc,Text &name)

```c
Integer Get_drainage_pc_name(Element element,Integer pc,Text &name)
```
Get the name for the pc-th property control of the string Element drain.
The name of the property control is returned in Text name.
A function return value of zero indicates the data was successfully returned.

> **ID = 7681**

Get_drainage_pc_colour(Element element,Integer pc,Integer &colour)

```c
Integer Get_drainage_pc_colour(Element element,Integer pc,Integer &colour)
```
Get the colour for the pc-th property control of the string Element drain.
The colour of the property control is returned in Integer colour.
A function return value of zero indicates the data was successfully returned.

> **ID = 7682**

Get_drainage_pc_grade(Element element,Integer pc,Real &grade)

```c
Integer Get_drainage_pc_grade(Element element,Integer pc,Real &grade)
```
Get the grade for the pc-th property control of the string Element drain.
The grade of the property control is returned in Real grade.
A function return value of zero indicates the data was successfully returned.

> **ID = 7683**

Get_drainage_pc_cover(Element element,Integer pc,Real &cover)


```c
Integer Get_drainage_pc_cover(Element element,Integer pc,Real &cover)
```
Get the cover for the pc-th property control of the string Element drain.
The cover of the property control is returned in Real cover.
A function return value of zero indicates the data was successfully returned.

> **ID = 7684**

Get_drainage_pc_start_level(Element element,Integer pc,Real &start_level)

```c
Integer Get_drainage_pc_start_level(Element element,Integer pc,Real &start_level)
```
Get the start_level for the pc-th property control of the string Element drain.
The start_level of the property control is returned in Real start_level.
A function return value of zero indicates the data was successfully returned.

> **ID = 7685**

Get_drainage_pc_diameter(Element element,Integer pc,Real &diameter)

```c
Integer Get_drainage_pc_diameter(Element element,Integer pc,Real &diameter)
```
Get the diameter for the pc-th property control of the string Element drain.
The diameter of the property control is returned in Real diameter.
A function return value of zero indicates the data was successfully returned.

> **ID = 7686**

Get_drainage_pc_boundary(Element element,Integer pc,Real &boundary)

```c
Integer Get_drainage_pc_boundary(Element element,Integer pc,Real &boundary)
```
Get the boundary for the pc-th property control of the string Element drain.
The boundary of the property control is returned in Real boundary.
A function return value of zero indicates the data was successfully returned.

> **ID = 7687**

Set_drainage_pc_name(Element element,Integer pc,Text name)

```c
Integer Set_drainage_pc_name(Element element,Integer pc,Text name)
```
For the drainage string drain, set the name for the pc’th property control to Text name.

A function return value of zero indicates the data was successfully set.

> **ID = 7688**

Set_drainage_pc_colour(Element element,Integer pc,Integer colour)

```c
Integer Set_drainage_pc_colour(Element element,Integer pc,Integer colour)
```
For the drainage string drain, set the colour for the pc’th property control to Integer colour.
A function return value of zero indicates the data was successfully set.

> **ID = 7689**

Set_drainage_pc_grade(Element element,Integer pc,Real grade)

```c
Integer Set_drainage_pc_grade(Element element,Integer pc,Real grade)
```
For the drainage string drain, set the grade for the pc’th property control to Real grade.
A function return value of zero indicates the data was successfully set.

> **ID = 7690**

Set_drainage_pc_cover(Element element,Integer pc,Real cover)

```c
Integer Set_drainage_pc_cover(Element element,Integer pc,Real cover)
```
For the drainage string drain, set the cover for the pc’th property control to Real cover.
A function return value of zero indicates the data was successfully set.

> **ID = 7691**

Set_drainage_pc_start_level(Element element,Integer pc,Real start_level)

```c
Integer Set_drainage_pc_start_level(Element element,Integer pc,Real start_level)
```
For the drainage string drain, set the start level for the pc’th property control to Real start_level.
A function return value of zero indicates the data was successfully set.

> **ID = 7692**

Set_drainage_pc_diameter(Element element,Integer pc,Real diameter)

```c
Integer Set_drainage_pc_diameter(Element element,Integer pc,Real diameter)
```
For the drainage string drain, set the diameter for the pc’th property control to Real diameter.
A function return value of zero indicates the data was successfully set.

> **ID = 7693**

Set_drainage_pc_boundary(Element element,Integer pc,Real boundary)

```c
Integer Set_drainage_pc_boundary(Element element,Integer pc,Real boundary)
```
For the drainage string drain, set the boundary for the pc’th property control to Real boundary.
A function return value of zero indicates the data was successfully set.

> **ID = 7694**

Go to the next major section

---



## 5.46 Feature String Element

A 12d Model Feature string is a circle with a z-value at the centre but only null values on the
circumference.
Create_feature()

```c
Element Create_feature()
```
Create an Element of type Feature
The function return value gives the actual Element created.
If the feature string could not be created, then the returned Element will be null.

> **ID = 872**

Create_feature(Element seed)

```c
Element Create_feature(Element seed)
```
Create an Element of type Feature and set the colour, name, style etc. of the new string to be the
same as those from the Element Seed.
The function return value gives the actual Element created.
If the Feature string could not be created, then the returned Element will be null.

> **ID = 873**

Create_feature(Text name,Integer colour,Real xc,Real yc,Real zc,Real rad)

```c
Element Create_feature(Text name,Integer colour,Real xc,Real yc,Real zc,Real rad)
```
Create an Element of type Feature with name name, colour colour, centre (xc,yc), radius rad and
z value (height) zc.
The function return value gives the actual Element created.
If the Feature string could not be created, then the returned Element will be null.

> **ID = 874**

Get_feature_centre(Element elt,Real &xc,Real &yc,Real &zc)

```c
Integer Get_feature_centre(Element elt,Real &xc,Real &yc,Real &zc)
```
Get the centre point for Feature string given by Element elt.

The centre of the Feature is (xc,yc,zc).
A function return value of zero indicates the centre was successfully returned.

> **ID = 876**

Set_feature_centre(Element elt,Real xc,Real yc,Real zc)

```c
Integer Set_feature_centre(Element elt,Real xc,Real yc,Real zc)
```
Set the centre point of the Feature string given by Element elt to (xc,yc,zc).
A function return value of zero indicates the centre was successfully modified.

> **ID = 875**

Get_feature_radius(Element elt,Real &rad)

```c
Integer Get_feature_radius(Element elt,Real &rad)
```
Get the radius for Feature string given by Element elt and return it in rad.
A function return value of zero indicates the radius was successfully returned.

> **ID = 878**

Set_feature_radius(Element elt,Real rad)

```c
Integer Set_feature_radius(Element elt,Real rad)
```
Set the radius of the Feature string given by Element elt to rad. The new radius must be non-zero.
A function return value of zero indicates the radius was successfully modified.

> **ID = 877**


---


## 5.47 Interface String Element

A Interface string consists of (x,y,z,flag) values at each point of the string where flag is the cut-fill
flag.
If the cut-fill flag is
-2
the surface was not reached
-1
the point was in cut
 0
the point was on the surface
 1
the point was in fill
The following functions are used to create new Interface strings and make inquiries and
modifications to existing Interface strings.
Create_interface(Real x[],Real y[],Real z[],Integer f[],Integer num_pts)

```c
Element Create_interface(Real x[],Real y[],Real z[],Integer f[],Integer num_pts)
```
Create an Element of type Interface.
The Element has num_pts points with (x,y,z,flag) values given in the Real arrays x[], y[], z[] and
Integer array f[].
The function return value gives the actual Element created.
If the Interface string could not be created, then the returned Element will be null.

> **ID = 181**

Create_interface(Integer num_pts)

```c
Element Create_interface(Integer num_pts)
```
Create an Element of type Interface with room for num_pts (x,y,z,flag) points.
The actual x, y, z and flag values of the Interface string are set after the string is created.
If the Interface string could not be created, then the returned Element will be null.

> **ID = 451**

Create_interface(Integer num_pts,Element seed)

```c
Element Create_interface(Integer num_pts,Element seed)
```
Create an Element of type Interface with room for num_pts (x,y,z,flag) points, and set the colour,
name, style etc. of the new string to be the same as those from the Element seed.
The actual x, y, z and flag values of the Interface string are set after the string is created.
If the Interface string could not be created, then the returned Element will be null.

> **ID = 668**

Get_interface_data(Element elt,Real x[],Real y[],Real z[], Integer f[],Integer
max_pts,Integer &num_pts)

```c
Integer Get_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer max_pts,Integer &num_pts)
```
Get the (x,y,z,flag) data for the first max_pts points of the Interface Element elt.
The (x,y,z,flag) values at each string point are returned in the Real arrays x[], y[], z[] and Integer
array f[].
The maximum number of points that can be returned is given by max_pts (usually the size of the
arrays). The point data returned starts at the first point and goes up to the minimum of max_pts and
the number of points in the string.
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type Interface, then num_pts is returned as zero and the function return
value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.

> **ID = 182**

Get_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer
max_pts,Integer &num_pts,Integer start_pt)

```c
Integer Get_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer max_pts,Integer &num_pts,Integer start_pt)
```
For a Interface Element elt, get the (x,y,z,flag) data for max_pts points starting at the point number
start_pt.
This routine allows the user to return the data from a Interface string in user specified chunks. This
is necessary if the number of points in the string is greater than the size of the arrays available to
contain the information.
As in the previous function, the maximum number of points that can be returned is given by
max_pts (usually the size of the arrays).
However, for this function, the point data returned starts at point number start_pt rather than point
one.
The (x,y,z,text) values at each string point are returned in the Real arrays x[], y[], z[] and Integer
array f[].
The actual number of points returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type Interface, then num_pts is returned as zero and the function return
value is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note

A start_pt of one gives the same result as for the previous function.

> **ID = 183**

Get_interface_data(Element elt,Integer i,Real &x,Real &y,Real &z,Integer &f)

```c
Integer Get_interface_data(Element elt,Integer i,Real &x,Real &y,Real &z,Integer &f)
```
Get the (x,y,z,flag) data for the ith point of the string.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
The flag value is returned in Integer f.
A function return value of zero indicates the data was successfully returned.

> **ID = 184**

Set_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer num_pts)

```c
Integer Set_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer num_pts)
```
Set the (x,y,z,flag) data for the first num_pts points of the Interface Element elt.
This function allows the user to modify a large number of points of the string in one call.
The maximum number of points that can be set is given by the number of points in the string.
The (x,y,z,flag) values at each string point are given in the Real arrays x[], y[], z[] and Integer array
f[].
The number of points to be set is given by Integer num_pts
If the Element elt is not of type Interface, then nothing is modified and the function return value is
set to a non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new Interface Elements but only modify existing Interface Elements.

> **ID = 185**

Set_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer
num_pts,Integer start_pt)

```c
Integer Set_interface_data(Element elt,Real x[],Real y[],Real z[],Integer f[],Integer num_pts,Integer start_pt)
```
For the Interface Element elt, set the (x,y,z,flag) data for num_pts points starting at point number
start_pt.
This function allows the user to modify a large number of points of the string in one call starting at
point number start_pt

 rather than point one.
The maximum number of points that can be set is given by the difference between the number of
points in the string and the value of start_pt.
The (x,y,z,flag) values for the string points are given in the Real arrays x[], y[], z[] and Integer array
f[].
The number of the first string point to be modified is start_pt.
The total number of points to be set is given by Integer num_pts
If the Element elt is not of type Interface, then nothing is modified and the function return value is set
to a non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new Interface Elements but only modify existing Interface
Elements.

> **ID = 186**

Set_interface_data(Element elt,Integer i,Real x,Real y,Real z,Integer flag)

```c
Integer Set_interface_data(Element elt,Integer i,Real x,Real y,Real z,Integer flag)
```
Set the (x,y,z,flag) data for the ith point of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
The flag value is given in Integer flag.
A function return value of zero indicates the data was successfully set.

> **ID = 187**


---


## 5.49 Face String Element

A face string consists of (x,y,z) values at each vertex of the string. The string can be filled with a
colour or a hatch pattern
The following functions are used to create new face strings and make inquiries and modifications to
existing face strings.
Create_face(Real x[],Real y[],Real z[],Integer num_pts)

```c
Element Create_face(Real x[],Real y[],Real z[],Integer num_pts)
```
The Element has num_pts points with (x,y,z) values given in the Real arrays x[], y[] and z[].
The function return value gives the actual Element created.
If the face string could not be created, then the returned Element will be null.

> **ID = 1215**

Create_face(Integer num_npts)

```c
Element Create_face(Integer num_npts)
```
Create an Element of type face with room for num_pts (x,y,z) points.
The actual x, y and z values of the face string are set after the string is created.
If the face string could not be created, then the returned Element will be null.

> **ID = 1216**

Create_face(Integer num_npts,Element seed)

```c
Element Create_face(Integer num_npts,Element seed)
```
Create an Element of type face with room for num_pts (x,y) points, and set the colour, name, style
etc. of the new string to be the same as those from the Element seed.
The actual x, y and z values of the face string are set after the string is created.
If the face string could not be created, then the returned Element will be null.

> **ID = 1217**

Get_face_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer
    &num_pts)

```c
Integer Get_face_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts)
```
Get the (x,y,z) data for the first max_pts vertices of the face Element elt.

The (x,y,z) values at each string vertex are returned in the Real arrays x[], y[] and z[].
The maximum number of vertices that can be returned is given by max_pts (usually the size of the
arrays). The vertex data returned starts at the first vertex and goes up to the minimum of max_pts
and the number of vertices in the string.
The actual number of vertices returned is returned by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type face, then num_pts is returned as zero and the function return value
is set to a non-zero value.
A function return value of zero indicates the data was successfully returned.

> **ID = 78**

Get_face_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer
    &num_pts,Integer start_pt)

```c
Integer Get_face_data(Element elt,Real x[],Real y[],Real z[],Integer max_pts,Integer &num_pts,Integer start_pt)
```
For a face Element elt, get the (x,y,z) data for max_pts vertices starting at vertex number start_pt.
This routine allows the user to return the data from a face string in user specified chunks.
This is necessary if the number of vertices in the string is greater than the size of the arrays
available to contain the information.
As in the previous function, the maximum number of points that can be returned is given by
max_pts (usually the size of the arrays).
However, for this function, the vertex data returned starts at vertex number start_pt rather than
vertex one.
The (x,y,z) values at each string vertex is returned in the Real arrays x[], y[] and z[].
The actual number of vertices returned is given by Integer num_pts
num_pts <= max_pts
If the Element elt is not of type face, then num_pts is set to zero and the function return value is set
to a non-zero value.
A function return value of zero indicates the data was successfully returned.
Note
A start_pt of one gives the same result as for the previous function.

> **ID = 79**

Set_face_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)

```c
Integer Set_face_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts)
```
Set the (x,y,z) data for the first num_pts vertices of the face Element elt.
This function allows the user to modify a large number of vertices of the string in one call.
The maximum number of vertices that can be set is given by the number of vertices in the string.
The (x,y,z) values for each string vertex is given in the Real arrays x[], y[] and z[].

The number of vertices to be set is given by Integer num_pts
If the Element elt is not of type face, then nothing is modified and the function return value is set to
a non-zero value.
A function return value of zero indicates the data was successfully set.
Note
This function can not create new face Elements but only modify existing face Elements.

> **ID = 80**

Set_face_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer
         start_pt)

```c
Integer Set_face_data(Element elt,Real x[],Real y[],Real z[],Integer num_pts,Integer start_pt)
```
For the face Element elt, set the (x,y,z) data for num_pts vertices, starting at vertex number
start_pt.
This function allows the user to modify a large number of vertices of the string in one call starting at
vertex number start_pt rather than the first vertex (vertex one).
The maximum number of vertices that can be set is given by the difference between the number of
vertices in the string and the value of start_pt.
The (x,y,z) values for the string vertices are given in the Real arrays x[], y[] and z[].
The number of the first string vertex to be modified is start_pt.
The total number of vertices to be set is given by Integer num_pts
If the Element elt is not of type face, then nothing is modified and the function return value is set to
a non-zero value.
A function return value of zero indicates the data was successfully set.
Notes
(a)
A start_pt of one gives the same result as the previous function.
(b)
This function can not create new face Elements but only modify existing face Elements.

> **ID = 81**

Get_face_data(Element elt,Integer i,Real &x,Real &y,Real &z)

```c
Integer Get_face_data(Element elt,Integer i,Real &x,Real &y,Real &z)
```
Get the (x,y,z) data for the ith vertex of the string.
The x value is returned in Real x.
The y value is returned in Real y.
The z value is returned in Real z.
A function return value of zero indicates the data was successfully returned.

> **ID = 82**

Set_face_data(Element elt,Integer i,Real x,Real y,Real z)


```c
Integer Set_face_data(Element elt,Integer i,Real x,Real y,Real z)
```
Set the (x,y,z) data for the ith vertex of the string.
The x value is given in Real x.
The y value is given in Real y.
The z value is given in Real z.
A function return value of zero indicates the data was successfully set.

> **ID = 83**

Get_face_hatch_distance(Element elt,Real &dist)

```c
Integer Get_face_hatch_distance(Element elt,Real &dist)
```
Get the distance between the hatch lines for the face string elt. The distance is returned as dist
A function return value of zero indicates the data was successfully returned.

> **ID = 1218**

Set_face_hatch_distance(Element elt,Real dist)

```c
Integer Set_face_hatch_distance(Element elt,Real dist)
```
Set the distance between the hatch lines for the face string elt to be dist
The distance is given in world units.
A function return value of zero indicates the data was successfully set.

> **ID = 1219**

Get_face_hatch_angle(Element elt,Real &ang)

```c
Integer Get_face_hatch_angle(Element elt,Real &ang)
```
Get the angle of the hatch lines for the face string elt. The angle is returned as ang.
The angle is given in radians and is measured in the counter-clockwise direction from the x-axis.
A function return value of zero indicates the data was successfully returned.

> **ID = 1220**

Set_face_hatch_angle(Element elt,Real ang)

```c
Integer Set_face_hatch_angle(Element elt,Real ang)
```
Set the angle of the hatch lines for the face string elt to be ang
A function return value of zero indicates the data was successfully set.

> **ID = 1221**

Get_face_hatch_colour(Element elt,Integer &colour)

```c
Integer Get_face_hatch_colour(Element elt,Integer &colour)
```
Get the colour of the solid fill for the face string elt. The colour number is returned as colour.
A function return value of zero indicates the data was successfully returned.

> **ID = 1222**

Set_face_hatch_colour(Element elt,Integer colour)

```c
Integer Set_face_hatch_colour(Element elt,Integer colour)
```
Set the colour of the solid fill for the face string elt to the colour number colour.
A function return value of zero indicates the data was successfully set.

> **ID = 1223**

Get_face_edge_colour(Element elt,Integer &colour)

```c
Integer Get_face_edge_colour(Element elt,Integer &colour)
```
Get the colour of the edge of the face string elt. The colour number is returned as colour.
A function return value of zero indicates the data was successfully returned.

> **ID = 1224**


Set_face_edge_colour(Element elt,Integer colour)

```c
Integer Set_face_edge_colour(Element elt,Integer colour)
```
Set the colour of the edge of the face string elt to the colour number colour.
A function return value of zero indicates the data was successfully set.

> **ID = 1225**

Get_face_hatch_mode(Element elt,Integer &mode)

```c
Integer Get_face_hatch_mode(Element elt,Integer &mode)
```
Get the mode of the hatch of the face string elt. The value of mode is returned as mode.
If the mode is 1, then the hatch pattern is drawn when the face is on a plan view.
If the mode is 0, then the hatch pattern is not drawn when the face is on a plan view.
A function return value of zero indicates the data was successfully returned.

> **ID = 1226**

Set_face_hatch_mode(Element elt,Integer mode)

```c
Integer Set_face_hatch_mode(Element elt,Integer mode)
```
Set the mode of the hatch pattern of the face string elt to the value mode.
If the mode is 1, then the hatch pattern is drawn when the face is on a plan view.
If the mode is 0, then the hatch pattern is not drawn when the face is on a plan view.
A function return value of zero indicates the data was successfully set.

> **ID = 1227**

Get_face_fill_mode(Element elt,Integer &mode)

```c
Integer Get_face_fill_mode(Element elt,Integer &mode)
```
Get the mode of the fill of the face string elt. The value of mode is returned as mode.
If the mode is 1, then the face is filled with the face colour when the face is on a plan view.
If the mode is 0, then the face is not filled when the face is on a plan view.
A function return value of zero indicates the data was successfully returned.

> **ID = 1228**

Set_face_fill_mode(Element elt,Integer mode)

```c
Integer Set_face_fill_mode(Element elt,Integer mode)
```
Set the mode of the fill of the face string elt to the value mode.
If the mode is 1, then the face is filled with the face colour when the face is on a plan view.
If the mode is 0, then the face is not filled when the face is on a plan view.
A function return value of zero indicates the data was successfully set.

> **ID = 1229**

Get_face_edge_mode(Element elt,Integer &mode)

```c
Integer Get_face_edge_mode(Element elt,Integer &mode)
```
Get the mode of the edge of the face string elt. The value of mode is returned as mode.
If the mode is 1, then the edge is drawn with the edge colour when the face is on a plan view.
If the mode is 0, then the edge is not drawn when the face is on a plan view.
A function return value of zero indicates the data was successfully returned.

> **ID = 1230**

Set_face_edge_mode(Element elt,Integer mode)

```c
Integer Set_face_edge_mode(Element elt,Integer mode)
```
Set the mode for displaying the edge of the face string elt to the value mode.
If the mode is 1, then the edge is drawn with the edge colour when the face is on a plan view.
If the mode is 0, then the edge is not drawn when the face is on a plan view.
A function return value of zero indicates the data was successfully set.

> **ID = 1231**
