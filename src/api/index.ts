import { authAPI } from './auth'
import { testAPI } from './test'

export type TBackDataError = {
  id: number,
  message: string
}

export const API = {
  ...authAPI,
  ...testAPI,
}
