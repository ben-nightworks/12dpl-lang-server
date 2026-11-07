> Source: *12d Model Macro Programming Manual* — Sections 5.10–5.27 (pages 114–258)

# 12dPL Maths, Vectors and Geometry

Mathematical functions, random numbers, vectors and matrices, triangles, and all geometric construction types (Points, Lines, Arcs, Spirals, Parabolas, Segments, Curves, Segment Geometry).

## Contents
- 5.10 Maths
- 5.11 Containers (Integer_Set, Text_Set, etc.)
- 5.12 Random Numbers
- 5.13 Vectors and Matrices (Vector2, Vector3, Vector4, Matrix3, Matrix4)
- 5.14 Triangles
- 5.20 Points
- 5.21 Lines
- 5.22 Arcs
- 5.23 Spirals and Transitions
- 5.24 Parabolas
- 5.25 Segments
- 5.26 Curve
- 5.27 Segment Geometry

---

Page 113
Maths
5.10 Maths
Most of the standard C++ mathematical functions are supported in 12dPL.
The angles for the trigonometric functions are expressed in radians
Real Sin(Real x)                       sine of x
ID = 1
Real Cos(Real x)                      cosine of x
ID = 2
Real Tan(Real x)                       tangent of x
ID = 3
Real Asin(Real x)                      arcsine(x) in range [-pi/2,pi/2],  -1<= x <= 1
ID = 5
Real Acos(Real x)                     arccosine(x) in range [0,pi],  -1<= x <= 1
ID = 4
Real Atan(Real x)                      arctan(x) in range [-pi/2,pi/2]
ID = 6
Real Atan2(Real y, Real x)        Arctan(y/x) in range [-pi,pi]
ID = 7
Real Sinh(Real x)                      hyperbolic sine of x
ID = 8
Real Cosh(Real x)                     hyperbolic cosine of x
ID = 9
Real Tanh(Real x)                      hyperbolic tangent of x
ID = 10
Real Exp(Real x)                        exponential function
ID = 11
Real Log(Real x)                        natural logarithm ln(x), x > 0
ID = 12
Real Log10(Real x)                    base 10 logarithm log(x), x> 0
ID = 13
Real Pow(Real x, Real y)           x raised to the power y.A domain error occurs if
                                                              x=0 and y<=0, or if x<0 and y is not an integer.
ID = 14
Real Sqrt(Real x)                       square root of x, x >= 0
ID = 15
Real Ceil(Real x)                       smallest integer not less than x, as a Real
ID = 16
Real Floor(Real x)                     largest integer not greater than x, as a Real
ID = 17
Real Absolute(Real x)               absolute value of x
Maths

ID = 18
Integer Absolute(Integer i)              absolute value of x
ID = 330
Real Ldexp(Real x,Integer n)          x*(2 to the power n)
ID = 19
Real Mod(Real x, Real y)               Real remainder of x/y with the same sign as x.
                                                                         If y is zero, the result is implementation defined
ID = 20
Fuzzy logic comparision are acting on two Real numbers; in most cases fuzzy logic comparision are 
the same as normal mathemtical comparision, but when the two input numbers are close enough 
within a given tolerance, fuzzy logic will consider as the two number equal. 
For the calls 3951-3962 are for comparing two number x and y; the result of the comparision (return 
value) can be either 1 meaning true or 0 meaning false.
The builtin default tolerance in 12D is 0.000001 (ten power minus six) are use for the calls 3951-
3956; and the user can specify the tolerance (Real tol) in the call 3957-3962.
Integer Xeqy(Real x,Real y)                           equal comparision
the abolute value of the different between x and y is less than the default tolerance
ID = 3951
Integer Xley(Real x,Real y)                           less than or equal comparision
x is less than y or the abolute value of the different between x and y is less than the default tolerance
ID = 3952
Integer Xlty(Real x,Real y)                           less than comparision
x is less than y by at least the default tolerance
ID = 3953
Integer Xgey(Real x,Real y)                           greater than or equal comparision
x is greater than y or the abolute value of the different between x and y is less than the default 
tolerance
ID = 3954
Integer Xgty(Real x,Real y)                           greater than comparision
x is greater than y by at least the default tolerance
ID = 3955
Integer Xney(Real x,Real y)                           not equal comparision
x and y are differed by at least the default tolerance
ID = 3956
Integer Xeqy(Real x,Real y,Real tol)                           equal comparision
Maths
the abolute value of the different between x and y is less than the given tolerance
ID = 3957
Integer Xley(Real x,Real y,Real tol)                           less than or equal comparision
x is less than y or the abolute value of the different between x and y is less than the given tolerance
ID = 3958
Integer Xlty(Real x,Real y,Real tol)                           less than comparision
x is less than y by at least the given tolerance
ID = 3959
Integer Xgey(Real x,Real y,Real tol)                           greater than or equal comparision
x is greater than y or the abolute value of the different between x and y is less than the given 
tolerance
ID = 3960
Integer Xgty(Real x,Real y,Real tol)                           greater than comparision
x is greater than y by at least the given tolerance
ID = 3961
Integer Xney(Real x,Real y,Real tol)                           not equal comparision
x and y are differed by at least the given tolerance
ID = 3962
Containers

5.11 Containers
Containers in 12d programming language are a thin wrapper on top of C++ containers.
Only Associative container support has been added.
Assoicative containers are grouped into 4 types
Set;
Map;
Multiset;
Multimap
Detailed information can be found at
https://docs.microsoft.com/en-us/cpp/standard-library/stl-containers?view=msvc-170
https://www.cplusplus.com/reference/stl/
https://en.cppreference.com/w/cpp/container
Note, only the 4 associative container types are supported.
Now any attempt to document close to 3000 calls by brute force is doomed to failure.
So we will document all thes calls by groups/classification.
So we need to get some terms and definitions out of the way.
Skipping this prerequest information will just lead to confusion later on.
Set
A set is just an ascending container of unique elements—the value is also the key.
Set only allow one instance of a key or element to be inserted into the container. If multiple instances 
of elements are required, use multiset. 
Set is used to store and retrieve data from a collection. The values of the elements in the set are 
unique and serve as the key values according to which the data is automatically ordered.
The value of an element in a set may not be changed directly. Instead, you must delete old values 
and insert elements with new values.
Map
A map, sometimes referred to as a dictionary, consists of a key/value pair. The key is used to order 
the sequence, and the value is associated with that key. For example, a map might contain keys that 
represent every unique word in a text and corresponding values that represent the number of times 
that each word appears in the text
Map only allow one instance of a key or element to be inserted into the container. If multiple 
instances of elements are required, use multimap.
Multiset
Multiset is used for the storage and retrieval of data from a collection in which the values of the 
elements contained need not be unique and in which they serve as the key values according to 
which the data is automatically ordered. The key value of an element in a multiset may not be 
changed directly. Instead, old values must be deleted and elements with new values inserted.
Containers
Multimap
Multimap is used for the storage and retrieval of data from a collection in which each element is a 
pair that has both a data value and a sort key. The value of the key doesn't need to be unique and is 
used to order the data automatically. The value of an element in a multimap, but not its associated 
key value, may be changed directly. Instead, key values associated with old elements must be 
deleted and new key values associated with new elements inserted.
Additionally since C++ implements containers via something call templates, there can be an infinite 
number of unique container types.
This is not possible in the 12d programming language, thus only a number of predefined containers 
exist
Set and Multiset containers support the 10 key types of
Integer
Integer64
Real
Text
Point
Guid
Uid
Vector2
Vector3
Vector4
Map and Multimap containers support the 9 key types of (almost the same list as Set - but less the 
Point type)
Integer
Integer64
Real
Text
Guid
Uid
Vector2
Vector3
Vector4
and the same list of those 9 value types. 
thus 81 unique Map types exist. For example the type
Text_Real_Map
is one such unique map type
Comparing and ordering of the keys:
For Integer and Integer64 types; the order is the nature numerical numbering.
Containers

For Text type; the order is the Microsoft standard case sensitive text ordering.
For Guid and Uid types; the order is the Microsoft standard ordering.
For Real type; the order using fuzzy logic with the tolerance of 10 power -6; same as function xeqy; 
xgty; xlty 
For Point, Vector2, Vector3, Vector4 type, the order also using the same fuzzy logic as Real with the 
smaller index being more significant in the comparision - and for Point, x-coordinate is considered 
before y-coordinate and y-coordinate is considered before z-coordinate.
With two points Point p1(x1,y1,z1) and p2(x2,y2,z2): p1 and p2 are the same if and only if 
xeqy(x1,x2) xeqy(y1,y2) xeqy(z1,z2) are all TRUE (1).
if xgty(x1,x2) is TRUE then p1 is greater than p2
if xeqy(x1,x2) is TRUE and xgty(y1,y2) is TRUE then p1 is greater than p2
if xeqy(x1,x2) is TRUE and xeqy(y1,y2) is TRUE and xgty(z1,z2) is TRUE then p1 is greater than p2
Similar comparision rules is applied for less than; and types Vector2, Vector3, Vector4.
Classifing groups of calls
For this part of the documentation, where you set the word Container,
you can replace it with the 
  10 Set types
  10 Multiset types
  81 Map types
  81 Multimap types
  182 container types in total
  Example replacments could be
 Text_Set
 Real_Multiset
 Guid_Integer64_Map
 Vector3_Text_Multimap
We also define the following terms
  Key_Type
with the possible values of
 Integer
 Integer64
 Real
 Text
 Point
 Guid
Containers
 Uid
 Vector2
 Vector3
 Vector4
Value_Type
 with the possible values of
 Integer
 Integer64
 Real
 Text
 Point
 Guid
 Uid
 Vector2
 Vector3
 Vector4
  Note, not all Key_Type / Value_Type combinations are supported
5.11.1 Container Range
Range is an integer number which is an equivalent of the C++ container iterator.
C++ container iterators are difficult to work with, way to easy to get wrong, resulting in a C++ 
program crashing.
Since the 12d programming language aims to prevent / reduce the possible ways to crash 12d, 
these integer range numbers are a way to offer multiple iterators on a container, crash proof, but still 
have the same functionality as C++ container iterators
Ranges will fully explained later on. For now just accept them.
For all containers, a common set of functions exist, regardless of the Key_Type. These are
Integer Container_size (Container &container,Integer &value);
Integer Container_size (Container &container,Integer64  &value);
Integer Container_range_begin (Container &container,Integer &range);
Integer Container_range_next  (Container &container,Integer range);
Integer Container_range_begun (Container &container,Integer range);
Integer Container_range_ended (Container &container,Integer range);
Integer Container_range_valid (Container &container,Integer range);
Integer Container_clear (Container &container);
Integer Container_range_create(Container &container,Integer &range);
Integer Container_range_remove(Container &container,Integer &range);
Containers

For all containers, a common set of functions exist, including the Key_Type. These are
Integer Container_range_find  (Container &container,Integer &range,Key_Type key);
Integer Container_get_key (Container &container,Integer range,Key_Type &key);
For all Set and Multiset container types, a subset of calls exist. These are
Integer Container_insert_key (Container &container,Key_Type key  );
For all Map and Multimap container types, a subset of calls exist. These are
Integer Container_insert_key (Container &container,Key_Type key,Value_Type value);
Integer Container_get_value  (Container &container,Integer range,Value_Type &value);
Integer Container_set_value  (Container &container,Integer range,Value_Type &value);
For all Multiset and Multimap container types, a subset of calls exist. These are
Integer Container_equal_range(Container &container,Integer range,Integer &equal_range);
namespace Macro_Containers {
  enum class Error {
 Success = 0,
 Duplicate = 1,
 Bool_False = 0,
 Bool_True = 1,
 Handle_Invalid =  -1,
 Range_Stopped = 1,
 Range_Not_Started = -10,
 Range_Invalid = -11,
 Range_Empty = -12,
 Range_Corrupt = -14,
 Range_Exists =  -4,
 Range_Not_Created =  -3,
 Range_Not_Removed =  -2,
Containers
 Equal_Range_Not_Created =  -20,
 Equal_Range_Invalid =  -21,
  };
};
Common return values for all functions
 Success
0 success
Handle_Invalid
-1 container not initialised. usually means no items added
insert
 Duplicate
1 key already exists
range_create
Range_Exists
-4 range already created
Handle_Invalid
-1 container not initialised
Range_Not_Created
-3 range cannot be created. usally means all available ranges used 
up - probably due to ranges leaking
range_remove
 Success
0 range removed. if range of -1 passed in, returns 0
Handle_Invalid
-1 container not initialised
Range_Not_Removed
-2 range does not exist
begin
Handle_Invalid
-1 container not initialised
Range_Not_Created
-3 range cannot be added or created - probably due to ranges leaking
Success
0 range has begun
 
Ranges
-----------------------------------------------------
A range is the only way to access or iterate over items in a container. The simplest iteration is
  // a value of -1 means auto generate range number
Containers

  Integer range = -1;
  Integer res = Container_range_begin(container,range);
  while(res == 0) {
 // we are assuming the container is using Text as its key
 Text key;
 res = Container_get_key(container,range,key);
 if(res != 0) break;
 Print(key);  Print();
 res = Container_range_next(container,range);
  }
  // ranges must be removed - otherwise you will run out of them and lead to undefined behavour
  res = Container_range_remove(container,range);
Random Numbers
5.12 Random Numbers
Set_random_number(Integer seed,Integer method) 
Name
void Set_random_number(Integer seed,Integer method) 
Description
Set up the random number generator with the Integer seed, seed (the current time in seconds is a 
good seed).
If method is any value other than 1, the standard c library random number generator is used.
If method is 1, then a far more random seed generator than the standard c library one is used.
Once the random number generator is set with a seed, calling Get_Random_number will return a 
random number.
There is no function return value.
ID = 1900
Get_random_number()
Name
Integer Get_random_number() 
Description
Generate the next random number as an Integer and return it as the function return value.
Note: the random number generator is initially set using Set_random_number.
ID = 1901
Get_random_number_closed() 
Name
Real Get_random_number_closed() 
Description
Generate the next random number as a number between 0 and 1 inclusive, and return it as the 
function return value.
Note: this function is only applicable is the random number generator is initially set using 
Set_random_number with method = 1.
 ID = 1933
Get_random_number_open() 
Name
Real Get_random_number_open() 
Description
Generate the next random number as a number between 0 (included) and 1 (not included), and 
return it as the function return value.
Random Numbers

Note: this function is only applicable is the random number generator is initially set using 
Set_random_number with method = 1.
ID = 1934
Vectors and Matrices
5.13 Vectors and Matrices
Set_vector(Vector2 &vect,Real value) 
Name
Integer Set_vector(Vector2 &vect,Real value) 
Description
Set the two components of the two dimensional vector vect to the same Real value, value.
A function return value of zero indicates the values were successfully set.
ID = 2306
Set_vector(Vector3 &vect,Real value) 
Name
Integer Set_vector(Vector3 &vect,Real value) 
Description
Set the three components of the three dimensional vector vect to the same Real value, value.
A function return value of zero indicates the values were successfully set.
ID = 2307
Set_vector(Vector4 &vect,Real value) 
Name
Integer Set_vector(Vector4 &vect,Real value) 
Description
Set the four components of the four dimensional vector vect to the same Real value, value.
A function return value of zero indicates the values were successfully set.
 ID = 2308
