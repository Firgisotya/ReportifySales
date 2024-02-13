import React from 'react'
import { Route, Routes } from "react-router-dom";
import IndexSalesTransaction from '../pages/SalesTransaction/IndexSalesTransaction';
import ExportSalesTransaction from '../pages/Export/ExportSalesTransaction';

const TransactionRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<IndexSalesTransaction />} />
        <Route path="export" element={<ExportSalesTransaction />} />
    </Routes>
  )
}

export default TransactionRoute