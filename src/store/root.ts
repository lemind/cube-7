import { authEpics } from './auth'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(
  ...authEpics
)
