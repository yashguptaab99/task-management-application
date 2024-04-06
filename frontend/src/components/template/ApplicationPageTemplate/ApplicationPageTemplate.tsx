import { metaTags } from '@/common/configs'
import { PageMetaTags } from '@/components/core'

import { ApplicationPageTemplateProps } from './ApplicationPageTemplate.types'

function ApplicationPageTemplate({ title, children }: ApplicationPageTemplateProps) {
    return (
        <PageMetaTags meta={{ title }} defaultTags={metaTags}>
            {children}
        </PageMetaTags>
    )
}

export default ApplicationPageTemplate
