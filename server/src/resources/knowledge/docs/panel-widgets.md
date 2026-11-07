> Source: *12d Model Macro Programming Manual* — Section 5.61 (pages 935–1185)

# 12dPL Panels and Widgets

Complete reference for the 12dPL Panel UI system: creating panels, all widget types, layout groups, event loops, validation, and widget-specific functions.

## Contents
- 5.61.1 Overview / General Panel Functions
- 5.61.2 Panel (Create_panel, Show_widget, Wait_on_widgets, etc.)
- 5.61.3 Menu
- 5.61.4 Vertical_Group / Horizontal_Group / Widget_Pages
- 5.61.5 Button / Select_Button
- 5.61.6 Message_Box / Colour_Message_Box
- 5.61.7 Input_Box / Integer_Box / Real_Box / Chainage_Box / Angle_Box
- 5.61.8 Choice_Box / Tick_Box / Named_Tick_Box
- 5.61.9 Model_Box / Tin_Box / View_Box / File_Box / Directory_Box
- 5.61.10 Colour_Box / Linestyle_Box / Symbol_Box
- 5.61.11 Draw_Box / Graph_Box / GridCtrl_Box / ListCtrl_Box
- 5.61.12 Tab_Box / Sheet_Panel / Overlay_Widget
- 5.61.13 Projection_Box / Source_Box / Attributes_Box
- 5.61.14 Select_Box / Target_Box / XYZ_Box
- 5.61.15 Text_Edit_Box / HyperLink_Box / Billboard_Box / Bitmap boxes
- 5.61.16 Tree_Box / List_Box
- 5.61.17 Log_Box / Report_Box / Slider_Box
- 5.61.18 Function_Box / Name_Box / Justify_Box

---

Page 934
Panels and Widgets

5.61 Panels and Widgets
The user can build panels in the 12d Model Programming Language (12dPL) that replicates the look 
and feel, and much of the functionality, of standard 12d Model panels. Even in 12d Model there are 
many options that are written in 12dPL and in most cases, the only way to tell if a panel is an inbuilt 
12d Model panel or is a 12dPL panel is by clicking on the Windows button on the top left hand side 
of a panel and then selecting About.
Panels are made up of Widgets and most panels have:
(a)
Panel title
(a)
Simple Input/Output widgets such a Tin_Box, Model_Box and Named_Tick_Box. These 
Panels and Widgets
Chapter 
Widgets usually have their own validation methods and are often linked to special 12d Model 
objects such as Tins, Models and Linestyles so that lists of pop-ups to choose from, and 
special validations can be done by 12d Model rather than having to be done in the macro. 
(b)
More complex Widgets such as Draw Boxes, Sliders, Log Boxes, Trees and Grids.
(c)
A panel Message Area. Usually one Message_Box for writing messages for the user.
(d)
Buttons such as Process or Finish. Unlike Input Widget, or Trees, or Grids, Buttons usually 
consist of just their Title and a Reply message that it sent back to the macro when the Button is 
pressed.
The Widgets can be built up in horizontal or vertical groups. Widgets inside a Group are 
automatically spaced out by 12d Model.
Once the Panel is constructed, it is displayed on screen by calling Show_widget(Panel panel).
Programming for panels is more complicated than for simple sequential programs using say a 
Console because for panels the program is event driven. 
That is, once the panel is displayed, the user is not very constrained and can fill in Input boxes in 
any order, click on any Buttons in any order. 
The programmer’s code has to watch and cover all these possibilities.
The Widgets in the Panel have to be checked and validated whenever a user works with one of 
them.
And when the Button to start the processing of the Panel is finally pushed, all the Widgets have to 
be checked/validated again because you can’t be sure which ones have been filled in/not filled in 
correctly.
Panel title
Browse button
of a Widget
Browse button
turned off
for a widget
Widget optional
Widget disabled
Horizontal_Group of
two Buttons with
border text "Buttons"
Vertical_Group of
four Widgets with
border text "Tins"
Widget of type Button
Title of Button Widget
or Colour_Message_Box
Widget of type Message_Box
Widget of type
Named_Tick_Box
Widget Tin_Box
Widget title
Panels and Widgets

Once the panel is constructed and displayed using Show_widget, the program normally has to sit 
and wait, watching what events the user triggers. 
This is achieved in the macro by calling the Wait_on_widgets(Integer &id,Text &cmd,Text &msg). The 
macro then sits and waits until an activated Widget returns control back to the macro and passes 
information about what has happened via the id, cmd and msg arguments of Wait_on_widgets. See  
Wait_on_widgets(Integer &id,Text &cmd,Text &msg).
What messages are returned through Wait_on_widgets depends on each Widget in the panel.
The Screen_Text sends no messages at all.
Widgets such as the Integer_Box and Real_Box send keystrokes when each character is typed into 
their information area.
Other Widgets, such as the Tin_Box, control what characters can be typed into their information 
area and only valid characters are passed back via Wait_on_widgets.
For example, for a Tin_Box, only valid tin name characters are passed back. Invalid tin name 
characters are rejected by the Tin_Box itself and typing them does not even display anything but just 
produces a warning bell.
Some Widgets such as the Draw_Box and Select_Box can be very chatty.
For a Draw_Box: as the mouse is moved around the Draw_Box, a "mouse_move" command with a 
message containing the Draw_Box coordinates are returned via
   Wait_on_widgets(draw_box_id,"mouse_move",draw_box coordinates of mouse as text)
plus "hover" commands when the mouse is in the Draw_Box and not moving, and a "mouse_leave" 
command when the mouse leaves the Draw_Box.
For New_Select_Box and Select_Box: after the Pick button is selected, whenever the mouse moves 
around a view, a "motion select" command with view coordinates of the mouse as part of the text 
message, are passed back via Wait_on_widgets.
These evens are returned in case the macro wants to use the coordinates to do something.
Buttons just sit there and only return the command (that is supplied by the programmer) via 
Wait_on_widgets when the button is pressed.
So the process for monitoring a panel is very chatty and normally is controlled why setting a While 
loop watching a variable to stop the loop.
A snippet of code to watch Wait_on_widgets is:
  Integer doit = 1;
  while(doit) {
 // Process events from any of the Widgets on the panel
 Integer ret = Wait_on_widgets(id,cmd,msg);
                 . . .
// somewhere in here doit must be set to 0 (or a jump made to outside the loop)
//         or the loop will go on forever 
  }
