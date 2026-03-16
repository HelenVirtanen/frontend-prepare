function throttle(fn, delay) {
  let isThrottled = false;       // ставим флаг блокировки = разблокировано, можно запускать функцию
                                 // это замыкание

  return function(...args) {
     if (isThrottled) return;    // проверяем не заблокировано ли, если да - функция не выполняется
     fn(...args);                // если нет - запускаем функцию
     isThrottled = true;         // блокируем
     setTimeout(() => {          // запускаем таймер для разблокировки
       isThrottled = false
     }, delay)                   
  }
}
