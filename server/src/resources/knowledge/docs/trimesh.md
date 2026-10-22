# Trimesh Element and Plot Frame Element

> **Source:** 12d Model Macro Manual §5.51 (pp 796–831), §5.52 (pp 832–841)

A trimesh element contains a list of 3D points and a list of faces where each face is a triple of point indices.
The normal to each triangle points away from the inside — points p1, p2, p3 are in **counter-clockwise** order (opposite to TIN triangles).

**Critical functions used in centroid calculations:**
- `Is_trimesh(Element e)` — check element type
- `Trimesh_number_of_triangles(Element trimesh, Integer &n)` — count triangles
- `Trimesh_get_triangle_points_coords(...)` — get vertex coordinates for each triangle
- `Get_trimesh_centroid(Element trimesh, Real &cx, Real &cy, Real &cz)` — built-in centroid


## 5.51 Trimesh Element

A trimesh element contains a list of 3d points and a list of faces where each face is a triple of indices
of points from the point list.
The direction of the normal to each triangle points away from the inside of the trimesh.
Looking down onto the triangle from the opposite direction to the normal, the three points (p1, p2
and p3) in the triple of the triangle are in a counter clockwise order around the triangle.
Note that this is the opposite to the order of points in a triangle in a tin. See
Tin_get_triangle_points(Tin tin,Integer nt,Integer &p1,Integer &p2,Integer &p3).
The following functions are used to create new trimeshes and make inquiries and modifications to
existing trimeshes.

### Trimesh Query and Inspection Functions

Trimesh_number_of_points(Element trimesh,Integer &number_points)

```c
Integer Trimesh_number_of_points(Element trimesh,Integer &number_points)
```
Get the number of points number_points of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3005**

Trimesh_number_of_triangles(Element trimesh,Integer &number_triangles)

```c
Integer Trimesh_number_of_triangles(Element trimesh,Integer &number_triangles)
```
Get the number of triangles number_triangles of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3006**

Trimesh_number_of_edges(Element e,Integer &number_edges)

```c
Integer Trimesh_number_of_edges(Element e,Integer &number_edges)
```
p1
p3
p2
normal to the triangle which points away
from the inside of the trimesh

Get the number of edges number_edges of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3525**

Trimesh_get_point_coord(Element trimesh,Integer point_index,Real &x,Real
&y,Real &z)

```c
Integer Trimesh_get_point_coord(Element trimesh,Integer point_index,Real &x,Real &y,Real &z)
```
Get the xyz-coordinate x y z of the point with index point_index of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3007**

Trimesh_get_triangle_points(Element trimesh,Integer triangle_index,Integer
&p1_index,Integer &p2_index,Integer &p3_index)

```c
Integer Trimesh_get_triangle_points(Element trimesh,Integer triangle_index,Integer &p1_index,Integer &p2_index,Integer &p3_index)
```
Get three point indices p1_index p2_index p3_index of the triangle with index triangle_index of a
trimesh Element trimesh.
The points in the triangles p1_index, p2_index and p3_index are in a counter clockwise order
around the triangle. See 5.51 Trimesh Element.
A return value of zero indicates the function call was successful.

> **ID = 3008**

Trimesh_get_triangle_points_coords(Element trimesh,Integer triangle_index,Integer
&p1_index,Integer &p2_index,Integer &p3_index,Real &x1,Real &y1,Real &z1,Real
&x2,Real &y2,Real &z2,Real &x3,Real &y3,Real &z3)

```c
Integer Trimesh_get_triangle_points_coords(Element trimesh,Integer triangle_index,Integer &p1_index,Integer &p2_index,Integer &p3_index,Real &x1,Real &y1,Real &z1,Real &x2,Real &y2,Real &z2,Real &x3,Real &y3,Real &z3)
```
Get three point indices p1_index p2_index p3_index of the triangle with index triangle_index of a
p1_index
p3_index
p2_index
normal pointing
out

trimesh Element trimesh; and also the xyz-coordinate of the three point x1 y1 z1, x2 y2 z2, x3, y3,
z3.
The points p1_index, p2_index and p3_index are in a counter clockwise order around the triangle.
See 5.51 Trimesh Element
A return value of zero indicates the function call was successful.

> **ID = 3009**

Trimesh_get_triangle_edges(Element trimesh,Integer triangle_index,Integer
&e1_index,Integer &e2_index,Integer &e3_index)

```c
Integer Trimesh_get_triangle_edges(Element trimesh,Integer triangle_index,Integer &e1_index,Integer &e2_index,Integer &e3_index)
```
Get three indices e1_index e2_index e3_index of the three edges of the triangle with index
triangle_index of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3526**

Trimesh_get_edge_triangles_points(Element e,Integer edge_index,Integer
&triangles_count,Integer &triangle1_index,Integer &triangle2_index,Integer
&vertex1_index,Integer &vertex2_index)

```c
Integer Trimesh_get_edge_triangles_points(Element e,Integer edge_index,Integer &triangles_count,Integer &triangle1_index,Integer &triangle2_index,Integer &vertex1_index,Integer &vertex2_index)
```
Get the details of edge with given edge_index of a Element e
Number of triangles contain that edge triangles_count. On a "good" closed trimesh, this number
should be always 2.
The indices of the two triangles containing the edge: triangle1_index, triangle2_index.
The indices of the two vertices at the two end of the edge: vertex1_index, vertex2_index.
A return value of zero indicates the function call was successful.

> **ID = 3527**

Is_trimesh(Element e)
p1_index
p3_index
p2_index
Plan View
normal pointing
out


```c
Integer Is_trimesh(Element e)
```
Return 1 if the input Element e is a trimesh; return 0 for otherwise.

> **ID = 3010**

Is_polymesh(Element e)

```c
Integer Is_trimesh(Element e)
```
Return 1 if the input Element e is a trimesh with polymesh setup; return 0 for otherwise.

> **ID = 7769**

Get_trimesh_centroid(Element trimesh,Real &centroid_x,Real &centroid_y,Real
&centroid_z)

```c
Integer Get_trimesh_centroid(Element trimesh,Real &centroid_x,Real &centroid_y,Real &centroid_z)
```
Get the xyz-coordinate centroid_x centroid_y centroid_z of the centroid of the trimesh
A return value of zero indicates the function call was successful.

> **ID = 3019**

Get_trimesh_surface_area(Element trimesh,Real &area)

```c
Integer Get_trimesh_surface_area(Element trimesh,Real &area)
```
Get surface area of an trimesh Element trimesh
A return value of zero indicates the function call was successful.

> **ID = 3020**

Get_trimesh_volume(Element trimesh,Real &volume)

```c
Integer Get_trimesh_volume(Element trimesh,Real &volume)
```
Get Real volume of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3033**

Trimesh_get_signed_volume(Element trimesh,Real &volume)


```c
Integer Trimesh_get_signed_volume(Element trimesh,Real &volume)
```
Get Real volume of a trimesh Element trimesh as a signed Real.
A negative volume indicates that the trimesh is inside out.
A return value of zero indicates the function call was successful.

> **ID = 7748**

Trimesh_get_signed_area(Element trimesh,Real &area)

```c
Integer Trimesh_get_signed_area(Element trimesh,Real &area)
```
Get Real surface area of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 7749**

Trimesh_closed(Element trimesh,Integer &is_closed)

```c
Integer Trimesh_closed(Element trimesh,Integer &is_closed)
```
Set the value is_closed to 1 if trimesh Element trimesh l is closed; 0 otherwise
A return value of zero indicates the function call was successful.

> **ID = 3021**

Trimesh_get_solid(Element e,Integer &solid)

```c
Integer Trimesh_get_solid(Element e,Integer &solid))
```
Get the value solid of given trimesh 1 is solid; 0 otherwise
A return value of zero indicates the function call was successful.

> **ID = 7699**

Trimesh_set_solid(Element e,Integer solid)

```c
Integer Trimesh_set_solid(Element e,Integer solid)
```
Set the value solid to 1 if trimesh Element trimesh is solid; 0 otherwise
A return value of zero indicates the function call was successful.

> **ID = 7700**


### Polymesh Functions

Polymesh_get_edge_indices(Element e,Integer &count,Dynamic_Integer &indices)

```c
Integer Polymesh_get_edge_indices(Element e,Integer &count,Dynamic_Integer &indices)
```
Get the count of edge indices of given polymesh e and the full list in indices
A return value of zero indicates the function call was successful.

> **ID = 7770**

Polymesh_get_number_of_faces(Element e,Integer &count)

```c
Integer Polymesh_get_number_of_faces(Element e,Integer &count)
```
Get the count of polymesh faces of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7771**

Polymesh_get_face_valid(Element e,Integer face_ix,Integer &valid)

```c
Integer Polymesh_get_face_valid(Element e,Integer face_ix,Integer &valid)
```
Get the valid flag of polymesh face with index face_ix of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7772**

Polymesh_get_face_colour(Element e,Integer face_ix,Integer &colour)

```c
Integer Polymesh_get_face_colour(Element e,Integer face_ix,Integer &colour)
```
Get the colour of polymesh face with index face_ix of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7773**

Polymesh_get_face_name(Element e,Integer face_ix,Text &name)

