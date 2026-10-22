# Appendix A: set_ups.h Constants Reference

> Source: 12d Model Macro Manual Appendix A (pages 1466–1510)

The file `set_ups.h` defines constants and return-code values used in 12dPL library functions.
Include it at the top of any macro that uses these constants:

```c
#include "set_ups.h"
```

Workspace copy: `includes/set_ups.h`
Full install: `C:\Program Files\12d\12dmodel\15.00\set_ups\set_ups.h`

---

## General Constants

| Constant | Value | Meaning |
|---|---|---|
| `TRUE` | `1` | Boolean true / success |
| `OK` | `1` | Success |
| `FALSE` | `0` | Boolean false |

---

## Model Mode Constants

Used with `Create_model_box(title, msg, mode)` and `Validate(Model_Box, mode, model)`.

**CHECK modes** never create models. **GET modes** may create models.

### Check Modes

| Constant | Value | Behaviour when typed/selected |
|---|---|---|
| `CHECK_MODEL_EXISTS` | `3` | Info only — "exists" or "does not exist" |
| `CHECK_MODEL_MUST_EXIST` | `7` | ERROR if model missing |
| `CHECK_MODEL_CREATE` | `4` | Notes "will be created" if missing |
| `CHECK_MODEL_MUST_NOT_EXIST` | `60` | ERROR if model already exists |
| `CHECK_DISK_MODEL_MUST_EXIST` | `33` | Disk (non-RAM) model must exist |
| `CHECK_EITHER_MODEL_EXISTS` | `38` | Either RAM or disk model must exist |

### Get Modes

| Constant | Value | Behaviour |
|---|---|---|
| `GET_MODEL` | `10` | Error if missing; silent when blank |
| `GET_MODEL_CREATE` | `5` | Creates the model if it doesn't exist |
| `GET_MODEL_ERROR` | `13` | Error if missing or blank field |
| `GET_DISK_MODEL_ERROR` | `34` | Error if disk model not found |

### Validate Return Codes for Model

| Constant | Value | Meaning |
|---|---|---|
| `NO_MODEL` | `1` | Model does not exist |
| `MODEL_EXISTS` | `2` | Model found / returned |
| `DISK_MODEL_EXISTS` | `19` | Disk model found |
| `NEW_MODEL` | `3` | New model created |
| `NO_NAME` | `10` | Field was blank (no name entered) |
| `NO_CASE` | `8` | No match / no case |

**Usage tips:**
- For output model creation: `GET_MODEL_CREATE` (5) or `GET_MODEL_ERROR` (13)
- For read-only model input: `CHECK_MODEL_MUST_EXIST` (7)  
- To avoid focus-stealing on empty field: use `flags=0` on `Create_model_box`

### Detailed Model Mode Descriptions

Model Mode
Model Mode
The Model modes are used in two ways.
(a)
When a Model_Box is created with Create_model_box(Text title_text,Message_Box message,Integer 
mode), mode determines the behaviour when information is entered into the Model_Box.
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected 
from the model pop-up list, automatic validation is performed by the Model_Box according to 
mode. What the validation is, what messages are written to Message_Box, and what actions 
automatically occur, depend on the value of mode.
(b)
A mode is also used with the Validate(Model_Box box,Integer mode,Model &model) call. Again 
mode will determine what validation occurs, what messages are written to the Message_Box, 
what actions are taken and what the function return value is.
There are CHECK modes which never create models and GET modes which may create models.

**CHECK_MODEL_EXISTS = 3**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "does not exist"
(c)
If field is blank and not optional, message says "no model specified"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the message says "does not 
exist" and the return code is NO_MODEL and no model is returned as the argument model.
(c)
If field is blank and not optional, for Validate the message says "no model specified" and the 
return code of NO_NAME and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME and no model is returned as the argument model.

**CHECK_MODEL_MUST_EXIST = 7**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "ERROR does not 
exist"
(c)
If field is blank and not optional, message says "ERROR no model specified"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the messages says "ERROR 
does not exist" and the return code is NO_MODEL and no model is returned as the argument 
model.

Model Mode
(c)
If field is blank and not optional, for Validate the message says "ERROR no model specified" 
and the return code of NO_NAME and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME and no model is returned as the argument model.

**CHECK_MODEL_CREATE = 4**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "will be created"
(c)
If field is blank and not optional, message says "no model specified"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the messages says "will be 
created" and the return code is NO_MODEL and no model is returned as the argument model. 
Yes it is a confusing message but this mode should not be used with Validate.
(c)
If field is blank and not optional, for Validate the message says "no model specified" and the 
return code of NO_NAME and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME and no model is returned as the argument model.

**CHECK_MODEL_MUST_NOT_EXIST = 60**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "ERROR exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "does not exist".
(c)
If field is blank and not optional, message says "no model specified"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "ERROR exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model. 
(b)
If the model doesn’t exist and the field is not blank, for Validate the messages says "does not 
exist" and the return code is NO_MODEL and no model is returned as the argument model.
(c)
If field is blank and not optional, for Validate the message says "no model specified" and the 
return code of NO_NAME and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME and no model is returned as the argument model.

**CHECK_DISK_MODEL_MUST_EXIST = 33**

**CHECK_EITHER_MODEL_EXISTS = 38**

**GET_MODEL = 10**

Model Mode
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "ERROR does not 
exist"
(c)
If field is blank and not optional, there is no message
(d)
If field is blank and optional, there is no message.
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the message says "ERROR 
does not exist" and the return code is NO_MODEL and no model is returned as the argument 
model.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no model is returned as the argument model.

**GET_MODEL_CREATE = 5**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "created" and the 
model is created.
(c)
If field is blank and not optional, the message says "ERROR no model specified"
(d)
If field is blank and optional, there is no message.
For Validate(model_box,mode,model):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the message says "created" 
and the model is created. The return code is MODEL_EXISTS and the model is returned as the 
argument model.
(c)
If field is blank and not optional, for Validate the message says "ERROR no model specified" 
and the return code is NO_MODEL and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no model is returned as the argument model.

**GET_MODEL_ERROR = 13**
If information is typed and then an <enter> pressed in the Model_Box, or if a model is selected from 
the model pop-up list:
(a)
If the model exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "ERROR does not 
exist".
(c)
If field is blank and not optional, the message says "ERROR no model specified"
(d)
If field is blank and optional, there is no message.
For Validate(model_box,mode,model):

Model Mode
(a)
If the model exists, for Validate the message says "exists" and the return code is 
MODEL_EXISTS. The model is returned as the argument model.
(b)
If the model doesn’t exist and the field is not blank, for Validate the message says "ERROR 
does not exist" and the return code is NO_MODEL and no model is returned as the argument 
model.
(c)
If field is blank and not optional, for Validate the message says "ERROR no model specified" 
and the return code is NO_MODEL and no model is returned as the argument model.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no model is returned as the argument model.

**GET_DISK_MODEL_ERROR = 34**
MODEL FUNCTION RETURN CODES

**NO_MODEL = 1**

**MODEL_EXISTS = 2**

**DISK_MODEL_EXISTS = 19**

**NEW_MODEL = 3**

**NO_NAME = 10**            // when no name is entered (i.e. blank)

**NO_CASE = 8**

---

## File Mode Constants

Used with `Create_file_box(title, msg, mode)` and `Validate(File_Box, mode, result)`.
The text in the File_Box is always returned as `result`, regardless of mode.
Files are **never** automatically created by `Create_file_box` or `Validate`.

### File Modes

