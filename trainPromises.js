// simple Promise with .then and .catch
function loadUser(id) {
  return fetch(`/api/user/${id}`)
    .then(res => res.json())
    .catch((err) => { throw new Error(err) })
}

// Promise with async/await
async function loadUser(id) {
  try {
    const result = await fetch(`/api/user/${id}`)
    return result.json()
  } catch(err) {
    throw new Error('Не удалось получить данные')
  }
}

// classic Promise with resolve/reject
const loadUser = (id) => new Promise((resolve, reject) => {
  fetch(`/api/user/${id}`)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch((err) => reject(err))
})


// Задача написать запрос, который будет выбрасывать ошибку на последней попытке

async function fetchWithRetry(url, retries) { // используем async/await для запроса и обработки try/catch
  for (let i = 0; i < retries; i++) {         // запускаем цикл с количеством попыток
    try {
      const result = await fetch(url)         // делаем запрос
      return result.json()                    // если успешно - возвращаем ответ
    } catch(err) {                   
      if (i === retries - 1) {                // если это последняя попытка, то бросаем ошибку
        throw new Error(err.message)
      }                                       // если нет, цикл продолжается
    }
  }
}
