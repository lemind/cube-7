import { mergeMap, map, catchError } from 'rxjs/operators'
import { createAsyncAction, ActionType } from 'typesafe-actions'
import { of } from 'rxjs'

import { ofType } from '@/helpers/epics'
import { API } from '@/api/index'
import { TRootEpic } from '@/store/root'
import { testResponse, ErrorType } from '.'

export const testActions = createAsyncAction(
  'test',
  'testSucceeded',
  'requestFailed',
)<string, testResponse, ErrorType>()

export type TestActionType = ActionType<typeof testActions>

interface ITestState {
  result: string,
  loading: boolean,
  error: ErrorType
}

const initialState: ITestState = {
  result: '',
  loading: false,
  error: {},
}

const testModule = {
  state: () => (initialState),
  mutations: {
    test(state: any) {
      state.loading = true
    },
    testSucceeded(state: any, res: any) {
      state.result = res.test
      state.error = {}
      state.loading = false
    },
    requestFailed(state: any, error: ErrorType) {
      state.error = error
      state.result = ''
      state.loading = false
    }
  },
  actions: {
    test({ commit }: any) {
      commit('test')
    }
  },
  getters: {
    test: state => state.result,
    testError: state => state.error
  }
}


export const testEpic: TRootEpic = action$ => action$.pipe(
  ofType('test'),
  mergeMap(action => {
    return API.test(action as TestActionType).pipe(
      map((resRaw: any) => {
        const res = resRaw.response

        if (!res.success) {
          return testActions.failure({
            ...res.error,
          })
        }

        return testActions.success(res)
      }),
      catchError(error => of(testActions.failure(error.response.error)))
    )
  })
)

export default testModule
