import {chunk, some} from 'lodash';
import {Map, List} from 'immutable';


/**
 * @private
 * Checks a key and value against callables given by a tuple of functions
 *
 * @param {Array} pair
 * @param {*} key any value to test
 * @param {*} value any value to test
 * @returns {Boolean} whether the key/value match the pair
 */
function checkPair(pair, key, value) {
    const [key_check, value_check] = pair;
    return key_check(key) && value_check(value);
}


/**
 * Creates a validator function based on passed validator 2-tuples.
 *
 * Key-value entries in the map must satisfy at least one of the validator tuples.
 *
 * TODO: Optional and required key/values
 *
 * @param {function} ...validators functions in pairs to match with each key-value pair
 * @returns {function} function returns true if passed a valid Map
 * @example
 * var isValid = MapSchema(isNumber, Exactly('hi'), isString, isNumber);
 *
 * isValid(Map().set(5, 'hi')); // true
 * isValid(Map().set('hi', 'hi')); // false
 * isValid(Map().set(5, 'hi').set('foo', 3)); // true
 */
export function MapSchema(...validators) {
    const pairs = chunk(validators, 2);
    if (validators.length % 2 === 1) {
        throw 'Must have even length of validators';
    }

    function validatePair(value, key) {
        return some(pairs, pair => checkPair(pair, key, value));
    }

    return function(candidate) {
        if (Map.isMap(candidate)) {
            return candidate.every(validatePair);
        } else {
            return false;
        }
    };
}


/**
 * Generates a function that checks each value matches the validators passed,
 * respective per index.
 *
 * @param {function} ...validators functions, in order, to check each value in the passed list
 * @returns {function} which returns true if each element in list matches in order
 * @example
 * var schema = FixedListSchema(Exactly('roar'), isNumber);
 *
 * schema(List.of(3));  // false
 * schema(List.of('roar'));  // false
 * schema(List.of('fake roar'));  // false
 * schema(List.of('roar', 15));  // true
 */
export function FixedListSchema(...validators) {
    return function(candidate) {
        if (List.isList(candidate) && candidate.size === validators.length) {
            return candidate.every((value, index) => validators[index](value));
        } else {
            return false;
        }
    };
}


/**
 * Generates a function that checks that each element of a List matches at least
 * one of the passed validators.
 *
 * @param {function} ...validators functions to check each value in the passed list
 * @returns {function} which returns true if each element in list matches at least one validator
 * @example
 * var schema = ListSchema(Exactly('roar'), isNumber);
 *
 * schema(List.of(3));  // true
 * schema(List.of('roar'));  // true
 * schema(List.of(3, 'fake roar'));  // false
 */
export function ListSchema(...validators) {
    return function(candidate) {
        if (List.isList(candidate)) {
            return candidate.every(
                value => some(validators, validator => validator(value))
            );
        } else {
            return false;
        }
    };
}


/**
 * Convenience function that returns a function that validates strict equality.
 *
 * @param {*} value value to test equality
 * @returns {function} evaluates strict equality of passed value
 * @example
 * var isExactly = Exactly('3');
 *
 * isExactly('hi');  // false
 * isExactly(3);  // false
 * isExactly('3');  // true
 */
export function Exactly(value) {
    return candidate => value === candidate;
}


/**
 * Convenience function that returns a function that validates strict membership
 * in passed arguments.
 *
 * @param {*} ...values collection of values to test membership upon
 * @returns {function} evaluates membership of passed value
 * @example
 * var membership = OneOf('hi', '3', 19);
 *
 * membership('hi');  // true
 * membership(3);  // false
 * membership('not in there');  // false
 * membership(19);  // true
 */
export function OneOf(...values) {
    return candidate => some(values, Exactly);
}
