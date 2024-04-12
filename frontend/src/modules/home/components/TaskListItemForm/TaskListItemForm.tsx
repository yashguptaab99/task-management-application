/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Title, ActionIcon, Flex, Button } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

import { Notification } from '@/common/actions'
import { LoadingButton } from '@/components/core'
import { FormBuilder } from '@/components/forms/FormBuilder'
import { useCreateTask, useDeleteTask, useUpdateTask } from '@/data/mutations'
import { appStore } from '@/data/store/app.atom'
import { useAtomWithDisclosure } from '@/hooks'
import { ICreateTask } from '@/interfaces/task.types'
import { useTaskListForm } from '@/modules/home/hooks'

const TASK_SUCCESS = {
    CREATE: { id: 'TASK_CREATE', title: 'Successfully Created', message: 'Task Creation is Successful' },
    UPDATE: { id: 'TASK_UPDATE', title: 'Successfully Updated', message: 'Task Update is Successful' },
    DELETE: { id: 'TASK_DELETE', title: 'Successfully Deleted', message: 'Task Deletion is Successful' },
}

function notifySuccess(type: keyof typeof TASK_SUCCESS) {
    const { id, title, message } = TASK_SUCCESS[type]
    Notification.show({
        id,
        type: 'success',
        title,
        message,
    })
}

export default function TaskListItemForm() {
    const { t } = useTranslation('home')
    const [task, setActiveTask] = useAtom(appStore.activeTask)
    const [, { toggle }] = useAtomWithDisclosure(appStore.isTaskDrawerOpened)

    const { mutate: createTask } = useCreateTask()
    const { mutate: updateTask } = useUpdateTask()
    const { mutate: deleteTask } = useDeleteTask()

    const isEditing = Boolean(task)

    const onSubmitForm = (data: ICreateTask) => {
        if (isEditing) updateTask({ taskId: task?._id, data }, { onSuccess: () => notifySuccess('UPDATE') })
        else createTask(data, { onSuccess: () => notifySuccess('CREATE') })

        toggle()
        setActiveTask(undefined)
    }

    const handleDelete = () => {
        deleteTask(
            { taskId: task?._id },
            {
                onSuccess: () => notifySuccess('DELETE'),
            }
        )
        toggle()
        setActiveTask(undefined)
    }

    const { methods, formRef, fields, onSubmitFormClick, onSubmit } = useTaskListForm({
        onSubmitForm,
        task,
    })

    return (
        <>
            <Title order={4} pb={30}>
                {t(isEditing ? 'editTitle' : 'addTitle')}
            </Title>
            <FormBuilder size="md" methods={methods} fields={fields} onSubmit={onSubmit as any} ref={formRef} />
            <Flex mt="xl2" pb="lg" gap="md" justify="space-around" align="stretch" direction="row" wrap="nowrap">
                <ActionIcon size={37} variant="default" onClick={handleDelete}>
                    <IconTrash size={16} color="#20242D" />
                </ActionIcon>
                <Button variant="default" fullWidth onClick={toggle}>
                    {t('buttons.cancelBtn')}
                </Button>
                <LoadingButton
                    isLoading={methods.formState.isSubmitSuccessful}
                    onClick={onSubmitFormClick}
                    variant="filled"
                    fullWidth>
                    {t('buttons.saveBtn')}
                </LoadingButton>
            </Flex>
        </>
    )
}