After the Wait_on_widgets(id,cmd,msg) call, the id of the Widget, and/or the command cmd, and/or 
the message msg can be interrogated to see what action is required by the program.
For example, a more of the code could be:
  Integer doit = 1;
  while(doit) {
  // Process events from any of the Widgets on the panel
Panels and Widgets
Chapter 
      Integer id; Text cmd; Text msg;
      Integer ret = Wait_on_widgets(id,cmd,msg);
      if(cmd == "keystroke") continue;       // only a keystroke; go back and wait for more
      switch(id) {                        // check which Widget was activated by checking the Widget id
      case Get_id(panel) : {            // the case when the id belongs to the Widget panel
 if(cmd == "Panel Quit") doit = 0; // case when click on X on top right of the panel
//                                                                // set doit to 0 so the While loop will terminate
       break;
      case Get_id(finish) : {            // the id belongs to the Button finish
          if(cmd == "finish") doit = 0;
      } break;
 case Get_id(process) : { // the id belongs to the Button process. Start doing the work
                                                // but first check the validity of all the relevant data in the panel
    . . .
The important commands and messages for each Widget are given in the introductory section for 
each Widget.
Note: Unknown events might be passed to Wait_on_widgets, in those cases, the return value of the 
call is still zero, but the value of id, cmd and msg remained unchanged. Hence it is important to 
reset the value of id, cmd and msg each time before the call is made - putting the declaration of 
those three inside the while(doit) loop is a simple way to reset the values back to 0, blank, blank.
Note: To quickly see what, and how many, commands and messages are generated whilst in a 
macro panel, insert a print line after Wait_on_widgets(id,cmd, msg). For example:
 Wait_on_widgets(id,cmd,msg);
              Print("id= " + To_text(id) +" cmd=<" + cmd + ">" +" msg=<" + msg + ">\n");
Note: When 12D is shutting down, there is an event with cmd value "CodeShutdown" being sent 
down to the running macro, the feature is under development and incorrect use might result in 
unwanted consequences. An example of how the feature can be used 6.21 Example 16
The best way to get an understanding of the event driven process is to look at examples of working 
macros that have panels in them. For example, see Examples 11 to 15 in the examples section 6 
Examples.
For information on creating Panels and the Widgets that make up panels:
See 5.61.1 Cursor Controls
See 5.61.2 Panel Functions
See 5.61.5 Widget Controls
See 5.61.7 Widget Information Area Menu
See 5.61.3 Horizontal Group
See 5.61.4 Vertical Group
See 5.61.8 Widget Tooltip and Help Calls
See 5.61.9 Panel Page
See 5.61.10 Input Widgets
See 5.61.11 Message Boxes
See 5.61.12 Log_Box and Log_Lines
See 5.61.13 Buttons
See 5.61.14 GridCtrl_Box
See 5.61.15 Tree Box Calls
Panels and Widgets

5.61.1 Cursor Controls
Get_cursor_position(Integer &x,Integer &y)
Name
Integer Get_cursor_position(Integer &x,Integer &y)
Description
Get the cursor position (x,y).
The units of x and y are screen units (pixels).
The type of x and y must be Integer.
A function return value of zero indicates the position was returned successfully.
ID = 1329
Set_cursor_position(Integer x,Integer y)
Name
Integer Set_cursor_position(Integer x,Integer y)
Description
Set the cursor position with the coordinates (x, y).
The units of x and y are screen units (pixels).
A function return value of zero indicates the position was successfully set.
ID = 1330
Panels and Widgets
Chapter 
5.61.2 Panel Functions
Create_panel(Text title_text) 
Name
Panel Create_panel(Text title_text)
Description
Create a panel with the title title_text.
If  LB is clicked on the X on the top right corner of the panel, the text "Panel Quit" is returned as the 
cmd argument to Wait_on_widgets.
If  LB is clicked on the Windows icon on the top left hand corner of the panel, 
 See  Wait_on_widgets(Integer &id,Text &cmd,Text &msg). 
For an example of a panel with Widgets Tin_Box, Buttons, Message_Box and Horizontal and 
Vertical Groups etc, see  Panel Example:
The function return value is the created Panel.
Note: the Show_widget(Panel panel) call must be made to display the panel on the screen - see  
Panel Example:.
ID = 843
Create_panel(Text title_text, Integer sizing_enable) 
Name
Panel Create_panel(Text title_text, Integer sizing_enable)
Click LB on X to send the 
"Panel Quit" command
Click LB on the Widows icon to 
bring up the Windows panel
Click LB on X to send the 
"Panel About" command
Click LB on X to send the 
"Panel About" command
Panels and Widgets

Description
Same as the above function, this function also creates a panel with the title title_text, but with an 
extra parameter sizing_enable to control the user resizing. The resulting panel is resizable only if 
sizing_enable is not zero.
The function return value is the created Panel.
ID = 3791
Create_panel(Text title,Integer sizing_enable,Integer allow_dump) 
Name
Panel Create_panel(Text title,Integer sizing_enable,Integer allow_dump)
Description
Internal use only
Same as the above function, this function also creates a panel with the title title_text, but with extra 
parameters sizing_enable to control the user resizing, allow_dump to control the ability to create 
ddx slx or chain file, allow_dialog_defaults to allow the dialog defaults when click on the to left of 
panel. The resulting panel is resizable only if sizing_enable is not zero. The resulting panel is 
allowed dump only if allow_dump is not zero. 
The function return value is the created Panel.
ID = 7665
Create_panel(Text title,Integer sizing_enable,Integer allow_dump,Integer 
allow_dialog_defaults) 
Name
Panel Create_panel(Text title,Integer sizing_enable,Integer allow_dump,Integer allow_dialog_defaults)
Description
Internal use only, note that the containing widgets inside the panel might make the dialog default not 
working as user expected in some special cases.
Same as the above function, this function also creates a panel with the title title_text, but with extra 
parameters sizing_enable to control the user resizing, allow_dump to control the ability to create 
ddx slx or chain file, allow_dialog_defaults to allow the dialog defaults when click on the to left of 
panel. The resulting panel is resizable only if sizing_enable is not zero. The resulting panel is 
allowed dump only if allow_dump is not zero. The resulting panel is allowed dialog defaults only if 
allow_dialog_defaults is not zero.
The function return value is the created Panel.
ID = 7950
Set_panel_tooltips(Panel panel,Integer onoff)
Name
Integer Set_panel_tooltips(Panel panel,Integer onoff)
Description
Change the tooltips for Panel panel on if onoff  is 1; off otherwise.
A return value of zero indicates the tooltips status was successfully changed.
ID = 7998
Append(Widget widget,Panel panel) 
Name
Integer Append(Widget widget,Panel panel)
Panels and Widgets
Chapter 
Description
Append the Widget widget to the Panel panel.
The Panel displays the Widgets from the top in the order that the Widgets are Appended to the 
Panel. That is, the first Widget appended is at the top of the Panel. The last Widget appended is at 
the bottom of the Widget.
Rather than a Panel having just a simple structure of a number of Widgets appended to the Panel, 
Horizontal and Vertical grouping can be used to collect the Widgets together in logical fashions and 
then the Horizontal and Vertical groups are Appended to the Panel using this Append(Widget 
widget, Panel panel) call. There are even more complicated groupings allowed including Panel 
pages, Grid Controls and Trees.
See 5.61.3 Horizontal Group, 5.61.4 Vertical Group, 5.61.9 Panel Page, 5.61.14 
GridCtrl_Box,5.61.15 Tree Box Calls
 A function return value of zero indicates the widget was appended successfully.
For an example of a panel with Widgets Tin_Box, Buttons, Message_Box and Horizontal and 
Vertical Groups etc, see  Panel Example:
ID = 852
Write_SLX(Panel panel,Text filename) 
Name
Integer Write_SLX(Panel panel,Text filename) 
Description
Write screen layout file of the Panel panel to the file named filename. 
A return value of zero indicates the file was successfully written.
ID = 2903
Read_SLX(Panel panel,Text filename) 
Name
Integer Read_SLX(Panel panel,Text filename) 
Description
Apply the screen layout file named filename to the Panel panel. 
A return value of zero indicates the layout was successfully applied.
ID = 2904
Panel Example:
  Panel     panel    = Create_panel("Grid of Min/Max of Tins");
  Show_widget(panel);
Panels and Widgets

Widget of type Button
Panel title
Widget Tin_Box
Widget title
Widget of type Button
Message_Box or
Colour_Message_Box
Browse button
Widget of type
typed input area
of a Widget known
of a Widget
Named_Tick_Box
Widget of type
title of Button Widget
as the information
area of the widget
Panel title
Browse button
of a Widget
Browse button
turned off
for a widget
Widget optional
Widget disabled
Horizontal_Group of
two Buttons with
border text "Buttons"
Vertical_Group of
four Widgets with
border text "Tins"
Panels and Widgets
Chapter 
Panels and Widgets

5.61.3 Horizontal Group
A Horizontal_Group is used to collect a number of Widgets together. 
The Widgets are added to the Horizontal_Group using the Append(Widget widget,Horizontal_Group 
group) call. 
The Widgets are automatically spaced horizontally in the order that they are appended.
Horizontal_Group Create_horizontal_group(Integer mode)
Name
Horizontal_Group Create_horizontal_group(Integer mode)
Description
Create a Widget of type Horizontal_Group.
A Horizontal_Group is used to collect a number of Widgets together. The Widgets are added to the 
Horizontal_Group using the Append(Widget widget,Horizontal_Group group) call. The Widgets are 
automatically spaced horizontally in the order that they are appended.
mode has the values (defined in set_ups.h) 
// modes for Horizontal_Group (note -1 is also allowed)
For BALANCE_WIDGETS_OVER_WIDTH    = 1
the widgets in the horizontal group are all given the same width and are evenly spaced 
horizontally. So the widgets all have the size of what the largest widget needed.
For ALL_WIDGETS_OWN_WIDTH    = 2
the widgets in the horizontal group are all their own size all.
For COMPRESS_WIDGETS_OVER_WIDTH  = 4
.
The function return value is the created Horizontal_Group.
ID = 845
Horizontal_Group Create_button_group()
Name
Horizontal_Group Create_button_group()
Description
Create a Widget of type Horizontal_Group to hold Widgets of type Button.
A Horizontal_Group is used to collect a number of Widgets together. The Widgets are added to the 
Horizontal_Group using the Append(Widget widget,Horizontal_Group group) call. The Widgets are 
automatically spaced horizontally in the order that they are appended.
The Create_button_group goes a bit further than Create_horizontal_group in making the button 
spacing more even.
The function return value is the created Horizontal_Group.
ID = 846
Append(Widget widget,Horizontal_Group group)
Name
Panels and Widgets
Chapter 
Integer Append(Widget widget,Horizontal_Group group)
Description
Append the Widget widget to the Horizontal_Group group.
A Horizontal_Group is used to collect a number of Widgets together and the Widgets are added to 
the Horizontal_Group using this call. The Widgets are automatically spaced horizontally in the order 
that they are appended.
A function return value of zero indicates the Widget was appended successfully.
ID = 853
Set_border(Horizontal_Group group,Text text)
Name
Integer Set_border(Horizontal_Group group,Text text)
Description
Set a border for the Horizontal_Group group with Text text.on the top left side of the border. 
If text is blank, the border is removed.
A function return value of zero indicates the border was successfully set.
ID = 1098
Set_border(Horizontal_Group group,Integer bx,Integer by)
Name
Integer Set_border(Horizontal_Group group,Integer bx,Integer by)
Description
Set a gap around the border of the Horizontal_Group group.
bx sets the left and right side gap around the border.
by sets the top and bottom side gap around of the border.
The units of bx and by are screen units (pixels).
A function return value of zero indicates the border gap was successfully set.
Horizontal_Group of two Buttons
with no border
Horizontal_Group of two Buttons
with border and text "Buttons"
Panels and Widgets

ID = 858
Set_gap(Horizontal_Group group,Integer gap) 
Name
Integer Set_gap(Horizontal_Group group,Integer gap) 
Description
Set a horizontal gap of at least gap screen units (pixels) between the Widgets of the 
Horizontal_Group group.
A function return value of zero indicates the vertical gap was successfully set.
ID = 1506
Set_radio(Horizontal_Group group,Named_Tick_Box tick,Integer left_hand_side)
Name
Integer Set_radio(Horizontal_Group group,Named_Tick_Box tick,Integer left_hand_side) 
Description
Under development, not yet ready
ID = 7704
Set_button(Horizontal_Group group,Named_Tick_Box tick,Integer left_hand_side)
Name
Integer Set_button(Horizontal_Group group,Named_Tick_Box tick,Integer left_hand_side) 
Description
Under development, not yet ready
ID = 7706
Horizontal_Group of two Buttons
with default border gaps
and text "Buttons"
Horizontal_Group of two Buttons
with border gaps bx =10 and by = 20
and text "Buttons"
Panels and Widgets
Chapter 
5.61.4 Vertical Group
A Vertical_Group is used to collect a number of Widgets together. 
The Widgets are added to the Vertical_Group using the Append(Widget widget,Vertical_Group group) 
call. 
All the Widgets appended to the Vertical_Group are given the same width. The Widgets are 
automatically spaced vertically in the order that they are appended to the Vertical_Group.
Vertical_Group Create_vertical_group(Integer mode)
Name
Vertical_Group Create_vertical_group(Integer mode)
Description
Create a widget of type Vertical_Group. 
A Vertical_Group is used to collect a number of Widgets together. The Widgets are added to the 
Vertical_Group using the Append(Widget widget,Vertical_Group group) call. All the Widgets appended 
to the Vertical_Group are given the same width. The Widgets are automatically spaced vertically in 
the order that they are appended to the Vertical_Group.
mode has the values (defined in set_ups.h) 
// modes for Vertical_Group (note -1 is also allowed)
For BALANCE_WIDGETS_OVER_HEIGHT    = 1
the widgets in the vertical group are evenly spaced vertically.
For ALL_WIDGETS_OWN_HEIGHT    = 2
For ALL_WIDGETS_OWN_LENGTH   = 4
The function return value is the created Vertical_Group.
ID = 844
Append(Widget widget,Vertical_Group group)
Name
Integer Append(Widget widget,Vertical_Group group)
Description
Append the Widget widget to the Vertical_Group group.
A function return value of zero indicates the widget was appended successfully.
ID = 854
Set_border(Vertical_Group group,Text text)
Name
Integer Set_border(Vertical_Group group,Text text)
Description
Set a border of the Vertical_Group group with Text text.on the top left side of the border. If text is 
Panels and Widgets

blank, the border is removed.
A function return value of zero indicates the border was successfully set.
ID = 1099
Set_border(Vertical_Group group,Integer bx,Integer by)
Name
Integer Set_border(Vertical_Group group,Integer bx,Integer by)
Description
Set a gap around the border of the Vertical_Group group.
bx sets the left and right side gap around the border.
by sets the top and bottom side gap around of the border.
The units of bx and by are screen units (pixels).
A function return value of zero indicates the border gap was successfully set.
The tins are a Vertical_Group of
The same Vertical_Group of 4 Widgets
with border and text "Tins"
4 Widgets with no border
Note that for the left and right gaps that
the width of the panel doesn’t change
but the gap from the sides of the panel
to the box is increased
Panels and Widgets
Chapter 
ID = 859
Set_gap(Vertical_Group group,Integer gap) 
Name
Integer Set_gap(Vertical_Group group,Integer gap) 
Description
Set a vertical gap of at least gap screen units (pixels) between the Widgets of the Vertical_Group 
group.
A function return value of zero indicates the vertical gap was successfully set.
ID = 1507
Get_sizing_constraints(Widget widget,Integer &horizontal_mode,Integer 
&vertical_mode) 
Name
Integer Get_sizing_constraints(Widget widget,Integer &horizontal_mode,Integer &vertical_mode) 
Description
Get the horizontal_mode and vertical_mode of the sizing constraints for given Widget widget.
Meaning of the sizing constraint modes
0 Sizing_Balance_Resize balance the widgets over the available space (and set them to be the 
same size) 
  1 Sizing_Balance_No_Resize balance the widgets over the available space (and keep them their 
original size)
  2 Sizing_Fill fill the widgets to entirely fill the available space
  3 Sizing_Fill_No_Resize size to fill the available space, but don't resize after that
  4 Sizing_Original keep the widgets in their original size and location
Vertical_Group of 4 Widgets
with default border gaps
and text "Tins"
Vertical_Group of 4 Widgets
with border gaps bx =10 and by = 20
and text "Tins"
Note that for the left and right gaps that
the width of the panel doesn’t change
but the gap from the sides of the panel
to the box is increased
Panels and Widgets

  5 Sizing_Default do whatever the container wants to do
A function return value of zero indicates the sizing constraints was successfully returned.
ID = 3822
Set_sizing_constraints(Widget widget,Integer horizontal_mode,Integer 
vertical_mode) 
Name
Integer Set_sizing_constraints(Widget widget,Integer horizontal_mode,Integer vertical_mode) 
Description
Set the horizontal_mode and vertical_mode of the sizing constraints for given Widget widget.
Meaning of the sizing constraint modes
0 Sizing_Balance_Resize balance the widgets over the available space (and set them to be the 
same size) 
  1 Sizing_Balance_No_Resize balance the widgets over the available space (and keep them their 
original size)
  2 Sizing_Fill fill the widgets to entirely fill the available space
  3 Sizing_Fill_No_Resize size to fill the available space, but don't resize after that
  4 Sizing_Original keep the widgets in their original size and location
  5 Sizing_Default do whatever the container wants to do
A function return value of zero indicates the sizing constraints was successfully set.
ID = 3823
Set_radio(Vertical_Group group,Named_Tick_Box tick,Integer left_hand_side)
Name
Integer Set_radio(Vertical_Group group,Named_Tick_Box tick,Integer left_hand_side) 
Description
Under development, not yet ready
ID = 7705
Set_button(Vertical_Group group,Named_Tick_Box tick,Integer left_hand_side)
Name
Integer Set_button(Vertical_Group group,Named_Tick_Box tick,Integer left_hand_side) 
Description
Under development, not yet ready
ID = 7707
Panels and Widgets
Chapter 
5.61.5 Widget Controls
Wait_on_widgets(Integer &id,Text &cmd,Text &msg)
Name
Integer Wait_on_widgets(Integer &id,Text &cmd,Text &msg)
Description
When the user activates a Widget displayed on the screen (for example by clicking on a Button 
Widget), the id, cmd and msg from the widget is passed back to Wait_on_widgets.
id is the id of the Widget that has been activated.
cmd is the command text that is returned from the Widget.
msg is the message text that is returned from the Widget.
A function return value of zero indicates the data was successfully returned.
Note: there might be unknown events might be passed to Wait_on_widgets, the return value will still 
be zero in those case, but id, cmd and msg will remain unchanged.
Note: for a Button, the returned cmd is the Text reply given when the Button was created. See  
Create_button(Text title_text,Text reply).
ID = 857
Wait_on_events(Integer64 &id,Text &cmd,Text &msg)
Name
Integer Wait_on_events(Integer64 &id,Text &cmd,Text &msg)
Description
When the user activates a Widget displayed on the screen (for example by clicking on a Button 
Widget), the id, cmd and msg from the widget is passed back to Wait_on_widgets.
id is the id of the Widget that has been activated.
cmd is the command text that is returned from the Widget.
msg is the message text that is returned from the Widget.
A function return value of zero indicates the data was successfully returned.
Note: there might be unknown events might be passed to Wait_on_events, the return value will still 
be zero in those case, but id, cmd and msg will remain unchanged.
Note: for a Button, the returned cmd is the Text reply given when the Button was created. See  
Create_button(Text title_text,Text reply).
ID = 5422
Get_id64(Widget widget)
Name
Integer64 Get_id64(Widget widget)
Description
Return the ID of a given Widget widget as a 64bit Integer.
ID = 5423
Panels and Widgets

Use_browse_button(Widget widget,Integer mode)
Name
Integer Use_browse_button(Widget widget,Integer mode)
Description
Set whether the browse button is available for Widget widget. 
If mode = 1 use the browse button
if mode = 0   don’t use the browse button.
The default value for a Widget is mode = 1.
If the browse button is not used, the space where the button would be, is removed.
Note: This call must be made before the Panel that contains the widget is shown. 
A function return value of zero indicates the value was valid.
ID = 1095
Show_browse_button(Widget widget,Integer mode)
Name
Integer Show_browse_button(Widget widget,Integer mode)
Description
This calls you to show or hide the browse button for the Widget widget.
If mode = 1 show the browse button
if mode = 0   don’t show the browse button.
The default value for a Widget is mode = 1.
This call can be made after the Widget has been added to a panel and allows the Browse button of 
the Widget to be turned on and off under the programmers control.
Note if Use_browse_button was called with a mode of 0 then this call is ineffective. See  
Use_browse_button(Widget widget,Integer mode)
A function return value of zero indicates the mode was successfully set.
ID = 1096
Use_browse_button mode = 1
Use_browse_button mode = 0
Browse button of a Widget
Show_browse_button mode = 1
Show_browse_button mode = 0
Browse Button of
the Tin_Box Widget
Panels and Widgets
Chapter 
Set_enable(Widget widget,Integer mode)
Name
Integer Set_enable(Widget widget,Integer mode)
Description
Set the enabled mode for the Widget widget. 
If mode = 1 the Widget is to be enabled
      mode = 0     the Widget is not to be enabled.
The default value for a Widget is mode = 1.
Note If the widget is not enabled, it will be greyed out in the standard Windows fashion and no 
interaction with the Widget is possible.
A function return value of zero indicates the mode was successfully set.
ID = 1101
Get_enable(Widget widget,Integer &mode)
Name
Integer Get_enable(Widget widget,Integer &mode)
Description
Check if the Widget widget is enabled or disabled. See  Set_enable(Widget widget,Integer mode)
Return the Integer mode where 
 mode = 1 if the Widget is enabled
    mode = 0   if the Widget is not enabled.
A function return value of zero indicates the mode was returned successfully.
ID = 1100
Set_optional(Widget widget,Integer mode)
Name
Integer Set_optional(Widget widget,Integer mode)
Description
Set the optional mode for the Widget widget. 
That is, if the Widget field is blank, the title text to the left is greyed out, signifying that this Widget is 
optional. 
If mode = 1 the widget is optional
      mode = 0     the widget is not optional.
The default value for a Widget is mode = 0.
Set_enable mode = 1
Set_enable mode = 0
All parts of the disabled Widget are greyed out
Panels and Widgets

If this mode is used (i.e. 1), the widget must be able to accept a blank response for the field, or 
assume a reasonable value.
A function return value of zero indicates the mode was successfully set.
Note: not all Widgets can be set to be optional. 
For example Choice_Box, Named_Tick_Box, Source_Box,
ID = 1324
Get_optional(Widget widget,Integer &mode)
Name
Integer Get_optional(Widget widget,Integer &mode)
Description
Check if the Widget widget is optional. That is, the Widget does not have to be answered.See  
Set_optional(Widget widget,Integer mode)
Return the Integer mode where 
 mode = 1 if the Widget is optional
    mode = 0   if the Widget is not optional.
A function return value of zero indicates the mode was returned successfully.
ID = 1325
Set_visible(Widget widget,Integer mode) 
Name
Integer Set_visible(Widget widget,Integer mode) 
Description
Set the visible mode for the Widget widget. 
If mode = 1 the widget is visible, and not displayed on the panel
      mode = 0     the widget is not visible and not displayed.
Even if the widget is invisible, it still takes the same space on a panel.
The default value for a Widget is visible. That is, mode = 1.
A function return value of zero indicates the visibility was successfully set.
Set_optional mode = 0
Set_optional mode = 1
Widget title
greyed out
Panels and Widgets
Chapter 
ID = 1614
Get_visible(Widget widget,Integer &mode)
Name
Integer Get_visible(Widget widget,Integer &mode) 
Description
Get the visibility mode for the Widget widget. 
Return the Integer mode where 
 mode = 1 if the Widget is visible
    mode = 0   if the Widget is not visible.
A function return value of zero indicates the visibility was returned successfully.
 ID = 1615
Set_name(Widget widget,Text text)
Name
Integer Set_name(Widget widget,Text text)
Description
Set the title text of the Widget widget.
A Widget is usually given a title when it is first created This call can be made after the Widget has 
been added to a panel and allows the title of the Widget to be changed under the programmers 
control.
A function return value of zero indicates the title was successfully set.
ID = 1326
Get_name(Widget widget,Text &text)
Name
Integer Get_name(Widget widget,Text &text)
Description
Get the title text from the Widget widget.
Set_visible mode = 1
Widget is visible
Set_visible mode = 0
Widget is invisible
the Widget is even though
it is invisible
Space is still left where
Panels and Widgets

A function return value of zero indicates the text was returned successfully.
ID = 1327
Set_dump_name(Widget widget,Text text) 
Name
Integer Set_dump_name(Widget widget,Text text) 
Description
Set the dump name of the Widget widget to Text text. 
A return value of zero indicates the function call was successful.
ID = 2905
Get_dump_name(Widget widget,Text &text) 
Name
Integer Get_dump_name(Widget widget,Text &text) 
Description
Get the dump name of the Widget widget to set to Text text. 
A return value of zero indicates the function call was successful.
ID = 2906
Get_dump_name(Widget widget,Text &text,Integer effective) 
Name
Integer Get_dump_name(Widget widget,Text &text,Integer effective) 
Description
Get the dump name of the Widget widget to set to Text text. 
If effective is not zero, the name is "effective". 
A return value of zero indicates the function call was successful.
ID = 2907
???
Set_error_message(Widget widget,Text text)
Name
Integer Set_error_message(Widget widget,Text text)
Description
This call is used to set the error message for a Widget if it is validated and there is an error.
LJG ?
When there is an error, text is sent to the associated Message_Box of the widget, the focus is set to 
the widget and the cursor is moved to the widget. 
A function return value of zero indicates the text was successfully set.
ID = 1437
Panels and Widgets
Chapter 
Set_width_in_chars(Widget widget,Integer num_char)
Name
Integer Set_width_in_chars(Widget widget,Integer num_char)
Description
Set the Widget widget to be num_char characters wide.
A function return value of zero indicates the width was set successful.
ID = 1042
Show_widget(Widget widget)
Name
Integer Show_widget(Widget widget)
Description
Show the Widget widget at the cursor’s current position.
Note: The call Show_widget(Widget widget,Integer x,Integer y) allows you to give the screen 
coordinates to position the Widget. See  Show_widget(Widget widget,Integer x,Integer y). 
A function return value of zero indicates the widget was shown successfully.
ID = 855
Show_widget(Widget widget,Integer x,Integer y)
Name
Integer Show_widget(Widget widget,Integer x,Integer y)
Description
Show the Widget widget at the screen coordinates x, y. The units for x and y are pixels.
A function return value of zero indicates the widget was shown successfully.
ID = 1039
Hide_widget(Widget widget)
Name
Integer Hide_widget(Widget widget)
Description
Hide the Widget widget. That is, don’t display the Widget on the screen.
Note the Widget still exists but it is not visible on the screen. The Widget will appear again by calling 
Show_widget. See  Show_widget(Widget widget). 
A function return value of zero indicates the widget was hidden successfully.
ID = 856
Set_size(Widget widget,Integer x,Integer y)
Name
Integer Set_size(Widget widget,Integer x,Integer y)
Description
Panels and Widgets

Set the size in screen units (pixels) of the Widget widget with the width x and height y.
The type of x and y must be Integer.
A function return value of zero indicates the size was successfully set.
ID = 1365
Get_size(Widget widget,Integer &x,Integer &y)
Name
Integer Get_size(Widget widget,Integer &x,Integer &y)
Description
Get the size in screen units (pixels) of the Widget widget in x and y.
The type of x and y must be Integer.
A function return value of zero indicates the size was returned successfully.
ID = 1331
Get_widget_size(Widget widget,Integer &w,Integer &h)
Name
Integer Get_widget_size(Widget widget,Integer &w,Integer &h)
Description
Get the size of the Widget widget in screen units (pixels)
The width of widget is returned in w and the height of widget is returned in h.
A function return value of zero indicates the size was successfully returned.
ID = 1041
Set_cursor_position(Widget widget)
Name
Integer Set_cursor_position(Widget widget)
Description
Move the cursor position to the Widget widget.
A function return value of zero indicates the position was successfully set.
ID = 1059
Get_widget_position(Widget widget,Integer &x,Integer &y)
Name
Integer Get_widget_position(Widget widget,Integer &x,Integer &y)
Description
Get the screen position of the Widget widget.
The position of the widget is returned in x, y. The units of x and y are screen units (pixels).
A function return value of zero indicates the position was successfully returned.
ID = 1040
Panels and Widgets
Chapter 
Get_position(Widget widget,Integer &x,Integer &y) 
Name
Integer Get_position(Widget widget,Integer &x,Integer &y) 
Description
Get the screen position of the Widget widget.
The position of the widget is returned in x, y. The units of x and y are screen units (pixels).
A function return value of zero indicates the position was successfully returned.
ID = 1366
Get_id(Widget widget)
Name
Integer Get_id(Widget widget)
Description
When a Widget is created, it is given a unique identifying number (id) in the project.
This function get the id of the Widget widget and returns id as the function return value.
That is, the Integer function return value is the Widget id.
D = 879
Set_focus(Widget widget)
Name
Integer Set_focus(Widget widget)
Description
Set the focus to the typed input area for an Input Widget widget, or on the button for a Button 
Widget widget. 
After this call all typed input will go to this widget.
A function return value of zero indicates the focus was successfully set.
ID = 1097
Panels and Widgets

5.61.6 General Widget Commands and Messages
accept select
message: view_name
cancel select
message: blank
cut
message: blank
kill_focus
message: blank
keystroke
message: character typed in
left_button_up
message: blank
middle_button_up
message: blank
motion select
message: x y z a b view_name
This is returned whenever the cursor is over the exposed area of a 12d Model View. 
Panel Quit
message: blank
paste
message: information to be pasted
pick select
message: view_name
right_button_up
message: blank
set_focus
message: blank
start select
message: blank
text selected
message: text typed in
Panels and Widgets
Chapter 
5.61.7 Widget Information Area Menu 
Clicking  RB in the information area of most Widgets brings up the menu:
Picking Cut from the menu cuts the highlighted characters, and sends a "cut" command and nothing 
in message via Wait_on_widgets.
Picking Copy from the menu copies the highlighted characters into the paste buffer, and sends a 
"copy" command and the copied text in message via Wait_on_widgets.
Picking Paste from the menu pastes the paste buffer into the information area, and sends a "paste" 
command and the paste buffer in message via Wait_on_widgets.
Panels and Widgets

5.61.8 Widget Tooltip and Help Calls
Set_tooltip(Widget widget,Text tip)
Name
 Integer Set_tooltip(Widget widget,Text tip)
Description
Sets the tool tip message for the Widget widget to tip. 
When the user hovers over widget, this message tip will be displayed as a Windows tooltip.
A function return value of zero indicates the tooltip was successfully set.
ID = 1363
Get_tooltip(Widget widget,Text &tip)
Name
Integer Get_tooltip(Widget widget,Text &tip)
Description
Queries the current tool tip message and returns the message in tip.
A function return value of zero indicates the tooltip was successfully returned.
ID = 1364
Set_help(Widget widget,Integer help_num)
Name
Integer Set_help(Widget widget,Integer help_num)
Description
For the Widget widget, the help number for widget is set to help_num.
This is currently not used.
A function return value of zero indicates the help number was successfully set.
Note: See 5.61.13.4 Help Button for creating a Help button that allows the macro to access the 
12d Model Extra Help system.
ID = 1312
Get_help(Widget widget,Integer &help_num)
Name
Integer Get_help(Widget widget,Integer &help_num)
Description
Get the help number for Widget widget and return it in help_num.
Tooltip shown as cursor
goes over the Widget
Panels and Widgets
Chapter 
The type of help must be integer.
A function return value of zero indicates the help number was successfully returned.
Note: See 5.61.13.4 Help Button for creating a Help button that allows the macro to access the 
12d Model Extra Help system.
ID = 1313
Set_help(Widget widget,Text help_message)
Name
 Integer Set_help(Widget widget,Text help_message)
Description
For the Widget widget, the help message for widget is set to help_message.
This help message will be sent back to 12d Model via Wait_on_widgets(Integer &id,Text &cmd,Text 
&msg) with command cmd equal to “Help”, and msg equal to help_message.
So a sample bit of code to handle help is
Wait_on_widgets(id,cmd,msg);
if (cmd == “Help”) {;
 Winhelp(panel,"12d.hlp",'a',msg); // in the Winhelp file 12d.hlp,
                                                                  // find and display the a table entry msg
    continue;
}
 A function return value of zero indicates the text was successfully set.
ID = 1314
Get_help(Widget widget,Text &help_message)
Name
Integer Get_help(Widget widget,Text &help_message)
Description
Queries the current help message for a widget and returns the message in help_mesage.
A function return value of zero indicates the message was successfully returned.
ID = 1315
Winhelp(Widget widget,Text help_file,Text key)
Name
Integer Winhelp(Widget widget,Text help_file,Text key)
Description
Calls the Windows help system to display the key from the k table of the Windows help file 
help_file. The Windows help file help_file must exist and be in a location that can be found.
A function return value of zero indicates the function was successful.
ID = 1316
Panels and Widgets

Winhelp(Widget widget,Text help_file,Integer table,Text key)
Name
Integer Winhelp(Widget widget,Text help_file,Integer table,Text key)
Description
Calls the Windows help system to display the key from the named table of the help file help_file. 
table takes the form ‘a’, ‘k’ etc. The Windows help file help_file must exist and be in a location that 
can be found.
A function return value of zero indicates the function was successful.
ID = 1317
Winhelp(Widget widget,Text help_file,Integer help_id)
Name
Integer Winhelp(Widget widget,Text help_file,Integer help_id)
Description
Calls the Windows help system to display the key from the k table of the help file help_file. The 
Windows help file help_file must exist and be in a location that can be found.
A function return value of zero indicates the function was successful.
ID = 1318
Winhelp(Widget widget,Text help_file,Integer help_id,Integer popup)
Name
Integer Winhelp(Widget widget,Text help_file,Integer helpid,Integer popup)
Description
Calls the Windows help system to display the help with help number help_id from the k table of the 
help file help_file. The Windows help file help_file must exist and be in a location that can be found. 
If popup is not zero then the help information appears as a popup style help;  If popup is zero then 
the help information appears as a normal help.
A function return value of zero indicates the function was successful.
ID = 1319
Panels and Widgets
Chapter 
5.61.9 Panel Page
Widget_Pages Create_widget_pages()
Name
Widget_Pages Create_widget_pages()
Description
A Widget_Pages object allows a number of controls to exist in the same physical location on a 
dialog. This is very handy if you want a field to change between a Model_Box, View_Box or the like. 
A bit of sample code might look like,
 Vertical_Group vgroup1 = Create_vertical_group(0);
 Model_Box mbox = Create_model_box(…);
                Append(mbox,vgroup1);
 Vertical_Group vgroup2 = Create_vertical_group(0);
 View_Box vbox = Create_view_box(…);
 Append(vbox,vgroup2);
 Widget_Pages pages = Create_widget_pages();
 Append(vgroup1,pages);
 Append(vgroup2,pages);
                Set_page(page,1)                    // this shows the 1st page - vgroup1
The function return value is the created Widget_pages.
ID = 1243
Append(Widget widget,Widget_Pages pages)
Name
Integer Append(Widget widget,Widget_Pages pages)
Description
Append Widget widget into the Widget_Pages pages. 
For each item appended, another page is created. 
If you want more than 1 item on a page, add each item to a Horizontal_Group, Vertical_Group.
A function return value of zero indicates the widget was appended successfully.
ID = 1244
Set_page(Widget_Pages pages,Integer n)
Name
Integer Set_page(Widget_Pages pages,Integer n)
Description
Show (display on the screen) the n’th page of the Widget_Pages pages. 
Note the "n’th page" is the n’th widget appended to the Widget_Pages pages.
All the controls associated with the n’th page_no are shown.
A function return value of zero indicates the page was successfully set.
Panels and Widgets

ID = 1245
Set_page(Widget_Pages pages,Widget widget) 
Name
Integer Set_page(Widget_Pages pages,Widget widget) 
Description
Show (display on the screen) the page of pages containing the Widget widget.
All the controls associated with the widget are shown.
A function return value of zero indicates the page was successfully set.
ID = 1606
Get_page(Widget_Pages pages,Widget widget,Integer &page_no) 
Name
Integer Get_page(Widget_Pages pages,Widget widget,Integer &page_no) 
Description
For the Widget_Pages pages, get the page number of the page containing the Widget widget.
Note the "n’th page" of a Widget_Pages is the n’th widget appended to the Widget_Pages.
The page n umber is returned as page_no.
A function return value of zero indicates the page number was successfully returned.
ID = 1607
Set_dynamic_sizing(Widget_Pages pages,Integer enable)
Name
Integer Set_dynamic_sizing(Widget_Pages pages,Integer enable) 
Description
Set dynamic sizing ability for Widget page pages by Integer enable (1 - yes, 0 - no).
A function return value of zero indicates the page was successfully set.
ID = 3963
Get_dynamic_sizing(Widget_Pages pages,Integer &enable)
Name
Integer Get_dynamic_sizing(Widget_Pages pages,Integer &enable) 
Description
For the Widget_Pages pages, check the dynamic sizing ability and return it in Integer enable (1 - 
yes, 0 - no).
A function return value of zero indicates the page property was successfully returned.
ID = 3964
Panels and Widgets
Chapter 
5.61.10 Input Widgets
See 5.61.10.1 Angle_Box
See 5.61.10.2 Attributes_Box
See 5.61.10.43 Texture_Box
See 5.61.10.4 Bitmap_Fill_Box
See 5.61.10.5 Chainage_Box
See 5.61.10.6 Choice_Box
See 5.61.10.8 Colour_Box
See 5.61.10.9 Date_Time_Box
See 5.61.10.10 Directory_Box
See 5.61.10.11 Draw_Box
See 5.61.10.12 File_Box
See 5.61.10.13 Function_Box
See 5.61.10.14 HyperLink_Box
See 5.61.10.15 Input_Box
See 5.61.10.16 Integer_Box
See 5.61.10.17 Justify_Box
See 5.61.10.18 Linestyle_Box
See 5.61.10.19 List_Box
See 5.61.10.20 Map_File_Box
See 5.61.10.21 Model_Box
See 5.61.10.22 Name_Box
See 5.61.10.23 Named_Tick_Box
See 5.61.10.24 New_Select_Box
See 5.61.10.25 New_XYZ_Box
See 5.61.10.26 Plotter_Box
See 5.61.10.27 Polygon_Box
See 5.61.10.28 Real_Box
See 5.61.10.29 Report_Box
See 5.61.10.30 Screen_Text
See 5.61.10.31 Select_Box
See 5.61.10.32 Select_Boxes
See 5.61.10.33 Sheet_Size_Box
See 5.61.10.34 Slider_Box
See 5.61.10.35 Source_Box
See 5.61.10.36 Symbol_Box
See 5.61.10.37 Target_Box
See 5.61.10.38 Template_Box
See 5.61.10.39 Text_Style_Box
See 5.61.10.40 Text_Units_Box
See 5.61.10.41 Textstyle_Data_Box
See 5.61.10.42 Text_Edit_Box
See 5.61.10.43 Texture_Box
See 5.61.10.44 Tick_Box
See 5.61.10.45 Tin_Box
See 5.61.10.46 View_Box
See 5.61.10.48 XYZ_Box
Panels and Widgets

5.61.10.1 Angle_Box
The Angle_Box is a panel field designed to take angle data and display it in degrees, minutes and 
seconds. If data is typed into the box, then it will be validated when <enter> is pressed.
An Angle_Box is a made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in an angle or to display the angle if it is selected by the angle select 
button. This information area is in the middle
and
(c)
an Angle select button on the right.
An angle can be typed into the information area in hp notation (ddd.mmss). Hitting the <enter> key 
will validate the angle and then display it in degree, minutes and seconds in the information area.
Clicking  LB or  RB on the Angle select button brings up the Measure pop-up menu in Angle mode. 
Selecting an option from the Measure menu and making a measure displays the angle in the 
information area.
Clicking  MB on the Angle select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "real 
selected" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Angle_Box
title area
information area
angle being typed in hp notation
Angle select button
angle displayed in degrees, minutes and seconds
after hitting <enter
Panels and Widgets
Chapter 
Picking a value with the Angle Select button sends a "real_selected" command.
Create_angle_box(Text title_text,Message_Box message)
Name
Angle_Box Create_angle_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Angle_Box for inputting and validating angles. See 5.61.10.1 
Angle_Box.
An angle is typed into the Angle_Box in hp notation (i.e. ddd.mmssss) but after it is validated it is 
displayed in degrees, minutes and seconds. However the validated angle is stored in the Angle_Box 
as a Real in radians.
The Angle_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Angle_Box validation messages.
The function return value is the created Angle_Box. 
ID = 886
Set_data(Angle_Box box,Real angle)
Name
Integer Set_data(Angle_Box box,Real angle)
Description
Set the data for the Angle_Box box to the Real value angle.
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
A function return value of zero indicates the data was successfully set.
ID = 888
Set_data(Angle_Box box,Text text_data) 
Name
Integer Set_data(Angle_Box box,Text text_data) 
Description
Set the text displayed in the Angle_Box box to the Text text_data.
Note that text_data should be in degrees, minutes and seconds using the hp notation (i.e. 
ddd.mmssss) BUT the text_data can be any text at all and may not even be a valid angle (in 
degrees in hp notation). This may lead to an error when the Angle_Box is validated.
A function return value of zero indicates the data was successfully set, even if the text_data will not 
validate.
ID = 1515
Get_data(Angle_Box box,Text &text_data)
Name
Integer Get_data(Angle_Box box,Text &text_data)
Panels and Widgets

Get the actual text displayed in the Angle_Box box and return it in text_data.
Note that this is just the text in the Angle_Box. It may be any text at all and may not even be a valid 
angle (in degrees in hp notation). To get the validated data from the Angle_box, use Validate. See  
Validate(Angle_Box box,Real &angle). 
A function return value of zero indicates the data was successfully returned.
ID = 889
Validate(Angle_Box box,Real &angle)
Name
Integer Validate(Angle_Box box,Real &angle)
Description
Validate the contents of the Angle_Box box and return the angle in radians angle. 
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
The function returns the value of:
     NO_NAME if the Widget Angle_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 887
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.2 Attributes_Box
Attributes_Box Create_attributes_box(Text title_text,Message_Box message) 
Name
Attributes_Box Create_attributes_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Attributes_Box. See 5.61.10.2 Attributes_Box.
The Attributes_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Attribute_Box validation messages.
The function return value is the created Attributes_Box.
ID = 2210
Set_data(Attributes_Box box,Attributes &data) 
Name
Integer Set_data(Attributes_Box box,Attributes &data) 
Description
Set the data of type Attributes for the Attributes_Box box to data.
A function return value of zero indicates the data was successfully set.
ID = 2213
Set_data(Attributes_Box box,Text text_data) 
Name
Integer Set_data(Attributes_Box box,Text text_data) 
Description
Set the data of type Text for the Attributes_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 2214
Get_data(Attributes_Box box,Text &text_data) 
Name
Integer Get_data(Attributes_Box box,Text &text_data) 
Description
Get the data of type Text from the Attributes_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 2212
Validate(Attributes_Box box,Attributes &result)
Name
Integer Validate(Attributes_Box box,Attributes &result) 
Panels and Widgets

Description
Validate the contents of Attributes_Box box and return the Attributes in result. 
The function returns the value of:
     NO_NAME if the Widget Attributes_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2211
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.3 Billboard_Box
Billboard_Box Create_billboard_box(Text title_text,Message_Box message) 
Name
Billboard_Box Create_billboard_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Billboard_Box. See 5.61.10.3 Billboard_Box.
The Billboard_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Billboard_Box validation messages.
The function return value is the created Billboard_Box.
ID = 1871
Set_data(Billboard_Box box,Text text_data) 
Name
Integer Set_data(Billboard_Box box,Text text_data) 
Description
Set the data of type Text for the Billboard_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1873
Get_data(Billboard_Box box,Text &text_data) 
Name
Integer Get_data(Billboard_Box box,Text &text_data) 
Description
Get the data of type Text from the Billboard_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1874
Validate(Billboard_Box box,Text &result) 
Name
Integer Validate(Billboard_Box box,Text &result) 
Description
Validate the contents of Billboard_Box box and return the name of the billboard in Text result. 
The function returns the value of:
     NO_NAME if the Widget Billboard_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Panels and Widgets

Warning this is the opposite of most 12dPL function return values
ID = 1872
Get_billboard_size(Text name,Real &w,Real &h) 
Name
Integer Get_billboard_size(Text name,Real &w,Real &h) 
Description
Get world size from billboards.4d file with width w and height h.
A function return value of zero indicates the size was successfully returned.
ID = 1932
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.4 Bitmap_Fill_Box
Create_bitmap_fill_box(Text title_text,Message_Box message) 
Name
Bitmap_Fill_Box Create_bitmap_fill_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Bitmap_Fill_Box. See 5.61.10.4 Bitmap_Fill_Box.
The Bitmap_Fill_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Bitmap_Fill_Box validation messages.
The function return value is the created Bitmap_Fill_Box.
ID = 1879
Validate(Bitmap_Fill_Box box,Text &result) 
Name
Integer Validate(Bitmap_Fill_Box box,Text &result) 
Description
Validate the contents of Bitmap_Fill_Box box and return the name of the bitmap in Text result. 
The function returns the value of:
     NO_NAME if the Widget Bitmap_Fill_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1880
Set_data(Bitmap_Fill_Box box,Text text_data) 
Name
Integer Set_data(Bitmap_Fill_Box box,Text text_data) 
Description
Set the data of type Text for the Bitmap_Fill_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1881
Get_data(Bitmap_Fill_Box box,Text &text_data) 
Name
Integer Get_data(Bitmap_Fill_Box box,Text &text_data) 
Description
Get the data of type Text from the Bitmap_Fill_Box box and return it in text_data.
Panels and Widgets

A function return value of zero indicates the data was successfully returned.
ID = 1882
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.5 Chainage_Box
The Chainage_Box is a panel field designed to enter chainages which normally just have to be 
Real numbers. If data is typed into the box, then it will be validated when <enter> is pressed.
The Chainage_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area in the middle where the chainage is displayed
and
(c)
a Chainage select button on the right.
A chainage can be typed into the information area. Then hitting the <enter> key will validate the 
chainage.
 MB clicked in the information area starts a "Same As" selection. A string is then selected but at the 
moment, nothing else is done with it.
Clicking  LB on the chainage select button starts a Measure chainage selection in the String from 
point mode. A string is then selected, and as the cursor is moved around the perpendicular drop to 
the selected string is displayed.
And when a final position selected, the chainage of that position dropped onto the selected string is 
then displayed in the information box.
Clicking  RB on the chainage select button brings up the Measure Chainage pop-up with only the 
String from point choice available.
.
After selecting String from point, the action is the same as for  LB described above.
Clicking  MB on the Chainage select button does nothing.
Chainage_Box
title area
information area
chainage displayed - either typed
or after a string chainage is selected
Chainage select button
Panels and Widgets

Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "real 
selected" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a value with the Chainage Select button sends a "real_selected" command.
Chainage_Box Create_chainage_box(Text title_text,Message_Box message) 
Name
Chainage_Box Create_chainage_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Chainage_Box. See 5.61.10.5 Chainage_Box.
The Chainage_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Chainage_Box validation messages.
The function return value is the created Chainage_Box.
ID = 2203
Validate(Chainage_Box box,Real &result)
Name
Integer Validate(Chainage_Box box,Real &result) 
Description
Validate the contents of Chainage_Box box and return the chainage in Real result. 
The function returns the value of:
     NO_NAME if the Widget Chainage_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2204
Get_data(Chainage_Box box,Text &text_data) 
Name
Integer Get_data(Chainage_Box box,Text &text_data) 
Description
Panels and Widgets
Chapter 
Get the data of type Text from the Chainage_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 2205
Set_data(Chainage_Box box,Real real_data) 
Name
Integer Set_data(Chainage_Box box,Real real_data) 
Description
Set the data of type Real for the Chainage_Box box to real_data.
A function return value of zero indicates the data was successfully set.
ID = 2206
Set_data(Chainage_Box box,Text text_data) 
Name
Integer Set_data(Chainage_Box box,Text text_data) 
Description
Set the data of type Text for the Chainage_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 2207
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.6 Choice_Box
The Choice_Box is a panel field designed to select one item from a list of choices. If data is typed 
into the box, then it will be validated when <enter> is pressed.
A Choice_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a choice name or to display a choice if it is selected by the choice 
select button. This information area is in the middle
and
(c)
a Choice button on the right.
A choice can be typed into the information area and hitting the <enter> key will validate the choice. 
Note that to be valid, the typed in choice must exist in the Choice pop-up list.
Clicking  LB or  RB on the Choice button brings up the Select Choice pop-up list. Selecting a choice 
from the pop-up list writes the choice to the information area.
Clicking  MB on the Choice button does nothing.
Note: the list of choices is defined by the call  Set_data(Choice_Box box,Integer nc,Text choices[]).
Create_choice_box(Text title_text,Message_Box message)
Name
Choice_Box Create_choice_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Choice_Box. See 5.61.10.6 Choice_Box.
The Choice_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Choice_Box validation messages.
The function return value is the created Choice_Box. 
ID = 890
Create_choice_box(Text title_text,Message_Box message,Integer allow_search)
Choice_Box
title area
information area
choice
choice button
Panels and Widgets
Chapter 
Name
Choice_Box Create_choice_box(Text title_text,Message_Box message,Integer allow_search)
Description
Create an input Widget of type Choice_Box. See 5.61.10.6 Choice_Box.
The Choice_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Choice_Box validation messages.
If allow_search is non zero, then the search mechanism is enable for the created choice box.
The function return value is the created Choice_Box. 
ID = 7697
Validate(Choice_Box box,Text &result)
Name
Integer Validate(Choice_Box box,Text &result)
Description
Validate the contents of Choice_Box box and return the Text result. 
The function returns the value of:
     NO_NAME if the Widget Choice_Box is optional and the box is left empty
     1 if no other return code is needed and result is valid.
     -1 if there is an invalid choice.
     zero if there is a drastic error.
So a function return value of zero indicates that there is an error as well as other values.
Warning this is the opposite of most 12dPL function return values
Double Warning: most times the function return code is not zero even when you think it should be. 
The actual value of the function return code must be checked to see what is going on. For example, 
when there is an incorrect choice, the function return value is -2.
ID = 891
Get_data(Choice_Box box,Text &text_data)
Name
Integer Get_data(Choice_Box box,Text &text_data)
Description
Get the data of type Text from the Choice_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 893
Set_data(Choice_Box box,Text text_data)
Name
Integer Set_data(Choice_Box box,Text text_data)
Panels and Widgets

Description
Set the data of type Text for the Choice_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 892
Set_data(Choice_Box box,Text data,Integer validate)
Name
Integer Set_data(Choice_Box box,Text data,Integer validate)
Description
Set the data of type Text for the Choice_Box box to text_data.
If validate is not zero, then the call will only allow text_data that is in the current choice list.
If validate is zero, then any text value for text_data can be set to the box
A function return value of zero indicates the data was successfully set.
ID = 7949
Set_data(Choice_Box box,Integer nc,Text choices[])
Name
Integer Set_data(Choice_Box box,Integer nc,Text choices[])
Description
Set the values available in the choice list. There are nc items in the choices list for the Choice_Box 
box.
For example
  Text choices[3];
  choices[1] = "top";
  choices[2] = "middle";
  choices[3] = "bottom";
  Choice_Box choice_box = Create_choice_box("Pick from list",message);
  Set_data(choice_box,3,choices);
Note: To be valid, any data typed into the Choice_Box information area must be from the choices 
list.
 
A function return value of zero indicates the nc’th data in the choices list was successfully set.
ID = 997
Set_data(Choice_Box box,Dynamic_Text choices)
Name
Integer Set_data(Choice_Box box,Dynamic_Text choices)
Description
Set the values available in the choice list using a Dynamic_Text choices. This is a safer alternative 
than the above call.
A function return value of zero indicates the list of choices was successfully set.
Panels and Widgets
Chapter 
ID = 7959
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.7 Projection_Box
The Projection_Box is a panel field designed to select a 12d Model projection. If data is typed into 
the box, then it will be validated when <enter> is pressed.
Create_projection_box(Text title_text,Message_Box message)
Name
Projection_Box Create_projection_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Projection_Box.
The Projection_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Colour_Box validation messages.
The function return value is the created Projection_Box. 
ID = 7730
Validate(Projection_Box box,Text &name,Text &type,Text &data)
Name
Integer Validate(Projection_Box box,Text &name,Text &type,Text &data)
Description
Validate the contents of Projection_Box box and return the type and data. 
The function returns the value of:
     NO_NAME if the Widget Projection_Box is optional and the box is left empty
     -1 if the text in the Projection_Box is not a valid projection.
     TRUE (1) if the projection is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error. For example, the Projection_Box is 
not optional and is left blank.
Warning this is the opposite of most 12dPL function return values
ID = 7731
Set_data(Projection_Box box,Text data)
Name
Integer Set_data(Projection_Box box,Text data)
Description
Set the data for the Projection_Box box to be the text data.
A function return value of zero indicates the colour number was successfully set.
ID = 7732
Set_data(Projection_Box box,Text text_data)
Panels and Widgets
Chapter 
Name
Integer Set_data(Projection_Box box,Text text_data)
Description
Set the data of type Text for the Projection_Box box to data.
A function return value of zero indicates the data was successfully set.
ID = 7733
Panels and Widgets

5.61.10.8 Colour_Box
The Colour_Box is a panel field designed to select a 12d Model colour. If data is typed into the box, 
then it will be validated when <enter> is pressed.
The Colour_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in the colour name or to display the colour name if it is selected by 
the colour select button. This information area is in the middle
and
(c)
a Colour select button on the right.
A colour name can be typed into the information area. Then hitting the <enter> key will validate the 
colour name and if it is a valid colour name, the actual colour is shown on the colour select button.
 MB clicked in the information area starts a "Same As" selection. A string is then selected and the 
colour of the selected string is placed in the information area and the actual colour shown on the 
Colour select button.
Clicking  LB or  RB on the colour select button brings up the Select Colour pop-up. Selecting the 
colour from the pop-up list writes the colour in the information area and the actual colour is shown 
on the Colour select button.
Colour_Box
title area
information area
colour name
Colour select button
actual colour
Panels and Widgets
Chapter 
Clicking  MB on the colour select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a colour with the Colour Select button sends a "text selected" command and the colour 
name in message.
Create_colour_box(Text title_text,Message_Box message)
Name
Colour_Box Create_colour_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Colour_Box. See 5.61.10.8 Colour_Box.
Panels and Widgets

The Colour_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Colour_Box validation messages.
The function return value is the created Colour_Box. 
ID = 894
Validate(Colour_Box box,Integer &col_num)
Name
Integer Validate(Colour_Box box,Integer &col_num)
Description
Validate the contents of Colour_Box box and return the Integer colour number I in col_num. 
The function returns the value of:
     NO_NAME if the Widget Colour_Box is optional and the box is left empty
     -1 if the text in the Colour_Box is not a valid colour number or colour name.
     TRUE (1) if no other return code is needed and col_num is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error. For example, the Colour_Box is not 
optional and is left blank.
Warning this is the opposite of most 12dPL function return values
Double Warning the function return can be non zero but the col_num is unusable.
ID = 895
Set_data(Colour_Box box,Integer colour_num)
Name
Integer Set_data(Colour_Box box,Integer colour_num)
Description
Set the data for the Colour_Box box to be the colour number colour_num.
This is the colour number that will be first displayed in the Colour_Box.
colour_num must be Integer.
A function return value of zero indicates the colour number was successfully set.
ID = 896
Set_data(Colour_Box box,Text text_data)
Name
Integer Set_data(Colour_Box box,Text text_data)
Description
Set the data of type Text for the Colour_Box box to text_data.
This is the colour name that will be first displayed in the Colour_Box.
A function return value of zero indicates the data was successfully set.
Panels and Widgets
Chapter 
ID = 1328
Get_data(Colour_Box box,Text &text_data)
Name
Integer Get_data(Colour_Box box,Text &text_data)
Description
Get the data of type Text from the Colour_Box box and return it in text_data. 
This is the colour name entered into the Colour_Box.
A function return value of zero indicates the data was successfully returned.
ID = 897
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.9 Date_Time_Box
Date_Time_Box Create_date_time_box(Text title_text,Message_Box message) 
Name
Date_Time_Box Create_date_time_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Date_Time_Box. See 5.61.10.9 Date_Time_Box.
The Date_Time_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Date_Time_Box validation messages.
By default, the format for a new Date_Time_Box is set to Show_Date and the value for is_gmt is 
false; see the below Set_format and Set_gmt call for more detail
The function return value is the created Date_Time_Box.
ID = 1883
Set_format(Date_Time_Box box,Integer format)
Name
Integer Set_format(Date_Time_Box box,Integer format)
Description
Set the format for the Date_Time_Box box to Integer format.
The list of valid format is:
Show_Date 
0
Show_Time 
1
Show_Date_Time 
2
Show_Time_Decimals 
3
Show_Date_Time_Decimals 4
A function return value of zero indicates the data was successfully set.
ID = 2289
Set_gmt(Date_Time_Box box,Integer is_gmt)
Name
Integer Set_gmt(Date_Time_Box box,Integer is_gmt)
Description
Set the GMT property for the Date_Time_Box box to Integer is_gmt.
If value is_gmt is not zero, then the Date_Time_Box is in GMT.
If value is_gmt is not zero, then the Date_Time_Box is using local machine time.
A function return value of zero indicates the data was successfully set.
ID = 2290
Validate(Date_Time_Box box,Text &data)
Name
Panels and Widgets
Chapter 
Integer Validate(Date_Time_Box box,Text &data) 
Description
Validate the contents of Date_Time_Box box and return the time in Text data. 
The function returns the value of:
     NO_NAME if the Widget Date_Time_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and data is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1884
Validate(Date_Time_Box box,Integer &data)
Name
Integer Validate(Date_Time_Box box,Integer &data) 
Description
Validate the contents of Date_Time_Box box and return the time in Integer data as the number of 
seconds elapsed since midnight (00:00:00), January 1, 1970, Coordinated Universal Time (UTC). 
The function returns the value of:
     NO_NAME if the Widget Date_Time_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and data is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2287
Validate(Date_Time_Box box,Real &data)
Name
Integer Validate(Date_Time_Box box,Real &data) 
Description
Validate the contents of Date_Time_Box box and return the time in Real data as the number of 
seconds elapsed since midnight (00:00:00), January 1, 1601, Coordinated Universal Time (UTC).
The function returns the value of:
     NO_NAME if the Widget Date_Time_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and data is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2288
Panels and Widgets

Set_data(Date_Time_Box box,Text text_data) 
Name
Integer Set_data(Date_Time_Box box,Text text_data) 
Description
Set the data of type Text for the Date_Time_Box box to text_data.
There are various text format for text_data that the call will accept such as DD/MM/YYYY 
HH:MM:SS or DD-MMM-YYYY HH:MM:SS.
Warning the call only work after the containing panel has been shown.
A function return value of zero indicates the data was successfully set.
ID = 1885
Get_data(Date_Time_Box box,Text &text_data) 
Name
Integer Get_data(Date_Time_Box box,Text &text_data) 
Description
Get the data of type Text from the Date_Time_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1886
Set_data(Date_Time_Box box,Integer integer_data) 
Name
Integer Set_data(Date_Time_Box box,Integer integer_data) 
Description
Set the data of type Integer for the Date_Time_Box box to integer_data as the number of seconds 
elapsed since midnight (00:00:00), January 1, 1970, Coordinated Universal Time (UTC).
Warning the call only work after the containing panel has been shown.
A function return value of zero indicates the data was successfully set.
ID = 2283
Get_data(Date_Time_Box box,Integer &integer_data) 
Name
Integer Get_data(Date_Time_Box box,Integer &integer_data) 
Description
Get the data of type Integer from the Date_Time_Box box and return it in integer_data as the 
number of seconds elapsed since midnight (00:00:00), January 1, 1970, Coordinated Universal 
Time (UTC).
A function return value of zero indicates the data was successfully returned.
ID = 2284
Panels and Widgets
Chapter 
Set_data(Date_Time_Box box,Real real_data) 
Name
Integer Set_data(Date_Time_Box box,Real real_data) 
Description
Set the data of type Real for the Date_Time_Box box to real_data as the number of seconds 
elapsed since midnight (00:00:00), January 1, 1601, Coordinated Universal Time (UTC).
Warning the call only work after the containing panel has been shown.
A function return value of zero indicates the data was successfully set.
ID = 2285
Get_data(Date_Time_Box box,Real &real_data) 
Name
Integer Get_data(Date_Time_Box box,Real &real_data) 
Description
Get the data of type Real from the Date_Time_Box box and return it in real_data as the number of 
seconds elapsed since midnight (00:00:00), January 1, 1601, Coordinated Universal Time (UTC).
A function return value of zero indicates the data was successfully returned.
ID = 2286
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.10 Directory_Box
The Directory_Box is a panel field designed to select or create, disk folder. If a folder name is typed 
into the box, then it will be validated when <enter> is pressed.
A Directory_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a folder name or to display the folder name if it is selected by the 
Folder select button. This information area is in the middle
and
(c)
a Folder select button on the right.
A folder name can be typed into the information area. Then hitting the <enter> key will validate the 
folder name.
Clicking  LB or  RB on the Folder select button brings up the Select Folder pop-up. Selecting a folder 
from the pop-up writes the folder name to the information area.
Clicking  MB on the Folder select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
Directory_Box
title area
information area
folder name
Folder select button
Panels and Widgets
Chapter 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a folder with the Folder Select button sends three events:
a "start_browse" command with a blank message.
a " text selected" command and the full path name of the folder in message.
a "finish_browse" command with a blank message.
Create_directory_box(Text title_text,Message_Box message,Integer mode)
Name
Directory_Box Create_directory_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Directory_Box. See 5.61.10.10 Directory_Box.
The Directory_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Directory_Box validation messages.
The value of mode is listed in the Appendix A - Directory mode
The function return value is the created Directory_Box. 
ID = 898
Validate(Directory_Box box,Integer mode,Text &result)
Name
Integer Validate(Directory_Box box,Integer mode,Text &result)
Description
Validate the contents of Directory_Box box and return the Text result. 
The value of mode is listed in the Appendix A - Directory mode. See  Directory Mode
The function returns the value of:
     NO_NAME if the Widget Directory_Box is optional and the box is left empty
     NO_DIRECTORY, DIRECTORY_EXISTS, or NEW_DIRECTORY.
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 899
Panels and Widgets

Get_data(Directory_Box box,Text &text_data)
Name
Integer Get_data(Directory_Box box,Text &text_data)
Description
Get the data of type Text from the Directory_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 901
Set_data(Directory_Box box,Text text_data)
Name
Integer Set_data(Directory_Box box,Text text_data)
Description
Set the data of type Text for the Directory_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 900
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.11 Draw_Box
The Draw_Box is a panel field designed to create an area for drawing by supplying the parameters 
box_width and box_height. The units of box_width and box_height are screen units (pixels).
The actual size of the drawing area is actual width and actual height pixels where:
the actual width of the drawing area is the maximum of the width of the panel without the 
Draw_Box, and box_width. 
and 
the height of the box is box_height.
LJG? border seems to be ignored.
The default coordinate system for the Draw_Box is a Cartesian coordinate system with the origin 
(0,0) in the bottom left hand corner of the Draw_Box. That is, the x-axis is along the bottom of the 
Draw_Box and the y-axis goes up the side of the draw box.
The coordinates of the bottom left hand corner can be modified by a Set_origin call (see  
Draw_Box
panel without Draw_Box
panel with Draw_Box
of width 350 pixels 
and height 75pixels
panel with Draw_Box
of width 350 pixels 
and height 75 pixels
but Draw_Box is forced
wider because the
panel field width is 
greater than 350 pixels
Default Draw_Box Coordinates
y axis
x axis - default units are pixels 
default origin (0,0)
default units
re pixels
Panels and Widgets

Set_origin(Draw_Box box,Real x,Real y)), and the units for the x-axis and the y-axis can be scaled 
by a Set_scale call (see  Set_scale(Draw_Box box,Real xs,Real ys)).
IMPORTANT NOTE
Before making any calls to draw anything in a Draw_Box, the Start_batch_draw must be called (see  
Start_batch_draw(Draw_Box box)) otherwise the drawing calls will return an error.
Commands and Messages for Wait_on_Widgets
Moving the mouse around in the Draw_Box sends a "mouse_move" command with the Draw_Box 
coordinates in message. The coordinates are in Draw_Box units and are given as x and y separated 
by a space.
When the mouse is not moving in the Draw_Box, a "hover" command with a blank message is sent.
When the mouse leaves the Draw_Box, a "mouse_leave" command with a blank message is sent.
Pressing  LB in the Draw_Box sends a "click_lb_down" command with the Draw_Box coordinates 
in message. The coordinates are in Draw_Box units and are given as x and y separated by a space.
Releasing  LB in the Draw_Box sends a "click_lb" command with the Draw_Box coordinates in 
message. The coordinates are in Draw_Box units and are given as x and y separated by a space.
Double clicking  LB in the Draw_Box sends a "double_click_lb" command with the Draw_Box 
coordinates in message. The coordinates are in Draw_Box units and are given as x and y separated 
by a space.
Pressing  MB in the Draw_Box sends a "click_mb_down" command with the Draw_Box 
coordinates in message. The coordinates are in Draw_Box units and are given as x and y separated 
by a space.
Releasing  MB in the Draw_Box sends a "click_mb" command with the Draw_Box coordinates in 
message. The coordinates are in Draw_Box units and are given as x and y separated by a space.
Double clicking  MB in the Draw_Box sends a "double_click_mb" command with the Draw_Box 
coordinates in message. The coordinates are in Draw_Box units and are given as x and y separated 
by a space.
Pressing  RB in the Draw_Box sends a "click_rb_down" command with the Draw_Box coordinates 
in message. The coordinates are in Draw_Box units and are given as x and y separated by a space.
Releasing  RB in the Draw_Box sends a "click_rb" command with the Draw_Box coordinates in 
message. The coordinates are in Draw_Box units and are given as x and y separated by a space.
Double clicking  RB in the Draw_Box sends a "double_click_rb" command with the Draw_Box 
coordinates in message. The coordinates are in Draw_Box units and are given as x and y separated 
by a space.
Create_draw_box(Integer box_width,Integer box_height,Integer border)
Name
Draw_Box Create_draw_box(Integer box_width,Integer box_height,Integer border)
Description
Create an input Widget of type Draw_Box with the drawing area defined by the parameters 
box_width, box_height and border which are all in screen units (pixels).See 5.61.10.11 
Draw_Box.
The function return value is the created Draw_Box.
ID = 1337
Panels and Widgets
Chapter 
Get_size(Draw_Box,Integer &actual_width,Integer &actual_height)
Name
Integer Get_size(Draw_Box,Integer &actual_width,Integer &actual_height)
Description
Get the width and height in pixels of the Draw_Box drawing area on the panel and return the values 
in actual_width and actual_height. See 5.61.10.11 Draw_Box for the calculations of width and 
height.
A function return value of zero indicates the width and height were successfully returned.
ID = 1352
Set_origin(Draw_Box box,Real x,Real y)
Name
Integer Set_origin(Draw_Box box,Real x,Real y)
Description
Set the coordinates of the left hand bottom corner of the Draw_Box box to (x,y) where x and y are 
given in the units of the Draw_Box.
A function return value of zero indicates the origin was successfully set.
ID = 1340
Set_scale(Draw_Box box,Real xs,Real ys)
Name
Integer Set_scale(Draw_Box box,Real xs,Real ys)
Description
Change the units for the x-axis and the y-axis of the Draw_Box box.
The new length of one unit in the x-direction is xs times the previous unit length on the x-axis. For 
example, if xs = 0.5, then the new unit length along the x-axis is half the size of the previous unit 
length.
Similarly, the new length of one unit in the y-direction is ys times the previous unit length on the y-
axis. 
A function return value of zero indicates the scales were successfully set.
ID = 1341
Start_batch_draw(Draw_Box box)
Name
Integer Start_batch_draw(Draw_Box box)
Description
The Start_batch_draw command must be given before any drawing calls for the Draw_Box box are 
made.
Any drawing calls made before Start_batch_draw is called will do nothing and return a non-zero 
function return code (that is, the call was not successful).
A function return value of zero indicates the batch draw call was successful.
Panels and Widgets

ID = 1361
End_batch_draw(Draw_Box box)
Name
Integer End_batch_draw(Draw_Box box)
Description
<no description>
ID = 1362
Clear(Draw_Box box,Integer r,Integer g,Integer b)
Name
Integer Clear(Draw_Box box,Integer r,Integer g,Integer b)
Description
Clear the Draw_Box box and then fill box with a colour given by r, g and b.
The colour is given in rgb which requires three Integers with values between 0 and 255, one each 
for red, green and blue. The red, green and blue values are given in r, g and b respectively.
If Clear is called before a Start_batch_draw (box) call is made, then the Clear fails and a non-zero 
function return value is returned.
A function return value of zero indicates the clear was successful.
ID = 1344
Set_colour(Draw_Box box,Integer colour_num)
Name
Integer Set_colour(Draw_Box box,Integer colour_num)
Description
For the Draw_Box box, set the drawing colour for following line work to have the 12d Model colour 
colour_num.
A function return value of zero indicates the set was successful.
ID = 1342
Set_colour(Draw_Box box,Integer r,Integer g,Integer b)
Name
Integer Set_colour(Draw_Box box,Integer r,Integer g,Integer b)
Description
For the Draw_Box box, set the drawing colour for following line work to have the an rgb colour.
The colour is given in rgb which requires three Integers with values between 0 and 255, one each 
for red, green and blue.
The red, green and blue values are given in r, g and b respectively.
A function return value of zero indicates the set was successful.
ID = 1343
Panels and Widgets
Chapter 
Move_to(Draw_Box box,Real x,Real y)
Name
Integer Move_to(Draw_Box box,Real x,Real y)
Description
For the Draw_Box box, move the current position of the drawing nib to (x, y) where x and y are 
given in the units of the Draw_Box.
If Move_to is called before a Start_batch_draw (box) call is made, then the Move_to fails and a non-
zero function return value is returned.
A function return value of zero indicates the move was successful.
ID = 1338
Draw_to(Draw_Box box,Real x,Real y)
Name
Integer Draw_to(Draw_Box box,Real x,Real y)
Description
For the Draw_Box box, draw from the current position to (x, y) where x and y are given in the units 
of the Draw_Box.
If Draw_to is called before a Start_batch_draw (box) call is made, then the Draw_to fails and a non-
zero function return value is returned.
A function return value of zero indicates the draw was successful.
ID = 1339
Draw_polyline(Draw_Box box,Integer num_pts,Real x[],Real y[])
Name
Integer Draw_polyline(Draw_Box box,Integer num_pts,Real x[],Real y[])
Description
For the Draw_Box box, draw the polyline of num_pts points with the x-coordinates given in the 
array x[], and the y-coordinates in the array y[]. 
If Draw_polyline is called before a Start_batch_draw (box) call is made, then the Draw_polyline fails 
and a non-zero function return value is returned.
A function return value of zero indicates the draw was successful.
ID = 1355
Set_text_colour(Draw_Box box,Integer r,Integer g,Integer b)
Name
Integer Set_text_colour(Draw_Box box,Integer r,Integer g,Integer b)
Description
Set the colour used for the drawing text in the Draw_Box box. 
The colour is given in rgb which requires three Integers with values between 0 and 255, one each 
for red, green and blue.
The red, green and blue values are given in r, g and b respectively.
Panels and Widgets

A function return value of zero indicates the colour was successfully set.
ID = 1346
Set_text_font(Draw_Box box,Text font)
Name
Integer Set_text_font(Draw_Box box,Text font)
Description
For the Draw_Box box, set the font for the following text calls to be the True Type Font font.
A function return value of zero indicates the text font was successfully set.
ID = 1349
Set_text_weight(Draw_Box box,Integer weight)
Name
Integer Set_text_weight(Draw_Box box,Integer weight)
Description
Set the text weight weight for the Draw_Box box.
A function return value of zero indicates the weight was successfully set.
ID = 1350
Set_text_align(Draw_Box box,Integer mode)
Name
Integer Set_text_align(Draw_Box box,Integer mode)
Description
Set the text alignment to mode for any text drawn in the Draw_Box box after the Set_text_align call.
The values for mode are given in  Text Alignment Modes for Draw_Box. The file set_ups.h needs to 
be included for the modes to be defined.
The default mode is that the coordinates of the text are for the top left of the bounding box 
surrounding the text.
A function return value of zero indicates the text alignment was successfully set.
ID = 1351
Draw_text(Draw_Box box,Real x,Real y,Real size,Real angle,Text txt)
Name
Integer Draw_text(Draw_Box box,Real x,Real y,Real size,Real angle,Text txt)
Description
In the Draw_Box box, draw the text txt at the position (x,y) where the coordinates (x,y) are in the 
Draw_Box’s coordinate system.
The text has size size (in pixels), and the rotation angle of angle radians.
If Draw_text is called before a Start_batch_draw (box) call is made, then the Draw_text fails and a 
non-zero function return value is returned.
A function return value of zero indicates the text was successfully drawn.
Panels and Widgets
Chapter 
ID = 1345
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.12 File_Box
The File_Box is a panel field designed to select or create, disk files. If a file name is typed into the 
box, then it will be validated when <enter> is pressed.
A File_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a file name or to display the file name if it is selected by the file 
select button. This information area is in the middle
and
(c)
a File select button on the right.
A file name can be typed into the information area. Then hitting the <enter> key will validate the file 
name.
Clicking  LB or  RB on the File select button brings up the Folder pop-up. Selecting a file from the 
pop-up list writes the file name to the information area.
Clicking  MB on the File select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
File_Box
title area
information area
file name
File select button
Panels and Widgets
Chapter 
Pressing the Enter key in the information area sends a "keystroke" command and then a "file 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a file with the Folder Select button sends a " file selected" command and the full path name 
of the file in message.
Create_file_box(Text title_text,Message_Box message,Integer mode,Text wild)
Name
File_Box Create_file_box(Text title_text,Message_Box message,Integer mode,Text wild)
Description
Create an input Widget of type File_Box for inputting and validating files. 
The File_Box is created with the title title_text (see 5.61.10.12 File_Box).
The Message_Box message is normally the message box for the panel and is used to display 
File_Box validation messages.
If <enter> is typed into the File_Box, automatic validation is performed by the File_Box according to 
mode. What the validation is, what messages are written to Message_Box, and what actions 
automatically occur, depend on the value of mode.
For example,
CHECK_FILE_NEW         20   // if the file doesn’t exists, the message says "will be created"
                                                // if it exist, the messages says "ERROR"
The values for mode and their actions are listed in Appendix A (see  File Mode).
If  LB is clicked on the icon at the right hand end of the File_Box, a list of the files in the current area 
which match the wild card text wild (for example, *.dat) Is placed in a pop-up. If a file is selected 
from the pop-up (using  LB), the file name is placed in the information area of the File_Box and 
validation performed according to mode.
The function return value is the created File_Box. 
Special Note: 
#include "set_ups.h" must be in the macro code to define CHECK_FILE_NEW etc. 
ID = 906
Create_file_box(Text title_text,Text description,Message_Box message,Integer 
mode,Text wild)
Name
File_Box Create_file_box(Text title_text,Text description,Message_Box message,Integer mode,Text wild)
Description
This call is identical to the above 906 but with an extra Text parameter description which is used on 
return (usually warning or error) messages on the Message_Box message or on the output window.
ID = 3989
Validate(File_Box box,Integer mode,Text &result)
Panels and Widgets

Name
Integer Validate(File_Box box,Integer mode,Text &result)
Description
Validate the contents of File_Box box and return the text typed into the File_Box in result. 
The value of mode is listed in the Appendix A - File mode. See  File Mode.
The function returns the value of:
     NO_NAME if the Widget File_Box is optional and the box is left empty
     NO_FILE, FILE_EXISTS, or NO_FILE_ACCESS.
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 907
Get_data(File_Box box,Text &text_data)
Name
Integer Get_data(File_Box box,Text &text_data)
Description
Get the data of type Text from the File_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 909
Set_data(File_Box box,Text text_data)
Name
Integer Set_data(File_Box box,Text text_data)
Description
Set the data of type Text for the File_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 908
Get_wildcard(File_Box box,Text &data)
Name
Integer Get_wildcard(File_Box box,Text &data)
Description
Get the wildcard from the File_Box box.
The type of data must be Text.
A function return value of zero indicates the wildcard data was returned successfully.
ID = 1321
Panels and Widgets
Chapter 
Set_wildcard(File_Box box,Text text_data)
Name
Integer Set_wildcard(File_Box box,Text text_data)
Description
Set the wildcard to the File_Box box.
The type of data must be Text.
A function return value of zero indicates the wildcard data was successfully set.
ID = 1320
Add_wildcard(File_Box box,Text pattern,Integer include_in_default)
Name
Integer Add_wildcard(File_Box box,Text pattern,Integer include_in_default)
Description
Add (can be additional) wildcard pattern to the File_Box box.
If include_in_default is non zero, then the new pattern is choose a the default pattern for the box.
A function return value of zero indicates the wildcard data was successfully set.
ID = 7702
Get_directory(File_Box box,Text &data)
Name
Integer Get_directory(File_Box box,Text &data)
Description
Get folder for the file from the File_Box box and return the folder in data.
A function return value of zero indicates the directory data was returned successfully.
ID = 1323
Set_directory(File_Box box,Text text_data)
Name
Integer Set_directory(File_Box box,Text text_data)
Description
Set the folder to the file in the File_Box box to the Text data.
A function return value of zero indicates the directory data was successfully set.
ID = 1322
Set_many(File_Box box,Integer mode) 
Name
Integer Set_many(File_Box box,Integer mode) 
Description
Set the Text_Edit_Box box to support many files if mode is non-zero, disable it otherwise.
Panels and Widgets

A function return value of zero indicates that the function call was successful.
ID = 1547
Get_many(File_Box box,Integer &mode) 
Name
Integer Get_many(File_Box box,Integer &mode) 
Description
Set the value of Integer mode to:
1 if the File_Box box supports many files.
0 otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1548
Set_encoding(File_Box box,Integer encoding) 
Name
Integer Set_encoding(File_Box box,Integer encoding)
Description
Set file encoding for File_Box box with Integer encoding. 
A return value of zero indicates the function call was successful.
List of value for file encoding 
0 Native
1 Ansi
2 Unicode
3 Unicode Little Endian
4 Unicode Big Endian
5 UTF_8
6 UTF-16_Little_Endian 
ID = 2947
Get_encoding(File_Box box,Integer &encoding) 
Name
Integer Get_encoding(File_Box box,Integer &encoding)
Description
Get file encoding for File_Box box to Integer encoding. 
A return value of zero indicates the function call was successful.
List of value for file encoding 
0 Native
1 Ansi
2 Unicode
3 Unicode Little Endian
Panels and Widgets
Chapter 
4 Unicode Big Endian
5 UTF_8
6 UTF-16_Little_Endian 
ID = 2948
Set_show_encodings(File_Box box,Integer show) 
Name
Integer Set_show_encodings(File_Box box,Integer show) 
Description
Set show encoding of the File_Box box to: false if Integer show is 0; true otherwise.
A return value of zero indicates the function call was successful.
ID = 2949
Get_show_encodings(File_Box box,Integer &show) 
Name
Integer Get_show_encodings(File_Box box,Integer &show) 
Description
Set Integer show to: 1 if the File_Box box shows the encoding; 0 otherwise.
A return value of zero indicates the function call was successful.
ID = 2950
Set_libraries(File_Box box,Integer data)
Name
Integer Set_libraries(File_Box box,Integer data)
Description
Set the property of browsing to 12D library folder of the Input_Box box to false if data is 0; to true 
otherwise. 
A return value of zero indicates the function call was successful. 
ID = 2863
Get_libraries(File_Box box,Integer &data)
Name
Integer Get_libraries(File_Box box,Integer &data)
Description
If the property of browsing to 12D library folder of the Input_Box box is true then set the value of 
data to 1; otherwise set the value of data to 0. 
A return value of zero indicates the function call was successful. 
ID = 2862
Panels and Widgets

Set_setups(File_Box box,Integer data)
Name
Integer Set_setups(File_Box box,Integer data)
Description
Set the property of supporting 12D setup folder of the Input_Box box to false if data is 0; to true 
otherwise. 
A return value of zero indicates the function call was successful. 
ID = 2865
Get_setups(File_Box box,Integer &data)
Name
Integer Get_setups(File_Box box,Integer &data)
Description
If the property of browsing to 12D setup folder of the Input_Box box is true then set the value of 
data to 1; otherwise set the value of data to 0. 
A return value of zero indicates the function call was successful. 
ID = 2864
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.13 Function_Box
The Function_Box is a panel field designed to select, or create, Macro_Functions. If data is typed 
into the box, then it will be validated when <enter> is pressed.
The Function_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in the function name or to display the function name if it is selected 
by the function select button. This information area is in the middle.
and
(c)
a Function select button on the right.
A function name can be typed into the information area. Then hitting the <enter> key will validate 
the function name.
 MB clicked in the information area starts a "Same As" selection. A string is then selected and if the 
string comes from a function of the same function type, the function name is placed in the 
information area.
Clicking  LB or  RB on the Function select button brings up the Select Function pop-up. Selecting 
the function from the pop-up list writes the function name in the information area.
Clicking  MB on the Function select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "function 
selected" command and nothing in message.
Function_Box
title area
information area
name of the function 
Function select button
Panels and Widgets

Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a function with the Function Select button sends a "function selected" command and 
nothing in message.
Function_Box Create_function_box(Text title_text,Message_Box message,Integer 
mode,Integer type) 
Name
Function_Box Create_function_box(Text title_text,Message_Box message,Integer mode,Integer type) 
Description
Create an input Widget of type Function_Box for inputting and validating Functions. See 
5.61.10.13 Function_Box.
The Function_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Function_Box validation messages.
The value of mode is listed in the Appendix A - Function mode. See  Function Mode.
The value of type is listed in the Appendix A - Function type. See  Function Type.
The function return value is the created Function_Box.
ID = 1183
Validate(Function_Box box,Integer mode,Function &result) 
Name
Integer Validate(Function_Box box,Integer mode,Function &result) 
Description
Validate the contents of Function_Box box and return the Function result. 
The value of mode is listed in the Appendix A - Function mode. See  Function Mode
The function returns the value of:
     NO_NAME if the Widget Function_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1184
Get_data(Function_Box box,Text &text_data) 
Name
Integer Get_data(Function_Box box,Text &text_data) 
Panels and Widgets
Chapter 
Description
Get the data of type Text from the Function_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1185
Set_data(Function_Box box,Text text_data)
Name
Integer Set_data(Function_Box box,Text text_data) 
Description
Set the data of type Text for the Function_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1186
Get_type(Function_Box box,Integer &type)
Name
Integer Get_type(Function_Box box,Integer &type)
Description
Get the function Integer type from the Function_Box box and return it in type.
A function return value of zero indicates the type was returned successfully.
ID = 1334
Set_type(Function_Box box,Integer type)
Name
Integer Set_type(Function_Box box,Integer type)
Description
Set the function Integer type for the Function_Box box to type.
The type of type must be Integer.
A function return value of zero indicates the type was successfully set.
ID = 1333
Get_type(Function_Box box,Text &type)
Name
Integer Get_type(Function_Box box,Text &type)
Description
Get the function Text type from the Function_Box box and return it in type.
A function return value of zero indicates the type was returned successfully.
ID = 1336
Set_type(Function_Box box,Text type)
Panels and Widgets

Name
Integer Set_type(Function_Box box,Text type)
Description
Set the function Text type for the Function_Box box to type.
A function return value of zero indicates the type was successfully set.
ID = 1335
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.14 HyperLink_Box
The HyperLink_Box is a panel field designed to display a hyperlink on the panel.
Commands and Messages for Wait_on_Widgets
No commands or messages are sent from the Hyperlink_Box.
HyperLink_Box Create_hyperlink_box(Text hyperlink,Message_Box message)
Name
HyperLink_Box Create_hyperlink_box(Text hyperlink,Message_Box message) 
Description
Create an input Widget of type HyperLink_Box. See 5.61.10.14 HyperLink_Box.
The Hyperlink_Box is created with the Text in hyperlink. This text should be a hyperlink.
When the user clicks on the HyperLink then the HyperLink will be activated,
The Message_Box message is normally the message box for the panel and is used to display 
Hyperlink_Box validation messages.
The function return value is the created Hyperlink_Box.
ID = 1887
Validate(HyperLink_Box box,Text &result) 
Name
Integer Validate(HyperLink_Box box,Text &result) 
Description
Validate the contents of HyperLink_Box box and return the name of the hyperlink in Text result. 
The function returns the value of:
     NO_NAME if the Widget HyperLink_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1888
Set_data(HyperLink_Box box,Text text_data) 
HyperLink_Box
hyperlink text
Panels and Widgets

Name
Integer Set_data(HyperLink_Box box,Text text_data)
Description
Set the data of type Text for the Hyperlink_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1889
Get_data(HyperLink_Box box,Text &text_data)
Name
Integer Get_data(HyperLink_Box box,Text &text_data) 
Description
Get the data of type Text from the Hyperlink_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1890
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.15 Input_Box
The Input_Box is a panel field designed to accept typed input, and there is no restrictions on what 
data can be typed into it.
An Input_Box is a panel field that is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type text into. This information area is in the middle
and
(c)
a Typed Input icon on the right.
Data is typed into the information area and hitting the <enter> key will validate the typed data.
Clicking  LB,  MB or  RB on the typed input icon does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Clicking  LB or  RB on the Typed Input icon sends a "text selected" command and "[Browse]" in 
message.
Create_input_box(Text title_text,Message_Box message)
Name
Input_Box Create_input_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Input_Box. See 5.61.10.15 Input_Box.
The Input_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Input_Box validation messages.
The function return value is the created Input_Box. 
ID = 910
Input_Box
title area
information area
typed data
Typed Input icon
Panels and Widgets

Validate(Input_Box box,Text &result)
Name
Integer Validate(Input_Box box,Text &result)
Description
Validate the contents of Input_Box box and return the Text result. 
This call is almost not required as the box either has text or it does not but it is required to know if the 
Input_Box was optional and nothing was typed in.
The function returns the value of:
     NO_NAME if the Widget Input_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 911
Get_data(Input_Box box,Text &text_data)
Name
Integer Get_data(Input_Box box,Text &text_data)
Description
Get the data of type Text from the Input_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 913
Set_data(Input_Box box,Text text_data)
Name
Integer Set_data(Input_Box box,Text text_data)
Description
Set the data of type Text for the Input_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 912
Set_multi_line(Input_Box box,Integer no_lines)
Name
Integer Set_multi_line(Input_Box box,Integer no_lines)
Description
Set the number of lines for Input_Box box to Integer no_lines.
A return value of zero indicates the function call was successful. 
Panels and Widgets
Chapter 
ID = 2859
Get_multi_line(Input_Box box,Integer &no_lines)
Name
Integer Get_multi_line(Input_Box box,Integer &no_lines)
Description
Get the number of lines no_lines for Input_Box box.
A return value of zero indicates the function call was successful. 
ID = 2860
Set_default_data(Input_Box box,Text data) 
Name
Integer Set_default_data(Input_Box box,Text data)
Description
Set the default data for the Input_Box box to data.
A function return value of zero indicates the data was successfully set.
ID = 7987
Set_default_data(Input_Box box,Text data,Integer validate_return)
Name
Integer Set_default_data(Input_Box box,Text data,Integer validate_return)
Description
Set the default data for the Input_Box box to data, the special result of validation of the box when 
the value is of the default will be validate_return.
A function return value of zero indicates the data was successfully set.
ID = 7988
Get_default_data(Input_Box box,Text &data,Integer &validate_return)
Name
Integer Get_default_data(Input_Box box,Text &data,Integer &validate_return)
Description
Get the default data for the Input_Box box and return it in data, the special result of validation of the 
box when the value is of the default will be validate_return.
A function return value of zero indicates the data was successfully get.
ID = 7989
Clear_default_data(Input_Box box)
Name
Integer Clear_default_data(Input_Box box)
Panels and Widgets

Description
Clear the default data for the Input_Box box.
A function return value of zero indicates the clear was successful.
ID = 7990
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.16 Integer_Box
The Integer_Box is a panel field designed to enter an integer (or whole number). That is, it takes 
typed input of optionally + or a -, followed by one or more of the numbers 0 to 9. No other characters 
can be typed into the Integer_Box.
An Integer_Box is a panel field that is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in the number text. This information area is in the middle
and
(c)
a Typed Integer icon on the right.
Data is typed into the information area and hitting the <enter> key will validate the typed data. Only 
+, - and the number 0 to 9 can be typed into the information area.
Clicking  LB,  MB or  RB on the Typed Integer icon does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "integer 
selected" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Clicking  LB or  RB on the Typed Integer icon sends a "integer selected" command and nothing in 
message.
Create_integer_box(Text title_text,Message_Box message)
Name
Integer_Box Create_integer_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Integer_Box. See 5.61.10.16 Integer_Box.
The Integer_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Integer_Box validation messages.
The function return value is the created Integer_Box. 
Integer_Box
title area
information area
typed data
Typed Integer icon
Panels and Widgets

ID = 914
Validate(Integer_Box box,Integer &result)
Name
Integer Validate(Integer_Box box,Integer &result)
Description
Validate result (of type Integer) in the Integer_Box box. 
Validate the contents of Integer_Box box and return the Integer result. 
The function returns the value of:
     NO_NAME if the Widget Integer_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 915
Get_data(Integer_Box box,Text &text_data)
Name
Integer Get_data(Integer_Box box,Text &text_data)
Description
Get the data of type Text from the Input_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 917
Set_data(Integer_Box box,Integer integer_data)
Name
Integer Set_data(Integer_Box box,Integer integer_data)
Description
Set the data of type Integer for the Integer_Box box to integer_data.
A function return value of zero indicates the data was successfully set.
ID = 916
Set_data(Integer_Box box,Text text_data) 
Name
Integer Set_data(Integer_Box box,Text text_data) 
Description
Set the data of type Text for the Integer_Box box to text_data.
A function return value of zero indicates the data was successfully set.
Panels and Widgets
Chapter 
ID = 1517
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.17 Justify_Box
The Justify_Box is a panel field designed to select one item from a list of text justifications. If data is 
typed into the box, then it will be validated when <enter> is pressed.
A Justify_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a justification or to display a justification choice if it is selected by 
the justification choice button. This information area is in the middle
and
(c)
a Justification choice button on the right.
A justification can be typed into the information area and hitting the <enter> key will validate the 
justification. Note that to be valid, the typed in justification must exist in the Justification choice pop-
up list.
Clicking  LB or  RB on the Justification choice button brings up the Select Choice pop-up list. 
Selecting a justification choice from the pop-up list writes the justification to the information area.
Clicking  MB on the Justification choice button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the justification choice in message, or blank if it is not a valid justification.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Justify_Box
title area
information area
justification choice
Justification choice button
Panels and Widgets
Chapter 
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a justification after clicking on the Justification Choice button sends a "text selected" 
command and the justification choice in message.
Create_justify_box(Text title_text,Message_Box message)
Name
Justify_Box Create_justify_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Justify_Box. See 5.61.10.17 Justify_Box.
The Justify_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Justify_Box validation messages.
The function return value is the created Justify_Box. 
ID = 918
Validate(Justify_Box box,Integer &result)
Name
Integer Validate(Justify_Box box,Integer &result)
Description
Validate the contents of Justify_Box box and return the Integer result. 
The function returns the value of:
     NO_NAME if the Widget Justify_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 919
Get_data(Justify_Box box,Text &text_data)
Name
Integer Get_data(Justify_Box box,Text &text_data)
Description
Get the data of type Text from the Justify_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 921
Panels and Widgets

Set_data(Justify_Box box,Integer integer_data)
Name
Integer Set_data(Justify_Box box,Integer integer_data)
Description
Set the data of type Integer for the Justify_Box box to integer_data.
integer_data represents the text justification and can have the values 1 to 9.
A function return value of zero indicates the data was successfully set.
ID = 920
Set_data(Justify_Box box,Text text_data)
Name
Integer Set_data(Justify_Box box,Text text_data) 
Description
Set the data of type Text for the Justify_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1518
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.18 Linestyle_Box
The Linestyle_Box is a panel field designed to select 12d Model linestyles. If a linestyle name is 
typed into the box, then the linestyle name will be validated when <enter> is pressed.
A Linestyle_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a linestyle name or to display the linestyle name if it is selected 
by the linestyle select button. This information area is in the middle
and
(c)
a Linestyle select button on the right.
A linestyle name can be typed into the information area. Then hitting the <enter> key will validate 
the linestyle name.
 MB clicked in the information area starts a "Same As" selection. A string is then selected and the 
linestyle of the string is written in the information area.
Clicking  LB or  RB on the Linestyle select button brings up the Select Linestyle pop-up. Selecting a 
linestyle from the pop-up list writes the linestyle name in the information area.
Linestyle_Box
title area
information area
linestyle name
Linestyle select button
Panels and Widgets

Clicking  MB on the Linestyle select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a linestyle after clicking on the Linestyle Select button sends a "text selected" command 
and the linestyle name in message.
Panels and Widgets
Chapter 
Create_linestyle_box(Text title_text,Message_Box message,Integer mode)
Name
Linestyle_Box Create_linestyle_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Linestyle_Box. See 5.61.10.18 Linestyle_Box.
The Linestyle_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Linestyle_Box validation messages.
The value of mode is listed in the Appendix A - Linestyle mode. See  Linestyle Mode.
The function return value is the created Linestyle_Box. 
ID = 922
Validate(Linestyle_Box box,Integer mode,Text &result)
Name
Integer Validate(Linestyle_Box box,Integer mode,Text &result)
Description
Validate the contents of Linestyle_Box box and return the name of the linestyle in Text result. 
The value of mode is listed in the Appendix A - Linestyle mode. See  Linestyle Mode
The function returns the value of:
     NO_NAME if the Widget Linestyle_Box is optional and the box is left empty
     LINESTYLE_EXISTS or NO_LINESTYLE.
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 923
Get_data(Linestyle_Box box,Text &text_data)
Name
Integer Get_data(Linestyle_Box box,Text &text_data)
Description
Get the data of type Text from the Linestyle_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 925
Set_data(Linestyle_Box box,Text text_data)
Name
Integer Set_data(Linestyle_Box box,Text text_data)
Description
Panels and Widgets

Set the data of type Text for the Linestyle_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 924
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.19 List_Box
Create_list_box(Text title_text,Message_Box message,Integer nlines)
Name
List_Box Create_list_box(Text title_text,Message_Box message,Integer nlines)
Description
Create an input Widget of type List_Box. See 5.61.10.19 List_Box.
The List_Box is created with the title title_text.
The number of lines nline will be created in the List_Box.
The Message_Box message is normally the message box for the panel and is used to display 
List_Box validation messages.
The function return value is the created List_Box.
ID = 1278
Get_number_of_items(List_Box box,Integer &count) 
Name
Integer Get_number_of_items(List_Box box,Integer &count) 
Description
For the List_Box box, get the number of items in the list and return the number in count.
A function return value of zero indicates that count is successfully returned.
ID = 1546
Set_sort(List_Box box,Integer mode)
Name
Integer Set_sort(List_Box box,Integer mode)
Description
Set the sort mode for the List_Box box depending on the Integer mode.
If mode is 0 then the sort is ascending, 
If mode is 1 then the sort is descending.
A function return value of zero indicates the sort was successfully set.
ID = 1279
Get_sort(List_Box box,Integer &mode)
Name
Integer Get_sort(List_Box box,Integer &mode)
Description
Get the sort mode from the List_Box box and return it in mode.
If mode is 0 then the sort is ascending, 
If mode is 1 then the sort is descending.
A function return value of zero indicates the mode was returned successfully.
Panels and Widgets

ID = 1280
Set_auto_cut_paste(List_Box box,Integer mode)
Name
Integer Set_auto_cut_paste(List_Box box,Integer mode)
Description
Disable the auto cut paste property of the List_Box box if the Integer mode is zero, enable it 
otherwise.
A return value of zero indicates the function call was successful.
ID = 1296
Get_auto_cut_paste(List_Box box,Integer &mode)
Name
Integer Get_auto_cut_paste(List_Box box,Integer &mode)
Description
If the auto cut paste property of the List_Box box is enable set the Integer mode to 1, otherwise set 
mode to 0.
A function return value of zero indicates the mode was returned successfully.
ID = 1297
Set_selections(List_Box box,Integer mode)
Name
Integer Set_selections(List_Box box,Integer mode)
Description
Disable the multiple item selection property of the List_Box box if the Integer mode is zero, enable 
it otherwise.
A return value of zero indicates the function call was successful.
ID = 1281
Get_selections(List_Box box,Integer &mode)
Name
Integer Get_selections(List_Box box,Integer &mode)
Description
If the multiple item selection property of the List_Box box is enable set the Integer mode to 1, 
otherwise set mode to 0.
A function return value of zero indicates the mode was returned successfully.
ID = 1282
Set_caret(List_Box box,Integer pos,Integer scroll)
Name
Panels and Widgets
Chapter 
Integer Set_caret(List_Box box,Integer pos,Integer scroll)
Description
Set the caret on the item with index pos of the List_Box box. If the Integer scroll is non-zero, scroll 
to the item.
A return value of zero indicates the function call was successful.
ID = 1283
Get_caret(List_Box box,Integer &pos)
Name
Integer Get_caret(List_Box box,Integer &pos)
Description
Get the index of the item with the caret of the List_Box box and return it to pos.
A function return value of zero indicates the index was returned successfully.
ID = 1284
Delete_item(List_Box box,Integer pos)
Name
Integer Delete_item(List_Box box,Integer pos)
Description
Delete the item with index pos of the List_Box box.
A return value of zero indicates the function call was successful.
ID = 1287
Insert_item(List_Box box,Integer pos,Text text)
Name
Integer Insert_item(List_Box box,Integer pos,Text text)
Description
Insert a new the item with the value text at index pos to the List_Box box.
A return value of zero indicates the function call was successful.
ID = 1286
Add_item(List_Box box,Text text)
Name
Integer Add_item(List_Box box,Text text)
Description
Insert a new the item with the value text to the end of the List_Box box.
A return value of zero indicates the function call was successful.
ID = 1285
Panels and Widgets

Get_item(List_Box box,Integer pos,Text &text)
Name
Integer Get_item(List_Box box,Integer pos,Text &text)
Description
Assign the value of the item with index pos of the List_Box box to text.
A return value of zero indicates the function call was successful.
ID = 1288
Set_selection(List_Box box,Integer pos)
Name
Integer Set_selection(List_Box box,Integer pos)
Description
Set the current selection of the List_Box box to the item with index pos.
If the List_Box box allows multiple selection, the function fails with return code one.
A return value of zero indicates the function call was successful.
ID = 1289
Get_selection(List_Box box,Integer &pos)
Name
Integer Get_selection(List_Box box,Integer &pos)
Description
Get the index of current selected index of the List_Box box and assign to Integer pos.
If the List_Box box allows multiple selection, the function fails with return code one.
A return value of zero indicates the function call was successful.
ID = 1290
Get_selection_count(List_Box box,Integer &count)
Name
Integer Get_selection_count(List_Box box,Integer &count)
Description
Get the number of selected items of the List_Box box and assign to Integer count.
If the List_Box box does not allow multiple selection, the function fails with return code one.
A return value of zero indicates the function call was successful.
ID = 1291
Set_selection_list(List_Box box,Integer maxc,Integer list[],Integer do_select) 
Name
Integer Set_selection_list(List_Box box,Integer maxc,Integer list[],Integer do_select) 
Description
For the items of the List_Box box of indices from the first maxc number in the list:
Panels and Widgets
Chapter 
If do_select is zero, unselect those item.
If do_select is non-zero, select those item.
If the List_Box box does not allow multiple selection, the function fails with return code one.
A return value of zero indicates the function call was successful.
ID = 1292
Get_selection_list(List_Box box,Integer maxc,Integer list[]) 
Name
Integer Get_selection_list(List_Box box,Integer maxc,Integer list[]) 
Description
Get all the selected items of the List_Box box and assign the first maxc indices to the list:
If the List_Box box does not allow multiple selection, the function fails with return code one.
A return value of zero indicates the function call was successful.
ID = 1293
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.20 Map_File_Box
Create_map_file_box(Text title_text,Message_Box message,Integer mode)
Name
Map_File_Box Create_map_file_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Map_File_Box. See 5.61.10.20 Map_File_Box.
The Map_File_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Map_File_Box validation messages.
The value of mode is listed in the Appendix A - File mode. See  File Mode
The function return value is the created Map_File_Box. 
ID = 926
Validate(Map_File_Box box,Integer mode,Text &result)
Name
Integer Validate(Map_File_Box box,Integer mode,Text &result)
Description
Validate the contents of Map_File_Box box and return the Text result. 
The value of mode is listed in the Appendix A - File mode. See  File Mode
The function returns the value of:
     NO_NAME if the Widget Map_File_Box is optional and the box is left empty
     NO_FILE, FILE_EXISTS or NO_FILE_ACCESS
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 927
Get_data(Map_File_Box box,Text &text_data)
Name
Integer Get_data(Map_File_Box box,Text &text_data)
Description
Get the data of type Text from the Map_File_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 929
Set_data(Map_File_Box box,Text text_data)
Name
Panels and Widgets
Chapter 
Integer Set_data(Map_File_Box box,Text text_data)
Description
Set the data of type Text for the Map_File_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 928
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.21 Model_Box
The Model_Box is a panel field designed to select 12d Model models. If a model name is typed into 
the model box and <enter> pressed or a model selected from the model pop-up list, then the text in 
the Model_Box is validated.
A Model_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a model name or to display the model name if it is selected by the 
model select button. This information area is in the middle
and
(c)
a Model select button on the right.
A model name can be typed into the information area. Then hitting the <enter> key validates the 
model name.
 MB clicked in the information area starts a "Same As" selection. A string is then selected and the 
model name of the selected string name is placed in the information area.
Clicking  LB or  RB on the Model select button brings up the Select Model pop-up. Selecting a model 
from the pop-up list writes the model name in the information area and validation occurs.
Clicking  MB on the Model select button does nothing.
Model_Box
title area
information area
model name
Model select button
Panels and Widgets
Chapter 
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "model 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a model with the Model Select button sends a "model selected" command and the model 
name in message.
Create_model_box(Text title_text,Message_Box message,Integer mode)
Name
Model_Box Create_model_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Model_Box for inputting and validating Models. 
The Model_Box is created with the title title_text (see 5.61.10.21 Model_Box).
The Message_Box message is normally the message box for the panel and is used to display 
Model_Box validation messages.
If <enter> is typed into the Model_Box automatic validation is performed by the Model_Box 
according to mode. What the validation is, what messages are written to Message_Box, and what 
actions automatically occur, depend on the value of mode.
For example,
CHECK_MODEL_MUST_EXIST
7   // if the model exists, the message says "exists".
     // if it doesn’t exist, the messages says "ERROR"
The values for mode and their actions are listed in Appendix A (see  Model Mode).
If  LB is clicked on the icon at the right hand end of the Model_Box, a list of all existing models is 
placed in a pop-up. If a model is selected from the pop-up (using  LB), the model name is placed in 
the information area of the Model_Box and validation performed according to mode.
 MB for "Same As" also applies. That is, If  MB is clicked in the information area and then a string 
from a model on a view is selected, then the name of the model containing the selected string is 
written to the information area and validation performed according to mode.
The function return value is the created Model_Box. 
Special Note: 
#include "set_ups.h" must be in the macro code to define CHECK_MODEL_MUST_EXIST etc. 
ID = 848
Validate(Model_Box box,Integer mode,Model &result)
Name
Integer Validate(Model_Box box,Integer mode,Model &result)
Description
Panels and Widgets

Validate the contents of the Model_Box box and return the Model result. 
The value of mode will determine what validation occurs, what messages are written to the 
Message_Box, what actions are taken and what the function return value is.
The values for mode and the actions are listed in Appendix A (see  Model Mode).
The function return value depends on mode and are given in Appendix A (see  Model Mode).
A function return value of zero indicates that there is a drastic error.
Warning this is the opposite of most 12dPL function return values
Double Warning: most times the function return code is not zero even when you think it should be. 
The actual value of the function return code must be checked to see what is going on. For example, 
when mode = CHECK_MODEL_MUST_EXIST will return NO_MODEL if the model name is not 
blank and no model of that name exist (NO_MODEL does not equal zero).
ID = 880
Get_data(Model_Box box,Text &text_data)
Name
Integer Get_data(Model_Box box,Text &text_data)
Description
Get the data of type Text from the Model_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 885
Set_data(Model_Box box,Text text_data)
Name
Integer Set_data(Model_Box box,Text text_data)
Description
Set the data of type Text for the Model_Box box as the Text text_data.
A function return value of zero indicates the data was successfully set.
ID = 884
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.22 Name_Box
The Name_Box is a panel field designed to type in, or display, string names. If data is typed into the 
box, then it will be validated when <enter> is pressed.
A Name_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a string name or to display the string name if it is selected by the 
name select button. This information area is in the middle
and
(c)
a Name select button on the right.
A string name can be typed into the information area. Then hitting the <enter> key will validate the 
string name.
 MB clicked in the information area starts a "Same As" selection. A string is then selected and the 
name of the selected string name is placed in the information area.
Clicking  LB or  RB on the Name select button brings up the Select Name pop-up. Selecting the 
name from the pop-up list writes the name in the information area.
Name_Box
title area
information area
string name
Name select button
Panels and Widgets

Clicking  MB on the Name select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a Name with the Name Select button sends a "text selected" command and the Name in 
message.
Create_name_box(Text title_text,Message_Box message)
Name
Name_Box Create_name_box(Text title_text,Message_Box message)
Panels and Widgets
Chapter 
Description
Create an input Widget of type Name_Box. See 5.61.10.22 Name_Box.
The Name_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Name_Box validation messages.
The function return value is the created Name_Box. 
ID = 930
Validate(Name_Box box,Text &result)
Name
Integer Validate(Name_Box box,Text &result)
Description
Validate the contents of Name_Box box and return the Text result. 
The function returns the value of:
     NO_NAME if the Widget Name_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (0) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 931
Get_data(Name_Box box,Text &text_data)
Name
Integer Get_data(Name_Box box,Text &text_data)
Description
Get the data of type Text from the Name_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 933
Set_data(Name_Box box,Text text_data)
Name
Integer Set_data(Name_Box box,Text text_data)
Description
Set the data of type Text for the Name_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 932
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.23 Named_Tick_Box
The Named_Tick_Box is a panel field designed to be in only two states: 
          ticked (on) or not ticked (off).
A Named_Tick_Box is made up of two items:
(a)
a title area on the left with the user supplied title on it
and
(b)
a box that can display, or not display, a tick.
Clicking  LB anywhere along the length of the Named_Tick_Box from the title area to the tick box, 
will reverse the state of the tick. That is, a tick will go to no tick, and no tick will go to tick.
Clicking  MB or  RB anywhere along the Named_Tick_Box does nothing.
Note: A Named_Tick_Box cannot be made optional
Commands and Messages for Wait_on_Widgets
Clicking  LB anywhere in the Named_Tick_Box sends a "toggle tick" command and a blank 
message.
Nothing else sends any commands or messages.
Create_named_tick_box(Text title_text,Integer state,Text response)
Name
Named_Tick_Box Create_named_tick_box(Text title_text,Integer state,Text response)
Description
Create an input Widget of type Named_Tick_Box. See 5.61.10.23 Named_Tick_Box.
The Named_Tick_Box is created with the Text title_text.
The Integer state specifies the ticked/unticked state of the box:
 state  = 0 set the box as unticked
Named_Tick_Box
title area
tick box ticked (on)
tick box not ticked (off)
Named_Tick_Box
Click LB anywhere along the Named_Tick_Box the change the tick state
Panels and Widgets
Chapter 
     state  = 1                 set the box as ticked
The Text response returns the msg when calling the Wait_on_widgets function.
The function return value is the created Named_Tick_Box. 
ID = 849
Validate(Named_Tick_Box box,Integer &result)
Name
Integer Validate(Named_Tick_Box box,Integer &result)
Description
Validate the contents of Named_Tick_Box box and return the Integer result. 
 result  = 0 if the tick box is unticked
     result  = 1                 if the tick box is ticked
A function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 974
Set_data(Named_Tick_Box box,Integer state) 
Name
Integer Set_data(Named_Tick_Box box,Integer state) 
Description
Set the state of the Named_Tick_Box to 
 ticked if state = 1
             unticked          if state = 0
A function return value of zero indicates the data was successfully set.
ID = 2239
Get_data(Named_Tick_Box box,Text &text_data)
Name
Integer Get_data(Named_Tick_Box box,Text &text_data)
Description
Get the data of type Text from the Named_Tick_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 976
Set_data(Named_Tick_Box box,Text text_data)
Name
Integer Set_data(Named_Tick_Box box,Text text_data)
Description
Set the data of type Text for the Named_Tick_Box box to text_data.
A function return value of zero indicates the data was successfully set.
Panels and Widgets

ID = 975
Set_left_tick(Named_Tick_Box box,Integer left)
Name
Integer Set_left_tick(Named_Tick_Box box,Integer left)
Description
Set the position of the tick for the Named_Tick_Box box to the left if left is non-zero; right if left is 
zero.
A function return value of zero indicates the position was successfully set.
ID = 7983
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.24 New_Select_Box
The New_Select_Box is a panel field designed to select 12d Model strings.
Note that the New_Select_Box only picks strings and does not return information if a cursor pick is 
made. The 5.61.10.31 Select_Box allows for cursor picks.
The New_Select_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area in the middle where the name and model of the selected string are 
displayed
(c)
a String select button on the right.
plus
(d)
a screen select title that is displayed in the screen message area after the select button is 
selected.
Nothing can be typed into the information area but if  MB clicked in the information area starts a 
"Same As" selection. A string is then selected and the model and name of the selected string are 
displayed in the information area.
Clicking  LB on the string select button and then selecting the string. The model and name of the 
string are then displayed in the information area.
Clicking  RB on the String select button brings up the string select Choice box.
Clicking  MB on the String select button does nothing.
Commands and Messages for Wait_on_Widgets
New_Select_Box
title area
information area
model and string name displayed
after a string is selected
String select button
screen select title displayed in the
screen message area
Panels and Widgets

Clicking  LB on the String Select button:
As the mouse is moved over a view, a "motion select" command is sent with the view 
coordinates and view name as text in message.
Once in the select:
if a string is clicked on with  LB, a "pick select" command is sent with the name of the view that the 
string was selected in, in message. if the string is accepted ( MB), an "accept select" command is sent 
with the view name (in quotes) in message, or if  RB is clicked and Cancel selected from the Pick Ops 
menu, then a "cancel select" command is sent with nothing in message.
if a string is clicked on with  MB (the pick and accept in one click method), a "pick select" command is 
sent with the name of the view that the string was selected in, in message, followed by an "accept 
select" command with the view name (in quotes) in message.
Nothing else sends any commands or messages.
Create_new_select_box(Text title_text,Text select_title,Integer mode,Message_Box 
message) 
Name
New_Select_Box Create_new_select_box(Text title_text,Text select_title,Integer mode,Message_Box message)
Description
Create an input Widget of type New_Select_Box. See 5.61.10.24 New_Select_Box.
The New_Select_Box is created with the title title_text.
The Select title displayed in the screen message area is select_title.
The value of mode is listed in the Appendix A - Select mode. See  Select Mode.
The Message_Box message is normally the message box for the panel and is used to display 
New_Select_Box validation messages.
Note that the New_Select_Box only picks strings and does not return information if a cursor pick is 
made. The 5.61.10.31 Select_Box allows for cursor picks.
The function return value is the created New_Select_Box.
ID = 2240
Validate(New_Select_Box select,Element &string) 
Name
Integer Validate(New_Select_Box select,Element &string) 
Description
Validate the contents of New_Select_Box select and return the selected Element in string. 
The function returns the value of:
     NO_NAME if the Widget New_Select_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
Panels and Widgets
Chapter 
ID = 2241
Validate(New_Select_Box select,Element &string,Integer silent) 
Name
Integer Validate(New_Select_Box select,Element &string,Integer silent) 
Description
Validate the contents of New_Select_Box select and return the selected Element in string. 
If silent = 0, and there is an error, a message is written and the cursor goes back to the box.
If silent = 1 and there is an error, no message or movement of cursor is done.
The function returns the value of:
     NO_NAME if the Widget New_Select_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2242
Set_data(New_Select_Box select,Element string)
Name
Integer Set_data(New_Select_Box select,Element string) 
Description
Set the data of for the New_Select_Box select to string.
A function return value of zero indicates the data was successfully set.
ID = 2243
Set_data(New_Select_Box select,Text model_string) 
Name
Integer Set_data(New_Select_Box select,Text model_string)
Description
Set the Element of the New_Select_Box box by giving the model name and string name as a Text 
model_string in the form "model_name model_id string_name string_id" with tab separating.
A function return value of zero indicates the data was successfully set.
ID = 2244
Get_data(New_Select_Box select,Text &model_string) 
Name
Integer Get_data(New_Select_Box select,Text &model_string) 
Description
Get the model and string name of the Element in the New_Select_Box box and return it in Text 
Panels and Widgets

model_string.
Note: the model and string name is in the form "model_name model_id string_name string_id" with 
tab separating so only one Text is required.
A function return value of zero indicates the data was successfully returned.
ID = 2245
Select_start(New_Select_Box select) 
Name
Integer Select_start(New_Select_Box select) 
Description
Starts the string selection for the New_Select_Box select. This is the same as if the button on the 
New_Select_Box had been clicked.
A function return value of zero indicates the start was successful.
ID = 3783
Select_end(New_Select_Box select) 
Name
Integer Select_end(New_Select_Box select) 
Description
Cancels the string selection that is running for the New_Select_Box select. This is the same as if 
Cancel had been selected from the Pick Ops menu.
A function return value of zero indicates the end was successful.
ID = 3784
Set_select_type(New_Select_Box select,Text type)
Name
Integer Set_select_type(New_Select_Box select,Text type)
Description
Set the string selection type type for the New_Select_Box select. For example “Alignment”, “3d”.
A function return value of zero indicates the type was successfully set.
ID = 3776
Set_select_snap_mode(New_Select_Box select,Integer snap_control)
Name
Integer Set_select_snap_mode(New_Select_Box select,Integer snap_control)
Description
Set the snap control for the New_Select_Box select to snap_control.
 snap_control                control value
Ignore_Snap                    = 0
User_Snap                      = 1
Program_Snap                = 2
Panels and Widgets
Chapter 
A function return value of zero indicates the snap control was successfully set.
ID = 3777
Set_select_snap_mode(New_Select_Box select,Integer snap_mode,Integer 
snap_control,Text snap_text)
Name
Integer Set_select_snap_mode(New_Select_Box select,Integer snap_mode,Integer snap_control,Text 
snap_text)
Description
Set the snap mode snap_mode and snap control snap_control for the New_Select_Box select.
Where snap_mode is:
Failed_Snap     = -1
No_Snap          = 0
Point_Snap      = 1
Line_Snap       = 2
Grid_Snap             = 3
Intersection_Snap = 4
Cursor_Snap         = 5
Name_Snap           = 6
Tin_Snap               = 7
Model_Snap          = 8
Height_Snap         = 9
Segment_Snap      = 11
Text_Snap             = 12
Fast_Snap           = 13
Fast_Accept         = 14
and snap_control is
Ignore_Snap      = 0
User_Snap         = 1
Program_Snap   = 2
The snap_text must be string name; tin name, model name respectively, otherwise, leave the 
snap_text blank (“”).
A function return value of zero indicates the snap mode was successfully set.
ID = 3778
Set_select_direction(New_Select_Box select,Integer dir)
Name
Integer Set_select_direction(New_Select_Box select,Integer dir)
Description
Set the selection direction dir for the New_Select_Box select.
Dir Value
Pick direction
 1
the direction of the string
-1
against the direction of the string
A function return value of zero indicates the direction was successfully set.
ID = 3779
Panels and Widgets

Get_select_direction(New_Select_Box select,Integer &dir)
Name
Integer Get_select_direction(New_Select_Box select,Integer &dir)
Description
Get the selection direction dir from the string selected for the New_Select_Box select.
The returned dir type must be Integer.
If select without direction, the returned dir is 1, otherwise, the returned dir is:
Dir Value
Pick direction
 1
the direction of the string
-1
against the direction of the string
A function return value of zero indicates the direction was successfully returned.
ID = 3780
Set_select_coordinate(New_Select_Box select,Real x,Real y,Real z,Real ch,Real ht)
Name
Integer Set_select_coordinate(New_Select_Box select,Real x,Real y,Real z,Real ch,Real ht)
Description
Set the coordinates, chainage and height of the selected snap point of the string for the 
New_Select_Box select.
The input values of x, y, z, ch, and ht are of type Real.
A function return value of zero indicates the values were successfully set.
ID = 3781
Get_select_coordinate(New_Select_Box select,Real &x,Real &y,Real &z,Real 
&ch,Real &ht)
Name
Integer Get_select_coordinate(New_Select_Box select,Real &x,Real &y,Real &z,Real &ch,Real &ht)
Description
Get the coordinates, chainage and height of the selected snap point of the string for the 
New_Select_Box select.
The return values of x, y, z, ch, and ht are of type Real.
A function return value of zero indicates the values were successfully returned.
ID = 3782
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.25 New_XYZ_Box
The New_XYZ_Box is a panel field designed to get x, y and z coordinates and the X Y and Z 
coordinates are each displayed in their own information areas.
Also see 5.61.10.48 XYZ_Box where the XYZ values are displayed in the one information area, 
separated by spaces.
The New_XYZ_Box is made up of:
(a)
a title area on the left with the user supplied title on it
(b)
a X coordinate box consisting of the title X coordinate, a X information area and a X select 
button.
(c)
a Y coordinate box consisting of the title Y coordinate, a Y information area and a Y select 
button.
(d)
a Z coordinate box consisting of the title Z coordinate, a Z information area and a Z select 
button.
and
(e)
a XYZ select button on the right.
A X coordinate can be typed into the X information area. Then hitting the <enter> key will validate 
that the value is a Real number.
Clicking  LB or  RB on the X select button brings up the Measure X pop-up menu. Selecting an 
option from the Measure X menu and making a measure displays the X coordinate in the X 
information area.
Clicking  MB on the X select button does nothing.
New_XYZ_Box
title area
X information area
X select button
X coordinate box
Y coordinate box
Z coordinate box
XYZ select button
Y select button
Z select button
Y information area
Z information area
X coordinate
Y coordinate
Z coordinate
Panels and Widgets

Similarly for Y and Z coordinates.
Clicking  LB on the XYZ select button starts the XYZ Pick option and after selecting a position, the X, 
Y and Z are displayed in the X, Y and Z information areas respectively. 
Clicking  RB on the XYZ select button brings up the XYZ Ops pop-up menu. Selecting the Pick xyz 
option starts the XYZ Pick option and after selecting a position, the X, Y and Z are displayed in the 
X, Y and Z information areas respectively.
Clicking  MB on the XYZ select button does nothing.
Commands and Messages for Wait_on_Widgets
LJG? The New_XYZ_Box is actually made up of 4 widgets. So how do you know the ids?. The id of 
the New_XYZ_Box returns he id of the Select XYZ button. 
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking an X coordinate with the X Select button sends a "real selected" command and nothing in 
message.
Picking an Y coordinate with the Y Select button sends a "real selected" command and nothing in 
message.
Picking an Z coordinate with the Z Select button sends a "real selected" command and nothing in 
message.
Picking a coordinate with the XYZ Select button sends a "coordinate accepted" command with 
nothing in message.
Create_new_xyz_box(Text title_text,Message_Box message) 
Name
New_XYZ_Box Create_new_xyz_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type New_XYZ_Box. See 5.61.10.25 New_XYZ_Box.
The New_XYZ_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
New_XYZ_Box validation messages.
The function return value is the created New_XYZ_Box.
Panels and Widgets
Chapter 
ID = 2252
Validate(New_XYZ_Box box,Real &x,Real &y,Real &z) 
Name
Integer Validate(New_XYZ_Box box,Real &x,Real &y,Real &z) 
Description
Validate the contents of the New_XYZ_Box box and check that it decodes to three Reals.
The three Reals are returned in x, y, and z.
The function returns the value of:
     NO_NAME if the Widget New_XYZ_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and x, y and z are valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2253
Get_data(New_XYZ_Box box,Text &text_data) 
Name
Integer Get_data(New_XYZ_Box box,Text &text_data) 
Description
Get the data of type Text from the New_XYZ_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 2254
Set_data(New_XYZ_Box box,Real x,Real y,Real z) 
Name
Integer Set_data(New_XYZ_Box box,Real x,Real y,Real z) 
Description
Set the x y z data (all of type Real) for the New_XYZ_Box box to the values x, y and z.
A function return value of zero indicates the data was successfully set.
ID = 2255
Set_data(New_XYZ_Box box,Text text_data) 
Name
Integer Set_data(New_XYZ_Box box,Text text_data) 
Description
Set the data of type Text for the New_XYZ_Box box to text_data.
A function return value of zero indicates the data was successfully set.
Panels and Widgets

ID = 2256
Panels and Widgets
Chapter 
5.61.10.26 Plotter_Box
Create_plotter_box(Text title_text,Message_Box message)
Name
Plotter_Box Create_plotter_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Plotter_Box. See 5.61.10.26 Plotter_Box.
The Plotter_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Plotter_Box validation messages.
The function return value is the created Plotter_Box. 
ID = 934
Validate(Plotter_Box box,Text &result)
Name
Integer Validate(Plotter_Box box,Text &result)
Description
Validate the contents of Plotter_Box box and return the Text result. 
The function returns the value of:
     NO_NAME if the Widget Plotter_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (0) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 935
Get_data(Plotter_Box box,Text &text_data)
Name
Integer Get_data(Plotter_Box box,Text &text_data)
Description
Get the data of type Text from the Plotter_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 937
Set_data(Plotter_Box box,Text text_data)
Name
Integer Set_data(Plotter_Box box,Text text_data)
Description
Set the data of type Text for the Plotter_Box box to text_data.
Panels and Widgets

A function return value of zero indicates the data was successfully set.
ID = 936
Validate(Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text 
&plotter_type) 
Name
Integer Validate(Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text &plotter_type)
Description
<no description>
ID = 2465
Set_data(Plotter_Box box,Text plotter_mode,Text plotter_names,Text plotter_type) 
Name
Integer Set_data(Plotter_Box box,Text plotter_mode,Text plotter_names,Text plotter_type)
Description
<no description>
ID = 2466
Get_data(Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text 
&plotter_type) 
Name
Integer Get_data(Plotter_Box box,Text &plotter_mode,Text &plotter_names,Text &plotter_type)
Description
<no description>
ID = 2467
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.27 Polygon_Box
Polygon_Box Create_polygon_box(Text title_text,Text select_title,Integer 
mode,Message_Box message) 
Name
Polygon_Box Create_polygon_box(Text title_text,Text select_title,Integer mode,Message_Box message)
Description
Create an input Widget of type Polygon_Box. See 5.61.10.27 Polygon_Box.
The Polygon_Box is created with the title title_text.
The text in the screen message area is defined by select_title, if select_title is blank then the 
default text "select polygon" will be used.
The parameter mode is not yet used for now.
The Message_Box message is normally the message box for the panel and is used to display 
Polygon_Box validation messages.
The function return value is the created Polygon_Box.
ID = 2246
Validate(Polygon_Box select,Element &string) 
Name
Integer Validate(Polygon_Box select,Element &string) 
Description
Validate the contents of Polygon_Box select and return the selected Element in string. 
If there is an error, a message is written and the cursor goes back to the Polygon_Box.
The function returns the value of:
     NO_NAME if the Widget Polygon_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2247
Validate(Polygon_Box select,Element &string,Integer silent) 
Name
Integer Validate(Polygon_Box select,Element &string,Integer silent) 
Description
Validate the contents of Polygon_Box select and return the selected Element in string. 
If silent = 0, and there is an error, a message is written and the cursor goes back to the
 Polygon_Box.
If silent = 1 and there is an error, no message or movement of cursor is done.
The function returns the value of:
Panels and Widgets

     NO_NAME if the Widget Polygon_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2248
Set_data(Polygon_Box select,Element string) 
Name
Integer Set_data(Polygon_Box select,Element string) 
Description
Set the data of type Element for the Polygon_Box select to string.
A function return value of zero indicates the data was successfully set.
ID = 2249
Set_data(Polygon_Box select,Text string_name) 
Name
Integer Set_data(Polygon_Box select,Text string_name) 
Description
Set the data of type Text for the Polygon_Box select to string_name.
A function return value of zero indicates the data was successfully set.
ID = 2250
Get_data(Polygon_Box select,Text &string) 
Name
Integer Get_data(Polygon_Box select,Text &string) 
Description
Get the data of type Text from the Polygon_Box select and return it in string.
A function return value of zero indicates the data was successfully returned.
ID = 2251
From v15 onward, each Polygon_Box has a property to control the selection of polygons with holes. 
If the property (named allow in the bellow macro call) is 0, then the validation of the Polygon_Box 
will fail on any polygon with holes. If the property is 1, then the validation will work on polygons with 
and without holes. The two following macro calls will not work for v14.
Set_allow_holes(Polygon_Box select,Integer allow)
Name
Integer Set_allow_holes(Polygon_Box select,Integer allow)
Panels and Widgets
Chapter 
Description
Set the property of allowing polygon with holes for Polygon_Box select with the value of allow.
A function return value of zero indicates the property was successfully changes.
ID = 3801
Get_allow_holes(Polygon_Box select,Integer &allow)
Name
Integer Get_allow_holes(Polygon_Box select,Integer &allow)
Description
Get the property of allowing polygon with holes for Polygon_Box select and return it in allow.
A function return value of zero indicates the property was successfully changes.
ID = 3802
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.28 Real_Box
The Real_Box is a panel field designed to enter real numbers where a real value may be given as a 
decimal, or in exponential format such as 1.3e10 or 1.3d3. So the real number can only contain +, -, 
decimal point, e, d and the numbers 0 to 9. No other characters can be typed into the Real_Box.
A Real_Box is a panel field that is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
a information area to type in the real number. This information area is in the middle
and
(c)
a Real select button on the right.
Data is typed into the information area and hitting the <enter> key will validate the typed data. Only 
real values can be typed into the information area (that is, the real number can only contain +, -, 
decimal point, e, d and the numbers 0 to 9).
Clicking  LB or  RB on the Real Select button brings up the Measure pop-up menu. Selecting an 
option from the Measure menu and making a measure displays the real number in the information 
area.
Clicking  MB on the Real select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "real 
selected" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Clicking  LB or  RB on the Real Select button and accepting a value sends a "real selected" 
command and nothing in message.
Real_Box
title area
information area
typed data
Real Select button
Panels and Widgets
Chapter 
Create_real_box(Text title_text,Message_Box message)
Name
Real_Box Create_real_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Real_Box. See 5.61.10.28 Real_Box.
The Real_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Real_Box validation messages.
The function return value is the created Real_Box.
ID = 902
Validate(Real_Box box,Real &result)
Name
Integer Validate(Real_Box box,Real &result)
Description
Validate the contents of Real_Box box and return the Real result. 
The function returns the value of:
     NO_NAME if the Widget Real_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 903
Get_data(Real_Box box,Text &text_data)
Name
Integer Get_data(Real_Box box,Text &text_data)
Description
Get the data of type Text from the Real_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 905
Set_data(Real_Box box,Real real_data)
Name
Integer Set_data(Real_Box box,Real real_data)
Description
Set the data of type Real for the Real_Box box to real_data.
A function return value of zero indicates the data was successfully set.
ID = 904
Panels and Widgets

Set_data(Real_Box box,Text text_data) 
Name
Integer Set_data(Real_Box box,Text text_data) 
Description
Set the data of type Text for the Real_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1516
Set_precision(Real_Box box,Integer precision) 
Name
Integer Set_precision(Real_Box box,Integer precision) 
Description
Set the precision display for the Real_Box box to precision.
A function return value of zero indicates the data was successfully set.
ID = 7986
Set_default_data(Real_Box box,Real data) 
Name
Integer Set_default_data(Real_Box box,Real data)
Description
Set the default data for the Real_Box box to data.
A function return value of zero indicates the data was successfully set.
ID = 7991
Set_default_data(Real_Box box,Real data,Integer validate_return)
Name
Integer Set_default_data(Real_Box box,Real data,Integer validate_return)
Description
Set the default data for the Real_Box box to data, the special result of validation of the box when 
the value is of the default will be validate_return.
A function return value of zero indicates the data was successfully set.
ID = 7992
Get_default_data(Real_Box box,Real &data,Integer &validate_return)
Name
Integer Get_default_data(Real_Box box,Real &data,Integer &validate_return)
Description
Get the default data for the Real_Box box and return it in data, the special result of validation of the 
box when the value is of the default will be validate_return.
Panels and Widgets
Chapter 
A function return value of zero indicates the data was successfully get.
ID = 7993
Clear_default_data(Real_Box box)
Name
Integer Clear_default_data(Real_Box box)
Description
Clear the default data for the Real_Box box.
A function return value of zero indicates the clear was successful.
ID = 7994
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.29 Report_Box
The Report_Box is a panel field designed to select or create, disk report files. If a file name is typed 
into the box, then it will be validated when <enter> is pressed.
A Report_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a file name or to display the file name if it is selected by the File 
select button. This information area is in the middle
and
(c)
a File select button on the right.
A file name can be typed into the information area. Then hitting the <enter> key will validate the file 
name.
Clicking  LB or  RB on the File select button brings up the Folder pop-up with the wild card for 
showing files set to *.rpt. Files with other ending can be created/selected but the default for a 
Report_Box is "*.rpt".
Selecting a file from the pop-up list writes the file name to the information area.
Clicking  MB on the File select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Report_Box
title area
information area
report file name
File select button
Panels and Widgets
Chapter 
Pressing the Enter key in the information area sends a "keystroke" command and then a "file 
selected" command and the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a file with the Folder Select button sends a " file selected" command and the full path name 
of the file in message.
Create_report_box(Text title_text,Message_Box message,Integer mode)
Name
Report_Box Create_report_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Report_Box. See 5.61.10.29 Report_Box.
The Report_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Report_Box validation messages.
The value of mode is listed in the Appendix A - File mode.
The function return value is the created Report_Box. 
ID = 938
Validate(Report_Box box,Integer mode,Text &result)
Name
Integer Validate(Report_Box box,Integer mode,Text &result)
Description
Validate the contents of Report_Box box and return the Text result. 
The value of mode is listed in the Appendix A - File mode. See  File Mode
The function returns the value of:
     NO_NAME if the Widget Report_Box is optional and the box is left empty
     NO_FILE, FILE_EXISTS or NO_FILE_ACCESS
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 939
Get_data(Report_Box box,Text &text_data)
Name
Integer Get_data(Report_Box box,Text &text_data)
Panels and Widgets

Description
Get the data of type Text from the Report_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 941
Set_data(Report_Box box,Text text_data)
Name
Integer Set_data(Report_Box box,Text text_data)
Description
Set the data of type Text for the Report_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 940
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.30 Screen_Text
The Screen_Text is a panel field designed to simply place some text on the panel.
Commands and Messages for Wait_on_Widgets
No commands or messages are send from the Screen_Text Widget.
Create_screen_text(Text text)
Name
Screen_Text Create_screen_text(Text text)
Description
Create a Screen_Text with the Text text. See 5.61.10.30 Screen_Text.
The function return value is the created Screen_Text.
ID = 1369
Set_data(Screen_Text widget,Text text_data)
Name
Integer Set_data(Screen_Text widget,Text text_data)
Description
Set the data of type Text for the Screen_Text widget to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1371
Get_data(Screen_Text widget,Text &text_data)
Name
Integer Get_data(Screen_Text widget,Text &text_data)
Description
Get the data of type Text from the Screen_Text widget and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1370
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Screen_Text
screen text
Panels and Widgets

5.61.10.31 Select_Box
The Select_Box is a panel field designed to select 12d Model strings and also cursor picks.
The Select_Box creates a panel field which is made up two items:
(a)
a Select button on the left with the user supplied title on it
(b)
an information area on the right where the name and model of the selected string are displayed
plus 
(c)
a screen select title that is displayed in the screen message area after the select button is 
selected.
A string is selected by first clicking  LB on the button and then selecting the string (with  MB or 
accept from the Pick Ops menu). The model and name of the selected string is then displayed in 
the information area.
A cursor pick can also be made first clicking  LB on the button and then  MB when at the required 
cursor position. For a cursor pick, nothing is displayed in the information area.
After the select is started, the screen select title for the button is displayed in the screen message 
area.
Clicking  MB and  RB on the select button does nothing.
Note: The New_Select_Box is normally used instead of the Select_Box. See 5.61.10.24 
New_Select_Box
Commands and Messages for Wait_on_Widgets
Clicking  LB on the String Select button:
sends a "start select" command with nothing in message, then as the mouse is moved over a 
view, a "motion select" command is sent and the view coordinates and view name in message.
Once in the select:
if a string is clicked on with  LB, or a cursor pick is made, a "pick select" command is sent with the 
name of the view that the string was selected in, in message. if the string or cursor pick is accepted ( 
MB), an "accept select" command is sent with the view name (in quotes) in message, or if  RB is 
clicked and Cancel selected from the Pick Ops menu, then a "cancel select" command is sent with 
nothing in message.
if a string, or cursor pick, is clicked on with  MB (the pick and accept in one click method), a "pick 
select" command is sent with the name of the view that the string or cursor pick was selected in, in 
message, followed by an "accept select" command with the view name (in quotes) in message.
Select_Box
Select button with title
information area - display only
model and string name displayed
after a string s selected
screen select title displayed in the
screen message area
Panels and Widgets
Chapter 
Nothing else sends any commands or messages.
 Create_select_box(Text title_text,Text select_title,Integer mode,Message_Box 
message)
Name
Select_Box Create_select_box(Text title_text,Text select_title,Integer mode,Message_Box message)
Description
Create an input Widget of type Select_Box.
The Select_Box is created with the title title_text.
The Select title displayed in the screen message area is select_title.
The value of mode is listed in the Appendix A - Select mode. See  Select Mode.
The Message_Box message is normally the message box for the panel and is used to display string 
select validation messages.
The function return value is the created Select_Box.
ID = 882
Validate(Select_Box select,Element &string)
Name
Integer Validate(Select_Box select,Element &string)
Description
Validate the Element string in the Select_Box select. 
The function returns the value of:
     NO_NAME if the Widget Select_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 981
Validate(Select_Box select,Element &string,Integer silent)
Name
Integer Validate(Select_Box select,Element &string,Integer silent)
Description
Validate the Element string in the Select_Box select.
If silent = 0, and there is an error, a message is written and the cursor goes back to the box.
If silent = 1 and there is an error, no message or movement of cursor is done.
The function returns the value of SELECT_STRING indicates the string is selected successfully.
ID = 1376
Panels and Widgets

Set_data(Select_Box select,Text model_string)
Name
Integer Set_data(Select_Box select,Text model_string)
Description
Set the Element in the Select_Box select by giving the model name and string name as a Text 
model_string in the form "model_name->string_name"
.A function return value of zero indicates the data was successfully set.
ID = 982
Set_data(Select_Box select,Element string) 
Name
Integer Set_data(Select_Box select,Element string) 
Description
Set the Element for the Select_Box select to string.
A function return value of zero indicates the data was successfully set.
ID = 1174
Get_data(Select_Box select,Text &string)
Name
Integer Get_data(Select_Box select,Text &string)
Description
Get the model and string name of the Element in Select_Box select and return it in the Text 
model_string, 
Note: the model and string name is in the form "model_name->string_name" so only one Text is 
required.
A function return value of zero indicates the data was successfully returned.
ID = 983
Select_start(Select_Box select) 
Name
Integer Select_start(Select_Box select) 
Description
Starts the string selection for the Select_Box select. This is the same as if the button on the 
Select_Box had been clicked.
A function return value of zero indicates the start was successful.
ID = 1169
Select_end(Select_Box select) 
Name
Integer Select_end(Select_Box select) 
Panels and Widgets
Chapter 
Description
Cancels the string selection that is running for the Select_Box select. This is the same as if Cancel 
had been selected from the Pick Ops menu.
A function return value of zero indicates the end was successful.
ID = 1170
Set_select_type(Select_Box select,Text type)
Name
Integer Set_select_type(Select_Box select,Text type)
Description
Set the string selection type type for the Select_Box select. For example “Alignment”, “3d”.
A function return value of zero indicates the type was successfully set.
ID = 1048
Set_select_snap_mode(Select_Box select,Integer snap_control)
Name
Integer Set_select_snap_mode(Select_Box select,Integer snap_control)
Description
Set the snap control for the Select_Box select to snap_control.
 snap_control                control value
Ignore_Snap                    = 0
User_Snap                      = 1
Program_Snap                = 2
A function return value of zero indicates the snap control was successfully set.
ID = 1049
Set_select_snap_mode(Select_Box select,Integer snap_mode,Integer 
snap_control,Text snap_text)
Name
Integer Set_select_snap_mode(Select_Box select,Integer snap_mode,Integer snap_control,Text snap_text)
Description
Set the snap mode snap_mode and snap control snap_control for the Select_Box select.
Where snap_mode is:
Failed_Snap     = -1
No_Snap          = 0
Point_Snap      = 1
Line_Snap       = 2
Grid_Snap             = 3
Intersection_Snap = 4
Cursor_Snap         = 5
Name_Snap           = 6
Tin_Snap               = 7
Model_Snap          = 8
Height_Snap         = 9
Panels and Widgets

Segment_Snap      = 11
Text_Snap             = 12
Fast_Snap           = 13
Fast_Accept         = 14
and snap_control is
Ignore_Snap      = 0
User_Snap         = 1
Program_Snap   = 2
The snap_text must be string name; tin name, model name respectively, otherwise, leave the 
snap_text blank (“”).
A function return value of zero indicates the snap mode was successfully set.
ID = 1045
Set_select_direction(Select_Box select,Integer dir)
Name
Integer Set_select_direction(Select_Box select,Integer dir)
Description
Set the selection direction dir for the Select_Box select.
Dir Value
Pick direction
 1
the direction of the string
-1
against the direction of the string
A function return value of zero indicates the direction was successfully set.
ID = 1447
Get_select_direction(Select_Box select,Integer &dir)
Name
Integer Get_select_direction(Select_Box select,Integer &dir)
Description
Get the selection direction dir from the string selected for the Select_Box select.
The returned dir type must be Integer.
If select without direction, the returned dir is 1, otherwise, the returned dir is:
Dir Value
Pick direction
 1
the direction of the string
-1
against the direction of the string
A function return value of zero indicates the direction was successfully returned.
ID = 1051
Set_select_coordinate(Select_Box select,Real x,Real y,Real z,Real ch,Real ht)
Name
Integer Set_select_coordinate(Select_Box select,Real x,Real y,Real z,Real ch,Real ht)
Description
Set the coordinates, chainage and height of the selected snap point of the string for the Select_Box 
Panels and Widgets
Chapter 
select.
The input values of x, y, z, ch, and ht are of type Real.
A function return value of zero indicates the values were successfully set.
ID = 1448
Get_select_coordinate(Select_Box select,Real &x,Real &y,Real &z,Real &ch,Real 
&ht)
Name
Integer Get_select_coordinate(Select_Box select,Real &x,Real &y,Real &z,Real &ch,Real &ht)
Description
Get the coordinates, chainage and height of the selected snap point of the string for the Select_Box 
select.
The return values of x, y, z, ch, and ht are of type Real.
A function return value of zero indicates the values were successfully returned.
ID = 1052
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.32 Select_Boxes
The Select_Boxes is a panel item that contains a number of selection boxes.
Each of the selection boxes is made up two items:
(a)
a select button on the left with the user supplied title on it
(b)
an information area on the right where the name and model of the selected string are displayed
plus
(c)
a screen select title that is displayed in the screen message area after the select button is 
selected.
A string is selected by first clicking  LB on one of the buttons and then selecting the string. The 
model and name of the selected string is then displayed in the information area for that button.
After the select is started, the screen select title for that button is displayed in the screen message 
area.
Clicking  MB and  RB on the select buttons does nothing.
Commands and Messages for Wait_on_Widgets
Select_Boxes consists of a number of selection boxes. 
For the i’th selection box of the Select_Boxes:
Clicking  LB on the i’th Select button:
sends a "start select i" command with nothing in message, then as the mouse is moved over a 
view, a "motion select i" command is sent and the view coordinates and view name in message.
Once in the select:
if a string is clicked on with  LB, a "pick select i" command is sent with the name of the view that the 
string was selected in, in message. if the string is accepted ( MB), an "accept select i" command is sent 
with the view name (in quotes) in message, or if  RB is clicked and Cancel selected from the Pick Ops 
menu, then a "cancel select i" command is sent with nothing in message.
if a string is clicked on with  MB (the pick and accept in one click method), a "pick select i" command 
is sent with the name of the view that the string was selected in, in message, followed by an "accept 
select i" command with the view name (in quotes) in message.
Nothing else sends any commands or messages.
Select_Boxes
select buttons with titles
information areas - display only
model and string name displayed
after a string s selected
screen select title displayed in the
screen message area
Panels and Widgets
Chapter 
Create_select_boxes(Integer no_boxes,Text title_text[],Text select_title[],Integer 
mode[],Message_Box message)
Name
Select_Boxes Create_select_boxes(Integer no_boxes,Text title_text[],Text select_title[],Integer 
mode[],Message_Box message)
Description
Create an input Widget of type Select_Boxes which is actually a collection of 0 or more boxes that 
each acts like a Select_Box. See 5.61.10.32 Select_Boxes.
no_boxes indicates the number of boxes in the boxes array.
The Select_Boxes are created with the titles given in the array title_text[].
The Screen select titles displayed in the screen message area are given in the array select_title[].
The value of mode[] is listed in the Appendix A - Select mode.
The Message_Box message is used to display the select information.
The function return value is the created Select_Boxes.
ID = 883
Validate(Select_Boxes select,Integer n,Element &string)
Name
Integer Validate(Select_Boxes select,Integer n,Element &string) 
Description
Validate the nth Element string in the Select_Boxes select. 
The function returns the value of:
     NO_NAME if the n’th box of the New_Select_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 984
Validate(Select_Boxes select,Integer n,Element &string,Integer silent)
Name
Integer Validate(Select_Boxes select,Integer n,Element &string,Integer silent)
Description
Validate the nth Element string in the Select_Boxes select. 
If silent = 0, and there is an error, a message is written and the cursor goes back to the box.
If silent = 1 and there is an error, no message or movement of cursor is done.
The function returns the value of:
     NO_NAME if the n’th box of the New_Select_Box is optional and the box is left empty
Panels and Widgets

     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1377
Set_data(Select_Boxes select,Integer n,Text model_string)
Name
Integer Set_data(Select_Boxes select,Integer n,Text model_string)
Description
Set the Element of the n’th box in the Select_Boxes select by giving the model name and string 
name as a Text model_string in the form "model_name->string_name".
A function return value of zero indicates the data was successfully set.
ID = 985
Set_data(Select_Boxes select,Integer n,Element string) 
Name
Integer Set_data(Select_Boxes select,Integer n,Element string) 
Description
Set the data of type Element for the n’th box in the Select_Boxes select to string.
A function return value of zero indicates the data was successfully set.
ID = 1175
Get_data(Select_Boxes select,Integer n,Text &model_string)
Name
Integer Get_data(Select_Boxes select,Integer n,Text &model_string)
Description
Get the model and string name of the Element in the n’th box of the Select_Boxes select. and 
return it in the Text model_string, 
Note: the model and string name is in the form "model_name->string_name" so only one Text is 
required.
A function return value of zero indicates the data was successfully returned.
ID = 986
Select_start(Select_Boxes select,Integer n) 
Name
Integer Select_start(Select_Boxes select,Integer n) 
Description
Starts the string selection for the n’th box of the Select_Boxes select. This is the same as if the 
button on the n’th box of Select_Boxes had been clicked.
Panels and Widgets
Chapter 
A function return value of zero indicates the start was successful.
ID = 1171
Select_end(Select_Boxes select,Integer n) 
Name
Integer Select_end(Select_Boxes select,Integer n) 
Description
Cancels the string selection that is running for the n’th box of the Select_Boxes n’th box of the 
Select_Boxes select. This is the same as if Cancel had been selected from the Pick Ops menu.
A function return value of zero indicates the end was successful.
ID = 1172
Set_select_type(Select_Boxes select,Integer n,Text type)
Name
Integer Set_select_type(Select_Boxes select,Integer n,Text type)
Description
Set the string selection for the n’th box of the Select_Boxes select to type. For example 
“Alignment”, “3d”.
A function return value of zero indicates the type was successfully set.
ID = 1053
Set_select_snap_mode(Select_Boxes select,Integer n,Integer control)
Name
Integer Set_select_snap_mode(Select_Boxes select,Integer n,Integer control)
Description
Set the snap control for n’th box of the Select_Boxes select to control.
snap control                      control value
   Ignore_Snap                             0
   User_Snap                                
   Program_Snap                         2
A function return value of zero indicates the snap control was successfully set.
ID = 1054
Set_select_snap_mode(Select_Boxes select,Integer n,Integer snap_mode,Integer 
snap_control,Text snap_text)
Name
Integer Set_select_snap_mode(Select_Boxes select,Integer n,Integer snap_mode,Integer snap_control,Text 
snap_text)
Description
Set the snap mode mode and snap control snap_control for the nth box of the Select_Boxes 
select.
Panels and Widgets

When snap mode is:
    Name_Snap                    6
   Tin_Snap                          7
   Model_Snap                     8
the snap_text must be string name; tin name, model name respectively, otherwise, leave the 
snap_text blank (“”).
A function return value of zero indicates the snap mode was successfully set.
ID = 1055
Set_select_direction(Select_Boxes select,Integer n,Integer dir)
Name
Integer Set_select_direction(Select_Boxes select,Integer n,Integer dir)
Description
Set the selection direction dir of the string selected for the n’th box of the Select_Boxes select.
The input dir type must be Integer.
Dir Value                Pick direction
 1                            the direction of the string
-1                            against the direction of the string
A function return value of zero indicates the direction was successfully set.
ID = 1449
Get_select_direction(Select_Boxes select,Integer n,Integer &dir)
Name
Integer Get_select_direction(Select_Boxes select,Integer n,Integer &dir)
Description
Get the selection direction dir of the string selected for the n’th box of the Select_Boxes select.
The returned dir type must be Integer.
If select without direction, the returned dir is 1, otherwise, the returned dir is:
Dir Value                Pick direction
 1                            the direction of the string
-1                            against the direction of the string
A function return value of zero indicates the direction was successfully returned.
ID = 1056
Set_select_coordinate(Select_Boxes select,Integer n,Real x,Real y,Real z,Real ch,Real 
ht)
Name
Integer Set_select_coordinate(Select_Boxes select,Integer n,Real x,Real y,Real z,Real ch,Real ht)
Description
Panels and Widgets
Chapter 
Get the coordinate, chainage and height of the snap point of the string selected for the n’th box of 
the Select_Boxes select.
The input value of x, y, z, ch, and ht are of type of Real.
A function return value of zero indicates the coordinate was successfully set.
ID = 1450
Get_select_coordinate(Select_Boxes select,Integer n,Real &x,Real &y,Real &z,Real 
&ch,Real &ht)
Name
Integer Get_select_coordinate(Select_Boxes select,Integer n,Real &x,Real &y,Real &z,Real &ch,Real &ht)
Description
Get the coordinate, chainage and height of the snap point of the string selected for the n’th box of 
the Select_Boxes select.
The return value of x, y, z, ch, and ht are of type of Real.
A function return value of zero indicates the coordinate was successfully returned.
ID = 1057
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.33 Sheet_Size_Box
The Sheet_Size_Box is a panel field designed to select a sheet size name, or type in a sheet size 
by giving width and height separate by spaces. The units for width and height are millimetres. If a 
sheet size name, or a width and height is typed into the box, then the sheet size name, or the width 
and height, will be validated when <enter> is pressed.
A Sheet_Size_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a sheet size name, or widths and heights of a sheet (where width 
and height are separated by spaces and the units are millimetres), or to display the sheet size 
name if it is selected by the Sheet Size select button. This information area is in the middle
and
(c)
a Sheet Size choice button on the right.
A sheet size name can be typed into the information area, or widths and heights of a sheet (where 
width and height are separated by spaces and the units are millimetres). Then hitting the <enter> 
key will validate the sheet size.
Clicking  LB or  RB on the Sheet Size choice button brings up the Select Sheet Size Choice pop-up. 
Selecting a sheet size from the pop-up list writes the sheet size name in the information area.
Sheet_Size_Box
title area
information area
sheet size name
Sheet Size choice button
sheet size in width and height (mm)
Panels and Widgets
Chapter 
Clicking  MB on the Sheet Size choice button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and if 
(a)
the text in the information area is a valid sheet size choice, then a "sheet selected" command 
is sent with the sheet size choice in message
(b)
if the text is made up of two words then a "sheet selected" command is sent with nothing in 
message (this could be a typed width height)
(c)
if the text is not two words and is not a valid sheet size, then nothing is sent.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a justification after clicking on the Sheet Size Choice button sends a "sheet selected" 
command and the sheet size choice in message.
Panels and Widgets

Create_sheet_size_box(Text title_text,Message_Box message)
Name
Sheet_Size_Box Create_sheet_size_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Sheet_Size_Box. See 5.61.10.33 Sheet_Size_Box.
The Sheet_Size_Box is created with the title title_text.
The Message_Box message is used to display sheet size information.
The function return value is the created Sheet_Size_Box.
ID = 946
Validate(Sheet_Size_Box box,Real &w,Real &h,Text &sheet)
Name
Integer Validate(Sheet_Size_Box box,Real &w,Real &h,Text &sheet)
Description
Validate the contents of Sheet_Size_Box box and return the width of the sheet as w, the height of 
the sheet as h and the sheet size as Text sheet or blank if it is not a standard size.
The function returns the value of:
     NO_NAME if the Widget Sheet_Size_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and w, h, sheet are valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 947
Get_data(Sheet_Size_Box box,Text &text_data)
Name
Integer Get_data(Sheet_Size_Box box,Text &text_data)
Description
Get the data of type Text from the Sheet_Size_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 949
Set_data(Sheet_Size_Box box,Text text_data)
Name
Integer Set_data(Sheet_Size_Box box,Text text_data)
Description
Set the data of type Text for the Sheet_Size_Box box to text_data.
Panels and Widgets
Chapter 
A function return value of zero indicates the data was successfully set.
ID = 948
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.34 Slider_Box
The Slider_Box is a panel field designed to display a slider (or bar) that the user is able to move 
along the Slider_Box. 
The programmer supplies a minimum and maximum value for the Slider_Box and as the slider is 
moved in the Slider_Box, values are sent back to the macro indicating the position of the slider 
between the minimum and maximum values.
The Slider_Box can be horizontal or vertical.
Commands and Messages for Wait_on_Widgets
Moving the slider will send a "slider_updated" command back to the macro via the 
Wait_on_widgets(id,cmd,msg) call with the id of the Slider_Box. The actual value of the slider 
position is then given by the call Get_slider_position. See  Get_slider_position(Slider_Box 
box,Integer &value).
"slider_updated" - generated by holding the cursor on the slider and moving it to the left/right for 
a horizontal slider, or down/up for a vertical slider.
Moving the horizontal slider to the right increases the units
Moves the vertical slider down increases the units.
Moving the horizontal slider to the left decreases the units
Moves the vertical slider up decreases the units.
When the slider is finally released after moving it by the cursor, the "slider_end_tracking" 
command is returned via Wait_on_widgets.
Horizontal Slider_Box
slider
ticks
Vertical Slider_Box
minimum value
position
maximum value
position
minimum value
position
maximum value
position
height of
Slider_Box
height of
Slider_Box
width of slider box
width of slider box
Panels and Widgets
Chapter 
When the slider is not being moved but the cursor is clicked on the slider and highlights it:
,
then other keystrokes are recognised and return the following text commands via the 
Wait_on_widgets(id,cmd,msg) call with the id of the Slider_Box.
"slider_down" - generated by pressing the right arrow (->) key or the down arrow key.
Moves the horizontal slider to the right by one unit
Moves the vertical slider down by one unit.
"slider_up" - generated by pressing the up arrow key or the left arrow (<-) key.
Moves the vertical slider up by one unit.
Moves the horizontal slider to the left by one unit
"slider_top" - generated by pressing the Home key.
Moves the vertical slider up to the top, and hence to the minimum value.
Moves the horizontal slider to the far left, and hence to the minimum value.
"slider_bottom" - generated by pressing the End key.
Moves the vertical slider down to the bottom, and hence to the maximum value.
Moves the horizontal slider to the far right, and hence to the maximum value.
"slider_page_up" - generated by pressing the Page Up key.
Moves the vertical slider up by a number of units.
Moves the horizontal slider to the left by a number of units.
"slider_page_down" - generated by pressing the Page Down key.
Moves the vertical slider down by a number of units.
Moves the horizontal slider to the right by a number of units.
After any of the above keystrokes, the "slider_end_tracking" command is returned via 
Wait_on_widgets.
After each of the commands, the value of the slider position is given by the call Get_slider_position. 
See  Get_slider_position(Slider_Box box,Integer &value).
Create_slider_box(Text name,Integer width,Integer height,Integer min_value,Integer 
max_value,Integer tick_interval,Integer horizontal) 
Name
Slider_Box Create_slider_box(Text name,Integer width,Integer height,Integer min_value,Integer 
max_value,Integer tick_interval,Integer horizontal) 
Description
Create an input Widget of type Slider_Box. See 5.61.10.34 Slider_Box.
slider highlighted
Panels and Widgets

The Slider_Box can be horizontal or vertical.
If horizontal = 1 then the Slider_Box is horizontal.
If horizontal = 0 then the Slider_Box is vertical.
The range of values returned by the Slider_Box are specified by a minimum value (min_val) which 
is when the slider is at the left of a horizontal Slider_Box, or the top for a vertical Slider_Box, and a 
maximum value (max_range) which is reached when the slider is at the right of a horizontal 
Slider_Box, or at the bottom of a vertical Slider_Box.
min_value must be less than max_val.
Tick marks are drawn at the interval given by tick_interval on the bottom of a horizontal slider, of to 
the right of a vertical slider.
The slider box is created with a width width and height  height where the width and height are given 
in screen units (pixels).
The function return value is the created Slider_Box.
Note: the height for a horizontal Slider_Box or the width for a vertical Slider_Box should be at least 
30 or there will be no room to display the slider and tick marks.
ID = 2706
Set_slider_position(Slider_Box box,Integer value)
Name
Integer Set_slider_position(Slider_Box box,Integer value) 
Description
Move the slider of Slider_Box box to the position given by value units of the Slider_Box.
A function return value of zero indicates the set was successful.
 ID = 2707
Get_slider_position(Slider_Box box,Integer &value) 
Name
Integer Get_slider_position(Slider_Box box,Integer &value) 
Description
For the Slider_Box box, get the position of the slider in units of the Slider_Box and return the 
number of units in value.
A function return value of zero indicates the get was successful.
ID = 2708
Panels and Widgets
Chapter 
5.61.10.35 Source_Box
The Source_Box is a panel field designed to allow the user to define how to select data.
The Source_Box consists of a row of Data Source Choices for the user to select one from, and 
when a Data Source Choice is selected, depending on the choice one or more additional fields will 
be presented to fully define/refine what date the user wishes to select.
For example, if the user selects the Select Model Choice, a Model_Box is then displayed for the 
user to enter a Model name. 
Hence a Source_Box is made up of three items:
(a)
a title area above the row of Data Source Choices with the user supplied title on it
(b)
the row of Data Source Choices to pick from
(c)
an area under the row of Data Source Choices to display the extra panel fields required to fully 
define the users data selection method.
Note: If the panel appears to be sizing weirdly when there is a Source_Box involved, try putting all 
the Input Widgets into a Vertical_Group and then append the Vertical_Group to the Panel.
Note: A Source_Box cannot be made optional
Source_Box
Model_Box displayed when
Data Source Choices
Select
Model
Select Model icon is pressed
Choice
Source_Box
Area to displayed the additional
Row of Data Source Choices
fields required for the selected choice
Title
Panels and Widgets

Source_Box Create_source_box(Text title_text,Message_Box box,Integer flags) 
Name
Source_Box Create_source_box(Text title_text,Message_Box box,Integer flags)
Description
Create an input Widget of type Source_Box which is used to define how to select data. See 
5.61.10.35 Source_Box.
The Source_Box is created with the title "Data " followed by title_text.
What Data Source Choices are displayed and hence available to select, is controlled by flags. i
If flags = 0, then all the choices are displayed.
        Model
Source_Box_Model  =                 0x001  = 1
        View
Source_Box_View  =                  0x002  = 2
        String
Source_Box_String  =                  0x004  = 4
        Rectangle
Source_Box_Rectangle  =           0x008  = 8
        Trapezoid
Source_Box_Trapezoid  =           0x010  = 16
        Polygon
Source_Box_Polygon   =               0x020
        Lasso
Source_Box_Lasso  =                 0x040
        Filter
Source_Box_Filter  =                   0x080
        Models
Source_Box_Models  =               0x100
        Favourites
Source_Box_Favorites  =            0x200
        All
Source_Box_All  =                       0xfff
        Fence inside
Source_Box_Fence_Inside  =     0x01000
        Fence cross
Source_Box_Fence_Cross  =      0x02000
        Fence outside
Source_Box_Fence_Outside  =    0x04000
        Fence string
Source_Box_Fence_String  =       0x08000
        Fence points
Source_Box_Fence_Points  =      0x10000
        Fence all
Source_Box_Fence_All  =            0xff000
Source_Box_Standard = 
Source_Box_All | Source_Box_Fence_Inside | 
Source_Box_Fence_Outside | Source_Box_Fence_Cross |
 
Source_Box_Fence_String
You can have just some of them by combining the ones you want with |.
For example         Source_Box_Model | Source_Box_View
The Message_Box message is used to display information.
The function return value is the created Source_Box.
ID = 1675
Source_Box Create_source_box(Text text,Message_Box box,Integer flags, Integer 
start_flag) 
Name
Source_Box Create_source_box(Text text,Message_Box box,Integer flags,Integer start_flag) 
Description
Same as the other Create_source_box function but with an extra start_flag to indicate the choice of 
data source that the box starts with. 
The function return value is the created Source_Box.
ID = 2626
Validate(Source_Box box,Dynamic_Element &de_results) 
Panels and Widgets
Chapter 
Name
Integer Validate(Source_Box box,Dynamic_Element &elements) 
Description
Validate the contents of Source_Box box and return the Dynamic_Element de_results. 
The function returns the value of:
     NO_NAME if the Widget Source_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and elements is valid.
      -2 if there is something wrong with the choices. For example the panel field is blank.
     FALSE (zero) if there is a drastic error.
Having no Elements returned in de_results is NOT an error.
Always check the number of Elements in de_results and make your decisions based on that.
          ierr = Get_number_of_items(de_results,no_elts);
So a function return value of zero indicates that there is a drastic error.
Warning this is the opposite of most 12dPL function return values
Double Warning: most times the function return code is non zero even when you think it should be. 
For example, when nothing is entered into the box, the return code is -2, not 0.
ID = 1676
Set_data(Source_Box box,Text text_data)
Name
Integer Set_data(Source_Box box,Text text_data)
Description
Set the data of type Text for the Source_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 2156
Get_data(Source_Box box,Text &text_data)
Name
Integer Get_data(Source_Box box,Text &text_data)
Description
Get the data of type Text from the Source_Edit_Box box and return it in text_data.
text_data describes what has been selected in the Source_Box. Because of all the choices it is very 
complicated looking.
A function return value of zero indicates the data was successfully returned.
ID = 2157
Read_favorite(Source_Box box,Text filename) 
Name
Integer Read_favorite(Source_Box box,Text filename) 
Panels and Widgets

Description
For the Source_Box box, read in and set the Source_Box selection from the file named filename.
Note: the Read_favourite and Write_favourite calls allow Source_Box selection settings to be 
saved, and passed around between different Source_Box’s.
A function return value of zero indicates filename was read and the Source_Box was successfully 
set.
ID = 2158
Write_favorite(Source_Box box,Text filename) 
Name
Integer Write_favorite(Source_Box box,Text filename) 
Description
For the Source_Box box, write out the Source_Box selection information to the file named 
filename.
Note: the Read_favourite and Write_favourite calls allow Source_Box selection settings to be 
saved, and passed around between different Source_Box’s.
A function return value of zero indicates the file was successfully written.
ID = 2159
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.36 Symbol_Box
The Symbol_Box is a panel field designed to select 12d Model symbols. If a symbol name is typed 
into the box, then the symbol name will be validated when <enter> is pressed.
A Symbol_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a symbol name or to display the symbol name if it is selected by 
the Symbol select button. This information area is in the middle
and
(c)
a Symbol select button on the right.
A symbol name can be typed into the information area. Then hitting the <enter> key will validate 
the symbol name.
 MB clicked in the information area starts a "Same As" selection. A symbol is then selected and the 
symbol name is written in the information area.
Clicking  LB or  RB on the Symbol select button brings up the Select Symbol pop-up. Selecting a 
symbol from the pop-up list writes the symbol name in the information area.
Symbol_Box
title area
information area
symbol name
Symbol select button
Panels and Widgets

Clicking  MB on the Symbol select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the symbol choice in message, or blank if it is not a valid symbol choice 
(that is, it is not in the Symbol list).
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Panels and Widgets
Chapter 
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a justification after clicking on the Symbol Select button sends a "text selected" command 
and the symbol choice in message.
Symbol_Box Create_symbol_box(Text title_text,Message_Box message,Integer mode) 
Name
Symbol_Box Create_symbol_box(Text title_text,Message_Box message,Integer mode) 
Description
Create an input Widget of type Symbol_Box. See 5.61.10.36 Symbol_Box.
The Symbol_Box is created with the title title_text.
The Message_Box message is used to display information.
The value of mode is listed in the Appendix A - Linestyle mode. See  Linestyle Mode.
The function return value is the created Symbol_Box.
ID = 2170
Validate(Symbol_Box box,Integer mode,Text &result) 
Name
Integer Validate(Symbol_Box box,Integer mode,Text &result) 
Description
Validate the contents of Symbol_Box box and return the name of the symbol in Text result. 
The value of mode is listed in the Appendix A - Symbol mode. See  Symbol Mode
The function returns the value of:
     NO_NAME if the Widget Symbol_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 2171
Get_data(Symbol_Box box,Text &text_data) 
Name
Integer Get_data(Symbol_Box box,Text &text_data) 
Description
Get the data of type Text from the Symbol_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
Panels and Widgets

ID = 2172
Set_data(Symbol_Box box,Text text_data)
Name
Integer Set_data(Symbol_Box box,Text text_data) 
Description
Set the data of type Text for the Symbol_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 2173
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.37 Target_Box
Target_Box Create_target_box(Text title_text,Message_Box box,Integer flags) 
Name
Target_Box Create_target_box(Text title_text,Message_Box box,Integer flags) 
Description
Create an input Widget of type Target_Box. See 5.61.10.37 Target_Box.
The Target_Box is created with the title title_text.
The Message_Box message is used to display information.
The choices of targets are defined by flags. See  Target Box Flags.
The function return value is the created Target_Box.
ID = 1677
Target_Box Create_target_box(Text title,Message_Box message,Integer flags,Integer 
default_flag)
Name
Integer Target_Box Create_target_box(Text title,Message_Box message,Integer flags,Integer default_flag)
Description
Create an input Widget of type Target_Box with default flag default_flag. See 5.61.10.37 
Target_Box.
The Target_Box is created with the title title_text.
The Message_Box message is used to display information.
The choices of targets are defined by flags. See  Target Box Flags.
The function return value is the created Target_Box.
ID = 3101
Validate(Target_Box box) 
Name
Integer Validate(Target_Box box) 
Description
Validate the Target_Box box and return its choice as return value. See  Target Box Flags.
A function return value of negative number indicates the call was not successful.
ID = 1678
Validate(Target_Box box,Integer &mode,Text &text_data) 
Name
Integer Validate(Target_Box box,Integer &mode,Text &text_data) 
Description
Validate the Target_Box box and return its choice in mode. See  Target Box Flags.
A function return value of zero indicates the call was successful.
Panels and Widgets

ID = 2653
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.38 Template_Box
The Template_Box is a panel field designed to select, or create 12d Model templates. If a template 
name is typed into the box, then the template name will be validated when <enter> is pressed.
A Template_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a template name or to display the template name if it is selected 
by the template select button. This information area is in the middle
and
(c)
a Template select button on the right.
A template name can be typed into the information area. Then hitting the <enter> key will validate 
the template name.
Clicking  LB or  RB on the Template select button brings up the Select Template pop-up. Selecting a 
template from the pop-up list writes the template name in the information area.
Clicking  MB on the template select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
Template_Box
title area
information area
template name
Template select button
Panels and Widgets

documented in the section 5.61.7 Widget Information Area Menu.
Picking a template after clicking on the Justification Choice button sends a "text selected" 
command and the template choice in message.
Create_template_box(Text title_text,Message_Box message,Integer mode)
Name
Template_Box Create_template_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Template_Box. See 5.61.10.38 Template_Box.
The Template_Box is created with the title title_text.
The Message_Box message is used to display template information.
The value of mode is listed in the Appendix A - Template mode.
The function return value is the created Template_Box.
ID = 942
Validate(Template_Box box,Integer mode,Text &result)
Name
Integer Validate(Template_Box box,Integer mode,Text &result)
Description
Validate the contents of Template_Box box and return the Text result. 
The value of mode is listed in the Appendix A - Template mode. See  Template Mode
The value result must be type of Text.
The function returns the value of:
     NO_NAME if the Widget Template_Box is optional and the box is left empty
     NO_TEMPLATE, TEMPLATE_EXISTS, DISK_TEMPLATE_EXISTS or NEW_TEMPLATE
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 943
Get_data(Template_Box box,Text &text_data)
Name
Integer Get_data(Template_Box box,Text &text_data)
Description
A function return value of zero indicates the data was successfully returned.
Get the data of type Text from the Template_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
Panels and Widgets
Chapter 
ID = 945
Set_data(Template_Box box,Text text_data)
Name
Integer Set_data(Template_Box box,Text text_data)
Description
Set the data of type Text for the Template_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 944
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.39 Text_Style_Box
The Text_Style_Box is a panel field designed to select 12d Model text styles. If a text style name is 
typed into the box, then the text style name will be validated when <enter> is pressed.
A Text_Style_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a text style name or to display the text style name if it is selected 
by the text style select button. This information area is in the middle
and
(c)
a text style select button on the right.
A text style name can be typed into the information area. Then hitting the <enter> key will validate 
the text style name.
 MB clicked in the information area starts a "Same As" selection. A text string is then selected and 
the text style of the string is written in the information area.
Clicking  LB or  RB on the Text Style select button brings up the Select Text Style pop-up. Selecting 
a text style from the pop-up list writes the text style name in the information area.
Text_Style_Box
title area
information area
text style name
Text Style select button
Panels and Widgets
Chapter 
Clicking  MB on the Text Style select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a text style after clicking on the Text Style select button sends a "text selected" command 
and the text style choice in message.
Create_text_style_box(Text title_text,Message_Box message)
Name
Panels and Widgets

Text_Style_Box Create_text_style_box(Text title_text,Message_Box message) 
Description
Create an input of type Text_Style_Box. See 5.61.10.39 Text_Style_Box.
The Text_Style_Box is created with the title title_text.
The Message_Box message is used to display the text style information.
The function return value is the created Text_Style_Box.
ID = 950
Validate(Text_Style_Box box,Text &result)
Name
Integer Validate(Text_Style_Box box,Text &result)
Description
Validate the contents of Text_Style_Box box and return name of the textstyle as the Text result. 
The function returns the value of:
     NO_NAME if the Widget Text_Style_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 951
Get_data(Text_Style_Box box,Text &text_data)
Name
Integer Get_data(Text_Style_Box box,Text &text_data)
Description
Get the data of type Text from the Text_Style_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 953
Set_data(Text_Style_Box box,Text text_data)
Name
Integer Set_data(Text_Style_Box box,Text text_data)
Description
Set the data of type Text for the Text_Style_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 952
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.40 Text_Units_Box
The Text_Units_Box is a panel field designed to select one item from a list of text units. If data is 
typed into the box, then it will be validated when <enter> is pressed.
A Text_Units_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in text units or to display a units choice if it is selected by the text 
units choice button. This information area is in the middle
and
(c)
a Text Units choice button on the right.
A text units can be typed into the information area and hitting the <enter> key will validate the text 
units. Note that to be valid, the typed in text units must exist in the Text Units choice pop-up list.
Clicking  LB or  RB on the Text Units choice button brings up the Select Choice pop-up list. Selecting 
a Text Units choice from the pop-up list writes the text units to the information area.
Clicking  MB on the Text Units choice button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the text units choice in message, or blank if it is not a valid text unit.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a text unit after clicking on the Text Units Choice button sends a "text selected" command 
and the text unit choice in message.
Create_text_units_box(Text title_text,Message_Box message)
Text_Units_Box
title area
information area
text units choice
Text Units choice button
Panels and Widgets

Name
Text_Units_Box Create_text_units_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Text_Units_Box. See 5.61.10.40 Text_Units_Box.
The Text_Units_Box is created with the title title_text.
The Message_Box message is used to display the text units information.
The function return value is the created Text_Units_Box.
ID = 954
Validate(Text_Units_Box box,Integer &result)
Name
Integer Validate(Text_Units_Box box,Integer &result)
Description
Validate the contents of Text_Units_Box box and return the Integer result. 
The function returns the value of:
     NO_NAME if the Widget Text_Units_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
 ID = 955
Get_data(Text_Units_Box box,Text &text_data)
Name
Integer Get_data(Text_Units_Box box,Text &text_data)
Description
Get the data of type Text from the Text_Units_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 957
Set_data(Text_Units_Box box,Integer integer_data)
Name
Integer Set_data(Text_Units_Box box,Integer integer_data)
Description
Set the data of type Integer for the Text_Units_Box box to integer_data.
A function return value of zero indicates the data was successfully set.
ID = 956
Panels and Widgets
Chapter 
Set_data(Text_Units_Box box,Text text_data) 
Name
Integer Set_data(Text_Units_Box box,Text text_data) 
Description
Set the data of type Text for the Text_Units_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1519
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.41 Textstyle_Data_Box
A Textstyle_Data_Box contains many field (or sub-component box). A subset of field is mapped to 
an integer (named flags or optionals) which is the bitwise sum of numbers from the set: 
favourite box = 0x00000001
textstyle box = 0x00000002
colour box = 0x00000004
type box = 0x00000008
size box = 0x00000010
offset box = 0x00000020
raise box = 0x00000040
justify box = 0x00000080
angle box = 0x00000100
slant box = 0x00000200
xfactor box = 0x00000400
name box = 0x00000800
draw box = 0x00001000
underline box = 0x00002000
strikeout box = 0x00004000
italic box = 0x00008000
weight box = 0x00010000
whiteout box = 0x00020000
border box = 0x00040000
outline box = 0x00080000
border style box = 0x00100000
Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer 
flags) 
Name
Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags) 
Description
Create an input Widget of type Textstyle_Data_Box. See 5.61.10.41 Textstyle_Data_Box.
The Textstyle_Data_Box is created with the title title_text.
The Message_Box message is used to display the information.
The Integer flags indicates enable fields in the textstyle data box.
The function return value is the created Textstyle_Data_Box. 
ID = 1671
Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer 
flags,Integer optionals)
Name
Panels and Widgets
Chapter 
Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags,Integer optionals)
Description
Create a new Textstyle_Data_Box with given Text text and Message_Box box. 
The new textstyle data box is returned as the function call result. 
The Integer flags indicates enable fields in the textstyle data box.
The Integer optionals indicates optional fields in the textstyle data box.
ID = 2866
Validate(Textstyle_Data_Box box,Textstyle_Data &data)
Name
Integer Validate(Textstyle_Data_Box box,Textstyle_Data &data) 
Description
Validate the contents of Textstyle_Data_Box box and return the Textstyle_Data data. 
The function returns the value of:
     NO_NAME if the Widget Textstyle_Data_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and data is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
 ID = 1672
