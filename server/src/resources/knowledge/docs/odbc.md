# ODBC, Synergy, Sharing, Highlight, and Internal Macro Calls

> Source: 12d Model Macro Manual §5.67–§5.72 (pages 1333–1385)

---

## ODBC Database Calls (§5.67)

12dPL provides ODBC database connectivity through typed query objects. Use a `Connection`
to open a data source, then create query objects to execute SQL.

### Type Overview

| Type | Purpose |
|------|---------|
| `Connection` | Open/close an ODBC data source connection |
| `Select_Query` | Execute SELECT statements and iterate result rows |
| `Insert_Query` | Execute INSERT with parameter binding |
| `Update_Query` | Execute UPDATE with parameter binding |
| `Delete_Query` | Execute DELETE with parameter binding |
| `Transaction` | Wrap multiple queries in a transaction block |

ODBC Macro Calls
5.67 ODBC Macro Calls
The ODBC (Open Database Connectivity) macro calls allow a macro to interface with external data 
sources via ODBC. These data sources include any ODBC enabled database or spreadsheets such 
as Excel. This is particularly useful for custom querying of GIS databases.
Terminology
s
A Connection refers to a connection to a known data source.
s
A Query refers to an operation against the database (See Query Types for more information)
s
A Query Condition is a set of conditions applied against a query to constrain the information being 
returned.
s
A Transaction refers to an atomic, discrete operation that has a known start and end. Any changes to 
your data source will not apply until the transaction is committed.
s
A Parameter refers to a known keyword pair for supplied values, which is important for security pur­
poses
See 5.67.1 Connecting to an external data source
See 5.67.2 Querying against a data source
See 5.67.3 Navigating results with Database_Result
See 5.67.4 Insert Query
See 5.67.5 Update Query
See 5.67.6 Delete Query
See 5.67.7 Manual Query
See 5.67.8 Query Conditions
See 5.67.9 Transactions
See 5.67.10 Parameters
5.67.1 Connecting to an external data source
Before running queries, a connection must be made to the database. It is also good practise to close 
the connection when you are finally finished with it.

### `Create_ODBC_connection`

```c
Connection Create_ODBC_connection()
```

Creates an ODBC connection object, which may then by used to connect to a database.

> ID = 2501

### `Connect`

```c
Integer Connect(Connection connection,Text connection_string,Text user,Text password)
```

This call attempts to connect to an external data source, with a username and password. A connection string must also be supplied. This is data source specific and ODBC driver specific. For more information on connection strings, see the vendor of the data source or data source driver. ODBC Macro Calls Chapter This call returns 0 if successful.

> ID = 2502

### `Connect`

```c
Integer Connect(Connection connection, Text connection_string)
```

This call attempts to connect to an external data source. A connection string must also be supplied. This is data source specific and ODBC driver specific. For more information on connection strings, see the vendor of the data source or data source driver. This call returns 0 if successful.

> ID = 2503

### `Close`

```c
Integer Close(Connection connection)
```

This call determines if there was an error performing an operation against the connection. This call will return 1 if there was an error.

> ID = 2504

### `Has_error`

```c
Integer Has_error(Connection connection)
```

This call will check if an error has occurred as the result of an operation. Has_error should always be called after any operation. If there is an error, Get_last_error can be used to retrieve the result. This call will return 0 if there is no error, and 1 if there is.

> ID = 2512

### `Get_last_error`

```c
Integer Get_last_error(Connection connection,Text &status,Text &message)
```

This call will get the last error, if there is one, and retrieve the status and message of the error. This call will return 0 if successful.

> ID = 2513

Return to 5.67 ODBC Macro Calls

ODBC Macro Calls
5.67.2 Querying against a data source
Once connected, you may query the data source in a number of ways. Queries are typically 
implemented in SQL (the Structured Query Language). To make it easier to use, the macro 
language provides an interface to building up queries without having to use SQL. There are several 
types of query building objects.
The query is not run until the appropriate Execute function is called.
s
Select_Query - Used to retrieve information from the data source
s
Insert_Query - Used to insert new information into the data source
s
Update_Query - Used to update existing information in the data source
s
Delete_Query - Used to delete information from a data source
A Manual_Query also exists, if you wish to define the SQL yourself.
Note that a query execution may return as successful even if no data was changed.
Select Query
Select queries are used to retrieve information, with or without constraints, from the data source. 
Select queries are defined by tables and columns, from which to retrieve results, and optional query 
conditions to constrain them.

### `Create_select_query`

```c
Select_Query Create_select_query()
```

Creates and returns a select query object.

> ID = 2528

### `Add_table`

```c
Integer Add_table(Select_Query query,Text table_name)
```

This call adds a table of a given name to the supplied query. The query will look at this table when retrieving data. This call returns 0 if successful.

> ID = 2529

### `Add_result_column`

```c
Integer Add_result_column(Select_Query query,Text table,Text column_name) ODBC Macro Calls Chapter
```

This call adds a result column that belongs to a given table to the query. Note that the table must already be added for this to work. The query will retrieve that column from the supplied table when it runs. The call returns 0 if successful.

> ID = 2531

Add_result_column(Select_Query query,Text table,Text column_name,Text
    return_as)   
Name
Integer Add_result_column(Select_Query query,Text table,Text column_name,Text return_as) 
Description
This call adds a result column that belongs to a given table to the query. Note that the table must 
already be added for this to work. The query will retrieve that column from the supplied table when it 
runs, but in the results it will be called by the name you supply.
The call returns 0 if successful.
ID = 2530
Add_order_by(Select_Query query,Text table_name,Text column_name,Integer
         sort_ascending)   
Name
Integer Add_order_by(Select_Query query,Text table_name,Text column_name,Integer sort_ascending)   
Description
This call will instruct the query to order the results for a column in a table. Set sort_ascending to 1 if 
you wish the results to be sorted in ascending order.
This call returns 0 if successful.
ID = 2533

### `Set_limit`

```c
Integer Set_limit(Select_Query query,Integer start,Integer number_to_retrieve)
```

This call will set an upper limit on the number of results to read, as well as defining the start index of the returned results. This is useful when you have many results that you wish to return in discrete sets or pages. This call returns 0 if successful.

> ID = 2534

### `Add_group_by`

```c
Integer Add_group_by(Select_Query query,Text table_name,Text column_name) ODBC Macro Calls
```

This call will group results by a given table and column name. This is useful if your data provider allows aggregate functions for your queries. This call returns 0 if successful.

> ID = 2532

### `Add_condition`

```c
Integer Add_condition(Select_Query query,Query_Condition condition)
```

This call will add a query condition to a select query. A query condition will allow you to constrain your results to defined values. See the section 5.67.8 Query Conditions on how to create and defined Query Conditions. This call returns 0 if successful.

> ID = 2535

### `Execute`

```c
Integer Execute(Connection connection,Select_Query query)
```

This call will execute a created select query for a scalar value. The return value of the call will be the result of the query.

> ID = 2505

### `Execute`

```c
Integer Execute(Connection connection,Select_Query query,Database_Result &result)
```

This call will execute a created select query and return a set of results in the result argument. See the section on 5.67.3 Navigating results with Database_Result for more information on the Database_Result object. This call will return 0 if successful.

> ID = 2506

Return to 5.67 ODBC Macro Calls
5.67.3 Navigating results with Database_Result
If a select or manual query returns results, they will be stored in a Database_Result object. A 
Database_Result may be visualised as a table of rows and columns. The Database_Result can be 
used to access these results in a sequential fashion, in a forward only direction.

ODBC Macro Calls
Chapter

### `Move_next`

```c
Integer Move_next(Database_Result result)
```

This call moves a database result to the next row. Depending on your provider, you may need to call this before reading the first row. This call will return 0 if the Database_Result was able to move to the next row.

> ID = 2514

### `Close`

```c
Integer Close(Database_Result result)
```

This call will close a database result. This is generally good practise as your data provider may not allow more than one Database_Result to exist at one time. This call will return 0 if successful.

