import { useController, type UseControllerProps } from 'react-hook-form'

import { DateInput as $DateInput, type DateInputProps as $DateInputProps } from '@mantine/dates'

export type DateInputProps = UseControllerProps & Omit<$DateInputProps, 'value' | 'defaultValue'>

export function DateInput({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    onChange,
    ...props
}: DateInputProps) {
    const {
        field: { value, onChange: fieldOnChange, ...field },
        fieldState,
    } = useController({
        name,
        control,
        defaultValue,
        rules,
        shouldUnregister,
    })

    return (
        <$DateInput
            error={fieldState.error?.message}
            value={value}
            onChange={(e) => {
                fieldOnChange(e)
                onChange?.(e)
            }}
            {...field}
            {...props}
        />
    )
}
