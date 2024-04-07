/* eslint-disable @typescript-eslint/no-explicit-any */

import { DateInput } from '@/components/forms/DateInput'
import { FieldTypes } from '@/components/forms/FormBuilder/FormBuilder.types'
import { TextAreaInput } from '@/components/forms/TextAreaInput'
import { TextInput } from '@/components/forms/TextInput'

/**
 * Dictionary mapping field types to their corresponding component. Used in the FormBuilder component.
 * @type {Map<FieldTypes, any>}
 */
export const availableComponentsDictionary = new Map<FieldTypes, any>([
    ['text', TextInput],
    ['dateinput', DateInput],
    ['textarea', TextAreaInput],
])
