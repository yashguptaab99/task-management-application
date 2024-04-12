/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SortedConfig<T> {
    key: keyof T | string
    order?: 'asc' | 'desc'
}

/**
 * Validates the type of a value.
 * @param value The value to validate.
 * @returns True if the value is a Date, Number, or a number; otherwise, false.
 */
function validateTypes<T>(value: T): boolean {
    return value instanceof Date || value instanceof Number || typeof value === 'number'
}

/**
 * Recursively sorts two elements based on the provided sort configuration array.
 * @param a - The first element to compare.
 * @param b - The second element to compare.
 * @param sortArray - An array of sort configurations.
 * @returns A number indicating the sort order of the elements.
 */
function recursiveSort<T>(a: T, b: T, sortArray: Array<SortedConfig<T>>): number {
    if (sortArray.length === 0) return 0

    const { key, order = 'asc' } = sortArray[0]
    const rowA = a as any
    const rowB = b as any
    const valueA = rowA[key] !== undefined ? rowA[key] : ''
    const valueB = rowB[key] !== undefined ? rowB[key] : ''

    if (valueA === valueB) {
        sortArray.shift()
        return recursiveSort(a, b, sortArray)
    }

    let result = 0
    if (validateTypes(valueA) && validateTypes(valueB)) {
        result = valueA - valueB
    } else {
        result = valueA?.toString().localeCompare(valueB?.toString(), undefined, {
            numeric: true,
            sensitivity: 'base',
        })
    }

    return order === 'asc' ? result : -1 * result
}

/**
 * Sorts an array of elements based on the provided sort configuration.
 *
 * @template T The type of elements in the array.
 * @param {Array<T>} array The array to be sorted.
 * @param {Array<SortedConfig<T>>} sortConfig The sort configuration specifying the sorting criteria.
 * @returns {Array<T>} The sorted array.
 */
function sortBy<T>(array: Array<T>, sortConfig: Array<SortedConfig<T>>): Array<T> {
    const clonedArray = [...array]
    return clonedArray.sort((a, b) => recursiveSort(a, b, [...sortConfig]))
}

export const sortUtils = { sortBy }
