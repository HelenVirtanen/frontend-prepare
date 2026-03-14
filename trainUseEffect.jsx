import { useState, useEffect } from 'react'

function UserProfile({ id }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchUser(id, controller.signal)
      .then(data => setUser(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err)
        }
      })

    return () => controller.abort() // cleanup
  }, [id])

  if (user === null) return <div>Загрузка...</div>
  return <div>{user.name}</div>
}
