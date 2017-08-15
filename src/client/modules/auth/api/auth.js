import 'isomorphic-fetch'
import { WEB_ADDR } from '../../../settings/config'

import { AUTH_LOGIN_ROUTE } from '../../../../shared/routes'

const login = async function (payload) {
  try {
    let response = await fetch(`${WEB_ADDR}${AUTH_LOGIN_ROUTE}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    })
    let data = await response.json()
    return {data: data}
  } catch (error) {
    return {error: error}
  }
}

export { login }
