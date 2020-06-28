import registerModule, { registerEpic } from './register';
import loginModule, { loginEpic } from './login';

export const authEpics = [registerEpic, loginEpic]

export default {
  register: registerModule,
  login: loginModule,
}

export type authResponse = {
  user: UserType,
  token: TokenType
}

export type TokenType = string
export type ErrorType = object | null
export type UserType = {
  name: string,
  email: string
}
