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
