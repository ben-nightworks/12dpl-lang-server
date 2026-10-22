> Source: *12d Model Macro Programming Manual* — Sections 5.15, 5.28–5.31 (pages 149–162, 259–295)

# 12dPL Project, System, Colours and Folders

System functions (date/time, environment variables, exit), IDs/UIDs/GUIDs, colours, user-defined attributes, folder/file utilities, 12d Model program version and folder functions.

## Contents
- 5.15 System (date, time, getenv, sleep, exit, OS info)
- 5.28 Colours
- 5.29 User Defined Attributes
- 5.30 Folders
- 5.31 12d Model Program and Folders

---

Page 148
System

5.15 System
System(Text msg)
Name
Integer System(Text msg)
Description
Make a system call.
The message passed to the system call is given by Text msg.
For example,
                        system ("ls *.tmp>fred")
A function return value of zero indicates success.
Note
The types of system calls that can be made is operating system dependant.
ID = 21
Date(Text &date)
Name
Integer Date(Text &date)
Description
Get the current date.
The date is returned in Text date with the format 
                        DDD MMM dd yyyy
where DDD is three characters for the day, MMM is three characters for the month
dd is two numbers for the day of the month and yyyy is four numbers for the year, and each is 
separated by one space.
For example,
                        Sun Mar 17 1996
A function return value of zero indicates the date was returned successfully.
ID = 658
Date(Integer &d,Integer &m,Integer &y)
Name
Integer Date(Integer &d,Integer &m,Integer &y)
Description
Get the current date as the day of the month, month & year.
The day of the month value is returned in Integer d.
The month value is returned in Integer m.
The year value is returned in Integer y (fours digits).
A function return value of zero indicates the date was returned successfully.
System
ID = 659
Time(Integer &time)
Name
Integer Time(Integer &time)
Description
Get the current time as seconds since January 1 1970.
The time value is returned in Integer time.
A function return value of zero indicates the time was returned successfully.
ID = 660
Time(Real &time)
Name
Integer Time(Real &time)
Description
Get the current time as the number of seconds since January 1st 1601 down to precision of 10-7 
(100 nanoseconds) and return it as time.
A function return value of zero indicates the time was returned successfully.
ID = 661
Time(Text &time)
Name
Integer Time(Text &time)
Description
Get the current time.
The time is returned in Text time with the format (known as the ctime format) 
                        DDD MMM dd hh:mm:ss yyyy where 
where DDD is three characters for the day, MMM is three characters for the month
dd two digits for the day of the month, hh two digits for the hour, mm two digits for the hour (in 
twenty four hour format), ss two digits for seconds and yyyy is four digits for the year.
For example,
                        Sun Mar 17 23:19:24 1996
A function return value of zero indicates the time was returned successfully.
ID = 662
Time(Integer &h,Integer &m,Real &sec)
Name
Integer Time(Integer &h,Integer &m,Real &sec)
Description
Get the current time in hours, minutes & seconds.
System

The hours value is returned in Integer h.
The minutes value is returned in Integer m.
The seconds value is returned in Real s.
A function return value of zero indicates the time was returned successfully.
ID = 663
Convert_time(Integer t1,Text &t2)
Name
Integer Convert_time(Integer t1,Text &t2)
Description
Convert the time in seconds since 00:00:00 am January, 1 1970 Coordinated Universal Time (UTC), 
to the standard ctime format given in an earlier Time function.
The time in seconds is given by Integer t1 and the Text t2 returns the time in ctime format.
ID = 671
Convert_time(Text &t1,Integer t2)
Name
Integer Convert_time(Text &t1,Integer t2)
Description
Convert the time in ctime format to the time in seconds since 00:00:00 am January, 1 1970 
Coordinated Universal Time (UTC).
The time in ctime format is given by Text t1 and the time in seconds is returned as Integer t2.
Note
Not yet implemented.
ID = 672
Convert_time(Integer t1,Text format,Text &t2)
Name
Integer Convert_time(Integer t1,Text format,Text &t2)
Description
Convert the time in seconds since 00:00:00 am January, 1 1970 Coordinated Universal Time (UTC), 
to the Text format (as defined in the section on Title Blocks in the 12d Model Reference Manual).
The time in seconds is given by Integer t1 and the Text t2 returns the time in the specified format.
ID = 683
Get_macro_name()
Name
Text Get_macro_name()
Description
Get the name of the macro file.
System
The function return value is the macro file name.
ID = 1093
Recalc_chain_running()
Name
Integer Recalc_chain_running()
Description
Check if the macro is running through a chain.
The function returns 1 if the macro is running through the a chain; and 0 otherwise.
ID = 3811
Create_macro(Text macro_name,Integer run_now)
Name
Integer Create_macro(Text macro_name,Integer run_now) 
Description
Start the macro from the file named macro_name; if run_now is not zero then also execute the 
macro. 
macro_name are comprised of
"macro_options user_macro_name macro_arguments"
where the macro_options (optional) is a list of zero or more key words (all starting with - (minus) 
character):
-no_console
don’t display macro console
-close_on_exit
remove console when macro terminates
-buttons
have buttons for finish, restart and quit on console
-allow_defaults
allow default answers for console questions
-execute_now
same as run_now
where macro_arguments (optional) are space delimited values
and user_macro_name is the full path name to the 4do file to be executed
For example
Create_macro( "-no_console -close_on_exit \"my macro name.4do\" \"arg 1\" \"arg 2\"" , 1 ); 
A return value of zero indicates the function call was successful. 
ID = 1627
Get_user_name(Text &name)
Name
Integer Get_user_name(Text &name)
Description
Get user’s name, the name currently logged onto the system.
System

The name is returned in Text name.
A function return value of zero indicates the name was returned successfully.
ID = 814
Get_host_id() 
Name
Text Get_host_id() 
Description
For the current 12d Model session, get the 12d dongle number of the 12d dongle being used to 
provide the 12d Model license for the session.
The dongle number, which is alphanumeric, is returned as Text as the function return value.
ID = 2678
Get_module_license(Text module_name)
Name
Integer Get_module_license(Text module_name)
Description
Get the status of each module license.
If the module_name is:
                        points_limit
                        tins_limit
                        remaining_days
                        warned
the function returns number of available units.
If the module_name is:
                        ok                           lite
                        drainage                 digitizer
                        hec_ras                  hec_rasII
                        dranald                  water_supply
                        landxml                  sharing
                        12d_field_setout   12d_field_pickup
                        12d_field_tunnel 
                        drainage_dynamic 
                        track                       solids_modelling
                        gold_survey           gold
                        gis                          tuflow_1d_wbm_dongle
                        tuflow_tcf               tuflow_10k
                        tuflow_100k           tuflow_open
                        tuflow_open_gpu
                        tuflow_road            tuflow_road_gpu
                        point_cloud            tmr_point_cloud
                        pipeline
                        sewer                     survey
                        tin_analysis            volumes
                        volumesII               trarr
                        vehicle_path          sight_distance
                        cartographic           dxf
                        genio                      keays
System
                        geocomp                dgn
                        arcview                  alignment
                        educational            demonstration
                        loan                        rental
                        subscription           temporary
                        maintenance          training
The function returns 1 if the module is licensed, 0 if it is not licensed.
ID = 1094
Getenv(Text env)
Name
Text Getenv(Text env)
Description
Get the value of the environment variable named env and return it as Text as the function return 
value.
ID = 1087
Backup_version_file(Text filename,Integer recycle)
Name
Integer Backup_version_file(Text filename,Integer recycle)
Description
Back up a file using extra numbered extension.
When a .4d file is updated (like survey.4d), you get the files
survey.4d
survey.4d.1
survey.4d.2
etc
where the highest numbered file is the most recent backup. We limit the number of backup versions 
to 100. The recycle only takes affect when 100 is reached. If the value of recycle is 0, an error 
message is displayed. For nonzero recycle , will push down all the files. (ie)
survey.4d.1 is deleted
survey.4d.2 renamed to survey.4d.1
survey.4d.3 renamed to survey.4d.2
etc to 100
and the "most recent" backup of survey.4d is survey.4d.100. This means that the most recent will 
always be survey.4d.100
ID = 2139
Restore_version_file(Text filename,Integer swap)
Name
Integer Restore_version_file(Text filename,Integer swap)
Description
System

