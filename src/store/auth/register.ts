import { mergeMap, map, catchError } from 'rxjs/operators'
import { createAsyncAction, ActionType } from 'typesafe-actions'
import { of } from 'rxjs'

import { ofType } from '@/helpers/epics'
import { API } from '@/api/index'

type registerResponse = {
  user: UserType,
  token: TokenType
}

const registerActions = createAsyncAction(
  'register',
  'registerSucceeded',
  'requestFailed',
)<string, registerResponse, ErrorType>()

type TokenType = string
type ErrorType = object | null
type UserType = {
  name: string,
  email: string
}

export type RegisterActionType = ActionType<typeof registerActions>

interface IRegisterState {
  token: TokenType,
  user: UserType | null,
  loading: boolean,
  error: ErrorType
}

const initialState: IRegisterState = {
  token: '',
  user: null,
  loading: false,
  error: {
    form: {},
    common: [] //connection errors and so
  }
}

const registerModule = {
  state: () => (initialState),
  mutations: {
    register(state: any, user: UserType) {
      state.loading = true
    },
    registerSucceeded(state: any, token: TokenType) {
      state.token = token
      state.loading = false
    },
    requestFailed(state: any, error: ErrorType) {
      // arrange errors by fields
      state.error = error
      state.loading = false
    }
  },
  actions: {
    register({ commit }: any, newUser: any) {
      const newUserServer = {"user":{
        "email": newUser.email,
        "password": newUser.password
      }}
      commit('register', newUserServer)
    }
  }
}


// TTODO
type TRootEpic = any

export const registerEpic: TRootEpic = action$ => action$.pipe(
  ofType('register'),
  mergeMap(action => {
    return API.signup(action as RegisterActionType).pipe(
      map((resRaw: any) => {
        const res = resRaw.response

        if (!res.success) {
          return registerActions.failure({
            ...res.error,
          })
        }

        return registerActions.success(res.result)
      }),
      catchError(error => of(registerActions.failure(error.response.error)))
    )
  })
)

export default registerModule
