import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useAuth } from '../hooks/useAuth'

const axiosInt = axios.create({
  baseURL: import.meta.env.BACKEND_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useAuth.authToken}`,
  },
})

axiosInt.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here (401, 403, etc.)
    // TODO: Handle error and Show toast to the user or redirect to login page
    return Promise.reject(error)
  }
)

function get<TData = unknown>(
  url: string,
  options: any = {},
  queryKey: string | null = null
) {
  if (queryKey === null) {
    queryKey = url
  }
  const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey]

  return useQuery<TData, AxiosError>({
    queryKey: queryKeyArray,
    queryFn: async () => {
      const { data } = await axiosInt.get(url)
      return data
    },
    ...options,
  })
}

function post<TData = unknown, TVariables = unknown>(
  url: string,
  options: any = {}
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (args) => {
      const { data } = await axiosInt.post(url, args)
      return data
    },
    ...options,
  })
}

function put<TData = unknown, TVariables = unknown>(
  url: string,
  options: any = {}
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (args) => {
      const { data } = await axiosInt.put(url, args)
      return data
    },
    ...options,
  })
}

function del<TData = unknown, TVariables = unknown>(
  url: string,
  options: any = {}
) {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (args) => {
      const { data } = await axiosInt.delete(url, { data: args })
      return data
    },
    ...options,
  })
}

export const authApi = {
  get,
  post,
  put,
  del,
}

export const invalidateQueries = (
  queryClient: QueryClient,
  queryKey: string | string[]
) => {
  const queryKeyArray = Array.isArray(queryKey) ? queryKey : [queryKey]
  return queryClient.invalidateQueries({ queryKey: queryKeyArray })
}
