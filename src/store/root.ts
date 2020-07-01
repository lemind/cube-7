import { authEpics } from './auth'
import { spaceEpics } from './space'
import { combineEpics } from 'redux-observable'

export const rootEpic = combineEpics(
  ...authEpics,
  ...spaceEpics,
)
