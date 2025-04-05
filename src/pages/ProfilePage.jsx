import {useEffect, useState, useRef} from "react"
import axios from "@/lib/axios"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useAuth} from "@/context/AuthContext"
import {toast} from "sonner"
import countriesData from "@/data/countries.json"
import citiesData from "@/data/cities.json"
import SelectCombobox from "@/components/SelectCombobox.jsx";

export default function ProfilePage() {
    const {user, setUser} = useAuth()
    const [form, setForm] = useState({
        name: "",
        nickname: "",
        gender: "",
        country: "",
        city: "",
        language: "",
        email: "",
        photo: null,
    })
    const [editing, setEditing] = useState(false)
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [photoPreview, setPhotoPreview] = useState(null)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                nickname: user.nickname || "",
                gender: user.gender || "",
                country: user.country || "",
                city: user.city || "",
                language: user.language || "",
                email: user.email || "",
                photo: null,
            })
            setPhotoPreview(user.photo ? user.photo_url : null)
        }
    }, [user])

    useEffect(() => {
        setCountries(countriesData)
    }, [])

    useEffect(() => {
        if (form.country) {
            const filteredCities = citiesData
                .filter(city => city.country_code === countriesData.find(c => c.name === form.country)?.iso2)
                .map(city => ({ name: city.name }))
            setCities(filteredCities)
        }
    }, [form.country])

    const handleChange = (e) => {
        const {id, value} = e.target
        setForm(prev => ({...prev, [id]: value}))
    }

    const handleSelect = (field, value) => {
        setForm(prev => ({...prev, [field]: value}))
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setForm(prev => ({...prev, photo: file}))
            setPhotoPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        Object.entries(form).forEach(([key, val]) => {
            if (val !== null) formData.append(key, val)
        })

        try {
            const {data} = await axios.post("/api/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "X-HTTP-Method-Override": "PUT"
                }
            })
            toast.success("Profile updated!")
            if (data.user) {
                setUser(data.user)
            }
            setEditing(false)
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Failed to update profile")
        }
    }

    const userInitial = user?.email?.[0]?.toUpperCase() ?? "U"

    const triggerFileInput = () => {
        if (editing) fileInputRef.current?.click()
    }

    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-12 px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-6 px-4">
                    <div className="flex items-center gap-4">
                        <div onClick={triggerFileInput} className="cursor-pointer relative">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Avatar" className="h-16 w-16 rounded-full object-cover"/>
                            ) : (
                                <div
                                    className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-lg">
                                    {userInitial}
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                disabled={!editing}
                                className="hidden"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-zinc-900">{form.name || "Your Name"}</h3>
                            <p className="text-sm text-zinc-600">{form.email}</p>
                        </div>
                    </div>
                    <Button onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit"}</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input id="name" className="bg-white" value={form.name} onChange={handleChange}
                               disabled={!editing}/>
                    </div>
                    <div>
                        <Label>Nick Name</Label>
                        <Input id="nickname" className="bg-white" value={form.nickname} onChange={handleChange}
                               disabled={!editing}/>
                    </div>
                    <div>
                        <Label>Gender</Label>
                        <Select value={form.gender} onValueChange={(val) => handleSelect("gender", val)}
                                disabled={!editing}>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select gender"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Country</Label>
                        <SelectCombobox
                            items={countries}
                            value={form.country}
                            onChange={(val) => handleSelect("country", val)}
                            disabled={!editing}
                        />
                    </div>
                    <div>
                        <Label>Language</Label>
                        <Select value={form.language} onValueChange={(val) => handleSelect("language", val)}
                                disabled={!editing}>
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Select language"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="kazakh">Kazakh</SelectItem>
                                <SelectItem value="russian">Russian</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>City</Label>
                        <SelectCombobox
                            items={cities}
                            value={form.city}
                            onChange={(val) => handleSelect("city", val)}
                            disabled={!editing}
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input id="email" className="bg-white" value={form.email} onChange={handleChange}
                               disabled={!editing}/>
                    </div>
                    {editing && (
                        <div className="md:col-span-2 text-right">
                            <Button onClick={handleSubmit}>Save Changes</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
