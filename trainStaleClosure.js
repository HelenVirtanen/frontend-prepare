// stale closure - устаревшее замыкание
// встречается в useEffect, если неверно его сформировать

function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count) // всегда 0, так как замкнули (устарвшее замыкание)
      setCount(count + 1) // всегда будет 1
    }, 1000)

    return () => clearInterval(interval)
  }, []) // пустой массив — эффект создался только один раз
}

// Как исправить? 
// Решение 1 - функциональное обновление через prev (наилучшее - просто, нет лишних рендеров)
useEffect(() => {
  const interval = setInterval(() => {
    setCount(prev => prev + 1) // не читаем count из замыкания
    // prev — всегда актуальное значение, React передаёт его сам
  }, 1000)

  return () => clearInterval(interval)
}, [])

// Решение 2 - useRef (заморочнее, нужен второй useEffect)
function Timer() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count)

  // Синхронизируем ref с актуальным значением
  useEffect(() => {
    countRef.current = count
  }, [count])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(countRef.current) // всегда актуальное — ref не замыкается
      setCount(countRef.current + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])
}

// Решение 3 - добавить зависимости (тяжелее, так как обновление будет каждую секунду)
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1)
  }, 1000)

  return () => clearInterval(interval)
}, [count]) // эффект пересоздаётся при каждом изменении count