| Constant | Value | Behaviour |
|---|---|---|
| `CHECK_FILE_MUST_EXIST` | `1` | Error if file doesn't exist |
| `CHECK_FILE_CREATE` | `14` | Notes "will be created" if missing |
| `CHECK_FILE` | `22` | Error if missing or blank |
| `CHECK_FILE_NEW` | `20` | Error if file already EXISTS |
| `CHECK_FILE_APPEND` | `21` | OK either way; for append-mode files |
| `CHECK_FILE_WRITE` | `23` | OK either way; for write-mode files |
| `GET_FILE` | `16` | Error if missing; silent when blank |
| `GET_FILE_MUST_EXIST` | `7` | Error if missing or blank |
| `GET_FILE_CREATE` | `14` | Create/overwrite mode |
| `GET_FILE_APPEND` | `19` | Append with Append/Replace/Cancel dialog |
| `GET_FILE_WRITE` | `24` | Write with Append/Replace/Cancel dialog |

### Validate Return Codes for File

| Constant | Value | Meaning |
|---|---|---|
| `FILE_EXISTS` | `2` | File found; or Append chosen in dialog |
| `NO_FILE` | `1` | File missing; or Replace chosen in dialog |
| `NO_NAME` | `10` | Field was blank |
| `NO_FILE_ACCESS` | — | Cancel chosen in Append/Replace dialog |

### Detailed File Mode Descriptions

File Mode
File Mode
The File modes are used in two ways.
(a)
When a File_Box is created with Create_file_box(Text title_text,Message_Box message,Integer 
mode), mode determines the behaviour when information is entered into the File_Box.
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from 
the file pop-up list, automatic validation is performed by the File_Box according to mode. What 
the validation is, what messages are written to Message_Box, and what actions automatically 
occur, depend on the value of mode.
(b)
A mode is also used with the Validate(File_Box box,Integer mode,Text &result) call. Again 
mode will determine what validation occurs, what messages are written to the Message_Box, 
what actions are taken and what the function return value is.
Because of many different ways files can be opened, files are never created by the 
Create_file_box(Text title_text,Message_Box message,Integer mode) or Validate(File_Box box,Integer 
mode,Text &result) calls. 
Regardless of the modes, the text typed into the File_Box is returned as result in the Validate 
Validate(File_Box box,Integer mode,Text &result) call.

**CHECK_FILE_MUST_EXIST = 1**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "ERROR ... does not exist"
(c)
If field is blank and not optional, message says "ERROR File must specify a file name"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "ERROR ... 
does not exist" and the return code is NO_FILE. The text in the File_Box is returned in the 
argument result.
(c)
If field is blank and not optional, for Validate the message says "ERROR File must specify a file 
name" and the return code of NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME. result is returned as ""

**CHECK_FILE_CREATE = 14**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "will be created"
(c)
If field is blank and not optional, message says "ERROR must specify a file name"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 

File Mode
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the messages says "will be 
created" and the return code is NO_FILE. The text in the File_Box is returned in the argument 
result. Yes it is a confusing message but this mode should not be used with Validate.
(c)
If field is blank and not optional, for Validate the message says "ERROR must specify a file 
name" and the return code of NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME. result is returned as "".

**CHECK_FILE = 22**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "ERROR File must specify 
an existing file"
(c)
If field is blank and not optional, message says "ERROR File must specify an existing file"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the messages says "ERROR File 
must specify an existing file" and the return code is NO_FILE. The text in the File_Box is 
returned in the argument result.
(c)
If field is blank and not optional, for Validate the message says "ERROR File must specify an 
existing file" and the return code of NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME. result is returned as "".

**CHECK_FILE_NEW = 20**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "ERROR ... exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "File ... will be created".
(c)
If field is blank and not optional, message says "ERROR File must specify a file name"
(d)
If field is blank and optional, message says "ok - field is optional".
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "ERROR ... exists" and the return code is 
FILE_EXISTS. The text in the File_Box is returned in the argument result. 
(b)
If the file doesn’t exist and the field is not blank, for Validate the messages says "File ... will be 
created" and the return code is NO_FILE. The text in the File_Box is returned in the argument 
result.
(c)
If field is blank and not optional, for Validate the message says "ERROR File must specify a file 
name" and the return code of NO_FILE. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_FILE. result is returned as ""

File Mode

**CHECK_FILE_APPEND = 21**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "will be created"
(c)
If field is blank and not optional, message says "ERROR must specify a file"
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the messages says "will be 
created" and the return code is NO_FILE. The text in the File_Box is returned in the argument 
result. Yes it is a confusing message but this mode should not be used with Validate.
(c)
If field is blank and not optional, for Validate the message says "ERROR must specify a file" 
and the return code of NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME. result is returned as "".

**CHECK_FILE_WRITE = 23**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "will be created"
(c)
If field is blank and not optional, message says 
(d)
If field is blank and optional, message says "ok - field is optional"
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the messages says "will be 
created" and the return code is NO_FILE. The text in the File_Box is returned in the argument 
result. Yes it is a confusing message but this mode should not be used with Validate.
(c)
If field is blank and not optional, for Validate the message says and the return code of 
NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate the message says "ok - field is optional" and the return 
code is NO_NAME. result is returned as "".

**GET_FILE = 16**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "ERROR File must specify 
an existing file"
(c)
If field is blank and not optional, there is no message
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):

File Mode
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "ERROR File 
must specify an existing file" and the return code is NO_FILE. The text in the File_Box is 
returned in the argument result.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".

**GET_FILE_MUST_EXIST = 7**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists".
(b)
If the file doesn’t exist and the field is not blank, the messages says "ERROR File file ... does 
not exist".
(c)
If field is blank and not optional, the message says "ERROR File must specify a file name"
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and the return code is FILE_EXISTS. 
The text in the File_Box is returned in the argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "ERROR File 
file ... does not exist" and the return code is NO_FILE. The text in the File_Box is returned in 
the argument result.
(c)
If field is blank and not optional, for Validate the message says "ERROR File must specify a file 
name" and the return code is NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".

**GET_FILE_CREATE = 15**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists", and a "File_Box Not Optional" panel comes up and 
asks if you would like to Replace or Cancel. If Replace if selected, the file is deleted. If Cancel 
is Selected, the file is not deleted and "overwrite aborted by user". 
(b)
If the file doesn’t exist and the field is not blank, the messages says "File ... will be created" but 
no file is created.
(c)
If field is blank and not optional, there is no message.
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and a "File_Box Not Optional" panel 
comes up and asks if you would like to Replace or Cancel. If Replace if selected, the file is 
deleted and the return code is NO_FILE. If Cancel is Selected, the file is not deleted and 
"overwrite aborted by user" and the return code is NO_FILE_ACCESS. In both bases, the text 
in the File_Box is returned in the argument result.
Hence when the file already exist, the user is asked to Replace or Cancel and the return code 
differentiates between the two possibilities:

File Mode
      NO_FILE indicates that Replace was chosen (and the file is automatically deleted).
      NO_FILE_ACCESS indicates that Cancel was chosen and so the file is not to be used.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "will be created" 
but no file is created. The return code is NO_FILE. The text in the File_Box is returned in the 
argument result.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".

**GET_FILE_NEW = 18**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "ERROR File ... exists". The file is not deleted.
(b)
If the file doesn’t exist and the field is not blank, the messages says "File ... will be created" but 
no file is created.
(c)
If field is blank and not optional, the message says "ERROR File must specify a file name".
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "ERROR File ... exists" and the return code is 
FILE_EXISTS. The file is not deleted.T he text in the File_Box is returned in the argument 
result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "will be created" 
but no file is created. The return code is NO_FILE. The text in the File_Box is returned in the 
argument result.
(c)
If field is blank and not optional, for Validate the message says "ERROR File must specify a file 
name" and the return code is NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".

