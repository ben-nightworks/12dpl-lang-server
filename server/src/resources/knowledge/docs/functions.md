> Source: *12d Model Macro Programming Manual* — Chapter 3 (pages 58–71)

# 12dPL Functions

User-defined functions, prototypes, overloading, recursion, pass-by-value/reference, arrays as arguments, and scoping rules.

## Contents
- 3.1 Functions
- 3.2 Main Function
- 3.3 User Defined Functions
- 3.4 Return Statement
- 3.5 Array Variables as Function Arguments
- 3.6 Function Prototypes
- 3.7 Automatic Promotions
- 3.8 Passing by Value or by Reference
- 3.9 Overloading of Function Names
- 3.10 Recursion
- 3.11 Assignments Within Function Arguments
- 3.12 Blocks and Scopes

---

Page 57
Functions
3  Functions
See 3.1 Functions
See 3.2 Main Function
See 3.3 User Defined Functions
See 3.6 Function Prototypes
See 3.7 Automatic Promotions
See 3.8 Passing by Value or by Reference
See 3.9 Overloading of Function Names
See 3.10 Recursion
See 3.11 Assignments Within Function Arguments
See 3.12 Blocks and Scopes
3.1 Functions
Functions can be used to break large computing tasks into smaller ones and allow users to build on 
software that already exists.
Basically a program is just a set of definitions of variables and functions. Communication between 
the functions is by function arguments, by values returned by the functions, and through global 
variables (see the section 3.12 Blocks and Scopes).
The 12dPL program file must contain a starting function called main as well as zero or more user 
defined functions. 
User defined functions must occur in the file before they are used in the program file unless a 
Function Prototype is included before the function is used. If this occurs then the user defined 
function can be defined anywhere in the file. See 3.6 Function Prototypes.
The syntax for user defined functions will be described in the following sections. See 3.3 User 
Defined Functions.
A large number of functions are supplied with 12dPL to make tasks easier for the program writer. 
These 12dPL supplied functions are predefined and nothing special is needed to use them. The 
12dPL supplied functions will all be defined later in the manual.
In 12dPL, function names must start with an alphabetic character and can consist of upper and/or 
lower case alphabetic characters, numbers and underscores (_). 
There is no restriction on the length of function names. Function names cannot be the same as any 
of the 12dPL keywords or variable names in the program.
12dPL function names are case sensitive.
Note
All 12dPL supplied functions begin with a capital letter to help avoid clashes with any user variable 
names.
Main Function

3.2 Main Function
A 12dPL program must contain a special function called main. This function is the designated start 
of the program.
The main function is simply a header void main () followed by the actual program code enclosed 
between a start brace { and an end brace }.
Hence the function called main is a header followed by a block of code:
  void  main ()
         {
             declarations and statements
             i.e. program code
         }
When a program is run, the entry point to the program file is at the beginning of the function called 
main.
Hence every program file must have one and only one function called main.
The function main is terminated when either
(a)
the last line of code in the function is run
or
(b)
a return statement
      return;
is executed in the function main.
The function main is usually referred to as the main function.
User Defined Functions
3.3 User Defined Functions
As well as the main function, a program file can also contain user defined functions.
Like the main function, user defined functions consist of a header followed by the program code 
enclosed in braces.
However the header for a user defined function must include a return type for the function and the 
order and variable types for each of the parameters of the function.
Hence each user defined function definition has the form
 return-type  function-name(argument declarations)
 {
 declarations and statements
           }
For example, a function called "user_function" which has a return type of Integer and parameters of 
type Integer, Real and Element could be: 
 Integer user_function (Integer fred, Real joe, Element tom)
 {
 program code
           }
3.4 Return Statement
The return statement in a function is the mechanism for returning a value from the called function to 
its caller using the return-type of the function.
The general definition of the return statement is:
                      return expression;
For a function with a void return-type (a void function), the expression must be empty. That is, for a 
void return-type you can only have return and no expression since no value can be returned. 
Thus for a void function the return statement is
                      return;
Also for a void function, the function will implicitly return if it reaches the end of the function without 
executing a return statement.
The function main is an example of a void function.
For a function with a non-void return-type (a non-void function), the expression after the return must 
be of the same type as the return type of the function. Hence any function with a non-void return-
type must have a return statement with the correct expression type.
The calling function is free to ignore the returned value.
Restrictions
Unlike C++, in 12dPL the last statement for a function with a non-void return type must be a return 
statement.
Array Variables as Function Arguments

3.5 Array Variables as Function Arguments
Arrays can be used a function arguments.
The declaration of an array variable as a function argument consists of the array variable type 
followed by the array name and an empty set of square brackets ([]).
For example, the function
  Integer user_function (Integer fred, Real joe[])
 {
 program code
                      }
