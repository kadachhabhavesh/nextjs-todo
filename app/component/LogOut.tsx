'use client'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

function LogOut() {
  return (<FaSignOutAlt className='text-red-500 text-2xl cursor-pointer' onClick={()=>{ location.replace("/signin") }}/>)
}

export default LogOut
