import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import Login from "./components/Ath/Login.jsx";
import Register from "./components/Ath/Register.jsx";
import ProtectedRoute from "./components/Ath/ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <PlayerContextProvider>
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
            </PlayerContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