```c
Integer Polymesh_get_face_name(Element e,Integer face_ix,Text &name)
```
Get the name of polymesh face with index face_ix of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7774**

Polymesh_get_face_normal(Element e,Integer face_ix,Real &x,Real &y,Real &z)

```c
Integer Polymesh_get_face_normal(Element e,Integer face_ix,Real &x,Real &y,Real &z)
```
Get the normal x,y,z of polymesh face with index face_ix of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7775**

Polymesh_get_face_face_indices(Element e,Integer face_ix,Integer
&count,Dynamic_Integer &indices)

```c
Integer Polymesh_get_face_face_indices(Element e,Integer face_ix,Integer &count,Dynamic_Integer &indices)
```
Get the count of inner face indices of given polymesh face with index face_ix of given polymesh e
and the full list in indices
A return value of zero indicates the function call was successful.

> **ID = 7776**

Polymesh_get_face_edge_indices(Element e,Integer face_ix,Integer
&count,Dynamic_Integer &indices)

```c
Integer Polymesh_get_face_edge_indices(Element e,Integer face_ix,Integer &count,Dynamic_Integer &indices)
```
Get the count of inner edge indices of given polymesh face with index face_ix of given polymesh e
and the full list in indices
A return value of zero indicates the function call was successful.

> **ID = 7777**

Polymesh_get_face_boundary(Element e,Integer face_ix,Real &radius,Point
&centroid,Integer &vertex_indices_count,Dynamic_Integer &vertex_indices)

```c
Integer Polymesh_get_face_boundary(Element e,Integer face_ix,Real &radius,Point &centroid,Integer &vertex_indices_count,Dynamic_Integer &vertex_indices)
```
Get information (radius, centroid, vertex_indices_count, vertex_indices) of boundary of
polymesh face with index face_ix of given polymesh e
A return value of zero indicates the function call was successful.

> **ID = 7778**

Polymesh_get_face_number_of_holes(Element e,Integer face_ix,Integer
&count,Dynamic_Integer &indices)

```c
Integer Polymesh_get_face_number_of_holes(Element e,Integer face_ix,Integer &count,Dynamic_Integer &indices)
```
Get the count of holes of polymesh face with index face_ix of given polymesh e
The indices is not used at the moment.
A return value of zero indicates the function call was successful.

> **ID = 7779**

Polymesh_get_face_hole(Element e,Integer face_ix,Integer hole_ix,Real
&radius,Point &centroid,Integer &vertex_indices_count,Dynamic_Integer
&vertex_indices)

```c
Integer Polymesh_get_face_hole(Element e,Integer face_ix,Integer hole_ix,Real &radius,Point &centroid,Integer &vertex_indices_count,Dynamic_Integer &vertex_indices)
```
Get information (radius, centroid, vertex_indices_count, vertex_indices) of hole number
hole_ix of polymesh face with index face_ix of given polymesh e.
A return value of zero indicates the function call was successful.

> **ID = 7780**

Polymesh_drop_point_2d(Element polymesh,Integer polyface_no,Real point_x,Real
point_y,Integer &face_ix,Real &face_dr_z)

```c
Integer Polymesh_drop_point_2d(Element polymesh,Integer polyface_no,Real point_x,Real point_y,Integer &face_ix,Real &face_dr_z))
```
2D drop from a given point (point_x point_y) to the polyface of a polymesh of given polyface_no
and set the result with
face_ix face index of the drop
face_dr_z z value of the drop point
A return value of zero indicates the function call was successful.

> **ID = 7816**

Polymesh_drop_point_2d(Element polymesh,Text polyface_nane,Real point_x,Real
point_y,Integer &face_ix,Real &face_dr_z)

```c
Integer Polymesh_drop_point_2d(Element polymesh,Text polyface_nane,Real point_x,Real point_y,Integer &face_ix,Real &face_dr_z))
```
2D drop from a given point (point_x point_y) to the polyface of a polymesh of given name
polyface_name and set the result with
face_ix face index of the drop
face_dr_z z value of the drop point
A return value of zero indicates the function call was successful.

> **ID = 7817**

Polymesh_drop_point_3d(Element polymesh,Integer face_no,Real point_x,Real
point_y,Real point_z,Real &face_o,Real &face_dr_x,Real &face_dr_y,Real
&face_dr_z)

```c
Integer Polymesh_drop_point_3d(Element polymesh,Integer face_no,Real point_x,Real point_y,Real point_z,Real &face_o,Real &face_dr_x,Real &face_dr_y,Real &face_dr_z)
```
3D drop from a given point (point_x point_y point_z) to the face of a polymesh of given face_no
and set the result with
face_o sign offset from the drop
face_dr_x face_dr_y face_dr_z the coordinate of the drop point
A return value of zero indicates the function call was successful.

> **ID = 7797**

Polymesh_drop_point_3d(Element polymesh,Text face_name,Real point_x,Real
point_y,Real point_z,Integer &face_ix,Real &face_o,Real &face_dr_x,Real
&face_dr_y,Real &face_dr_z)

```c
Integer Polymesh_drop_point_3d(Element polymesh,Text face_name,Real point_x,Real point_y,Real point_z,Integer &face_ix,Real &face_o,Real &face_dr_x,Real &face_dr_y,Real &face_dr_z)
```
3D drop from a given point (point_x point_y point_z) to faces of a polymesh of given face_name
and set the result with
face_ix index of polymesh face with the drop
face_o sign offset from the drop
face_dr_x face_dr_y face_dr_z the coordinate of the drop point
A return value of zero indicates the function call was successful.

> **ID = 7798**

Polymesh_get_closest_point(Element polymesh,Real xp,Real yp,Real zp,Real &x,Real
&y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)

```c
Integer Polymesh_get_closest_point(Element polymesh,Real xp,Real yp,Real zp,Real &x,Real &y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)
```
From a given point (xp yp zp) find the closest on on the surface of a  polymesh and set the result
with
x y z the coordinate of the closest surface point
off sign offset from the start point to the closest
face index of polymesh face with the cut
edge index of edge with the cut
vertex index of vertex with the cut
A return value of zero indicates the function call was successful.

> **ID = 7799**

Intersect_polymesh(Element polymesh,Real xp,Real yp,Real zp,Real
horizontal_angle,Real vertical_angle,Integer &face_no,Real &dx,Real &dy,Real
&dz,Real &signed_offset)

```c
Integer Intersect_polymesh(Element polymesh,Real xp,Real yp,Real zp,Real horizontal_angle,Real vertical_angle,Integer &face_no,Real &dx,Real &dy,Real &dz,Real &signed_offset)
```
From a 3D ray starting at point (xp yp zp) and direction defined by horizontal_angle and
vertical_angle find first cut with polymesh and set the result with
face_no polymesh face number of the cut
dx dy dz the coordinate of the cut point.
signed_offset from the start point to the cut
A return value of zero indicates the function call was successful.

> **ID = 7800**


### Trimesh Creation Functions

Form_trimesh_from_tin(Tin tin,Text mesh_name,Real mesh_offset,Real
mesh_depth,Integer colour,Element &trimesh_out)

```c
Integer Form_trimesh_from_tin(Tin tin,Text mesh_name,Real mesh_offset,Real mesh_depth,Integer colour,Element &trimesh_out)
```
Do not use this one as the output only the first one from the list.
Use Form_trimeshes_from_tin instead
Form a trimesh trimesh_out with name mesh_name, colour, from a tin, offset mesh_offset, depth
mesh_depth
A return value of zero indicates the function call was successful.

> **ID = 3023**

Form_trimeshes_from_tin(Tin tin,Text mesh_name,Real mesh_offset,Real
mesh_depth,Integer colour,Dynamic_Element &trimeshes_out)


```c
Integer Form_trimeshes_from_tin(Tin tin,Text mesh_name,Real mesh_offset,Real mesh_depth,Integer colour,Dynamic_Element &trimeshes_out)
```
Form a trimesh trimesh_out with name mesh_name, colour, from a tin, offset mesh_offset,
depth mesh_depth
A return value of zero indicates the function call was successful.

> **ID = 3092**

Form_trimesh_from_points(Dynamic_Real xyzs,Dynamic_Integer face_ix,Element
&trimesh_out)

```c
Integer Form_trimesh_from_points(Dynamic_Real xyzs,Dynamic_Integer face_ix,Element &trimesh_out)
```
Form a trimesh trimesh_out from a list of xyz-coordinates xyzs, and a list of vertex index for faces
face_ix
A return value of zero indicates the function call was successful.
Note that the two list number are grouped by triple, the first one as the xyz of point, the second one
as index of three corners of triangle
Example of xyzs {0 1 0   1 0 0   0 -1 0   -1 0 0   0 0 1} defines a square with four points on z = 0 plane
and a top point in the middle
face_ix {3 2 1   4 3 1   1 2 5   2 3 5   3 4 5   4 1 5} define 6 faces of the pyramid: 2 at the base, and
4 on four sides

> **ID = 3093**

Form_trimesh_from_points(Dynamic_Real xyzs,Dynamic_Integer
face_ix,Dynamic_Integer colour_lists,Dynamic_Integer colour_ix,Element
&trimesh_out)

