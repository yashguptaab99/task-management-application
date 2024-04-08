import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { utils } from '@/common'
import { TaskStatusEnum } from '@/interfaces/task.types'

export function useFilterParams(): [
    { status: string; month: string },
    (searchParams: string | URLSearchParams) => void,
] {
    const [params, setSearchParams] = useSearchParams()

    const statusParam = params.get('status') || ''
    const monthParam = params.get('month')

    const monthText = useMemo(() => {
        if (!monthParam) return ''
        const monthsAgo = utils.date.monthsAgo(monthParam)
        switch (monthsAgo) {
            case 0:
                return 'This Month'
            case -1:
                return 'Next Month'
            default:
                return ''
        }
    }, [monthParam])

    const initialFilter = useMemo(() => {
        const statusMap: { [key: string]: string } = {
            [TaskStatusEnum.DONE]: 'Completed',
            [TaskStatusEnum.TODO]: 'Not Completed',
        }
        const statusText = statusMap[statusParam] ?? ''
        return { status: statusText, month: monthText }
    }, [statusParam, monthText])

    return [initialFilter, setSearchParams]
}