Restore a file to the most recent backup (highest numbered file). 
The swap value does the following: for a non 0 value, if the most recent backup files is 
survey.4d.77, the survey.4d is renamed to survey.4d.77, and survey.4d.77 is renamed to survey.4d. 
You could view this as a swapping of the contents of the file.
If the swap value is 0, survey.4d is deleted, and survey.4d.77 is renamed to survey.4d
ID = 2140
Find_system_file(Text new_file_name,Text old_file_name,Text env)
Name
Text Find_system_file(Text new_file_name,Text old_file_name,Text env)
Description
Returns the path to the setup file new_file_name as the function return value.
If old_file_name is not blank, it also looks for the old file names for the set ups files that were used in 
the Unix version of 12d Model.
So if you want to support the legacy file names then you pass in new_file_name and old_file_name. 
If you are only looking for the post Unix names for the set up files, pass old_file_name = "".
env is the name of the environment variable that can also point to the set up file.
The search order is 
1. If not blank, search for the file given by the environment variable env
2. If new_file_name is not blank, next search for a file with the name new_file_name in the normal 
Set Ups files search order.
3. Finally if the no file has yet been found, if old_file_name is not blank, search for old_file_name in 
the normal Set Ups files search order.
If no file is found then the function return value is a blank Text (i.e. "").
For example, 
    Find_system_file("colours.4d", "colour_map.def", "COLOURS_4D")
will find the colours set up file which may be pointed to by the environment variable COLOURS_4D 
(if non zero), or may have the name "colours.4d", or finally may have the name "colour_map.def".
ID = 1088
Find_system_file_quiet(Text new_file_name,Text old_file_name,Text env)
Name
Text Find_system_file_quiet(Text new_file_name,Text old_file_name,Text env)
Description
Identical to Find_system_file call except there is no error message on output windows when no file 
found.
ID = 7667
Get_4dmodel_version(Integer &major,Integer &minor,Text &patch)
Name
void Get_4dmodel_version(Integer &major,Integer &minor,Text &patch)
Description
System
Get information about the 12d Model build.
The function return value is a special patch version description for pre-release versions and it is 
written after the 12d Model version information. It is blank for release versions.
major - is the major number for 12d Model. That is, the number before the ".".
             For example 14 for 12d Model 14.00
minor - is the minor number for 12d Model. That is, the number after the ".".
             For example 00 for 12d Model 14.00
patch - special patch description for pre-release versions. It is written after the 12d Model version 
information. It is blank for release versions.
For example "Alpha 274 SLF,SLX,Image Dump - Not For Production"
A function return value of zero indicates the function was successful.
ID = 1089
Is_practise_version()
Name
Integer Is_practise_version()
Description 
Check if the current 12d Model is a practise version.
A non-zero function return value indicates that 12d Model is a practise version.
A zero function return value indicates that 12d Model is not a practise version.
Warning this is the opposite of most 12dPL function return values
ID = 1090
Create_process(Text program_name,Text command_line,Text start_directory, 
Integer flags,Integer wait,Integer inherit) 
Name
Integer Create_process(Text program_name,Text command_line,Text start_directory,Integer flags,Integer 
wait,Integer inherit) 
Description
This function basically calls the Microsoft CreateProcess function as defined in
     http://msdn.microsoft.com/en-us/library/ms682425%28v=vs.85%29.aspx.
