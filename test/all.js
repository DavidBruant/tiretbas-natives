import test from 'ava'

import {last} from '../extend-builtins.js'

test('last on array with one element', t => {
    t.is([12][last], 12);
});
 
test('last on array with several elements', t => {
    t.is([12, 13, 14][last], 14);
});