/**
 * @file
 *
 * ### Responsibilities
 * - AQUA utility methods.
 *
 * @module util
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */


(function closure() {

  var _ = /** @type {_} */(require('lodash'));

  /**
   * Checks if `value` is not `undefined`.
   * @param {*} value - The value to check.
   * @return {boolean} Returns `true` if `value` is not `undefined`, else `false`.
   */
  exports.isDefined = function(value) {
    return !_.isUndefined(value);
  };

  /**
   * Iterates over own enumerable properties of an object executing the callback
   * for each property. The callback is bound to `thisArg` and invoked with three
   * arguments; (value, key, object). Callbacks may exit iteration early by
   * explicitly returning `false`.
   * @param {Object} object - The object to iterate over.
   * @param {Function} [callback=identity] - The function called per iteration.
   * @param {*} [thisArg] - The `this` binding of `callback`.
   * @return {Object} Returns `object`.
   */
  exports.forOwn = _.forOwn;


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
  exports.forEach = _.forEach;


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
  exports.assign = _.assign;


  /**
   * export lodash
   * @type {_}
   */
  exports._ = _;

}());