Set_vector(Vector2 &vect,Real x,Real y) 
Name
Integer Set_vector(Vector2 &vect,Real x,Real y) 
Description
Set the first component of the two dimensional vector vect to the value x.
Set the second component of the two dimensional vector vect to the value y.
A function return value of zero indicates the values were successfully set.
ID = 2309
Set_vector(Vector3 &vect,Real x,Real y,Real z) 
Name
Integer Set_vector(Vector3 &vect,Real x,Real y,Real z) 
Vectors and Matrices

Description
Set the first component of the three dimensional vector vect to the value x.
Set the second component of the three dimensional vector vect to the value y.
Set the third component of the three dimensional vector vect to the value z.
A function return value of zero indicates the values were successfully set.
 ID = 2310
Set_vector(Vector4 &vect,Real x,Real y,Real z,Real w) 
Name
Integer Set_vector(Vector4 &vect,Real x,Real y,Real z,Real w) 
Description
Set the first component of the four dimensional vector vect to the value x.
Set the second component of the four dimensional vector vect to the value y.
Set the third component of the four dimensional vector vect to the value z.
Set the fourth component of the four dimensional vector vect to the value w.
A function return value of zero indicates the values were successfully set.
ID = 2311
Get_vector(Vector2 &vect,Real &x,Real &y) 
Name
Integer Get_vector(Vector2 &vect,Real &x,Real &y) 
Description
For the two dimensional vector vect:
   return the first component of vect in x.
   return the second component of vect in y
A function return value of zero indicates the components were successfully returned.
ID = 2312
Get_vector(Vector3 &vect,Real &x,Real &y,Real &z) 
Name
Integer Get_vector(Vector3 &vect,Real &x,Real &y,Real &z) 
Description
For the three dimensional vector vect:
   return the first component of vect in x.
   return the second component of vect in y
   return the third component of vect in z
A function return value of zero indicates the components were successfully returned.
ID = 2313
Get_vector(Vector4 &vect,Real &x,Real &y,Real &z,Real &w) 
Vectors and Matrices
Name
Integer Get_vector(Vector4 &vect,Real &x,Real &y,Real &z,Real &w) 
Description
For the four dimensional vector vect:
   return the first component of vect in x.
   return the second component of vect in y
   return the third component of vect in z
   return the fourth component of vect in w
A function return value of zero indicates the components were successfully returned.
ID = 2314
Set_vector(Vector2 &vect,Integer index,Real value) 
Name
Integer Set_vector(Vector2 &vect,Integer index,Real value) 
Description
Set component number index of the two dimensional vector vect to the value value.
A function return value of zero indicates the component was successfully set.
ID = 2315
Set_vector(Vector3 &vect,Integer index,Real value) 
Name
Integer Set_vector(Vector3 &vect,Integer index,Real value) 
Description
Set component number index of the three dimensional vector vect to the value value.
A function return value of zero indicates the component was successfully set.
ID = 2316
Set_vector(Vector4 &vect,Integer index,Real value) 
Name
Integer Set_vector(Vector4 &vect,Integer index,Real value) 
Description
Set component number index of the four dimensional vector vect to the value value.
A function return value of zero indicates the component was successfully set.
ID = 2317
Get_vector(Vector2 &vect,Integer index,Real &value) 
Name
Integer Get_vector(Vector2 &vect,Integer index,Real &value) 
For the two dimensional vector vect return the component number index in value.
Vectors and Matrices

A function return value of zero indicates the component was successfully returned.
Description
ID = 2318
Get_vector(Vector3 &vect,Integer index,Real &value) 
Name
Integer Get_vector(Vector3 &vect,Integer index,Real &value) 
Description
For the three dimensional vector vect return the component number index in value.
A function return value of zero indicates the component was successfully returned.
ID = 2319
Get_vector(Vector4 &vect,Integer index,Real &value) 
Name
Integer Get_vector(Vector4 &vect,Integer index,Real &value) 
Description
For the four dimensional vector vect return the component number index in value.
A function return value of zero indicates the component was successfully returned.
ID = 2320
Get_vector(Vector2 &vect,Integer index) 
Name
Real Get_vector(Vector2 &vect,Integer index) 
Description
For the two dimensional vector vect, return the component number index as the return value of the 
function.
ID = 2321
Get_vector(Vector3 &vect,Integer index) 
Name
Real Get_vector(Vector3 &vect,Integer index) 
Description
For the three dimensional vector vect, return the component number index as the return value of 
the function.
ID = 2322
Get_vector(Vector4 &vect,Integer index) 
Name
Real Get_vector(Vector4 &vect,Integer index) 
Description
Vectors and Matrices
For the four dimensional vector vect, return the component number index as the return value of the 
function.
 ID = 2323
Get_vector_length(Vector2 &vect,Real &value) 
Name
Integer Get_vector_length(Vector2 &vect,Real &value) 
Description
For the two dimensional vector vect, return the length of the vector in value.
      Note: for V(x,y), length = square root of (x*x + y*y)
A function return value of zero indicates the length was successfully returned.
ID = 2324
Get_vector_length(Vector3 &vect,Real &value) 
Name
Integer Get_vector_length(Vector3 &vect,Real &value) 
Description
For the three dimensional vector vect, return the length of the vector in value.
      Note: for V(x,y,z), length = square root of (x*x + y*y +z*z)
A function return value of zero indicates the length was successfully returned.
ID = 2325
Get_vector_length(Vector4 &vect,Real &value) 
Name
Integer Get_vector_length(Vector4 &vect,Real &value) 
Description
For the four dimensional vector vect, return the length of the vector in value.
      Note: for V(x,y,z,w), length = square root of (x*x + y*y +z*z + w*w)
A function return value of zero indicates the length was successfully returned.
ID = 2326
Get_vector_length(Vector2 &vect) 
Name
Real Get_vector_length(Vector2 &vect) 
Description
Standard vector length and return it as return value
For the two dimensional vector vect, return the length of the vector as the return value of the 
function.
      Note: for V(x,y), length = square root of (x*x + y*y)
ID = 2327
Vectors and Matrices

Get_vector_length(Vector3 &vect) 
Name
Real Get_vector_length(Vector3 &vect) 
Description
For the three dimensional vector vect, return the length of the vector as the return value of the 
function.
      Note: for V(x,y,z), length = square root of (x*x + y*y +z*z)
ID = 2328
Get_vector_length(Vector4 &vect) 
Name
Real Get_vector_length(Vector4 &vect) 
Description
For the four dimensional vector vect, return the length of the vector as the return value of the 
function.
      Note: for V(x,y,z,w), length = square root of (x*x + y*y +z*z + w*w)
ID = 2329
Get_vector_length_squared(Vector2 &vect,Real &value) 
Name
Integer Get_vector_length_squared(Vector2 &vect,Real &value) 
Description
For the two dimensional vector vect, return the square of the length of the vector in value.
      Note: for V(x,y), length squared = x*x + y*y
A function return value of zero indicates the length squared was successfully returned.
ID = 2330
Get_vector_length_squared(Vector3 &vect,Real &value) 
Name
Integer Get_vector_length_squared(Vector3 &vect,Real &value) 
Description
For the three dimensional vector vect, return the square of the length of the vector in value.
      Note: for V(x,y,z), length squared = x*x + y*y + z*z
A function return value of zero indicates the length squared was successfully returned.
ID = 2331
Get_vector_length_squared(Vector4 &vect,Real &value) 
Name
Integer Get_vector_length_squared(Vector4 &vect,Real &value) 
Vectors and Matrices
Description
For the four dimensional vector vect, return the square of the length of the vector in value.
      Note: for V(x,y,z,w), length squared = x*x + y*y + z*z + w*w
A function return value of zero indicates the length squared was successfully returned.
ID = 2332
Get_vector_length_squared(Vector2 &vect) 
Name
Real Get_vector_length_squared(Vector2 &vect) 
Description
For the two dimensional vector vect, return the square of the length of the vector as the function 
return value.
      Note: for V(x,y), length squared = x*x + y*y
ID = 2333
Get_vector_length_squared(Vector3 &vect) 
Name
Real Get_vector_length_squared(Vector3 &vect) 
Description
For the three dimensional vector vect, return the square of the length of the vector as the function 
return value.
      Note: for V(x,y,z), length squared = x*x + y*y + z*z
ID = 2334
Get_vector_length_squared(Vector4 &vect) 
Name
Real Get_vector_length_squared(Vector4 &vect) 
Description
For the four dimensional vector vect, return the square of the length of the vector as the function 
return value.
      Note: for V(x,y,z,w), length squared = x*x + y*y + z*z + w*w
ID = 2335
Get_vector_normalize(Vector2 &vect,Vector2 &normalised) 
Name
Integer Get_vector_normalize(Vector2 &vect,Vector2 &normalised) 
Description
For the two dimensional vector vect, return the normalised vector of vect in the Vector2 
normalised.
      Note: for a normalised vector, length = 1 and for the vector V(x,y), the normalised vector N(a,b) 
is:
Vectors and Matrices

N(a,b) = (x/length(V),y/length(V))
A function return value of zero indicates the normalised vector was successfully returned.
ID = 2336
Get_vector_normalize(Vector3 &vect,Vector3 &normalised) 
Name
Integer Get_vector_normalize(Vector3 &vect,Vector3 &normalised) 
Description
For the three dimensional vector vect, return the normalised vector of vect in the Vector3 
normalised.
      Note: for a normalised vector, length = 1 and for the vector V(x,y,z), the normalised vector 
N(a,b,c) is:
N(a,b,c) = (x/length(V),y/length(V),z/length(V))
A function return value of zero indicates the normalised vector was successfully returned.
ID = 2337
Get_vector_normalize(Vector4 &vect,Vector4 &normalised) 
Name
Integer Get_vector_normalize(Vector4 &vect,Vector4 &normalised) 
Description
For the four dimensional vector vect, return the normalised vector of vect in the Vector4 
normalised.
      Note: for a normalised vector, length = 1 and for the vector V(x,y,z,w), the normalised vector 
N(a,b,c,d) is:
N(a,b,c,d) = (x/length(V),y/length(V),z/length(V),w/length(V))
A function return value of zero indicates the normalised vector was successfully returned.
ID = 2338
Get_vector_normalize(Vector2 &vect) 
Name
Vector2 Get_vector_normalize(Vector2 &vect) 
Description
For the two dimensional vector vect, return the normalised vector of vect as the function return 
value.
      Note: for a normalised vector, length = 1 and for the vector V(x,y), the normalised vector N(a,b) 
is:
N(a,b) = (x/length(V),y/length(V))
ID = 2339
Get_vector_normalize(Vector3 &vect) 
Name
Vectors and Matrices
Vector3 Get_vector_normalize(Vector3 &vect) 
Description
For the three dimensional vector vect, return the normalised vector as the function return value.
      Note: for a normalised vector, length = 1 and for the vector V(x,y,z), the normalised vector 
N(a,b,c) is:
N(a,b,c) = (x/length(V),y/length(V),z/length(V))
ID = 2340
Get_vector_normalize(Vector4 &vect) 
Name
Vector4 Get_vector_normalize(Vector4 &vect) 
Description
For the four dimensional vector vect, return the normalised vector as the function return value.
      Note: for a normalised vector, length = 1 and for the vector V(x,y,z,w), the normalised vector 
N(a,b,c,d) is:
N(a,b,c,d) = (x/length(V),y/length(V),z/length(V),w/length(V))
ID = 2341
Get_vector_homogenize(Vector3 &vect,Vector3 &homogenized)
Name
Integer Get_vector_homogenize(Vector3 &vect,Vector3 &homogenized)
Description
For the three dimensional vector vect, return the homogenized vector of vect in the Vector3 
homogenized.
      Note: for a homogenized vector, the third component = 1 and for the vector V(x,y,z), the 
homogenized vector H(a,b,c) is:
H(a,b,c) = (x/z,y/z,1)
A function return value of zero indicates the homogenized vector was successfully returned.
 ID = 2342
Get_vector_homogenize(Vector4 &vect,Vector4 &homogenized)
Name
Integer Get_vector_homogenize(Vector4 &vect,Vector4 &homogenized) 
Description
For the four dimensional vector vect, return the homogenized vector of vect in the Vector4 
homogenized.
      Note: for a homogenized vector, the fourth component = 1 and for the vector V(x,y,z,w), the 
homogenized vector H(a,b,c,d) is:
H(a,b,c,d) = (x/z,y/w,z/w,1)
A function return value of zero indicates the homogenized vector was successfully returned.
 ID = 2343
Vectors and Matrices

Get_vector_homogenize(Vector3 &vect) 
Name
Vector3 Get_vector_homogenize(Vector3 &vect) 
Description
For the three dimensional vector vect, return the homogenized vector of vect as the function return 
value.
      Note: for a homogenized vector, the third component = 1 and for the vector V(x,y,z), the 
homogenized vector H(a,b,c) is:
H(a,b,c) = (x/z,y/z,1)
ID = 2344
Get_vector_homogenize(Vector4 &vect) 
Name
Vector4 Get_vector_homogenize(Vector4 &vect) 
Description
For the four dimensional vector vect, return the homogenized vector of vect as the function return 
value.
      Note: for a homogenized vector, the fourth component = 1 and for the vector V(x,y,z,w), the 
homogenized vector H(a,b,c,d) is:
H(a,b,c,d) = (x/z,y/w,z/w,1)
ID = 2345
Set_matrix_zero(Matrix3 &matrix) 
Name
Integer Set_matrix_zero(Matrix3 &matrix) 
Description
For the three by three Matrix3 matrix, set all the values in the matrix to zero.
A function return value of zero indicates the matrix was successfully zero’d.
ID = 2346
Set_matrix_zero(Matrix4 &matrix) 
Name
Integer Set_matrix_zero(Matrix4 &matrix) 
Description
For the four by four Matrix4 matrix, set all the values in the matrix to zero.
A function return value of zero indicates the matrix was successfully zero’d.
ID = 2347
Set_matrix_identity(Matrix3 &matrix) 
Vectors and Matrices
Name
Integer Set_matrix_identity(Matrix3 &matrix) 
Description
For the three by three Matrix3 matrix, set matrix to the identity matrix.
That is, for the matrix (row,column) values are: 
             matrix(1,1) = 1    matrix (1,2) = 0    matrix(1,3) = 0
             matrix(2,1) = 0    matrix (2,2) = 1    matrix(2,3) = 0
             matrix(3,1) = 0    matrix (3,2) = 0    matrix(3,3) = 1
A function return value of zero indicates the matrix was successfully set to the identity matrix.
ID = 2348
Set_matrix_identity(Matrix4 &matrix) 
Name
Integer Set_matrix_identity(Matrix4 &matrix) 
Description
For the four by four Matrix4 matrix, set matrix to the identity matrix.
That is, for the matrix (row,column) values are: 
             matrix(1,1) = 1    matrix (1,2) = 0    matrix(1,3) = 0    matrix(1,4) = 0
             matrix(2,1) = 0    matrix (2,2) = 1    matrix(2,3) = 0    matrix(2,4) = 0
             matrix(3,1) = 0    matrix (3,2) = 0    matrix(3,3) = 1    matrix(3,4) = 0
             matrix(4,1) = 0    matrix (4,2) = 0    matrix(4,3) = 0    matrix(4,4) = 1
