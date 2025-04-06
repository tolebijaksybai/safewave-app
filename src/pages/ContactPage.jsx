"use client"

import {useTranslation} from "react-i18next"

export default function ContactPage() {
    const {t} = useTranslation()

    return (
        <div className="min-h-[calc(100vh-70px)] bg-white py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl font-bold text-zinc-800 mb-8">{t("contacts")}</h2>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="space-y-6 w-full max-w-sm">
                        <div>
                            <p className="font-semibold text-zinc-800">{t("phone_label")}</p>
                            <p className="text-zinc-400">112</p>
                            <p className="text-zinc-400">+7(727)-274-41-04</p>
                        </div>

                        <div>
                            <p className="font-semibold text-zinc-800">{t("email_label")}</p>
                            <p className="text-zinc-400">alua.zhantleuova@gmail.com</p>
                        </div>

                        <div>
                            <p className="font-semibold text-zinc-800">{t("address_label")}</p>
                            <p className="text-zinc-400">Almaty, Kazakhstan</p>
                        </div>

                        <div>
                            <p className="font-semibold text-zinc-800">{t("work_schedule_label")}</p>
                            <p className="text-zinc-400">{t("work_schedule")}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-zinc-800">{t("contact_us")}</p>
                            <div className="flex items-center gap-4 text-2xl mt-2">
                                <a href="tel:+77272744104" title={t("call")}>📞</a>
                                <a href="mailto:alua.zhantleuova@gmail.com" title={t("email")}>📧</a>
                                <a
                                    href="https://maps.google.com/?q=Almaty,Kazakhstan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={t("map")}
                                >
                                    📍
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <iframe
                            title="Google Map"
                            src="https://maps.google.com/maps?q=Almaty,Kazakhstan&z=15&output=embed"
                            className="w-full h-[400px] rounded-lg border"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
