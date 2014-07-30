# Type Check JavaScript

Type check your JavaScript code without having to learn a new language such as [TypeScript](http://www.typescriptlang.org/).

## Task

Use the `{id}-chk` task to to have [Google Closure compiler](https://github.com/google/closure-compiler) perform advanced type checking on your source code using code annotations. Where `{id}` is the project id you've configured in your aqua.project.json file.

## Configuration

To use this task you need to include the following required sections in your in your [aqua.project.json](https://github.com/daniellmb/AQUA#user-content-aquaprojectjson) file.

### Required

* `src`: Where to find all source code written for the project
* `types`: Array; Where to find all type definitions used by the project

### Optional

* `globals`: Array; Where to find file(s) containing the expected global variables used by your project.
* `mocks`: Array; Where to find any mocks used by the project unit tests

## Code Comments

All code should be annotated with comments to enable both type checking at compile time as well as documentation generation. See [JSDoc Dictionary](http://usejsdoc.org/) and [Closure Compiler Annotation](https://developers.google.com/closure/compiler/docs/js-for-compiler) for more information. Both ([GitHub Flavored Markdown](http://github.github.com/github-flavored-markdown/)) and HTML is supported in the comments, with Markdown preferred as it does not degrade reading the source code as much as HTML.

```javascript
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
```

### Function declarations

```javascript
/** @type {function():string} */
function f() {return 'str'}
```


### Variable declarations

```javascript
/** @type {string} */
var x = 'fruit';
```

or

```javascript
var /** @type {string} */ x = 'fruit';
```

### Property declarations

```javascript
/** @type {string} */
x.prop = 'fruit';
```
or

```javascript
var x = {
  /** @type {string} */
  prop : 'fruit'
};
```

### Catch declarations

```javascript
try {
  // ...
} catch (/** @type {string} */ e) {
  // ...
}
```

### Type Casts

Type cast precede a parenthesized expression.

```javascript
var x = /** @type {string} */ (fruit);
```

## Prerequisite

Type checking is done using [Google Closure compiler](https://github.com/google/closure-compiler), a tool that is written in Java so you'll need the [Java 7 Runtime Environment](http://www.oracle.com/technetwork/java/javase/downloads/jre7-downloads-1880261.html) (JRE 7u51+) installed to do type checking. For troubleshooting see the [GCC Wiki](https://github.com/google/closure-compiler/wiki). If you need to [remove older versions of Java](https://www.java.com/en/download/faq/remove_olderversions.xml) there is documentation for your operating system.