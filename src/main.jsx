import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import PlayerContextProvider from "./context/PlayerContext.jsx";
import Login from "./pages/Ath/Login.jsx";
import Register from "./pages/Ath/Register.jsx";
import ProtectedRoute from "./pages/Ath/ProtectedRoute.jsx";
import UserContextProvider from "./context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <PlayerContextProvider>
                <UserContextProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Bảo vệ App */}
                        <Route
                            path="*"
                            element={
                                <ProtectedRoute>
                                    <App />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </UserContextProvider>
            </PlayerContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
