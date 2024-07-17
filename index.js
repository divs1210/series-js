function diffs(xs) {
    let res = [];
    for(let i = 1; i < xs.length; i++)
        res.push(xs[i] - xs[i - 1]);
    return res;
}

function* iterateGen(init, f) {
    let last = init;
    while(true) {
        yield last;
        last = f(last);
    }        
}

function* takeGen(gen, n) {
    let i = 0;
    while(i < n) {
        let result = gen.next();
        if(result.done)
            break;
        yield result.value;
        i++;
    }
}

function triangle(pattern) {
    return [...takeGen(iterateGen(pattern, diffs), pattern.length)];
}

function chain(init, ...fs) {
    return fs.reduce(
        (acc, f) => f(acc),
        init
    )
}

function* mapGen(gen, f) {
    let res = gen.next();
    while(!res.done) {
        yield f(res.value);
        res = gen.next();
    }
}

function dropWhile(arr, f) {
    let i;
    for(i = 0; i < arr.length; i++) {
        if(!f(arr[i]))
            break;
    }
    return arr.slice(i);
}

function reductions(arr, f) {
    let [x, ...xs] = arr;
    return xs.reduce(
        (acc, x) => {
            acc.push(f(acc.at(-1), x));
            return acc;
        },
        [x]
    );
}

function restGen(gen) {
    let res = gen.next();
    if(res.done)
        return [].entries();
    else
        return gen;
}

/**
 * Returns a generator
 * that will yield infinitely many numbers
 * obtained by extrapolating the given pattern.
 * 
 * The pattern should have e + 1 elements,
 * where e is the max exponent of the intended polynomial.
 * @example
 * // yields: 1, 1, 1, ...
 * infer([1])
 * @example
 * // yields: 1, 2, 3, 4, 5, ...
 * infer([1, 2])
 * @example
 * // yields: 1, 4, 9, 16, 25, ...
 * infer([1, 4, 9])
 * @param {number[]} pattern 
 * @returns {Generator<number, never, never>}
 */
function* infer(pattern) {
    if (!pattern?.length)
        throw new Error('pattern cannot be empty');

    yield* pattern;
    yield* chain(
        triangle(pattern),
        $ => $.map(xs => xs.at(-1)),
        $ => $.toReversed(),
        $ => dropWhile($, x => x === 0),
        $ => iterateGen($, arr => reductions(arr, (x, y) => x + y)),
        $ => mapGen($, arr => arr.at(-1)),
        restGen
    );
}

/**
 * Returns a generator
 * that will yield n numbers
 * obtained by extrapolating the given pattern.
 * 
 * The pattern should have e + 1 elements,
 * where e is the max exponent of the intended polynomial.
 * @example
 * // yields: 1, 1, 1
 * inferN([1], 3)
 * @example
 * // yields: 1, 2, 3
 * inferN([1, 2], 3)
 * @example
 * // yields: 1, 4, 9, 16, 25
 * inferN([1, 4, 9], 5)
 * @param {number[]} pattern
 * @param {number} n
 * @returns {Generator<number, undefined, never>}
 */
function inferN(pattern, n) {
    return takeGen(infer(pattern), n);
}

/**
 * Returns an array of n numbers
 * obtained by extrapolating the given pattern.
 * 
 * The pattern should have e + 1 elements,
 * where e is the max exponent of the intended polynomial.
 * @example
 * // returns: [1, 1, 1]
 * inferArray([1], 3)
 * @example
 * // returns: [1, 2, 3]
 * inferArray([1, 2], 3)
 * @example
 * // returns: [1, 4, 9, 16, 25]
 * inferArray([1, 4, 9], 5)
 * @param {number[]} pattern
 * @param {number} n
 * @returns {number[]}
 */
function inferArray(pattern, n) {
    return [...inferN(pattern, n)];
}

module.exports = { infer, inferN, inferArray };