has a Real array as the second argument.
Function Prototypes
3.6 Function Prototypes
Since all functions and variables must be defined before they are used, then for any user defined 
functions either 
(a)
the function must appear in the file before it is called by another function
or
(b)
a prototype of the function must be declared before the function is called.
A function prototype is simply a declaration of a function which specifies:
1.  the function name
2. the function return type
and
3.  the order and type of all the function parameters.
A function prototype looks like the function header except that it is terminated by a semi-colon 
instead of being followed by braces and the function code. Also, the variable names need not be 
included in the function prototype.
For example, two prototypes for the function user_function are
             Integer user_function (Integer fred, Real joe, Element tom);
             Integer user_function (Integer, Real, Element);
Thus prototypes are simply a method for defining the return type and the arguments and the 
argument types of a function so that the function can be used in a program before the code for the 
function has been found in the file.
Notes
(a)
The function main and any 12dPL supplied functions do not have to be defined or prototyped 
by the user.
(b)
A function prototype can occur more than once in a file.
(c)
The main function and all the user defined functions must exist in either the one file or be 
included from other files using the #include statement.
Automatic Promotions

3.7 Automatic Promotions
If needed, the following promotions are automatically made in the language:
                      From                                             To
                      Integer                                         Real
                      Real                                             Integer
                      Integer64                                     Real
                      Real                                             Integer64
                      Integer                                         Integer64
                      Integer64                                     Integer
                      Model                                          Dynamic_Element
                      Element                                       Dynamic_Element
                      Tin                                              Element, Dynamic_Element
                      Point                                            Segment
                      Line                                            Segment
                      Arc                                              Segment
                      Vector2                                       Vector3
                      Vector3                                       Vector4
                      Vector3                                       Vector2
                      Vector4                                       Vector3
These automatic promotions can occur 
(a)
when looking for functions with matching argument types
or
(b)
for converting expressions in a return statement to the correct return-
type required for the function.
Hence in the following example, the variable x is automatically promoted to a Real for use by the 
function silly.
 Real silly(Real x) { return(x+1); }
 void main()
 {
 Integer x = 10; 
 Real y = silly(x);
                }
For number in binary operation with mixed types, the result would be the one of the higher type, the 
type order from lowest to highest is: Integer << Integer64 << Real
For example 6 + 9LL is a 64 bit Integer 15LL         2.0 * 3LL is a Real 6.0
Note that calculation will be overflow but not auto promotion; for example 2048 * 2048 * 2048 will be 
an Integer that equal 0 (2 power 33)
Passing by Value or by Reference
3.8 Passing by Value or by Reference
12dPL follows C++ in that a function argument can be passed "by value" or "by reference".
Passed by Value
If a function argument is passed by value, then calling function only passes a temporary copy of 
the variable to the called function. Any modification of this temporary variable inside the called 
function will not affect the value of the variable in the calling function.
Hence in passed by value transfer of the argument value is only in one direction - from the calling 
function into the called function.
In 12dPL, the default for non-array arguments is passed by value.
Passed by Reference
However it is also possible to pass down the actual variables from the calling function to the 
called function. This is termed passed by reference.
If a function argument is passed by reference then any modification made to the passed variable 
within the called function will be modifying the original argument in the calling function.
Hence in passed by reference transfer of the argument value is in two directions and any 
modifications to the passed variable withing the called function will affect the variable in the calling 
function.
To denote that a variable is to be passed by reference, an ampersand (&) is placed after the type 
of the argument in the function definition and any function prototypes.
For example, in the function user_function1, the variables fred and tom are to be passed by value 
and the variable joe is to be passed by reference. The function code is:
 Integer user_function1 (Integer fred, Real &joe, Element tom)
 {
 program code
                 }
Matching prototypes for user_function1:
                 Integer user_function1 (Integer fred, Real& joe, Element tom);
                 Integer user_function1 (Integer fred, Real &joe, Element tom);
                 Integer user_function1 (Integer fred, Real & joe, Element tom);
                 Integer user_function1 (Integer, Real&, Element);
                 Integer user_function1 (Integer, Real &, Element);
If a called function is to return a value to the calling function via one of its arguments, then the 
argument must be passed by reference.
To clarify the difference between passed by value and passed by reference, consider the following 
examples:
void bad_square(Integer x) { x = x*x;}// x is passed by value
void main()
{
 Integer x = 10;
 bad_square(x);
 // pass by value
 // x still equals 10
Passing by Value or by Reference

}
void square(Integer &x) { x = x*x;}   // x is passed by reference
                      void main ()
                      {
                          Integer x = 10;
                          square(x);
                      // pass by reference
   // x now equals 100
                      }