> ID = 2515

### `Get_result_column`

```c
Integer Get_result_column(Database_Result result,Integer column,Text &res)
```

This call will retrieve a text value from a Database_Result, at the current index as given by column. The value will be stored in res. This call will return 0 if successful.

> ID = 2516

### `Get_result_column`

```c
Integer Get_result_column(Database_Result result,Integer column,Integer &res)
```

This call will retrieve an Integer value from a Database_Result, at the current index as given by column. The value will be stored in res. This call will return 0 if successful.

> ID = 2517

### `Get_result_column`

```c
Integer Get_result_column(Database_Result result,Integer column,Real &res)
```

This call will retrieve a Real value from a Database_Result, at the current index as given by ODBC Macro Calls column. The value will be stored in res. This call will return 0 if successful.

> ID = 2518

### `Get_time_result_column`

```c
Integer Get_time_result_column(Database_Result result,Integer column,Integer &time)
```

This call will retrieve a timestamp, as an Integer value, from a Database_Result, at the current index as given by column. The value will be stored in res. This call will return 0 if successful.

> ID = 2519

### `Get_result_column`

```c
Integer Get_result_column(Database_Result result,Text column,Text &res)
```

This call will retrieve a text value from a Database_Result, from the column named by the argument column. The value will be stored in res. This call will return 0 if successful.

> ID = 2520

Get_result_column(Database_Result result,Database_Result result,Text column,
     Integer &res) 
Name
Integer Get_result_column(Database_Result result,Database_Result result,Text column,Integer &res) 
Description
This call will retrieve an Integer value from a Database_Result, from the column named by the 
argument column. The value will be stored in res.
This call will return 0 if successful.
ID = 2521

### `Get_result_column`

```c
Integer Get_result_column(Database_Result result,Text column,Real &res)
```

This call will retrieve a Real value from a Database_Result, from the column named by the argument column. The value will be stored in res. This call will return 0 if successful.

> ID = 2522

ODBC Macro Calls
Chapter

### `Get_time_result_column`

```c
Integer Get_time_result_column(Database_Result result,Text column,Integer &time)
```

This call will retrieve a timestamp value, as an Integer, from a Database_Result, from the column named by the argument column. The value will be stored in res. This call will return 0 if successful.

> ID = 2523

Return to 5.67 ODBC Macro Calls
5.67.4 Insert Query
An insert query is used to insert new data into a data provider. Typically, this will insert one row of 
data into one table at a time.

### `Create_insert_query`

```c
Insert_Query Create_insert_query(Text table)
```

This call creates and returns an insert query object. The insert will be applied against the value supplied in table.

> ID = 2536

### `Add_data`

```c
Integer Add_data(Insert_Query query,Text column_name,Integer value)
```

This call will add Integer data to be inserted to a created Insert_Query when it is executed. The data will be inserted into the column named by the column_name argument. This call returns 0 if successful.

> ID = 2537

### `Add_data`

```c
Integer Add_data(Insert_Query query,Text column_name,Text value)
```

This call will add Text data to be inserted to a created Insert_Query when it is executed. The data will be inserted into the column named by the column_name argument. This call returns 0 if successful.

> ID = 2538

ODBC Macro Calls

### `Add_data`

```c
Integer Add_data(Insert_Query query,Text column_name,Real value)
```

This call will add Real data to be inserted to a created Insert_Query when it is executed. The data will be inserted into the column named by the column_name argument. This call returns 0 if successful.

> ID = 2539

### `Add_time_data`

```c
Integer Add_time_data(Insert_Query query,Text column_name,Integer time)
```

This call will add timestamp data, stored as an Integer value, to be inserted to a created Insert_Query when it is executed. The data will be inserted into the column named by the column_name argument. This call returns 0 if successful.

> ID = 2540

### `Execute`

```c
Integer Execute(Connection connection,Insert_Query query)
```

This call will execute a created Insert_Query against the data provider to insert some new data. This call will return 0 if successful.

> ID = 2507

Return to 5.67 ODBC Macro Calls
5.67.5 Update Query
An update query is used to update existing data in a table in a data provider. One or more rows may 
be updated by using query conditions to constrain which rows the update should be applied against.

### `Create_update_query`

```c
Update_Query Create_update_query(Text table)
```

This call creates and returns an Update_Query. The update query will be applied against the table ODBC Macro Calls Chapter given by the table argument.

> ID = 2541

### `Add_data`

```c
Integer Add_data(Update_Query query,Text column_name,Integer value)
```

This call will add Integer data for a column update, when the Update_Query is executed. The data will be updated for the column named by the column_name argument. This call returns 0 if successful.

> ID = 2542

### `Add_data`

```c
Integer Add_data(Update_Query query,Text column_name,Text value)
```

This call will add Text data for a column update, when the Update_Query is executed. The data will be updated for the column named by the column_name argument. This call returns 0 if successful.

> ID = 2543

### `Add_data`

```c
Integer Add_data(Update_Query query,Text column_name,Real value)
```

This call will add Real data for a column update, when the Update_Query is executed. The data will be updated for the column named by the column_name argument. This call returns 0 if successful.

> ID = 2544

### `Add_time_data`

```c
Integer Add_time_data(Update_Query query,Text column_name,Integer time)
```

This call will add timestamp data, stored as an Integer value, for a column update, when the Update_Query is executed. The data will be updated for the column named by the column_name argument. This call returns 0 if successful.

> ID = 2545

Add_condition(Update_Query query,Query_Condition condition)   

ODBC Macro Calls
Name
Integer Add_condition(Update_Query query,Query_Condition condition)   
Description
This call will add a created Query_Condition to an update query. Using a Query_Condition 
enables the operation to be constrained to a number of rows, rather than applying to an entire table.
This call will return 0 if successful.
ID = 2546

### `Execute`

```c
Integer Execute(Connection connection,Update_Query query)
```

This call will execute a created Update_Query against the data provider to update existing data. This call will return 0 if successful.

> ID = 2508

Return to 5.67 ODBC Macro Calls
5.67.6 Delete Query
A delete query will delete data from a table in a data provider. It should always be constrained using 
a Query Condition, or you may delete all data from a table.

### `Create_delete_query`

```c
Delete_Query Create_delete_query(Text table)
```

This call will create and return a Delete_Query. When it is executed, it will delete data from the table named by the table argument.

> ID = 2547

### `Add_condition`

```c
Integer Add_condition(Delete_Query query,Query_Condition condition)
```

This call will add a Query_Condition to a Delete_Query. Adding a Query_Condition will allow you to constrain which rows of data are deleted from the table. This call will return 0 if successful.

> ID = 2548

### `Execute`

```c
Integer Execute(Connection connection,Delete_Query query) ODBC Macro Calls Chapter
```

This call will execute a created Delete_Query against the data provider to delete existing data. This call will return 0 if successful.

> ID = 2509

Return to 5.67 ODBC Macro Calls
5.67.7 Manual Query
Using a manual query gives you direct access to the underlying SQL used by most data providers. If 
you are familiar with SQL, it may be faster for you to use this method. This also gives you access to 
Parameters, for secure and sanitized inputs. See the section on Parameters for more information.

### `Create_manual_query`

```c
Manual_Query Create_manual_query(Text query_text)
```

This call will create a new Manual_Query. The SQL for the query must be supplied in the query_text argument.

> ID = 2549

### `Get_parameters`

```c
Integer Get_parameters(Manual_Query query,Parameter_Collection parameters)
```

This call will retrieve the set of Parameters that a Manual Query uses. Parameters are not required but provide greater security when using user input. See the section on Parameters for more details. This call will return 0 if successful.

> ID = 2550

### `Execute`

```c
Integer Execute(Connection connection,Manual_Query query)
```

This call will execute a created Manual_Query against the data provider to perform a custom operation. This call will return 0 if successful.

> ID = 2510

### `Execute`

```c
ODBC Macro Calls Integer Execute(Connection connection,Manual_Query query,Database_Result &result)
```

