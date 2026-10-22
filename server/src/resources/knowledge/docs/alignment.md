> **Source:** 12d Model Macro Programming Manual — §5.40 (pp.601–615), §5.54 (pp.877–887)

# Alignments in 12d Model

## Overview: Alignments in 12d Model

Alignments are civil engineering horizontal alignments used for road/rail design.
Key functions: `Get_chainage`, `Get_end_chainage`, `Get_position`, `Drop_point`, `Get_hip_points`, `Get_hip_type`, `Get_hip_geom`, `Get_hip_data`

## Super Alignment String Element (§5.40)

---

```
Page 600
Super Alignment String Element
 12d Model Macro Manual
5.40 Super Alignment String Element
A Super Alignment string holds both the horizontal and vertical information needed in defining 
entities such as the centre line of a road.
Horizontal intersection points (hips), lines, arcs and transitions (such as spirals) are used to define 
the plan geometry.
Vertical intersection points (vips), lines and parabolic and circular curves are used to define the 
vertical geometry.
The process to define an Super Alignment string is
(a)
create an Super Alignment Element
(b)
add the horizontal geometry
(c)
perform a Calc_alignment on the string
(d)
add the vertical geometry
(e)
perform a Calc_alignment
For an existing Super Alignment string, there are functions to get the positions of all critical points 
(such as horizontal and vertical tangent points, spiral points, curve centres) for the string.
The functions used to create new Super Alignment strings and make inquiries and modifications to 
existing Alignment strings now follow.
Element Create_super_align()
Name
Element Create_align()
Description
Create an Element of type Super_Alignment.
The function return value gives the actual Element created.
If the Super Alignment string could not be created, then the returned Element will be null.
ID = 2120
Create_super_align(Element seed)
Name
Element Create_align(Element seed)
Description
Create an Element of type Super_Alignment, and set the colour, name, style etc. of the new string 
to be the same as those from the Element seed.
If the Super Alignment string could not be created, then the returned Element will be null.
ID = 2121
Is_super_alignment_solved(Element super_alignment)
Name
Integer Is_super_alignment_solved(Element super_alignment)
Description
Page 601
Super Alignment String Element
Chapter 5  12dPL Library Calls
Check if the geometry of the Element super_alignment solves.
The Element super_alignment must be of type Super_Alignment.
A no-zero function return value indicates that the geometry will solve.
A zero function return value indicates the geometry for the will not solve, or that super_alignment 
is not of type Super_Alignment.
Warning this is the opposite of most 12dPL function return values.
ID = 2680
Get_super_alignment_style(Element super_alignment,Text &style)
Name
Integer Get_super_alignment_style(Element super_alignment,Text &style)
Description
This call retrieves the current alignment style of the super alignment super_alignment and stores 
its name in the Text style.
This call returns 0 if it succeeds and non zero if it fails.
ID = 2805
Set_super_alignment_style(Element super_alignment,Text style)
Name
Integer Set_super_alignment_style(Element super_alignment,Text style)
Description
This call sets the current alignment style of the super alignment super_alignment to be the style 
named style.
This call returns 0 if it succeeds and non zero if it fails.
ID = 2806
Get_super_alignment_vertical_interval_chord_arc(Element alignment,Real 
&interval_chord_arc)
Name
Integer Get_super_alignment_vertical_interval_chord_arc(Element alignment,Real &interval_chord_arc)
Description
This call retrieves the interval chord arc of the vertical of the super alignment super_alignment and 
stores its value in the Real interval_chord_arc.
This call returns 0 if it succeeds and non zero if it fails.
ID = 7974
Set_super_alignment_vertical_interval_chord_arc(Element alignment,Real 
interval_chord_arc)
Name
Integer Set_super_alignment_vertical_interval_chord_arc(Element alignment,Real interval_chord_arc)
Description
Page 602
Super Alignment String Element
 12d Model Macro Manual
This call sets the interval chord arc of the vertical of the super alignment super_alignment to be the 
value of interval_chord_arc.
This call returns 0 if it succeeds and non zero if it fails.
ID = 7975
Get_super_alignment_valid_horizontal(Element super_alignment,Integer &valid)
Name
Get_super_alignment_valid_horizontal(Element super_alignment,Integer &valid)
Description
Check if horizontal parts of a super alignment super_alignment is valid
Output value valid: 0 not valid, 1 valid
A return value of zero indicates the function call was successful.
ID = 3053
Get_super_alignment_valid_vertical(Element super_alignment,Integer &valid)
Name
Get_super_alignment_valid_vertical(Element super_alignment,Integer &valid)
Description
Check if vertical parts of a super alignment super_alignment is valid
Output value valid: 0 not valid, 1 valid
A return value of zero indicates the function call was successful.
ID = 3054
Get_super_alignment_valid(Element super_alignment,Integer &valid)
Name
Get_super_alignment_valid(Element super_alignment,Integer &valid)
Description
Check if a super alignment super_alignment is valid
Output value valid: 0 not valid, 1 valid
A return value of zero indicates the function call was successful.
ID = 3055
Get_super_alignment_horizontal_string(Element super_alignment)
Name
Element Get_super_alignment_horizontal_string(Element super_alignment)
Description
Return a super string which has the segments of the solved horizontal geometry of a super 
alignment super_alignment. Each segment can be straight, arc, transition, or offset transition.
ID = 1898
Page 603
Super Alignment String Element
Chapter 5  12dPL Library Calls
Get_super_alignment_vertical_string(Element super_alignment)
Name
Element Get_super_alignment_vertical_string(Element super_alignment)
Description
Return a super string which has the segments of the solved vertical geometry of a super alignment 
super_alignment. Each segment can be straight, arc, or parabola.
ID = 1899
Get_super_alignment_vertical_position(Element super_alignment,Real chainage,Real 
&level,Real &grade,Real &mvalue)
Name
Integer Get_super_alignment_vertical_position(Element super_alignment,Real chainage,Real &level,Real 
&grade,Real &mvalue)
Description
Get the details (level, grade, mvalue) of the vertical information of a super alignment 
super_alignment at a given chainage
A return value of zero indicates the function call was successful.
ID = 2167
Get_super_alignment_widening_left_side(Element super_alignment)
Name
Element Get_super_alignment_widening_left_side(Element super_alignment)
Description
Return a super string that is the same as the left side widening of a super alignment 
super_alignment
ID = 2198
Get_super_alignment_widening_right_side(Element super_alignment)
Name
Element Get_super_alignment_widening_right_side(Element super_alignment)
Description
Return a super string that is the same as the right side widening of a super alignment 
super_alignment
ID = 2199
Get_super_alignment_super_elevation_left_side(Element super_alignment)
Name
Element Get_super_alignment_super_elevation_left_side(Element super_alignment)
Description
Return a super string that is the same as the left side elevation of a super alignment 
super_alignment
Page 604
Super Alignment String Element
 12d Model Macro Manual
ID = 2200
Get_super_alignment_super_elevation_right_side(Element super_alignment)
Name
Element Get_super_alignment_super_elevation_right_side(Element super_alignment)
Description
Return a super string that is the same as the right side elevation of a super alignment 
super_alignment
ID = 2201
Get_super_alignment_sight_distance_forward(Element super_alignment)
Name
Element Get_super_alignment_sight_distance_forward(Element super_alignment)
Description
Return a super string that is the same as the forward sight distance of a super alignment 
super_alignment
ID = 2274
Get_super_alignment_sight_distance_reverse(Element super_alignment)
Name
Element Get_super_alignment_sight_distance_reverse(Element super_alignment)
Description
Return a super string that is the same as the reverse sight distance of a super alignment 
super_alignment
ID = 2275
Get_super_alignment_number_of_profiles(Element alignment,Integer &count)
Name
Integer Get_super_alignment_number_of_profiles(Element alignment,Integer &count)
Description
Get the number of profiles count of a super alignment alignment
A return value of zero indicates the function call was successful.
ID = 2624
Get_super_alignment_profile(Element alignment,Integer &index)
Name
Element Get_super_alignment_profile(Element alignment,Integer &index)
Description
Return a super string that is the same as the profile of given index of a super alignment alignment
ID = 2625
Page 605
Super Alignment String Element
Chapter 5  12dPL Library Calls
Get_super_alignment_profile(Element alignment,Text name)
Name
Element Get_super_alignment_profile(Element alignment,Text name)
Description
Return a super string that is the same as the profile of given name of a super alignment alignment
ID = 2276
Get_super_alignment_named_parts(Element alignment,Integer 
vert_hori,Dynamic_Text &names)
Name
Integer Get_super_alignment_named_parts(Element alignment,Integer vert_hori,Dynamic_Text &names)
Description
Get the list of named part (vertical if vert_hori is 0; horizontal otherwise) names of a super 
alignment alignment and assign their name to the list names 
A return value of zero indicates the function call was successful.
ID = 3535
Get_super_alignment_named_positions(Element alignment,Dynamic_Text &names)
Name
Integer Get_super_alignment_named_positions(Element alignment,Dynamic_Text &names)
Description
Get the list of named positions of a super alignment alignment and assign their names to the list 
names 
A return value of zero indicates the function call was successful.
ID = 3536
Get_super_alignment_named_part_chainage(Element alignment,Integer 
vert_hori,Text name,Real &ch)
Name
Integer Get_super_alignment_named_part_chainage(Element alignment,Integer vert_hori,Text name,Real 
&ch)
Description
Get the chainage ch of named part (vertical if vert_hori is 0; horizontal otherwise) with given name 
for a super alignment alignment.
A return value of zero indicates the function call was successful.
ID = 3537
Get_super_alignment_named_position_chainage(Element alignment,Text name,Real 
&ch)
Page 606
Super Alignment String Element
 12d Model Macro Manual
Name
Integer Get_super_alignment_named_position_chainage(Element alignment,Text name,Real &ch)
Description
Get the chainage ch of named position with given name for a super alignment alignment.
A return value of zero indicates the function call was successful.
ID = 3538
Get_super_alignment_named_part_segments(Element alignment,Integer 
vert_hori,Text name,Dynamic_Integer &segment_indices)
Name
Integer Get_super_alignment_named_part_segments(Element alignment,Integer vert_hori,Text 
name,Dynamic_Integer &segment_indices)
Description
Get the list of segment indices segment_indices of the named part (vertical if vert_hori is 0; 
horizontal otherwise) with given name for a super alignment alignment.
A return value of zero indicates the function call was successful.
ID = 3539
Get_super_alignment_named_part_segment(Element alignment,Integer 
vert_hori,Text name,Segment &segment)
Name
Integer Get_super_alignment_named_part_segment(Element alignment,Integer vert_hori,Text name,Segment 
&segment)
Description
Get the Segment segment of the named part (vertical if vert_hori is 0; horizontal otherwise) with 
given name for a super alignment alignment.
A return value of zero indicates the function call was successful.
ID = 3540
Get_super_alignment_named_chainage(Element alignment,Integer vert_hori,Real 
ch,Text &name,Real &extension)
Name
Integer Get_super_alignment_named_chainage(Element alignment,Integer vert_hori,Real ch,Text 
&name,Real &extension)
Description
For a super alignment alignment, find the named part (vertical if vert_hori is 0; horizontal 
otherwise) containing a given chainage ch, set Text name to the part name, and extension to the 
extension to the chainage point.
A return value of zero indicates the function call was successful.
ID = 3541
Get_super_alignment_named_segment(Element alignment,Integer vert_hori,Real 
Page 607
Super Alignment String Element
Chapter 5  12dPL Library Calls
ch,Text &name)
Name
Integer Get_super_alignment_named_segment(Element alignment,Integer vert_hori,Real ch,Text &name)
Description
For a super alignment alignment, find the named part (vertical if vert_hori is 0; horizontal 
otherwise) containing a given chainage ch, set Text name to the part name.
A return value of zero indicates the function call was successful.
ID = 3542
Set_super_alignment_use_equalities(Element alignment,Integer use)
Name
Integer Set_super_alignment_use_equalities(Element alignment,Integer use)
Description
For a super alignment alignment, create (if use is 1) or delete (if use is 0) the chainage equalities 
object within the super alignment.
A return value of zero indicates the function call was successful.
ID = 2181
Get_super_alignment_use_equalities(Element alignment,Integer &use)
Name
Integer Get_super_alignment_use_equalities(Element alignment,Integer &use)
Description
For a super alignment alignment, check if the chainage equalities object exists within the super 
alignment and set use to 1 if exists; 0 otherwise.
A return value of zero indicates the function call was successful.
ID = 2182
Set_super_alignment_equalities_active(Element alignment,Integer active)
Name
Integer Set_super_alignment_equalities_active(Element alignment,Integer active)
Description
For a super alignment alignment, create (if active is 1) or delete (if active is 0) the chainage 
equalities object within the super alignment. If active is 1 then also turn on the equalities object
A return value of zero indicates the function call was successful.
ID = 2183
Get_super_alignment_equalities_active(Element alignment,Integer &active)
Name
Integer Get_super_alignment_equalities_active(Element alignment,Integer &active)
Description
Page 608
Super Alignment String Element
 12d Model Macro Manual
For a super alignment alignment, check if the chainage equalities object exists within the super 
alignment and set active to 1 if exists and turned on; 0 otherwise.
A return value of zero indicates the function call was successful.
ID = 2184
Super_alignment_equality_part_append(Element alignment,Text part)
Name
Integer Super_alignment_equality_part_append(Element alignment,Text part)
Description
For a super alignment alignment, append a new equality part with the given name part.
A return value of zero indicates the function call was successful.
ID = 2185
Super_alignment_equality_part_insert(Element alignment,Integer position,Text part)
Name
Integer Super_alignment_equality_part_insert(Element alignment,Integer position,Text part)
Description
For a super alignment alignment, insert a new equality part at the given position with the given 
name part.
A return value of zero indicates the function call was successful.
ID = 2186
Super_alignment_equality_part_delete(Element alignment,Integer position)
Name
Integer Super_alignment_equality_part_delete(Element alignment,Integer position)
Description
For a super alignment alignment, delete the equality part at the given position 
A return value of zero indicates the function call was successful.
ID = 2187
Get_super_alignment_equality_parts(Element alignment,Integer &num_parts)
Name
Integer Get_super_alignment_equality_parts(Element alignment,Integer &num_parts)
Description
For a super alignment alignment, get the number of the equality parts as num_parts.
A return value of zero indicates the function call was successful.
ID = 2188
Get_super_alignment_equality_part_id(Element alignment,Integer position,Integer 
&id)
Page 609
Super Alignment String Element
Chapter 5  12dPL Library Calls
Name
Integer Get_super_alignment_equality_part_id(Element alignment,Integer position,Integer &id)
Description
For a super alignment alignment, get the id of the equality part at given position.
A return value of zero indicates the function call was successful.
ID = 2189
Get_super_alignment_equality_part_type(Element alignment,Integer position,Text 
&type)
Name
Integer Get_super_alignment_equality_part_type(Element alignment,Integer position,Text &type)
Description
For a super alignment alignment, get the type of the equality part at given position.
A return value of zero indicates the function call was successful.
ID = 2190
Get_super_alignment_equality_part(Element alignment,Integer position,Text 
&name)
Name
Integer Get_super_alignment_equality_part(Element alignment,Integer position,Text &name)
Description
For a super alignment alignment, get the name of the equality part at given position.
A return value of zero indicates the function call was successful.
ID = 2191
Calc_super_alignment_equalities(Element alignment)
Name
Integer Calc_super_alignment_equalities(Element alignment)
Description
For a super alignment alignment, rebuild the chainage equality.
A return value of zero indicates the function call was successful.
ID = 2192
Get_super_alignment_equality_chainage(Element alignment,Real raw_chainage,Text 
&equality_name,Integer &equality_zone,Real &equality_offset)
Name
Integer Get_super_alignment_equality_chainage(Element alignment,Real raw_chainage,Text 
&equality_name,Integer &equality_zone,Real &equality_offset)
Description
For a super alignment alignment, get the equality_name; equality_zone; equality_offset of the 
Page 610
Super Alignment String Element
 12d Model Macro Manual
chainage equality part at given raw_chainage.
A return value of zero indicates the function call was successful.
ID = 2193
Get_super_alignment_raw_chainage(Element alignment,Text equality_name,Integer 
equality_zone,Real equality_offset,Real &raw_chainage)
Name
Integer Get_super_alignment_raw_chainage(Element alignment,Text equality_name,Integer 
equality_zone,Real equality_offset,Real &raw_chainage)
Description
For a super alignment alignment, get the raw_chainage of the chainage equality part with given 
equality_name; equality_zone; equality_offset  .
A return value of zero indicates the function call was successful.
ID = 2194
Get_super_alignment_number_of_equalities(Element alignment,Integer &count)
Name
Integer Get_super_alignment_number_of_equalities(Element alignment,Integer &count)
Description
For a super alignment alignment, get the count of number of solved chainage equalities (K-post 
and internal equalities).
A return value of zero indicates the function call was successful.
ID = 2195
Get_super_alignment_equality_data(Element align,Integer index,Real 
&raw_chainage,Integer &mode,Text &equality_name,Integer &equality_zone,Real 
&equality_offset,Text &pre_equality_name,Integer &pre_equality_zone,Real 
&equality_before)
Name
Integer Get_super_alignment_equality_data(Element align,Integer index,Real &raw_chainage,Integer 
&mode,Text &equality_name,Integer &equality_zone,Real &equality_offset,Text 
&pre_equality_name,Integer &pre_equality_zone,Real &equality_before)
Description
For a super alignment alignment, get the chainage equality information: raw_chainage, mode, 
equality_name, equality_zone, equality_offset, pre_equality_name, pre_equality_zone, 
equality_before at a given index.
A return value of zero indicates the function call was successful.
ID = 2196
Get_super_alignment_equality_info(Element alignment,Real chainage,Equality_Info 
&equality_info)
Name
Page 611
Super Alignment String Element
Chapter 5  12dPL Library Calls
Integer Get_super_alignment_equality_info(Element alignment,Real chainage,Equality_Info &equality_info)
Description
For a super alignment alignment, get the chainage equality information: equality_info at a given 
chainage.
A return value of zero indicates the function call was successful.
ID = 2223
Get_equality_info_valid(Equality_Info &info,Integer &valid)
Name
Integer Get_equality_info_valid(Equality_Info &info,Integer &valid)
Description
Get the valid flag of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2224
Get_equality_info_name(Equality_Info &info,Text &name)
Name
Integer Get_equality_info_name(Equality_Info &info,Text &name)
Description
Get the name of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2225
Get_equality_info_zone(Equality_Info &info,Integer &zone)
Name
Integer Get_equality_info_zone(Equality_Info &info,Integer &zone)
Description
Get the zone of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2226
Get_equality_info_offset(Equality_Info &info,Real &offset)
Name
Integer Get_equality_info_offset(Equality_Info &info,Real &offset)
Description
Get the offset of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2227
Page 612
Super Alignment String Element
 12d Model Macro Manual
Get_equality_info_prevalid(Equality_Info &info,Integer &prevalid)
Name
Integer Get_equality_info_prevalid(Equality_Info &info,Integer &prevalid)
Description
Get the prevalid flag of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2228
Get_equality_info_prename(Equality_Info &info,Text &prename)
Name
Integer Get_equality_info_prename(Equality_Info &info,Text &prename)
Description
Get the prename of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2229
Get_equality_info_prezone(Equality_Info &info,Integer &prezone)
Name
Integer Get_equality_info_prezone(Equality_Info &info,Integer &prezone)
Description
Get the prezone of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2230
Get_equality_info_preoffset(Equality_Info &info,Real &preoffset)
Name
Integer Get_equality_info_preoffset(Equality_Info &info,Real &preoffset)
Description
Get the zone of a super alignment chainage Equality_Info info.
A return value of zero indicates the function call was successful.
ID = 2231
Set_equality_label_data(Equality_Label &label,Text name,Integer value)
Name
Integer Set_equality_label_data(Equality_Label &label,Text name,Integer value)
Description
Set the name and the Integer value of a super alignment chainage Equality_Label label.
A return value of zero indicates the function call was successful.
ID = 2232
Page 613
Super Alignment String Element
Chapter 5  12dPL Library Calls
Set_equality_label_data(Equality_Label &label,Text name,Text value)
Name
Integer Set_equality_label_data(Equality_Label &label,Text name,Text value)
Description
Set the name and the Text value of a super alignment chainage Equality_Label label.
A return value of zero indicates the function call was successful.
ID = 2233
Get_equality_label_data(Equality_Label &label,Text name,Integer &value)
Name
Integer Get_equality_label_data(Equality_Label &label,Text name,Integer &value))
Description
Get the name and the Integer value of a super alignment chainage Equality_Label label.
A return value of zero indicates the function call was successful.
ID = 2234
Get_equality_label_data(Equality_Label &label,Text name,Text &value)
Name
Integer Get_equality_label_data(Equality_Label &label,Text name,Text &value)
Description
Get the name and the Text value of a super alignment chainage Equality_Label label.
A return value of zero indicates the function call was successful.
ID = 2235
Create_equality_label(Real raw_chainage,Equality_Info 
&equality_info,Equality_Label &equality_label,Text &text_label)
Name
Integer Create_equality_label(Real raw_chainage,Equality_Info &equality_info,Equality_Label 
&equality_label,Text &text_label)
Description
For plotting???
Create the text_label from equality_info and equality_label at given raw_chainage.
A return value of zero indicates the function call was successful.
ID = 2236
Get_super_alignment_equality_chainage(Element alignment,Integer item,Real 
&chainage)
Name
Page 614
Super Alignment String Element
 12d Model Macro Manual
Integer Get_super_alignment_equality_chainage(Element alignment,Integer item,Real &chainage)
Description
For a super alignment alignment, get the raw chainage from chainage equality with a given item.
A return value of zero indicates the function call was successful.
ID = 2237
Get_super_alignment_equality_info(Element alignment,Real chainage,Equality_Info 
&equality_info)
Name
Integer Get_super_alignment_equality_info(Element alignment,Real chainage,Equality_Info &equality_info)
Description
For a super alignment alignment, get the chainage equality information: equality_info at a given 
chainage.
A return value of zero indicates the function call was successful.
ID = 2238
Resolve_super_alignment(Text model_name,Uid model_id,Text string_name,Uid 
string_id)
Name
Integer Resolve_super_alignment(Text model_name,Uid model_id,Text string_name,Uid string_id)
Description
Resolve the super alignment with given model_name, model_id, string_name, string_id .
A return value of zero indicates the function call was successful.
ID = 3918
Super_alignment_validate(Element alignment,Integer &has_error)
Name
Integer Super_alignment_validate(Element alignment,Integer &has_error)
Description
Validate the super alignment and set Integer has_error to one if any error occurs on the validation; 
zero otherwise.
A return value of zero indicates the function call was successful.
ID = 3935

```

