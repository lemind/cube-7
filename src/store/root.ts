import { ActionType } from 'typesafe-actions'
import { combineEpics, Epic } from 'redux-observable'

import { authEpics } from './auth'
import { loginActions } from './auth/login'
import { registerActions } from './auth/register'
import { testActions } from './space/test'
import { spaceEpics } from './space'

export const rootEpic = combineEpics(
  ...authEpics,
  ...spaceEpics,
)

const rootAction = { loginActions, registerActions, testActions }

export type TRootAction = ActionType<typeof rootAction>

// TToDo: 3th one should be TRootState
// how can we fix it?
export type TRootEpic = Epic<TRootAction, TRootAction, any>