The 12d function gives access to the Microsoft CreateProcess arguments that are in bold (and also 
do not have a // in front of them):
 BOOL WINAPI CreateProcess(
 __in_opt LPCTSTR lpApplicationName,
 __inout_opt  LPTSTR lpCommandLine,
//  __in_opt LPSECURITY_ATTRIBUTES lpProcessAttributes,
//  __in_opt LPSECURITY_ATTRIBUTES lpThreadAttributes,
 __in BOOL bInheritHandles,
 __in DWORD dwCreationFlags,
//  __in_opt LPVOID lpEnvironment,
 __in_opt LPCTSTR lpCurrentDirectory,
//  __in LPSTARTUPINFO lpStartupInfo,
System

//  __out LPPROCESS_INFORMATION lpProcessInformation
);
where program_name is passed as lpApplicationName, command_line is passed as 
dwCreationFlags lpCommandLine, start_directory is passed as lpCurrentDirectory, flags is passed 
as dwCreationFlags and inherit is passed as bInheritHandles.
If wait = 1, the macro will wait until the process finishes before continuing.
If wait = 0, the macro won’t wait until the process finishes before continuing.
A function return value of zero indicates the function was successful.
Note: Create_process can not be called from the 12d Model Practise version.
ID = 1620
Create_process(Text program_name,Text command_line,Text start_directory,Integer 
flags,Integer inherit,Unknown &handle) 
Name
Integer Create_process(Text program_name,Text command_line,Text start_directory,Integer flags,Integer 
inherit,Unknown &handle) 
Description
This function calls the Microsoft CreateProcess function as defined in
     http://msdn.microsoft.com/en-us/library/ms682425%28v=vs.85%29.aspx.
The 12d function gives access to the Microsoft CreateProcess arguments that are in bold (and also 
not have a // in front of them):
  BOOL WINAPI CreateProcess(
 __in_opt LPCTSTR lpApplicationName,
 __inout_opt  LPTSTR lpCommandLine,
//  __in_opt LPSECURITY_ATTRIBUTES lpProcessAttributes,
//  __in_opt LPSECURITY_ATTRIBUTES lpThreadAttributes,
 __in BOOL bInheritHandles,
 __in DWORD dwCreationFlags,
//  __in_opt LPVOID lpEnvironment,
 __in_opt LPCTSTR lpCurrentDirectory,
//  __in LPSTARTUPINFO lpStartupInfo,
//  __out LPPROCESS_INFORMATION lpProcessInformation
  );
where program_name is passed as lpApplicationName, command_line is passed as 
dwCreationFlags lpCommandLine, start_directory is passed as lpCurrentDirectory, flags is passed 
as dwCreationFlags and inherit is passed as bInheritHandles.
The handle to the created process is returned in Unknown handle.
The macro can check if the process is still running by calling Process_exists.
A function return value of zero indicates the function was successful.
Note: The difference between this function and Create_process(Text program_name,Text 
command_line,Text start_directory,Integer flags,Integer wait,Integer inherit) is that a handle to the 
process is created and returned as handle and this can be checked to see if the process is still 
running. So there is no wait flag but there is more flexibility since the macro can check with 
Process_exists and decide when, and when not to wait.
Note: Create_process can not be called from 12d Model Practise version.
ID = 2635
System
Process_exists(Unknown handle) 
Name
Integer Process_exists(Unknown handle) 
Description
Check to see if the process given by handle exists. That is, check that the process created by 
Create_process(Text program_name,Text command_line,Text start_directory,Integer flags,Integer 
inherit,Unknown &handle) is still running.
A non-zero function return value indicates that the process handle is still running (i.e. the process 
exists).
A zero function return value indicates that the process does not exist.
Warning this is the opposite of most 12dPL function return values
ID = 2636
Shell_execute(Widget widget,Text operation,Text file,Text parameters, 
Text directory,Integer showcmd)
Name
Integer Shell_execute(Widget widget,Text operation,Text file,Text parameters,Text directory,Integer showcmd) 
Description
This function calls the Microsoft ShellExecute function as defined in
    http://msdn.microsoft.com/en-us/library/bb762153%28v=vs.85%29.aspx
This Microsoft call executes an operation on a file.
The 12d function gives access to the Microsoft ShellExecute arguments that are in bold (and also 
not have a // in front of them):
  HINSTANCE ShellExecute(
 __in_opt HWND hwnd,
 __in_opt LPCTSTR lpOperation,
 __in LPCTSTR lpFile,
 __in_opt LPCTSTR lpParameters,
 __in_opt LPCTSTR lpDirectory,
    __in INT nShowCmd); 
where operation is passed as lpOperation, file is passed as lp, parameters is passed as 
lpParameters, directory is passed as lpDirectory and showcmd is passed as ShowCmd. 
widget is passed as hwnd, and in most standard case, it is the current macro panel.
The handle to the created process is returned in Unknown handle.
The macro can check if the process is still running by calling Process_exists.
A function return value of zero indicates the function was successful.
Note: Create_process can not be called from 12d Model Practise version.
 ID = 1623
Get_display_resolution(Integer &width,Integer &height)
Name
Integer Get_display_resolution(Integer &width,Integer &height)
System

Description
Get display resolution of current work area as number pixels Integer width height 
A return value of zero indicates the function call was successful.
ID = 3180
Get_number_of_monitors()
Name
Integer Get_number_of_monitors()
Description
The function return the number of monitors of the computer.
ID = 7977
Get_monitor_info(Integer index,Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer 
&flags,Text &device_name)
Name
Integer Get_monitor_info(Integer index,Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer &work_area_top,Integer 
&work_area_right,Integer &work_area_bottom,Integer &flags,Text &device_name)
Description
Get the monitor number index and return its information in Integer &display_left,Integer 
&display_top,Integer &display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer &flags,Text 
&device_name. The flag 1 usually indicates the monitor is the primary one.
A return value of zero indicates the get was successful.
ID = 7978
Get_monitor_info(Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer 
&flags,Text &device_name)
Name
Integer Get_monitor_info(Integer &display_left,Integer &display_top,Integer &display_right,Integer 
&display_bottom,Integer &work_area_left,Integer &work_area_top,Integer &work_area_right,Integer 
&work_area_bottom,Integer &flags,Text &device_name)
Description
Get the main monitor of the current session and return its information in Integer &display_left,Integer 
&display_top,Integer &display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer &flags,Text 
&device_name. The flag 1 usually indicates the monitor is the primary one.
If 12D display is crossing multiple monitors, the main monitor is usually the one retain when 
maximizing 12D.
A return value of zero indicates the get was successful.
System
ID = 7979
Get_monitor_info(Integer point_x,Integer point_y,Integer &display_left,Integer 
&display_top,Integer &display_right,Integer &display_bottom,Integer 
&work_area_left,Integer &work_area_top,Integer &work_area_right,Integer 
&work_area_bottom,Integer &flags,Text &device_name)
Name
Integer Get_monitor_info(Integer point_x,Integer point_y,Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer &work_area_top,Integer 
&work_area_right,Integer &work_area_bottom,Integer &flags,Text &device_name)
Description
Get the monitor at the cursor point_x point_y of the work area return its information in Integer 
&display_left,Integer &display_top,Integer &display_right,Integer &display_bottom,Integer 
&work_area_left,Integer &work_area_top,Integer &work_area_right,Integer 
&work_area_bottom,Integer &flags,Text &device_name. The flag 1 usually indicates the monitor is 
the primary one.
A return value of zero indicates the get was successful.
ID = 7980
Get_monitor_info(View v,Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer 
&flags,Text &device_name)
Name
Integer Get_monitor_info(View v,Integer &display_left,Integer &display_top,Integer &display_right,Integer 
&display_bottom,Integer &work_area_left,Integer &work_area_top,Integer &work_area_right,Integer 
&work_area_bottom,Integer &flags,Text &device_name)
Description
Get the main monitor of the view v and return its information in Integer &display_left,Integer 
&display_top,Integer &display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer &flags,Text 
&device_name. The flag 1 usually indicates the monitor is the primary one.
If the view display is crossing multiple monitors, the main monitor is???.
A return value of zero indicates the get was successful.
ID = 7981
Get_monitor_info(Widget w,Integer &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer 
&flags,Text &device_name)
Name
Integer Get_monitor_info(Widget w,nteger &display_left,Integer &display_top,Integer 
&display_right,Integer &display_bottom,Integer &work_area_left,Integer &work_area_top,Integer 
&work_area_right,Integer &work_area_bottom,Integer &flags,Text &device_name)
Description
System

Get the main monitor of the widget w and return its information in Integer &display_left,Integer 
&display_top,Integer &display_right,Integer &display_bottom,Integer &work_area_left,Integer 
&work_area_top,Integer &work_area_right,Integer &work_area_bottom,Integer &flags,Text 
&device_name. The flag 1 usually indicates the monitor is the primary one.
If the widget display is crossing multiple monitors, the main monitor is???.
A return value of zero indicates the get was successful.
ID = 7982
Is_12d_exe_64bit()
Name
Integer Is_12d_exe_64bit()
Description
Return one if the current session of 12D is running from 64bit exe; return zero otherwise.
ID = 3840
Play_sound(Text file_name)
Name
Integer Play_sound(Text file_name)
Description
Play a sound file with given path name file_name 
A return value of zero indicates the function call was successful.
ID = 3910
Dump_slx_image(Text slx_file_name,Integer image_format,Text image_file_name)
Name
Integer Dump_slx_image(Text slx_file_name,Integer image_format,Text image_file_name)
Description
Dump an image file in the given location image_file_name using given format image_format from 
the panel defined by slx configuration slx_file_name. 
The list for valid image_format
JPEG
6
TIF
8
BMP
9
JPEG 2000
12
PNG
17
A return value of zero indicates the function call was successful.
ID = 3911
Dump_view_image(View view,Integer image_format,Integer include_title,Text 
image_file_name)
Name
System
Integer Dump_view_image(View view,Integer image_format,Integer include_title,Text image_file_name)
Description
Dump an image file in the given location image_file_name using given format image_format from 
the view. 
The list for valid image_format
JPEG
6
TIF
8
BMP
9
JPEG 2000
12
PNG
17
A return value of zero indicates the function call was successful.
ID = 3912

---

Page 258
Colours

5.28 Colours
Colours are stored in 12d Model as a number between 0 and 15, or if defined by the user, between 
0 and anything up to 255.
Colour numbers from 0 to 15 always exist.
The actual (red,green,blue) intensities and colour names used for each colour number can be user 
defined.
Hence it is necessary that 12dPL provides functions to check if colours of given names or numbers 
exist and to convert between colour numbers and colour names.
Colour_exists(Text col_name)
Name
Integer Colour_exists(Text col_name)
Description
Checks if a colour of name col_name exists in 12dPL.
The colour name to check for is given by Text col_name.
A non-zero function return value indicates the colour exist.
A zero function return value indicates the colour does not exist.
Warning - this is the opposite to most 12dPL function return values
ID = 66
Colour_exists(Integer col_number)
Name
Integer Colour_exists(Integer col_number)
Description
Checks if a number is a valid colour number.
The number to check for is given by Integer col_number.
A non-zero function return value indicates the number is a valid colour number.
A zero function return value indicates the number is not a valid colour number.
Warning - this is the opposite of most 12dPL function return values
ID = 65
Convert_colour(Text col_name,Integer &col_number)
Name
Integer Convert_colour(Text col_name,Integer &col_number)
Description
Tries to convert the Text col_name to a colour number.
If successful, the colour number is returned in Integer col_number.
A function return value of zero indicates the conversion was successful.
ID = 67
Colours
Convert_colour(Integer col_number,Text &col_name)
Name
Integer Convert_colour(Integer col_number,Text &col_name)
Description
Tries to convert the Integer col_number to a colour name.
If successful, the colour name is returned in Text col_name.
A function return value of zero indicates the conversion was successful.
ID = 68
Convert_colour(Integer value,Integer &red,Integer &green,Integer &blue) 
Name
Integer Convert_colour(Integer value,Integer &red,Integer &green,Integer &blue) 
Description
Convert the colour number value to its red, green and blue components (0-255) and return them in 
red, green and blue respectively.
A function return value of zero indicates the colour was successfully converted.
ID = 2138
Get_project_colours(Dynamic_Text &colours)
Name
Integer Get_project_colours(Dynamic_Text &colours)
Description
Get a Dynamic_Text of all the colour names defined for the project.
The colour names are returned in the Dynamic_Text colours.
A function return value of zero indicates the colours were returned successfully.
ID = 235
User Defined Attributes

5.29 User Defined Attributes
Extra data can be attached to the Project, Models, Functions, Elements, Super String Vertices, 
Super String Segments, Water Link (drainage pipe), and Water Node (drainage pit) as user defined 
attributes.
The user defined attributes are contained in a variable of type Attributes.
Any number of bits of data of type Real, Integer, Text, Binary (blobs), 64-bit Integer, Uid, Guid 
and Attributes can be attached to Attributes and when a bit of data is attached, it is given a name 
which is used to retrieved the data at a later date.
Attribute names can contain alphabetic characters of either upper and/or lower case, numeric 
characters 0-9 and blank space character; note that valid names cannot have space as leading or 
trailing character.
The attribute type used for each data type is:
Data Type
Attribute Type
Integer 
1
Real 
2
Text 
3
Binary (blob) 
4
Attributes 
5
Uid 
6
64-bit integer 
7
Guid 
8
Note that an Attributes att can contain zero or more user defined attributes, and zero or more 
Attributes, so the Attributes definition allows Attributes inside Attributes, inside Attributes and 
so on. So the data inside an Attributes forms a tree structure just like a Windows folder system 
(that is, Windows folders can not only contain files and links, but also Windows folders).
For an Attributes att, all the data attached to it (called attributes) is said to be of the first level and 
all the attributes must have a unique name (attribute names are case sensitive). So the Attributes 
att may have zero or more attributes attached to it, each with a unique case sensitive name, and 
each with an attribute type.
Attributes are added to att in a sequential order so each attribute of att will have a unique attribute 
number.
If bb is an attribute of att and bb is of type Attributes, then bb is also an Attributes and can contain 
its own attributes of various attribute types. The first level of bb is considered to be the second level 
of att.
The value from higher level than the first level of an attribute can be access through an attribute 
path. An attribute path is a sequence of attribute names separated by back slash character ’/’. In the 
example above, if cc is an attribute of bb then bb/cc is an attribute path of att.
From version 14 onward, the syntax of attribute name (path) is extended to work with attributes with 
the same name, we call it the array syntax for attributes. Immediately after an attribute name, an 
positive number n surrounded by open and close square bracket indicate the n-th instance of the 
attribute with that name. For example cc[2] is the second attribute with the name cc.
The array (square brackets) syntax can also be used in the upper parts of an attribute path. 
For example bb[3]/cc[2] is the second attribute of the name cc in the third group of the name bb.
Special note, it might be a bit hard to understand but it is an important point to use the correct index 
inside the square bracket. The square bracket at upper level are counting only on group attributes. 
So in counting for the third group with the name bb, all other attribute with the same name bb will be 
User Defined Attributes
skip if they are of other types such as Integer or Text. The counting rule for square bracket at the 
last level of an attribute part depends on which macro call. 
If the macro call is not by_type then at the last level, 12D count every attributes 
with the given name. An example of a call which is not by_type is Attribute_exists; 
Attribute_exists(att,"bb[3]/cc[2]") would check if the third group with the name bb in att contains 
at least two attributes with the name cc.
If the macro call is by_type then at the last level, 12D count every attributes with 
the given name that must match the type only. An example of a call which is by_type is 
Set_attribute_by_type; Set_attribute_by_type(att,"bb[3]/cc[2]","abc") would first look for the third 
group with the name bb in att contains at least two attributes of type Text with the name cc; and 
then the text would be set to the Text "abc".
Attribute_exists(Attributes attr,Text att_name) 
Name
Integer Attribute_exists(Attributes attr,Text att_name) 
Description
Checks to see if an attribute with the name att_name exists in the Attributes attr.
att_name can have a full path name of the attribute. Attribute names are case sensitive and they 
support the array syntax.
A non-zero function return value indicates that the attribute does exist.
A zero function return value indicates that no attribute of that name exists.
Warning this is the opposite of most 12dPL function return values
ID = 1939
Attribute_exists(Attributes attr,Text name,Integer &no) 
Name
Integer Attribute_exists(Attributes attr,Text name,Integer &no) 
Description
Checks to see if an attribute with the name att_name exists in the Attributes attr.
att_name can have a full path name of the attribute. Attribute names are case sensitive and they 
support the array syntax.
If the attribute exists, its position is returned in Integer no.
This position can be used in other Attribute functions.
A non-zero function return value indicates the attribute does exist.
A zero function return value indicates that no attribute of that name exists.
Warning this is the opposite of most 12dPL function return values
ID = 1940
Attribute_delete(Attributes attr,Text att_name) 
Name
Integer Attribute_delete(Attributes attr,Text att_name) 
Description
User Defined Attributes

Deletes the first attribute with the name att_name from the Attributes attr. Attribute names are case 
sensitive and they support the array syntax.
A function return value of zero indicates the attribute was deleted.
ID = 1941
Attribute_delete(Attributes attr,Integer att_no) 
Name
Integer Attribute_delete(Attributes attr,Integer att_no) 
Description
Delete the attribute with the attribute number att_no from the Attributes attr.
A function return value of zero indicates the attribute was deleted.
ID = 1942
Attribute_delete_all(Attributes attr) 
Name
Integer Attribute_delete_all(Attributes attr) 
Description
Delete all attributes from the Attributes attr.
A function return value of zero indicates all the attribute were deleted.
ID = 1943
Move_attributes(Attributes target,Attributes source) 
Name
Integer Move_attributes(Attributes target,Attributes source) 
Description
Move the content of Attributes source to the end of target. 
Note that the source will not be valid after the move.
A function return value of zero indicates the attribute were moved.
ID = 7803
Move_attributes(Attributes target,Integer count,Attributes source_array[]) 
Name
Integer Move_attributes(Attributes target,Integer count,Attributes source_array[])
Description
Move the all content of count number in Attributes source_array to the end of target. 
Note that the source_array will not be valid after the move.
A function return value of zero indicates the attribute were moved.
ID = 7819
User Defined Attributes
Get_number_of_attributes(Attributes attr,Integer &no_atts) 
Name
Integer Get_number_of_attributes(Attributes attr,Integer &no_atts) 
Description
Get the number of top level attributes in the Attributes attr. The number is returned in no_atts.
A function return value of zero indicates the number is successfully returned.
ID = 1944
Get_attribute(Attributes attr,Text att_name,Text &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Text &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Text.
If the attribute is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1945
Get_attribute(Attributes attr,Text att_name,Integer &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Integer &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Integer.
If the attribute is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1946
Get_attribute(Attributes attr,Text att_name,Real &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Real &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Real.
If the attribute is not of type Real then a non-zero return value is returned.
User Defined Attributes

A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
 ID = 1947
Get_attribute(Attributes attr,Text att_name,Uid &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Uid &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Uid.
If the attribute is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1948
Get_attribute(Attributes attr,Text att_name,Attributes &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Attributes &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Attributes.
If the attribute is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attributes value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
 ID = 1949
Get_attribute(Attributes attr,Text att_name,Integer64 &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Integer64 &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type 64 bit Integer.
If the attribute is not of type 64 bit Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3243
User Defined Attributes
Get_attribute(Attributes attr,Text att_name,Guid &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Guid &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Guid.
If the attribute is not of type Guid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3244
Get_attribute(Attributes attr,Text att_name,Attribute_Blob &att) 
Name
Integer Get_attribute(Attributes attr,Text att_name,Attribute_Blob &att) 
Description
From the Attributes attr, get the first attribute called att_name and return the attribute value in att. 
The attribute must be of type Attribute_Blob.
If the attribute is not of type Attribute_Blob then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3393
Get_attribute(Attributes attr,Integer att_no,Text &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Text &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Text. 
If the attribute is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1950
Get_attribute(Attributes attr,Integer att_no,Integer &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Integer &att) 
Description
User Defined Attributes

From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Integer. 
If the attribute is not of type Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1951
Get_attribute(Attributes attr,Integer att_no,Real &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Real &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Real. 
If the attribute is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1952
Get_attribute(Attributes attr,Integer att_no,Uid &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Uid &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Uid. 
If the attribute is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1953
Get_attribute(Attributes attr,Integer att_no,Attributes &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Attributes &att) 
Description
From the Attributes attr, get the first Attribute with number att_no and return the Attributes value in 
att. The attribute must be of type Attributes. 
User Defined Attributes
If the attribute is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1954
Get_attribute(Attributes attr,Integer att_no,Integer64 &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Integer64 &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type 64 bit Integer. 
If the attribute is not of type 64 bit Integer then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 3245
Get_attribute(Attributes attr,Integer att_no,Guid &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Guid &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Guid. 
If the attribute is not of type Guid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 3246
Get_attribute(Attributes attr,Integer att_no,Attribute_Blob &att) 
Name
Integer Get_attribute(Attributes attr,Integer att_no,Attribute_Blob &att) 
Description
From the Attributes attr, get the first attribute with number att_no and return the attribute value in 
att. The attribute must be of type Attribute_Blob. 
If the attribute is not of type Attribute_Blob then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
User Defined Attributes

Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 3394
Get_attribute_name(Attributes attr,Integer att_no,Text &name) 
Name
Integer Get_attribute_name(Attributes attr,Integer att_no,Text &name) 
Description
From the Attributes attr, get the attribute with number att_no and return the Text value in name. The 
attribute must be of type Text. 
If the attribute is not of type Text then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number 
att_no.
ID = 1955
Get_attribute_type(Attributes attr,Text att_name,Integer &att_type) 
Name
Integer Get_attribute_type(Attributes attr,Text att_name,Integer &att_type) 
Description
Get the type of the attribute with the name att_name from the Attribute attr. The type is returned in 
att_type.
For the list of attribute types, go to  Data Type Attribute Type.
A function return value of zero indicates the attribute type was successfully returned.
ID = 1956
Get_attribute_type(Attributes attr,Integer att_num,Integer &att_type) 
Name
Integer Get_attribute_type(Attributes attr,Integer att_num,Integer &att_type) 
Description
Get the type of the attribute with the number att_num from the Attribute attr. The type is returned in 
att_type.
For the list of attribute types, go to  Data Type Attribute Type.
A function return value of zero indicates the attribute type is successfully returned.
ID = 1957
Get_attribute_length(Attributes attr,Text att_name,Integer &att_len) 
Name
User Defined Attributes
Integer Get_attribute_length(Attributes attr,Text att_name,Integer &att_len) 
Description
For the Attributes attr, get the length in bytes of the attribute of name att_name. The number of 
bytes is returned in att_len.
This is mainly for use with attributes of types Text and Binary (blobs)
A function return value of zero indicates the attribute length is successfully returned.
ID = 1958
Get_attribute_length(Attributes attr,Integer att_no,Integer &att_len) 
Name
Integer Get_attribute_length(Attributes attr,Integer att_no,Integer &att_len) 
Description
For the Attributes attr, get the length in bytes of the attribute with number att_no. The number of 
bytes is returned in att_len.
This is mainly for use with attributes of types Text and Binary (blobs)
A function return value of zero indicates the attribute length is successfully returned.
ID = 1959
Set_attribute(Attributes attr,Text att_name,Text att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Text att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Text and give it the value att.
   if the first attribute called att_name does exist and it is type Text, then set its value to att.
If the attribute exists and is not of type Text, then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1960
Set_attribute(Attributes attr,Text att_name,Integer att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Integer att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Integer and give it the value 
att.
   if the attribute called att_name does exist and it is type Integer, then set its value to att.
If the attribute exists and is not of type Integer then a non-zero return value is returned.
User Defined Attributes

A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
 ID = 1961
Set_attribute(Attributes attr,Text att_name,Real att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Real att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Real and give it the value att.
   if the first attribute called att_name does exist and it is type Real, then set its value to att.
If the attribute exists and is not of type Real then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1962
Set_attribute(Attributes attr,Text att_name,Uid att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Uid att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Uid and give it the value att.
   if the first attribute called att_name does exist and it is type Uid, then set its value to att.
If the attribute exists and is not of type Uid then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1963
Set_attribute(Attributes attr,Text att_name,Attributes att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Attributes att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Attributes and give it the value 
att.
   if the first attribute called att_name does exist and it is type Attributes, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 1964
User Defined Attributes
Set_attribute(Attributes attr,Text att_name,Integer64 att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Integer64 att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type 64 bit Integer and give it the 
value att.
   if the first attribute called att_name does exist and it is type 64 bit Integer, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3247
Set_attribute(Attributes attr,Text att_name,Guid att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Guid att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Guid and give it the value att.
   if the first attribute called att_name does exist and it is type Guid, then set its value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3248
Set_attribute(Attributes attr,Text att_name,Attribute_Blob att) 
Name
Integer Set_attribute(Attributes attr,Text att_name,Attribute_Blob att) 
Description
For the Attributes attr,
   if the attribute called att_name does not exist then create it as type Attribute_Blob (binary) and 
give it the value att.
   if the first attribute called att_name does exist and it is type Attribute_Blob (binary), then set its 
value to att.
If the attribute exists and is not of type Attributes then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.
ID = 3395
Set_attribute(Attributes attr,Integer att_no,Text att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Text att) 
User Defined Attributes

Description
For the Attributes attr, if the attribute number att_no exists and it is of type Text, then its value is set 
to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Text then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1965
Set_attribute(Attributes attr,Integer att_no,Integer att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Integer att) 
Description
For the Attributes attr, if the attribute number att_no exists and it is of type Integer, then its value is 
set to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Integer then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1966
Set_attribute(Attributes attr,Integer att_no,Real att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Real att) 
Description
For the Attributes attr, if the attribute number att_no exists and it is of type Real, then its value is set 
to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Real then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1967
Set_attribute(Attributes attr,Integer att_no,Uid att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Uid att) 
User Defined Attributes
Description
For the Attributes attr, if the attribute number att_no exists and it is of type Uid, then its value is set 
to att.
If there is no attribute with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Uid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
ID = 1968
Set_attribute(Attributes attr,Integer att_no,Attributes att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Attributes att) 
Description
For the Attributes attr, if the attribute number att_no exists and it is of type Attributes, then its value 
is set to att.
If there is no Attributes with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
 ID = 1969
Set_attribute(Attributes attr,Integer att_no,Integer64 att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Integer64 att) 
Description
For the Attributes attr, if the attribute number att_no exists and it is of type 64 bit Integer, then its 
value is set to att.
If there is no Attributes with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type 64 bit Integer then a non-zero return value 
is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
 ID = 3250
Set_attribute(Attributes attr,Integer att_no,Guid att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Guid att) 
User Defined Attributes

Description
For the Attributes attr, if the attribute number att_no exists and it is of type Guid, then its value is set 
to att.
If there is no Attributes with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Guid then a non-zero return value is 
returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
 ID = 3251
Set_attribute(Attributes attr,Integer att_no,Attribute_Blob att) 
Name
Integer Set_attribute(Attributes attr,Integer att_no,Attribute_Blob att) 
Description
For the Attributes attr, if the attribute number att_no exists and it is of type Attribute_Blob (binary), 
then its value is set to att.
If there is no Attributes with number att_no then nothing can be done and a non-zero return code is 
returned.
If the attribute of number att_no exists and is not of type Attribute_Blob (binary) then a non-zero 
return value is returned.
A function return value of zero indicates the attribute value is successfully set.
Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.
 ID = 3396
Attribute_debug(Attributes attr) 
Name
Integer Attribute_debug(Attributes attr) 
Description
For internal 12d Solutions use only.
Write out even more information about the Attributes attr to the Output Window.
A function return value of zero indicates the function was successful.
ID = 1971
Get_attribute_by_type(Attributes attr,Text att_name,Text &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Text &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Text and return the 
attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
User Defined Attributes
ID = 3251
Get_attribute_by_type(Attributes attr,Text att_name,Integer &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Integer &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Integer and return the 
attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3252
Get_attribute_by_type(Attributes attr,Text att_name,Real &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Real &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Real and return the 
attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3253
Get_attribute_by_type(Attributes attr,Text att_name,Uid &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Uid &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Uid and return the 
attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3254
Get_attribute_by_type(Attributes attr,Text att_name,Attributes &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Attributes &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Attributes (group) and 
return the attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
User Defined Attributes

ID = 3255
Get_attribute_by_type(Attributes attr,Text att_name,Integer64 &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Integer64 &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type 64 bit Integer and return 
the attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3256
Get_attribute_by_type(Attributes attr,Text att_name,Guid &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Guid &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Guid and return the 
attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3257
Get_attribute_by_type(Attributes attr,Text att_name,Attribute_Blob &att) 
Name
Integer Get_attribute_by_type(Attributes attr,Text att_name,Attribute_Blob &att) 
Description
From the Attributes attr, get the first attribute called att_name with the type Attribute_Blob (binary) 
and return the attribute value in att.
If there is no such attribute then a non-zero return value is returned.
A function return value of zero indicates the attribute value is successfully returned.
ID = 3397
Set_attribute_by_type(Attributes attr,Text att_name,Text att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Text att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Text does not exist then create it and give it the value att.
   if the attributes called att_name with type Text does exist, then assign the value of the first one to 
att.
A function return value of zero indicates the attribute value is successfully set.
User Defined Attributes
ID = 3258
Set_attribute_by_type(Attributes attr,Text att_name,Integer att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Integer att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Integer does not exist then create it and give it the value 
att.
   if the attributes called att_name with type Integer does exist, then assign the value of the first one 
to att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3259
Set_attribute_by_type(Attributes attr,Text att_name,Real att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Real att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Real does not exist then create it and give it the value 
att.
   if the attributes called att_name with type Real does exist, then assign the value of the first one to 
att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3260
Set_attribute_by_type(Attributes attr,Text att_name,Uid att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Uid att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Uid does not exist then create it and give it the value att.
   if the attributes called att_name with type Uid does exist, then assign the value of the first one to 
att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3261
Set_attribute_by_type(Attributes attr,Text att_name,Attributes att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Attributes att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Attributes (group) does not exist then create it and give it 
User Defined Attributes

the value att.
   if the attributes called att_name with type Attributes (group) does exist, then assign the value of 
the first one to att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3262
Set_attribute_by_type(Attributes attr,Text att_name,Integer64 att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Integer64 att) 
Description
For the Attributes attr,
   if the attribute called att_name with type 64 bit Integer does not exist then create it and give it the 
value att.
   if the attributes called att_name with type 64 bit Integer does exist, then assign the value of the 
first one to att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3263
Set_attribute_by_type(Attributes attr,Text att_name,Guid att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Guid att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Guid does not exist then create it and give it the value 
att.
   if the attributes called att_name with type Guid does exist, then assign the value of the first one to 
att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3264
Set_attribute_by_type(Attributes attr,Text att_name,Attribute_Blob att) 
Name
Integer Set_attribute_by_type(Attributes attr,Text att_name,Attribute_Blob att) 
Description
For the Attributes attr,
   if the attribute called att_name with type Attribute_Blob (binary) does not exist then create it and 
give it the value att.
   if the attributes called att_name with type Attribute_Blob (binary) does exist, then assign the value 
of the first one to att.
A function return value of zero indicates the attribute value is successfully set.
ID = 3398
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Text att)
Name
User Defined Attributes
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Text att)
Description
For the Attributes attr, insert a new attribute called att_name with type Text and with the value att at 
the given index position. All existing attributes with the old indices greater or equal position will 
have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3658
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Integer 
att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Integer att)
Description
For the Attributes attr, insert a new attribute called att_name with type Integer and with the value att 
at the given index position. All existing attributes with the old indices greater or equal position will 
have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3659
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Real att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Real att)
Description
For the Attributes attr, insert a new attribute called att_name with type Real and with the value att 
at the given index position. All existing attributes with the old indices greater or equal position will 
have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3660
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Uid att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Uid att)
Description
For the Attributes attr, insert a new attribute called att_name with type Uid and with the value att at 
the given index position. All existing attributes with the old indices greater or equal position will 
have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3661
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Attributes 
att)
Name
User Defined Attributes

Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Attributes att)
Description
For the Attributes attr, insert a new attribute called att_name with type Attributes (group) and with 
the value att at the given index position. All existing attributes with the old indices greater or equal 
position will have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3662
Insert_attribute_at_position(Attributes attr,Text att_name,Integer 
position,Attribute_Blob att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Attribute_Blob att)
Description
For the Attributes attr, insert a new attribute called att_name with type Attribute_Blob (binary) and 
with the value att at the given index position. All existing attributes with the old indices greater or 
equal position will have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3663
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Integer64 
att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Integer64 att)
Description
For the Attributes attr, insert a new attribute called att_name with type 64 bit Integer and with the 
value att at the given index position. All existing attributes with the old indices greater or equal 
position will have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3664
Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Guid att)
Name
Integer Insert_attribute_at_position(Attributes attr,Text att_name,Integer position,Guid att)
Description
For the Attributes attr, insert a new attribute called att_name with type Guid and with the value att 
at the given index position. All existing attributes with the old indices greater or equal position will 
have their indices increased by one.
A function return value of zero indicates the attribute value is successfully set.
ID = 3665
Folders
5.30 Folders
Directory_exists(Text folder_name) 
Name
Integer Directory_exists(Text folder_name) 
Description
Check if a folder of name folder_name exists.
If folder_name is a relative path, the folder is checked in the current working folder of the project.
If folder_name is an absolute (starts with say C:, \\, //), then the folder is checked using the absolute 
path.
A non-zero function return value indicates that the folder exists.
A zero function return value indicates that the folder does not existed.
Warning - this is the opposite of most 12dPL function return values
ID = 2468
List_files_in_folder(Text input_folder,Text search_pattern,Integer 
&output_count,Dynamic_Text &output_file_names) 
Name
Integer List_files_in_folder(Text input_folder,Text search_pattern,Integer &output_count,Dynamic_Text 
&output_file_names) 
Description
Search all files with names following search_pattern from a given input_folder. The number of 
files is returned in output_count, the list of file names is returned in output_file_names. 
A function return value of zero indicates the function was successful.
 ID = 7895
List_files_in_folder(Text input_folder,Text search_pattern,Integer 
recursive_mode,Integer &output_count,Dynamic_Text 
&file_names,Dynamic_Integer64 &file_sizes,Dynamic_Integer64 
&times_created,Dynamic_Integer64 &times_modified,Dynamic_Integer64 
&times_accessed,Dynamic_Integer &attributes,Text &output_message)
Name
Integer List_files_in_folder(Text input_folder,Text search_pattern,Integer recursive_mode,Integer 
&output_count,Dynamic_Text &file_names,Dynamic_Integer64 &file_sizes,Dynamic_Integer64 
&times_created,Dynamic_Integer64 &times_modified,Dynamic_Integer64 
&times_accessed,Dynamic_Integer &attributes,Text &output_message)
Description
Search all files/directory with names following search_pattern from a given input_folder. The 
number of files is returned in output_count, the list of file names is returned in file_names; other 
information of the files are returned in file_sizes times_created times_modified times_accessed 
attributes.
List of valid values for recursive_mode :
Folders

  1 - search all files on the local folder only, output names are relative to input folder
  2 - search all directories on the local folder only, output names are relative to input folder
  3 - search all files and directories on the local folder only, output names are relative to input folder
  4 - search all files on the local folder only, output names are absolute
  5 - search all directories on the local folder only, output names are absolute
  6 - search all files and directories on the local folder only, output names are absolute
  11 - search all files on the local folder and also sub folders recursively
  12 - search all directories on the local folder and also sub folders recursively
  13 - search all files and directories on the local folder and also sub folders recursively
  21 - search all files on the local folder and also sub folders breadth first recursively
  22 - search all directories on the local folder and also sub folders breadth first recursively
  23 - search all files and directories on the local folder and also sub folders breadth first recursively
A function return value of zero indicates the function was successful.
 ID = 8011
List_files_in_folder(Text input_folder,Integer recursive_mode,Integer 
&output_count,Dynamic_Text &file_names,Dynamic_Integer64 
&file_sizes,Dynamic_Integer64 &times_created,Dynamic_Integer64 
&times_modified,Dynamic_Integer64 &times_accessed,Dynamic_Integer 
&attributes,Text &output_message)
Name
Integer List_files_in_folder(Text input_folder,Integer recursive_mode,Integer &output_count,Dynamic_Text 
&file_names,Dynamic_Integer64 &file_sizes,Dynamic_Integer64 &times_created,Dynamic_Integer64 
&times_modified,Dynamic_Integer64 &times_accessed,Dynamic_Integer &attributes,Text 
&output_message)
Description
Search all files/directory from a given input_folder. The number of files is returned in 
output_count, the list of file names is returned in file_names; other information of the files are 
returned in file_sizes times_created times_modified times_accessed attributes.
List of valid values for recursive_mode :
  1 - search all files on the local folder only, output names are relative to input folder
  2 - search all directories on the local folder only, output names are relative to input folder
  3 - search all files and directories on the local folder only, output names are relative to input folder
  4 - search all files on the local folder only, output names are absolute
  5 - search all directories on the local folder only, output names are absolute
  6 - search all files and directories on the local folder only, output names are absolute
  11 - search all files on the local folder and also sub folders recursively
  12 - search all directories on the local folder and also sub folders recursively
  13 - search all files and directories on the local folder and also sub folders recursively
  21 - search all files on the local folder and also sub folders breadth first recursively
  22 - search all directories on the local folder and also sub folders breadth first recursively
  23 - search all files and directories on the local folder and also sub folders breadth first recursively
A function return value of zero indicates the function was successful.
Folders
 ID = 8042
List_subfolders_in_folder(Text input_folder,Text search_pattern,Integer 
&output_count,Dynamic_Text &output_subfolder_names) 
Name
Integer List_subfolders_in_folder(Text input_folder,Text search_pattern,Integer 
&output_count,Dynamic_Text &output_subfolder_names)
Description
Search all subfolders with names following search_pattern from a given input_folder. The number 
of files is returned in output_count, the list of subfolder names is returned in 
output_subfolder_names. 
A function return value of zero indicates the function was successful.
 ID = 7896
Get_file_size(Text file_name,Integer &size) 
Name
Integer Get_file_size(Text file_name,Integer &size) 
Description
Get the size in bytes of the file named file_name and returns the number of bytes in Integer size. 
Note that the file needs to be a file of size less than 2 Gigabytes. 
A function return value of zero indicates the function was successful.
 ID = 2407
Get_file_size(Text file_name,Integer64 &size) 
Name
Integer Get_file_size(Text file_name,Integer64 &size) 
Description
Get the size in bytes of the file named file_name and returns the number of bytes in 64bit Integer 
size. Note that the size of the file can be larger than 2 Gigabytes. s
A function return value of zero indicates the function was successful.
 ID = 3874
Get_file_created_time_utc(Text file_name,Integer64 &time) 
Name
Integer Get_file_created_time_utc(Text file_name,Integer64 &time) 
Description
Get the created time as the number of seconds elapsed since midnight, January 1st 1970 UTC of 
file_name and returns the number of bytes in 64bit Integer time. 
A function return value of zero indicates the function was successful.
 ID = 3875
Folders

Get_file_modified_time_utc(Text file_name,Integer64 &time) 
Name
Integer Get_file_modified_time_utc(Text file_name,Integer64 &time) 
Description
Get the last modified time as the number of seconds elapsed since midnight, January 1st 1970 UTC 
of file_name and returns the number of bytes in 64bit Integer time. 
A function return value of zero indicates the function was successful.
 ID = 3876
Get_file_accessed_time_utc(Text file_name,Integer64 &time) 
Name
Integer Get_file_accessed_time_utc(Text file_name,Integer64 &time) 
Description
Get the accessed time as the number of seconds elapsed since midnight, January 1st 1970 UTC of 
file_name and returns the number of bytes in 64bit Integer time. 
A function return value of zero indicates the function was successful.
 ID = 3877
Touch_file_modified_time(Text path_name) 
Name
Integer Touch_file_modified_time(Text path_name) 
Description
Change the modified time of path_name to the current time.
A function return value of zero indicates the function was successful.
 ID = 7984
Touch_file_accessed_time(Text path_name) 
Name
Integer Touch_file_accessed_time(Text path_name) 
Description
Change the accessed time of path_name to the current time.
A function return value of zero indicates the function was successful.
 ID = 7985
File_contains(Text file,Text search_text,Integer case_sensitive,Integer 
whole_word,Integer &found) 
Name
Integer File_contains(Text file,Text search_text,Integer case_sensitive,Integer whole_word,Integer &found)
Description
Search for the key word search_text in a given text file and set the output Integer found to 1 if the file 
Folders
contain the key word; 0 otherwise. The search is case sensitive if case_sensitive is 1; and the 
search is looking for only the whole word if whole_word is 1.
A function return value of zero indicates the function was successful.
 ID = 3878
File_contains_XML_element(Text file,Integer search_mode,Text search_for,Integer 
&found)
Name
Integer File_contains_XML_element(Text file,Integer search_mode,Text search_for,Integer &found)
Description
Search for the key word search_node in a given XML file and set the output Integer found to 1 if 
the file contain the key word; 0 otherwise. 
The valid values for Integer search_mode are:
0
search names only
1
search attributes only
2
search values only
3
search all
A function return value of zero indicates the function was successful.
 ID = 3930
Get_file_encoding(Text file_name,Integer &encode) 
Name
Integer Get_file_encoding(Text file_name,Integer &encode) 
Description
Get the encoding style encode of the file named file_name.
List of encoding 
  File_Encoding_Error 
-1
  File_Encoding_None
0
  File_Encoding_UTF_8
1
  File_Encoding_UTF_16_LE
2
  File_Encoding_UTF_16_BE
3
  File_Encoding_UTF_32_LE
4
  File_Encoding_UTF_32_BE
5
A function return value of zero indicates the function was successful.
 ID = 3821
Get_file_read_only(Text file_name,Integer &read_only)
Name
Integer Get_file_read_only(Text file_name,Integer &read_only) 
Description
Folders

Get the read_only property of the file named file_name: 1 means true, 0 means false
A function return value of zero indicates the function was successful.
 ID = 7744
Set_file_read_only(Text file_name,Integer read_only)
Name
Integer Set_file_read_only(Text file_name,Integer read_only) 
Description
Set the read_only property of the file named file_name: 1 means true, 0 means false
A function return value of zero indicates the function was successful.
 ID = 7745
Directory_create(Text folder_name) 
Name
Integer Directory_create(Text folder_name) 
Description
Create the folder folder_name in the current working folder (the folder name can not contain any 
paths)
Note - Directory_create_recursive will create a folder tree.
A function return value of zero indicates the function was successful.
ID = 2470
Directory_create_recursive(Text folder_name) 
Name
Integer Directory_create_recursive(Text folder_name) 
Description
Create the folder folder_name. The folder name can contain paths and if any of the folders along the 
path do not exist, then they will also be created. 
If folder_name does not contain any path then the folder is created in the current working folder.
A function return value of zero indicates the function was successful.
ID = 2471
Directory_delete(Text folder_name) 
Name
Integer Directory_delete(Text folder_name) 
Description
If the folder named folder_name is empty, delete the folder folder_name.
Note - Directory_delete_recursive will delete a non-empty folder and all of its sub-folders.
A function return value of zero indicates the function was successful.
ID = 2469
Folders
Directory_delete_recursive(Text folder_name) 
Name
Integer Directory_delete_recursive(Text folder_name) 
Description
Delete the folder named folder_name, and all the sub-folders of folder_name.
A function return value of zero indicates the function was successful.
WARNING Using a folder name of d: will delete the entire d drive.
You have been warned.
ID = 2472
Is_absolute_path(Text path_name) 
Name
Integer Is_absolute_path(Text path_name) 
Description
Check the given directory path_name is absolute path .
A function return value of one indicates the path is absolute; zero indicates the path is not absolute.
ID = 7814
Get_absolute_path(Text path_name) 
Name
Text Get_absolute_path(Text path_name) 
Description
Return the text representing the absolute path from the given directory path_name.
For examples:
Get_absolute_path("$LIB/"); // return the absolute path to the library folder
Get_absolute_path("$USER_LIB/"); // return the absolute path to the user library folder
Get_absolute_path("options_logs/"); // usually return the absolute path to options usage folder in the 
working project
ID = 7815
12d Model Program and Folders

5.31 12d Model Program and Folders
Get_program_version_number()
Name
Integer Get_program_version_number()
Description
The function return value is the 12d Model version number. 
For example, 14 for 12d Model 14C1c
ID = 2291
Get_program_major_version_number()
Name
Integer Get_program_major_version_number() 
Description
The function return value is the 12d Model major version number. That is 1 for C1, 2 for C2 etc, 0 for 
Alpha or Beta.
For example, 1 for 12d Model 14C1c
ID = 2292
Get_program_minor_version_number()
Name
Integer Get_program_minor_version_number()
Description
The function return value is the 12d Model minor version number. That is 1 for a, 2 for b, 3 of c etc.
For example, 3 for 12d Model 14C1c
ID = 2293
Get_program_folder_version_number()
Name
Integer Get_program_folder_version_number()
Description
The function return value is the 12d Model folder version number.
For example, 00 in "Program Files\12dModel\14.00
 ID = 2294
Get_program_build_number()
Name
Integer Get_program_build_number()
Description
12d Model Program and Folders
The function return value is the 12d Model build number.
This is for internal use only and for minidumps.
ID = 2295
Get_program_special_build_name()
Name
Text Get_program_special_build_name()
<no description>
ID = 2296
Get_program_patch_version_name()
Name
Text Get_program_patch_version_name() 
Description
The function return value is a special patch version description for pre-release versions and it is 
written after the 12d Model version information. It is blank for release versions.
For example "Alpha 274 SLF,SLX,Image Dump - Not For Production"
ID = 2297
Get_program_full_title_name() 
Name
Text Get_program_full_title_name() 
Description
The function return value is the full name that is written out after 12d Model on the top of the 
12d Model Window.
For example "10.0 Alpha 274 SLF,SLX,Image Dump - Not For Production"
ID = 2298
Get_program() 
Name
Text Get_program() 
Description
The function return value is the full path to where the 12d.exe is on disk. It includes the "12d.exe".
For example "C:\Program Files\12d\12dmodel\10.00\nt.x86\12d.exe"
ID = 2299
 
Get_program_name() 
Name
Text Get_program_name() 
12d Model Program and Folders

Description
The function return value is the name of the 12d Model executable without the ".exe".
That is, "12d".
ID = 2300
Is_12d_view()
Name
Integer Is_12d_view()
Description
The function return value is 1 if the current executable is 12d View, and 0 otherwise.
ID = 7893
Is_12d_model()
Name
Integer Is_12d_model()
Description
The function return value is 1 if the current executable is 12d Model, and 0 otherwise.
ID = 7894
Get_program_folder() 
Name
Text Get_program_folder() 
Description
The function return value is the full path to the folder where the 12d Model executable (12d.exe) is 
on disk.
For example "C:\Program Files\12d\12dmodel\10.00\nt.x86"
ID = 2301
Get_program_parent_folder() 
Name
Text Get_program_parent_folder() 
Description
The function return value is the full path to the folder above where the 12d Model executable 
(12d.exe) is on disk.
For example "C:\Program Files\12d\12dmodel\10.00"
ID = 2302
Get_project_folder(Text &name)
Name
Integer Get_project_folder(Text &name) 
12d Model Program and Folders
Description
Get the path to the working folder (the folder containing the current project) and return it in name.
A function return value of zero indicates the function was successful.
ID = 1891
Get_temporary_directory(Text &folder_name) 
Name
Integer Get_temporary_directory(Text &folder_name) 
Description
Get the name of the Windows temporary folder %TEMP% and return it as folder_name.
A function return value of zero indicates the function was successful.
ID = 2473
Get_temporary_12d_directory(Text &folder_name) 
Name
Integer Get_temporary_12d_directory(Text &folder_name) 
Description
Get the name of the 12d Model temporary folder "%TEMP%\12d", and return it as folder_name.
A function return value of zero indicates the function was successful.
ID = 2474
Get_temporary_project_directory(Text &folder_name) 
Name
Integer Get_temporary_project_directory(Text &folder_name) 
Description
Get the name of the current 12d Model Project temporary folder "%TEMP%\12d\process-id" (where 
process-id is the process id of the current running 12d.exe), and return it as folder_name 
A function return value of zero indicates the function was successful.
Note - Every 12d project has a independent temporary folder.
ID = 2475
Control bar

5.32 Control bar
Set_cad_controlbar(Text name,Model model,Integer colour,Real z,Text linestyle,Real 
weight,Integer tinable)
Name
Integer Set_cad_controlbar(Text name,Model model,Integer colour,Real z,Text linestyle,Real weight,Integer 
tinable)
Description
Set fields of CAD control bar with Text name, Model model, standard 12D colour Integer colour, 
height measure Real z, linestyle name Text linestyle, line weight Real weight, Integer tinable 
A return value of zero indicates the function call was successful.
ID = 3141
Get_cad_controlbar(Text &name,Model &model,Integer &colour,Real &z,Text 
&linestyle,Real &weight,Integer &tinable)
Name
Integer Get_cad_controlbar(Text &name,Model &model,Integer &colour,Real &z,Text &linestyle,Real 
&weight,Integer &tinable)
Description
Get fields of CAD control bar to Text name, Model model, standard 12D colour Integer colour, 
height measure Real z, linestyle name Text linestyle, line weight Real weight, Integer tinable 
A return value of zero indicates the function call was successful.
ID = 3140
Set_text_controlbar(Text textstyle_name,Real size)
Name
Integer Set_text_controlbar(Text textstyle_name,Real size)
Description
Set fields of text control bar with textstyle name Text textstyle_name, size Real size
A return value of zero indicates the function call was successful.
ID = 3143
Get_text_controlbar(Text &textstyle_name,Real &size)
Name
Integer Get_text_controlbar(Text &textstyle_name,Real &size)
Description
Get fields of text control bar to textstyle name Text textstyle_name, size Real size
A return value of zero indicates the function call was successful.
ID = 3142
Control bar
Set_text_controlbar(Textstyle_Data textstyle_data)
Name
Integer Set_text_controlbar(Textstyle_Data textstyle_data)
Description
Set fields of text control bar with Textstyle_Data textstyle_data 
A return value of zero indicates the function call was successful.
ID = 3145
Get_text_controlbar(Textstyle_Data &textstyle_data)
Name
Integer Get_text_controlbar(Textstyle_Data &textstyle_data)
Description
Get fields of text control bar to Textstyle_Data textstyle_data 
A return value of zero indicates the function call was successful.
ID = 3144
Set_symbol_controlbar(Text symbol_name,Real size)
Name
Integer Set_symbol_controlbar(Text symbol_name,Real size)
Description
Set fields of symbol control bar with symbol name Text symbol_name, size Real size
A return value of zero indicates the function call was successful.
ID = 3147
Get_symbol_controlbar(Text &symbol_name,Real &size)
Name
Integer Get_symbol_controlbar(Text &symbol_name,Real &size)
Description
Get fields of symbol control bar to symbol name Text symbol_name, size Real size
A return value of zero indicates the function call was successful.
ID = 3146
Set_symbol_controlbar(Integer use_flag,Text symbol_name,Integer colour,Real 
size,Real offset,Real raise,Real angle)
Name
Integer Set_symbol_controlbar(Integer use_flag,Text symbol_name,Integer colour,Real size,Real offset,Real 
raise,Real angle)
Description
Control bar

Set fields of symbol control bar with symbol name Text symbol_name, Integer colour, Real size, 
Real offset, Real raise, Real angle
Integer use_flag is the bit-wise sum of a subset of 
0x001 Style
0x002 Colour
0x004 Size
0x008 Offset
0x010 Raise
0x020 Angle
A return value of zero indicates the function call was successful.
ID = 3149
Get_symbol_controlbar(Integer &use_flag,Text &symbol_name,Integer &colour,Real 
&size,Real &offset,Real &raise,Real &angle)
Name
Integer Get_symbol_controlbar(Integer &use_flag,Text &symbol_name,Integer &colour,Real &size,Real 
&offset,Real &raise,Real &angle)
Description
Get fields of symbol control bar to symbol name Text symbol_name, Integer colour, Real size, 
Real offset, Real raise, Real angle
Integer use_flag is the bit-wise sum of a subset of 
0x001 Style
0x002 Colour
0x004 Size
0x008 Offset
0x010 Raise
0x020 Angle
A return value of zero indicates the function call was successful.
ID = 3148
Set_pipe_controlbar(Integer shape,Integer justify,Real size1,Real size2)
Name
Integer Set_pipe_controlbar(Integer shape,Integer justify,Real size1,Real size2)
Description
Set fields of pipe control bar with Integer shape, Integer justify, Real size1, Real size2
Value for shape: 0 not use, 1 pipe, 2 culvert 
Value for justify: 0 invert, 1 centre, 2 obvert 
A return value of zero indicates the function call was successful.
ID = 3151
Get_pipe_controlbar(Integer &shape,Integer &justify,Real &size1,Real &size2)