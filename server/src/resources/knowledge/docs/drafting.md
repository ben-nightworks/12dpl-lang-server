# Drafting Elements

> **Source:** 12d Model Macro Manual §5.50 (pp 766–795)

Leaders, dimensions and tables are called drafting elements.
These are 2D drawing objects (dimensions, leaders, tables) used for annotations and symbols.



## 5.50 Drafting Elements

Leaders, dimensions and tables are called drafting elements.
The following functions are used to create new drafting elements and make inquiries and
modifications to existing drafting elements.
- See 5.50.1 Dimension Functions
- See 5.50.2 Leader Functions
- See 5.50.3 Table Functions
- See 5.50.4 Common Draft Functions


### 5.50.1 Dimension Functions

DRF_dimension_horizontal_points_create(Text style_name,Text format_text,Real
sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_horizontal_points_create(Text style_name,Text format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring horizontal distance between two points (and
add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, end point ex ey, dimension point dx dy
A return value of zero indicates the function call was successful.

> **ID = 2956**

DRF_dimension_vertical_points_create(Text style_name,Text format_text,Real
sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_vertical_points_create(Text style_name,Text format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring vertical distance between two points (and add
to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, end point ex ey, dimension point dx dy
A return value of zero indicates the function call was successful.

> **ID = 2957**

DRF_dimension_aligned_points_create(Text style_name,Text format_text,Real
sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_aligned_points_create(Text style_name,Text format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring aligned distance between two points (and add
to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, end point ex ey, dimension point dx dy
A return value of zero indicates the function call was successful.

> **ID = 2958**

DRF_dimension_aligned_points_fixoffset_create(Text style_name,Text
format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Real fix_offset,Model

&model,Element &out)

```c
Integer DRF_dimension_aligned_points_fixoffset_create(Text style_name,Text format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Real fix_offset Model &model,Element &out)
```
Create a new dimension as Element out measuring aligned distance between two points with fixed
offset (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, end point ex ey, dimension point dx dy; and fixed offset value fix_offset
A return value of zero indicates the function call was successful.

> **ID = 2959**

DRF_dimension_rotated_points_create(Text style_name,Text format_text,Real
sx,Real sy,Real ex,Real ey,Real dx,Real dy,Real rotation_angle,Model
&model,Element &out)

```c
Integer DRF_dimension_rotated_points_create(Text style_name,Text format_text,Real sx,Real sy,Real ex,Real ey,Real dx,Real dy,Real rotation_angle,Model &model,Element &out)
```
Create a new dimension as Element out measuring rotated distance between two points (and add
to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, end point ex ey, dimension point dx dy; and angle for rotation rotation_angle
A return value of zero indicates the function call was successful.

> **ID = 2960**

DRF_dimension_horizontal_segment_create(Text style_name,Text
format_text,Segment base_segment,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_horizontal_segment_create(Text style_name,Text format_text,Segment base_segment,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring horizontal distance between the start and end
points of a Segment base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
A return value of zero indicates the function call was successful.

> **ID = 2961**

DRF_dimension_vertical_segment_create(Text style_name,Text format_text,Real
sx,Segment base_segment,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_vertical_points_create(Text style_name,Text format_text,Segment base_segment,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring vertical distance between the start and end
points of a Segment base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
A return value of zero indicates the function call was successful.

> **ID = 2962**

DRF_dimension_aligned_segment_create(Text style_name,Text format_text,Segment
base_segment,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_aligned_segment_create(Text style_name,Text format_text,Segment base_segment,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring aligned distance between the start and end
points of a Segment base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
A return value of zero indicates the function call was successful.

> **ID = 2963**

DRF_dimension_aligned_segment_fixoffset_create(Text style_name,Text
format_text,Segment base_segment,Real dx,Real dy,Real fix_offset,Model
&model,Element &out)

```c
Integer DRF_dimension_aligned_segment_fixoffset_create(Text style_name,Text format_text,Segment base_segment,Real dx,Real dy,Real fix_offset Model &model,Element &out)
```
Create a new dimension with fixed offset as Element out measuring aligned distance between the
start and end points of a Segment base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy; and fixed offset value fix_offset
A return value of zero indicates the function call was successful.

> **ID = 2964**

DRF_dimension_rotated_segment_create(Text style_name,Text format_text,Segment
base_segment,Real dx,Real dy,Real rotation_angle,Model &model,Element &out)

```c
Integer DRF_dimension_rotated_segment_create(Text style_name,Text format_text,Segment base_segment,Real dx,Real dy,Real rotation_angle,Model &model,Element &out)
```
Create a new dimension as Element out measuring rotated distance between the start and end

points of a Segment base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy; and rotation angle rotation_angle
A return value of zero indicates the function call was successful.

> **ID = 2965**

DRF_dimension_drop_perpendicular_create(Text style_name,Text format_text,Real
sx,Real sy,Segment base_segment,Real dx,Real dy,Real fix_offset,Model
&model,Element &out)

```c
Integer DRF_dimension_drop_perpendicular_create(Text style_name,Text format_text,Real sx,Real sy,Segment base_segment,Real dx,Real dy,Real fix_offset,Model &model,Element &out)
```
Create a new dimension as Element out measuring perpendicular dropping distance from the start
points (of x-y coordinate sx sy) to a Segment base_segment (and add to Model model if the model
is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy; and value of fixed offset fix_offset
A return value of zero indicates the function call was successful.

> **ID = 2966**

DRF_dimension_length_create(Text style_name,Text format_text,Segment
base_seg,Real dx,Real dy,Model &model,Element &out)

```c
Integer DRF_dimension_length_create(Text style_name,Text format_text,Segment base_seg,Real dx,Real dy,Model &model,Element &out)
```
Create a new dimension as Element out measuring the length of a Segment base_segment (and
add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
A return value of zero indicates the function call was successful.

> **ID = 2967**

DRF_dimension_length_fixoffset_create(Text style_name,Text format_text,Segment
base_seg,Real dx,Real dy,Real fix_offset,Model &model,Element &out)

```c
Integer DRF_dimension_length_fixoffset_create(Text style_name,Text format_text,Segment base_seg,Real dx,Real dy,Real fix_offset,Model &model,Element &out)
```
Create a new dimension with fixed offset as Element out measuring the length of a Segment
base_segment (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy; and fixed offset fix_offset

A return value of zero indicates the function call was successful.

> **ID = 2968**

DRF_dimension_angular_points_create(Text style_name,Text format_text,Real
sx,Real sy,Real ax,Real ay,Real ex,Real ey,Real dx,Real dy,Integer dir,Model
&model,Element &out);

```c
Integer DRF_dimension_angular_points_create(Text style_name,Text format_text,Real sx,Real sy,Real ax,Real ay,Real ex,Real ey,Real dx,Real dy,Integer dir,Model &model,Element &out);
```
Create a new dimension as Element out measuring the angle of three points (and add to Model
model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of start point sx
sy, angle point ax ay, end point ex ey, dimension point dx dy
A return value of zero indicates the function call was successful.

> **ID = 2969**

DRF_dimension_angular_segment_create(Text style_name,Text format_text,Segment
line1,Segment line2,Real dx,Real dy,Integer i1,Integer i2,Integer ir,Model
&model,Element &out)

```c
Integer DRF_dimension_angular_segment_create(Text style_name,Text format_text,Segment line1,Segment line2,Real dx,Real dy,Integer i1,Integer i2,Integer ir,Model &model,Element &out)
```
Create a new dimension as Element out measuring the angle from two lines Segment line1, line2
(and add to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
direction of the first line i1, 0 is the same as the line, 1 is reverse direction
direction of the second line i2, 0 is the same as the line, 1 is reverse direction
check if reverse dimension ir, 0 is normal dimension, 1 is reverse
A return value of zero indicates the function call was successful.

> **ID = 2970**

DRF_dimension_radial_create(Text style_name,Text format_text,Segment
base_arc,Real dx,Real dy,Integer float_dim,Model &model,Element &out)

```c
Integer DRF_dimension_radial_create(Text style_name,Text format_text,Segment base_arc,Real dx,Real dy,Integer float_dim,Model &model,Element &out)
```
Create a dimension s Element out measuring the radius of an arc Segment base_arc (and add to
Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point

dx dy
Integer float_dim indicating if the dimension if floating, 0 is no, 1 is yes
A return value of zero indicates the function call was successful.

> **ID = 2971**

DRF_dimension_diameter_create(Text style_name,Text format_text,Segment
base_arc,Real dx,Real dy,Integer float_dim,Model &model,Element &out)

```c
Integer DRF_dimension_diameter_create(Text style_name,Text format_text,Segment base_arc,Real dx,Real dy,Integer float_dim,Model &model,Element &out)
```
Create a dimension s Element out measuring the diameter of an arc Segment base_arc (and add
to Model model if the model is valid).
Other input parameters: Text style_name; Text format_text; Real x-y coordinate of dimension point
dx dy
Integer float_dim indicating if the dimension if floating, 0 is no, 1 is yes
A return value of zero indicates the function call was successful.

> **ID = 2972**

DRF_dimension_area_create(Text style_name,Text format_text,Element
polygon,Model &model,Element &out)

```c
Integer DRF_dimension_area_create(Text style_name,Text format_text,Element polygon,Model &model,Element &out)
```
Create a new dimension as Element out measuring the area of a Element polygon (and add to
Model model if the model is valid).
Other input parameters: Text style_name; Text format_text
A return value of zero indicates the function call was successful.

> **ID = 2973**

DRF_dimension_edit_move_dim(Real dx,Real dy,Element &dimension,Integer
move_mode)

```c
Integer DRF_dimension_edit_move_dim(Real dx,Real dy,Element &dimension,Integer move_mode)
```
Move the dimension point of a dimension Element dimension.
move_mode 1 means: the value of dx dy are added to x-y coordinate of the current dimension
point.
move_mode 0 means: the value of dx dy are the new to x-y coordinate of the dimension point.
A return value of zero indicates the function call was successful.

> **ID = 2975**


DRF_dimension_edit_move_start(Real dx,Real dy,Element &dimension,Integer
move_mode)

```c
Integer DRF_dimension_edit_move_start(Real dx,Real dy,Element &dimension,Integer move_mode)
```
Move the start point of a dimension Element dimension.
move_mode 1 means: the value of dx dy are added to x-y coordinate of the current start point.
move_mode 0 means: the value of dx dy are the new to x-y coordinate of the start point.
A return value of zero indicates the function call was successful.

> **ID = 2976**

DRF_dimension_edit_move_end(Real dx,Real dy,Element &dimension,Integer
move_mode)

```c
Integer DRF_dimension_edit_move_end(Real dx,Real dy,Element &dimension,Integer move_mode)
```
Move the end point of a dimension Element dimension.
move_mode 1 means: the value of dx dy are added to x-y coordinate of the current end point.
move_mode 0 means: the value of dx dy are the new to x-y coordinate of the end point.
A return value of zero indicates the function call was successful.

> **ID = 2977**

DRF_dimension_edit_set_start(Element ref_string,Integer ref_ip,Real
ref_ext,Element &drf_dim)

```c
Integer DRF_dimension_edit_set_start(Element ref_string,Integer ref_ip,Real ref_ext,Element &drf_dim)
```
Set the start point of a dimension Element drf_dim with the associative point defined by the
reference string ref_string, vertex index (or IP index) ref_ip and distance to the vertex ref_ext.
A return value of zero indicates the function call was successful.

> **ID = 3899**

DRF_dimension_edit_set_end(Element ref_string,Integer ref_ip,Real ref_ext,Element
&drf_dim)

```c
Integer DRF_dimension_edit_set_end(Element ref_string,Integer ref_ip,Real ref_ext,Element &drf_dim)
```
Set the end point of a dimension Element drf_dim with the associative point defined by the
reference string ref_string, vertex index (or IP index) ref_ip and distance to the vertex ref_ext.

A return value of zero indicates the function call was successful.

> **ID = 3900**

DRF_get_dimension_styles(Dynamic_Text &styles)

```c
Integer DRF_get_dimension_styles(Dynamic_Text &styles)
```
Set the list of texts styles with the names of all dimension styles in the current project.
A return value of zero indicates the function call was successful.

> **ID = 3378**

DRF_dimension_style_property(Text style_name,Text property_name,Integer
&value)

```c
Integer DRF_dimension_style_property(Text style_name,Text property_name,Integer &value)
```
Get the Integer value of the property property_name of a dimension style with given name
style_name.
If there is no dimension style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3473**

DRF_dimension_style_property(Text style_name,Text property_name,Real &value)

```c
Integer DRF_dimension_style_property(Text style_name,Text property_name,Real &value)
```
Get the Real value of the property property_name of a dimension style with given name
style_name.
If there is no dimension style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3474**

DRF_dimension_style_property(Text style_name,Text property_name,Text &value)

```c
Integer DRF_dimension_style_property(Text style_name,Text property_name,Text &value)
```
Get the Text value of the property property_name of a dimension style with given name
style_name.

If there is no dimension style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3475**

DRF_dimension_area_create(Text style_name,Text format_text,Element
poly_inp,Element &dimension_out);

```c
Integer DRF_dimension_area_create(Text style_name,Text format_text,Element poly_inp,Element &dimension_out);
```
Create a new area dimension as Element dimension_out .
The associative polygon is referenced by Element poly_inp.
Other input parameters: Text style_name; Text format_text;
A return value of zero indicates the function call was successful.

> **ID = 3896**

### 5.50.2 Leader Functions

DRF_leader_create(Text style_name,Text leader_text,Real ax,Real ay,Real hx,Real
hy,Model &model,Element &out)

```c
Integer DRF_leader_create(Text style_name,Text leader_text,Real ax,Real ay,Real hx,Real hy,Model &model,Element &out)
```
Create a new leader as Element out (and add to Model model if the model is valid).
Other input parameters: Text style_name; Text leader_text; Real x-y coordinate for arrow point ax
ay, hook point hx hy
A return value of zero indicates the function call was successful.

> **ID = 2974**

DRF_leader_edit_move_hook(Real hx,Real hy,Element &leader,Integer move_mode)

```c
Integer DRF_leader_edit_move_hook(Real hx,Real hy,Element &leader,Integer move_mode)
```
Mode the hook point of a leader Element leader.
move_mode 1 means: the value of dx dy are added to x-y coordinate of the current hook point.
move_mode 0 means: the value of dx dy are the new to x-y coordinate of the hook point.
A return value of zero indicates the function call was successful.

> **ID = 2978**

DRF_leader_edit_move_arrow(Real hx,Real hy,Element &leader,Integer
move_mode)

```c
Integer DRF_leader_edit_move_arrow(Real hx,Real hy,Element &leader,Integer move_mode)
```
Mode the arrow point of a leader Element leader.
move_mode 1 means: the value of dx dy are added to x-y coordinate of the current arrow point.
move_mode 0 means: the value of dx dy are the new to x-y coordinate of the arrow point.
A return value of zero indicates the function call was successful.

> **ID = 2979**

DRF_get_leader_arrow(Element leader,Real &arrow_x,Real &arrow_y)

```c
Integer DRF_get_leader_arrow(Element leader,Real &arrow_x,Real &arrow_y)
```
Get the arrow point xy-coordinate arrow_x arrow_y of a leader Element leader

A return value of zero indicates the function call was successful.

> **ID = 3088**

DRF_get_leader_hook(Element leader,Real &hook_x,Real &hook_y)

```c
Integer DRF_get_leader_hook(Element leader,Real &hook_x,Real &hook_y)
```
Get the hook point xy-coordinate hook_x hook_y of a leader Element leader
A return value of zero indicates the function call was successful.

> **ID = 3089**

DRF_get_leader_text(Element leader,Text &leader_text)

```c
Integer DRF_get_leader_text(Element leader,Text &leader_text)
```
Get the leader text leader_text of a leader Element leader
A return value of zero indicates the function call was successful.

> **ID = 3090**

DRF_set_leader_hook_angle(Element leader,Real hook_angle)

```c
Integer DRF_set_leader_hook_angle(Element leader,Real hook_angle)
```
Set the hook angle of a leader Element leader to the new value hook_angle
A return value of zero indicates the function call was successful.

> **ID = 3483**

DRF_set_leader_info_tin(Element &leader,Tin tin)

```c
Integer DRF_set_leader_info_tin(Element &leader,Tin tin)
```
Set the associative Tin of the Element leader to the new value tin
A return value of zero indicates the function call was successful.

> **ID = 3901**

DRF_leader_edit_set_arrow_point(Element ref_string,Integer ref_ip,Real
ref_ext,Element &drf_leader)

```c
Integer DRF_leader_edit_set_arrow_point(Element ref_string,Integer ref_ip,Real ref_ext,Element &drf_leader)
```
Set the associative object of the Element leader to the point defined by Element ref_string vertex
index ref_ip and distance to the vertex ref_ext.
A return value of zero indicates the function call was successful.

> **ID = 3902**

DRF_leader_edit_set_arrow_segment(Element ref_string,Integer ref_ip,Real
ref_ext,Element &drf_leader)

```c
Integer DRF_leader_edit_set_arrow_segment(Element ref_string,Integer ref_ip,Real ref_ext,Element &drf_leader)
```
Set the associative object of the Element leader to the segment defined by Element ref_string
vertex index ref_ip ; the position of the arrow is determined by the distance to the vertex ref_ext.
A return value of zero indicates the function call was successful.

> **ID = 3903**

DRF_leader_edit_set_arrow_element(Element ref_string,Integer ref_ip,Real
ref_ext,Element &drf_leader)

```c
Integer DRF_leader_edit_set_arrow_element(Element ref_string,Integer ref_ip,Real ref_ext,Element &drf_leader)
```
Set the associative object of the Element leader to the element defined by Element ref_string  ; the
position of the arrow is determined by vertex index ref_ip and the distance to the vertex ref_ext.
A return value of zero indicates the function call was successful.

> **ID = 3904**

DRF_get_leader_hook_angle(Element leader,Real &hook_angle)

```c
Integer DRF_get_leader_hook_angle(Element leader,Real &hook_angle)
```
Get the Real hook_angle of a leader Element leader
A return value of zero indicates the function call was successful.

> **ID = 3484**

DRF_get_leader_styles(Dynamic_Text &styles)

```c
Integer DRF_get_leader_styles(Dynamic_Text &styles)
```
Set the list of texts styles with the names of all leader styles in the current project.
A return value of zero indicates the function call was successful.

> **ID = 3379**

DRF_leader_style_property(Text style_name,Text property_name,Integer &value)

```c
Integer DRF_leader_style_property(Text style_name,Text property_name,Integer &value)
```
Get the Integer value of the property property_name of a leader style with given name
style_name.
If there is no leader style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3476**

DRF_leader_style_property(Text style_name,Text property_name,Real &value)

```c
Integer DRF_leader_style_property(Text style_name,Text property_name,Real &value)
```
Get the Real value of the property property_name of a leader style with given name style_name.
If there is no leader style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3477**

DRF_leader_style_property(Text style_name,Text property_name,Text &value)

```c
Integer DRF_leader_style_property(Text style_name,Text property_name,Text &value)
```
Get the Text value of the property property_name of a leader style with given name style_name.
If there is no leader style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3478**

DRF_leader_create_associative_point(Text style_name,Text format_text,Integer
type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text
ref_part_name,Integer ref_ip,Real ref_ext,Text ref_tin,Integer ref_method,Real
ax,Real ay,Real hx,Real hy,Element &out_leader)

```c
Integer DRF_leader_create_associative_point(Text style_name,Text format_text,Integer type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text ref_part_name,Integer ref_ip,Real ref_ext,Text ref_tin,Integer ref_method,Real ax,Real ay,Real hx,Real hy,Element &out_leader)
```
Create a new accociative leader as Element out_leader .
The association point belongs to a string with name and id ref_ele_name ref_ele_id within the
containing models ref_mod_name ref_mod_id - the looking up method for the element is
determined by Integer ref_method - not yet used.
Within the given string, the point is located using ref_part_name (only when the string is a super
alignment with named parts), or segment number ref_ip, the distance to the start of the segment
ref_ext, the name of the reference tin ref_tin if the type involves tin.
The list of valid association (Integer) type is
10    Vertex_Text_Type           vertex text or vertex attributes of a super string
12    Vertex_XYZ_Type            ,
13    Vertex_XY_Type             ,
14    Point_XYZ_Type             ,
15    Point_XY_Type              ,
16    Level_Type                 ,
17    Tin_Level_Type             ,
18    Tin_Depth_Type             ,
19    Grade_Percent_Type         ,
20    Grade_1_In_Type            ,
25    Tin_Aspect_Type            ,
27    Tin_Slope_1_In_Type        ,
28    Tin_Slope_Percent_Type     ,
29    XYZ_Type                   ,
30    XY_Type                    ,
Other input parameters: Text style_name; Text format_text; Real x-y coordinate for arrow point ax
ay, hook point hx hy
A return value of zero indicates the function call was successful.

> **ID = 3879**

DRF_leader_create_associative_segment(Text style_name,Text format_text,Integer
type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text
ref_part_name,Integer ref_ip,Real ref_ext,Integer ref_method,Real hx,Real
hy,Element &out_leader)

```c
Integer DRF_leader_create_associative_segment(Text style_name,Text format_text,Integer type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text ref_part_name,Integer ref_ip,Real ref_ext,Integer ref_method,Real hx,Real hy,Element &out_leader)
```
Create a new accociative leader as Element out_leader .
The association segment belongs to a string with name and id ref_ele_name ref_ele_id within the
containing models ref_mod_name ref_mod_id - the looking up method for the element is

determined by Integer ref_method - not yet used.
Within the given string, the segment is located using ref_part_name (only when the string is a super
alignment with named parts), or segment number ref_ip, the distance of the arrow to the start of the
segment ref_ext.
The list of valid association (Integer) type is
4    Segment_Length_Type        ,
5    Segment_Length_3d_Type     ,
6    Segment_Bearing_Type       ,
7    Segment_Length_Bearing_Type,
8    Segment_Radius_Type        ,
11    Segment_Text_Type          , segment text or segment attributes of a super string
Other input parameters: Text style_name; Text format_text; Real x-y coordinate for hook point hx
hy
A return value of zero indicates the function call was successful.

> **ID = 3880**

DRF_leader_create_associative_element(Text style_name,Text format_text,Integer
type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text
ref_part_name,Integer ref_ip,Real ref_ext,Integer ref_method,Real hx,Real
hy,Element &out_leader)

```c
Integer DRF_leader_create_associative_element(Text style_name,Text format_text,Integer type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Text ref_part_name,Integer ref_ip,Real ref_ext,Integer ref_method,Real hx,Real hy,Element &out_leader)
```
Create a new accociative leader as Element out_leader .
The association element is referenced by name and id ref_ele_name ref_ele_id within the
containing models ref_mod_name ref_mod_id - the looking up method for the element is
determined by Integer ref_method - not yet used.
The location of the arrow is defined using ref_part_name (only when the element is a super
alignment with named parts), or segment number ref_ip, the distance of the arrow to the start of the
segment ref_ext.
The list of valid association (Integer) type is
1    Area_Type                  ,
2    String_Length_Type         ,
3    String_Length_3d_Type      ,
9    String_Name_Type           , name or attributes of the element
21    Centroid_XY_Type           ,
22    Centre_XY_Type             , medial axis centre of a string
24    Volume_Type                , only for trimesh
Other input parameters: Text style_name; Text format_text; Real x-y coordinate for hook point hx
hy
A return value of zero indicates the function call was successful.

> **ID = 3881**


DRF_leader_create_associative_element(Text style_name,Text format_text,Integer
type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Integer
ref_method,Real hx,Real hy,Element &out_leader)

```c
Integer DRF_leader_create_associative_element(Text style_name,Text format_text,Integer type,Text ref_ele_name,Uid ref_ele_id,Text ref_mod_name,Uid ref_mod_id,Integer ref_method,Real hx,Real hy,Element &out_leader)
```
Create a new accociative leader as Element out_leader .
The association element is referenced by name and id ref_ele_name ref_ele_id within the
containing models ref_mod_name ref_mod_id - the looking up method for the element is
determined by Integer ref_method - not yet used.
The location of the arrow is automatically set at the centroid or centre of the selected element
The list of valid association (Integer) type is
1    Area_Type                  ,
21    Centroid_XY_Type           ,
22    Centre_XY_Type             , medial axis centre of a string
Other input parameters: Text style_name; Text format_text; Real x-y coordinate for hook point hx
hy
A return value of zero indicates the function call was successful.

> **ID = 3882**

DRF_leader_create_associative(Text style_name,Text format_text,Integer type,Text
ref_tin,Real ax,Real ay,Real hx,Real hy,Element &out_leader)

```c
Integer DRF_leader_create_associative(Text style_name,Text format_text,Integer type,Text ref_tin,Real ax,Real ay,Real hx,Real hy,Element &out_leader)
```
Create a new accociative leader as Element out_leader .
The association is defined by the arrow point coordinate ax ay and reference tin ref_tin (if the type
involves tin).
The location of the arrow is automatically set at the centroid or centre of the selected element
The list of valid association (Integer) type is
17    Tin_Level_Type             ,
25    Tin_Aspect_Type            ,
26    Tin_Colour_Type            ,
27    Tin_Slope_1_In_Type        ,
28    Tin_Slope_Percent_Type     ,
29    XYZ_Type                   ,
30    XY_Type                    ,
Other input parameters: Text style_name; Text format_text; Real x-y coordinate for hook point hx
hy

A return value of zero indicates the function call was successful.

> **ID = 3894**

DRF_leader_text_create(Text style_name,Text leader_text,Element ref_string,Integer
ref_ip,Real ref_ext,Real hx,Real hy,Element &out_leader)

```c
Integer DRF_leader_text_create(Text style_name,Text leader_text,Element ref_string,Integer ref_ip,Real ref_ext,Real hx,Real hy,Element &out_leader)
```
Create a new text leader as Element out_leader .
The association of the arrow is referenced Element ref_string, segment number ref_ip, and the
distance to the start of the segment ref_ext.
Other input parameters: Text style_name; Text leader_text; Real x-y coordinate for hook point hx
hy
A return value of zero indicates the function call was successful.

> **ID = 3895**

### 5.50.3 Table Functions

DRF_table_create(Text table_name,Text style_name,Integer auto_size,Integer
nr,Integer nc,Real cw,Real rh,Integer ti,Integer hi,Real px,Real py,Real ar,Model
&model,Element &table)

```c
Integer DRF_table_create(Text table_name,Text style_name,Integer auto_size,Integer nr,Integer nc,Real cw,Real rh,Integer ti,Integer hi,Real px,Real py,Real ar,Model &model,Element &table)
```
Create a drafting Element table (and add to Model model if the model valid)
Table name table_name name of output element
Name of table style style_name
Auto resizing table auto_size 0 for no, 1 for yes
Number of rows nr
Number of column nc
Column width cw
Row height rh
Including title row ti 0 for no, 1 for yes
Including header row hi 0 for no, 1 for yes
Top left x coordinate px
Top left y coordinate py
Rotation angle of the table ar
A return value of zero indicates the function call was successful.

> **ID = 3059**

DRF_table_create(Text table_name,Text style_name,Integer az,Integer nr,Integer
nc,Real cw,Real rh,Integer ti,Integer hi,Real px,Real py,Real ar,Text csv_file,Integer
col_sep,Integer mark_merge,Text merge_text,Element &table)

```c
Integer DRF_table_create(Text table_name,Text style_name,Integer az,Integer nr,Integer nc,Real cw,Real rh,Integer ti,Integer hi,Real px,Real py,Real ar,Text csv_file,Integer col_sep,Integer mark_merge,Text merge_text,Element &table))
```
Create a drafting Element table from a CSV file csv_file with column separator col_sep 0 for
comma, 1 for semicolon, 2 for tab.
Table name table_name name of output element
Name of table style style_name
Auto resizing table auto_size 0 for no, 1 for yes
Number of rows nr
Number of column nc
Column width cw
Row height rh

Including title row ti 0 for no, 1 for yes
Including header row hi 0 for no, 1 for yes
Top left x coordinate px
Top left y coordinate py
Rotation angle of the table ar
If the CSV is from 12D and there are special cell text cells to indicate merging cells, then
mark_merge should be 1 and the merge_text should be set accordingly, see the main 12D
reference manual for write drafting table to CSV and create single table from CSV file for more
details.
A return value of zero indicates the function call was successful.

> **ID = 3891**

DRF_table_edit_cell(Integer row, Integer column, Text value, Element &table)

```c
Integer DRF_table_edit_cell(Integer row, Integer column, Text value, Element &table)
```
Edit a cell of a drafting Element table at given row number row, column number column with the
new value Text value
A return value of one indicates the number row or column is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3060**

DRF_table_edit_cell(Integer row, Integer column, Real value, Element &table)

```c
Integer DRF_table_edit_cell(Integer row, Integer column, Real value, Element &table)
```
Edit a cell of a drafting Element table at given row number row, column number column with the
new value Real value
A return value of one indicates the number row or column is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3061**

DRF_table_edit_cell(Integer row, Integer column, Integer value, Element &table)

```c
Integer DRF_table_edit_cell(Integer row, Integer column, Integer value, Element &table)
```
Edit a cell of a drafting Element table at given row number row, column number column with the
new value Integer value
Note that row 1 is used for the title row and row 2 is used for the header row (even when they are
not used in the table).
A return value of one indicates the number row or column is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3062**

DRF_table_get_cell(Element table,Integer row,Integer column,Integer
&cell_type,Integer &int_val,Real &real_val,Text &text_val)

```c
Integer DRF_table_get_cell(Element table,Integer row,Integer column,Integer &cell_type,Integer &int_val,Real &real_val,Text &text_val)
```
Get a cell of a drafting Element table at given row number row, column number column and return.
- the type of the cell in cell_type: 2 for Integer; 3 for Real; 4 for Text; 100 for empty cell; 102 for
merged cell of the first row; 103 for merged cell of the first column; 105 for merged cell that not in the
first row nor first column.
- Integer value of the cell int_val.
- Real value of the cell real_val.
- Text value of the cell text_val.
Note that row 1 is used for the title row and row 2 is used for the header row (even when they are
not used in the table).
A return value of one indicates the number row or column is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3859**

DRF_table_get_number_row_column(Element table,Integer &nr,Integer &nc)

```c
Integer DRF_table_get_number_row_column(Element table,Integer &nr,Integer &nc)
```
Get the number of rows nr and the number of columns nc of a drafting Element table. Note that the
header and title row (if used) are not counted in nr.
A return value of zero indicates the function call was successful.

> **ID = 3095**

DRF_table_get_row_height(Element table,Integer row_number,Real &row_height)

```c
Integer DRF_table_get_row_height(Element table,Integer row_number,Real &row_height)
```
Get row height row_height at row number row_number of a drafting Element table
A return value of zero indicates the function call was successful.

> **ID = 3096**

DRF_table_get_column_width(Element table,Integer col_number,Real &col_width)

```c
Integer DRF_table_get_column_width(Element table,Integer col_number,Real &col_width)
```
Get column width col_width at column number col_number of a drafting Element table
A return value of zero indicates the function call was successful.

> **ID = 3097**

DRF_table_get_origin(Element table,Real &x_origin,Real &y_origin)

```c
Integer DRF_table_get_origin(Element table,Real &x_origin,Real &y_origin)
```
Get X-Y coordinate (x_origin,y_origin) of the origin point (top left corner) of a drafting Element
table.
A return value of zero indicates the function call was successful.

> **ID = 3203**

DRF_table_get_offset(Element table,Real &x_offset,Real &y_offset)

```c
Integer DRF_table_get_offset(Element table,Real &x_offset,Real &y_offset)
```
Not yet implemented
A return value of zero indicates the function call was successful.

> **ID = 3205**

DRF_table_get_rotation(Element table,Real &rotation)

```c
Integer DRF_table_get_rotation(Element table,Real &rotation)
```
Get the rotation angle of a drafting Element table.
A return value of zero indicates the function call was successful.

> **ID = 3207**

DRF_table_set_row_height(Element table,Integer row_number,Real row_height)

```c
Integer DRF_table_set_row_height(Element table,Integer row_number,Real row_height)
```
Set row height to row_height at row number row_number of a drafting Element table
A return value of zero indicates the function call was successful.

> **ID = 3098**

DRF_table_set_column_width(Element table,Integer col_number,Real col_width)


```c
Integer DRF_table_set_column_width(Element table,Integer col_number,Real col_width)
```
Set column width to col_width at column number col_number of a drafting Element table
A return value of zero indicates the function call was successful.

> **ID = 3099**

DRF_table_set_origin(Element table,Real x_origin,Real y_origin)

```c
Integer DRF_table_set_origin(Element table,Real x_origin,Real y_origin)
```
Set the X-Y coordinate origin point (top left corner) of a drafting Element table to
(x_origin,y_origin).
A return value of zero indicates the function call was successful.

> **ID = 3202**

DRF_table_set_offset(Element table,Real x_offset,Real y_offset)

```c
Integer DRF_table_set_offset(Element table,Real x_offset,Real y_offset)
```
Not yet implemented
A return value of zero indicates the function call was successful.

> **ID = 3204**

DRF_table_set_rotation(Element table,Real rotation)

```c
Integer DRF_table_set_rotation(Element table,Real rotation)
```
Set the rotation angle of a drafting Element table to Real rotation.
A return value of zero indicates the function call was successful.

> **ID = 3206**

DRF_get_table_styles(Dynamic_Text &styles)

```c
Integer DRF_get_table_styles(Dynamic_Text &styles)
```
Set the list of texts styles with the names of all table styles in the current project.
A return value of zero indicates the function call was successful.

> **ID = 3380**


DRF_table_style_property(Text style_name,Text property_name,Integer &value)

```c
Integer DRF_table_style_property(Text style_name,Text property_name,Integer &value)
```
Get the Integer value of the property property_name of a table style with given name style_name.
If there is no table style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3470**

DRF_table_style_property(Text style_name,Text property_name,Real &value)

```c
Integer DRF_table_style_property(Text style_name,Text property_name,Real &value)
```
Get the Real value of the property property_name of a table style with given name style_name.
If there is no table style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3471**

DRF_table_style_property(Text style_name,Text property_name,Text &value)

```c
Integer DRF_table_style_property(Text style_name,Text property_name,Text &value)
```
Get the Text value of the property property_name of a table style with given name style_name.
If there is no table style of given name, the return value is 1.
This function is under on going development process.
A return value of zero indicates the function call was successful.

> **ID = 3472**

DRF_table_edit_resize(Integer nr,Integer nc,Element &table)

```c
Integer DRF_table_edit_resize(Integer nr,Integer nc,Element &table)
```
Resize the number of row and column of a drafting Element table to Integers nr and nc respectively.
A return value of zero indicates the resize was successful.

> **ID = 3816**

DRF_table_edit_resize_column(Integer nc,Element &table)


```c
Integer DRF_table_edit_resize_column(Integer nc,Element &table)
```
Resize the number of column of a drafting Element table to Integer nr
A return value of zero indicates the resize was successful.

> **ID = 3817**

DRF_table_edit_resize_row(Integer nr,Element &table)

```c
Integer DRF_table_edit_resize_row(Integer nr,Element &table)
```
Resize the number of row of a drafting Element table to Integer nr
A return value of zero indicates the resize was successful.

> **ID = 3818**

DRF_table_remove_merge(Element table,Integer row,Integer column)

```c
Integer DRF_table_remove_merge(Element table,Integer row,Integer column)
```
Remove the merging cells block of a drafting Element table with the top left corner of given by
Integer row and column
A return value of zero indicates the resize was successful.

> **ID = 8014**

DRF_table_add_merge(Element table,Integer row_l,Integer row_h,Integer
column_l,Integer column_h)

```c
Integer DRF_table_add_merge(Element table,Integer row_l,Integer row_h,Integer column_l,Integer column_h)
```
Add a new merging cells block of a drafting Element table using given by four Integers: lower row
row_l higher row row_h and lower column column_l higher column column_h.
A return value of zero indicates the resize was successful.

> **ID = 8015**

### 5.50.4 Common Draft Functions

DRF_recalc(Element &draft)

```c
Integer DRF_recalc(Element &draft)
```
Recalculate a drafting element draft
A return value of zero indicates the function call was successful.

> **ID = 3100**

DRF_get_style(Element draft,Text &style)

```c
Integer DRF_get_style(Element draft,Text &style)
```
Get the style name style of a drafting element draft
A return value of zero indicates the function call was successful.

> **ID = 3091**

Explode_drafting(Element draft,Real paper_plot_scale,Dynamic_Element
&output_lines,Dynamic_Element &output_texts)

```c
Integer Explode_drafting(Element draft,Real paper_plot_scale,Dynamic_Element &output_lines,Dynamic_Element &output_texts)
```
Explode components of a drafting element draft using given paper_plot_scale.
A return value of zero indicates the function call was successful.

> **ID = 7753**

DRF_drafting_edit_set_style(Text style_name,Element &draft)

```c
Integer DRF_drafting_edit_set_style(Text style_name,Element &draft)
```
Change the style of a drafting Element draft to a new style with the name Text style_name.
A return value of zero indicates the function call was successful.

> **ID = 2980**

DRF_drafting_edit_set_format_text(Text new_text,Element &draft)

```c
Integer DRF_drafting_edit_set_format_text(Text new_text,Element &draft)
```
Update the text format of a dimension or leader text of a leader Element draft to a new Text
new_text.
A return value of zero indicates the function call was successful.

> **ID = 2981**

DRF_get_override_names(Element drf,Integer &count,Dynamic_Text
&names,Dynamic_Integer &types)

```c
Integer DRF_get_override_names(Element drf,Integer &count,Dynamic_Text &names,Dynamic_Integer &types)
```
Get all the style overriding information of a drafting element drf, including: the number count of
fields being override, the list of all those field names, the list of types for the value of those
overrides. The sizes the two lists names and types should equal count. The value in the list types
should be 2 - Integer or 3 - Real or 4 - Text.
A return value of zero indicates the function call was successful.

> **ID = 3463**

DRF_get_override_value(Element drf,Text name,Integer &value)

```c
Integer DRF_get_override_value(Element drf,Text name,Integer &value)
```
Get the Integer value of override of a drafting element drf with the field of given name.
If the input is not a drafting element, the return value is 1.
If the input drafting elment has no override, the return value is 8.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.
If there is no override of the given name, the return value is 15.
If the override of the given name is not of Integer type, the return value is 16.
If the value of the override is invalid, the return value is 17
A return value of zero indicates the function call was successful.

> **ID = 3464**

DRF_get_override_value(Element drf,Text name,Real &value)

```c
Integer DRF_get_override_value(Element drf,Text name,Real &value)
```
Get the Real value of override of a drafting element drf with the field of given name.
If the input is not a drafting element, the return value is 1.
If the input drafting elment has no override, the return value is 8.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.

If there is no override of the given name, the return value is 15.
If the override of the given name is not of Real type, the return value is 16.
If the value of the override is invalid, the return value is 17
A return value of zero indicates the function call was successful.

> **ID = 3465**

DRF_get_override_value(Element drf,Text name,Text &value)

```c
Integer DRF_get_override_value(Element drf,Text name,Text &value)
```
Get the Text value of override of a drafting element drf with the field of given name.
If the input is not a drafting element, the return value is 1.
If the input drafting elment has no override, the return value is 8.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.
If there is no override of the given name, the return value is 15.
If the override of the given name is not of Text type, the return value is 16.
If the value of the override is invalid, the return value is 17
A return value of zero indicates the function call was successful.

> **ID = 3466**

DRF_set_override_value(Element &drf,Text name,Integer value)

```c
Integer DRF_set_override_value(Element &drf,Text name,Integer value)
```
Set the Integer value of the override of given name in a drafting element drf.
If the input is not a drafting element, the return value is 1.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.
If the override of the given name is not of Integer type, the return value is 16.
A return value of zero indicates the function call was successful.

> **ID = 3467**

DRF_set_override_value(Element &drf,Text name,Real value)

```c
Integer DRF_set_override_value(Element &drf,Text name,Real value)
```
Set the Real value of the override of given name in a drafting element drf.
If the input is not a drafting element, the return value is 1.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.

If the override of the given name is not of Real type, the return value is 16.
A return value of zero indicates the function call was successful.

> **ID = 3468**

DRF_set_override_value(Element &drf,Text name,Text value)

```c
Integer DRF_set_override_value(Element &drf,Text name,Text value)
```
Set the Text value of the override of given name in a drafting element drf.
If the input is not a drafting element, the return value is 1.
If name is not a valid override field name, the return value is 9 for leader; 10 for table; 11 for
dimension.
If the override of the given name is not of Text type, the return value is 16.
A return value of zero indicates the function call was successful.

> **ID = 3469**

DRF_clear_overrides(Element &drf)

```c
Integer DRF_clear_overrides(Element &drf)
```
Clear all overrides of a drafting elment drf.
A return value of zero indicates the function call was successful.

> **ID = 3482**

DRF_remove_association(Element &drf)

```c
Integer DRF_remove_association(Element &drf)
```
Clear all associative object of a drafting elment drf.
A return value of zero indicates the function call was successful.

> **ID = 3897**

DRF_is_associative(Element drf,Integer &is_associative)

```c
Integer DRF_is_associative(Element drf,Integer &is_associative)
```
Check to see if the drafting elment drf has any associative object and set Integer is_associative to
1 if the answer is yes, 0 otherwise
A return value of zero indicates the function call was successful.

> **ID = 3898**


