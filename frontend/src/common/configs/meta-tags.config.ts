import { env } from '@/common/configs/env.config'
import { DefaultMetaTags } from '@/components/core'

export const metaTags: DefaultMetaTags = {
    title: env.APP_TITLE,
    description: 'The Task Manager Platform',
}