A function return value of zero indicates the matrix was successfully set to the identity matrix.
ID = 2349
Set_matrix(Matrix3 &matrix,Real value) 
Name
Integer Set_matrix(Matrix3 &matrix,Real value) 
Description
For the three by three Matrix4 matrix, set all the values in the rows and columns of matrix to value.
A function return value of zero indicates the matrix was successfully set to value.
ID = 2350
Set_matrix(Matrix4 &matrix,Real value) 
Name
Integer Set_matrix(Matrix4 &matrix,Real value) 
Description
For the four by four Matrix4 matrix, set all the values in the rows and columns of matrix to value.
A function return value of zero indicates the matrix was successfully set to value.
ID = 2351
Vectors and Matrices

Set_matrix(Matrix3 &matrix,Integer row,Integer col,Real value) 
Name
Integer Set_matrix(Matrix3 &matrix,Integer row,Integer col,Real value) 
Description
For the three by three Matrix3 matrix, set the value of matrix(row,col) to value.
A function return value of zero indicates the matrix(row,col) was successfully set to value.
ID = 2352
Set_matrix(Matrix4 &matrix,Integer row,Integer col,Real value) 
Name
Integer Set_matrix(Matrix4 &matrix,Integer row,Integer col,Real value) 
Description
For the four by four Matrix4 matrix, set the value of matrix(row,col) to value.
A function return value of zero indicates the matrix(row,col) was successfully set to value.
ID = 2353
 Get_matrix(Matrix3 &matrix,Integer row,Integer col,Real &value) 
Name
Integer Get_matrix(Matrix3 &matrix,Integer row,Integer col,Real &value) 
Description
For the three by three Matrix3 matrix, get the value of matrix(row,col) and return it in value.
A function return value of zero indicates the matrix(row,col) was successfully returned.
 ID = 2354
Get_matrix(Matrix4 &matrix,Integer row,Integer col,Real &value) 
Name
Integer Get_matrix(Matrix4 &matrix,Integer row,Integer col,Real &value) 
Description
For the four by four Matrix4 matrix, get the value of matrix(row,col) and return it in value.
A function return value of zero indicates the matrix(row,col) was successfully returned.
ID = 2355
Get_matrix(Matrix3 &matrix,Integer row,Integer col) 
Name
Real Get_matrix(Matrix3 &matrix,Integer row,Integer col) 
Description
For the three by three Matrix3 matrix, the value of matrix(row,col) is returned as the function return 
value.
 ID = 2356
Vectors and Matrices
Get_matrix(Matrix4 &matrix,Integer row,Integer col) 
Name
Real Get_matrix(Matrix4 &matrix,Integer row,Integer col) 
Description
For the four by four Matrix3 matrix, the value of matrix(row,col) /.
 ID = 2357
 
Set_matrix_row(Matrix3 &matrix,Integer row,Vector3 &vect) 
Name
Integer Set_matrix_row(Matrix3 &matrix,Integer row,Vector3 &vect) 
Description
For the three by three Matrix3 matrix, set the values of row row to the values of the components of 
the Vector3 vect. That is:
      matrix(row,1) = vect(1)     matrix(row,2) = vect(2)     matrix(row,3) = vect(3).
A function return value of zero indicates that the row of matrix was successfully set.
ID = 2358
 Set_matrix_row(Matrix4 &matrix,Integer row,Vector4 &vect) 
Name
Integer Set_matrix_row(Matrix4 &matrix,Integer row,Vector4 &vect) 
Description
For the four by four Matrix4 matrix, set the values of row row to the values of the components of the 
Vector4 vect. That is:
  matrix(row,1)=vect(1)  matrix(row,2)=vect(2)  matrix(row,3)=vect(3) matrix(row,4)=vect(4).
A function return value of zero indicates the row of matrix was successfully set.
ID = 2359
Get_matrix_row(Matrix3 &matrix,Integer row,Vector3 &vect) 
Name
Integer Get_matrix_row(Matrix3 &matrix,Integer row,Vector3 &vect) 
Description
For the three dimensional vector vect, set the values of vect to the values of row row of the three by 
three Matrix3 matrix. That is:
      vect(1) = matrix(row,1)     vect(2) = matrix(row,2)     vect(3) = matrix(row,3).
A function return value of zero indicates that the components of vect were successfully set.
ID = 2360
Get_matrix_row(Matrix4 &matrix,Integer row,Vector4 &vect) 
Name
Vectors and Matrices

Integer Get_matrix_row(Matrix4 &matrix,Integer row,Vector4 &vect) 
Description
For the four dimensional vector vect, set the values of vect to the values of row row of the four by 
four Matrix4 matrix. That is:
   vect(1)=matrix(row,1)  vect(2)=matrix(row,2)  vect(3)=matrix(row,3)  vect(4)=matrix(row,4).
A function return value of zero indicates that the components of vect were successfully set.
ID = 2361
Get_matrix_row(Matrix3 &matrix,Integer row) 
Name
Vector3 Get_matrix_row(Matrix3 &matrix,Integer row) 
Description
For the three by three Matrix3 matrix, the values of row row of matrix are returned as the Vector3 
function return value.
ID = 2362
Get_matrix_row(Matrix4 &matrix,Integer row) 
Name
Vector4 Get_matrix_row(Matrix4 &matrix,Integer row) 
Description
For the four by four Matrix4 matrix, the values of row row of matrix are returned as the Vector4 
function return value.
ID = 2363
Get_matrix_transpose(Matrix3 &source,Matrix3 &target) 
Name
Integer Get_matrix_transpose(Matrix3 &source,Matrix3 &target) 
Description
For the three by three Matrix3 matrix, return the transpose of matrix as Matrix3 target.
That is, target(row,column) = matrix(column,row).
A function return value of zero indicates the matrix transpose was successfully returned.
ID = 2364
Get_matrix_transpose(Matrix4 &source,Matrix4 &target) 
Name
Integer Get_matrix_transpose(Matrix4 &source,Matrix4 &target) 
Description
For the four by four Matrix3 matrix, return the transpose of matrix as Matrix4 target.
That is, target(row,column) = matrix(column,row).
A function return value of zero indicates the matrix transpose was successfully returned.
Vectors and Matrices
ID = 2365
Get_matrix_transpose(Matrix3 &source) 
Name
Matrix3 Get_matrix_transpose(Matrix3 &source) 
Description
For the three by three Matrix3 source, return the transpose of matrix as the function return value.
ID = 2366
Get_matrix_transpose(Matrix4 &source) 
Name
Matrix4 Get_matrix_transpose(Matrix4 &source) 
Description
For the four by four Matrix4 source, return the transpose of matrix as the function return value.
ID = 2367
Get_matrix_inverse(Matrix3 &source,Matrix3 &target) 
Name
Integer Get_matrix_inverse(Matrix3 &source,Matrix3 &target) 
Description
For the three by three Matrix3 source, return the inverse of the matrix as Matrix3 target.
A function return value of zero indicates the matrix inverse was successfully returned.
ID = 2368
Get_matrix_inverse(Matrix4 &source,Matrix4 &target) 
Name
Integer Get_matrix_inverse(Matrix4 &source,Matrix4 &target) 
Description
For the four by four Matrix4 source, return the inverse of the matrix as Matrix4 target.
A function return value of zero indicates the matrix inverse was successfully returned.
ID = 2369
Get_matrix_inverse(Matrix3 &source) 
Name
Matrix3 Get_matrix_inverse(Matrix3 &source) 
Description
For the three by three Matrix3 source, return the inverse of the matrix as the function return value.
ID = 2370
Vectors and Matrices

