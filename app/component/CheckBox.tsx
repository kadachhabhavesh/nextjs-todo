'use client'

import React from 'react'
import { useTransition } from 'react'
import { updateStatus } from '@/app/actions/updateStatus'

type TodoCheckboxProps = {
  todoId: number
  initialStatus: 'pending' | 'complete'
  userId: string
}

export function TodoCheckbox({ todoId, initialStatus, userId }: {todoId: number, initialStatus: 'pending' | 'complete', userId: string}) {
  const [isPending, startTransition] = useTransition()
  const [checked, setChecked] = React.useState(initialStatus === 'complete')

  const handleChange = (e:any) => {
    const newStatus = e.target.checked ? 'complete' : 'pending'
    setChecked(e.target.checked)

    startTransition(() => {
      updateStatus({ todoId: todoId, status: newStatus, userId })
    })
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      disabled={isPending}
    />
  )
}
