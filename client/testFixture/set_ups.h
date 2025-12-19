#ifndef set_ups_included
#define set_ups_included

// --------------------------------------------------------------------------
// colour conversion stuff
// --------------------------------------------------------------------------

Integer create_rgb(Integer r,Integer g,Integer b)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  return((1 << 31) | (r << 16) | (g << 8) | b);
}
Integer is_rgb(Integer colour)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  return((colour & (1 << 31)) ? 1 : 0);
}
Integer get_rgb(Integer colour,Integer &r,Integer &g,Integer &b)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  if(colour & (1 << 31)) {

// a direct colour defined !

    r = (colour & 16711680) >> 16;
    g = (colour &    65280) >> 8;
    b = (colour &      255);

    return(1);
  }
  return(0);
}

#define VIEW_COLOUR 0x7fffffff
#define NO_COLOUR   -1

//----------------------------------------------------------------------------------
//                  SETUPS
//----------------------------------------------------------------------------------

#define CHECK_MODEL_MUST_EXIST         7
#define CHECK_MODEL_EXISTS             3
#define CHECK_MODEL_CREATE             4
#define CHECK_DISK_MODEL_MUST_EXIST    33
#define CHECK_EITHER_MODEL_EXISTS      38
#define GET_MODEL                      10
#define GET_MODEL_CREATE               5
#define GET_MODEL_ERROR                13
#define GET_DISK_MODEL_ERROR           34
#define CHECK_MODEL_MUST_NOT_EXIST     60

#define CHECK_FILE_MUST_EXIST          1
#define CHECK_FILE_CREATE              14
#define CHECK_FILE                     22
#define CHECK_FILE_CREATE              14
#define CHECK_FILE_NEW                 20
#define CHECK_FILE_APPEND              21
#define CHECK_FILE_WRITE               23
#define GET_FILE                       16
#define GET_FILE_MUST_EXIST            17
#define GET_FILE_CREATE                15
#define GET_FILE_NEW                   18
#define GET_FILE_APPEND                19
#define GET_FILE_WRITE                 24



#define GET_TIN                        10


#define CHECK_VIEW_MUST_EXIST          2
#define CHECK_VIEW_MUST_NOT_EXIST      25
#define GET_VIEW                       11
#define GET_VIEW_ERROR                 6

#define CHECK_TIN_MUST_EXIST           8
#define CHECK_TIN_EXISTS               61
#define CHECK_EITHER_TIN_EXISTS        39
#define CHECK_TIN_NEW                  12
#define GET_TIN_ERROR                  9
#define CHECK_DISK_TIN_MUST_EXIST      16
#define GET_TIN_CREATE                 24
#define GET_DISK_TIN_ERROR             35
#define CHECK_TIN_MUST_NOT_EXIST       91

#define CHECK_TEMPLATE_EXISTS           17
#define CHECK_TEMPLATE_CREATE           18
#define CHECK_TEMPLATE_NEW              19
#define CHECK_TEMPLATE_MUST_EXIST       20
#define CHECK_TEMPLATE_MUST_NOT_EXIST   59
#define GET_TEMPLATE                    21
#define GET_TEMPLATE_CREATE             22
#define GET_TEMPLATE_ERROR              23
#define GET_DISK_TEMPLATE_ERROR         40
#define CHECK_DISK_TEMPLATE_MUST_EXIST  48
#define CHECK_EITHER_TEMPLATE_EXISTS    49

#define CHECK_PROJECT_EXISTS           26
#define CHECK_PROJECT_CREATE           27
#define CHECK_PROJECT_NEW              28
#define CHECK_PROJECT_MUST_EXIST       29
#define CHECK_DISK_PROJECT_MUST_EXIST  36
#define GET_PROJECT                    30
#define GET_PROJECT_CREATE             31
#define GET_PROJECT_ERROR              32
#define GET_DISK_PROJECT_ERROR         37

