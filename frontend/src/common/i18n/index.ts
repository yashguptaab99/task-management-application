import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DateHero } from '@/adapters'

import enUSResource from './en-US'

i18n.use(initReactI18next).init({
    fallbackLng: 'enUS',
    lng: 'en-us',
    resources: {
        enUS: { ...enUSResource },
    },
    defaultNS: 'common',
    interpolation: {
        escapeValue: false,
        format(value, format) {
            if (value instanceof Date) return value ? new DateHero(value).formatAny(format) : 'Invalid Date'
            return value
        },
    },
})

i18n.on('languageChanged', (lng) => {
    DateHero.changeLocale(lng)
})

export default i18n
