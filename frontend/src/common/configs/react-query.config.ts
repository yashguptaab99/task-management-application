/**
 * Configuration file for the query client.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { t } from 'i18next'
import { QueryClient } from 'react-query'

import { env } from '@/common'
import { INotificationToasterType, Notification } from '@/common/actions'

/**
 * The time in milliseconds after which a query is considered stale.
 */
const QUERY_STALE_TIME = 1000 * 30 // 30sec

/**
 * The time in milliseconds to wait before retrying a stale query.
 */
const QUERY_RETRY_STALE_TIME = 10000 * 60 // 1min

/**
 * The time in milliseconds to cache query results.
 */
const QUERY_CACHE_TIME = 1000 * 60 * 5 // 5min

/**
 * Configuration options for query retries.
 */
const queryRetryConfigs = {
    staleTime: QUERY_STALE_TIME,
    retryDelay: QUERY_RETRY_STALE_TIME,
}

/**
 * The react-query client instance.
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: QUERY_CACHE_TIME,
            staleTime: QUERY_STALE_TIME,
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
        },
        mutations: {
            onError: (error: any) => {
                if (error?.code === 'ERR_NETWORK') {
                    const type: INotificationToasterType = 'error'
                    const message = t('exceptions:default').toString()

                    Notification.show({
                        id: 'generic-exception',
                        type,
                        title: 'An error ocurred',
                        message,
                    })
                }
            },
        },
    },
})

const apiClient = axios.create({
    baseURL: env.API_URL,
})

export const queryClientConfig = { queryClient, queryRetryConfigs, apiClient }
