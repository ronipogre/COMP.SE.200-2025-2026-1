import isEmpty from '../src/isEmpty.js';

describe('isEmpty', () => {
    test('should return true when input is null', () => {
        expect(isEmpty(null)).toBe(true);
    });

    test('should return true when input is undefined', () => {
        expect(isEmpty(undefined)).toBe(true);
    });

    test('should return true when input is boolean true', () => {
        expect(isEmpty(true)).toBe(true);
    });

    test('should return true when input is boolean false', () => {
        expect(isEmpty(false)).toBe(true);
    });

    test('should return true when input is numbers', () => {
        expect(isEmpty(123456789)).toBe(true);
    });

    test('should return true when input is symbol', () => {
        expect(isEmpty(Symbol('x'))).toBe(true);
    });    

    // String
    test('should return false when input is non-empty string', () => {
        expect(isEmpty('milk')).toBe(false);
    });

    test('should return true when input is empty string', () => {
        expect(isEmpty('')).toBe(true);
    });

    // Array
     test('should return false when input is non-empty array', () => {
        expect(isEmpty([1,2,3])).toBe(false);
    });
    
    test('should return true when input is empty array', () => {
        expect(isEmpty([])).toBe(true);
    });

    // Map
    test('should return false when input is non-empty map', () => {
        const food_map = new Map()
        food_map.set('pear', '3.25')
        expect(isEmpty(food_map)).toBe(false);
    });
    
    test('should return true when input is empty map', () => {
        const food_map = new Map()
        expect(isEmpty(food_map)).toBe(true);
    });

    // Set
    test('should return false when input is non-empty set', () => {
        const numbers = new Set([1])
        expect(isEmpty(numbers)).toBe(false);
    });
    
    test('should return true when input is empty set', () => {
        const numbers = new Set([])
        expect(isEmpty(numbers)).toBe(true);
    });

    // Prototype
    test('should return false when input is prototype with properties', () => {
        function Food() {}
        Food.prototype.x =12345
        expect(isEmpty(Food.prototype)).toBe(false);
    });
    
    test('should return true when input is prototype without properties', () => {
        function Food() {}
        expect(isEmpty(Food.prototype)).toBe(true);
    });

    // Object
    test('should return false when input is non-empty object', () => {
        expect(isEmpty({category: 'bread'})).toBe(false);
    });

    test('should return true when input is empty object', () => {
        expect(isEmpty({})).toBe(true);
    });

    // value.splice
    test('should return false when input is array-like object with splice and length > 0', () => {
        const arraylike ={0: 'x', length: 1, splice: function () {} }
        expect(isEmpty(arraylike)).toBe(false);   
    });

    test('should return true when input is array-like object with splice and length 0', () => {
        const arraylike ={length: 0, splice: function () {} }
        expect(isEmpty(arraylike)).toBe(true);
    });

    // isBuffer
    test('should return false when input is non-empty buffer', () => {
        expect(isEmpty(Buffer.from('abc'))).toBe(false);
    });

    test('should return true when input is empty buffer', () => {
        expect(isEmpty(Buffer.alloc(0))).toBe(true);
    });

    // isTypedArray
    test('should return false when input is non-empty typed error', () => {
        expect(isEmpty(new Uint8Array([1]))).toBe(false);
    });

    test('should return true when input is empty typed error', () => {
        expect(isEmpty(new Uint8Array())).toBe(true);
    });

    // isArguments
    test('should return false when input is non-empty arguments object', () => {
        function fn() { return isEmpty(arguments)}
        expect(fn(1,2,3)).toBe(false);
    });

    test('should return true when input is empty arguments object', () => {
        function fn() { return isEmpty(arguments)}
        expect(fn()).toBe(true);
    });

    // Non-enumerable properties
    test('should return true when input is object with non-enumerable property', () => {
        const obj = {}
        Object.defineProperty(obj, 'hidden', {
            value:123,
            enumerable:false
        })
        expect(isEmpty(obj)).toBe(true);
    })

    // Inherited properties
    test('should return true when input is object with inherited properties only', () => {
        const parent = {a:1}
        const child = Object.create(parent)
        expect(isEmpty(child)).toBe(true);
    })
});