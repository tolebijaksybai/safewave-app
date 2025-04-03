// File: src/components/GuestRoute.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function GuestRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return null // или можно Skeleton здесь
    }

    return user ? <Navigate to="/" replace /> : children
}