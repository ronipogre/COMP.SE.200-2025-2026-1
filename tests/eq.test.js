import eq from '../src/eq.js';

describe('eq', () => {
    const product1 = {
        name: 'Morning Brew',
        price: 2.99
    };

    const product2 = {
        name: 'Morning Brew',
        price: 2.99
    };

    test('should return true for equal primitives', () => {
        expect(eq('1', '1')).toBeTruthy();
        expect(eq(1, 1)).toBeTruthy();
        expect(eq(true, true)).toBeTruthy();
    });

    test('should return false for unequal primitives', () => {
        expect(eq('1', '2')).toBeFalsy();
        expect(eq(1, 2)).toBeFalsy();
        expect(eq(true, false)).toBeFalsy();
    });

    test('should return false for different type primitives', () => {
        expect(eq('1', 1)).toBeFalsy();
        expect(eq(true, 'true')).toBeFalsy();
    });

    test('should return true for two undefined values', () => {
        expect(eq(undefined, undefined)).toBeTruthy();
    });

    test('should return false for valid value and undefined value', () => {
        expect(eq('string', undefined)).toBeFalsy();
    });

    test('should return false for different objects with identical content', () => {
        expect(eq(product1, product2)).toBeFalsy();
    });

    test('should return true for two NaN values', () => {
        expect(eq(NaN, NaN)).toBeTruthy();
    });
});