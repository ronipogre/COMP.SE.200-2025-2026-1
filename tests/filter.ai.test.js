// Adjust the import path to match your project structure,
// e.g. '../src/filter.js' or '../filter.js'
import filter from '../src/filter.js'

describe('filter (manual test suite for e-commerce utility)', () => {
  // ---- Basic behaviour ----

  test('returns only elements that satisfy the predicate (simple numbers)', () => {
    const numbers = [1, 2, 3, 4, 5]

    const result = filter(numbers, (value) => value > 3)

    expect(result).toEqual([4, 5])
  })

  test('returns an empty array when no elements match', () => {
    const numbers = [1, 2, 3]

    const result = filter(numbers, (value) => value > 10)

    expect(result).toEqual([])
  })

  test('returns an empty array when input array is empty', () => {
    const result = filter([], (value) => true)

    expect(result).toEqual([])
  })

  test('returns an empty array when array is null', () => {
    const result = filter(null, () => true)

    expect(result).toEqual([])
  })

  test('returns an empty array when array is undefined', () => {
    const result = filter(undefined, () => true)

    expect(result).toEqual([])
  })

  test('does not mutate the original array', () => {
    const numbers = [1, 2, 3, 4]
    const originalCopy = [...numbers]

    const result = filter(numbers, (value) => value % 2 === 0)

    expect(numbers).toEqual(originalCopy)   // original unchanged
    expect(result).toEqual([2, 4])          // result has filtered values
  })

  test('returns a new array instance (not the same as input)', () => {
    const numbers = [1, 2, 3]

    const result = filter(numbers, () => true)

    expect(result).not.toBe(numbers)
    expect(result).toEqual([1, 2, 3])
  })

  test('predicate is called with (value, index, array)', () => {
    const array = ['a', 'b', 'c']
    const predicate = jest.fn(() => true)

    const result = filter(array, predicate)

    expect(predicate).toHaveBeenCalledTimes(array.length)
    expect(predicate).toHaveBeenNthCalledWith(1, 'a', 0, array)
    expect(predicate).toHaveBeenNthCalledWith(2, 'b', 1, array)
    expect(predicate).toHaveBeenNthCalledWith(3, 'c', 2, array)

    expect(result).toEqual(array)
  })

  test('supports truthy / falsy predicates (non-boolean return values)', () => {
    const values = [0, 1, 2, 3]

    // Only keep items where the predicate returns a truthy value (here: value)
    const result = filter(values, (value) => value)

    expect(result).toEqual([1, 2, 3])
  })

  // ---- E-commerce-specific scenarios ----

  test('filters active products (e.g. only show products available for sale)', () => {
    const products = [
      { id: 1, name: 'Organic Apple', active: true },
      { id: 2, name: 'Old Product', active: false },
      { id: 3, name: 'Fresh Bread', active: true }
    ]

    const result = filter(products, (product) => product.active)

    expect(result).toEqual([
      { id: 1, name: 'Organic Apple', active: true },
      { id: 3, name: 'Fresh Bread', active: true }
    ])
  })

  test('filters products by category (e.g. only dairy)', () => {
    const products = [
      { id: 1, name: 'Milk', category: 'dairy' },
      { id: 2, name: 'Cheddar', category: 'dairy' },
      { id: 3, name: 'Apple', category: 'fruit' }
    ]

    const result = filter(products, (product) => product.category === 'dairy')

    expect(result).toEqual([
      { id: 1, name: 'Milk', category: 'dairy' },
      { id: 2, name: 'Cheddar', category: 'dairy' }
    ])
  })

  test('filters products by max price (e.g. price <= 5.00)', () => {
    const products = [
      { id: 1, name: 'Premium Honey', price: 9.9 },
      { id: 2, name: 'Local Eggs', price: 4.5 },
      { id: 3, name: 'Cheap Pasta', price: 1.2 }
    ]

    const maxPrice = 5.0

    const result = filter(products, (product) => product.price <= maxPrice)

    expect(result).toEqual([
      { id: 2, name: 'Local Eggs', price: 4.5 },
      { id: 3, name: 'Cheap Pasta', price: 1.2 }
    ])
  })

  test('handles products with missing optional fields (e.g. category not set)', () => {
    const products = [
      { id: 1, name: 'Milk', category: 'dairy' },
      { id: 2, name: 'Mystery Box' }, // category missing
      { id: 3, name: 'Yoghurt', category: 'dairy' },
      { id: 4, name: 'Apple', category: 'fruit' }
    ]

    const result = filter(products, (product) => product.category === 'dairy')

    // should only include items where category is explicitly 'dairy'
    expect(result).toEqual([
      { id: 1, name: 'Milk', category: 'dairy' },
      { id: 3, name: 'Yoghurt', category: 'dairy' }
    ])
  })

  test('can filter by producer (e.g. only products from a specific small producer)', () => {
    const products = [
      { id: 1, name: 'Milk', producerId: 'farm-123' },
      { id: 2, name: 'Cheese', producerId: 'farm-123' },
      { id: 3, name: 'Bread', producerId: 'bakery-999' }
    ]

    const result = filter(products, (product) => product.producerId === 'farm-123')

    expect(result).toEqual([
      { id: 1, name: 'Milk', producerId: 'farm-123' },
      { id: 2, name: 'Cheese', producerId: 'farm-123' }
    ])
  })

  test('can use index in predicate (e.g. skip first N items - pagination-like behavior)', () => {
    const products = [
      { id: 1, name: 'P1' },
      { id: 2, name: 'P2' },
      { id: 3, name: 'P3' },
      { id: 4, name: 'P4' }
    ]

    // Example: only items after index 1 (skip first 2)
    const result = filter(products, (_product, index) => index >= 2)

    expect(result).toEqual([
      { id: 3, name: 'P3' },
      { id: 4, name: 'P4' }
    ])
  })

  // ---- Regression: shape of returned value ----

  test('does not wrap the result inside another array (regression test for [[]] bug)', () => {
    const numbers = [1, 2, 3]

    const result = filter(numbers, (value) => value > 1)

    // With the buggy implementation result would be: [[], 2, 3]
    // Correct behaviour: [2, 3]
    expect(result).toEqual([2, 3])
  })
})