This call will execute a created Manual_Query against the data provider to perform a custom operation. If the Manual Query returns results, they will be stored in the result argument. This call will return 0 if successful.

> ID = 2511

Return to 5.67 ODBC Macro Calls
5.67.8 Query Conditions
A query condition constrains the results of a select, update or delete query. They are generally 
optimised and much more efficient that attempting to cull down a large result set on your own, as the 
operation is performed by the data provider. For those familiar with SQL, a Query Condition helps 
build up the 'WHERE' clause in an SQL statement.
One or more query conditions can be used to constrain a query.
The following Query Conditions are available:
s
A value condition - Constrains by checking if a column value matches a constant, user defined value
s
Column match condition - Performs an 'explicit join'. If you are retrieving results from more than one 
table, this can be used to determine which rows from each table are related to one another. Typically 
you would match id columns from each table.
s
Value in list condition - Checks if a column value is inside a list of values
s
Value in sub query - Checks if a column value is inside the result of another select query
s
Manual condition - A manual condition, defined by SQL. This gives greater flexibility and provides 
access to the Parameter functions, for security and sanitization of inputs.
Value and Column match conditions allow various operators to be used.
These operators are defined below:
Match_Equal = 0
Match_Greater_Than = 1
Match_Less_Than = 2
Match_Greater_Than_Equal = 3
Match_Less_Than_Equal = 4
Match_Not_Equal = 5
Match_Like = 6    
Match_Not_Like = 7
Create_value_condition(Text table_name,Text column_name,Integer operator,Text 
value)   
Name
Query_Condition Create_value_condition(Text table_name,Text column_name,Integer operator,Text value)
Description
This call creates and returns a Value Condition Query Condition for a given table, column, operation 

ODBC Macro Calls
Chapter   
and Text value. See the list of operators for available values of operator.
When executed, the data provider will check that the value in column colum_name inside table 
table_name matches (as appropriate for the given operator) against the supplied value.
ID = 2555
 Create_value_condition(Text table_name,Text column_name,Integer operator,
      Integer value)   
Name
Query_Condition Create_value_condition(Text table_name,Text column_name,Integer operator,Integer 
value)   
Description
This call creates and returns a Value Condition Query Condition for a given table, column, operation 
and Integer value. See the list of operators for available values of operator.
When executed, the data provider will check that the value in column colum_name inside table 
table_name matches (as appropriate for the given operator) against the supplied value.
ID = 2556
 Create_value_condition(Text table_name,Text column_name,Integer operator,
      Real value) 
Name
Query_Condition Create_value_condition(Text table_name,Text column_name,Integer operator,Real value) 
Description
This call creates and returns a Value Condition Query Condition for a given table, column, operation 
and Real value. See the list of operators for available values of operator.
When executed, the data provider will check that the value in column colum_name inside table 
table_name matches (as appropriate for the given operator) against the supplied value.
ID = 2557
 Create_time_value_condition(Text table_name,Text column_name,Integer 
operator,Integer value)   
Name
Query_Condition Create_time_value_condition(Text table_name,Text column_name,Integer operator,Integer 
value)   
Description
This call creates and returns a Value Condition Query Condition for a given table, column, operation 
and timestamp value, as defined by an Integer. See the list of operators for available values of 
operator.
When executed, the data provider will check that the value in column colum_name inside table 
table_name matches (as appropriate for the given operator) against the supplied value.
ID = 2558
Create_column_match_condition(Text left_table,Text left_column,Integer 
operator,Text right_table,Text right_column) 
Name
Query_Condition Create_column_match_condition(Text left_table,Text left_column,Integer operator,Text 
right_table,Text right_column) 
Description

ODBC Macro Calls
This call will create and return a Column Match Query Condition to match two columns in two tables 
against each other, using a supplied operator.
When executed, the data provider will check that the left_column in table left_table matches (as 
appropriate for the given operator) against the right_column in table right_table.
ID = 2559
Create_value_in_sub_query_condition(Text table_name,Text column_name,
          Integer not_in,Select_Query sub_query) 
Name
Query_Condition Create_value_in_sub_query_condition(Text table_name,Text column_name,Integer 
not_in,Select_Query sub_query) 
Description
This call will create and return a Value In Sub Query Query_Condition, to match the value of a 
column against the results of another query.
When executed, the data provider will check that the value in column column_name in table 
table_name is or is not inside (as defined by not_in) the results of the Select Query, sub_query.
 ID = 2560
 Create_value_in_list_condition(Text table_name,Text column_name,Integer
          not_in,Dynamic_Integer values) 
Name
Query_Condition Create_value_in_list_condition(Text table_name,Text column_name,Integer 
not_in,Dynamic_Integer values)
Description
This call will create and return a Value In List Query_Condition, to see if the value of a column is in 
a list of integers.
When executed, the data provider will check that the value in column column_name in table 
table_name is or is not inside (as defined by not_in) the list defined by values.
 ID = 2561
Create_value_in_list_condition(Text table_name,Text column_name,Integer
          not_in,Dynamic_Text values) 
Name
Query_Condition Create_value_in_list_condition(Text table_name,Text column_name,Integer 
not_in,Dynamic_Text values) 
Description
This call will create and return a Value In List Query_Condition, to see if the value of a column is in 
a list of Text values.
When executed, the data provider will check that the value in column column_name in table 
table_name is or is not inside (as defined by not_in) the list defined by values.
 ID = 2562
Create_value_in_list_condition(Text table_name,Text column_name,Integer
          not_in,Dynamic_Real values)   
Name

ODBC Macro Calls
Chapter   
Query_Condition Create_value_in_list_condition(Text table_name,Text column_name,Integer 
not_in,Dynamic_Real values) 
Description
This call will create and return a Value In List Query_Condition, to see if the value of a column is in 
a list of Real values.
When executed, the data provider will check that the value in column column_name in table 
table_name is or is not inside (as defined by not_in) the list defined by values.
ID = 2563

### `Create_manual_condition`

```c
Manual_Condition Create_manual_condition(Text sql)
```

This call will create a Manual Query_Condition. The operation of the manual condition is totally defined by the SQL fragment defined in argument sql.

> ID = 2564

### `Add_table`

```c
Integer Add_table(Manual_Condition manual,Text table)
```

This call will add a table to be used by a Manual Condition. This is required when using Parameters. This call will return 0 if successful.

> ID = 2565

### `Get_parameters`

```c
Integer Get_parameters(Manual_Condition manual,Parameter_Collection &param)
```

This call will add a table to be used by a Manual Condition. This is required when using Parameters. See the section on Parameters for more information. This call will return 0 if successful.

> ID = 2566

Return to 5.67 ODBC Macro Calls
5.67.9 Transactions
A transaction is an atomic operation. While a transaction is running against a connection, a series of 
queries can be made and executed. Using a transaction, the final result (updates, deletes, inserts) 
will not actually be applied until the transaction is committed. This gives the user the opportunity to 
rollback the changes a transaction has made if they are no longer required.

ODBC Macro Calls
To use a transaction, create it using Create_Transaction.
You must then call Begin_Transaction.
Create and execute all your queries.
Finally, choose to either commit it (Commit_transaction) or roll it back (Rollback_transaction)

### `Create_transaction`

```c
Transaction Create_transaction(Connection connection)
```

This call creates and returns a transaction object for a given Connection.

> ID = 2524

### `Begin_transaction`

```c
Integer Begin_transaction(Transaction transaction)
```

This call begins a new transaction. It will return 0 if successful.

> ID = 2525

### `Commit_transaction`

```c
Integer Commit_transaction(Transaction transaction)
```

This call will commit the operations performed inside a transaction to the data provider. The call will return 0 if successful.

> ID = 2526

### `Rollback_transaction`

```c
Integer Rollback_transaction(Transaction transaction)
```

This call will cancel or rollback the operations performed inside a transaction from the data provider. The call will return 0 if successful.

> ID = 2527

