# 12dPL User Defined Attributes

> Source: *12d Model Macro Manual* — Section 5.29, pages 261–281

---

## Overview

Extra data can be attached to the **Project**, **Models**, **Functions**, **Elements**, **Super String Vertices**, **Super String Segments**, **Water Link** (drainage pipe), and **Water Node** (drainage pit) as user defined attributes.

User defined attributes are contained in a variable of type `Attributes`.

Any number of bits of data of the following types can be attached to an `Attributes` variable. When a bit of data is attached it is given a name used to retrieve it later:

### Attribute Types

| Data Type | Attribute Type Code |
|-----------|-------------------|
| `Integer` | 1 |
| `Real` | 2 |
| `Text` | 3 |
| Binary (`Attribute_Blob`) | 4 |
| `Attributes` | 5 |
| `Uid` | 6 |
| 64-bit integer (`Integer64`) | 7 |
| `Guid` | 8 |

---

## Structure

- Attribute names can contain alphabetic characters (upper and/or lower case), numeric characters `0-9`, and blank spaces. Names **cannot** have a space as a leading or trailing character. Names are **case sensitive**.
- An `Attributes` variable can contain zero or more attributes and zero or more nested `Attributes` — forming a **tree structure** like a Windows folder system.
- All attributes at the first level of an `Attributes` variable must have a **unique name**.
- Attributes are added in sequential order, so each attribute has a unique **attribute number**.

---

## Attribute Paths

The value at a level deeper than the first level of an attribute is accessed through an **attribute path** — a sequence of attribute names separated by `/`.

**Example:** if `cc` is an attribute of `bb`, and `bb` is an attribute of `att`, then `bb/cc` is an attribute path of `att`.

### Array Syntax (v14+)

A positive number `n` in square brackets immediately after an attribute name indicates the *n*-th instance of an attribute with that name. For example `cc[2]` is the second attribute named `cc`.

Array syntax can also be used in the upper parts of a path:

```
bb[3]/cc[2]   →  the second "cc" inside the third "bb" group
```

**Important counting rules:**

- Square brackets at **upper levels** count only `Attributes`-type (group) attributes — other types such as `Integer` or `Text` are skipped.
- Square brackets at the **last level** depend on the function:
  - **Not `by_type`** functions (e.g. `Attribute_exists`): count every attribute with that name regardless of type.
  - **`by_type`** functions (e.g. `Set_attribute_by_type`): count only attributes with that name **and** the matching type.

---

## Function Reference

### Existence & Deletion

#### `Attribute_exists(Attributes attr, Text att_name)` — ID 1939

Checks whether an attribute named `att_name` exists in `attr`. Supports full path names and array syntax.

- **Non-zero** return → attribute **exists**
- **Zero** return → attribute **does not exist**

> ⚠️ **Warning:** This is the **opposite** of most 12dPL function return conventions.

---

#### `Attribute_exists(Attributes attr, Text name, Integer &no)` — ID 1940

As above, but also returns the attribute's **position** in `no`. The position can be used in other `Attribute` functions.

- **Non-zero** return → attribute exists; `no` contains position
- **Zero** return → attribute does not exist

> ⚠️ Opposite return convention applies.

---

#### `Attribute_delete(Attributes attr, Text att_name)` — ID 1941

Deletes the **first** attribute named `att_name` from `attr`. Supports path names and array syntax.

- **Zero** return → attribute was deleted.

---

#### `Attribute_delete(Attributes attr, Integer att_no)` — ID 1942

Deletes the attribute at position number `att_no` from `attr`.

- **Zero** return → attribute was deleted.

---

#### `Attribute_delete_all(Attributes attr)` — ID 1943

Deletes **all** attributes from `attr`.

- **Zero** return → all attributes were deleted.

---

### Moving Attributes

#### `Move_attributes(Attributes target, Attributes source)` — ID 7803

Moves the content of `source` to the **end** of `target`. The `source` will **not** be valid after the move.

- **Zero** return → attributes were moved.

---

#### `Move_attributes(Attributes target, Integer count, Attributes source_array[])` — ID 7819

Moves the content of `count` Attributes from `source_array` to the end of `target`. The `source_array` will **not** be valid after the move.

- **Zero** return → attributes were moved.

---

### Counting

#### `Get_number_of_attributes(Attributes attr, Integer &no_atts)` — ID 1944

Gets the number of **top-level** attributes in `attr`. The count is returned in `no_atts`.

- **Zero** return → count successfully returned.

---

### Getting Attribute Values (by Name)

