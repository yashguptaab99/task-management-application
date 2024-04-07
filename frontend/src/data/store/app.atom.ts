import { atom } from 'jotai'

const isTaskDrawerOpened = atom<boolean>(false)
export const appStore = { isTaskDrawerOpened }
