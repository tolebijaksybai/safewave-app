import { useState } from "react"
import axios from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { FcGoogle } from "react-icons/fc"
import { API_BASE_URL } from "@/lib/constants"
import { useTranslation } from "react-i18next"

export default function LoginPage() {
    const { t } = useTranslation()
    const { setToken } = useAuth()
    const [form, setForm] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("/api/login", form)
            const token = response.data.token
            setToken(token)
            toast.success(t("auth_login.success"))
            setForm({ email: "", password: "" })
            navigate("/")
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error(t("auth_login.failed"))
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/api/auth/google`
    }

    return (
        <div className="min-h-[calc(100vh-70px)] grid grid-cols-1 md:grid-cols-2">
            {/* Form */}
            <div className="flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center">
                        {t("auth_login.title")}
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("auth_login.email")}</Label>
                            <Input
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder={t("auth_login.email_placeholder")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{t("auth_login.password")}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder={t("auth_login.password_placeholder")}
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? t("auth_login.logging_in") : t("auth_login.button")}
                        </Button>
                    </form>

                    <Button variant="outline" onClick={handleGoogleLogin} className="w-full flex items-center gap-2">
                        <FcGoogle className="text-xl" />
                        {t("auth_login.google")}
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        {t("auth_login.no_account")}{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            {t("auth_login.signup")}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Background image and motto */}
            <div
                className="hidden md:flex flex-col items-center justify-center bg-cover bg-center text-white p-8 text-center"
                style={{ backgroundImage: "url('/images/bg-auth.png')" }}
            >
                <div className="max-w-sm">
                    <p className="text-2xl sm:text-3xl font-bold leading-snug">
                        {t("auth_login.motto_part1")}{" "}
                        <span className="text-blue-300">{t("auth_login.motto_emphasis1")}</span>,{" "}
                        {t("auth_login.motto_part2")}{" "}
                        <span className="text-blue-300">{t("auth_login.motto_emphasis2")}</span>.
                    </p>
                </div>
            </div>
        </div>
    )
}
