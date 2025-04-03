import {Link} from "react-router-dom"
import {Button} from "@/components/ui/button"
import {NavLink} from "react-router-dom"
import {useAuth} from "@/context/AuthContext"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Skeleton} from "@/components/ui/skeleton"

const navItems = [
    {to: "/", label: "Home"},
    {to: "/categories", label: "Categories"},
    {to: "/map", label: "Map"},
    {href: "/#information", label: "Information"},
    {to: "/help", label: "Help"}
]

export default function Header() {
    const {user, logout, loading} = useAuth()
    const userInitial = user?.email?.[0]?.toUpperCase() ?? "U"
    const avatarSrc = user?.photo ? `/uploads/${user.photo}` : undefined

    return (
        <header className="bg-white border-b shadow-sm h-[70px]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Логотип */}
                <Link to="/" className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="SafeWave Logo" className="h-14 w-auto"/>
                </Link>

                {/* Навигация */}
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

                {/* Правый блок: Skeleton, Dropdown или Login */}
                <div className="w-[200px] flex justify-end">
                    {loading ? (
                        <Skeleton className="h-9 w-44 rounded-md bg-zinc-300/70"/>
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer">
                                    <Avatar className="h-8 w-8 bg-zinc-800">
                                        {avatarSrc ? (
                                            <AvatarImage src={avatarSrc} alt={user.email} />
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
                            <DropdownMenuContent
                                align="end"
                                className="bg-white text-zinc-900 shadow-md border border-zinc-200 rounded-lg py-2"
                            >
                                <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                    <Link to="/profile">My Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                    <Link to="/change-password">Change Password</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-zinc-300 rounded-lg px-4">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild className="rounded-lg">
                            <Link to="/login">Log in</Link>
                        </Button>
                    )}
                </div>


            </div>
        </header>
    )
}