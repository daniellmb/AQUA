# AQUA: Automated QUality Analysis

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
  * Advanced Minification
  * Unit Test Runnner
  * Code Coverage Reports
  * End-to-end Test Runner
  * Documentation Generation

### CSS

  * Lint StyleSheets for Syntax Errors and Anti-Patterns

### C&#35;

  * Lint Source Code for Syntax Errors and Anti-Patterns (via [FxCop](http://msdn.microsoft.com/en-us/library/bb429476.aspx))
  * Analyze Code Against Complexity Thresholds (via [Code Metrics PowerTool](http://www.microsoft.com/en-us/download/details.aspx?id=38196))
  * Unit Test Runnner
  * Code Coverage Reports
  * End-to-end Test Runner
  * Documentation Generation

### Environments

AQUA is designed to play well with the following types of projects.

  * Web Projects
  * Node.js Projects

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

AQUA dynamically creates gulp tasks for you, based on what is configured in your `aqua.project.json` file. Tasks are namespaced with the project `id` in your config file.

| gulp            | does                                                             |
|-----------------|------------------------------------------------------------------|
|`gulp`           |: list all possible gulp tasks for all projects                   |
|`gulp ?`         |: list all possible gulp tasks for all projects                   |
|`gulp {id}`      |: run all project tasks in the correct order                      |
|`gulp {id}-?`    |: list all possible gulp tasks for the project                    |
|`gulp {id}-all`  |: run all project tasks in the correct order                      |
|`gulp {id}-lint` |: lint the source code                                            |
|`gulp {id}-gpa`  |: analyze the source against complexity thresholds                |
|`gulp {id}-unit` |: run unit tests against the source code                          |
|`gulp {id}-chk`  |: type check the source code                                      |
|`gulp {id}-min`  |: minify the source code and create source map                    |
|`gulp {id}-e2e`  |: run end-to-end tests against the minified code                  |
|`gulp {id}-doc`  |: generate documentation from code annotations	                   |
|`gulp {id}-wch`  |: watch for file changes and automatically run all but e2e        |

#### Customization

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

So you ran `gulp {id}-wch` and you want to stop watching for changes to the project source files. Or maybe you accidentally typed `gulp {id}-e2e` and don't want to wait for all the end-to-end tests to complete? Pressing <kbd>Ctrl</kbd>+<kbd>c</kbd> will pause the task and ask if you want to `Terminate batch job (Y/N)?` typing <kbd>y</kbd> <kbd>enter</kbd> will cancel the task.

#### Quiet Mode

If there is any issues found by the quality checks such as a lint error or failing unit test the system will beep, unless `--shh` is included. For example `gulp clp-unit --shh`

### Run from Chrome Browser

- Download the [Gulp Devtools extension](https://chrome.google.com/webstore/detail/gulp-devtools/ojpmgjhofceebfifeajnjojpokebkkji) for Chrome Developer Tools from the Chrome Web Store.
- Gun `npm install gulp-devtools -g`
- Run `gulp-devtools` from the your project root folder (where your gulpfile.js is located)
- Open Chrome Dev tools, find the Gulp tab. The AQUA/Gulp tasks are now accessible from Chrome.

### Environment Prep

You'll need to have [node.js](http://nodejs.org/download/) v10+ installed.

1. navigate to your project root
1. run `npm install`
  1. for windows you may need to add `-msvs_version=2012`
1. install gulp globally `npm install gulp -g`

## Testing

To improve efficiency and reduce cognitive load, *all* tests are written in JavaScipt, using a single testing framework ([Jasmine](http://jasmine.github.io/1.3/introduction.html)). This means you can use the same assertion patterns and mocking strategies whether you're writing end-to-end tests for a web project or unit tests for your Node.js project.

### Unit Tests

Unit tests are written in [Jasmine](http://jasmine.github.io/1.3/introduction.html) and for web projects are run with [Karma](http://karma-runner.github.io/0.12/index.html). Unit tests also have access to the [Jasmine JQuery](https://github.com/velesin/jasmine-jquery) custom [matchers](https://github.com/velesin/jasmine-jquery#jquery-matchers) and fixture loaders for HTML, CSS and JSON.

### Debugging

Unit tests can be run from the commandline with `gulp {id}-unit` or in your favorite browser.
Debugging can be done by setting break points in the source code, using	`console.log` and `debugger;` statements.


### End-to-end Tests

### Page Objects

End to end testing (aka Integration Testing) are organized using the [PageObject Pattern](https://code.google.com/p/selenium/wiki/PageObjects) and run by the [Protractor API](https://github.com/angular/protractor/blob/master/docs/api.md).

Page Objects can be thought of as facing in two directions simultaneously. Facing towards the developer of a test, they represent the services offered by a particular page. Facing away from the developer, they should be the only thing that has a deep knowledge of the structure of the HTML of a page (or part of a page) It's simplest to think of the methods on a Page Object as offering the "services" that a page offers rather than exposing the details and mechanics of the page. As an example, think of the inbox of any web-based email system. Amongst the services that it offers are typically the ability to compose a new email, to choose to read a single email, and to list the subject lines of the emails in the inbox. How these are implemented shouldn't matter to the test.

Page Object Pattern Goals
 - The public methods represent the services that the page offers
 - Try not to expose the internals of the page
 - Generally don't make assertions
 - Methods return other PageObjects
 - Need not represent an entire page
 - Different results for the same action are modelled as different methods

### Debugging

You can pause end-to-end tests for debugging by using `browser.degugger()` for more, see documentation on [Debugging E2E Tests](https://github.com/angular/protractor/blob/master/docs/debugging.md#pausing-to-debug).


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

While it's possible to manually include each set of files individually, it's encouraged that you use convention over configuration. For example say you want all your unit tests in a folder called specs, great, then use a wildcard pattern (`specs/*.js`) and the correct files will automatically be included as they are added or even renamed over time. All config files paths must be relative to where aqua is run from.

### aqua.config.json

Used to configure AQUA settings that apply to all of your projects

  * `docs`: **Required** Array; Where to find all source code written for the project
  * `docs`: *Optional* Object; all setting related to generating documentation
    * `dir`: **Required** String; Where to put the generated documentation files for the project
    * `css`: *Optional* String; location of a stylesheet file to include into all documentation files
    * `js`: *Optional* String; location of a javascript file to include into all documentation files
    * `theme`: *Optional* String; the name of the [docstap theme](https://github.com/terryweiss/docstrap#what-it-looks-like) you want to use
  * `coverage`: *Optional* Object; all setting related to generating code coverage reports
    * `dir`: **Required** String; Where to put the generated coverage reports for the project
  * `testing`: *Optional* Object; all setting related to testing the project
    * `framework`: **Required** String; Type of testing framework to run the tests in
    * `web`: *Optional* String; location of the Karma config file used to unit test web projects
    * `e2e`: *Optional* String; location of the protractor config file used to test web projects
    * `node`: *Optional* String; location of the config file used to unit test Node.js projects

### aqua.project.json

Used to configure AQUA settings that apply to an individual project

  * `id`: **Required** String; a short but unique id for the project
  * `name`: **Required** String; a descriptive name of the project
  * `src`: **Required** Array; Where to find all source code written for the project
  * `by`: *Optional* String; name and email of the the teams or individuals that worked on the project
  * `readme`: *Optional* String; Where to find the markdown file of the project readme (used as the index documentation page)
  * `alljs`: *Optional* Array; Where to find all the JavaScript written for the project, including specs (used for linting)
  * `globals`: *Optional* Array; Where to find file(s) containing the expected global variables used by your project.
  * `unit`: *Optional* Object; Everything needed to run unit tests
	  * `tests`: **Required** Array; Where to find all of the projects unit tests
	  * `deps`: *Optional* Array; Where to find the scripts the project depends on (such as AngularJS or jQuery)
	  * `mocks`: *Optional* Array; Where to find any mocks used by the project unit tests
  * `e2e`: *Optional* Object; Everything needed to run end-to-end tests
	  * `tests`: **Required** Array; Where to find all of hte projects end-to-end tests
	  * `pgobj`: *Optional* Array; Where to find the page objects used by the project end-to-end tests
  * `types`: *Optional* Array; Where to find all type definitions used by the project
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

## Type Checking

AQUA give you the ability to type check your JavaScript code without having to learn a new language such as [TypeScript](http://www.typescriptlang.org/). Type checking is done using [Google Closure compiler](https://github.com/google/closure-compiler) that is written in Java so you'll need the [Java Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) (JRE 7u51+) installed to do type checking. For troubleshooting see the [GCC Wiki](https://github.com/google/closure-compiler/wiki). If you need to [remove older versions of Java](https://www.java.com/en/download/faq/remove_olderversions.xml) there is documentation for your operating system.

### Code Comments

All code should be annotated with comments to enable both type checking at compile time as well as documentation generation. See [JSDoc Dictionary](http://usejsdoc.org/) and [Closure Compiler Annotation](https://developers.google.com/closure/compiler/docs/js-for-compiler) for more information. Both ([GitHub Flavored Markdown](http://github.github.com/github-flavored-markdown/)) and HTML is supported in the comments, with Markdown preferred as it does not degrade reading the source code as much as HTML.

<pre class="sunlight-highlight-javascript">
/**
  * An implementation of `_.contains` for cache objects that mimics the return
  * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
  * This example is from [lodash](https://github.com/lodash/lodash/blob/master/lodash.js#L273).
  *
  * @private
  * @param {Object} cache The cache object to inspect.
  * @param {*} value The value to search for.
  * @returns {number} Returns `0` if `value` is found, else `-1`.
  */
  function baseIndexOf(array, value, fromIndex) {
    var index = (fromIndex || 0) - 1,
        length = array ? array.length : 0;

    while (++index &lt; length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
</pre>