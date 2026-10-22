# General, Utilities, Macro Functions, Plot Parameters, and Undos

> Source: 12d Model Macro Manual §5.62–§5.66 (pages 1186–1332)

---

## General Functions (§5.62)

Miscellaneous general-purpose functions including project management, string handling,
geometry utilities, date/time, colour helpers, and coordinate tools.

General
Chapter   
5.62 General
See 5.62.1 Quick Sort
See 5.62.2 Name Matching
See 5.62.3 Null Data
See 5.62.11 Strings Edits
See 5.62.12 Place Meshes
See 5.62.4 Contour
See 5.62.5 Drape
See 5.62.7 Volumes
See 5.62.8 Interface
See 5.62.9 Templates
See 5.62.10 Applying Templates

General
5.62.1 Quick Sort
The Quick Sort routines sort into increasing order, the n values held in either an Integer array, a Real 
array or a Text array, say val_array.
The data in the arrays is not actually moved but instead an Integer array index[ ] (called the Index 
array) is also passed into the Quick Sort routines and the Index array is returned holding the order of 
the sorted values.
That is, the i’th array value of Index is the array position of the i’th sorted value in val_array.
For example, if
ipos = Index[7], 
and
val = val_array[ipos]
then val is the seventh sorted value from val_array.
So the loop below will go through the values in val_array in the sorted order from lowest value to the 
highest value:
    for (Integer i=1;i<=n;i++) {
        val = val_array[index[i]];

### `Quick_sort`

```c
Integer Quick_sort(Integer count,Integer index[],Integer val_array[])
```

Sort the Integer array val_array[count] of size count, and return the sort order for val_array[] in the Index array index[]. For more information see 5.62.1 Quick Sort. The array index[] must be of at least size count. A function return value of zero indicates that the sort was successful.

> ID = 2745

### `Quick_sort`

```c
Integer Quick_sort(Integer count,Integer index[],Real val_array[])
```

Sort the Real array val_array[count] of size count, and return the sort order for val_array[] in the Index array index[]. For more information see 5.62.1 Quick Sort. The array index[] must be of at least size count. A function return value of zero indicates that the sort was successful.

> ID = 2746

General
Chapter

### `Quick_sort`

```c
Integer Quick_sort(Integer count,Integer index[],Text val_array[])
```

Sort the Text array val_array[count] of size count, and return the sort order for val_array[] in the Index array index[]. For more information see 5.62.1 Quick Sort. The array index[] must be of at least size count. A function return value of zero indicates that the sort was successful.

> ID = 2747

5.62.2 Name Matching

### `Match_name`

```c
Integer Match_name(Text name,Text reg_exp)
```

Checks to see if the Text name matches a regular expression given by Text reg_exp. The regular expression uses * for a wild cards ? for a wild character A function return value of non-zero indicates that there was a match. A zero function return value indicates that there is no match or there was an error.

> ID = 188

### `Match_name`

```c
Integer Match_name(Dynamic_Element de,Text reg_exp,Dynamic_Element &matched)
```

Returns all the Elements from the Dynamic_Element de whose names match the regular expression Text reg_exp. The matching elements are returned by appended them to the Dynamic_Element matched. A function return value of zero indicates there were no errors in the matching calculations.

> ID = 189

General
5.62.3 Null Data
It often happens in modelling that the plan position of a point is known (that is, the (x,y) co-ordinates 
are known) but the z-value is not defined.
For these situations, 12d Model has a special null z-value that is used to indicate that the z-value is 
to be ignored.

### `Is_null`

```c
Integer Is_null(Real value)
```

Checks to see if the Real value is null or not. A non-zero function return value indicates the value is null. A zero function return value indicates the value is not null. Warning - this is the opposite of most 12dPL function return values

> ID = 469

### `Is_null2`

```c
Integer Is_null2(Real value)
```

Checks to see if the Real value is either null or negative of null. A non-zero function return value indicates the value is null or negative of null. A zero function return value indicates the value is not null or negative of null. Warning - this is the opposite of most 12dPL function return values

> ID = 7838

### `Null`

```c
void Null(Real &value)
```

This function sets the Real value to the 12d Model null-value. There is no function return value.

> ID = 470

### `Null_ht`

```c
Integer Null_ht(Dynamic_Element elements,Real height)
```

This function examines the z-values of each point for all non-Alignment strings in the Dynamic_Element elements, and if the z-value of the point equals height, the z-value is reset to the null value. General Chapter A returned value of zero indicates there were no errors in the null operation.

> ID = 407

General

### `Null_ht_range`

```c
Integer Null_ht_range(Dynamic_Element elements,Real ht_min,Real ht_max)
```

This function examines the z-values of each point for all non-Alignment strings in the Dynamic_Element elements, and if the z-value of the point is between ht_min and ht_max, the z- value is reset to the null value. A returned value of zero indicates there were no errors in the null operation.

> ID = 408

### `Reset_null_ht`

```c
Integer Reset_null_ht(Dynamic_Element elements,Real height)
```

This function resets all the null z-values of all points of non-Alignment strings in the Dynamic_Element elements, to the value height. A returned value of zero indicates there were no errors in the reset operation.

> ID = 409

General
Chapter   
5.62.4 Contour
Contour(Tin tin,Real cmin,Real cmax,Real cinc,Real cont_ref,Integer 
cont_col,Dynamic_Element &cont_de,Real bold_inc,Integer 
bold_col,Dynamic_Element &bold_de)
Name
Integer Contour(Tin tin,Real cmin,Real cmax,Real cinc,Real cont_ref,Integer cont_col,Dynamic_Element 
&cont_de,Real bold_inc,Integer bold_col,Dynamic_Element &bold_de)
Description
Contour the triangulation tin between the minimum and maximum z values cmin and cmax.
The contour increment is cinc, and cref is a z value that the contours will pass through.
ccol is the colour of the normal contours and they are added to the Dynamic_Element cont_de.
bold_inc and bold_col are the increment and colour of the bold contours respectively. If bold_inc 
is zero then no bold contour are produced.
Any bold contours are added to the Dynamic_Element bold_de.
A function return value of zero indicates the contouring was successful.
ID = 143
Tin_tin_depth_contours(Tin original,Tin new,Integer cut_colour,Integer 
zero_colour,Integer fill_colour,Real interval,Real start_level,Real end_level,Integer 
mode,Dynamic_Element &de)
Name
Integer Tin_tin_depth_contours(Tin original,Tin new,Integer cut_colour,Integer zero_colour,Integer 
fill_colour,Real interval,Real start_level,Real end_level,Integer mode,Dynamic_Element &de)
Description
Calculate depth contours (isopachs) between the triangulations original and new.
The contour increment is interval, and the range is from start_level to end_level.
cut_colour, zero_colour and fill_colour are the colours of the cut, zero and fill contours 
respectively.
If the value of mode is 
0
2d strings are produced with depth as the z-value
1
3d strings are produced with the depth contours projected onto the Tin original.
2
3d strings are produced with the depth contours projected onto the Tin new.
The new strings are added to the Dynamic_Element de.
A function return value of zero indicates the contouring was successful.
 ID = 394

General

### `Tin_tin_intersect`

```c
Integer Tin_tin_intersect(Tin original,Tin new,Integer colour,Dynamic_Element &de)
```

Calculate the intersection (daylight lines) between the triangulations original and new. The intersection lines have colour colour and are added to the Dynamic_Element de. Note This is the same as the zero depth contours projected onto either Tin original or new (mode 1 or 2) that are produced by the function Tin_tin_depth_contours. A function return value of zero indicates the intersection was successful.

> ID = 479

Tin_tin_intersect(Tin original,Tin new,Integer colour,Dynamic_Element &de,Integer 
mode)
Name
Integer Tin_tin_intersect(Tin original,Tin new,Integer colour,Dynamic_Element &de,Integer mode)
Description
Calculate the intersection (daylight lines) between the triangulations original and new.
The intersection lines have colour colour and are added to the Dynamic_Element de.
If mode is 
0
the intersection line with z = 0 (2d string) is produced
1
the full 3d intersection is created.
A function return value of zero indicates the intersection was successful.
ID = 393

General
Chapter   
5.62.5 Drape

Integer Drape(Tin tin,Model model,Dynamic_Element &draped_elts)
Name
Integer Drape(Tin tin,Dynamic_Element de, Dynamic_Element &draped_elts)
Description
Drape all the Elements in the Dynamic_Element de onto the Tin tin.
The draped Elements are returned in the Dynamic_Element draped_elts.
A function return value of zero indicates the drape was successful.
Drape(Tin tin,Dynamic_Element de, Dynamic_Element &draped_elts, Integer 
create_supers)
Name
Integer Drape(Tin tin,Dynamic_Element de, Dynamic_Element &draped_elts, Integer create_supers)
Description
Drape all the Elements in the Dynamic_Element de onto the Tin tin.
The draped Elements are returned in the Dynamic_Element draped_elts.
The resulting elements in draped_elts will be super string only if create_supers is non zero.
A function return value of zero indicates the drape was successful.
ID = 3790

Integer Face_drape(Tin tin,Model model, Dynamic_Element &face_draped_elts)
Name
Integer Face_drape(Tin tin,Dynamic_Element de,Dynamic_Element &face_draped_strings)
Description
Face drape all the Elements in the Dynamic_Element de onto the Tin tin.
The face draped Elements are returned in the Dynamic_Element face_draped_elts.
A function return value of zero indicates the face drape was successful.
ID = 145

General
Chapter   
5.62.6 Drainage
Get_drainage_intensity(Text rainfall_filename,Integer rainfall_method,Real 
frequency,Real duration,Real &intensity)
Name
Integer Get_drainage_intensity(Text rainfall_filename,Integer rainfall_method,Real frequency,Real 
duration,Real &intensity)
Description
The Rainfall Intensity information is part of a 12d Model Rainfall File (that ends in ".12dhdyro").
The Rainfall Files can be created and/or edited by the 12d Model Rainfall File Editor: 
Water->Stormwater tools->Rainfall editor.
12d Model comes with some Rainfall Files and others can be created by users. 
The Get_drainage_intensity call returns the intensity for a given rainfall method, frequency storm 
duration.
The image below are the rainfall Intensity Methods from the "AUS ACT Canberra.12dhydro" file 
loaded into the Rainfall File Editor.
durations
12d hydro
file name
intensities
IFD Table Intensity Method in the Rainfall File

General
The function arguments are:
rainfall_filename is the local name of the ".12dhydro" file to get the Intensity from.
rainfall_method is one of:
                          "IFD Table"
                          "ARR 1987"
                          "ARR 1977"
frequency is the frequency (ARI) in years
duration is the duration in minutes
12d hydro
file name
ARR 1987 Intensity Method in the Rainfall File
12d hydro
file name
ARR 1977 Intensity Method in the Rainfall File

General
Chapter   
intensity is returned and is the intensity calculated from the table given by the rainfall_method, 
frequency and the duration.
A function return value of zero indicates that the intensity was successfully returned.
A non zero function return indicates that there was an error getting the intensity.
The value of the non-zero function value indicates the type of error:
                 Error Codes
       -999  = no Drainage Analysis license
         -99  = error reading file
           -9  = no valid data found for specified method
           -8  = frequency outside valid range
           -4  = unsupported rainfall method
           -3  = error building ARR1977 storm data
           -2  = error building ARR1987 storm data
           -1  = error building IFD storm data
ID = 2209

General
Get_rainfall_temporal_patterns_enabled(Text file,Real min_freq,Real 
max_freq,Dynamic_Integer &storms,Integer &ret_num)
Name
Integer Get_rainfall_temporal_patterns_enabled(Text file,Real min_freq,Real max_freq,Dynamic_Integer 
&storms,Integer &ret_num)
Description
The Rainfall Temporal Pattern information is part of a 12d Model Rainfall File (that ends in 
".12dhdyro").
The Rainfall Files can be created and/or edited by the 12d Model Rainfall File Editor: 
Water->Stormwater tools->Rainfall editor.
12d Model comes with some Rainfall Files and others can be created by users. 
The rainfall Temporal Patterns transform the constant average rainfall to a time varied rainfall.
The Get_rainfall_temporal_patterns_enabled call returns a Dynamic_Integer list of storm numbers 
for all the enabled storm patterns in a Rainfall File. These storm numbers are used to retrieve the full 
storm data via the call

Get_rainfall_temporal_pattern(Text rainfall_filename,Integer storm_num,Integer &run,Text 
&zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real &interval,Real pattern[],Integer 
max_num,Integer &ret_num)
The image below table is the is of the rainfall Temporal Patterns from the "AUS ACT 
Canberra.12dhydro" file loaded into the Rainfall File Editor.
The function arguments are:
rainfall_filename is the local name of the ".12dhydro" file to get the temporal pattern values from.
Storm number
12d hydro
flag to say
Zone
 run storm 
file name
filter
Storm name
total length
of storm
Average Recurrence
Interval (ARI)
from
to
Temporal Patterns in the Rainfall File
or Storm ID

General
Chapter   
min_freq the From ARI value must match this argument.
max_freq the To ARI value must match this argument.
storms is a Dynamic_Integer list of storm numbers where the Run storm is selected. These 
numbers are used in the following call to retrieve the full storm data.

Get_rainfall_temporal_pattern(Text rainfall_filename,Integer storm_num,Integer &run,Text 
&zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real &interval,Real pattern[],Integer 
max_num,Integer &ret_num)
ret_num returns the actual number of storms returned
A function return value of zero indicates the data was successfully returned.
ID = 3187

General
Get_rainfall_temporal_pattern(Text rainfall_filename,Integer storm_num,Integer 
&run,Text &zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real 
&interval,Real pattern[],Integer max_num,Integer &ret_num)
Name
Integer Get_rainfall_temporal_pattern(Text rainfall_filename,Integer storm_num,Integer &run,Text 
&zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real &interval,Real pattern[],Integer 
max_num,Integer &ret_num)
Description
The Rainfall Temporal Pattern information is part of a 12d Model Rainfall File (that ends in 
".12dhdyro").
The Rainfall Files can be created and/or edited by the 12d Model Rainfall File Editor: 
Water->Stormwater tools->Rainfall editor.
12d Model comes with some Rainfall Files and others can be created by users. 
The rainfall Temporal Patterns transform the constant average rainfall to a time varied rainfall.
The Get_rainfall_temporal_pattern call returns the information for one storm from the rainfall 
Temporal Patterns in a Rainfall File.
The image below table is the is of the rainfall Temporal Patterns from the "AUS ACT 
Canberra.12dhydro" file loaded into the Rainfall File Editor.
Storm number
12d hydro
flag to say
Zone
 run storm 
file name
filter
Storm name
total length
of storm
Average Recurrence
Interval (ARI)
from
to
Temporal Patterns in the Rainfall File
or Storm ID

General
Chapter   
The function arguments are:
rainfall_filename is the local name of the ".12dhydro" file to get the temporal pattern values from.
storm_num is the number of the storm in the file. With the addition of the frequent, intermediate and 
rare temporal patterns all the storms are combined into one list in the order they appear in the editor. 
The storm number in the index on this list. 
The rest of the arguments of the call return values from the storm_num’th line of the Temporal 
Pattern table.
run returns 1 if "Run Storm" is ticked
                   0 if "Run Storm" is not ticked
zone_filter returns the value from "Zone Filter" 
duration returns the total length of the storm
from_ari returns the "from ARI" (Average Recurrence Interval, also known as the Frequency or 
Return Period)
to_ari returns the "to ARI" (Average Recurrence Interval, also known as the Frequency or Return 
Period)
interval returns the time interval for each of the values in the temporal patterns table (which give the 
percentage of the total storm that occurs in that period)
pattern[ ] is an array to return the values of the temporal pattern
max_num is the maximum size of the array pattern[]
ret_num returns the actual number of values returned in pattern
A function return value of zero indicates the data was successfully returned.
ID = 2405
interval
temporal pattern values
file name
Temporal Pattern Table from the Rainfall File

General
Get_rainfall_temporal_pattern(Text rainfall_filename,Text storm_name,Integer 
&run,Text &zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real 
&interval, Real pattern[],Integer max_num,Integer &ret_num)
Name
Integer Get_rainfall_temporal_pattern(Text rainfall_filename,Text storm_name,Integer &run,Text 
&zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real &interval,Real pattern[],Integer 
max_num,Integer &ret_num) 
Description
The Rainfall Temporal Pattern information is part of a 12d Model Rainfall File (that ends in 
".12dhdyro").
The Rainfall Files can be created and/or edited by the 12d Model Rainfall File Editor: 
Water->Stormwater tools->Rainfall editor.
12d Model comes with some Rainfall Files others can be created by users. 
The rainfall Temporal Patterns give the mathematical description of one or more storms.
The Get_rainfall_temporal_pattern call returns the information for one storm from the rainfall 
Temporal Patterns in a Rainfall File.
The image of the rainfall Temporal Patterns from the "AUS ACT Canberra.12dhydro" file loaded into 
the Rainfall File Editor is given in  Get_rainfall_temporal_pattern(Text rainfall_filename,Integer 
storm_num,Integer &run,Text &zone_filter,Real &duration,Real &from_ari,Real &to_ari,Real 
&interval,Real pattern[],Integer max_num,Integer &ret_num).
The difference between the two calls is that in the other call, the required storm in the Temporal 
Patterns is given by a line number whereas in this function the storm is found by giving a storm ID 
(storm name).
storm_name is the name (Storm ID) of the required storm in the file. The Storm ID is will give the 
line in the Temporal Patterns to return the data from. 
All the return values are the same as for the documentation in  Get_rainfall_temporal_pattern(Text 
rainfall_filename,Integer storm_num,Integer &run,Text &zone_filter,Real &duration,Real 
&from_ari,Real &to_ari,Real &interval,Real pattern[],Integer max_num,Integer &ret_num).
A function return value of zero indicates the data was successfully returned.
 ID = 2406
Drainage_join_strings(Element string_us,Element string_ds,Integer mode,Element 
&joined_string)
Name
Integer Drainage_join_strings(Element string_us,Element string_ds,Integer mode,Element &joined_string) 
Description
Join a upstream drainage string string_us with a downstream drainage string string_ds and set the 
result in a new drainage string joined_string. 
If mode is 0, then the joint starts with the downstream; if mode is 1, then the joint starts with the 
upstream.
Return code
-1 = ERROR: invalid drainage string
-2 = ERROR: cannot join string to itself
-3 = ERROR: string has no MHs

General
Chapter   
-4 = ERROR: no sewer license
-5 = ERROR: opposing flow directions
-6 = ERROR: try reversing pick order
-7 = ERROR: cannot reset nodes (drop point failed)
-11 = ERROR: string 1 not a drainage string
-12 = ERROR: string 2 not a drainage string
-13 = ERROR: mode is not 0 or 1
A function return value of zero indicates the call was successfully returned.
 ID = 5424
Drainage_split_string(Element input,Integer at_node,Element &output1,Element 
&output2)
Name
Integer Drainage_split_string(Element input,Integer at_node,Element &output1,Element &output2)
Description
Split a drainage string input at a given node at_node and set the result in two new drainage strings 
output1 output2. 
A function return value of zero indicates the call was successfully returned.
 ID = 7762

General
5.62.7 Volumes
See 5.62.7.1 End Area
See 5.62.7.2 Exact Volumes

General
Chapter   
5.62.7.1 End Area
Volume(Tin tin_1,Real ht,Element poly,Real ang,Real sep,Text report_name,Integer 
report_mode,Real &cut,Real &fill,Real &balance)
Name
Integer Volume(Tin tin_1,Real ht,Element poly,Real ang,Real sep,Text report_name,Integer report_mode,Real 
&cut,Real &fill,Real &balance)
Description
Calculate the volume from a tin tin_1 to a height ht inside the polygon poly using the end area 
method. The sections used for the end area calculations are taken at the angle ang with a 
separation of sep.
A report file is created called report_name which contains cut, fill and balance information.
If report_mode is equal to
0
only the total cut, fill and balance is given
1
the cut and fill value for every section is given.
If the file report_name is blank (""), no report is created.
The variables cut, fill and balance return the total cut, fill and balance.
A function return value of zero indicates the volume calculation was successful.
ID = 147
Volume(Tin tin_1,Tin tin_2,Element poly,Real ang,Real sep,Text report_name,Integer 
report_mode,Real &cut,Real &fill,Real &balance)
Name
Integer Volume(Tin tin_1,Tin tin_2,Element poly,Real ang,Real sep,Text report_name,Integer 
report_mode,Real &cut,Real &fill,Real &balance)
Description
Calculate the volume from tin tin_1 to tin tin_2 inside the polygon poly using the end area method. 
The sections used for the end area calculations are taken at the angle ang with a separation of sep.
A report file is created called report_name which contains cut, fill and balance information.
If report_mode is equal to
0
only the total cut, fill and balance is given
1
the cut and fill value for every section is given.
If the file report_name is blank (""), no report is created.
The variables cut, fill and balance return the total cut, fill and balance.
A function return value of zero indicates the volume calculation was successful.
ID = 148

General
5.62.7.2 Exact Volumes

### `Volume_exact`

```c
Integer Volume_exact(Tin tin_1,Real ht,Element poly,Real &cut,Real &fill,Real &balance)
```

Calculate the volume from a tin tin_1 to a height ht inside the polygon poly using the exact method. The variables cut, fill and balance return the total cut, fill and balance. A function return value of zero indicates the volume calculation was successful.

> ID = 149

### `Volume_exact`

```c
Integer Volume_exact(Tin tin_1,Tin tin_2,Element poly,Real &cut,Real &fill,Real &balance)
```

Calculate the volume between tin tin_1 and tin tin_2 inside the polygon poly using the exact method. The variables cut, fill and balance return the total cut, fill and balance. A function return value of zero indicates the volume calculation was successful.

> ID = 150

General
Chapter   
5.62.8 Interface
Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real sep,Real 
search_dist,Integer side,Element &interface_string)
Name
Integer Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real sep,Real search_dist,Integer 
side,Element &interface_string)
Description
Perform an interface to the tin tin along the Element string.
Use cut and fill slopes of value cut_slope and fill_slope and a distance between sections of sep. 
The units for slopes is 1:x.
Search to a maximum distance search_dist to find an intersection with the tin.
If side is negative, the interface is made to the left hand side of the string.
If side is positive, the interface is made to the right hand side of the string.
The resulting string is returned as the Element interface_string.
A function return value of zero indicates the interface was successful.
ID = 151
Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real sep,Real 
search_dist,Integer side, Element &interface_string,Dynamic_Element &tadpoles)
Name
Integer Interface(Tin tin,Element string,Real cut_slope,Real fill_slope,Real sep,Real search_dist,Integer 
side,Element &interface_string,Dynamic_Element &tadpoles)
Description
Perform the interface as given in the previous function with the addition that slope lines are created 
and returned in the Dynamic_Element tadpoles.
A function return value of zero indicates the interface was successful.
ID = 152

General
5.62.9 Templates

### `Template_exists`

```c
Integer Template_exists(Text template_name)
```

Checks to see if a template with the name template_name exists in the project. A non-zero function return value indicates the template does exist. A zero function return value indicates that no template of that name exists. Warning - this is the opposite of most 12dPL function return values

