import { useMediaQuery } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'

import { utils } from '@/common'

export function NotificationProvider() {
    const isMobile = useMediaQuery(utils.mediaquery.isMobile)

    return <Notifications position={isMobile ? 'top-center' : 'bottom-center'} zIndex={1000} />
}
