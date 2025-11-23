import filter from '../src/filter.js'

describe ('filter', () => {
    test('should return the filtered array when input is filtered', () => {
        expect(filter([1,2,3],n=>n>1)).toEqual([2,3])
    });

    test('should return empty array when input is filtered', () => {
        expect(filter([1,2,3],n=>n>3)).toEqual([])
    });

    test('should return empty array when input is empty array', () => {
        expect(filter([],()=>true)).toEqual([])
    });    

    test('should return identical array to input when predicate is empty', () => {
        expect(filter([1,2,3],()=>true)).toEqual([1,2,3])
    });    

    test('should return empty array when input is undefined', () => {
        expect(filter(undefined,()=>true)).toEqual([])
    }); 

    test('should throw TypeError when predicate is undefined', () => {
        expect(filter([1,2],undefined)).toThrow(TypeError)
    }); 
    
});