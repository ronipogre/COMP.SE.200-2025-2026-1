import defaultToAny from '../src/defaultToAny.js'

describe ('defaultToAny', () => {
    test('should return the first value when no value is not null/undefined/Nan', () => {
        expect(defaultToAny(1,2,3)).toBe(1)
        expect(defaultToAny("bread", "milk")).toBe("bread")
    })

    test('should return the first value which is not null/undefined/Nan', () => {
        expect(defaultToAny(null,undefined,3)).toBe(3)
        expect(defaultToAny(NaN, "milk")).toBe("milk")
    })    
    
    test('should return NaN is all values are either null,undefined or Nan', () => {
        expect(defaultToAny(null,NaN,undefined)).toBe(NaN)
    })            
});