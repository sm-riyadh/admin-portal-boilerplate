import { signal, computed } from '@preact/signals'
import { authRepo } from '../repo/authRepo'
import { User } from '../types/userType'

const authToken = signal<string | null>(null)
const me = signal<User | null>(null)
const isLoading = signal<boolean>(false)
const error = signal<string | null>(null)

// Computed values
const isAuthenticated = computed(() => !!authToken.value)
const userRole = computed(() => me.value?.role || 'guest')

// Actions
const login = async (arg: { username: string; password: string }) => {
  isLoading.value = true
  error.value = null

  try {
    // Replace with your actual API call
    const { data, error } = authRepo.login(arg)

    if (error) {
      throw new Error('Login failed')
    }

    me.value = data.user
    authToken.value = data.token
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    throw err
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  me.value = null
  authToken.value = null
}

const checkAuth = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) return

  isLoading.value = true

  try {
    const { error } = authRepo.checkAuth()

    if (error) {
      throw new Error('Failed to fetch user')
    }
  } catch (err) {
    logout()
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    throw err
  } finally {
    isLoading.value = false
  }
}

const getMe = async () => {
  isLoading.value = true

  try {
    const { data, error } = authRepo.me()

    if (error) {
      throw new Error('Failed to fetch user')
    }

    me.value = data
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    throw err
  } finally {
    isLoading.value = false
  }
}

export const useAuth = {
  // State
  authToken,
  me,
  isLoading,
  error,

  // Computed
  isAuthenticated,
  userRole,

  // Actions
  login,
  logout,
  checkAuth,
  getMe,
}
