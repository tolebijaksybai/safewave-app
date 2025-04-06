"use client"

import {useEffect, useRef, useState, useCallback} from "react"
import {useTranslation} from "react-i18next"
import "ol/ol.css"
import Map from "ol/Map"
import View from "ol/View"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import {fromLonLat, toLonLat} from "ol/proj"
import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import {Style, Stroke, Fill, Circle as CircleStyle} from "ol/style"
import Select from "ol/interaction/Select"
import {click} from "ol/events/condition"
import axios from "@/lib/axios"
import {toast} from "sonner"
import {Button} from "@/components/ui/button"
import SelectWaterCombobox from "@/components/SelectWaterCombobox"
import {useAuth} from "@/context/AuthContext"

export default function MapsPage() {
    const {t} = useTranslation()
    const mapRef = useRef(null)
    const mapInstanceRef = useRef(null)
    const sourceRef = useRef(new VectorSource())

    const [mode, setMode] = useState("view")
    const [addingPoint, setAddingPoint] = useState(false)
    const [waters, setWaters] = useState([])
    const [selectedFeature, setSelectedFeature] = useState(null)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editWaterId, setEditWaterId] = useState("")
    const [infoSidebarOpen, setInfoSidebarOpen] = useState(false)
    const [selectedWater, setSelectedWater] = useState(null)

    const modeRef = useRef(mode)
    const addingPointRef = useRef(addingPoint)

    const {user} = useAuth()
    const isAdmin = user?.roles?.some(role => role.name === "admin")

    useEffect(() => {
        modeRef.current = mode
    }, [mode])

    useEffect(() => {
        addingPointRef.current = addingPoint
    }, [addingPoint])

    const openInfoSidebar = useCallback((feature) => {
        const waterId = feature.get("water_id")
        const water = waters.find(w => w.id === waterId)
        if (water) {
            setSelectedWater(water)
            setInfoSidebarOpen(true)
        }
    }, [waters])

    useEffect(() => {
        axios.get("/api/getWaters").then(res => setWaters(res.data))
    }, [])

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return

        const tileLayer = new TileLayer({
            source: new XYZ({
                urls: [
                    "https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                    "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                    "https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                    "https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
                ],
            }),
        })

        const vectorLayer = new VectorLayer({
            source: sourceRef.current,
            style: new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({color: "#f97316"}),
                    stroke: new Stroke({color: "#000", width: 1}),
                }),
            }),
        })

        const map = new Map({
            target: mapRef.current,
            layers: [tileLayer, vectorLayer],
            view: new View({
                center: fromLonLat([66.9237, 48.3596]),
                zoom: 5.6,
            }),
        })

        map.on("pointermove", () => {
            const el = map.getTargetElement()
            if (el) el.style.cursor = modeRef.current === "edit" && addingPointRef.current ? "crosshair" : "default"
        })

        map.on("click", (e) => {
            if (modeRef.current === "edit" && addingPointRef.current && !editModalOpen) {
                const newFeature = new Feature({geometry: new Point(e.coordinate)})
                sourceRef.current.addFeature(newFeature)
                setSelectedFeature(newFeature)
                setEditModalOpen(true)
                setAddingPoint(false)
            }
        })

        axios.get("/api/map-points").then(res => {
            res.data.forEach(p => {
                const f = new Feature({
                    geometry: new Point(fromLonLat([+p.longitude, +p.latitude])),
                    water_id: p.water_id,
                    id: p.id,
                })
                sourceRef.current.addFeature(f)
            })
        })

        mapInstanceRef.current = map
    }, [])

    useEffect(() => {
        if (!mapInstanceRef.current) return
        const map = mapInstanceRef.current
        const select = new Select({condition: click})
        map.addInteraction(select)

        select.on("select", (e) => {
            const feature = e.selected[0]
            if (!feature) return

            if (modeRef.current === "edit") {
                setSelectedFeature(feature)
                setEditWaterId(feature.get("water_id")?.toString() || "")
                setEditModalOpen(true)
            } else {
                openInfoSidebar(feature)
            }
        })

        return () => map.removeInteraction(select)
    }, [openInfoSidebar])

    const saveFeature = async () => {
        if (!selectedFeature || !editWaterId) return

        const coords = toLonLat(selectedFeature.getGeometry().getCoordinates())
        const payload = {
            water_id: editWaterId,
            latitude: coords[1],
            longitude: coords[0],
        }

        try {
            if (selectedFeature.get("id")) {
                await axios.put(`/api/map-points/${selectedFeature.get("id")}`, payload)
                toast.success(t("point_updated"))
            } else {
                const {data} = await axios.post("/api/map-points", payload)
                selectedFeature.set("id", data.id)
                toast.success(t("point_saved"))
            }
            selectedFeature.set("water_id", editWaterId)
        } catch (e) {
            toast.error(t("error_saving_point"))
        }

        setEditModalOpen(false)
        setSelectedFeature(null)
    }

    const deleteFeature = async () => {
        if (!selectedFeature || !selectedFeature.get("id")) return
        await axios.delete(`/api/map-points/${selectedFeature.get("id")}`)
        sourceRef.current.removeFeature(selectedFeature)
        setEditModalOpen(false)
        setSelectedFeature(null)
        toast.success(t("point_deleted"))
    }

    const isWaterUsed = (waterId) =>
        sourceRef.current.getFeatures().some(f =>
            f.get("water_id")?.toString() === String(waterId) &&
            f !== selectedFeature
        )

    return (
        <div className="min-h-[calc(100vh-70px)] p-4 relative">
            {isAdmin && (
                <div className="absolute top-7 left-14 z-10 flex gap-2">
                    <Button onClick={() => setMode(prev => prev === "view" ? "edit" : "view")}>
                        {mode === "view" ? t("switch_to_edit") : t("switch_to_view")}
                    </Button>
                    {mode === "edit" && (
                        <Button
                            variant={addingPoint ? "destructive" : "default"}
                            onClick={() => setAddingPoint(prev => !prev)}
                        >
                            {addingPoint ? t("cancel_add") : t("add_point")}
                        </Button>
                    )}
                </div>
            )}

            <div ref={mapRef} className="w-full h-[88vh] rounded-lg border"/>

            {infoSidebarOpen && selectedWater && (
                <div className="absolute top-5 right-5 z-20 h-[86vh] w-full max-w-md bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{selectedWater.name}</h3>
                        <Button variant="ghost" onClick={() => setInfoSidebarOpen(false)}>✕</Button>
                    </div>
                    <div className="text-sm space-y-2">
                        <p><strong>{t("address")}:</strong> {selectedWater.address}</p>
                        {selectedWater.content && (
                            <div
                                className="prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{__html: selectedWater.content}}
                            />
                        )}
                        {selectedWater.images_urls?.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-6">
                                {selectedWater.images_urls.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`image-${idx}`}
                                        className="rounded-xl object-cover w-full h-48"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div
                    className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow max-w-sm w-full">
                    <h3 className="text-lg font-semibold mb-2">{t("edit_point")}</h3>
                    <label className="block text-sm mb-1">{t("water")}</label>

                    <SelectWaterCombobox
                        value={editWaterId}
                        onChange={setEditWaterId}
                        items={waters.map(w => ({
                            id: w.id,
                            name: w.name,
                            disabled: isWaterUsed(w.id) && String(w.id) !== editWaterId,
                        }))}
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => {
                            setEditModalOpen(false)
                            setSelectedFeature(null)
                        }}>{t("cancel")}</Button>
                        {selectedFeature?.get("id") && (
                            <Button variant="destructive" onClick={deleteFeature}>{t("delete")}</Button>
                        )}
                        <Button onClick={saveFeature}>{t("save")}</Button>
                    </div>
                </div>
            )}
        </div>
    )
}
