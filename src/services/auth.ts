
// ToDo
const parseJwt = (token: any) => {
  if (!token) return {}
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

const token = null

const authService = {
  isTokenExpired: () => {
    if (!token) return true
    // localStorage.token;
    const parsed = parseJwt(token)
    const { exp } = parsed

    return exp*1000 > Date.now()
  },
  getEmail: () => {
    if (!token) return false;
    const parsed = parseJwt(token)
    const { data: {email} } = parsed
    return email
  }
}

export default authService
