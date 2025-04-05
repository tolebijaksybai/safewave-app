import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'
import MainLayout from '@/layouts/MainLayout'
import GuestRoute from '@/components/GuestRoute.jsx'
import ProtectedRoute from '@/components/ProtectedRoute'

const HomePage = lazy(() => import('@/pages/HomePage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))
const AuthCallbackPage = lazy(() => import('@/pages/AuthCallbackPage'))
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const ChangePasswordPage = lazy(() => import('@/pages/ChangePasswordPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const StatisticsPage = lazy(() => import('@/pages/StatisticsPage'))
const WatersByCategoryPage = lazy(() => import('@/pages/WatersByCategoryPage'))
const WaterDetailPage = lazy(() => import('@/pages/WaterDetailPage'))
const QuizPage = lazy(() => import('@/pages/QuizPage'))
const QuizPlayerPage = lazy(() => import('@/pages/QuizPlayerPage'))
const PrizePage = lazy(() => import('@/pages/PrizePage'))
const MapsPage = lazy(() => import('@/pages/MapsPage'))

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-6 h-6 border-2 border-dashed rounded-full animate-spin border-zinc-400"></div>
                </div>
            }>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/categories" element={<CategoriesPage/>}/>
                        <Route path="/categories/:categoryId/waters" element={<WatersByCategoryPage/>}/>
                        <Route path="/waters/:id" element={<WaterDetailPage/>}/>
                        <Route path="/auth/callback" element={<AuthCallbackPage/>}/>
                        <Route path="/help" element={<ContactPage/>}/>
                        <Route path="/statistics" element={<StatisticsPage/>}/>

                        <Route path="/quizzes" element={<QuizPage/>}/>
                        <Route path="/quizzes/:quizId" element={<QuizPlayerPage/>}/>
                        <Route path="/quizzes/:quizId/prize" element={<PrizePage/>}/>

                        <Route path="/maps" element={<MapsPage />} />

                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <LoginPage/>
                                </GuestRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <RegisterPage/>
                                </GuestRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/change-password"
                            element={
                                <ProtectedRoute>
                                    <ChangePasswordPage/>
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
