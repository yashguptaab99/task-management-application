import { Children, ReactElement, ReactNode } from 'react'

import { ShowProps } from './Show.types'
import { ShowFallback } from './ShowFallback'
import { ShowWhen } from './ShowWhen'

export function Show({ children }: ShowProps) {
    let when: ReactNode = null
    let otherwise: ReactNode = null

    Children.forEach(children as ReactElement[], (child: ReactElement) => {
        if (child && child.props) {
            if (child.props.isTrue === undefined) {
                otherwise = child
            } else if (!when && child.props.isTrue) {
                when = child
            }
        }
    })

    return <>{when || otherwise}</>
}

Show.When = ShowWhen
Show.Fallback = ShowFallback
