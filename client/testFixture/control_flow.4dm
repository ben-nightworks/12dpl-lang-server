// Fixture for control flow validation tests
// Issues #96 (break not in loop/switch), #97 (continue not in loop),
//        #98 (switch multiple defaults), #99 (switch dead code)

// ─── #96: break not in loop or switch ────────────────────────────────────────

void break_in_while()
{
    Integer i = 0;
    while (i < 10)
    {
        if (i == 5)
            break;       // OK — break inside while loop
        i = i + 1;
    }
}

void break_in_for()
{
    Integer i;
    for (i = 0; i < 10; i = i + 1)
    {
        break;           // OK — break inside for loop
    }
}

void break_in_do_while()
{
    Integer i = 0;
    do
    {
        break;           // OK — break inside do-while loop
        i = i + 1;
    } while (i < 10);
}

void break_in_switch()
{
    Integer x = 1;
    switch (x)
    {
        case 1:
        {
            break;       // OK — break inside switch
        }
        default:
        {
            break;       // OK — break inside switch default
        }
    }
}

void break_not_in_loop()
{
    break;               // ERROR: break outside loop or switch
}

void break_not_in_loop_nested_if()
{
    Integer x = 1;
    if (x > 0)
    {
        break;           // ERROR: break inside if but not inside loop or switch
    }
}

// ─── #97: continue not in loop ───────────────────────────────────────────────

void continue_in_while()
{
    Integer i = 0;
    while (i < 10)
    {
        if (i == 5)
            continue;    // OK — continue inside while loop
        i = i + 1;
    }
}

void continue_in_for()
{
    Integer i;
    for (i = 0; i < 10; i = i + 1)
    {
        continue;        // OK — continue inside for loop
    }
}

void continue_not_in_loop()
{
    continue;            // ERROR: continue outside loop
}

void continue_not_in_switch()
{
    Integer x = 1;
    switch (x)
    {
        default:
        {
            continue;    // ERROR: continue inside switch but not inside loop
        }
    }
}

void continue_in_loop_inside_switch()
{
    Integer x = 1;
    switch (x)
    {
        default:
        {
            Integer i;
            for (i = 0; i < 5; i = i + 1)
            {
                continue;    // OK — continue inside loop that is nested in switch
            }
        }
    }
}

// ─── #98: switch with more than one default ───────────────────────────────────

void switch_single_default()
{
    Text text;
    switch (text)
    {
        case "hello":
        {
        }
        default:
        {
        }
    }
}

void switch_multiple_defaults()
{
    Text text;
    switch (text)
    {
        default:
        {
        }
        default:          // ERROR: second default
        {
        }
    }
}

void switch_three_defaults()
{
    Text text;
    switch (text)
    {
        default:
        {
        }
        default:          // ERROR: second default
        {
        }
        default:          // ERROR: third default
        {
        }
    }
}

void switch_default_in_nested_switch_ok()
{
    Integer x = 1;
    switch (x)
    {
        default:          // OK — first default in outer switch
        {
            Integer y = 2;
            switch (y)
            {
                default:  // OK — first default in nested switch (separate switch)
                {
                }
            }
        }
    }
}

// ─── #99: dead code in switch ─────────────────────────────────────────────────

void switch_no_dead_code()
{
    Text text;
    switch (text)
    {
        case "hello":
        {
        }
        default:
        {
        }
    }
}

void switch_dead_code_declaration()
{
    Text text;
    switch (text)
    {
        Text dead;        // WARNING: dead code before first case/default
        default:
        {
        }
    }
}

void switch_dead_code_statement()
{
    Text text;
    Integer x = 0;
    switch (text)
    {
        x = 1;            // WARNING: dead code before first case/default
        default:
        {
        }
    }
}

void switch_dead_code_multiple()
{
    Text text;
    Integer x;
    switch (text)
    {
        x = 1;            // WARNING: dead code #1
        Text unused;      // WARNING: dead code #2
        default:
        {
        }
    }
}

void switch_no_dead_code_after_case()
{
    Integer x = 1;
    switch (x)
    {
        case 1:
        {
            Integer y;    // OK — declaration inside case block, not dead code
        }
        default:
        {
        }
    }
}

void switch_empty_body()
{
    Integer x = 1;
    switch (x)
    {
        // No items — nothing to flag
    }
}
