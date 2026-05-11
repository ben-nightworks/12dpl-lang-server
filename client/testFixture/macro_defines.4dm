
Integer someOtherfunction()
{
	return 1;
}

#define MACRO_EXAMPLE(x,y) Print(To_text(x) + To_text(y))

#define PRINT_SET(x,y) if(x>= 1) { Print(To_text(y) + "\n"); }

void func()
{
    MACRO_EXAMPLE(someOtherfunction() + someOtherfunction(), someOtherfunction())

	PRINT_SET(2, "Test Value");

    someOtherfunction();
}