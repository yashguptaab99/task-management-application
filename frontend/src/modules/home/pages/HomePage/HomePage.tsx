import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Text, Grid } from '@mantine/core'

import { Drawer } from '@/components/overlay'
import { ApplicationPageTemplate } from '@/components/template'
import { useTaskQuery } from '@/data/queries'
import { appStore } from '@/data/store/app.atom'
import { ITask, TaskStatusEnum } from '@/interfaces/task.types'
import { TaskHeader, TaskListItem, TaskListItemForm, TasklistToolbar } from '@/modules/home/components'
import { TaskSkeleton } from '@/modules/home/components/TaskSkeleton'

import classes from './HomePage.module.css'

function HomePage() {
    const { t } = useTranslation('home')
    const { isLoading, tasks } = useTaskQuery()

    const { groupedTasks, doneTasks } = useMemo(() => {
        const groups: {
            [key: string]: ITask[]
        } = {}
        const done: ITask[] = []
        tasks.forEach((task) => {
            if (task.status.id === TaskStatusEnum.DONE) {
                done.push(task)
            } else {
                const monthYear = dayjs(task.dueDate).format('MMMM YYYY')
                if (!groups[monthYear]) {
                    groups[monthYear] = []
                }
                groups[monthYear].push(task)
            }
        })
        return { groupedTasks: groups, doneTasks: done }
    }, [tasks])

    return (
        <ApplicationPageTemplate title={t('pageTitle')}>
            <TaskHeader />
            <Drawer size={400} atom={appStore.isTaskDrawerOpened}>
                <TaskListItemForm />
            </Drawer>
            <Grid gutter="xl">
                <Grid.Col span={3.5}>
                    <TasklistToolbar />
                </Grid.Col>
                <Grid.Col pl="xl7" pt="xl4" span={8.5}>
                    {Object.entries(groupedTasks).map(([monthYear, tasks]) => (
                        <div key={monthYear} className={classes.checklistContainer}>
                            <Text className={classes.subTitle}>{monthYear.toUpperCase()}</Text>
                            {tasks.map((task, index) => (
                                <TaskListItem key={`${task._id}-${index}`} task={task} />
                            ))}
                        </div>
                    ))}
                    {doneTasks.length > 0 && (
                        <div className={classes.checklistContainer}>
                            <Text className={classes.subTitle}>{t('done')}</Text>
                            {doneTasks.map((task) => (
                                <TaskListItem key={task._id} task={task} />
                            ))}
                        </div>
                    )}
                    {isLoading && <TaskSkeleton />}
                </Grid.Col>
            </Grid>
        </ApplicationPageTemplate>
    )
}

export default HomePage