> ID = 201

### `Get_project_templates`

```c
Integer Get_project_templates(Dynamic_Text &template_names)
```

Get the names of all the templates in the project. The dynamic array of template names is returned in the Dynamic_Text template_names. A function return value of zero indicates success.

> ID = 233

### `Template_rename`

```c
Integer Template_rename(Text original_name,Text new_name)
```

Change the name of the Template original_name to the new name new_name. A function return value of zero indicates the rename was successful.

> ID = 424

### `Delete_all_templates`

```c
Integer Delete_all_templates())
```

Delete all templates from the project. A function return value of zero indicates the rename was successful.

> ID = 3915

General
Chapter   
5.62.10 Applying Templates

### `Apply`

```c
Integer Apply(Real xpos,Real ypos,Real zpos,Real ang,Tin tin,Text template,Element &xsect)
```

Applies the templates template at the point (xpos,ypos,zpos) going out at the plan angle, ang. The Tin tin is used as the surface for any interface calculations and the calculated section is returned as the Element xsect. A function return value of zero indicates the apply was successful.

> ID = 399

Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text 
left_template,Text right_template,Real &cut,Real &fill,Real &balance)
Name
Integer Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text left_template,Text 
right_template,Real &cut,Real &fill,Real &balance)
Description
Applies the templates left_template and right_template to the Element string going from start 
chainage start_ch to end chainage end_ch with distance sep between each section. The Tin tin is 
used as the surface for any interface calculations.
The variables cut, fill and balance return the total cut, fill and balance for the apply.
A function return value of zero indicates the apply was successful.
ID = 195
Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text 
left_template,Text right_template,Real &cut,Real &fill,Real &balance,Text report)
Name
Integer Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text left_template,Text 
right_template,Real &cut,Real &fill,Real &balance,Text report)
Description
Applies templates as for the previous function with the addition of a report being created with the 
name report.
A function return value of zero indicates the apply was successful. 
ID = 196
Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text 
left_template,Text right_template,Real &cut,Real &fill,Real &balance,Text 
report,Integer do_strings,Dynamic_Element &strings,Integer 
do_sections,Dynamic_Element &sections,Integer section_colour,Integer 
do_polygons,Dynamic_Element &polygons,Integer do_differences,Dynamic_Element 
&diffs,Integer difference_colour)

General
Name
Integer Apply(Element string,Real start_ch,Real end_ch,Real sep,Tin tin,Text left_template,Text 
right_template,Real &cut,Real &fill,Real &balance,Text report,Integer do_strings,Dynamic_Element 
&strings,Integer do_sections,Dynamic_Element &sections,Integer section_colour,Integer 
do_polygons,Dynamic_Element &polygons,Integer do_differences,Dynamic_Element &diffs,Integer 
difference_colour)
Description
Applies templates as for the previous function with the additions:
If do_strings is non-zero, the strings are returned in strings.
If do_sections is non-zero, design sections of colour section_colour are returned in sections.
If do_polygons is non-zero, polygons are returned in polygons.
If do_differences is non-zero, difference sections of colour difference_colour are returned in 
diffs.
A function return value of zero indicates the apply was successful.
ID = 197
Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real 
&cut,Real &fill,Real &balance)
Name
Integer Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real &cut,Real 
&fill,Real &balance)
Description
Applies the templates as specified in the file many_template_file to the Element string with 
distance sep between each section. The Tin tin is used as the surface for any interface calculations.
The variables cut, fill and balance return the total cut, fill and balance for the apply.
A function return value of zero indicates success. 
ID = 198
Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real 
&cut_volume,Real &fill_volume,Real &balance_volume,Text report)
Name
Integer Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real &cut_volume,Real 
&fill_volume,Real &balance_volume,Text report)
Description
Applies templates as for the previous function with the addition of a report being created with the 
name report.
A function return value of zero indicates success.
ID = 199
Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real 
&cut,Real &fill,Real &balance,Text report,Integer do_strings,Dynamic_Element 
&strings,Integer do_sections,Dynamic_Element &sections,Integer 
section_colour,Integer do_polygons,Dynamic_Element &polygons,Integer 
do_difference,Dynamic_Element &diffs,Integer difference_colour)

General
Chapter   
Name
Integer Apply_many(Element string,Real separation,Tin tin,Text many_template_file,Real &cut,Real 
&fill,Real &balance,Text report,Integer do_strings,Dynamic_Element &strings,Integer 
do_sections,Dynamic_Element &sections,Integer section_colour,Integer do_polygons,Dynamic_Element 
&polygons,Integer do_difference,Dynamic_Element &diffs,Integer difference_colour)
Description
Applies templates as for the previous function with the additions:
If do_strings is non-zero, the strings are returned in strings.
If do_sections is non-zero, design sections of colour section_colour are returned in sections.
If do_polygons is non-zero, polygons are returned in polygons.
If do_differences is non-zero, difference sections of colour difference_colour are returned in 
diffs.
A function return value of zero indicates the apply was successful. 
ID = 200

General
5.62.11 Strings Edits

### `String_reverse`

```c
Integer String_reverse(Element in,Element &out)
```

This functions creates a reversed copy of the string Element in and the reversed string is returned in out. That is, the chainage of string out starts at the end of the original string in and goes to the beginning of the original string in. If successful, the new reversed string is returned in Element out. A function return value of zero indicates the reverse was successful.

> ID = 1134

### `Extend_string`

```c
Integer Extend_string(Element elt,Real before,Real after,Element &newelt)
```

Extend the start and end of the string in Element elt. The start of the string is extended by Real before. The end of the string is extended by Real after. If successful, the new element is returned in Element newelt. Note that even when either before or after is zero, the two new points still being added to the new element newelt (as duplicated of the old start/end). A function return value of zero indicates the chainage was returned successfully.

> ID = 664

Clip_string(Element string,Real chainage1,Real chainage2, Element 
&left_string,Element &mid_string,Element &right_string)
Name
Integer Clip_string(Element string,Real chainage1,Real chainage2, Element &left_string,Element 
&mid_string,Element &right_string)
Description
Clip a string about 2 chainages for the Element string. This will result in 3 new strings being 
created.
The part that exists before Real chainage1 is returned in Element left_string. 
The part that exists after Real chainage2 is returned in Element right_string. 
The part that exists between Real chainage1 and Real chainage2 is returned in Element 
mid_string.
A function return value of zero indicates the clip was successful. 
Note
If the string is closed, right_string is not used.
If chainage1 is on or before the start of the string, left_string is not used.

General
Chapter   
If chainage2 is on or after the end of the string, right_string is not used.
If chainage1 is greater than chainage2, they are first swapped.
ID = 542
Clip_string(Element string,Integer direction,Real chainage1,Real chainage2,Element 
&left_string,Element &mid_string,Element &right_string)
Name
Integer Clip_string(Element string,Integer direction,Real chainage1,Real chainage2,Element 
&left_string,Element &mid_string,Element &right_string)
Description
Clip a string about 2 chainages for the string Element string. This will result in 3 new strings being 
created. The clipped parts are returned relative to Integer direction. If direction is negative, string 
is first reversed before being clipped.
The part that exists before Real chainage1 is returned in Element left_string. 
The part that exists after Real chainage2 is returned in Element right_string. 
The part that exists between Real chainage1 and Real chainage2 is returned in Element 
mid_string.
A function return value of zero indicates the clip was successful. 
Note
If the string is closed, right_string is not used.
If chainage1 is on or before the start of the string, left_string is not used.
If chainage2 is on or after the end of the string, right_string is not used.
If chainage1 is greater than chainage2, they are first swapped. 
ID = 549
Polygons_clip(Integer npts_clip,Real xclip[],Real yclip[],Integer npts_in,Real 
xarray_in[],Real yarray_in [],Real zarray_in [],Integer &npts_out,Real 
xarray_out[],Real yarray_out[],Real yarray_out[])
Name 
 Integer Polygons_clip(Integer npts_clip,Real xclip[],Real yclip[],Integer npts_in,Real xarray_in[],Real 
yarray_in [],Real zarray_in [],Integer &npts_out,Real xarray_out[],Real yarray_out[],Real yarray_out[])
Description
ID = 1440

### `Split_string`

```c
Integer Split_string(Element string,Real chainage,Element &string1,Element &string2)
```

Split a string about a chainage for ELement string This will result in 2 new strings being created. The part that exists before Real chainage is returned in Element string1. The part that exists after Real chainage is returned in Element string2. General A function return value of zero indicates the split was successful.

> ID = 543

Join_strings(Element string1,Real x1,Real y1,Real z1,Element string2,Real x2,Real 
y2,Real z2,Element &joined_string)
Name
Integer Join_strings(Element string1,Real x1,Real y1,Real z1,Element string2,Real x2,Real y2,Real 
z2,Element &joined_string)
Description
Join the 2 strings Element string1 and Element string2 together to form 1 new string. The end of 
string1 closest to x1,y1,z1 is joined to the end of string2 closest to x2,y2,z2.
The joined string is returned in Element joined_string.
A function return value of zero indicates the interface was successful. 
Note
If the ends joined are no coincident, then a line between the ends is inserted.
The joined string is always of a type that preserves as much as possible about the original strings.
If you join 2 strings of the same type, the joined string is of the same type.
ID = 544
Rectangle_clip(Real x1,Real y1,Real x2,Real y2,Integer npts_in,Real xarray_in [],Real 
yarray_in [],Integer &npts_out,Real xarray_out[],Real yarray_out[])
Name 
 Integer Rectangle_clip(Real x1,Real y1,Real x2,Real y2,Integer npts_in,Real xarray_in [],Real yarray_in 
[],Integer &npts_out,Real xarray_out[],Real yarray_out[])
Description
<no description>
ID = 1438

### `Super_offset`

```c
Integer Super_offset(Element super,Real offset,Integer mode,Element &super_offset)
```

Offset the super Element super by Real offset; assign the result to super Element super_offset. A return value of zero indicates the function call was successful. The valid values for mode are: 0: joins ends of resulting segments by lines 1: intersects resulting segments 2: fillets any pair of resulting segments with change of direction 3: dual clipping 4: clips any crossing part

> ID = 2861

General
Chapter   

General
5.62.12 Place Meshes
Place_mesh(Real x,Real y,Real z,Integer source_type,Text source_name,Vector3 
offset,Vector3 rotate,Vector3 scale,Element &mesh_string)
Name
Integer Place_mesh(Real x,Real y,Real z,Integer source_type,Text source_name,Vector3 offset,Vector3 
rotate,Vector3 scale,Element &mesh_string)
Description
This call places a mesh on the vertex of a new super string, at the co-ordinate specified by 
parameters x, y, z.
The source_type determines where the mesh will be loaded from: 
     source_type = 0 for the Mesh Library
                        ,    1 for from a file
The source_name specifies the name of the mesh in the library or file, as defined by the 
source_type parameter.
You can also set any additional offset, rotation or scale parameters in the offset, rotate or scale 
vectors. If you are not intending to set additional parameters, you must set them to at least default 
values:
   offset(0.0, 0.0, 0.0)
   rotate(0.0, 0.0, 0.0)
   scale(1.0, 1.0, 1.0);
The created super string will be stored in the element mesh_string.
This function returns 0 if it succeeds and non zero if it fails.
ID = 2803
Place_mesh(Real x,Real y,Real z,Text mesh_name,Vector3 offset,Vector3 
rotate,Vector3 scale,Tin anchor_tin,Element &mesh_string)
Name
Integer Place_mesh(Real x,Real y,Real z,Text mesh_name,Vector3 offset,Vector3 rotate,Vector3 scale,Tin 
anchor_tin,Element &mesh_string)
Description
This call places a mesh from the mesh library on the vertex of a new super string, at the co-ordinate 
specified by parameters x, y, z and anchors it to the tin anchor_tin.
The Text mesh_name specifies the name of the mesh in the library.
You can also set any additional offset, rotation or scale parameters in the offset, rotate or scale 
vectors. If you are not intending to set additional parameters, you must set them to at least default 
values:
   offset(0.0, 0.0, 0.0)
   rotate(0.0, 0.0, 0.0)
   scale(1.0, 1.0, 1.0);
The created super string will be stored in the Element mesh_string.
This function returns 0 if it succeeds and non zero if it fails.
ID = 2804

General
Chapter   
5.62.13 Image

### `Get_image_size`

```c
Integer Get_image_size(Text filename,Integer &width,Integer &height)
```

Read the image from the file named filename; return its size as number of pixels in width and height. A return value of zero indicates the function call was successful.

> ID = 2634

General
5.62.14 Boundary polygon
Boundary_polygon(Dynamic_Element list,Real seed_x,Real seed_y,Real distance, 
Element &result) 
Name
Integer Boundary_polygon(Dynamic_Element list,Real seed_x,Real seed_y,Real distance,Element &result) 
Description
Boundary_polygon works on the plan projection of all the strings in list withing the radius distance 
of the seed point (seed_x, seed_y), and if possible, creates a closed polygon from the parts of the 
strings surrounding the seed point.
A straight line must be able to be drawn from the seed point to the lines/arcs that could be used in 
the surrounding strings.
A return value of zero indicates the function call was successful.
ID = 1796
seed point is inside
the polygon to be created
Created polygon
Creating a Polygon by Seed Point Inside the Polygon

General
Chapter   
5.62.15 Stack trace
Analysing the stack trace is sometimes effective way to debug running macros.

### `Print_stack_trace`

```c
void Print_stack_trace()
```

Print the stack trace for the running macro to the output window. The stack trace is a list of the line number followed by the line contents of the macro code.

> ID = 2720

### `Get_stack_trace`

```c
Integer Get_stack_trace(Dynamic_Integer &stack)
```

Assign the list of line numbers of the running macro stack trace to Dynamic_Integer stack. A return value of zero indicates the function call was successful.

> ID = 2721

### `Print_stack_trace`

```c
void Print_stack_trace(Text msg)
```

Print the Text msg to the output window. Then print the stack trace for the running macro to the output window. The stack trace is a list of the line number followed by the line contents of the macro code.

> ID = 2744

General


---

## Utilities (§5.63)

String and text manipulation utilities, file path helpers, environment variable access,
sorting helpers, and miscellaneous utility functions.

Utilities
Chapter   
5.63 Utilities
See 5.63.1 3D Chainage
See 5.63.2 Transformation
See 5.63.3 Chains
See 5.63.4 Convert
See 5.63.5 Cuts Through Strings
See 5.63.6 Factor
See 5.63.7 Fence
See 5.63.8 Filter
See 5.63.9 Head to Tail
See 5.63.10 Helmert Transformation
See 5.63.11 Polygon Centroid and Medial axis
See 5.63.12 Rotate
See 5.63.13 Share Status
See 5.63.14 Swap XY
See 5.63.15 Translate
See 5.63.16 NMEA
See 5.63.17 Water Defaults
See 5.63.18 Miscellaneous
See 5.63.19 Macro Miscellaneous - Internal use only

Utilities
5.63.1 3D Chainage

### `Enable_3d`

```c
Integer Enable_3d(Element super_alignment)
```

Enable 3D chainage calculation for a valid super alignment super_alignment. A return value of 2 indicates the input element is not valid. A return value of 3 indicates the input element is not a super alignment. A return value of 5 indicates the vertical part of the input super alignment is not valid. A return value of 6 indicates the horizontal part of the input super alignment is not valid. A return value of 7 indicates the input super alignment has no vertical part. A return value of zero indicates the function call was successful.

> ID = 3011

### `Get_start_chainage_3d`

```c
Integer Get_start_chainage_3d(Element super_alignment,Real &ch_3d)
```

Get start 3D chainage ch_3d of a super alignment super_alignment. Note: the Enable_3d needed to be call for the super alignment before making this call. A return value of zero indicates the function call was successful.

> ID = 3012

### `Get_end_chainage_3d`

```c
Integer Get_end_chainage_3d(Element super_alignment,Real &ch_3d)
```

Get end 3D chainage ch_3d of a super alignment super_alignment. Note: the Enable_3d needed to be call for the super alignment before making this call. A return value of zero indicates the function call was successful.

> ID = 3013

### `Get_3d_length`

```c
Integer Get_3d_length(Element super_alignment,Real &length_3d)
```

Get 3D length length_3d of a super alignment super_alignment. Utilities Chapter Note: the Enable_3d needed to be call for the super alignment before making this call. A return value of zero indicates the function call was successful.

> ID = 3014

### `Chainage_2d_to_3d`

```c
Integer Chainage_2d_to_3d(Element super_alignment,Real ch_2d,Real &length_3d)
```

Calculate 3D length length_3d of a super alignment super_alignment from 2D chainage ch_2d. Note: the Enable_3d needed to be call for the super alignment before making this call. A return value of zero indicates the function call was successful.

> ID = 3015

### `Chainage_3d_to_2d`

```c
Integer Chainage_3d_to_2d(Element super_alignment,Real length_3d,Real &ch_2d)
```

Calculate 2D chainage ch_2d of a super alignment super_alignment from 3D length length_3d. Note: the Enable_3d needed to be call for the super alignment before making this call. A return value of zero indicates the function call was successful.

> ID = 3016

Get_position_ex_3d(Element super_alignment,Real length_3d,Real offset,Real 
dz,Real &x,Real &y,Real &z,Real &dir,Real &radius,Real &grade) 
Name
Integer Get_position_ex_3d(Element super_alignment,Real length_3d,Real offset,Real dz,Real &x,Real 
&y,Real &z,Real &dir,Real &radius,Real &grade) 
Description
WARNING - this is NOT an ex version of get position call; and also the return value for &dir is the 
opposite (zero minus the correct number) of the normal direction.
Get xyz-coordinate x y z, direction dir, radius radius, grade grade of a point based on a super 
alignment super_alignment, 3D length length_3d, offset offset, change in z dz.
Note: the Enable_3d needed to be call for the super alignment before making this call.
A return value of zero indicates the function call was successful.
ID = 3017
Get_position_3d(Element string,Real ch_3d,Real offset,Real dz,Real &x,Real &y,Real 
&z,Real &dir,Real &radius,Real &grade) 
Name
Integer Get_position_3d(Element string,Real ch_3d,Real offset,Real dz,Real &x,Real &y,Real &z,Real 
&dir,Real &radius,Real &grade) 

Utilities
Description
Get xyz-coordinate x y z, direction dir, radius radius, grade grade of a point based on a super 
alignment string, 3D chainage ch_3d, offset offset, change in z dz.
Note: the Enable_3d needed to be call for the super alignment before making this call.
A return value of zero indicates the function call was successful.
ID = 3381
Drop_point_3d(Element super_alignment,Real xd,Real yd,Real zd,Real &x,Real 
&y,Real &z,Real &l,Real &o,Real &dir,Real &radius,Real &grade)
Name
Integer Drop_point_3d(Element super_alignment,Real xd,Real yd,Real zd,Real &x,Real &y,Real &z,Real 
&l,Real &o,Real &dir,Real &radius,Real &grade)
Description
Get xyz-coordinate x y z, 3d length l, offset o, direction dir, radius radius, grade grade of the 
dropped point from xyz-coordinate xd yd zd to a super alignment super_alignment.
Note: the Enable_3d needed to be call for the super alignment before making this call.
A return value of zero indicates the function call was successful.
ID = 3018
General information about different types of chainage drop point
When a point is dropped to a string there are 4 possible drop types:
(a)
In almost all conventional design we only use the one type - a vertical drop to the string's 
vertical alignment with a 2d chainage.
Vertical drop, chainage 2d
For a convention road alignment where the design chainages are all 2d, the perpendicular 

Utilities
Chapter   
drop, 2d chainage is ideal.
(b)
In real world circumstances heights must often be considered in respect to the grade of the 
reference string to maintain clearances, e.g. tunnels and overhead obstructions such as 
bridges. In these case it is necessary to drop the point perpendicularly to the reference string's 
vertical alignment. 
Perpendicular drop, chainage 2d
(c)
For many mining application or for steep shafts the pure '3d' model, perpendicular drop, 3d 
chainage is necessary.
Perpendicular drop, chainage 3d

Utilities
(d)
For completeness a 4th drop type is provided which unlikely to be used in any real world 
scenario, vertical drop, 3d chainage.
Vertical drop, chainage 3d
(e)
Plumb z difference vs square z difference

Utilities
Chapter   
There are four calls in total offering similar functionality.
1. Tunnel Profile 3d
2. Tunnel Profile 3d Extended
3. Tunnel Profile 3d Trimesh
4. Tunnel Profile 3d Trimesh Extended
The following decription applied for all tunnel profile 3D calls (to be completed)
General Process:
These calls are meant to expose similar functionality to that used by the 12dField Setout Tunnel 
routine.
All calls provide results for a particular tunnel definition given by the tunnel_def parameter.  The 
trimesh calls allow for an additional trimesh to also be specified, with the results to that trimesh also 
being calculated and returned.  These are typically used for thickness or depth calculations.  The 
extended calls provide additional results for the various chainage drop modes (combinations of 
vertical or perpendicular drop and 2d or 3d chainages).
The process for calculation is as follows:
1. Each coordinate given by point_x, point_y and point_z is dropped to the reference string, ref_str, 

Utilities
using the drop mode from the tunnel definition, tunnel_def. 
2. The reference string chainage is calculated as pd_ref_chg.  The chainage mode (2d or 3d) is also 
taken from the tunnel definition, tunnel_def.
3. The tunnel definition, tunnel_def, is sectioned at the reference string chainage, pd_ref_chg.  The 
section is cut in the same mode as the drop mode specified in the tunnel definition and used for the 
point drop so the original point_x/point_y/point_z is on the section plane.
4. The point coordinate is then dropped perpendicularly to the sectioned tunnel (on the section 
plane).
5. Values are calculated from the section result.
For the calls using an additional trimesh, given by trimesh, the inner_extent and outer_extent 
parameters must be provided.  These are signed offsets (signed relative to the tunnel profile 
direction) from the tunnel definition.  They are used to create a 3d line perpendicular to the tunnel 
definition (a 3d 'ray') to intersect the trimesh. These offsets need to be set by the macro author to 
ensure the ray intersects the trimesh once and only once.  If the ray does not intersect the trimesh 
then the trimesh offset will not be returned. If the ray intersects the trimesh more than once, then 
only the first intersection will be returned.
Input Parameters:
Element ref_str Reference string. Should be a Super Alignment with valid 3d 
geometry.
Text tunnel_def tunnel definition, a definition describing the geometry of a tunnel or 
any shape in general along a reference string. The definition can be stored either in a text file, 
extension ".12d_tunnel" or as an attribute on the reference string under the group 
"12d_tunnel_definitions".
Dynamic_Real point_x Set of x ordinates for which to calculate the results
Dynamic_Real point_y Set of y ordinates for which to calculate the results
Dynamic_Real point_z Set of z ordinates for which to calculate the results
Element trimesh Additional trimesh element from which to calculate results.
Real inner_extent Signed offset from the tunnel definition for the intersection with the 
additional trimesh.
Real outer_extent Signed offset from the tunnel definition for the intersection with the 
additional trimesh.
Output Parameters:
Each result corresponds to the input point_x, point_y and point_z values dropped onto the tunnel 
profile.
Dynamic_Real e_tun_ele_name      tunnel element name, each profile is made up of a series of 
elements, straights and arcs, each element has a unique name to identify it
Dynamic_Real e_tun_ele_idx       tunnel element index, the 0 based index of the element in the 
profile
Dynamic_Real e_tun_ele_dist      tunnel element distance, the distance along a tunnel element
Dynamic_Real e_tun_ele_per       tunnel element percentage, the distance along a tunnel 
element expressed as a percentage between 0.0 and 1.0, not 0 to 100%..
Dynamic_Real e_tun_ele_dir       tunnel element direction, the instantaneous direction of the 