#define CHECK_DIRECTORY_EXISTS         41
#define CHECK_DIRECTORY_CREATE         42
#define CHECK_DIRECTORY_NEW            43
#define CHECK_DIRECTORY_MUST_EXIST     44
#define GET_DIRECTORY                  45
#define GET_DIRECTORY_CREATE           46
#define GET_DIRECTORY_ERROR            47

#define CHECK_FUNCTION_MUST_EXIST         50
#define CHECK_FUNCTION_EXISTS             51
#define CHECK_FUNCTION_CREATE             52
#define CHECK_DISK_FUNCTION_MUST_EXIST    53
#define CHECK_EITHER_FUNCTION_EXISTS      54
#define GET_FUNCTION                      55
#define GET_FUNCTION_CREATE               56
#define GET_FUNCTION_ERROR                57
#define GET_DISK_FUNCTION_ERROR           58
#define CHECK_FUNCTION_MUST_NOT_EXIST     90

#define CHECK_LINESTYLE_MUST_EXIST        82
#define CHECK_LINESTYLE_MUST_NOT_EXIST    83
#define GET_LINESTYLE                     84
#define GET_LINESTYLE_ERROR               85

//    return codes

#define NO_NAME             10

#define NO_MODEL            1
#define MODEL_EXISTS        2
#define DISK_MODEL_EXISTS   19
#define NEW_MODEL           3

#define NO_FILE             4
#define FILE_EXISTS         5
#define NO_FILE_ACCESS      6

#define NO_VIEW             6
#define VIEW_EXISTS         7

#define NO_CASE             8

#define NO_TIN              9
#define TIN_EXISTS          11
#define DISK_TIN_EXISTS     12

#define NO_TEMPLATE           13
#define TEMPLATE_EXISTS       14
#define DISK_TEMPLATE_EXISTS  20
#define NEW_TEMPLATE          15

#define NO_PROJECT          16
#define PROJECT_EXISTS      17
#define NEW_PROJECT         18

#define NO_DIRECTORY        21
#define DIRECTORY_EXISTS    22
#define NEW_DIRECTORY       23

#define NO_FUNCTION           24
#define FUNCTION_EXISTS       25
#define DISK_FUNCTION_EXISTS  26
#define NEW_FUNCTION          27

#define LINESTYLE_EXISTS      80
#define NO_LINESTYLE          81

#define SELECT_STRING   5509
#define SELECT_STRINGS  5510

// teststyle data constants

#define Textstyle_Data_Textstyle 0x001
#define Textstyle_Data_Colour    0x002
#define Textstyle_Data_Type      0x004
#define Textstyle_Data_Size      0x008
#define Textstyle_Data_Offset    0x010
#define Textstyle_Data_Raise     0x020
#define Textstyle_Data_Justify_X 0x040
#define Textstyle_Data_Justify_Y 0x080
#define Textstyle_Data_Angle     0x100
#define Textstyle_Data_Slant     0x200
#define Textstyle_Data_X_Factor  0x400
#define Textstyle_Data_Name      0x800

#define Textstyle_Data_Underline    0x01000
#define Textstyle_Data_Strikeout    0x02000
#define Textstyle_Data_Italic       0x04000
#define Textstyle_Data_Weight       0x08000
#define Textstyle_Data_Whiteout     0x10000
#define Textstyle_Data_Border       0x20000
#define Textstyle_Data_Outline      0x40000
#define Textstyle_Data_Border_Style 0x80000

#define Textstyle_Data_All          0xfffff

// textstyle data box constants - V9 compatible - for V10 and beyond see below

#define Show_favorites_box     0x00000001
#define Show_textstyle_box     0x00000002
#define Show_colour_box        0x00000004
#define Show_type_box          0x00000008
#define Show_size_box          0x00000010
#define Show_offset_box        0x00000020
#define Show_raise_box         0x00000040
#define Show_justify_box       0x00000080
#define Show_angle_box         0x00000100
#define Show_slant_box         0x00000200
#define Show_x_factor_box      0x00000400
#define Show_name_box          0x00000800
#define Show_draw_box          0x00001000
#define Show_underline_box     0x00002000
#define Show_strikeout_box     0x00004000
#define Show_italic_box        0x00008000
#define Show_weight_box        0x00010000
#define Show_all_boxes         0x0001ffff
#define Show_std_boxes         0x0001f7ff