```c
Integer Form_trimesh_from_points(Dynamic_Real xyzs,Dynamic_Integer face_ix,Dynamic_Integer colour_lists,Dynamic_Integer colour_ix,Element &trimesh_out)
```
Form a trimesh trimesh_out from a list of xyz-coordinates xyzs, and a list of vertex index for faces
face_ix
Faces of trimesh are coloured according to the index colour_ix as referring to the list of colours
colour_lists
A return value of zero indicates the function call was successful.
Note that the two list number are grouped by triple, the first one as the xyz of point, the second one
as index of three corners of triangle
Example of xyzs {0 1 0   1 0 0   0 -1 0   -1 0 0   0 0 1} defines a square with four points on z = 0 plane
and a top point in the middle
face_ix {3 2 1   4 3 1   1 2 5   2 3 5   3 4 5   4 1 5} define 6 faces of the pyramid: 2 at the base, and
4 on four sides
colour_lists {5 9} assume that 5 means blue and 9 means green

The size of colour_ix must equal one third of the size of face_ix
colour_ix {1 1 2 2 2 2} defines that the two base triangles of the pyramid are blue and the four
sides are green

> **ID = 3094**

Trimesh_get_face_colour(Element trimesh,Integer face_index,Integer &colour)

```c
Integer Trimesh_get_face_colour(Element trimesh,Integer face_index,Integer &colour)
```
Get the colour of a face with index face_index of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3032**

Form_trimeshes_from_element(Element e,Integer flags,Integer copy_attributes,Text
name_prepost,Dynamic_Element &trimeshes_list)

```c
Integer Form_trimeshes_from_element(Element e,Integer flags,Integer copy_attributes,Text name_prepost,Dynamic_Element &trimeshes_list)
```
Create a list trimeshes trimeshes_list from the Element e
Creation flag Integer flag: 0 for everything, or a sum of a subset of
0x001 Extrude
0x002 OBJ-mesh
0x004 Billboard
0x008 Super String Pipe
0x010 Super String Culvert
0x020 Drainage String
0x040 Super Alignment
0x080 Pipeline String
Flag for copying attribute from input element to result trimesh copy_attributes: 0 not copy
attributes, 1 copy attributes
Pre*post rule for naming result trimeshes name_prepost based on the name of input element
A return value of zero indicates the function call was successful.

> **ID = 3050**

Form_trimesh_from_polygons(Dynamic_Element polygons, Integer vertex_info,
Integer edge_info, Integer face_info, Text mesh_name, Integer mesh_colour, Element
&trimesh_out, Text &return_message)

```c
Integer Form_trimesh_from_polygons(Dynamic_Element polygons, Integer vertex_info, Integer edge_info, Integer face_info, Text mesh_name, Integer mesh_colour, Element &trimesh_out, Text &return_message)
```
Form a trimesh trimesh_out using a list of input 3D polygons polygon
Flag vertex_info (0 no 1 yes) for copy vertex ids of polygons to vertex info of result trimesh
Flag edge_info (0 no 1 yes) for copy segment names of polygons to edge info of result trimesh
Flag face_info (0 no 1 yes) for copy face colour of polygons to face colours of result trimesh
Name of result mesh mesh_name
Colour of result mesh mesh_colour
Output message return_message
A return value of zero indicates the function call was successful.

> **ID = 3063**

Form_trimesh_from_polygons(Dynamic_Element polygons,Integer
vertex_info,Integer edge_info,Integer face_info,Text mesh_name,Integer
mesh_colour,Integer polymesh,Element &trimesh_out,Text &return_message)

```c
Integer Form_trimesh_from_polygons(Dynamic_Element polygons,Integer vertex_info,Integer edge_info,Integer face_info,Text mesh_name,Integer mesh_colour,Integer polymesh,Element &trimesh_out,Text &return_message)
```
Form a trimesh trimesh_out using a list of input 3D polygons polygon
Flag vertex_info (0 no 1 yes) for copy vertex ids of polygons to vertex info of result trimesh
Flag edge_info (0 no 1 yes) for copy segment names of polygons to edge info of result trimesh
Flag face_info (0 no 1 yes) for copy face colour of polygons to face colours of result trimesh
Flag polymesh (0 no 1 yes) for using the input polygons as polymesh faces of result trimesh
Name of result mesh mesh_name
Colour of result mesh mesh_colour
Output message return_message
A return value of zero indicates the function call was successful.

> **ID = 7639**

Trimesh_section(Element trimesh,Real point_x,Real point_y,Real point_z,Real
point_direction,Real point_grade,Real width, Real height,Integer &internal_return,
Integer &result_closed,Integer &size_section_points,Dynamic_Real
&section_xs,Dynamic_Real &section_ys,Dynamic_Real
&section_world_xs,Dynamic_Real &section_world_ys,Dynamic_Real
&section_world_zs,Dynamic_Integer &section_edge_indexes,Dynamic_Text
&section_edge_names,Dynamic_Integer &section_edge_colours,Dynamic_Integer
&section_vertex_indexes,Dynamic_Text &section_vertex_names,Dynamic_Integer
&section_vertex_colours)

```c
Integer Trimesh_section(Element trimesh,Real point_x,Real point_y,Real point_z,Real point_direction,Real point_grade,Real width, Real height,Integer &internal_return, Integer &result_closed,Integer &size_section_points,Dynamic_Real &section_xs,Dynamic_Real &section_ys,Dynamic_Real &section_world_xs,Dynamic_Real &section_world_ys,Dynamic_Real &section_world_zs,Dynamic_Integer &section_edge_indexes,Dynamic_Text &section_edge_names,Dynamic_Integer &section_edge_colours,Dynamic_Integer &section_vertex_indexes,Dynamic_Text &section_vertex_names,Dynamic_Integer &section_vertex_colours)
```
Section through the trimesh using a given 3D rectangle.
The centre of the rectangle is given by the X-Y-Z coordinate (point_x, point_y, point_z). The
rotation angle of the rectangle in the X-Y plane (in radian anticlockwise from the X-axis) is given by
point_direction. The tilt angle of the rectangle in relative to the Z-axis (in radian) is given by
point_grade. The sizes of the rectangle are given by width and height.
Integer internal_return might give some indication why the sectioning failed, the list of values are
given bellow.
If the sectioning is a closed cut, then result_closed is 1; and 0 otherwise.
The number of points of the result sectioning is given in size_section_points.
The last 11 parameters are details about those sectioning points. All of them should be list with
exactly size_section_points items in each. The first items on those list are information about the
first point of the sectioning; and the second items on those list are information about the second
point of the sectioning; and so forth.
section_xs, section_ys: x-y-coordinate of the section points on the section plane (where the origin
is of the world coordinate (point_x, point_y, point_z)).
section_world_xs, section_world_ys, section_world_zs: world x-y-z-coordinate of the section
points
section_edge_indexes: if none zero, then it is the edge index of the trimesh edge that the section
point is in; and then the names and colours of those edge are given in section_edge_names and
section_edge_colours.
section_vertex_indexes: if none zero, then it is the vertex index of the trimesh vertex that the
section point is in; and then the names and colours of those vertices are given in
section_vertex_names and section_vertex_colours.
A return value of 0 indicates the function call was successful.
A return value of 1 indicates Element trimesh is not a trimesh nor a trimesh reference.
A return value of 2 indicates Element trimesh is not valid.
A return value of -1, -2, -3, or -4 indicates there are internal error with the Element trimesh.
A return value of 12 indicates the sectioning was not successful. The Integer internal_return
coming from the list might indicate the reason.
0  Ok,
1  Not A Vertical Section,
2  Null Data,
3  Non Manifold,
4  Not Closed,
5  Not Connected,
6  No Intersection,
7  Partial Intersection,
8  Multiple Intersection,
9  Unknown,

> **ID = 3208**


Trimesh_get_blend_factor(Element trimesh,Real &blend_factor)

```c
Integer Trimesh_get_blend_factor(Element trimesh,Real &blend_factor)
```
Get the blend_factor of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3382**

Trimesh_set_blend_factor(Element trimesh,Real blend_factor)

```c
Integer Trimesh_set_blend_factor(Element trimesh,Real blend_factor)
```
Set new value for the blend_factor of a trimesh Element trimesh.
A return value of zero indicates the function call was successful.

> **ID = 3383**

Trimesh_get_face_infos_count(Element e,Integer &infos_count)

```c
Integer Trimesh_get_face_infos_count(Element e,Integer &infos_count)
```
Get the size infos_count of the face information list of a trimesh e.
The function returns 9 if the trimesh has no face information.
A return value of zero indicates the function call was successful.

> **ID = 3489**

Trimesh_get_face_info_by_index(Element e,Integer info_index,Integer &colour,Text
&name)

```c
Integer Trimesh_get_face_info_by_index(Element e,Integer info_index,Integer &colour,Text &name)
```
Get the colour and name of the item with given index info_index in the face information list of a
trimesh e.
The function returns 9 if the trimesh has no face information.
The function returns 3 if the given index info_index is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3490**

Trimesh_set_face_info_by_index(Element e,Integer info_index,Integer colour,Text

name)