**GET_FILE_APPEND = 19**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists", and a "File_Box Not Optional" panel comes up and 
asks if you would like to Append, Replace or Cancel. If Append is selected nothing is done, if 
Replace if selected, the file is deleted. If Cancel is Selected, the file is not deleted and 
"overwrite aborted by user". 
(b)
If the file doesn’t exist and the field is not blank, the messages says "File ... will be created" but 
no file is created.
(c)
If field is blank and not optional, there is no message.
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and a "File_Box Not Optional" panel 
comes up and asks if you would like to Append, Replace or Cancel. If Append is selected 
nothing is done to the file and the return code is FILE_EXISTS, If Replace if selected, the file is 
deleted and the return code is NO_FILE. If Cancel is Selected, the file is not deleted and 
"overwrite aborted by user" and the return code is NO_FILE_ACCESS. In both bases, the text 
in the File_Box is returned in the argument result.

File Mode
Hence when the file already exist, the user is asked to Append, Replace or Cancel and the 
return code differentiates between the three possibilities:
      FILE_EXISTS indicates that Append was chosen.
      NO_FILE indicates that Replace was chosen (and the file is automatically deleted).
      NO_FILE_ACCESS indicates that Cancel was chosen and so the file is not to be used.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "will be created" 
but no file is created. The return code is NO_FILE. The text in the File_Box is returned in the 
argument result.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".

**GET_FILE_WRITE = 24**
If information is typed and then an <enter> pressed in the File_Box, or if a file is selected from the 
file pop-up list:
(a)
If the file exists, the message says "exists", and a "File_Box Not Optional" panel comes up and 
asks if you would like to Append, Replace or Cancel. If Append is selected ?, if Replace if 
selected, the file is deleted. If Cancel is Selected, the file is not deleted and "overwrite aborted 
by user". 
(b)
If the file doesn’t exist and the field is not blank, the messages says "File ... will be created" but 
no file is created.
(c)
If field is blank and not optional, there is no message.
(d)
If field is blank and optional, there is no message.
For Validate(File_Box box,Integer mode,Text &result):
(a)
If the file exists, for Validate the message says "exists" and a "File_Box Not Optional" panel 
comes up and asks if you would like to Append, Replace or Cancel. If Append is selected ? and 
the return code is FILE_EXISTS, If Replace if selected, the file is deleted and the return code is 
NO_FILE. If Cancel is Selected, the file is not deleted and "overwrite aborted by user" and the 
return code is NO_FILE_ACCESS. In both bases, the text in the File_Box is returned in the 
argument result.
(b)
If the file doesn’t exist and the field is not blank, for Validate the message says "will be created" 
but no file is created. The return code is NO_FILE. The text in the File_Box is returned in the 
argument result.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".
(d)
If field is blank and optional, for Validate there is no message and the return code is 
NO_NAME. result is returned as "".
FILE RETURN CODES

**NO_FILE = 4**

**FILE_EXISTS = 5**

**NO_FILE_ACCESS = 6**

**NO_NAME = 10**            // when no name is entered (i.e. blank)

---

## View Mode Constants

Used with `Create_view_box()` and `Validate(View_Box, mode, view)`.

| Constant | Value |
|---|---|
| `NO_CASE` | `8` |
| `CHECK_VIEW_MUST_EXIST` | `2` |
| `CHECK_VIEW_MUST_NOT_EXIST` | `25` |
| `GET_VIEW` | `11` |
| `GET_VIEW_ERROR` | `6` |
| `NO_VIEW` | `6` |
| `VIEW_EXISTS` | `7` |


### Detailed View Mode Descriptions

File Mode

**NO_CASE = 8**

View Mode
View Mode
The View modes are used in two ways.
(a)
When a View_Box is created with Create_view_box(Text title_text,Message_Box message,Integer 
mode), mode determines the behaviour when information is entered into the View_Box.
If information is typed and then an <enter> pressed in the View_Box, or if a view is selected 
from the view pop-up list, automatic validation is performed by the View_Box according to 
mode. What the validation is, what messages are written to Message_Box, and what actions 
automatically occur, depend on the value of mode.
(b)
A mode is also used with the Validate(View_Box box,Integer mode,View &view) call. Again 
mode will determine what validation occurs, what messages are written to the Message_Box, 
what actions are taken and what the function return value is.

**CHECK_VIEW_MUST_EXIST = 2**
If information is typed and then an <enter> pressed in the View_Box, or if a view is selected from the 
view pop-up list:
(a)
If the view exists, the message says "exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "ERROR does not 
exist"
(c)
If field is blank and not optional, message says "ERROR no view specified"
(d)
If field is blank and optional, message says "ok"
For Validate(view_box,mode,view):
(a)
If the model exists, for Validate the message says "exists" and the return code is 
VIEW_EXISTS. The view is returned as the argument view.
(b)
If the view doesn’t exist and the field is not blank, for Validate the messages says "ERROR 
does not exist" and the return code is NO_VIEW and no view is returned as the argument view.
(c)
If field is blank and not optional, for Validate the message says "ERROR no view specified" and 
the return code of NO_NAME and no view is returned as the argument view.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no view is returned as the argument view.

**CHECK_VIEW_MUST_NOT_EXIST = 25**
If information is typed and then an <enter> pressed in the View_Box, or if a view is selected from the 
view pop-up list:
(a)
If the view exists, the message says "ERROR exists".
(b)
If the model doesn’t exist and the field is not blank, the messages says "will be created".
(c)
If field is blank and not optional, message says "ERROR no view specified"
(d)
If field is blank and optional, message says "ok"
For Validate(view_box,mode,view):
(a)
If the view exists, for Validate the message says "ERROR exists" and the return code is 
VIEW_EXISTS. The view is returned as the argument view. 
(b)
If the view doesn’t exist and the field is not blank, for Validate the messages says "will be 
created" and the return code is NO_VIEW and no view is returned as the argument model.
(c)
If field is blank and not optional, for Validate the message says "no view specified" and the 

View Mode
return code of NO_NAME and no view is returned as the argument view.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no view is returned as the argument view.

**GET_VIEW = 11**
If information is typed and then an <enter> pressed in the View_Box, or if a view is selected from the 
view pop-up list:
(a)
If the view exists, the message says "exists".
(b)
If the view doesn’t exist and the field is not blank, the messages says "ERROR does not exist"
(c)
If field is blank and not optional, there is no message
(d)
If field is blank and optional, there is no message.
For Validate(view_box,mode,view):
(a)
If the view exists, for Validate the message says "exists" and the return code is VIEW_EXISTS. 
The view is returned as the argument view.
(b)
If the view doesn’t exist and the field is not blank, for Validate the message says "ERROR does 
not exist" and the return code is NO_VIEW and no view is returned as the argument view.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME and no view is returned as the argument view.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no view is returned as the argument view.

**GET_VIEW_ERROR = 6**
If information is typed and then an <enter> pressed in the View_Box, or if a view is selected from the 
view pop-up list:
(a)
If the view exists, the message says "exists".
(b)
If the view doesn’t exist and the field is not blank, the messages says "ERROR does not exist".
(c)
If field is blank and not optional, the message says "ERROR no view specified"
(d)
If field is blank and optional, there is no message.
For Validate(view_box,mode,view):
(a)
If the view exists, for Validate the message says "exists" and the return code is VIEW_EXISTS. 
The model is returned as the argument view.
(b)
If the view doesn’t exist and the field is not blank, for Validate the message says "ERROR does 
not exist" and the return code is NO_VIEW and no view is returned as the argument view.
(c)
If field is blank and not optional, for Validate the message says "ERROR no view specified" and 
the return code is NO_NAME and no view is returned as the argument view.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no view is returned as the argument view.
VIEW RETURN CODES

**NO_VIEW = 6**

**VIEW_EXISTS = 7**

---

## Tin Mode Constants

Used with `Create_tin_box()` and `Validate(Tin_Box, mode, tin)`.

