# Lint JavaScript

Automatically fix lint errors in a non-destructive way using your JSHint settings.

  * `asi` Add missing semicolons.
  * `camelcase|snakecase` Enforces camelCase and snake_case convention.
  * `curly` Adds curly braces to statements.
  * `debugger` Removes debugger statements
  * `plusplus` Converts plusplus and minusminus.
  * `quotmark` Enforces single and double quote style.
  * Adds parenthesis when invoking a constructor
  * Adds the radix parameter to parseInt
  * Convert to use array literal and object literal
  * Dot notation conversion
  * Extra trailing commas
  * Leading and trailing zeroes on decimals.
  * Missing whitespaces.
  * Mixed spaces/tabs
  * Proper indentation
  * Removes deletion of variables
  * Removes undefined when assigning to variables
  * Removes unnecessary semicolons
  * Uses isNaN function rather than comparing to NaN

## Task

Use the `{id}-lint-fix` task to lint the JavaScript source code, where `{id}` is the project id you've configured in your aqua.project.json file.

## Configuration

To use this task you need to include the following required sections in your in your [aqua.project.json](https://github.com/daniellmb/AQUA#user-content-aquaprojectjson) file.

### Required

The `alljs` option should be an array that specifies where to find all the JavaScript written for the project, including source code, specs, end-to-end tests, configuration files etc.