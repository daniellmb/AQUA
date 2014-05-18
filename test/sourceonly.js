/**
 @define {boolean} SOURCEONLY is used to exclude sections of code that
 should not be included in production code such as debugging logic or
 exporting private methods and state for unit testing. These sections are
 stripped by specifying --define SOURCEONLY=false to the JSCompiler.
 */
var SOURCEONLY = true;
