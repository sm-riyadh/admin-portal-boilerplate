export const api = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    checkAuth: '/auth/check',
    me: '/auth/me',
  },
  user: {
    fetch: (userId: string) => `/user/${userId}`,
    fetchList: `/user/`,
    create: '/user',
    updateName: (userId: string) => `/user/${userId}/name`,
    delete: (userId: string) => `/user/${userId}`,
  },
} as const
