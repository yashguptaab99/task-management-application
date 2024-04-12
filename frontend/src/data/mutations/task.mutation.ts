import { useMutation } from 'react-query'

import { queryClientConfig, utils } from '@/common'
import { Notification } from '@/common/actions'
import { tasksKeys } from '@/data/key-factories'
import { ICreateTask, ITask, IUpdateTask } from '@/interfaces/task.types'

function handleMutationError(error: string) {
    Notification.show({
        id: 'TASK',
        type: 'error',
        title: 'Failed',
        message: `Task operation failed: ${error}`,
    })
}
const { queryClient, apiClient } = queryClientConfig

export function useCreateTask() {
    return useMutation(
        async (data: ICreateTask) => {
            const response = await apiClient.post('/tasks', data)
            return response.data
        },
        {
            onSuccess: (createdTask: ITask) => {
                queryClient.setQueryData<ITask[]>(tasksKeys.all, (tasks: ITask[] | undefined) => {
                    return utils.sort.sortBy([...(tasks || []), createdTask], [{ key: 'createdAt' }])
                })
            },
            onError: () => handleMutationError('Create'),
        }
    )
}

export function useUpdateTask() {
    return useMutation(
        async ({ taskId, data }: { taskId: string; data: IUpdateTask }) => {
            await apiClient.patch(`/tasks/${taskId}`, data)
            return { _id: taskId, ...data }
        },
        {
            onSuccess: (updatedTask) => {
                queryClient.setQueryData<ITask[]>(tasksKeys.all, (previous: ITask[] | undefined) => {
                    return (
                        previous?.map((task) => {
                            if (task._id === updatedTask._id) {
                                return { ...task, ...updatedTask }
                            }
                            return task
                        }) || []
                    )
                })
            },
            onError: () => handleMutationError('Update'),
        }
    )
}

export function useDeleteTask() {
    return useMutation(
        async ({ taskId }: { taskId: string }) => {
            await apiClient.delete(`/tasks/${taskId}`)
            return { _id: taskId, status: true }
        },
        {
            onSuccess: (data, { taskId }) => {
                queryClient.setQueryData<ITask[]>(tasksKeys.all, (previous: ITask[] | undefined) => {
                    return previous?.filter((task) => task._id !== taskId) || []
                })
            },
            onError: () => handleMutationError('Delete'),
        }
    )
}