Utilities
Chapter   
current point on the tunnel element, (as an angle in radians).
Dynamic_Real e_tun_ele_prev_dir  tunnel element previous direction, the instantaneous 
direction at the end of the previous tunnel element, (as an angle in radians).
Dynamic_Real e_tun_ele_next_dir  tunnel element next direction, the instantaneous direction at 
the start of the following tunnel element, (as an angle in radians)
Dynamic_Real e_tun_ele_radius    tunnel element radius, the signed radius of the current 
element, negative if left, null if no radius.
Dynamic_Real e_tun_ele_os tunnel element offset, the signed offset of the point from the 
tunnel element, negative if left
Dynamic_Real e_tun_prf_ch tunnel profile chainage, the distance to the dropped point from 
the start of the profile.
Dynamic_Real e_ex in section the offset from the centreline of the point on the current 
element, negative if left
Dynamic_Real e_ey in section the height difference from the centreline of the point on 
the current element, negative if under
Dynamic_Real e_ez not yet used, always null
Dynamic_Integer     pd_status_2d the status of the 2d drop of the point to the reference string, 
both drops are always performed even if the tunnel is a 2d definition.
There are 3 possible return values.
1 – the drop was successful
4 – the drop was successful but to non-tangential horizontal or vertical elements
5 – the drop was unsuccessful.
Dynamic_Integer     pd_status_3d the status of the 3d drop of the point to the reference string, 
both drops are always performed even if the tunnel is a 2d definition.
There are 3 possible return values.
1 – the drop was successful
4 – the drop was successful but to non-tangential horizontal or vertical elements
5 – the drop was unsuccessful.
Dynamic_Real pd_dist_3d not yet used, always null
Dynamic_Real pd_dist_2d not yet used, always null
Dynamic_Real pd_sqr_vt_ch      link to perpendicular drop, chainage 3d 
Dynamic_Real pd_plm_vt_ch     link to vertical drop, chainage 3d
Dynamic_Real pd_sqr_hz_ch     link to perpendicular drop, chainage 2d
Dynamic_Real pd_plm_hz_ch    link to vertical drop, chainage 2d
Dynamic_Real pd_ref_ch the chainage based on the tunnel definition settings
Dynamic_Real pd_sqr_zd square z difference, the height difference to the centreline of 
the 3d drop
Dynamic_Real pd_sqr_di distance from the point to drop to the perpendicular drop point
Dynamic_Real pd_plm_zd plumb z difference, the height difference to the centreline of 
the 2d drop
Dynamic_Real pd_ref_zd square z difference based on the tunnel definition settings
Dynamic_Real pd_plm_os horizontal offset from the centreline at the vertical drop point

Utilities
Dynamic_Real pd_sqr_os horizontal offset from the centreline at the perpendicular drop 
point
Dynamic_Real pd_ref_os horizontal offset from the centreline based on the tunnel 
definition
Dynamic_Real pd_cl_grd instantaneous grade of the reference string at the dropped 
point based on the tunnel definition
Dynamic_Real trimesh_offset      offset of the trimesh from the dropped point perpendicular to 
the tunnel profile
Text message Error or status messages.
Tunnel_profile_3d(Element ref_str,Text tunnel_def,Dynamic_Real 
point_x,Dynamic_Real point_y,Dynamic_Real point_z,Dynamic_Text 
&e_tun_ele_name,Dynamic_Integer &e_tun_ele_idx,Dynamic_Real 
&e_tun_ele_dist,Dynamic_Real &e_tun_ele_per,Dynamic_Real 
&e_tun_ele_dir,Dynamic_Real &e_tun_ele_prev_dir,Dynamic_Real 
&e_tun_ele_next_dir,Dynamic_Real &e_tun_ele_radius,Dynamic_Real 
&e_tun_ele_os,Dynamic_Real &e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real 
&e_ey,Dynamic_Real &e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_dist_3d,Dynamic_Real 
&pd_dist_2d,Dynamic_Real &pd_sqr_vt_ch,Dynamic_Real 
&pd_plm_vt_ch,Dynamic_Real &pd_sqr_hz_ch,Dynamic_Real 
&pd_plm_hz_ch,Dynamic_Real &pd_ref_ch,Dynamic_Real 
&pd_sqr_zd,Dynamic_Real &pd_sqr_di,Dynamic_Real &pd_plm_zd,Dynamic_Real 
&pd_ref_zd,Dynamic_Real &pd_plm_os,Dynamic_Real &pd_sqr_os,Dynamic_Real 
&pd_ref_os,Dynamic_Real &pd_cl_grd,Text &message)
Name
Integer Tunnel_profile_3d(Element ref_str,Text tunnel_def,Dynamic_Real point_x,Dynamic_Real 
point_y,Dynamic_Real point_z,Dynamic_Text &e_tun_ele_name,Dynamic_Integer 
&e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real &e_tun_ele_per,Dynamic_Real 
&e_tun_ele_dir,Dynamic_Real &e_tun_ele_prev_dir,Dynamic_Real &e_tun_ele_next_dir,Dynamic_Real 
&e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real &e_tun_prf_ch,Dynamic_Real 
&e_ex,Dynamic_Real &e_ey,Dynamic_Real &e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_dist_3d,Dynamic_Real &pd_dist_2d,Dynamic_Real 
&pd_sqr_vt_ch,Dynamic_Real &pd_plm_vt_ch,Dynamic_Real &pd_sqr_hz_ch,Dynamic_Real 
&pd_plm_hz_ch,Dynamic_Real &pd_ref_ch,Dynamic_Real &pd_sqr_zd,Dynamic_Real 
&pd_sqr_di,Dynamic_Real &pd_plm_zd,Dynamic_Real &pd_ref_zd,Dynamic_Real 
&pd_plm_os,Dynamic_Real &pd_sqr_os,Dynamic_Real &pd_ref_os,Dynamic_Real &pd_cl_grd,Text 
&message)
Description
Some warning and error message would be set to the Text message.
A return value of zero indicates the function call was successful.
ID = 3531
Tunnel_profile_3d(Element ref_str,Text tunnel_def,Dynamic_Real 
point_x,Dynamic_Real point_y,Dynamic_Real point_z,Dynamic_Text 

Utilities
Chapter   
&e_tun_ele_name,Dynamic_Integer &e_tun_ele_idx,Dynamic_Real 
&e_tun_ele_dist,Dynamic_Real &e_tun_ele_per,Dynamic_Real 
&e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real 
&e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real &e_ey,Dynamic_Real 
&e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_ref_ch,Text &message)
Name
Integer Tunnel_profile_3d(Element ref_str,Text tunnel_def,Dynamic_Real point_x,Dynamic_Real 
point_y,Dynamic_Real point_z,Dynamic_Text &e_tun_ele_name,Dynamic_Integer 
&e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real &e_tun_ele_per,Dynamic_Real 
&e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real &e_tun_prf_ch,Dynamic_Real 
&e_ex,Dynamic_Real &e_ey,Dynamic_Real &e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_ref_ch,Text &message)
Description
Some warning and error message would be set to the Text message.
A return value of zero indicates the function call was successful.
ID = 3532
Tunnel_profile_3d(Element ref_str,Text tunnel_def,Element trimesh,Real 
inner_extent,Real outer_extent,Dynamic_Real point_x,Dynamic_Real 
point_y,Dynamic_Real point_z,Dynamic_Text &e_tun_ele_name,Dynamic_Integer 
&e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real 
&e_tun_ele_per,Dynamic_Real &e_tun_ele_dir,Dynamic_Real 
&e_tun_ele_prev_dir,Dynamic_Real &e_tun_ele_next_dir,Dynamic_Real 
&e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real 
&e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real &e_ey,Dynamic_Real 
&e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_dist_3d,Dynamic_Real 
&pd_dist_2d,Dynamic_Real &pd_sqr_vt_ch,Dynamic_Real 
&pd_plm_vt_ch,Dynamic_Real &pd_sqr_hz_ch,Dynamic_Real 
&pd_plm_hz_ch,Dynamic_Real &pd_ref_ch,Dynamic_Real 
&pd_sqr_zd,Dynamic_Real &pd_sqr_di,Dynamic_Real &pd_plm_zd,Dynamic_Real 
&pd_ref_zd,Dynamic_Real &pd_plm_os,Dynamic_Real &pd_sqr_os,Dynamic_Real 
&pd_ref_os,Dynamic_Real &pd_cl_grd,Dynamic_Real &trimesh_offset,Text 
&message)
Name
Integer Tunnel_profile_3d(Element ref_str,Text tunnel_def,Element trimesh,Real inner_extent,Real 
outer_extent,Dynamic_Real point_x,Dynamic_Real point_y,Dynamic_Real point_z,Dynamic_Text 
&e_tun_ele_name,Dynamic_Integer &e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real 
&e_tun_ele_per,Dynamic_Real &e_tun_ele_dir,Dynamic_Real &e_tun_ele_prev_dir,Dynamic_Real 
&e_tun_ele_next_dir,Dynamic_Real &e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real 
&e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real &e_ey,Dynamic_Real &e_ez,Dynamic_Integer 
&pd_status_3d,Dynamic_Integer &pd_status_2d,Dynamic_Real &pd_dist_3d,Dynamic_Real 
&pd_dist_2d,Dynamic_Real &pd_sqr_vt_ch,Dynamic_Real &pd_plm_vt_ch,Dynamic_Real 
&pd_sqr_hz_ch,Dynamic_Real &pd_plm_hz_ch,Dynamic_Real &pd_ref_ch,Dynamic_Real 
&pd_sqr_zd,Dynamic_Real &pd_sqr_di,Dynamic_Real &pd_plm_zd,Dynamic_Real 
&pd_ref_zd,Dynamic_Real &pd_plm_os,Dynamic_Real &pd_sqr_os,Dynamic_Real 
&pd_ref_os,Dynamic_Real &pd_cl_grd,Dynamic_Real &trimesh_offset,Text &message)
Description

Utilities
Some warning and error message would be set to the Text message.
A return value of zero indicates the function call was successful.
ID = 3533
Tunnel_profile_3d(Element ref_str,Text tunnel_def,Element trimesh,Real 
inner_extent,Real outer_extent,Dynamic_Real point_x,Dynamic_Real 
point_y,Dynamic_Real point_z,Dynamic_Text &e_tun_ele_name,Dynamic_Integer 
&e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real 
&e_tun_ele_per,Dynamic_Real &e_tun_ele_radius,Dynamic_Real 
&e_tun_ele_os,Dynamic_Real &e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real 
&e_ey,Dynamic_Real &e_ez,Dynamic_Integer &pd_status_3d,Dynamic_Integer 
&pd_status_2d,Dynamic_Real &pd_ref_ch,Dynamic_Real &trimesh_offset,Text 
&message)
Name
Integer Tunnel_profile_3d(Element ref_str,Text tunnel_def,Element trimesh,Real inner_extent,Real 
outer_extent,Dynamic_Real point_x,Dynamic_Real point_y,Dynamic_Real point_z,Dynamic_Text 
&e_tun_ele_name,Dynamic_Integer &e_tun_ele_idx,Dynamic_Real &e_tun_ele_dist,Dynamic_Real 
&e_tun_ele_per,Dynamic_Real &e_tun_ele_radius,Dynamic_Real &e_tun_ele_os,Dynamic_Real 
&e_tun_prf_ch,Dynamic_Real &e_ex,Dynamic_Real &e_ey,Dynamic_Real &e_ez,Dynamic_Integer 
&pd_status_3d,Dynamic_Integer &pd_status_2d,Dynamic_Real &pd_ref_ch,Dynamic_Real 
&trimesh_offset,Text &message)
Description
Some warning and error message would be set to the Text message.
A return value of zero indicates the function call was successful.
ID = 3534
Cut_fill_trimeshes_between_tins(Tin ground_tin,Tin design_tin,Model 
cut_model,Text cut_name,Integer cut_colour,Model fill_model,Text fill_name,Integer 
fill_colour,Element fence,Model fence_model,Text &return_msg)
Name
Integer Cut_fill_trimeshes_between_tins(Tin ground_tin,Tin design_tin,Model cut_model,Text 
cut_name,Integer cut_colour,Model fill_model,Text fill_name,Integer fill_colour,Element fence,Model 
fence_model,Text &return_msg)
Description
Find the cut and fill trimesh between two given tin ground_tin and design_tin accroding to given 
arguments.
Some warning and error message would be set to the Text return_msg.
A return value of zero indicates the function call was successful.
ID = 5447

Utilities
Chapter   
5.63.2 Transformation
Affine(Dynamic_Element elements, Real rotate_x,Real rotate_y,Real scale_x,Real 
scale_y,Real dx,Real dy)
Name
Integer Affine(Dynamic_Element elements,Real rotate_x,Real rotate_y,Real scale_x,Real scale_y,Real 
dx,Real dy)
Description
Apply to all the elements in the Dynamic_Element elements, the Affine transformation with 
parameters:
X axis rotation rotate_x (in radians)
Y axis rotation rotate_y (in radians)
X scale factor
scale_x
Y scale factor
scale_y
Translation
(dx,dy)
Note that if the scales or the rotates are different between x and y, the true transformation of arcs (or 
cirles) would be no longer arcs. 12D would try to approximate the arcs result in some cases, 
otherwise the radius of segments would be lost.
A function return value of zero indicates the transformation was successful.
ID = 414
Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real 
oy,Integer call_inverse,Element &ele)
Name
Integer Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Integer 
call_inverse,Element &ele)
Description
Apply to element ele the Helmert 2d transformation with parameters:
rotation
r (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 7627
Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real 
oy,Integer call_inverse,Dynamic_Element &ele)
Name
Integer Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Integer 
call_inverse,Dynamic_Element &ele)
Description

Utilities
Apply to all the elements in the Dynamic_Element  ele the Helmert 2d transformation with 
parameters:
rotation
r (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 7628
Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real 
oy,Integer call_inverse,Real &x,Real &y,Real &z)
Name
Integer Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Integer 
call_inverse,Real &x,Real &y,Real &z)
Description
Apply to the point with xyz-coordinate (x,y,z), the Helmert 2d transformation with parametersrotation
r (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 7629
Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real 
oy,Integer call_inverse,Dynamic_Real &x,Dynamic_Real &y,Dynamic_Real &z)
Name
Integer Helmert_2d_Transform(Real r,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Integer 
call_inverse,Real &x,Real &y,Real &z)
Description
Apply to the list of points with xyz-coordinates in three lists x,y,z , the Helmert 2d transformation with 
parameters:
rotation
r (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 7630
Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real 

Utilities
Chapter   
ox,Real oy,Real oz,Integer call_inverse,Element &ele)
Name
Integer Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Real 
oz,Integer call_inverse,Element &ele)
Description
Apply to element ele the Helmert 3d transformation with parameters:
X axis rotation rx (in radians)
Y axis rotation ry (in radians)
Z axis rotation
rz (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy,oz)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 3485
Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real 
tz,Real ox,Real oy,Real oz,Integer call_inverse,Dynamic_Element &elements)
Name
Integer Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Real 
oz,Integer call_inverse,Dynamic_Element &elements)
Description
Apply to all the elements in the Dynamic_Element elements, the Helmert 3d transformation with 
parameters:
X axis rotation rx (in radians)
Y axis rotation ry (in radians)
Z axis rotation
rz (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy,oz)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 3486
Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real 
tz,Real ox,Real oy,Real oz,Integer call_inverse,Real &x,Real &y,Real &z)
Name
Integer Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Real 
oz,Integer call_inverse,Real &x,Real &y,Real &z)
Description
Apply to the 3D point with xyz-coordinate (x,y,z), the Helmert 3d transformation with parameters:

Utilities
X axis rotation rx (in radians)
Y axis rotation ry (in radians)
Z axis rotation
rz (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy,oz)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 3487
Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real 
ox,Real oy,Real oz,Integer call_inverse,Dynamic_Real &x,Dynamic_Real 
&y,Dynamic_Real &z)
Name
Integer Helmert_3d_Transform(Real rx,Real ry,Real rz,Real scale,Real tx,Real ty,Real tz,Real ox,Real oy,Real 
oz,Integer call_inverse,Dynamic_Real &x,Dynamic_Real &y,Dynamic_Real &z)
Description
Apply to the list 3D points with xyz-coordinates in three lists x,y,z , the Helmert 3d transformation 
with parameters:
X axis rotation rx (in radians)
Y axis rotation ry (in radians)
Z axis rotation
rz (in radians)
scale factor
scale
Translation
(tx,ty,tz)
Origin
(ox,oy,oz)
If Integer call_inverse is not zero, then the reserve of the given transformation will be use instead.
A function return value of zero indicates the transformation was successful.
ID = 3488
Get_carto_projection_datum_data(Text datum_name,Text carto_file_name,Text 
&datum_data)
Name
Integer Get_carto_projection_datum_data(Text datum_name,Text carto_file_name,Text &datum_data)
Description
Looking up the datum_data of a projection of given datum_name using a given carto file 
carto_file_name. The carto file must have the same format as the builtin carto.4d
If carto_file_name is the string "carto.4d" or the empty string "", then it will be the same file using in 
all builtin 12D panels.
A function return value of zero indicates the transformation was successful.
ID = 3724
Get_geodetic_projection_datum_data(Text datum_name,Text carto_file_name,Text 

Utilities
Chapter   
&datum_data)
Name
Integer Get_geodetic_projection_datum_data(Text datum_name,Text carto_file_name,Text &datum_data)
Description
Looking up the datum_data of a projection of given datum_name using a given carto file 
carto_file_name. The carto file must have the same format as the builtin carto.12dcarto
If carto_file_name is the string "carto.12dcarto" or the empty string "", then it will be the same file 
using in all builtin 12D panels.
A function return value of zero indicates the transformation was successful.
ID = 7661
Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Element &ele)
Name
Integer Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer from_long_lat,Element &ele)
Description
Convert the x and y values of an Element ele between Easting-Northing and Longtitude-Latitude 
using:
The datum_data being used. Note: this is the actual data not the name.
The direction of the conversion: from_long_lat from long-lat to Easting-Northing: zero being false; 
one being true.
The angle mode of the longtitude, latitude longlat_angle_mode :zero being radians; one being 
decimal degrees; two being DMS degrees minutes seconds.
A function return value of zero indicates the transformation was successful.
ID = 3725
Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Dynamic_Element &ele_list)
Name
Integer Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Dynamic_Element &ele_list)
Description
Convert the x and y values of all Element from a given list ele_list between Easting-Northing and 
Longtitude-Latitude using:
The datum_data being used. Note: this is the actual data not the name.
The direction of the conversion: from_long_lat from long-lat to Easting-Northing: zero being false; 
one being true.
The angle mode of the longtitude, latitude longlat_angle_mode :zero being radians; one being 
decimal degrees; two being DMS degrees minutes seconds.
A function return value of zero indicates the transformation was successful.
ID = 3726

Utilities
Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Real &x,Real &y)
Name
Integer Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer from_long_lat,Real &x,Real 
&y)
Description
Convert the value of two Real x,y between Easting-Northing and Longtitude-Latitude using:
The datum_data being used. Note: this is the actual data not the name.
The direction of the conversion: from_long_lat from long-lat to Easting-Northing: zero being false; 
one being true.
The angle mode of the longtitude, latitude longlat_angle_mode :zero being radians; one being 
decimal degrees; two being DMS degrees minutes seconds.
A function return value of zero indicates the transformation was successful.
ID = 3727
Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Dynamic_Real &x,Dynamic_Real &y)
Name
Integer Convert_long_lat(Text datum_data,Integer longlat_angle_mode,Integer 
from_long_lat,Dynamic_Real &x,Dynamic_Real &y)
Description
Convert the values of in the two lists (of the same sizes) Dynamic_Real x,y between Easting-
Northing and Longtitude-Latitude using:
The datum_data being used. Note: this is the actual data not the name.
The direction of the conversion: from_long_lat from long-lat to Easting-Northing: zero being false; 
one being true.
The angle mode of the longtitude, latitude longlat_angle_mode :zero being radians; one being 
decimal degrees; two being DMS degrees minutes seconds.
A function return value of zero indicates the transformation was successful.
ID = 3728
Get_ellipsoid_distance(Text datum_data,Real easting1,Real northing1,Real 
easting2,Real northing2,Real &ellipsoid_distance)
Name
Integer Get_ellipsoid_distance(Text datum_data,Real easting1,Real northing1,Real easting2,Real 
northing2,Real &ellipsoid_distance)
Description
Calculate the ellipsoid_distance between two points (easting1,northing1) and 
(easting2,northing2).
The datum_data being used. Note: this is the actual data not the name.
A function return value of zero indicates the calculation was successful.
ID = 7801

Utilities
Chapter   
Get_grid_azimuth(Text datum_data,Real easting1,Real northing1,Real easting2,Real 
northing2,Real &grid_azimuth)
Name
Integer Get_grid_azimuth(Text datum_data,Real easting1,Real northing1,Real easting2,Real northing2,Real 
&grid_azimuth)
Description
Calculate the grid_azimuth between two points (easting1,northing1) and (easting2,northing2).
The datum_data being used. Note: this is the actual data not the name.
A function return value of zero indicates the calculation was successful.
ID = 7802
Calculate_helmert_3d_transform_parameters(Dynamic_Real xc,Dynamic_Real 
yc,Dynamic_Real zc,Dynamic_Real xo,Dynamic_Real yo,Dynamic_Real zo,Integer 
fixed_scale,Integer origin_method,Real &rx,Real &ry,Real &rz,Real &scale,Real 
&tx,Real &ty,Real &tz,Real &ox,Real &oy,Real &oz,Text &error_msg)
Name
Integer Calculate_helmert_3d_transform_parameters(Dynamic_Real xc,Dynamic_Real yc,Dynamic_Real 
zc,Dynamic_Real xo,Dynamic_Real yo,Dynamic_Real zo,Integer fixed_scale,Integer origin_method,Real 
&rx,Real &ry,Real &rz,Real &scale,Real &tx,Real &ty,Real &tz,Real &ox,Real &oy,Real &oz,Text 
&error_msg)
Description
From the list of control points given by list of x,y,z coordinates xc yc zc and the list of observation 
points given by list of x,y,z coordinate xo yo zo calculate the parameters for the equivalent helmert 
3d transform.
If fixed_scale is none zero then the transformation is used fixed scale.
The valid value for origin_method
0 - manual
1 - observed centroid
2 - control centroid
Some warning and error message would be set to the Text error_msg.
A function return value of zero indicates the call was successful.
ID = 7617
Calculate_helmert_2d_transform_parameters(Dynamic_Real xc,Dynamic_Real 
yc,Dynamic_Real xo,Dynamic_Real yo,Integer fixed_scale,Real input_scale,Real 
&r,Real &scale,Real &tx,Real &ty,Real &ox,Real &oy,Text &error_msg)
Name
Integer Calculate_helmert_2d_transform_parameters(Dynamic_Real xc,Dynamic_Real yc,Dynamic_Real 
xo,Dynamic_Real yo,Integer fixed_scale,Real input_scale,Real &r,Real &scale,Real &tx,Real &ty,Real 
&ox,Real &oy,Text &error_msg)
Description
From the list of control points given by list of x,y coordinates xc yc and the list of observation points 
given by list of x,y coordinate xo yo calculate the parameters for the equivalent helmert 2d 
transform.

