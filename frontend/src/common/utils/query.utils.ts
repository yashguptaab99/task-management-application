import { IQuery, IQueryOperators } from '@/interfaces/query.types'

const convertFilterQuery = <T>(filter?: Partial<Record<keyof T, string | IQueryOperators>>): object | undefined => {
    const filterObj: Record<string, string | number> = {}
    filter
        ? Object.entries(filter).forEach(([key, value]) => {
              return typeof value === 'string'
                  ? (filterObj[key] = value)
                  : Object.entries(value as string | IQueryOperators).forEach(([operator, operand]) => {
                        filterObj[`${key}.${operator}`] = operand
                    })
          })
        : undefined
    return filterObj
}

const convertSortQuery = <T>(sort?: Partial<Record<keyof T, 'desc' | 'asc'>>): string | undefined =>
    sort
        ? Object.entries(sort)
              .map(([key, value]) => `${key}.${value}`)
              ?.toString()
        : undefined

const convertQueryParams = <T>(query?: IQuery<T>) => ({
    ...convertFilterQuery(query?.filter),
    sort: convertSortQuery<T>(query?.sort),
    limit: query?.limit,
    page: query?.page,
})

export const queryUtils = { convertQueryParams }