Get_matrix_inverse(Matrix4 &source) 
Name
Matrix4 Get_matrix_inverse(Matrix4 &source) 
Description
For the four by four Matrix4 source, return the inverse of the matrix as the function return value.
ID = 2371
Swap_matrix_rows(Matrix3 &matrix,Integer row1,Integer row2) 
Name
Integer Swap_matrix_rows(Matrix3 &matrix,Integer row1,Integer row2) 
Description
For the three by three Matrix3 matrix, swap row row1 with row row2.
A function return value of zero indicates the swapped matrix was successfully returned.
ID = 2372
Swap_matrix_rows(Matrix4 &matrix,Integer row1,Integer row2) 
Name
Integer Swap_matrix_cols(Matrix4 &matrix,Integer Swap_matrix_rows(Matrix4 &matrix,Integer 
row1,Integer row2) 
Description
For the four by four Matrix4 matrix, swap row row1 with row row2.
A function return value of zero indicates the swapped matrix was successfully returned.
 ID = 2373
Swap_matrix_cols(Matrix3 &matrix,Integer col1,Integer col2) 
Name
Integer Swap_matrix_cols(Matrix3 &matrix,Integer col1,Integer col2) 
Description
For the three by three Matrix3 matrix, swap column col1 with column col2.
A function return value of zero indicates the swapped matrix was successfully returned.
 ID = 2374
Swap_matrix_cols(Matrix4 &matrix,Integer col1,Integer col2) 
Name
Integer Swap_matrix_cols(Matrix4 &matrix,Integer col1,Integer col2) 
Description
For the four by four Matrix4 matrix, swap column col1 with column col2.
A function return value of zero indicates the swapped matrix was successfully returned.
ID = 2375
Vectors and Matrices
Get_translation_matrix(Vector2 &vect,Matrix3 &matrix) 
Name
Integer Get_translation_matrix(Vector2 &vect,Matrix3 &matrix) 
Description
From the two dimension vector vect, create the three by three matrix representing the vector as a 
translation and return it as matrix.
That is, for vect(x,y), the matrix(row,column) values are: 
             matrix(1,1) = 1    matrix(1,2) = 0    matrix(1,3) = x
             matrix(2,1) = 0    matrix(2,2) = 1    matrix(2,3) = y
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1
A function return value of zero indicates the translation matrix was successfully returned.
ID = 2376
Get_translation_matrix(Vector3 &vect,Matrix4 &matrix) 
Name
Integer Get_translation_matrix(Vector3 &vect,Matrix4 &matrix) 
Description
From the three dimension vector vect, create the four by four Matrix4 matrix representing the 
vector as a translation and return it as matrix.
That is, for vect(x,y,z), the matrix(row,column) values are: 
             matrix(1,1) = 1    matrix(1,2) = 0    matrix(1,3) = 0    matrix(1,4) = x
             matrix(2,1) = 0    matrix(2,2) = 1    matrix(2,3) = 0    matrix(2,4) = y
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1    matrix(3,4) = z
             matrix(4,1) = 0    matrix(4,2) = 0    matrix(4,3) = 0    matrix(4,4) = 1
A function return value of zero indicates the translation matrix was successfully returned.
ID = 2377
Get_translation_matrix(Vector2 &vect) 
Name
Matrix3 Get_translation_matrix(Vector2 &vect) 
Description
For the two dimension vector vect, the three by three Matrix3 representing the vector as a 
translation is returned as the function return value.
ID = 2378
Get_translation_matrix(Vector3 &vect) 
Name
Matrix4 Get_translation_matrix(Vector3 &vect) 
Description
Vectors and Matrices

For the three dimension vector vect, the four by four Matrix4 representing the vector as a translation 
is returned as the function return value.
ID = 2379
Get_rotation_matrix(Vector2 &centre,Real angle,Matrix3 &matrix) 
Name
Integer Get_rotation_matrix(Vector2 &centre,Real angle,Matrix3 &matrix) 
Description
From the Vector2 centre and Real angle, construct the three by three Matrix3 matrix given below.
If centre is (x,y), C = cos(angle) and S = sin(angle).
   the matrix(row,column) values are: 
             matrix(1,1) = C    matrix(1,2) = -S     matrix(1,3) = x*(1 - C) + y*S
             matrix(2,1) = S    matrix(2,2) =  C      matrix(2,3) = y*(1 - C) - x*S
             matrix(3,1) = 0    matrix(3,2) =  0       matrix(3,3) = 1
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
A function return value of zero indicates the matrix was successfully returned.
ID = 2380
Get_rotation_matrix(Vector3 &axis,Real angle,Matrix4 &matrix) 
Name
Integer Get_rotation_matrix(Vector3 &axis,Real angle,Matrix4 &matrix) 
Description
From the Vector3 axis and Real angle, construct the four by four Matrix4 matrix given below.
If Naxis is axis normalised and Naxis = (X,Y,Z), C = cos(angle), S = sin(angle) and T = 1 - C
 the matrix(row,column) values are: 
 matrix(1,1) = T*X*X+C      matrix(1,2) = T*X*Y-SZ     matrix(1,3) = T*X*Z+S*Y  matrix(1,4) = 0
 matrix(2,1) = T*X*Y+S*Z   matrix(2,2) = T*Y*Y+C     matrix(2,3) = T*Y*Z-S*X   matrix(1,4) = 0
 matrix(3,1) = T*X*Z-S*Y   matrix(3,2) = T*Y*Z+S*X  matrix(3,3) = T*Z*Z+C       matrix(1,4) = 0
 matrix(4,1) = 0                    matrix(4,2) =  0                  matrix(4,3) = 0                    matrix(4,1) = 1
angle is in radians and is measured a rotation on the plane orthogonal to the axis, the direction of 
the rotation is counterclockwise in relative to axis as the plane upward vector.
A function return value of zero indicates the matrix was successfully returned.
ID = 2381
Get_rotation_matrix(Vector2 &centre,Real angle)
Name
Matrix3 Get_rotation_matrix(Vector2 &centre,Real angle)
Description
From the Vector2 centre and Real angle, construct the three by three Matrix3 matrix given below 
and return it as the function return value.
If centre is (X,Y), C = cos(angle) and S = sin(angle) and Matrix3 matrix.
Vectors and Matrices
   the matrix(row,column) values are: 
             matrix(1,1) = C    matrix(1,2) = -S     matrix(1,3) = X*(1 - C) + Y*S
             matrix(2,1) = S    matrix(2,2) =  C      matrix(2,3) = Y*(1 - C) - X*S
             matrix(3,1) = 0    matrix(3,2) =  0       matrix(3,3) = 1
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
 ID = 2382
Get_rotation_matrix(Vector3 &axis,Real angle) 
Name
Matrix4 Get_rotation_matrix(Vector3 &axis,Real angle) 
Description
From the Vector3 axis and Real angle, construct the four by four Matrix4 matrix given below and 
return it as the function return value.
If Naxis is axis normalised and Naxis = (X,Y,Z), C = cos(angle), S = sin(angle), T = 1 - C and 
Matrix4 matrix
 the matrix(row,column) values are: 
 matrix(1,1) = T*X*X+C      matrix(1,2) = T*X*Y-SZ     matrix(1,3) = T*X*Z+S*Y  matrix(1,4) = 0
 matrix(2,1) = T*X*Y+S*Z   matrix(2,2) = T*Y*Y+C     matrix(2,3) = T*Y*Z-S*X   matrix(1,4) = 0
 matrix(3,1) = T*X*Z-S*Y   matrix(3,2) = T*Y*Z+S*X  matrix(3,3) = T*Z*Z+C       matrix(1,4) = 0
 matrix(4,1) = 0                    matrix(4,2) =  0                  matrix(4,3) = 0                matrix(4,1) = 1
angle is in radians and is measured a rotation on the plane orthogonal to the axis, the direction of 
the rotation is counterclockwise in relative to axis as the plane upward vector.
ID = 2383
Get_scaling_matrix(Vector2 &scale,Matrix3 &matrix) 
Name
Integer Get_scaling_matrix(Vector2 &scale,Matrix3 &matrix) 
Description
From the two dimension vector scale, create the three by three Matrix3 representing the vector as a 
scaling matrix and return it as matrix.
That is, for scale(S,T), the matrix(row,column) values are: 
             matrix(1,1) = S    matrix(1,2) = 0    matrix(1,3) = 0
             matrix(2,1) = 0    matrix(2,2) = T    matrix(2,3) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1
A function return value of zero indicates the translation matrix was successfully returned.
ID = 2384
Get_scaling_matrix(Vector3 &scale,Matrix4 &matrix) 
Name
Integer Get_scaling_matrix(Vector3 &scale,Matrix4 &matrix) 
Description
Vectors and Matrices

From the three dimension vector scale, create the four by four Matrix4 representing the vector as a 
scaling matrix and return it as matrix.
That is, for scale(S,T,U), the matrix(row,column) values are: 
             matrix(1,1) = S    matrix(1,2) = 0    matrix(1,3) = 0    matrix(1,4) = 0
             matrix(2,1) = 0    matrix(2,2) = T    matrix(2,3) = 0    matrix(2,4) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = U    matrix(3,4) = 0
             matrix(4,1) = 0    matrix(4,2) = 0    matrix(4,3) = 0    matrix(4,4) = 1
A function return value of zero indicates the scaling matrix was successfully returned.
ID = 2385
Get_scaling_matrix(Vector2 &scale) 
Name
Matrix3 Get_scaling_matrix(Vector2 &scale) 
Description
From the two dimension vector scale, create the three by three Matrix3 matrix as given below. The 
matrix represents the vector as a scaling and it is return as the function return value.
That is, for scale(S,T), the returned matrix(row,column) values are: 
             matrix(1,1) = S    matrix(1,2) = 0    matrix(1,3) = 0
             matrix(2,1) = 0    matrix(2,2) = T    matrix(2,3) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1
ID = 2386
Get_scaling_matrix(Vector3 &scale) 
Name
Matrix4 Get_scaling_matrix(Vector3 &scale) 
Description
From the three dimension vector scale, create the four by four Matrix4 matrix as given below. The 
matrix represents the vector as a scaling and it is return as the function return value.
That is, for scale(S,T,U), the returned matrix(row,column) values are: 
             matrix(1,1) = S    matrix(1,2) = 0    matrix(1,3) = 0    matrix(1,4) = 0
             matrix(2,1) = 0    matrix(2,2) = T    matrix(2,3) = 0    matrix(2,4) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = U    matrix(3,4) = 0
             matrix(4,1) = 0    matrix(4,2) = 0    matrix(4,3) = 0    matrix(4,4) = 1
ID = 2387
Get_perspective_matrix(Real d,Matrix4 &matrix) 
Name
Integer Get_perspective_matrix(Real d,Matrix4 &matrix) 
Description
For the distance d, create the four by four Matrix4 and return it as matrix.
That is, for Real d, the matrix(row,column) values are: 
Vectors and Matrices
             matrix(1,1) = 1    matrix(1,2) = 0    matrix(1,3) = 0    matrix(1,4) = 0
             matrix(2,1) = 0    matrix(2,2) = 1    matrix(2,3) = 0    matrix(2,4) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1    matrix(3,4) = 0
             matrix(4,1) = 0    matrix(4,2) = 0    matrix(4,3) = 1/d    matrix(4,4) = 0
A function return value of zero indicates the matrix was successfully returned.
ID = 2388
Get_perspective_matrix(Real d) 
Name
Matrix4 Get_perspective_matrix(Real d) 
Description
For the distance d, create the four by four Matrix4 and return it as the function return value.
That is, for Real d, the matrix(row,column) values are: 
             matrix(1,1) = 1    matrix(1,2) = 0    matrix(1,3) = 0    matrix(1,4) = 0
             matrix(2,1) = 0    matrix(2,2) = 1    matrix(2,3) = 0    matrix(2,4) = 0
             matrix(3,1) = 0    matrix(3,2) = 0    matrix(3,3) = 1    matrix(3,4) = 0
             matrix(4,1) = 0    matrix(4,2) = 0    matrix(4,3) = 1/d    matrix(4,4) = 0
matrix is returned as the function return value.
ID = 2389
Triangles

5.14 Triangles
Triangle_normal(Real xarray[],Real yarray[],Real zarray[],Real Normal[])
Name
Integer Triangle_normal(Real xarray[],Real yarray[],Real zarray[],Real Normal[]) 
Description
Calculate the normal vector to the triangle given by the coordinates in the arrays xarray[], yarray[], 
zarray[] (the arrays are of dimension 3).
The normal vector is returned in Normal[1], Normal [2] and Normal[3].
A function return value of zero indicates the function was successful.
ID = 1737
Triangle_normal(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real 
y3,Real z3,Real &xn,Real &yn,Real &zn) 
Name
Integer Triangle_normal(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3,Real 
&xn,Real &yn,Real &zn) 
Description
Calculate the normal vector to the triangle given by the coordinates (x1,y1,z1), (x2,y2,z2) and 
(x3,y3,z3).
The normal vector is returned in (xn,yx,zn).
A function return value of zero indicates the function was successful.
ID = 1738
Triangle_slope(Real xarray[],Real yarray[],Real zarray[],Real &slope) 
Name
Integer Triangle_slope(Real xarray[],Real yarray[],Real zarray[],Real &slope) 
Description
Calculate the slope of the triangle given by the coordinates in the arrays xarray[], yarray[], zarray[] 
(the arrays are of dimension 3), and return the value as slope.
The units for slope is an angle in radians measured from the horizontal plane.
A function return value of zero indicates the function was successful.
ID = 1739
Triangle_slope(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real 
z3,Real &slope) 
Name
Integer Triangle_slope(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3,Real &slope) 
Description
Calculate the slope of the triangle given by the coordinates (x1,y1,z1), (x2,y2,z2) and (x3,y3,z3), 
and return the value as slope.
Triangles
The units for slope is an angle in radians measured from the horizontal plane.
A function return value of zero indicates the function was successful.
ID = 1740
Triangle_aspect(Real xarray[],Real yarray[],Real zarray[],Real &aspect) 
Name
Integer Triangle_aspect(Real xarray[],Real yarray[],Real zarray[],Real &aspect) 
Description
Calculate the aspect of the triangle given by the coordinates in the arrays xarray[], yarray[], zarray[] 
(the arrays are of dimension 3), and return the value as aspect.
The units for aspect is a bearing in radians. That is, aspect is given as a clockwise angle measured 
from the positive y-axis (North).
A function return value of zero indicates the function was successful.
ID = 1741
Triangle_aspect(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real 
z3,Real &aspect) 
Name
Integer Triangle_aspect(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2,Real x3,Real y3,Real z3,Real 
&aspect) 
Description
Calculate the aspect of the triangle given by the coordinates (x1,y1,z1), (x2,y2,z2) and (x3,y3,z3), 
and return the value as aspect.
The units for aspect is a bearing in radians. That is, aspect is given as a clockwise angle measured 
from the positive y-axis (North).
A function return value of zero indicates the function was successful.
ID = 1742
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
Ids, Uids and Guids

5.16 Ids, Uids and Guids
Elements and Models created within 12d Model are given a unique identifier called a Uid. 
When a new element or model is created, it is given the next available Uid. Uid’s are never reused 
so when an element or model is deleted, its Uid is not available for any other element or model.
A Uid is made up of two parts:
(a)
a Global Unique Identifier (Guid)
and a
(b)
12d Model generated Id.
Guid’s
A Global Unique Identifier (Guid) is a unique number which encodes space and time (see Guid in 
Wikipedia). Whenever a 12d Model project is created, a Guid is generated at the time of creation 
and this Guid is permanently stored as part of the 12d Model project. The Guid takes 128 bits of 
storage. If a 12d Model copy is made of a project, then the new project is given a new unique Guid.
Id’s
When a 12d Model project is created, the project Id counter, which is a 64-bit Integer, is set to zero 
and every time a new element is created, the Id counter is incremented and the new element given 
the current Id value.
The Id counter only ever increases and if an element in a project is deleted, its Id is never reused. 
Uid
For a 12d Model Element, the Uid consists of both the Guid of its parent project and its unique Id 
within that project.
To make things easier, if an element is created in a project, then for the Uid of that element, the Print 
and To_text calls for the Uid just print out the local Id of the Uid. 
Note - the call Is_Global checks to see if the Uid is a local Uid (that is, from the project that the 
macro is running in), or a Global Uid (that is, from a shared project). See  Is_global(Uid uid).
For documentation on Uid Arithmetic, go to the section 5.16.1 Uid Arithmetic
For documentation on Uid calls, go to the section 5.16.2 Uid Functions
5.16.1 Uid Arithmetic
Because a Uid’s consist of a Guid and an Integer Id, a Uid Arithmetic has been included in the 
12dPL where for an Uid uid,
uid + n
is defined to be that n is added to the Id part of the Uid where n is a positive or negative integer 
(whole number). This works for either a local or a global Uid.
Ids, Uids and Guids
The increment and decrement operators also work for local and global Uids. That is,
uid++
++uid
uid--
--uid
are all defined for both local and global uids.
If two Uids are both local Uids, then they can be subtracted and the value is the subtraction of the 
two Ids of the Uids. 
That is, if the Uids uid1 and uid2 are both local Uids, then
Integer   diff = uid1 - uid2
is defined and is the difference between the Id of uid1 and the Id of uid2.
If either uid1 or uid1 are global Uids then the difference of them is not defined.
Note - the call Is_Global checks to see if the Uid is a local Uid (that is, from the project that the 
macro is running in), or a Global Uid (that is, from a shared project). See  Is_global(Uid uid).
5.16.2 Uid Functions
Get_next_uid() 
Name
Uid Get_next_uid() 
Description
Get the next available Uid and return it as the function return value.
This is often used in Undo’s.
ID = 1920
Get_next_id() 
Name
Integer Get_next_id() 
Description
Get the next available Id and return it as the function return value.
Deprecation Warning - this function has now been deprecated and will no longer exist unless 
special compile flags are used. Use Uid Get_next_uid() instead.
ID = 1892
Get_last_uid()
Name
Uid Get_last_uid() 
Description
Get the last used Uid (that is the one from the last created Element) and return it as the function 
return value.
Ids, Uids and Guids

ID = 2072
Get_last_id() 
Name
Integer Get_last_id() 
Description
Get the last used Id (that is the one from the last created Element) and return it as the function 
return value.
Deprecation Warning - this function has now been deprecated and will no longer exist unless 
special compile flags are used. Use Get_last_uid instead (see  Get_last_uid().
ID = 2071
void Print(Uid uid)
Name
void Print(Uid uid) 
Description
Prints a text conversion of the UID uid to the Output Window.
Three is no function return value.
ID = 2052
Convert_uid(Uid uid,Text &txt)
Name
Integer Convert_uid(Uid uid,Text &txt)
Description
Convert the UID uid to a Text. The Text is returned in txt.
A function return value of zero indicates the Uid was successfully converted to text.
ID = 2053
Convert_uid(Uid uid,Integer &id) 
Name
Integer Convert_uid(Uid uid,Integer &id) 
Description
Convert the UID uid to an Integer The Integer is returned in id.
Note - this in only possible if the uid can be expressed as an Integer,
A function return value of zero indicates the Uid was successfully converted. to an Integer.
ID = 2054
Convert_uid(Uid uid,Integer &id) 
Name
Integer Convert_uid(Uid uid,Integer &id) 
Ids, Uids and Guids
Description
Convert the UID uid to an Integer The Integer is returned in id.
Note - this in only possible if the uid can be expressed as an Integer,
A function return value of zero indicates the Uid was successfully converted. to an Integer.
ID = 2054
Convert_uid(Uid uid,Integer64 &id) 
Name
Integer Convert_uid(Uid uid,Integer64 &id) 
Description
Convert the UID uid to a 64 bit Integer. The 64 bit Integer is returned in id.
Note - this in only possible if the uid can be expressed as a 64 bit Integer,
A function return value of zero indicates the Uid was successfully converted. to a 64 bit Integer.
ID = 7835
Convert_uid(Text txt,Uid &uid) 
Name
Integer Convert_uid(Text txt,Uid &uid) 
Description
Convert the Text txt to an UID. The Uid is returned in uid.
Note - this in only possible if txt is in the correct form of an Uid.
A function return value of zero indicates the Text was successfully converted to a Uid.
 ID = 2055
Convert_uid(Integer64 id,Uid &uid)
Name
Integer Convert_uid(Integer64 id,Uid &uid) 
Description
Convert the 64 bit Integer id to an UID. The Uid is returned in uid.
Note - this in only possible if the 64 bit Integer id can be expressed as an Uid.
A function return value of zero indicates the 64 bit Integer was successfully converted to a Uid.
ID = 7836
To_text(Uid uid) 
Name
Text To_text(Uid uid) 
Description
Convert the UID uid to a Text.
The Text is returned as the function return value.
Ids, Uids and Guids

ID = 2057
From_text(Text txt,Uid &uid) 
Name
Integer From_text(Text txt,Uid &uid) 
Description
Convert the Text txt to a Uid and the Uid is returned in uid.
A function return value of zero indicates the txt was successfully converted to a Uid.
ID = 2063
Null(Uid &uid)
Name
void Null(Uid &uid) 
Description
Set the UID uid to be a null Uid.
There is no function return value.
 ID = 2058
Is_null(Uid uid)
Name
Integer Is_null(Uid uid) \
Description
Check to see if the UID uid is a null Uid.
A non-zero function return value indicates that uid is null.
A zero function return value indicates that uid is not null.
Warning this is the opposite of most 12dPL function return values
 ID = 2059
Is_contour(Uid uid) 
Name
Integer Is_contour(Uid uid) 
Description
Check to see if the UID uid is the Uid of a string created by a 12d Model Contour option.
Note - such strings are ignored in 12d Model number counts for Base size.
A non-zero function return value indicates that the uid is of a string created by a 12d Model Contour 
option.
A zero function return value indicates that the uid is not the uid of a string created by a 12d Model 
Contour option.
Warning this is the opposite of most 12dPL function return values
ID = 2064
Ids, Uids and Guids
Is_plot(Uid uid) 
Name
Integer Is_plot(Uid uid) 
Description
Check to see if the UID uid is the Uid of a string created by a 12d Model Plot option.
Note - such strings are ignored in 12d Model number counts for Base size.
A non-zero function return value indicates that the uid is of a string created by a 12d Model Plot 
option.
A zero function return value indicates that the uid is not the uid of a string created by a 12d Model 
Plot option.
Warning this is the opposite of most 12dPL function return values
 ID = 2065
Is_function(Uid uid) 
Name
Integer Is_function(Uid uid) 
Description
Check to see if the UID 12d Model is the Uid of a 12d Model Function/Macro_Function.
A non-zero function return value indicates that the uid is of a 12d Model Function/Macro_Function
A zero function return value indicates that the uid is not the uid of a 12d Model Function/
Macro_Function.
Warning this is the opposite of most 12dPL function return values
 ID = 2066
Function_exists(Integer id) 
Name
Integer Function_exists(Integer id) 
Description
Check to see if id is the Id of a 12d Function.
1 for yes
A non-zero function return value indicates that id is the Id of a 12d Model Function/Macro_Function
A zero function return value indicates that id is not the Id of a 12d Model Function/Macro_Function.
Warning this is the opposite of most 12dPL function return values
Deprecation Warning - this function has now been deprecated and will no longer exist unless 
special compile flags are used. Use Integer Is_function(Uid uid) instead.
ID = 1187
Is_valid(Uid uid) 
Name
Ids, Uids and Guids

Integer Is_valid(Uid uid) 
Description
Check to see if the UID uid is a valid Uid.
A non-zero function return value indicates that uid is a valid Uid.
Warning this is the opposite of most 12dPL function return values
ID = 2060
Is_unknown(Uid uid) 
Name
Integer Is_unknown(Uid uid) 
Description
Check to see if the UID uid is a valid Uid.
A non-zero function return value indicates that uid is not a valid Uid.
Warning this is the opposite of most 12dPL function return values
 ID = 2061
Is_global(Uid uid) 
Name
Integer Is_global(Uid uid) 
Description
Check to see if the UID uid is of a shared element. That is, the element has not been created in this 
project but has been shared in from another project.
A non-zero function return value indicates that uid is of a shared element.
Warning this is the opposite of most 12dPL function return values
ID = 2062
Convert_guid(Guid guid,Text &txt)
Name
Integer Convert_guid(Guid guid,Text &txt)
Description
Convert the GUID guid to a Text. The Text is returned in txt.
A function return value of zero indicates the Guid was successfully converted to text.
ID = 3213
Convert_guid(Text txt,Guid &guid) 
Name
Integer Convert_guid(Text txt,Guid &guid) 
Description
Convert the Text txt to a GUID. The Guid is returned in guid.
Note - this in only possible if txt is in the correct form of a Guid.
Ids, Uids and Guids
A function return value of zero indicates the Text was successfully converted to a Guid.
 ID = 3214
void Print(Guid guid)
Name
void Print(Guid guid) 
Description
Prints a text conversion of the GUID guid to the Output Window.
Three is no function return value.
ID = 3562
Null(Guid &guid)
Name
void Null(Guid &guid) 
Description
Set the GUID guid to be a null Guid.
There is no function return value.
 ID = 3771
Is_valid(Guid guid) 
Name
Integer Is_valid(Guid guid) 
Description
Check to see if the GUID guid is valid.
A non-zero function return value indicates that guid is a valid Guid.
Warning this is the opposite of most 12dPL function return values
ID = 3772
Is_same(Guid guid1,Guid guid2) 
Name
Integer Is_same(Guid guid1,Guid guid2) 
Description
Check to see if the GUID guid1 is the same as the GUID guid2.
A non-zero function return value indicates that the two GUID are the same.
ID = 3773
GUID_Gen(Integer format,Integer classic,Integer comment,Text &guid) 
Name
Integer GUID_Gen(Integer format,Integer classic,Integer comment,Text &guid)
Ids, Uids and Guids

Description
Generate a new GUID and assign the text representation to Text guid.
If Integer classic is not zero, then the GUID generation might be less secure, e.g. it can be traced 
back to the ethernet address of the user computer.
Valid format is Integer from 0 to 7
Format 0 example guid 
EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0 
Format 1 example guid 
// {EEE5D2B4-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  IMPLEMENT_OLECREATE(<<class>>, <<external_name>>, 
  0xeee5d2b4, 0xdcce, 0x11d3, 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0); 
Format 2 example guid 
// {EEE5D2B5-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  DEFINE_GUID(<<name>>, 
  0xeee5d2b5, 0xdcce, 0x11d3, 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0);
