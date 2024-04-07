import { ReactElement } from 'react'

import { WhenProps } from './Show.types'

export function ShowWhen({ isTrue, children }: WhenProps): ReactElement | null {
    return isTrue ? <>{children}</> : null
}
