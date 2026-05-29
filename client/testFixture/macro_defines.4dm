
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

#define MESSAGE_LEVEL_GOOD 4
#define TEST "Test"
#define BRACKETS(x) x

void func2()
{
	Colour_Message_Box boxMessage = Create_colour_message_box("Test");

	Set_data(boxMessage, "Test", MESSAGE_LEVEL_GOOD); // No error

	Set_data(
	boxMessage,
	TEST,
	4
	); // No error

	Set_data(
	boxMessage,
	"Test",
	MESSAGE_LEVEL_GOOD
	);

	Integer test = BRACKETS(5);

	Set_data(
	boxMessage,
	"Test",
	test
	);


	Integer x = MESSAGE_LEVEL_GOOD;
}





