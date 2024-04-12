import dayjs from 'dayjs'
import { useSetAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Text, Flex, Box } from '@mantine/core'

import { appStore } from '@/data/store/app.atom'
import { useAtomWithDisclosure } from '@/hooks'
import { ITask, TaskStatusEnum } from '@/interfaces/task.types'

import classes from './TaskListItem.module.css'

export default function TaskListItem({ task }: { task: ITask }) {
    const { t } = useTranslation('home')
    const currentDate = dayjs(new Date())
    const formattedDate = dayjs(task.dueDate).format('D MMM, YYYY')
    const isChecked = task.status.id == TaskStatusEnum.DONE
    const setActiveTask = useSetAtom(appStore.activeTask)
    const [, { toggle }] = useAtomWithDisclosure(appStore.isTaskDrawerOpened)

    const handleOnCheck = () => {}
    const handleClick = () => {
        setActiveTask(task)
        toggle()
    }

    const itemStyle = {
        textDecoration: isChecked ? 'line-through' : 'none',
        color: isChecked ? '#9296a6' : 'black',
        fontWeight: 600,
    }

    const itemSubSection = {
        fontSize: '14px',
        color: !currentDate.isAfter(dayjs(task.dueDate)) ? '#55565b' : '#d92d20',
    }

    return (
        <>
            <Flex gap={8} className={`${classes.box} ${classes.boxHover}`}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleOnCheck}
                    className={classes.customCheckbox}
                />
                <Box onClick={handleClick}>
                    <Text style={itemStyle} w={'100%'} className={classes.boxText}>
                        {task.name}
                    </Text>
                    <Text style={itemSubSection} mt="sm">
                        {currentDate.isAfter(dayjs(task.dueDate)) ? `${t('overdue')} ` : ''}
                        {formattedDate}
                    </Text>
                </Box>
            </Flex>
        </>
    )
}