Format 3 example guid 
// {EEE5D2B6-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  static const GUID <<name>> = 
  { 0xeee5d2b6, 0xdcce, 0x11d3, { 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0 } }; 
Format 4 example guid 
{EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0} 
Format 5 example guid 
EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0 
Format 6 example guid 
__declspec(uuid("EEE5D2B4-DCCE-11D3-B4C4-D237E35336F0")) 
Format 7 the guid contains six 32 Bit integers from the components of the GUID structure in base 64 
 
A function return value of zero indicates the guid text was successfully generated.
 ID = 2305
GUID_Gen(Guid guid,Integer format,Integer comment,Text &guid_text) 
Name
Integer GUID_Gen(Guid guid,Integer format,Integer comment,Text &guid) 
Description
Form the text representation to Text guid_text of a given Guid guid.
Valid format is Integer from 0 to 7
Format 0 example guid 
EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0 
Format 1 example guid 
// {EEE5D2B4-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  IMPLEMENT_OLECREATE(<<class>>, <<external_name>>, 
Ids, Uids and Guids
  0xeee5d2b4, 0xdcce, 0x11d3, 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0); 
Format 2 example guid 
// {EEE5D2B5-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  DEFINE_GUID(<<name>>, 
  0xeee5d2b5, 0xdcce, 0x11d3, 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0);
Format 3 example guid 
// {EEE5D2B6-DCCE-11D3-B4C4-D237E35336F0} ... only there if comment is not zero
  static const GUID <<name>> = 
  { 0xeee5d2b6, 0xdcce, 0x11d3, { 0xb4, 0xc4, 0xd2, 0x37, 0xe3, 0x53, 0x36, 0xf0 } }; 
Format 4 example guid 
{EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0} 
Format 5 example guid 
EEE5D2B7-DCCE-11D3-B4C4-D237E35336F0 
Format 6 example guid 
__declspec(uuid("EEE5D2B4-DCCE-11D3-B4C4-D237E35336F0")) 
Format 7 the guid contains six 32 Bit integers from the components of the GUID structure in base 64 
 
A function return value of zero indicates the guid text was successfully set.
ID = 3832
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
Menus

5.18 Menus
Menus with the same look and feel as 12d Model menus can be easily created within 12dPL.
A 12dPL menu consists of a title and any number of menu options (called buttons) that are 
displayed one per line down the screen.
When the menu is displayed on the screen, the menu buttons will highlight as the cursor passes 
over them. If a menu button is selected (by pressing the  LB whilst the button is highlighted), the 
menu will be removed from the screen and the user-defined code for the selected button returned to 
the macro.
To represent menus, 12dPL has a special variable type called Menu.
Screen Co-Ordinates
When placing Menus, screen positions are given as co-ordinates (across_pos,down_pos) where 
across_pos and down_pos are measured from the top left-hand corner of the 12d Model window. 
The units for screen co-ordinates are pixels. 
A full computer screen is approximately 1000 pixels across by 800 pixels down.
Create_menu(Text menu_title)
Name
Menu Create_menu(Text menu_title)
Description
A Menu is created which is used when referring to this particular menu. The menu title is defined 
when the menu variable is created and is the Text menu_title.
The function return value is the required Menu variable.
(To represent menus, 12dPL has this special variable type called Menu.)
ID = 171
Menu_delete(Menu menu)
Name
Integer Menu_delete(Menu menu)
Description
Delete the menu defined by Menu menu.
A function return value of zero indicates the menu was deleted successfully.
ID = 588
Create_button(Menu menu,Text button_text,Text button_reply)
Name
Integer Create_button(Menu menu,Text button_text,Text button_reply)
Description
This function adds buttons to the menu with button_text as the text for the button.
The button is also supplied with a Text button_reply which is returned to the macro through the 
function Display or Display_relative when the button is selected.
Menus
The menu buttons will appear in the Menu in the order that they are added to the menu structure by 
the Create_button function.
A function return value of zero indicates that the button was created successfully.
ID = 172
Display(Menu menu,Integer &across_pos,Integer &down_pos,Text &reply)
Name
Integer Display(Menu menu,Integer &across_pos,Integer &down_pos,Text &reply)
Description
When called, the Menu menu is displayed on the screen with screen co-ordinates 
(across_pos,down_pos).
The menu remains displayed on the screen until a menu button is selected by the user.
When a menu button is selected, the menu is removed from the screen and the appropriate button 
return code returned in the Text variable reply.
Whilst displayed on the screen, the menu can be moved around the 12d Model window by using the 
mouse. When a menu selection is finally made, the actual position of the menu at selection time is 
returned as (across_pos,down_pos).
A function return value of zero indicates that a successful menu selection was made.
Note
An (across_pos,down_pos) of (-1,-1) indicates the current cursor position.
ID = 173
Display_relative(Menu menu,Integer &across_rel,Integer &down_rel,Text &reply)
Name
Integer Display_relative(Menu menu,Integer &across_rel,Integer &down_rel,Text &reply)
Description
When called, the Menu menu is displayed on the screen with screen co-ordinates of 
(across_rel,down_rel) relative to the cursor position.
The menu remains displayed until a menu button is selected.
When a menu button is selected, the menu is removed from the screen and the appropriate button 
return code returned in the Text variable reply.
Whilst displayed, the menu can be moved in 12d Model by using the mouse. When the selection is 
made, the final absolute position of the menu is returned as (across_rel,down_rel).
A function return value of zero indicates that a successful menu selection was made.
Thus the sequence used to define and display a menu and the relevant functions used are:
(a)
a Menu variable is created which is used when referring to this particular menu. The menu title 
is defined when the menu variable is created. Use:
Create_menu(Text menu_title)
For example
Menu menu = Create_menu("Test");
(b)
the menu buttons are added to the menu structure in the order that they will appear in the 
menu. The button text and the text that will be returned to the macro if the button is selected 
are both supplied. Use:
Menus

Create_button(Menu menu,Text button_text,Text reply)
For example
Create_button(menu,"First options","Op1");
Create_button(menu,"Second options","Op2");
Create_button(menu,"Finish","Fin");
(c)
the menu is displayed on the screen. The menu will continued to be displayed until a menu 
button is selected. When the menu button is selected, the menu is removed from the screen 
and the appropriate button return code returned to the macro. 
Use:
Display(Menu menu,Integer row_pos,Integer col_pos,
Text &reply)
Display_relative(Menu menu,Integer row_pos,Integer col_pos,
Text &reply)
For example
Display(menu,5,10,reply);
A more complete example of defining and using a menu is:
void main()
{
 // create a menu with title "Silly Menu"
  Menu menu = Create_menu("Silly Menu");
  /* add menu button with titles "Read", "Write", "Draw"
 and "Quit". The returns codes for the buttons are
 the same as the button titles
  */
  Create_button(menu,"Read","Read");
  Create_button(menu,"Write","Write");
  Create_button(menu,"Draw","Draw");
  Create_button(menu,"Quit","Quit");
  /* display the menu on the screen at the current cursor
 position and wait for a button to selected.
 When a button is selected, print out its return code
 If the return code isn't "Quit", redisplay the menu.
  */
  Text reply;
  do {
   Display(menu,-1,-1,reply);
   Print(reply);  Print("\n");
  } while(reply != "Quit");
}
ID = 364
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
Points
5.20 Points
A variable of type Point in created in the same way as Integers and Reals. That is, the Point variable 
name is given after the Point declaration.
For example, a Point of name pt is created by:
Point pt;
When the Point pt is created, it has the default co-ordinates of (0,0,0).
The co-ordinates for pt can then be set to new values using Set commands.
Get_x(Point pt)
Name
Real Get_x(Point pt)
Description
Get the x co-ordinate of the Point pt.
The function return value is the x co-ordinate value of pt.
ID = 241
Get_y(Point pt)
Name
Real Get_y(Point pt)
Description
Get the y co-ordinate of the Point pt.
The function return value is the y co-ordinate value of pt.
ID = 242
Get_z(Point pt)
Name
Real Get_z(Point pt)
Description
Get the z co-ordinate of the Point pt.
The function return value is the z co-ordinate value of pt.
ID = 243
Set_x(Point &pt,Real x)
Name
Real Set_x(Point &pt,Real x)
Description
Set the x co-ordinate of the Point pt to the value x.
The function return value is the x co-ordinate value of pt.
ID = 244
Points

Set_y(Point &pt,Real y)
Name
Real Set_y(Point &pt,Real y)
Description
Set the y co-ordinate of the Point pt to the value y.
The function return value is the y co-ordinate value of pt.
ID = 245
Set_z(Point &pt,Real z)
Name
Real Set_z(Point &pt,Real z)
Description
Set the z co-ordinate of the Point pt to the value z.
The function return value is the z co-ordinate value of pt.
ID = 246
Lines
5.21 Lines
A Line is three dimensional line joining two Points.
A variable of type Line is created in the same way as Points. That is, the Line variable name is given 
after the Line declaration.
For example, a Line of name line created by:
Line line;
When the Line line is created, it has default start and end Points with co-ordinates of (0,0,0).
The co-ordinates for the start and end Points of the Line line can then be set to new values using 
Set commands.
The direction of the Line is from the start point to the end point.
Get_start(Line line)
Name
Point Get_start(Line line)
Description
Get the start Point of the Line line.
The function return value is the start Point of line.
ID = 251
Get_end(Line line)
Name
Point Get_end(Line line)
Description
Get the end Point of the Line line.
The function return value is the start Point of line.
ID = 252
Set_start(Line &line, Point pt)
Name
Point Set_start(Line &line, Point pt)
Description
Set the start Point of the Line line to be the Point pt.
The function return value is also the start Point of line.
ID = 253
Set_end(Line &line, Point pt)
Name
Point Set_end(Line &line, Point pt)
Description
Lines

Set the end Point of the Line line to be the Point pt.
The function return value is also the end Point of line.
ID = 254
Reverse(Line line)
Name
Line Reverse(Line line)
Description
Reverse the direction of the Line line.
That is, Reverse swaps the start and end Points of the Line line.
The unary operator "-" will also reverse a Line.
The function return value is the reversed Line.
ID = 255
Arcs
5.22 Arcs
A 12dPL Arc is a helix which projects onto a circle in the (x,y) plane.
An Arc has a radius and Points for its centre, start and end. The radius can be positive or negative 
(but not zero).
A positive radius indicates that the direction of travel between the start and end points is in the 
clockwise directions (to the right).
A negative radius indicates that the direction of travel between the start and end points is in the anti-
clockwise direction (to the left).
A variable of type Arc is created in the same way as Points and Lines. That is, the Arc variable 
name is given after the Arc declaration.
For example, an Arc of name arc created by:
Arc arc;
When the Arc arc is created, it has default centre (0,0,0), start, end Points with co-ordinates of 
(1,0,0) and a radius of one.
The radius and co-ordinates for centre, start and end points of the Arc can then be set to new values 
using Set commands.
Creating an Arc
A 12dPL Arc can be created by first setting the radius and the (x,y) co-ordinates of the centre point 
to define a plan circle.
This defines the unique plan circle that the 12dPL Arc projects onto.
Next the (x,y) part of the start and end points are dropped perpendicularly onto the plan circle to 
define the start and the end points of the plan projection of the arc. Thus the start and end points 
used to define the arc may not lie on the created arc but stored projected points will.
Finally, the arc is given the start and end heights of the start and end points respectively.
WARNING
For a new Arc, the radius and centre point must be defined before the start and end points.
Get_centre(Arc arc)
Name
Point Get_centre(Arc arc)
Description
Get the centre point of the Arc arc.
The function return value is the centre point of the arc.
ID = 260
Get_radius(Arc arc)
Name
Real Get_radius(Arc arc)
Description
Get the radius of the Arc arc.
Arcs

