"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "@/lib/axios"
import { useTranslation } from "react-i18next"

export default function ChangePasswordPage() {
    const { t } = useTranslation()

    const [form, setForm] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post("/api/change-password", form)
            toast.success(t("change_password_success"))
            setForm({
                old_password: "",
                new_password: "",
                new_password_confirmation: ""
            })
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error(t("change_password_error"))
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-12 px-4">
            <div className="container mx-auto">
                <h2 className="text-2xl font-semibold text-zinc-800 mb-8 flex items-center gap-2 px-4">
                    <span>🔒</span> {t("change_password_title")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 px-4 max-w-2xl">
                    <div className="text-left">
                        <Label htmlFor="old_password">{t("old_password")}</Label>
                        <Input
                            id="old_password"
                            name="old_password"
                            type="password"
                            value={form.old_password}
                            onChange={handleChange}
                            className="bg-white"
                        />
                    </div>
                    <div className="text-left">
                        <Label htmlFor="new_password">{t("new_password")}</Label>
                        <Input
                            id="new_password"
                            name="new_password"
                            type="password"
                            value={form.new_password}
                            onChange={handleChange}
                            className="bg-white"
                        />
                    </div>
                    <div className="text-left">
                        <Label htmlFor="new_password_confirmation">{t("new_password_repeat")}</Label>
                        <Input
                            id="new_password_confirmation"
                            name="new_password_confirmation"
                            type="password"
                            value={form.new_password_confirmation}
                            onChange={handleChange}
                            className="bg-white"
                        />
                    </div>
                    <div className="text-left">
                        <Button type="submit" disabled={loading}>
                            {loading ? t("saving") : t("save_password")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
