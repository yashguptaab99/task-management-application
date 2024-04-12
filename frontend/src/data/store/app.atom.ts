import { atom } from 'jotai'

import { ITask } from '@/interfaces/task.types'

const isTaskDrawerOpened = atom<boolean>(false)
const searchQueryAtom = atom<string>('')
const activeTask = atom<ITask | undefined>(undefined)

export const appStore = { isTaskDrawerOpened, searchQueryAtom, activeTask }
