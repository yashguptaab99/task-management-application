import { FieldValues } from 'react-hook-form'

import { Grid } from '@mantine/core'

import FormBuilderFieldRenderer from './FormBuilderFieldRenderer'
import { FormBuilderRendererProps } from './FormBuilderRenderer.types'

function FormBuilderRenderer<T extends FieldValues>({
    gutter,
    fields,
    defaultColSpan,
    methods,
    marks,
    size,
    namePrefix,
    isDisabled,
}: FormBuilderRendererProps<T>) {
    return (
        <Grid gutter={gutter}>
            {fields.map(({ onMouseEnter, onMouseMove, onMouseLeave, ...formItem }, index) => {
                const divEvents = {
                    onMouseEnter,
                    onMouseMove,
                    onMouseLeave,
                }

                return (
                    <Grid.Col
                        key={`${String(index)}-${String(formItem.name)}`}
                        offset={formItem.offset}
                        span={formItem.colSpan || defaultColSpan}
                        {...divEvents}>
                        <FormBuilderFieldRenderer
                            {...{
                                formItem,
                                gutter,
                                fields,
                                defaultColSpan,
                                marks,
                                size,
                                namePrefix,
                                methods,
                                isDisabled,
                            }}
                        />
                    </Grid.Col>
                )
            })}
        </Grid>
    )
}

export default FormBuilderRenderer