Set_data(Textstyle_Data_Box box,Textstyle_Data data) 
Name
Integer Set_data(Textstyle_Data_Box box,Textstyle_Data data) 
Description
Set the data of type Textstyle_Data for the Textstyle_Data_Box box to data.
A function return value of zero indicates the data was successfully set.
ID = 1673
Set_data(Textstyle_Data_Box box,Text text_data) 
Name
Integer Set_data(Textstyle_Data_Box box,Text text_data) 
Description
Set the data of type Text for the Texstyle_Data_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 2161
Get_data(Textstyle_Data_Box box,Textstyle_Data &data) 
Panels and Widgets

Name
Integer Get_data(Textstyle_Data_Box box,Textstyle_Data &data) 
Description
Get the data of type Textstyle_Data from the Textstyle_Data_Box box and return it in data.
A function return value of zero indicates the data was successfully returned.
ID = 1674
Get_data(Textstyle_Data_Box box,Text &text_data) 
Name
Integer Get_data(Textstyle_Data_Box box,Text &text_data) 
Description
Get the data of type Text from the Textstyle_Data_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 2160
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.42 Text_Edit_Box
Create_text_edit_box(Text title_text,Message_Box box,Integer no_lines)
Name
Text_Edit_Box Create_text_edit_box(Text title_text,Message_Box box,Integer no_lines)
Description
Create an input Widget of type Text_Edit_Box. See 5.61.10.42 Text_Edit_Box.
The Text_Edit_Box is created with the title title_text.
The Message_Box box is used to display information.
The number of lines allowed is no_lines.
The function return value is the created Text_Edit_Box.
ID = 1372
Create_text_edit_box(Text title_text,Message_Box box,Integer no_lines,Integer 
enable_spell_check)
Name
Text_Edit_Box Create_text_edit_box(Text title_text,Message_Box box,Integer no_lines,Integer 
enable_spell_check)
Description
The spell checking feature is under development.
Create an input Widget of type Text_Edit_Box. See 5.61.10.42 Text_Edit_Box.
The Text_Edit_Box is created with the title title_text.
If enable_spell_check is 1, spell checking will be performed on the box.
The Message_Box box is used to display information.
The number of lines allowed is no_lines.
The function return value is the created Text_Edit_Box.
ID = 7892
Set_data(Text_Edit_Box box,Text text_data)
Name
Integer Set_data(Text_Edit_Box box,Text text_data)
Description
Set the data of type Text for the Text_Edit_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1374
Set_data(Text_Edit_Box widget,Dynamic_Text dt_data) 
Name
Integer Set_data(Text_Edit_Box widget,Dynamic_Text dt_data)
Description
Panels and Widgets

