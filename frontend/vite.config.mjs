import reactSWC from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest.json'

export default defineConfig({
    plugins: [
        reactSWC(),
        tsconfigPaths(),
        VitePWA({
            manifest,
            devOptions: {
                enabled: false, // switch to "true" to enable sw on development
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
            },
        }),
    ],
    assetsInclude: ['**/*.md'],
})