#define Optional_textstyle_box 0x00020000
#define Optional_colour_box    0x00040000
#define Optional_type_box      0x00080000
#define Optional_size_box      0x00100000
#define Optional_offset_box    0x00200000
#define Optional_raise_box     0x00400000
#define Optional_justify_box   0x00800000
#define Optional_angle_box     0x01000000
#define Optional_slant_box     0x02000000
#define Optional_x_factor_box  0x04000000
#define Optional_name_box      0x08000000
#define Optional_underline_box 0x10000000
#define Optional_strikeout_box 0x20000000
#define Optional_italic_box    0x40000000
#define Optional_weight_box    0x80000000
#define Optional_all_boxes     0xfffe0000
#define Optional_std_boxes     0xf7fe0000

// V10 textstyle data box constants - only to be used with
// Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags,Integer optionals)
// this is the only way to correctly access the additional fields introduced in V10 (whiteout, border,outline)

#define V10_Show_favorites_box        0x00000001
#define V10_Show_textstyle_box        0x00000002
#define V10_Show_colour_box           0x00000004
#define V10_Show_type_box             0x00000008
#define V10_Show_size_box             0x00000010
#define V10_Show_offset_box           0x00000020
#define V10_Show_raise_box            0x00000040
#define V10_Show_justify_box          0x00000080
#define V10_Show_angle_box            0x00000100
#define V10_Show_slant_box            0x00000200
#define V10_Show_x_factor_box         0x00000400
#define V10_Show_name_box             0x00000800
#define V10_Show_draw_box             0x00001000
#define V10_Show_underline_box        0x00002000
#define V10_Show_strikeout_box        0x00004000
#define V10_Show_italic_box           0x00008000
#define V10_Show_weight_box           0x00010000
#define V10_Show_whiteout_box         0x00020000
#define V10_Show_border_box           0x00040000
#define V10_Show_outline_box          0x00080000
#define V10_Show_border_style_box     0x00100000
#define V10_Show_all_boxes            0x001fffff

#define V10_Optional_textstyle_box    0x00000002
#define V10_Optional_colour_box       0x00000004
#define V10_Optional_type_box         0x00000008
#define V10_Optional_size_box         0x00000010
#define V10_Optional_offset_box       0x00000020
#define V10_Optional_raise_box        0x00000040
#define V10_Optional_justify_box      0x00000080
#define V10_Optional_angle_box        0x00000100
#define V10_Optional_slant_box        0x00000200
#define V10_Optional_x_factor_box     0x00000400
#define V10_Optional_name_box         0x00000800
#define V10_Optional_underline_box    0x00001000
#define V10_Optional_strikeout_box    0x00002000
#define V10_Optional_italic_box       0x00004000
#define V10_Optional_weight_box       0x00008000
#define V10_Optional_whiteout_box     0x00010000
#define V10_Optional_border_box       0x00020000
#define V10_Optional_outline_box      0x00040000
#define V10_Optional_border_style_box 0x00080000
#define V10_Optional_all_boxes        0x000ffffe

#define V10_Show_std_boxes            0x0001f7ff , V10_Optional_whiteout_box | V10_Optional_border_box | V10_Optional_outline_box | V10_Optional_border_style_box
#define V10_Optional_std_boxes        0x000ff7fe

// note the critical placement of the , in V10_Show_std_boxes
// since the flags and optionals are now split into 2 separate words, the call to
// Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags,Integer optionals)
// requires two arguments, so if
//
// Textstyle_Data_Box my_box = Create_textstyle_data_box("Contour label",messages,V10_Show_std_boxes)
//
// is going the same as
//
// Textstyle_Data_Box my_box = Create_textstyle_data_box("Contour label",messages,V10_Show_all_boxes & ~V10_Show_name_box,V10_Optional_whiteout_box | V10_Optional_border_box | V10_Optional_outline_box | V10_Optional_border_style_box)
//