Set the data of type Dynamic_Text for the Text_Edit_Box widget to dt_data.
A function return value of zero indicates the data was successfully set.
ID = 1617
Get_data(Text_Edit_Box widget,Text &text_data)
Name
Integer Get_data(Text_Edit_Box widget,Text &text_data)
Description
Get the data of type Text from the Text_Edit_Box widget and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1373
Get_data(Text_Edit_Box widget,Dynamic_Text &dt_data) 
Name
Integer Get_data(Text_Edit_Box widget,Dynamic_Text &dt_data)
Description
Get the data of type Dynamic_Text from the Text_Edit_Box widget and return it in dt_data.
A function return value of zero indicates the data was successfully returned.
ID = 1616
Set_word_wrap(Text_Edit_Box box,Integer mode) 
Name
Integer Set_word_wrap(Text_Edit_Box box,Integer mode) 
Description
Disable the word wrap for the Text_Edit_Box box if and mode is zero, enable the word wrap 
otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1596
Get_word_wrap(Text_Edit_Box box,Integer &mode)
Name
Integer Get_word_wrap(Text_Edit_Box box,Integer &mode)
Description
Set the value of Integer mode to:
0 if the word wrap is disable for the Text_Edit_Box box
1 otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1597
Panels and Widgets
Chapter 
Set_read_only(Text_Edit_Box widget,Integer mode) 
Name
Integer Set_read_only(Text_Edit_Box widget,Integer mode) 
Description
Set the Text_Edit_Box box to read-only if mode is non-zero, disable read-only otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1598
Get_read_only(Text_Edit_Box widget,Integer &mode) 
Name
Integer Get_read_only(Text_Edit_Box widget,Integer &mode) 
Description
Set the value of Integer mode to:
1 if the Text_Edit_Box box is read-only.
0 otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1599
Set_vertical_scroll_bar(Text_Edit_Box widget,Integer mode) 
Name
Integer Set_vertical_scroll_bar(Text_Edit_Box widget,Integer mode) 
Description
Disable the vertical scroll bar for the Text_Edit_Box box if and mode is zero, enable the vertical 
scroll bar otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1600
Get_vertical_scroll_bar(Text_Edit_Box box,Integer &mode)
Name
Integer Get_vertical_scroll_bar(Text_Edit_Box widget,Integer &mode) 
Description
Set the value of Integer mode to:
1 if the vertical scroll bar is enable for the Text_Edit_Box box
0 otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1601F
Set_horizontal_scroll_bar(Text_Edit_Box widget,Integer mode) 
Name
Panels and Widgets

