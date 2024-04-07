import { useTranslation } from 'react-i18next'

import { ApplicationPageTemplate } from '@/components/template'
import { TaskHeader } from '@/modules/home/components/TaskHeader'

function HomePage() {
    const { t } = useTranslation('home')

    return (
        <ApplicationPageTemplate title={t('pageTitle')}>
            <TaskHeader />
        </ApplicationPageTemplate>
    )
}

export default HomePage
