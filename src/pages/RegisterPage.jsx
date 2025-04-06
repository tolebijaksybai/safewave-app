"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { useTranslation, Trans } from "react-i18next"

export default function RegisterPage() {
    const { t } = useTranslation()
    const { setToken } = useAuth()
    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("/api/register", form)
            const token = response.data.token
            setToken(token)
            toast.success(t("register.success"))
            setForm({ email: "", password: "", password_confirmation: "" })
            navigate("/")
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error(t("register.error"))
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-70px)] grid grid-cols-1 md:grid-cols-2">
            {/* Left background image + text */}
            <div
                className="hidden md:flex flex-col items-center justify-center bg-cover bg-center text-white p-8 text-center md:relative md:z-0"
                style={{ backgroundImage: "url('/images/bg-auth.png')" }}
            >
                <div className="max-w-sm px-4 md:px-0">
                    <p className="text-2xl sm:text-3xl font-bold leading-snug">
                        <Trans i18nKey="register.quote" components={{
                            1: <span className="text-blue-500" />,
                            3: <span className="text-blue-500" />
                        }} />
                    </p>
                </div>
            </div>

            {/* Right: registration form full width */}
            <div className="flex items-center justify-center p-6 bg-white relative">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center">
                        {t("register.title")}
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("register.email")}</Label>
                            <Input
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder={t("register.placeholder_email")}
                                className="rounded-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t("register.password")}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder={t("register.placeholder_password")}
                                className="rounded-lg"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">{t("register.confirm_password")}</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder={t("register.placeholder_confirm_password")}
                                className="rounded-lg"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            {loading ? t("register.creating") : t("register.create_button")}
                        </Button>
                    </form>

                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 rounded-lg"
                    >
                        <FcGoogle className="text-xl" /> {t("register.google")}
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        {t("register.already")}{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            {t("register.login_link")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