Return to 5.67 ODBC Macro Calls
5.67.10 Parameters
Parameters can be used for extra security. When you are working with user input to your queries, 
you may wish to consider using parameters to 'sanitize' them. If you are working with untrusted 
users, users may be able to use the SQL to perform malicious queries against your data provider. 

ODBC Macro Calls
Chapter   
To prevent this from happening, it is generally recommended that you use Parameters.
When you are using parameters, instead of specifying column names in your Manual Query or 
Manual Query Condition, simply use a ? instead.
You should then add your parameters for those columns in the same order.
To start, you must retrieve the Parameter_Collection using the appropriate Get_Parameters 
function for either a Manual_Query or Manual_Condition.

### `Add_parameter`

```c
Integer Add_parameter(Parameter_Collection parameters,Integer value)
```

This call will add a new Integer parameter to a Parameter_Collection. This will return 0 if successful.

> ID = 2551

### `Add_parameter`

```c
Integer Add_parameter(Parameter_Collection parameters,Text value)
```

This call will add a new Text parameter to a Parameter_Collection. This will return 0 if successful.

> ID = 2552

### `Add_parameter`

```c
Integer Add_parameter(Parameter_Collection parameters,Real value)
```

This call will add a new Real parameter to a Parameter_Collection. This will return 0 if successful.

> ID = 2553

### `Add_time_parameter`

```c
Integer Add_time_parameter(Parameter_Collection parameters,Integer value)
```

This call will add a new timestamp parameter, from an Integer value, to a Parameter_Collection. This will return 0 if successful.

> ID = 2554

ODBC Macro Calls


---

## 12D Synergy Integration (§5.68)

Functions for integration with 12d Synergy (project management and file-sharing platform).

12D Synergy Integration Macro Calls
Chapter   
5.68 12D Synergy Integration Macro Calls
The 12D Synergy integration macro calls allow a macro to interface with 12D Synergy data. 
Before running most other Synergy integration calls, a connection must be made to the 12D 
Synergy server.

### `Synergy_connect`

```c
Integer Synergy_connect(Text server, Text &error)
```

Connect 12D Model to the 12D Synergy server of given name server. The Text error would be set to the corresponding message if the connection failed. A function return value of zero indicates the connection was successful.

> ID = 3102

### `Synergy_connect`

```c
Integer Synergy_connect(Text server, Text user, Text password, Text &error)
```

Connect 12D Model to the 12D Synergy server of given name server; and given credential user (name) and password. The Text error would be set to the corresponding message if the connection failed. A function return value of zero indicates the connection was successful.

> ID = 3103

Synergy_check_out(Text job,Text path_to_file,Integer perform_download,Text 
&error)   
Name
Integer Synergy_check_out(Text job,Text path_to_file,Integer perform_download,Text &error) 
Description
Check out Synergy file with given job; and path_to_file. If the Integer parameter 
perform_download is 1 then 12D Synergy will download the file if it does not exist in the local 
folder.
The Text error would be set to the corresponding message if the checkout operation failed.
A function return value of zero indicates the checkout operation was successful.
ID = 3110

### `Synergy_cancel_checkout`

```c
12D Synergy Integration Macro Calls Integer Synergy_cancel_checkout(Text job,Text path_to_file,Text &error)
```

Cancel the checkout Synergy file with given job; and path_to_file. The Text error would be set to the corresponding message if the cancel checkout operation failed. A function return value of zero indicates the cancel checkout operation was successful.

> ID = 3106

### `Synergy_get`

```c
Integer Synergy_get(Text job,Text path_to_file,Text &error)
```

Get the latest version of Synergy file with given job; and path_to_file. The Text error would be set to the corresponding message if the get operation failed. A function return value of zero indicates the get operation was successful.

> ID = 3118

### `Synergy_get`

```c
Integer Synergy_get(Text job,Text path_to_file,Integer version,Text &error)
```

Get a given version revision number of Synergy file with given job; and path_to_file. The Text error would be set to the corresponding message if the get operation failed. A function return value of zero indicates the get operation was successful.

> ID = 3119

Synergy_build_attribute_string(Text attrib_name,Text attrib_value,Text 
&serialized_string,Text &error) 
Name
Integer Synergy_build_attribute_string(Text attrib_name,Text attrib_value,Text &serialized_string,Text 
&error) 
Description
For many Synergy integration macro call, the parameters Text attribute or Dynamic_Text attribute 
require a special (XML like) syntax called serialized_string. 
This is a helper call to form the serialized attribute string from given attrib_name and attrib_value.
The Text error would be set to the corresponding message if the call failed.
A function return value of zero indicates the call was successful.
ID = 3787
Synergy_check_in_entity(Text job,Text path_to_entity,Text description,Dynamic_Text 
&file_attribs,Dynamic_Text &change_attribs,Text &error) 

12D Synergy Integration Macro Calls
Chapter   
Name
Integer Synergy_check_in_entity(Text job,Text path_to_entity,Text description,Dynamic_Text 
&file_attribs,Dynamic_Text &change_attribs,Text &error) 
Description
Check in Synergy entity with given: job; path_to_entity; description; file attributes file_attribs; 
and change attributes change_attribs.
The Text error would be set to the corresponding message if the call failed.
A function return value of zero indicates the call was successful.
ID = 3799

### `Synergy_get_workspace_path`

```c
Integer Synergy_get_workspace_path(Text job,Text entity_path,Text &path,Text &error)
```

Not yet working, waiting for respond from Synergy team. The Text error would be set to the corresponding message if the get operation failed. A function return value of zero indicates the get operation was successful.

> ID = 3800

### `Synergy_local_folder`

```c
Integer Synergy_local_folder(Text synergy_folder_path,Text &local_path,Text &error)
```

Given a Synergy folder path synergy_folder_path, return the corresponding local path in local_path The Text error would be set to the corresponding message if the get operation failed. A function return value of zero indicates the get operation was successful.

> ID = 5446


---

## Model/TIN Sharing (§5.69)

Functions for sharing Models and TINs between 12d Model projects or sessions.

Models Tins Sharing
5.69 Models Tins Sharing
The following sharing calls are under development

### `Share_out_model`

```c
Integer Share_out_model(Text model_name,Text share_out_as)
```

Share out a model with given model_name from the current project. If share_out_as is not blank, then use that as the share out name A function return value of zero indicates the get operation was successful.

> ID = 7783

### `Share_out_tin`

```c
Integer Share_out_tin(Text tin_name,Text share_out_as)
```

Share out a tin with given tin_name from the current project. If share_out_as is not blank, then use that as the share out name A function return value of zero indicates the get operation was successful.

> ID = 7784

### `Unshare_out_model`

```c
Integer Unshare_out_model(Text model_name)
```

Unshare out a model with given model_name. A function return value of zero indicates the get operation was successful.

> ID = 7885

### `Unshare_out_tin`

```c
Integer Unshare_out_tin(Text tin_name)
```

Unshare out a tin with given tin_name. A function return value of zero indicates the get operation was successful.

> ID = 7886

Models Tins Sharing
Chapter   
Share_in_model(Text project_path,Text model_name,Text share_in_as,Integer 
use_relative_sharing,Model &shared_in_model,Text &return_message) 
Name
Integer Share_in_model(Text project_path,Text model_name,Text share_in_as,Integer 
use_relative_sharing,Model &shared_in_model,Text &return_message)
Description
Share in a model with model_name from project_path into the current project.
If share_in_as is not blank, then use that as the share in name.
The share will be relative if use_relative_sharing is non zero.
The result model will be shared_in_model.
Any error message will be returned in return_message.
A function return value of zero indicates the get operation was successful.
ID = 7785
Share_in_tin(Text project_path,Text tin_name,Text share_in_as,Integer 
use_relative_sharing,Tin &shared_in_tin,Text &return_message) 
Name
Integer Share_in_tin(Text project_path,Text tin_name,Text share_in_as,Integer use_relative_sharing,Tin 
&shared_in_tin,Text &return_message)
Description
Share in a tin with tin_name from project_path into the current project.
If share_in_as is not blank, then use that as the share in name.
The share will be relative if use_relative_sharing is non zero.
The result tin will be shared_in_tin.
Any error message will be returned in return_message.
A function return value of zero indicates the get operation was successful.
ID = 7786
Share_in_tin(Text project_path,Text tin_name,Text share_in_as,Text 
model_name,Integer use_relative_sharing,Tin &shared_in_tin,Text 
&return_message) 
Name
Integer Share_in_tin(Text project_path,Text tin_name,Text share_in_as,Text model_name,Integer 
use_relative_sharing,Tin &shared_in_tin,Text &return_message)
Description
Share in a tin with tin_name from project_path into the current project.
If share_in_as is not blank, then use that as the share in name.
The shared tin will be in the model of given name model_name.
The share will be relative if use_relative_sharing is non zero.
The result tin will be shared_in_tin.

