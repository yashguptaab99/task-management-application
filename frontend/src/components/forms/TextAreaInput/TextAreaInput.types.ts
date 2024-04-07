import { UseControllerProps } from 'react-hook-form'

import { TextareaProps } from '@mantine/core'

export type HFTextAreaInputProps = UseControllerProps & Omit<TextareaProps, 'value' | 'defaultValue'>
