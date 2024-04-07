import { UseControllerProps } from 'react-hook-form'

import { TextInputProps } from '@mantine/core'

export type HFTextInputProps = UseControllerProps & Omit<TextInputProps, 'value' | 'defaultValue'>
