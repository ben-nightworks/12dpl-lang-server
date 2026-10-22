> Source: *12d Model Macro Programming Manual* — Section 5.19 (pages 200–211)

# 12dPL Dynamic Arrays

Functions for all dynamic array types: `Dynamic_Element`, `Dynamic_Text`, `Dynamic_Real`, `Dynamic_Integer`, `Dynamic_Integer64`.

## Contents
- 5.19.1 Dynamic_Element
- 5.19.2 Dynamic_Text
- 5.19.3 Dynamic_Real
- 5.19.4 Dynamic_Integer
- 5.19.5 Dynamic_Integer64

---

Page 199
Dynamic Arrays
5.19 Dynamic Arrays
The 12dPL Dynamic Arrays are used to hold one or more items. That is, a Dynamic Arrays contains 
an arbitrary number of items.
The items in a Dynamic Array are accessed by their unique number position number in the Dynamic 
Array.
As for fixed arrays, the Dynamic Array positions go from one to the number of items in the Dynamic 
Array. However, unlike fixed arrays, extra items can be added to a Dynamic Array at any time.
Hence a 12dPL Dynamic Array can be thought of as a dynamic array of items.
The types of Dynamic Arrays are Dynamic_Element, Dynamic_Text, Dynamic_Real, 
Dynamic_Integer and Dynamic_Integer64
For more information on
Dynamic_Element,       go to 5.19.1 Dynamic Element Arrays.
Dynamic_Text,            go to 5.19.2 Dynamic Text Arrays.
Dynamic_Real,            go to 5.19.3 Dynamic Real Arrays.
Dynamic_Integer,         go to 5.19.4 Dynamic Integer Arrays.
Dynamic_Integer64, go to 5.19.5 Dynamic 64 bits Integer Arrays
Dynamic Arrays

5.19.1 Dynamic Element Arrays
The 12dPL variable type Dynamic_Element is used to hold one or more Elements. That is, a 
Dynamic_Element contains an arbitrary number of Elements.
The Elements in a Dynamic_Element are accessed by their unique number position number in the 
Dynamic_Element.
As for fixed arrays, the Dynamic_Element positions go from one to the number of Elements in the 
Dynamic_Element. However, unlike fixed arrays, extra Elements can be added to a 
Dynamic_Element at any time.
Hence a 12dPL Dynamic_Element can be thought of as a dynamic array of Elements.
The following functions are used to access and modify Elements in a Dynamic_Element.
Append(Dynamic_Element from_de,Dynamic_Element &to_de)
Name
Integer Append(Dynamic_Element from_de,Dynamic_Element &to_de)
Description
Append the items of the Dynamic_Element from_de to the Dynamic_Element to_de.
A function return value of zero indicates the append was successful.
Note 1: Because 12dPL has automatic variable type promotions from Element to 
Dynamic_Element, the function can be used as
Integer Append(Element from,Dynamic_Element &to_de);
Note 2: this Append only act on as the pointer level of the elements, e.g. no new elements being 
created nor copied.
ID = 220
Null(Dynamic_Element &delt)
Name
Integer Null(Dynamic_Element &delt)
Description
Removes and nulls all the Elements from the Dynamic_Element delt and sets the number of items 
to zero.
A function return value of zero indicates that delt was successfully nulled.
ID = 127
Get_number_of_items(Dynamic_Element &delt,Integer &no_items)
Name
Integer Get_number_of_items(Dynamic_Element &delt,Integer &no_items)
Description
Get the number of Elements currently in the Dynamic_Element delt.
The number of Elements is returned in Integer no_items.
A function return value of zero indicates the number of Elements was returned successfully.
ID = 128 
Dynamic Arrays
Get_item(Dynamic_Element &delt,Integer i,Element &elt)
Name
Integer Get_item(Dynamic_Element &delt,Integer i,Element &elt)
Description
Get the ith Element from the Dynamic_Element delt.
The Element is returned in elt.
A function return value of zero indicates the ith Element was returned successfully.
ID = 129
Set_item(Dynamic_Element &delt,Integer i,Element elt)
Name
Integer Set_item(Dynamic_Element &delt,Integer i,Element elt)
Description
Set the ith Element in the Dynamic_Element delt to the Element elt.
If the position i is greater or equal to the total number of Elements in the Dynamic_Element, then the 
Dynamic_Element will automatically be extended so that the number of Elements is i. Any extra 
Elements that are added will be set to null.
A function return value of zero indicates the Element was successfully set.
ID = 130
Null_item(Dynamic_Element &delt,Integer i)
Name
Integer Null_item(Dynamic_Element &delt,Integer i)
Description
Set the ith Element to null.
A function return value of zero indicates the Element was successfully set to null.
ID = 131
Dynamic Arrays