// source box constants

#define Source_Box_Model          0x001
#define Source_Box_View           0x002
#define Source_Box_String         0x004
#define Source_Box_Rectangle      0x008
#define Source_Box_Parallel       0x010
#define Source_Box_Polygon        0x020
#define Source_Box_Lasso          0x040
#define Source_Box_Filter         0x080
#define Source_Box_Models         0x100
#define Source_Box_Favorites      0x200
#define Source_Box_Multi_Pick     0x400
#define Source_Box_Trapezoid      0x800
#define Source_Box_All            0xfff
#define Source_Box_Fence_Inside   0x01000
#define Source_Box_Fence_Cross    0x02000
#define Source_Box_Fence_Outside  0x04000
#define Source_Box_Fence_String   0x08000
#define Source_Box_Fence_Points   0x10000
#define Source_Box_Fence_All      0xff000
#define Source_Box_Standard       Source_Box_All | Source_Box_Fence_Inside | Source_Box_Fence_Outside | Source_Box_Fence_Cross | Source_Box_Fence_String

// target box constants

#define Target_Box_Move_To_Original_Model 0x0001   /* change/replace data */
#define Target_Box_Move_To_One_Model      0x0002   /* move/delete original data */
#define Target_Box_Move_To_Many_Models    0x0004   /* move/delete original data */
#define Target_Box_Copy_To_Original_Model 0x0008   /* copy data */
#define Target_Box_Copy_To_One_Model      0x0010   /* copy data */
#define Target_Box_Copy_To_Many_Models    0x0020   /* copy data */
#define Target_Box_Move_Copy_All          0x00ff
#define Target_Box_Delete                 0x1000   /* delete data (exclusive of all others ?) */

// more constants

#define TRUE  1
#define FALSE 0

#define OK    1

// modes for Horizontal_Group (note -1 is also allowed)

#define BALANCE_WIDGETS_OVER_WIDTH  1
#define ALL_WIDGETS_OWN_WIDTH       2
#define COMPRESS_WIDGETS_OVER_WIDTH 4

// modes for Vertical_Group (note -1 is also allowed)

#define BALANCE_WIDGETS_OVER_HEIGHT  1
#define ALL_WIDGETS_OWN_HEIGHT       2
#define ALL_WIDGETS_OWN_LENGTH       4

// snap controls

#define Ignore_Snap  0
#define User_Snap    1
#define Program_Snap 2

// snap modes

#define Failed_Snap       -1
#define No_Snap            0
#define Point_Snap         1
#define Line_Snap          2
#define Grid_Snap          3
#define Intersection_Snap  4
#define Cursor_Snap        5
#define Name_Snap          6
#define Tin_Snap           7
#define Model_Snap         8
#define Height_Snap        9
#define Segment_Snap      11
#define Text_Snap         12
#define Fast_Snap         13
#define Fast_Accept       14

// super string dimensions

#define Att_ZCoord_Value              1
#define Att_ZCoord_Array              2
#define Att_Radius_Array              3
#define Att_Major_Array               4
#define Att_Diameter_Value            5
#define Att_Diameter_Array            6
#define Att_Vertex_Text_Array         7
#define Att_Segment_Text_Array        8
#define Att_Colour_Array              9
#define Att_Vertex_Text_Value        10
#define Att_Point_Array              11
#define Att_Visible_Array            12
#define Att_Contour_Array            13
#define Att_Vertex_Annotate_Value    14
#define Att_Vertex_Annotate_Array    15
#define Att_Vertex_Attribute_Array   16
#define Att_Symbol_Value             17
#define Att_Symbol_Array             18
#define Att_Segment_Attribute_Array  19
#define Att_Segment_Annotate_Value   20
#define Att_Segment_Annotate_Array   21
#define Att_Segment_Text_Value       22
#define Att_Pipe_Justify             23
#define Att_Culvert_Value            24
#define Att_Culvert_Array            25
#define Att_Hole_Value               26
#define Att_Hatch_Value              27
#define Att_Solid_Value              28
#define Att_Bitmap_Value             29
#define Att_Vertex_World_Annotate    30
#define Att_Segment_World_Annotate   31