Integer Set_horizontal_scroll_bar(Text_Edit_Box widget,Integer mode)
Description
Disable the horizontal scroll bar for the Text_Edit_Box box if and mode is zero, enable the vertical 
scroll bar otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1602
Get_horizontal_scroll_bar(Text_Edit_Box widget,Integer &mode)
Name
Integer Get_horizontal_scroll_bar(Text_Edit_Box widget,Integer &mode) 
Description
Set the value of Integer mode to:
1 if the horizontal scroll bar is enable for the Text_Edit_Box box
0 otherwise.
A function return value of zero indicates that the function call was successful.
ID = 1603
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.43 Texture_Box
The Texture_Box is a panel field designed to select 12d Model linestyles. If a texture name is 
typed into the box, then the texture name will be validated when <enter> is pressed.
A Texture_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a texture name or to display the texture name if it is selected by 
the Textstyle select button. This information area is in the middle
and
(c)
a Texture select button on the right.
A texture name can be typed into the information area. Then hitting the <enter> key will validate 
the texture name.
 MB clicked in the information area starts a "Same As" selection. A string with a texture is then 
selected and the texture of the string is written in the information area.
Clicking  LB or  RB on the Texture select button brings up the Select Texture pop-up. Selecting a 
texture from the pop-up list writes the texture name in the information area.
Texture_Box
title area
information area
texture name
Texture select button
Panels and Widgets

