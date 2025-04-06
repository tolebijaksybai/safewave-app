import { createContext, useContext, useEffect, useState } from "react"
import axios from "@/lib/axios"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))

    // Устанавливаем токен в axios
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            localStorage.setItem("token", token)
        } else {
            delete axios.defaults.headers.common["Authorization"]
            localStorage.removeItem("token")
        }
    }, [token])

    // Автоматическая загрузка пользователя при наличии токена
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/api/users/profile")
                setUser(data.data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            localStorage.setItem("token", token)
            fetchUser()
        } else {
            setLoading(false)
        }
    }, [token])

    const logout = async () => {
        try {
            await axios.post("/api/logout")
            toast.success(t("auth.logout_success"))
            // eslint-disable-next-line no-unused-vars
        } catch (_) {
            toast.error(t("auth.logout_error"))
        } finally {
            setToken(null)
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
