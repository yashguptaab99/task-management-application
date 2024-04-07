import { CSSProperties, HTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { FieldValues, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form'

import { ButtonProps, MantineSpacing, StyleProp, TextProps } from '@mantine/core'
import { ColSpan } from '@mantine/core/lib/components/Grid/GridCol/GridCol'

import { DateInputProps } from '@/components/forms/DateInput'
import { HFTextAreaInputProps } from '@/components/forms/TextAreaInput/TextAreaInput.types'
import { HFTextInputProps } from '@/components/forms/TextInput/TextInput.types'
import { WithFormFieldValidationMark } from '@/hocs/WithFormFieldValidationIcon'

export interface FormBuilderProps<F extends FieldValues>
    extends PropsWithChildren,
        Pick<WithFormFieldValidationMark, 'marks'> {
    /**
     * Methods returned from RHF useForm hook
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    methods: UseFormReturn<any, any, any>

    /**
     * Sizings to be applied on the form inputs
     */
    size: 'md' | 'lg'

    /**
     * Fields to be displayed
     */
    fields: IFormField<F>[]

    /**
     * Quantity of columns of the form
     */
    defaultColSpan?: StyleProp<ColSpan>

    /**
     * Gutter between form columns
     */
    gutter?: StyleProp<MantineSpacing>

    /**
     * Submit callback when the form is valid
     */
    onSubmit: (fields: F) => void

    /**
     * Controls if the LoadingOverlay will be visible
     */
    isLoading?: boolean

    /**
     * Controls if all inputs are disabled
     */
    isDisabled?: boolean
}

/** Definition of a form valid field */
export type IFormField<T extends FieldValues> = IFormFieldBase & (ICustomField | IInputField<T> | IFieldArray<T>)

/**
 * Available Ref methods on the FormBuilder component
 */
export interface FormBuilderRef {
    submit: () => void
}

/**
 * List of available field types
 */
export type FieldTypes =
    | 'text'
    | 'password'
    | 'dateinput'
    | 'select'
    | 'creatableSelect'
    | 'gallery'
    | 'textarea'
    | 'avatarInput'
    | 'multiSelect'
    | 'checkbox'
    | 'creatableMultiSelect'
    | 'autocompleteAsync'

/**
 * Configuration of FieldArray field type
 */
export type IFieldArray<T extends FieldValues> = {
    /**
     * form control name
     */
    name: string

    /**
     * title that will be displayed
     */
    title?: string

    /**
     * fine tuning on items behaviors
     */
    itemsConfig?: {
        titleInEveryItem?: boolean
        dividerBetweenItems?: boolean
    }

    /**
     * inner component customizations
     */
    styles?: Partial<{
        root: CSSProperties
        header: CSSProperties
        title: CSSProperties
        addButton: CSSProperties
        removeButton: CSSProperties
    }>

    classNames?: Partial<{
        root: string
        header: string
        title: string
        addButton: string
        removeButton: string
    }>

    addButtonProps?: { text: string } & ButtonProps
    removeButtonProps?: { text: string } & ButtonProps
    titleProps?: TextProps

    /**
     * sample object used when adding new field
     */
    sampleObject: T

    /**
     * form build fields of the inner form
     */
    fields: ((index: number) => IFormField<T>[]) | IFormField<T>[]

    /**
     * max number of items. if this number is reached,
     * user cannot add more items
     */
    maxItems?: number

    /**
     * min number of items. the minimum fields are always
     * added by default and cannot be removed
     */
    minItems?: number

    /**
     * optional useFieldArray return to control
     * your field array from the parent component
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldArray?: UseFieldArrayReturn<any, any>
}

/**
 * Configuration of CustomField field type
 */
export type ICustomField = {
    /**
     * Custom JSX content
     */
    customContent: ReactNode

    /**
     * Unique name to identify this element
     */
    name: string
}

/**
 * Composition of a FieldType
 * It consists of standard properties and additional properties that are specific to certain field types.
 * Eg: DateInput includes minDate, while text does not have this property.
 */
export type IInputField<T extends FieldValues> = IFormInputFieldBase<T> & IFormFieldConditionalTypes

/**
 * Base properties that all fields can have
 */
export interface IFormFieldBase
    extends Pick<
        HTMLAttributes<HTMLDivElement>,
        'onMouseEnter' | 'onMouseMove' | 'onMouseLeave' | 'onClick' | 'onBlur'
    > {
    /**
     * How many columns this field will take in a 12 col grid
     */
    colSpan?: StyleProp<ColSpan>

    /**
     * Number of columns to skip before placing it%
     */
    offset?: StyleProp<number>
}

/**
 * Base properties that all fields can have
 */
export interface IFormInputFieldBase<T extends FieldValues> {
    /**
     * The field type
     */
    type: FieldTypes

    /**
     * The form key/control name
     */
    name: keyof T

    /**
     * Label to be displayed
     */
    label?: string | ReactNode

    /**
     * Description that goes below the field
     */
    description?: string | ReactNode

    /**
     * Placeholder when the field does not have a value
     */
    placeholder?: string

    /**
     * If the field is mandatory
     * Caution: This does not make this field Zod schema mandatory
     */
    required?: boolean

    /**
     *
     */
    loading?: boolean

    /**
     * A helper text to be displayed in the right section tooltip
     */
    hint?: string

    /**
     * Customizations to be applied to an existing hint
     */
    hintProps?: {
        color?: string
    }

    /**
     * If the field is disabled
     */
    disabled?: boolean
}

/**
 * List of all specific field types props
 */
export type IFormFieldConditionalTypes = IFormFieldTextInput | IFormFieldDateInput | IFormFieldTextAreaInput

/**
 * The section below is dedicated to all specific field type props
 */

export interface IFormFieldTextInput extends Partial<Pick<HFTextInputProps, 'maxLength'>> {
    type: 'text'
}

export interface IFormFieldTextAreaInput
    extends Partial<Pick<HFTextAreaInputProps, 'maxLength' | 'autosize' | 'minRows'>> {
    type: 'textarea'
}

export interface IFormFieldDateInput
    extends Partial<Pick<DateInputProps, 'minDate' | 'maxDate' | 'defaultDate' | 'dateParser' | 'valueFormat'>> {
    type: 'dateinput'
}
