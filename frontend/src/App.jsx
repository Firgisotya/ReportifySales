import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Loader from "./utils/loader/Loader";
import ProtectedRoute from "./helper/ProtectedRoute";
import SignIn from "./pages/Auth/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";
import Main from "./layouts/Main";
import UserRoutes from "./routes/UserRoutes";
import PaketRoutes from "./routes/PaketRoutes";
import SalesRoutes from "./routes/SalesRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route
              path=""
              element={
                <Main>
                  <Dashboard />
                </Main>
              }
            />

            <Route
              path="users"
              element={
                <Main>
                  <UserRoutes />
                </Main>
              }
            />

            <Route
              path="paket"
              element={
                <Main>
                  <PaketRoutes />
                </Main>
              }
            />

            <Route
              path="sales"
              element={
                <Main>
                  <SalesRoutes />
                </Main>
              }
            />

            <Route
              path="customers"
              element={
                <Main>
                  <CustomerRoutes />
                </Main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
