import { motion as m } from "framer-motion"
import { useState } from "react"
import { MdInsertChart, MdWork } from "react-icons/md"

import { containerShow, itemShow } from "../../animates"
import { servicesDesign, servicesDevelopment } from "../../data"
import TabButtons from "../TabButtons"
import ProgressBarSkills from "./ProgressBarSkills"

const tabButtonsData = [
    {
        id: "tab-1",
        title: "Skills",
        icon: <MdWork fontSize={20} />
    },
    {
        id: "tab-2",
        title: "Statistics",
        icon: <MdInsertChart fontSize={20} />
    },
]

export default function Service() {
    const [developmentActiveTab, setDevelopmentActiveTab] = useState(tabButtonsData[0].id)
    const [designActiveTab, setDesignActiveTab] = useState(tabButtonsData[1].id)

    return (
        <section className="mt-10 p-8" id="service">
            <h1 className="mx-auto w-max text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#CB00FF] to-[#fafe06]">
                What can our do?
            </h1>
            <div className="w-full flex gap-6 lg:gap-10 justify-between flex-col md:flex-row gap-y-10 mb-10 mt-4">
                <m.div
                    variants={containerShow}
                    initial="initial"
                    whileInView="animate"
                    className="flex-1"
                    viewport={{ once: true }}>
                    <h1 className="text-2xl font-bold mb-6">Experiences in Development</h1>

                    <div className="animate-cursor-hovered max-w-[500px]">
                        <TabButtons
                            data={tabButtonsData}
                            onChange={data => setDevelopmentActiveTab(data.id)} />

                        {tabButtonsData[0].id === developmentActiveTab && (
                            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                                {servicesDevelopment.map(service => (
                                    <m.div
                                        variants={itemShow(.3)}
                                        initial="initial"
                                        animate="animate"
                                        key={service.title}
                                        className="flex flex-col items-center justify-center relative cursor-pointer group">
                                        <span className="hidden group-hover:inline w-max absolute -top-[45px] p-2 bg-slate-400 text-white text-sm rounded z-[1]">
                                            {service.title}
                                        </span>
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 shadow">
                                            {service.icon}
                                        </div>
                                        <p className="text-sm md:text-base text-gray-700 dark:text-slate-100 transition-colors duration-150">{service.started_at}</p>
                                    </m.div>
                                ))}
                            </div>
                        )}

                        {tabButtonsData[1].id === developmentActiveTab && (
                            <ProgressBarSkills data={servicesDevelopment} />
                        )}
                    </div>
                </m.div>
                <m.div
                    variants={containerShow}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col items-end">
                    <h1 className="text-right text-2xl font-bold mb-6">Experiences in Design</h1>

                    <div className="animate-cursor-hovered max-w-[500px] w-full">
                        <TabButtons
                            data={tabButtonsData}
                            indexButtonActive={1}
                            onChange={data => setDesignActiveTab(data.id)}
                            direction="right" />

                        {tabButtonsData[0].id === designActiveTab && (
                            <div className="w-full flex flex-wrap justify-end gap-4 sm:gap-6">
                                {servicesDesign.map(service => (
                                    <m.div
                                        variants={itemShow(.3)}
                                        initial="initial"
                                        animate="animate"
                                        key={service.title}
                                        className="flex flex-col items-center justify-center relative cursor-pointer group">
                                        <span className="hidden group-hover:inline w-max absolute -top-[45px] p-2 bg-slate-400 text-white text-sm rounded z-[1]">
                                            {service.title}
                                        </span>
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 shadow">
                                            {service.icon}
                                        </div>
                                        <p className="text-sm md:text-base text-gray-700 dark:text-slate-100 transition-colors duration-150">{service.started_at}</p>
                                    </m.div>
                                ))}
                            </div>
                        )}

                        {tabButtonsData[1].id === designActiveTab && (
                            <ProgressBarSkills data={servicesDesign} />
                        )}
                    </div>
                </m.div>
            </div>
        </section>
    )
}
