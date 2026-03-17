// Header with various exports for completion testing

#define HEADER_MACRO 42
#define HEADER_FUNC(x) ((x) * 2)

{
	Integer global_from_header;
	Real another_global;
}
// Function overloads to test completion with multiple signatures
void process_data(Integer value);
void process_data(Real value);
void process_data(String text);

Model get_model();
