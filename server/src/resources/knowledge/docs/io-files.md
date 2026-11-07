> Source: *12d Model Macro Programming Manual* — Section 5.17 (pages 173–196)

# 12dPL I/O and Files

Output Window (macro console), clipboard, file I/O (open/close/read/write), 12d ASCII file format read/write.

## Contents
- 5.17.1 Output Window / Macro Console
- 5.17.2 Clipboard
- 5.17.3 File Operations
- 5.17.4 12d ASCII File Read/Write

---

Page 172
Input/Output

5.17 Input/Output
5.17.1 Output Window
Information can be written out to the 12d Model Output Window. 
Print(Text msg)
Name
void Print(Text msg)
Description
Print the Text msg to the Output Window.
ID = 24
Print(Integer value)
Name
void Print(Integer value)
Description
Print the Integer value out in text to the Output Window.
ID = 22
Print(Integer64 value)
Name
void Print(Integer64 value)
Description
Print the 64 bit Integer value out in text to the Output Window.
ID = 3561
Print(Real value)
Name
void Print(Real value)
Description
Print the Real value with six (6) decimal places out in text to the Output Window. For more (or less) 
decimal places, use To_text call to create the text to be printed with the call Print(Text msg); for 
example Print(To_text(r,12)) will print Real r with 12 decimal places to the Output Window.
ID = 23
Print(Attribute_Blob value)
Name
void Print(Attribute_Blob value)
Description
Input/Output
Convert Attribute_Blob value to text and print out the text to the Output Window.
ID = 3563
Print()
Name
void Print()
Description
Print the text "\n" (a new line) to the Output Window.
ID = 25
Clear_console()
Name
 void Clear_console()
Description
Clear the Output Window of any previous information.
Warning: This function work on the Output Window, not the Macro Console.
ID = 1295
Show_console(Integer show) 
Name
Integer Show_console(Integer show)
Description
If show = 0, the Output Window is hidden.
If show = 1, the Output Window is shown.
Warning: This function works on the Output Window, not the Macro Console.
A function return value of zero indicates the function was successful.
Note: the Output Window can also be turned on/off with the 12d Model toggle option
Window =>Output Window.
ID = 1728
Is_console_visible() 
Name
Integer Is_console_visible() 
Description
The function return value indicates if the Output Window is visible or hidden.
If the Integer return value is 0 then the Output Window is hidden.
If the Integer return value is 1 then the Output Window is visible (not hidden).
Warning: This function works on the Output Window, not the Macro Console.
ID = 1729
Input/Output

Is_console_floating() 
Name
Integer Is_console_floating() 
Description
The function return value indicates if the Output Window is floating or not floating.
If the Integer return value is 1 then the Output Window is floating.
If the Integer return value is 0 then the Output Window is either not floating or not visible.
Warning: This function works on the Output Window, not the Macro Console.
ID = 1731
Save_output_window_to_XML(Text &filename)
Name
 Integer Save_output_window_to_XML(Text &filename)
Description
Save the whole content of the Output Window to an XML file of given filename.
A function return value of zero indicates the save was successful.
ID = 7829
Read_output_window_from_XML(Text &filename,Text 
&log_line_group_name,Integer mode)
Name
 Integer Read_output_window_from_XML(Text &filename,Text &log_line_group_name,Integer 
mode)
Description
Load an XML file of given filename to the Output Window under a log_line_group_name.
The mode is for future use, for now it must be 0.
A function return value of zero indicates the load was successful.
ID = 7830
5.17.2 Clipboard
Data can be written to, and read from the Clipboard.
Console_to_clipboard() 
Name
Integer Console_to_clipboard() 
Description
Copy the highlighted contents of the Output Window to the clip board.
Warning: This function works on the Output Window, not the Macro Console.
Input/Output
A function return value of zero indicates the copy was successful.
ID = 1736
Set_clipboard_text(Text txt) 
Name
Integer Set_clipboard_text(Text txt) 
Description
Write the Text txt to the clip board.
A function return value of zero indicates the write was successful.
ID = 1521
Get_clipboard_text(Text &txt) 
Name
Integer Get_clipboard_text(Text &txt) 
Description
Get the text in the clipboard and return in Text txt.
A function return value of zero indicates the read was successful.
ID = 1522
Input/Output

