const { map } = require('rxjs/operators');
const { from } = require('rxjs');

(from([10]) |> map(x => x + 1)).
    subscribe(x => expect(x).toBe(11));
