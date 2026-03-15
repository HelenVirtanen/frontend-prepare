// Нужно написать функцию groupBy(arr, key), которая группирует массив объектов по ключу
// Использовать reduce

const users = [
  { name: 'Elena', city: 'SPb' },
  { name: 'Julia', city: 'Moscow' },
  { name: 'Sasha', city: 'SPb' },
  { name: 'Dima', city: 'Moscow' },
  { name: 'Kate', city: 'SPb' }
]

groupBy(users, 'city')
// {
//   SPb: [{ name: 'Elena', city: 'SPb' }, { name: 'Sasha', ... }, { name: 'Kate', ... }],
//   Moscow: [{ name: 'Julia', ... }, { name: 'Dima', ... }]
// }


function groupBy(arr, key) {
    return arr.reduce((group, item) => { // созаем редьюс функцию с аккумулятором group и элементом в списке item
       const groupKey = item[key] // вынимаем сразу значение ключа элемента (например, SPb по списку, далее будет Moscow
       if (!group[groupKey]) { // если такого значения (ключа) пока нет
         group[groupKey] = [] // добавляем пустой массив в аккумулятор
       }
       group[groupKey].push(item) // если ключ уже есть, то к нему в аккумуляторе добавляем элемент    
       
       return group // возвращаем аккумулятор
  }, {}) // задаем начальное значение нашего аккумулытора пустой объект {}
}
