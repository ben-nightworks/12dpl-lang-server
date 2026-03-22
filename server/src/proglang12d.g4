/*
 [The "BSD licence"]
 Copyright (c) 2013 Sam Harwell
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
    derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


grammar proglang12d;


primaryExpression
    :   Identifier
    |   Constant
    |   StringLiteral+
    |   '(' expression ')'
    ;


genericAssocList
    :   genericAssociation (',' genericAssociation)*
    ;

genericAssociation
    :   (typeName | 'default') ':' assignmentExpression
    ;

postfixExpression
    :   primaryExpression
    ('[' expression ']'
    | '(' argumentExpressionList? ')'
    | '++'
    | '--'
    )*
    ;

argumentExpressionList
    :   assignmentExpression (',' assignmentExpression)*
    ;

unaryExpression
    :
    ('++' |  '--' )*
    (postfixExpression
    |   unaryOperator castExpression
    )
    ;

unaryOperator
    :   '+' | '-' | '!'
    ;

castExpression
    :   unaryExpression
    ;

multiplicativeExpression
    :   castExpression (('*'|'/'|'%') castExpression)*
    ;

additiveExpression
    :   multiplicativeExpression (('+'|'-') multiplicativeExpression)*
    ;

shiftExpression
    :   additiveExpression (('<<'|'>>') additiveExpression)*
    ;

relationalExpression
    :   shiftExpression (('<'|'>'|'<='|'>=') shiftExpression)*
    ;

equalityExpression
    :   relationalExpression (('=='| '!=') relationalExpression)*
    ;

andExpression
    :   equalityExpression ( '&' equalityExpression)*
    ;

exclusiveOrExpression
    :   andExpression ('^' andExpression)*
    ;

inclusiveOrExpression
    :   exclusiveOrExpression ('|' exclusiveOrExpression)*
    ;

logicalAndExpression
    :   inclusiveOrExpression ('&&' inclusiveOrExpression)*
    ;

logicalOrExpression
    :   logicalAndExpression ( '||' logicalAndExpression)*
    ;

conditionalExpression
    :   logicalOrExpression ('?' expression ':' conditionalExpression)?
    ;

assignmentExpression
    :   conditionalExpression
    |   unaryExpression assignmentOperator assignmentExpression
    ;

assignmentOperator
    :   '=' | '*=' | '/=' | '%=' | '+=' | '-=' | '<<=' | '>>=' | '&=' | '^=' | '|='
    ;

expression
    :   assignmentExpression (',' assignmentExpression)*
    ;

constantExpression
    :   conditionalExpression
    ;

declaration
    :   declarationSpecifiers initDeclaratorList ';'
    ;

initDeclaratorList
    :   initDeclarator (',' initDeclarator)*
    ;

initDeclarator
    :   declarator ('=' initializer)?
    ;

declarationSpecifiers
    :   declarationSpecifier+
    ;

declarationSpecifier
    :   typeSpecifier
    ;

typeSpecifier
    :   'void'
    |   'Text'
    |   'Integer'
    |   'Real'
	|   builtInTypeSpecifier
	|   builtInSetTypeSpecifier
	|   builtInMultiSetTypeSpecifier
	|   builtInMapTypeSpecifier
	|   builtInMultiMapTypeSpecifier
    ;

builtInTypeSpecifier
    : builtInWidgetTypeSpecifier
    | 'Element'
    | 'Model'
    | 'Dynamic_Element'
    | 'Tin'
    | 'Menu'
    | 'Dynamic_Text'
    | 'Point'
    | 'Line'
    | 'Arc'
    | 'Segment'
    | 'File'
    | 'View'
    | 'Widget'
    | 'Map_File'
    | 'Apply_Many_Function'
    | 'Kerb_Return_Function'
    | 'Function'
    | 'Macro_Function'
    | 'Apply_Function'
    | 'Undo_List'
    | 'Undo'
    | 'Textstyle_Data'
    | 'SDR_Attribute'
    | 'Dynamic_Integer'
    | 'Dynamic_Real'
    | 'Uid'
    | 'Attributes'
    | 'Equality_Info'
    | 'Equality_Label'
    | 'Vector2'
    | 'Vector3'
    | 'Vector4'
    | 'Matrix3'
    | 'Matrix4'
    | 'XML_Document'
    | 'XML_Node'
    | 'Plot_Parameter_File'
    | 'Connection'
    | 'Select_Query'
    | 'Database_Result'
    | 'Insert_Query'
    | 'Update_Query'
    | 'Delete_Query'
    | 'Manual_Query'
    | 'Transaction'
    | 'Query_Condition'
    | 'Parameter_Collection'
    | 'Manual_Condition'
    | 'Unknown'
    | 'Log_Line'
    | 'Function_Property_Collection'
    | 'Curve'
    | 'Integer64'
    | 'Guid'
    | 'Attribute_Blob'
    | 'Attribute'
    | 'Functions'
    | 'Database_Results'
    | 'Transactions'
    | 'Dynamic_Integer64'
    | 'Colour'
    | 'Time'
    | 'Drainage_Network'
    | 'Integer_Set'
    | 'List'
    | 'Process_Handle'
    | 'Real_Set'
    | 'Selection'
    | 'String'
    | 'Text_Set'
    | 'Spiral'
    | 'Parabola'
    ;

builtInWidgetTypeSpecifier
    : 'Panel'
    | 'Sheet_Panel'
    | 'Vertical_Group'
    | 'Horizontal_Group'
    | 'Widget_Pages'
    | 'Button'
    | 'Select_Button'
    | 'Message_Box'
    | 'Colour_Message_Box'
    | 'Log_Box'
    | 'Angle_Box'
    | 'Attributes_Box'
    | 'Billboard_Box'
    | 'Bitmap_Fill_Box'
    | 'Bitmap_List_Box'
    | 'Chainage_Box'
    | 'Choice_Box'
    | 'Colour_Box'
    | 'Date_Time_Box'
    | 'Directory_Box'
    | 'Draw_Box'
    | 'File_Box'
    | 'Function_Box'
    | 'Graph_Box'
    | 'GridCtrl_Box'
    | 'HyperLink_Box'
    | 'Input_Box'
    | 'Integer_Box'
    | 'Justify_Box'
    | 'Linestyle_Box'
    | 'List_Box'
    | 'ListCtrl_Box'
    | 'Map_File_Box'
    | 'Model_Box'
    | 'Name_Box'
    | 'Named_Tick_Box'
    | 'New_Select_Box'
    | 'New_XYZ_Box'
    | 'Overlay_Widget'
    | 'Plotter_Box'
    | 'Polygon_Box'
    | 'Projection_Box'
    | 'Real_Box'
    | 'Report_Box'
    | 'Screen_Text'
    | 'Select_Box'
    | 'Select_Boxes'
    | 'Sheet_Size_Box'
    | 'Slider_Box'
    | 'Source_Box'
    | 'Symbol_Box'
    | 'Tab_Box'
    | 'Target_Box'
    | 'Template_Box'
    | 'Text_Edit_Box'
    | 'Text_Style_Box'
    | 'Text_Units_Box'
    | 'Textstyle_Data_Box'
    | 'Texture_Box'
    | 'Tick_Box'
    | 'Time_Zone_Box'
    | 'Time_Zone_Box_Box'
    | 'Tin_Box'
    | 'Tree_Box'
    | 'Tree_Page'
    | 'View_Box'
    | 'XYZ_Box'
    ;

builtInSetTypeSpecifier
	: 'Integer_Set'
	| 'Integer64_Set'
	| 'Real_Set'
	| 'Text_Set'
	| 'Uid_Set'
	| 'Guid_Set'
	| 'Point_Set'
	| 'Vector2_Set'
	| 'Vector3_Set'
	| 'Vector4_Set'
	;
builtInMultiSetTypeSpecifier
	: 'Integer_Multiset'
	| 'Integer64_Multiset'
	| 'Real_Multiset'
	| 'Text_Multiset'
	| 'Uid_Multiset'
	| 'Guid_Multiset'
	| 'Point_Multiset'
	| 'Vector2_Multiset'
	| 'Vector3_Multiset'
	| 'Vector4_Multiset'
	;
builtInMapTypeSpecifier
	: 'Integer_Integer_Map'
	| 'Integer64_Integer_Map'
	| 'Real_Integer_Map'
	| 'Text_Integer_Map'
	| 'Uid_Integer_Map'
	| 'Guid_Integer_Map'
	| 'Point_Integer_Map'
	| 'Vector2_Integer_Map'
	| 'Vector3_Integer_Map'
	| 'Vector4_Integer_Map'
	| 'Integer_Integer64_Map'
	| 'Integer64_Integer64_Map'
	| 'Real_Integer64_Map'
	| 'Text_Integer64_Map'
	| 'Uid_Integer64_Map'
	| 'Guid_Integer64_Map'
	| 'Point_Integer64_Map'
	| 'Vector2_Integer64_Map'
	| 'Vector3_Integer64_Map'
	| 'Vector4_Integer64_Map'
	| 'Integer_Real_Map'
	| 'Integer64_Real_Map'
	| 'Real_Real_Map'
	| 'Text_Real_Map'
	| 'Uid_Real_Map'
	| 'Guid_Real_Map'
	| 'Point_Real_Map'
	| 'Vector2_Real_Map'
	| 'Vector3_Real_Map'
	| 'Vector4_Real_Map'
	| 'Integer_Text_Map'
	| 'Integer64_Text_Map'
	| 'Real_Text_Map'
	| 'Text_Text_Map'
	| 'Uid_Text_Map'
	| 'Guid_Text_Map'
	| 'Point_Text_Map'
	| 'Vector2_Text_Map'
	| 'Vector3_Text_Map'
	| 'Vector4_Text_Map'
	| 'Integer_Uid_Map'
	| 'Integer64_Uid_Map'
	| 'Real_Uid_Map'
	| 'Text_Uid_Map'
	| 'Uid_Uid_Map'
	| 'Guid_Uid_Map'
	| 'Point_Uid_Map'
	| 'Vector2_Uid_Map'
	| 'Vector3_Uid_Map'
	| 'Vector4_Uid_Map'
	| 'Integer_Guid_Map'
	| 'Integer64_Guid_Map'
	| 'Real_Guid_Map'
	| 'Text_Guid_Map'
	| 'Uid_Guid_Map'
	| 'Guid_Guid_Map'
	| 'Point_Guid_Map'
	| 'Vector2_Guid_Map'
	| 'Vector3_Guid_Map'
	| 'Vector4_Guid_Map'
	| 'Integer_Point_Map'
	| 'Integer64_Point_Map'
	| 'Real_Point_Map'
	| 'Text_Point_Map'
	| 'Uid_Point_Map'
	| 'Guid_Point_Map'
	| 'Point_Point_Map'
	| 'Vector2_Point_Map'
	| 'Vector3_Point_Map'
	| 'Vector4_Point_Map'
	| 'Integer_Vector2_Map'
	| 'Integer64_Vector2_Map'
	| 'Real_Vector2_Map'
	| 'Text_Vector2_Map'
	| 'Uid_Vector2_Map'
	| 'Guid_Vector2_Map'
	| 'Point_Vector2_Map'
	| 'Vector2_Vector2_Map'
	| 'Vector3_Vector2_Map'
	| 'Vector4_Vector2_Map'
	| 'Integer_Vector3_Map'
	| 'Integer64_Vector3_Map'
	| 'Real_Vector3_Map'
	| 'Text_Vector3_Map'
	| 'Uid_Vector3_Map'
	| 'Guid_Vector3_Map'
	| 'Point_Vector3_Map'
	| 'Vector2_Vector3_Map'
	| 'Vector3_Vector3_Map'
	| 'Vector4_Vector3_Map'
	| 'Integer_Vector4_Map'
	| 'Integer64_Vector4_Map'
	| 'Real_Vector4_Map'
	| 'Text_Vector4_Map'
	| 'Uid_Vector4_Map'
	| 'Guid_Vector4_Map'
	| 'Point_Vector4_Map'
	| 'Vector2_Vector4_Map'
	| 'Vector3_Vector4_Map'
	| 'Vector4_Vector4_Map'
	;
builtInMultiMapTypeSpecifier
	: 'Integer_Integer_Multimap'
	| 'Integer64_Integer_Multimap'
	| 'Real_Integer_Multimap'
	| 'Text_Integer_Multimap'
	| 'Uid_Integer_Multimap'
	| 'Guid_Integer_Multimap'
	| 'Point_Integer_Multimap'
	| 'Vector2_Integer_Multimap'
	| 'Vector3_Integer_Multimap'
	| 'Vector4_Integer_Multimap'
	| 'Integer_Integer64_Multimap'
	| 'Integer64_Integer64_Multimap'
	| 'Real_Integer64_Multimap'
	| 'Text_Integer64_Multimap'
	| 'Uid_Integer64_Multimap'
	| 'Guid_Integer64_Multimap'
	| 'Point_Integer64_Multimap'
	| 'Vector2_Integer64_Multimap'
	| 'Vector3_Integer64_Multimap'
	| 'Vector4_Integer64_Multimap'
	| 'Integer_Real_Multimap'
	| 'Integer64_Real_Multimap'
	| 'Real_Real_Multimap'
	| 'Text_Real_Multimap'
	| 'Uid_Real_Multimap'
	| 'Guid_Real_Multimap'
	| 'Point_Real_Multimap'
	| 'Vector2_Real_Multimap'
	| 'Vector3_Real_Multimap'
	| 'Vector4_Real_Multimap'
	| 'Integer_Text_Multimap'
	| 'Integer64_Text_Multimap'
	| 'Real_Text_Multimap'
	| 'Text_Text_Multimap'
	| 'Uid_Text_Multimap'
	| 'Guid_Text_Multimap'
	| 'Point_Text_Multimap'
	| 'Vector2_Text_Multimap'
	| 'Vector3_Text_Multimap'
	| 'Vector4_Text_Multimap'
	| 'Integer_Uid_Multimap'
	| 'Integer64_Uid_Multimap'
	| 'Real_Uid_Multimap'
	| 'Text_Uid_Multimap'
	| 'Uid_Uid_Multimap'
	| 'Guid_Uid_Multimap'
	| 'Point_Uid_Multimap'
	| 'Vector2_Uid_Multimap'
	| 'Vector3_Uid_Multimap'
	| 'Vector4_Uid_Multimap'
	| 'Integer_Guid_Multimap'
	| 'Integer64_Guid_Multimap'
	| 'Real_Guid_Multimap'
	| 'Text_Guid_Multimap'
	| 'Uid_Guid_Multimap'
	| 'Guid_Guid_Multimap'
	| 'Point_Guid_Multimap'
	| 'Vector2_Guid_Multimap'
	| 'Vector3_Guid_Multimap'
	| 'Vector4_Guid_Multimap'
	| 'Integer_Point_Multimap'
	| 'Integer64_Point_Multimap'
	| 'Real_Point_Multimap'
	| 'Text_Point_Multimap'
	| 'Uid_Point_Multimap'
	| 'Guid_Point_Multimap'
	| 'Point_Point_Multimap'
	| 'Vector2_Point_Multimap'
	| 'Vector3_Point_Multimap'
	| 'Vector4_Point_Multimap'
	| 'Integer_Vector2_Multimap'
	| 'Integer64_Vector2_Multimap'
	| 'Real_Vector2_Multimap'
	| 'Text_Vector2_Multimap'
	| 'Uid_Vector2_Multimap'
	| 'Guid_Vector2_Multimap'
	| 'Point_Vector2_Multimap'
	| 'Vector2_Vector2_Multimap'
	| 'Vector3_Vector2_Multimap'
	| 'Vector4_Vector2_Multimap'
	| 'Integer_Vector3_Multimap'
	| 'Integer64_Vector3_Multimap'
	| 'Real_Vector3_Multimap'
	| 'Text_Vector3_Multimap'
	| 'Uid_Vector3_Multimap'
	| 'Guid_Vector3_Multimap'
	| 'Point_Vector3_Multimap'
	| 'Vector2_Vector3_Multimap'
	| 'Vector3_Vector3_Multimap'
	| 'Vector4_Vector3_Multimap'
	| 'Integer_Vector4_Multimap'
	| 'Integer64_Vector4_Multimap'
	| 'Real_Vector4_Multimap'
	| 'Text_Vector4_Multimap'
	| 'Uid_Vector4_Multimap'
	| 'Guid_Vector4_Multimap'
	| 'Point_Vector4_Multimap'
	| 'Vector2_Vector4_Multimap'
	| 'Vector3_Vector4_Multimap'
	| 'Vector4_Vector4_Multimap'
	;



specifierQualifierList
    :   typeSpecifier specifierQualifierList?
    ;

declarator
    :   directDeclarator
    ;

directDeclarator
    :   Identifier
    |   directDeclarator '[' constantExpression? ']'
    |   directDeclarator '(' parameterTypeList ')'
    |   directDeclarator '(' identifierList? ')'
    ;

nestedParenthesesBlock
    :   (   ~('(' | ')')
        |   '(' nestedParenthesesBlock ')'
        )*
    ;

parameterTypeList
    :   parameterList (',' '...')?
    ;

parameterList
    :   parameterDeclaration (',' parameterDeclaration)*
    ;

parameterDeclaration
    :   declarationSpecifiers Identifier?
    |   declarationSpecifiers '&' Identifier
    |   declarationSpecifiers Identifier '[' ']' // Array parameter
    |   declarationSpecifiers '&' Identifier '[' ']' // Pass-by-reference array parameter
    ;

identifierList
    :   Identifier (',' Identifier)*
    ;

typeName
    :   specifierQualifierList
    ;

directAbstractDeclarator
    :   '[' '*' ']'
    |   directAbstractDeclarator '[' assignmentExpression? ']'
    |   directAbstractDeclarator '[' '*' ']'
    ;

typedefName
    :   Identifier
    ;

initializer
    :   assignmentExpression
    |   '{' initializerList ','? '}'
    ;

initializerList
    :   designation? initializer (',' designation? initializer)*
    ;

designation
    :   designatorList '='
    ;

designatorList
    :   designator+
    ;

designator
    :   '[' constantExpression ']'
    |   '.' Identifier
    ;

statement
    :   labeledStatement
    |   compoundStatement
    |   expressionStatement
    |   selectionStatement
    |   iterationStatement
    |   jumpStatement
    |   ('__asm' | '__asm__') ('volatile' | '__volatile__') '(' (logicalOrExpression (',' logicalOrExpression)*)? (':' (logicalOrExpression (',' logicalOrExpression)*)?)* ')' ';'
    ;

labeledStatement
    :   Identifier ':' statement
    |   'case' constantExpression ':' statement
    |   'default' ':' compoundStatement
    ;

compoundStatement
    :   '{' blockItemList? '}'
    ;

blockItemList
    :   blockItem+
    ;

blockItem
    :   statement
    |   declaration
    ;

expressionStatement
    :   expression? ';'
    ;

selectionStatement
    :   'if' '(' expression ')' statement ('else' statement)?
    |   'switch' '(' expression ')' statement
    ;

iterationStatement
    :   While '(' expression ')' statement
    |   Do statement While '(' expression ')' ';'
    |   For '(' forCondition ')' statement
    ;

forCondition
	:   (forDeclaration | expression?) ';' forExpression? ';' forExpression?
	;

forDeclaration
    :   declarationSpecifiers initDeclaratorList
    ;

forExpression
    :   assignmentExpression (',' assignmentExpression)*
    ;

jumpStatement
    :   ('goto' Identifier
    |   'continue'
    |   'break'
    |   'return' expression?
    |   'goto' unaryExpression // GCC extension
    )
    ';'
    ;

compilationUnit
    :   translationUnit? EOF
    ;

translationUnit
    :   externalDeclaration+
    ;

externalDeclaration
    :   functionDefinition
    |   declaration
    |   ';' // stray ;
    ;

functionDefinition
    :   declarationSpecifiers? declarator declarationList? compoundStatement
    ;

declarationList
    :   declaration+
    ;


Break : 'break';
Case : 'case';
Char : 'Text';
Continue : 'continue';
Default : 'default';
Do : 'do';
Else : 'else';
Float : 'Real';
For : 'for';
Goto : 'goto';
If : 'if';
Int : 'Integer';
Return : 'return';
Switch : 'switch';
Void : 'void';
While : 'while';

LeftParen : '(';
RightParen : ')';
LeftBracket : '[';
RightBracket : ']';
LeftBrace : '{';
RightBrace : '}';

Less : '<';
LessEqual : '<=';
Greater : '>';
GreaterEqual : '>=';
LeftShift : '<<';
RightShift : '>>';

Plus : '+';
PlusPlus : '++';
Minus : '-';
MinusMinus : '--';
Star : '*';
Div : '/';
Mod : '%';

And : '&';
Or : '|';
AndAnd : '&&';
OrOr : '||';
Caret : '^';
Not : '!';

Question : '?';
Colon : ':';
Semi : ';';
Comma : ',';

Assign : '=';
StarAssign : '*=';
DivAssign : '/=';
ModAssign : '%=';
PlusAssign : '+=';
MinusAssign : '-=';
LeftShiftAssign : '<<=';
RightShiftAssign : '>>=';
AndAssign : '&=';
XorAssign : '^=';
OrAssign : '|=';

Equal : '==';
NotEqual : '!=';

Dot : '.';

Constant
    :   IntegerConstant
    |   FloatingConstant
    |   CharacterConstant
    ;

// Identifier must be AFTER Constant so that hex/binary literals (0x1F, 0b1010)
// win ties over digit-prefixed identifiers. ANTLR uses longest-match first,
// then rule-order for same-length ties.
Identifier
    :   IdentifierNondigit
        (   IdentifierNondigit
        |   Digit
        )*
    |   Digit+ IdentifierNondigit    // 12dpl allows digit-prefixed identifiers like 2d_string
        (   IdentifierNondigit
        |   Digit
        )*
    ;

fragment
IdentifierNondigit
    :   Nondigit
    |   UniversalCharacterName
    ;

fragment
Nondigit
    :   [a-zA-Z_]
    ;

fragment
Digit
    :   [0-9]
    ;

fragment
UniversalCharacterName
    :   '\\u' HexQuad
    |   '\\U' HexQuad HexQuad
    ;

fragment
HexQuad
    :   HexadecimalDigit HexadecimalDigit HexadecimalDigit HexadecimalDigit
    ;

fragment
IntegerConstant
    :   DecimalConstant IntegerSuffix?
    |   OctalConstant IntegerSuffix?
    |   HexadecimalConstant IntegerSuffix?
    |	BinaryConstant
    |   DecimalConstant 'LL' // Explicit support for 64-bit integer suffix
    ;

fragment
BinaryConstant
	:	'0' [bB] [0-1]+
	;

fragment
DecimalConstant
    :   NonzeroDigit Digit*
    ;

fragment
OctalConstant
    :   '0' OctalDigit*
    ;

fragment
HexadecimalConstant
    :   HexadecimalPrefix HexadecimalDigit+
    ;

fragment
HexadecimalPrefix
    :   '0' [xX]
    ;

fragment
NonzeroDigit
    :   [1-9]
    ;

fragment
OctalDigit
    :   [0-7]
    ;

fragment
HexadecimalDigit
    :   [0-9a-fA-F]
    ;

fragment
IntegerSuffix
    :   UnsignedSuffix LongSuffix?
    |   UnsignedSuffix LongLongSuffix
    |   LongSuffix UnsignedSuffix?
    |   LongLongSuffix UnsignedSuffix?
    ;

fragment
UnsignedSuffix
    :   [uU]
    ;

fragment
LongSuffix
    :   [lL]
    ;

fragment
LongLongSuffix
    :   'll' | 'LL'
    ;

fragment
FloatingConstant
    :   DecimalFloatingConstant
    |   HexadecimalFloatingConstant
    ;

fragment
DecimalFloatingConstant
    :   FractionalConstant ExponentPart? FloatingSuffix?
    |   DigitSequence ExponentPart FloatingSuffix?
    |   DigitSequence '.' // Allow 6.
    ;

fragment
HexadecimalFloatingConstant
    :   HexadecimalPrefix (HexadecimalFractionalConstant | HexadecimalDigitSequence) BinaryExponentPart FloatingSuffix?
    ;

fragment
FractionalConstant
    :   DigitSequence? '.' DigitSequence
    |   DigitSequence '.'
    ;

fragment
ExponentPart
    :   [eE] Sign? DigitSequence
    ;

fragment
Sign
    :   [+-]
    ;

DigitSequence
    :   Digit+
    ;

fragment
HexadecimalFractionalConstant
    :   HexadecimalDigitSequence? '.' HexadecimalDigitSequence
    |   HexadecimalDigitSequence '.'
    ;

fragment
BinaryExponentPart
    :   [pP] Sign? DigitSequence
    ;

fragment
HexadecimalDigitSequence
    :   HexadecimalDigit+
    ;

fragment
FloatingSuffix
    :   [flFL]
    ;

fragment
CharacterConstant
    :   '\'' CCharSequence '\''
    |   'L\'' CCharSequence '\''
    |   'u\'' CCharSequence '\''
    |   'U\'' CCharSequence '\''
    ;

fragment
CCharSequence
    :   CChar+
    ;

fragment
CChar
    :   ~['\\\r\n]
    |   EscapeSequence
    ;

fragment
EscapeSequence
    :   SimpleEscapeSequence
    |   OctalEscapeSequence
    |   HexadecimalEscapeSequence
    |   UniversalCharacterName
    ;

fragment
SimpleEscapeSequence
    :   '\\' ['"?abfnrtv\\]
    ;

fragment
OctalEscapeSequence
    :   '\\' OctalDigit OctalDigit? OctalDigit?
    ;

fragment
HexadecimalEscapeSequence
    :   '\\x' HexadecimalDigit+
    ;

StringLiteral
    :   '"' SCharSequence? '"'
    ;

fragment
SCharSequence
    :   SChar+
    ;

fragment
SChar
    :   ~["\\\r\n]
    |   EscapeSequence
    |   '\\\n'   // Added line
    |   '\\\r\n' // Added line
    ;

ComplexDefine
    :   '#' Whitespace? 'define'  ~[#\r\n]*
        -> skip
    ;

IncludeDirective
    :   '#' Whitespace? 'include' Whitespace? ('"' ~[\r\n]* '"' | '<' ~[\r\n]* '>' ) Whitespace? Newline
        -> skip
    ;

Whitespace
    :   [ \t]+
        -> skip
    ;

Newline
    :   (   '\r' '\n'?
        |   '\n'
        )
        -> skip
    ;

BlockComment
    :   '/*' .*? '*/'
        -> skip
    ;

LineComment
    :   '//' ~[\r\n]*
        -> skip
    ;
