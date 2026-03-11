
// Include from same folder
#include "set_ups.h"

// Include from relative path
#include "includes/Test_Includes.h"

// Include using Include Directories
#include "Test_Indirect_includes.h"

#define MACRO 10

Integer example_func()
{
    Print("Example Func \n");
}

void main()
{
    Panel panel = Create_panel("Title", FALSE, TRUE);

    Time test = some_random_value;

    Time test();

    Time();

    Integer bool_def_test = TRUE;
    Integer bool_int_test = bool_def_test ? 1 : 0;

    if(bool_int_test)
    {
        // Test comment
    }

    switch(bool_def_test)
    {
    case "Test": // Should be error
        {

        }
    case 0:
    case 1:
        {

        }
    default:
        {

        }
    }

    for(Integer i = 1; i <= 10; i++)
    {
        Print(To_text(i));
    }

    for(i = 10; i >= 0; i--)
    {
        Print(To_text(i));
    }

    while(bool_int_test)
    {
        bool_int_test = FALSE;
    }

    do
    {
        Print("Do While Test");
    }
    while(bool_int_test);

    example_func();
    jump:
    {
        Integer result = Add(1,2);
    }
    goto jump;

#ifdef DEBUG
    Print("Debug " + To_text(MACRO) + "\n");
#endif

    Integer int_array[10];

    for(Integer i = 1; i <= 10; i++)
    {
        int_array[i] = i;
    }

    Integer test_value = int_array[1];

    Test_Indirect();
    Test_Indirect();

    Integer new = 0;
    Integer new = 0; //should be error

}