The function return value is the radius of the arc.
ID = 261
Get_start(Arc arc)
Name
Point Get_start(Arc arc)
Description
Get the start point of the Arc arc.
The function return value is the start point of the arc.
ID = 262
Get_end(Arc arc)
Name
Point Get_end(Arc arc)
Description
Get the end point of the Arc arc.
The function return value is the end point of the arc.
ID = 263
Set_centre(Arc &arc,Point pt)
Name
Point Set_centre(Arc &arc,Point pt)
Description
Set the centre point of the Arc arc to be the Point pt. The start and end points are also translated by 
the vector between the new and old arc centres.
The function return value is the centre point of the arc.
ID = 264
Set_radius(Arc &arc,Real rad)
Name
Real Set_radius(Arc &arc,Real rad)
Description
Set the radius of the Arc arc to the value rad. The start and end points are projected radially onto the 
new arc.
The function return value is the radius of the arc.
ID = 265
Set_start(Arc &arc,Point start)
Name
Point Set_start(Arc &arc,Point start)
Arcs
Description
Set the start point of the Arc arc to be the Point start. If the start point is not on the Arc, the point is 
dropped perpendicularly onto the Arc to define the actual start point that lies on the Arc.
The function return value is the actual start point on the arc.
ID = 266
Set_end(Arc &arc,Point end)
Name
Point Set_end(Arc &arc,Point end)
Description
Set the end point of the Arc arc to be the Point end. If the end point is not on the Arc, the point is 
dropped perpendicularly onto the Arc to define the actual end point that lies on the Arc.
The function return value is the actual end point on the arc.
ID = 267
Reverse(Arc arc)
Name
Arc Reverse(Arc arc)
Description
Reverse the sign of the radius and swap the start and end points of the Arc arc. Hence the direction 
of travel for the Arc is reversed.
The unary operator "-" will also reverse an Arc.
The function return value is the Arc arc.
ID = 268
Spirals and Transitions

5.23 Spirals and Transitions
There is often confusion between the words spirals and transitions.
Basically a transition is a curve which starts with a radius of curvature of infinity, and the radius of 
curvature then continuously decreases along the transition until it reaches a final value of R.
The purpose of a transition is to have a curve to join straights and arcs so that the radius of 
curvature varies continuously between the infinite radius on the straight and the radius of curvature 
on the arc (the radius of curvature of an arc is the arc radius). So a transition is used to makes a 
smooth transition from a straight to an arc.
A spiral (also known as Euler spiral, or natural or a clothoid) is a special curve defined for each 
point on the curve by:
              r x len = a constant = K
where r is the radius of curvature at a point and len is the length of the curve to that point.
This spiral is the most common theoretical transition used in road design (and some rail design) 
however because the definition was difficult to use with hand calculations, various approximations to 
the real spiral have been used.
For example, what is normally called a clothoid by most road authorities is only an approximation to 
the full spiral. The Westrail Cubic used by Westrail in Western Australia is a different approximation. 
The Cubic Spiral is another very simple approximation used in early textbooks.
Examples of a common transitions used (mainly for rail) are:
     Cubic Parabola - used by NSW Railways. This is NOT a spiral.
     Bloss
     Sinusoidal
     Cosinusoidal
So in its basic form, a transition starts with an infinite radius of curvature, and ends with a radius of 
curvature of R and a total transition length of L.
R can be:
 positive. The transition will then curve to the right
or
or negative. The transition will curve to the left. The start radius of curvature would then be 
considered to be negative infinity. 
The transition can be drawn in local co-ordinates with the origin (0,0) at the point where the radius of 
curvature is infinity.
positive y
positive x
transition origin (0,0)
curve of positive radius R
full transition end
with radius is R
point on the transition with
local co-ordinates (x,y)
The radius at the origin
is infinity
radius r at the point
Transition in Local Coordinates
is between infinity and R
and length of the
full transition is L
The length to the point is l
Spirals and Transitions
Sometimes the full transition curve is not required and only a part of the transition is used. The 
transition is only used from a start point (at transition length start length from the beginning of the 
full transition), to and end point (at transition length end length from the beginning of the full 
transition). 
In practise transitions are required to be used in both directions. That is, starting on a straight and 
ending on a curve, or starting on a curve and ending on a straight.
So a
leading transition starts on a straight and ends on an arc of absolute value R. The absolute 
value of the radius of curvature goes from infinity to a value R.
trailing transition starts on a curve of absolute radius R and ends on a straight. The absolute 
value of the radius of curvature goes from infinity to a value R 
Finally the transition needs to be placed in world coordinates.
So to position the transition in world coordinates, the local transition origin (0,0) is translated to the 
position (x,y) (called the anchor point of the transition) and the transition is rotated about the 
anchor point though the angle direction (the angle is measure in a counterclockwise direction from 
the positive x axis). So the at the anchor point will be at the angle direction.
travel direction of
The absolute value of the radius decreases
going along a leading transition
positive y
positive x
transition origin (0,0)
curve of positive radius R
full transition end
with radius is R
point on the transition with
local co-ordinates (x,y)
The radius at the origin
is infinity
radius r at the point
A Leading Transition in Local Coordinates
is between infinity and R
and length of the
full transition is L
The length to the point is l
start point
end point
the transition
Spirals and Transitions

Full Leading Transition
travel direction of string
straight
transition
curve of radius +600
radius
radius of transition
anchor point
end point of transition
at end point is +600
at anchor point
length of transition from
anchor point to end point is L
angle of tangent to transition
as the angle of the straight
at the anchor point is the same
and start point of
Partial Leading Transition
travel direction of string
start point
of partial transition
anchor point
radius of transition
end point of partial transition
at end point is +600
curve of radius +600
start length of partial transition
is the length from anchor point
to the start point
full transition
is infinity
of transition
travel direction
travel direction
straight
curve of radius +600
curve of radius -600
straight
leading transition
going to the left
leading transition
going to the right
i.e.negative radius
i.e. positive radius
of transition
of transition
Spirals and Transitions
In 12d Model, a variable of type Spiral exists to define and manipulate transitions and it is used in 
the same way as variable types Points, Lines and Arcs. That is, a Spiral variable name is given after 
the Spiral declaration.
Note: the radius of curvature at a point on a transition is simply referred to as the radius at that 
point.
Defining a Transition
A 12dPL transition (Spiral) is defined by giving:
(a)
the transition type
(b)
the length of the full transition L
(c)
the radius R at length L That is, the radius at the end of the full transition. This is a signed 
radius.
(d)
the start length for the part of the full transition that is actually going to be used. - the transition 
length from the start of the 
This is enough to define the full transition in Local Transition Coordinates with origin at (0,0).
(e)
the (x,y) position of the anchor point. That is the real world co-ordinates (x,y) of what is the 
origin in local transition coordinates. It if the real world coordinates of the point on the full 
transition where the radius is infinity.
(f)
the angle of the tangent of the transition at the anchor point (the direction).
This defines where the full transition is in world coordinates.
(g)
the start length - the length of transition from the anchor point (the position on the full transition 
where the radius in infinity) to what is the first position used on the transition
(h)
the end length - the length of transition from the anchor point (the position on the transition 
where the radius in infinity) to what is final position used on the transition
travel direction of string
leading transition with positive radius
trailing transition with positive radius
travel direction
on leading
transition
travel direction on
trailing transition
The absolute value of the radius decreases
going along a leading transition
The absolute value of the radius increases
going along a trailing transition
Spirals and Transitions

This finally defines what part of the full transition is actually used.
Set_type(Spiral spiral,Integer type) 
Name
Integer Set_type(Spiral spiral,Integer type)
Description
LJG - this could have problems with changes. This is broken for V8, V9, V10
V7? depends on file Spirals.4d; type = 0 clothoid, 1 westrail cubic, 2 cubic spiral 3 natural clothoid 
(LandXML) 4 NSW cubic parabola
V9? type = 1 clothoid, 2 westrail cubic, 3 clothoid LandXML 4 Cubic spiral 5 Natural clothoid 6 Cubic 
parabola
ID = 1805
Set_leading(Spiral transition,Integer leading) 
Name
Integer Set_leading(Spiral transition,Integer leading) 
Description
Set whether transition is a leading transition (radius decreases along the transition) or a trailing 
transition (radius increases along the transition).
If leading is non-zero then it is a leading transition.
If leading is zero then it is a trailing transition.
A function return value of zero indicates that the function call was successful.
ID = 1806
Set_length(Spiral transition,Real length)
Name
Integer Set_length(Spiral transition,Real length) 
Description
Set the length of the full length transition to length.
A function return value of zero indicates that the function call was successful.
Note - the length of the transition is defined from the position on the transition where the radius is 
infinity (i.e. is a straight) to the other end of the transition.
For a leading transition, the radius is infinity at the start of the transition.
For a trailing transition, the radius is infinity at the end of the transition.
ID = 1807
Set_radius(Spiral trans,Real radius) 
Name
Integer Set_radius(Spiral trans,Real radius) 
Description
Sign of radius.
For a leading transition, set the end radius of the transition trans to radius.
For a trailing transition, set the start radius of the transition trans to radius.
Spirals and Transitions
Note - the radius is a signed value. 
      If radius > 0 the transition curves to the right.
      If radius <0, the transition curves to the left.
A function return value of zero indicates that the function call was successful.
ID = 1808
Set_direction(Spiral trans,Real angle) 
Name
Integer Set_direction(Spiral trans,Real angle) 
Description
For the end of the transition trans where the radius is infinity, set the angle of the tangent at that 
position to angle. angle is in radians and is measured in a counterclockwise direction from the 
positive x-axis.
For a leading transition, set the angle of the tangent at the start of trans to angle.
For a trailing transition, set the angle of the tangent at the end of trans to angle.
A function return value of zero indicates that the function call was successful.
ID = 1809
Set_anchor(Spiral trans,Real point) 
Name
Integer Set_anchor(Spiral trans,Real point)
Description
For the end of the transition trans where the radius is infinity, set the co-ordinates of that position to 
point.
For a leading transition, the anchor point is the start of trans.
For a trailing transition, the anchor point is the end of trans.
A function return value of zero indicates that the function call was successful.
ID = 1810
Set_start_length(Spiral trans,Real start_length) 
Name
Integer Set_start_length(Spiral trans,Real start_length) 
Description
Set the start length of the transition trans to start_length.
A function return value of zero indicates that the function call was successful.
Note - the start length is the distance from the position on the full transition where the radius is 
infinity (anchor point) to the start of the transition. If the start_length is non-zero then it is not a full 
transition but a partial transition.
ID = 1811
Set_end_length(Spiral trans,Real length) 
Name
Spirals and Transitions

Integer Set_end_length(Spiral trans,Real end_length) 
Description
Set the end length of the transition trans to end_length.
The end length is the distance from the position on the full transition where the radius is infinity to 
the point on the transition where no more of the transition is used.
A function return value of zero indicates that the function call was successful.
Note: even through the full transition has a length of L say, the part of the transition that is actually 
used is only from the start length to the end length.
ID = 1812
Set_start_height(Spiral trans,Real height) 
Name
Integer Set_start_height(Spiral trans,Real height) 
Description
For the transition trans, set the z-value at the position start length along the transition to height.
A function return value of zero indicates that the function call was successful.
ID = 1813
Set_end_height(Spiral trans,Real height) 
Name
Integer Set_end_height(Spiral trans,Real height) 
Description
For the transition trans, set the z-value at the position end length along the transition to height.
A function return value of zero indicates that the function call was successful.
ID = 1814
Get_valid(Spiral trans) 
Name
Integer Get_valid(Spiral trans) 
Description
If trans is a valid transition, then the function return value is zero.
If trans is not a valid transition, then the function return value is non-zero.
Note - the parameters given to define the transition may be inconsistent and not be able to define an 
actual transition.
ID = 1815
Get_type(Spiral trans) 
Name
Integer Get_type(Spiral trans)
Spirals and Transitions
Description
The list of possible return value is:
1 for Clothoid MR
2 for Westrail Cubic Clothoid
3 for Cubic Spiral
4 for Natural Clothoid
5 for Cubic Parabola
6 for Taper
7 for Bloss
8 for Sinusoidal
9 for Cosinusoidal
10 for Ellipse
11 for Parabola
12 for Hyperbola
13 for Sin Half Diminish
0 or 14 for unknown type
ID = 1816
Get_leading(Spiral trans) 
Name
Integer Get_leading(Spiral trans) 
Description
A transition is a leading transition if the radius decreases along the transition, or a trailing transition 
if the radius increases along the transition.
If trans is a leading transition then return a non-zero function return value.
If trans is a trailing transition then return zero as the function return value.
ID = 1817
Get_length(Spiral trans)
Name
Real Get_length(Spiral trans) 
Description
For the full transition of trans, return the length to the end of the full transition as the function return 
value.
ID = 1818
Get_radius(Spiral trans) 
Name
Real Get_radius(Spiral trans) 
Description
Spirals and Transitions

For a leading transition trans, get the radius at the end of the full transition and return it as the 
function return value.
For a trailing transition trans, get the radius at the start of the full transition and return it as the 
function return value.
ID = 1819
Get_direction(Spiral trans) 
Name
Real Get_direction(Spiral trans) 
Description
Get the angle of the tangent at the anchor point (the end of the transition trans where the radius is 
infinity), and return it as the function return value.
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
For a leading transition trans, it is the angle of the tangent at the start of the full transition.
For a trailing transition trans, it is the angle of the tangent at the end of the full transition.
ID = 1820
Get_anchor(Spiral trans)
Name
Point Get_anchor(Spiral trans)
Description
Get the co-ordinates of the anchor point (the end of the full transition where the radius is infinity), 
and return them as the function return value.
For a leading transition trans, the anchor point is the start of the full transition.
For a trailing transition trans, the anchor point is the end of the full transition.
ID = 1821
Get_start_length(Spiral trans) 
Name
Real Get_start_length(Spiral trans) 
Description
Get the start length of the transition trans and return it as the function return value.
ID = 1822
Get_end_length(Spiral trans) 
Name
Real Get_end_length(Spiral trans) 
Description
Get the end length of the transition trans and return it as the function return value.
ID = 1823
Spirals and Transitions
Get_start_height(Spiral trans)
Name
Real Get_start_height(Spiral trans)
Description
For the transition trans, get the height at the position start length along the transition and return it 
as the function return value.
ID = 1824
Get_end_height(Spiral trans) 
Name
Real Get_end_height(Spiral trans)
Description
For the transition trans, get the height at the position end length along the transition and return it as 
the function return value.
ID = 1825
Get_start_point(Spiral trans) 
Name
Point Get_start_point(Spiral trans) 
Description
For the transition trans, get the Point at the position start length along the transition and return it as 
the function return value.
ID = 1826
Get_end_point(Spiral trans)
Name
Point Get_end_point(Spiral trans) 
Description
For the transition trans, get the Point at the position end length along the transition and return it as 
the function return value.
 ID = 1827
Get_local_point(Spiral trans,Real len) 
Name
Point Get_local_point(Spiral trans,Real len) 
Description
For the transition trans, get the local co-ordinates (as a Point) of the position at length len from the 
start of the full transition and return it as the function return value.
Note - the transition is in world coordinates and needs to be translated and rotated before getting 
the local coordinates of the position at length len along the transition.
ID = 1828
Spirals and Transitions

Get_point(Spiral trans,Real len) 
Name
Point Get_point(Spiral trans,Real len) 
Description
For the transition trans, get the co-ordinates of the position (as a Point) at length len from the start 
of the full transition, and return it as the function return value.
ID = 1829
Get_local_angle(Spiral trans,Real len) 
Name
Real Get_local_angle(Spiral trans,Real len) 
Description
For the transition trans, get the local angle of the tangent at the position at length len from the start 
of the full transition, and return it as the function return value.
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
Note - the transition is in world coordinates and needs to be translated and rotated before getting 
the angle of the tangent of the position at length len along the transition.
ID = 1830
Get_angle(Spiral trans,Real len)
Name
Real Get_angle(Spiral trans,Real len) 
Description
For the transition trans, get the angle of the tangent of the position at length len from the start of the 
full transition, and return it as the function return value.
angle is in radians and is measured in a counterclockwise direction from the positive x-axis.
 ID = 1831
