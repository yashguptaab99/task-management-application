import { useRef } from 'react'
import { useFieldArray as $useFieldArray, ArrayPath, FieldValues, UseFormProps, useForm } from 'react-hook-form'

import { Divider, DividerProps } from '@mantine/core'

import {
    FormBuilderRef,
    ICustomField,
    IFieldArray,
    IFormField,
    IFormFieldBase,
    IFormFieldDateInput,
    IFormFieldTextAreaInput,
    IFormFieldTextInput,
    IFormInputFieldBase,
} from './FormBuilder.types'

/**
 * Wraps a Input Type into a FieldConfig
 */
type TFieldConfig<TFieldValues extends FieldValues, P> = IFormFieldBase &
    Omit<IFormInputFieldBase<TFieldValues>, 'type'> &
    Omit<P, 'type'>

/**
 * Special type for FieldArrays, since the "name" is passed in the
 * function, not inside the config block
 */
type FieldArrayConfig<TInnerFieldValues extends FieldValues> = Omit<
    IFormFieldBase & IFieldArray<TInnerFieldValues>,
    'name'
>

/**
 * Type of getCreateFields return
 *
 * All types are pretty straightforward, accepting the config
 * of their equivalent input
 *
 * fieldArray in particular is complex because it needs to accept
 * a configuration, and it's child nodes (the fields of the field array)
 * must be typed accordingly
 *
 * Eg: I want to add a fieldArray on the field "pets", an array of pets.
 * My sampleObject will need to have the interface of Pets, a inner field of my Form
 * and my fields will need to have one field for each property of a pet.
 */
export type TCreateField<TFieldValues extends FieldValues> = {
    text: (config: TFieldConfig<TFieldValues, IFormFieldTextInput>) => IFormField<TFieldValues>
    textArea: (config: TFieldConfig<TFieldValues, IFormFieldTextAreaInput>) => IFormField<TFieldValues>
    date: (config: TFieldConfig<TFieldValues, IFormFieldDateInput>) => IFormField<TFieldValues>
    custom: (config: IFormFieldBase & ICustomField) => IFormField<TFieldValues>
    fieldArray: <K extends keyof TFieldValues>(
        name: K,
        cb: (createField: TCreateField<TFieldValues[K][0]>) => FieldArrayConfig<TFieldValues[K][0]>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => any
    lineBreak: (name: string) => IFormField<TFieldValues>
    divider: (name: string, props?: DividerProps) => IFormField<TFieldValues>
}

/**
 * Dictionary containing all functions used
 * to create field items for the FormBuilder
 */
function getCreateFields<TFieldValues extends FieldValues>() {
    type TField = TCreateField<TFieldValues>

    const text: TField['text'] = (config) => ({ type: 'text', ...config })

    const textArea: TField['textArea'] = (config) => ({
        type: 'textarea',
        ...config,
    })

    const date: TField['date'] = (config) => ({ type: 'dateinput', ...config })

    const custom: TField['custom'] = (config) => ({ ...config })

    const lineBreak: TField['lineBreak'] = (name: string) => ({ customContent: null, colSpan: 12, name })

    const divider: TField['divider'] = (name: string, props) => ({
        customContent: <Divider {...props} />,
        colSpan: 12,
        name,
    })

    const fieldArray: TField['fieldArray'] = (name, cb) => {
        const createField = getCreateFields()
        const config = cb(createField)
        return {
            ...config,
            name,
        }
    }

    const createField: TCreateField<TFieldValues> = {
        text,
        textArea,
        date,
        custom,
        fieldArray,
        lineBreak,
        divider,
    }

    return createField
}

/**
 * Wrapper of UseForm
 *
 * It provides he necessary building-blocks for
 * you to create a form using FormBuilder
 */
export const useFormBuilder = <TFieldValues extends FieldValues, TContext = unknown>(
    props: UseFormProps<TFieldValues, TContext>
) => {
    const formRef = useRef<FormBuilderRef>(null)
    const methods = useForm<TFieldValues, TContext>(props)
    const createField = getCreateFields<TFieldValues>()
    const useFieldArray = (name: ArrayPath<TFieldValues>) => $useFieldArray({ control: methods.control, name })

    return {
        createField,
        formRef,
        methods,
        useFieldArray,
    }
}
