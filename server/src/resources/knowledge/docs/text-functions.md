> Source: *12d Model Macro Programming Manual* — Section 5.8 (pages 86–97)

# 12dPL Text Functions

All built-in functions for working with `Text` variables: length, case conversion, searching, substrings, character access, formatting, and conversion to/from other types.

## Contents
- 5.8.1 Text and Operators
- 5.8.2 General Text
- 5.8.3 Sub-Text Functions
- 5.8.4 Character Functions
- 5.8.5 Text Conversion Functions
- 5.8.6 Format / To_text
- 5.8.7 From_text / Parsing

---

Page 85
Text
5.8 Text
A Text variable text consists of zero or more characters (spaces or blanks are valid characters).
The length of a Text is the total number of characters including any leading, trailing and embedded 
spaces. For example, the length of " fr ed " is seven.
Each character in the Text has a unique position or index which is defined to be the number of 
characters plus one that it is from the start of the Text. For example in " fr ed ", the index or position 
of "e" is five.
Hence parts of a Text (sub-Texts) can be easily referred to by giving the start and end positions of 
the part. For example, the sub-Text from start position three to end position five of " fr ed " is "r e".
12dPL provides functions to construct Texts and also work with parts of a Texts (sub-Text).
5.8.1 Text and Operators
The operators   +  +=  <  >  >=  <=   ==  !=  can be used with Text variables.
The + operator for Text variables means that the variables are concatenated. For example, after
   Text               new = "fred" + "joe";
the value of new is "fredjoe".
When Text is used in equalities and inequalities such as <, <=, >, >= and  ==, the ASCII sorting 
sequence value is used for the Text comparisons.
5.8.2 General Text
Text_length(Text text)
Name
Integer Text_length(Text text)
Description
The function return value is the length of the Text text.
ID = 381
Numchr(Text text)
Name
Integer Numchr(Text text)
Description
The function return value is the position of the last non-blank character in the Text text.
If there are no non-blank characters, the return value is zero.
ID = 478
Text_upper(Text text)
Name
Text Text_upper(Text text)
Text

Description
Create a Text from the Text text that has all the alphabetic characters converted to upper
-case.
The function return value is the upper case Text.
ID = 383
Text_lower(Text text)
Name
Text Text_lower(Text text)
Description
Create a Text from the Text text that has all the alphabetic characters converted to lower-
case.
The function return value is the lower case Text.
ID = 384
Text_justify(Text text)
Name
Text Text_justify(Text text)
Description
Create a Text from the Text text that has all the leading and trailing spaces removed.
The function return value is the justified Text.
ID = 382
Find_text(Text text,Text tofind)
Name
Integer Find_text(Text text,Text tofind)
Description
Find the first occurrence of the Text tofind within the Text text.
If tofind exists within text, the start position of tofind is returned as the function return value.
If tofind does not exist within text, a start position of zero is returned as the function return value.
If tofind is a empty, the function will return value one, even when text itself is empty.
Hence a function return value of zero indicates the Text tofind does not exist within the Text text.
ID = 380
Get_subtext(Text text,Integer start,Integer end)
Name
Text Get_subtext(Text text,Integer start,Integer end)
Description
From the Text text, create a new Text from character position start to character position end 
inclusive.
Text
The function return value is the sub-Text.
ID = 379
Set_subtext(Text &text,Integer start,Text sub)
Name
void Set_subtext(Text &text,Integer start,Text sub)
Description
Set the Text text from character position start to be the Text sub. The existing characters of text are 
overwritten by sub.
If required, Text text will be automatically extended to fit sub.
If start is greater than the length of text, text will be extended with spaces and sub inserted at 
position start.
There is no function return value.
ID = 389
Insert_text(Text &text,Integer start,Text sub)
Name
void Insert_text(Text &text,Integer start,Text sub)
Description
Insert the Text sub into Text text starting at position start. The displaced characters of text are 
placed after sub.
The Text text is automatically extended to fit sub and no characters of text are lost.
There is no function return value.
ID = 390
Any_escape_characters(Text text)
Name
Integer Any_escape_characters(Text text)
Description
Return one if the Text text contain any two consecutive characters representing an escape 
character; i.e a backslash character followed by the character n, r, or t. Return zero otherwise. 
ID = 2809
Any_literal_escape_characters(Text text)
Name
Integer Any_literal_escape_characters(Text text)
Description
Return one if the Text text contain any literal escape characters. Return zero otherwise. 
ID = 7952
Text

Convert_escape_characters(Text text)
Name
Text Convert_escape_characters(Text text)
Description
Convert all escape characters in the Text text; i.e a backslash character followed by the 
character n, r, or t; to the equivalent embedded characters i.e new line, return, tab. 
The converted Text is the returned result of the function call. 
ID = 2810
Convert_legal_XML(Text text)
Name
Text Convert_legal_XML(Text text)
Description
Convert all special characters < & > ’ " in the Text text; into their legal XML forms 
 & lt;
 & amp;
 & gt;
 & apos;
 & quot;
 
