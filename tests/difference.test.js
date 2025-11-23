import difference from '../src/difference.js';

describe('difference', () => {
    test('should return array which includes values from first array inputted which are not in other arrays inputted ', () => {
        expect(difference([2,1], [2,3])).toEqual([1]);
        expect(difference([1,2,3,4], [2], [3,4])).toEqual([1]);
        expect(difference([1,2])).toEqual([1,2]);
    });

    test('should return empty array when input is not array', () => {
        expect(difference(null, [2,3])).toEqual([]);
        expect(difference(12321, [2,3])).toEqual([]);

    });
});