| Constant | Value |
|---|---|
| `NO_NAME` | `10` |
| `NO_CASE` | `8` |
| `CHECK_TIN_MUST_EXIST` | `8` |
| `CHECK_TIN_EXISTS` | `61` |
| `CHECK_EITHER_TIN_EXISTS` | `39` |
| `CHECK_TIN_NEW` | `12` |
| `CHECK_TIN_MUST_NOT_EXIST` | `91` |
| `CHECK_DISK_TIN_MUST_EXIST` | `16` |
| `GET_TIN` | `10` |


### Detailed Tin Mode Descriptions

View Mode

**NO_NAME = 10**

**NO_CASE = 8**

Tin Mode
Tin Mode
The Tin modes are used in two ways.
(a)
When a Tin_Box is created with Create_tin_box(Text title_text,Message_Box message,Integer mode), 
mode determines the behaviour when information is entered into the Tin_Box.
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from 
the tin pop-up list, automatic validation is performed by the Tin_Box according to mode. What 
the validation is, what messages are written to Message_Box, and what actions automatically 
occur, depend on the value of mode.
(b)
A mode is also used with the Validate(Tin_Box box,Integer mode,Tin &tin) call. Again mode 
will determine what validation occurs, what messages are written to the Message_Box, what 
actions are taken and what the function return value is.
There are CHECK modes which never create tins and GET modes which may create tins.

**CHECK_TIN_MUST_EXIST = 8**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "ERROR does not exist"
(c)
If field is blank and not optional, message says "ERROR no tin specified"
(d)
If field is blank and optional, message says "ok"
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "exists" and the return code is TIN_EXISTS. The 
tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the messages says "ERROR does 
not exist" and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate the message says "ERROR no tin specified" and 
the return code of NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no tin is returned as the argument tin.

**CHECK_TIN_EXISTS = 61**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "does not exist"
(c)
If field is blank and not optional, message says "no tin specified"
(d)
If field is blank and optional, message says "ok"
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "exists" and the return code is TIN_EXISTS. The 
tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the message says "does not exist" 
and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate the message says "no tin specified" and the return 

Tin Mode
code of NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no tin is returned as the argument tin.

**CHECK_EITHER_TIN_EXISTS = 39**

**CHECK_TIN_NEW = 12**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "ERROR must not exist".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "ok - no Tin exists"
(c)
If field is blank and not optional, message says "ERROR no tin specified"
(d)
If field is blank and optional, message says "ok"
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "ERROR must not exist" and the return code is 
TIN_EXISTS. The tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the messages says "ok - no Tin 
exists" and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate the message says "ERROR no tin specified" and 
the return code of NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no tin is returned as the argument tin.

**CHECK_TIN_MUST_NOT_EXIST = 91**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "ERROR exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "does not exist".
(c)
If field is blank and not optional, message says "ERROR tin not specified"
(d)
If field is blank and optional, message says "ok"
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "ERROR exists" and the return code is 
TIN_EXISTS. The tin is returned as the argument tin. 
(b)
If the tin doesn’t exist and the field is not blank, for Validate the messages says "does not exist" 
and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate the message says "ERROR no tin specified" and 
the return code of NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate the message says "ok" and the return code is 
NO_NAME and no tin is returned as the argument tin.

**CHECK_DISK_TIN_MUST_EXIST = 16**

**GET_TIN = 10**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin

---

## Template Mode, Project Mode, Directory Mode

| Constant | Value |
|---|---|
| `GET_TIN_ERROR` | `9` |
| `GET_TIN_CREATE` | `24` |
| `GET_DISK_TIN_ERROR` | `35` |
| `NO_TIN` | `9` |
| `TIN_EXISTS` | `11` |
| `DISK_TIN_EXISTS` | `12` |
| `NO_NAME` | `10` |
| `NO_CASE` | `8` |


### Detailed Descriptions

Tin Mode
pop-up list:
(a)
If the tin exists, the message says "exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "ERROR does not exist"
(c)
If field is blank and not optional, there is no message
(d)
If field is blank and optional, there is no message.
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "exists" and the return code is TIN_EXISTS. The 
tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the message says "ERROR does 
not exist" and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate there is no message and the return code is 
NO_NAME and no tin is returned as the argument model.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no tin is returned as the argument model.

**GET_TIN_ERROR = 9**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "ERROR does not exist".
(c)
If field is blank and not optional, the message says "ERROR no tin specified"
(d)
If field is blank and optional, there is no message.
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "exists" and the return code is TIN_EXISTS. The 
tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the message says "ERROR does 
not exist" and the return code is NO_TIN and no tin is returned as the argument tin.
(c)
If field is blank and not optional, for Validate the message says "ERROR no tin specified" and 
the return code is NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no tin is returned as the argument tin.

**GET_TIN_CREATE = 24**
If information is typed and then an <enter> pressed in the Tin_Box, or if a tin is selected from the tin 
pop-up list:
(a)
If the tin exists, the message says "exists".
(b)
If the tin doesn’t exist and the field is not blank, the messages says "created" and the tin is 
created.
(c)
If field is blank and not optional, the message says "ERROR no tin specified"
(d)
If field is blank and optional, there is no message.
For Validate(tin_box,mode,tin):
(a)
If the tin exists, for Validate the message says "exists" and the return code is TIN_EXISTS. The 
tin is returned as the argument tin.
(b)
If the tin doesn’t exist and the field is not blank, for Validate the message says "created" and 
the tin is created. The return code is TIN_EXISTS and the tin is returned as the argument tin.

Tin Mode
(c)
If field is blank and not optional, for Validate the message says "ERROR no tin specified" and 
the return code is NO_NAME and no tin is returned as the argument tin.
(d)
If field is blank and optional, for Validate there is no message and the return code is NO_NAME 
and no tin is returned as the argument tin.

**GET_DISK_TIN_ERROR = 35**
TIN RETURN CODES

**NO_TIN = 9**

**TIN_EXISTS = 11**

**DISK_TIN_EXISTS = 12**

**NO_NAME = 10**           // when no name is entered (i.e. blank)

**NO_CASE = 8**

Template Mode
Template Mode
MODE
MODE NUMBER
CHECK_TEMPLATE_EXISTS1
7
CHECK_TEMPLATE_CREATE
18
CHECK_TEMPLATE_NEW
19
CHECK_TEMPLATE_MUST_EXIST
20
CHECK_TEMPLATE_MUST_NOT_EXIST         59
CHECK_DISK_TEMPLATE_MUST_EXIST         48
CHECK_EITHER_TEMPLATE_EXISTS              49
GET_TEMPLATE
21
GET_TEMPLATE_CREATE
22
GET_TEMPLATE_ERROR
23
GET_DISK_TEMPLATE_ERROR
40
TEMPLATE RETURN CODES
VALUE
NO_TEMPLATE
13
TEMPLATE_EXISTS
14
DISK_TEMPLATE_EXISTS
20
NEW_TEMPLATE
15
NO_NAME
10
NO_CASE
8

Project Mode
Project Mode
MODE
MODE NUMBER
CHECK_PROJECT_EXISTS
26
CHECK_PROJECT_CREATE
27
CHECK_PROJECT_NEW
28
CHECK_PROJECT_MUST_EXIST
29
CHECK_DISK_PROJECT_MUST_EXIST       36
GET_PROJECT
30
GET_PROJECT_CREATE
31
GET_PROJECT_ERROR
32
GET_DISK_PROJECT_ERROR
37
PROJECT RETURN CODES
VALUE
NO_PROJECT
16
PROJECT_EXISTS
17
NEW_PROJECT
18
NO_NAME
10
NO_CASE
8

---

## Function Mode / Function Type Constants


### Detailed Descriptions

Directory Mode
Directory Mode
MODE
MODE NUMBER
CHECK_DIRECTORY_EXISTS
41
CHECK_DIRECTORY_CREATE
42
CHECK_DIRECTORY_NEW
43
CHECK_DIRECTORY_MUST_EXIST
44
GET_DIRECTORY
45
GET_DIRECTORY_CREATE
46
GET_DIRECTORY_ERROR
47
DIRECTORY RETURN CODES
VALUE
NO_DIRECTORY
21
DIRECTORY_EXISTS
22
NEW_DIRECTORY
23
NO_NAME
10
NO_CASE
8