The converted Text is the returned result of the function call. 
ID = 7898
Text
5.8.3 Text Conversion
From_text(Text text, Integer &value)
Name
Integer From_text(Text text, Integer &value)
Description
Convert the Text text to an Integer value. The text should only include digits.
The function return value is zero if the conversion is successful.
 ID = 30
From_text(Text text, Integer &value,Text format)
Name
Integer From_text(Text text, Integer &value,Text format)
Description
Convert the Text text to an Integer value using the Text format as a C++ format string.
The function return value is zero if the conversion is successful.
Warning
The user is responsible for ensuring that the format string is sensible.
 ID = 387
From_text(Text text, Integer64 &value)
Name
Integer From_text(Text text, Integer64 &value)
Description
Convert the Text text to a 64 bit Integer value. The text should only include digits.
The function return value is zero if the conversion is successful.
 ID = 3437
From_text(Text text, Integer64 &value,Text format)
Name
Integer From_text(Text text, Integer64 &value,Text format)
Description
Convert the Text text to a 64 bit Integer value using the Text format as a C++ format string.
The function return value is zero if the conversion is successful.
Warning
The user is responsible for ensuring that the format string is sensible.
 ID = 3438
From_text(Text text, Real &value)
Text

Name
Integer From_text(Text text, Real &value)
Description
Convert the Text text to a Real value.
The function return value is zero if the conversion is successful.
ID = 31
Parse_real_expression(Text input,Real &output)
Name
Integer Parse_real_expression(Text input,Real &output)
Description
Parse the Text input to a Real output. Valid text input can be any expression accepted by 
Real_Box.
The function return value is zero if the conversion is successful.
ID = 7754
From_text(Text text, Real &value,Text format)
Name
Integer From_text(Text text, Real &value,Text format)
Description
Convert the Text text to a Real value using the Text format as a C++ format string.
The function return value is zero if the conversion is successful.
Warning
The user is responsible for ensuring that the format string is sensible.
ID = 388
From_text(Text text, Guid &value)
Name
Integer From_text(Text text, Guid &value)
Description
Convert the Text text to a Guid value.
The function return value is zero if the conversion is successful.
ID = 3440
From_text(Text text, Attribute_Blob &value)
Name
Integer From_text(Text text, Attribute_Blob &value)
Description
Convert the Text text to an Attribute_Blob value.
The function return value is zero if the conversion is successful.
Text
ID = 3442
From_text(Text text,Text &value,Text format)
Name
Integer From_text(Text text,Text &value,Text format)
Description
Convert the Text text to a Text value using the Text format as a C++ format.
The function return value is zero if the conversion is successful.
Warning
The user is responsible for ensuring that the format string is sensible.
ID = 392
From_text(Text text,Dynamic_Text &dtext)
Name
Integer From_text(Text text,Dynamic_Text &dtext)
Description
Break the Text text into separate words (tokens) and add the individual words to the Dynamic_Text 
dtext.
Free format is used to break text up individual words EXCEPT for characters between matching 
double quotes ".
Hence any characters (including blanks) between matching double quotes are considered to be one 
word, and one or more spaces are the separators between individual words.
For example, in
This   is "an example"
there are three words - "This", "is", and "an example".
Note that there is more than one space between "This" and "is" but they are ignored and taken to be 
only one space.
The function return value is the number of words returned in dtext.
ID = 377
From_text(Text text,Integer delimiter,Integer separator,Dynamic_Text &text) 
Name
Integer From_text(Text text,Integer delimiter,Integer separator,Dynamic_Text &text) 
Description
Break the Text text into separate words (tokens) and add the individual words to the Dynamic_Text 
dtext.
The character used to break up the text into individual words is given by the Integer separator.
Any characters between matching the character given by the Integer delimiter (including any 
characters equal to separator) are considered to be one word.
For example, if the delimiter is double quotes " and the separator is a semi-colon ; then
This;is;"an;example"
Text

has three words - "this", "is", and "an;example".
Note: delimiter and separator are Integers and can be specified by the actual number of a 
character or by giving the actual character between single quotes.
For example, 
   separator = 32               is the number for a space
  separator = ’ ’                 is the number for a space
  separator = ’a’                will be the number for the letter a
  separator = ’\t’                will be the number for a tab
The function return value is the number of words returned in dtext.
 ID = 2105
