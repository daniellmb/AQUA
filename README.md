# AQUA: Automated QUality Analysis
[![Build Status][travis-image]][travis-url] [![Test Coverage][coverage-image]][coverage-url] [![Code GPA][gpa-image]][gpa-url] [![NPM Version][version-image]][version-url] [![IRC Channel][irc-image]][irc-url] [![Gitter][gitter-image]][gitter-url]

## About

[AQUA](https://www.npmjs.org/package/aqua) improves code quality by surfacing actionable metrics about JavaScript, CSS and C#.

>AQUA raises the visibility of code quality and increases awareness within teams by giving immediate feedback about code smells before they become technical debt.

You are free to structure your projects anyway you like, and still take full advantage of AQUA. Simply create an `aqua.project.json` file that documents where things are.

## Philosophy

The goal of AQUA is to improve code quality, without dictating a strict project structure. **Ramp-up gradually** by only configuring the the parts of AQUA you want to use. Not ready for end-to-end tests yet? Simply don't configure them. Don't want to type check your JavaScript code? Just leave out the "types" section. Even if you just start by linting your code, that will be a great step in the right direction!

While nothing is stopping you from simply editing a JavaScript file and committing it to source control; doing so will cause you to miss out on: linting, cyclomatic complexity analysis, type checking, running both unit and end-to-end tests, as well as documentation generation, and code coverage reports.

## Features

### JavaScript

  * Lint Source Code for Syntax Errors and Anti-Patterns
  * Analyze Code Against Complexity Thresholds
  * Type Checking Source Code
  * Enforce Minimum Typed Percentage Thresholds
  * Advanced Minification
  * Unit Test Runner
  * Code Coverage Reports
  * End-to-end Test Runner
  * Documentation Generation
  * Enforce Test Coverage Thresholds
  * Graph CommonJS and AMD module dependencies (TODO)
  * Automatically fix lint errors non-destructively (TODO)

### CSS
TODO: pull requests welcome :)

  * Lint StyleSheets for Syntax Errors and Anti-Patterns