## Legacy Alignment String Element (§5.54)

---

```
Page 876
Alignment String Element
 12d Model Macro Manual
5.54 Alignment String Element
An Alignment string holds both the horizontal and vertical information needed in defining entities 
such as the centre line of a road.
Horizontal intersection points (hips), arcs and spirals are used to define the plan geometry.
Vertical intersection points (vips) and parabolic and circular curves are used to define the vertical 
geometry.
The process to define an Alignment string is
(a)
create an Alignment Element
(b)
add the horizontal geometry
(c)
perform a Calc_alignment on the string
(d)
add the vertical geometry
(e)
perform a Calc_alignment
For an existing Alignment string, there are functions to get the positions of all critical points (such as 
horizontal and vertical tangent points, spiral points, curve centres) for the string.
The functions used to create new Alignment strings and make inquiries and modifications to existing 
Alignment strings now follow.
Note: From 12d Model 9 onwards, Alignment strings have been replaced by Super Alignment 
strings.
Element Create_align()
Name
Element Create_align()
Description
Create an Element of type Alignment.
The function return value gives the actual Element created.
If the Alignment string could not be created, then the returned Element will be null.
ID = 92
Create_align(Element seed)
Name
Element Create_align(Element seed)
Description
Create an Element of type Alignment, and set the colour, name, style etc. of the new string to be the 
same as those from the Element seed.
If the alignment string could not be created, then the returned Element will be null.
ID = 670
Append_hip(Element elt,Real x,Real y)
Name
Integer Append_hip(Element elt,Real x,Real y)
Description
Page 877
Alignment String Element
Chapter 5  12dPL Library Calls
Append a horizontal intersection point (hip) with plan co-ordinates (x,y) to the Element elt
. The radius and spiral lengths are set to zero.
The order in which the hips are appended is taken as the order of the hips in the Alignment string.
The hips must be appended in order of increasing chainage along the Alignment string.
Append_hip is used to place the first hip as well as the subsequent hips.
A function return value of zero indicates that the hip was successfully appended.
ID = 93
Append_hip(Element elt,Real x,Real y,Real rad)
Name
Integer Append_hip(Element elt,Real x,Real y,Real rad)
Description
Append a horizontal intersection point (hip) with plan co-ordinates (x,y) and curve radius rad to the 
Element elt. The spiral lengths are set to zero.
A zero curve radius indicates that no curve is present.
A function return value of zero indicates that the hip was successfully appended.
ID = 94
Append_hip(Element elt,Real x,Real y,Real rad,Real left_spiral,Real right_spiral)
Name
Integer Append_hip(Element elt,Real x,Real y,Real rad,Real left_spiral,Real right_spiral)
Description
Append to the Element elt a horizontal intersection point (hip) with co-ordinates (x,y), curve radius 
rad and left and right spirals of length left_spiral and right_spiral respectively.
A zero curve radius indicates that no curve is present.
A zero spiral length indicates that a spiral is not present.
A function return value of zero indicates that the hip was successfully appended.
ID = 95
Get_hip_points(Element elt,Integer &num_pts)
Name
Integer Get_hip_points(Element elt,Integer &num_pts)
Description
Get the number of hips, num_pts, in the Alignment Element elt.
A function return value of zero indicates the number of hip points was successfully returned.
ID = 100
Get_hip_data(Element elt,Integer i,Real &x,Real &y)
Name
Integer Get_hip_data(Element elt,Integer i,Real &x,Real &y)
Page 878
Alignment String Element
 12d Model Macro Manual
Description
Get the plan co-ordinates (x,y) of the ith hip point of the Alignment string elt.
A function return value of zero indicates the hip data was successfully returned.
ID = 101
Get_hip_data(Element elt,Integer i,Real &x,Real &y,Real &rad)
Name
Integer Get_hip_data(Element elt,Integer i,Real &x,Real &y,Real &rad)
Description
Get the plan co-ordinates (x,y) and the curve radius, rad, for the ith hip point of the Alignment string 
elt.
If the radius is:
positive,
it is a right hand curve
negative,
it is a left hand curve.
zero, 
there is no curve.
A function return value of zero indicates the hip data was successfully returned.
ID = 102
Get_hip_data(Element elt,Integer i,Real &x,Real &y,Real &rad,Real 
&left_spiral,Real &right_spiral)
Name
Integer Get_hip_data(Element elt,Integer i,Real &x,Real &y,Real &rad,Real &left_spiral,Real 
&right_spiral)
Description
Get the plan co-ordinates (x,y), the curve radius rad, and the left and right spiral lengths, left_spiral 
and right_spiral for the ith hip point of the Alignment Element elt.
If the radius is:
positive,
it is a right hand curve
negative,
it is a left hand curve.
zero, 
there is no curve.
A spiral length of zero indicates that there is no spiral.
A function return value of zero indicates the hip data was successfully returned.
ID = 103
Set_hip_data(Element elt,Integer i,Real x,Real y)
Name
Integer Set_hip_data(Element elt,Integer i,Real x,Real y)
Description
Modify the plan co-ordinates (x,y) of the ith hip point of the Alignment string elt. The existing curve 
radius and spiral lengths are not altered.
The ith hip point must already exist.
A function return value of zero indicates the hip was successfully set.
Page 879
Alignment String Element
Chapter 5  12dPL Library Calls
ID = 104
Set_hip_data(Element elt,Integer i,Real x,Real y,Real rad)
Name
Integer Set_hip_data(Element elt,Integer i,Real x,Real y,Real rad)
Description
Modify the plan co-ordinates (x,y) and the curve radius, rad, of the ith hip point of the Alignment 
string elt. The spiral lengths are not altered.
The ith hip point must already exist.
A function return value of zero indicates the hip was successfully set.
ID = 105
Set_hip_data(Element elt,Integer i,Real x,Real y,Real rad,Real left_spiral,Real 
right_spiral)
Name
Integer Set_hip_data(Element elt,Integer i,Real x,Real y,Real rad,Real left_spiral,Real right_spiral)
Description
Modify the plan co-ordinates (x,y), the curve radius rad, and the left and right spiral lengths, 
left_spiral and right_spiral for the ith hip point of the Alignment string elt.
The ith hip point must already exist.
A function return value of zero indicates the hip was successfully set.
ID = 106
Insert_hip(Element elt,Integer i,Real x,Real y)
Name
Integer Insert_hip(Element elt,Integer i,Real x,Real y)
Description
Insert a new hip with plan co-ordinates (x,y) before the existing ith hip point. 
The curve radius and spiral lengths are set to zero.
The inserted hip becomes the ith hip and the position of all subsequent hip's increases by one.
If i is greater than number of hips, then the new hip is appended to the string.
If i is less than one, then the new hip is prepended to the string.
A function return value of zero indicates the hip was inserted successfully.
ID = 107
Insert_hip(Element elt,Integer i,Real x,Real y,Real rad)
Name
Integer Insert_hip(Element elt,Integer i,Real x,Real y,Real rad)
Description
Insert a new hip with plan co-ordinates (x,y) and curve radius rad before the existing ith hip point. 
Page 880
Alignment String Element
 12d Model Macro Manual
The spiral lengths are set to zero.
The inserted hip becomes the ith hip and the position of all subsequent hip's increases by one.
If i is greater than number of hips, then the new hip is appended to the string.
If i is less than one, then the new hip is prepended to the string.
A function return value of zero indicates the hip was inserted successfully.
ID = 108
Insert_hip(Element elt,Integer i, Real x,Real y,Real rad,Real left_spiral,Real 
right_spiral)
Name
Integer Insert_hip(Element elt,Integer i,Real x,Real y,Real rad,Real left_spiral,Real right_spiral)
Description
Insert a new hip with plan co-ordinates (x,y), curve radius rad and left and right spirals of length 
left_spiral and right_spiral respectively, before the existing ith hip point.
The inserted hip becomes the ith hip and the position of all subsequent hip's increases by one.
If i is greater than number of hips, then the new hip is appended to the string.
If i is less than one, then the new hip is prepended to the string.
A function return value of zero indicates the hip was inserted successfully.
ID = 109
Delete_hip(Element elt,Integer i)
Name
Integer Delete_hip(Element elt,Integer i)
Description
Delete the ith hip from the Alignment string elt.
The position of all subsequent hips is decreased by one.
A function return value of zero indicates the hip was successfully deleted.
ID = 110
Get_hip_type(Element elt,Integer hip_no,Text &type)
Name
Integer Get_hip_type(Element elt,Integer hip_no,Text &type)
Description
Get the type of the horizontal intersection point number hip_no for the Alignment string elt.
The Text type has a returned value of
Spiral
if there is spiral/s and horizontal curve at the hip.
Curve
if there is a horizontal curve with no spirals at the hip.
IP
if there are no spirals or horizontal curves at the hip.
A function return value of zero indicates the hip information was successfully returned.
ID = 397
Page 881
Alignment String Element
Chapter 5  12dPL Library Calls
Get_hip_geom(Element elt,Integer hip_no,Integer mode, Real &x,Real &y)
Name
Integer Get_hip_geom(Element elt,Integer hip_no,Integer mode,Real &x,Real &y)
Description
Return the (x,y) co-ordinates of the critical horizontal points around the horizontal intersection point 
hip_no (i.e. tangent spiral points, spiral curve points etc.) for the Alignment string elt.
The type of critical point (x,y) returned is specified by mode and depends on the type of the hip.
The following table gives the description of the returned co-ordinate (x,y) and whether or not the 
mode is applicable for the given HIP type (Y means applicable, N means not applicable).
          HIP Type
Mode
Returned co-ordinate
HIP
Curve        Spiral
0
HIP co-ords
Y
Y                 Y
1
start tangent
N
Y  TC          Y  TS
2
end tangent
N
Y  CT          Y  ST
3
curve centre
N
Y                 Y
4
spiral-curve
N
N                 Y
5
curve-spiral
N
N                 Y
A function return value of zero indicates the hip information was successfully returned and that the 
mode was appropriate for the HIP type of the hip hip_no.
ID = 395
Append_vip(Element elt,Real ch,Real ht)
Name
Integer Append_vip(Element elt,Real ch,Real ht)
Description
Append a vertical intersection point (vip) with chainage-height co-ordinates (ch,ht) to the Element 
elt. The parabolic curve length is set to zero.
The order in which the vips are appended is taken as the order of the vips in the Alignment string.
The vips must be appended in order of increasing chainage along the Alignment string.
Append_vip is used to place the first vip as well as the subsequent vips.
A function return value of zero indicates the vip was appended successfully.
ID = 96
Append_vip(Element elt,Real ch,Real ht,Real parabolic)
Name
Integer Append_vip(Element elt,Real ch,Real ht,Real parabolic)
Description
Append to the Element elt a vertical intersection point (vip) with chainage-height co-ordinates 
(ch,ht) and a parabolic curve of length parabolic.
A parabolic curve length of zero indicates no curve is present.
A function return value of zero indicates the vip was appended successfully.
ID = 97
Page 882
Alignment String Element
 12d Model Macro Manual
Append_vip(Element elt,Real ch,Real ht,Real length,Integer mode)
Name
Integer Append_vip(Element elt,Real ch,Real ht,Real length,Integer mode)
Description
Append to the Element elt a vertical intersection point (vip) with chainage-height co-ordinates 
(ch,ht) and a curve of length length.
If mode = 0 or 1, the curve is a parabolic vertical curve
If mode = 2, the curve is a circular vertical curve
A curve length of zero indicates no curve is present.
A function return value of zero indicates the vip was appended successfully.
ID = 98
Get_vip_points(Element elt,Integer &num_pts)
Name
Integer Get_vip_points(Element elt,Integer &num_pts)
Description
Get the number of vips, num_pts, in the Alignment string elt.
A function return value of zero indicates the number of vip points was successfully returned.
ID = 111
Get_vip_data(Element elt,Integer i,Real &ch,Real &ht)
Name
Integer Get_vip_data(Element elt,Integer i,Real &ch,Real &ht)
Description
Get the chainage-height co-ordinates (ch,ht) of the ith vip point for the Alignment string elt.
A function return value of zero indicates the vip data was successfully returned.
ID = 112
Get_vip_data(Element elt,Integer i,Real &ch,Real &ht,Real &parabolic)
Name
Integer Get_vip_data(Element elt,Integer i,Real &ch,Real &ht,Real &parabolic)
Description
Get the chainage-height co-ordinates (ch,ht) and the parabolic curve length parabolic for the ith vip 
point of the Alignment string elt.
A function return value of zero indicates the vip data was successfully returned.
ID = 113
Get_vip_data(Element elt,Integer i,Real &ch,Real &ht,Real &value,Integer &mode)
Name
Integer Get_vip_data(Element elt,Integer i,Real &ch,Real &ht,Real &value,Integer &mode)
Page 883
Alignment String Element
Chapter 5  12dPL Library Calls
Description
Get the chainage-height co-ordinates (ch,ht) and the curve length value for the ith vip point of the 
Alignment string elt.
If mode = 0 or 1, the curve is a parabolic vertical curve
If mode = 2, the curve is a circular vertical curve
A curve length of zero indicates no curve is present.
A function return value of zero indicates the vip data was successfully returned.
ID = 114
Set_vip_data(Element elt,Integer i,Real ch,Real ht)
Name
Integer Set_vip_data(Element elt,Integer i,Real ch,Real ht)
Description
Modify the chainage-height co-ordinates (ch,ht) of the ith vip point for the Alignment string elt. The 
existing parabolic curve length is not altered.
The ith vip point must already exist.
A function return value of zero indicates the vip data was successfully set.
ID = 115
Set_vip_data(Element elt,Integer i, Real ch,Real ht,Real parabolic)
Name
Integer Set_vip_data(Element elt,Integer i,Real ch,Real ht,Real parabolic)
Description
Modify the chainage-height co-ordinates (ch,ht) and the parabolic curve length parabolic, for the ith 
vip point of the Alignment string elt.
The ith vip point must already exist.
A function return value of zero indicates the vip data was successfully set.
ID = 116
Set_vip_data(Element elt,Integer i,Real ch,Real ht,Real value,Integer mode)
Name
Integer Set_vip_data(Element elt,Integer i,Real ch,Real ht,Real value,Integer mode)
Description
Modify the chainage-height co-ordinates (ch,ht) and the curve length value, for the i’th vip point of 
the Alignment string elt.
If mode = 0 or 1, the curve is set to be a parabolic vertical curve
If mode = 2, the curve is set to be a circular vertical curve
A curve length of zero indicates no curve is present.
A function return value of zero indicates the vip data was successfully returned.
ID = 117
Page 884
Alignment String Element
 12d Model Macro Manual
Insert_vip(Element elt,Integer i,Real ch,Real ht)
Name
Integer Insert_vip(Element elt,Integer i,Real ch,Real ht)
Description
Insert a new vip with chainage-height co-ordinates (ch,ht) before the existing i’th vip point. 
The parabolic curve length is set to zero.
The inserted vip becomes the ith vip and the position of all subsequent vips increases by one.
If i is greater than number of vips, then the new vip is appended to the string.
If i is less than one, then the new vip is prepended to the string.
A function return value of zero indicates that the vip was successfully inserted.
ID = 118
Insert_vip(Element elt,Integer i,Real ch,Real ht,Real parabolic)
Name
Integer Insert_vip(Element elt,Integer i,Real ch,Real ht,Real parabolic)
Description
Insert a new vip with chainage-height co-ordinates (ch,ht) and parabolic length parabolic before 
the existing ith vip point.
The inserted vip becomes the ith vip and the position of all subsequent vips increases by one.
If i is greater than number of vips, then the new vip is appended to the string.
If i is less than one, then the new vip is prepended to the string.
A function return value of zero indicates that the vip was successfully inserted.
ID = 119
Insert_vip(Element elt,Integer i,Real ch,Real ht,Real value,Integer mode)
Name
Integer Insert_vip(Element elt,Integer i,Real ch,Real ht,Real value,Integer mode)
Description
Insert a new vip with chainage-height co-ordinates (ch,ht) and curve length value before the 
existing i’th vip point.
The inserted vip becomes the ith vip and the position of all subsequent vips increases by one.
If i is greater than number of vips, then the new vip is appended to the string.
If i is less than one, then the new vip is prepended to the string.
If mode = 0 or 1, the curve is set to be a parabolic vertical curve
If mode = 2, the curve is set to be a circular vertical curve
A curve length of zero indicates no curve is present.
A function return value of zero indicates that the vip was successfully inserted.
ID = 120
Delete_vip(Element elt,Integer i)
Page 885
Alignment String Element
Chapter 5  12dPL Library Calls
Name
Integer Delete_vip(Element elt,Integer i)
Description
Delete the ith vip from the Alignment string elt.
The position of all subsequent vips is decreased by one.
A function return value of zero indicates that the vip was successfully deleted.
ID = 121
Calc_alignment(Element elt)
Name
Integer Calc_alignment(Element elt)
Description
Use all the horizontal and vertical data to calculate the full geometry for the Alignment string.
A Calc_alignment must be done before the Alignment string can be used in 12d Model.
A function return value of zero indicates the geometry of the alignment was successfully calculated.
ID = 99
Get_vip_type(Element elt,Integer vip_no,Text &type)
Name
Integer Get_vip_type(Element elt,Integer vip_no,Text &type)
Description
Get the type of the vertical intersection point number vip_no for the Alignment string elt.
The Text type has a returned value of
VC
if there is a parabolic curve at the vip.
Curve
if there is a circular curve at the vip.
IP
if there is no vertical curves at the vip.
A function return value of zero indicates the vip information was successfully returned.
ID = 398
Get_vip_geom(Element elt,Integer vip_no,Integer mode,Real &chainage,Real 
&height)
Name
Integer Get_vip_geom(Element elt,Integer vip_no,Integer mode,Real &chainage,Real &height)
Description
Return the chainage and height co-ordinates of the critical points (tangent points, curve centre) for 
vertical intersection point number vip_no of the Alignment string elt.
The type of critical point (chainage,height) returned is given by mode and depends on the type of 
the vip.
The following table gives the description of the returned co-ordinates (chainage,height) and states 
whether the mode is applicable or not for the given VIP type (Y means applicable, N means not 
applicable).
     VIP Type
Page 886
Alignment String Element
 12d Model Macro Manual
Mode
Returned co-ordinate
VIP
VC         Curve
0
VIP co-ords
Y
Y               Y
1
start tangent
N
Y TC          Y TC
2
end tangent
N
Y CT          Y CT
3
curve centre
N
N                Y
A function return value of zero indicates that the vip information was successfully returned and that 
the mode was appropriate for the VIP type of the vip number vip_no.
ID = 396
Get_hip_id(Element elt,Integer position,Integer &id)
Name
 Integer Get_hip_id(Element elt,Integer position,Integer &id)
Description
<no description>
ID = 1451
Get_vip_id(Element elt,Integer position,Integer &id)
Name
 Integer Get_vip_id(Element elt,Integer position,Integer &id)
Description
<no description>
ID = 1452

```

