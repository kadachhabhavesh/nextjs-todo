import React from 'react'
import { PrismaClient } from '../generated/prisma'
import Link from 'next/link'

async function Home() {

    const prisma = new PrismaClient()
    const users = await prisma.users.findMany()

  return (
    <div>
      Please <Link href="/signin">login</Link>. 
    </div>
  )
}

export default Home