Get_radius(Spiral trans,Real len) 
Name
Real Get_radius(Spiral trans,Real len) 
Description
For the transition trans, get the radius at the position at length len from the start of the full 
transition, and return it as the function return value.
ID = 1832
Get_shift_x(Spiral trans) 
Name
Real Get_shift_x(Spiral trans)
Spirals and Transitions
Description
shift at end point of transition trans (what is x/y which is offset, which is along tangent)
ID = 1833
Get_shift_y(Spiral trans) 
Name
Real Get_shift_y(Spiral trans) 
Description
shift at end point of transition trans
ID = 1834
Get_shift(Spiral trans) 
Name
Real Get_shift(Spiral trans)
Description
shift
ID = 1835
Reverse(Spiral trans) 
Name
Spiral Reverse(Spiral trans)
Description
Create a Spiral that is the same as transition trans but has the reverse travel direction. The created 
transition is returned as the function return value.
So a leading transition becomes a trailing transition and a trailing transition becomes a leading 
transition.
The unary operator "-" will also reverse a Spiral.
The function return value is the reversed Spiral.
ID = 1803
Parabolas

5.24 Parabolas
Parabolas are used in the vertical geometry of an Alignment or Super Alignment. The vertical 
geometry is defined in the (chainage, height) plane and are placed on vertical intersection points. So 
the parabola is defined in the (chainage, height) plane.
In 12dPL, a Parabola is a construction entity and is not stored in 12d Model models.
A Parabola is defined by a start point, an intersection point and end point. The start point to the 
intersection point, and the intersection point to the end point define the start grade and the end 
grade of the parabola.
The parabola is then finally defined by giving the chainage distance between the beginning of the 
parabola and the end of the parabola. This is called the length of the parabola.
Start Point
End Point
Intersection Point
Chainage
Height
length
Start of Parabola
End of Parabola
Parabola
Segments
5.25 Segments
A Segment is either a Point, Line, Arc or a Spiral.
A Segment has a unique type that specifies whether it is a Point, Line, Arc or a Spiral.
Note: a Spiral is a general transition, not just a clothoid spiral.
Get_type(Segment segment)
Name
Integer Get_type(Segment segment)
Description
Get the type of the Segment segment.
A Segment type of
1
denotes a Point
2
denotes a Line
3
denotes an Arc
4
denotes a Spiral
The function return value is the Segment type.
ID = 273
Get_point(Segment segment,Point &point)
Name
Integer Get_point(Segment segment,Point &point)
Description
If the Segment is of type 1, the Point of the Segment is returned as point, otherwise it is an error.
A function return value of zero indicates the Segment was a Point Segment and that the Point was 
returned successfully.
ID = 274
Get_line(Segment segment,Line &line)
Name
Integer Get_line(Segment segment,Line &line)
Description
If the Segment is of type 2, the Line of the Segment is returned as line, otherwise it is an error.
A function return value of zero indicates the Segment was a Line Segment and that the Line was 
returned successfully.
ID = 275
Get_arc(Segment segment,Arc &arc)
Name
Integer Get_arc(Segment segment,Arc &arc)
Description
Segments

If the Segment is of type 3, the Arc of the Segment is returned as arc, otherwise it is an error.
A function return value of zero indicates the Segment was an Arc Segment and that the Arc was 
returned successfully.
ID = 276
Get_spiral(Segment segment,Spiral &trans) 
Name
Integer Get_spiral(Segment segment,Spiral &trans) 
Description
If the Segment is of type 4, the Spiral of the Segment is returned as transition trans, otherwise it is 
an error.
A function return value of zero indicates the Segment was an Spiral Segment and that the Spiral 
was returned successfully.
ID = 1837
Get_start(Segment segment,Point &point)
Name
Integer Get_start(Segment segment,Point &point)
Description
Get the start Point of the Segment segment.
The start value is returned by Point point.
A function return value of zero indicates the start point was successfully returned.
ID = 550
Get_end(Segment segment,Point &point)
Name
Integer Get_end(Segment segment,Point &point)
Description
Get the end Point of the Segment segment.
The end value is returned by Point point.
A function return value of zero indicates the end point was successfully returned.
ID = 551
Set_point(Segment &segment,Point point)
Name
Integer Set_point(Segment &segment,Point point)
Description
Sets the Segment type to 1 and the Point of the Segment to point.
A function return value of zero indicates the Segment was successfully set.
ID = 277
Segments
Set_line(Segment &segment,Line line)
Name
Integer Set_line(Segment &segment,Line line)
Description
Sets the Segment type to 2 and the Line of the Segment to line.
A function return value of zero indicates the Segment was successfully set.
ID = 278
Set_arc(Segment &segment,Arc arc)
Name
Integer Set_arc(Segment &segment,Arc arc)
Description
Sets the Segment type to 3 and the Arc of the Segment to arc.
A function return value of zero indicates the Segment was successfully set.
ID = 279
Set_spiral(Segment &segment,Spiral trans) 
Name
Integer Set_spiral(Segment &segment,Spiral trans) 
Description
Sets the Segment type to 4 and the Spiral of the Segment to transition trans.
A function return value of zero indicates the Segment was successfully set.
ID = 1836
Get_curve(Segment segment,Curve &curve)
Name
Integer Get_curve(Segment segment,Curve &curve)
Description
If the Segment is of type 6, the Curve of the Segment is returned as curve, otherwise it is an error.
A function return value of zero indicates the Segment was a Curve Segment and that the Curve was 
returned successfully.
ID = 2838
Set_curve(Segment &segment,Curve curve)
Name
Integer Set_curve(Segment &segment,Curve curve)
Description
Segments

Sets the Segment type to 6 and the Curve of the Segment to curve.
A function return value of zero indicates the Segment was successfully set.
ID = 2839
Set_start(Segment &segment,Point point)
Name
Integer Set_start(Segment &segment,Point point)
Description
Set the start Point of the Segment segment.
The start value is defined by Point point.
A function return value of zero indicates the start point was successfully set.
ID = 552
Set_end(Segment &segment,Point point)
Name
Integer Set_end(Segment &segment,Point point)
Description
Set the end Point of the Segment segment.
The end value is defined by Point point.
A function return value of zero indicates the end point was successfully set.
ID = 553
Reverse(Segment segment)
Name
Segment Reverse(Segment segment)
Description
Reverse the direction of the Segment segment.
Note that the reverse of a segment of type 1 (a Point segment) is simply a point of exactly the same 
co-ordinates.
The unary operator "-" will also reverse a Segment.
The function return value is the reversed Segment.
ID = 280
Get_segments(Element elt,Integer &nsegs)
Name
Integer Get_segments(Element elt,Integer &nsegs)
Description
Get the number of segments for a string Element elt.
The number of segments is returned as nsegs
A function return value of zero indicates the data was successfully returned.
Segments
Note
If a string is open and has n points, then it has n-1 segments.
If a string is closed it has the same number of points and segments.
If a string is closed and has n points, then it also has n segments.
That is, If a string is closed it has the same number of points and segments.
For example, a seven point open string has six segments.
A seven point closed string has seven segments.
ID = 545
Get_segment(Element elt,Integer i,Segment &seg)
Name
Integer Get_segment(Element elt,Integer i,Segment &seg)
Description
Get the segment for the ith segment on the string.
The segment is returned as seg.
The types of segments returned are Line, or Arc.
A function return value of zero indicates the data was successfully returned.
ID = 546
Curve

5.26 Curve
Set_type(Curve curve,Integer type)
Name
Integer Set_type(Curve curve,Integer type)
Description
Set the type of the Curve curve to the Integer type.
A return value of zero indicates the function call was successful.
The list of values for valid type:
1 Clothoid
2 Westrail Cubic Clothoid
3 Cubic Spiral
4 Natural Clothoid
5 Cubic Parabola
7 Bloss
8 Sinusoidal
9 Cosinusoidal
ID = 2817
Get_type(Curve curve)
Name
Integer Get_type(Curve curve)
Description
Return the type of the Curve curve as an Integer.
The list of values for valid type:
1 Clothoid
2 Westrail Cubic Clothoid
3 Cubic Spiral
4 Natural Clothoid
5 Cubic Parabola
7 Bloss
8 Sinusoidal
9 Cosinusoidal
ID = 2827
Set_leading(Curve curve,Integer leading)
Name
Integer Set_leading(Curve curve,Integer leading)
Curve
Description
Set whether curve is a leading Curve (radius decreases along the curve) or trailing curve (radius 
increases along the curve).
If leading is non-zero then it is a leading curve.
If leading is zero then it is a trailing curve.
A return value of zero indicates the function call was successful.
ID = 2818
Get_leading(Curve curve)
Name
Integer Get_leading(Curve curve)
Description
A Curve is a leading if the radius decreases along the curve or trailing if the radius increases along 
the curve.
If curve is a leading then the function returns one.
If curve is trailing then the function returns zero.
ID = 2828
Set_start_length(Curve curve,Real length)
Name
Integer Set_start_length(Curve curve,Real length)
Description
Set the start length of the Curve curve to the Real length.
A return value of zero indicates the function call was successful.
ID = 2819
Real Get_start_length(Curve curve)
Name
Real Get_start_length(Curve curve)
Description
Get the start length of Curve curve and return it as the function return value.
ID = 2842
Set_end_length(Curve curve,Real length)
Name
Integer Set_end_length(Curve curve,Real length)
Description
Set the end length of the Curve curve to the Real length.
A return value of zero indicates the function call was successful.
ID = 2820
Curve

Real Get_end_length(Curve curve)
Name
Real Get_end_length(Curve curve)
Description
Get the end length of Curve curve and return it as the function return value.
ID = 2843
Set_direction(Curve curve,Real angle)
Name
Integer Set_direction(Curve curve,Real angle)
Description
For the end of the Curve curve where the radius is infinity, set the angle of the tangent at that 
position to angle.
The Real angle is in radians and is measured in a counterclockwise direction from the positive x-
axis.
For a leading curve, set the angle of the tangent at the start of curve to angle.
For a trailing curve, set the angle of the tangent at the end of curve to angle.
A function return value of zero indicates that the function call was successful.
ID = 2821
Real Get_direction(Curve curve)
Name
Real Get_direction(Curve curve)
Description
Get the angle of the tangent at the anchor point (the end of the Curve curve where the radius is 
infinity), and return it as the function return value.
The returned angle is in radians and is measured in a counterclockwise direction from the positive x-
axis.
For a leading Curve curve, it is the angle of the tangent at the start of the full curve.
For a trailing Curve curve, it is the angle of the tangent at the end of the full curve.
ID = 2831
Set_anchor(Curve curve,Point point)
Name
Integer Set_anchor(Curve curve,Point point)
Description
For the end of the Curve curve where the radius is infinity, set the co-ordinates of that position to 
point.
For a leading transition, the anchor point is the start of curve.
For a trailing transition, the anchor point is the end of curve.
Curve
A function return value of zero indicates that the function call was successful.
ID = 2822
Point Get_anchor(Curve curve)
Name
Point Get_anchor(Curve curve)
Description
Get the coordinates the anchor point (the end of the Curve curve where the radius is infinity), and 
return it as the function return value.
For a leading Curve curve, it is the anchor point is the start of the full curve.
For a trailing Curve curve, it is the anchor point is the end of the full curve.
ID = 2832
Set_start_height(Curve curve,Real height)
Name
Integer Set_start_height(Curve curve,Real height)
Description
For the Curve curve, set the z-value at the position start length along the curve to height.
A function return value of zero indicates that the function call was successful.
ID = 2823
Set_end_height(Curve curve,Real height)
Name
Integer Set_end_height(Curve curve,Real height)
Description
For the Curve curve, set the z-value at the position end length along the curve to height.
A function return value of zero indicates that the function call was successful.
ID = 2824
Set_offset(Curve curve,Real offset)
Name
Integer Set_offset(Curve curve,Real offset)
Description
Set the offset of the Curve curve to the Real offset.
A return value of zero indicates the function call was successful.
ID = 2825
Real Get_offset(Curve curve)
Name
Curve

Real Get_offset(Curve curve)
Description
Return the offset of the Curve curve.
ID = 2836
Get_valid(Curve curve)
Name
Integer Get_valid(Curve curve)
Description
If curve is a valid Curve, then the function return value is one.
If curve is not a valid Curve, then the function return value is zero.
ID = 2826
Point Get_start_point(Curve curve)
Name
Point Get_start_point(Curve curve)
Description
Return the start point of the Curve curve.
ID = 2829
Point Get_end_point(Curve curve)
Name
Point Get_end_point(Curve curve)
Description
Return the end point of the Curve curve.
ID = 2830
Point Get_point(Curve curve,Real l)
Name
Point Get_point(Curve curve,Real l)
Description
For the Curve curve, get the co-ordinates of the position (as a Point) at length l from the start of the 
full curve, and return it as the function return value.
ID = 2833
Real Get_angle(Curve curve,Real l)
Name
Real Get_angle(Curve curve,Real l)
Description
Curve
For the Curve curve, get the angle of the tangent of the position at length l from the start of the full 
curve, and return it as the function return value.
The returned angle is in radians and is measured in a counterclockwise direction from the positive x-
axis.
ID = 2834
Real Get_radius(Curve curve,Real l)
Name
Real Get_radius(Curve curve,Real l)
Description
For the Curve curve, get the radius at the position at length l from the start of the full curve, and 
return it as the function return value.
ID = 2835
Real Get_mvalue(Curve curve)
Name
Real Get_mvalue(Curve curve)
Description
Return the m-value of the Curve curve.
Only use when the type of the curve is cubic parabola; m-value is used in the curve equation "y = 
m*x*x*x". 
ID = 2837
Real Get_length(Curve curve)
Name
Real Get_length(Curve curve)
Description
For the full Curve of curve, return the length to the end of the full curve as the function return value.
ID = 2840
Real Get_end_length(Curve curve)
Name
Real Get_end_length(Curve curve)
Description
Get the end length of Curve curve and return it as the function return value.
ID = 2843
Real Get_radius(Curve curve)
Name
Real Get_radius(Curve curve)
Curve

Description
For a leading Curve curve, get the radius at the end of the full curve and return it as the function 
return value.
For a trailing Curve curve, get the radius at the start of the full curve and return it as the function 
return value.
ID = 2841
Real Get_shift_x(Curve curve)
Name
Real Get_shift_x(Curve curve)
Description
Get the shift x of Curve curve and return it as the function return value.
The x in "shift x" indicates the direction of the tangent at the start of the full curve. The shift x of a 
curve is the projected distance from the start point of the of the end point in the "x" direction of the 
curve. 
ID = 2844
Real Get_shift_y(Curve curve)
Name
Real Get_shift_y(Curve curve)
Description
Get the shift y of Curve curve and return it as the function return value.
The y in "shift y" indicates the direction perpendicular to the tangent at the start of the full curve. The 
shift y of a curve is the projected distance from the start point of the of the end point in the "y" 
direction of the curve. 
ID = 2845
Real Get_shift(Curve curve)
Name
Real Get_shift(Curve curve)
Description
Get the shift of Curve curve and return it as the function return value.
The shift of a curve is the distance from the tangent at the start of the full curve to the circle at the 
end of the full curve. 
ID = 2846
Reverse(Curve curve)
Name
Curve Reverse(Curve curve)
Description
Return the reverse Curve of the input Curve curve.
Curve
ID = 2815
Segment Geometry