From_text(Text input_string,Text separators,Integer quote,Integer 
honour_all_separators,Integer concat_after_n_words,Integer 
&output_count,Dynamic_Text &output_words,Text &error_message) 
Name
Integer From_text(Text input_string,Text separators,Integer quote,Integer honour_all_separators,Integer 
concat_after_n_words,Integer &output_count,Dynamic_Text &output_words,Text &error_message)
Description
Break the Text input_string into separate words (tokens) and add the individual words to the 
Dynamic_Text output_words, the number of individual words is returned in output_count.
The character used to break up the text into individual words is given by any characters in 
separators.
Any characters between matching the character given by the Integer quote (including any 
characters in separators) are considered to be one word.
For example, if the quote is double quotes " and the separators is a semi-colon ; then
This;is;"an;example"
has three words - "this", "is", and "an;example".
Note: quote is an Integer and can be specified as the number for the character or the character 
enclosed in single quotes.
For example, 
   quote = 32               is the number for a space
  quote = ’ ’                 is the number for a space
  quote = ’a’                will be the number for the letter a
  quote = ’\t’                will be the number for a tab
honour_all_separators is for the case when there are multiple separator characters next to one 
another.
For example to parse this comma separated string as 5 words set honour_all_separators to 1: 
1,2,,3,4
and to parse this whitespaced string as 4 characters set honour_all_separators as 0: 1 2 3 4
It is possible to split just a portion of the string into words, to do this set concat_after_n_words to a 
non zero value, once the number of words has been reached the rest of the string will have the 
separators and delimiters removed and all set to the next word.
If an error has occurred then an error message will be returned in error_message, for example:
Text
"String is empty!" the string had no data
"Unmatched quote in input!" the string contained a starting quote but no terminating quote before 
the end of the string, for example 123.0, 456.1, "PM45653
"Unexpected quote in middle of word! pos:" indicates the position in the string where a quote follows 
a non separator character, for example 123.0,32",45.0
A function return value of zero indicates that output_count and output_words were successfully 
returned.
 ID = 7827
To_text(Integer value)
Name
Text To_text(Integer value)
Description
Convert the Integer value to text.
The function return value is the converted value.
ID = 32
To_text(Integer value,Text format)
Name
Text To_text(Integer value,Text format)
Description
Convert the Integer value to text using the Text format as a C++ format string.
The function return value is the converted value.
Warning
The user is responsible for ensuring that the format string is sensible, invalid format might crash 
12D Model.
 ID = 385
To_text(Real value,Integer no_dec)
Name
Text To_text(Real value,Integer no_dec)
Description
Convert the Real value to text with no_dec decimal places.
If the Integer argument no_dec is missing, the number of decimal places defaults to zero.
The function return value is the converted value.
ID = 33
To_text(Real value,Text format)
Name
Text To_text(Real value,Text format)
Text

Description
Convert the Real value to text using the Text format as a C++ format string.
The function return value is the converted value.
Warning
The user is responsible for ensuring that the format string is sensible, invalid format might crash 12D 
Model.
ID = 386
Real_to_text(Real value,Integer precision)
Name
Text Real_to_text(Real value,Integer precision)
Description
Convert the Real value to text with precision decimal places.
A positive precision indicates keeping all the trailing zero.
A nagative precision indicates dropping the trailing zero..
For example 
Real_to_text(1.23,  5) ---> "1.23000"
Real_to_text(1.23, -5) ---> "1.23"
The function return value is the converted value.
ID = 7828
To_text(Real value)
Name
Text To_text(Real value)
Description
Convert the Real value to text after truncated to nearest Integer.
The function return value is the converted value.
ID = 3560
To_text(Text text,Text format)
Name
Text To_text(Text text,Text format)
Description
Convert the Text text to text using the Text format as a C++ format string.
The function return value is the converted value.
Warning
The user is responsible for ensuring that the format string is sensible, invalid format might crash 12D 
Model.
ID = 391
Text
To_text(Guid value)
Name
Text To_text(Guid value)
Description
Convert the Guid value to text.
The function return value is the converted value.
ID = 3439
To_text(Attribute_Blob value)
Name
Text To_text(Attribute_Blob value)
Description
Convert the Attribute_Blob value to text.
The function return value is the converted value.
ID = 3441
Get_char(Text t,Integer pos,Integer &c)
Name
Integer Get_char(Text t,Integer pos,Integer &c)
Description
Get a character from Text t. The position of the character is pos.
The character is returned in the Integer c.
The function return value of zero indicates the character returned successfully.
 ID = 829
Set_char(Text &t,Integer n,Integer c)
Name
Integer Set_char(Text &t,Integer n,Integer c)
Description
Set the nth position (where position starts at 1 for the first character) in the Text t to the character 
given by integer c. Note that ’c’ can be used to specify the number corresponding to the letter c.
A function return value of zero indicates the Text character is successfully set.
ID = 830
To_text(Integer64 value)
Name
Text To_text(Integer64 value)
Description
Convert the 64 bit Integer value to text.
Text

The function return value is the converted value.
ID = 3435
To_text(Integer64 value,Text format)
Name
Text To_text(Integer64 value,Text format)
Description
Convert the 64 bit Integer value to text using the Text format as a C++ format string.
The function return value is the converted value.
Warning
The user is responsible for ensuring that the format string is sensible, invalid format might crash 12D 
Model.
 ID = 3436