import { mergeMap, map, catchError } from 'rxjs/operators'
import { API } from '@/api/index'
import { of, pipe } from 'rxjs'
import { filter } from 'rxjs/operators';
// check if this works with vuex
import { createAsyncAction } from 'typesafe-actions'

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
type UserType = {
  name: string,
  email: string
}
type ErrorType = object | null

// TToDo
export type AuthActionType = any

interface IAuthState {
  token: TokenType,
  user: UserType | null,
  loading: boolean,
  error: ErrorType
}

const initialState: IAuthState = {
  token: '',
  user: null,
  loading: false,
  error: null
}

const auth = {
  state: () => (initialState),
  mutations: {
    register(state: any, user: UserType) {
      console.log('register mutation');
    },
    registerSucceeded(state: any, token: TokenType) {
      state.token = token
    },
    requestFailed(state: any, error: ErrorType) {
      console.log('request failed');
      state.error = error
    }
  },
  actions: {
    register({ commit }: any, newUser: any) {
      console.log('commit register', newUser);
      const newUserServer = {"user":{
        "email": newUser.email,
        "password": newUser.password
      }}
      commit('register', newUserServer)
    }
  }
}

// todo move to helper
const ofType = type => pipe(filter((action:any) => action.type === type))

// TTODO
type TRootEpic = any
export const registerEpic: TRootEpic = action$ => action$.pipe(
  ofType('register'),
  mergeMap(action => {
    return API.signup(action).pipe(
      map((resRaw: any) => {
        const res = resRaw.response

        if (!res.success) {
          return registerActions.failure({
            ...res.error,
          })
        }

        return registerActions.success(res.result)
      }),
      catchError(error => of(registerActions.failure(error)))
    )
  })
)
export const authEpics = [registerEpic]

export default auth

