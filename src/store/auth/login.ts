import { mergeMap, map, catchError } from 'rxjs/operators'
import { createAsyncAction, ActionType } from 'typesafe-actions'
import { of } from 'rxjs'

import { ofType } from '@/helpers/epics'
import { API } from '@/api/index'
import { authResponse, ErrorType, TokenType, UserType } from '.'

const loginActions = createAsyncAction(
  'login',
  'loginSucceeded',
  'requestFailed',
)<string, authResponse, ErrorType>()

export type LoginActionType = ActionType<typeof loginActions>

interface ILoginState {
  token: TokenType,
  user: UserType | null,
  loading: boolean,
  error: ErrorType
}

const initialState: ILoginState = {
  token: '',
  user: null,
  loading: false,
  error: {
    form: {},
    common: [] // connection errors and so
  }
}

const loginModule = {
  state: () => (initialState),
  mutations: {
    login(state: any, user: UserType) {
      state.loading = true
    },
    loginSucceeded(state: any, res: any) {
      state.token = res.token
      state.user = res.user
      state.loading = false
    },
    requestFailed(state: any, error: ErrorType) {
      // arrange errors by fields
      state.error = error
      state.loading = false
    }
  },
  actions: {
    login({ commit }: any, user: any) {
      const userServer = {"user":{
        "email": user.email,
        "password": user.password
      }}
      commit('login', userServer)
    }
  },
  getters: {
    userLogin: state => state.user
  }
}


// TTODO
type TRootEpic = any

export const loginEpic: TRootEpic = action$ => action$.pipe(
  ofType('login'),
  mergeMap(action => {
    return API.login(action as LoginActionType).pipe(
      map((resRaw: any) => {
        const res = resRaw.response

        if (!res.success) {
          return loginActions.failure({
            ...res.error,
          })
        }

        return loginActions.success(res)
      }),
      catchError(error => of(loginActions.failure(error.response.error)))
    )
  })
)

export default loginModule
