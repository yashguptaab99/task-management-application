import { dateUtils } from './date.util'
import { formatUtils } from './format.utils'
import { mediaQueriesUtils } from './mediaqueries.utils'
import { queryUtils } from './query.utils'
import { sortUtils } from './sort.utils'

export const utils = {
    mediaquery: mediaQueriesUtils,
    date: dateUtils,
    format: formatUtils,
    query: queryUtils,
    sort: sortUtils,
}
