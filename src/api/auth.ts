import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { RegisterActionType } from 'src/store/auth/register'
import { LoginActionType } from '@/store/auth/login'

export const authAPI = {
  login: (action: LoginActionType) => {
    return ajax.post(
      `${API_HOST}/user/login`,
      action.payload,
      HEADERS
    )
  },
  signup: (action: RegisterActionType) => {
    return ajax.post(
      `${API_HOST}/user/signup`,
      action.payload,
      HEADERS
    )
  },
}
