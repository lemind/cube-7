import { mergeMap, map, catchError } from 'rxjs/operators'
import { createAsyncAction, ActionType } from 'typesafe-actions'
import { of } from 'rxjs'

import { ofType } from '@/helpers/epics'
import { API } from '@/api/index'
import { TRootEpic } from '@/store/root'
import { authResponse, ErrorType, TokenType, UserType } from '.'

export const registerActions = createAsyncAction(
  'register',
  'registerSucceeded',
  'requestFailed',
)<string, authResponse, ErrorType>()

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
    common: [] // connection errors and so
  }
}

const registerModule = {
  state: () => (initialState),
  mutations: {
    register(state: any, user: UserType) {
      state.loading = true
    },
    registerSucceeded(state: any, res: any) {
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
    register({ commit }: any, newUser: any) {
      const newUserServer = {"user":{
        "email": newUser.email,
        "password": newUser.password
      }}
      commit('register', newUserServer)
    }
  },
  getters: {
    user: (state, getters, rootState, rootGetters) => {
      return rootGetters.userLogin || state.user
    },
    token: (state, getters, rootState, rootGetters) => {
      return rootGetters.userToken || state.token
    },
  }
}


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

        return registerActions.success(res)
      }),
      catchError(error => of(registerActions.failure(error.response.error)))
    )
  })
)

export default registerModule
