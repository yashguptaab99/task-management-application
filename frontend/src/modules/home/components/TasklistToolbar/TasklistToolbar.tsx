import dayjs from 'dayjs'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Flex, Text, ScrollArea, Button, Select } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'

import { utils } from '@/common'
import { SearchInput } from '@/components/inputs'
import { appStore } from '@/data/store/app.atom'
import { TaskStatusEnum } from '@/interfaces/task.types'
import { useFilterParams } from '@/modules/home/hooks'

import classes from './TasklistToolbar.module.css'

export const statusOptions = ['Not Completed', 'Completed']
export const byDate = ['All Time', 'This Month', 'Next Month']
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export default function TasklistToolbar() {
    const { t } = useTranslation('home')
    const isMobile = useMediaQuery(utils.mediaquery.isMobile)
    const setSearch = useSetAtom(appStore.searchQueryAtom)
    const [initialFilter, setSearchParams] = useFilterParams()

    const updateFilter = (type: 'status' | 'month', value: string | null) => {
        const searchParams = new URLSearchParams(window.location.search)

        if (value) {
            if (type === 'status') {
                searchParams.set('status', value === 'Completed' ? TaskStatusEnum.DONE : TaskStatusEnum.TODO)
                searchParams.delete('month')
            } else if (type === 'month') {
                let monthYearString = ''
                switch (value) {
                    case 'This Month':
                        monthYearString = dayjs().format('MMMM-YYYY')
                        break
                    case 'Next Month':
                        monthYearString = dayjs().add(1, 'month').format('MMMM-YYYY')
                        break
                    case 'All Time':
                        searchParams.delete('status')
                        searchParams.delete('month')
                        break
                }
                if (monthYearString) {
                    searchParams.set('month', monthYearString)
                    searchParams.delete('status')
                }
            }
        } else if (value === null || value === 'All Time') searchParams.delete(type)
        setSearchParams(searchParams.toString())
    }

    const renderFilterOptions = (options: string[], filterType: 'status' | 'month', selectedValue: string) => (
        <>
            {!isMobile ? (
                <Flex direction="column" gap={4}>
                    <Text ml="md" mt="xl" className={classes.toolbarSubtitle}>
                        {t(`navbar.${filterType}`)}
                    </Text>
                    <ScrollArea offsetScrollbars>
                        {options.map((option) => (
                            <Button
                                className={classes.linkBtn}
                                style={{
                                    backgroundColor: option === selectedValue ? '#3A3DCE' : 'transparent',
                                    color: option === selectedValue ? '#fff' : '#000',
                                }}
                                key={option}
                                value={option}
                                fullWidth
                                onClick={(e) => updateFilter(filterType, e.currentTarget.value)}>
                                {option}
                            </Button>
                        ))}
                    </ScrollArea>
                </Flex>
            ) : (
                <Flex direction="column" gap={5}>
                    <Text fw={300}>{t(`navbar.${filterType}`)}</Text>
                    <Select
                        rightSection={<IconChevronDown size="md" />}
                        rightSectionWidth={40}
                        data={options}
                        placeholder={options[0]}
                        value={selectedValue}
                        onChange={(value) => updateFilter(filterType, value)}
                    />
                </Flex>
            )}
        </>
    )

    return (
        <div className={classes.wrapper}>
            <SearchInput
                onDebounceChange={setSearch}
                id="search-bar"
                w={isMobile ? '100%' : 250}
                mt="xl5"
                mb="xl3"
                placeholder={t('searchInput.placeholder')}
                debounceValue={300}
            />
            {renderFilterOptions(statusOptions, 'status', initialFilter.status)}
            {renderFilterOptions(byDate, 'month', initialFilter.month)}
        </div>
    )
}
