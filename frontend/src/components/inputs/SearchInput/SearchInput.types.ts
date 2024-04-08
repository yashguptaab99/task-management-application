import { TextInputProps as InputTextProps } from '@mantine/core'

export type SearchInputProps = {
    id: string
    placeholder: string
    debounceValue: number
    onDebounceChange: (value: string) => void
} & InputTextProps
