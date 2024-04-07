import { useEffect } from 'react'
import { FieldValues, useFieldArray } from 'react-hook-form'

import { Button, Divider } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { Show } from '@/components/core'

import { IFieldArrayProps } from './FormBuilderFieldArray.types'
import { InternalFieldArrayTitle } from './FormBuilderFieldArrayTitle'
import FormBuilderRenderer from './FormBuilderRenderer'

function FormBuilderFieldArray<T extends FieldValues>(props: IFieldArrayProps<T>) {
    const {
        name,
        title,
        addButtonProps: { text: addButtonText, ...addButtonProps } = { text: '' },
        removeButtonProps: { text: removeButtonText, ...removeButtonProps } = { text: '' },
        titleProps,
        itemsConfig: propItemsConfig,
        fields,
        sampleObject,
        gutter,
        defaultColSpan,
        marks,
        size,
        methods,
        maxItems,
        minItems,
        isDisabled,
        fieldArray,
        styles,
        classNames,
    } = props

    const defaultItemsConfig: IFieldArrayProps<T>['itemsConfig'] = {
        dividerBetweenItems: false,
        titleInEveryItem: false,
    }

    const itemsConfig = { ...defaultItemsConfig, ...propItemsConfig }

    const autoFieldArray = useFieldArray({
        control: methods.control,
        name,
    })

    const onRemove = (index: number) => {
        methods.resetField(`${name}.${index}`)
        remove(index)
    }

    const {
        fields: arrayFields,
        append,
        remove,
        // prepend,
        // swap,
        // move,
        // insert,
    } = fieldArray || autoFieldArray

    useEffect(() => {
        if (minItems && arrayFields.length < minItems) {
            append(sampleObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrayFields.length])

    return (
        <div style={styles?.root} className={classNames?.root}>
            <InternalFieldArrayTitle
                showRemoveButton={false}
                showTitle={
                    (arrayFields.length === 0 && !!itemsConfig.titleInEveryItem && !!title) ||
                    (!itemsConfig.titleInEveryItem && !!title)
                }
                classNames={classNames}
                styles={styles}
                title={title}
                titleProps={titleProps}
                removeButtonProps={removeButtonProps}
                removeButtonText={removeButtonText}
            />

            <div>
                {arrayFields.map((f, index) => {
                    const filteredFields = typeof fields === 'function' ? fields(index) : fields

                    return (
                        <div key={f.id}>
                            <Show.When isTrue={!!itemsConfig.dividerBetweenItems && index > 0}>
                                <Divider my="xl2" />
                            </Show.When>

                            <InternalFieldArrayTitle
                                showRemoveButton={arrayFields.length > (minItems || 0)}
                                showTitle={!!title && !!itemsConfig.titleInEveryItem}
                                classNames={classNames}
                                styles={styles}
                                title={title}
                                onRemoveClick={() => onRemove(index)}
                                titleProps={titleProps}
                                removeButtonProps={removeButtonProps}
                                removeButtonText={removeButtonText}
                            />

                            <FormBuilderRenderer
                                gutter={gutter}
                                defaultColSpan={defaultColSpan}
                                namePrefix={`${name}.${index}.`}
                                methods={methods}
                                marks={marks}
                                size={size}
                                fields={filteredFields}
                                isDisabled={isDisabled}
                            />
                        </div>
                    )
                })}
            </div>

            {(!maxItems || arrayFields.length < maxItems) && (
                <Button
                    disabled={isDisabled}
                    color="gray"
                    variant="secondary"
                    size="sm"
                    leftSection={<IconPlus />}
                    mt={arrayFields.length === 0 ? 0 : 'xl2'}
                    style={styles?.addButton}
                    className={classNames?.addButton}
                    onClick={() => append(sampleObject)}
                    {...addButtonProps}>
                    {addButtonText}
                </Button>
            )}
        </div>
    )
}

export default FormBuilderFieldArray
