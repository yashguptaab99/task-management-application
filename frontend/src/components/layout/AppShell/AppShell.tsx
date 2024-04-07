import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { AppShell as MantineShell, Container } from '@mantine/core'

import { Header } from '@/components/layout/Header'

function AppShell() {
    return (
        <MantineShell>
            <MantineShell.Header>{<Header />}</MantineShell.Header>
            <MantineShell.Main>
                <Container className="shell-container">
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Container>
            </MantineShell.Main>
        </MantineShell>
    )
}

export default AppShell
