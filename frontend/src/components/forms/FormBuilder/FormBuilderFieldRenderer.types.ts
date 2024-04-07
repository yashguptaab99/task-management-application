import { FieldValues } from 'react-hook-form'

import { FormBuilderProps, IFormField } from './FormBuilder.types'

export interface FormBuilderFieldRendererProps<T extends FieldValues>
    extends Pick<
        FormBuilderProps<T>,
        'gutter' | 'fields' | 'defaultColSpan' | 'methods' | 'marks' | 'size' | 'isDisabled'
    > {
    formItem: IFormField<T>
    namePrefix?: string
}
