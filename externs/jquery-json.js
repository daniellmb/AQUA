/**
 * Define the toJSON jquery plugin API.
 * @externs
 */


/**
Converts the given argument into a JSON respresentation.

If an object has a "toJSON" function, that will be used to get the representation.
Non-integer/string keys are skipped in the object, as are keys that point to a function.

json-serializble:
    The *thing* to be converted.

@param {*} o
@returns {string}
*/
$.toJSON = function (o) { };

/**
Evaluates a given piece of json source.
@param {string} src
@returns {Object}
*/
$.evalJSON = function (src) { };

/**
Evals JSON in a way that is *more* secure.
@param {string} src
@returns {Object}
*/
$.secureEvalJSON = function (src) { };

/*
Returns a string-repr of a string, escaping quotes intelligently.  
Mostly a support function for toJSON.    
Examples:
    >>> jQuery.quoteString("apple")
    "apple"
        
    >>> jQuery.quoteString('"Where are we going?", she asked.')
    "\"Where are we going?\", she asked."
@param {string} string
@returns {string}
*/
$.quoteString = function (string) { };
