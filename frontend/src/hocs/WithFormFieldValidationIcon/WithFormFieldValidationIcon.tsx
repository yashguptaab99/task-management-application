/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useState } from 'react'
import { UseControllerProps, useController } from 'react-hook-form'

import { Loader, Stack, Tooltip, useMantineTheme } from '@mantine/core'
import { IconAlertCircle, IconCheck, IconHelpCircle } from '@tabler/icons-react'

import { WithMarksProps } from '@/components/forms'

export type WithFormFieldValidationMark = {
    marks?: WithMarksProps
}

export type WithFormFieldValidationIconParams = UseControllerProps & { loading?: boolean } & {
    rightSection?: React.ReactNode
    leftSection?: React.ReactNode
    onBlur?: (event?: React.FocusEvent<HTMLInputElement, Element>) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const withFormFieldValidationIcon = <_T, P>(WrappedComponent: FC<P>) => {
    const WithFormFieldValidationIcon = (
        props: P & WithFormFieldValidationIconParams & WithFormFieldValidationMark
    ) => {
        const [canRenderCheckmark, setCanRenderCheckmark] = useState(false)
        const theme = useMantineTheme()
        const {
            marks = {
                withCheck: true,
                withError: true,
                helper: '',
                helperProps: undefined,
            },
        } = props

        const {
            field: { onBlur: fieldOnBlur },
            fieldState,
        } = useController({
            name: props.name,
            control: props.control,
            defaultValue: props.defaultValue,
            rules: props.rules,
            shouldUnregister: props.shouldUnregister,
        })

        const handleBlur = useCallback(
            (event: React.FocusEvent<any, any>) => {
                if (fieldState.isDirty) {
                    fieldOnBlur()
                    setCanRenderCheckmark(!!event?.target?.value)
                }
                props.onBlur && props.onBlur(event)
            },
            [fieldOnBlur, fieldState.isDirty, props]
        )

        const rightSectionContent = getRightSectionContent(props, marks, fieldState, canRenderCheckmark, theme)

        return (
            <WrappedComponent
                {...props}
                rightSection={rightSectionContent || props.rightSection}
                rightSectionPointerEvents="all"
                rightSectionWidth={34}
                {...getStyles(rightSectionContent, props.leftSection, theme)}
                onBlur={handleBlur}
            />
        )
    }

    return WithFormFieldValidationIcon
}

function getRightSectionContent<P>(
    props: P & WithFormFieldValidationIconParams,
    marks: WithMarksProps | undefined,
    fieldState: any,
    canRenderCheckmark: boolean,
    theme: any
) {
    const color = getIconColor(marks, fieldState, canRenderCheckmark, theme)

    if (props.loading) {
        return <Loader color="gray.3" size={18} />
    }

    if (props.disabled) {
        return null
    }

    if (!fieldState.invalid && marks?.withCheck && canRenderCheckmark) {
        return <IconCheck color={color} />
    }

    if (marks?.helper?.length) {
        return (
            <Tooltip
                label={marks.helper}
                withArrow
                arrowSize={6}
                zIndex={1000}
                maw={200}
                ta="left"
                lh="sm"
                multiline
                position="top">
                <Stack align="center" justify="center">
                    <IconHelpCircle color={color} />
                </Stack>
            </Tooltip>
        )
    }

    if (fieldState.invalid && marks?.withError) {
        return <IconAlertCircle color={color} />
    }

    return null
}

function getIconColor(marks: WithMarksProps | undefined, fieldState: any, canRenderCheckmark: boolean, theme: any) {
    if (fieldState.invalid && marks?.withError) {
        return theme.colors.error[5]
    }

    if (!fieldState.invalid && marks?.withCheck && canRenderCheckmark) {
        return theme.colors.green[6]
    }

    return marks?.helperProps?.color || theme.colors.gray[4]
}

function getStyles(rightSectionContent: React.ReactNode, leftSection: React.ReactNode, theme: any) {
    if (rightSectionContent || leftSection) {
        return {
            styles: {
                input: {
                    ...(rightSectionContent && { paddingRight: theme.spacing.xl4 }),
                    ...(leftSection && { paddingLeft: theme.spacing.xl4 }),
                },
            },
        }
    }

    return {}
}
