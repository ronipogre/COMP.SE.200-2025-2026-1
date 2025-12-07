import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
    test('should return the input when input is already number', () => {
        expect(toNumber(2)).toEqual(2);
        expect(toNumber(4.2)).toEqual(4.2);
        expect(toNumber(Number.MIN_VALUE)).toEqual(Number.MIN_VALUE);
        expect(toNumber(Infinity)).toEqual(Infinity);
    });

    test('should return NaN when the input is symbol', () => {
        expect(toNumber(Symbol('x'))).toEqual(NaN);
    });

    test('should return 1 or 0 when the input is boolean', () => {
        expect(toNumber(true)).toEqual(1);
        expect(toNumber(false)).toEqual(0);
    });

    test('should return 0 when the input is null', () => {
        expect(toNumber(null)).toEqual(0);
    });

    test('should return Nan when the input is undefined', () => {
        expect(toNumber(undefined)).toEqual(NaN);
    });

    test('should return number when the input is object containing number', () => {
        const obj = {
            valueOf() {
                return 0
            }
        }
        expect(toNumber(obj)).toEqual(0);
    });

    test('should return Nan when the input is empty object', () => {
        const obj = Object.create(null)
        expect(toNumber(obj)).toBeNaN();
    });

    test('should return trimmed number when the input is untrimmed numeric string', () => {
        expect(toNumber('     5.2   ')).toEqual(5.2);
    });

    test('should return number when the input is binary string', () => {
        expect(toNumber('0b11111111')).toEqual(255);
    });

    test('should return number when the input is octal string', () => {
        expect(toNumber('0O755')).toEqual(493);
    });

    test('should return NaN when the input is bad hex', () => {
        expect(toNumber('-0x1f')).toBeNaN();
    });
})