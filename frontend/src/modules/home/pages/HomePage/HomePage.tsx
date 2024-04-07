import { useTranslation } from 'react-i18next'

import { Drawer } from '@/components/overlay'
import { ApplicationPageTemplate } from '@/components/template'
import { appStore } from '@/data/store/app.atom'
import { TaskHeader } from '@/modules/home/components/TaskHeader'

function HomePage() {
    const { t } = useTranslation('home')

    return (
        <ApplicationPageTemplate title={t('pageTitle')}>
            <TaskHeader />
            <Drawer atom={appStore.isTaskDrawerOpened} withCloseButton={false}></Drawer>
        </ApplicationPageTemplate>
    )
}

export default HomePage
