import { FieldValues } from 'react-hook-form'

import { FormBuilderProps, IFieldArray } from './FormBuilder.types'

export type IFieldArrayProps<T extends FieldValues> = IFieldArray<T> &
    Pick<FormBuilderProps<T>, 'gutter' | 'defaultColSpan' | 'marks' | 'size' | 'methods' | 'isDisabled'>
