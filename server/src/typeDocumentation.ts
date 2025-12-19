/**
 * Documentation for 12dPL variable types
 */

export interface TypeDocumentation {
	name: string;
	category: string;
	description: string;
	details: string;
	example?: string;
	related?: string[];
}

export const TYPE_DOCUMENTATION: Record<string, TypeDocumentation> = {
	// Mathematical Variable Types
	Integer: {
		name: 'Integer',
		category: 'Mathematical Variable',
		description: 'A 32-bit whole number',
		details: `A 32-bit whole number. It can be positive or negative. For example -1, 0 and 1.
		
Range: -2,147,483,648 to 2,147,483,647

Used for:
- Loop counters
- Array indices
- Counts and enumeration
- Status codes
- Error codes`,
		example: `Integer count = 0;
Integer value = -1;
Integer status = 1;`,
		related: ['Integer64', 'Real']
	},

	Integer64: {
		name: 'Integer64',
		category: 'Mathematical Variable',
		description: 'A 64-bit whole number',
		details: `A 64-bit whole number. It can be positive or negative. For example -1LL, 0 and 123456789123.
		
Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

Used for:
- Large integer values
- Timestamps
- File sizes
- Large counters
- Database IDs`,
		example: `Integer64 largeValue = 123456789123;
Integer64 timestamp = 1234567890123;`,
		related: ['Integer', 'Real']
	},

	Real: {
		name: 'Real',
		category: 'Mathematical Variable',
		description: 'A 64-bit decimal number',
		details: `A 64-bit decimal number. It can be positive or negative. For example -1.0, 0.0 and 1.0.
		
Precision: Double precision (approximately 15-17 decimal digits)

Used for:
- Coordinates and positions
- Measurements and distances
- Mathematical calculations
- Angles and rotations
- Scaling factors
- Percentages`,
		example: `Real distance = 100.5;
Real angle = 45.0;
Real value = -1.5;`,
		related: ['Integer', 'Vector2', 'Vector3', 'Matrix3', 'Matrix4']
	},

	Text: {
		name: 'Text',
		category: 'Mathematical Variable',
		description: 'A sequence of characters',
		details: `A sequence of characters forming a string.
		
Used for:
- Names and identifiers
- Messages and labels
- File paths
- Command arguments
- User input
- Text data

Can contain any Unicode character.
No fixed maximum length.`,
		example: `Text name = "Dog";
Text message = "Hello, World!";
Text path = "C:\\data\\file.txt";`,
		related: ['Integer', 'Real']
	},

	Vector2: {
		name: 'Vector2',
		category: 'Mathematical Variable',
		description: 'Two-dimensional vector (X, Y)',
		details: `An entity consisting of two Real values representing a 2D point or direction.
		
Structure: (X, Y)
- X: Real value for horizontal component
- Y: Real value for vertical component

Used for:
- 2D coordinates
- Screen positions
- 2D directions
- Offset values
- Texture coordinates`,
		example: `Vector2 point = (10.5, 20.3);
Vector2 direction = (1.0, 0.0);`,
		related: ['Vector3', 'Vector4', 'Real']
	},

	Vector3: {
		name: 'Vector3',
		category: 'Mathematical Variable',
		description: 'Three-dimensional vector (X, Y, Z)',
		details: `An entity consisting of three Real values representing a 3D point or direction.
		
Structure: (X, Y, Z)
- X: Real value for horizontal component
- Y: Real value for vertical component
- Z: Real value for depth component

Used for:
- 3D coordinates
- 3D positions
- Spatial directions
- Normal vectors
- Color values (RGB when normalized 0-1)`,
		example: `Vector3 position = (10.5, 20.3, 5.0);
Vector3 direction = (0.0, 1.0, 0.0);
Vector3 color = (1.0, 0.5, 0.0);`,
		related: ['Vector2', 'Vector4', 'Real', 'Matrix3']
	},

	Vector4: {
		name: 'Vector4',
		category: 'Mathematical Variable',
		description: 'Four-dimensional vector (X, Y, Z, W)',
		details: `An entity consisting of four Real values.
		
Structure: (X, Y, Z, W)
- X: Real value for X component
- Y: Real value for Y component
- Z: Real value for Z component
- W: Real value for W component (often homogeneous coordinate or weight)

Used for:
- Homogeneous 3D coordinates
- 3D positions with weight
- RGBA color values
- Quaternion rotation data
- Transformation vertices`,
		example: `Vector4 position = (10.5, 20.3, 5.0, 1.0);
Vector4 color = (1.0, 0.5, 0.0, 1.0);`,
		related: ['Vector2', 'Vector3', 'Real', 'Matrix4']
	},

	Matrix3: {
		name: 'Matrix3',
		category: 'Mathematical Variable',
		description: '3x3 matrix of Real values',
		details: `An entity consisting of nine Real values arranged in a 3x3 matrix.
		
Structure: 3 rows × 3 columns
Indexed as matrix(row, column):
  matrix(1,1)=a  matrix(1,2)=b  matrix(1,3)=c
  matrix(2,1)=d  matrix(2,2)=e  matrix(2,3)=f
  matrix(3,1)=g  matrix(3,2)=h  matrix(3,3)=i

where a, b, c, d, e, f, g, h, i are Real values

Used for:
- 2D transformations
- 3D rotations
- Linear transformations
- Coordinate system changes
- Image transformations`,
		example: `Matrix3 rotation;
Matrix3 transform;`,
		related: ['Matrix4', 'Vector3', 'Real']
	},

	Matrix4: {
		name: 'Matrix4',
		category: 'Mathematical Variable',
		description: '4x4 matrix of Real values',
		details: `An entity consisting of sixteen Real values arranged in a 4x4 matrix.
		
Structure: 4 rows × 4 columns
Indexed as matrix(row, column):
  matrix(1,1)=a  matrix(1,2)=b  matrix(1,3)=c  matrix(1,4)=d
  matrix(2,1)=e  matrix(2,2)=f  matrix(2,3)=g  matrix(2,4)=h
  matrix(3,1)=i  matrix(3,2)=j  matrix(3,3)=k  matrix(3,4)=l
  matrix(4,1)=m  matrix(4,2)=n  matrix(4,3)=o  matrix(4,4)=p

where a through p are sixteen Real values

Used for:
- 3D transformations (translation, rotation, scale)
- Perspective transformations
- Projection matrices
- Homogeneous coordinate transforms
- 3D graphics operations`,
		example: `Matrix4 projection;
Matrix4 view;
Matrix4 model;`,
		related: ['Matrix3', 'Vector4', 'Vector3', 'Real']
	},

	// 12d Model Database Handles
	Element: {
		name: 'Element',
		category: '12d Model Database Handle',
		description: 'Handle to a stored 12d Model entity',
		details: `The variable type Element is used to refer to the standard 12d Model entities that can be stored in a 12d Model model.

⚠️ IMPORTANT: Elements act as handles (pointers) to data in the 12d Model database so that the data can be easily referred to and manipulated within a macro.

Supported Element Types:
- **Arc** - Arc in (x,y) plane with linear z interpolation
- **Circle** - Circle in (x,y) plane with constant z
- **Drainage** - String for drainage or sewer elements
- **Feature** - Circle with z-value at center, nulls on circumference
- **Grid Tin** - Grid triangulation
- **Grid String** - Grid string
- **Interface** - String with (x,y,z,cut/fill) at vertices
- **Pipe** - String with width and diameter
- **Plot Frame** - Element for plan plot production
- **Pipeline** - Alignment string with diameter
- **Super** - General string with (x,y,z,radius) at vertices
- **Super Alignment** - String with separate horizontal geometry
- **SuperTin** - List of Tins acting as one
- **Text** - String with text at vertices
- **Tin** - Triangulated irregular network

Superseded Types (still supported):
- **2d String** - (x,y) with constant z
- **3d String** - (x,y,z) at vertices
- **4d String** - (x,y,z,text) at vertices
- **Alignment** - Horizontal and vertical geometry
- **Polyline** - (x,y,z,radius) at vertices

Characteristics:
- ✅ Persistent: Stored in 12d Model database
- ✅ Survives program termination
- ✅ Can be referenced and manipulated
- Use Get_type(Element, Text) to determine type`,
		example: `Element line;
Element surface;
Get_id(element, elementId);`,
		related: ['Model', 'View', 'Macro_Function']
	},

	Model: {
		name: 'Model',
		category: '12d Model Database Handle',
		description: 'Handle to a 12d Model model',
		details: `The variable type Model is used as a handle to refer to 12d Model models within macros.

⚠️ IMPORTANT: A Model handle points to a model in the 12d Model database. The handle doesn't contain the database information but merely points to the appropriate database records.

Characteristics:
- ✅ Persistent: Model exists in the database
- ✅ Survives program termination
- Contains collections of Elements
- Can be modified and referenced
- Handle can be reassigned without affecting original data
- Can be set to null (no data reference)

Usage:
- Create and modify models
- Store geometry collections
- Organize Elements into logical groups
- Reference models in calculations and operations`,
		example: `Model myModel;
Model retrieved = Get_model(element);`,
		related: ['Element', 'View']
	},

	View: {
		name: 'View',
		category: '12d Model Database Handle',
		description: 'Handle to a 12d Model view',
		details: `The variable type View is used as a handle to refer to 12d Model views within macros.

⚠️ IMPORTANT: A View handle points to a view in the 12d Model database. Views control visualization and interaction with models.

Characteristics:
- ✅ Persistent: View exists in the database
- ✅ Survives program termination
- Controls what is displayed
- Manages viewport settings
- Can be modified and referenced
- Handle can point to different records

Usage:
- Control visualization
- Set viewport parameters
- Manage display settings
- Reference in calculations`,
		example: `View activeView;`,
		related: ['Model', 'Element']
	},

	Uid: {
		name: 'Uid',
		category: 'Structural Type',
		description: 'Unique identifier',
		details: `A unique identifier for referencing objects, models, and elements.

Used internally to track and reference objects uniquely across the system.`,
		example: `Uid elementId;
Get_id(element, elementId);`,
		related: ['Element', 'Model']
	},

	Guid: {
		name: 'Guid',
		category: 'Structural Type',
		description: 'Global unique identifier',
		details: `A globally unique identifier (GUID) for tracking objects across sessions.

Similar to UUID/GUID in other systems.`,
		example: `Guid globalId;`,
		related: ['Uid']
	},

	// Geometric Construction Variable Types
	Point: {
		name: 'Point',
		category: 'Geometric Construction',
		description: 'A three-dimensional point (x, y, z)',
		details: `A three-dimensional point consisting of x, y, and z coordinates (x,y,z).

⚠️ IMPORTANT: A Point is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.

Characteristics:
- Three dimensional coordinates
- Temporary construction geometry
- Used for geometric calculations within macros
- Not persistent after program termination`,
		example: `Point p = (10.5, 20.3, 5.0);`,
		related: ['Line', 'Arc', 'Segment']
	},

	Line: {
		name: 'Line',
		category: 'Geometric Construction',
		description: 'A three-dimensional line joining two Points',
		details: `A Line is a three-dimensional line joining two Points.

⚠️ IMPORTANT: A Line is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.

Characteristics:
- Joins two Point coordinates
- Temporary construction geometry
- Used for geometric calculations and alignment definition
- Can be used for horizontal or vertical geometry definition`,
		example: `Line line;
Point start = (0.0, 0.0, 0.0);
Point end = (100.0, 100.0, 0.0);`,
		related: ['Point', 'Arc', 'Segment']
	},

	Arc: {
		name: 'Arc',
		category: 'Geometric Construction',
		description: 'A helix arc with circular (x,y) projection',
		details: `An Arc is a helix which projects onto a circle in the (x,y) plane.

In plan projection, an Arc appears as a circle. But in three dimensions, the Arc has a z value (height) at the start and another (possibly different) z value at the end. The z value varies linearly between the start and end points.

⚠️ IMPORTANT: An Arc is NOT a circle in a plane in 3D space, except when it is in a plane parallel to the (x,y) plane.

⚠️ IMPORTANT: In 12dPL, an Arc is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.

Characteristics:
- Helix structure with circular (x,y) projection
- Linear z-value interpolation between start and end
- Temporary construction geometry
- Used for horizontal curve definition`,
		example: `Arc arc;`,
		related: ['Point', 'Line', 'Spiral', 'Segment']
	},

	Spiral: {
		name: 'Spiral',
		category: 'Geometric Construction',
		description: 'Mathematically defined transition between line and arc',
		details: `A Spiral is a mathematically defined transition which, when projected onto the (x,y) plane, has a continuously varying radius.

The spiral transitions:
- Between a line (infinite radius) and an arc (for a full spiral)
- Between arc and another arc (for a partial spiral)

In 12d Model, the Spiral covers:
- Traditional clothoid spirals
- Other transitions (such as cubic parabola) that are not spirals in the true mathematical sense

⚠️ IMPORTANT: In 12dPL, a Spiral is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.

Characteristics:
- Continuously varying radius
- Mathematical transition curves
- Used for smooth transitions in horizontal geometry
- Temporary construction geometry`,
		example: `Spiral spiral;`,
		related: ['Arc', 'Line', 'Parabola', 'Segment']
	},

	Parabola: {
		name: 'Parabola',
		category: 'Geometric Construction',
		description: 'Vertical geometry curve in (chainage, height) plane',
		details: `Parabolas are used in the vertical geometry of an Alignment or Super Alignment.

The vertical geometry is defined in the (chainage, height) plane, and parabolas can be placed at vertical intersection points.

Structure:
- Defined in the (chainage, height) plane
- Used for vertical curves
- Placed at vertical intersection points

⚠️ IMPORTANT: In 12dPL, a Parabola is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.

Characteristics:
- Vertical curve definition
- 2D (chainage, height) coordinate system
- Smooth transitions between vertical grade lines
- Temporary construction geometry`,
		example: `Parabola parabola;`,
		related: ['Arc', 'Spiral', 'Segment']
	},

	Segment: {
		name: 'Segment',
		category: 'Geometric Construction',
		description: 'A union of Point, Line, Arc, Parabola, or Spiral',
		details: `A Segment is either a Point, Line, Arc, Parabola, or Spiral.

Characteristics:
- A Segment has a unique type specifying its content
- Can be any of the basic construction entities
- Temporary construction geometry
- Not stored in 12d Model models

Possible Segment Types:
- Point: A single three-dimensional point
- Line: A straight line between two points
- Arc: A helix arc
- Parabola: A vertical curve
- Spiral: A transition curve

⚠️ IMPORTANT: In 12dPL, a Segment is a construction entity and is NOT stored in 12d Model models. It is temporary and only lasts for the duration of the program.`,
		example: `Segment segment;`,
		related: ['Point', 'Line', 'Arc', 'Spiral', 'Parabola']
	},

	// 12d Internal Variable Types
	Attributes: {
		name: 'Attributes',
		category: '12d Internal Variable',
		description: 'Handle to user-defined attributes',
		details: `The variable type Attributes is used as a handle to refer to a 12d Model attribute structure within macros.

Attributes are user-defined and can be attached to:
- Projects
- Models
- Elements
- Macro_Functions/Functions

Characteristics:
- User-defined attributes
- Attachable to multiple object types
- Stored in database
- Retrievable and modifiable`,
		example: `Attributes attrs;`,
		related: ['SDR_Attribute', 'Element', 'Model']
	},

	SDR_Attribute: {
		name: 'SDR_Attribute',
		category: '12d Internal Variable',
		description: 'Special attributes for Survey Data Reduction',
		details: `SDR_Attribute are special attributes used with the 12d Survey Data Reduction process.

These attributes have specific roles in the survey data reduction workflow.

Characteristics:
- Special-purpose attributes
- Used in survey data reduction
- Integration with survey processing
- Database-backed`,
		example: `SDR_Attribute sdrAttr;`,
		related: ['Attributes']
	},

	Blob: {
		name: 'Blob',
		category: '12d Internal Variable',
		description: 'Binary large object',
		details: `A binary object for storing arbitrary binary data.

Used for:
- Storing binary data
- Binary file contents
- Serialized objects
- Raw data storage

Characteristics:
- Binary format
- Variable size
- Database-storable
- Non-text data`,
		example: `Blob binaryData;`,
		related: []
	},

	Screen_Text: {
		name: 'Screen_Text',
		category: '12d Internal Variable',
		description: 'Text display object',
		details: `Screen_Text is used for text display operations in the 12d Model interface.

Used for:
- Displaying text on screen
- Formatted text output
- Text rendering
- Information display`,
		example: `Screen_Text displayText;`,
		related: ['Textstyle_Data', 'Text_Style_Box']
	},

	Textstyle_Data: {
		name: 'Textstyle_Data',
		category: '12d Internal Variable',
		description: 'Text styling information',
		details: `TextStyle_Data holds information about text formatting.

Includes:
- Colour
- Text style (font, weight, etc.)
- Justification (left, center, right)
- Height (font size)

Used for:
- Text appearance control
- Formatting specifications
- Style management
- Display properties`,
		example: `Textstyle_Data textStyle;`,
		related: ['Text_Style_Box', 'Screen_Text']
	},

	Equality_Label: {
		name: 'Equality_Label',
		category: '12d Internal Variable',
		description: 'Equality labelling information',
		details: `Equality_Label holds information for labelling text as an Equality.

Used in alignment and road design for:
- Labelling equality points
- Marking equivalent points
- Design documentation
- Alignment properties`,
		example: `Equality_Label eqLabel;`,
		related: ['Equality_Info']
	},

	Undo: {
		name: 'Undo',
		category: '12d Internal Variable',
		description: 'Single undo operation',
		details: `A variable to hold information that is placed on the 12d Model Undo system.

Characteristics:
- Represents single undo action
- Trackable operation
- Database-managed
- Reversible change

Used for:
- Tracking modifications
- Undo/redo implementation
- Change management
- Operation history`,
		example: `Undo undoOp;`,
		related: ['Undo_List']
	},

	// 12d Model Interface Variable Types (Base Widgets)
	Widget: {
		name: 'Widget',
		category: '12d Model Interface',
		description: 'Base class for UI interface objects',
		details: `Widget is the base type for all objects used in building interfaces such as menus and panels to communicate with the macro user.

All interface items (buttons, boxes, groups, etc.) are derived from Widget and can be used in any argument that is of type Widget.

Characteristics:
- Base class for UI elements
- Can be used as generic widget type
- Polymorphic in panel arguments
- Part of interface hierarchy

Derived Types Include:
- Menu, Panel, Overlay_Widget
- Buttons and Boxes
- Groups (Vertical_Group, Horizontal_Group)
- All UI control objects`,
		example: `Widget myWidget;`,
		related: ['Menu', 'Panel', 'Button', 'Select_Box']
	},

	Menu: {
		name: 'Menu',
		category: '12d Model Interface',
		description: 'User-defined menu object',
		details: `An object that holds the data for a user-defined 12d Model menu.

Characteristics:
- Holds menu structure
- Stores menu items
- Menu event handling
- User interaction

Used for:
- Creating custom menus
- Menu organization
- Command execution
- User interface customization`,
		example: `Menu myMenu;`,
		related: ['Widget', 'Panel', 'Button']
	},

	Panel: {
		name: 'Panel',
		category: '12d Model Interface',
		description: 'User-defined dialog panel',
		details: `An object that holds the data for a user-defined 12d Model panel.

Panels are the primary interface for collecting user input and displaying information.

Characteristics:
- Holds panel layout and content
- Contains widgets and controls
- Event handling
- Modal or modeless display

Can Include:
- Input boxes and selectors
- Buttons and messages
- Groups (Vertical/Horizontal)
- Multiple pages (Widget_Pages)`,
		example: `Panel myPanel = Create_panel("My Dialog");`,
		related: ['Widget', 'Button', 'Vertical_Group', 'Message_Box']
	},

	Overlay_Widget: {
		name: 'Overlay_Widget',
		category: '12d Model Interface',
		description: 'Overlay widget for complex layouts',
		details: `Widget for creating overlay effects and complex layered interfaces.

Used for:
- Overlaying widgets
- Complex layout management
- Z-order control
- Advanced UI composition`,
		example: `Overlay_Widget overlay;`,
		related: ['Widget', 'Panel']
	},

	Vertical_Group: {
		name: 'Vertical_Group',
		category: '12d Model Interface',
		description: 'Container for vertical widget layout',
		details: `Used for formatting a panel.

A Vertical_Group holds Widgets that will be placed vertically in a Panel.

Characteristics:
- Container for widgets
- Vertical arrangement
- Layout organization
- Structural element

Used for:
- Organizing UI elements vertically
- Logical grouping
- Panel composition
- Layout structure`,
		example: `Vertical_Group vgroup = Create_vertical_group(0);
Append(button, vgroup);`,
		related: ['Horizontal_Group', 'Widget_Pages', 'Panel']
	},

	Horizontal_Group: {
		name: 'Horizontal_Group',
		category: '12d Model Interface',
		description: 'Container for horizontal widget layout',
		details: `Used for formatting a panel.

A Horizontal_Group holds Widgets that will be placed horizontally in a Panel.

Characteristics:
- Container for widgets
- Horizontal arrangement
- Layout organization
- Structural element

Used for:
- Organizing UI elements horizontally
- Logical grouping
- Button bars
- Panel composition`,
		example: `Horizontal_Group hgroup = Create_horizontal_group();`,
		related: ['Vertical_Group', 'Widget_Pages', 'Panel', 'Button']
	},

	Widget_Pages: {
		name: 'Widget_Pages',
		category: '12d Model Interface',
		description: 'Multi-page container for panels',
		details: `Widget_Pages enables panels to have different pages with tabbed or paginated navigation.

Characteristics:
- Multi-page support
- Tab navigation
- Page selection
- Panel extension

Used for:
- Complex dialogs
- Organized information
- Tab-based interfaces
- Large form organization`,
		example: `Widget_Pages pages;`,
		related: ['Panel', 'Vertical_Group', 'Tab_Box']
	},

	Button: {
		name: 'Button',
		category: '12d Model Interface',
		description: 'Clickable button on a panel',
		details: `A button on a Panel for user interaction.

Characteristics:
- Clickable control
- Event triggering
- Label text
- State management

Used for:
- User actions (OK, Cancel, etc.)
- Command execution
- Form submission
- Dialog control`,
		example: `Button ok = Create_button("OK", "ok");`,
		related: ['Select_Button', 'Widget', 'Panel']
	},

	Select_Button: {
		name: 'Select_Button',
		category: '12d Model Interface',
		description: 'Button for selecting strings',
		details: `A button on a Panel for selecting strings from a list.

Characteristics:
- String selection
- Triggering selection dialog
- User choice
- Integration with forms

Used for:
- Selecting from lists
- String input
- Choice confirmation
- Data selection`,
		example: `Select_Button selectBtn;`,
		related: ['Button', 'Select_Box', 'New_Select_Box']
	},

	Angle_Box: {
		name: 'Angle_Box',
		category: '12d Model Interface',
		description: 'Input box for angle values',
		details: `A box on a Panel for inputting angle information.

Characteristics:
- Angle input
- Unit handling
- Validation
- Numeric display

Used for:
- Angle entry
- Direction input
- Bearing entry
- Rotation specification`,
		example: `Angle_Box angleBox = Create_angle_box("Angle", message);`,
		related: ['Real_Box', 'Integer_Box']
	},

	Attributes_Box: {
		name: 'Attributes_Box',
		category: '12d Model Interface',
		description: 'Box for selecting and editing attributes',
		details: `Box for managing user-defined attributes in a panel.

Characteristics:
- Attribute display
- Attribute selection
- Attribute editing
- Database integration`,
		example: `Attributes_Box attrBox;`,
		related: ['Attributes']
	},

	Colour_Box: {
		name: 'Colour_Box',
		category: '12d Model Interface',
		description: 'Box for selecting colors',
		details: `A box on a Panel for selecting a colour from the pop-up list of project colours.

Characteristics:
- Colour selection
- Drop-down list
- Project colour palette
- Visual feedback

Used for:
- Colour specification
- Style selection
- Display properties
- Design attributes`,
		example: `Colour_Box colourBox = Create_colour_box("Colour", message);`,
		related: ['Colour_Message_Box', 'Text_Style_Box']
	},

	Colour_Message_Box: {
		name: 'Colour_Message_Box',
		category: '12d Model Interface',
		description: 'Message display with color control',
		details: `A box on a Panel for writing messages with color customization.

Different background colours can be set for the display area.

Characteristics:
- Text message display
- Customizable background colour
- Information feedback
- Visual indication`,
		example: `Colour_Message_Box msgBox;`,
		related: ['Message_Box', 'Colour_Box']
	},

	Message_Box: {
		name: 'Message_Box',
		category: '12d Model Interface',
		description: 'Simple message display box',
		details: `A box on a Panel for writing messages.

Characteristics:
- Text display
- User feedback
- Information presentation
- Non-editable text

Used for:
- Status messages
- Errors and warnings
- Instructions
- User communication`,
		example: `Message_Box message = Create_message_box("Message");`,
		related: ['Colour_Message_Box', 'Input_Box', 'Text_Edit_Box']
	},

	Input_Box: {
		name: 'Input_Box',
		category: '12d Model Interface',
		description: 'Simple text input box',
		details: `Box for generic text input on a Panel.

Characteristics:
- Text input
- User entry field
- Simple validation
- String storage`,
		example: `Input_Box inputBox;`,
		related: ['Text_Edit_Box', 'Integer_Box', 'Real_Box']
	},

	Text_Edit_Box: {
		name: 'Text_Edit_Box',
		category: '12d Model Interface',
		description: 'Multi-line text editor',
		details: `Box for multi-line text editing on a Panel.

Characteristics:
- Multi-line text
- Full editing support
- Word wrapping
- Larger text entry

Used for:
- Comments
- Descriptions
- Large text input
- Document editing`,
		example: `Text_Edit_Box textEdit;`,
		related: ['Input_Box', 'Message_Box']
	},

	Integer_Box: {
		name: 'Integer_Box',
		category: '12d Model Interface',
		description: 'Input box for integer values',
		details: `Box for inputting integer values on a Panel.

Characteristics:
- Integer input
- Numeric validation
- Range checking
- Formatted display`,
		example: `Integer_Box intBox = Create_integer_box("Count", message);`,
		related: ['Real_Box', 'Angle_Box']
	},

	Real_Box: {
		name: 'Real_Box',
		category: '12d Model Interface',
		description: 'Input box for real (decimal) values',
		details: `Box for inputting real/decimal values on a Panel.

Characteristics:
- Real number input
- Decimal validation
- Precision control
- Formatted display`,
		example: `Real_Box realBox = Create_real_box("Distance", message);`,
		related: ['Integer_Box', 'Angle_Box']
	},

	Model_Box: {
		name: 'Model_Box',
		category: '12d Model Interface',
		description: 'Box for creating or selecting models',
		details: `Box for creating a new model, or selecting a model from the pop-up list of project models.

Characteristics:
- Model selection
- Model creation
- Drop-down list
- Database integration

Used for:
- Model specification
- Model selection
- Design organization
- Data grouping`,
		example: `Model_Box modelBox = Create_model_box("Model", message, CHECK_MODEL_CREATE);`,
		related: ['Model', 'Select_Box']
	},

	Select_Box: {
		name: 'Select_Box',
		category: '12d Model Interface',
		description: 'Box for selecting from list',
		details: `Box for selecting items from a list on a Panel.

Characteristics:
- List selection
- Drop-down interface
- Single selection
- Data picker

Used for:
- Choosing from options
- Item selection
- Data specification
- Choice presentation`,
		example: `Select_Box selectBox;`,
		related: ['Select_Boxes', 'New_Select_Box']
	},

	View_Box: {
		name: 'View_Box',
		category: '12d Model Interface',
		description: 'Box for selecting views',
		details: `Box for selecting a view from the pop-up list of project views.

Characteristics:
- View selection
- Drop-down list
- Project view palette
- Database linked`,
		example: `View_Box viewBox;`,
		related: ['View', 'Model_Box']
	},

	Tin_Box: {
		name: 'Tin_Box',
		category: '12d Model Interface',
		description: 'Box for selecting TIN elements',
		details: `Box for selecting TIN (Triangulated Irregular Network) elements.

Characteristics:
- TIN selection
- Specialized element picker
- Geometry selection
- Database integrated`,
		example: `Tin_Box tinBox;`,
		related: ['Select_Box']
	},

	File_Box: {
		name: 'File_Box',
		category: '12d Model Interface',
		description: 'Box for file path selection',
		details: `Box for selecting and entering file paths.

Characteristics:
- File browsing
- Path entry
- File dialog integration
- Path validation

Used for:
- File selection
- Path specification
- Import/export
- Data file selection`,
		example: `File_Box fileBox;`,
		related: ['Directory_Box']
	},

	Directory_Box: {
		name: 'Directory_Box',
		category: '12d Model Interface',
		description: 'Box for directory selection',
		details: `Box for selecting directories/folders.

Characteristics:
- Directory browsing
- Folder selection
- Path entry
- Directory validation`,
		example: `Directory_Box dirBox;`,
		related: ['File_Box']
	},

	List_Box: {
		name: 'List_Box',
		category: '12d Model Interface',
		description: 'Box for displaying lists',
		details: `Box for displaying and selecting from lists of items.

Characteristics:
- List display
- Item selection
- Scrollable content
- Multiple item management`,
		example: `List_Box listBox;`,
		related: ['Select_Box', 'ListCtrl_Box']
	},

	Tree_Box: {
		name: 'Tree_Box',
		category: '12d Model Interface',
		description: 'Tree view control',
		details: `Hierarchical tree display and selection control for panels.

Characteristics:
- Tree structure display
- Hierarchical organization
- Node expansion/collapse
- Selection support

Used for:
- Hierarchical data
- Project structure
- Component trees
- Nested organization`,
		example: `Tree_Box treeBox;`,
		related: ['List_Box', 'Tree_Page']
	},

	Tab_Box: {
		name: 'Tab_Box',
		category: '12d Model Interface',
		description: 'Tabbed interface control',
		details: `Tabbed interface for organizing multiple sets of controls.

Characteristics:
- Tab navigation
- Multiple pages
- Tab selection
- Page switching`,
		example: `Tab_Box tabBox;`,
		related: ['Widget_Pages']
	},

	Draw_Box: {
		name: 'Draw_Box',
		category: '12d Model Interface',
		description: 'Drawing canvas box',
		details: `Box for drawing graphics and visualizations in a panel.

Characteristics:
- Graphics rendering
- Drawing surface
- Visual display
- Interactive drawing`,
		example: `Draw_Box drawBox;`,
		related: ['Widget']
	},

	Graph_Box: {
		name: 'Graph_Box',
		category: '12d Model Interface',
		description: 'Graph/chart display box',
		details: `Box for displaying graphs, charts, and data visualizations.

Characteristics:
- Graph rendering
- Data visualization
- Chart display
- Plot support`,
		example: `Graph_Box graphBox;`,
		related: ['Draw_Box']
	},

	GridCtrl_Box: {
		name: 'GridCtrl_Box',
		category: '12d Model Interface',
		description: 'Grid/spreadsheet control',
		details: `Grid control for tabular data display and editing.

Characteristics:
- Tabular display
- Data grid
- Cell editing
- Row/column management`,
		example: `GridCtrl_Box gridBox;`,
		related: ['List_Box', 'ListCtrl_Box']
	},

	Name_Box: {
		name: 'Name_Box',
		category: '12d Model Interface',
		description: 'Box for entering names',
		details: `Box for inputting object names on a Panel.

Characteristics:
- Name entry
- Text validation
- Naming rules enforcement
- String input`,
		example: `Name_Box nameBox;`,
		related: ['Input_Box', 'Symbol_Box']
	},

	Symbol_Box: {
		name: 'Symbol_Box',
		category: '12d Model Interface',
		description: 'Box for symbol selection',
		details: `Box for selecting symbols from project symbol library.

Characteristics:
- Symbol selection
- Visual symbol display
- Symbol palette
- Database linked`,
		example: `Symbol_Box symbolBox;`,
		related: ['Name_Box']
	},

	Chainage_Box: {
		name: 'Chainage_Box',
		category: '12d Model Interface',
		description: 'Box for chainage (distance along alignment) entry',
		details: `Box for inputting chainage values on a string or alignment.

Characteristics:
- Chainage input
- Distance along alignment
- Alignment integration
- Numeric entry with context`,
		example: `Chainage_Box chainageBox;`,
		related: ['Real_Box']
	},

	Plotter_Box: {
		name: 'Plotter_Box',
		category: '12d Model Interface',
		description: 'Box for selecting plotters',
		details: `Box for selecting plotter devices for printing.

Characteristics:
- Plotter selection
- Device configuration
- Print setup
- Hardware selection`,
		example: `Plotter_Box plotterBox;`,
		related: ['Report_Box']
	},

	Report_Box: {
		name: 'Report_Box',
		category: '12d Model Interface',
		description: 'Box for report generation',
		details: `Box for configuring and generating reports.

Characteristics:
- Report selection
- Report configuration
- Output options
- Format specification`,
		example: `Report_Box reportBox;`,
		related: ['Plotter_Box']
	},

	Linestyle_Box: {
		name: 'Linestyle_Box',
		category: '12d Model Interface',
		description: 'Box for selecting line styles',
		details: `Box for selecting a linestyle from the pop-up list of project linestyles.

Characteristics:
- Line style selection
- Drop-down list
- Project linestyle palette
- Visual display`,
		example: `Linestyle_Box styleBox;`,
		related: ['Colour_Box', 'Text_Style_Box']
	},

	Text_Style_Box: {
		name: 'Text_Style_Box',
		category: '12d Model Interface',
		description: 'Box for text style selection',
		details: `Box for selecting text style properties.

Includes:
- Font selection
- Text formatting
- Style preferences
- Appearance control

Used for:
- Text appearance
- Font selection
- Style configuration
- Format specification`,
		example: `Text_Style_Box textStyleBox;`,
		related: ['Textstyle_Data', 'Linestyle_Box']
	},

	Justify_Box: {
		name: 'Justify_Box',
		category: '12d Model Interface',
		description: 'Box for text justification selection',
		details: `Box for selecting text justification options.

Options:
- Left justify
- Center justify
- Right justify
- Full justify

Used for:
- Text alignment
- Formatting control
- Display arrangement`,
		example: `Justify_Box justifyBox;`,
		related: ['Text_Style_Box']
	},

	Date_Time_Box: {
		name: 'Date_Time_Box',
		category: '12d Model Interface',
		description: 'Box for date/time selection',
		details: `Box for inputting date and time values.

Characteristics:
- Date entry
- Time entry
- Calendar picker
- Time picker`,
		example: `Date_Time_Box dateTimeBox;`,
		related: ['Real_Box', 'Integer_Box']
	},

	Polygon_Box: {
		name: 'Polygon_Box',
		category: '12d Model Interface',
		description: 'Box for polygon selection/creation',
		details: `Box for selecting or creating polygon elements.

Characteristics:
- Polygon selection
- Geometry creation
- Drawing interface
- Element specification`,
		example: `Polygon_Box polygonBox;`,
		related: ['Draw_Box', 'Select_Box']
	},

	XYZ_Box: {
		name: 'XYZ_Box',
		category: '12d Model Interface',
		description: 'Box for XYZ coordinate entry',
		details: `Box for entering 3D coordinates (X, Y, Z).

Characteristics:
- 3D coordinate input
- X, Y, Z fields
- Coordinate validation
- Spatial input`,
		example: `XYZ_Box xyzBox;`,
		related: ['Real_Box', 'Vector3']
	},

	New_XYZ_Box: {
		name: 'New_XYZ_Box',
		category: '12d Model Interface',
		description: 'Enhanced XYZ coordinate entry',
		details: `Enhanced box for 3D coordinate entry with improved interface.

Characteristics:
- 3D coordinate input
- Enhanced UI
- Modern interface
- Improved usability`,
		example: `New_XYZ_Box newXyzBox;`,
		related: ['XYZ_Box']
	},

	New_Select_Box: {
		name: 'New_Select_Box',
		category: '12d Model Interface',
		description: 'Enhanced selection box',
		details: `Enhanced box for selecting items with improved interface.

Characteristics:
- Item selection
- Enhanced UI
- Modern interface
- Better UX`,
		example: `New_Select_Box newSelectBox;`,
		related: ['Select_Box', 'Select_Boxes']
	},

	Select_Boxes: {
		name: 'Select_Boxes',
		category: '12d Model Interface',
		description: 'Multiple selection boxes',
		details: `Box for selecting multiple items from lists.

Characteristics:
- Multiple selection
- List display
- Item management
- Bulk selection`,
		example: `Select_Boxes multiSelect;`,
		related: ['Select_Box', 'New_Select_Box']
	},

	Bitmap_Fill_Box: {
		name: 'Bitmap_Fill_Box',
		category: '12d Model Interface',
		description: 'Box for bitmap fill pattern selection',
		details: `Box for selecting bitmap fill patterns.

Characteristics:
- Fill pattern selection
- Bitmap palette
- Visual preview
- Style selection`,
		example: `Bitmap_Fill_Box fillBox;`,
		related: ['Texture_Box']
	},

	Texture_Box: {
		name: 'Texture_Box',
		category: '12d Model Interface',
		description: 'Box for texture and material selection',
		details: `Box for selecting textures, materials, and billboards.

Can select:
- Textures
- Materials
- Billboards
- Visual properties

Used for:
- Appearance control
- Material specification
- Visual customization`,
		example: `Texture_Box textureBox;`,
		related: ['Bitmap_Fill_Box', 'Colour_Box']
	},

	Billboard_Box: {
		name: 'Billboard_Box',
		category: '12d Model Interface',
		description: 'Box for billboard selection',
		details: `Box for selecting a billboard name from the pop-up list of project billboards.

Characteristics:
- Billboard selection
- Drop-down list
- Project billboard palette
- Visual elements`,
		example: `Billboard_Box billboardBox;`,
		related: ['Texture_Box']
	},

	Bitmap_List_Box: {
		name: 'Bitmap_List_Box',
		category: '12d Model Interface',
		description: 'Box for bitmap list selection',
		details: `Box for selecting from bitmap lists.

Characteristics:
- Bitmap list display
- Image selection
- Visual preview
- List management`,
		example: `Bitmap_List_Box bitmapListBox;`,
		related: ['List_Box']
	},

	Map_File_Box: {
		name: 'Map_File_Box',
		category: '12d Model Interface',
		description: 'Box for map file selection',
		details: `Box for selecting map files.

Characteristics:
- Map file selection
- File browsing
- Map integration
- File management`,
		example: `Map_File_Box mapFileBox;`,
		related: ['File_Box']
	},

	HyperLink_Box: {
		name: 'HyperLink_Box',
		category: '12d Model Interface',
		description: 'Box for hyperlink entry',
		details: `Box for entering hyperlinks in panels.

Characteristics:
- URL entry
- Hyperlink validation
- Link management
- Web integration`,
		example: `HyperLink_Box hyperlinkBox;`,
		related: ['Input_Box']
	},

	Choice_Box: {
		name: 'Choice_Box',
		category: '12d Model Interface',
		description: 'Box for choice selection',
		details: `Box for selecting from predefined choices/options.

Characteristics:
- Option selection
- Drop-down list
- Single selection
- Fixed choices`,
		example: `Choice_Box choiceBox;`,
		related: ['Select_Box']
	},

	Named_Tick_Box: {
		name: 'Named_Tick_Box',
		category: '12d Model Interface',
		description: 'Checkbox with label',
		details: `Checkbox with an associated label/name.

Characteristics:
- Checkbox control
- Boolean value
- Label text
- Toggle state`,
		example: `Named_Tick_Box tickBox;`,
		related: ['Tick_Box']
	},

	Tick_Box: {
		name: 'Tick_Box',
		category: '12d Model Interface',
		description: 'Simple checkbox',
		details: `Simple checkbox for boolean selection.

Characteristics:
- Checkbox control
- On/off state
- Toggle switch
- Boolean input`,
		example: `Tick_Box tickBox;`,
		related: ['Named_Tick_Box']
	},

	Sheet_Size_Box: {
		name: 'Sheet_Size_Box',
		category: '12d Model Interface',
		description: 'Box for sheet size selection',
		details: `Box for selecting page/sheet sizes for printing.

Options include:
- A0, A1, A2, A3, A4
- Letter, Ledger
- Custom sizes

Used for:
- Print setup
- Page configuration
- Plot specification`,
		example: `Sheet_Size_Box sheetBox;`,
		related: ['Plotter_Box']
	},

	Source_Box: {
		name: 'Source_Box',
		category: '12d Model Interface',
		description: 'Box for source selection',
		details: `Box for selecting source objects/data.

Used for:
- Data source selection
- Object reference
- Import source
- Data specification`,
		example: `Source_Box sourceBox;`,
		related: ['Target_Box', 'Select_Box']
	},

	Target_Box: {
		name: 'Target_Box',
		category: '12d Model Interface',
		description: 'Box for target selection',
		details: `Box for selecting target objects/data.

Used for:
- Target specification
- Destination selection
- Output object
- Data target`,
		example: `Target_Box targetBox;`,
		related: ['Source_Box', 'Select_Box']
	},

	Template_Box: {
		name: 'Template_Box',
		category: '12d Model Interface',
		description: 'Box for template selection',
		details: `Box for selecting template objects/settings.

Characteristics:
- Template selection
- Preset management
- Configuration templates
- Style templates`,
		example: `Template_Box templateBox;`,
		related: ['Select_Box']
	},

	ListCtrl_Box: {
		name: 'ListCtrl_Box',
		category: '12d Model Interface',
		description: 'Advanced list control',
		details: `Advanced list control for complex data display.

Characteristics:
- Advanced list
- Multi-column display
- Item management
- Enhanced control`,
		example: `ListCtrl_Box listCtrlBox;`,
		related: ['List_Box', 'GridCtrl_Box']
	},

	Tree_Page: {
		name: 'Tree_Page',
		category: '12d Model Interface',
		description: 'Tree view page',
		details: `Page containing tree view structure for tabbed interfaces.

Used with Widget_Pages for hierarchical navigation.`,
		example: `Tree_Page treePage;`,
		related: ['Tree_Box', 'Widget_Pages']
	},

	Sheet_Panel: {
		name: 'Sheet_Panel',
		category: '12d Model Interface',
		description: 'Panel with sheet-like interface',
		details: `Panel with sheet/spreadsheet-like interface for data entry.`,
		example: `Sheet_Panel sheetPanel;`,
		related: ['Panel', 'GridCtrl_Box']
	},

	Function_Box: {
		name: 'Function_Box',
		category: '12d Model Interface',
		description: 'Box for function selection',
		details: `Box for selecting functions/macros from available project functions.

Characteristics:
- Function selection
- Drop-down list
- Macro selection
- Callable reference`,
		example: `Function_Box funcBox;`,
		related: ['Macro_Function']
	},

	// File Interface Variable Types
	File: {
		name: 'File',
		category: 'File Interface Variable',
		description: 'File unit for file I/O operations',
		details: `A file unit for reading and writing files in 12d Model macros.

Used for:
- File input/output
- File handling
- Data file access
- Stream operations

Characteristics:
- File handle
- Stream interface
- Read/write support
- Error handling`,
		example: `File inputFile;
Open_file("data.txt", inputFile, READ);`,
		related: ['Map_File', 'Plot_Parameter_File']
	},

	Map_File: {
		name: 'Map_File',
		category: 'File Interface Variable',
		description: 'File for mapping element properties',
		details: `A specialized file unit used for mapping element properties to attributes.

Used for:
- Element property mapping
- Attribute assignment
- Batch mapping operations
- Property file processing

Characteristics:
- Mapping file format
- Property specification
- Database integration
- Element linking`,
		example: `Map_File mapFile;`,
		related: ['File', 'Plot_Parameter_File', 'Element']
	},

	Plot_Parameter_File: {
		name: 'Plot_Parameter_File',
		category: 'File Interface Variable',
		description: 'File for plot parameters and settings',
		details: `A file unit for storing and retrieving plot parameters and plotting settings.

Used for:
- Plot configuration
- Parameter storage
- Printer settings
- Plot preferences

Characteristics:
- Parameter storage
- Configuration file
- Plot settings
- Persistence`,
		example: `Plot_Parameter_File plotParams;`,
		related: ['File', 'Plotter_Box']
	},

	XML_Document: {
		name: 'XML_Document',
		category: 'File Interface Variable',
		description: 'XML document object',
		details: `A file object where the file contents are structured as an XML document.

Characteristics:
- XML structure
- Hierarchical data
- Node-based access
- Document parsing

Used for:
- XML file processing
- Data interchange
- Structured data
- Configuration files`,
		example: `XML_Document xmlDoc;`,
		related: ['XML_Node', 'File']
	},

	XML_Node: {
		name: 'XML_Node',
		category: 'File Interface Variable',
		description: 'XML node within a document',
		details: `A node within an XML document structure.

Characteristics:
- Node in XML tree
- Element/attribute access
- Child node navigation
- Node properties

Used for:
- XML traversal
- Element access
- Attribute reading
- Document parsing`,
		example: `XML_Node xmlNode;`,
		related: ['XML_Document']
	},

	// ODBC Database Variable Types
	Connection: {
		name: 'Connection',
		category: 'ODBC Database Variable',
		description: 'Database connection handle',
		details: `The connection object for accessing an ODBC database.

Characteristics:
- Database connection
- Session management
- Connection state
- Query context

Used for:
- Connecting to databases
- Database communication
- Transaction management
- Query execution

Typical Usage:
\`\`\`12dpl
Connection dbConn;
Connect(dbConn, "DSN=MyDatabase");
Select_Query query;
Create_select_query(query, dbConn);
\`\`\``,
		example: `Connection dbConn;
Connect(dbConn, "DSN=MyDatabase", "user", "password");`,
		related: ['Select_Query', 'Insert_Query', 'Update_Query', 'Delete_Query', 'Transactions']
	},

	Select_Query: {
		name: 'Select_Query',
		category: 'ODBC Database Variable',
		description: 'Query for retrieving data from database',
		details: `Used to retrieve data from an ODBC database.

Characteristics:
- Data retrieval
- SELECT statement
- Result set generation
- Row iteration

Used for:
- Reading database records
- Data queries
- Filtering results
- Data analysis`,
		example: `Select_Query query;
Create_select_query(query, dbConn);
Set_query_sql(query, "SELECT * FROM elements");
Execute_query(query);`,
		related: ['Connection', 'Database_Results', 'Query_Condition']
	},

	Insert_Query: {
		name: 'Insert_Query',
		category: 'ODBC Database Variable',
		description: 'Query for inserting data into database',
		details: `Used to add data to an ODBC database.

Characteristics:
- Data insertion
- INSERT statement
- Record creation
- Transaction integration

Used for:
- Adding new records
- Data population
- Record creation
- Database updates`,
		example: `Insert_Query insQuery;
Create_insert_query(insQuery, dbConn);
Set_query_sql(insQuery, "INSERT INTO elements (id, name) VALUES (?, ?)");`,
		related: ['Connection', 'Parameter_Collection']
	},

	Update_Query: {
		name: 'Update_Query',
		category: 'ODBC Database Variable',
		description: 'Query for updating existing data',
		details: `Used to update data in an ODBC database.

Characteristics:
- Data modification
- UPDATE statement
- Record changes
- Conditional updates

Used for:
- Modifying records
- Data updates
- Field changes
- Database maintenance`,
		example: `Update_Query upQuery;
Create_update_query(upQuery, dbConn);
Set_query_sql(upQuery, "UPDATE elements SET name=? WHERE id=?");`,
		related: ['Connection', 'Query_Condition']
	},

	Delete_Query: {
		name: 'Delete_Query',
		category: 'ODBC Database Variable',
		description: 'Query for deleting data from database',
		details: `Used to delete data from an ODBC database.

Characteristics:
- Data deletion
- DELETE statement
- Record removal
- Conditional deletion

Used for:
- Removing records
- Data cleanup
- Database maintenance
- Record deletion`,
		example: `Delete_Query delQuery;
Create_delete_query(delQuery, dbConn);
Set_query_sql(delQuery, "DELETE FROM elements WHERE id=?");`,
		related: ['Connection', 'Query_Condition']
	},

	Database_Results: {
		name: 'Database_Results',
		category: 'ODBC Database Variable',
		description: 'Results from database query execution',
		details: `Contains the results from executing a database query.

Characteristics:
- Query results
- Result set
- Row data
- Column access

Used for:
- Accessing query results
- Row iteration
- Data extraction
- Result processing

Typical Usage:
\`\`\`12dpl
Database_Results results;
Execute_query(query, results);
While_get_row_data(results, ...)
\`\`\``,
		example: `Database_Results results;
Execute_query(selectQuery, results);`,
		related: ['Select_Query', 'Query_Condition']
	},

	Transactions: {
		name: 'Transactions',
		category: 'ODBC Database Variable',
		description: 'Database transaction management',
		details: `Manages database transactions for ODBC operations.

Characteristics:
- Transaction control
- Commit/rollback
- Atomicity
- Consistency

Used for:
- Transaction management
- Data integrity
- Multi-statement operations
- Error recovery

Typical Usage:
\`\`\`12dpl
Begin_transaction(dbConn);
// Perform queries
Commit_transaction(dbConn);
\`\`\``,
		example: `Begin_transaction(dbConn);
Execute_query(query1);
Execute_query(query2);
Commit_transaction(dbConn);`,
		related: ['Connection', 'Select_Query', 'Insert_Query']
	},

	Parameter_Collection: {
		name: 'Parameter_Collection',
		category: 'ODBC Database Variable',
		description: 'Collection of query parameters',
		details: `Holds parameters for parameterized database queries.

Characteristics:
- Parameter storage
- Type support
- Binding support
- Value management

Used for:
- Query parameters
- Parameterized queries
- Safe SQL execution
- Value binding`,
		example: `Parameter_Collection params;
Add_parameter(params, "id", 1);
Add_parameter(params, "name", "test");`,
		related: ['Select_Query', 'Insert_Query', 'Update_Query']
	},

	Query_Condition: {
		name: 'Query_Condition',
		category: 'ODBC Database Variable',
		description: 'Condition for database query filtering',
		details: `Defines conditions for filtering database query results.

Characteristics:
- Query filter
- WHERE clauses
- Logical operators
- Condition building

Used for:
- Result filtering
- Conditional queries
- Data selection
- Query refinement`,
		example: `Query_Condition condition;
Add_condition(condition, "status", EQUAL, "active");`,
		related: ['Select_Query', 'Manual_Condition', 'Database_Results']
	},

	Manual_Condition: {
		name: 'Manual_Condition',
		category: 'ODBC Database Variable',
		description: 'Manually constructed query condition',
		details: `A manually constructed condition for database queries with full SQL control.

Characteristics:
- Manual SQL conditions
- Complex logic
- Full control
- Direct SQL syntax

Used for:
- Advanced filtering
- Complex conditions
- Custom logic
- SQL control`,
		example: `Manual_Condition manualCond;
Set_condition_sql(manualCond, "status='active' AND priority > 5");`,
		related: ['Query_Condition', 'Select_Query']
	},

	// Dynamic Array Types
	Dynamic_Element: {
		name: 'Dynamic_Element',
		category: 'Dynamic Array Type',
		description: 'Dynamic array of Elements',
		details: `A dynamic array that can hold an arbitrary number of Element objects.

Characteristics:
- Dynamic size
- Element storage
- Runtime sizing
- Automatic resizing

Used for:
- Storing variable number of elements
- Selection results
- Element collections
- Batch operations

Typical Usage:
\`\`\`12dpl
Dynamic_Element elements;
Get_num_of_selections(numSelected);
For (i = 1; i <= numSelected; ++i)
  Get_selection(i, elements);
\`\`\``,
		example: `Dynamic_Element selectedElements;
Append(element, selectedElements);
Get_item(selectedElements, 1);`,
		related: ['Element', 'Dynamic_Integer', 'Dynamic_Real']
	},

	Dynamic_Integer: {
		name: 'Dynamic_Integer',
		category: 'Dynamic Array Type',
		description: 'Dynamic array of Integers',
		details: `A dynamic array that can hold an arbitrary number of Integer values.

Characteristics:
- Dynamic size
- Integer storage
- Runtime sizing
- Automatic resizing

Used for:
- Variable-length integer lists
- ID collections
- Index storage
- Dynamic data`,
		example: `Dynamic_Integer ids;
Append(42, ids);
Append(100, ids);`,
		related: ['Integer', 'Dynamic_Integer64', 'Dynamic_Real']
	},

	Dynamic_Integer64: {
		name: 'Dynamic_Integer64',
		category: 'Dynamic Array Type',
		description: 'Dynamic array of 64-bit Integers',
		details: `A dynamic array that can hold an arbitrary number of 64-bit Integer values.

For large integer values that exceed 32-bit range.

Characteristics:
- Dynamic size
- 64-bit integers
- Runtime sizing
- Large value support`,
		example: `Dynamic_Integer64 largeIds;
Append(9223372036854775807, largeIds);`,
		related: ['Integer64', 'Dynamic_Integer', 'Dynamic_Real']
	},

	Dynamic_Real: {
		name: 'Dynamic_Real',
		category: 'Dynamic Array Type',
		description: 'Dynamic array of Real numbers',
		details: `A dynamic array that can hold an arbitrary number of Real (floating-point) values.

Characteristics:
- Dynamic size
- Real number storage
- Runtime sizing
- Precision (14 significant figures)

Used for:
- Coordinates
- Measurements
- Decimal values
- Scientific data`,
		example: `Dynamic_Real coordinates;
Append(123.456, coordinates);
Append(789.012, coordinates);`,
		related: ['Real', 'Dynamic_Integer', 'Dynamic_Text']
	},

	Dynamic_Text: {
		name: 'Dynamic_Text',
		category: 'Dynamic Array Type',
		description: 'Dynamic array of Text strings',
		details: `A dynamic array that can hold an arbitrary number of Text (string) values.

Characteristics:
- Dynamic size
- String storage
- Runtime sizing
- Variable length strings

Used for:
- String collections
- Name lists
- Label storage
- Text data`,
		example: `Dynamic_Text names;
Append("John", names);
Append("Jane", names);
Get_item(names, 1);`,
		related: ['Text', 'Dynamic_Integer', 'Dynamic_Real']
	},

	// Special Types
	void: {
		name: 'void',
		category: 'Special Type',
		description: 'Return type for functions with no return value',
		details: `The void type is used to declare functions that do not return a value.

Characteristics:
- No return value
- Function declaration only
- Procedure-style functions
- Side-effect only operations

Used for:
- Functions that perform actions without returning data
- Procedures
- Event handlers
- Utility functions

Typical Usage:
\`\`\`12dpl
void PrintMessage(Text msg)
{
  Write_message(msg);
}
\`\`\``,
		example: `void Initialize() { 
  // initialization code
}`,
		related: []
	},

	// Database Handles
	Tin: {
		name: 'Tin',
		category: '12d Model Database Handle',
		description: 'Handle for 12d Model TIN surfaces',
		details: `A handle that refers to a 12d Model TIN (Triangulated Irregular Network) surface.

TINs are used for:
- Terrain surface representation
- Digital elevation models
- Surface interpolation
- Spatial analysis

Characteristics:
- Database entity reference
- Surface representation
- Geometric data
- Queryable structure

Used for:
- Accessing TIN data
- Surface operations
- Elevation queries
- Geometric analysis`,
		example: `Tin myTin;
Get_tin("surface_model", myTin);`,
		related: ['Element', 'Model']
	},

	Functions: {
		name: 'Functions',
		category: '12d Model Database Handle',
		description: 'Handle for 12d Model functions',
		details: `A handle that refers to a 12d Model function or macro.

This is similar to Macro_Function but used in different contexts.

Characteristics:
- Function reference
- Macro reference
- Database stored function
- Callable reference

Used for:
- Accessing functions
- Function invocation
- Batch operations
- Function management`,
		example: `Functions myFunc;
Get_function("my_macro", myFunc);`,
		related: ['Macro_Function']
	},

	// Internal Variable Types
	Attribute_Blob: {
		name: 'Attribute_Blob',
		category: '12d Internal Variable',
		description: 'Binary object for attribute data',
		details: `A binary large object specifically designed for storing attribute-related data.

Characteristics:
- Binary format
- Attribute data storage
- Database-backed
- Variable size

Used for:
- Attribute serialization
- Complex attribute data
- Binary attribute storage
- Data persistence`,
		example: `Attribute_Blob attrData;`,
		related: ['Blob', 'Attributes']
	},

	// Fixed Array Types (documentation)
	RealArray: {
		name: 'Real Array',
		category: 'Fixed Array Type',
		description: 'Fixed-size array of Real numbers',
		details: `A fixed-size array declared with a specific number of Real elements.

Fixed arrays must have their sizes defined at compile time using either a literal number or a variable that has been assigned a value before the array declaration.

Characteristics:
- Fixed size at compile time
- Real (floating-point) elements
- Subscript-based access [index]
- Indices start at 1, not 0

Declaration:
- Real array[100]; - literal size
- Real array[N]; - variable size (N must be set before declaration)

Important: In 12dPL, array indices start at 1, unlike C/C++ where they start at 0.

Used for:
- Coordinate storage
- Measurement collections
- Fixed-size datasets
- Performance-critical arrays`,
		example: `Real real_array[100];
real_array[1] = 123.45;
real_array[10] = 987.65;`,
		related: ['Real', 'Integer', 'Dynamic_Real']
	},

	IntegerArray: {
		name: 'Integer Array',
		category: 'Fixed Array Type',
		description: 'Fixed-size array of Integers',
		details: `A fixed-size array declared with a specific number of Integer elements.

Characteristics:
- Fixed size at compile time
- Integer elements (32-bit)
- Subscript-based access [index]
- Indices start at 1

Used for:
- ID storage
- Count collections
- Index arrays
- Fixed-size integer data`,
		example: `Integer count_array[50];
count_array[1] = 10;
count_array[2] = 20;`,
		related: ['Integer', 'Integer64', 'Dynamic_Integer']
	},

	TextArray: {
		name: 'Text Array',
		category: 'Fixed Array Type',
		description: 'Fixed-size array of Text strings',
		details: `A fixed-size array declared with a specific number of Text elements.

Characteristics:
- Fixed size at compile time
- Text (string) elements
- Subscript-based access [index]
- Indices start at 1
- Each element is independent text string`,
		example: `Text name_array[100];
name_array[1] = "John";
name_array[2] = "Jane";`,
		related: ['Text', 'Dynamic_Text']
	}
};

export function getTypeDocumentation(typeName: string): TypeDocumentation | undefined {
	return TYPE_DOCUMENTATION[typeName];
}

export function formatTypeDocumentation(doc: TypeDocumentation): string {
	let markdown = '';
	
	// Title and category
	markdown += `# ${doc.name}\n\n`;
	markdown += `**Category:** ${doc.category}\n\n`;
	
	// Description
	markdown += `${doc.description}\n\n`;
	
	// Details
	markdown += `## Details\n${doc.details}\n\n`;
	
	// Example
	if (doc.example) {
		markdown += `## Example\n\`\`\`12dpl\n${doc.example}\n\`\`\`\n\n`;
	}
	
	// Related types
	if (doc.related && doc.related.length > 0) {
		markdown += `## Related Types\n`;
		markdown += doc.related.map(t => `- \`${t}\``).join('\n');
		markdown += '\n';
	}
	
	return markdown;
}
