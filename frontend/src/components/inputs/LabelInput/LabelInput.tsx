import { memo } from 'react'

import { Flex, Text } from '@mantine/core'

import { LabelInputProps } from './LabelInput.types'

function $LabelInput({ label, required = false, disabled = false }: LabelInputProps) {
    if (!label) return <></>
    const labelColor = disabled ? 'light.2' : 'light.0'
    const optionalColor = disabled ? 'light.2' : 'dark.2'

    return (
        <Flex align="center" justify="start" direction="row" gap={4}>
            <Text component="span" c={labelColor} size="sm" fw={500}>
                {label}
                {!required && (
                    <Text ml="sm" component="span" c={optionalColor} size="sm">
                        (optional)
                    </Text>
                )}
            </Text>
        </Flex>
    )
}

export const LabelInput = memo($LabelInput)
