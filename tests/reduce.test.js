import reduce from '../src/reduce.js';

describe('reduce', () => {
    const product1 = {
        name: 'Morning Brew',
        price: 2.99,
        categories: ['drink', 'caffeinated', 'dark roast'],
        producer: {
            name: 'The Coffee Company',
            email: 'contact@thecoffeecompany.com'
        }
    };

    const product2 = {
        name: 'Afternoon Brew',
        price: 3.99,
        categories: ['drink', 'caffeinated', 'medium roast'],
        producer: {
            name: 'The Coffee Company',
            email: 'contact@thecoffeecompany.com'
        }
    };

    const products = [product1, product2];

    test('should sum product prices correctly', () => {
        expect(reduce(products, (sum, p) => sum + p.price, 0)).toBeCloseTo(6.98);
    });

    test('should reduce to an array of product names', () => {
        expect(reduce(products, (names, p) => [...names, p.name], [])).toEqual(['Morning Brew', 'Afternoon Brew']);
    });

    test('should count products per category  correctly', () => {
        const counts = reduce(products, (counts, p) => {
            p.categories.forEach(c => {
                counts[c] = (counts[c] || 0) + 1;
            });
            return counts;
        }, {});
        
        expect(counts).toEqual({
            drink: 2,
            caffeinated: 2,
            'dark roast': 1,
            'medium roast': 1
        });
    });

    test('should throw TypeError when iteratee is not a function', () => {
        expect(() => reduce(products, undefined, 0)).toThrow(TypeError);
    });

    test('should return initial value when collection is not defined', () => {
        expect(reduce(undefined, (sum, p) => sum + p.price, 'default')).toEqual('default');
    });

    test('should return initial value for empty collection', () => {
        expect(reduce([], (sum, p) => sum + p.price, 0)).toEqual(0);
    });
});