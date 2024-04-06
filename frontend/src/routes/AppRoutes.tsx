import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from '@/modules/home'
import { appRoot } from '@/routes/paths'

function AppRoutes() {
    return (
        <Routes>
            <Route path={appRoot} element={<HomePage />} />
            <Route path="*" element={<Navigate to={appRoot} />} />
        </Routes>
    )
}

export default AppRoutes
