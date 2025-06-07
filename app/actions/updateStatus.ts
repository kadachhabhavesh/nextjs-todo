// app/actions/updateStatus.ts
'use server'

import { PrismaClient } from '@/app/generated/prisma'

const prisma = new PrismaClient()

export async function updateStatus({
  todoId,
  status,
  userId,
}: {
  todoId: number
  status: 'pending' | 'complete'
  userId: string
}) {
  try {
    await prisma.todos.update({
      where: {
        id: todoId,
        userId: parseInt(userId),
      },
      data: {
        status: status,
      },
    })
  } catch (error) {
    console.error('Error updating status:', error)
    throw error
  }
}
