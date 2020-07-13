import testModule, { testEpic } from './test';

export const spaceEpics = [testEpic]

export default {
  test: testModule,
}

export type testResponse = {
  test: string,
}

export type ErrorType = object | null
export type UserType = {
  name: string,
  email: string
}
