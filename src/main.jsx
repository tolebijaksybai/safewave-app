// File: src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/index.css"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
            <Toaster richColors position="top-right" />
        </AuthProvider>
    </React.StrictMode>
)