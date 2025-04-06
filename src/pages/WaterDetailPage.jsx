"use client"

import {useEffect, useRef, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "@/lib/axios"
import {Button} from "@/components/ui/button"

import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import {fromLonLat} from "ol/proj"
import {Style, Fill, Stroke, Circle as CircleStyle} from "ol/style"
import Overlay from "ol/Overlay"
import XYZ from "ol/source/XYZ"

export default function WaterDetailPage() {
    const {id} = useParams()
    const navigate = useNavigate()

    const mapRef = useRef(null)
    const popupRef = useRef(null)
    // Сохраняем ссылку на экземпляр карты, чтобы можно было управлять вьюшкой
    const mapInstanceRef = useRef(null)

    const [water, setWater] = useState(null)
    const [point, setPoint] = useState(null)
    const [loading, setLoading] = useState(true)

    // Загружаем инфо о воде
    useEffect(() => {
        axios.get(`/api/waters/${id}`)
            .then(res => setWater(res.data))
            .catch(err => console.error("Error fetching water:", err))
    }, [id])

    // Загружаем точку по water_id
    useEffect(() => {
        axios.get(`/api/map-points/by-water/${id}`)
            .then(res => setPoint(res.data))
            .catch(() => setPoint(null))
            .finally(() => setLoading(false))
    }, [id])

    // Инициализируем карту один раз при маунте
    useEffect(() => {
        if (!mapRef.current || !point) return

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        urls: [
                            "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                            "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                            "https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                            "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                        ],
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat([+point.longitude, +point.latitude]),
                zoom: 14,
            }),
        })

        const feature = new Feature({
            geometry: new Point(fromLonLat([+point.longitude, +point.latitude])),
        })

        feature.setStyle(new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({ color: "#f97316" }),
                stroke: new Stroke({ color: "#000", width: 1 }),
            }),
        }))

        const vectorLayer = new VectorLayer({
            source: new VectorSource({ features: [feature] }),
        })

        map.addLayer(vectorLayer)

        const popup = new Overlay({
            element: popupRef.current,
            positioning: "bottom-center",
            stopEvent: false,
            offset: [0, -10],
        })

        map.addOverlay(popup)

        map.on("click", (e) => {
            popup.setPosition(undefined)
            map.forEachFeatureAtPixel(e.pixel, () => {
                popup.setPosition(e.coordinate)
            })
        })

        // 💥 Самое важное: обновляем размеры когда DOM точно готов
        setTimeout(() => {
            map.updateSize()
        }, 300)

        mapInstanceRef.current = map

        return () => {
            map.setTarget(null)
        }
    }, [point])

    // Когда у нас уже есть данные о точке, добавляем фичу на карту
    useEffect(() => {
        if (!point || !point.longitude || !point.latitude) return
        if (!mapInstanceRef.current) return

        const map = mapInstanceRef.current

        // Создаём слой под точку
        const feature = new Feature({
            geometry: new Point(fromLonLat([+point.longitude, +point.latitude])),
        })

        feature.setStyle(new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({color: "#f97316"}),
                stroke: new Stroke({color: "#000", width: 1}),
            }),
        }))

        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: [feature],
            }),
        })

        map.addLayer(vectorLayer)

        // Плавный переход к координатам воды
        map.getView().animate({
            center: fromLonLat([point.longitude, point.latitude]),
            zoom: 7,
            duration: 800, // миллисекунды
        })

        // Обработка клика: показываем/скрываем попап
        map.on("click", (e) => {
            const popup = map.getOverlays().item(0) // у нас один оверлей
            popup.setPosition(undefined)
            map.forEachFeatureAtPixel(e.pixel, () => {
                popup.setPosition(e.coordinate)
            })
        })
    }, [point])

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
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: water.content}} />
                )}

                {point && point.latitude && point.longitude && (
                    <div className="mt-10 relative h-[600px] w-full rounded-xl border">
                        <div
                            ref={mapRef}
                            className="absolute inset-0 z-0"
                            style={{height: "100%", width: "100%"}}
                        />
                        <div
                            ref={popupRef}
                            className="z-10 bg-white border text-sm rounded px-3 py-1 shadow absolute"
                        >
                            {water.name}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