Utilities
If fixed_scale is none zero then the transformation is used fixed scale.
This call missing the input parameter for "origin_method", which will be assume to be 2. See the 
bellow call.
Some warning and error message would be set to the Text error_msg.
A function return value of zero indicates the call was successful.
ID = 7618
Calculate_helmert_2d_transform_parameters(Dynamic_Real xc,Dynamic_Real 
yc,Dynamic_Real xo,Dynamic_Real yo,Integer fixed_scale,Real input_scale,Integer 
origin_method,Real &r,Real &scale,Real &tx,Real &ty,Real &ox,Real &oy,Text 
&error_msg)
Name
Integer Calculate_helmert_2d_transform_parameters(Dynamic_Real xc,Dynamic_Real yc,Dynamic_Real 
xo,Dynamic_Real yo,Integer fixed_scale,Real input_scale,Integer origin_method,Real &r,Real &scale,Real 
&tx,Real &ty,Real &ox,Real &oy,Text &error_msg)
Description
From the list of control points given by list of x,y coordinates xc yc and the list of observation points 
given by list of x,y coordinate xo yo calculate the parameters for the equivalent helmert 2d 
transform.
If fixed_scale is none zero then the transformation is used fixed scale.
Some warning and error message would be set to the Text error_msg.
A function return value of zero indicates the call was successful.
ID = 7956

Utilities
Chapter   
5.63.3 Chains

### `Run_chain`

```c
Integer Run_chain(Text chain)
```

Run the chain in the file named chain. A function return value of zero indicates the chain was successfully run.

> ID = 2096

Utilities
5.63.4 Convert
Convert(Dynamic_Element in_de,Integer mode,Integer pass_others, 
Dynamic_Element &out_de)
Name
Integer Convert(Dynamic_Element in_de,Integer mode,Integer pass_others,Dynamic_Element &out_de)
Description
Convert the strings in Dynamic_Element in_de using Integer mode and when mode equals
1
convert 2d to 3d
2
convert 3d to 2d if the 3d string has constant z
3
convert 4d to 3d (the text is dropped at each point)
The converted strings are returned by appending them to the Dynamic_Element out_de.
If Integer pass_others is non zero, any strings in in_de that cannot be converted will be copied to 
out_de.
A function return value of zero indicates the conversion was successful.
ID = 139

### `Convert`

```c
Integer Convert(Element elt,Text type,Element &newelt)
```

Tries to convert the Element elt to the Element type given by Text type. If successful, the new element is returned in Element newelt. A function return value of zero indicates the conversion was successful.

> ID = 655

Utilities
Chapter   
5.63.5 Cuts Through Strings
Cut_strings(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element 
&result)
Name
Integer Cut_strings(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element &result)
Description
Cut all the strings from the list Dynamic_Element seed with the strings from the list
Dynamic_Element strings and add to Dynamic_Element result.
The strings created are 4d strings which have at each vertex the string cut.
Cuts are only considered valid if they have heights. Any cut at a point where
the string height is null, will not be included.
A function return value of zero indicates the cut calculations was successful. 
ID = 541
Cut_strings(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element 
&result,Integer create_supers)
Name
Integer Cut_strings(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element &result,Integer 
create_supers)
Description
Cut all the strings from the list Dynamic_Element seed with the strings from the list
Dynamic_Element strings and add to Dynamic_Element result.
If create_supers is zero, the strings created are 4d strings which have at each vertex the string cut.
If create_supers is non zero, the strings created are super strings which have at each vertex the 
string cut.
Cuts are only considered valid if they have heights. Any cut at a point where
the string height is null, will not be included.
A function return value of zero indicates the cut calculations was successful. 
ID = 3788
Cut_strings_with_nulls(Dynamic_Element seed,Dynamic_Element 
strings,Dynamic_Element &result)
Name
Integer Cut_strings_with_nulls(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element 
&result)
Description
Cut all the strings from the list Dynamic_Element seed with the strings from the list
Dynamic_Element strings and add to Dynamic_Element result.
The strings created are 4d strings which have at each vertex the string cut.
A function return value of zero indicates the cut calculations was successful.

Utilities
ID = 548
Cut_strings_with_nulls(Dynamic_Element seed,Dynamic_Element 
strings,Dynamic_Element &result,Integer create_supers)
Name
Integer Cut_strings_with_nulls(Dynamic_Element seed,Dynamic_Element strings,Dynamic_Element 
&result,Integer create_supers)
Description
Cut all the strings from the list Dynamic_Element seed with the strings from the list
Dynamic_Element strings and add to Dynamic_Element result.
If create_supers is zero, the strings created are 4d strings which have at each vertex the string cut.
If create_supers is non zero, the strings created are super strings which have at each vertex the 
string cut.
A function return value of zero indicates the cut calculations was successful.
ID = 3789

Utilities
Chapter   
5.63.6 Factor

### `Factor`

```c
Integer Factor(Dynamic_Element elements,Real xf,Real yf,Real zf)
```

Multiply all the co-ordinates of all the elements in the Dynamic_Element elements by the factors (xf,yf,zf). Note that if the xf and yf are different, then the true transformation of arcs (or cirles) would be no longer arcs. 12D would try to approximate the arcs result in some cases, otherwise the radius of segments would be lost. A function return value of zero indicates the factor was successful.

> ID = 411

Utilities
5.63.7 Fence
Fence(Dynamic_Element data_to_fence,Integer mode,Element 
user_poly,Dynamic_Element &ret_inside,Dynamic_Element &ret_outside)
Name
Integer Fence(Dynamic_Element data_to_fence,Integer mode,Element user_poly,Dynamic_Element 
&ret_inside,Dynamic_Element &ret_outside)
Description
This function fences all the Elements in the Dynamic_Element data_to_list against the user 
supplied polygon Element user_poly.
The fence mode is given by Integer mode and when mode equals
0
get the inside of the polygon
1
get the outside of the polygon
2
get the inside and the outside of the polygon
If the inside is required, the data is returned by appending it to the Dynamic_Element ret_inside.
If the outside is required, the data is returned by appending it to the Dynamic_Element ret_outside
A returned value of zero indicates there were no errors in the fence operation.
Fence(Dynamic_Element data_to_fence,Integer mode,Dynamic_Element 
polygon_list,Dynamic_Element &ret_inside,Dynamic_Element &ret_outside)
Name
Integer Fence(Dynamic_Element data_to_fence,Integer mode,Dynamic_Element 
polygon_list,Dynamic_Element &ret_inside,Dynamic_Element &ret_outside)
Description
This function fences all the Elements in the Dynamic_Element data_to_list against one or more 
user supplied polygons given in the Dynamic_Element polygon_list.
The fence mode is given by Integer mode and when mode equals
0
get the inside of each of the polygons
1
get the outside of all the polygons
2
get the inside and the outside of the polygons
If the inside is required, the data is returned by appending it to the Dynamic_Element ret_inside.
If the outside is required, the data is returned by appending it to the Dynamic_Element ret_outside
A returned value of zero indicates there were no errors in the fence operation Head to Tail
ID = 137
Check_polygon_fence(Element polygon,Integer &good_polygon,Integer 
&good_fence)
Name
Integer Check_polygon_fence(Element polygon,Integer &good_polygon,Integer &good_fence)
Description
This function check the input polygon and set.
Integer good_polygon to 1 if the input is a simple polygon; 0 otherwise.
Integer good_polygon to 1 if the input polygon can be used as the fence; 0 otherwise.

Utilities
Chapter   
A returned value of zero indicates there were no errors in the checking operation.
ID = 3543

### `Check_polygon`

```c
Integer Check_polygon(Element polygon_in,Integer &good_polygon,Element &polygon_out)
```

This function check the input polygon_in and set. Integer good_polygon to 1 if the input is a simple polygon; 0 otherwise. When the input is not a good polygon, there will be an attempt to fix some problems and return the fixed polygon as polygon_out. A returned value of zero indicates there were no errors in the checking operation.

> ID = 3544

### `Check_polygon_planar`

```c
Integer Check_polygon_planar(Element polygon,Integer &planar)
```

This function check the input polygon is a 3D super string and set. Integer planar to 0 if all the points of the polygon are identical 1 if all the points of the polygon are in one line 2 if all the points of the polygon are in one plane 3 if all the points of the polygon are not in one plane A returned value of zero indicates there were no errors in the checking. The return value 6 indicate the input element is not a string. The return value 7 indicate the input element is not a super string. The return value 11 12 15 indicate the input polygon does not have z value at some points. The return value 21 indicate the input polygon has less than three points.

> ID = 7818

### `XY_inside_polygon`

```c
Integer XY_inside_polygon(Element polygon,Real x,Real y,Integer &inside_status)
```

This function check point with coordinate x,y is inside the polygon and set. Integer inside_status to 0 if all the point is not inside the polygon 1 if all the point is inside the polygon A returned value of zero indicates there were no errors in the checking. Utilities

> ID = 7839

Utilities
Chapter   
5.63.8 Filter
Filter(Dynamic_Element in_de,Integer mode,Integer pass_others,Real 
tolerance,Dynamic_Element &out_de)
Name
Integer Filter(Dynamic_Element in_de,Integer mode,Integer pass_others,Real tolerance,Dynamic_Element 
&out_de)
Description
Filter removes points from 2d and/or 3d strings that do not deviate by more than the distance 
tolerance from the straight lines joining successive string points.
Hence the function Filter filters the data from in_de where mode means:
0
only 2d strings are filtered.
1
2d and 3d strings are filtered.
The filtered data is placed in the Dynamic_Element out_de.
If pass_others is non-zero, elements that can't be processed using the mode will be copied to 
out_de.
A function return value of zero indicates the filter was successful.
ID = 140

Utilities
5.63.9 Head to Tail

### `Head_to_tail`

```c
Integer Head_to_tail(Dynamic_Element in_list,Dynamic_Element &out_list)
```

Perform head to tail processing on the data in Dynamic_Element in_list. The resulting elements are returned by appending them to the Dynamic_Element out_list. A function return value of zero indicates there were no errors in the head to tail process.

> ID = 138

Utilities
Chapter   
5.63.10 Helmert Transformation

### `Helmert`

```c
Integer Helmert(Dynamic_Element elements,Real rotate,Real scale,Real dx,Real dy)
```

Apply to all the elements in the Dynamic_Element elements, the Helmert transformation with parameters: Rotation rotate (in radians) Scale factor scale Translation (dx,dy) A function return value of zero indicates the transformation was successful.

> ID = 413

Utilities
5.63.11 Polygon Centroid and Medial axis

### `Medial_axis_polygon`

```c
Integer Medial_axis_polygon(Element polygon,Real &cx,Real &cy,Real &radius)
```

Get xy-coordinate cx cy of the medial axis point and the radius of biggest circle of an Element polygon A return value of zero indicates the function call was successful.

> ID = 3031

Medial_axis_polygon(Element polygon,Real &cx,Real &cy,Real &radius,Real 
radius_tolerance)
Name
Integer Medial_axis_polygon(Element polygon,Real &cx,Real &cy,Real &radius,Real radius_tolerance)
Description
Get xy-coordinate cx cy of the medial axis point and the radius of biggest circle of an Element 
polygon.
In some cases, such as when the polygon is almost a long rectangle, the biggest circle is at one end 
of the (almost) rectangle. For many purposes (such as labelling), the desired centre is the middle of 
the rectangle. A radius_tolerance (a positive number less than 0.2) is used to adjust the centre in 
such cases. E.g. the medial axis centre will be moved toward the middle of the polygon when the 
radius of the largest circle being reduced by less than the given tolerance. The value of 
radius_tolerance in the other call for medial_axis_polygon is 0.05 (5 percent).
A return value of zero indicates the function call was successful.
ID = 3462

### `Get_polygon_centroid`

```c
Integer Get_polygon_centroid(Element polygon,Real &cx,Real &cy)
```

Get xy-coordinate cx cy of the centroid of an Element polygon. A return value of zero indicates the function call was successful.

> ID = 3479

Utilities
Chapter   
5.63.12 Rotate

### `Rotate`

```c
Integer Rotate(Dynamic_Element elements,Real xorg,Real yorg,Real ang)
```

Rotate all the elements in the Dynamic_Element elements about the centre point (xorg,yorg) through the angle ang. A function return value of zero indicates the rotate was successful.

> ID = 410

Utilities
5.63.13 Share Status

### `Share_status`

```c
Integer Share_status(Model model,Integer &is_share_out,Integer &is_share_in)
```

Check share status of the Model model Share out status is_share_out: 0 not share out, 1 share out Share out status is_share_in: 0 not share in, 1 share in A return value of zero indicates the function call was successful.

> ID = 3051

### `Share_status`

```c
Integer Share_status(Tin tin,Integer &is_share_out,Integer &is_share_in)
```

Check share status of the Tin tin Share out status is_share_out: 0 not share out, 1 share out Share out status is_share_in: 0 not share in, 1 share in A return value of zero indicates the function call was successful.

> ID = 3052

Share_status(Model model,Integer &is_share_out,Integer &is_share_in,Text 
&share_in_location)
Name
Integer Share_status(Model model,Integer &is_share_out,Integer &is_share_in,Text &share_in_location)
Description
Check share status of the Model model
Share out status is_share_out: 0 not share out, 1 share out 
Share out status is_share_in: 0 not share in, 1 share in 
Location for share return in share_in_location 
A return value of zero indicates the function call was successful.
ID = 3064
Share_status(Tin tin,Integer &is_share_out,Integer &is_share_in,Text 
&share_in_location)
Name
Integer Share_status(Tin tin,Integer &is_share_out,Integer &is_share_in,Text &share_in_location)
Description

Utilities
Chapter   
Check share status of the Tin tin
Share out status is_share_out: 0 not share out, 1 share out 
Share out status is_share_in: 0 not share in, 1 share in 
Location for share return in share_in_location 
A return value of zero indicates the function call was successful.
ID = 3065

Utilities
5.63.14 Swap XY

### `Swap_xy`

```c
Integer Swap_xy(Dynamic_Element elements)
```

Swap the x and y co-ordinates for all the elements in the Dynamic_Element elements. A function return value of zero indicates the swap was successful.

> ID = 412

Utilities
Chapter   
5.63.15 Translate

### `Translate`

```c
Integer Translate(Dynamic_Element elements,Real dx,Real dy,Real dz)
```

Translate translates all the elements in the Dynamic_Element elements by the amount (dx,dy,dz). A function return value of zero indicates the translate was successful.

> ID = 400

Utilities
5.63.16 NMEA

### `TDF_NMEA_checksum`

```c
Integer TDF_NMEA_checksum(Text nmea_string)
```

Return the checksum of a NMEA format string as a decimal integer, the string must begin with '$' and terminate with '*', the checksum is calculated using all characters up to but not including the *, for example the following string will return a value of 79. "$GPGGA,053349.00,4245.631,S,14713.9987,E,4,36,0.4,47.715,M,-8.2,M,1.0,0116*" A function return of zero or greater indicates the checksum was correctly calculated. The return value -1 indicates the string did not start with $ The return value -2 indicates the string had no characters after the starting $ The return value -3 indicates the string was not terminated by *

> ID = 7756

### `TDF_NMEA_checksum_as_hex`

```c
Text TDF_NMEA_checksum_as_hex(Text nmea_string)
```

Return the checksum of a NMEA format string in Text representing a hexadecimal integer, the string must begin with '$' and terminate with '*', the checksum is calculated using all characters up to but not including the *, for example the following string will return a value of "4F" "$GPGGA,053349.00,4245.631,S,14713.9987,E,4,36,0.4,47.715,M,-8.2,M,1.0,0116*" A function return not starting with the first character '-' indicates the checksum was correctly calculated. The return value "-1" indicates the string did not start with $ The return value "-2" indicates the string had no characters after the starting $ The return value "-3" indicates the string was not terminated by *

> ID = 7757

Utilities
Chapter   
5.63.17 Water Defaults

### `Get_water_defaults_fs_tin`

```c
Integer Get_water_defaults_fs_tin(Text &tin_name)
```

Get the current water defaults for fs tin and assign the name to Text tin_name.

> ID = 7939

### `Get_water_defaults_manhole`

```c
Integer Get_water_defaults_manhole(Real &diameter,Real &drop,Text &name,Text &type)
```

Get the current water defaults for manhole and assign the values to Real diameter Real drop Text name Text type.

> ID = 7940

Get_water_defaults_pipe(Real &diameter,Real &minimum_grade,Real 
&minimum_cover,Text &type)
Name
Integer Get_water_defaults_pipe(Real &diameter,Real &minimum_grade,Real &minimum_cover,Text &type)
Description
Get the current water defaults for pipe and assign the values to Real diameter Real 
minimum_grade Real minimum_cover Text type.
ID = 7941
Get_water_defaults_property_control(Real &diameter,Real &grade,Real 
&cover,Integer &colour,Text &name)
Name
Integer Get_water_defaults_property_control(Real &diameter,Real &grade,Real &cover,Integer 
&colour,Text &name)
Description
Get the current water defaults for property control and assign the values to Real diameter Real 
grade Real cover Integer colour Text name
ID = 7942
Get_water_defaults_house_connection(Text &view,Real &diameter,Real &grade,Real 
&cover,Real &length,Integer &colour,Text &name,Text &connection_type)
Name
Integer Get_water_defaults_house_connection(Text &view,Real &diameter,Real &grade,Real &cover,Real 
&length,Integer &colour,Text &name,Text &connection_type)

Utilities
Description
Get the current water defaults for house connection and assign the values to Text view Real 
diameter Real grade Real cover Real length Integer colour Text name Text connection_type.
ID = 7943

### `Set_water_defaults_fs_tin`

```c
Integer Set_water_defaults_fs_tin(Text tin_name)
```

Set the current water defaults for fs tin using the value of Text tin_name.

> ID = 7944

### `Set_water_defaults_manhole`

```c
Integer Set_water_defaults_manhole(Real diameter,Real drop,Text name,Text type)
```

Set the current water defaults for manhole using the values of Real diameter Real drop Text name Text type.

> ID = 7945

Set_water_defaults_pipe(Real diameter,Real minimum_grade,Real 
minimum_cover,Text type)
Name
Integer Set_water_defaults_pipe(Real diameter,Real minimum_grade,Real minimum_cover,Text type)
Description
Set the current water defaults for pipe using the values of Real diameter Real minimum_grade 
Real minimum_cover Text type.
ID = 7946
Set_water_defaults_property_control(Real diameter,Real grade,Real cover,Integer 
colour,Text name)
Name
Integer Set_water_defaults_property_control(Real diameter,Real grade,Real cover,Integer colour,Text name)
Description
Set the current water defaults for property control using the values of Real diameter Real grade 
Real cover Integer colour Text name
ID = 7947
Set_water_defaults_house_connection(Text view,Real diameter,Real grade,Real 
cover,Real length,Integer colour,Text name,Text connection_type)
Name

Utilities
Chapter   
Integer Set_water_defaults_house_connection(Text view,Real diameter,Real grade,Real cover,Real 
length,Integer colour,Text name,Text connection_type)
Description
Set the current water defaults for house connection using the values of Text view Real diameter 
Real grade Real cover Real length Integer colour Text name Text connection_type.
ID = 7948

Utilities
5.63.18 Miscellaneous

### `Set_inquire_style`

```c
Integer Set_inquire_style(Text inquire_style)
```

Set the current inquire style of the project to the one with name inquire_style. A function return value of zero indicates the style was set successfully.

> ID = 3838

### `Get_current_inquire_style`

```c
Integer Get_current_inquire_style(Text &current_style)
```

Get the current inquire style of the project and assign the name to Text current_style. A function return value of zero indicates the call was successfully.

> ID = 3931

### `Inquire_style_exists`

```c
Integer Inquire_style_exists(Text style)
```

Check if the inquire style with given name style exists. A function return value of zero indicates the style does not exist. A function return value of one indicates the style exists.

> ID = 3932

### `License_module_valid`

```c
Integer License_module_valid(Text module,Integer &valid)
```

Check if the user has valid license to use given 12d module A function return value of zero indicates the call was successfully.

> ID = 3933

### `Project_settings_profile_exists`

```c
Integer Project_settings_profile_exists(Text profile_name)
```

Utilities Chapter Check if the project settings profile with given name profile_name exists. A function return value of zero indicates the style does not exist. A function return value of one indicates the style exists.

> ID = 3934

### `Delete_all_functions`

```c
Integer Delete_all_functions(Integer delete_strings_and_models)
```

Delete all functions in the project. if delete_strings_and_models is non zero then all strings and models created by functions also being deleted. Note: the call cannot be undone. A function return value of zero indicates the call was successfully.

> ID = 3937

### `Delete_function_strings_and_models`

```c
Integer Delete_function_strings_and_models(Text function_name)
```

Delete all strings and models created by a function with given name function_name Note: the call cannot be undone. A function return value of zero indicates the call was successfully.

> ID = 3938

### `Get_icon_size`

```c
Integer Get_icon_size(Integer &size)
```

Get the current pixel size of the standard icon in the project and set it to Integer size A function return value of zero indicates the call was successfully.

> ID = 7593

### `Get_active_theme_name`

```c
Integer Get_active_theme_name(Text &name)
```

Get name of the active theme and set it to Text name A function return value of zero indicates the call was successfully.

> ID = 7594

Utilities

### `Get_active_theme_image_directory`

```c
Integer Get_active_theme_image_directory(Text &image_directory)
```

Get image directory of the active theme and set it to Text image_directory A function return value of zero indicates the call was successfully.

> ID = 7595

### `Get_disk_file_name`

```c
Integer Get_disk_file_name(Model model,Text &disk_name)
```

Get disk file name of given model and set it to Text disk_name A function return value of zero indicates the call was successfully.

> ID = 7613

### `Get_disk_file_name`

```c
Integer Get_disk_file_name(Tin tin,Text &disk_name)
```

Get disk file name of given tin and set it to Text disk_name A function return value of zero indicates the call was successfully.

> ID = 7614

### `Get_disk_file_name`

```c
Integer Get_disk_file_name(Tin tin,Text &disk_name)
```

Get disk file name of given tin and set it to Text disk_name A function return value of zero indicates the call was successfully.

> ID = 7615

### `Get_disk_file_name`

```c
Integer Get_disk_file_name(Function f,Text &disk_name)
```