5.27 Segment Geometry
5.27.1 Length and Area
Get_length(Segment segment,Real &length)
Name
Integer Get_length(Segment segment,Real &length)
Description
Get the plan length of the Segment segment.
A function return value of zero indicates the plan length was successfully returned.
ID = 361
Get_length_3d(Segment segment,Real &length)
Name
Integer Get_length_3d(Segment segment,Real &length)
Description
Get the 3d length of the Segment segment.
A function return value of zero indicates the 3d length was successfully returned.
ID = 362
Plan_area(Segment segment,Real &plan_area)
Name
Integer Plan_area(Segment segment,Real &plan_area)
Description
Calculate the plan area of the Segment segment. For an Arc, the plan area of the sector is returned. 
For a Line and a Point, zero area is returned.
The area is returned in the Real plan_area.
A function return value of zero indicates the plan area was successfully returned.
ID = 360
Segment Geometry
5.27.2 Parallel
The parallel command is a plan parallel and is used for Lines, Arcs and Segments.
The sign of the distance to parallel the object is used to indicate whether the object is parallelled to 
the left or to the right.
A positive distance means to parallel the object to the right.
A negative distance means to parallel the object to the left.
Parallel(Line line,Real distance,Line &parallelled)
Name
Integer Parallel(Line line,Real distance,Line &parallelled)
Description
Plan parallel the Line line by the distance distance.
The parallelled Line is returned as the Line parallelled. The z-values are not modified, i.e. they are 
the same as for line.
A function return value of zero indicates the parallel was successful.
ID = 284
Parallel(Arc arc,Real distance,Arc &parallelled)
Name
Integer Parallel(Arc arc,Real distance,Arc &parallelled)
Description
Plan parallel the Arc arc by the distance distance.
The parallelled Arc is returned as the Arc parallelled. The z-values are not modified, i.e. they are 
the same as for arc.
A function return value of zero indicates the parallel was successful.
ID = 285
Parallel(Segment segment,Real dist,Segment &parallelled)
Name
Integer Parallel(Segment segment,Real dist,Segment &parallelled)
Description
Plan parallel the Segment segment by the distance dist.
The parallelled Segment is returned as the Segment parallelled. The z-values are not modified, i.e. 
they are the same as for segment.
If the Segment is of type Point, a Segment is not returned and the function return value is set to non-
zero.
A function return value of zero indicates the parallel was successful.
ID = 286
Fit Arcs (fillets)
Segment Geometry

Fitarc(Point pt_1,Point pt_2,Point pt_3,Arc &fillet)
Name
Integer Fitarc(Point pt_1,Point pt_2,Point pt_3,Arc &fillet)
Description
Fit a plan arc through the (x,y) co-ordinates of the three Points pt_1, pt_2 and pt_3.
The arc is returned as Arc fillet and the z-values of its start and end points are zero.
A function return value of zero indicates success.
A non-zero return value indicates no arc exists.
ID = 289
Fitarc(Segment seg_1,Segment seg_2,Real rad,Point cpt,Arc &fillet)
Name
Integer Fitarc(Segment seg_1,Segment seg_2,Real rad,Point cpt,Arc &fillet)
Description
Create an plan arc from Segment seg_1 to Segment seg_2 with radius rad.
The arc start point is on the extended Segment seg_1 with start direction the same as the direction 
of seg_1.
The arc end point is on the extended Segment seg_2 with end direction the same as the direction of 
seg_1.
If more than one arc satisfies the above conditions, then the arc with centre closest to the Point cpt 
will be selected.
The arc is returned as Arc fillet and the z-values of its start and end points are zero.
A function return value of zero indicates an arc exists.
A non-zero return value indicates no arc exists.
ID = 287
Fitarc(Segment seg_1,Segment seg_2,Point start_tp,Arc &fillet)
Name
Integer Fitarc(Segment seg_1,Segment seg_2,Point start_tp,Arc &fillet)
Description
Create a plan arc from Segment seg_1 to Segment seg_2.
The arc start point is the perpendicular projection of the Point start_tp onto the extended Segment 
seg_1. The start direction of the arc is the same as the direction of seg_1.
The arc end point is be on the extended Segment seg_2 with end direction the same as the 
direction of seg_1.
There is at most one arc that satisfies the above conditions.
The arc is returned as Arc fillet and the z-values of its start and end points are zero.
A function return value of zero indicates success.
A non-zero return value indicates no arc exists.
ID = 288
Segment Geometry
5.27.3 Tangents
Tangent(Segment seg_1,Segment seg_2,Line &line)
Name
Integer Tangent(Segment seg_1,Segment seg_2,Line &line)
Description
Create the plan tangent line from the extended Segment seg_1 to the extended Segment set_2.
The direction of the Segments seg_1 and seg_2 is used to select a unique tangent line.
The tangent line is returned as the Line line with z-values of zero.
A function return value of zero indicates there were no errors in the calculations.
ID = 290
Segment Geometry

5.27.4 Intersections
Intersect(Segment seg_1,Segment seg_2,Integer &no_intersects,Point &p1,Point &p2)
Name
Integer Intersect(Segment seg_1,Segment seg_2,Integer &no_intersects,Point &p1,Point &p2)
Description
Find the internal intersection between the Segments seg_1 and seg_2. That is, only find the 
intersections of the two Segments that occur between the start and end points of the Segments.
The number of intersections is given by no_intersects and the possible intersections are given in 
Points p1 and p2. The z-values of p1 and p2 are set to zero.
There may be zero, one or two intersection points.
A function return value of zero indicates there were no errors in the calculations.
ID = 291
Intersect_extended(Segment seg_1,Segment seg_2,Integer &no_intersects,Point 
&p1,Point &p2)
Name
Integer Intersect_extended(Segment seg_1,Segment seg_2,Integer &no_intersects,Point &p1,Point &p2)
Description
Find the intersection between the extended Segments seg_1 and seg_2.
The number of intersections is given by no_intersects and the possible intersections are given in 
Points p1 and p2. The z-values of p1 and p2 are set to zero.
There may be zero, one or two intersection points.
A function return value of zero indicates there were no errors in the calculations.
ID = 303
Line_cut_string(Real px,Real py,Real dir,Real cut_lim,Element string,Real &cx,Real 
&cy,Real &cz)
Name
Integer Line_cut_string(Real px,Real py,Real dir,Real cut_lim,Element string,Real &cx,Real &cy,Real &cz)
Description
Find the first intersection between the line starting at px,py,pz in the direction dir within the cut limit 
cut_lim to the Element string.
The x y z cooridnate of the cut is returned in cx cy cz.
A function return value of zero indicates success.
ID = 7623
Line_cut_trimesh_named_edges(Real px,Real py,Real dir,Real cut_lim,Text 
edge_name,Element trimesh,Real &cx,Real &cy,Real &cz,Text &error_msg)
Name
Integer Line_cut_trimesh_named_edges(Real px,Real py,Real dir,Real cut_lim,Text edge_name,Element 
Segment Geometry
trimesh,Real &cx,Real &cy,Real &cz,Text &error_msg)
Description
Find the first intersection between the line starting at px,py,pz in the direction dir within the cut limit 
cut_lim to an egde of given name edge_name of a trimesh Element trimesh.
The x y z cooridnate of the cut is returned in cx cy cz.
Some warning and error message would be set to the Text error_msg.
A function return value of zero indicates success.
ID = 7624
Segment Geometry

5.27.5 Offset Intersections
Offset_intersect(Segment seg_1,Real off_1,Segment seg_2,Real off_2,Integer 
&no_intersects,Point &p1,Point &p2)
Name
Integer Offset_intersect(Segment seg_1,Real off_1,Segment seg_2,Real off_2,Integer &no_intersects,Point 
&p1,Point &p2)
Description
Find the internal intersection between the Segments seg_1 and seg_2 that have been 
perpendicularly offset by the amounts off_1 and off_2 respectively.
The number of intersections is given by no_intersects and the possible intersections are given in 
Points p1 and p2. 
The z-values of p1 and p2 are set to zero.
There may be zero, one or two intersection points.
A function return value of zero indicates there were no errors in the calculations.
ID = 292
Offset_intersect_extended(Segment seg_1,Real off_1,Segment seg_2,Real 
off_2,Integer &no_intersects,Point &p1,Point &p2)
Name
Integer Offset_intersect_extended(Segment seg_1,Real off_1,Segment seg_2,Real off_2,Integer 
&no_intersects,Point &p1,Point &p2)
Description
Find the intersection between the extended Segments seg_1 and seg_2 that have been 
perpendicularly offset by the amounts off_1 and off_2 respectively.
The number of intersections is given by no_intersects and the possible intersections are given in 
Points p1 and p2. The z-values of p1 and p2 are set to zero.
There may be zero, one or two intersection points.
A function return value of zero indicates there were no errors in the calculations.
ID = 304
Segment Geometry
5.27.6 Angle Intersect
Angle_intersect(Point pt_1,Real ang_1,Point pt_2, Real ang_2,Point &p)
Name
Integer Angle_intersect(Point pt_1,Real ang_1,Point pt_2,Real ang_2,Point &p)
Description
Find the point of intersection of the line going through the Point pt_1 with angle ang_1 and the line 
going through the Point pt_2 with angle ang_2.
The intersection point is returned as Point p. The z-values of p1 and p2 are set to zero.
A function return value of zero indicates that the two lines intersect.
A function return value of zero indicates there were no errors in the calculations.
ID = 293
Segment Geometry

5.27.7 Distance
Get_distance(Point p1,Point p2)
Name
Real Get_distance(Point p1,Point p2)
Description
Calculate the plan distance between the Points p1 and p2.
The function return value is the plan distance.
ID = 297
Get_distance_3d(Point p1,Point p2)
Name
Real Get_distance_3d(Point p1,Point p2)
Description
Calculate the 3d distance between the Points p1 and p2.
The function return value is the 3d distance.
ID = 363
Get_distance(Real x1,Real y1,Real x2,Real y2)
Name
Real Get_distance(Real x1,Real y1,Real x2,Real y2)
Description
Calculate the plane distance between the two points with x-y coordinates x1,y1 and x2,y2.
The function return value is the plan distance.
ID = 7695
Get_distance(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2)
Name
Real Get_distance(Real x1,Real y1,Real z1,Real x2,Real y2,Real z2)
Description
Calculate the 3d distance between the two points with x-y-z coordinates x1,y1,z1 and x2,y2,z2.
The function return value is the 3d distance.
ID = 7696
Segment Geometry
5.27.8 Locate Point
Locate_point(Point from,Real ang,Real dist,Point &to)
Name
Integer Locate_point(Point from,Real ang,Real dist,Point &to)
Description
Create the Point to which is a plan distance dist along the line of angle ang which goes through the 
Point from. The z-value of to is the same as the z-value of from.
A function return value of zero indicates there were no errors in the calculations.
ID = 298
Segment Geometry

5.27.9 Drop Point
Drop_point(Segment segment,Point pt_to_drop,Point &dropped_pt)
Name
Integer Drop_point(Segment segment,Point pt_to_drop,Point &dropped_pt)
Description
Drop a Point pt_to_drop perpendicularly in plan onto the Segment segment.
The position of the dropped point on the Segment in returned in the Point dropped_pt.
If the point cannot be dropped perpendicularly onto the Segment, then the point is dropped onto the 
closest end point of the Segment. A z-value for dropped_pt is created by interpolation.
A function return value of zero indicates the point was dropped successfully.
ID = 299
Drop_point(Segment segment,Point pt_to_drop,Point &dropped_pt,Real &dist)
Name
Integer Drop_point(Segment segment,Point pt_to_drop,Point &dropped_pt,Real &dist)
Description
Drop a Point pt_to_drop onto the Segment segment.
The position of the dropped point on the Segment in returned in the Point dropped_pt.
The plan distance from pt_to_drop to dropped_pt is returned as dist.
If the point cannot be dropped perpendicularly onto the Segment, then the point is dropped onto the 
closest end point of the Segment. A z-value for dropped_pt is created by interpolation.
A function return value of zero indicates the point was dropped successfully.
ID = 306
Segment Geometry
5.27.10 Projection
Projection(Segment segment,Real dist,Point &projected_pt)
Name
Integer Projection(Segment segment,Real dist,Point &projected_pt)
Description
Create the Point projected_pt that is a plan distance of dist along from the start of the extended 
Segment segment.
The z-value for projected_pt is calculated by linear interpolation. Note that for an Arc, the z-
value is interpolated for one full circuit of the arc beginning at the start point and the one circuit is 
used for z-values for distances greater than the length of one circuit.
A function return value of zero indicates the projection was successful.
ID = 300
Projection(Segment segment,Point start_point, Real dist,Point &projected_pt)
Name
Integer Projection(Segment segment,Point start_point,Real dist,Point &projected_pt)
Description
Create the Point projected_pt that is a plan distance of dist along the extended Segment segment 
where distance is measured from the Point start_point.
If start_point does not lie on the extended Segment, then start_point is automatically dropped 
onto the extended Segment to create the start point for distance measurement.
The z-value for projected_pt is calculated by linear interpolation. Note that for an Arc, the z-
value is interpolated for one full circuit of the arc beginning at the start point and the one circuit is 
used for z-values for distances greater than the length of one circuit.
A function return value of zero indicates the projection was successful.
ID = 301
Segment Geometry

5.27.11 Change Of Angles
Change_of_angle(Real x1,Real y1,Real x2,Real y2,Real x3,Real y3,Real &angle)
Name
Integer Change_of_angle(Real x1,Real y1,Real x2,Real y2,Real x3,Real y3,Real &angle)
Description
Calculate the deflection angle between the directed line going from (x1,y1) to (x2,y2) and the 
directed line going from (x2,x2) and (x3,y3) where the deflection angle is measured in radians and in 
a CLOCKWISE direction. The deflection angle is returned in angle.
The use of clockwise fits in with the definition of travelling along a road where going to the right is 
considered positive and going to the left is considered negative.
WARNING: This is not the normal mathematical angle between the two vectors which is measured 
in the counter clockwise direction and would be the negative of this value.
A function return value of zero indicates the angle was returned successfully.
ID = 656
Change_of_angle(Line L1,Line L2,Real &angle)
Name
Integer Change_of_angle(Line L1,Line L2,Real &angle)
Description
Calculate the deflection angle between the line L1 and the line L2 where the deflection angle is 
measured in radians and in a CLOCKWISE direction. The deflection angle is returned in angle.
The use of clockwise fits in with the definition of travelling along a road where going to the right is 
considered positive and going to the left is considered negative.
WARNING: This is not the normal mathematical angle between the two vectors which is measured 
in the counter clockwise direction and would be the negative of this value.
A function return value of zero indicates the angle was returned successfully.
ID = 657
(x1,y1)
(x3,y3)
(x2,y2)
deflection angle
directed line from
x1,y1) to (x2,y2)
directed line from
(x2,y2) to (x3,y3)
deflection angle
line L1
line L2
start of line L1
end of line L2
end of line L1
start of line L2
Segment Geometry