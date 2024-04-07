import { ReactNode } from 'react'

import { ButtonProps } from '@mantine/core'

export type LoadingButtonProps = ButtonProps & {
    isLoading: boolean
    children: ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
