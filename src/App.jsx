import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
const Chat = React.lazy(() => import("./pages/chat-page/Chat"));
const SignUp = React.lazy(() => import("./pages/auth/signup/SignUp"));
const Login = React.lazy(() => import("./pages/auth/login/Login"));

function App() {
  const isLoggedIn = localStorage.getItem("userDetails");
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<SignUp />} />

      {/* Protected Route */}
      <Route
        path="/"
        element={isLoggedIn ? <Chat /> : <Navigate to="/auth/login" />}
      />
    </Routes>
  );
}

export default App;
