import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function WatersByCategoryPage() {
    const { categoryId } = useParams()
    const [waters, setWaters] = useState([])
    const [categoryName, setCategoryName] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWaters = async () => {
            try {
                const response = await axios.get("/api/waters", {
                    params: { category_id: categoryId }
                })
                setWaters(response.data)
                if (response.data.length > 0) {
                    setCategoryName(response.data[0].category?.name || "")
                }
            } catch (error) {
                console.error("Failed to fetch waters:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchWaters()
    }, [categoryId])

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[url('/images/bg-water.jpg')] bg-cover bg-center py-12 px-4">
            <div className="container mx-auto">
                <div className="container mx-auto max-w-6xl">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-700 border-zinc-300 hover:bg-zinc-100"
                    >
                        ← Back
                    </Button>

                    <h2 className="text-center text-3xl font-bold text-zinc-900 mb-10 uppercase">
                        {categoryName ? `The ${categoryName}` : "Loading..."}
                    </h2>
                </div>

                {loading ? (
                    <p className="text-center text-zinc-500">Loading waters...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {waters.map(water => (
                            <div
                                key={water.id}
                                className="flex bg-white rounded-xl shadow-md overflow-hidden"
                            >
                                <img
                                    src={water.main_image_url}
                                    alt={water.name}
                                    className="h-40 w-40 object-cover flex-shrink-0"
                                />
                                <div className="p-4 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-md text-zinc-900 mb-1">
                                            {water.name}
                                        </h3>
                                        <p className="text-sm text-purple-600 mb-2">
                                            {water.address}
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="w-fit bg-blue-700 hover:bg-blue-800 text-white"
                                        onClick={() => navigate(`/waters/${water.id}`)}
                                    >
                                        Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
