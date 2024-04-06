import { lazy } from 'react'

import Logo from '@/assets/img/logo.webp'
import { GlobalLoaderProps, SuspenseLoader } from '@/components/feedback'

const AppRoutes = lazy(() => import('./AppRoutes'))

const loadingProps: GlobalLoaderProps = {
    logo: Logo,
    w: 127,
    alt: 'Task Manager Logo',
}

function Router() {
    return <AppRoutes />
}

function Routes() {
    return (
        <SuspenseLoader {...loadingProps}>
            <Router />
        </SuspenseLoader>
    )
}

export default Routes
