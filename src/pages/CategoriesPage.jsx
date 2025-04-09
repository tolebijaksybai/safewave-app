import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function CategoriesPage() {
    const { t } = useTranslation()
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/api/categories")
            .then(response => setCategories(response.data))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false))
    }, [])

    const handleClick = (categoryId) => {
        navigate(`/categories/${categoryId}/waters`)
    }

    return (
        // <div className="min-h-[calc(100vh-70px)] bg-gradient-to-br from-blue-100 to-blue-200 py-12 px-4">
        <div className="min-h-[calc(100vh-70px)] bg-[url('/images/bg-category.png')] bg-cover bg-center py-12 px-4">
            <h2 className="text-center text-3xl font-bold text-zinc-900 mb-10">{t("categories_title")}</h2>
            {loading ? (
                <p className="text-center text-zinc-500">{t("loading")}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            onClick={() => handleClick(category.id)}
                            className="bg-blue-800 text-white text-center rounded-xl p-6 py-20 font-semibold text-lg hover:bg-blue-900 transition cursor-pointer"
                        >
                            {category.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
