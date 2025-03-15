interface Repo<Model> {
  default: Model
  isLoading: boolean
  error: Error | null
}

export interface User extends Repo<User> {
  id: number
  username: string
  name: string
  email: string
  role: string
  avatar?: string
}

export const defaultUser = {
  id: 0,
  name: '',
  email: '',
}