Get disk file name of given Function f and set it to Text disk_name A function return value of zero indicates the call was successfully. Utilities Chapter

> ID = 7616

### `Get_disk_file_name`

```c
Integer Get_disk_file_name(View view,Text &disk_name)
```

Get disk file name of given view and set it to Text disk_name A function return value of zero indicates the call was successfully.

> ID = 7617

### `Check_object_tree_enable`

```c
Integer Check_object_tree_enable(Integer &enable)
```

Integer enble should be 1 A function return value of zero indicates the call was successfully.

> ID = 7619

### `Get_license_client`

```c
Integer Get_license_client(Text &client)
```

Get the client information from 12D license and set that to Text client A function return value of zero indicates the call was successful.

> ID = 7620

Explode_text(Dynamic_Element input_data,Integer 
preserve_height,Dynamic_Element &output_texts)
Name
Integer Explode_text(Dynamic_Element input_data,Integer preserve_height,Dynamic_Element 
&output_texts)
Description
Explode text component of text strings and 4d strings into arc and lines. The z value of the text will 
be set to the results if preserve_height is 1. 
A function return value of zero indicates the call was successfully.
ID = 7626
Explode_text_border(Element text,Real pixel_to_mm,Real plot_scale,Element 
&border)
Name

Utilities
Integer Explode_text_border(Element text,Real pixel_to_mm,Real plot_scale,Element &border)
Description
Explode the border of given text string text into a super string Element border. If the type of text is 
device; pixel_to_mm will be used for the size of the result border. If the type of text is paper; 
plot_scale will be used for the size of the result border.
A function return value of zero indicates the call was successfully.
ID = 7636
Explode_vertex_text_border(Element text,Integer vertex,Real pixel_to_mm,Real 
plot_scale,Element &border)
Name
Integer Explode_vertex_text_border(Element text,Integer vertex,Real pixel_to_mm,Real plot_scale,Element 
&border)
Description
Explode the border of given vertex text of a super string text into a super string Element border. If 
the type of text is device; pixel_to_mm will be used for the size of the result border. If the type of 
text is paper; plot_scale will be used for the size of the result border.
A function return value of zero indicates the call was successfully.
ID = 7637
Explode_segment_text_border(Element text,Integer segment,Real pixel_to_mm,Real 
plot_scale,Element &border)
Name
Integer Explode_segment_text_border(Element text,Integer segment,Real pixel_to_mm,Real 
plot_scale,Element &border)
Description
Explode the border of given segment text of a super string text into a super string Element border. 
If the type of text is device; pixel_to_mm will be used for the size of the result border. If the type of 
text is paper; plot_scale will be used for the size of the result border.
A function return value of zero indicates the call was successfully.
ID = 7638
Write_DAE_file(Dynamic_Element data_to_write,Point origin,Real 
null_z_value,Integer ss_justify_mode,Text output_file_name)
Name
Integer Write_DAE_file(Dynamic_Element data_to_write,Point origin,Real null_z_value,Integer 
ss_justify_mode,Text output_file_name)
Description
Write a new DAE file at the location output_file_name from a list of 3D data data_to_write.
A function return value of zero indicates the call was successfully.
ID = 7658
Read_STL_file(Text stl_file,Integer default_colour,Model output_model)

Utilities
Chapter   
Name
Integer Read_STL_file(Text stl_file,Integer default_colour,Model output_model)
Description
Create trimeshes from a given input stl_file using default_colour and add those to output_model.
A function return value of zero indicates the call was successfully.
ID = 7812

### `Is_dumping_widgets`

```c
Integer Is_dumping_widgets()
```

For internal use only, no doco.

> ID = 7703

### `Get_SDR_field_file_type`

```c
Integer Get_SDR_field_file_type(Function function,Integer &field_file_type)
```

Get the field_file_type of given SDR function: 0 means flat, 1 means tree. A function return value of zero indicates the call was successfully.

> ID = 7742

### `Convert_SDR_flat_to_tree`

```c
Integer Convert_SDR_flat_to_tree(Function function,Integer opcodes_as_children)
```

If the field file type of given SDR function is flat, attempt to change that into tree type. If opcodes_as_children is non zero, then moving the opcodes of the measurement as children. A function return value of zero indicates the call was successfully.

> ID = 7743

Utilities
5.63.19 Macro Miscellaneous - Internal use only

### `Set_exit_code`

```c
Set_exit_code(Integer code)
```

Set Integer code as the exit code of the macro.

> ID = 3892

### `Set_exit_code`

```c
Set_exit_code(Text code)
```

Set Text code as the exit code of the macro.

> ID = 3893

### `Get_last_child_macro_exit_code`

```c
Integer Get_last_child_macro_exit_code(Integer &value)
```

Get the Integer value of the last child macro exit code. A function return value of zero indicates the call was successfully.

> ID = 8019

### `Get_last_child_macro_exit_code`

```c
Integer Get_last_child_macro_exit_code(Text &value)
```

Get the Text value of the last child macro exit code. A function return value of zero indicates the call was successfully.

> ID = 8020

### `Clear_last_child_macro_exit_code`

```c
Integer Clear_last_child_macro_exit_code()
```

Clear the last child macro exit code. A function return value of zero indicates the call was successfully.

> ID = 8021

Utilities
Chapter

### `Set_macro_allow_cancelling`

```c
Integer Set_macro_allow_cancelling()
```

Allow the current macro to be cancelled by the user. A function return value of zero indicates the call was successfully.

> ID = 8022

### `Get_macro_allow_cancelling`

```c
Integer Get_macro_allow_cancelling()
```

A function return value of one indicates the macro can be cancelled; zero otherwise.

> ID = 8023

### `Clear_macro_allow_cancelling`

```c
Integer Clear_macro_allow_cancelling()
```

Disable the current macro to be cancelled by the user. A function return value of zero indicates the call was successfully.

> ID = 8024

### `Set_macro_cancelling`

```c
Integer Set_macro_cancelling()
```

Set the status of the current macro to be cancelling. A function return value of zero indicates the call was successfully.

> ID = 8025

### `Get_macro_cancelling`

```c
Integer Get_macro_cancelling()
```

A function return value of one indicates the macro can is cancelling; zero otherwise.

> ID = 8026

Clear_macro_cancelling()

Utilities
Name
Integer Clear_macro_cancelling()
Description
Clear the cancelling status of the current macro.
A function return value of zero indicates the call was successfully.
ID = 8027


---

## Macro Functions (§5.64)

12d Model-specific macro management functions including command argument access,
macro version control, process management, and 12d internal hooks.

12d Model Macro_Functions
Chapter   
5.64 12d Model Macro_Functions
A 12d Model Function is not a function call in the macro language, but a special type of object in 
12d Model. Typical 12d Model Functions are the Apply, Apply Many, Interface and Survey Data 
Reduction functions.
The macro language also allows the creation of Functions called Macro_Functions, or Functions for 
short that will appear in the standard 12d Model Function list and can be run from the standard 
12d Model Recalc option.
The special things about 12d Model Functions and Macro_Functions are that they:
(a)
Have a unique name amongst all the 12d Model Functions in a project.
(b)
Have a unique function type so that pop-ups can be restricted to only Functions of that type.
(c)
Remember the answers for the fields in the panel that creates the Function (the Function 
input data) so that when Editing the Function, all the fields can be automatically filled in with the 
same answers as when the Function was last run. 
(d)
Can record which input Elements are such that if they are modified in 12d Model, then the 
results of the Function will be incorrect and the Functions needs to be rerun (recalced) to 
update the results. These Elements are known as the Functions dependency Elements.
For a Macro_Function, the dependency Elements are set and retrieved using function 
dependency calls and the other answers for the panel fields are recorded as Function 
attributes.
(e)
Remember the data that was created by the Function. 
For a Macro_Function, these are normally elements and are recorded as function attributes as 
Uids and/or Uid ranges. This is the data that needs to be deleted when the Function is rerun.
(f)
Can be Recalculated (or Recalced for short).
When a 12d Model Function is recalced, the Function first deletes all the data that it created in 
the previously run, and then runs the Function again.
(g)
Can on command, replace (delete or modify) all the data that the Function created on the 
pervious run with the data from this run.
The Macro_Function macro is just one macro and it is called with different command line arguments 
to let it know which mode it is in, and how it must behave.
The command line arguments that are used for a Macro_Function macro_function are:
(a)
macro_function                    with no command line arguments
When there are no command line arguments, the function is being run for the first time and the 
macro panel is displayed. 
(b)
macro_function    -function_recalc
The command line argument    -function_recalc tells the macro that it is being recalced. So 
the macro needs to delete all the old data it created, and run the option again using the input 
information already stored in the Function. No panel is displayed when the macro_function is 
recalced.
12d Model calls the macro with the -function_recalc command line argument when the macro 
function is called from the 12d Model Utilities =>Functions =>Recalc option.
(c)
macro_function    -function_edit
The command line argument    -function_edit tells the macro that it is being pulled up to be 
edited. That is, the macro_function needs to create the panel for the macro but the panel fields 
are filled with the input information that is stored with the function. 
The panel fields can be modified and when the process button is pressed, the old data created 

12d Model Macro_Functions
by the function must be deleted and the option run again.
12d Model calls the macro with the  -function_edit command line argument when the macro 
function is called from the 12d Model Utilities =>Functions=> Recalc=>Editor option.
(d)
macro_function    -function_delete
12d Model calls the macro with the  -function_delete command line argument when the macro 
function is called from the 12d Model Utilities =>Functions=> Recalc=>Delete option.
So the macro must first check for a command line argument.
More detailed information to help understand how the Macro_Function calls are used in a macro is 
given in the following sections:
See 5.64.1 Processing Command Line Arguments in a Macro_Function
See 5.64.2 Creating and Populating the Macro_Function Panel
See 5.64.3 Storing the Panel Information for Processing
See 5.64.4 Recalcing
See 5.64.5 Storing Calculated Information
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.1 Processing Command Line Arguments in a 
Macro_Function
The command line arguments -function_recalc, -function_edit, -function_delete and no arguments 
at all, need to be recognised and processed by the Macro_Function (for general information on 
command line arguments, see 5.4 Command Line-Arguments).
The following is an example of some code from Example 15 (see 6.20 Example 15) to trap and 
process the command line arguments for a Macro_Function:
void main()
// ----------------------------------------------------------------------------------------------
// This is where the macro starts and checks for command line arguments
// ------------------------------------------------------------------------------------------------
{
  Integer argc = Get_number_of_command_arguments();
  if(argc > 0) {
    Text arg;
    Get_command_argument(1,arg);          // check for the first command line argument
    if(arg == "-function_recalc") {                // check if it is -function_recalc
      Text function_name;
      Get_command_argument(2,function_name);     // the second command line argument
                                                                                  // is the function name
      recalc_macro(function_name);
    } else if(arg == "-function_edit") {                // check if it is -function_edit
      Text function_name;
      Get_command_argument(2,function_name);     // the second command line argument
                                                                                  // is the function name
      show_panel(function_name,1); // tell show_panel the name of the function to

12d Model Macro_Functions
Chapter   
                                                                      // get the panel field answers from for recalc
                                                         // See 5.64.2 Creating and Populating the Macro_Function 
Panel
    } else if(arg == "-function_delete") {
// not implemented yet
      Text function_name;
      Get_command_argument(2,function_name);
      Error_prompt("function_delete not implemented");
    } else if(arg == "-function_popup") {
// not implemented yet
      Text function_name;
      Get_command_argument(2,function_name);
      Error_prompt("function_popup not implemented");
    } else {
// normal processing?
      Error_prompt("huh ? say what"); // don’t know what the command is
    }
  } else { // there are no command line arguments
                                             // show the panel with no information from a previous run
                                            // See 5.64.2 Creating and Populating the Macro_Function Panel
    show_panel("",0);
  }
}
Continue to 5.64.2 Creating and Populating the Macro_Function Panel
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.2 Creating and Populating the Macro_Function Panel
The main difference between a panel in a standard macro and a panel in a Macro_Function is that 
for the Macro_Function, the panel has an Edit mode.
When in Edit mode, the Macro_Function has already been run before and the panel information for 
the macro is loaded from the previous run of the macro.
The easiest way to set this up is to build the panel in a function in the same way as you would in a 
standard macro, but pass down to the panel function an edit flag where:
when edit is zero, the panel is being run for the first time and there is no data to load from a 
previous run. This is the case when there are no command line arguments. See 5.64.1 
Processing Command Line Arguments in a Macro_Function. 
when edit is one, the panel is in Edit mode and the values from a previous run are loaded into 
the panel fields. This is the case when the command line argument is "-function_edit". See 
5.64.1 Processing Command Line Arguments in a Macro_Function.
The following is an example of some code from Example 15 (see 6.20 Example 15) to build a panel 
for both the first time the Macro_Function is called, and when it is called in Edit mode:

12d Model Macro_Functions
Integer show_panel(Text function_name,Integer edit)
// -----------------------------------------------------------------------------------------------------
// edit = 0 for the first time that the macro has been run
// edit = 1 when in edit mode. That is, the macro has been run before
// function_name is the function name. This is only known if the macro has been run before.
// That is, when edit = 1
// Note: in the section that processes the command line arguments, 
// edit is set to 1 when the command line argument is "-function_edit"
// edit is set to 0 when their are no command line arguments
// See 5.64.1 Processing Command Line Arguments in a Macro_Function
//------------------------------------------------------------------------------------------------------
// Macro_Function Dependencies
//      "string" Element
//
// Macro_Function attributes
//       "offset" Real
//       "start point"    Text
//       "end point"     Text
//       "new name"   Text
//       "new model"   Text
//       "new colour"  Text
//       "functype"      Text
//       "model" Uid
//       "element"       Uid
//------------------------------------------------------------------------------------------------------
{
  Macro_Function macro_function;
  Get_macro_function(function_name,macro_function);
  Panel panel = Create_panel("Parallel String Section");
  Vertical_Group    vgroup     = Create_vertical_group(0);
  Message_Box     message  = Create_message_box(" ");
// function box
  Function_Box function_box = Create_function_box("Function name", message,
                                                           CHECK_FUNCTION_CREATE,RUN_MACRO_T);
  Set_type(function_box,"parallel_part");    // set the function type so that the pop-up for the
                                                                   // function_box only shows functions of this type
  Append(function_box,vgroup);
  if(edit) Set_data(function_box,function_name);   // when in edit mode, function name is known
                                                                               // so load function_box with function_name
// string to parallel
  New_Select_Box select_box = Create_new_select_box("String to parallel","Select string",
                                                                                   SELECT_STRING, message);
  Append(select_box,vgroup);
  if(edit) {                   // when in edit mode, load select_box with the string from the last run.
    Element string;
    Get_dependancy_element(macro_function,"string",string);
    Set_data(select_box,string);
  }
// offset distance
  Real_Box value_box = Create_real_box("Offset",message);
  Append(value_box,vgroup);

12d Model Macro_Functions
Chapter   
  if(edit) {     // when in edit mode, load value_box with the offset from the last run
                   // offset was stored as a Real macro function attribute called "offset"
    Real offset;
    Get_function_attribute(macro_function,"offset",offset);
    Set_data(value_box,offset);
  }
           . . .    
Continue to 5.64.3 Storing the Panel Information for Processing
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.3 Storing the Panel Information for Processing
The panel information needs to be stored in the Macro_Function so that it is available at future 
times.
The following is an example of some code from Example 15 (see 6.20 Example 15) that goes in the 
section after the Process button has been selected. The panel information has been validated and 
the next step is to store the information into the Macro_Function and call macro_recalc.
// Store the panel information in the Macro_Function
    Delete_all_dependancies(macro_function);    // clean out any data already there

    Set_function_attribute(macro_function,"functype","parallel_part");   // type of function
    Add_dependancy_element(macro_function,"string",string);   // string to be paralleled
    Set_function_attribute(macro_function,"offset", offset); // offset value
    Set_function_attribute(macro_function,"start point",start);    // start chainage for parallel
    Set_function_attribute(macro_function,"end point",end);   // end chainage for parallel
    Set_function_attribute(macro_function,"new name",name);   // name of the created string
    Set_function_attribute(macro_function,"new model",name);   // model for the created string
    Set_function_attribute(macro_function,"new colour",colour_txt);  // colour of the created string
// Now do the processing
        Integer res = recalc_macro(function_name);
           . . .    
Continue to 5.64.4 Recalcing
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.4 Recalcing
For a Macro_Function, it is usually best to put all the processing into its own function, say 
recalc_macro.
That way the one calculation function can be used for each of the three processing cases:

12d Model Macro_Functions
1. when a Recalc is done.
2. when the Macro_Function is run for the first time and the process button is selected
3. when an Edit is done, the panels fields modified and the process button then selected
In the first case of a Recalc, all the information required for processing must already be contained in 
the Macro_Function itself and it is accessed via Get_dependency and Get_function_attribute calls.
For cases 2 and 3, a panel is actually displayed, information collected and then a process button 
selected. In both cases, the Macro_Function structure can be used to pass information through to 
the processing function by simply loading the information into Macro_Function via the function 
dependencies and function attributes before the processing function recalc_macro. 
So in all cases, the information is accused by the processing function recalc_maco in exactly the 
same way (See 5.64.3 Storing the Panel Information for Processingon how to store the information).
So with recalc_macro function should:
(a)
load and validate the panel data stored in the Macro_Function
(b)
check that the data created by the previous run can be replaced (deleted or modified), and 
clean it up as required.
For example, a string can not be deleted if it is locked by another option.
(c)
if there are no problems, do the processing.
(d)
save links to the new created data as attributes in the Macro_Function.
Continue to 5.64.3 Storing the Panel Information for Processing
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.5 Storing Calculated Information
The data created by the Macro_Function are usually Elements such as Tins, Model and Strings.
Models and Tins could be stored by their names since their names are unique to a project. On the 
other hand, a Model or Tin name may be changed so maybe their Uid’s should be saved. Or both 
the name and the Uid could be saved.
Strings do not have unique names and usually it is best to save them by their Uids. If the processing 
produces strings with sequential Uids, then just the first and the last Uids need to be stored.
There is no definite answer to how the information should be stored because it varies with every 
macro. 
In the code extract below from Example 15 (see 6.20 Example 15) the paralleled string is stored as 
the Uid of the model containing the string, and the Uid of the string.
// store details of the created string in function attributes
    Uid mid, eid;
    Get_id(model,mid); // get the Uid of the model containing elt
    Get_id(elt,eid);                               // get the Uid of elt
    Set_function_attribute(macro_function,"model",mid);
    Set_function_attribute(macro_function,"element",eid);
All the 12d Model Macro_Function calls are given in 5.64.6 Macro_Function Functions.
5.64.6 Macro_Function Functions

12d Model Macro_Functions
Chapter

### `Create_macro_function`

```c
Integer Create_macro_function(Text function_name,Macro_Function &func)
```

Create a user defined 12d Model Function with the name function_name and return the created Function as func. If a Function with the name function_name already exists, the function fails and a non-zero function return value is returned. A function return value of zero indicates the Function was successfully created.

> ID = 1135

### `Function_recalc`

```c
Integer Function_recalc(Function func)
```

Recalc (i.e. re-run) the Function func. A function return value of zero indicates the recalc was successful.

> ID = 1138

### `Function_exists`

```c
Integer Function_exists(Text function_name)
```

Checks to see if a 12d or user 12d Function with the name function_name exists. A non-zero function return value indicates a Function does exist. A zero function return value indicates that no Function of name function_name exists. Warning - this is the opposite of most 12dPL function return values.

> ID = 1141

### `Function_rename`

```c
Integer Function_rename(Text original_name,Text new_name)
```

Change the name of the Function original_name to the new name new_name. A function return value of zero indicates the rename was successful.

> ID = 425

### `Get_name`

```c
Integer Get_name(Function func,Text &name) 12d Model Macro_Functions
```

Get the name of the Function func and return it in name. A function return value of zero indicates the Function name was successfully returned.

> ID = 1455

### `Get_type`

```c
Integer Get_type(Function func,Integer &func_type)
```

Get the type of the Function func and return it in func_type. The value of func_type is listed in the Appendix A - Function type. See Function Type. A function return value of zero indicates the Function name was successfully returned.

> ID = 3530

### `Get_function`

```c
Function Get_function(Text function_name)
```

Get the Function with the name function_name and return it as the function return value. If the function does not exist, a null function will be returned. The existence of a function with the name function_name can first be checked by the call Function_exists(function_name).

> ID = 1140

### `Get_macro_function`

```c
Integer Get_macro_function(Text function_name,Macro_Function &func)
```

Get the Macro Function with the name function_name and return it as func. If the Function named function_name does not exist, or it does exist but is not a Macro Function, then the function fails and a non-zero function return value is returned. A function return value of zero indicates the Macro Function was successfully returned.

> ID = 1142

### `Get_all_functions`

```c
Integer Get_all_functions(Dynamic_Text &functions)
```

Get all names of the 12d and user defined Function currently in the project. The Function names are returned in the Dynamic_Text functions. 12d Model Macro_Functions Chapter A function return value of zero indicates the Function names are returned successfully.

> ID = 1139

### `Function_delete`

```c
Integer Function_delete(Text function_name)
```

Delete the Function with the name function_name. Note that the data in the function is not deleted. If a Function with the name function_name does not exist, the function fails and a non-zero function return value is returned. A function return value of zero indicates the Function was successfully deleted.

> ID = 1137

### `Get_time_created`

```c
Integer Get_time_created(Function func,Integer &time)
```

Get the time that the Function func was created and return the time in time. The time time is given as seconds since January 1 1970. A function return value of zero indicates the time was successfully returned.

> ID = 2117

### `Get_time_updated`

```c
Integer Get_time_updated(Function func,Integer &time)
```

Get the time that the Function func was last updated and return the time in time. The time time is given as seconds since January 1 1970. A function return value of zero indicates the time was successfully returned.

> ID = 2118

### `Set_time_updated`

```c
Integer Set_time_updated(Function func,Integer time)
```

Set the update time for the Function func to time. The time time is given as seconds since January 1 1970. A function return value of zero indicates the time was successfully set. 12d Model Macro_Functions

> ID = 2119

### `Add_dependancy_file`

```c
Integer Add_dependancy_file(Macro_Function func,Text name,Text file)
```

Record in the Macro Function func, that the disk file named file is dependant on func and on a recalc of func, needs to be checked for changes from the last time that func was recalced. The dependency is added with the unique name name. If a dependency called name already exists, a non-zero function return value is returned and no dependency is added. A function return value of zero indicates the dependency was successfully set.

> ID = 1143

### `Add_dependancy_model`

```c
Integer Add_dependancy_model(Macro_Function func,Text name,Model model)
```

Record in the Macro Function func, that the Model model is dependant on func and on a recalc of func, needs to be checked for changes from the last time that func was recalced. If a dependency called name already exists, a non-zero function return value is returned and no dependency is added. A function return value of zero indicates the dependency was successfully set.

> ID = 1144

### `Add_dependancy_tin`

```c
Integer Add_dependancy_tin(Macro_Function func,Text name,Tin tin)
```

Record in the Macro Function func, that the Tin tin is dependant on func and on a recalc of func, needs to be checked for changes from the last time that func was recalced. If a dependency called name already exists, a non-zero function return value is returned and no dependency is added. A function return value of zero indicates the dependency was successfully set.

> ID = 1145

Integer Add_dependancy_template(Macro_Function func,Text name,Text template) 
Name
Integer Add_dependancy_template(Macro_Function func,Text name,Text template) 
Description
Record in the Macro Function func, that the template name template is dependant on func and on 

12d Model Macro_Functions
Chapter   
a recalc of func, needs to be checked for changes from the last time that func was recalced.
If a dependency called name already exists, a non-zero function return value is returned and no 
dependency is added.
A function return value of zero indicates the dependency was successfully set.
ID = 1146

### `Add_dependancy_element`

```c
Integer Add_dependancy_element(Macro_Function func,Text name,Element elt)
```

Record in the Macro Function func, that the Element elt is dependant on func and on a recalc of func, needs to be checked for changes from the last time that func was recalced. If a dependency called name already exists, a non-zero function return value is returned and no dependency is added. A function return value of zero indicates the dependency was successfully set.

> ID = 1147

### `Get_number_of_dependancies`

```c
Integer Get_number_of_dependancies(Macro_Function func,Integer &count)
```

For the Macro_Function func, return the number of dependencies that exist for func and return the number in count. A function return value of zero indicates the count was successfully returned.

> ID = 1148

### `Get_dependancy_name`

```c
Integer Get_dependancy_name(Macro_Function func,Integer i,Text &name)
```

For the Macro_Function func, return the name of the i’th dependencies in name. A function return value of zero indicates the name was successfully returned.

> ID = 1149

### `Get_dependancy_type`

```c
Integer Get_dependancy_type(Macro_Function func,Integer i,Text &type)
```

For the Macro_Function func, return the type of the i’th dependencies as the Text type. The valid types are: 12d Model Macro_Functions unknown File Element Model Template Tin Integer Real Text A function return value of zero indicates the type was successfully returned.

> ID = 1150

### `Get_dependancy_file`

```c
Integer Get_dependancy_file(Macro_Function func,Integer i,Text &file)
```

For the Macro_Function func, if the i’th dependency is a file then return the name of the file in name. If the i’th dependency is not a file then a non-zero function return value is returned. A function return value of zero indicates the file name was successfully returned.

> ID = 1151

### `Get_dependancy_model`

```c
Integer Get_dependancy_model(Macro_Function func,Integer i,Model &model)
```

For the Macro_Function func, if the i’th dependency is a Model then return the Model in model. If the i’th dependency is not a Model then a non-zero function return value is returned. A function return value of zero indicates the Model was successfully returned.

> ID = 1152

### `Get_dependancy_tin`

```c
Integer Get_dependancy_tin(Macro_Function func,Integer i,Tin &tin)
```

For the Macro_Function func, if the i’th dependency is a Tin then return the Tin in tin. If the i’th dependency is not a Tin then a non-zero function return value is returned. A function return value of zero indicates the Tin was successfully returned.

> ID = 1153

### `Get_dependancy_template`

```c
12d Model Macro_Functions Chapter Integer Get_dependancy_template(Macro_Function func,Integer i,Text &template)
```

For the Macro_Function func, if the i’th dependency is a Template then return the template name in template. If the i’th dependency is not a Template then a non-zero function return value is returned. A function return value of zero indicates the Tin was successfully returned.

> ID = 1154

### `Get_dependancy_element`

```c
Integer Get_dependancy_element(Macro_Function func,Integer i,Element &element)
```

For the Macro_Function func, if the i’th dependency is an Element then return the Element in elt. If the i’th dependency is not an Element then a non-zero function return value is returned. A function return value of zero indicates the Element was successfully returned.

> ID = 1155

### `Get_dependancy_data`

```c
Integer Get_dependancy_data(Macro_Function func,Integer i,Text &text)
```

For the Macro_Function func, a text description of the i’th dependency is returned in text. For an Element, the text description is: model_name->element_name is return in text. For a File/Model/Template/Tin, the text description is the name of the File/Model/Template/Tin. For an Integer, the text description is the Integer converted to Text. For a Real, the text description is the Real converted to Text. LJG? how many decimals For a Text, the text description is just the text. A function return value of zero indicates the Macro_Function description was successfully returned.

> ID = 1156

### `Get_dependancy_type`

```c
Integer Get_dependancy_type(Macro_Function func,Text name,Text &type)
```

For the Macro_Function func, return the type of the dependency with the name name as the Text type. The valid types are: unknown File Element Model 12d Model Macro_Functions Template Tin Integer // not implemented or accessible from macros Real // not implemented or accessible from macros Text // not implemented or accessible from macros If a dependency called name does not exist then a non-zero function return value is returned. A function return value of zero indicates the type was successfully returned.

> ID = 1157

### `Get_dependancy_file`

```c
Integer Get_dependancy_file(Macro_Function func,Text name,Text &file)
```

For the Macro_Function func, get the dependency called name and if it is a File, return the file name as file. If no dependency called name exists, or it does exist and it is not a file, then a non-zero function return value is returned; and also file remains unchanged. A function return value of zero indicates the file name was successfully returned.

> ID = 1158

### `Get_dependancy_model`

```c
Integer Get_dependancy_model(Macro_Function func,Text name,Model &model)
```

For the Macro_Function func, get the dependency called name and if it is a Model, return the Model as model. If no dependency called name exists, or it does exist and it is not a Model, then a non-zero function return value is returned; and also model remains unchanged. A function return value of zero indicates the Model was successfully returned.

> ID = 1159

### `Get_dependancy_tin`

```c
Integer Get_dependancy_tin(Macro_Function func,Text name,Tin &tin)
```

For the Macro_Function func, get the dependency called name and if it is a Tin, return the Tin as tin. If no dependency called name exists, or it does exist and it is not a Tin, then a non-zero function return value is returned; and also tin remains unchanged. A function return value of zero indicates the Tin was successfully returned.

> ID = 1160

12d Model Macro_Functions
Chapter

### `Get_dependancy_template`

```c
Integer Get_dependancy_template(Macro_Function func,Text name,Text &template)
```

For the Macro_Function func, get the dependency called name and if it is a Template, return the Template name as template. If no dependency called name exists, or it does exist and it is not a Template, then a non-zero function return value is returned; and also template remains unchanged. A function return value of zero indicates the template name was successfully returned.

> ID = 1161

### `Get_dependancy_element`

```c
Integer Get_dependancy_element(Macro_Function func,Text name,Element &element)
```

For the Macro_Function func, get the dependency called name and if it is an Element, return the Element as elt. If no dependency called name exists, or it does exist and it is not an Element, then a non-zero function return value is returned; and also elt remains unchanged. A function return value of zero indicates the Element was successfully returned.

> ID = 1162

### `Get_dependancy_data`

```c
Integer Get_dependancy_data(Macro_Function func,Text name,Text &text)
```

For the Macro_Function func, get the dependency called name and if it is a Text, return the Text as text. If no dependency called name exists, or it does exist and it is not a Text, then a non-zero function return value is returned; and also text remains unchanged. A function return value of zero indicates the Text was successfully returned.

> ID = 1163

### `Delete_dependancy`

```c
Integer Delete_dependancy(Macro_Function func,Text name)
```

For the Macro_Function func, if the dependency called name exist then it is deleted from the list of dependencies for func. Warning: if a dependency is deleted then the dependency number of all dependencies after the deleted one will be reduced by one. If no dependency called name exists then a non-zero function return value is returned. 12d Model Macro_Functions A function return value of zero indicates the dependency was successfully deleted.

> ID = 1164

### `Delete_all_dependancies`

```c
Integer Delete_all_dependancies(Macro_Function func)
```

For the Macro_Function func, delete all the dependencies. A function return value of zero indicates all the dependency were successfully deleted.

> ID = 1165

### `Get_id`

```c
Integer Get_id(Function func,Uid &id)
```

For the Function/Macro_Function func, get its unique Uid in the Project and return it in id. A function return value of zero indicates the Uid was successfully returned.

> ID = 1909

### `Get_id`

```c
Integer Get_id(Function func,Integer &id)
```

For the Function/Macro_Function func, get its unique id in the Project and return it in id. A function return value of zero indicates the id was successfully returned. Deprecation Warning - this function has now been deprecated and will no longer exist unless special compile flags are used. Use Get_id(Function func,Uid &id) instead.

> ID = 1177

### `Get_function_id`

```c
Integer Get_function_id(Element elt,Uid &id)
```

For an Element elt, check if it has a function Uid and if it has, return it in id. If the element doesn’t have a function Uid, id will be set as null. A function return value of zero indicates the Uid was successfully returned.

> ID = 1910

Get_function_id(Element elt,Integer &id) 

12d Model Macro_Functions
Chapter   
Name
Integer Get_function_id(Element elt,Integer &id) 
Description
For an Element elt, check if it has a function id and if it has, return it in id.
If elt doesn’t have a function id, id will be set to 0 and the return value is also zero 
A function return value of zero indicates the id was successfully returned.
Deprecation Warning - this function has now been deprecated and will no longer exist unless 
special compile flags are used. Use Get_function_id(Element elt,Uid &id) instead.
ID = 1178

### `Set_function_id`

```c
Integer Set_function_id(Element elt,Uid id)
```

For an Element elt, set its function Uid to id. A function return value of zero indicates the function Uid was successfully set.

> ID = 1911

### `Set_function_id`

```c
Integer Set_function_id(Element elt,Integer id)
```

For an Element elt, set its function id to id. A function return value of zero indicates the function id was successfully set. Deprecation Warning - this function has now been deprecated and will no longer exist unless special compile flags are used. Use Set_function_id(Element elt,Uid id) instead.

> ID = 1179

### `Get_function`

```c
Function Get_function(Uid function_id)
```

Find the Function/Macro_Function with the Uid function_id. The Function is returned as the function return value. If there is no Function/Macro_Function with the Uid function_id, then a null Function/ Macro_Function is returned as the function return value.

> ID = 1916

### `Get_function`

```c
12d Model Macro_Functions Function Get_function(Integer function_id)
```

Find the Function/Macro_Function with the Id function_id. The Function is returned as the function return value. If there is no Function/Macro_Function with the Id function_id, then a null Function/ Macro_Function is returned as the function return value. Deprecation Warning - this function has now been deprecated and will no longer exist unless special compile flags are used. Use Get_function(Uid function_id) instead.

> ID = 1188

### `Function_exists`

```c
Integer Function_exists(Uid function_id)
```

Checks to see if a Function/Macro_Function with Uid function_id exists. A non-zero function return value indicates that a Function does exist. A zero function return value indicates that no Function exists. Warning this is the opposite of most 12dPL function return values

> ID = 1915

Function_attribute_exists(Macro_Function fcn,Text att_name)

### `Function_attribute_exists`

```c
Integer Function_attribute_exists(Macro_Function fcn,Text att_name) Integer Function_attribute_exists(Function fcn,Text att_name)
```

Checks to see if an attribute with the name att_name exists for the Macro_Function/Function fcn. A non-zero function return value indicates that the attribute does exist. A zero function return value indicates that no attribute of that name exists. Warning this is the opposite of most 12dPL function return values

> ID = 1109

Function_attribute_exists(Function fcn,Text name,Integer &no)

### `Function_attribute_exists`

```c
Integer Function_attribute_exists(Function fcn,Text name,Integer &no) Integer Function_attribute_exists(Macro_Function fcn,Text name,Integer &no)
```

Checks to see if an attribute with the name att_name exists for the Macro_Function/Function fcn. If the attribute exists, its position is returned in Integer no. 12d Model Macro_Functions Chapter This position can be used in other Attribute functions described below. A non-zero function return value indicates the attribute does exist. A zero function return value indicates that no attribute of that name exists. Warning this is the opposite of most 12dPL function return values

> ID = 1110

Function_attribute_delete(Macro_Function fcn,Text att_name)

### `Function_attribute_delete`

```c
Integer Function_attribute_delete(Macro_Function fcn,Text att_name) Integer Function_attribute_delete(Function fcn,Text att_name)
```

Delete the attribute with the name att_name from the Macro_Function/Function fcn. A function return value of zero indicates the attribute was deleted.

> ID = 1111

Function_attribute_delete(Macro_Function fcn,Integer att_no)

### `Function_attribute_delete`

```c
Integer Function_attribute_delete(Macro_Function fcn,Integer att_no) Integer Function_attribute_delete(Function fcn,Integer att_no)
```

Delete the attribute with the number att_no from the Macro_Function/Function fcn. A function return value of zero indicates the attribute was deleted.

> ID = 1112

Function_attribute_delete_all(Function fcn)

### `Function_attribute_delete_all`

```c
Integer Function_attribute_delete_all(Function fcn) Integer Function_attribute_delete_all(Macro_Function fcn)
```

Delete all the attributes from the Macro_Function/Function fcn. A function return value of zero indicates all the attribute were deleted.

> ID = 1113

Function_attribute_dump(Function fcn) 
Function_attribute_dump(Macro_Function fcn) 

12d Model Macro_Functions
Name
Integer Function_attribute_dump(Function fcn)   
Integer Function_attribute_dump(Macro_Function fcn)   
Description
Write out information about the Macro_Function/Function attributes to the Output Window.
 A function return value of zero indicates the function was successful.
ID = 1114
Function_attribute_debug(Macro_Function fcn)

### `Function_attribute_debug`

```c
Integer Function_attribute_debug(Macro_Function fcn) Integer Function_attribute_debug(Function fcn)
```

Write out even more information about the Macro_Function/Function attributes to the Output Window. A function return value of zero indicates the function was successful.

> ID = 1115

Get_function_number_of_attributes(Function fcn,Integer &no_atts)

### `Get_function_number_of_attributes`

```c
Integer Get_function_number_of_attributes(Function fcn,Integer &no_atts) Integer Get_function_number_of_attributes(Macro_Function fcn,Integer &no_atts)
```

Get the number of top level attributes in the Macro_Function/Function fcn and return it in no_atts. A function return value of zero indicates the number is successfully returned

> ID = 1116

Get_function_attribute(Macro_Function fcn,Text att_name,Text &txt)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Macro_Function fcn,Text att_name,Text &att) Integer Get_function_attribute(Function fcn,Text att_name,Text &txt)
```

For the Macro_Function/Function fcn, get the attribute called att_name and return the attribute value in txt. The attribute must be of type Text. If the attribute is not of type Text then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. 12d Model Macro_Functions Chapter Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1117

Get_function_attribute(Macro_Function fcn,Text att_name,Integer &int)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Macro_Function fcn,Text att_name,Integer &int) Integer Get_function_attribute(Function fcn,Text att_name,Integer &int)
```

For the Macro_Function/Function fcn, get the attribute called att_name and return the attribute value in int. The attribute must be of type Integer. If the attribute is not of type Integer then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1118

Get_function_attribute(Function fcn,Text att_name,Real &real)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Text att_name,Real &real) Integer Get_function_attribute(Macro_Function fcn,Text att_name,Real &real)
```

For the Macro_Function/Function fcn, get the attribute called att_name and return the attribute value in real. The attribute must be of type Real. If the attribute is not of type Real then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1119

Get_function_attribute(Function fcn,Integer att_no,Text &txt)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Integer att_no,Text &txt) Integer Get_function_attribute(Macro_Function fcn,Integer att_no,Text &txt)
```

For the Macro_Function/Function fcn, get the attribute with attribute number att_no and return the attribute value in txt. The attribute must be of type Text. 12d Model Macro_Functions If the attribute is not of type Text then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1120

Get_function_attribute(Function fcn,Integer att_no,Integer &int)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Integer att_no,Integer &int) Integer Get_function_attribute(Macro_Function fcn,Integer att_no,Integer &int)
```

For the Macro_Function/Function fcn, get the attribute with attribute number att_no and return the attribute value in int. The attribute must be of type Integer. If the attribute is not of type Integer then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1121

Get_function_attribute(Function fcn,Integer att_no,Real real)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Integer att_no,Real real) Integer Get_function_attribute(Macro_Function fcn,Integer att_no,Real real)
```

For the Macro_Function/Function fcn, get the attribute with attribute number att_no and return the attribute value in real. The attribute must be of type Real. If the attribute is not of type Real then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1122

Get_function_attribute_name(Macro_Function fcn,Integer att_no,Text &txt)

### `Get_function_attribute_name`

```c
Integer Get_function_attribute_name(Macro_Function fcn,Integer att_no,Text &txt) Integer Get_function_attribute_name(Function fcn,Integer att_no,Text &txt)
```

12d Model Macro_Functions Chapter For the Macro_Function/Function fcn, get the attribute with attribute number att_no and return the attribute value in txt. The attribute must be of type Text. If the attribute is not of type Text then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1123

Get_function_attribute_type(Macro_Function fcn,Text att_name,Integer &att_type)

### `Get_function_attribute_type`

```c
Integer Get_function_attribute_type(Macro_Function fcn,Text att_name,Integer &att_type) Integer Get_function_attribute_type(Function fcn,Text att_name,Integer &att_type)
```

For the Macro_Function/Function fcn, get the type of the attribute called att_name and return the attribute type in att_type. A function return value of zero indicates the attribute type is successfully returned.

> ID = 1124

Get_function_attribute_type(Function fcn,Integer att_no,Integer &att_type) 
Get_function_attribute_type(Macro_Function fcn,Integer att_no,Integer
         &att_type) 
Name
Integer Get_function_attribute_type(Function fcn,Integer att_no,Integer &att_type) 
Integer Get_function_attribute_type(Macro_Function fcn,Integer att_no,Integer &att_type)
Description
For the Macro_Function/Function fcn, get the type of the attribute with attribute number att_no and 
return the attribute type in att_type.
A function return value of zero indicates the attribute type is successfully returned.
ID = 1125
Get_function_attribute_length(Function fcn,Text att_name,Integer &att_len)

### `Get_function_attribute_length`

```c
Integer Get_function_attribute_length(Function fcn,Text att_name,Integer &att_len) Integer Get_function_attribute_length(Macro_Function fcn,Text att_name,Integer &att_len)
```

For the Macro_Function/Function fcn, get the length in bytes of the attribute of name att_name. The number of bytes is returned in att_len. This is mainly for use with attributes of types Text and Binary (blobs) 12d Model Macro_Functions A function return value of zero indicates the attribute length is successfully returned.

> ID = 1126

Get_function_attribute_length(Function fcn,Integer att_no,Integer &att_len)

### `Get_function_attribute_length`

```c
Integer Get_function_attribute_length(Function fcn,Integer att_no,Integer &att_len) Integer Get_function_attribute_length(Macro_Function fcn,Integer att_no,Integer &att_len)
```

For the Macro_Function/Function fcn, get the length in bytes of the attribute with attribute number att_no. The number of bytes is returned in att_len. This is mainly for use with attributes of types Text and Binary (blobs) A function return value of zero indicates the attribute length is successfully returned.

> ID = 1127

Set_function_attribute(Function fcn,Text att_name,Text txt)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Function fcn,Text att_name,Text txt) Integer Set_function_attribute(Macro_Function fcn,Text att_name,Text txt)
```

For the Macro_Function/Function fcn, if the attribute called att_name does not exist then create it as type Text and give it the value txt. if the attribute called att_name does exist and it is type Text, then set its value to txt. If the attribute exists and is not of type Text, or the attribute does not exist, then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1128

Set_function_attribute(Function fcn,Text att_name,Integer int)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Function fcn,Text att_name,Integer int) Integer Set_function_attribute(Macro_Function fcn,Text att_name,Integer int)
```

For the Macro_Function/Function fcn, if the attribute called att_name does not exist then create it as type Integer and give it the value int. if the attribute called att_name does exist and it is type Integer, then set its value to int. 12d Model Macro_Functions Chapter If the attribute exists and is not of type Integer, or the attribute does not exist, then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1129

Set_function_attribute(Macro_Function fcn,Text att_name,Real real)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Macro_Function fcn,Text att_name,Real real) Integer Set_function_attribute(Function fcn,Text att_name,Real real)
```

For the Macro_Function/Function fcn, if the attribute called att_name does not exist then create it as type Real and give it the value real. if the attribute called att_name does exist and it is type Real, then set its value to real. If the attribute exists and is not of type Real, or the attribute does not exist, then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_function_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1130

Set_function_attribute(Macro_Function fcn,Integer att_no,Text txt)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Macro_Function fcn,Integer att_no,Text txt) Integer Set_function_attribute(Function fcn,Integer att_no,Text txt)
```

For the Macro_Function/Function fcn, if the attribute with attribute number att_no does not exist then create it as type Text and give it the value txt. if the attribute with attribute number att_no does exist and it is type Text, then set its value to txt. If the attribute exists and is not of type Text, or the attribute does not exist, then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_function_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 1131

Set_function_attribute(Function fcn,Integer att_no,Integer int) 
Set_function_attribute(Macro_Function fcn,Integer att_no,Integer int)

12d Model Macro_Functions
Name
Integer Set_function_attribute(Function fcn,Integer att_no,Integer int) 
Integer Set_function_attribute(Macro_Function fcn,Integer att_no,Integer int) 
Description
For the Macro_Function/Function fcn,
   if the attribute with attribute number att_no does not exist then create it as type Integer and give it 
the value int.
   if the attribute with attribute number att_no does exist and it is type Integer, then set its value to 
int.
If the attribute exists and is not of type Integer, or the attribute does not exist, then a non-zero return 
value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_function_attribute_type call can be used to get the type of the attribute with attribute 
number att_no.
ID = 1132
Set_function_attribute(Macro_Function fcn,Integer att_no,Real real)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Macro_Function fcn,Integer att_no,Real real) Integer Set_function_attribute(Function fcn,Integer att_no,Real real)
```

For the Macro_Function/Function fcn, if the attribute with attribute number att_no does not exist then create it as type Real and give it the value real. if the attribute with attribute number att_no does exist and it is type Real, then set its value to real. If the attribute exists and is not of type Real, or the attribute does not exist, then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_function_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 1133

Get_function_attributes(Function fcn,Attributes &att)

### `Get_function_attributes`

```c
Integer Get_function_attributes(Function fcn,Attributes &att) Integer Get_function_attributes(Macro_Function fcn,Attributes &att)
```

For the Function/Macro_Function fcn, return the Attributes for the Function/Macro_Function as att. If fcn has no Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute is successfully returned.

> ID = 1992

12d Model Macro_Functions
Chapter   
Set_function_attributes(Function fcn,Attributes att)

### `Set_function_attributes`

```c
Integer Set_function_attributes(Function fcn,Attributes att) Integer Set_function_attributes(Macro_Function fcn,Attributes att)
```

For the Function/Macro_Function fcn, set the Attributes for the Function/Macro_Function fcn to att. A function return value of zero indicates the attribute is successfully set.

> ID = 1993

Get_function_attribute(Function fcn,Text att_name,Uid &uid)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Text att_name,Uid &uid) Integer Get_function_attribute(Macro_Function fcn,Text att_name,Uid &uid)
```

From the Function/Macro_Function fcn, get the attribute called att_name and return the attribute value in uid. The attribute must be of type Uid. If the attribute is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1994

