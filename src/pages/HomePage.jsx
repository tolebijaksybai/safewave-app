// import LoginCard from "@/components/LoginCard.jsx";
import {useEffect} from "react";

export default function HomePage() {
    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const element = document.querySelector(hash)
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [])

    return (
        <>
            {/* Hero section */}
            <section
                className="relative text-center bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: 'url(/images/hero.png)',
                    height: 'calc(100vh - 71px)'
                }}
            >
                {/* Затемнение фона */}
                <div className="bg-black/40 absolute inset-0 z-0"/>

                {/* Контент */}
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-white">
                    <p className="italic text-lg mb-2">
                        "Water is the source of life, but only conscious caution makes it safe."
                    </p>
                    <h2 className="text-4xl md:text-9xl font-bold tracking-tight text-[#0D302C]">
                        SAFEWAVE
                    </h2>
                </div>
            </section>

            {/* Main content */}
            <div id="information" className="px-4 py-10 max-w-5xl mx-auto space-y-8">
                <h3 className="text-center text-xl md:text-2xl font-bold">
                    "RULES FOR SAFE BEHAVIOR ON THE WATER"
                </h3>

                <div className="space-y-6 text-sm md:text-base">
                    <div className="space-y-2">
                        <h4 className="font-bold text-gray-950">RULES FOR SAFE BEHAVIOR ON THE WATER</h4>
                        <p className="text-gray-600">
                            During the summer heat and vacation period, every city dweller seeks to escape into nature
                            for a
                            swim in a suitable body of water. However, what starts as a simple swim can often end in
                            tragedy.
                            The main cause of accidents on the water is the lack of safety awareness among the
                            population
                            and ignorance of the basic rules of water behavior.
                            Knowing these rules and being able to provide first aid to a victim is essential for every
                            vacationer.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">RULES FOR SAFE SWIMMING</h4>
                        <ul className="list-inside space-y-1">
                            <li>✔️ Only swim in designated areas like beaches, pools, and bathing areas.</li>
                            <li>✔️ Don’t enter the water under the influence of alcohol or drugs.</li>
                            <li>✔️ Let your body adjust gradually to water temperature.</li>
                            <li>✔️ Don’t jump from boats or high piers. Lung vessels could shrink on impact.</li>
                            <li>✔️ Never dive in unfamiliar waters or near rocks.</li>
                            <li>✔️ Don’t swim in rough waters or stormy weather.</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">FIRST AID RULES FOR WATER INCIDENTS</h4>
                        <ul className="list-inside space-y-1">
                            <li>✔️ Call for help immediately.</li>
                            <li>✔️ Remove the victim from the water safely.</li>
                            <li>✔️ If unconscious – start artificial respiration.</li>
                            <li>✔️ Keep the person warm and dry.</li>
                        </ul>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Первая строка */}
                    <img
                        src="/images/water-1.png"
                        alt="Water 1"
                        className="w-full h-48 object-cover rounded-lg col-span-2"
                    />
                    <img
                        src="/images/water-2.png"
                        alt="Water 2"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/images/water-3.png"
                        alt="Water 3"
                        className="w-full h-48 object-cover rounded-lg"
                    />

                    {/* Вторая строка */}
                    <img
                        src="/images/water-4.png"
                        alt="Water 4"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/images/water-5.png"
                        alt="Water 5"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                        src="/images/water-6.png"
                        alt="Water 6"
                        className="w-full h-48 object-cover rounded-lg col-span-2"
                    />
                </div>

            </div>

            {/*<footer className="bg-gradient-to-r from-sky-200 to-indigo-300 py-28 px-4">*/}
            {/*    <div className="max-w-lg mx-auto">*/}
            {/*        <LoginCard/>*/}
            {/*    </div>*/}
            {/*</footer>*/}
        </>
    )
}
