import React from 'react'
import { Route, Routes } from "react-router-dom";
import IndexUser from '../pages/User/IndexUser';

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<IndexUser />} />
    </Routes>
  )
}

export default UserRoutes