import { api } from '../api/api'
import { authApi } from '../api/authApi'
import { globError } from '../errors/globError'
import { RepoArg } from '../types/repoType'
import { User } from '../types/userType'

export const userRepo: RepoArg = {
  fetchUser: (arg: { userId: number }) => {
    const url = api.user.fetch(arg.userId.toString())

    const { data, isLoading, error } = authApi.get(url)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    type Response = User

    return {
      data: data as Response,
      isLoading,
      error,
    }
  },

  fetchUserList: () => {
    const url = api.user.fetchList

    const { data, isLoading, error } = authApi.get(url)

    if (error) {
      globError('useUserRepo|getUsers', error, 'Error fetching users')
    }

    type Response = User[]

    return {
      data: data as Response,
      isLoading,
      error,
    }
  },

  createUser: (arg: {
    user: {
      name: string
      email: string
    }
  }) => {
    const url = api.user.create

    const { data, error } = authApi.post(url, arg.user)

    if (error) {
      globError('useUserRepo|createUser', error, 'Error creating user')
    }

    type Response = User

    return {
      data: data as Response,
      error,
    }
  },

  updateUserName: (arg: {
    user: {
      id: number
      name: string
    }
  }) => {
    const url = api.user.updateName(arg.user.id.toString())

    const { data, error } = authApi.put(url, arg.user)

    if (error) {
      globError('useUserRepo|updateUser', error, 'Error updating user')
    }

    type Response = User

    return {
      data: data as Response,
      error,
    }
  },

  deleteUser: (arg: { userId: number }) => {
    const url = api.user.delete(arg.userId.toString())

    const { data, error } = authApi.del(url, arg.userId)

    if (error) {
      globError('useUserRepo|deleteUser', error, 'Error deleting user')
    }

    type Response = User

    return {
      data: data as Response,
      error,
    }
  },
}
