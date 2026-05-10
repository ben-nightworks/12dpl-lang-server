
Integer someOtherfunction()
{
	return 1;
}
 
void func()
{
    #define MACRO_EXAMPLE(x,y) Integer test = &x;

    MACRO_EXAMPLE(someOtherfunction() + someOtherfunction(), someOtherfunction())

    someOtherfunction();
}