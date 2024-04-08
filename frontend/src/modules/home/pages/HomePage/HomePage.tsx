import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Text, Grid } from '@mantine/core'

import { Drawer } from '@/components/overlay'
import { ApplicationPageTemplate } from '@/components/template'
import { appStore } from '@/data/store/app.atom'
import { ITask, TaskStatusEnum } from '@/interfaces/task.types'
import { TaskHeader, TaskListItem, TaskListItemForm, TasklistToolbar } from '@/modules/home/components'

import classes from './HomePage.module.css'

const taskLists: ITask[] = [
    {
        _id: '66113730d4cb339fd0d1de59',
        name: 'Task Test',
        description: 'Task description',
        dueDate: new Date('2024-04-06T14:09:36.071Z'),
        status: {
            id: TaskStatusEnum.DONE,
            timestamp: new Date('2024-04-06T11:52:59.682Z'),
        },
        createdAt: new Date('2024-04-06T11:51:12.990Z'),
        updatedAt: new Date('2024-04-06T11:52:59.683Z'),
    },
    {
        _id: '66113730d4cb339fd0d1de59',
        name: 'Task Test',
        description: 'Task description',
        dueDate: new Date('2024-04-06T14:09:36.071Z'),
        status: {
            id: TaskStatusEnum.DONE,
            timestamp: new Date('2024-04-06T11:52:59.682Z'),
        },
        createdAt: new Date('2024-04-06T11:51:12.990Z'),
        updatedAt: new Date('2024-04-06T11:52:59.683Z'),
    },
    {
        _id: '66113730d4cb339fd0d1de59',
        name: 'Task Test',
        description: 'Task description',
        dueDate: new Date('2024-04-06T14:09:36.071Z'),
        status: {
            id: TaskStatusEnum.DONE,
            timestamp: new Date('2024-04-06T11:52:59.682Z'),
        },
        createdAt: new Date('2024-04-06T11:51:12.990Z'),
        updatedAt: new Date('2024-04-06T11:52:59.683Z'),
    },
    {
        _id: '66113730d4cb339fd0d1de59',
        name: 'Task Test',
        description: 'Task description',
        dueDate: new Date('2024-05-06T14:09:36.071Z'),
        status: {
            id: TaskStatusEnum.TODO,
            timestamp: new Date('2024-04-06T11:52:59.682Z'),
        },
        createdAt: new Date('2024-04-06T11:51:12.990Z'),
        updatedAt: new Date('2024-04-06T11:52:59.683Z'),
    },
]

function HomePage() {
    const { t } = useTranslation('home')

    const { groupedTasks, doneTasks } = useMemo(() => {
        const groups: { [key: string]: ITask[] } = {}
        const done: ITask[] = []
        taskLists.forEach((task) => {
            if (task.status.id === TaskStatusEnum.DONE) {
                done.push(task)
            } else {
                const monthYear = task.dueDate.toLocaleString('default', { month: 'long', year: 'numeric' })
                if (!groups[monthYear]) {
                    groups[monthYear] = []
                }
                groups[monthYear].push(task)
            }
        })
        return { groupedTasks: groups, doneTasks: done }
    }, [])

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
                    {Object.entries(groupedTasks).map(([monthYear, tasks], index) => (
                        <div key={monthYear} className={classes.checklistContainer}>
                            <Text className={classes.subTitle}>{monthYear.toUpperCase()}</Text>
                            {tasks.map((task) => (
                                <TaskListItem key={index} task={task} />
                            ))}
                        </div>
                    ))}
                    {doneTasks.length > 0 && (
                        <div className={classes.checklistContainer}>
                            <Text className={classes.subTitle}>{t('done')}</Text>
                            {doneTasks.map((task, index) => (
                                <TaskListItem key={index} task={task} />
                            ))}
                        </div>
                    )}
                </Grid.Col>
            </Grid>
        </ApplicationPageTemplate>
    )
}

export default HomePage
