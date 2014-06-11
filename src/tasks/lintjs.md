# Lint JavaScript

Lint all the JavaScript in your project for syntax issues and anti-patterns.

## Task

Use the `{id}-lint` task to lint the JavaScript source code, where `{id}` is the project id you've configured in your aqua.project.json file.

## Configuration

To use this task you need to include the following required sections in your in your [aqua.project.json](https://github.com/daniellmb/AQUA#user-content-aquaprojectjson) file.

### Required

The `alljs` option should be an array that specifies where to find all the JavaScript written for the project, including source code, specs, end-to-end tests, configuration files etc.

