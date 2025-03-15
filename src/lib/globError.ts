// Usage: import globError from './lib/globError'
// globError('folderName|fileName', error, 'Error creating user')
const globError = (tracePath: string, error: Error, message: string) => {
  console.error(`${Date.now()} | ${tracePath} | ${message} | ${error.message}`)
  return error
}

export default globError
