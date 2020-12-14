var _from;

const {
  map
} = require('rxjs/operators');

const {
  from
} = require('rxjs');

(_from = from([10]), _from.pipe(map(x => x + 1))).subscribe(x => expect(x).toBe(11));
