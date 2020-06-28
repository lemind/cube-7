import { ajax } from 'rxjs/ajax'
import { API_HOST, HEADERS } from '../config'
import { RegisterActionType } from 'src/store/auth/register'
// import { IUserSignup, IUserLogin } from 'models/Auth'
import { TBackDataError } from './index'

export const authAPI = {
  // TToDo: LoginActionType | AuthActionType
  login: (action: RegisterActionType) => {
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