Get_function_attribute(Macro_Function fcn,Text att_name,Attributes &att)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Macro_Function fcn,Text att_name,Attributes &att) Integer Get_function_attribute(Function fcn,Text att_name,Attributes &att)
```

From the Function/Macro_Function fcn, get the attribute called att_name and return the attribute value in att. The attribute must be of type Attributes. If the attribute is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1995

Get_function_attribute(Macro_Function fcn,Integer att_no,Uid &uid)   

12d Model Macro_Functions

### `Get_function_attribute`

```c
Integer Get_function_attribute(Macro_Function fcn,Integer att_no,Uid &uid) Integer Get_function_attribute(Function fcn,Integer att_no,Uid &uid)
```

From the Function/Macro_Function fcn, get the attribute with number att_no and return the attribute value in uid. The attribute must be of type Uid. If the attribute is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 1996

Get_function_attribute(Function fcn,Integer att_no,Attributes &att)

### `Get_function_attribute`

```c
Integer Get_function_attribute(Function fcn,Integer att_no,Attributes &att) Integer Get_function_attribute(Macro_Function fcn,Integer att_no,Attributes &att)
```

From the Function/Macro_Function fcn, get the attribute with number att_no and return the attribute value in att. The attribute must be of type Attributes. If the attribute is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 1997

Set_function_attribute(Function fcn,Text att_name,Uid uid)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Function fcn,Text att_name,Uid uid) Integer Set_function_attribute(Macro_Function fcn,Text att_name,Uid uid)
```

For the Function/Macro_Function fcn, if the attribute called att_name does not exist then create it as type Uid and give it the value uid. if the attribute called att_name does exist and it is type Uid, then set its value to att. If the attribute exists and is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1998

12d Model Macro_Functions
Chapter   
Set_function_attribute(Macro_Function fcn,Text att_name,Attributes att)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Macro_Function fcn,Text att_name,Attributes att) Integer Set_function_attribute(Function fcn,Text att_name,Attributes att)
```

For the Function/Macro_Function fcn, if the attribute called att_name does not exist then create it as type Attributes and give it the value att. if the attribute called att_name does exist and it is type Attributes, then set its value to att. If the attribute exists and is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 1999

Set_function_attribute(Macro_Function fcn,Integer att_no,Uid uid)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Macro_Function fcn,Integer att_no,Uid uid) Integer Set_function_attribute(Function fcn,Integer att_no,Uid uid)
```

For the Function/Macro_Function fcn, if the attribute number att_no exists and it is of type Uid, then its value is set to att. If there is no attribute with number att_no then nothing can be done and a non-zero return code is returned. If the attribute of number att_no exists and is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> ID = 2000

Set_function_attribute(Function fcn,Integer att_no,Attributes att)

### `Set_function_attribute`

```c
Integer Set_function_attribute(Function fcn,Integer att_no,Attributes att) Integer Set_function_attribute(Macro_Function fcn,Integer att_no,Attributes att)
```

For the Function/Macro_Function fcn, if the attribute number att_no exists and it is of type Attributes, then its value is set to att. If there is no attribute with number att_no then nothing can be done and a non-zero return code is returned. 12d Model Macro_Functions If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> ID = 2001

12d Model Macro_Functions
Chapter   
5.64.7 Elements from Function
The following calls help users to get, draw, or clean a list of elements from a given function_id (of 
Uid type) or given function (of Function type).
Note only some function types support those type of calls; the list include: Apply_Template, 
Interface, SLF, Cuts_Calc, Survey_Data_Reduction, Vehicle_Path, and some of Macro_Function 
types.
For many user project, searching an Element from every models might take a long time, so for those 
function types, for each function, 12D keeping track of four Uid to make the search more efficient: 
start model id; end model id; start element id; end element id.

### `Get_function_data_start_model_id`

```c
Integer Get_function_data_start_model_id(Function f,Uid &uid)
```

Get the smallest model id from a give function f and set the value to Uid uid, A function return value of zero indicates the Uid value is successfully set..

> ID = 7712

### `Get_function_data_end_model_id`

```c
Integer Get_function_data_end_model_id(Function f,Uid &uid)
```

Get the biggest model id from a give function f and set the value to Uid uid, A function return value of zero indicates the Uid value is successfully set..

> ID = 7713

### `Get_function_data_start_element_id`

```c
Integer Get_function_data_start_element_id(Function f,Uid &uid)
```

Get the smallest element id from a give function f and set the value to Uid uid, A function return value of zero indicates the Uid value is successfully set..

> ID = 7714

### `Get_function_data_end_element_id`

```c
Integer Get_function_data_end_element_id(Function f,Uid &uid)
```

Get the biggest element id from a give function f and set the value to Uid uid, A function return value of zero indicates the Uid value is successfully set..

> ID = 7715

12d Model Macro_Functions
Get_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins,Dynamic_Element &elements)
Name
Integer Get_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins,Dynamic_Element &elements)
Description
Get all the elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) and set those to Dynamic_Element elements, If 
skip_tins is non zero, then tins are not included in the list of result.
A function return value of zero indicates the elements list is successfully set..
ID = 2794
Get_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins,Integer 
loaded_models,Dynamic_Element &elements)
Name
Integer Get_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins,Integer loaded_models,Dynamic_Element &elements)
Description
Get all the elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) and set those to Dynamic_Element elements, If 
skip_tins is non zero, then tins are not included in the list of result. The search will load previously 
unloaded model into the project if loaded_models is non zero.
A function return value of zero indicates the elements list is successfully set..
ID = 2795
Get_models(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins,Dynamic_Text &models)
Name
Integer Get_models(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins,Dynamic_Text &models)
Description
Get all the models created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) and set their names to Dynamic_Text models, If 
skip_tins is non zero, then tins are not included in the list of result.
A function return value of zero indicates the names list is successfully set.
ID = 2796
Get_models(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins,Integer 
loaded_models,Dynamic_Text &models)
Name

12d Model Macro_Functions
Chapter   
Integer Get_models(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins,Integer loaded_models,Dynamic_Text &models)
Description
Get all the models created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) and set their names to Dynamic_Text models, If 
skip_tins is non zero, then tins are not included in the list of result. The search will load previously 
unloaded model into the project if loaded_models is non zero.
A function return value of zero indicates the names list is successfully set.
ID = 2797
Check_elements_for_clean(Uid function_id,Uid start_model_id,Uid 
end_model_id,Uid start_element_id,Uid end_element_id,Integer skip_tins)
Name
Integer Check_elements_for_clean(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins)
Description
Check if all elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) are ready for clean. If skip_tins is non zero, 
then tins are not included in the list to check.
A function return value of zero all elements are ready for clean.
ID = 2798
Clean_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins)
Name
Integer Clean_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins)
Description
Clean all elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id). If skip_tins is non zero, then tins are not 
included in the list to clean.
A function return value of zero all elements are cleaned successfully.
ID = 2799
Clean_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins,Dynamic_Element 
&elements)
Name
Integer Clean_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins,Dynamic_Element &elements)
Description
Clean all elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id). If skip_tins is non zero, then tins are not 
included in the list to clean. The list of old elements also is returned in Dynamic_Element elements.

12d Model Macro_Functions
A function return value of zero all elements are cleaned successfully.
ID = 2800
Draw_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_element_id,Integer skip_tins)
Name
Integer Draw_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_element_id,Integer skip_tins)
Description
Redraw all elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id). If skip_tins is non zero, then tins are not 
included in the list to draw.
A function return value of zero all elements are drawn successfully.
ID = 2801
Draw_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid 
start_element_id,Uid end_model_id,Integer skip_tins,Integer colour)
Name
Integer Draw_elements(Uid function_id,Uid start_model_id,Uid end_model_id,Uid start_element_id,Uid 
end_model_id,Integer skip_tins,Integer colour)
Description
Redraw all elements created by given function_id (limitted the search by start_model_id, 
end_model_id, start_element_id, end_element_id) using an override Colour colour. If skip_tins is 
non zero, then tins are not included in the list to draw.
A function return value of zero all elements are drawn successfully.
ID = 2802

### `Get_elements`

```c
Integer Get_elements(Uid function_id,Integer skip_tins,Dynamic_Element &elements))
```

Get all the elements created by given function_id and set those to Dynamic_Element elements, If skip_tins is non zero, then tins are not included in the list of result. A function return value of zero indicates the elements list is successfully set.

> ID = 7716

Get_elements(Uid function_id,Integer skip_tins,Integer 
loaded_models,Dynamic_Element &elements)
Name
Integer Get_elements(Uid function_id,Integer skip_tins,Integer loaded_models,Dynamic_Element 
&elements)
Description

12d Model Macro_Functions
Chapter   
Get all the elements created by given function_id and set those to Dynamic_Element elements, If 
skip_tins is non zero, then tins are not included in the list of result. The search will load previously 
unloaded model into the project if loaded_models is non zero.
A function return value of zero indicates the elements list is successfully set..
ID = 7717

### `Get_models`

```c
Integer Get_models(Uid function_id,Integer skip_tins,Dynamic_Text &models)
```

Get all the models created by given function_id and set their names to Dynamic_Text models, If skip_tins is non zero, then tins are not included in the list of result. A function return value of zero indicates the names list is successfully set.

> ID = 7718

Get_models(Uid function_id,Integer skip_tins,Integer loaded_models,Dynamic_Text 
&models)
Name
Integer Get_models(Uid function_id,Integer skip_tins,Integer loaded_models,Dynamic_Text &models)
Description
Get all the models created by given function_id and set their names to Dynamic_Text models, If 
skip_tins is non zero, then tins are not included in the list of result. The search will load previously 
unloaded model into the project if loaded_models is non zero.
A function return value of zero indicates the names list is successfully set.
ID = 7719

### `Check_elements_for_clean`

```c
Integer Check_elements_for_clean(Uid function_id,Integer skip_tins)
```

Check if all elements created by given function_id are ready for clean. If skip_tins is non zero, then tins are not included in the list to check. A function return value of zero all elements are ready for clean.

> ID = 7720

### `Clean_elements`

```c
Integer Clean_elements(Uid function_id,Integer skip_tins)
```

Clean all elements created by given function_id. If skip_tins is non zero, then tins are not included in the list to clean. 12d Model Macro_Functions A function return value of zero all elements are cleaned successfully.

> ID = 7721

### `Clean_elements`

```c
Integer Clean_elements(Uid function_id,Integer skip_tins,Dynamic_Element &elements)
```

Clean all elements created by given function_id. If skip_tins is non zero, then tins are not included in the list to clean. The list of old elements also is returned in Dynamic_Element elements. A function return value of zero all elements are cleaned successfully.

> ID = 7722

### `Draw_elements`

```c
Integer Draw_elements(Uid function_id,Integer skip_tins)
```

Redraw all elements created by given function_id. If skip_tins is non zero, then tins are not included in the list to draw. A function return value of zero all elements are drawn successfully.

> ID = 7723

### `Draw_elements`

```c
Integer Draw_elements(Uid function_id,Integer skip_tins,Integer colour)
```

Redraw all elements created by given function_id using an override Colour colour. If skip_tins is non zero, then tins are not included in the list to draw. A function return value of zero all elements are drawn successfully.

> ID = 7724

12d Model Macro_Functions
Chapter   
5.64.8 Function Property Collections

### `Create_function_property_collection`

```c
Function_Property_Collection Create_function_property_collection()
```

Create a Function_Property_Collection. Function_Property_Collection’s are used to transfer information about a function such as the Apply Many function instead of needing a large number of function calls which would need to be updated every time a new parameter was added to the Apply Many, The function return value is the created Function_Property_Collection.

> ID = 2726

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Integer int_val)
```

In the Function Property Collection collection, set the value of the Integer property called name to int_val. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Integer property. A function return value of zero indicates the value is successfully set.

> ID = 2727

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Real real_val)
```

In the Function Property Collection collection, set the value of the Real property called name to real_val. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Real property. A function return value of zero indicates the value is successfully set.

> ID = 2728

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Text txt_val)
```

12d Model Macro_Functions In the Function Property Collection collection, set the value of the Text property called name to txt_val. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Text property. A function return value of zero indicates the value is successfully set.

> ID = 2729

Set_property_colour(Function_Property_Collection collection,Text name,Text 
colour_name) 
Name
Integer Set_property_colour(Function_Property_Collection collection,Text name,Text colour_name) 
Description
In the Function Property Collection collection, set the value of the Colour property called name to 
the colour given by colour_name.
For more information on which properties are available for the function in question, please see the 
section  Function Properties.
The return value is zero if name doesn’t exist or it is not Text property.
A function return value of zero indicates the value is successfully set.
ID = 2730

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Element element)
```

In the Function Property Collection collection, set the value of the Element property called name to element. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Element property. A function return value of zero indicates the value is successfully set.

> ID = 2731

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Tin tin)
```

In the Function Property Collection collection, set the tin of the Tin property called name to tin. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Tin property. A function return value of zero indicates the value is successfully set. 12d Model Macro_Functions Chapter

> ID = 2732

### `Set_property`

```c
Integer Set_property(Function_Property_Collection collection,Text name,Model model)
```

In the Function Property Collection collection, set the model of the Model property called name to model. For more information on which properties are available for the function in question, please see the section Function Properties. The return value is zero if name doesn’t exist or it is not Model property. A function return value of zero indicates the value is successfully set.

> ID = 2733

### `Get_property`

```c
Integer Get_property(Function_Property_Collection collection,Text name,Integer &int_val)
```

From the Function Property Collection collection, get the value of the Integer property called name and return it in int_val. For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Integer. A function return value of zero indicates the value was successfully returned.

> ID = 2737

### `Get_property`

```c
Integer Get_property(Function_Property_Collection collection,Text name,Real &real_val)
```

From the Function Property Collection collection, get the value of the Real property called name and return it in real_val. For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Real. A function return value of zero indicates the value was successfully returned.

> ID = 2738

### `Get_property`

```c
12d Model Macro_Functions Integer Get_property(Function_Property_Collection collection,Text name,Text &txt_val)
```

From the Function Property Collection collection, get the value of the Text property called name and return it in txt_val. For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Text. A function return value of zero indicates the value was successfully returned.

> ID = 2739

### `Get_property`

```c
Integer Get_property(Function_Property_Collection collection,Text name,Tin &tin)
```

From the Function Property Collection collection, get the Tin from the Tin property called name and return it in tin. For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Tin. A function return value of zero indicates the value was successfully returned.

> ID = 2740

### `Get_property`

```c
Integer Get_property(Function_Property_Collection collection,Text name,Element &element)
```

From the Function Property Collection collection, get the Element from the Element property called name and return it in element. For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Element. A function return value of zero indicates the value was successfully returned.

> ID = 2741

### `Get_property`

```c
Integer Get_property(Function_Property_Collection collection,Text name,Model &model)
```

From the Function Property Collection collection, get the Model from the Tin property called name and return it in model. 12d Model Macro_Functions Chapter For more information on which properties are available for the function in question, please see the section Function Properties. The function return value is non zero if there is no property called name, or if it does exist, it is not of type Model. A function return value of zero indicates the value was successfully returned.

> ID = 2742

Get_property_colour(Function_Property_Collection collection,Text name,Text 
&colour_name) 
Name
Integer Get_property_colour(Function_Property_Collection collection,Text name,Text &colour_name) 
Description
From the Function Property Collection collection, get the Colour from the Colour property called 
name and return the name of the colour in colour_name.
For more information on which properties are available for the function in question, please see the 
section  Function Properties.
The function return value is non zero if there is no property called name, or if it does exist, it is not of 
type Colour.
A function return value of zero indicates the value was successfully returned.
ID = 2743
Create_apply_many_function(Text function_name,Function_Property_Collection 
properties,Apply_Many_Function &function,Text &msg) 
Name
Integer Create_apply_many_function(Text function_name,Function_Property_Collection 
properties,Apply_Many_Function &function,Text &msg) 
Description
Create an Apply Many function with the function name function_name using the values supplied in 
the Function_Property_Collection properties.
For more information on which properties are available, please see  Apply Many Function 
Properties.
Any errors such as missing properties, or properties of an incorrect type, will be reported in the Text 
msg.
A non zero function return value indicates that there was a problem creating the Apply Many 
function.
A function return value of zero indicates the Apply Many was successfully created.
ID = 2734
Set_apply_many_function_properties(Apply_Many_Function 
function,Function_Property_Collection properties,Text &msg) 
Name
Integer Set_apply_many_function_properties(Apply_Many_Function function, 
Function_Property_Collection properties,Text &msg) 

12d Model Macro_Functions
Description
For the Apply_Many_Function function, set the values of function to be those in the 
Function_Property_Collection properties.
For more information on which properties are available, please see  Apply Many Function 
Properties.
Any errors such as missing properties, or properties of an incorrect type, will be reported in the Text 
msg.
A non zero function return value indicates that there was a problem creating the Apply Many 
function.
A function return value of zero indicates the Apply Many was successfully created.
ID = 2735
Get_apply_many_function_properties(Apply_Many_Function 
function,Function_Property_Collection &properties)
Name
Integer Get_apply_many_function_properties(Apply_Many_Function function,Function_Property_Collection 
&properties)
Description
Load the values of the Function_Property_Collection properties from the Apply Many Function 
function.
For more information on which properties are available, please see  Apply Many Function 
Properties.
A function return value of zero indicates the get was successful.
ID = 2736

### `Get_apply_many_function`

```c
Integer Get_apply_many_function(Text name, Apply_Many_Function &function)
```

Get and existing 12d Model Apply Many Function with the name name and create an Apply_Many_Function with the values from the existing 12d Model Apply Many Function. A non zero function return value indicates that there was no 12d Model Apply Many Function with the name name, or thee was a problem creating the Apply_Many_Function. A function return value of zero indicates the creation of the Apply_Many_Function was successful.

> ID = 2748

Validate_apply_many_function(Apply_Many_Function function,Integer 
&error_count)
Name
Integer Validate_apply_many_function(Apply_Many_Function function,Integer &error_count)
Description
Validate given Apply_Many_Function function and set the number of errors in Integer error_count.

12d Model Macro_Functions
Chapter   
A function return value of zero indicates the call was successful.
ID = 3929
Function Properties
Apply Many Function Properties
Name
Type
Description
tin
Tin / Text
The tin to be used by the apply many
mtf
Text
The mtf used by the apply many
separation
Real
The separation between sections
start_chainage
Real
The optional start chainage for the apply 
many
end_chainage
Real
The optional end chainage for the apply 
many
start_chainage_value
Text
The optional smart chainage for the start of 
the apply many. Uses 12d text format for 
smart chainages, e.g. “start_ref  0”.
end_chainage_value
Text
The optional smart chainage for the end of 
the apply many. Uses 12d text format for 
smart chainages, e.g. “final_ref  0”.
left_prefix
Text
The optional left prefix for template names
right_prefix
Text
The optional right prefix for template names
reference
Element
The centreline / reference string to run the 
apply many down
hinge
Element
The optional hinge string
report_file
Text
The optional report file
road_surface_strings
Model/Text
The road strings model to be created by the 
apply many
road_surface_sections
Model/Text
The road sections model to be created by the 
apply many 
road_surface_colour
Text
The name of the colour for the road surface 
strings and sections
boxing_strings_N
Model/Text
The optional model or name of a model for 
boxing strings for layer N (1 to 8)
boxing_sections_N
Model/ Text
The optional model or name of a model for 
boxing sections for layer N (1 to 8)
boxing_colour_N
Text
The optional name of the colour for the 
strings created for boxing layer N (1 to 8)
difference_sections
Model/Text
The optional model or name of a model for 
difference sections
difference_colour
Text
The name of the colour for difference 
sections
polygons_model
Model/Text
The optional model or name of a model for 
apply many polygons
road_boundary_model
Model/Text
The optional model or name of a model for 
the road boundary

12d Model Macro_Functions
create_arcs
Integer
What type of arcs to create
0 - no arcs
1 - alignments
2 - polylines
3 - super strings
chord_arc_tolerance
Real
The chord arc tolerance value
volume_correction
Integer
Whether or not to perform volume correction 
(0 or 1)
partial_interfaces
Integer
Whether or not to create partial interfaces (0 
or 1)
sections_as_4d
Integer
Whether or not to create sections as 4d 
strings (0 or 1)
copy_hinge
Integer
Whether or not to copy the hinge string (0 or 
1)
use_stripping
Integer
Whether or not to use stripping (0 or 1)
show_stripping_volumes
Integer
Whether or not to show detailed stripping 
volumes (0 or 1)
calculate_natural_surface_to_de
sign_volume
Integer
Whether or not to calculate natural surface to 
design volumes (0 or 1)
calculate_natural_surface_to_su
bgrade_volume
Integer
Whether or not to calculate natural surface to 
subgrade volumes (0 or 1)
calculate_road_to_subgrade_vol
ume
Integer
Whether or not to calculate road to subgrade 
volumes (0 or 1)
calculate_inter_boxing_layer_v
olumes
Integer
Whether or not to calculate inter boxing 
layer volumes (0 or 1)
map_file
Text
The optional name of a map file to create
create_road_tin
Integer
Whether or not to create a tin (0 or 1)
road_tin
Tin/Text
The tin or the name of the tin to create
road_tin_colour
Text
The name of the colour for the created tin
road_tin_model
Model/Text
The model or the name of the model to 
create the tin in
create_depth_range_polygons
Integer
Whether or not to create depth range 
polygons (0 or 1)
depth_range_file
Text
The name of the depth range file to use when 
creating depth range polygons
depth_range_polygons_model
Model/Text
The model or name of the model to create 
depth range polygons in
road_tin_number_extra_models
Integer
The optional number of extra models for the 
road tin
road_tin_extra_model_N
Model/Text
The model or name of the Nth model to be 
used as an extra model for the road tin
calculate_sight_distance
Integer
Whether or not to calculate sight distances (0 
or 1)
sight_distance_min
Real
The minimum sight distance
sight_distance_max
Real
The maximum sight distance
sight_distance_eye_height
Real
The eye height for the sight distance calcs
sight_distance_eye_offset
Real
The eye offset for the sight distance calcs
sight_distance_target_height
Real
The target height for the sight distance calcs
sight_distance_target_offset
Real
The target offset for the sight distance calcs

12d Model Macro_Functions
Chapter   
sight_distance_calc_interval
Real
The calc interval for the sight distance calcs
sight_distance_trial_interval
Real
The trial interval for the sight distance calcs
sight_distance_report
Text
The optional report for the sight distance 
calc
create_separation_barrier_lines
Integer
Whether or not to create separation and 
barrier lines (0 or 1)
barrier_distance
Real
The barrier distance
min_barrier_road_length
Real
The min barrier road length
min_barrier_line_length
Real
The min barrier line length
min_barrier_between
Real
The min distance between barriers
filter_cross_sections
Integer
Whether or not to filter cross sections (0 or 
1)
filter_sections_model
Model/Text
The model or name of model for filtered 
cross sections
filter_sections_colour
Text
The name of the colour for filtered cross 
sections
filter_sections_interval
Real
The interval at which to filter cross sections
filter_sections_tolerance
Real
The culling tolerance for filtering cross 
sections
filter_sections_include_start
Integer
Whether or not to include the start section (0 
or 1)
filter_sections_include_end
Integer
Whether or not to include the end section (0 
or 1)
filter_sections_include_equalitie
s
Integer
Whether or not to include equalities (0 or 1)
filter_sections_include_h_tange
nt
Integer
Whether or not to include horizontal tangent 
sections (0 or 1)
filter_sections_include_v_tange
nt
Integer
Whether or not to include vertical tangent 
sections (0 or 1)
filter_sections_include_crest_sa
g
Integer
Whether or not to include crest/sag sections 
(0 or 1)
filter_sections_spc_file
Text
The optional special chainages file for 
filtering cross sections
generate_long_section_plot
Integer
Whether or not to generate a long section 
plot (0 or 1)
long_section_ppf
Text
The name of the ppf for the long section plot
long_section_plotter_type
Text
The name of the plotter to plot a long section 
with 
long_section_plot_stem
Text
The stem for the long section plot
long_section_plot_clean
Integer
Whether or not to clean the long section plot 
model first (0 or 1)
generate_cross_section_plot
Integer
Whether or not to generate a cross section 
plot (0 or 1)
cross_section_ppf
Text
The name of the ppf for the cross section plot
cross_section_plotter_type
Text
The name of the plotter to plot a cross 
section with 
cross_section_plot_stem
Text
The stem for the cross section plot
cross_section_plot_clean
Integer
Whether or not to clean the cross section plot 
model first (0 or 1)

12d Model Macro_Functions
create_tadpoles
Integer
Whether or not to create legacy tadpoles (0 
or 1)
tadpole_model
Model/Text
The model or name of the model for legacy 
tadpoles
tadpole_interval
Real
The interval at which to create legacy 
tadpoles
tadpole_search_width
Real
The search width for creating legacy 
tadpoles
tadpole_search_side
Integer
The side on which to create legacy tadpoles 
0 - Left and Right
1 - Left
2 - Right
tadpole_count
Integer
The number of legacy tadpole types to be 
created
tadpole_N_string_1_name
Text
The name of string 1 for the Nth legacy 
tadpole entry
tadpole_N_string_2_name
Text
The name of string 2 for the Nth legacy 
tadpole entry
tadpole_N_start_ch
Real
The start chainage for the Nth legacy tadpole 
entry (optional)
tadpole_N_end_ch
Real
The end chainage for the Nth legacy tadpole 
entry (optional)
tadpole_N_symbol_1_name
Text
The name of the first tadpole symbol for the 
Nth legacy tadpole entry
tadpole_N_symbol_1_colour
Text
The name of the colour of the first tadpole 
symbol for the Nth legacy tadpole entry
tadpole_N_symbol_1_size
Real
The size of the first tadpole symbol for the 
Nth legacy tadpole entry (optional)
tadpole_N_symbol_1_rotation
Real
The rotation of the first tadpole symbol for 
the Nth legacy tadpole entry (optional)
tadpole_N_symbol_1_offset_x
Real
The x offset of the first tadpole symbol for 
the Nth legacy tadpole entry (optional)
tadpole_N_symbol_1_offset_y
Real
The y offset of the first tadpole symbol for 
the Nth legacy tadpole entry (optional)
tadpole_N_symbol_1_percent
Real
The percentage modifier for the first symbol 
for the Nth legacy tadpole entry (optional)
tadpole_N_symbol_2_name
Text
The name of the second tadpole symbol for 
the Nth legacy tadpole entry
tadpole_N_symbol_2_colour
Text
The name of the colour of the second tadpole 
symbol for the Nth legacy tadpole entry
tadpole_N_symbol_2_size
Real
The size of the second tadpole symbol for 
the Nth legacy tadpole entry (optional)
tadpole_N_symbol_2_rotation
Real
The rotation of the second tadpole symbol 
for the Nth legacy tadpole entry (optional)
tadpole_N_symbol_2_offset_x
Real
The x offset of the second tadpole symbol 
for the Nth legacy tadpole entry (optional)
tadpole_N_symbol_2_offset_y
Real
The y offset of the second tadpole symbol 
for the Nth legacy tadpole entry (optional)

12d Model Macro_Functions
Chapter   
tadpole_N_symbol_2_percent
Integer
The percentage modifier for the second
symbol for the Nth tadpole entry (optional)
create_new_tadpoles
Integer
Whether or not to create new tadpoles (0 or 
1)
new_tadpole_stype
Text
Name of tadpole style selected from the 
Tadpoles style file (tadpole_styles.xml)
new_tadpole_explode
Integer
0 – Don’t explode
1 – Drape to tin
2 – Z from tadpole strings
new_tadpole_drape_tin
Tin/Text
The percentage modifier for the second 
symbol for the Nth legacy tadpole entry 
(optional)
new_tadpole_input_model
Model/Text
The percentage modifier for the second 
symbol for the Nth legacy tadpole entry 
(optional)
new_tadpole_output_model
Model/Text
The percentage modifier for the second 
symbol for the Nth legacy tadpole entry 
(optional)


---

## Plot Parameters (§5.65)

Functions for working with `Plot_Parameter_File` objects, used to control 12d Model
plotting and printing output.

Plot Parameters
5.65 Plot Parameters
12d Model plot parameters control the look of the different plots that 12d Model can generate.
The Plot_Parameter_File is a 12d Model Variable that can contain plot parameters and the plot 
parameter values for a given plot type.
Plot_Parameter_File Types
The valid Plot_Parameter_File types are:
    section_x_plot
    section_long_plot
    melb_water_sewer_long_plot
    pipeline_long_plot
    drainage_long_plot
    drainage_plan_plot
    plot_frame_plot
    rainfall_methods
    design_parameters 
Each type of plot has its own set of valid plot parameters.
When a Plot_Parameter_File, say ppf, is first defined, it starts as an empty structure until it has its 
type defined using the Create_XX_parameter calls. The ppf then knows what plot parameters are 
valid for that type of plot.
The Plot_Parameter_File ppf is then loaded with particular plot parameters and their values by 
making Set_Parameter calls and/or reading in data from a plot parameter file stored already disk 
(Read_Parameter_File).
When all the required plot parameters have been set, the Plot_Parameter_File ppf can be used to 
create a plot (Plot_parameter_file). 
The Plot_Parameter_File ppf can also be written out as a disk file so that it can be used in the future 
(Write_parameter_file).
Note: note all the available parameters for a particular plot type need to be set for a 
Plot_Parameter_File. For most plot parameters, there is a default value used for plotting and that is 
used if the parameter is not given a value by a Set_Parameter call.

### `Create_parameter_file`

```c
Integer Create_parameter_file(Plot_Parameter_File ppf,Text ppf_type)
```

Set the Plot_Parameter_File ppf to be of type ppf_type and clear out any information already contained in ppf. For the valid types, see Plot_Parameter_File Types. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2447

### `Create_section_long_plot_parameter_file`

```c
Plot Parameters Chapter Integer Create_section_long_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type section_long_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2448

