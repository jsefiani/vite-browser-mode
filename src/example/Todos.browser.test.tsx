import { expect, vi } from 'vitest'
import { page } from '@vitest/browser/context'
import { render } from 'vitest-browser-react'
import Todos from './Todos'
import { test } from '../../test-extended'
import { http, HttpResponse } from 'msw'
import { deleteTodo } from './delete-todo.js'

test('renders todos', async ({ mockApi }) => {
  mockApi.use(
    http.get<never,never, {id: number, title: string, completed: boolean}[]>('*/todos', () => {
      return HttpResponse.json([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Finish Vitest course', completed: true },
      ])
    })
  )
  render(<Todos />)
  
  await expect.element(page.getByText('Buy groceries - Pending')).toBeInTheDocument()
  await expect.element(page.getByText('Finish Vitest course - Done')).toBeInTheDocument()

  expect(page.getByRole('listitem').all()).toHaveLength(2)
})


test('deletes todo', async ({ mockApi }) => {
  vi.mock('./delete-todo', {spy: true})

  mockApi.use(
    http.get<never,never, {id: number, title: string, completed: boolean}[]>('*/todos', () => {
      return HttpResponse.json([
        { id: 1, title: 'Buy groceries', completed: false },
      ])
    })
  )
  render(<Todos />)

  const deleteButton = page.getByText('Delete')

  await deleteButton.click()

  expect(deleteTodo).toHaveBeenCalledWith(1)
})
