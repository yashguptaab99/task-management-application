import { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'

import { MantineProvider } from '@mantine/core'

import { queryClientConfig } from '@/common'
import { NotificationProvider } from '@/components/providers'

import { theme } from './theme/theme'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

function render(App: ComponentType) {
    root.render(
        <QueryClientProvider client={queryClientConfig.queryClient}>
            <HelmetProvider>
                <MantineProvider theme={theme}>
                    <NotificationProvider />
                    <App />
                </MantineProvider>
            </HelmetProvider>
        </QueryClientProvider>
    )
}

export default render
