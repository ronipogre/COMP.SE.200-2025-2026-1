import add from '../src/add.js';

describe('add', () => {
    test('should return the sum of two positive integers', () => {
        expect(add(2, 5)).toEqual(7)
    });

    test('should handle mixed sign integers', () => {
        expect(add(5, -6)).toEqual(-1)
    });

    test('should return the original number when adding zero', () => {
        expect(add(12, 0)).toEqual(12)
    });

    test('should handle floating point numbers', () => {
        expect(add(-2.94, 9)).toBeCloseTo(6.06)
    });

    test('should throw TypeError when adding string to number', () => {
        expect(() => add(6, 'a string')).toThrow(TypeError)
    });

    test('should throw TypeError when adding undefined parameter to number', () => {
        expect(() => add(3.22, undefined)).toThrow(TypeError)
    });
});