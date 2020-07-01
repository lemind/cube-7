import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { TestActionType } from '@/store/space/test'
import store from '@/store'

export const testAPI = {
  test: (action: TestActionType) => {
    const { token } = store.getters
    const headers = {...HEADERS}
    if (token) {
      headers.authorization = `Bearer ${token}`
    }
    return ajax.get(
      `${API_HOST}/ping`,
      headers
    )
  },
}
