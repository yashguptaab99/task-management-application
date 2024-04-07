import { Button, Group, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

import { Show } from '@/components/core'
import { TInternalFieldArrayTitle } from '@/components/forms/FormBuilder/FormBuilderFieldArrayTitle.types'

export function InternalFieldArrayTitle({
    classNames,
    styles,
    title,
    showTitle,
    titleProps,
    isDisabled,
    onRemoveClick = () => {},
    showRemoveButton,
    removeButtonProps,
    removeButtonText,
}: TInternalFieldArrayTitle) {
    const finalTitleProps = Object.assign({}, { size: 'xl', fw: 'bold' }, titleProps)

    return (
        <Show.When isTrue={!!showRemoveButton || !!showTitle}>
            <Group justify="flex-end" align="center" mb="xl2" className={classNames?.header} style={styles?.header}>
                <Show.When isTrue={!!showTitle}>
                    <Text
                        {...finalTitleProps}
                        className={classNames?.title}
                        style={Object.assign({}, { flexGrow: 1 }, styles?.title)}>
                        {title}
                    </Text>
                </Show.When>

                <Show.When isTrue={!!showRemoveButton}>
                    <Button
                        disabled={isDisabled}
                        leftSection={<IconTrash />}
                        color="error"
                        size="sm"
                        variant="secondary"
                        style={styles?.removeButton}
                        className={classNames?.removeButton}
                        onClick={onRemoveClick}
                        {...removeButtonProps}>
                        {}
                        {removeButtonText}
                    </Button>
                </Show.When>
            </Group>
        </Show.When>
    )
}
