'use client'

import { createUser } from '../actions/createUser' // your server action
import { useState } from 'react'

export default function SignupPage() {
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    try {
      await createUser(formData)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-mono">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-900">Create an account</h2>
          <p className="text-sm text-gray-600">Start your journey with us</p>
        </div>

        <form action={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1 relative">
              <input
                name="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-black"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-black"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md shadow"
            >
              <span className="mr-2">➜</span> Sign Up
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <div className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-indigo-600 hover:text-indigo-500 font-semibold">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}
