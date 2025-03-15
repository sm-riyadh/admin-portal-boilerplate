import { api } from './api'
import { authApi } from '../lib/authApi'
import globError from '../lib/globError'
import { RepoArg } from '../types/repoTypes'

// INFO: This is a simple example of a user repository
export const userRepo: RepoArg = {
  // INFO: createUserArg can be extracted for better readability if it gets too long
  // createUser: (arg: CreateUserArg) => {
  fetchUser: (arg: { userId: number }) => {
    const url = api.user.fetch(arg.userId.toString())

    const { data, isLoading, error } = authApi.get(url)

    if (error) {
      globError('useUserRepo|getUser', error, 'Error fetching user')
    }

    // INFO: manipulate data here
    // ...

    return {
      data,
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

    // INFO: manipulate data here
    // ...

    return {
      data,
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

    // INFO: manipulate data here
    // ...

    return {
      data,
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

    // INFO: manipulate data here
    // ...

    return {
      data,
      error,
    }
  },

  deleteUser: (arg: { userId: number }) => {
    const url = api.user.delete(arg.userId.toString())

    const { data, error } = authApi.del(url, arg.userId)

    if (error) {
      globError('useUserRepo|deleteUser', error, 'Error deleting user')
    }

    // INFO: manipulate data here
    // ...

    return {
      data,
      error,
    }
  },
}
