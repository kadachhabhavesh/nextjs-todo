'use server'

import { PrismaClient } from '@/app/generated/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function deleteTask(formData:FormData) {
   const taskId = formData.get('taskId')?.toString() || ''
    const userId = formData.get('userId')?.toString() || ''
    try {
    await prisma.todos.delete({
      where: { id: parseInt(taskId) },
    })
  } catch (error) {
    console.error('Delete failed:', error)
  }
  revalidatePath('/home/' + userId) // Revalidate the path to update the UI
  redirect('/home/'+userId) // Redirect to the home page after deletion
}
