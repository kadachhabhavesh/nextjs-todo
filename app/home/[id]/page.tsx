// app/page.tsx
import { PrismaClient } from '@/app/generated/prisma'
import { addTask } from '@/app/actions/addTask'
import { FaUser, FaFilter } from 'react-icons/fa'
import { TodoItem } from '@/app/component/TodoItem'
import LogOut from '@/app/component/LogOut'

export default async function Home({ params }: { params: { id: string } }) {
  const prisma = new PrismaClient()
  const user = await prisma.users.findFirst({
    where: { UserID: parseInt(params.id) },
  })
  const todos = await prisma.todos.findMany({
    where: { userId: parseInt(params.id) },
    orderBy: { created_at: 'desc' },
  })

  return (
    <main className="min-h-screen bg-[#f0f1f3] font-sans flex flex-col items-center pb-10">
      <header className="w-full bg-white px-20 py-5 flex justify-between items-center mb-8 sticky top-0 shadow-md">
        <h1 className="text-2xl font-bold">Todos</h1>
       <div className='flex items-center space-x-4'>
         <div className="flex items-center space-x-2">
          <FaUser />
          <span>{user?.UserName}</span>
        </div>
        <LogOut />
        </div>
      </header>

      <section className="bg-white shadow-md p-6 rounded-xl mb-6 w-[60vw]">
        <h2 className="text-xl font-semibold mb-4">+ Add new task</h2>
        <form action={addTask} className="flex flex-col gap-4">
          <input type="hidden" value={params.id} name="userId" />
          <input
            type="text"
            name="title"
            placeholder="What needs to be done?"
            className="border px-4 py-2 rounded-md"
            required
          />
          <textarea
            name="description"
            placeholder="Enter task description..."
            className="border px-4 py-2 rounded-md resize-none"
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        </form>
      </section>

      {/* <section className="bg-white shadow-md p-4 rounded-xl flex items-center justify-between mb-6 w-[60vw]">
        <div className="flex items-center gap-4">
          <FaFilter />
          <button className="bg-black text-white px-3 py-1 rounded-md">
            All
          </button>
          <button className="text-gray-700">Pending</button>
          <button className="text-gray-700">Completed</button>
        </div>
      </section> */}

      <section className="bg-white shadow-md p-6 rounded-xl w-[60vw]">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Tasks</h2>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
            {todos.length} tasks
          </span>
        </div>
        <ul>
          {todos.length === 0 && (
            <li className="text-gray-500 text-center py-4">
              No tasks found.</li>)}
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} userId={params.id} />
          ))}
        </ul>
      </section>
    </main>
  )
}
