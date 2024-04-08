function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const formatUtils = { slugify }
