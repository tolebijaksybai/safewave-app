// File: src/pages/AuthCallbackPage.jsx
import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"

export default function AuthCallbackPage() {
    const [searchParams] = useSearchParams()
    const { setToken } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            setToken(token)
            toast.success("Logged in with Google!")
            navigate("/")
        } else {
            toast.error("Google login failed!")
            navigate("/login")
        }
    }, [searchParams, setToken, navigate])

    return <p className="text-center mt-10">Logging in...</p>
}
