import {chunk, some} from 'lodash';
import {Map, List} from 'immutable';


function checkPair(pair, key, value) {
    const [key_check, value_check] = pair;
    return key_check(key) && value_check(value);
}


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


export function ListSchema(...validators) {
    return function(candidate) {
        if (List.isList(candidate) && candidate.size === validators.length) {
            return candidate.every((value, index) => validators[index](value));
        } else {
            return false;
        }
    };
}
