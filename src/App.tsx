// import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Leaderboard from "./pages/main/LeaderBoard/Leaderboard";
import { LoginPage } from "./pages/main/Login/Login";
import { CallbackPage } from "./pages/layout/Callback";
import AuthLayout from "./pages/layout/AuthLayout";
import Home from "./pages/main/home/Home";
import PlayGame from "./pages/main/PlayGame/PlayGamePage";
import { AlertProvider } from './contexts/AlertProvider';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/playGame" element={<PlayGame />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="callback" element={<CallbackPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
