import { useTranslation } from 'react-i18next'

import { ApplicationPageTemplate } from '@/components/template'

function HomePage() {
    const { t } = useTranslation('home')

    return (
        <ApplicationPageTemplate title={t('title')}>
            <p>Its an Home page</p>
        </ApplicationPageTemplate>
    )
}

export default HomePage