```c
Integer Trimesh_set_face_info_by_index(Element e,Integer info_index,Integer colour,Text name)
```
Set the colour and name of the item with given index info_index in the face information list of a
trimesh e.
The function returns 9 if the trimesh has no face information.
The function returns 3 if the given index info_index is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3491**

Trimesh_append_face_info(Element e,Integer colour,Text name)

```c
Integer Trimesh_append_face_info(Element e,Integer colour,Text name)
```
Append a new information item with given colour and name to the end of the face information list of
a trimesh e.
A return value of zero indicates the function call was successful.

> **ID = 3492**

Trimesh_get_face_info_index(Element e,Integer face_number,Integer &info_index)

```c
Integer Trimesh_get_face_info_index(Element e,Integer face_number,Integer &info_index)
```
Get the info_index of a face with given number face_number of a trimesh e.
The function returns 9 if the trimesh has no face information.
The function returns 3 if the given face_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3493**

Trimesh_set_face_info_index(Element e,Integer face_number,Integer info_index)

```c
Integer Trimesh_set_face_info_index(Element e,Integer face_number,Integer info_index)
```
Set the info_index of a face with given number face_number of a trimesh e.
The function returns 9 if the trimesh has no face information.
The function returns 3 if the given face_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3494**


Trimesh_set_face_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text
names,Dynamic_Integer flags)

```c
Integer Trimesh_set_face_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text names,Dynamic_Integer flags)
```
Replace all the face information in a trimesh e with new details from two lists colours, names.
The two list must be of the same sizes or the function returns 5.
Also set all the infomation index of all faces to the values in the list flags, if the size of flags is
different from the number of faces in the trimesh, the function returns 6.
If any index in the list flags is not valid, the function returns 7; a valid index can be 0 (meaning no
information used for that face) or any value in the range 1 to the size of colours.
A return value of zero indicates the function call was successful.

> **ID = 3495**

Trimesh_get_edge_infos_count(Element e,Integer &infos_count)

```c
Integer Trimesh_get_edge_infos_count(Element e,Integer &infos_count)
```
Get the size infos_count of the edge information list of a trimesh e.
The function returns 9 if the trimesh has no edge information.
A return value of zero indicates the function call was successful.

> **ID = 3496**

Trimesh_get_edge_info_by_index(Element e,Integer info_index,Integer &colour,Text
&name)

```c
Integer Trimesh_get_edge_info_by_index(Element e,Integer info_index,Integer &colour,Text &name)
```
Get the colour and name of the item with given index info_index in the edge information list of a
trimesh e.
The function returns 9 if the trimesh has no edge information.
The function returns 3 if the given index info_index is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3497**

Trimesh_set_edge_info_by_index(Element e,Integer info_index,Integer colour,Text
name)

```c
Integer Trimesh_set_edge_info_by_index(Element e,Integer info_index,Integer colour,Text name)
```
Set the colour and name of the item with given index info_index in the edge information list of a
trimesh e.
The function returns 9 if the trimesh has no edge information.
The function returns 3 if the given index info_index is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3498**

Trimesh_append_edge_info(Element e,Integer colour,Text name)

```c
Integer Trimesh_append_edge_info(Element e,Integer colour,Text name)
```
Append a new information item with given colour and name to the end of the edge information list
of a trimesh e.
A return value of zero indicates the function call was successful.

> **ID = 3499**

Trimesh_get_edge_info_index(Element e,Integer edge_number,Integer &info_index)

```c
Integer Trimesh_get_edge_info_index(Element e,Integer edge_number,Integer &info_index)
```
Get the info_index of an edge with given number edge_number of a trimesh e.
The function returns 9 if the trimesh has no edge information.
The function returns 3 if the given edge_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3500**

Trimesh_set_edge_info_index(Element e,Integer edge_number,Integer info_index)

```c
Integer Trimesh_set_edge_info_index(Element e,Integer edge_number,Integer info_index)
```
Set the info_index of an edge with given number edge_number of a trimesh e.
The function returns 9 if the trimesh has no edge information.
The function returns 3 if the given edge_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3501**

Trimesh_set_edge_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text
names,Dynamic_Integer flags)

```c
Integer Trimesh_set_edge_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text names,Dynamic_Integer flags)
```
Replace all the edge information in a trimesh e with new details from two lists colours, names.
The two list must be of the same sizes or the function returns 5.
Also set all the infomation index of all edges to the values in the list flags, if the size of flags is
different from the number of edges in the trimesh, the function returns 6.
If any index in the list flags is not valid, the function returns 7; a valid index can be 0 (meaning no
information used for that edge) or any value in the range 1 to the size of colours.
A return value of zero indicates the function call was successful.

> **ID = 3502**

Trimesh_get_vertex_infos_count(Element e,Integer &infos_count)

```c
Integer Trimesh_get_vertex_infos_count(Element e,Integer &infos_count)
```
Get the size infos_count of the vertices information list of a trimesh e.
The function returns 9 if the trimesh has no vertex information.
A return value of zero indicates the function call was successful.

> **ID = 3764**

Trimesh_get_vertex_info_by_index(Element e,Integer info_index,Integer
&colour,Text &name)

```c
Integer Trimesh_get_vertex_info_by_index(Element e,Integer info_index,Integer &colour,Text &name)
```
Get the colour and name of the item with given index info_index in the vertex information list of a
trimesh e.
The function returns 9 if the trimesh has no vertex information.
The function returns 3 if the given index info_index is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3765**

Trimesh_set_vertex_info_by_index(Element e,Integer info_index,Integer colour,Text
name)

```c
Integer Trimesh_set_vertex_info_by_index(Element e,Integer info_index,Integer colour,Text name)
```
Set the colour and name of the item with given index info_index in the vertex information list of a
trimesh e.
The function returns 9 if the trimesh has no vertex information.
The function returns 3 if the given index info_index is out of bound.

A return value of zero indicates the function call was successful.

> **ID = 3766**

Trimesh_append_vertex_info(Element e,Integer colour,Text name)

```c
Integer Trimesh_append_vertex_info(Element e,Integer colour,Text name)
```
Append a new information item with given colour and name to the end of the vertex information list
of a trimesh e.
A return value of zero indicates the function call was successful.

> **ID = 3767**

Trimesh_get_vertex_info_index(Element e,Integer vertex_number,Integer
&info_index)

```c
Integer Trimesh_get_vertex_info_index(Element e,Integer vertex_number,Integer &info_index)
```
Get the info_index of a vertex with given number vertex_number of a trimesh e.
The function returns 9 if the trimesh has no vertex information.
The function returns 3 if the given vertex_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3768**

Trimesh_set_vertex_info_index(Element e,Integer vertex_number,Integer info_index)

```c
Integer Trimesh_set_vertex_info_index(Element e,Integer vertex_number,Integer info_index)
```
Set the info_index of a vertex with given number vertex_number of a trimesh e.
The function returns 9 if the trimesh has no vertex information.
The function returns 3 if the given vertex_number is out of bound.
A return value of zero indicates the function call was successful.

> **ID = 3769**

Trimesh_set_vertex_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text
names,Dynamic_Integer flags)

```c
Integer Trimesh_set_vertex_infos_flags(Element e,Dynamic_Integer colours,Dynamic_Text names,Dynamic_Integer flags)
```
Replace all the vertex information in a trimesh e with new details from two lists colours, names.

The two list must be of the same sizes or the function returns 5.
Also set all the infomation index of all vertices to the values in the list flags, if the size of flags is
different from the number of vertices in the trimesh, the function returns 6.
If any index in the list flags is not valid, the function returns 7; a valid index can be 0 (meaning no
information used for that vertex) or any value in the range 1 to the size of colours.
A return value of zero indicates the function call was successful.

> **ID = 3770**

Trimesh_drop_point_3d(Element trimesh,Real point_x,Real point_y,Real
point_z,Integer &vert_ix,Real &vert_o,Real &vert_dr_x,Real &vert_dr_y,Real
&vert_dr_z,Integer &edge_ix,Real &edge_o,Real &edge_dr_x,Real &edge_dr_y,Real
&edge_dr_z,Integer &face_ix,Real &face_o,Real &face_dr_x,Real &face_dr_y,Real
&face_dr_z)

```c
Integer Trimesh_drop_point_3d(Element trimesh,Real point_x,Real point_y,Real point_z,Integer &vert_ix,Real &vert_o,Real &vert_dr_x,Real &vert_dr_y,Real &vert_dr_z,Integer &edge_ix,Real &edge_o,Real &edge_dr_x,Real &edge_dr_y,Real &edge_dr_z,Integer &face_ix,Real &face_o,Real &face_dr_x,Real &face_dr_y,Real &face_dr_z)
```
Drop a point with xyz coordinate (point_x,point_y,point_z) to a trimesh Element to get the results
on:
Vertex: index vert_ix, offset vert_o, drop to position (vert_dr_z,vert_dr_y,vert_dr_z)
Edge: index edge_ix, offset edge_o, drop to position (edge_dr_z,edge_dr_y,edge_dr_z)
Face: index face_ix, offset face_o, drop to position (face_dr_z,face_dr_y,face_dr_z)
A return value of zero indicates the function call was successful.

> **ID = 3503**


### Trimesh Modification Functions

