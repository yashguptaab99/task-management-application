export interface AppConstants {
    debounceValue: number
    pageLimitMaxValue: number
    pageLimit: number
}

const paginationConfig = {
    /**
     * The maximum value for pagination limit.
     */
    pageLimitMaxValue: 9999, // Pagination limit to 9999

    /**
     * The default page limit.
     */
    pageLimit: 25,
}

const debounceConfig = {
    /**
     * The debounce value in milliseconds.
     */
    debounceValue: 300, // 300ms
}

export const INPUT_WRAPPER_ORDER: ('input' | 'label' | 'description' | 'error')[] = [
    'label',
    'input',
    'description',
    'error',
]

export const appConfigs: AppConstants = { ...paginationConfig, ...debounceConfig }