5.19.2 Dynamic Text Arrays
The 12dPL variable type Dynamic_Text is used to hold one or more Texts. That is, a Dynamic_Text 
contains an arbitrary number of Texts.
The Texts in a Dynamic_Text are accessed by their unique number position number in the 
Dynamic_Text.
As for fixed arrays, the Dynamic_Text positions go from one to the total number of items in the 
Dynamic_Text. However, unlike fixed arrays, extra Text can be added to a Dynamic_Text at any 
time.
Hence a 12dPL Dynamic_Text can be thought of as a dynamic array of Texts.
The following functions are used to access and modify Dynamic_Text’s.
Append(Text text,Dynamic_Text &dt)
Name
Integer Append(Text text,Dynamic_Text &dt)
Description
Append the Text text to the end of the contents of the Dynamic_Text dt. This will increase the size of 
the Dynamic_Text by one.
A function return value of zero indicates the append was successful.
ID = 434
Append(Dynamic_Text from_dt,Dynamic_Text &to_dt)
Name
Integer Append(Dynamic_Text from_dt,Dynamic_Text &to_dt)
Description
Append the contents of the Dynamic_Text from_dt to the Dynamic_Text to_dt.
A function return value of zero indicates the append was successful.
ID = 230
Null(Dynamic_Text &dt)
Name
Integer Null(Dynamic_Text &dt)
Description
Removes and deletes all the Texts from the Dynamic_Text dt and sets the number of items to zero.
A function return value of zero indicates that dt was successfully nulled.
ID = 226
Get_number_of_items(Dynamic_Text &dt,Integer &no_items)
Name
Integer Get_number_of_items(Dynamic_Text &dt,Integer &no_items)
Description
Get the number of Texts currently in the Dynamic_Text dt.
Dynamic Arrays
The number of Texts is returned by Integer no_items.
A function return value of zero indicates the number of Texts was successfully returned.
ID = 227
Get_item(Dynamic_Text &dt,Integer i,Text &text)
Name
Integer Get_item(Dynamic_Text &dt,Integer i,Text &text)
Description
Get the ith Text from the Dynamic_Text dt.
The Text is returned by text.
A function return value of zero indicates the ith Text was returned successfully.
ID = 228
Set_item(Dynamic_Text &dt,Integer i,Text text)
Name
Integer Set_item(Dynamic_Text &dt,Integer i,Text text)
Description
Set the ith Text in the Dynamic_Text dt to the Text text.
A function return value of zero indicates success.
ID = 229
Get_all_linestyles(Dynamic_Text &linestyles)
Name
Integer Get_all_linestyles(Dynamic_Text &linestyles)
Description
Get all linestyle names defined in the Linestyles pop-up for the current project, 
and return the list in the Dynamic_Text linestyles.
A function return value of zero indicates the linestyle names were returned successfully.
ID = 688
Get_all_textstyles(Dynamic_Text &textstyles)
Name
Integer Get_all_textstyles(Dynamic_Text &textstyles)
Description
Get all textstyle names defined in the Textstyles pop-up for the current project, 
and return the list in the Dynamic_Text textstyles.
A function return value of zero indicates the textstyle names are returned successfully.
ID = 689
Dynamic Arrays