Clicking  MB on the Textures select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "text 
selected" command with the text in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a texture after clicking on the Texture select button sends a "text selected" command and 
the texture choice in message.
Panels and Widgets
Chapter 
Texture_Box Create_texture_box(Text title_text,Message_Box message)
Name
Texture_Box Create_texture_box(Text title_text,Message_Box message) 
Description
Create an input Widget of type Texture_Box. See 5.61.10.43 Texture_Box.
The Texture_Box is created with the title title_text.
The Message_Box message is used to display information.
The function return value is the created Texture_Box.
ID = 1875
Validate(Texture_Box box,Text &result) 
Name
Integer Validate(Texture_Box box,Text &result) 
Description
Validate the contents of Texture_Box box and return the name of the texture in Text result. 
The function returns the value of:
     NO_NAME if the Widget Texture_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1876
Set_data(Texture_Box box,Text text_data)
Name
Integer Set_data(Texture_Box box,Text text_data) 
Description
Set the data of type Text for the Texture_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1877
Get_data(Texture_Box box,Text &text_data) 
Name
Integer Get_data(Texture_Box box,Text &text_data) 
Description
Get the data of type Text from the Texture_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1878
Panels and Widgets

For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.44 Tick_Box
The Tick_Box has been superseded by the 5.61.10.23 Named_Tick_Box.
Create_tick_box(Message_Box message)
Name
Tick_Box Create_tick_box(Message_Box message)
Description
Create an input Widget of type Tick_Box. See 5.61.10.44 Tick_Box.
The Message_Box message is used to display the tick information.
The function return value is the created Tick_Box.
ID = 958
Validate(Tick_Box box,Integer &result)
Name
Integer Validate(Tick_Box box,Integer &result)
Description
Validate result (of type Integer) in the Tick_Box box. 
Validate the contents of Tick_Box box and return the Integer result. 
 result  = 0 if the tick box is unticked
     result  = 1                 if the tick box is ticked
A function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 959
Get_data(Tick_Box box,Text &text_data)
Name
Integer Get_data(Tick_Box box,Text &text_data)
Description
Get the data of type Text from the Tick_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 961
Set_data(Tick_Box box,Text text_data)
Name
Integer Set_data(Tick_Box box,Text text_data)
Description
Set the data of type Text for the Tick_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 960
Panels and Widgets

For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.10.45 Tin_Box
The Tin_Box is a panel field designed to select 12d Model tins. If a tins name is typed into the tins 
box and <enter> pressed or a tins selected from the tins pop-up list, then the text in the Tin_Box is 
validated.
A Tin_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a tin name or to display the tin name if it is selected by the tin 
select button. This information area is in the middle
and
(c)
a tin select button on the right.
A tin name can be typed into the information area. Then hitting the <enter> key validate the tin 
name.
 MB clicked in the information area starts a "Same As" selection. LJG This does nothing useful.
Clicking  LB or  RB on the tin select button brings up the Select Model pop-up. Selecting a tin from 
the pop-up list writes the tin name in the information area and validation occurs.
Clicking  MB on the tin select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "tin 
selected" command and the text in message.
Tin_Box
title area
information area
tin name
tin select button
Panels and Widgets

Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a tin with the Tin Select button sends a "tin selected" command and the tin name in 
message.
Create_tin_box(Text title_text,Message_Box message,Integer mode)
Name
Tin_Box Create_tin_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type Tin_Box for inputting and validating Tins.
The Tin_Box is created with the title title_text (see 5.61.10.45 Tin_Box).
The Message_Box message is normally the message box for the panel and is used to display 
Model_Box validation messages.
If <enter> is typed into the Tin_Box or a tin selected from the tin pop-up list, automatic validation is 
performed by the Tin_Box according to mode. What the validation is, what messages are written to 
Message_Box, and what actions automatically occur, depend on the value of mode.
For example,
CHECK_TIN_MUST_EXIST         // if the tins exists, the message says "exists"
                                                      // if it doesn’t exist, the messages says "ERROR"
The values for mode and their actions are listed in Appendix A (see  Tin Mode).
The function return value is the created Tin_Box.
ID = 962
Validate(Tin_Box box,Integer mode,Tin &result)
Name
Integer Validate(Tin_Box box,Integer mode,Tin &result)
Description
Validate the contents of Tin_Box box and return the Tin result. 
The value of mode will determine what validation occurs, what messages are written to the 
Message_Box, what actions are taken and what the function return value is.
The values for mode and the actions are listed in Appendix A (see  Tin Mode).
The function return values depends on mode and are given in Appendix A (see  Tin Mode).
A function return value of zero indicates that there is a drastic error.
Warning this is the opposite of most 12dPL function return values
Double Warning: most times the function return code is not zero even when you think it should
be. The actual value of the function return code must be checked to see what is going on. For 
example, when mode = CHECK_TIN_MUST_EXIST will return NO_TIN if the tin name is not blank 
and no tin of that name exist (NO_TIN does not equal zero).
ID = 963
Panels and Widgets
Chapter 
Get_data(Tin_Box box,Text &text_data)
Name
Integer Get_data(Tin_Box box,Text &text_data)
Description
Get the data of type Text from the Tin_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 965
Set_data(Tin_Box box,Text text_data)
Name
Integer Set_data(Tin_Box box,Text text_data)
Description
Set the data of type Text for the Tin_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 964
Set_supertin(Tin_Box box,Integer mode)
Name 
Integer Set_supertin(Tin_Box box,Integer mode)
Description
For the Tin_box box, set whether the pop up for the Tin_ box shows tins and super tins, or only tins.
If mode = 0, only tins are displayed in the pop-up.
If mode = 1, only tins and super tins are displayed in the pop-up.
A function return value of zero indicates the data was successfully set.
ID = 1311
Set_tin_type(Tin_Box box,Integer type) 
Name
Integer Set_tin_type(Tin_Box box,Integer type) 
Description
Set the type of acceptable tin for the Tin_Box box to type. 
The valid types of tin are: 1 normal tin, 2 super tin, 3 grid tin. 
A return value of zero indicates the function call was successful.
ID = 2894
Set_tin_type(Tin_Box box,Integer type,Integer type2) 
Name
Integer Set_tin_type(Tin_Box box,Integer type,Integer type2) 
Panels and Widgets

Description
Set the type of acceptable tin for the Tin_Box box to type, type2. 
The valid types of tin are: 1 normal tin, 2 super tin, 3 grid tin. 
A return value of zero indicates the function call was successful.
ID = 2895
Set_tin_type(Tin_Box box,Integer type,Integer type2,Integer type3) 
Name
Integer Set_tin_type(Tin_Box box,Integer type,Integer type2,Integer type3) 
Description
Set the type of acceptable tin for the Tin_Box box to type, type2, type3. 
The valid types of tin are: 1 normal tin, 2 super tin, 3 grid tin. 
A return value of zero indicates the function call was successful.
ID = 2896
Set_all_tin_types(Tin_Box box) 
Name
Integer Set_all_tin_types(Tin_Box box) 
Description
Set the type of acceptable tin for the Tin_Box box to all types. 
A return value of zero indicates the function call was successful.
ID = 2897
Set_tin_mode(Tin_Box box,Integer mode) 
Name
Integer Set_tin_mode(Tin_Box box,Integer mode) 
Description
Set the mode the Tin_Box box to mode. 
The valid modes for tin are: 1 section, 2 exact.
A return value of zero indicates the function call was successful.
ID = 2898
Set_tin_mode(Tin_Box box,Integer mode,Integer mode2) 
Name
Integer Set_tin_mode(Tin_Box box,Integer mode,Integer mode2) 
Description
Set the mode the Tin_Box box to mode, mode2. 
The valid modes for tin are: 1 section, 2 exact.
A return value of zero indicates the function call was successful.
Panels and Widgets
Chapter 
ID = 2899
Set_all_tin_modes(Tin_Box box) 
Name
Integer Set_all_tin_modes(Tin_Box box) 
Description
Set the mode the Tin_Box box to all modes. 
A return value of zero indicates the function call was successful.
ID = 2900
Set_tin_access(Tin_Box box,Integer access) 
Name
Integer Set_tin_access(Tin_Box box,Integer access) 
Description
Set the access type of the Tin_Box box to access. 
The valid tin access types are: 1 read access, 2 write access. 
A return value of zero indicates the function call was successful.
ID = 2901
Set_tin_access(Tin_Box box,Integer access,Integer access2) 
Name
Integer Set_tin_access(Tin_Box box,Integer access,Integer access2) 
Description
Set the access type of the Tin_Box box to access, access2. 
The valid tin access types are: 1 read access, 2 write access. 
A return value of zero indicates the function call was successful.
ID = 2902
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.46 View_Box
The View_Box is a panel field designed to select 12d Model views. If a view name is typed into the 
view box and <enter> pressed or a view selected from the view pop-up list, then the text in the 
View_Box is validated.
A View_Box is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in a view name or to display the view name if it is selected by the 
view select button. This information area is in the middle
and
(c)
a view select button on the right.
A view name can be typed into the information area. Then hitting the <enter> key validates the 
view name.
Clicking  LB or  RB on the view select button brings up the Select View pop-up. Selecting a view 
from the pop-up list writes the view name in the information area and validation occurs.
Clicking  MB on the view select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and if it is an existing 
view, then a "view selected" command is sent with the view name in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Picking a view with the View Select button sends a "view selected" command and the view name in 
message.
View_Box
title area
information area
view name
view select button
Panels and Widgets
Chapter 
Create_view_box(Text title_text,Message_Box message,Integer mode)
Name
View_Box Create_view_box(Text title_text,Message_Box message,Integer mode)
Description
Create an input Widget of type View_Box for inputting and validating Views.
The View_Box is created with the title title_text (see 5.61.10.46 View_Box).
The Message_Box message is normally the message box of the panel and is used to display the 
View_Box validation messages.
If an <enter> is typed in the View_Box or a view selected from the view pop-up list, automatic 
validation is performed by the View_Box according to mode - what the validation is, what messages 
are written to Message_Box, and what actions automatically occur, depend on the value of mode.
For example,
CHECK_TIN_MUST_EXIST      // if the model exists, the message says "exists" and
                                                  // if it doesn’t exist, the messages says "ERROR"
The value of mode and their actions are listed in Appendix A (see  View Mode).
The function return value is the created View_Box.
ID = 966
Validate(View_Box box,Integer mode,View &result)
Name
Integer Validate(View_Box box,Integer mode,View &result)
Description
Validate the contents of View_Box box and return the View result. 
The value of mode will determine what validation occurs, what messages are written to the 
Message_Box, what actions are taken and what the function return value is.
The values for mode and the actions are listed in Appendix A (see  View Mode).
The function return value depends on mode and are given in Appendix A (see  View Mode).
A function return value of zero indicates that there is a drastic error.
Warning this is the opposite of most 12dPL function return values
Double Warning: most times the function return code is not zero even when you think it should
be. The actual value of the function return code must be checked to see what is going on. For 
example, when mode = CHECK_VIEW_MUST_EXIST will return NO_VIEW if the view name is not 
blank and no view of that name exist (NO_VIEW does not equal zero).
ID = 967
Get_data(View_Box box,Text &text_data)
Name
Integer Get_data(View_Box box,Text &text_data)
Description
Get the data of type Text from the View_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 969
Panels and Widgets

