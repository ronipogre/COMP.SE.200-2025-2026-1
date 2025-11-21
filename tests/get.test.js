import get from '../src/get.js';

describe('get', () => {
    const product = {
        name: 'Morning Brew',
        price: 2.99,
        categories: ['drink', 'caffeinated', 'dark roast'],
        producer: {
            name: 'The Coffee Company',
            email: 'contact@thecoffeecompany.com'
        }
    };

    test('should return correct value for valid path', () => {
        expect(get(product, 'price')).toBeCloseTo(2.99);
    });

    test('should work with path being an array', () => {
        expect(get(product, ['producer', 'name'])).toEqual('The Coffee Company');
    });

    test('should work with array indexing', () => {
        expect(get(product, 'categories[1]')).toEqual('caffeinated');
    });

    test('should return default value for out-of-bounds indexing', () => {
        expect(get(product, 'categories[3]')).toEqual(undefined);
    });

    test('should return undefined for invalid path when no given default value', () => {
        expect(get(product, 'producer.address')).toEqual(undefined);
    });

    test('should return given default value for invalid path', () => {
        expect(get(product, 'discount', 0)).toEqual(0);
    });

    test('should return default value for object that does not exist', () => {
        expect(get(null, 'name')).toEqual(undefined);
    });
});
