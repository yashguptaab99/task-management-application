import { atom } from 'jotai'

const isTaskDrawerOpened = atom<boolean>(false)
const searchQueryAtom = atom<string>('')

export const appStore = { isTaskDrawerOpened, searchQueryAtom }
