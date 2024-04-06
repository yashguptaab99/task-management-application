import { BrowserRouter } from 'react-router-dom'

import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

import './index.css'

import { env } from '@/common/configs/env.config'
import { VersionInfoChip } from '@/components/feedback'
import Routes from '@/routes/Routes'

export default function App() {
    return (
        <>
            <VersionInfoChip version={env.DEPLOY_VERSION} />
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </>
    )
}
