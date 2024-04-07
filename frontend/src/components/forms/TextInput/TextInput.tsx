import { memo } from 'react'
import { useController } from 'react-hook-form'

import { TextInput as $TextInput } from '@mantine/core'

import { INPUT_WRAPPER_ORDER } from '@/common'
import { withFormFieldValidationIcon } from '@/hocs/WithFormFieldValidationIcon'

import { HFTextInputProps } from './TextInput.types'

function HFTextInput({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    onChange,
    inputWrapperOrder = INPUT_WRAPPER_ORDER,
    ...props
}: HFTextInputProps) {
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
        <$TextInput
            value={value || ''}
            onChange={(e) => {
                fieldOnChange(e)
                onChange?.(e)
            }}
            inputWrapperOrder={inputWrapperOrder}
            error={fieldState.error?.message}
            withAsterisk={false}
            {...field}
            {...props}
        />
    )
}

export const TextInput = memo(withFormFieldValidationIcon(HFTextInput))
