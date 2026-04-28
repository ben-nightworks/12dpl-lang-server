// SYNTAX TEST "source.12dpl" "function parameter highlighting (#105)"

// ── Inline closing paren (baseline, must always pass) ───────────────────────

void Add_layer_inline(
    Integer max_log_severity)
//          ^^^^^^^^^^^^^^^^ variable.parameter.probably.12dpl
{
}

void multi_param_inline(
    Integer a, Integer b)
//          ^ variable.parameter.probably.12dpl
//                     ^ variable.parameter.probably.12dpl
{
}

// ── Closing paren on its own line (issue #105) ───────────────────────────────

void Add_layer_multiline(
    Integer max_log_severity
//          ^^^^^^^^^^^^^^^^ variable.parameter.probably.12dpl
    )
{
}

void multi_param_closing_paren_on_newline(
    Integer a,
//          ^ variable.parameter.probably.12dpl
    Integer b
//          ^ variable.parameter.probably.12dpl
    )
{
}

// ── Array parameter, closing paren on its own line ───────────────────────────

void takes_array(
    Integer arr[]
//          ^^^ variable.parameter.probably.12dpl
    )
{
}
