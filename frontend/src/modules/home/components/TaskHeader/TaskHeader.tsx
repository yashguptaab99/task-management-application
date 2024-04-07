import { useTranslation } from 'react-i18next'

import { Avatar, Box, Title, Button, Flex } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

import { appStore } from '@/data/store/app.atom'
import { useAtomWithDisclosure } from '@/hooks'

export default function TaskHeader() {
    const { t } = useTranslation('home')
    const [, { toggle }] = useAtomWithDisclosure(appStore.isTaskDrawerOpened)

    return (
        <Flex justify="space-between" direction={{ base: 'column', sm: 'row' }}>
            <Flex align="flex-end">
                <Avatar radius="full" size="lg">
                    YG
                </Avatar>
                <Box ml="xl" h={65}>
                    <Title order={2} size={30} fw={400} my="xxl" mb="sm">
                        Yash Gupta
                    </Title>
                </Box>
            </Flex>
            <Flex
                w={{ base: '100%', sm: 'initial' }}
                gap={{ base: 'sm', sm: 'md' }}
                direction={{ base: 'column', sm: 'row' }}>
                <Button mt="xl2" onClick={toggle} leftSection={<IconPlus />}>
                    {t('buttons.newTaskBtn')}
                </Button>
            </Flex>
        </Flex>
    )
}
