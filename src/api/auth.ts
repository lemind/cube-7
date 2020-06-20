import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { AuthActionType } from 'src/store/auth'
// import { IUserSignup, IUserLogin } from 'models/Auth'
import { TBackDataError } from './index'

export const authAPI = {
  login: (action: AuthActionType) => {
    return ajax.post(
      `${API_HOST}/user/login`,
      action.payload,
      HEADERS
    )
  },
  signup: (action: AuthActionType) => {
    return ajax.post(
      `${API_HOST}/user/signup`,
      action.payload,
      HEADERS
    )
  },
}