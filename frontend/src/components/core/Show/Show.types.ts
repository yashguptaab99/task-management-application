import { PropsWithChildren } from 'react'

export type ShowProps = PropsWithChildren

export type WhenProps = {
    isTrue: boolean
} & PropsWithChildren

export type FallbackProps = PropsWithChildren
