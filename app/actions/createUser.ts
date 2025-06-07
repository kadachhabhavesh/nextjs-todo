'use server'    
import { PrismaClient } from '../generated/prisma'
import { redirect } from 'next/navigation'

export async function createUser(formData: FormData) {
  const username = formData.get('username')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (!username || !password) {
    throw new Error('All fields are required')
  }

  const prisma = new PrismaClient()


  var user = await prisma.users.create({
    data: {
      UserName: username,
      Password: password,
    },
    })

    redirect('/home/'+user.UserID) // or redirect to login page
  }
