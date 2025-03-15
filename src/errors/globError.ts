/*
  globError('folderName|fileName', error, 'Error creating user')
*/
export const globError = (tracePath: string, error: Error, message: string) => {
  console.error(`${Date.now()} | ${tracePath} | ${message} | ${error.message}`)
  return error
}
