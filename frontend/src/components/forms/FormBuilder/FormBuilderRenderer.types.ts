import { FieldValues } from 'react-hook-form'

import { WithFormFieldValidationMark } from '@/hocs'

import { FormBuilderProps } from './FormBuilder.types'

/**
 * Form Builder Renderer internal component props
 */
export interface FormBuilderRendererProps<T extends Omit<FieldValues, 'rules'>>
    extends Pick<
            FormBuilderProps<T>,
            'gutter' | 'fields' | 'defaultColSpan' | 'methods' | 'marks' | 'size' | 'isDisabled'
        >,
        Pick<WithFormFieldValidationMark, 'marks'> {
    namePrefix?: string
}
