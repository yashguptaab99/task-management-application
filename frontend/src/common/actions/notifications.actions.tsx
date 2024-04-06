import { ReactNode } from 'react'

import { NotificationData, notifications } from '@mantine/notifications'
import { IconCheck, IconX, IconExclamationCircle } from '@tabler/icons-react'

export type INotificationToasterType = 'success' | 'error' | 'warning'

type NotificationPayload = Omit<NotificationData, 'loading'>

const typeToIcon: { [key in INotificationToasterType]: () => ReactNode } = {
    success: () => <IconCheck color="var(--mantine-color-success-5)" size={32} />,
    error: () => <IconX color="var(--mantine-color-error-5)" size={32} />,
    warning: () => <IconExclamationCircle color="var(--mantine-color-warning-5" size={32} />,
}

const getIcon = (type: INotificationToasterType) => {
    return typeToIcon[type]()
}

/**
 * Shows a notification with the specified type and data.
 * @param {NotificationPayload & { type: INotificationToasterType }} options - The options for the notification.
 */
function show({ type, ...data }: NotificationPayload & { type: INotificationToasterType }) {
    const icon = getIcon(type)

    notifications.show({
        icon,
        ...data,
        message: data?.message || '',
    })
}

/**
 * Updates the notification with the specified type and data.
 * @param {NotificationPayload & { type: INotificationToasterType }} options - The options for the notification update.
 */
function update({ type, ...data }: NotificationPayload & { type: INotificationToasterType }) {
    const icon = getIcon(type)

    notifications.update({
        icon,
        ...data,
        message: data?.message || '',
    })
}

export const Notification = { show, update }
