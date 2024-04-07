import { PrimitiveAtom } from 'jotai'

import { MantineSize } from '@mantine/core'

export type DrawerProps = {
    position?: 'top' | 'right' | 'bottom' | 'left'
    fullSize?: boolean
    onClose?: () => void
    atom: PrimitiveAtom<boolean>
    size?: MantineSize | NonNullable<string> | number
    withCloseButton?: boolean
    className?: string
} & React.PropsWithChildren
