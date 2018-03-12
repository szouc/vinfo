import axios from '@clientSettings/axiosInstance'
import { auth as AuthURL, user as UserURL } from '@server/exports/api'

const login = payload => {
  const config = {
    url: AuthURL.LOGIN,
    method: 'post',
    data: payload
  }
  return axios(config)
}

const logout = () => {
  const config = {
    url: AuthURL.LOGOUT,
    method: 'get'
  }
  return axios(config)
}

const fetchProfile = username => {
  const config = {
    url: UserURL.USER_ID.replace(/:username/, username),
    method: 'get'
  }
  return axios(config)
}

export { login, logout, fetchProfile }
