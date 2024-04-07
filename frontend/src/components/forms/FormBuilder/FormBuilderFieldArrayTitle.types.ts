import { CSSProperties } from 'react'

import { ButtonProps, TextProps } from '@mantine/core'

export type TInternalFieldArrayTitle = {
    classNames?: Partial<{
        header: string
        title: string
        removeButton: string
    }>
    styles?: Partial<{
        header: CSSProperties
        title: CSSProperties
        removeButton: CSSProperties
    }>
    title?: string
    showTitle?: boolean
    isDisabled?: boolean
    onRemoveClick?: () => void
    showRemoveButton?: boolean
    titleProps?: TextProps
    removeButtonProps?: ButtonProps
    removeButtonText?: string
}
