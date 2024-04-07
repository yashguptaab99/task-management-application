import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Title, Flex, Stack } from '@mantine/core'
import { Icon24Hours } from '@tabler/icons-react'

function Header() {
    const { t } = useTranslation('home')

    return (
        <Stack h="100%" p="xl2" align="flex-start" gap={0}>
            <Flex align="center" gap="lg">
                <Link to="/">
                    <Icon24Hours color="#3A3DCE" size={'50px'} />
                </Link>
                <Title order={5}>{t('headerTitle')}</Title>
            </Flex>
        </Stack>
    )
}

export default Header
