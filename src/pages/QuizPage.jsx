import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"

export default function QuizPage() {
    const navigate = useNavigate()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("/api/quizzes")
            .then(res => setQuizzes(res.data))
            .catch(() => setQuizzes([]))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className="text-center mt-10">Loading quizzes...</p>
    }

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[url('/images/bg-quiz.png')] bg-cover bg-center py-10 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl font-bold text-center mb-10">Choose a Quiz</h2>

                <div className="grid grid-cols-1 gap-6">
                    {quizzes.map(quiz => (
                        <div
                            key={quiz.id}
                            className="relative flex items-center rounded-xl overflow-hidden shadow-md bg-white bg-opacity-90 px-6 py-4"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-zinc-800 mb-1">
                                    {quiz.title || "Take the quiz and get a prize"}
                                </h3>
                                <p className="text-sm text-zinc-600 mb-2">
                                    {quiz.description || "Answer a few questions to win a prize!"}
                                </p>
                                <Button
                                    onClick={() => navigate(`/quizzes/${quiz.id}`)}
                                    className="bg-orange-600 hover:bg-orange-700"
                                >
                                    Start to Play
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