#define Att_Geom_Array               32
#define Att_Pattern_Value            33

#define Att_Vertex_UID_Array         35
#define Att_Segment_UID_Array        36
#define Att_Vertex_Tinable_Value     37
#define Att_Vertex_Tinable_Array     38
#define Att_Segment_Tinable_Value    39
#define Att_Segment_Tinable_Array    40
#define Att_Vertex_Visible_Value     41
#define Att_Vertex_Visible_Array     42
#define Att_Segment_Visible_Value    43
#define Att_Segment_Visible_Array    44
#define Att_Vertex_Paper_Annotate    45
#define Att_Segment_Paper_Annotate   46
#define Att_Database_Point_Array     47
#define Att_Extrude_Value            48
#define Att_Interval_Value           50
#define Att_Segment_Linestyle_Array  56

#define concat(a,b) a##b
#define String_Super_Bit(n) (1 << concat(Att_,n))
#define String_Super_Bit_Ex(n) (1 << concat(Att_,n) - 32)

#define All_String_Super_Bits 65535

// function identifiers

#define APPLY_TEMPLATE_MACRO_T        4100
#define APPLY_TEMPLATES_MACRO_T       4102
#define INTERFACE_MACRO_T             4103
#define TURKEY_NEST_MACRO_T           4104
#define KERB_RETURN_MACRO_T           4105
#define RETRIANGULATE_MACRO_T         4106
#define RUN_MACRO_T                   4107
#define STRING_MODIFIERS_MACRO_T      4108
#define SURVEY_DATA_REDUCTION_MACRO_T 4109
#define SIMPLE_MACRO_T                4110
#define CREATE_ROADS_MACRO_T          4111
#define SLF_MACRO_T                   4112

// constants for Create_select_box mode

#define SELECT_STRING 5509
#define SELECT_STRINGS 5510

#define SELECT_SUB_STRING 5515
#define SELECT_SUB_STRINGS 5516

// values for special characters

#define Degrees_character        176
#define Squared_character        178
#define Cubed_character          179
#define Middle_dot_character     183
#define Diameter_large_character 216
#define Diameter_small_character 248

#define Degrees_text             "°"
#define Squared_text             "²"
#define Cubed_text               "³"
#define Middle_dot_text          "·"
#define Diameter_small_text      "ø"
#define Diameter_large_text      "Ø"

// definitions for last parameter of Shell_execute

#define SW_HIDE             0
#define SW_SHOWNORMAL       1
#define SW_NORMAL           1
#define SW_SHOWMINIMIZED    2
#define SW_SHOWMAXIMIZED    3
#define SW_MAXIMIZE         3
#define SW_SHOWNOACTIVATE   4
#define SW_SHOW             5
#define SW_MINIMIZE         6
#define SW_SHOWMINNOACTIVE  7
#define SW_SHOWNA           8
#define SW_RESTORE          9
#define SW_SHOWDEFAULT      10
#define SW_FORCEMINIMIZE    11
#define SW_MAX              11

// **********************************************************************
// transparency
// **********************************************************************

#define TRANSPARENT         1
#define OPAQUE              2

// **********************************************************************
// Text Alignment Options
// **********************************************************************

#define TA_NOUPDATECP                0
#define TA_UPDATECP                  1

#define TA_LEFT                      0
#define TA_RIGHT                     2
#define TA_CENTER                    6

#define TA_TOP                       0
#define TA_BOTTOM                    8
#define TA_BASELINE                  24

#define TA_RTLREADING                256

#define TA_MASK       (TA_BASELINE+TA_CENTER+TA_UPDATECP+TA_RTLREADING)

