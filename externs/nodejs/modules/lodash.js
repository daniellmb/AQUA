/**
 * Type definition for lodash.
 *
 * @externs
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */



/**
 * @param {Object|number} obj
 * @return {!_}
 * @constructor
 */
function _(obj) { return this; }


/**
 * Iterates over elements of a collection executing the callback for each
 * element. The callback is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * Note: As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 * @param {!Array|Object|string} collection - The collection to iterate over.
 * @param {!Function} iterator - The function called per iteration.
 * @param {*=} opt_context - The `this` binding of `callback`.
 * @return {Array|Object|string} Returns `collection`.
 */
_.forEach = function(collection, iterator, opt_context) { return {}; };


/**
 * Checks if `value` is `undefined`.
 * @param {*} value The value to check.
 * @return {boolean} Returns `true` if `value` is `undefined`, else `false`.
 */
_.isUndefined = function(value) { return true; };


/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous
 * sources. If a callback is provided it is executed to produce the assigned
 * values. The callback is bound to `thisArg` and invoked with five arguments;
 * (objectValue, sourceValue, key, object, source).
 * @param {Object} object - The destination object.
 * @param {...Object} var_args - The source objects.
 * @return {Object} Returns the destination object.
 */
_.assign = function(object, var_args) { return null; };
