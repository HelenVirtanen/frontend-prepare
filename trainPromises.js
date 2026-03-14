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
