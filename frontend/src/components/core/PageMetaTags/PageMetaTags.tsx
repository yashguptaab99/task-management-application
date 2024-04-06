import { Helmet } from 'react-helmet-async'

import type { PageMetaTagsProps } from './PageMetaTags.types'

function PageMetaTags({ meta, defaultTags, children }: PageMetaTagsProps) {
    const { description = defaultTags.description, tags = [], title, image = '' } = meta
    const pageTitle = `${title ? title + ' | ' : ''}${defaultTags.title}`

    return (
        <>
            <Helmet
                title={pageTitle}
                meta={[
                    {
                        name: 'description',
                        content: description,
                    },
                    {
                        property: 'og:title',
                        content: pageTitle,
                    },
                    {
                        property: 'og:description',
                        content: description,
                    },
                    {
                        property: 'og:type',
                        content: 'website',
                    },
                    {
                        property: 'og:image',
                        content: image,
                    },
                ].concat(tags)}
            />
            {children}
        </>
    )
}

export default PageMetaTags
