// Fixture for dynamic array Null reminder validation (issue #107).
// Dynamic arrays should be Nulled before going out of scope.

// Global dynamic array that is Nulled inside a function — no diagnostic.
Dynamic_Element global_elements;

// INFO expected: used but never Nulled anywhere in the file.
Dynamic_Text global_names;

void collect(Model model) {
    // INFO expected: 'de' is used but never Nulled in this function.
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
}

void collect_and_release(Model model) {
    // No diagnostic: 'de' is Nulled before the function returns.
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
    Null(de);
}

void conditional_release(Model model, Integer flag) {
    // No diagnostic: a Null in any branch counts (no flow analysis).
    Dynamic_Element de;
    Integer total;
    Get_elements(model, de, total);
    if (flag) {
        Null(de);
    }
}

void takes_parameter(Dynamic_Element items) {
    // No diagnostic: parameters are owned by the caller.
    Integer size = Get_size(items);
    Print(size);
}

void unused_array() {
    // No diagnostic: declared but never used.
    Dynamic_Real dr;
    Integer i = 1;
    Print(i);
}

void main() {
    Integer total;
    Get_elements(Get_model("survey"), global_elements, total);
    Set_size(global_names, 1);
    Null(global_elements);
}
