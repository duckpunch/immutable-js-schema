import {ListSchema} from '../src/index.js';
import {isNumber} from 'lodash';
import {List} from 'immutable';
import assert from 'assert';


describe('ListSchema', function() {
    it('simple number can be validated', function() {
        assert.ok(ListSchema(isNumber)(List.of(4)));
    });

    it('strings arent numbers', function() {
        assert.ok(false === ListSchema(isNumber)(List.of('hi')));
    });
});
