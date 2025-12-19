/**
 * Reserved words in 12dPL that cannot be used for user-defined names
 */

export const RESERVED_TYPES = new Set([
	// Basic types
	'Integer', 'Integer64', 'Real', 'Text', 'Uid', 'Guid',
	'Attribute_Blob', 'Attributes', 'Attribute', 'Element', 'Model', 'View',
	'Point', 'Line', 'Segment', 'Curve', 'Menu', 'Tin',
	'Dynamic_Integer', 'Dynamic_Real', 'Dynamic_Text', 'Dynamic_Element',
	'Dynamic_Integer64', 'Colour', 'Time'
]);

export const RESERVED_UI_TYPES = new Set([
	'Angle_Box', 'Apply_Function', 'Apply_Many_Function', 'Arc',
	'Attributes_Box', 'Billboard_Box', 'Bitmap_Fill_Box', 'Bitmap_List_Box', 'Button',
	'Chainage_Box', 'Choice_Box', 'Colour_Box', 'Colour_Message_Box',
	'Connection', 'Database_Result', 'Date_Time_Box', 'Delete_Query',
	'Directory_Box', 'Drainage_Network', 'Draw_Box', 'Equality_Info',
	'Equality_Label', 'File', 'File_Box', 'Function', 'Function_Box',
	'Function_Property_Collection', 'Graph_Box', 'GridCtrl_Box', 'Horizontal_Group',
	'HyperLink_Box', 'Input_Box', 'Insert_Query', 'Integer_Box', 'Integer_Set',
	'Justify_Box', 'Kerb_Return_Function', 'Linestyle_Box', 'List',
	'List_Box', 'ListCtrl_Box', 'Log_Box', 'Log_Line', 'Macro_Function',
	'Manual_Condition', 'Manual_Query', 'Map_File', 'Map_File_Box', 'Matrix3', 'Matrix4',
	'Message_Box', 'Model_Box', 'Name_Box', 'Named_Tick_Box',
	'New_Select_Box', 'New_XYZ_Box', 'Overlay_Widget', 'Panel', 'Parabola',
	'Parameter_Collection', 'Plot_Parameter_File', 'Plotter_Box',
	'Polygon_Box', 'Process_Handle', 'Query_Condition', 'Real_Box', 'Real_Set',
	'Report_Box', 'Screen_Text', 'SDR_Attribute', 'Select_Box', 'Select_Boxes',
	'Select_Button', 'Select_Query', 'Selection', 'Sheet_Panel', 'Sheet_Size_Box',
	'Slider_Box', 'Source_Box', 'Spiral', 'String', 'Symbol_Box',
	'Tab_Box', 'Target_Box', 'Template_Box', 'Text_Edit_Box', 'Text_Set',
	'Text_Style_Box', 'Text_Units_Box', 'Textstyle_Data', 'Textstyle_Data_Box',
	'Texture_Box', 'Tick_Box', 'Time_Zone_Box',
	'Tin_Box', 'Transaction', 'Tree_Box', 'Tree_Page', 'Undo', 'Undo_List',
	'Update_Query', 'Vector2', 'Vector3', 'Vector4', 'Vertical_Group',
	'View_Box', 'Widget', 'Widget_Pages', 'XML_Document',
	'XML_Node', 'XYZ_Box'
]);

export const RESERVED_CONTROL_FLOW = new Set([
	'break', 'case', 'char', 'continue', 'default',
	'do', 'double', 'else', 'float', 'for',
	'goto', 'if', 'int', 'integer', 'long',
	'real', 'return', 'short', 'switch', 'void',
	'while'
]);

export const RESERVED_STORAGE_CLASS = new Set([
	'auto', 'class', 'const', 'delete', 'enum',
	'extern', 'friend', 'inline', 'new', 'operator',
	'private', 'protected', 'public', 'register', 'signed',
	'sizeof', 'static', 'struct', 'template', 'this',
	'throw', 'try', 'typedef', 'union', 'unsigned',
	'virtual', 'volatile'
]);

// Container type patterns
export const CONTAINER_KEY_TYPES = new Set([
	'Integer', 'Integer64', 'Real', 'Text', 'Uid', 'Guid',
	'Point', 'Vector2', 'Vector3', 'Vector4'
]);

export const CONTAINER_SUFFIXES = ['_Map', '_Multimap', '_Set', '_Multiset'];

/**
 * Check if a word is reserved
 */
export function isReservedWord(word: string): boolean {
	return (
		RESERVED_TYPES.has(word) ||
		RESERVED_UI_TYPES.has(word) ||
		RESERVED_CONTROL_FLOW.has(word) ||
		RESERVED_STORAGE_CLASS.has(word) ||
		isContainerType(word)
	);
}

/**
 * Check if a word matches a container type pattern
 */
export function isContainerType(word: string): boolean {
	for (const suffix of CONTAINER_SUFFIXES) {
		if (word.endsWith(suffix)) {
			const prefix = word.substring(0, word.length - suffix.length);
			// Check for simple types or compound types
			if (CONTAINER_KEY_TYPES.has(prefix)) {
				return true;
			}
			// Check for compound types like Integer_Text_Map
			const parts = prefix.split('_');
			if (parts.length >= 2 && CONTAINER_KEY_TYPES.has(parts[0]) && CONTAINER_KEY_TYPES.has(parts[parts.length - 1])) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Get all reserved words
 */
export function getAllReservedWords(): string[] {
	return [
		...Array.from(RESERVED_TYPES),
		...Array.from(RESERVED_UI_TYPES),
		...Array.from(RESERVED_CONTROL_FLOW),
		...Array.from(RESERVED_STORAGE_CLASS)
	];
}

/**
 * Get category for a reserved word
 */
export function getReservedWordCategory(word: string): string {
	if (RESERVED_TYPES.has(word)) return 'Type';
	if (RESERVED_UI_TYPES.has(word)) return 'UI Type';
	if (RESERVED_CONTROL_FLOW.has(word)) return 'Control Flow';
	if (RESERVED_STORAGE_CLASS.has(word)) return 'Storage Class';
	if (isContainerType(word)) return 'Container Type';
	return 'Reserved';
}
