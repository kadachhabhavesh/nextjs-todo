'use server'    
import { PrismaClient } from '../generated/prisma'
import { redirect } from 'next/navigation'

export async function loginUser(formData: FormData) {
  const username = formData.get('username')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (!username || !password) {
    throw new Error('All fields are required')  
  }

  const prisma = new PrismaClient()

  var user = await prisma.users.findFirst({
    where: {
      UserName: username
    },
  })  
  console.log(user,20)

  redirect('/home/'+user?.UserID) 
}
