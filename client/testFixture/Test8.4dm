#include "large_header.h"

void main()

{
	Text text_var = "Hello, World!";
	Text my_choices[];//error requires a size
	Integer my_int_array[];//error requires a size
	Real my_real_array[];//error requires a size
	Element my_element_array[];//error requires a size
	Model my_model_array[];//error requires a size

	Text sized_array[10];//ok - has a size
	Integer sized_int[5];//ok - has a size
}