All `Get_attribute` by-name functions share these conventions:
- `att_name` supports full path names and array syntax.
- If the attribute exists but is the **wrong type**, a non-zero value is returned.
- **Zero** return → value successfully returned.
- Use `Get_attribute_type` to check the type before reading.

| Signature | ID |
|-----------|-----|
| `Integer Get_attribute(Attributes attr, Text att_name, Text &att)` | 1945 |
| `Integer Get_attribute(Attributes attr, Text att_name, Integer &att)` | 1946 |
| `Integer Get_attribute(Attributes attr, Text att_name, Real &att)` | 1947 |
| `Integer Get_attribute(Attributes attr, Text att_name, Uid &att)` | 1948 |
| `Integer Get_attribute(Attributes attr, Text att_name, Attributes &att)` | 1949 |
| `Integer Get_attribute(Attributes attr, Text att_name, Integer64 &att)` | 3243 |
| `Integer Get_attribute(Attributes attr, Text att_name, Guid &att)` | 3244 |
| `Integer Get_attribute(Attributes attr, Text att_name, Attribute_Blob &att)` | 3393 |

---

### Getting Attribute Values (by Number)

Same conventions as by-name, but uses the attribute's position number `att_no`.

| Signature | ID |
|-----------|-----|
| `Integer Get_attribute(Attributes attr, Integer att_no, Text &att)` | 1950 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Integer &att)` | 1951 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Real &att)` | 1952 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Uid &att)` | 1953 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Attributes &att)` | 1954 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Integer64 &att)` | 3245 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Guid &att)` | 3246 |
| `Integer Get_attribute(Attributes attr, Integer att_no, Attribute_Blob &att)` | 3394 |

---

### Getting Attribute Metadata

#### `Get_attribute_name(Attributes attr, Integer att_no, Text &name)` — ID 1955

Gets the **name** of the attribute at position `att_no`. Returns the name in `name`.

- **Zero** return → name successfully returned.

---

#### `Get_attribute_type(Attributes attr, Text att_name, Integer &att_type)` — ID 1956

Gets the **type** of the attribute named `att_name`. The type code is returned in `att_type` (see [Attribute Types](#attribute-types)).

- **Zero** return → type successfully returned.

---

#### `Get_attribute_type(Attributes attr, Integer att_num, Integer &att_type)` — ID 1957

Gets the **type** of the attribute at position `att_num`. The type code is returned in `att_type`.

- **Zero** return → type successfully returned.

---

#### `Get_attribute_length(Attributes attr, Text att_name, Integer &att_len)` — ID 1958

Gets the **length in bytes** of the attribute named `att_name`. Mainly useful for `Text` and `Attribute_Blob` types.

- **Zero** return → length successfully returned.

---

#### `Get_attribute_length(Attributes attr, Integer att_no, Integer &att_len)` — ID 1959

Gets the **length in bytes** of the attribute at position `att_no`.

- **Zero** return → length successfully returned.

---

### Setting Attribute Values (by Name) — Create or Update

`Set_attribute` by-name functions use this rule:
- If the attribute named `att_name` **does not exist** → **create** it with the given value.
- If the attribute `att_name` **exists and is the correct type** → **update** its value.
- If the attribute **exists but is the wrong type** → non-zero return (no change).

| Signature | ID |
|-----------|-----|
| `Integer Set_attribute(Attributes attr, Text att_name, Text att)` | 1960 |
| `Integer Set_attribute(Attributes attr, Text att_name, Integer att)` | 1961 |
| `Integer Set_attribute(Attributes attr, Text att_name, Real att)` | 1962 |
| `Integer Set_attribute(Attributes attr, Text att_name, Uid att)` | 1963 |
| `Integer Set_attribute(Attributes attr, Text att_name, Attributes att)` | 1964 |
| `Integer Set_attribute(Attributes attr, Text att_name, Integer64 att)` | 3247 |
| `Integer Set_attribute(Attributes attr, Text att_name, Guid att)` | 3248 |
| `Integer Set_attribute(Attributes attr, Text att_name, Attribute_Blob att)` | 3395 |

> **Key behaviour:** The `Attributes` handle `attr` is **auto-initialised** on the first `Set_attribute` call — no `Create_attributes()` call is needed.

---

### Setting Attribute Values (by Number) — Update Only

`Set_attribute` by-number functions can **only update** an existing attribute — they cannot create new ones.

- If no attribute with that number exists → non-zero return.
- If the attribute exists but is the wrong type → non-zero return.
- **Zero** return → value successfully set.

| Signature | ID |
|-----------|-----|
| `Integer Set_attribute(Attributes attr, Integer att_no, Text att)` | 1965 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Integer att)` | 1966 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Real att)` | 1967 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Uid att)` | 1968 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Attributes att)` | 1969 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Integer64 att)` | 3250 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Guid att)` | 3251 |
| `Integer Set_attribute(Attributes attr, Integer att_no, Attribute_Blob att)` | 3396 |

