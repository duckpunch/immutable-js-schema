import {includes} from 'lodash';


function MapSchema(key, value, ...) {
    return function_that_validates_map;
}


function ListSchema(...functions_that_return_bool) {
    return function_that_validates_list;
}


validate(
    candidate,
    MapSchema(
        ListSchema(num, num),
        s => includes([], s)
    )
)
