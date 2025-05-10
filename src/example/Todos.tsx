import { useState, useEffect } from 'react'
import { deleteTodo } from './delete-todo'

export default function Todos() {
  const [todos, setTodos] = useState<{ id: number; title: string; completed: boolean }[]>([])
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(setTodos)
  }, [])

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Done' : 'Pending'}
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}