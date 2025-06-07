'use server'    
import { PrismaClient } from '../generated/prisma'
import { redirect } from 'next/navigation'

export async function addTask(formData: FormData) {
  const title = formData.get('title')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const userId = formData.get('userId')?.toString() || ''

  if (!title || !description) {
    throw new Error('All fields are required')
  }

  const prisma = new PrismaClient()


  await prisma.todos.create({
    data: {
      title,
      description,
      status: 'pending', 
      userId: parseInt(formData.get('userId')?.toString() || '0'),
    },
  })

  redirect('/home/'+userId) // or redirect to login page
}
