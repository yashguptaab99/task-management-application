import { ReactNode } from 'react'

export type PageMetaTagsProps = {
    meta: MetaProps
    defaultTags: DefaultMetaTags
    children: React.ReactNode
}

export type MetaProps = {
    description?: string
    tags?: Array<{ name: string; content: string }>
    title?: string
    image?: string
    children?: ReactNode
}

export type DefaultMetaTags = {
    title: string
    description: string
}
