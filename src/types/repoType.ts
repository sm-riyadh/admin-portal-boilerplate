export type RepoReturn = {
  data: any
  isLoading?: boolean
  error?: AxiosError | null
}

export type RepoArg = {
  [fn: string]: (arg: any) => RepoReturn
}