Trimesh_edit_set_vertex(Element e,Integer i,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_set_vertex(Element e,Integer i,Real x,Real y,Real z,Text &error)
```
Set the vertex index i of a trimesh element e to a new xyz coordinate (x,y,z)
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3504**

Trimesh_edit_move_vertex(Element e,Integer i,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_move_vertex(Element e,Integer i,Real x,Real y,Real z,Text &error)
```
Move the xyz coordinate of vertex index i of a trimesh element e by (dx,dy,dz)
The Text error would be set to the corresponding error message if the function failed.

A return value of zero indicates the function call was successful.

> **ID = 3505**

Trimesh_edit_move_edge(Element e,Integer i,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_move_edge(Element e,Integer i,Real x,Real y,Real z,Text &error)
```
Move the xyz coordinates of the two ends of the edge with index i of a trimesh element e by
(dx,dy,dz)
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3506**

Trimesh_edit_move_face(Element e,Integer i,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_move_face(Element e,Integer i,Real x,Real y,Real z,Text &error)
```
Move the xyz coordinates of the three conners of the face with index i of a trimesh element e by
(dx,dy,dz)
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3507**

Trimesh_edit_move_vertices(Element e,Dynamic_Integer is,Real dx,Real dy,Real
dz,Text &error)

```c
Integer Trimesh_edit_move_vertices(Element e,Dynamic_Integer is,Real dx,Real dy,Real dz,Text &error)
```
Move the xyz coordinates of all vertices with index given in the list is of a trimesh element e by
(dx,dy,dz)
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3508**

Trimesh_edit_move_vertices(Element e,Real dx,Real dy,Real dz,Text &error)

```c
Integer Trimesh_edit_move_vertices(Element e,Real dx,Real dy,Real dz,Text &error)
```
Move the xyz coordinates of all vertices of a trimesh element e by (dx,dy,dz)
The Text error would be set to the corresponding error message if the function failed.

A return value of zero indicates the function call was successful.

> **ID = 3509**

Trimesh_edit_hide_vertex(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_hide_vertex(Element e,Integer i,Text &error)
```
Hide the vertex with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3510**

Trimesh_edit_hide_edge(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_hide_edge(Element e,Integer i,Text &error)
```
Hide the edge with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3511**

Trimesh_edit_hide_face(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_hide_face(Element e,Integer i,Text &error)
```
Hide the face with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3512**

Trimesh_edit_hide_vertices(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_hide_vertices(Element e,Dynamic_Integer is,Text &error)
```
Hide the vertices with indices given by the list is of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3513**


Trimesh_edit_hide_edges(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_hide_edges(Element e,Dynamic_Integer is,Text &error)
```
Hide the edges with indices given by the list isof a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3514**

Trimesh_edit_hide_faces(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_hide_faces(Element e,Dynamic_Integer is,Text &error)
```
Hide the faces with indices given by the list is of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3515**

Trimesh_edit_remove_vertex(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_remove_vertex(Element e,Integer i,Text &error)
```
Remove the vertex with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3516**

Trimesh_edit_remove_edge(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_remove_edge(Element e,Integer i,Text &error)
```
Remove the edge with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3517**

Trimesh_edit_remove_face(Element e,Integer i,Text &error)

```c
Integer Trimesh_edit_remove_face(Element e,Integer i,Text &error)
```
Remove the face with index i of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3518**

Trimesh_edit_remove_vertices(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_remove_vertices(Element e,Dynamic_Integer is,Text &error)
```
Remove the vertices with indices given by the list is of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3519**

Trimesh_edit_remove_edges(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_remove_edges(Element e,Dynamic_Integer is,Text &error)
```
Remove the edges with indices given by the list isof a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3520**

Trimesh_edit_remove_faces(Element e,Dynamic_Integer is,Text &error)

```c
Integer Trimesh_edit_remove_faces(Element e,Dynamic_Integer is,Text &error)
```
Remove the faces with indices given by the list is of a trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3521**

Trimesh_edit_add_vertex(Element e,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_add_vertex(Element e,Real x,Real y,Real z,Text &error)
```
Add a new the vertex with xyz coordinate (x,y,z) to the trimesh element e.
The Text error would be set to the corresponding error message if the function failed.

A return value of zero indicates the function call was successful.

> **ID = 3522**

Trimesh_edit_add_face(Element e,Integer i,Integer j,Integer k,Text &error)

```c
Integer Trimesh_edit_add_face(Element e,Integer i,Integer j,Integer k,Text &error)
```
Add a new the face with the three corners as vertices with indices i,j,k to the trimesh element e.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3523**

Trimesh_edit_split_edge(Element e,Integer i,Real x,Real y,Real z,Text &error)

```c
Integer Trimesh_edit_split_edge(Element e,Integer i,Real x,Real y,Real z,Text &error)
```
Split the edge with index i of a trimesh element e at a point with xyz coordinate (x,y,z).
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3524**


### Trimesh Boolean Operations

Trimesh_boolean_union(Element trimesh1,Element trimesh2,Integer
keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text
output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text
&error)

```c
Integer Trimesh_boolean_union(Element trimesh1,Element trimesh2,Integer keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text &error)
```
Find the boolean union of trimesh1 and trimesh2 and assign the result to (trimesh) Element
trimesh_out. The name output_trimesh_name and the colour output_trimesh_colour will be
used for the result. The result trimesh will also keep the vertices, edges, faces information of the
original trimeshes if the respective values of keep_vertex_info, keep_edge_info, keep_face_info
are non zero.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3803**

Trimesh_boolean_difference(Element trimesh1,Element trimesh2,Integer
keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text
output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text

&error)

```c
Integer Trimesh_boolean_difference(Element trimesh1,Element trimesh2,Integer keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text &error)
```
Find the boolean difference between trimesh1 and trimesh2 and assign the result to (trimesh)
Element trimesh_out. The name output_trimesh_name and the colour output_trimesh_colour
will be used for the result. The result trimesh will also keep the vertices, edges, faces information of
the original trimeshes if the respective values of keep_vertex_info, keep_edge_info,
keep_face_info are non zero.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3804**

Trimesh_boolean_intersection(Element trimesh1,Element trimesh2,Integer
keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text
output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text
&error)

```c
Integer Trimesh_boolean_intersection(Element trimesh1,Element trimesh2,Integer keep_vertex_info,Integer keep_edge_info,Integer keep_face_info,Text output_trimesh_name,Integer output_trimesh_colour,Element &trimesh_out,Text &error)
```
Find the boolean intersection of trimesh1 and trimesh2 and assign the result to (trimesh) Element
trimesh_out. The name output_trimesh_name and the colour output_trimesh_colour will be
used for the result. The result trimesh will also keep the vertices, edges, faces information of the
original trimeshes if the respective values of keep_vertex_info, keep_edge_info, keep_face_info
are non zero.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3805**


### Trimesh Analysis and Utility Functions

Get_trimesh_areas(Element trimesh,Integer &has_top_area,Real
has_surrounding_area,Real &surrounding_area,Integer &has_surface_area,Real
&surface_area,Integer &has_top_plan_area,Real &top_plan_area,Integer
&&top_area,Integer &has_bottom_area,Real &bottom_area,Integer
&has_bottom_plan_area,Real &bottom_plan_area,Text &error)

```c
Integer Get_trimesh_areas(Element trimesh,Integer &has_top_area,Real &top_area,Integer &has_bottom_area,Real &bottom_area,Integer &has_surrounding_area,Real &surrounding_area,Integer &has_surface_area,Real &surface_area,Integer &has_top_plan_area,Real &top_plan_area,Integer &has_bottom_plan_area,Real &bottom_plan_area,Text &error)
```
Get various area information of a simple trimesh Element trimesh and assign the result to variables
of corresponding names.

For each type of area there is a corresponding Integer flag indicate that it is valid. For example:  the
Real top_area only valid when Integer has_top_area is 1.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3806**

Get_trimesh_top_faces(Element trimesh,Integer faces_count,Dynamic_Integer
&face_indices,Text &error)

```c
Integer Get_trimesh_top_faces(Element trimesh,Integer faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the top faces of a simple trimesh Element trimesh and assign the total number to Integer
faces_count and the list of face indices to Dynamic_Integer face_indices.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3807**

Get_trimesh_bottom_faces(Element trimesh,Integer faces_count,Dynamic_Integer
&face_indices,Text &error)

```c
Integer Get_trimesh_bottom_faces(Element trimesh,Integer faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the bottom faces of a simple trimesh Element trimesh and assign the total number to Integer
faces_count and the list of face indices to Dynamic_Integer face_indices.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3808**

Get_trimesh_surrounding_faces(Element trimesh,Integer
faces_count,Dynamic_Integer &face_indices,Text &error)

```c
Integer Get_trimesh_surrounding_faces(Element trimesh,Integer faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the surrounding faces of a simple trimesh Element trimesh and assign the total number to
Integer faces_count and the list of face indices to Dynamic_Integer face_indices.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3809**


Get_trimesh_collapsing_faces(Element trimesh,Integer faces_count,Dynamic_Integer
&face_indices,Text &error)

```c
Integer Get_trimesh_collapsing_faces(Element trimesh,Integer faces_count,Dynamic_Integer &face_indices,Text &error)
```
A face of a trimesh is called collapsing if its area is zero, in another word the normal vector of a
collapsing face is undefined.
Get all the collapsing faces of a simple trimesh Element trimesh and assign the total number to
Integer faces_count and the list of face indices to Dynamic_Integer face_indices.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3810**

Get_trimesh_areas(Element trimesh,Real tolerance,Integer &has_top_area,Real
has_surrounding_area,Real &surrounding_area,Integer &has_surface_area,Real
&surface_area,Integer &has_top_plan_area,Real &top_plan_area,Integer
&&top_area,Integer &has_bottom_area,Real &bottom_area,Integer
&has_bottom_plan_area,Real &bottom_plan_area,Text &error)

```c
Integer Get_trimesh_areas(Element trimesh,Real tolerance,Integer &has_top_area,Real &top_area,Integer &has_bottom_area,Real &bottom_area,Integer &has_surrounding_area,Real &surrounding_area,Integer &has_surface_area,Real &surface_area,Integer &has_top_plan_area,Real &top_plan_area,Integer &has_bottom_plan_area,Real &bottom_plan_area,Text &error)
```
Get various areas information of a simple trimesh Element trimesh based on given tolerance and
assign the result to variables of corresponding names.
For each type of area there is a corresponding Integer flag indicate that it is valid. For example:  the
Real top_area only valid when Integer has_top_area is 1.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3826**

Get_trimesh_top_faces(Element trimesh,Real tolerance,Integer
&patches_count,Dynamic_Integer &patch_sizes,Integer
&faces_count,Dynamic_Integer &face_indices,Text &error)

```c
Integer Get_trimesh_top_faces(Element trimesh,Real tolerance,Integer &patches_count,Dynamic_Integer &patch_sizes,Integer &faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the top faces of a simple trimesh Element trimesh based on given tolerance and assign the
total number to Integer faces_count and the list of face indices to Dynamic_Integer face_indices.
These indices are grouped into continuous patches, the number of patches is returned in
patches_count, and the sizes for indivisual patches are returned in patch_sizes.
For example: faces_count = 8 and face_indices = { 1,3, 5,9,6, 12,13,7 }

patches_count = 3 and patch_sizes = {3, 2, 3}.
There are 8 top faces which are grouped into 3 patches, the first patch contains three triangles
{1,3,5}, the second patch contains two triangles {9,6}, and the third patch contain three triangles
{13,7}.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3830**

Get_trimesh_bottom_faces(Element trimesh,Real tolerance,Integer
&patches_count,Dynamic_Integer &patch_sizes,Integer
&faces_count,Dynamic_Integer &face_indices,Text &error)

```c
Integer Get_trimesh_bottom_faces(Element trimesh,Real tolerance,Integer &patches_count,Dynamic_Integer &patch_sizes,Integer &faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the bottom faces of a simple trimesh Element trimesh based on given tolerance and assign
the total number to Integer faces_count and the list of face indices to Dynamic_Integer
face_indices. These indices are grouped into continuous patches, the number of patches is
returned in patches_count, and the sizes for indivisual patches are returned in patch_sizes.
For example: faces_count = 8 and face_indices = { 1,3, 5,9,6, 12,13,7 }
patches_count = 3 and patch_sizes = {3, 2, 3}.
There are 8 bottom faces which are grouped into 3 patches, the first patch contains three triangles
{1,3,5}, the second patch contains two triangles {9,6}, and the third patch contain three triangles
{13,7}.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3827**

Get_trimesh_collapsing_faces(Element trimesh,Real tolerance,Integer
&patches_count,Dynamic_Integer &patch_sizes,Integer
&faces_count,Dynamic_Integer &face_indices,Text &error)

```c
Integer Get_trimesh_collapsing_faces(Element trimesh,Real tolerance,Integer &patches_count,Dynamic_Integer &patch_sizes,Integer &faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the collapsing faces of a simple trimesh Element trimesh based on given tolerance and
assign the total number to Integer faces_count and the list of face indices to Dynamic_Integer
face_indices. These indices are grouped into continuous patches, the number of patches is
returned in patches_count, and the sizes for indivisual patches are returned in patch_sizes.
For example: faces_count = 8 and face_indices = { 1,3, 5,9,6, 12,13,7 }
patches_count = 3 and patch_sizes = {3, 2, 3}.
There are 8 collapsing faces which are grouped into 3 patches, the first patch contains three
triangles {1,3,5}, the second patch contains two triangles {9,6}, and the third patch contain three
triangles {13,7}.

The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3828**

Get_trimesh_surrounding_faces(Element trimesh,Real tolerance,Integer
&patches_count,Dynamic_Integer &patch_sizes,Integer
&faces_count,Dynamic_Integer &face_indices,Text &error)

```c
Integer Get_trimesh_surrounding_faces(Element trimesh,Real tolerance,Integer &patches_count,Dynamic_Integer &patch_sizes,Integer &faces_count,Dynamic_Integer &face_indices,Text &error)
```
Get all the surrounding faces of a simple trimesh Element trimesh based on given tolerance and
assign the total number to Integer faces_count and the list of face indices to Dynamic_Integer
face_indices. These indices are grouped into continuous patches, the number of patches is
returned in patches_count, and the sizes for indivisual patches are returned in patch_sizes.
For example: faces_count = 8 and face_indices = { 1,3, 5,9,6, 12,13,7 }
patches_count = 3 and patch_sizes = {3, 2, 3}.
There are 8 surrounding faces which are grouped into 3 patches, the first patch contains three
triangles {1,3,5}, the second patch contains two triangles {9,6}, and the third patch contain three
triangles {13,7}.
The Text error would be set to the corresponding error message if the function failed.
A return value of zero indicates the function call was successful.

> **ID = 3829**

Get_sub_trimesh(Element trimesh,Dynamic_Integer &sub_faces_ix,Element
&sub_mesh)

```c
Integer Get_sub_trimesh(Element trimesh,Dynamic_Integer &sub_faces_ix,Element &sub_mesh)
```
Form a new Element sub_mesh from a given trimesh Element trimesh based on given patch of
face indices Dynamic_Integer sub_face_ix.
A return value of zero indicates the function call was successful.

> **ID = 3831**

Trimesh_get_disjoint(Element trimesh_input,Dynamic_Element &disjoint_parts)

```c
Integer Trimesh_get_disjoint(Element trimesh_input,Dynamic_Element &disjoint_parts)
```
Split trimesh trimesh_input  into disjoint components disjoint_parts. All vertices in each one of the
trimesh results are connected.
A return value of zero indicates the function call was successful.

> **ID = 5443**


Trimesh_heal(Element &trimesh_in,Text &return_message)

```c
Integer Trimesh_heal(Element &trimesh_in,Text &return_message)
```
Try to heal "bad" trimesh trimesh_in into a "good" one () by removing duplicated edges, faces,
change edges, faces direction. If the input cannot be heal, some error message will be returned in
return_message.
A return value of zero indicates the function call was successful.

> **ID = 5444**

Get_face_heights_at_point(Element trimesh,Real px,Real py,Dynamic_Real
&face_heights,Text &return_message)

```c
Integer Get_face_heights_at_point(Element trimesh,Real px,Real py,Dynamic_Real &face_heights,Text &return_message)
```
Get the list of cut face_heights (z coordinate) of a vertical line at px py to the faces of Element
trimesh.
Some error message will be returned in return_message.
A return value of zero indicates the function call was successful.

> **ID = 7625**

Set_trimesh_edge_info_by_string(Dynamic_Element &trimeshes,Dynamic_Element
strings,Integer set_edge_name,Integer set_edge_colour,Real tolerance)

```c
Integer Set_trimesh_edge_info_by_string(Dynamic_Element &trimeshes,Dynamic_Element strings,Integer set_edge_name,Integer set_edge_colour,Real tolerance)
```
Set the edge information of a list of trimeshes using the name and colour from a list of strings at
close by position using Real tolerance.
A return value of zero indicates the function call was successful.

> **ID = 7669**

Trimesh_get_closest_point(Element trimesh,Real xp,Real yp,Real zp,Real &x,Real
&y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)

```c
Integer Trimesh_get_closest_point(Element trimesh,Real xp,Real yp,Real zp,Real &x,Real &y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)
```
Get the cloest drop point from given 3d point (xp,yp,zp) to a given trimesh. The coordinate of the
result is returned as Real numbers (x,y,z); the offset distance is returned in Real off; the face
number, edge number and vertex number of the drop point are returned in Integer face, edge and

vertex.
A return value of zero indicates the function call was successful.

> **ID = 7708**

Trimesh_get_furthest_point(Element trimesh,Real xp,Real yp,Real zp,Real &x,Real
&y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)

```c
Integer Trimesh_get_furthest_point(Element trimesh,Real xp,Real yp,Real zp,Real &x,Real &y,Real &z,Real &off,Integer &face,Integer &edge,Integer &vertex)
```
Get the furthest drop point from given 3d point (xp,yp,zp) to a given trimesh. The coordinate of the
result is returned as Real numbers (x,y,z); the offset distance is returned in Real off; the face
number, edge number and vertex number of the drop point are returned in Integer face, edge and
vertex.
A return value of zero indicates the function call was successful.

> **ID = 7709**

Trimesh_get_lowest_point(Element trimesh,Real xp,Real yp,Real &z,Integer &face)

```c
Integer Trimesh_get_lowest_point(Element trimesh,Real xp,Real yp,Real &z,Integer &face)
```
Get the lowest face point from given 2d point (xp,yp) of a given trimesh; the z-coordinate of the
result is returned as Real numbers z; the trimesh face number is returned in Integer face.
A return value of zero indicates the function call was successful.

> **ID = 7710**

Trimesh_get_highest_point(Element trimesh,Real xp,Real yp,Real &z,Integer &face)

```c
Integer Trimesh_get_highest_point(Element trimesh,Real xp,Real yp,Real &z,Integer &face)
```
Get the highest face point from given 2d point (xp,yp) of a given trimesh; the z-coordinate of the
result is returned as Real numbers z; the trimesh face number is returned in Integer face.
A return value of zero indicates the function call was successful.

> **ID = 7711**

Trimesh_flip_face(Element trimesh,Integer face_ix)

```c
Integer Trimesh_flip_face(Element trimesh,Integer face_ix)
```
Flip one face of given index face_ix of a given trimesh.
A return value of zero indicates the function call was successful.

> **ID = 7750**

Trimesh_flip_faces(Element trimesh,Dynamic_Integer face_ix)

```c
Integer Trimesh_flip_faces(Element trimesh,Dynamic_Integer face_ix)
```
Flip faces of given indices face_ix of a given trimesh.
A return value of zero indicates the function call was successful.

> **ID = 7751**

Trimesh_flip_faces(Element &trimesh)

```c
Integer Trimesh_flip_faces(Element &trimesh)
```
Flip all faces of a given trimesh.
A return value of zero indicates the function call was successful.

> **ID = 7759**

Convert_to_polymesh(Real deflection,Integer relative_deflection, Dynamic_Element
&trimeshes)

```c
Integer Convert_to_polymesh(Real deflection,Integer relative_deflection,Dynamic_Element &trimeshes)
```
Convert all trimesh in the list trimeshes to polymesh.
If relative_deflection is not zero, then the angle deflection will be use as the maximum value in the
conversion.
A return value of zero indicates the function call was successful.

> **ID = 7746**

Convert_named_faces_to_polymesh(Dynamic_Element &trimeshes)

```c
Integer Convert_named_faces_to_polymesh(Dynamic_Element &trimeshes)
```
Convert all trimesh in the list trimeshes to polymesh.based on names of faces.
A return value of zero indicates the function call was successful.

> **ID = 7747**

Create_tin_from_trimeshes_top(Dynamic_Element trimeshes,Integer mode,Real
dis,Text tin_name,Tin &tin,Text &error)

```c
Integer Create_tin_from_trimeshes_top(Dynamic_Element trimeshes,Integer mode,Real dis,Text tin_name,Tin &tin,Text &error)
```
Not yet ready
Create a tin from the top faces of given trimeshes.
A return value of zero indicates the function call was successful.

> **ID = 7760**

Create_tin_from_trimeshes_bottom(Dynamic_Element trimeshes,Integer mode,Real
dis,Text tin_name,Tin &tin,Text &error)

```c
Integer Create_tin_from_trimeshes_bottom(Dynamic_Element trimeshes,Integer mode,Real dis,Text tin_name,Tin &tin,Text &error)
```
Not yet ready
Create a tin from the bottom faces of given trimeshes.
A return value of zero indicates the function call was successful.

> **ID = 7761**

Create_trimesh_from_polygon(Element polygon,Model trimesh_model,Text
trimesh_name,Integer trimesh_colour,Real trimesh_offset,Real
trimesh_depth,Integer do_holes,Model holes_model,Text holes_name,Integer
holes_colour,Real holes_offset,Real holes_depth,Text &error_message)

```c
Integer Create_trimesh_from_polygon(Element polygon,Model trimesh_model,Text trimesh_name,Integer trimesh_colour,Real trimesh_offset,Real trimesh_depth,Integer do_holes,Model holes_model,Text holes_name,Integer holes_colour,Real holes_offset,Real holes_depth,Text &error_message)
```
Create trimeshes from input 3D polygon.
The main trimesh is of given trimesh_name and trimesh_colour and will be added to
trimesh_model.
The top of the trimesh is the tin of the polygon translated vertically up by trimesh_offset.
trimesh_offset can be negative and then the top of the trimesh is lower rather than above the tin of
the polygon.
The bottom of the trimesh is trimesh_depth vertically below the top of the trimesh of the polygon.
trimesh_depth can be negative then the "bottom" of the trimesh is above the "top" of the trimesh.
If do_holes is 1 then the holes (if any) of the input polygon are also to be used to create trimesh.
The hole trimeshes is of given holes_name and holes_colour and will be added to holes_model.
The top of the trimesh is the tin of the hole translated vertically up by holes_offset.
holes_offset can be negative and then the top of the trimesh is lower rather than above the tin of
the hole.
The bottom of the trimesh is holes_depth vertically below the top of the trimesh of the hole.
holes_depth can be negative then the "bottom" of the trimesh is above the "top" of the trimesh.

Some error in the function call will be returned in the text error_message.
A return value of zero indicates the function call was successful.

> **ID = 7859**

Trimesh_cookie_cut_by_polygon(Dynamic_Element &trimeshes,Element
polygon,Model output,Integer mode)

```c
Integer Trimesh_cookie_cut_by_polygon(Dynamic_Element &trimeshes,Element polygon,Model output,Integer mode)
```
Cookie cut all given trimeshes using a given polygon and add the result to given output model.
The mode is not used for now.
A return value of zero indicates the function call was successful.

> **ID = 7860**


---


## 5.52 Plot Frame Element

A Plot Frame string consists of data for producing plan plots.
The following functions are used to create new plot frames and make inquiries and modifications to
existing plot frames.
Create_plot_frame(Text name)

```c
Element Create_plot_frame(Text name)
```
Create an Element of type Plot_Frame.
The function return value gives the actual Element created.
If the plot frame could not be created, then the returned Element will be null.

> **ID = 607**

Get_plot_frame_name(Element elt,Text &name)

```c
Integer Get_plot_frame_name(Element elt,Text &name)
```
Get the name of the plot frame in Element elt.
The name value is returned in Text name.
A function return value of zero indicates the data was successfully returned.

> **ID = 608**

Get_plot_frame_scale(Element elt,Real &scale)

```c
Integer Get_plot_frame_scale(Element elt,Real &scale)
```
Get the scale of the plot frame in Element elt.
The scale value is returned in Real scale. The value for scale is 1:scale.
A function return value of zero indicates the data was successfully returned.

> **ID = 609**

Get_plot_frame_rotation(Element elt,Real &rotation)

```c
Integer Get_plot_frame_rotation(Element elt,Real &rotation)
```
Get the rotation of the plot frame in Element elt.
The name value is returned in Real rotation. The units for rotation are radians.
A function return value of zero indicates the data was successfully returned.

> **ID = 610**

Get_plot_frame_origin(Element elt,Real &x,Real &y)

```c
Integer Get_plot_frame_origin(Element elt,Real &x,Real &y)
```
Get the origin of the plot frame in Element elt.
The x origin value is returned in Real x.
The y origin value is returned in Real y.
A function return value of zero indicates the data was successfully returned.

> **ID = 611**

Get_plot_frame_sheet_size(Element elt,Real &w,Real &h)

```c
Integer Get_plot_frame_sheet_size(Element elt,Real &w,Real &h)
```
Get the sheet size of the plot frame in Element elt.
The width value is returned in Real w.
The height value is returned in Real h.
A function return value of zero indicates the data was successfully returned.

> **ID = 612**

Get_plot_frame_sheet_size(Element elt,Text &size)

```c
Integer Get_plot_frame_sheet_size(Element elt,Text &size)
```
Get the sheet size of the plot frame in Element elt.
The sheet size is returned in Text size.
A function return value of zero indicates the data was successfully returned.

> **ID = 613**

Get_plot_frame_margins(Element elt,Real &l,Real &b,Real &r,Real &t)

```c
Integer Get_plot_frame_margins(Element elt,Real &l,Real &b,Real &r,Real &t)
```
Get the sheet margins of the plot frame in Element elt.
The left margin value is returned in Real l.
The bottom margin value is returned in Real b.
The right margin value is returned in Real r.

The top margin value is returned in Real t.
A function return value of zero indicates the data was successfully returned.

> **ID = 614**

Get_plot_frame_text_size(Element elt,Real &text_size)

```c
Integer Get_plot_frame_text_size(Element elt,Real &text_size)
```
Get the text size of the plot frame in Element elt.
The text size is returned in Text text_size.
A function return value of zero indicates the data was successfully returned.

> **ID = 615**

Get_plot_frame_draw_border(Element elt,Integer &draw_border)

```c
Integer Get_plot_frame_draw_border(Element elt,Integer &draw_border)
```
Get the draw border of the plot frame in Element elt.
The draw border flag is returned in Integer draw_border.
A function return value of zero indicates the data was successfully returned.

> **ID = 616**

Get_plot_frame_draw_viewport(Element elt,Integer &draw_viewport)

```c
Integer Get_plot_frame_draw_viewport(Element elt,Integer &draw_viewport)
```
Get the draw viewport of the plot frame in Element elt.
The draw viewport flag is returned in Integer draw_viewport.
A function return value of zero indicates the data was successfully returned.

> **ID = 617**

Get_plot_frame_draw_title_file(Element elt,Integer &draw_title)

```c
Integer Get_plot_frame_draw_title_file(Element elt,Integer &draw_title)
```
Get the draw title file of the plot frame in Element elt.
The draw title file flag is returned in Integer draw_title.
A function return value of zero indicates the data was successfully returned.

> **ID = 618**


Get_plot_frame_colour(Element elt,Integer &colour)

```c
Integer Get_plot_frame_colour(Element elt,Integer &colour)
```
Get the colour of the plot frame in Element elt.
The colour value is returned Integer colour.
A function return value of zero indicates the data was successfully returned.

> **ID = 619**

Get_plot_frame_textstyle(Element elt,Text &textstyle)

```c
Integer Get_plot_frame_textstyle(Element elt,Text &textstyle)
```
Get the textstyle of the plot frame in Element elt.
The textstyle value is returned in Text textstyle.
A function return value of zero indicates the data was successfully returned.

> **ID = 620**

Get_plot_frame_plotter(Element elt,Integer &plotter)

```c
Integer Get_plot_frame_plotter(Element elt,Integer &plotter)
```
Get the plotter of the plot frame in Element elt.
The plotter value is returned in Integer plotter.
A function return value of zero indicates the data was successfully returned.

> **ID = 621**

Get_plot_frame_plotter_name(Element elt,Text &plotter_name)

```c
Integer Get_plot_frame_plotter_name(Element elt,Text &plotter_name)
```
Get the plotter name of the plot frame in Element elt.
The plotter name is returned in the Text plotter_name.
A function return value of zero indicates the plotter _name was returned successfully.

> **ID = 686**

Get_plot_frame_plot_file(Element elt,Text &plot_file)

```c
Integer Get_plot_frame_plot_file(Element elt,Text &plot_file)
```
Get the plot file of the plot frame in Element elt.
The plot file value is returned in Text plot_file.
A function return value of zero indicates the data was successfully returned.

> **ID = 622**

Get_plot_frame_title_1(Element elt,Text &title)

```c
Integer Get_plot_frame_title_1(Element elt,Text &title)
```
Get the first title line of the plot frame in Element elt.
The title line value is returned in Text title.
A function return value of zero indicates the data was successfully returned.

> **ID = 623**

Get_plot_frame_title_2(Element elt,Text &title)

```c
Integer Get_plot_frame_title_2(Element elt,Text &title)
```
Get the second title line of the plot frame in Element elt.
The title line value is returned in Text title.
A function return value of zero indicates the data was successfully returned.

> **ID = 624**

Get_plot_frame_title_file(Element elt,Text &title_file)

```c
Integer Get_plot_frame_title_file(Element elt,Text &title_file)
```
Get the title file of the plot frame in Element elt.
The title file value is returned in Text title_file.
A function return value of zero indicates the data was successfully returned.

> **ID = 625**

Set_plot_frame_name(Element elt,Text name)

```c
Integer Set_plot_frame_name(Element elt,Text name)
```
Set the name of the plot frame in Element elt.

The name value is defined in Text name.
A function return value of zero indicates the data was successfully set.

> **ID = 626**

Set_plot_frame_scale(Element elt,Real scale)

```c
Integer Set_plot_frame_scale(Element elt,Real scale)
```
Set the scale of the plot frame in Element elt.
The scale value is defined in Real scale.
A function return value of zero indicates the data was successfully set.

> **ID = 627**

Set_plot_frame_rotation(Element elt,Real rotation)

```c
Integer Set_plot_frame_rotation(Element elt,Real rotation)
```
Set the rotation of the plot frame in Element elt.
The rotation value is defined in Real rotation.
A function return value of zero indicates the data was successfully set.

> **ID = 628**

Set_plot_frame_origin(Element elt,Real x,Real y)

```c
Integer Set_plot_frame_origin(Element elt,Real x,Real y)
```
Set the origin of the plot frame in Element elt.
The x origin value is defined in Real x.
The y origin value is defined in Real y.
A function return value of zero indicates the data was successfully set.

> **ID = 629**

Set_plot_frame_sheet_size(Element elt,Real w,Real h)

```c
Integer Set_plot_frame_sheet_size(Element elt,Real w,Real h)
```
Set the sheet size of the plot frame in Element elt.
The width value is defined in Real w.
The height value is defined in Real h.

A function return value of zero indicates the data was successfully set.

> **ID = 630**

Set_plot_frame_sheet_size(Element elt,Text size)

```c
Integer Set_plot_frame_sheet_size(Element elt,Text size)
```
Set the sheet size of the plot frame in Element elt.
The sheet size is defined in Text size.
A function return value of zero indicates the data was successfully set.

> **ID = 631**

Set_plot_frame_margins(Element elt,Real l,Real b,Real r,Real t)

```c
Integer Set_plot_frame_margins(Element elt,Real l,Real b,Real r,Real t)
```
Set the sheet margins of the plot frame in Element elt.
The left margin value is defined in Real l.
The bottom margin value is defined in Real b.
The right margin value is defined in Real r.
The top margin value is defined in Real t.
A function return value of zero indicates the data was successfully set.

> **ID = 632**

Set_plot_frame_text_size(Element elt,Real text_size)

```c
Integer Set_plot_frame_text_size(Element elt,Real text_size)
```
Set the text size of the plot frame in Element elt.
The text size is defined in Text text_size.
A function return value of zero indicates the data was successfully set.

> **ID = 633**

Set_plot_frame_draw_border(Element elt,Integer draw_border)

```c
Integer Set_plot_frame_draw_border(Element elt,Integer draw_border)
```
Set the draw border of the plot frame in Element elt.
The draw border flag is defined in Integer draw_border.

A function return value of zero indicates the data was successfully set.

> **ID = 634**

Set_plot_frame_draw_viewport(Element elt,Integer draw_viewport)

```c
Integer Set_plot_frame_draw_viewport(Element elt,Integer draw_viewport)
```
Set the draw viewport of the plot frame in Element elt.
The draw viewport flag is defined in Integer draw_viewport.
A function return value of zero indicates the data was successfully set.

> **ID = 635**

Set_plot_frame_draw_title_file(Element elt,Integer draw_title)

```c
Integer Set_plot_frame_draw_title_file(Element elt,Integer draw_title)
```
Set the draw title file of the plot frame in Element elt.
The draw title file flag is defined in Integer draw_title.
A function return value of zero indicates the data was successfully set.

> **ID = 636**

Set_plot_frame_colour(Element elt,Integer colour)

```c
Integer Set_plot_frame_colour(Element elt,Integer colour)
```
Set the colour of the plot frame in Element elt.
The colour value is defined Integer colour.
A function return value of zero indicates the data was successfully set.

> **ID = 637**

Set_plot_frame_textstyle(Element elt,Text textstyle)

```c
Integer Set_plot_frame_textstyle(Element elt,Text textstyle)
```
Set the textstyle of the plot frame in Element elt.
The textstyle value is defined in Text textstyle
A function return value of zero indicates the data was successfully set.

> **ID = 638**


Set_plot_frame_plotter(Element elt,Integer plotter)

```c
Integer Set_plot_frame_plotter(Element elt,Integer plotter)
```
Set the plotter of the plot frame in Element elt.
The plotter value is defined in Integer plotter.
A function return value of zero indicates the data was successfully set.

> **ID = 639**

Set_plot_frame_plotter_name(Element elt,Text plotter_name)

```c
Integer Set_plot_frame_plotter_name(Element elt,Text plotter_name)
```
Set the plotter name of the plot frame in Element elt.
The plotter name is given in the Text plotter_name.
A function return value of zero indicates the plotter name was successfully set.

> **ID = 687**

Set_plot_frame_plot_file(Element elt,Text plot_file)

```c
Integer Set_plot_frame_plot_file(Element elt,Text plot_file)
```
Set the plot file of the plot frame in Element elt
The plot file value is defined in Text plot_file.
A function return value of zero indicates the data was successfully set.

> **ID = 640**

Set_plot_frame_title_1(Element elt,Text title_1)

```c
Integer Set_plot_frame_title_1(Element elt,Text title_1)
```
Set the first title line of the plot frame in Element elt.
The title line value is defined in Text title_1.
A function return value of zero indicates the data was successfully set.

> **ID = 641**

Set_plot_frame_title_2(Element elt,Text title_2)

```c
Integer Set_plot_frame_title_2(Element elt,Text title_2)
```
Set the second title line of the plot frame in Element elt.
The title line value is defined in Text title_2.
A function return value of zero indicates the data was successfully set.

> **ID = 642**

Set_plot_frame_title_file(Element elt,Text title_file)

```c
Integer Set_plot_frame_title_file(Element elt,Text title_file)
```
Set the title file of the plot frame in Element elt
The title file value is defined in Text title_file.
A function return value of zero indicates the data was successfully set.

> **ID = 643**
