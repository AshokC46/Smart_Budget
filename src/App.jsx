import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/transactions"
          element={
            user ? (
              <Layout>
                <Transactions />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/goals"
          element={
            user ? (
              <Layout>
                <Goals />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/reports"
          element={
            user ? (
              <Layout>
                <Reports />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