#define VTA_BASELINE TA_BASELINE
#define VTA_LEFT     TA_BOTTOM
#define VTA_RIGHT    TA_TOP
#define VTA_CENTER   TA_CENTER
#define VTA_BOTTOM   TA_RIGHT
#define VTA_TOP      TA_LEFT

// **********************************************************************
// font types
// **********************************************************************

#define FW_DONTCARE         0
#define FW_THIN             100
#define FW_EXTRALIGHT       200
#define FW_LIGHT            300
#define FW_NORMAL           400
#define FW_MEDIUM           500
#define FW_SEMIBOLD         600
#define FW_BOLD             700
#define FW_EXTRABOLD        800
#define FW_HEAVY            900

#define FW_ULTRALIGHT       FW_EXTRALIGHT
#define FW_REGULAR          FW_NORMAL
#define FW_DEMIBOLD         FW_SEMIBOLD
#define FW_ULTRABOLD        FW_EXTRABOLD
#define FW_BLACK            FW_HEAVY

// **********************************************************************
// raster op codes
// **********************************************************************

#define R2_BLACK            1   /*  0       */
#define R2_NOTMERGEPEN      2   /* DPon     */
#define R2_MASKNOTPEN       3   /* DPna     */
#define R2_NOTCOPYPEN       4   /* PN       */
#define R2_MASKPENNOT       5   /* PDna     */
#define R2_NOT              6   /* Dn       */
#define R2_XORPEN           7   /* DPx      */
#define R2_NOTMASKPEN       8   /* DPan     */
#define R2_MASKPEN          9   /* DPa      */
#define R2_NOTXORPEN        10  /* DPxn     */
#define R2_NOP              11  /* D        */
#define R2_MERGENOTPEN      12  /* DPno     */
#define R2_COPYPEN          13  /* P        */
#define R2_MERGEPENNOT      14  /* PDno     */
#define R2_MERGEPEN         15  /* DPo      */
#define R2_WHITE            16  /*  1       */
#define R2_LAST             16

// **********************************************************************
// Ternary raster operations
// **********************************************************************

#define SRCCOPY             0x00CC0020 /* dest = source                   */
#define SRCPAINT            0x00EE0086 /* dest = source OR dest           */
#define SRCAND              0x008800C6 /* dest = source AND dest          */
#define SRCINVERT           0x00660046 /* dest = source XOR dest          */
#define SRCERASE            0x00440328 /* dest = source AND (NOT dest )   */
#define NOTSRCCOPY          0x00330008 /* dest = (NOT source)             */
#define NOTSRCERASE         0x001100A6 /* dest = (NOT src) AND (NOT dest) */
#define MERGECOPY           0x00C000CA /* dest = (source AND pattern)     */
#define MERGEPAINT          0x00BB0226 /* dest = (NOT source) OR dest     */
#define PATCOPY             0x00F00021 /* dest = pattern                  */
#define PATPAINT            0x00FB0A09 /* dest = DPSnoo                   */
#define PATINVERT           0x005A0049 /* dest = pattern XOR dest         */
#define DSTINVERT           0x00550009 /* dest = (NOT dest)               */
#define BLACKNESS           0x00000042 /* dest = BLACK                    */
#define WHITENESS           0x00FF0062 /* dest = WHITE                    */

// Quaternary raster codes

#define MAKEROP4(fore,back) (DWORD)((((back) << 8) & 0xFF000000) | (fore))

// Colour Message Box

#define MESSAGE_LEVEL_GENERAL 1
#define MESSAGE_LEVEL_WARNING 2
#define MESSAGE_LEVEL_ERROR   3
#define MESSAGE_LEVEL_GOOD    4

// Drainage Pump Curve types

#define PUMP_FLOW_VOLUME_CURVE    0
#define PUMP_FLOW_DEPTH_CURVE     1
#define PUMP_FLOW_HEAD_DYN_CURVE  2
#define PUMP_FLOW_HEAD_VAR_CURVE  3
#define PUMP_IDEAL_CURVE          4
#define PUMP_EFFICIENCY_CURVE     5

#endif

