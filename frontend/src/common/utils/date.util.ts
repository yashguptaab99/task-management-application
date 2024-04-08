import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const monthsAgo = (dateString: string): number | undefined => {
    if (!dateString) return undefined

    const [inputMonth, inputYear] = dateString.split('-')

    if (isNaN(Number(inputYear))) return undefined

    const current = dayjs()
    const input = dayjs(`${inputYear}-${inputMonth}`).endOf('month')

    if (!input.isValid()) return undefined

    // Calculate the difference in months, ignoring the day part
    const monthsDifference = current.diff(input, 'month')
    return monthsDifference
}

export const dateUtils = { monthsAgo }