Models Tins Sharing
Any error message will be returned in return_message.
A function return value of zero indicates the get operation was successful.
ID = 7840

### `Remove_shared_in_model`

```c
Integer Remove_shared_in_model(Text model_name)
```

Remove the shared in model with model_name from the current project. A function return value of zero indicates the get operation was successful.

> ID = 7787

### `Remove_shared_in_tin`

```c
Integer Remove_shared_in_tin(Text tin_name)
```

Remove the shared in tin of given tin_name from the current project. A function return value of zero indicates the get operation was successful.

> ID = 7788

### `Synchronize_shared_in_model`

```c
Integer Synchronize_shared_in_model(Text model_name,Text &return_message)
```

Synchronize the shared in model of given model_name. Any error message will be returned in return_message. A function return value of zero indicates the get operation was successful.

> ID = 7789

### `Synchronize_shared_in_tin`

```c
Integer Synchronize_shared_in_tin(Text tin_name,Text &return_message)
```

Synchronize the shared in tin of given tin_name. Any error message will be returned in return_message. A function return value of zero indicates the get operation was successful.

> ID = 7790

Synchronize_all_share_ins(Text &return_message)

Models Tins Sharing
Chapter   
Name
Integer Synchronize_all_share_ins(Text &return_message)
Description
Synchronize all shared in tins and models of the current project.
Any error message will be returned in return_message.
A function return value of zero indicates the get operation was successful.
ID = 7791

### `Synchronize_all_shared_in_models`

```c
Integer Synchronize_all_shared_in_models(Text &return_message)
```

Synchronize all shared in models of the current project. Any error message will be returned in return_message. A function return value of zero indicates the get operation was successful.

> ID = 7792

### `Synchronize_all_share_in_tins`

```c
Integer Synchronize_all_share_in_tins(Text &return_message)
```

Synchronize all shared in tins of the current project. Any error message will be returned in return_message. A function return value of zero indicates the get operation was successful.

> ID = 7793

### `Synchronize_all_master_share_ins`

```c
Integer Synchronize_all_master_share_ins(Text &return_message)
```

Synchronize all shared from the master share file of the current project. Any error message will be returned in return_message. A function return value of zero indicates the get operation was successful.

> ID = 7794


---

## Highlight Functions (§5.70)

Functions to highlight elements within a 12d Model view, providing visual feedback
during macro execution.

Highlight
5.70 Highlight
The following highlighting calls are under development

### `Highlight_create`

```c
Integer Highlight_create()
```

Create a new highlight instance. A function return the Integer id of the newly created instance.

> ID = 7861

### `Highlight_remove`

```c
Integer Highlight_remove(Integer id)
```

Removed the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7862

### `Highlight_draw`

```c
Integer Highlight_draw(Integer id)
```

Draw the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7863

### `Highlight_redraw`

```c
Integer Highlight_redraw(Integer id)
```

Redraw the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7864

### `Highlight_clear_drawing`

```c
Highlight Chapter Integer Highlight_clear_drawing(Integer id)
```

Clear the drawing of the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7865

### `Highlight_reset`

```c
Integer Highlight_reset(Integer id)
```

Reset the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7866

Highlight_add_point(Integer id,Integer style,Integer colour,Real size,Real x,Real 
y,Real angle)
Name
Integer Highlight_add_point(Integer id,Integer style,Integer colour,Real size,Real x,Real y,Real angle)
Description
Add a point to the highlight instance of given id.
The Integer style determines the style (shape) of the highlight:
0 Cross
1 Cursor
2 Diamond
3 Square
4 Circle
5 X-Cross
6 Triangle
7 Move
8 Arrow
9 Broadhead 
A function return value of zero indicates the get operation was successful.
ID = 7867

### `Highlight_add_line`

```c
Integer Highlight_add_line(Integer id,Integer colour,Real xs,Real ys,Real xe,Real ye)
```

Add a line to the highlight instance of given id. A function return value of zero indicates the get operation was successful. Highlight

> ID = 7868

Highlight_add_arc(Integer id,Integer colour,Real xs,Real ys,Real xe,Real ye,Real 
radius,Integer major)
Name
Integer Highlight_add_arc(Integer id,Integer colour,Real xs,Real ys,Real xe,Real ye,Real radius,Integer 
major)
Description
Add an arc to the highlight instance of given id.
A function return value of zero indicates the get operation was successful.
ID = 7869

### `Highlight_add_string`

```c
Integer Highlight_add_string(Integer id,Integer colour,Element string)
```

Add a string to the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7870

Highlight_add_text(Integer id,Integer colour,Real x,Real y,Textstyle_Data 
ts_data,Text text)
Name
Integer Highlight_add_text(Integer id,Integer colour,Real x,Real y,Textstyle_Data ts_data,Text text)
Description
Add a text to the highlight instance of given id.
A function return value of zero indicates the get operation was successful.
ID = 7871

### `Highlight_delete_all`

```c
Integer Highlight_delete_all()
```

Delete all highlight instances. A function return value of zero indicates the get operation was successful.

> ID = 7872

### `Highlight_set_linestyle`

```c
Integer Highlight_set_linestyle(Integer id,Text linestyle) Highlight Chapter
```

Set the linestyle for the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7890

### `Highlight_set_weight`

```c
Integer Highlight_set_weight(Integer id,Real weight)
```

Set the line weight for the highlight instance of given id. A function return value of zero indicates the get operation was successful.

> ID = 7891


---

## Internal Macro Calls (§5.71)

Internal 12d Model macro API calls — lower-level functions used internally by 12d Model.
Use with caution; these APIs may change across versions.

Internal Macro Calls
5.71 Internal Macro Calls
Do not use the following calls

### `Set_pit_details`

```c
Integer Set_pit_details(Model model)
```

A function return value of zero indicates the get operation was successful.

> ID = 3905

### `Run_dws_network`

```c
Integer Run_dws_network(Model model)
```

A function return value of zero indicates the get operation was successful.

> ID = 3906

### `Regrade_pipes`

```c
Integer Regrade_pipes(Model model)
```

A function return value of zero indicates the get operation was successful.

> ID = 3907

### `Run_drainage_analysis`

```c
Integer Run_drainage_analysis(Model model)
```

A function return value of zero indicates the get operation was successful.

> ID = 3908

### `Run_drainage_analysis_dynamic`

```c
Integer Run_drainage_analysis_dynamic(Model model)
```

A function return value of zero indicates the get operation was successful.

> ID = 3909

Internal Macro Calls
Chapter

### `Get_last_dot`

```c
Integer Get_last_dot(Text file_name)
```

Return the index of the last dot of a given file_name.

> ID = 3939

### `Remove_file_extension`

```c
Text Remove_file_extension(Text file_name)
```

Return the name without file extension from a given input file_name.

> ID = 3940

### `Set_pit_details`

```c
Integer Set_pit_details(Text model_name)
```

A function return value of zero indicates the get operation was successful.

> ID = 3941

### `Regrade_pipes`

```c
Integer Regrade_pipes(Text model_name)
```

