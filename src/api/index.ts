import { authAPI } from './auth'

export type TBackDataError = {
  id: number,
  message: string
}

export const API = {
  ...authAPI
}
