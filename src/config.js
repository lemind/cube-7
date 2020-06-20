var port = process.env.PORT || 3001;

export let API_HOST

if (process.env.NODE_ENV === 'development') {
  API_HOST = `http://localhost:${port}/api`
} else {
  API_HOST = `https://cube-7-auth.herokuapp.com/api`
}

export const HEADERS = {
  'Content-Type': 'application/json'
}
