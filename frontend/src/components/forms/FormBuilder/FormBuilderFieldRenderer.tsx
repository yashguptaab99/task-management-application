import { FieldValues } from 'react-hook-form'

import { availableComponentsDictionary } from '@/components/forms/FormBuilder'
import { LabelInput } from '@/components/inputs'

import { ICustomField, IFieldArray, IFormField } from './FormBuilder.types'
import FormBuilderFieldArray from './FormBuilderFieldArray'
import { FormBuilderFieldRendererProps } from './FormBuilderFieldRenderer.types'

function FormBuilderFieldRenderer<T extends FieldValues>({
    formItem,
    namePrefix,
    gutter,
    defaultColSpan,
    methods,
    marks,
    size,
    isDisabled,
}: FormBuilderFieldRendererProps<T>) {
    const isCustomField = (formItem: IFormField<T>): formItem is ICustomField => 'customContent' in formItem
    const isFieldArray = (formItem: IFormField<T>): formItem is IFieldArray<T> => 'fields' in formItem

    /**
     * Renders CUSTOM FIELDS
     */
    if (isCustomField(formItem)) {
        return formItem.customContent
    }

    const name = [namePrefix, formItem.name].join('')

    /**
     * Renders FIELD ARRAYS
     */
    if (isFieldArray(formItem)) {
        return (
            <FormBuilderFieldArray
                {...formItem}
                name={name}
                gutter={gutter}
                defaultColSpan={defaultColSpan}
                methods={methods}
                marks={marks}
                size={size}
                isDisabled={isDisabled}
            />
        )
    }

    const disabled = formItem.disabled || isDisabled

    const { label, hint, hintProps, ...field } = formItem

    const labelWithPrefix =
        typeof label === 'string' ? <LabelInput disabled={disabled} label={label} required={field.required} /> : label

    const Component = availableComponentsDictionary.get(field.type)

    if (!Component) return <></>

    /**
     * Renders FORM INPUTS
     */
    return (
        <Component
            {...field}
            className={`formBuilderField--${String(field.name)}`}
            name={name}
            label={labelWithPrefix}
            control={methods.control}
            disabled={disabled}
            marks={
                hint
                    ? {
                          ...marks,
                          helper: hint,
                          helperProps: hintProps,
                      }
                    : marks
            }
            size={size}
        />
    )
}

export default FormBuilderFieldRenderer
