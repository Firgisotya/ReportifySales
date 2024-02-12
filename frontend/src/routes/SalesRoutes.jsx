import React from 'react'
import { Route, Routes } from "react-router-dom";
import IndexSales from '../pages/Sales/IndexSales';

const SalesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexSales />} />
    </Routes>
  )
}

export default SalesRoutes