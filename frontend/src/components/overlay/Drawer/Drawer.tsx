import { Drawer as MantineDrawer } from '@mantine/core'

import { useAtomWithDisclosure } from '@/hooks'

import { DrawerProps } from './Drawer.types'

export function Drawer({
    position = 'right',
    size = 392,
    onClose,
    children,
    atom,
    className,
    withCloseButton = true,
}: DrawerProps) {
    const [isOpen, { close }] = useAtomWithDisclosure(atom)

    return (
        <MantineDrawer
            overlayProps={{
                opacity: 0.55,
                blur: 3,
            }}
            position={position}
            opened={isOpen}
            size={size}
            padding="xl"
            withCloseButton={withCloseButton}
            className={className}
            onClose={() => {
                if (onClose) {
                    setTimeout(() => {
                        onClose()
                    }, 300)
                }
                close()
            }}>
            {children}
        </MantineDrawer>
    )
}
