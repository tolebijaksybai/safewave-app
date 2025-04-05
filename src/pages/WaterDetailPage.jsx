import {useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "@/lib/axios"
import {Button} from "@/components/ui/button"

export default function WaterDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [water, setWater] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/waters/${id}`)
            .then(res => setWater(res.data))
            .catch(err => console.error("Error fetching water:", err))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>
    }

    if (!water) {
        return <p className="text-center text-red-500 mt-10">Water not found</p>
    }

    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-10 px-4">
            <div className="container mx-auto max-w-4xl">
                <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
                    ← Back
                </Button>

                <h2 className="text-2xl font-bold text-center mb-6">{water.name}</h2>

                {water.images_urls?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {water.images_urls.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`image-${idx}`}
                                className="rounded-xl object-cover w-full h-48"
                            />
                        ))}
                    </div>
                )}

                <p className="text-sm text-zinc-500 mb-4">{water.address}</p>

                {water.content && (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: water.content}}/>
                )}

                <div className="mt-10">
                    <iframe
                        title="Google Maps"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(water.location)}&z=14&output=embed`}
                        className="w-full h-80 rounded-xl border"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    )
}
