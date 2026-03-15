import { useMemo, useCallback, useState } from 'react'

function UserList() {
  const users = [
    { id: 1, name: 'Elena' },
    { id: 2, name: 'Anna' },
    { id: 3, name: 'Sasha' }
  ]
  const [search, setSearch] = useState('')

  const filteredUsers = useMemo(() =>
    users.filter(user => user.name.includes(search))
  , [search, users])

  // тренируем колбэк для функции поиска
  const handleSearch = useCallback((query) => {
  setSearch(query)
}, [])

  return (
    <>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)} // handleSearch делает то же самое
        placeholder="Поиск..."
      />
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </>
  )
}