5.17.3 Files
Disk files are used extensively in computing for reasons such as passing data between programs, 
writing out permanent records and reading in bulk input data.
12dPL provides a wide range of functions to allow the user to easily read and write files within 
macros.
For reading in text data, 12dPL provides the File_read_line function which reads one line of text. 
The powerful 12dPL Text functions are then be used on the line of text line to "pull the line apart" 
and extract the relevant information.
Similarly, the File_write_line function outputs one text line and the powerful Text functions are used 
to build up the line of text before it is written out.
For binary files, there are functions to read and write out Real, Integer and Text variables and Real 
and Integer arrays.
File_exists(Text file_name)
Name
Integer File_exists(Text file_name)
Description
Checks to see if a file of name file_name exists.
A non-zero function return value indicates the file exists.
A zero function return value indicates the file does not exist.
Warning - this is the opposite to most 12dPL function return values
ID = 202
File_open(Text file_name,Text mode,Text ccs_text,File &file)
Name
Integer File_open(Text file_name,Text mode,Text ccs_text,File &file) 
Description
Opens a file of name file_name with open type mode. The file unit is returned as File file.
The file can be opened as a Unicode file with a specified encoding or as an ANSI file by using a non-
blank value for the ccs_text parameter.
The available modes are
r
open for reading. If the file does not exist then it fails.
r+
open for update, that is for reading and writing. The file must exist.
rb
read binary
w
opens a file for writing. If the files exists, its current contents are destroyed.
w+
opens a file for reading and writing. If the files exists, its current contents are
      destroyed
wb
write binary
a
open for writing at the end of file (before the end of file marker). 
    If the file does not exist then it is created.
a+
opens for reading and writing to the end of the file (before the end of file marker).
      If the file does not exist then it is created.
