import { api } from './api'
import { authApi } from '../lib/authApi'
import globError from '../lib/globError'
import { User } from '../types/User'

export const authRepo = {
  login: (arg: { username: string; password: string }) => {
    const url = api.auth.login

    const { data, error } = authApi.post(url, arg)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = {
      token: string
      user: User
    }

    // Cast data to the expected type if it exists
    return {
      data: data as Response,
      error,
    }
  },
  logout: () => {
    const url = api.auth.logout

    const { data, error } = authApi.post(url)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = null

    return {
      data: data as Response,
      error,
    }
  },
  register: (arg: { username: string; password: string; email: string }) => {
    const url = api.auth.register

    const { data, error } = authApi.post(url, arg)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = null

    return {
      data: data as Response,
      error,
    }
  },
  me: () => {
    const url = api.auth.me

    const { data, error } = authApi.get(url)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = User

    return {
      data: data as Response,
      error,
    }
  },
  checkAuth: () => {
    const url = api.auth.checkAuth

    const { data, error } = authApi.get(url)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = User

    return {
      data: data as Response,
      error,
    }
  },
}