Function Mode
Function Mode
MODE                                                MODE NUMBER
CHECK_FUNCTION_MUST_EXIST
50
CHECK_FUNCTION_EXISTS
51
CHECK_FUNCTION_CREATE
52
CHECK_DISK_FUNCTION_MUST_EXIST     53
CHECK_EITHER_FUNCTION_EXISTS          54
CHECK_FUNCTION_MUST_NOT_EXIST      90
GET_FUNCTION
55
GET_FUNCTION_CREATE
56
GET_FUNCTION_ERROR
57
GET_DISK_FUNCTION_ERROR
58
FUNCTION RETURN CODES
VALUE
NO_FUNCTION
24
FUNCTION_EXISTS
25
DISK_FUNCTION_EXISTS
26
NEW_FUNCTION
27
NO_NAME
10
NO_CASE
8

Function Type
Function Type
TYPE                                                            TYPE NUMBER
APPLY_TEMPLATE_MACRO
4100
APPLY_TEMPLATES_MACRO
4102
INTERFACE_MACRO
4103
KERB_RETURN_MACRO
4105
RETRIANGULATE_MACRO
4106
STRING_MODIFIERS_MACRO
4108
SURVEY_DATA_REDUCTION_MACRO
4109
SIMPLE_MACRO
4110
CREATE_ROADS_MACRO
4111
SLF_MACRO
4112
FDO_MACRO
4113
VEHICLE_PATH_MACRO
4114
COMPONENT_MACRO
4115
CREATE_ROADS_NEW_MACRO
4116
CUTS_CALC_MACRO
4117

---

## Linestyle Mode, Symbol Mode, Snap Mode


### Detailed Descriptions

Linestyle Mode
Linestyle Mode
MODE                                              MODE NUMBER
CHECK_LINESTYLE_MUST_EXIST              82
CHECK_LINESTYLE_MUST_NOT_EXIST    83
GET_LINESTYLE
84
GET_LINESTYLE_ERROR
85
LINESTYLE RETURN CODES
VALUE
LINESTYLE_EXISTS
80
NO_LINESTYLE
81
NO_NAME
10
NO_CASE
8
The same modes are also used for symbol calls.

Symbol Mode
Symbol Mode
See Linestyle Mode 
MODE                                              MODE NUMBER

Snap Mode
Snap Mode
MODE
MODE NUMBER
Ignore_Snap
0
User_Snap
1
Program_Snap
2
Failed_Snap
-1
No_Snap
0
Point_Snap
1
Line_Snap
2
Grid_Snap
3
Intersection_Snap
4
Cursor_Snap
5
Name_Snap
6
Tin_Snap
7
Model_Snap
8
Height_Snap
9

Super String Use Modes
Super String Use Modes
MODE                                MODE NUMBER
Att_ZCoord_Value                 1
Att_ZCoord_Array                  2
Att_Radius_Array                   3
Att_Major_Array                     4
Att_Diameter_Value                5
Att_Diameter_Array                 6
Att_Text_Array                         7
Att_Colour_Value                    8
Att_Colour_Array                     9
Att_Point_Array                      11
Att_Visible_Array                    12
Att_Contour_Array                 13
Att_Annotate_Value                14
Att_Annotate_Array                15
Att_Attribute_Array                 16
Att_Symbol_Value                  17
Att_Symbol_Array                             18
Att_Segment_Attribute_Array           19
Att_Segment_Annotate_Value           20
Att_Segment_Annotate_Array            21
Att_Segment_Text_Value                  22
Att_Pipe_Justify                                23
Att_Culvert_Value                             24
Att_Culvert_Array                              25
Att_Hole_Value                                 26
Att_Hatch_Value                       27
Att_Solid_Value                         28
Att_Bitmap_Value                      29
Att_World_Annotate                  30
Att_Annotate_Type                    31
Att_XCoord_Array                     32
Att_YCoord_Array                     33
Att_Pattern_Value                     33    ?
Att_Vertex_UID_Array              35
Att_Segment_UID_Array          36
Att_Vertex_Tinable_Value         37
Att_Vertex_Tinable_Array          38

---

## Super String Use Modes


### Detailed Descriptions

Super String Use Modes
Att_Segment_Tinable_Value       39
Att_Segment_Tinable_Array        40
Att_Vertex_Visible_Value             41
Att_Vertex_Visible_Array              42
Att_Segment_Visible_Value          43
Att_Segment_Visible_Array          44
Att_Vertex_Paper_Annotate          45
Att_Segment_Paper_Annotate      46
Att_Database_Point_Array            47
Att_Extrude_Value                         48
Att_Interval_Value                          50
Att_Vertex_Image_Value                 51
Att_Vertex_Image_Array                 52
Att_Matrix_Value                             53
Att_Autocad_Pattern_Value            54
 Att_Null_Levels_Value                   55

Select Mode
Select Mode
MODE
MODE NUMBER
SELECT_STRING
5509
SELECT_STRINGS
5510
NO_NAME
10
NO_CASE
8
TRUE
1
OK
1
FALSE
0

Target Box Flags
Target Box Flags
A Target Box contains many choices for the target. A subset of choices is mapped to an integer flag 
which is the bitwise sum of numbers from the set:
FLAG
NUMBER
Target_Box_Nop
0
Target_Box_Move_To_Original_Model
1
Target_Box_Move_To_One_Model
2
Target_Box_Move_To_Many_Models
4
Target_Box_Copy_To_Original_Model
8
Target_Box_Copy_To_One_Model
16
Target_Box_Copy_To_Many_Models
32
To include all choices
Target_Box_Move_Copy_All
255

---

## Select Mode Constants

Used with `Create_select_button()` and `Create_select_box()`.


### Detailed Descriptions

Widgets Mode
Widgets Mode
HORIZONTAL GROUP                                    MODE NUMBER
BALANCE_WIDGETS_OVER_WIDTH                  1
ALL_WIDGETS_OWN_WIDTH                              2
COMPRESS_WIDGETS_OVER_WIDTH               4
-1 is also allowed
VERTICAL GROUP                                    MODE NUMBER
BALANCE_WIDGETS_OVER_HEIGHT                  1
ALL_WIDGETS_OWN_HEIGHT                              2
COMPRESS_WIDGETS_OVER_HEIGHT               4
-1 is also allowed

Text Alignment Modes for Draw_Box
Text Alignment Modes for Draw_Box
The text drawn in the Draw_Box uses the Text Alignments as given by the Microsoft SetTextAlign 
Function.
The text is drawn on a baseline and has a bounding box that surrounds the text.
The default values are TA_LEFT, TA_TOP and TA_NOUPDATECP.
MODE                                                  MODE NUMBER
TA_NOUPDATECP                               0
The current position is not updated after each text output call. The reference point is passed to 
the next text output function.
TA_UPDATECP                                    1
The current position is updated after each text output call. The current position is used as the 
reference point.
TA_LEFT                                         0
The reference point will be on the left edge of the bounding rectangle.
TA_RIGHT                                      2
The reference point will be on the right edge of the bounding rectangle.
TA_CENTER                                   6
The reference point will be aligned horizontally with the centre of the bounding rectangle.
TA_TOP                                          0
The reference point will be on the top edge of the bounding rectangle.
TA_BOTTOM                                  8
The reference point will be on the bottom edge of the bounding rectangle.
TA_BASELINE                              24
The reference point will be on the base line of the text.
TA_RTLREADING                         256
Middle East language edition of Windows: The text is laid out in right to left reading order, as 
opposed to the default left to right order. This applies only when the font selected into the device 
context is either Hebrew or Arabic. reference point will be on the base line of the text.
TA_MASK                  (TA_BASELINE+TA_CENTER+TA_UPDATECP+TA_RTLREADING)
 VTA_BASELINE                 TA_BASELINE
 VTA_LEFT                          TA_BOTTOM
