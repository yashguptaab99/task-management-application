/**
 * ----- Lazy Import Initialization -----
 *
 * RootProviders.tsx
 * description: contains the main dependencies and providers of the base app
 *
 * App.tsx
 * description: contains the main structure of the base app
 *
 * ----- Reason Why: Improving Performance -----
 * These are the two main chunks that are used to render the core structure of
 * the app. Importing them with Promise.all we can load them in parallel and
 * achieve the best possible performance.
 */

import i18n from '@/common/i18n'

Promise.all([import('@/RootProvider'), import('@/App')]).then(([{ default: render }, { default: App }]) => {
    i18n.init()
    render(App)
})

export {}
