const series = require('./index');

test('1 to 10', () => {
    expect(
        series.inferArray([1, 2], 10)
    ).toEqual(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    );
});

test('10 to 1', () => {
    expect(
        series.inferArray([10, 9], 10)
    ).toEqual(
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    );
});

test('5 multiples of 10', () => {
    expect(
        series.inferArray([10, 20], 5)
    ).toEqual(
        [10, 20, 30, 40, 50]
    );
});

test('first 5 squares', () => {
    expect(
        series.inferArray([1, 4, 9], 5)
    ).toEqual(
        [1, 4, 9, 16, 25]
    );
});

test('repeat same number', () => {
    expect(
        series.inferArray([1], 3)
    ).toEqual(
        [1, 1, 1]
    );
});

test('empty pattern', () => {
    expect(() => {
        series.inferArray([], 3)
    }).toThrow('empty');
});