Get_all_symbols(Dynamic_Text &symbols) 
Name
Integer Get_all_symbols(Dynamic_Text &symbols) 
Description
Get all symbol names defined in the Symbols pop-up for the current project, and return the list in the 
Dynamic_Text symbols.
A function return value of zero indicates the symbol names were returned successfully.
ID = 1724
Get_all_patterns(Dynamic_Text &patterns) 
Name
Integer Get_all_patterns(Dynamic_Text &patterns) 
Description
Get all pattern names defined in the Patterns pop-up for the current project, and return the list in the 
Dynamic_Text patterns.
A function return value of zero indicates the function was successful.
ID = 1725
Dynamic Arrays
5.19.3 Dynamic Real Arrays
The 12dPL variable type Dynamic_Real is used to hold one or more Reals. That is, a Dynamic_Real 
contains an arbitrary number of Reals.
The Reals in a Dynamic_Real are accessed by their unique number position number in the 
Dynamic_Real.
As for fixed arrays, the Dynamic_Real positions go from one to the total number of items in the 
Dynamic_Real. However, unlike fixed arrays, extra Reals can be added to a Dynamic_Real at any 
time.
Hence a 12dPL Dynamic_Real can be thought of as a dynamic array of Reals.
The following functions are used to access and modify Dynamic_Real’s.
Append(Real value,Dynamic_Real &real_list) 
Name
Integer Append(Real value,Dynamic_Real &real_list) 
Description
Append the Real value to the end of the contents of the Dynamic_Real real_list. This will increase 
the size of the Dynamic_Real by one.
A function return value of zero indicates the append was successful.
ID = 1795
Append(Dynamic_Real from_dr,Dynamic_Real &to_dr) 
Name
Integer Append(Dynamic_Real from_dr,Dynamic_Real &to_dr) 
Description
Append the contents of the Dynamic_Real from_dr to the Dynamic_Real to_dr.
A function return value of zero indicates the append was successful.
ID = 1794
Null(Dynamic_Real &real_list) 
Name
Integer Null(Dynamic_Real &real_list) 
Description
Removes all the Reals from the Dynamic_Real real_list and sets the number of items to zero.
A function return value of zero indicates that real_list was successfully nulled.
ID = 1790
Get_number_of_items(Dynamic_Real &real_list,Integer &no_items)
Name
Integer Get_number_of_items(Dynamic_Real &real_list,Integer &no_items) 
Description
Get the number of Reals currently in the Dynamic_Real real_list.
Dynamic Arrays

The number of Reals is returned in Integer no_items.
A function return value of zero indicates the number of Reals was returned successfully.
ID = 1791
Set_item(Dynamic_Real &real_list,Integer i,Real value) 
Name
Integer Set_item(Dynamic_Real &real_list,Integer i,Real value) 
Description
Set the ith Real in the Dynamic_Real real_list to the Real value.
If the position i is greater or equal to the total number of Real in the Dynamic_Real, then the 
Dynamic_Real will automatically be extended so that the number of Reals is i. Any extra Real 
values that are added will be not be set, e.g. may contain any random Real number.
A function return value of zero indicates the Real was successfully set.
ID = 1793
Get_item(Dynamic_Real &real_list,Integer i,Real &value)
Name
Integer Get_item(Dynamic_Real &real_list,Integer index,Real &value) 
Description
Get the i’th Real from the Dynamic_Real real_list.
The Real is returned in value.
A function return value of zero indicates the i’th Real was returned successfully.
ID = 1792
Dynamic Arrays
5.19.4 Dynamic Integer Arrays
The 12dPL variable type Dynamic_Integer is used to hold one or more Integers. That is, a 
Dynamic_Integer contains an arbitrary number of Integers.
The Integers in a Dynamic_Integer are accessed by their unique number position number in the 
Dynamic_Integer.
As for fixed arrays, the Dynamic_Integer positions go from one to the total number of items in the 
Dynamic_Integer. However, unlike fixed arrays, extra Integers can be added to a Dynamic_Integer 
at any time.
Hence a 12dPL Dynamic_Integer can be thought of as a dynamic array of Integers.
The following functions are used to access and modify Dynamic_Integer’s.
Append(Integer value,Dynamic_Integer &integer_list)
Name
Integer Append(Integer value,Dynamic_Integer &integer_list) 
Description
Append the Integer value to the end of the contents of the Dynamic_Integer integer_list. This will 
increase the size of the Dynamic_Integer by one.
A function return value of zero indicates the append was successful.
 ID = 1785
Append(Dynamic_Integer from_di,Dynamic_Integer &to_di) 
Name
Integer Append(Dynamic_Integer from_di,Dynamic_Integer &to_di) 
Description
Append the contents of the Dynamic_Integer from_di to the Dynamic_Integer to_di.
A function return value of zero indicates the append was successful.
ID = 1784
Null(Dynamic_Integer &integer_list) 
Name
Integer Null(Dynamic_Integer &integer_list) 
Description
Removes all the Integers from the Dynamic_Integer integer_list and sets the number of items to 
zero.
A function return value of zero indicates that integer_list was successfully nulled.
ID = 1780
Get_number_of_items(Dynamic_Integer &integer_list,Integer &count) 
Name
Integer Get_number_of_items(Dynamic_Integer &integer_list,Integer &count) 
Description
Dynamic Arrays

