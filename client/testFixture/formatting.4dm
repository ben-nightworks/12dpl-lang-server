/*
    This is an example file to test the formatting of 4dm files. It should be formatted according to the rules specified 
                in the documentation.
 */

Integer my_func(Integer a, Integer b)
{
	return a + b;
}

void very_long_function_name_with_many_parameters(
Integer param1, Integer param2, Integer param3, Integer param4, Integer param5, Integer param6,
Integer param7, Integer param8, Integer param9, Integer param10)
{
}

// this is a comment that should be properly formatted and aligned with the code. It should not affect the functionality of the code, but it should be easy to read and understand.
void main()
{
	Integer result = my_func(5, 10);
	switch(result)
	{
		case 15:
		{
			// This is a case for when the result is 15. It should be properly indented and formatted.
			break;
		}
		default:
		{
			// This is the default case. It should also be properly indented and formatted.
			break;
		}
	}
}