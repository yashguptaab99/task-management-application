import { PrimitiveAtom, useAtom } from 'jotai'
import { useCallback } from 'react'

type DisclosureActions = {
    toggle: () => void
    close: () => void
    open: () => void
}

/**
 * Custom hook that wraps the useAtom hook to provide additional disclosure actions.
 * @param atom - The atom to be used.
 * @returns An array containing the current state of the atom and an object with disclosure actions.
 */
export function useAtomWithDisclosure(atom: PrimitiveAtom<boolean>): [boolean, DisclosureActions] {
    const [isOpen, setIsOpen] = useAtom(atom)

    const toggle = useCallback(() => {
        setIsOpen((isOpen: boolean) => !isOpen)
    }, [setIsOpen])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [setIsOpen])

    const open = useCallback(() => {
        setIsOpen(true)
    }, [setIsOpen])

    return [isOpen, { toggle, close, open }]
}