When a file is open for append (i.e. a or a+), it is impossible to overwrite information that is already 
in the file. Any writes are automatically added to the end of the file.
ccs_text specifies the coded character set to use and can have the values:
ccs_text = "ccs = UTF-8"
Input/Output
ccs_text = "ccs = UTF-16LE"
ccs_text = "ccs = UNICODE"
or ccs_text = "" (leave it blank) if ANSI encoding is required.
For example
File_open("test file", "w","ccs=UNICODE",file_handle);
Note: BOM detection only applies to files that are opened in Unicode mode (that is, by passing a 
non blank ccs parameter).
If the file already exists and is opened for reading or appending, the Byte Order Mark (BOM), if it 
present in the file, determines the encoding. The BOM encoding takes precedence over the 
encoding that is specified by the ccs flag. The ccs encoding is only used when no BOM is present 
or the file is a new file.
The following table summarises the use of Byte Order Marks (BOM’s) for the various ccs flags given 
to File_open and what happens when there is a BOM in an existing file.
Files opened for writing in Unicode mode (non-blank ccs) automatically have a BOM written to 
them.
When a file that begins with a Byte Order Mark (BOM) is opened, the file pointer is positioned after 
the BOM (that is, at the start of the file's actual content). 
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the file was opened successfully.
ID = 2076
File_open(Text file_name,Text mode,File &file)
Name
Integer File_open(Text file_name,Text mode,File &file)
Description
Note: this option now only creates UNICODE files. To open a ANSI file, use  File_open(Text 
file_name,Text mode,Text ccs_text,File &file) with ccs_text = "" instead.
Opens a file of name file_name with open type mode. The file unit is returned as File file.
The available modes are
r
open for reading
r+
open for update, reading and writing
rb
read binary
w
truncate or create for writing
w+
truncate or create for update
wb
write binary
 Encodings Used When Opening a File Based on non blank ccs Flag and BOM
ccs flag
No BOM (or new file)
BOM: UTF-8
BOM: UTF-16
UNICODE
UTF-16LE
UTF-8
UTF-16LE
UTF-8
UTF-8
UTF-8
UTF-16LE
UTF-16LE
UTF-16LE
UTF-8
UTF-16LE
Input/Output

a
append open for writing at the end of file or create for writing
a+
open for update at end of file or create for update
When a file is open for append (i.e. a or a+), it is impossible to overwrite information that is already 
in the file.
A function return value of zero indicates the file was opened successfully.
ID = 335
File_read_line(File file,Text &text_in)
Name
Integer File_read_line(File file,Text &text_in)
Description
Read a line of text from the File file. The text is read into the Text text_in.
A function return value of -1 indicates the end of the file.
A function return value of zero indicates the text was successfully read in.
ID = 337
File_write_line(File file,Text text_out)
Name
Integer File_write_line(File file,Text text_out)
Description
Write a line of text to the File file. The text to write out is Text text_out.
A function return value of zero indicates the text was successfully written out.
ID = 338
File_tell(File file,Integer &pos)
Name
Integer File_tell(File file,Integer &pos)
Description
Get the current position in the File file.
A function return value of zero indicates the file position was successfully found.
ID = 341
File_seek(File file,Integer pos)
Name
Integer File_seek(File file,Integer pos)
Description
Go to the position pos in the File file.
Position pos has normally been found by a previous File_tell call.
If the file open type was a or a+, then a File_seek cannot be used to position for a write in any part of 
the file that existed when the file was opened.
Input/Output
If you have to File_seek to the beginning of the file, use File_tell to get the initial position and 
File_seek to it rather than to position 0.
So for a Unicode file, if you have to File_seek to the beginning of the file but after the BOM you 
need to first have used a File_tell to get and record the position of the initial start of the file when it 
is opened (for a Unicode file, File_open positions after the BOM) and then to File_seek to that 
recorded beginning of the file rather than to File_seek to position 0.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the file position was successfully found.
ID = 342
File_flush(File file)
Name
Integer File_flush(File file)
Description
Make sure the File file is up to date with what has been written out.
A function return value of zero indicates the file was successfully flushed.
ID = 340
File_rewind(File file)
Name
Integer File_rewind(File file)
Description
Rewind the File file to its beginning. 
WARNING: This function is not to be used with a Unicode file.
If the file is a Unicode file then File_rewind will rewind to BEFORE the BOM. Then writing out any 
information will overwrite the BOM.
So for a Unicode file, to correctly position to the beginning of the file but after the BOM you need to 
first have used a File_tell when opening the file to get and record position of the initial start of the 
file (for a Unicode file, File_open positions after the BOM) and then to File_seek to that recorded 
beginning of the file rather than to File_seek to position 0.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the file was successfully rewound.
ID = 339
File_read(File file,Integer &value) 
Name
Integer File_read(File file,Integer &value) 
Description
Read four bytes from the binary file file and return it as an Integer in value.
A function return value of zero indicates the Integer was successfully returned.
Input/Output

ID = 1710
File_write(File file,Integer value) 
Name
Integer File_write(File file,Integer value) 
Description
Write out value as a four byte integer to the binary file file.
A function return value of zero indicates the Integer was successfully written.
ID = 1713
File_read(File file,Real &value)
Name
Integer File_read(File file,Real &value) 
Description
Read eight bytes from the binary file file and return it as a Real in value.
A function return value of zero indicates the Real was successfully returned.
ID = 1711
File_write(File file,Real value) 
Name
Integer File_write(File file,Real value) 
Description
Write out value as an eight byte real to the binary file file.
A function return value of zero indicates the Real was successfully written.
ID = 1714
File_read_unicode(File file,Integer length,Text &value) 
Name
Integer File_read_unicode(File file,Integer length,Text &value) 
Description
Read length bytes from the binary file file and return it as Text in value.
Note - this works for UNICODE files.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the Text was successfully returned.
ID = 2676
File_write_unicode(File file,Integer length,Text value) 
Name
Input/Output
Integer File_write_unicode(File file,Integer length,Text value) 
Description
Write out value as length lots of two byte Unicode characters to the binary file file.
If there is less than length characters in Text then the number of characters is brought up to length 
by writing out null padding.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the Text was successfully written.
ID = 2677
File_read(File file,Integer length,Text &value) 
Name
Integer File_read(File file,Integer length,Text &value) 
Description
Read length bytes from the binary file file and return it as Text in value.
Note - this only works for ANSI Text.
If any of the characters of Text is not ANSI, then a non-zero function return value is returned.
WARNING: This function is not to be used for Unicode files. For Unicode files, use  
File_read_unicode(File file,Integer length,Text &value) instead.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the Text was successfully returned.
ID = 1712
File_write(File file,Integer length,Text value) 
Name
Integer File_write(File file,Integer length,Text value) 
Description
Write out value as length lots of one byte ANSI characters to the binary file file. 
If any of the characters of Text is not ANSI, then no data is written out and a non-zero function return 
value is returned.
If there is less than length characters in Text then the number of characters is brought up to length 
by writing out null padding.
WARNING: This function is not to be used for Unicode files. For Unicode files, use  
File_write_unicode(File file,Integer length,Text value) instead.
For more information on ANSI, ASCII, Unicode, UTF’s and BOM’s, please see  Set Ups.hwhich is a 
copy of the information from the 12d Model Reference manual.
A function return value of zero indicates the Text was successfully written.
ID = 1715
File_read(File file,Integer length,Integer array[]) 
Input/Output

Name
Integer File_read(File file,Integer length,Integer array[]) 
Description
Read the next length lots of four bytes from the binary file file and return them as an Integer array in 
array[].
A function return value of zero indicates the Integer array was successfully returned.
ID = 1716
File_write(File file,Integer length,Integer array[]) 
Name
Integer File_write(File file,Integer length,Integer array[]) 
Description
Write out the Integer array array[] as length lots of four byte integers to the binary file file.
A function return value of zero indicates the Integer array was successfully written.
ID = 1718
File_read(File file,Integer length,Real array[]) 
Name
Integer File_read(File file,Integer length,Real array[])
Description
Read the next length lots of eight bytes from the binary file file and return them as a Real array in 
array[].
A function return value of zero indicates the Real array was successfully returned.
ID = 1717
File_write(File file,Integer length,Real array[]) 
Name
Integer File_write(File file,Integer length,Real array[]) 
Description
Write out the Integer array array[] as length lots of eight byte reals to the binary file file.
A function return value of zero indicates the Real array was successfully written.
ID = 1719
File_read_short(File file,Integer &value) 
Name
Integer File_read_short(File file,Integer &value) 
Description
Read two bytes from the binary file file and return it as an Integer in value.
A function return value of zero indicates the Integer was successfully returned.
ID = 1720
Input/Output
File_write_short(File file,Integer value) 
Name
Integer File_write_short(File file,Integer value) 
Description
Write out value as a two byte integer to the binary file file.
Because it is only a two byte integer, value must be between -2 to the power of 32, and +2 to the 
power 32.
A function return value of zero indicates the Integer was successfully written.
ID = 1722
File_read_short(File file,Real &value) 
Name
Integer File_read_short(File file,Real &value) 
Description
Read four bytes from the binary file file and return it as a Real in value.
Note - value can only be in the range -32,768 and 32,767.
A function return value of zero indicates the Real was successfully returned.
ID = 1721
File_write_short(File file,Real value) 
Name
Integer File_write_short(File file,Real value) 
Description
Write out value as a four byte real to the binary file file.
Because it is only a four byte real, only seven significant figures can be written out.
A function return value of zero indicates the Real was successfully written.
ID = 1723
File_close(File file)
Name
Integer File_close(File file)
Description
Close the File file.
A function return value of zero indicates file was closed successfully.
ID = 336
File_delete(Text file_name)
Name
Input/Output

Integer File_delete(Text file_name)
Description
Delete a file from the disk
A function return value of zero indicates the file was deleted.
ID = 213
File_copy(Text new_name,Text old_name)
Name
Integer File_copy(Text new_name,Text old_name)
Description
Copy a file from the disk.
A function return value of zero indicates the file was copied successfully.
ID = 3837
File_set_endian(File file,Integer big) 
Name
Integer File_set_endian(File file,Integer big) 
Description
<not implemented>
ID = 1708
File_get_endian(File file,Integer &big) 
Name
Integer File_get_endian(File file,Integer &big) 
Description
<not implemented>
ID = 1709
File_redirect(Text input_file_path,Integer read_write,Integer use_cache,Text 
&output_file_path)
Name
Integer File_redirect(Text input_file_path,Integer read_write,Integer use_cache,Text &output_file_path)
Description
Currently, this function is to work out the local file path output_file_path from a Synergy input path 
input_file_path.
Integer read_write 0 means the file is for reading.
Integer read_write 1 means the file is for writing.
Integer use_cache 1 means true.
A function return value of zero indicates the Real was successfully written.
ID = 3481
Input/Output
Read_PDF(Text pdf_file,Text output_12da)
Name
Integer Read_PDF(Text pdf_file,Text output_12da)
Description
This call is for internal 12D staff only.
Read the vectors, texts and clipping boundaries of an exist pdf file pdf_file and write the result to an 
output 12da file output_12da.
A function return value of zero indicates the file was copied successfully.
ID = 3839
Delete_files(Text name_match)
Name
Integer Delete_files(Text name_match)
Description
Delete all the files with name matching the wild card pattern name_match
A function return value of zero indicates the delete was successful.
ID = 3921
Find_files(Text name_match,Dynamic_Text &file_names)
Name
Integer Find_files(Text name_match,Dynamic_Text &file_names)
Description
File all the files with name matching the wild card pattern name_match and returns the list in 
Dynamic_Text file_names.
A function return value of zero indicates the find was successful.
ID = 7976
Input/Output

5.17.4 12d Ascii
Read_4d_ascii(Text filename,Text prefix) 
Name
Integer Read_4d_ascii(Text filename,Text prefix) 
Description
Read in and process the file called filename as a 12d Ascii file. The post-prefix for models is given 
in prefix.
A function return value of zero indicates the file was successfully read.
ID = 1166
Read_4d_ascii(Text filename,Dynamic_Element &list) 
Name
Integer Read_4d_ascii(Text filename,Dynamic_Element &list) 
Description
Read the data from the 12d Ascii file called filename and load all the created Elements into the 
Dynamic_Element list.
A function return value of zero indicates the file was successfully read.
ID = 2073
Read_12d_data(Text filename,Text prefix) 
Name
Integer Read_12d_data(Text filename,Text prefix) 
Description
Read in and process the file called filename as a 12d Ascii or 12d XML file. If the extension of 
filename is .12dxml or 12dxmlz, then the reading will try to process the file as of 12d XML format; 
otherwise the reading will try to process the file as of 12d Ascii format. The post-prefix for models is 
given in prefix.
A function return value of zero indicates the file was successfully read.
ID = 5437
Read_12d_data(Text filename,Dynamic_Element &list) 
Name
Integer Read_12d_data(Text filename,Dynamic_Element &list) 
Description
Read the data from the 12d Ascii or 12d XML file called filename and load all the created Elements 
into the Dynamic_Element list. If the extension of filename is .12dxml or 12dxmlz, then the reading 
will try to process the file as of 12d XML format; otherwise the reading will try to process the file as of 
12d Ascii format. 
A function return value of zero indicates the file was successfully read.
ID = 5438
Input/Output
Read_12d_data(Text filename,Integer use_super,Integer project_att_mode,Integer 
project_att_dup_mode,Integer model_att_mode,Integer 
model_att_dup_mode,Integer existing_tin_mode,Text prefix)
Name
Integer Read_12d_data(Text filename,Integer use_super,Integer project_att_mode,Integer 
project_att_dup_mode,Integer model_att_mode,Integer model_att_dup_mode,Integer existing_tin_mode,Text 
prefix) 
Description
Read in and process the file called filename as a 12d Ascii or 12d XML file. If the extension of 
filename is .12dxml or 12dxmlz, then the reading will try to process the file as of 12d XML format; 
otherwise the reading will try to process the file as of 12d Ascii format. The post-prefix for models is 
given in prefix.
If use_super is non zero then old string types will be read in as super string.
For the choice in reading project attributes or model attributes; valid values for project_att_mode 
and model_att_mode:
0 - read and merge
1 - delete all old attributes and read
2 - do not read (and keep the existing attributes)
When read and merge project/model attributes, valid values for project_att_dup_mode and 
model_att_dup_mode:
0 - ignore new values
1 - subfix name
2 - duplicate
3 - delete the existing
When read a tin that already exists in the current project; valid values for existing_tin_mode:
0 - error
1 - delete old tin
2 - skip new tin
3 - rename old tin
A function return value of zero indicates the file was successfully read.
ID = 6890
Read_12d_data(Text filename,Integer use_super,Integer project_att_mode,Integer 
project_att_dup_mode,Integer model_att_mode,Integer 
model_att_dup_mode,Integer existing_tin_mode,Dynamic_Element &list)
Name
Integer Read_12d_data(Text filename,Integer use_super,Integer project_att_mode,Integer 
project_att_dup_mode,Integer model_att_mode,Integer model_att_dup_mode,Integer 
existing_tin_mode,Dynamic_Element &list) 
Description
Read the data from the 12d Ascii or 12d XML file called filename and load all the created Elements 
into the Dynamic_Element list. If the extension of filename is .12dxml or 12dxmlz, then the reading 
will try to process the file as of 12d XML format; otherwise the reading will try to process the file as 
Input/Output

of 12d Ascii format. 
If use_super is non zero then old string types will be read in as super string.
For the choice in reading project attributes or model attributes; valid values for project_att_mode 
and model_att_mode:
0 - read and merge
1 - delete all old attributes and read
2 - do not read (and keep the existing attributes)
When read and merge project/model attributes, valid values for project_att_dup_mode and 
model_att_dup_mode:
0 - ignore new values
1 - subfix name
2 - duplicate
3 - delete the existing
When read a tin that already exists in the current project; valid values for existing_tin_mode:
0 - error
1 - delete old tin
2 - skip new tin
3 - rename old tin
A function return value of zero indicates the file was successfully read.
ID = 6891
Input/Output
5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D
From version 12 and later release of version 11, the user can write out tins in a more accurate full 
tin format. Since older versions of 12d Model than v11 c1i cannot read back the 12da or 12dxml file 
with the tin written in the full tin format, we introduce a global boolean variable 
MACRO_CALL_WRITE_FULL_TIN_4D which is defaulted to false.
If the value of the variable is true, then the (older) macro calls will output in full tin format. If the value 
of the variable is false, then the (older) macro calls will not output in full tin format; which is the 
default behaviour.
Write_4d_ascii(Element elt,Text filename,Integer precision,Integer 
output_model_name) 
Name
Integer Write_4d_ascii(Element elt,Text filename,Integer precision,Integer output_model_name) 
Description
Open the file called filename, and append the 12d Ascii of the Element elt to the file. Any 
coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then write the name of the Model containing elt to the file before writing 
out elt.
If output_model_name = 0 then don’t write out the Model name.
For output in full tin format see 5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D.
A function return value of zero indicates the data was successfully written.
ID = 1630
Input/Output

5.17.4.2 Write_Panel_Flags
The write ascii and XML panels have a number of tick boxes to control various aspect of output files. 
There are macro calls in version 12 to capture some of those tick boxes. In stead of having a lot of 
boolean parameters one for each tick box, we use one Integer parameter which is a bitwise sum of 
numbers from the set: 
Panel tick box
Bitwise
output times
0x00000002
output IDs
0x00000004
output points IDs
0x00000008
output attribute IDs
0x00000010
output super string vertex segment uids
0x00000020
output pipe in new format
0x00000040
dereference by computators
0x00000080
output super alignment part
0x00000100
output drawables
0x00000200
output project description
0x00000400
output compact cloud strings
0x00000800
output full tin
0x00001000
output model path
0x00002000
output hex floats
0x00004000
output tin hex floats
0x00008000
output null attributes
0x00010000
null keyword
0x00020000
For full information about each bit, check the documentation for the equivalent tick box in the read 
panel in the reference manual.
For example, a bitwise sums (numbers in decimal) of 8 + 16 + 2048 + 4096 = 6168 (or 0x1818 in 
hex) indicates that output points IDs, attribute IDs, compact cloud strings, and full tin format are 
turned on, and other features are turned off.
Note: if output full tin is on, then older versions of 12d Model than v11 c1i cannot read back the 
12da or 12dxml file with the tin written in the full tin format.
Write_4d_ascii(Element elt,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_4d_ascii(Element elt,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Description
Open the file called filename, and append the 12d Ascii of the Element elt to the file. Any 
coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then write the name of the Model containing elt to the file before writing 
out elt.
Input/Output
If output_model_name = 0 then don’t write out the Model name.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3192
Write_4d_ascii(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name) 
Name
Integer Write_4d_ascii(Dynamic_Element list,Text filename,Integer precision,Integer output_model_name) 
Description
Open the file called filename, and append the 12d Ascii of all the Elements in the 
Dynamic_Element list to the file. Any coordinates and Reals are written out to precision decimal 
places.
If output_model_name = 1 then if write the name of the Model containing each Element to the file 
before writing out the Element. The Model name is not repeated if is the same as the previous 
Element).
If output_model_name = 0 then don’t write out the Model names.
For output in full tin format see 5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D.
A function return value of zero indicates the data was successfully written.
ID = 1631
Write_4d_ascii(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_4d_ascii(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Description
Open the file called filename, and append the 12d Ascii of all the Elements in the 
Dynamic_Element list to the file. Any coordinates and Reals are written out to precision decimal 
places.
If output_model_name = 1 then if write the name of the Model containing each Element to the file 
before writing out the Element. The Model name is not repeated if is the same as the previous 
Element).
If output_model_name = 0 then don’t write out the Model names.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3193
Write_4d_ascii(Model model,Text filename,Integer precision,Integer 
output_model_name) 
Name
Input/Output

Integer Write_4d_ascii(Model model,Text filename,Integer precision,Integer output_model_name) 
Description
Open the file called filename, and append the 12d Ascii of all the Elements in the Model model to 
the file. Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then write the name of model out to the file before the Elements.
If output_model_name = 0 then don’t write out the Model name.
For output in full tin format see 5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D.
A function return value of zero indicates the data was successfully written.
ID = 1632
Write_4d_ascii(Model model,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_4d_ascii(Model model,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Description
Open the file called filename, and append the 12d Ascii of all the Elements in the Model model to 
the file. Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then write the name of model out to the file before the Elements.
If output_model_name = 0 then don’t write out the Model name.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3194
Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level) 
Name
Integer Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level) 
Description
Write the 12d Ascii of the Element elt to the File file. Any coordinates and Reals are written out to 
precision decimal places. The information written to the file is indented by indent_level spaces.
For output in full tin format see 5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D.
A function return value of zero indicates the data was successfully written.
ID = 1928
Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Integer 
bool_flags,Real null_value) 
Name
Integer Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Integer bool_flags,Real 
null_value) 
Description
Write the 12d Ascii of the Element elt to the File file. Any coordinates and Reals are written out to 
Input/Output
precision decimal places. The information written to the file is indented by indent_level spaces.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3195
Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Text 
header) 
Name
Integer Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Text header) 
Description
Write the Text header to the File file and then write the 12d Ascii of the Element elt to the File file. 
Any coordinates and Reals are written out to precision decimal places. The information written to 
the file is indented by indent_level spaces.
For output in full tin format see 5.17.4.1 MACRO_CALL_WRITE_FULL_TIN_4D.
A function return value of zero indicates the data was successfully written.
ID = 1929
Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Text 
header,Integer bool_flags,Real null_value) 
Name
Integer Write_4d_ascii(Element elt,File file,Integer precision,Integer indent_level,Text header,Integer 
bool_flags,Real null_value) 
Description
Write the Text header to the File file and then write the 12d Ascii of the Element elt to the File file. 
Any coordinates and Reals are written out to precision decimal places. The information written to 
the file is indented by indent_level spaces.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 3196
Write_12d_data(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_12d_data(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Description
Write all the Elements in the Dynamic_Element list to the file filename using the format indicated by 
the file extension.
If the extension of filename is .12dxml or 12dxmlz, then the output file will be processed as of12d 
Input/Output

XML format - normal and zipped accordingly.
If the extension of filename is .12da or 12daz, then the output file will be processed as of 12d Ascii 
format - normal and zipped accordingly.
Any other file extension will be process as 12da.
If the file format is not zipped, then new information would be append at the end of existing file. 
Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then if write the name of the Model containing each Element to the file 
before writing out the Element.
If output_model_name = 0 then don’t write out the Model names.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 5439
Write_12d(Dynamic_Element list,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_12d(Dynamic_Element list,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Description
Write all the Elements in the Dynamic_Element list to the file filename using the format indicated by 
the file extension.
If the extension of filename is .12dxml or 12dxmlz, then the output file will be processed as of12d 
XML format - normal and zipped accordingly.
If the extension of filename is .12da or 12daz, then the output file will be processed as of 12d Ascii 
format - normal and zipped accordingly.
Any other file extension will be process as 12da.
If the file format is not zipped, then new information would be append at the end of existing file. 
Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then if write the name of the Model containing each Element to the file 
before writing out the Element.
If output_model_name = 0 then don’t write out the Model names.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 5440
Write_12d_data(Element elt,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_12d_data(Element elt,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Input/Output
Description
Write Element elt to the file filename using the format indicated by the file extension.
If the extension of filename is .12dxml or 12dxmlz, then the output file will be processed as of 12d 
XML format - normal and zipped accordingly.
If the extension of filename is .12da or 12daz, then the output file will be processed as of 12d Ascii 
format - normal and zipped accordingly.
Any other file extension will be process as 12da.
If the file format is not zipped, then new information would be append at the end of existing file. 
Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then if write the name of the Model containing elt to the file before 
writing out the Element.
If output_model_name = 0 then don’t write out the Model names.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 5441
Write_12d_data(Model model,Text filename,Integer precision,Integer 
output_model_name,Integer bool_flags,Real null_value) 
Name
Integer Write_12d_data(Model model,Text filename,Integer precision,Integer output_model_name,Integer 
bool_flags,Real null_value) 
Description
Write all the Elements in the Model model to the file filename using the format indicated by the file 
extension.
If the extension of filename is .12dxml or 12dxmlz, then the output file will be processed as of12d 
XML format - normal and zipped accordingly.
If the extension of filename is .12da or 12daz, then the output file will be processed as of 12d Ascii 
format - normal and zipped accordingly.
Any other file extension will be process as 12da.
If the file format is not zipped, then new information would be append at the end of existing file. 
Any coordinates and Reals are written out to precision decimal places.
If output_model_name = 1 then if write the name of model to the file before writing out the 
Elements data.
If output_model_name = 0 then don’t write out the Model names.
For Integer bool_flags see 5.17.4.2 Write_Panel_Flags.
Null values will be written as Real null_value.
A function return value of zero indicates the data was successfully written.
ID = 5442