Set_data(View_Box box,Text text_data)
Name
Integer Set_data(View_Box box,Text text_data)
Description
Set the data of type Text for the View_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 968
Set_view_type(View_Box box,Integer type) 
Name
Integer Set_view_type(View_Box box,Integer type) 
Description
Set acceptable view type for View_box box with Integer type. 
A return value of 0 indicates the function call was successful.
List of values for view type
1 Plan,
2 Perspective,
3 Section,
4 Hidden,
A return value of zero indicates the function call was successful.
ID = 2942
Set_view_type(View_Box box,Integer type,Integer type2) 
Name
Integer Set_view_type(View_Box box,Integer type,Integer type2) 
Description
Set acceptable view types for View_box box with Integer type, type2. 
A return value of 0 indicates the function call was successful.
List of values for view type
1 Plan,
2 Perspective,
3 Section,
4 Hidden,
A return value of zero indicates the function call was successful.
ID = 2943
Set_view_type(View_Box box,Integer type,Integer type2,Integer type3) 
Name
Panels and Widgets
Chapter 
Integer Set_view_type(View_Box box,Integer type,Integer type2,Integer type3) 
Description
Set acceptable view types for View_box box with Integer type, type2, type3. 
A return value of 0 indicates the function call was successful.
List of values for view type
1 Plan,
2 Perspective,
3 Section,
4 Hidden,
A return value of zero indicates the function call was successful.
ID = 2944
Set_all_view_types(View_Box box) 
Name
Integer Set_all_view_types(View_Box box) 
Description
Set acceptable view types for View_box box with all view types. 
A return value of zero indicates the function call was successful.
ID = 2945
Set_view_engine(View_Box box,Integer mode) 
Name
Integer Set_view_engine(View_Box box,Integer mode) 
Description
Set view engine mode for View_Box box with Integer mode. 
A return value of zero indicates the function call was successful.
List of value for view engine mode
1 GDI
2 OpenGL
3 OpenGL GPU
ID = 2946
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.47 Weight_Box
The Weight_Box is a panel field designed to enter real numbers representing drawing/plotting 
weight of segments.
A Weight_Box is a panel field that is made up of three items:
(a)
a title area on the left with the user supplied title on it
(b)
a information area to type in the real number. This information area is in the middle
and
(c)
a Real select button on the right.
Data is typed into the information area and hitting the <enter> key will validate the typed data. Only 
real values can be typed into the information area (that is, the real number can only contain +, -, 
decimal point, e, d and the numbers 0 to 9).
Clicking  LB or  RB on the Real Select button brings up the Select Weight choice list pop-up. 
Clicking  MB on the Real select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a "real 
selected" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
Create_weight_box(Text title_text,Message_Box message)
Name
Weight_Box Create_weight_box(Text title_text,Message_Box message)
Description
Create an input Widget of type Weight_Box. See 5.61.10.47 Weight_Box.
The Weight_Box is created with the title title_text.
The Message_Box message is normally the message box for the panel and is used to display 
Weight_Box validation messages.
The function return value is the created Weight_Box.
ID = 7804
Validate(Weight_Box box,Real &result)
Name
Integer Validate(Weight_Box box,Real &result)
Description
Validate the contents of Weight_Box box and return the Real result. 
The function returns the value of:
Panels and Widgets
Chapter 
     NO_NAME if the Widget Weight_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and result is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 7805
Get_data(Weight_Box box,Text &text_data)
Name
Integer Get_data(Weight_Box box,Text &text_data)
Description
Get the data of type Text from the Weight_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 7806
Set_data(Weight_Box box,Real real_data)
Name
Integer Set_data(Weight_Box box,Real real_data)
Description
Set the data of type Real for the Weight_Box box to real_data.
A function return value of zero indicates the data was successfully set.
ID = 7807
Set_data(Weight_Box box,Text text_data) 
Name
Integer Set_data(Weight_Box box,Text text_data) 
Description
Set the data of type Text for the Weight_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 7808
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets

5.61.10.48 XYZ_Box
The XYZ_Box is a panel field designed to get X, Y and Z coordinates which are displayed in the one 
information area, separated by spaces.
Also see 5.61.10.25 New_XYZ_Boxwhere each of X, Y and Z are each displayed in their own 
information areas.
The XYZ_Box is made up of:
(a)
a title area on the left with the user supplied title on it
(b)
an information area to type in the X Y and Z values, each value separated by one or more 
spaces, or to display the X Y Z coordinates if a position is selected by the XYZ select button. 
This information area is in the middle
and
(c)
a XYZ select button on the right.
XYZ coordinates can be typed into the information area, each value separated by one or more 
spaces. Then hitting the <enter> key will validate that the three values are all Real numbers.
Clicking  LB on the XYZ select button starts the XYZ Pick option and after selecting a position, the X, 
Y and Z values are displayed information area separated by spaces. 
Clicking  RB on the XYZ select button brings up the XYZ Ops pop-up menu. Selecting Pick xyz 
option starts the XYZ Pick option and after a position, the X, Y and Z values are displayed in the 
information area separated by spaces.
Clicking  MB on the XYZ select button does nothing.
Commands and Messages for Wait_on_Widgets
Typing in the information area will send a "keystroke" command and message which is the text of 
the character typed in.
Pressing the Enter key in the information area sends a "keystroke" command and then a 
"coordinate accepted" command and nothing in message.
Pressing and releasing  LB in the information area sends a "left_button_up" command.
Pressing and releasing  MB in the information area sends a "middle_button_up" command. 
Pressing and releasing  MB also starts a "Same As" and if a XYZ is selected then a "coordinate 
accepted" command is sent with nothing in message.
Pressing and releasing  RB in the information area sends a "right_button_up" command and also 
brings up an options panel. The commands/messages send by items selected in the menu are 
documented in the section 5.61.7 Widget Information Area Menu.
XYZ_Box
title area
information area
X Y Z coordinates
XYZ select button
(separated by spaces)
Panels and Widgets
Chapter 
Picking a coordinate with the XYZ Select button sends a "coordinate accepted" command with 
nothing in message.
Create_xyz_box(Text title_text,Message_Box message)
Name
XYZ_Box Create_xyz_box(Text title_text,Message_Box message)
Description
Create an input Widget of type XYZ_Box. See 5.61.10.48 XYZ_Box.
The XYZ_Box is created with the title title_text.
The Message_Box message is used to display the XYZ information.
The function return value is the created XYZ_Box.
ID = 970
Validate(XYZ_Box box,Real &x,Real &y,Real &z)
Name
Integer Validate(XYZ_Box box,Real &x,Real &y,Real &z)
Description
Validate the contents of the XYZ_Box box and check it decodes to three Reals.
The three Reals are returned in x, y, and z.
The function returns the value of:
     NO_NAME if the Widget XYZ_Box is optional and the box is left empty
     TRUE (1) if no other return code is needed and x, y and z are valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 971
Get_data(XYZ_Box box,Text &text_data)
Name
Integer Get_data(XYZ_Box box,Text &text_data)
Description
Get the data of type Text from the XYZ_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 973
Set_data(XYZ_Box box,Real x,Real y,Real z)
Name
Panels and Widgets

Integer Set_data(XYZ_Box box,Real x,Real y,Real z)
Description
Set the x y z data (all of type Real) for the XYZ_Box box to the values x, y and z.
A function return value of zero indicates the data was successfully set.
ID = 972
Set_data(XYZ_Box box,Text text_data) 
Name
Integer Set_data(XYZ_Box box,Text text_data) 
Description
Set the data of type Text for the XYZ_Box box to text_data.
A function return value of zero indicates the data was successfully set.
ID = 1520
For information on the other Input Widgets, go to 5.61.10 Input Widgets
Panels and Widgets
Chapter 
5.61.11 Message Boxes
See 5.61.11.1 Colour_Message_Box
See 5.61.11.2 Message_Box
Panels and Widgets

5.61.11.1 Colour_Message_Box
The Colour_Message_Box is a panel field designed to display text messages. The background 
colour for the text messages is under the programmers control and can vary between red, green, 
yellow or no colour. 
This is useful for differentiating between different types of messages such as errors, warnings and 
successful.
The Colour_Message_Box consists of just an information area to display the text messages.
i
Data can not be typed into the Colour_Message_Box information area. 
Note: The Colour_Message_Box is similar to a Message_Box (see 5.61.11.2 Message_Box) except 
that a Message_Box has no coloured background.
When most other Input Widgets are created, a Colour_Message_Box or Message_Box needs to 
be supplied and that Colour_Message_Box or Message_Box is used by the Widget to display 
validation messages for the Widget.
Create_colour_message_box(Text message_text) 
Name
Colour_Message_Box Create_colour_message_box(Text message_text) 
Description
Create a box of type Colour_Message_Box for writing out messages. See 5.61.11.1 
Colour_Message_Box.
The Colour_Message_Box is created with the text message_text displayed in it.
The background colour of the display area is set using Set_level (Colour_Message_Box, level), or 
can be set with the message using Set_data(Colour_Message_Box box,Text text_data,Integer level)). 
The function return value is the created Colour_Message_Box. 
ID = 2629
Set_data(Colour_Message_Box box,Text text_data,Integer level) 
Name
Integer Set_data(Colour_Message_Box box,Text text_data,Integer level) 
Description
Set the data of type Text for the Colour_Message_Box box as the Text text_data. 
Colour_Message_Box
information area
text message with no coloured background
text message with red colour background
Panels and Widgets
Chapter 
If the Colour_Message_Box box is on a panel then the message text_data will be displayed in the 
information area of box with the background colour of the box set by level.
 A function return value of zero indicates the data was successfully set.
ID = 2632
Set_data(Colour_Message_Box box,Text text_data) 
Name
Integer Set_data(Colour_Message_Box box,Text text_data) 
Description
Set the data of type Text for the Colour_Message_Box box as the Text text_data.
If the Colour_Message_Box box is on a panel then the message text_data will be displayed in the 
information area of box with the background colour previously defined by the Set_level call.
A function return value of zero indicates the data was successfully set.
ID = 2631
Set_level(Colour_Message_Box box,Integer level) 
Name
Integer Set_level(Colour_Message_Box box,Integer level) 
Description
Setting level defines the background colour to use when text messages are displayed in the 
information area of box. This level will be over ridden if the Set_data(Colour_Message_Box 
box,Text text_data,Integer level) call is used.
For level = 1, the colour is normal.
For level = 2, the colour is yellow (for Warning)
For level = 3, the colour is red (for Error)
For level = 4, the colour is green (for Good)
If no Set_level call is made then the default level is 1.
A function return value of zero indicates the level was successfully set.
ID = 2630
For information on the other Message Boxes go to 5.61.11 Message Boxes or for Input Widgets, go to 
5.61.10 Input Widgets
Panels and Widgets

5.61.11.2 Message_Box
The Message_Box is a panel field designed to display text messages. 
The Message_Box consists of just an information area to display the text messages.
i
Data can not be typed into the Message_Box information area. 
Note: The Message_Box is similar to a Colour_Message_Box (see 5.61.11.1 
Colour_Message_Box) except that a Message_Box can not have a coloured background.
When most other Input Widgets are created, a Colour_Message_Box or Message_Box needs to 
be supplied and that Colour_Message_Box or Message_Box is used by the Widget to display 
validation messages for the Widget.
Create_message_box(Text message_text)
Name
Message_Box Create_message_box(Text message_text) 
Description
Create a box of type Message_Box for writing out messages. See 5.61.11.2 Message_Box.
The Message_Box is created with the text message_text displayed in it.
The function return value is the created Message_Box. 
ID = 847
Get_data(Message_Box box,Text &text_data)
Name
Integer Get_data(Message_Box box,Text &text_data)
Description
Get the data of type Text from the Message_Box box and return it in text_data.
A function return value of zero indicates the data was successfully returned.
ID = 1037
Set_data(Message_Box box,Text text_data)
Name
Integer Set_data(Message_Box box,Text text_data)
Description
Set the data of type Text for the Message_Box box as the Text text_data.
If the Message_Box box is on a panel then the message text_data will be displayed in the 
Message_Box
information area
text message displayed in the information area
Panels and Widgets
Chapter 
information area of box.
A function return value of zero indicates the data was successfully set.
ID = 1038
For information on the other Message Boxes go to 5.61.11 Message Boxes or for Input Widgets, go to 
5.61.10 Input Widgets
Panels and Widgets

5.61.12 Log_Box and Log_Lines
A Log_Box is a panel field that behaves like the standard 12d Model Output Window but may be 
added to a Panel or a Vertical or Horizontal group.
The Log_Box covers and area for messages by supplying the parameters box_width and 
box_height. The units of box_width and box_height are screen units (pixels).
The actual size of the Log_Box area is actual width and actual height pixels where:
the actual width of the area is the maximum of the width of the panel without the Draw_Box, and 
box_width. 
and 
the height of the box is box_height.
Log_Lines are the method of passing information to the Log_Box, and unlike a message box which 
just takes text messages, Log_Lines can contain extra information for the user such as a link to a 
string that can be highlighted or edited by clicking on the Log_Line.
The Log_Box consists of just an information area to display the text messages.
Data can not be typed into the Log_Box information area. 
After a log line is highlighted in the Log_Box, the
up arrow key moves the cursor up one log line
down arrow key moves the cursor down one log line
Home will go to the top log line in the Log_Box
End will go to the bottom log line in the Log_Box
Log_Box
Log_Box with Log_Line
Log_Lines with their
messages displayed
in the Log_Box
Panels and Widgets
Chapter 
Commands and Messages for Wait_on_Widgets
Pressing and releasing  LB in the Log_Box with send a "click_lb" command and the line number of 
the log line in message.
Create_log_box(Text name,Integer box_width,Integer box_height) 
Name
Log_Box Create_log_box(Text name,Integer box_width,Integer box_height) 
Description
Create an input Widget of type Log_Box with the message area defined by the parameters 
box_width, box_height which are in screen units (pixels).See 5.61.12 Log_Box and Log_Lines.
A Log_Box behaves like the standard 12d Model Output Window but may be added to a Panel or 
Vertical / Horizontal group.
Log_Lines are the method of passing messages to the Log_Box.
The function return value is the created Log_Box.
ID = 2671
Create_text_log_line(Text message,Integer log_level)
Name
Log_Line Create_text_log_line(Text message,Integer log_level)
Description
Create a Text Log_Line with the message message and a log level log_level.
The text message is displayed in a Log_Box with the log level log_level when the Log_Line is 
added to the Log_Box.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
ID = 2663
icons for log_level’s
Panels and Widgets

Create_highlight_string_log_line(Text message,Integer log_level,Uid model_id,Uid 
string_id) 
Name
Log_Line Create_highlight_string_log_line(Text message,Integer log_level,Uid model_id,Uid string_id) 
Description
Create a Highlight String Log_Line giving a string by its model Uid model_id and string Uid 
string_id, a text message and a log level log_level.
The text message is displayed in a Log_Box with the log level log_level when the Log_Line is 
added to the Log_Box.
If  LB is clicked on the log line, the string will be highlighted.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
ID = 2664
Create_highlight_string_log_line(Text message,Integer log_level,Uid model_id,Uid 
string_id,Real x,Real y,Real z)
Name
Log_Line Create_highlight_string_log_line(Text message,Integer log_level,Uid model_id,Uid string_id,Real 
x,Real y,Real z) 
Description
Create a Highlight String Log_Line giving a string by its model Uid model_id and string Uid 
highlight string log line with log level 2
Clicking  LB on the Highlight String log line highlights the string in each view the string is on, 
and autopans to the string.
Panels and Widgets
Chapter 
string_id, a coordinate (x,y,z) on the string, a text message and a log level log_level.
The text message is displayed in a Log_Box with the log level log_level when the Log_Line is 
added to the Log_Box.
If  LB is clicked on the log line, the coordinate (x,y,z) on the string, and the string, will be highlighted.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
ID = 2665
Create_highlight_point_log_line(Text message,Integer log_level,Real x,Real y,Real z) 
Name
Log_Line Create_highlight_point_log_line(Text message,Integer log_level,Real x,Real y,Real z) 
Description
Create a Log_Line giving a coordinate (x,y,z).
If  LB is clicked on the log line, the coordinate (x,y,z) will be highlighted.
LJG? on which views?
It also displays the text message message and has a log level log_level.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
highlight string (with xyz) log line and log level 2
Clicking  LB on the highlight string (with xyz) log line highlights the string at the given position 
(x,y,z) in each view the string is on, and autopans to the string.
Panels and Widgets

3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
 ID = 2666
Create_edit_string_log_line(Text message,Integer log_level,Uid model_id,Uid 
string_id) 
Name
Log_Line Create_edit_string_log_line(Text message,Integer log_level,Uid model_id,Uid string_id) 
Description
Create an Edit Log_Line giving a string by its model Uid model_id and string Uid string_id, a text 
message and a log level log_level. 
The text message is displayed in a Log_Box with the log level log_level when the Log_Line is 
added to the Log_Box.
If  LB is clicked on the log line, the string will be highlighted.
If  LB is double clicked on the log line, the string is edited. 
If  RB is clicked on the log line then an Options menu is displayed with the choices:
It also displays the text message message and has a log level log_level.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
Edit the string 
Delete the string 
Show the string properties 
Not applicable 
Panels and Widgets
Chapter 
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
ID = 2667
edit string log line with log level 1
Clicking  LB on the edit string log line highlights the string in each view the string is on, and 
autopans to the string.
Double clicking  LB on the edit string log line highlights and edits the string. That is, it 
highlights the string and also brings the string up in its editor
Clicking  RB on the edit string log line brings up the Options for the string
Panels and Widgets

Create_macro_log_line(Text message,Integer log_level,Text macro,Text 
select_cmd_line)
Name
Log_Line Create_macro_log_line(Text message,Integer log_level,Text macro,Text select_cmd_line)
Description
This call creates a log line that will allow the user to run a macro when the log line is double clicked. 
The macro is specified by the parameter macro and any optional arguments to be passed to it are 
specified by cmd_line.
It also displays the text message message and has a log level log_level.
Available log levels are
0 for none
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
The function return code is the created Log_Line.
 ID = 2668
Create_macro_log_line(Text message,Integer log_level,Text macro,Text 
select_cmd_line,Dynamic_Text menu_names,Dynamic_Text menu_command_lines)
Name
Log_Line Create_macro_log_line(Text message,Integer log_level,Text macro,Text 
select_cmd_line,Dynamic_Text menu_names,Dynamic_Text menu_command_lines)
Description
This call creates a log line that will allow the user to run a macro when the log line is double clicked. 
The macro is specified by the parameter macro and any optional arguments to be passed to it are 
specified by cmd_line.
This log line also provides options in a context menu when the user right clicks it. There are two 
parameters required; a list of all the names to be displayed in the menu, stored in a Dynamic_Text 
object called menu_names and the list of arguments to be passed down to the macro when the 
menu item is selected, stored in menu_command_lines.
It also displays the text message message and has a log level log_level.
Available log levels are
0 for none, 
1 for General, 
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using the 
Show_panel call.
Panels and Widgets
Chapter 
The function return code is the created Log_Line.
ID = 2669
Add_log_line(Log_Box box,Log_Line line)
Name
Integer Add_log_line(Log_Box box,Log_Line line)
Description
Add the Log_Line line to the existing Log_Box box.
WARNING
To be visible, a Log_Line is added to a Log_Box using the call Add_log_line(Log_Box box,Log_Line 
line) BUT this call can only be made after the Log_Box is displayed in a panel using the Show_panel 
call.
Note that each Log_Line can be added at most one time; the add destination can be one of the 
three types: Output window; a Log_Box; or a parent Log_Line group. If the line is already added, 
then the function will return -1.
A function return value of zero indicates the Log_Line was successfully added.
ID = 2672
Clear(Log_Box box)
Name
Integer Clear(Log_Box box)
Description
Clear any text and log lines from a Log_Box box.
A function return value of zero indicates the Log_Box was successfully cleared.
ID = 2673
Print_log_line(Log_Line line,Integer is_error)
Name
Integer Print_log_line(Log_Line line,Integer is_error)
Description
Print the Log_Line line to the 12d Model Output window. 
If is_error = 1, the Output window will treat the Log_line as an error message and the Output 
window will flash and/or pop up).
Note that each Log_Line can be added at most one time; the add destination can be one of the 
three types: Output window; a Log_Box; or a parent Log_Line group. If the line is already added, 
then the function will return -1.
A function return value of zero indicates the Log_Line was successfully printed.
ID = 2670
Log lines can be organised into a multiple level tree structure. A log line which is not a leaf in the 
tree would be call a group log line.
A log line which is not a top level of a tree will have a parent log line. 
Panels and Widgets

Create_group_log_line(Text message,Integer log_level)
Name
Log_Line Create_group_log_line(Text message,Integer log_level)
Description
Create a group Log_Line with the message message and a log level log_level.
The text message is displayed in a Log_Box with the log level log_level when the Log_Line is added 
to the Log_Box.
Available log levels are
0 for none,
1 for General,
2 for Warning
3 for Error.
Log levels other than 0 will display a small icon to indicate their status.
WARNING
To be visible, the created Log_Line is added to a Log_Box using the call Add_log_line(Log_Box 
box,Log_Line line) BUT this call can only be made after the Log_Box is displayed in a panel using 
the Show_panel call.
The function return code is the created group Log_Line.
ID = 3757
Get_type(Log_Line line,Integer &type)
Name
Integer Get_type(Log_Line line,Integer &type)
Description
Get the type of a given Log_Line line and return it in Integer type.
The value of type can be ???
As in v14 c2g the value is always 0.
A function return value of zero indicates the type was successfully returned.
ID = 3758
Get_type(Log_Line line,Text &type)
Name
Integer Get_type(Log_Line line,Text &type)
Description
Get the type of a given Log_Line line and return it in Text type.
The value of type can be ???
As in v14 c2g the value is always empty string.
A function return value of zero indicates the type was successfully returned.
ID = 3759
Panels and Widgets
Chapter 
Get_id(Log_Line line,Integer &id)
Name
Integer Get_id(Log_Line line,Integer &id)
Description
Get the Id of a given Log_Line line and return it in Integer id.
A function return value of zero indicates the id was successfully returned.
ID = 3760
Get_parent_id(Log_Line line,Integer &parent)
Name
Integer Get_parent_id(Log_Line line,Integer &parent)
Description
Get the Id of the parent of a given Log_Line line and return it in Integer parent.
A function return value of zero indicates the id was successfully returned.
ID = 3761
Get_parent(Log_Line line,Log_Line &parent)
Name
Integer Get_parent(Log_Line line,Log_Line &parent)
Description
Get the parent of a given Log_Line line and return it in Log_Line parent.
A function return value of zero indicates the parent was successfully returned.
ID = 3762
Append_log_line(Log_Line line,Log_Line parent)
Name
Integer Append_log_line(Log_Line line,Log_Line parent)
Description
Append a given Log_Line line to a parent Log_Line group parent.
If the parent is not a group, the function return -3.
Note that each Log_Line can be added at most one time; the add destination can be one of the 
three types: Output window; a Log_Box; or a parent Log_Line group. If the line is already added, 
then the function will return -4.
A function return value of zero indicates the append was successful.
ID = 3763
Add_macro_action(Log_Line line,Text prompt,Text tip,Text cmd,Text msg)
Name
Integer Add_macro_action(Log_Line line,Text prompt,Text tip,Text cmd,Text msg))
Description
Panels and Widgets

