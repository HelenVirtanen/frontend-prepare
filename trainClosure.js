// Замыкание - это функция, которая запоминает лексическое окружение, в котором была создана, даже после того как внешняя функция завершила свою работу

function makeCounter() {
  let count = 0         // это и есть замыкание, переменная живет
  return function() {
    return ++count
  }
}

const counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
// count живёт в памяти пока живёт counter
// аналогия: counter - рюкзак, count - книжки, которые положены в рюкзак


// Задача 1
// Нужно написать функцию счетчика createCounter(start, step)
// Использовать замыкание 
const counter = createCounter(10, 2)

counter.increment() // 12
counter.increment() // 14
counter.decrement() // 12
counter.reset()     // 10 (вернуть к начальному значению)
counter.getValue()  // 10


function createCounter(start, step) {
  let count = start // создаем замыкание на переменной count

  return {
    increment() { return count += step },
    decrement() { return count -= step },
    reset() { 
       count = start; 
       return count
    },
    getValue() { return count }
  }
}

// Задача 2
// Что выведет в консоль 
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Ответ: 3, 3, 3 — так как все колбэки замкнуты на одну переменную i
// i обьявлена через var, а у var - функциональная область видимости
// Фикс: нужно заменить var на let, либо обернуть в IIFE, чтобы получить 0, 1, 2
// замена на let создаёт новую переменную на каждой итерации
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}

// замена на IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 0))(i)
}

// Задача 3
// Написать функцию кеширования

function memoize(fn) {
  const cache = {}
  return function(arg) {
    if (cache[arg] !== undefined) {
      return cache[arg]
    }
    cache[arg] = fn(arg)
    return cache[arg]
  }
}

const slowSquare = (n) => n * n
const fastSquare = memoize(slowSquare)
fastSquare(10) // считает
fastSquare(10) // берёт из кэша
