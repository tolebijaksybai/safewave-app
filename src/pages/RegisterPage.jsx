// File: src/pages/RegisterPage.jsx
import { useState } from "react"
import axios from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
    const { setToken } = useAuth()
    const [form, setForm] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post("/api/register", form)
            const token = response.data.token
            setToken(token)
            toast.success("Account created successfully!")
            setForm({ email: "", password: "", password_confirmation: "" })

            navigate("/")
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something went wrong. Please try again.")
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
                        "Water safety is <span className='text-blue-500'>not an option</span>, it's a <span className='text-blue-500'>necessity.</span>"
                    </p>
                </div>
            </div>

            {/* Right: registration form full width */}
            <div className="flex items-center justify-center p-6 bg-white relative">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center">Create an account</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="rounded-lg" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="rounded-lg" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input id="password_confirmation" type="password" value={form.password_confirmation} onChange={handleChange} placeholder="Confirm your password" className="rounded-lg" required />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                            {loading ? "Creating..." : "Create account"}
                        </Button>
                    </form>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 rounded-lg">
                        <FcGoogle className="text-xl" /> Continue with Google
                    </Button>
                    <p className="text-sm text-center text-gray-600">
                        Already Have An Account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
