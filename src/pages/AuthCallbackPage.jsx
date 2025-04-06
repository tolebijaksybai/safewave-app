import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

export default function AuthCallbackPage() {
    const [searchParams] = useSearchParams()
    const { setToken } = useAuth()
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            setToken(token)
            toast.success(t("auth_callback.success"))
            navigate("/")
        } else {
            toast.error(t("auth_callback.error"))
            navigate("/login")
        }
    }, [searchParams, setToken, navigate, t])

    return <p className="text-center mt-10">{t("auth_callback.logging_in")}</p>
}