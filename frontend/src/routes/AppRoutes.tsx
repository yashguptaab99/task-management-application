import { Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from '@/components/layout'
import { HomePage } from '@/modules/home'
import { appRoot } from '@/routes/paths'

function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppShell />}>
                <Route path={appRoot} element={<HomePage />} />
                <Route path="*" element={<Navigate to={appRoot} />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
