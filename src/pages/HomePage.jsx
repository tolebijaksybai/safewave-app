"use client"

import {useEffect} from "react"
import {useTranslation} from "react-i18next"

export default function HomePage() {
    const {t} = useTranslation()

    useEffect(() => {
        const hash = window.location.hash
        if (hash) {
            const element = document.querySelector(hash)
            if (element) {
                element.scrollIntoView({behavior: "smooth"})
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
                    height: 'calc(100vh - 71px)',
                }}
            >
                <div className="bg-black/40 absolute inset-0 z-0" />

                <div className="relative z-10 max-w-3xl mx-auto px-4 text-white">
                    <p className="italic text-lg mb-2">{t("hero_quote")}</p>
                    <h2 className="text-4xl md:text-9xl font-bold tracking-tight text-[#0D302C]">
                        {t("safewave_title")}
                    </h2>
                </div>
            </section>

            {/* Main content */}
            <div id="information" className="px-4 py-10 max-w-5xl mx-auto space-y-8">
                <h3 className="text-center text-xl md:text-2xl font-bold">{t("main_title")}</h3>

                <div className="space-y-6 text-sm md:text-base">
                    <div className="space-y-2">
                        <h4 className="font-bold text-gray-950">{t("section_rules_title")}</h4>
                        <p className="text-gray-600">{t("section_rules_text")}</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">{t("swimming_rules_title")}</h4>
                        <ul className="list-inside space-y-1">
                            <li>{t("swimming_rule_1")}</li>
                            <li>{t("swimming_rule_2")}</li>
                            <li>{t("swimming_rule_3")}</li>
                            <li>{t("swimming_rule_4")}</li>
                            <li>{t("swimming_rule_5")}</li>
                            <li>{t("swimming_rule_6")}</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">{t("first_aid_title")}</h4>
                        <ul className="list-inside space-y-1">
                            <li>{t("first_aid_1")}</li>
                            <li>{t("first_aid_2")}</li>
                            <li>{t("first_aid_3")}</li>
                            <li>{t("first_aid_4")}</li>
                        </ul>
                    </div>
                </div>

                {/* Images */}
                <div className="grid grid-cols-4 gap-4">
                    <img src="/images/waters/water-1.png" alt="Water 1" className="w-full h-48 object-cover rounded-lg col-span-2" />
                    <img src="/images/waters/water-2.png" alt="Water 2" className="w-full h-48 object-cover rounded-lg" />
                    <img src="/images/waters/water-3.png" alt="Water 3" className="w-full h-48 object-cover rounded-lg" />
                    <img src="/images/waters/water-4.png" alt="Water 4" className="w-full h-48 object-cover rounded-lg" />
                    <img src="/images/waters/water-5.png" alt="Water 5" className="w-full h-48 object-cover rounded-lg" />
                    <img src="/images/waters/water-6.png" alt="Water 6" className="w-full h-48 object-cover rounded-lg col-span-2" />
                </div>
            </div>
        </>
    )
}
