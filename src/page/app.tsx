import { useEffect, useState } from 'preact/hooks'
import { useAuth } from '../hooks/useAuth'

export function App() {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    if (useAuth.isAuthenticated) {
      // redirect to login page
    }
  }, [])

  return <>Hello</>
}