Notes
(a)
Fixed arrays are always passed by reference.
(b)
In Fortran and Basic, all arguments are "pass by reference"
(c)
In C++ and Pascal, arguments can be passed by value or by reference 
Overloading of Function Names
3.9 Overloading of Function Names
In 12dPL, if you have a number of functions that have the same name but with a different number of 
arguments and/or different argument types, there is no need to give each function a different name.
As long as the argument numbers or argument types differ in some way, 12dPL will determine the 
correct function to call.
For example, three functions called swap have been defined but they are all different because they 
have differing argument types.
  void swap(Integer &x,Integer &y) { Integer  z = x; x = y; y = z;}
  void swap(Real &x,Real &y) { Real z = x; x = y; y = z;}
  void swap(Text &x,Text &y) { Text z = x; x = y; y = z;}
  void main()
  {
 Integer ix = 1 , iy = 2;
 Real rx = 1.0  , ry = 2; // automatic promotion of 2 to 2.0
 Text tx = "1" , ty = "2";
 swap(ix,iy);
 swap(rx,ry);
 swap(tx,ty);
  }
Note however that in some cases there may be more than one function that can be used. This is 
especially true when promotions are required to match the function.
If more than one match is found, the compiler will issue an error and display the functions that 
match. If no match is found, the compiler will display all functions which overload the specified 
function name.
 void swap(Integer &x,Integer &y) { Integer z = x; x = y;}
 void swap(Real &x,Real &y) { Real z = x; x = y;}
 void swap(Text &x,Text &y) { Text z = x; x = y;}
 void main()
 {
 Integer ix = 1 , iy = 2;
 Real rx = 1 , ry = 2;
 Text tx = "1"  , ty = "2";
 swap(ix,ry); // 2 matches
 // swap(Integer &,Integer &)
 // swap(Real &,Real &)
 swap(tx,ry);// no match
    }
An example of overloaded functions is redraw_views in 6.11 Example 6.
WARNING FOR C++ PROGRAMMERS
Since there is no explicit cast operator, the only way to cast is to introduce a temporary variable and 
use an assignment. For example, to fix the error in the above example where two matches occur, 
assign ry to an intermediate variable.
    Integer iry = ry;
    swap(ix,iry);             // ok, it uses swap(Integer &,Integer &)
    Real rix = ix;
    swap(rix,ry);            // ok, it uses swap(Real &,Real &)
Recursion

3.10 Recursion
Recursion for functions is supported.
For example,
 int fib(int n)
 {
 return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
 }
Assignments Within Function Arguments
3.11 Assignments Within Function Arguments
In 12dPL, assignments are not allowed within function arguments.
For example, in the following code fragment, y = 10.0 does not assign 10.0 to y.
 Real silly(Real x) { return(x); }
 void main()
 {
 Real y;
 Real z = silly(y=10.0);
                }
To actually assign 10.0 to y, enclose the statement in round brackets ( and ). That is
    Real z = silly((y=10.0));
assigns 10.0 to y and z.
Assignment within a call argument is being reserved for future use by 12dPL for functions with 
named arguments.
Blocks and Scopes

3.12 Blocks and Scopes
As noted earlier, a block is a code fragment contained within the characters { and } (braces).
Blocks can be nested. That is, a block may contain one or more sub-blocks. However, blocks cannot 
overlap.
Hence a closing brace } is always paired with the closest previous unpaired open brace {.
In the example below, block a is also the function body of main. Blocks b and c are sub-blocks of 
block a.
The scope of a name is the region of the program text within which the name's characteristics are 
understood.
In 12dPL, there are three kinds of scope:  local,  function,  and global (file).
Local             A name declared in a block is local to that block and can be used in the block, and in 
any blocks enclosed by the block after the point of declaration of the name. 
Function        Labels can be used anywhere in the function in which they are declared, Only labels 
have function scope.
Global           A name declared outside all functions has global (or file) scope and can be used 
anywhere after its point of declaration.
In 12dPL, variables with global (file) scope must be declared in an enclosing set of 
braces.
There can be more than one global section.
Hence, in the following example
  { Integer an_integer;
 Real a_real;
 Element an_element;
  }
  void main()
  {
--*
void main()
{
  Integer a = 1;
  {
 Integer x = 10;
 Print(x+a);  Print("\n");
  }
  {
 Real x = 10;
 Print(x+a);  Print("\n");
 }
}
block a
block b
block c
Blocks and Scopes
 fred:Integer a = 1;
 |
 {
--*
 |
 Integer x = 10;
 |
 |
 an_integer = 20;
 | block b
 |
 Print(x+a+an_integer);> |
 |
 Print("\n");
 |
 |
  }
--*
 |
 
 | block a
 {
--*
 |
 Real x = 10;
 | block c
 |
 Print(x+a);  Print("\n");
 |
 |
  }
 --*
 |
 goto fred;
 |
  }
--*
the variables an_integer, a_real and an_element have global scope and can be used anywhere in 
the file after their definition.
The Integer variable "a" has local scope and because of the position in the block, can be used inside 
blocks b and c.
The Integer variable "x" is defined in block b and has local scope. It is not usable outside that block.
The Real variable "x" is defined in block c and has local scope. It is not usable outside that block.
WARNING
A variable name may be hidden by an explicit declaration of that same name in an enclosed block.
Because of the potential for confusion, it is best to avoid variable names that are the same as a 
variables in an outer block.
Blocks and Scopes