VTA_RIGHT                        TA_TOP
VTA_CENTER                    TA_CENTER
 VTA_BOTTOM                   TA_RIGHT
VTA_TOP                           TA_LEFT

Set Ups.h
Set Ups.h
#ifndef set_ups_included
#define set_ups_included
// --------------------------------------------------------------------------
// colour conversion stuff
// --------------------------------------------------------------------------
Integer create_rgb(Integer r,Integer g,Integer b)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  return((1 << 31) | (r << 16) | (g << 8) | b);
}
Integer is_rgb(Integer colour)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  return((colour & (1 << 31)) ? 1 : 0);
}
Integer get_rgb(Integer colour,Integer &r,Integer &g,Integer &b)
// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
{
  if(colour & (1 << 31)) {
// a direct colour defined !
    r = (colour & 16711680) >> 16;
    g = (colour &    65280) >> 8;
    b = (colour &      255);
    return(1);
  }
  return(0);
}
#define VIEW_COLOUR 0x7fffffff
#define NO_COLOUR   -1
//----------------------------------------------------------------------------------
// SETUPS
//----------------------------------------------------------------------------------
#define CHECK_MODEL_MUST_EXIST 7
#define CHECK_MODEL_EXISTS 3
#define CHECK_MODEL_CREATE 4
#define CHECK_DISK_MODEL_MUST_EXIST    33
#define CHECK_EITHER_MODEL_EXISTS      38
#define GET_MODEL 10
#define GET_MODEL_CREATE 5
#define GET_MODEL_ERROR 13
#define GET_DISK_MODEL_ERROR 34
#define CHECK_MODEL_MUST_NOT_EXIST     60

---

## Target Box Flags


### Detailed Descriptions

Set Ups.h
#define CHECK_FILE_MUST_EXIST 1
#define CHECK_FILE_CREATE 14
#define CHECK_FILE 22
#define CHECK_FILE_CREATE 14
#define CHECK_FILE_NEW 20
#define CHECK_FILE_APPEND 21
#define CHECK_FILE_WRITE 23
#define GET_FILE 16
#define GET_FILE_MUST_EXIST 17
#define GET_FILE_CREATE 15
#define GET_FILE_NEW 18
#define GET_FILE_APPEND 19
#define GET_FILE_WRITE 24
#define GET_TIN 10
#define CHECK_VIEW_MUST_EXIST 2
#define CHECK_VIEW_MUST_NOT_EXIST      25
#define GET_VIEW 11
#define GET_VIEW_ERROR 6
#define CHECK_TIN_MUST_EXIST 8
#define CHECK_TIN_EXISTS 61
#define CHECK_EITHER_TIN_EXISTS 39
#define CHECK_TIN_NEW 12
#define GET_TIN_ERROR 9
#define CHECK_DISK_TIN_MUST_EXIST      16
#define GET_TIN_CREATE 24
#define GET_DISK_TIN_ERROR 35
#define CHECK_TIN_MUST_NOT_EXIST       91
#define CHECK_TEMPLATE_EXISTS 17
#define CHECK_TEMPLATE_CREATE 18
#define CHECK_TEMPLATE_NEW 19
#define CHECK_TEMPLATE_MUST_EXIST       20
#define CHECK_TEMPLATE_MUST_NOT_EXIST   59
#define GET_TEMPLATE 21
#define GET_TEMPLATE_CREATE 22
#define GET_TEMPLATE_ERROR 23
#define GET_DISK_TEMPLATE_ERROR 40
#define CHECK_DISK_TEMPLATE_MUST_EXIST  48 
#define CHECK_EITHER_TEMPLATE_EXISTS    49
#define CHECK_PROJECT_EXISTS 26
#define CHECK_PROJECT_CREATE 27
#define CHECK_PROJECT_NEW 28
#define CHECK_PROJECT_MUST_EXIST       29
#define CHECK_DISK_PROJECT_MUST_EXIST  36
#define GET_PROJECT 30
#define GET_PROJECT_CREATE 31
#define GET_PROJECT_ERROR 32
#define GET_DISK_PROJECT_ERROR 37
#define CHECK_DIRECTORY_EXISTS 41
#define CHECK_DIRECTORY_CREATE 42
#define CHECK_DIRECTORY_NEW 43

Set Ups.h
#define CHECK_DIRECTORY_MUST_EXIST     44
#define GET_DIRECTORY 45
#define GET_DIRECTORY_CREATE 46
#define GET_DIRECTORY_ERROR 47
#define CHECK_FUNCTION_MUST_EXIST 50
#define CHECK_FUNCTION_EXISTS 51
#define CHECK_FUNCTION_CREATE 52
#define CHECK_DISK_FUNCTION_MUST_EXIST    53
#define CHECK_EITHER_FUNCTION_EXISTS      54
#define GET_FUNCTION 55
#define GET_FUNCTION_CREATE 56
#define GET_FUNCTION_ERROR 57
#define GET_DISK_FUNCTION_ERROR 58
#define CHECK_FUNCTION_MUST_NOT_EXIST     90
#define CHECK_LINESTYLE_MUST_EXIST 82
#define CHECK_LINESTYLE_MUST_NOT_EXIST    83
#define GET_LINESTYLE 84
#define GET_LINESTYLE_ERROR 85
//    return codes
#define NO_NAME 10
#define NO_MODEL 1
#define MODEL_EXISTS 2
#define DISK_MODEL_EXISTS   19
#define NEW_MODEL 3
#define NO_FILE 4
#define FILE_EXISTS 5
#define NO_FILE_ACCESS      6
#define NO_VIEW 6
#define VIEW_EXISTS 7
#define NO_CASE 8
#define NO_TIN 9
#define TIN_EXISTS 11
#define DISK_TIN_EXISTS     12
#define NO_TEMPLATE 13
#define TEMPLATE_EXISTS       14
#define DISK_TEMPLATE_EXISTS  20
#define NEW_TEMPLATE 15
#define NO_PROJECT 16
#define PROJECT_EXISTS      17
#define NEW_PROJECT 18
#define NO_DIRECTORY 21
#define DIRECTORY_EXISTS    22
#define NEW_DIRECTORY       23
#define NO_FUNCTION 24
#define FUNCTION_EXISTS       25

---

## Widget Mode Constants

Used with widget `Create_*` calls and `Validate()`. Covers alignment, sizing, message levels, colour modes, and other widget flags.


### Detailed Widget Mode Descriptions

Set Ups.h
#define DISK_FUNCTION_EXISTS  26
#define NEW_FUNCTION 27
#define LINESTYLE_EXISTS      80
#define NO_LINESTYLE 81
#define SELECT_STRING   5509
#define SELECT_STRINGS  5510
// teststyle data constants
#define Textstyle_Data_Textstyle 0x001
#define Textstyle_Data_Colour    0x002
#define Textstyle_Data_Type      0x004
#define Textstyle_Data_Size      0x008
#define Textstyle_Data_Offset    0x010
#define Textstyle_Data_Raise     0x020
#define Textstyle_Data_Justify_X 0x040
#define Textstyle_Data_Justify_Y 0x080
#define Textstyle_Data_Angle     0x100
#define Textstyle_Data_Slant     0x200
#define Textstyle_Data_X_Factor  0x400
#define Textstyle_Data_Name      0x800
#define Textstyle_Data_All       0xfff
// textstyle data box constants - V9 compatible - for V10 and beyond see below
#define Show_favorites_box     0x00000001
#define Show_textstyle_box     0x00000002
#define Show_colour_box 0x00000004
#define Show_type_box 0x00000008
#define Show_size_box 0x00000010
#define Show_offset_box 0x00000020
#define Show_raise_box 0x00000040
#define Show_justify_box       0x00000080
#define Show_angle_box 0x00000100
#define Show_slant_box 0x00000200
#define Show_x_factor_box      0x00000400
#define Show_name_box 0x00000800
#define Show_draw_box 0x00001000
#define Show_underline_box     0x00002000
#define Show_strikeout_box     0x00004000
#define Show_italic_box 0x00008000
#define Show_weight_box 0x00010000
#define Show_all_boxes 0x0001ffff
#define Show_std_boxes 0x0001f7ff
#define Optional_textstyle_box 0x00020000
#define Optional_colour_box    0x00040000
#define Optional_type_box      0x00080000
#define Optional_size_box      0x00100000
#define Optional_offset_box    0x00200000
#define Optional_raise_box     0x00400000
#define Optional_justify_box   0x00800000
#define Optional_angle_box     0x01000000
#define Optional_slant_box     0x02000000
#define Optional_x_factor_box  0x04000000
#define Optional_name_box      0x08000000