A function return value of zero indicates the get operation was successful.

> ID = 3942

### `Run_drainage_analysis`

```c
Integer Run_drainage_analysis(Text model_name)
```

A function return value of zero indicates the get operation was successful.

> ID = 3943

### `Run_drainage_analysis_dynamic`

```c
Internal Macro Calls Integer Run_drainage_analysis_dynamic(Text model_name)
```

A function return value of zero indicates the get operation was successful.

> ID = 3944

### `Run_dws_network`

```c
Integer Run_dws_network(Text model_name)
```

A function return value of zero indicates the get operation was successful.

> ID = 3945

### `Run_slf_data`

```c
Integer Run_slf_data(Text slf_data)
```

A function return value of zero indicates the get operation was successful.

> ID = 3949

### `Plot_mps`

```c
Integer Plot_mps(Text mps_file,Integer mode,Text name,Text ranges)
```

A function return value of zero indicates the get operation was successful.

> ID = 3950

Check_unique_attributes(Attributes attr,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Name
Integer Check_unique_attributes(Attributes attr,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of Attributes attr.
A function return value of zero indicates the get operation was successful.
ID = 5425
Check_unique_attributes_with_type(Attributes attr,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_attributes_with_type(Attributes attr,Integer &are_unique_names,Integer 

Internal Macro Calls
Chapter   
&are_unique_names_case_insensitive)
Description
Check for unique name for each attribute type at the top level of Attributes attr.
A function return value of zero indicates the get operation was successful.
ID = 5426
Check_unique_element_attributes(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_element_attributes(Dynamic_Element els,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of element attributes from a Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5427
Check_unique_element_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_element_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Description
Check for unique name for each element type at the top level of element attributes from a 
Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5428
Check_unique_segment_attributes(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_segment_attributes(Dynamic_Element els,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of super string segment attributes from a Dynamic_Element 
els.
A function return value of zero indicates the get operation was successful.
ID = 5429
Check_unique_segment_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name

Internal Macro Calls
Integer Check_unique_segment_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Description
Check for unique name for each element type at the top level of super string segment attributes 
from a Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5430
Check_unique_vertex_attributes(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_vertex_attributes(Dynamic_Element els,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of super string vertex attributes from a Dynamic_Element 
els.
A function return value of zero indicates the get operation was successful.
ID = 5431
Check_unique_vertex_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_vertex_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Description
Check for unique name for each element type at the top level of super string vertex attributes from a 
Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5432
Check_unique_drainage_pit_attributes(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_drainage_pit_attributes(Dynamic_Element els,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of drainage string node (pit) attributes from a 
Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5433
Check_unique_drainage_pit_attributes_with_type(Dynamic_Element els,Integer 

Internal Macro Calls
Chapter   
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_drainage_pit_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Description
Check for unique name for each element type at the top level of drainage string node (pit) attributes 
from a Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5434
Check_unique_drainage_pipe_attributes(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_drainage_pipe_attributes(Dynamic_Element els,Integer &are_unique_names,Integer 
&are_unique_names_case_insensitive)
Description
Check for unique name at the top level of drainage string link (pipe) attributes from a 
Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5435
Check_unique_drainage_pipe_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Name
Integer Check_unique_drainage_pipe_attributes_with_type(Dynamic_Element els,Integer 
&are_unique_names,Integer &are_unique_names_case_insensitive)
Description
Check for unique name for each element type at the top level of drainage string link (pipe) attributes 
from a Dynamic_Element els.
A function return value of zero indicates the get operation was successful.
ID = 5436
Do_not_use(Text &t1,Text &t2,Text &t3,Text &t4,Text &t5,Real &r1,Real 
&r2,Integer &i1,Integer &i2,Integer &i3)
Name
Integer Do_not_use(Text &t1,Text &t2,Text &t3,Text &t4,Text &t5,Real &r1,Real &r2,Integer &i1,Integer 
&i2,Integer &i3)
Description
Programmers testing.
A function return value of zero indicates the get operation was successful.
ID = 5448

Internal Macro Calls
Run_slf_data(Text slf_data,Integer pr_count,Dynamic_Text 
pr_widget_path,Dynamic_Text pr_widget_name,Dynamic_Text 
pr_param_name,Dynamic_Integer pr_active,Text pvf_file,Integer clean_up,Integer 
interactive,Text &error)
Name
Integer Run_slf_data(Text slf_data,Integer pr_count,Dynamic_Text pr_widget_path,Dynamic_Text 
pr_widget_name,Dynamic_Text pr_param_name,Dynamic_Integer pr_active,Text pvf_file,Integer 
clean_up,Integer interactive,Text &error)
Description
A function return value of zero indicates the call operation was successful.
ID = 7532
Run_slf_file(Text slf_file,Integer pr_count,Dynamic_Text 
pr_widget_path,Dynamic_Text pr_widget_name,Dynamic_Text 
pr_param_name,Dynamic_Integer pr_active,Text pvf_file,Integer clean_up,Integer 
interactive,Text &error)
Name
Integer Run_slf_file(Text slf_file,Integer pr_count,Dynamic_Text pr_widget_path,Dynamic_Text 
pr_widget_name,Dynamic_Text pr_param_name,Dynamic_Integer pr_active,Text pvf_file,Integer 
clean_up,Integer interactive,Text &error)
Description
A function return value of zero indicates the call operation was successful.
ID = 7533
Run_slf_data(Text slf_data,Integer pr_count,Dynamic_Text 
pr_widget_path,Dynamic_Text pr_widget_name,Dynamic_Text 
pr_param_name,Dynamic_Integer pr_active,Integer bt_count,Dynamic_Text 
bt_names,Text panel_name,Text pvf_file,Integer clean_up,Integer interactive,Text 
&error)
Name
Integer Run_slf_data(Text slf_data,Integer pr_count,Dynamic_Text pr_widget_path,Dynamic_Text 
pr_widget_name,Dynamic_Text pr_param_name,Dynamic_Integer pr_active,Integer bt_count,Dynamic_Text 
bt_names,Text panel_name,Text pvf_file,Integer clean_up,Integer interactive,Text &error)
Description
A function return value of zero indicates the call operation was successful.
ID = 7534

### `Set_macro_attributes`

```c
Integer Set_macro_attributes(Attributes att)
```

For the macro, set the Attributes to att. A function return value of zero indicates the Attributes was successfully set. Internal Macro Calls Chapter

> ID = 3846

### `Get_macro_attributes`

```c
Integer Get_macro_attributes(Attributes &att)
```

For the macro, return the Attributes for the macro as att. If the macro has no attribute then a non-zero return value is returned. A function return value of zero indicates the attribute is successfully returned.

> ID = 3845

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Text att_name,Uid &att)
```

For the macro, get the attribute called att_name and return the attribute value in uid. The attribute must be of type Uid. If the attribute is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 7538

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Text att_name,Attributes &att)
```

For the macro, get the attribute called att_name and return the attribute value in att. The attribute must be of type Attributes. If the attribute is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 7539

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Integer att_no,Uid &att)
```

For the macro, get the attribute with number att_no and return the attribute value in uid. The attribute must be of type Uid. If the attribute is not of type Uid then a non-zero return value is returned. Internal Macro Calls A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 7546

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Integer att_no,Attributes &att)
```

For the macro, get the attribute with number att_no and return the attribute value in att. The attribute must be of type Attributes. If the attribute is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully returned. Note - the Get_attribute_type call can be used to get the type of the attribute with attribute number att_no.

> ID = 7547

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Text att_name,Uid uid)
```

For the macro, if the attribute called att_name does not exist then create it as type Uid and give it the value uid. if the attribute called att_name does exist and it is type Uid, then set its value to uid. If the attribute exists and is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 7556

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Text att_name,Attributes att)
```

For the macro, if the attribute called att_name does not exist then create it as type Attributes and give it the value att. if the attribute called att_name does exist and it is type Attributes, then set its value to att. If the attribute exists and is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_name.

> ID = 7557

Internal Macro Calls
Chapter

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Integer att_no,Uid uid)
```

For the macro, if the attribute number att_no exists and it is of type Uid, then its value is set to uid. If there is no attribute with number att_no then nothing can be done and a non-zero return code is returned. If the attribute of number att_no exists and is not of type Uid then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> ID = 7564

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Integer att_no,Attributes att)
```

For the macro, if the attribute number att_no exists and it is of type Attributes, then its value is set to att. If there is no attribute with number att_no then nothing can be done and a non-zero return code is returned. If the attribute of number att_no exists and is not of type Attributes then a non-zero return value is returned. A function return value of zero indicates the attribute value is successfully set. Note - the Get_attribute_type call can be used to get the type of the attribute called att_no.

> ID = 7565

### `Macro_attribute_exists`

```c
Integer Macro_attribute_exists(Text att_name)
```

Checks to see if a macro attribute with the name att_name exists in current macro. A non-zero function return value indicates that the attribute does exist. A zero function return value indicates that no attribute of that name exists. Warning this is the opposite of most 12dPL function return values

> ID = 3847

### `Macro_attribute_exists`

```c
Integer Macro_attribute_exists(Text name,Integer &no)
```

Internal Macro Calls Checks to see if a macro attribute with the name name exists in current macro. If the attribute exists, its position is returned in Integer no. This position can be used in other Attribute functions described below. A non-zero function return value indicates the attribute does exist. A zero function return value indicates that no attribute of that name exists. Warning this is the opposite of most 12dPL function return values

> ID = 3848

### `Macro_attribute_delete`

```c
Integer Macro_attribute_delete(Text att_name)
```

Delete the macro attribute with the name att_name in current macro. A function return value of zero indicates the attribute was deleted.

> ID = 3849

### `Macro_attribute_delete`

```c
Integer Macro_attribute_delete(Integer att_no)
```

Delete the macro attribute with the Integer att_no in current macro. A function return value of zero indicates the attribute was deleted.

> ID = 3859

### `Macro_attribute_delete_all`

```c
Integer Macro_attribute_delete_all(Element elt)
```

Delete all the attributes for the macro. Element elt has nothing to do with this call and is ignored. A function return value of zero indicates all the attributes were deleted.

> ID = 3851

### `Macro_attribute_dump`

```c
Integer Macro_attribute_dump()
```

Write out information about the macro attributes to the Output Window. A function return value of zero indicates the function was successful.

> ID = 7536

Macro_attribute_debug()
Integer Macro_attribute_debug()

Internal Macro Calls
Chapter   
Description
Write out even more information about the macro attributes to the Output Window.
A function return value of zero indicates the function was successful.
ID = 7537

### `Get_macro_number_of_attributes`

```c
Integer Get_macro_number_of_attributes(Integer &no_atts)
```

Get number of attributes Integer no_atts in current macro. A function return value of zero indicates the number is successfully returned.

> ID = 3852

### `Get_macro_attribute_name`

```c
Integer Get_macro_attribute_name(Integer att_no,Text &name)
```

Get macro attribute name Text name with attribute number Integer att_no in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 7551

### `Get_macro_attribute_length`

```c
Integer Get_macro_attribute_length(Integer att_no,Integer &att_len)
```

Get the length of the macro attribute at position att_no. The macro attribute length is returned in att_len. A function return value of zero indicates the attribute type was successfully returned. Note The length is useful for user attributes of type Text and Binary (Blobs).

> ID = 7554

### `Get_macro_attribute_length`

```c
Integer Get_macro_attribute_length(Text att_name,Integer &att_len)
```

Get the length of the macro attribute with the name att_name for the current macro. The macro attribute length is returned in att_len. A function return value of zero indicates the attribute type was successfully returned. Note The length is useful for user attributes of type Text and Binary (Blobs).

> ID = 7555

Internal Macro Calls

### `Get_macro_attribute_type`

```c
Integer Get_macro_attribute_type(Text att_name,Integer &att_type)
```

Get the type of the macro attribute with the name att_name from the current macro. The macro attribute type is returned in Integer att_type. For the list of attribute types, go to Data Type Attribute Type. A function return value of zero indicates the attribute type was successfully returned.

> ID = 7552

### `Get_macro_attribute_type`

```c
Integer Get_macro_attribute_type(Integer att_no,Integer &att_type)
```

Get the type of the macro attribute at position att_no for the current macro. The macro attribute type is returned in att_type. For the list of attribute types, go to Data Type Attribute Type. A function return value of zero indicates the attribute type was successfully returned.

> ID = 7553

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Text att_name,Real &att)
```

Get macro attribute Real att with attribute name Text att_name in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 3855

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Text att_name,Real att)
```

Set the macro attribute with name att_name to the Real att. The macro attribute must be of type Real A function return value of zero indicates the attribute was successfully set.

> ID = 3858

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Text att_name,Integer &att) Internal Macro Calls Chapter
```

Get macro attribute Integer att with attribute name Text att_name in macro macro. A function return value of zero indicates the name is successfully returned.

> ID = 3854

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Text att_name,Integer att)
```

Set the macro attribute with name att_name to the Integer att. The macro attribute must be of type Integer A function return value of zero indicates the attribute was successfully set.

> ID = 3857

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Integer att_no,Text &att)
```

Get macro attribute Text att with attribute number Integer att_no in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 3853

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Integer att_no,Text att)
```

Set the macro attribute at position att_no to the Text att. The macro attribute must be of type Text A function return value of zero indicates the attribute was successfully set.

> ID = 3856

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Integer att_no,Integer &att)
```

Get macro attribute Integer att with attribute number Integer att_no in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 7544

Set_macro_attribute(Integer att_no,Integer att)

Internal Macro Calls
Name
Integer Set_macro_attribute(Integer att_no,Integer att)
Description
Set the macro attribute at position att_no to the Integer att.
The macro attribute must be of type Integer
A function return value of zero indicates the attribute was successfully set.
ID = 7562

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Integer att_no,Real &att)
```

Get macro attribute Real att with attribute number Integer att_no in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 7545

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Integer att_no,Real att)
```

Set the macro attribute at position att_no to the Real att. The macro attribute must be of type Real A function return value of zero indicates the attribute was successfully set.

> ID = 7563

### `Get_macro_attribute`

```c
Integer Get_macro_attribute(Text att_name,Text &att)
```

Get macro attribute Text att with attribute name Text att_name in current macro. A function return value of zero indicates the name is successfully returned.

> ID = 3853

### `Set_macro_attribute`

```c
Integer Set_macro_attribute(Text att_name,Text att)
```

Set the macro attribute with name att_name to the Text att. The macro attribute must be of type Text Internal Macro Calls Chapter A function return value of zero indicates the attribute was successfully set.

> ID = 3856

### `Macro_attribute_delete_all`

```c
Integer Macro_attribute_delete_all()
```

Delete all the macro attributes. A function return value of zero indicates all the attribute were successfully deleted.

> ID = 7535

### `Create_chain_parameters`

```c
Integer Create_chain_parameters(Text pvf_file,Chain_Parameters &created)
```

Create a new chain parameter created object using given chain parameter file pvf_file. A function return value of zero indicates all the call were successful.

> ID = 7600

### `Write_to_file`

```c
Integer Write_to_file(Chain_Parameters ch,Text file)
```

Write the content of chain parameter ch to a given file. A function return value of zero indicates the call were successful.

> ID = 7961

### `Null`

```c
Null(Chain_Parameters &ch)
```

Null Chain_Parameters ch

> ID = 7601

### `Resolve_parameter`

```c
Integer Resolve_parameter(Chain_Parameters ch,Text raw,Text &resolved)
```

Resolve the chain parameter raw using Chain_Parameters ch and set the resolved parameter to Internal Macro Calls resolved. A function return value of zero indicates all the call were successful.

> ID = 7602

### `Resolve_parameter_strict`

```c
Integer Resolve_parameter_strict(Chain_Parameters ch,Text raw,Text &resolved)
```

Strictly resolve the chain parameter raw using Chain_Parameters ch and set the resolved parameter to resolved. A function return value of zero indicates all the call were successful.

> ID = 7603

### `Set_integer_value`

```c
Integer Set_integer_value(Chain_Parameters &ch,Text para_name,Integer para_val)
```

Set the value of Integer parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7604

### `Set_real_value`

```c
Integer Set_real_value(Chain_Parameters &ch,Text para_name,Real para_val)
```

Set the value of Real parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7605

### `Set_text_value`

```c
Integer Set_text_value(Chain_Parameters &ch,Text para_name,Text para_val)
```

Set the value of Text parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7606

Internal Macro Calls
Chapter   
Set_tin_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text 
tin_name,Uid tin_id)
Name
Integer Set_tin_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text tin_name,Uid tin_id)
Description
Set the value of Tin parameter with given name para_name in Chain_Parameters ch to new value 
ref_mode tin_name tin_id.
A function return value of zero indicates all the call were successful.
ID = 7607
Set_model_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text 
model_name,Uid model_id)
Name
Integer Set_model_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text model_name,Uid 
model_id)
Description
Set the value of Model parameter with given name para_name in Chain_Parameters ch to new 
value ref_mode model_name model_id.
A function return value of zero indicates all the call were successful.
ID = 7608
Set_string_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text 
string_name,Uid string_id,Text model_name,Uid model_id)
Name
Integer Set_string_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Text string_name,Uid 
string_id,Text model_name,Uid model_id)
Description
Set the value of String parameter with given name para_name in Chain_Parameters ch to new 
value ref_mode string_name string_id model_name model_id.
A function return value of zero indicates all the call were successful.
ID = 7622

### `Set_function_value`

```c
Integer Set_function_value(Chain_Parameters &ch,Text para_name,Text para_val)
```

Set the value of Function parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7609

Internal Macro Calls

### `Set_tick_value`

```c
Integer Set_tick_value(Chain_Parameters &ch,Text para_name,Integer para_val)
```

Set the value of Tick parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7610

### `Set_colour_value`

```c
Integer Set_colour_value(Chain_Parameters &ch,Text para_name,Text para_val)
```

Set the value of Colour parameter with given name para_name in Chain_Parameters ch to new value para_val. A function return value of zero indicates all the call were successful.

> ID = 7611

Set_grid_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Integer 
mod_mode,Text file_name,Integer num_cols,Integer num_rows,Dynamic_Text 
data,Dynamic_Text col_names)
Name
Integer Set_grid_value(Chain_Parameters &ch,Text para_name,Integer ref_mode,Integer mod_mode,Text 
file_name,Integer num_cols,Integer num_rows,Dynamic_Text data,Dynamic_Text col_names)
Description
???.
A function return value of zero indicates all the call were successful.
ID = 7612

### `Get_type`

```c
Integer Get_type(Chain_Parameters ch,Text para_name,Integer &int_type,Text &text_type)
```

Get the type of chain parameter with given name para_name from Chain_Parameters ch A function return value of zero indicates the call was successfully.

> ID = 7621

Run_drainage_2d(Text tcf_name,Text tu_options,Integer use_tuflow_lock,Text 
coord_sys,Integer update_mode,Tin dtm,Text &error)
Name
Integer Run_drainage_2d(Text tcf_name,Text tu_options,Integer use_tuflow_lock,Text coord_sys,Integer 

Internal Macro Calls
Chapter   
update_mode,Tin dtm,Text &error)
Description
Rob will dedice when this one is ready for use???
A function return value of zero indicates the call was successfully.
ID = 7752


---

## Unlisted Macro Calls (§5.72)

Additional macro calls not categorised in prior sections.

Unlisted Macro Calls
5.72 Unlisted Macro Calls
Numbers
ID = 2682
ID = 2683
ID = 2684
ID = 2685
ID = 2686
ID = 2687
ID = 2688
ID = 2689
ID = 2690
ID = 2691
ID = 2692
ID = 2693
ID = 2694
ID = 2695
ID = 2696
ID = 2697
ID = 2698
ID = 2699
ID = 2700
ID = 2701
ID = 2702
ID = 2703
ID = 2704
ID = 2705
ID = 2709
ID = 2710
ID = 2711
ID = 2712
ID = 2713
ID = 2714
ID = 2715
ID = 2716
ID = 2717
ID = 2718
ID = 2719
ID = 7756
ID = 7757

Unlisted Macro Calls
Chapter   
ID = 7758

Unlisted Macro Calls


---

## Excel ODBC Gotchas (64-bit Microsoft Excel Driver)

The 64-bit Microsoft Excel ODBC driver has several non-obvious behaviours that shape any macro updating an `.xlsm` in place.

### `ReadOnly=1` on the connection string

Add `;ReadOnly=1;` to the Excel connection string when a pass only needs SELECT:

```c
Text cs = "Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DBQ="
    + xlsm_path + ";ReadOnly=1;";
```

This tells the driver never to acquire a write lock, so `.xlsm~`/`~$*` lock files are never spawned and concurrent Excel opens are unaffected. It is a partial mitigation: the driver still rewrites internal zip metadata inside the `.xlsm` on close, so the file's content hash changes even when no UPDATE was issued. `Get_file_modified_time_utc` will also show a bumped mtime. If you need Synergy (or any hash/mtime-tracking system) to not register the file as modified, the only reliable path is to NOT open it via ODBC at all — use an attribute-cache pre-check (see `conventions.md` — "Attribute-Cache Idempotence Pattern").

### Trimmed-compare rule for Excel-round-tripped text

Excel silently strips leading and trailing whitespace when storing text cells. An attribute value like `"SU10465 "` (with a trailing space) becomes `"SU10465"` once written into the sheet. A raw compare on the next run will then see a mismatch, re-write, and the file will be "modified" every time:

```c
// WRONG — oscillates forever because Excel drops trailing space
if(ro_vals[i] != values[i]) need_write = 1;

// CORRECT — trim both sides of every ODBC-round-tripped compare
if(Text_justify(ro_vals[i]) != Text_justify(values[i])) need_write = 1;
```

`Text_justify(Text)` returns the input with leading and trailing whitespace removed — it is the 12dPL equivalent of `trim()`. Apply it to BOTH sides of every comparison between a value you'd write and a value you've read back from Excel.

### Byte-level snapshot + restore (`rb`/`wb`)

```c
Integer snapshot[2000000];
File sf;
Integer snap_n = 0;
if(File_open(path, "rb", "", sf) == 0)
{
    snap_n = File_read(sf, 2000000, snapshot);   // returns count actually read
    File_close(sf);
}
// ... ODBC work ...
File rf;
if(File_open(path, "wb", "", rf) == 0)
{
    File_write(rf, snap_n, snapshot);
    File_close(rf);
}
```

`File_read(File, Integer length, Integer array[])` (ID 1716) and `File_write(File, Integer length, Integer array[])` (ID 1718) operate on binary Integer arrays. This restores content-hash identity after an ODBC SELECT perturbed the zip's internal metadata — but **mtime still advances** on the write-back. `Touch_file_modified_time` (ID 7984) only sets mtime to *now*, not back to a prior value. Therefore snapshot/restore alone does NOT defeat an mtime-based change tracker.

### 12dSynergy check-out requirement for UPDATE

12dSynergy-managed files under `C:\ProgramData\12dS\data\...` arrive with the Windows read-only attribute set until the user checks the file out. Excel ODBC SELECT still works, but every UPDATE fails with `"Operation must use an updateable query."` — a misleading SQL-sounding error whose real cause is file permissions. Detect early:

```c
Integer check_file_writable(Text path)
{
    File f;
    if(File_open(path, "a", "", f) != 0) return 0;  // append mode: no truncation
    File_close(f);
    return 1;
}
```

Abort with a clear message telling the user to check the file out in 12dSynergy. Do NOT auto-clear the read-only attribute — that bypasses Synergy's check-out workflow.


