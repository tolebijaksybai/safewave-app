import {useState} from "react"
import {Link, NavLink} from "react-router-dom"
import {Button} from "@/components/ui/button"
import {useAuth} from "@/context/AuthContext"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Skeleton} from "@/components/ui/skeleton"
import {useTranslation} from "react-i18next"
import i18n from "@/i18n"
import {X} from "lucide-react"

export default function Header() {
    const {t} = useTranslation()
    const {user, logout, loading} = useAuth()
    const userInitial = user?.email?.[0]?.toUpperCase() ?? "U"
    const avatarSrc = user?.photo_url ? user.photo_url : undefined
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        {to: "/", label: t("home")},
        {to: "/categories", label: t("categories")},
        {to: "/maps", label: t("map")},
        {href: "/#information", label: t("information")},
        {to: "/help", label: t("contacts")},
        {to: "/quizzes", label: t("quiz")},
    ]

    return (
        <header className="bg-white border-b shadow-sm h-[70px] relative z-50">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Mobile burger */}
                <button
                    className="md:hidden text-2xl text-zinc-900 mr-2"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    ☰
                </button>

                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="SafeWave Logo" className="h-14 w-auto"/>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-8 text-md text-zinc-950">
                    {navItems.map((item) =>
                        item.href ? (
                            <a
                                key={item.href}
                                href={item.href}
                                className="pb-1 border-b-2 border-transparent hover:border-zinc-950 transition-colors duration-200"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({isActive}) =>
                                    `pb-1 border-b-2 ${
                                        isActive
                                            ? "border-zinc-950 font-medium"
                                            : "border-transparent hover:border-zinc-950 transition-colors duration-200"
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        )
                    )}
                </nav>

                <div className="flex gap-4 items-center">
                    {/* Language Switcher - hidden on mobile */}
                    <div className="hidden md:block">
                        <Select
                            defaultValue={i18n.language}
                            onValueChange={(value) => {
                                i18n.changeLanguage(value)
                                localStorage.setItem("lang", value)
                            }}
                        >
                            <SelectTrigger className="w-[80px]">
                                <SelectValue/>
                            </SelectTrigger>

                            <SelectContent className="min-w-[80px] w-auto">
                                <SelectItem value="en">EN</SelectItem>
                                <SelectItem value="ru">RU</SelectItem>
                                <SelectItem value="kz">KZ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end">
                        {loading ? (
                            <Skeleton className="h-9 w-44 rounded-md bg-zinc-300/70"/>
                        ) : user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div
                                        className="flex items-center gap-2 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer">
                                        <Avatar className="h-8 w-8 bg-zinc-800">
                                            {avatarSrc ? (
                                                <AvatarImage src={avatarSrc} alt={user.email} className="object-cover"/>
                                            ) : null}
                                            <AvatarFallback className="text-white bg-zinc-800">
                                                {userInitial}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden md:block text-zinc-800 font-medium">
                                            {user?.email ?? ""}
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end"
                                                     className="bg-white text-zinc-900 shadow-md border border-zinc-200 rounded-lg py-2">
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                        <Link to="/profile">{t("my_profile")}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                        <Link to="/change-password">{t("change_password")}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                        <Link to="/statistics">{t("statistics")}</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}
                                                      className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                        {t("logout")}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild className="rounded-lg">
                                <Link to="/login">{t("login")}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu content */}
            <>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
                        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Slide menu */}
                <div
                    className={`fixed top-0 left-0 h-full bg-white shadow-lg p-5 flex flex-col gap-4 z-50 w-3/4 max-w-xs transition-transform duration-300 ease-in-out ${
                        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Safe Wave</span>
                        <button onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-6 w-6 text-zinc-900" />
                        </button>
                    </div>

                    {navItems.map((item) =>
                        item.href ? (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-zinc-800 hover:underline"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className="text-zinc-800 hover:underline"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </NavLink>
                        )
                    )}

                    <div className="mt-4">
                        <label className="text-sm text-zinc-600 block mb-1">{t("language")}</label>
                        <Select
                            defaultValue={i18n.language}
                            onValueChange={(value) => {
                                i18n.changeLanguage(value)
                                localStorage.setItem("lang", value)
                            }}
                        >
                            <SelectTrigger className="w-full h-10 border border-zinc-300 rounded-md">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent className="w-full">
                                <SelectItem value="en">EN</SelectItem>
                                <SelectItem value="ru">RU</SelectItem>
                                <SelectItem value="kz">KZ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </>

        </header>
    )
}
