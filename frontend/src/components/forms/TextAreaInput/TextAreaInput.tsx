import { memo, useEffect, useRef } from 'react'
import { useController } from 'react-hook-form'

import { Textarea } from '@mantine/core'

import { INPUT_WRAPPER_ORDER } from '@/common'
import { withFormFieldValidationIcon } from '@/hocs/WithFormFieldValidationIcon'

import { HFTextAreaInputProps } from './TextAreaInput.types'

function HFTextAreaInput({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    onChange,
    inputWrapperOrder = INPUT_WRAPPER_ORDER,
    ...props
}: HFTextAreaInputProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

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

    const moveCursorToEnd = () => {
        const currentTextArea = textAreaRef.current
        if (currentTextArea) {
            textAreaRef.current.focus()
            if (currentTextArea.value.length > 0) {
                const textLength = textAreaRef.current.value.length
                textAreaRef.current.setSelectionRange(textLength, textLength)
            }
        }
    }

    useEffect(() => {
        moveCursorToEnd()
    }, [])

    return (
        <Textarea
            value={value}
            onChange={(e) => {
                fieldOnChange(e)
                onChange?.(e)
            }}
            error={fieldState.error?.message}
            inputWrapperOrder={inputWrapperOrder}
            {...field}
            {...props}
            rightSectionProps={{
                style: {
                    alignItems: 'flex-start',
                    paddingTop: 10,
                },
            }}
            onBlur={(event) => {
                let { value } = event.target
                value = value.trimStart().trimEnd()
                if (fieldState.isDirty) {
                    fieldOnChange(value)
                    field.onBlur()
                }
                props?.onBlur && props.onBlur(event)
            }}
        />
    )
}

const HFTextAreaWithCheckmark = withFormFieldValidationIcon(HFTextAreaInput)

export const TextAreaInput = memo(HFTextAreaWithCheckmark)
