/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseControllerProps } from 'react-hook-form'

export type FormInputType = {
    label?: string
    placeholder?: string
    helperText?: string
    showCheckMark?: boolean
    required?: boolean
    hideOptionalLabel?: boolean
} & UseControllerProps

/**
 * Represents the props for a component that supports marks.
 */
export type WithMarksProps = {
    withCheck?: boolean
    withError?: boolean
    helper?: string
    helperProps?: { color?: string }
}
