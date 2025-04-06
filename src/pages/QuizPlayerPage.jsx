"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

export default function QuizPlayerPage() {
    const { t } = useTranslation()
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [quiz, setQuiz] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswerId, setSelectedAnswerId] = useState(null)
    const [isCorrect, setIsCorrect] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [restart, setRestart] = useState(false)

    useEffect(() => {
        axios.get(`/api/quizzes/${quizId}`)
            .then(res => setQuiz(res.data))
            .catch(() => navigate("/quizzes"))
    }, [quizId, navigate])

    const handleAnswerClick = (answer) => {
        if (showAnswer) return
        setSelectedAnswerId(answer.id)
        setIsCorrect(answer.is_correct)
        setShowAnswer(true)

        if (!answer.is_correct) {
            setRestart(true)
        }
    }

    const handleNext = () => {
        if (currentQuestionIndex + 1 < quiz.questions.length) {
            setCurrentQuestionIndex(prev => prev + 1)
            setSelectedAnswerId(null)
            setIsCorrect(null)
            setShowAnswer(false)
        } else {
            navigate(`/quizzes/${quizId}/prize`)
        }
    }

    const handleRestart = () => {
        setCurrentQuestionIndex(0)
        setSelectedAnswerId(null)
        setIsCorrect(null)
        setShowAnswer(false)
        setRestart(false)
    }

    if (!quiz || !quiz.questions || !quiz.questions[currentQuestionIndex]) {
        return <p className="text-center mt-10">{t("quiz_play.loading")}</p>
    }

    const currentQuestion = quiz.questions[currentQuestionIndex]

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[url('/images/bg-quiz.png')] bg-cover bg-center py-10 px-4">
            <div className="container mx-auto max-w-3xl bg-white bg-opacity-90 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 text-center">{currentQuestion.question_text}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {currentQuestion.answers.map(answer => {
                        const isSelected = selectedAnswerId === answer.id
                        const isAnswerCorrect = answer.is_correct
                        const bgClass = showAnswer
                            ? isSelected
                                ? isAnswerCorrect
                                    ? "bg-green-400"
                                    : "bg-red-400"
                                : "bg-gray-100"
                            : "bg-gray-100 hover:bg-gray-200"

                        return (
                            <button
                                key={answer.id}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={showAnswer}
                                className={`p-4 rounded-lg text-left font-medium ${bgClass}`}
                            >
                                {answer.answer_text}
                            </button>
                        )
                    })}
                </div>

                {showAnswer && (
                    <div className="text-right">
                        {restart ? (
                            <Button onClick={handleRestart} className="bg-red-600 hover:bg-red-700">
                                {t("quiz_play.try_again")}
                            </Button>
                        ) : (
                            <Button onClick={handleNext} className="bg-orange-600 hover:bg-orange-700">
                                {currentQuestionIndex + 1 === quiz.questions.length
                                    ? t("quiz_play.finish")
                                    : t("quiz_play.next")}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
