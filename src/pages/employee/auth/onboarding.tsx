import React, { useState } from 'react'
import Iphone from "../../../assets/employee/iPhone.svg"
import PrimaryButton from '../../../components/button/primary-button'
import Icon from '../../../components/icon'

function Onboarding() {

    const [stepCount, setStepCount] = useState(1)

    const stepContent = [
        {
            title: "Effortlessly streamline and organize your daily tasks",
            desc: "User-friendly webapp to help you stay organized, productive, and on top of your work"
        },
        {
            title: "Empower Your Shift Management",
            desc: "Take charge of your work hours and shifts, allowing you to work when it suits you best."
        },
        {
            title: "Manage and Plan your time offs easily",
            desc: "Effortlessly plan leave, vacations, and personal time for relaxation and peace of mind when needed"
        },
        {
            title: "Stay Connected and Informed",
            desc: "Receive instant updates and stay connected with your workplace, ensuring you're always in the loop."
        }
    ]

    return (
        <div className='w-[90%] mx-auto h-[100vh] flex items-center justify-between'>
            <div className='h-[35px] w-[35px] rounded-full cursor-pointer bg-grayscale-20 flex items-center justify-center rotate-180' onClick={() => {
                if (stepCount > 1) {
                    setStepCount(stepCount - 1)
                }
            }}>
                <Icon name='right' />
            </div>
            <div className='w-[50%] text-center'>
                <div className='relative h-[550px]'>
                    {stepContent.map((step, id) => {
                        return (
                            <div key={id} className={id + 1 === stepCount ? `absolute opacity-1 transition ease-in-out duration-1000` : `absolute opacity-0`}>
                                <img className='h-[388px] mx-auto' src={Iphone} alt='picture of an iPhone' />
                                <h2 className='text-[20px] font-bold w-1/2 my-4 mx-auto'>{step.title}</h2>
                                <p className='w-[60%] mx-auto text-grayscale-60'>{step.desc}</p>
                            </div>
                        )
                    })}
                </div>

                <div className='dots my-4 justify-center flex gap-2 flex-row [&>div]:rounded-full [&>div]:w-[8px] [&>div]:h-[8px] [&>div]:bg-grayscale-40'>
                    {[1, 2, 3, 4].map((x) => (
                        <div key={x} className={x === stepCount ? `!bg-lydia`: ""}></div>
                    ))}
                </div>

                <PrimaryButton className='!w-[60%]'>Get Started</PrimaryButton>
            </div>
            <div className='h-[35px] w-[35px] rounded-full cursor-pointer bg-grayscale-20 flex items-center justify-center' onClick={() => {
                if (stepCount < 4) {
                    setStepCount(stepCount + 1)
                }
            }}>
                <Icon name='right' />
            </div>
        </div>
    )
}

export default Onboarding