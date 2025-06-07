'use client'

import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { TodoCheckbox } from './CheckBox'
import { editTask } from '@/app/actions/editTask'
import { deleteTask } from '@/app/actions/deleteTask'
import { format } from 'date-fns'

export function TodoItem({ todo, userId }: { todo: any; userId: string }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const [newDescription, setNewDescription] = useState(todo.description)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('taskId', todo.id)
    formData.append('title', newTitle)
    formData.append('description', newDescription)
    formData.append('userId', userId)

    await editTask(formData)
    setIsEditing(false)
  }

  return (
    <li className="flex flex-col gap-2 border-b py-4">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input type="hidden" name="taskId" value={todo.id} />
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <textarea
            name="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border px-2 py-1 rounded"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <TodoCheckbox
              todoId={Number(todo.id)}
              initialStatus={todo.status as 'pending' | 'complete'}
              userId={userId}
            />
            <span>{todo.title}</span>
            <span>{todo.description}</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                todo.status === 'complete'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {todo.status}
            </span>
            <span className="text-sm text-gray-500">
              📅 {format(new Date(todo.created_at), 'dd/MM/yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <form action={deleteTask}>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="taskId" value={Number(todo.id)} />
              <button type="submit">
                <FaTrash className="text-gray-500 hover:text-red-500" />
              </button>
            </form>
            <button onClick={() => setIsEditing(true)}>
              <FaEdit className="text-gray-500 hover:text-green-500" />
            </button>
          </div>
        </div>
      )}
    </li>
  )
}