Get the number of Integers currently in the Dynamic_Integer integer_list.
The number of Integers is returned in Integer no_items.
A function return value of zero indicates the number of Integers was returned successfully.
ID = 1781
Set_item(Dynamic_Integer &integer_list,Integer i,Integer value) 
Name
Integer Set_item(Dynamic_Integer &integer_list,Integer i,Integer value) 
Description
Set the ith Integer in the Dynamic_Integer integer_list to the Integer value.
If the position i is greater or equal the total number of Integer in the Dynamic_Integer, then the 
Dynamic_Integer will automatically be extended so that the number of Integers is i. Any extra 
Integer values that are added will be not be set, e.g. may contain any random Integer number.
A function return value of zero indicates the Integer was successfully set.
ID = 1783
Get_item(Dynamic_Integer &integer_list,Integer i,Integer &value) 
Name
Integer Get_item(Dynamic_Integer &integer_list,Integer i,Integer &value) 
Description
Get the i’th Integer from the Dynamic_Integer integer_list.
The Integer is returned in value.
A function return value of zero indicates the i’th Integer was returned successfully.
ID = 1782
Dynamic Arrays
5.19.5 Dynamic 64 bits Integer Arrays
The 12dPL variable type Dynamic_Integer64 is used to hold one or more 64 bits Integers. That is, a 
Dynamic_Integer64 contains an arbitrary number of 64 bits Integers.
The Integers in a Dynamic_Integer64 are accessed by their unique number position number in the 
Dynamic_Integer64.
As for fixed arrays, the Dynamic_Integer64 positions go from one to the total number of items in the 
Dynamic_Integer64. However, unlike fixed arrays, extra Integers can be added to a 
Dynamic_Integer64 at any time.
Hence a 12dPL Dynamic_Integer64 can be thought of as a dynamic array of 64 bits Integers.
The following functions are used to access and modify Dynamic_Integer64’s.
Append(Integer64 value,Dynamic_Integer64 &integer_list)
Name
Integer Append(Integer64 value,Dynamic_Integer64 &integer_list) 
Description
Append the Integer64 value to the end of the contents of the Dynamic_Integer64 integer_list. This 
will increase the size of the Dynamic_Integer64 by one.
A function return value of zero indicates the append was successful.
 ID = 8010
Append(Dynamic_Integer64 from_di,Dynamic_Integer64 &to_di) 
Name
Integer Append(Dynamic_Integer64 from_di,Dynamic_Integer64 &to_di) 
Description
Append the contents of the Dynamic_Integer64 from_di to the Dynamic_Integer64 to_di.
A function return value of zero indicates the append was successful.
ID = 8009
Null(Dynamic_Integer64 &integer_list) 
Name
Integer Null(Dynamic_Integer64 &integer_list) 
Description
Removes all the Integers from the Dynamic_Integer64 integer_list and sets the number of items to 
zero.
A function return value of zero indicates that integer_list was successfully nulled.
ID = 8005
Get_number_of_items(Dynamic_Integer64 &integer_list,Integer &count) 
Name
Integer Get_number_of_items(Dynamic_Integer64 &integer_list,Integer &count) 
Description
Dynamic Arrays

Get the number of Integers currently in the Dynamic_Integer64 integer_list.
The number of Integer64s is returned in Integer no_items.
A function return value of zero indicates the number of Integers was returned successfully.
ID = 8006
Set_item(Dynamic_Integer64 &integer_list,Integer i,Integer64 value) 
Name
Integer Set_item(Dynamic_Integer64 &integer_list,Integer i,Integer64 value) 
Description
Set the ith Integer64 in the Dynamic_Integer64 integer_list to the Integer64 value.
If the position i is greater or equal the total number of Integer in the Dynamic_Integer64, then the 
Dynamic_Integer64 will automatically be extended so that the number of Integer64s is i. Any extra 
Integer64 values that are added will be not be set, e.g. may contain any random Integer64 number.
A function return value of zero indicates the Integer64 was successfully set.
ID = 8008
Get_item(Dynamic_Integer64 &integer_list,Integer i,Integer64 &value) 
Name
Integer Get_item(Dynamic_Integer64 &integer_list,Integer i,Integer64 &value) 
Description
Get the i’th Integer from the Dynamic_Integer64 integer_list.
The Integer64 is returned in value.
A function return value of zero indicates the i’th Integer64 was returned successfully.
ID = 8007