Set Ups.h
#define Optional_underline_box 0x10000000
#define Optional_strikeout_box 0x20000000
#define Optional_italic_box    0x40000000
#define Optional_weight_box    0x80000000
#define Optional_all_boxes     0xfffe0000
#define Optional_std_boxes     0xf7fe0000
// V10 textstyle data box constants - only to be used with
// Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box,Integer flags,
//                     Integer optionals)
// this is the only way to correctly access the additional fields introduced in V10 (whiteout, border,outline)
#define V10_Show_favorites_box     0x00000001
#define V10_Show_textstyle_box     0x00000002
#define V10_Show_colour_box 0x00000004
#define V10_Show_type_box 0x00000008
#define V10_Show_size_box 0x00000010
#define V10_Show_offset_box 0x00000020
#define V10_Show_raise_box 0x00000040
#define V10_Show_justify_box       0x00000080
#define V10_Show_angle_box 0x00000100
#define V10_Show_slant_box 0x00000200
#define V10_Show_x_factor_box      0x00000400
#define V10_Show_name_box 0x00000800
#define V10_Show_draw_box 0x00001000
#define V10_Show_underline_box     0x00002000
#define V10_Show_strikeout_box     0x00004000
#define V10_Show_italic_box 0x00008000
#define V10_Show_weight_box 0x00010000
#define V10_Show_whiteout_box      0x00020000
#define V10_Show_border_box 0x00040000
#define V10_Show_outline_box       0x00080000
#define V10_Show_all_boxes 0x000fffff
#define V10_Optional_textstyle_box 0x00000002
#define V10_Optional_colour_box    0x00000004
#define V10_Optional_type_box      0x00000008
#define V10_Optional_size_box      0x00000010
#define V10_Optional_offset_box    0x00000020
#define V10_Optional_raise_box     0x00000040
#define V10_Optional_justify_box   0x00000080
#define V10_Optional_angle_box     0x00000100
#define V10_Optional_slant_box     0x00000200
#define V10_Optional_x_factor_box  0x00000400
#define V10_Optional_name_box      0x00000800
#define V10_Optional_underline_box 0x00001000
#define V10_Optional_strikeout_box 0x00002000
#define V10_Optional_italic_box    0x00004000
#define V10_Optional_weight_box    0x00008000
#define V10_Optional_whiteout_box  0x00010000
#define V10_Optional_border_box    0x00020000
#define V10_Optional_outline_box   0x00040000
#define V10_Optional_all_boxes     0x0007fffe
#define V10_Show_std_boxes   0x0001f7ff ,
 V10_Optional_whiteout_box | V10_Optional_border_box | V10_Optional_outline_box
#define V10_Optional_std_boxes     0xf7fe0000

Set Ups.h
// note the critical placement of the , in V10_Show_std_boxes
// since the flags and optionals are now split into 2 separate words, the call to
// Textstyle_Data_Box Create_textstyle_data_box(Text text,Message_Box box, 
//                   Integer flags,Integer optionals)
// requires two arguments, so if 
//
// Textstyle_Data_Box my_box = Create_textstyle_data_box("Contour label",messages,
//                   V10_Show_std_boxes)
//
// is going the same as
//
// Textstyle_Data_Box my_box = Create_textstyle_data_box("Contour label",messages,
//            V10_Show_all_boxes & ~V10_Show_name_box,
//            V10_Optional_whiteout_box |  V10_Optional_border_box | V10_Optional_outline_box)
//
// source box constants
#define Source_Box_Model 0x001
#define Source_Box_View 0x002
#define Source_Box_String 0x004
#define Source_Box_Rectangle      0x008
#define Source_Box_Trapezoid      0x010
#define Source_Box_Polygon 0x020
#define Source_Box_Lasso 0x040
#define Source_Box_Filter 0x080
#define Source_Box_Models 0x100
#define Source_Box_Favorites      0x200
#define Source_Box_All 0xfff
#define Source_Box_Fence_Inside   0x01000
#define Source_Box_Fence_Cross    0x02000
#define Source_Box_Fence_Outside  0x04000
#define Source_Box_Fence_String   0x08000
#define Source_Box_Fence_Points   0x10000
#define Source_Box_Fence_All      0xff000
#define Source_Box_Standard       Source_Box_All | Source_Box_Fence_Inside | 
Source_Box_Fence_Outside | Source_Box_Fence_Cross | Source_Box_Fence_String
// target box constants
#define Target_Box_Move_To_Original_Model 0x0001   /* change/replace data */
#define Target_Box_Move_To_One_Model      0x0002   /* move/delete original data */
#define Target_Box_Move_To_Many_Models    0x0004   /* move/delete original data */
#define Target_Box_Copy_To_Original_Model 0x0008   /* copy data */
#define Target_Box_Copy_To_One_Model      0x0010   /* copy data */
#define Target_Box_Copy_To_Many_Models    0x0020   /* copy data */
#define Target_Box_Move_Copy_All 0x00ff
#define Target_Box_Delete 0x1000   /* delete data (exclusive of all others ?) */
// more constants
#define TRUE  1
#define FALSE 0
#define OK    1
// modes for Horizontal_Group (note -1 is also allowed)

Set Ups.h
#define BALANCE_WIDGETS_OVER_WIDTH  1
#define ALL_WIDGETS_OWN_WIDTH       2
#define COMPRESS_WIDGETS_OVER_WIDTH 4
// modes for Vertical_Group (note -1 is also allowed)
#define BALANCE_WIDGETS_OVER_HEIGHT  1
#define ALL_WIDGETS_OWN_HEIGHT       2
#define ALL_WIDGETS_OWN_LENGTH       4
// snap controls
#define Ignore_Snap  0
#define User_Snap    1
#define Program_Snap 2
// snap modes
#define Failed_Snap       -1
#define No_Snap 0
#define Point_Snap 1
#define Line_Snap 2
#define Grid_Snap 3
#define Intersection_Snap  4
#define Cursor_Snap 5
#define Name_Snap 6
#define Tin_Snap 7
#define Model_Snap 8
#define Height_Snap 9
#define Segment_Snap      11
#define Text_Snap 12
#define Fast_Snap 13
#define Fast_Accept       14
// super string dimensions
#define Att_ZCoord_Value 1
#define Att_ZCoord_Array 2
#define Att_Radius_Array 3
#define Att_Major_Array 4
#define Att_Diameter_Value 5
#define Att_Diameter_Array 6
#define Att_Vertex_Text_Array 7
#define Att_Segment_Text_Array 8
#define Att_Colour_Array 9
#define Att_Vertex_Text_Value 10
#define Att_Point_Array 11
#define Att_Visible_Array 12
#define Att_Contour_Array 13
#define Att_Vertex_Annotate_Value    14
#define Att_Vertex_Annotate_Array    15
#define Att_Vertex_Attribute_Array   16
#define Att_Symbol_Value 17
#define Att_Symbol_Array 18
#define Att_Segment_Attribute_Array  19
#define Att_Segment_Annotate_Value   20
#define Att_Segment_Annotate_Array   21
#define Att_Segment_Text_Value       22

