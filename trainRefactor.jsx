function badApp() {
  const [data, setData] = useState() // неинформативные названия
  const [data2, setData2] = useState() // в чем отличие от data? 
  const [data3, setData3] = useState(false)

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(d => {
        setData(d)
        setData3(false) // по дефолту уже false
      })
      .catch(e => {
        setData2(e.message)
        setData3(false) // дублирование, не ясно зачем
      })
    setData3(true) // синхронный код, выполнится до фетча
  }, [])

  return (
    <div>
      {data3 && <div>Loading...</div>} // поменять надо data3 на loading
      {data2 && <div>{data2}</div>} // а тут на error
      {data && data.map((u, i) => ( // проверка на data лишняя, у нас уже два случая с loading и error обработаны, используется index, лучше id для оптимального reconciliation и страховки от багов
        <div key={i}>{u.name}</div>
      ))}
    </div>
  )
}



function goodApp() {
  const [users, setUsers] = useState(null) // поменяли названия на понятные, добавили null по дефолту
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController() // добавили контроллер, это + к оптимизации
    // предотвращает race condition и утечку памяти
    // если компонент размонтировался ДО ответа сервера, отменяем запрос, чтобы не обновлять стейт несуществующего компонента

    fetch('/api/users', { signal: controller.signal }) // создаем контроллер на запрос
      .then(res => res.json())
      .then(data => {
        setUsers(data) 
        setLoading(false)
      })
      .catch(e => {
        if (e.name !== 'AbortError') {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => controller.abort() // отменяем запрос
  }, [])

  if (loading) return <div>Загрузка...</div> // обрабатываем состояние загрузки запроса
  if (error) return <div>{error}</div> // обрабатываем состояние ошибки, которой закончился запрос

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>  // добавили id для ключа, улучшили оптимизацию ререндера
      ))}
    </div>
  )
}
