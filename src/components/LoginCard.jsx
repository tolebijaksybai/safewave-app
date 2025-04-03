import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginCard() {
    return (
        <div className="flex justify-center px-4">
            <Card className="w-full max-w-xl shadow-xl rounded-xl mt-12 mb-12">
                <CardContent className="p-8 space-y-6">
                    <h4 className="text-center text-2xl font-semibold text-blue-600">
                        Log in to your account
                    </h4>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="Enter your email"
                            className="rounded-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="rounded-lg"
                        />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                        Login now
                    </Button>
                    <p className="text-sm text-center text-gray-600">
                        Don’t have an account?{" "}
                        <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
