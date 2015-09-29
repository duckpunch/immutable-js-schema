import {FixedListSchema, MapSchema} from '../src/index.js';
import {isString, isNumber} from 'lodash';
import {List, Map} from 'immutable';
import assert from 'assert';


describe('FixedListSchema', function() {
    it('validates simple conditions', function() {
        assert.ok(FixedListSchema(isNumber)(List.of(4)));
    });

    it('notices when strings arent numbers', function() {
        assert.ok(false === FixedListSchema(isNumber)(List.of('hi')));
    });

    it('correctly tests order for 3 item lists', function() {
        const schema = FixedListSchema(isString, isNumber, v => v === 'greetings');
        const list = List.of('hi', 14.5, 'greetings');
        assert.ok(schema(list));
    });
});


describe('MapSchema', function() {
    it('validates simple maps', function() {
        const schema = MapSchema(isString, isNumber);
        assert.ok(schema(Map({'hi': 5})));
    });

    it('still validates correctly when only some key-value validators match', function() {
        const schema = MapSchema(
            isString, isNumber,
            v => isNumber(v) && (v % 2 === 0), isString
        );

        assert.ok(schema(
            Map().set('hi', 5).set(14, 'roar')
        ));
    });
});
