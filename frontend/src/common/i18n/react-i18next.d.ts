import 'react-i18next'
import enUS from 'src/common/i18n/en-US'

declare module 'react-i18next' {
    type enUSTypes = typeof enUS

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Resources extends enUSTypes {}
}