### `Create_section_x_plot_parameter_file`

```c
Integer Create_section_x_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type section_x_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2449

### `Create_melb_water_sewer_long_plot_parameter_file`

```c
Integer Create_melb_water_sewer_long_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type melb_water_sewer_long_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2450

### `Create_pipeline_long_plot_parameter_file`

```c
Integer Create_pipeline_long_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type pipeline_long_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2451

### `Create_drainage_long_plot_parameter_file`

```c
Plot Parameters Integer Create_drainage_long_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type drainage_long_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2452

### `Create_drainage_plan_plot_parameter_file`

```c
Integer Create_drainage_plan_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type drainage_plan_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2453

### `Create_plot_frame_plot_parameter_file`

```c
Integer Create_plot_frame_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type plot_frame_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2454

### `Create_rainfall_methods_parameter_file`

```c
Integer Create_rainfall_methods_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type rainfall_methods, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2455

### `Create_design_parameters_parameter_file`

```c
Integer Create_design_parameters_parameter_file(Plot_Parameter_File ppf) Plot Parameters Chapter
```

Set the Plot_Parameter_File ppf to be of type design_parameters, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 2456

### `Create_perspective_plot_parameter_file`

```c
Integer Create_perspective_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type perspective_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 3375

### `Create_section_plot_parameter_file`

```c
Integer Create_section_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type section_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 3376

### `Create_water_node_diagram_plot_parameter_file`

```c
Integer Create_water_node_diagram_plot_parameter_file(Plot_Parameter_File ppf)
```

Set the Plot_Parameter_File ppf to be of type water_node_diagram_plot, and clear out any information already contained in ppf. Hence if ppf already contained plot information, then all that information will be lost. A function return value of zero indicates the type is successfully set.

> ID = 3377

Read_parameter_file(Plot_Parameter_File ppf,Text filename,Integer 
expand_includes)    
Name
Integer Read_parameter_file(Plot_Parameter_File ppf,Text filename,Integer expand_includes)    

Plot Parameters
Description
Reads from disk a binary plot parameter file of file name filename and load the data into the 
Plot_Parameter_File ppf. The type of the Plot_Parameter_File is determined by the file extension of 
filename.
If expand_includes is no-zero then any Includes listed in filename will be read in.
Any information that is already in ppf is cleared before loading the data from filename.
A function return value of zero indicates the file was successfully read and loaded into ppf.
Note that some plot parameters might have some default values, if those values are not defined in 
the ppf file then they will remain after the read, which might cause some differences from reading 
the ppf file from the equivalent builtin plot panel. Also see the call bellow.
ID = 2457
Read_parameter_file(Plot_Parameter_File ppf,Text filename,Integer 
expand_includes, Integer clear_default)    
Name
Integer Read_parameter_file(Plot_Parameter_File ppf,Text filename,Integer expand_includes,Integer 
clear_default)    
Description
Reads from disk a binary plot parameter file of file name filename and load the data into the 
Plot_Parameter_File ppf. The type of the Plot_Parameter_File is determined by the file extension of 
filename.
If expand_includes is no-zero then any Includes listed in filename will be read in.
Any information that is already in ppf is cleared before loading the data from filename.
Some plot parameters might have some default values, if those values are not defined in the ppf file 
and clear_default is zero then they will remain after the read, which might cause some differences 
from reading the ppf file from the equivalent builtin plot panel. If clear_default is non zero, then all 
those default values will be clear, hence the ppf will behave the same way as the equivalent builtin 
plot panel.
A function return value of zero indicates the file was successfully read and loaded into ppf.
ID = 7957

### `Write_parameter_file`

```c
Integer Write_parameter_file(Plot_Parameter_File ppf,Text filename)
```

Write out to a file on disk, the information in the Plot_Parameter_File ppf. The name of the disk file is filename, plus the appropriate extension given by the type of ppf (see Plot_Parameter_File Types) A function return value of zero indicates the file was successfully written.

> ID = 2458

Set_parameter(Plot_Parameter_File ppf,Text parameter_name, Element 
parameter_value)   
Name

Plot Parameters
Chapter   
Integer Set_parameter(Plot_Parameter_File ppf,Text parameter_name,Element parameter_value) 
Description
Sets the value of the plot parameter parameter_name in the Plot_Parameter_File ppf to be the 
Element parameter_value. 
For example, setting the plot parameter string_to_plot to be a selected string. Aside - in the plot 
parameter file written to the disk, an element is stored with three things - the string name, the string 
id and the model id of the model containing the element.
If the plot parameter does not require an Element, then a non-zero return function return value is 
returned.
A function return value of zero indicates the parameter value is successfully set.
ID = 2641
Get_parameter(Plot_Parameter_File ppf,Text parameter_name,Element 
&parameter_value)   
Name
Integer Get_parameter(Plot_Parameter_File ppf,Text parameter_name,Element &parameter_value) 
Description
Get the value for the plot parameter parameter_name in the Plot_Parameter_File ppf and return it 
as the Element parameter_value. 
If the value for the plot parameter is not of type Element, then a non-zero return function return 
value is returned.
A function return value of zero indicates the parameter value is successfully found.
ID = 2642
Set_parameter(Plot_Parameter_File ppf,Text parameter_name,Text 
parameter_value)   
Name
Integer Set_parameter(Plot_Parameter_File ppf,Text parameter_name,Text parameter_value) 
Description
Sets the value of the plot parameter parameter_name in the Plot_Parameter_File ppf to be the Text 
parameter_value. 
For example, setting the plot parameter box_titles_x to have the value 24.5
Note - even though a plot parameter file may be used as a real number or an integer, it is stored in 
the Plot_Parameter_File as a Text.
A function return value of zero indicates the parameter value is successfully set.
ID = 2459
Get_parameter(Plot_Parameter_File ppf,Text parameter_name,Text 
&parameter_value) 
Name
Integer Get_parameter(Plot_Parameter_File ppf,Text parameter_name,Text &parameter_value) 
Description

Plot Parameters
so get back as text and you need to decode it.
Get the value for the plot parameter parameter_name in the Plot_Parameter_File ppf and return it 
as the Text parameter_value. 
Note - if the parameter value is to be used as say an Integer, then the returned Text 
parameter_value will need to be decoded.
If the value for the plot parameter is not of type Text, then a non-zero return function return value is 
returned.
A function return value of zero indicates the parameter value is successfully found.
ID = 2460

### `Parameter_exists`

```c
Integer Parameter_exists(Plot_Parameter_File ppf,Text parameter_name)
```

Check to see if a plot parameter of name parameter_name exists in the Plot_Parameter_File ppf. returns no-zero if exists A non-zero function return value indicates that an plot parameter exists. Warning this is the opposite of most 12dPL function return values.

> ID = 2461

### `Remove_parameter`

```c
Integer Remove_parameter(Plot_Parameter_File ppf,Text parameter_name)
```

Remove the plot parameter of name parameter_name and its value from the Plot_Parameter_File ppf. Note - the Plot_Parameter_File ppf does not necessarily contain values for all the possible plot parameters that are available for a given Plot_Parameter_File. Many parameters can have default values which are used if the plot parameter is not set. A function return value of zero indicates the parameter was successfully removed.

> ID = 2462

### `Plot_parameter_file`

```c
Integer Plot_parameter_file(Plot_Parameter_File ppf)
```

Plot the Plot_Parameter_File ppf. Note - ppf needs to contain all the appropriate information on where the plot is plotted to. A function return value of zero indicates the plot was successfully created

> ID = 2463

Plot Parameters
Chapter

### `Plot_parameter_file`

```c
Integer Plot_parameter_file(Text file)
```

Plot the plot parameter file in the binary plot parameter disk file name. Note - the file needs to contain all the appropriate information on where the plot is plotted to. A function return value of zero indicates the plot was successfully created.

> ID = 2464

### `Plot_ppf_file`

```c
Integer Plot_ppf_file(Text name)
```

Plot the plot parameter file in the ascii plot parameter disk file name. Note - the file needs to contain all the appropriate information on where the plot is plotted to. A function return value of zero indicates the plot was successfully created.

> ID = 652


---

## Undo Functions (§5.66)

`Undo` and `Undo_List` functions for recording and reversing macro operations within
12d Model's undo system.

Undos
5.66 Undos
12d Model has an Undo system which allows operations to be undone (option Edit =>Undo or using 
<Ctrl>-Z) and the Undo macro calls gives access to the 12d Model Undo system.
For an operation to be undone, enough information must be stored to allow for the operation to be 
reversed.
For example, if an Element elt is created, then the undo of this operation it to delete elt.
Or if an Element original is modified to create a new Element changed, then the original element 
and the new element both need to be recorded so that the undo operation can replace the original 
Element.
To correctly create items for undos, 12dPL has an Undo structure and calls to create the Undo 
structure with the appropriate information for an undo. Creating the Undo also automatically adds it 
to the 12d Model Undo system.
Creating an undo for even a simple operation, may need a number of pieces of information stored.
For example, if you were splitting a string into two pieces and only leaving the two pieces, for an 
undo to work, you would need to have a copy of the original string that is being split (since the macro 
would delete it after the split), plus information about the two strings that are created by the split. 
This is because the undo must find and delete the two strings created by the split, and then bring the 
original string back.
So the calls needed would be 
Undo  a = Add_undo_delete("deleted string",original_string,1);
Undo  b = Add_undo_add("split 1",split_1);
Undo  c = Add_undo_add("split 2",split_2);
where original_string is the string what is split and split_1 and split_2 are the two pieces that are 
created by the split (See 5.66.1 Functions to Create Undos for the documentation on each call).
However, each call automatically adds the operation to the 12d Model Undo system so making the 
three calls actually places three items on the 12d Model Undo system with the text "Deleted string", 
"split 1" and "split 2".
So as it stands, to make the undo happen would need three Edit =>Undo’s, or three <ctrl>-z’s.
To wrap the three items into one item on the 12d Model Undo system, you need to use a 12dPL 
Undo_List.
Basically you just add the three items that are to be done as one 12d Model Undo onto a Undo_List, 
add the three Undos to the Undo_list, and then add the Undo_List to the 12d Model Undo system:
Undo_List  ul;
Append (a,ul);
Append (b,ul);
Append (c,ul);
Add_undo_list ("split",ul);
Note: Add_undo_list adds the Undo_List with three items to the 12d Model Undo system and gives 
it the name "split". At the same time, it removes the three separate Undos a, b, c from the 
12d Model Undo system so only the item called "split" is left on the 12d Model Undo system.
Important Note: Leaving the three Undo’s a, b, c without combining them is a great way of 
debugging your creation of an 12d Model Undo. You will see them as three separate items and they 

Undos
Chapter   
can be undone one at a time to see what is going on.
For information on the Undo function calls:
See 5.66.1 Functions to Create Undos
See 5.66.2 Functions for a 12dPL Undo_List
5.66.1 Functions to Create Undos

### `Add_undo_add`

```c
Undo Add_undo_add(Text name,Element elt)
```

Create an Undo from the Element elt and give it the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo as the function return value. This is telling the 12d Model Undo system that a new element has been created in 12d Model. Note: the element should be added to a model first (e.g using Set_model call) before making this call Note: name is the text that appears when the Undo is displayed in the 12d Model Undo List.

> ID = 1563

### `Add_undo_add`

```c
Undo Add_undo_add(Text name,Dynamic_Element de)
```

Create an Undo from the Dynamic_Element de and give it the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo as the function return value. This is telling the Undo system that a list of new element (stored in the Dynamic_Element de) has been created in 12d Model. Note: the elements should be added to a model first (e.g using Set_model call) before making this call Note: name is the text that appears when the Undo is displayed in the 12d Model Undo List.

> ID = 1564

### `Add_undo_change`

```c
Undo Add_undo_change(Text name,Element duplicate_of_original,Element changed)
```

Undos Create an Undo from a copy of the Element duplicate_of_original and the modified Element changed, and give it the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo called name as the function return value. The Element duplicate_of_original should not exist in a Model. The Element changed does exist in a Model. This is telling the Undo system that an Element duplicate_of_original has been modified to create the Element changed. If the Model for original is ever needed then the parent structure of original can be used to get it. Note: name is the text that appears when the Undo is displayed in the 12d Model Undo List. Example code // make a safe copy of the element before updating the content Element_duplicate(changed, original); // set model of original to null model Null(null_model); Set_model(original, null_model) // code for updating the content of changed undo_item = Add_undo_change("my reason for changing", original, changed);

> ID = 1565

### `Add_undo_delete`

```c
Undo Add_undo_delete(Text name,Element original,Integer make_copy)
```

If make_copy is non zero, create a copy of the Element original and transfer the Uid from original to the copy. If make_copy is zero, then a reference to original is use. Warning - make_copy = 0 should never be used because if original is then deleted in 12d Model, the Undo list could be corrupted. The Undo is given the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo called name as the function return value. This is telling the Undo system that an Element original has been deleted. Note: name is the text that appears when the Undo is displayed in the 12d Model Uno List.

> ID = 1566

### `Add_undo_range`

```c
Undo Add_undo_range(Text name,Integer id1,Integer id2) Undos Chapter
```

Create an Undo that consists of the id range form 1d1 to id2. The Undo is given the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo called name as the function return value. This is telling the Undo system that all the Elements in the id range from Id1 to Id2 have been created. Note: name is the text that appears when the Undo is displayed in the 12d Model Undo List. Important note - Id’s are no longer used in 12d Model and have been replaced by Uids. This macro has been deprecated (i.e. won’t exist) unless the macro is compiled with a special flag. This function has been replaced by Undo Add_undo_range(Text name,Uid id1,Uid id2).

> ID = 1567

### `Add_undo_range`

```c
Undo Add_undo_range(Text name,Uid id1,Uid id2)
```

Create an Undo that consists of the Uid range form id1 to id2. The Undo is given the name name. The Undo is automatically added to the 12d Model Undo system. Return the created Undo called name as the function return value. This is telling the Undo system that all the Elements in the Uid id range from Id1 to Id2 have been created. Note: name is the text that appears when the Undo is displayed in the 12d Model Undo List.

> ID = 1919

For information on adding/removing Undo’s to an internal 12dPL list and how it interacts with the 
12d Model Undo system, go to the next section 5.66.2 Functions for a 12dPL Undo_List
5.66.2 Functions for a 12dPL Undo_List

### `Get_number_of_items`

```c
Integer Get_number_of_items(Undo_List &undo_list,Integer &count)
```

Get the number of items in the Undo_List undo_list and return the number in count. A function return value of zero indicates the number was successfully returned. Undos

> ID = 1557

### `Get_item`

```c
Integer Get_item(Undo_List &undo_list,Integer n,Undo &undo)
```

Get the n’th item from the Undo_List undo_list and return the item (which is an Undo) as undo. A function return value of zero indicates the Undo was successfully returned.

> ID = 1558

### `Set_item`

```c
Integer Set_item(Undo_List &undo_list,Integer n,Undo undo)
```

Set the n’th item in the Undo_List undo_list to be the Undo undo. A function return value of zero indicates the Undo was successfully set.

> ID = 1559

### `Append`

```c
Integer Append(Undo undo,Undo_List &undo_list)
```

Append the Undo undo to the Undo_List undo_list. That is, the Undo undo is added to the end of the Undo_List and so the number of items in the Undo_List is increased by one. A function return value of zero indicates the Undo was successfully appended.

> ID = 1560

### `Append`

```c
Integer Append(Undo_List from_list,Undo_List &to_list)
```

Append the Undo_list list to the Undo_List to_list. A function return value of zero indicates the Undo_List was successfully appended.

> ID = 1561

### `Null`

```c
Integer Null(Undo_List &undo_list) Undos Chapter
```

Removes and nulls all the Undo’s from the Undo_list undo_list and sets the number of items in undo_list to zero. That is, all the items on the Undo_List are nulled and the number of items in the Undo_List is set back to zero. A function return value of zero indicates the Undo_List was successfully nulled.

> ID = 1562

### `Add_undo_list`

```c
Undo Add_undo_list(Text name,Undo_List list)
```

Adds the Undo_List list to the 12d Model Undo system and gives it the name name. At the same time, it automatically removes each of the Undo’s in list from the 12d Model Undo system. So all the items in list are removed from the 12d Model Undo system and replaced by the one item called name.

> ID = 1568


