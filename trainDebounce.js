function debounce(fn, delay) {
  let timer;              // создали замыкание, функция помнит таймер между вызовами
  
  return function(...args) {
    clearTimeout(delay);           // очищаем таймер, в этом суть debounce
    timer = setTimeout(() => fn(...args), delay)  // запускаем таймер, по истечении которого срабатыввет функция
  }
}

