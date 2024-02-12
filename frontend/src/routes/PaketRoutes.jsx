import React from 'react'
import { Route, Routes } from "react-router-dom";
import IndexPaket from '../pages/Paket/IndexPaket';

const PaketRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<IndexPaket />} />
    </Routes>
  )
}

export default PaketRoutes