### C&#35;
TODO: pull requests welcome :)

  * Lint Source Code for Syntax Errors and Anti-Patterns (via [FxCop](http://msdn.microsoft.com/en-us/library/bb429476.aspx))
  * Analyze Code Against Complexity Thresholds (via [Code Metrics PowerTool](http://www.microsoft.com/en-us/download/details.aspx?id=38196))
  * Unit Test Runner
  * Code Coverage Reports
  * End-to-end Test Runner
  * Documentation Generation

### Environments

AQUA is designed to play well with the following types of projects.

  * Web Projects (including AMD/RequireJS)
  * Node.js Projects

### Setup

You'll need to have [node.js](http://nodejs.org/download/) v10+ installed.

1. navigate to your project root
1. run `npm install aqua -save-dev` (this will take a few minutes)
1. install gulp globally `npm install -g gulp`

## Workflow

[AQUA](https://www.npmjs.org/package/aqua) uses [Gulp](http://gulpjs.com/) to orchestrate the following suite of [NPM](https://www.npmjs.org/) Modules.

* [JSHint](https://www.npmjs.org/package/jshint): to lint the code & standardize syntax
* [Complexity-Report](https://www.npmjs.org/package/complexity-report): for complexity analysis
* [Karma](https://www.npmjs.org/package/karma): to run the unit tests
* [Closure Compiler](https://www.npmjs.org/package/gulp-closure-compiler): for type checking & minification
* [Protractor](https://www.npmjs.org/package/protractor): to run the integration tests
* [JSDoc](https://www.npmjs.org/package/jsdoc): to generate documentation

The Node modules above can the run individually (see tasks below) or chained together.

### Run from the Command Line

AQUA dynamically creates gulp tasks for you, based on what is configured in your `aqua.project.json` file. Tasks are namespaced with all projects **id** in your config file. Any tasks that are not configured for all projects are simply skipped.

| task                                                                                         | does                                                             |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------------|
|**gulp**                                                                                      | List all possible tasks for all projects                         |
|**gulp ?**                                                                                    | List all possible tasks for all projects                         |
|**gulp {id}**                                                                                 | Run all project tasks in the correct order                       |
|**gulp {id}-?**                                                                               | List all possible tasks for all projects                          |
|**[gulp {id}-all](https://github.com/daniellmb/AQUA/blob/master/src/tasks/all.md)**           | Run all project tasks in the correct order                       |
|**[gulp {id}-lint](https://github.com/daniellmb/AQUA/blob/master/src/tasks/lintjs.md)**       | Lint the source code for syntax issues and anti-patterns         |
|**[gulp {id}-lint-fix](https://github.com/daniellmb/AQUA/blob/master/src/tasks/lintfix.md)**  | Automatically fix lint errors non-destructively                  |
|**[gulp {id}-gpa](https://github.com/daniellmb/AQUA/blob/master/src/tasks/gpa.md)**           | Analyze the source against complexity thresholds                 |
|**[gulp {id}-unit](https://github.com/daniellmb/AQUA/blob/master/src/tasks/unit.md)**         | Run unit tests against the source code                           |
|**[gulp {id}-chk](https://github.com/daniellmb/AQUA/blob/master/src/tasks/chk.md)**           | Type check the source code                                       |
|**[gulp {id}-min](https://github.com/daniellmb/AQUA/blob/master/src/tasks/min.md)**           | Minify the source code and create source map                     |
|**[gulp {id}-e2e](https://github.com/daniellmb/AQUA/blob/master/src/tasks/e2e.md)**           | Run end-to-end tests against the minified code                   |
|**[gulp {id}-doc](https://github.com/daniellmb/AQUA/blob/master/src/tasks/doc.md)**           | Generate documentation from code annotations	                    |
|**[gulp {id}-wch](https://github.com/daniellmb/AQUA/blob/master/src/tasks/wch.md)**           | Watch for file changes and automatically run tasks               |


#### Console Customization

Avoid a lot needless typing! You can create a shortcut that will open the command prompt at any folder you want.

Use the steps below for Windows.

  1. Right-click on your desktop and choose `New > Shortcut`
  1. For the location paste in (with the folder you want to open):
  `C:\Windows\System32\cmd.exe /K "cd /d [Drive/Folder/You/Want/To/Open]"`
  1. Click `Next`, Set a Name and Click `Finish`
  1. Leave it on your desktop or drag it to your Taskbar to pin it there.

Also now that you have a shortcut you can customize your command window using `Right-click > Properties`:
  * Change the font used to something more readable
  * Decrease the font size to show more information
  * Increase the window size to reduce line wrapping
  * Increase the screen buffer to scroll farther back in the task history

#### Canceling a Task

So you ran `gulp aqa-wch` and you want to stop watching for changes to all projects source files. Or maybe you accidentally typed `gulp aqa-e2e` and don't want to wait for all the end-to-end tests to complete? Pressing <kbd>Ctrl</kbd>+<kbd>c</kbd> will pause the task and ask if you want to `Terminate batch job (Y/N)?` typing <kbd>y</kbd> <kbd>enter</kbd> will cancel the task.

#### Quiet Mode

If there is any issues found by the quality checks such as a lint error or failing unit test the system will beep, unless `--shh` is included. For example `gulp aqa-unit --shh`

### Run from Chrome Browser

- Download the [Gulp Devtools extension](https://chrome.google.com/webstore/detail/gulp-devtools/ojpmgjhofceebfifeajnjojpokebkkji) for Chrome Developer Tools from the Chrome Web Store.
- Gun `npm install gulp-devtools -g`
- Run `gulp-devtools` from the your project root folder (where your gulpfile.js is located)
- Open Chrome Dev tools, find the Gulp tab. The AQUA/Gulp tasks are now accessible from Chrome.

### Troubleshooting
During install some of you may encounter some issues.

Most issues can be solved by one of the following tips, but if are unable to find a solution feel free to an issue via the repository issue tracker.

#### Update NPM
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*. Usually updating those tools to the latest version solves the issue.

* Updating NPM: `npm update -g npm`

#### Cleaning NPM cache
NPM has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some issues.

* NPM Clean Cache: `npm cache clean`

## Testing

To improve efficiency and reduce cognitive load, *all* tests are written in JavaScipt, using a single testing framework ([Jasmine](http://jasmine.github.io/1.3/introduction.html)). This means you can use the same assertion patterns and mocking strategies whether you're writing end-to-end tests for a web project or unit tests for your Node.js project.

### Unit Tests

Unit tests are written in [Jasmine](http://jasmine.github.io/1.3/introduction.html) and for web projects are run with [Karma](http://karma-runner.github.io/0.12/index.html). Unit tests also have access to the [Jasmine JQuery](https://github.com/velesin/jasmine-jquery) custom [matchers](https://github.com/velesin/jasmine-jquery#jquery-matchers) and fixture loaders for HTML, CSS and JSON.

### Debugging

Unit tests can be run from the commandline with `gulp aqa-unit` or in your favorite browser.
Debugging can be done by setting break points in the source code, using	`console.log` and `debugger;` statements.


### End-to-end Tests

### Page Objects

End to end testing (aka Integration Testing) should be organized using the [PageObject Pattern](https://code.google.com/p/selenium/wiki/PageObjects) and run by the [Protractor API](https://github.com/angular/protractor/blob/master/docs/api.md).

Page Objects can be thought of as facing in two directions simultaneously. Facing towards the developer of a test, they represent the services offered by a particular page. Facing away from the developer, they should be the only thing that has a deep knowledge of the structure of the HTML of a page (or part of a page) It's simplest to think of the methods on a Page Object as offering the "services" that a page offers rather than exposing the details and mechanics of the page. As an example, think of the inbox of any web-based email system. Amongst the services that it offers are typically the ability to compose a new email, to choose to read a single email, and to list the subject lines of the emails in the inbox. How these are implemented shouldn't matter to the test.

Page Object Pattern Goals
 - The public methods represent the services that the page offers
 - Try not to expose the internals of the page
 - Generally don't make assertions
 - Methods return other PageObjects
 - Need not represent an entire page
 - Different results for the same action are modelled as different methods

### Debugging

You can pause end-to-end tests for debugging by using `browser.debugger()` for more, see documentation on [Debugging E2E Tests](https://github.com/angular/protractor/blob/master/docs/debugging.md#pausing-to-debug).


## Configuring AQUA

### Patterns

The AQUA config uses [glob patterns](https://www.npmjs.org/package/glob) similar to those in the various Unix shells to find and filter your files. Glob patterns resemble regular expressions somewhat, but have a much simpler syntax. The following character sequences have special meaning within a glob pattern:

  * `!` negates the pattern
  * `?` matches any one character
  * `*` matches any number of characters
  * `{!glob}` Matches anything that does not match glob
  * `{a,b,c}` matches any one of a, b or c
  * `[abc]` matches any character in the set a, b or c
  * `[^abc]` matches any character not in the set a, b or c
  * `[a-z]` matches any character in the range a to z, inclusive. A leading or trailing dash will be interpreted literally

While it's possible to manually include each set of files individually, it's encouraged that you use convention over configuration. For example say you want all your unit tests in a folder called specs, great, then use a wildcard pattern (`specs/*.js`) and the correct files will automatically be included as they are added or even renamed over time. All config files paths must be relative to where AQUA is run from.

### aqua.config.json

Used to configure AQUA settings that apply to all of your projects

  * `docs`: *Optional* Object; all settings related to generating documentation
    * `dir`: **Required** String; Where to put the generated documentation files for each project
    * `css`: *Optional* String; location of a stylesheet file to include into all documentation files
    * `js`: *Optional* String; location of a javascript file to include into all documentation files
    * `theme`: *Optional* String; the name of the [docstap theme](https://github.com/terryweiss/docstrap#what-it-looks-like) you want to use
  * `coverage`: *Optional* Object; all settings related to generating code coverage reports
    * `dir`: **Required** String; Where to put the generated coverage reports for each project
  * `testing`: *Optional* Object; all settings related to testing all projects
    * `framework`: **Required** String; Type of testing framework to run the tests in
    * `web`: *Optional* String; location of the Karma config file used to unit test web projects
    * `e2e`: *Optional* String; location of the protractor config file used to test web projects
    * `node`: *Optional* String; location of the config file used to unit test Node.js projects
  * `thresholds`: *Optional* Object; all settings related to testing all projects
    * `complexity`: *Optional* Object; configure complexity thresholds for all projects
      * `cyclomatic`: **Required** Number; cyclomatic complexity threshold
      * `halstead`: **Required** Number; halstead threshold
      * `maintainability`: **Required** Number; maintainability index threshold
    * `coverage`: *Optional* Object; configure test coverage thresholds for all projects
      * `statements`: **Required** Number; statement coverage threshold
      * `branches`: **Required** Number; branch coverage threshold
      * `functions`: **Required** Number; function coverage threshold
      * `lines`: **Required** Number; line coverage threshold
    * `percentTyped`: *Optional* Number; amount of the source code that must be typed threshold

### aqua.project.json

Used to configure AQUA settings that apply to an individual project

  * `id`: **Required** String; a short but unique id for all projects
  * `name`: **Required** String; a descriptive name of all projects
  * `src`: *Optional* Array; Where to find all source code written for all projects
  * `dest`: *Optional* String; Where to output the minified version of the source code
  * `destName`: *Optional* String; What file name to call the minified version of the source code
  * `by`: *Optional* String; name and email of the the teams or individuals that worked on all projects
  * `readme`: *Optional* String; Where to find the markdown file of all projects readme (used as the index documentation page)
  * `alljs`: *Optional* Array; Where to find all the JavaScript written for all projects, including specs (used for linting)
  * `unit`: *Optional* Object; Everything needed to run unit tests
    * `globals`: *Optional* Array; Where to find file(s) containing the expected global variables used by your project.
	  * `tests`: **Required** Array; Where to find all of all projects unit tests
	  * `deps`: *Optional* Array; Where to find the scripts all projects depends on (such as AngularJS or jQuery)
	  * `mocks`: *Optional* Array; Where to find any mocks used by all projects unit tests
  * `e2e`: *Optional* Object; Everything needed to run end-to-end tests
	  * `tests`: **Required** Array; Where to find all of all projects end-to-end tests
	  * `pgobj`: *Optional* Array; Where to find the page objects used by all projects end-to-end tests
  * `types`: *Optional* Array; Where to find all type definitions used by all projects
  * `type`: *Optional* String; Used to indicate the type of project (such as Node.js)

## Example AQUA Config File

Below are some typical configurations that you can cut-n-paste to jump-start your AQUA setup.

<pre class="sunlight-highlight-javascript">
{
  "docs": {
    "dir": "./docs",
    "css": "./css/doc.css",
    "js": "./js/doc.js"
  },
	"coverage": {
    "dir": "./test/coverage"
  },
  "testing": {
    "framework": "jasmine",
    "web": "./configs/karma.conf.js",
    "e2e": "./configs/protractor.conf.js",
    "node": "./configs/node.conf.js"
  }
}
</pre>

## Example Project Config Files

Below are some typical configurations that you can cut-n-paste to jump-start your project setup.

### Web Project

<pre class="sunlight-highlight-javascript">
{ 
	"id": "XX",
	"name": "YOUR PROJECT NAME",
	"by": "TEAM NAME &lt;yourteam@site.com&gt;",
	"readme": "./path/to/the/project/markdown/readme.md",
	"src" : [
		"./any/number/of/paths/to/the/project/sources/files/*.js"
	],
	"alljs" : [
		"./any/number/of/paths/to/the/project/source/specs/e2e/etc/*.js"
	],
	"unit" : {
		"tests": [
			"./any/number/of/paths/to/the/project/unit/tests/*.js"
		],
		"config": "./path/to/the/project/unit/test/karma.conf.js",
		"deps": [
			"./any/number/of/paths/to/the/project/dependencies/*.js"
		],
		"mocks": [
			"./any/number/of/paths/to/the/unit/test/mocks/*.js"
		]
	},
	"e2e" : {
		"tests": [
			"./any/number/of/paths/to/the/project/e2e/tests/*.js"
		],
		"pgobj": [
			"./any/number/of/paths/to/the/e2e/test/page/objects/*.js"
		]
	},
	"types": [
		"./any/number/of/paths/to/type/definitions/used/by/the/project/*.js"
	]
}
</pre>

### Node.js Project

<pre class="sunlight-highlight-javascript">
{ 
	"id": "XX",
	"name": "YOUR PROJECT NAME",
	"by": "TEAM NAME &lt;yourteam@site.com&gt;",
	"readme": "./path/to/the/project/markdown/readme.md",
	"src": [
		"./any/number/of/paths/to/the/project/sources/files/*.js"
	],
	"type": "nodejs",
	"unit": {
		"tests": [
			"./any/number/of/paths/to/the/project/unit/tests/*.js"
		],
		"config": "./path/to/the/project/unit/test/jasmine.conf.js",
		"mocks": [
			"./any/number/of/paths/to/the/unit/test/mocks/*.js"
		]
	},
	"alljs": [
		"./any/number/of/paths/to/the/project/source/specs/e2e/etc/*.js"
	],
	"types": [
		"./any/number/of/paths/to/type/definitions/used/by/the/project/*.js"
	]
}
</pre>

## License

(The MIT License)

Copyright (c) 2014 Daniel Lamb <dlamb.open.source@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[gpa-url]: https://codeclimate.com/github/daniellmb/AQUA
[gpa-image]: http://img.shields.io/codeclimate/github/daniellmb/AQUA.svg?style=flat
[issues-url]: https://github.com/daniellmb/AQUA/issues
[issues-image]: http://img.shields.io/github/issues/daniellmb/aqua.svg?style=flat
[travis-url]: https://travis-ci.org/daniellmb/AQUA
[travis-image]: http://img.shields.io/travis/daniellmb/AQUA.svg?style=flat
[coverage-url]: https://codeclimate.com/github/daniellmb/AQUA/code?sort=covered_percent&sort_direction=desc
[coverage-image]: http://img.shields.io/codeclimate/coverage/github/daniellmb/AQUA.svg?style=flat
[downloads-url]: https://www.npmjs.org/package/aqua
[downloads-image]: http://img.shields.io/npm/dm/aqua.svg?style=flat
[version-url]: https://www.npmjs.org/package/aqua
[version-image]: http://img.shields.io/badge/npm-v0.2.3-brightgreen.svg?style=flat
[tip-url]: https://www.gittip.com/daniellmb/
[tip-image]: http://img.shields.io/gittip/daniellmb.svg?style=flat
[irc-url]: http://webchat.freenode.net/?channels=aqua
[irc-image]: http://img.shields.io/badge/irc-%23aqua-brightgreen.svg?style=flat
[gitter-url]: https://gitter.im/daniellmb/AQUA
[gitter-image]: http://img.shields.io/badge/gitter-daniellmb/aqua-brightgreen.svg?style=flat
[hipchat-url]: http://www.hipchat.com/gpMy91MRw
[hipchat-image]: http://img.shields.io/badge/hipchat-aqua-brightgreen.svg?style=flat