The result is the created action id. This is the number that can be used for the calls 
Get_log_line_action_id_*
cmd is the string returned in Wait_on_events
msg is the string returned in Wait_on_events
example
  Log_Line tll = Create_text_log_line("Test macro action", 0);
  Integer id1 = Add_macro_action(tll,"Macro action","" ,"fourtytwo","so long and thanks for the 
fish");
  Integer doit = 1;
  while(doit) 
  { 
 Integer64 id;
 Text cmd;
 Text msg;
 Integer ret = Wait_on_events(id,cmd,msg);  
 if (cmd == "fourtytwo") {
 // ret is the id of the action :)
 Print(ret);  Print(" = ");  Print(id);  Print(" : ");  Print(msg);  Print();
 if(ret == id1) {
 Print("#1");  Print();
 Integer action_index;
 Integer64 action_time;
 Text action_help;
 Integer action_mode;
 Get_log_line_action_id_index(tll,ret,action_index);
 Get_log_line_action_id_time (tll,ret,action_time );
 Get_log_line_action_id_help (tll,ret,action_help );
 Get_log_line_action_id_mode (tll,ret,action_mode );
 Print(" action id = ");  Print(ret );  Print();
 Print(" action id index = ");  Print(action_index);  Print();
 Print(" action id time  = ");  Print(action_time );  Print();
 Print(" action id help  = ");  Print(action_help );  Print();
 Print(" action id mode  = ");  Print(action_mode );  Print();
 }
A function return the added action id which is a positive number. If the Log_Line line is not valid or 
there are some other errors, the return value will be zero or negative.
ID = 7964
Panels and Widgets
Chapter 
Get_log_line_number_of_actions(Log_Line line,Integer &action_count)
Name
Integer Get_log_line_number_of_actions(Log_Line line,Integer &action_count)
Description
Get the total user actions added to the given Log_Line line, and set the number to action_count. 
This number does not include any inbuilt actions. When a log line is something like an 
Edit_File_Log_Line, it has the inbuilt actions "Edit file" and "Open folder". They are not user actions 
and so cannot be accessed or modified.
A function return value of zero indicates the get was successful.
ID = 7965
Get_log_line_action_id_index(Log_Line line,Integer id,Integer &action_index)
Name
Integer Get_log_line_action_id_index(Log_Line line,Integer id,Integer &action_index)
Description
Get the user action with given id (the return value of Add_macro_action) of the given Log_Line line, 
and set the index (1 2 3 counting of the order that actions being added) to action_index. 
A function return value of zero indicates the get was successful.
ID = 7966
Get_log_line_action_id_time(Log_Line line,Integer id,Integer64 &action_time)
Name
Integer Get_log_line_action_id_time(Log_Line line,Integer id,Integer64 &action_time)
Description
Get the user action with given id (the return value of Add_macro_action) of the given Log_Line line, 
and set the time to action_time. 
action_time is when the user last performed the action. 0 means not actioned
A function return value of zero indicates the get was successful.
ID = 7967
Get_log_line_action_id_help(Log_Line line,Integer id,Text &action_help)
Name
Integer Get_log_line_action_id_help(Log_Line line,Integer id,Text &action_help)
Description
Get the user action with given id (the return value of Add_macro_action) of the given Log_Line line, 
and set the help text to action_help. 
A function return value of zero indicates the get was successful.
ID = 7968
Get_log_line_action_id_mode(Log_Line line,Integer id,Integer &action_mode)
Name
Panels and Widgets

Integer Get_log_line_action_id_mode(Log_Line line,Integer id,Integer &action_mode)
Description
Get the user action with given id (the return value of Add_macro_action) of the given Log_Line line, 
and set the mode to action_index. 
action_mode is reserved for whether the action is manditory. The intent here is unless an action 
has been actioned, you may not be able to exit the option
A function return value of zero indicates the get was successful.
ID = 7969
Get_log_line_action_id(Log_Line line,Integer index,Integer &action_id)
Name
Integer Get_log_line_action_id(Log_Line line,Integer index,Integer &action_id)
Description
Get the user action number index (1 2 3 counting of the order that actions being added) of the given 
Log_Line line, and set the index to action_index. 
A function return value of zero indicates the get was successful.
ID = 7970
Get_log_line_action_time(Log_Line line,Integer index,Integer64 &action_time)
Name
Integer Get_log_line_action_time(Log_Line line,Integer index,Integer64 &action_time)
Description
Get the user action number index (1 2 3 counting of the order that actions being added) of the given 
Log_Line line, and set the time to action_time. 
action_time is when the user last performed the action. 0 means not actioned
A function return value of zero indicates the get was successful.
ID = 7971
Get_log_line_action_id_help(Log_Line line,Integer id,Text &action_help)
Name
Integer Get_log_line_action_id_help(Log_Line line,Integer id,Text &action_help)
Description
Get the user action number index (1 2 3 counting of the order that actions being added) of the given 
Log_Line line, and set the help text to action_help. 
A function return value of zero indicates the get was successful.
ID = 7972
Get_log_line_action_id_mode(Log_Line line,Integer id,Integer &action_mode)
Name
Integer Get_log_line_action_id_mode(Log_Line line,Integer id,Integer &action_mode)
Description
Panels and Widgets
Chapter 
Get the user action number index (1 2 3 counting of the order that actions being added) of the given 
Log_Line line, and set the mode to action_index. 
action_mode is reserved for whether the action is manditory. The intent here is unless an action 
has been actioned, you may not be able to exit the option
A function return value of zero indicates the get was successful.
ID = 7973
Panels and Widgets

5.61.13 Buttons
There are four types of Buttons - the Button, Finish_Button, Select_Button and a special Help 
button.
The Button and Finish_Button consist of just a Title, and a Text reply. When clicked the reply is 
send as a command via Wait_on_widgets.
The Select_Button is used to select strings. This has now been superseded by the Select_Box or 
the New_Select_Box.
The Help Button is created by a special call that allows the macro to hook into the Extra Help 
system for 12d Model.
To the eye, the four types of buttons look identical but their behaviour is different.
See 5.61.13.1 Button
See 5.61.13.2 Finish Button
See 5.61.13.3 Select_Button
See 5.61.13.4 Help Button
Button
Select_Button
Finish_Button
Help Button with extra help
Panels and Widgets
Chapter 
5.61.13.1 Button
A Button consists of a title, and a Text reply.
The Button is shown on the screen with title text surrounded by a rectangle to delineate the area on 
the screen associated with the Button.
Whenever the mouse is moved over the Button area, it will highlight and if  LB or  RB is clicked on 
the highlighted button, the Buttons sends the reply back to the macro as a command via 
Wait_on_Widgets.
Commands and Messages for Wait_on_Widgets
Pressing and releasing  LB or  RB whilst highlighting the Button sends the Text reply as a command 
with nothing in message.
Pressing and releasing  MB does nothing.
Create_button(Text title_text,Text reply)
Name
Button Create_button(Text title_text,Text reply)
Description
Create a Widget of type Button.
The Button is created with title_text a the text on the Button.
The Text reply is the command that is sent by the Button back to the macro via Wait_on_widgets 
when the Button is clicked on. See  Wait_on_widgets(Integer &id,Text &cmd,Text &msg).
The function return value is the created Button.
ID = 850
Create_button(Text title_text,Text reply,Text bitmap_name)
Name
Button Create_button(Text title_text,Text reply,Text bitmap_name)
Description
Create a Widget of type Button.
The Button is created with image using file named bitmap_name and title_text a the text on the 
Button.
The Text reply is the command that is sent by the Button back to the macro via Wait_on_widgets 
when the Button is clicked on. See  Wait_on_widgets(Integer &id,Text &cmd,Text &msg).
The function return value is the created Button.
Button title
Highlighting of Button when
mouse passes over it
rectangle showing
the Button extent
Button Widget
Panels and Widgets

ID = 7672
Create_run_button(Text title_text,Text reply)
Name
Button Create_run_button(Text title_text,Text reply)
Description
Create a Widget of type Button.
The run Button is created with title_text a the text on the Button.
"Standard" operation panels should have exactly one run button per panel.
The Text reply is the command that is sent by the Button back to the macro via Wait_on_widgets 
when the Button is clicked on. See  Wait_on_widgets(Integer &id,Text &cmd,Text &msg).
The function return value is the created Button.
ID = 7999
Set_panel_allow_test_case(Panel panel,Integer onoff)
Name
Integer Set_panel_allow_test_case(Panel panel,Integer onoff)
Description
Internal use only.
The function return value is the created Button.
ID = 8000
Set_raised_button(Button button,Integer mode)
Name
Integer Set_raised_button(Button button,Integer mode)
Description
Not yet implemented
Set the button raised or sank depending on the mode value.
mode              value
  -3                     Raise
   0                     Flat
   3                     Sink
A function return value of zero indicates the button was successfully raised.
ID = 1058
Create_child_button(Text title_text)
Name
Button Create_child_button(Text title_text)
Description
Not implemented.
ID = 851
Panels and Widgets
Chapter 
For information on the other Buttons, go to 5.61.13 Buttons
Panels and Widgets

5.61.13.2 Finish Button
The Finish Button is a special Button and there should only be one per panel. 
A Finish Button consists of a title, and a Text reply.
Like a standard Button, the Finish Button is shown on the screen with title text surrounded by a 
rectangle to delineate the area on the screen associated with the Finish Button.
Whenever the mouse is moved over the Finish Button area, it will highlight and if  LB or  RB is 
clicked on the highlighted button, the Finish Button sends the reply back to the macro as a 
command via Wait_on_Widgets.
Commands and Messages for Wait_on_Widgets
Pressing and releasing  LB or  RB whilst on the Button sends the Text reply as a command with 
nothing in message.
Pressing and releasing  MB does nothing.
Create_finish_button(Text title_text,Text reply)
Name
Button Create_finish_button(Text title_text,Text reply)
Description
Creates a Finish Button with title_text the text on the Button.
The Text reply is the command that is sent by the Button back to the macro via Wait_on_widgets 
when the Button is clicked on. See  Wait_on_widgets(Integer &id,Text &cmd,Text &msg).
This is a special button and there should only be one per panel. The title_text is normally "Finish"
At the end of the processing in the macro, Set_finish_button (see  Set_finish_button(Widget 
panel,Integer move_cursor)) should be called to put the cursor on the Finish button. 
Set_finish_button needs to be called so that chains know that the macro has terminated correctly.
The function return value is the created Button.
ID = 1367
Set_finish_button(Widget panel,Integer move_cursor)
Name
Integer Set_finish_button(Widget panel,Integer move_cursor)
Description
If move_cursor = 1 then the cursor is moved onto the finish button.
ID = 1368
Finish Button title
Highlighting of Finish Button
when mouse passes over it
rectangle showing
the Finish Button
 extent
(it does not have to be "finish")
Button Widget
Panels and Widgets
Chapter 
For information on the other Buttons, go to 5.61.13 Buttons
Panels and Widgets

5.61.13.3 Select_Button
A Select_Button consists of a title, and a Text reply.
Like a standard Button, the Select_Button is shown on the screen with the title text surrounded by 
a rectangle to delineate the area on the screen associated with the Button.
Whenever the mouse is moved over the Button area, it will highlight.
However unlike a Button, clicking  LB or  RB on the Select_Button will start a String Select, and the 
selected string is recorded so that it can be used by the macro.
Commands and Messages for Wait_on_Widgets
Clicking  LB or  RB on the Select_Botton:
sends a "start select" command with nothing in message, then as the mouse is moved over a 
view, a "motion select" command is sent with the view coordinates and view name as text in 
message.
Once in the select:
if a string is clicked on with  LB, a "pick select" command is sent with the name of the view that the 
string was selected in, in message. if the string is accepted ( MB), an "accept select" command is sent 
with the view name (in quotes) in message, or if  RB is clicked and Cancel selected from the Pick Ops 
menu, then a "cancel select" command is sent with nothing in message.
if a string is clicked on with  MB (the pick and accept in one click method), a "pick select" command is 
sent with the name of the view that the string was selected in, in message, followed by an "accept 
select" command with the view name (in quotes) in message.
Nothing else typed over the Select_Button sends any commands or messages.
Create_select_button(Text title_text,Integer mode,Message_Box box)
Name
Select_Button Create_select_button(Text title_text,Integer mode,Message_Box box)
Description
Create a button of type Select_Button. 
This is a special Button that when clicked, allows the user to select a string.
 The button is created with the label text title_text.
The Message_Box box is selected to display the select information.
The value of mode is:
mode
value
SELECT_STRING 
5509
Select_Button title
Highlighting of Select_Button
when mouse passes over it
rectangle showing
the Select_Button
extent
Select_Button Widget
Panels and Widgets
Chapter 
SELECT_STRINGS 
5510
not implemented!
Refer to the list in the Appendix A.
The function return value is the created Select_Button.
Note The Select_Button is now rarely used and has been replaced by the New_Select_Box or the 
Select_Box. See 5.61.10.24 New_Select_Box and 5.61.10.31 Select_Box
ID = 881
Validate(Select_Button select,Element &string)
Name
Integer Validate(Select_Button select,Element &string)
Description
Validate the Element string that is selected via the Select_Button select. 
The function returns the value of:
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
 ID = 978
Validate(Select_Button select,Element &string,Integer silent)
Name
Integer Validate(Select_Button select,Element &string,Integer silent)
Description
Validate the contents of Select_Button select and return the selected Element in string. 
If silent = 0, and there is an error, a message is written and the cursor goes back to the button.
If silent = 1 and there is an error, no message or movement of cursor is done.
The function returns the value of:
     TRUE (1) if no other return code is needed and string is valid.
     FALSE (zero) if there is an error.
So a function return value of zero indicates that there is an error.
Warning this is the opposite of most 12dPL function return values
ID = 1375
Set_data(Select_Button select,Element string) 
Name
Integer Set_data(Select_Button select,Element string) 
Panels and Widgets

Description
Sets the Element for the Select_Button select to string.
A function return value of zero indicates the data was successfully set.
ID = 1173
Set_data(Select_Button select,Text string)
Name
Integer Set_data(Select_Button select,Text string)
Description
Set the model and string name as a Text string in the form "model_name->string_name"
A function return value of zero indicates the data was successfully set.
ID = 979
Get_data(Select_Button select,Text &string)
Name
Integer Get_data(Select_Button select,Text &string)
Description
Get the model and string name for the selected string in the form "model_name->string_name". 
Return the Text in string.
The returned string type must be Text.
A function return value of zero indicates the data was successfully returned.
ID = 980
Select_start(Select_Button select) 
Name
Integer Select_start(Select_Button select) 
Description
Starts the string selection for the Select_Button select. This is the same as if the button had been 
clicked.
A function return value of zero indicates the start was successful.
ID = 1167
Select_end(Select_Button select) 
Name
Integer Select_end(Select_Button select) 
Description
Cancels the string selection that is running for the Select_Button select. This is the same as if 
Cancel had been selected from the Pick Ops menu.
A function return value of zero indicates the end was successful.
ID = 1168
Panels and Widgets
Chapter 
Set_select_type(Select_Button select,Text type)
Name
Integer Set_select_type(Select_Button select,Text type)
Description
Set the type of the string that can be selected to type for Select_Botton select. For example 
“Alignment”, “3d”.
A function return value of zero indicates the type was successfully set.
ID = 1043
Set_select_snap_mode(Select_Button select,Integer snap_control)
Name
Integer Set_select_snap_mode(Select_Button select,Integer snap_control)
Description
Set the snap control snap_control for the Select_Button select.
 mode 
value
Ignore_Snap 
   0
User_Snap 
   1
Program_Snap 
   2
A function return value of zero indicates the type was successfully set.
ID = 1044
Get_select_direction(Select_Button select,Integer &dir)
Name
Integer Get_select_direction(Select_Button select,Integer &dir)
Description
Get the select_direction dir from the selected string.
The returned dir type must be Integer.
If select without direction, the returned dir is 1, otherwise, the returned dir:
Value
Pick direction
 1
the direction of the string
-1
against the direction of the string
A function return value of zero indicates the direction was successfully returned.
ID = 1046
Set_select_snap_mode(Select_Button select,Integer mode,Integer control,Text text)
Name
Integer Set_select_snap_mode(Select_Button select,Integer mode,Integer control,Text text)
Description
Panels and Widgets

Set the snap mode mode and snap control control
 for the Select_Button select.
When snap mode is:
Name_Snap
6
Tin_Snap
7
Model_Snap
8
the snap_text must be string name; tin name, model name accordingly, otherwise, leave the 
snap_text blank “”.
A function return value of zero indicates the type was successfully set.
Get_select_coordinate(Select_Button select,Real &x,Real &y,Real &z,Real &ch,Real 
&ht)
Name
Integer Get_select_coordinate(Select_Button select,Real &x,Real &y,Real &z,Real &ch,Real &ht)
Description
Get the coordinate of the selected snap point.
The return value of x, y, z, ch and ht must be type of Real.
A function return value of zero indicates the coordinate was successfully returned.
 ID = 1047
For information on the other Buttons, go to 5.61.13 Buttons
Panels and Widgets
Chapter 
5.61.13.4 Help Button
In 12d Model every inbuilt panel (that is ones not created by macros) can have a Help button which 
when selected goes to the topic describing that panel. The default 12d Model Help is all in one Help 
file but a method for displaying additional help information exists so 12d Solutions, 12d Distributors 
and Users can supply additional (extra) Help information.
In the macro language there is also a method of creating one Help button that is used for all the 
panels created in that macro and that Help button provides access to the context sensitive help 
provides by 12d Solutions (only of use to 12d Solutions programmers) AND also access to the Extra 
Help system that is available for all Users to supply their own, or additional (extra) Help information.
If there is Extra Help available for an option, then Help* will appear instead of Help on the panel 
button.
Create_help_button(Panel panel,Text title_txt)
Name
Button Create_help_button(Panel panel,Text title_txt)
Description
Create a button with the title title_text and return it as the function return value.
To set up the file for extra help, see  How to Set Up Extra Help.
 ID = 2633
How to Set Up Extra Help
Any extra help for a macro is placed in a folder with the same name as the macro but without the 
ending "4do" after the “.” and with any blanks or non alphanumeric characters replaced by a 
underscore ("_").
For example, the extra help files for the macro called "testing help (3) system.4do" go in a folder 
called testing_help__3__system. Note there is an underscore for the blanks and the "(" and ")" in 
the macro name.
The extra help files for the macro that are placed in that folder can be a pdf, wmv, avi. txt etc.
The folder of Extra Help for the macro, is then placed in any one of the three places:
(a)
in the Help folder in the 12d Model installation area: For example, for version 10,
c:\Program Files\12d\12d Model\10.00\Help
(b)
in a folder called Help inside the Set_ups folder in the 12d Model installation area. For example
c:\Program Files\12d\12d Model\10.00\Set_ups\Help
or
(c)
in a folder called Help inside the User folder in the 12d User area. For example
c:\12d\10.00\User\Help
the Help button will be replaced with a Help *
If there is any documentation for the panel of the macro,
The * indicates that there is extra help available.
Panels and Widgets

For a macro, each of these areas is searched and if any extra help is found, it is listed with the full 
path to each extra help file.
If there is any extra help for a macro, the Help button on the panel will be replaced with a Help * 
button. The * indicates that there is extra help available. 
When you click on the Help * button, you will get a list of all the extra help files for that panel with the 
full pathname to the extra help. Clicking on the file name will bring up that extra help. 
Special Note: 
Users can also have their own extra help files for macros (and also 12d Model panels) and the files 
are simply placed in the correctly named folder under User\Help. For information on Help information 
for 12d Model panels, see the 12d Model Help section in the 12d Model Reference manual.
For information on the other Buttons, go to 5.61.13 Buttons
Panels and Widgets
Chapter 
5.61.14 GridCtrl_Box
A GridCtrl_Box is made up of columns and rows of Widgets.
Each column must have a fixed Widget type, which is defined by supplying an array of Widgets of 
the correct type, one for each column, in column order. The title for each Widget becomes the title 
for the column of the GridCtrl_Box.
The only thing to be careful of is that if the variable types are not defined as actual Widget but are 
derived from Widgets (for example the input boxes Real_Box, Input_Box, Named_Tick_Box etc) 
then they must be cast to Widget before they can be loaded into the array to create the 
GridCtrl_Box. 
As an example, a section of code required to create a GridCtrl_Box, defined the columns for the 
GridCtrl_Box using the array column_widgets[] and display it on the screen is:
  Widget cast(Widget w) // this small routine cast needs to be in the macro code.
  {
 return w;
  }
  void main()
  {
    Panel panel = Create_panel("Panel Grid Test");
    Widget  column_widgets[3];
 Message_Box message_box = Create_message_box("");
 Real_Box col_1_box = Create_real_box("My Real", message_box);
 Input_Box col_2_box = Create_input_box("My Input", message_box);
    Named_Tick_Box  col_3_box   = Create_named_tick_box("Tick", 1, "resp");
 column_widgets[1] = cast(col_1_box);
 column_widgets[2] = cast(col_2_box);
    column_widgets[3] = cast(col_3_box);
 GridCtrl_Box grid_box = Create_gridctrl_box("MyGrid", 2, 3, column_widgets,1,
 message_box, 100, 200);
    Append(grid_box, panel);
    Show_widget(panel);
Important note: Loading data into the GridCtrl_Box can only be done after the Show_widget call is 
made.
Two rows
Three columns with column types Real_Box, Input_Box, Tick_Box.
The titles of the Widgets are the headings for the columns.
Grid navigation
message box
boxes
Panels and Widgets

Create_gridctrl_box(Text name,Integer num_rows,Integer num_columns,Widget 
column_widgets[],Integer show_nav,Message_Box messages,Integer width,Integer 
height) 
Name
GridCtrl_Box Create_gridctrl_box(Text name,Integer num_rows,Integer num_columns,Widget 
column_widgets[],Integer show_nav,Message_Box messages,Integer width,Integer height) 
Description
This call creates a new GridCtrl_Box object which can be added to Panels.
name is the name of the GridCtrl_Box and the number of rows that the grid initially has is 
num_rows and the number of columns is num_columns (rows can also be added or deleted after 
the GridCtrl_Box has been displayed). 
column_widgets[] is an array of Widgets in column order, and each Widget is of the type for that 
column. For an example see 5.61.14 GridCtrl_Box.
If show_nav is 1 then there are navigation boxes on the side of the GridCtrl_Box.
If show_nav is 0 then there are no navigation boxes.
The width of the grid cell is width and the height of the grid cell is height, The units for width and 
height are screen units (pixels). 
Important note: All Boxes, even through they have names like Real_Box and Input_Box, derived 
from Widgets and can be used in many options that take a Widget. For example Show_widget. 
However for the array of widgets column_widgets[ ] defining the GridCtrl_Box columns, the array 
values need to be Widget and so the other types derived from Widget have to be cast to a Widget 
before they can be used to fill the column_widgets[] array. The cast is easily done by simply having 
the following cast function defined and in your macro code.
 Widget cast(Widget w)
 {
 return w;
    }
See 5.61.14 GridCtrl_Boxfor an example of using cast when defining values for column_widgets[].
If the rows and columns are too large to fit inside the area defined by width and height, scroll bars 
are automatically created so that all cells can be reached.
GridCtrl_Box with two row and three columns with column types Real_Box, Input_Box, Tick_Box
The titles of the Widgets are the headings for the columns
Grid navigation
boxes
show_nav = 1
show_nav = 0
so navigation boxes
so navigation boxes
Panels and Widgets
Chapter 
The created GridCtrl_Box is returned as the function return value.
ID = 2393
Create_gridctrl_box(Text name,Integer num_rows, Integer num_columns,Widget 
column_widgets[],Integer column_readonly[], Integer show_nav,Message_Box 
messages,Integer width,Integer height) For V10 only 
Name
GridCtrl_Box Create_gridctrl_box(Text name,Integer num_rows,Integer num_columns,Widget 
column_widgets[],Integer column_readonly[],Integer show_nav,Message_Box messages,Integer 
width,Integer height) 
Description
This call creates a new GridCtrl_Box object which can be added to Panels.
This is the same as the previous GridCtrl_Box function except that there is also the array 
column_readonly[] where 
column_readonly[] is an Integer array of size num_columns where a value of 1 means that the 
cell is read only, and 0 means that the cell can be edited.
See  Create_gridctrl_box(Text name,Integer num_rows,Integer num_columns,Widget 
column_widgets[],Integer show_nav,Message_Box messages,Integer width,Integer height) for more 
A horizontal scroll bar is automatically added when
the columns are wider than the given width
A vertical scroll bar is automatically added 
when the rows are wider than the
given height
column_readonly[1] = 0;
column_readonly[2] = 1;
column_readonly[3] = 0;
Integer column_readonly[3];
Second column is read only
To set only the middle column
to be read only - 
Panels and Widgets

documentation for this function.
The created GridCtrl_Box is returned as the function return value.
ID = 2654
Load_widgets_from_row(GridCtrl_Box grid,Integer row_num)
Name
Integer Load_widgets_from_row(GridCtrl_Box grid,Integer row_num) 
Description
Let column_widgets[] be the array that was used to define the GridCtrl_Box columns in the 
Create_gridcltrl_box call. See  Create_gridctrl_box(Text name,Integer num_rows,Integer 
num_columns,Widget column_widgets[],Integer show_nav,Message_Box messages,Integer 
width,Integer height).
Load_widgets_from_row loads the values in row row_num of the GridCtrl_Box grid into 
column_widgets[].
Load_widgets_from_row allows you to validate grid values for a row, or to get the values to use for 
other purposes.
To change grid values, you first call Load_widgets_from_row to place the existing values for a row 
into column_widgets[], change the values that you wish to change in column_widgets[], and then 
call Load_row_from_widgets to load the new values from column_widgets[] back into the row. See 
Load_row_from_widgets(GridCtrl_Box grid,Integer row_num).
Note - this call can only be made after the Show_widget call is made to display the panel containing 
the GridCtrl_Box.
A function return value of zero indicates the load was successful.
 ID = 2394
Load_row_from_widgets(GridCtrl_Box grid,Integer row_num) 
Name
Integer Load_row_from_widgets(GridCtrl_Box grid,Integer row_num) 
Description
Let column_widgets[] be the array that was used to define the GridCtrl_Box columns in the 
Create_gridcltrl_box call. See  Create_gridctrl_box(Text name,Integer num_rows,Integer 
num_columns,Widget column_widgets[],Integer show_nav,Message_Box messages,Integer 
width,Integer height).
Load_row_from_widgets loads the values of column_widgets[] into row row_num of the 
GridCtrl_Box grid. 
Note - this call can only be made after the Show_widget call is made to display the panel containing 
the GridCtrl_Box.
A function return value of zero indicates the load was successful.
ID = 2395
Insert_row(GridCtrl_Box grid) 
Name
Panels and Widgets
Chapter 
Integer Insert_row(GridCtrl_Box grid)
Description
This call inserts a blank row at the bottom of the GridCtrl_Box grid.
Note - this call can only be made after the Show_widget call is made to display the panel containing 
the GridCtrl_Box.
A function return value of a positive number indicates the insertion was successful; and the number 
should equal the number of rows after the insertion.
ID = 2396
Insert_row(GridCtrl_Box grid,Integer row_num,Integer is_before) 
Name
Integer Insert_row(GridCtrl_Box grid,Integer row_num,Integer is_before) 
Description
This call inserts a blank row into the GridCtrl_Box grid.
If is_before = 1, a blank row is inserted before row_num, so that the blank row becomes the new 
row_num’th row. The old rows from row row_num onwards are all pushed down one row.
If is_before = 0, a blank row is after row row_num, so that the blank row becomes a new 
(num_row+1)’th row. The old rows from row (num_row+1) onwards are pushed down one row.
t row number row_num of the GridCtrl_Box grid.
If you wish it to be inserted before the specified row, set is_before to 1, otherwise the row will be 
inserted after.
Note: a GridCtrl_Box(grid) call should be done after the Insert_row(GridCtrl_Box grid,Integer 
row_num,Integer is_before) call. See  Format_grid(GridCtrl_Box grid).
A function return value of a positive number indicates the insertion was successful; and the number 
should equal the number of rows after the insertion.
ID = 2397
Delete_row(GridCtrl_Box grid,Integer row_num) 
 Name
Integer Delete_row(GridCtrl_Box grid,Integer row_num) 
Description
Delete the row row_num from the GridCtrl_Box grid.
A function return value of zero indicates the row was successfully deleted.
ID = 2408
Delete_all_rows(GridCtrl_Box grid) 
Name
Integer Delete_all_rows(GridCtrl_Box grid) 
Description
Delete all the rows of the GridCtrl_Box grid.
A function return value of zero indicates the rows were successfully deleted.
ID = 2409
Panels and Widgets

Get_row_count(GridCtrl_Box grid)
Name
Integer Get_row_count(GridCtrl_Box grid)
Description
This call returns the number of rows currently in a GridCtrl_Box grid as the function return value.
 ID = 2398
Format_grid(GridCtrl_Box grid) 
Name
Integer Format_grid(GridCtrl_Box grid) 
Description
This call formats the GridCtrl_Box grid. 
This means it makes sure all columns and rows are large enough to fit any entered data. 
A function return value of zero indicates the format was successful.
ID = 2399
Set_cell(GridCtrl_Box grid,Integer row_num,Integer col_num,Text value) 
Name
Integer Set_cell(GridCtrl_Box grid,Integer row_num,Integer col_num,Text value) 
Description
For the cell with row number row_num and column number col_num of the GridCtrl_Box grid, set 
the text value of the cell to text.
It is recommended that you use the Load_row_from_widgets call, as this call will not provide any 
validation of data.
This call will return 0 if successful.
A function return value of zero indicates the set was successful.
ID = 2400
Get_cell(GridCtrl_Box grid,Integer row_num,Integer col_num,Text &value) 
Name
Integer Get_cell(GridCtrl_Box grid,Integer row_num,Integer col_num,Text &value) 
Description
Get the text value of the cell at row number row_num and column number col_num of the 
GridCtrl_Box grid, and returns the text in value.
 It is recommended that you use the Load_widgets_from_row call instead, as this call will not 
provide any validation of data.
A function return value of zero indicates the get was successful.
ID = 2401
Panels and Widgets
Chapter 
Set_column_width(GridCtrl_Box grid,Integer col,Integer width) 
Name
Integer Set_column_width(GridCtrl_Box grid,Integer col,Integer width) 
Description
For the GridCtrl_Box grid, set the width of column number col to width. The units of width are 
screen units (pixels).
The column can be made invisible by setting its width to 0.
A function return value of zero indicates the width was successfully set.
ID = 2402
Set_modified(GridCtrl_Box grid,Integer modified) 
Name
Integer Set_modified(GridCtrl_Box grid,Integer modified) 
Description
This call sets the modified state of the GridCtrl_Box grid. 
If modified = 0 then the modified state is set to off.
If modified = 1 then the modified state is set to on.
A function return value of zero indicates the modified state was successfully set.
ID = 2403
Panels and Widgets

Set_warn_on_modified(GridCtrl_Box grid,Integer warn_on_modified)
 Name
Integer Set_warn_on_modified(GridCtrl_Box grid,Integer warn_on_modified) 
Description
This call sets the warn on modified state of the GridCtrl_Box grid.
If warn_on_modified = 1 then if the panel containing grid is being closed and grid is in a modified 
state, then the user is prompted to confirm that grid is to be closed.
If warn_on_modified = 0 then there is no warning when the panel containing grid is being closed 
even if the panel has been modified.
Note: a GridCtrl_Box is in a in a modified state if data in the GridCtrl_Box has been changed and the 
modified state has not been set off by a Set_modified(grid,0) call. See  Set_modified(GridCtrl_Box 
grid,Integer modified)
The default for a GridCtrl_Box is that a warning is given when attempting to close it.
A function return value of zero indicates the warn on modified state was successfully set.
ID = 2404
Panels and Widgets
Chapter 
Get_selected_cells(GridCtrl_Box grid,Integer &start_row,Integer &start_col,Integer 
&end_row,Integer &end_col) 
Name
Integer Get_selected_cells(GridCtrl_Box grid,Integer &start_row,Integer &start_col,Integer 
&end_row,Integer &end_col) 
Description
For the GridCtrl_Box grid, return the minimum and maximum row and column numbers for the 
current selected cells (the range of the selected cells).
The minimum and maximums are returned in start_row, start_col and end_row and end_col.
Note that not all the cells in the range need to be selected.
The function return value is zero if there are selected cells and the range is returned successfully.
The function return value is non-zero is there are no selected rows.
ID = 2410
start_row = 2
start_col= 1
end_row = 4
end_col = 4
Panels and Widgets

Get_focus_cells(GridCtrl_Box grid,Integer &row,Integer &col)
Name
Integer Get_focus_cells(GridCtrl_Box grid,Integer &row,Integer &col) 
Description
For the GridCtrl_Box grid, return the row and column numbers for the current focus cell.
The function return value is zero if there is the focus cell and the numbers is returned successfully.
ID = 7897
Set_fixed_row_count(GridCtrl_Box grid,Integer num_fixed_rows) 
Name
Integer Set_fixed_row_count(GridCtrl_Box grid,Integer num_fixed_rows) 
Description
Sets the number of fixed rows in the GridCtrl_Box grid. 
Fixed rows can not be deleted or moved and rows can not be inserted between two other fixed rows. 
If you want Row labelled number 1 to be fixed the num_fixed_rows should be equal to two. This is 
because the top header is already a fixed row.
Therefore, there is an offset of one. If you want rows one and two to be fixed, the num_fixed_rows 
should be three.
A function return value of zero indicates the set was successful.
ID = 2655
Panels and Widgets
Chapter 
Get_fixed_row_count(GridCtrl_Box grid) 
Name
Integer Get_fixed_row_count(GridCtrl_Box grid) 
Description
Gets the number of fixed rows in the GridCtrl_Box grid. 
Fixed rows can not be deleted or moved and rows can not be inserted between two other fixed 
rows. 
Note that the top header row is already a fixed row.
The number of fixed rows is returned as the function return value.
ID = 2656
Set_cell_read_only(GridCtrl_Box grid,Integer row,Integer col,Integer read_only) 
Name
Integer Set_cell_read_only(GridCtrl_Box grid,Integer row,Integer col,Integer read_only) 
Description
For the GridCtrl_Box grid, set the cell specified by row row and column col as read only.
Note that colouring may be removed when grid is formatted and the format_grid message should 
be trapped to reapply these settings.
A function return value of zero indicates the set was successful.
ID = 2657
Get_cell_read_only(GridCtrl_Box grid,Integer row,Integer col) 
Name
Integer Get_cell_read_only(GridCtrl_Box grid,Integer row,Integer col) 
Description
For the GridCtrl_Box grid, check if the cell specified by row row and column column is read only. 
The function return value is:
1 if the cell is read only 
zero if the cell is not read only.
ID = 2658
Set_cell_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour)
Name
Integer Set_cell_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour) 
Description
Do not use this call/
For the GridCtrl_Box grid, set the text and back colour of the cell specified by row row and 
column col to colour
A function return value of zero indicates the call was successful.
ID = 6892
Panels and Widgets

Set_cell_text_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour)
Name
Integer Set_cell_text_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour) 
Description
For the GridCtrl_Box grid, set the text colour of the cell specified by row row and column col to 
colour
A function return value of zero indicates the call was successful.
ID = 6893
Set_cell_back_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour)
Name
Integer Set_cell_back_colour(GridCtrl_Box grid,Integer row,Integer col,Integer colour) 
Description
For the GridCtrl_Box grid, set the back colour of the cell specified by row row and column col to 
colour.
A function return value of zero indicates the call was successful.
ID = 6894
Is_cell_selected(GridCtrl_Box grid,Integer row,Integer col,Integer &selected)
Name
Integer Is_cell_selected(GridCtrl_Box grid,Integer row,Integer col,Integer &selected) 
Description
For the GridCtrl_Box grid, check if the cell specified by row row and column col is selected and set 
selected to 1 for true and 0 for false.
A function return value of zero indicates the call was successful.
ID = 7963
Panels and Widgets
Chapter 
5.61.15 Tree Box Calls
The tree box is a widget that consists of two parts - a left hand side (Tree) and a right hand side for 
displaying information for a particular part of the tree. 
The tree on the left hand side is made up of nodes (or pages).
Each node (page) can have a set of Widgets that are displayed on the right hand side, when that 
node is selected on the left hand side.
Each node (page) can have zero or more of children pages.
The Tree_Box is similar in style to the 12d Model panels for Super Alignment Parts Editor, the 
Chain editor and the Env.4d editor.
 Create_tree_box(Text name,Text root_item_text,Integer tree_width,Integer 
tree_height)
Name
Tree_Box Create_tree_box(Text name,Text root_item_text,Integer tree_width,Integer tree_height)
Description
This call creates a Tree_Box with the name name and with width tree_width and height 
tree_height. The units for width and height are screen units (pixels).
An empty node/page at the root of the tree is created with the title root_item_text. This is called the 
root page.
The right hand side of
Tree_Page "Page 1" 
comes up when you
click on "Page 1" in the
Border around 
right hand side
of "Page1"
Title for border
Tree on the left hand side
Left hand side of the Tree_Box
The Tree expands/collapses
when you click on + or -
Children of 
Page 1"
Right hand side of the Tree_Box
Panels and Widgets

The created Tree_Box is returned as the function return value.
ID = 2571
Get_root_page(Tree_Box tree_box)
Name
Tree_Page Get_root_page(Tree_Box tree_box)
Description
Get the root page of the Tree_Box tree_box and return it as the function return value.
All Tree_Box’s automatically have a root page.
ID = 2572
 Create_tree_page(Tree_Page parent_page,Text name,Integer show_border, Integer 
use_name_for_border)
Name
Tree_Page Create_tree_page(Tree_Page parent_page,Text name,Integer show_border,Integer 
use_name_for_border)
Description
This call creates a new Tree_Page with the name name, as a child of the Tree_Page parent_page. 
Note: a lot of tree pages created in one instance of 12D will crash 12D because of the limited GDI 
count Windows allow for each running application.
When the right hand side of the created page exists and there is none or more than one Group 
(either Horizontal_Group’s and/or Vertical_Group’s), then the right hand side can have an optional 
border and be given the name of the Tree_Page as a title for the border.
If show_border = 1, a border is drawn around the right had side of the created Tree_Page. 
If show_border = 0, no border is drawn around the right had side of the created Tree_Page. 
If use_name_for_border = 1, name is used as the title when the border is drawn around the right 
An example of a section of the code required to create a Tree_Box with its root page is:
  Tree_Box tree_box = Create_tree_box("Tree", "Tree Root", 200, 200);
Panels and Widgets
Chapter 
had side of the created Tree_Page. 
If use_name_for_border = 0, there is no title when the border is drawn around the right had side of 
the created Tree_Page. 
A parent page must exist before a child page can be created. The parent page may be the root page 
that is automatically created for a Tree_Box and the Get_root_page call is used to get the root page 
of a Tree_Box. See  Get_root_page(Tree_Box tree_box)
A Tree_Page can contain any number of children pages.
Right hand side of
Tree_Page "Page 1"
The right hand side comes up when you 
click on "Page 1" in the Tree on the left
Border around 
right hand side
of "Page1"
Title for border
An example of a section of the code required to create a Tree_Box with its root page, and then one 
child page of the root page is:
  Tree_Box tree_box = Create_tree_box("Tree", "Tree Root", 200, 200);
// get the root page to add a child page called "Page 1" to
  Tree_Page root_page = Get_root_page(tree_box);
  Tree_Page page_1 = Create_tree_page(root_page, "Page 1", 1, 1);
Panels and Widgets

The created Tree_Box is returned as the function return value.
ID = 2577
Append(Widget widget,Tree_Page page)
Name
Integer Append(Widget widget,Tree_Page page)
Description
Append the Widget widget to the Tree_Page page. 
All Widgets appended to a Tree_Page page are displayed on the right hand side of the Tree_Box 
when the user clicks on page on the left hand side of the Tree_Box.
A function return value of zero indicates the Widget was successfully appended.
An example of a section of the code required to create a Tree_Box with its root page, one child page 
of the root page, and some boxes to show on the right had side of the child page is:
   Panel panel = Create_panel("Tree Box test");
  Tree_Box tree_box = Create_tree_box("Tree", "Tree Root", 200, 200);
// get the root page to add a child page to 
  Tree_Page root_page = Get_root_page(tree_box);
  Tree_Page page_1 = Create_tree_page(root_page, "Page 1", 1, 1);
  Message_Box message_box = Create_message_box("");
  Input_Box ib_1 = Create_input_box("Input box", message_box);
  Real_Box db_1 = Create_real_box("Double box", message_box);
  Append(ib_1,page_1);
  Append(db_1,page_1);
  Append(message_box,page_1);
  Append(tree_box, panel);
  Show_widget(panel);
ID = 2583
Panels and Widgets
Chapter 
Get_number_of_pages(Tree_Page page)
Name
Integer Get_number_of_pages(Tree_Page page)
Description
For the Tree_Page page, return the number of child pages belonging to page as the function return 
value.
ID = 2578
Get_page(Tree_Page parent,Integer n,Tree_Page &child_page)
Name
Integer Get_page(Tree_Page parent,Integer page_index,Tree_Page &child_page)
Description
For the Tree_Page parent, find the n’th child page of parent and return the page as child_page.
A function return value of zero indicates a child page was successfully returned.
ID = 2579
Integer Has_child_page(Tree_Page child,Tree_Page parent)
Name
Has_child_page(Tree_Page child,Tree_Page parent)
Description
This call checks if the given child Tree_Page child belongs to the parent Tree_Page parent. 
A non-zero function return value indicates that child is a child page of parent.
Warning this is the opposite of most 12dPL function return values
ID = 2580
Has_widget(Tree_Page page,Widget w)
Name
Integer Has_widget(Tree_Page page,Widget w)
Description
This call checks if the Tree_Page page contains the Widget w.
A non-zero function return value indicates that w is in page.
Warning this is the opposite of most 12dPL function return values
ID = 2581
Panels and Widgets

Get_page_name(Tree_Page page)
Name
Text Get_page_name(Tree_Page page)
Description
For the Tree_Page page, return the Text name of page as the function return value.
ID = 2582
Set_page(Tree_Box tree_box,Widget w)
Name
Integer Set_page(Tree_Box tree_box,Widget w)
Description
Set the current displayed page of the Tree_Box tree to the Tree_Page that contains the Widget w.
This is particularly useful for validation, when validation fails.
A function return value of zero indicates the page was successfully displayed.
ID = 2573
Set_page(Tree_Box tree_box,Tree_Page page)
Name
Integer Set_page(Tree_Box tree_box,Tree_Page page)
Description
Set the current displayed page of the Tree_Box tree to the Tree_Page page.
A function return value of zero indicates the page was successfully displayed.
ID = 2574
Set_page(Tree_box tree_box,Text name)
Name
Integer Set_page(Tree_box tree_box,Text name)
Description
Set the current displayed page of the Tree_Box tree to the Tree_Page with name name.
A function return value of zero indicates the page was successfully displayed.
ID = 2575
Get_current_page(Tree_Box tree_box,Tree_Page &current_page)
Name
Integer Get_current_page(Tree_Box tree_box,Tree_Page &current_page)
Description
Get the Tree_Page that is currently selected and return it in current_page.
A function return value of zero indicates the page was successfully returned.
ID = 2576