// Нужно написать функцию, которая формирует путь по хлебным крошкам

const categories = [
  { id: 1, name: 'Смартфоны', children: [
    { id: 2, name: 'Apple', children: [
      { id: 3, name: 'iPhone 17', children: [] }
    ]},
    { id: 4, name: 'Samsung', children: [] }
  ]}
]

findPath(categories, 3) // ['Смартфоны', 'Apple', 'iPhone 17']
findPath(categories, 4) // ['Смартфоны', 'Samsung']
findPath(categories, 99) // null — не найдено


function findPath(tree, targetId) {
  for (const node of tree) { // проходимся циклом по всем узлам
    if (node.id === targetId) return [node.name] // условие выхода из рекурсии + есть ли искомый id в узле, оборачиваем результат в массив

    if (node.children) { // идем по пути далее, есть ли у узла дети
      const path = findPath(node.children, targetId) // рекурсивно проходимся по children, ищем есть ли id и если да - сохраняем результат в переменную path
      if (path) return [node.name, ...path] // если нашли id и сохранили в path, обновляем тогда наш результат с именем узла родителя и именем узла ребенка, где нашли id
    }
  }

  return null // если ничего не нашли, возвращаем пустое значение null
}
