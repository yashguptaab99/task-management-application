/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, forwardRef, useImperativeHandle, useRef } from 'react'
import { FieldValues, FormProvider } from 'react-hook-form'

import { LoadingOverlay } from '@mantine/core'

import { FormBuilderProps, FormBuilderRef } from '@/components/forms/FormBuilder/FormBuilder.types'
import FormBuilderRenderer from '@/components/forms/FormBuilder/FormBuilderRenderer'

function FormBuilder<F extends FieldValues>(
    {
        fields,
        size,
        gutter,
        methods,
        isLoading,
        children,
        defaultColSpan,
        onSubmit,
        marks,
        isDisabled,
    }: FormBuilderProps<F>,
    ref: Ref<FormBuilderRef>
) {
    const formRef = useRef<HTMLFormElement>(null)

    useImperativeHandle(
        ref,
        (): FormBuilderRef => ({
            submit: () => {
                if (!formRef.current) return
                formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
            },
        })
    )

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef} aria-disabled={isDisabled}>
                <LoadingOverlay visible={isLoading} />
                <FormBuilderRenderer {...{ gutter, fields, defaultColSpan, methods, marks, size, isDisabled }} />

                {children}
            </form>
        </FormProvider>
    )
}

export default forwardRef(FormBuilder)
