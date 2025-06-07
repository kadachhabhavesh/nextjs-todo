'use server'

import { PrismaClient } from '@/app/generated/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/dist/server/api-utils'

const prisma = new PrismaClient()

export async function editTask(formData: FormData) {
  const taskId = Number(formData.get('taskId'))
  const title = formData.get('title')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const userId = Number(formData.get('userId')) // You may pass this too if needed

  if (!taskId || !title || !description) return

  await prisma.todos.update({
    where: { id: taskId },
    data: { title, description },
  })

  // Revalidate the user's home path
  revalidatePath(`/home/${userId}`)

}
