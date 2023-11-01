import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import SettingsNav from "../../../components/settings/nav"
import Testimonial from "../../../assets/imgs/testimonial.png"
import FaqItem from "../../../components/settings/faqItem"


function Plans() {

    const [planFrequency, setPlanFrequency] = useState("monthly")

    const plans = [[
        "24/7 email support",
        "Limited to 10 user accounts.",
        "Basic scheduling and shift management features.",
        "Basic reporting and analytics.",
        "No customization options."
    ],
    [
        "24/7 support",
        "Up to 20 user accounts.",
        "Enhanced scheduling and shift management features.",
        "Access to basic reporting and analytics.",
        "Limited customization options."
    ],
    ["24/7 email support",
        "Up to 50 user accounts.",
        "Advanced scheduling and shift management features.",
        "Access to advanced reporting and analytics.",
        "Customization options for shift rules and preferences."],
    ["24/7 support",
        "Unlimited user accounts.",
        "Full access to all scheduling & shift management features.",
        "Advanced reporting and analytics with data export options.",
        "Extensive customization options, including API integration."]]

    const features = [
        {
            icon: "streamline",
            title: "Streamlined Scheduling",
            content: "Simplify complex scheduling tasks with our user-friendly platform. Efficiently create, manage, and optimize employee schedules."
        },
        {
            icon: "morale",
            title: "Enhanced Employee Engagement",
            content: "Boost workforce morale and productivity by empowering employees to manage their shifts, leading to higher engagement levels."
        },
        {
            icon: "errorReduction",
            title: "Error Reduction",
            content: "Minimize scheduling errors and conflicts through automated shift assignments and real-time notifications, improving operational efficiency."
        },
        {
            icon: "compliance",
            title: "Compliance Assurance",
            content: "Stay compliant with labor laws and regulations effortlessly. ShiftHub automates compliance tracking, ensuring adherence to legal requirements."
        },
        {
            icon: "dataDriven",
            title: "Data-Driven Decisions",
            content: "Make informed decisions with actionable insights. Our analytics provide valuable performance metrics, helping you optimize workforce management."
        },
        {
            icon: "timeSaving",
            title: "Time and Cost Savings",
            content: "Save time and reduce labor costs with our efficient scheduling system. Focus on what matters most while we handle the scheduling complexities."
        },
    ]

    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="heading flex items-center mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Settings</h2>
                    </div>
                    <div className="btn-group flex gap-2 w-1/4 ml-auto">
                        <div className="flex items-center gap-2 border border-solid border-grayscale-30 p-4 w-full rounded-md">
                            <Icon name="search" />
                            <input type="text" placeholder="Search Settings" className="w-full outline-none h-full text-grayscale-60 placeholder:text-grayscale-60 text-sm" />
                        </div>
                    </div>
                </div>

                <SettingsNav />

                <section className="my-8 w-full">
                    <div className="heading flex justify-between">
                        <div className="field">
                            <h2 className="text-[18px]">Choose the plan that works for your team</h2>
                            <p className="text-grayscale-60">Trusted by over 1000 business around the world</p>
                        </div>

                        <div className="w-1/3 flex gap-[4px] bg-grayscale-10 p-[4px] rounded-md [&>p]:w-full [&>p]:flex [&>p]:items-center [&>p]:justify-center [&>p]:rounded-md [&>p]:cursor-pointer">
                            <p onClick={() => setPlanFrequency("monthly")} className={`${planFrequency === "monthly" ? "bg-white" : "bg-transparent text-grayscale-60"}`}>Monthly</p>
                            <p onClick={() => setPlanFrequency("yearly")} className={`${planFrequency === "yearly" ? "bg-white" : "bg-transparent text-grayscale-60"}`}>Yearly</p>
                        </div>
                    </div>

                    <div className="plans mt-8 grid grid-cols-[1fr_1fr] gap-4 items-between [&>div]:flex [&>div]:flex-col [&>div]:justify-around">
                        <div className="plan w-full p-8 border border-solid border-grayscale-30 rounded-md">
                            <h1 className="text-[32px] text-grayscale-100 mb-2">Free Trial</h1>
                            <div>
                                <p>Starter</p>
                                <em className="not-italic text-grayscale-60">Start scheduling with ease and efficiency, no cost attached.</em>
                            </div>
                            <hr className="my-4 bg-grayscale-40" />
                            <div>
                                {plans[0].map((benefit, id) => {
                                    return (
                                        <div key={id} className="flex my-4 item-center gap-4">
                                            <Icon name="tickLydia" />
                                            <p className="text-grayscale-70">{benefit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <PrimaryButton className="!w-full">Buy now</PrimaryButton>
                        </div>

                        <div className="plan w-full p-8 border border-solid border-grayscale-30 rounded-md">
                            <h1 className="text-[32px] text-grayscale-100 mb-2">$115<span className="text-sm text-grayscale-60">/month</span></h1>
                            <div>
                                <p>Basic</p>
                                <em className="not-italic text-grayscale-60">Unlock more features for enhanced scheduling and management.</em>
                            </div>
                            <hr className="my-4 bg-grayscale-40" />
                            <div>
                                {plans[1].map((benefit, id) => {
                                    return (
                                        <div key={id} className="flex my-4 item-center gap-4">
                                            <Icon name="tickLydia" />
                                            <p className="text-grayscale-70">{benefit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <PrimaryButton className="!w-full">Buy now</PrimaryButton>
                        </div>

                        <div className="plan w-full p-8 border border-solid border-grayscale-30 rounded-md">
                            <h1 className="text-[32px] text-grayscale-100 mb-2">$450<span className="text-sm text-grayscale-60">/month</span></h1>
                            <div>
                                <p>Pro</p>
                                <em className="not-italic text-grayscale-60">Take control with advanced scheduling and analytics.</em>
                            </div>
                            <hr className="my-4 bg-grayscale-40" />
                            <div>
                                {plans[2].map((benefit, id) => {
                                    return (
                                        <div key={id} className="flex my-4 item-center gap-4">
                                            <Icon name="tickLydia" />
                                            <p className="text-grayscale-70">{benefit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <PrimaryButton className="!w-full">Buy now</PrimaryButton>
                        </div>

                        <div className="plan w-full p-8 border border-solid border-grayscale-30 rounded-md">
                            <h1 className="text-[32px] text-grayscale-100 mb-2">$Varies<span className="text-sm text-grayscale-60">/month</span></h1>
                            <div>
                                <p>Entreprise</p>
                                <em className="not-italic text-grayscale-60">Empower your organization with limitless possibilities.</em>
                            </div>
                            <hr className="my-4 bg-grayscale-40" />
                            <div>
                                {plans[3].map((benefit, id) => {
                                    return (
                                        <div key={id} className="flex my-4 item-center gap-4">
                                            <Icon name="tickLydia" />
                                            <p className="text-grayscale-70">{benefit}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            <PrimaryButton className="!w-full">Buy now</PrimaryButton>
                        </div>
                    </div>

                    <div className="mt-32 mb-8">
                        <h1 className="text-[32px] text-grayscale-100">Messaging for all</h1>
                        <p className="text-grayscale-60">User generated content in real-time will have multiple touchpoints for offshoring.</p>
                        <div className="features grid grid-cols-[1fr_1fr_1fr] gap-4 my-8">
                            {features.map((feature, id) => {
                                return (
                                    <div key={id}>
                                        <div className="bg-lydia h-[50px] w-[50px] rounded-full flex items-center justify-center mb-8">
                                            <Icon name={feature.icon} />
                                        </div>
                                        <h2 className="text-[18px] text-grayscale-100 my-2">{feature.title}</h2>
                                        <p className="text-grayscale-60">{feature.content}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center my-32">
                        <div>
                            <div className="flex gap-[1px]">
                                {[1, 2, 3, 4, 5].map((star, id) => {
                                    return (
                                        <Icon key={id} name="star" />
                                    );
                                })}
                            </div>
                            <p className="text-grayscale-90 text-[25px] my-4">Great job, I will definitely be subscribing again! Shifthub is worth much more than I paid. I would like to personally thank you.</p>
                            <em className="not-italic text-grayscale-60">Joe Christensen</em>
                            <div className="flex gap-2 mt-4">
                                <div className="h-[40px] w-[40px] bg-lydia rounded-md flex justify-center items-center">
                                    <Icon name="arrowLeftWhite" />
                                </div>
                                <div className="h-[40px] w-[40px] bg-lydia rounded-md flex justify-center items-center">
                                    <Icon name="arrowRightWhite" />
                                </div>
                            </div>
                        </div>
                        <img src={Testimonial} alt="testimonial" />
                    </div>

                    <div>
                        <h1 className="text-[32px] text-grayscale-100 text-center">Frequently Asked Questions</h1>
                        <p className="text-grayscale-60 text-center w-3/4 mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                        <div className="faqs mt-8 grid grid-cols-[1fr_1fr] gap-4">

                            <FaqItem
                                question={"What is Shifthub, and how can it help my business?"}
                                answer={"no"}
                            />
                            <FaqItem question={"How can Shifthub support my growing team?"}
                                answer={"no"}
                            />
                            <FaqItem question={"Is there a free trial available?"}
                                answer={"Yes, we offer a 1-month free trial so you can explore the benefits before committing."}
                            />
                            <FaqItem question={"What support options are available?"}
                                answer={"no"}
                            />
                            <FaqItem question={"Can I customize schedules to fit my business needs?"}
                                answer={"no"}
                            />
                            <FaqItem question={"Is my data secure with Shifthub"}
                                answer={"no"}
                            />

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Plans;