---

### Getting Attributes by Type (`by_type`)

These functions match on **both name and type**. Useful when multiple attributes share the same name but have different types.

- If no attribute with that name **and** type exists → non-zero return.
- **Zero** return → value successfully returned.

| Signature | ID |
|-----------|-----|
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Text &att)` | 3251 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Integer &att)` | 3252 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Real &att)` | 3253 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Uid &att)` | 3254 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Attributes &att)` | 3255 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Integer64 &att)` | 3256 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Guid &att)` | 3257 |
| `Integer Get_attribute_by_type(Attributes attr, Text att_name, Attribute_Blob &att)` | 3397 |

---

### Setting Attributes by Type (`by_type`) — Create or Update by Type

These functions match on **both name and type**:
- If no attribute with that name **and** type exists → **create** it.
- If an attribute with that name **and** type exists → **update** the first match.
- **Zero** return → value successfully set.

| Signature | ID |
|-----------|-----|
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Text att)` | 3258 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Integer att)` | 3259 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Real att)` | 3260 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Uid att)` | 3261 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Attributes att)` | 3262 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Integer64 att)` | 3263 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Guid att)` | 3264 |
| `Integer Set_attribute_by_type(Attributes attr, Text att_name, Attribute_Blob att)` | 3398 |

---

### Inserting at a Position

These functions insert a **new** attribute at a specific index. All existing attributes at the given position or higher have their indices incremented by one.

- **Zero** return → attribute successfully inserted.

| Signature | ID |
|-----------|-----|
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Text att)` | 3658 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Integer att)` | 3659 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Real att)` | 3660 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Uid att)` | 3661 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Attributes att)` | 3662 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Attribute_Blob att)` | 3663 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Integer64 att)` | 3664 |
| `Integer Insert_attribute_at_position(Attributes attr, Text att_name, Integer position, Guid att)` | 3665 |

---

### Debugging

#### `Attribute_debug(Attributes attr)` — ID 1971

For internal 12d Solutions use only. Writes detailed information about `attr` to the Output Window.

- **Zero** return → function was successful.

---

## Key Patterns & Gotchas

### Auto-initialisation of Handles

```c
// Attributes handles auto-initialise on first Set_attribute call.
// No Create_attributes() function exists — none is needed.
Attributes tfnsw;   // uninitialised
Set_attribute(tfnsw, "GPSLat", To_text(lat, 10));  // auto-inits tfnsw
```

### Building Nested Trees from Scratch

```c
// ✅ CORRECT — build entire tree from uninitialised handles
Attributes asset;
Attributes de;
Attributes root;
Set_attribute(asset, "TfNSW_GPSStartLong", To_text(lon, 10));
Set_attribute(asset, "TfNSW_GPSStartLat",  To_text(lat, 10));
Set_attribute(de,    "TfNSW_Asset",         asset);
Set_attribute(root,  "TfNSW_DE",            de);
Set_attributes(elt, root);
```

### Writing a Single Group Without Touching Others

Use the element-level `Set_attribute(Element, Text, Attributes)` — ID 1979:

```c
// Writes only "TfNSW_DE" onto the element.
// All other top-level attribute groups on elt are untouched.
Set_attribute(elt, "TfNSW_DE", de);   // ID 1979
```

### Never Call `Get_attributes()` on New Elements

```c
// ❌ WRONG — Get_attributes() on an element with no existing attrs
//    returns a broken (null) handle. All subsequent Set_attribute
//    calls on it silently fail at runtime.
Attributes root;
Get_attributes(new_elt, root);         // no attrs → root is broken
Set_attribute(root, "Field", "val");   // silently fails
Set_attributes(new_elt, root);         // nothing written
```

Only use `Get_attributes()` when the element **already has** attributes:

```c
// ✅ CORRECT — element is known to have existing attributes
Attributes existing;
Get_attributes(elt, existing);
Set_attribute(existing, "NewField", "value");
Set_attributes(elt, existing);
```

### `Set_attribute` vs `Set_attribute_by_type`

| | `Set_attribute` | `Set_attribute_by_type` |
|---|---|---|
| Match rule | Name only | Name **and** type |
| On wrong type | Returns non-zero, no change | Creates a new attribute of the correct type |
| Use when | Type is fixed and known | Multiple attributes may share the same name with different types |

### `Attribute_exists` Return Convention

> ⚠️ **Non-zero = exists. Zero = does not exist.** This is the **opposite** of most 12dPL functions.
