import React from 'react'
import { Route, Routes } from "react-router-dom";
import IndexCustomer from '../pages/Customer/IndexCustomer';

const CustomerRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<IndexCustomer />} />
    </Routes>
  )
}

export default CustomerRoutes