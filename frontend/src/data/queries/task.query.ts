import { useQuery } from 'react-query'

import { queryClientConfig, utils } from '@/common'
import { tasksKeys } from '@/data/key-factories'
import { ITask } from '@/interfaces/task.types'

export function useTaskQuery() {
    const { queryClient, apiClient } = queryClientConfig
    const query = useQuery(tasksKeys.all, async (): Promise<ITask[]> => {
        try {
            const response = await apiClient.get('/tasks', {
                params: utils.query.convertQueryParams({
                    limit: 999,
                    page: 1,
                    sort: { createdAt: 'asc' },
                }),
            })
            return response.data.data ?? []
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to fetch tasks', error)
            return []
        }
    })

    const refetch = () => {
        queryClient.refetchQueries<ITask[]>(tasksKeys.all)
    }

    return {
        ...query,
        tasks: query.data || [],
        refetch,
    }
}
