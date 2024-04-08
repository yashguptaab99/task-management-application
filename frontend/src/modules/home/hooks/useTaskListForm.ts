import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useFieldTranslations } from '@/common/i18n/messages'
import { useFormBuilder } from '@/components/forms/FormBuilder'
import { ICreateTask, ITask } from '@/interfaces/task.types'
import { TaskListFormFields } from '@/modules/home/components/TaskListItemForm'

export type ITaskListForm = {
    onSubmitForm: (data: ICreateTask) => void
    task?: ITask
}

export const useTaskListForm = ({ onSubmitForm, task }: ITaskListForm) => {
    const { guidelines, formField } = useFieldTranslations()

    const schema = z.object({
        name: guidelines.textField('name'),
        description: guidelines.textArea('description', { optional: true, max: 220 }),
        dueDate: guidelines.date('dueDate'),
    })

    const { createField, formRef, methods } = useFormBuilder<TaskListFormFields>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            name: task?.name,
            description: task?.description,
            dueDate: task?.dueDate,
        },
    })

    const onSubmit = (data: ICreateTask) => {
        onSubmitForm(data)
    }

    const onSubmitFormClick = () => {
        formRef.current?.submit()
    }

    const fields = [
        createField.text({
            name: 'name',
            ...formField('name'),
            required: true,
        }),
        createField.textArea({
            name: 'description',
            ...formField('description'),
            required: false,
            minRows: 7,
            autosize: true,
        }),
        createField.date({
            name: 'dueDate',
            ...formField('dueDate'),
            required: true,
        }),
    ]

    return {
        methods,
        formRef,
        fields,
        onSubmit,
        onSubmitFormClick,
    }
}
