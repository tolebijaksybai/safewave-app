export default function PrizePage() {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-10 px-4">
            <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-90 rounded-xl p-4 sm:p-6 relative">
                {/* Stars top left */}
                <div className="absolute top-4 left-4 text-yellow-400 text-3xl sm:text-4xl">
                    ✨✨
                </div>
                {/* Stars top right */}
                <div className="absolute top-4 right-4 text-yellow-400 text-3xl sm:text-4xl">
                    ✨✨
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-yellow-600">WOW! YOU PASSED THE QUIZ!</h2>
                <p className="text-lg sm:text-xl font-semibold mb-6 sm:mb-10">YOU CAN CHOOSE ANY GIFT FOR YOURSELF!</p>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    <div>
                        <img src="/images/prizes/fins.png" alt="Fins" className="mx-auto h-20 sm:h-24" />
                        <p className="mt-2 text-sm sm:text-base font-medium">FINS FOR SWIMMING</p>
                    </div>
                    <div>
                        <img src="/images/prizes/vest.png" alt="Vest" className="mx-auto h-20 sm:h-24" />
                        <p className="mt-2 text-sm sm:text-base font-medium">SWIMMING VEST</p>
                    </div>
                    <div>
                        <img src="/images/prizes/hat.png" alt="Hat" className="mx-auto h-20 sm:h-24" />
                        <p className="mt-2 text-sm sm:text-base font-medium">SWIMMING HAT</p>
                    </div>
                    <div>
                        <img src="/images/prizes/goggles.png" alt="Goggles" className="mx-auto h-20 sm:h-24" />
                        <p className="mt-2 text-sm sm:text-base font-medium">SWIMMING GOGGLES</p>
                    </div>
                </div>

                <div className="text-left max-w-xl mx-auto text-xs sm:text-sm text-zinc-700">
                    <p className="mb-2 font-semibold">⚠️ Attention! To receive the prize, please contact us!</p>
                    <p className="mb-2">
                        📞 Call <strong>+7(727)-274-41-04</strong>, and our specialist will contact you to clarify the
                        details.
                    </p>
                    <p className="mb-2 font-semibold">
                        📌 To receive the prize, prepare the following information:
                    </p>
                    <ul className="list-disc list-inside mb-4 sm:mb-6">
                        <li>Your name</li>
                        <li>Contact number</li>
                        <li>Convenient time for communication</li>
                    </ul>
                    <p className="font-medium">We are waiting for your call! 🎉</p>
                </div>

                {/* Stars bottom right */}
                <div className="absolute bottom-4 right-6 flex gap-2 text-yellow-400 text-2xl sm:text-3xl">
                    ⭐ ⭐ ⭐ ⭐
                </div>
            </div>
        </div>
    )
}
