// Написать функцию которая возвращает результат в зависимости от того, 
// успеет ли промис за лимит времени выполниться
// если да - выполнить
// если нет - выбросить ошибку

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}
