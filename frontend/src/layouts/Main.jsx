import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Main = ({children}) => {
  return (
    <>
        <Navbar />
        <Sidebar />

        <div class="p-4 mt-16 sm:ml-64">
            {children}
        </div>
    </>
  )
}

export default Main