Set Ups.h
#define Att_Pipe_Justify 23
#define Att_Culvert_Value 24
#define Att_Culvert_Array 25
#define Att_Hole_Value 26
#define Att_Hatch_Value 27
#define Att_Solid_Value 28
#define Att_Bitmap_Value 29
#define Att_Vertex_World_Annotate    30
#define Att_Segment_World_Annotate   31
#define Att_Geom_Array 32
#define Att_Pattern_Value 33
#define Att_Vertex_UID_Array 35
#define Att_Segment_UID_Array 36
#define Att_Vertex_Tinable_Value     37
#define Att_Vertex_Tinable_Array     38
#define Att_Segment_Tinable_Value    39
#define Att_Segment_Tinable_Array    40
#define Att_Vertex_Visible_Value     41
#define Att_Vertex_Visible_Array     42
#define Att_Segment_Visible_Value    43
#define Att_Segment_Visible_Array    44
#define Att_Vertex_Paper_Annotate    45
#define Att_Segment_Paper_Annotate   46
#define Att_Database_Point_Array     47
#define Att_Extrude_Value 48
#define Att_Interval_Value 50
#define concat(a,b) a##b
#define String_Super_Bit(n) (1 << concat(Att_,n))
#define All_String_Super_Bits 65535
// function identifiers
#define APPLY_TEMPLATE_MACRO_T 4100
#define APPLY_TEMPLATES_MACRO_T       4102
#define INTERFACE_MACRO_T 4103
#define TURKEY_NEST_MACRO_T 4104
#define KERB_RETURN_MACRO_T 4105
#define RETRIANGULATE_MACRO_T 4106
#define RUN_MACRO_T 4107
#define STRING_MODIFIERS_MACRO_T      4108
#define SURVEY_DATA_REDUCTION_MACRO_T 4109
#define SIMPLE_MACRO_T 4110
#define CREATE_ROADS_MACRO_T 4111
#define SLF_MACRO_T 4112
// constants for Create_select_box mode
#define SELECT_STRING 5509
#define SELECT_STRINGS 5510
#define SELECT_SUB_STRING 5515
#define SELECT_SUB_STRINGS 5516
// values for special characters

Set Ups.h
#define Degrees_character 176
#define Squared_character 178
#define Cubed_character 179
#define Middle_dot_character     183
#define Diameter_large_character 216
#define Diameter_small_character 248
#define Degrees_text "°"
#define Squared_text "²"
#define Cubed_text "³"
#define Middle_dot_text "·"
#define Diameter_small_text      "ø"
#define Diameter_large_text      "Ø"
// definitions for last parameter of Shell_execute
#define SW_HIDE 0
#define SW_SHOWNORMAL       1
#define SW_NORMAL 1
#define SW_SHOWMINIMIZED    2
#define SW_SHOWMAXIMIZED    3
#define SW_MAXIMIZE 3
#define SW_SHOWNOACTIVATE   4
#define SW_SHOW 5
#define SW_MINIMIZE 6
#define SW_SHOWMINNOACTIVE  7
#define SW_SHOWNA 8
#define SW_RESTORE 9
#define SW_SHOWDEFAULT      10
#define SW_FORCEMINIMIZE    11
#define SW_MAX 11
// **********************************************************************
// transparency
// **********************************************************************
#define TRANSPARENT 1
#define OPAQUE 2
// **********************************************************************
// Text Alignment Options
// **********************************************************************
#define TA_NOUPDATECP 0
#define TA_UPDATECP 1
#define TA_LEFT 0
#define TA_RIGHT 2
#define TA_CENTER 6
#define TA_TOP 0
#define TA_BOTTOM 8
#define TA_BASELINE 24
#define TA_RTLREADING 256
#define TA_MASK       (TA_BASELINE+TA_CENTER+TA_UPDATECP+TA_RTLREADING)

---

## Text Alignment Modes for Draw_Box


### Detailed Descriptions

Set Ups.h
#define VTA_BASELINE TA_BASELINE
#define VTA_LEFT     TA_BOTTOM
#define VTA_RIGHT    TA_TOP
#define VTA_CENTER   TA_CENTER
#define VTA_BOTTOM   TA_RIGHT
#define VTA_TOP      TA_LEFT
// **********************************************************************
// font types
// **********************************************************************
#define FW_DONTCARE 0
#define FW_THIN 100
#define FW_EXTRALIGHT       200
#define FW_LIGHT 300
#define FW_NORMAL 400
#define FW_MEDIUM 500
#define FW_SEMIBOLD 600
#define FW_BOLD 700
#define FW_EXTRABOLD 800
#define FW_HEAVY 900
#define FW_ULTRALIGHT       FW_EXTRALIGHT
#define FW_REGULAR FW_NORMAL
#define FW_DEMIBOLD FW_SEMIBOLD
#define FW_ULTRABOLD FW_EXTRABOLD
#define FW_BLACK FW_HEAVY
// **********************************************************************
// raster op codes
// **********************************************************************
#define R2_BLACK 1   /*  0       */
#define R2_NOTMERGEPEN      2   /* DPon     */
#define R2_MASKNOTPEN       3   /* DPna     */
#define R2_NOTCOPYPEN       4   /* PN       */
#define R2_MASKPENNOT       5   /* PDna     */
#define R2_NOT 6   /* Dn       */
#define R2_XORPEN 7   /* DPx      */
#define R2_NOTMASKPEN       8   /* DPan     */
#define R2_MASKPEN 9   /* DPa      */
#define R2_NOTXORPEN 10  /* DPxn     */
#define R2_NOP 11  /* D */
#define R2_MERGENOTPEN      12  /* DPno     */
#define R2_COPYPEN 13  /* P */
#define R2_MERGEPENNOT      14  /* PDno     */
#define R2_MERGEPEN 15  /* DPo      */
#define R2_WHITE 16  /*  1       */
#define R2_LAST 16
// **********************************************************************
// Ternary raster operations
// **********************************************************************
#define SRCCOPY 0x00CC0020 /* dest = source */
#define SRCPAINT 0x00EE0086 /* dest = source OR dest */
#define SRCAND 0x008800C6 /* dest = source AND dest */

Set Ups.h
#define SRCINVERT 0x00660046 /* dest = source XOR dest */
#define SRCERASE 0x00440328 /* dest = source AND (NOT dest )   */
#define NOTSRCCOPY 0x00330008 /* dest = (NOT source) */
#define NOTSRCERASE 0x001100A6 /* dest = (NOT src) AND (NOT dest) */
#define MERGECOPY 0x00C000CA /* dest = (source AND pattern)     */
#define MERGEPAINT 0x00BB0226 /* dest = (NOT source) OR dest     */
#define PATCOPY 0x00F00021 /* dest = pattern */
#define PATPAINT 0x00FB0A09 /* dest = DPSnoo */
#define PATINVERT 0x005A0049 /* dest = pattern XOR dest */
#define DSTINVERT 0x00550009 /* dest = (NOT dest) */
#define BLACKNESS 0x00000042 /* dest = BLACK */
#define WHITENESS 0x00FF0062 /* dest = WHITE */
// Quaternary raster codes
#define MAKEROP4(fore,back) (DWORD)((((back) << 8) & 0xFF000000) | (fore))
// Colour Message Box
#define MESSAGE_LEVEL_GENERAL 1
#define MESSAGE_LEVEL_WARNING 2
#define MESSAGE_LEVEL_ERROR   3
#define MESSAGE_LEVEL_GOOD    4
#endif

