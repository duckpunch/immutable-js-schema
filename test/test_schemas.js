import {ListSchema, MapSchema} from '../src/index.js';
import {isString, isNumber} from 'lodash';
import {List, Map} from 'immutable';
import assert from 'assert';


describe('ListSchema', function() {
    it('validates simple conditions', function() {
        assert.ok(ListSchema(isNumber)(List.of(4)));
    });

    it('notices when strings arent numbers', function() {
        assert.ok(false === ListSchema(isNumber)(List.of('hi')));
    });
});


describe('MapSchema', function() {
    it('validates simple maps', function() {
        const schema = MapSchema(isString, isNumber);
        assert.ok(schema(Map({'hi': 5})));
    });
});
