import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { AppShell as MantineShell, Container } from '@mantine/core'

import { Header } from '@/components/layout/Header'

const HEADER_HEIGHT = 80
const CONTAINER_WIDTH = 1160

function AppShell() {
    return (
        <MantineShell header={{ height: HEADER_HEIGHT, offset: false }}>
            <MantineShell.Header>{<Header />}</MantineShell.Header>
            <MantineShell.Main>
                <Container
                    maw={{ base: CONTAINER_WIDTH, xl: 'auto' }}
                    w={{ base: 'auto', xl: CONTAINER_WIDTH }}
                    pt={{ base: HEADER_HEIGHT + 10 }}
                    px={{ base: 'xl', md: 'xl7' }}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </Container>
            </MantineShell.Main>
        </MantineShell>
    )
}

export default AppShell
