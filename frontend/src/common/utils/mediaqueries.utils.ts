const breakpoints = {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
    xxl: '120em',
}

const xs = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.xs})`
const sm = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.sm})`
const md = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.md})`
const lg = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.lg})`
const xl = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.xl})`
const xxl = (mode: 'max' | 'min') => `(${mode}-width: ${breakpoints?.xxl})`

const isMobile = sm('max')
const isTablet = xl('max')

export const mediaQueriesUtils = {
    isMobile,
    isTablet,
    max: {
        xs: xs('max'),
        sm: sm('max'),
        md: md('max'),
        lg: lg('max'),
        xl: xl('max'),
        xxl: xxl('max'),
    },
    min: {
        xs: xs('min'),
        sm: sm('min'),
        md: md('min'),
        lg: lg('min'),
        xl: xl('min'),
        xxl: xxl('min'),
    },
}
