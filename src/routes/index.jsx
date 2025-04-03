import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import AuthCallbackPage from "@/pages/AuthCallbackPage"
import GuestRoute from "@/components/GuestRoute.jsx";
import CategoriesPage from "@/pages/CategoriesPage"

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/auth/callback" element={<AuthCallbackPage />} />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <RegisterPage />
                            </GuestRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
