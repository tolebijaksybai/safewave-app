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

export default function LoginPage() {
    const { setToken } = useAuth()
    const [form, setForm] = useState({
        email: "",
        password: ""
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
            const response = await axios.post("/api/login", form)
            const token = response.data.token
            setToken(token)
            toast.success("Logged in successfully!")
            setForm({ email: "", password: "" })
            navigate("/")
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Login failed. Please check your credentials.")
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
            {/* Left: Login form full width */}
            <div className="flex items-center justify-center p-6 bg-white relative">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-center">Log in to your account</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" className="rounded-lg" />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>

                    <Button variant="outline" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 rounded-lg">
                        <FcGoogle className="text-xl" /> Continue with Google
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>

            {/* Right background image + text */}
            <div
                className="hidden md:flex flex-col items-center justify-center bg-cover bg-center text-white p-8 text-center md:relative md:z-0"
                style={{ backgroundImage: "url('/images/bg-auth.png')" }}
            >
                <div className="max-w-sm px-4 md:px-0">
                    <p className="text-2xl sm:text-3xl font-bold leading-snug">
                        "Water safety is <span className='text-blue-300'>not an option</span>, it's a <span className='text-blue-300'>necessity.</span>"
                    </p>
                </div>
            </div>
        </div>
    )
}