/* eslint-disable @typescript-eslint/no-unused-vars */
const ignoredFileCategories = ['config', 'd']

export default {
    '*.{js,ts,tsx}': (files) => {
        // from `files` filter those _NOT_ matching `*test.js`
        const match = files.filter((file) => {
            const [extension, maybeFileCategory, ...rest] = file.split('.').reverse()
            const isValidCategory = !ignoredFileCategories.includes(maybeFileCategory)
            return isValidCategory && !file.includes('.storybook')
        })
        return `eslint --fix --max-warnings=0 ${match.join(' ')}`
    },
    '*.{js,jsx,ts,tsx,json,md,html,css}': ['prettier --write'],
}
