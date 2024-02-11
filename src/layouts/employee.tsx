import React, { useState } from 'react'
import Logo from "../assets/svgs/auth/EzLogo.svg"
import Icon from '../components/icon'
import ShiftBooking from '../components/employee/overview/shift-booking'
import ScrollableModal from '../components/scrollable-modal'
import Modal from '../components/modal'
import Shift from '../components/employee/overview/shift/shift'
import PrimaryButton from '../components/button/primary-button'


function EmployeeLayout({ children }) {

    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)

    const [isScheduleConfirmModalOpen, setIsScheduleConfirmModalOpen] = useState(false)

    const [isBookingConfirmedModalOpen, setIsBookingConfirmedModalOpen] = useState(false)

    return (
        <section>

            <ScrollableModal
                handleClose={() => setIsScheduleModalOpen(false)}
                isOpen={isScheduleModalOpen}
            >
                <ShiftBooking />
            </ScrollableModal>

            <Modal
                handleClose={() => setIsScheduleConfirmModalOpen(false)}
                isOpen={isScheduleConfirmModalOpen}
            >
                <div className='bg-white p-4 rounded-md'>
                    <h2 className='font-bold'>Confirm Booking</h2>
                    <p className='text-grayscale-60 mb-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                    <div>
                        <Shift />
                        <Shift />
                        <Shift />
                    </div>

                    <PrimaryButton className='my-4'>Continue</PrimaryButton>
                </div>
            </Modal>

            <Modal
                handleClose={() => setIsBookingConfirmedModalOpen(false)}
                isOpen={isBookingConfirmedModalOpen}
            >
                <div className='bg-white p-4 rounded-md'>
                    <div className='text-center mx-auto'>
                        <div className='mx-auto w-fit my-4'>
                            <Icon name='tickWhite' />
                        </div>
                        <h2 className='font-bold'>Booking Confirmed!</h2>
                        <p className='text-grayscale-60 mb-2'>Your booking has been confirmed! Stay productive, you can always request a shift swap between your colleagues. </p>
                    </div>

                    <PrimaryButton className='my-4'>Continue</PrimaryButton>
                </div>
            </Modal>

            <nav className='w-[90%] h-[100px] mx-auto flex justify-between items-center'>
                <img src={Logo} alt='logo' />
                <ul className='flex gap-4 justify-around items-center text-grayscale-60 [&>li]:cursor-pointer hidden md:flex'>
                    <li className='hover:text-lydia'>Home</li>
                    <li className='hover:text-lydia'>Timeoff</li>
                    <li className='hover:text-lydia'>Inbox</li>
                    <li className='hover:text-lydia'>Profile</li>
                </ul>
            </nav>

            {children}

            <div className='mobile-nav w-full md:hidden fixed bottom-0'>
                <ul className='w-full flex gap-4 justify-around items-center text-grayscale-60 [&>li]:cursor-pointer [&>li]:flex [&>li]:items-center [&>li]:justify-center [&>li]:flex-col-reverse [&>li]:text-sm'>
                    <li className='hover:text-lydia'>
                        <p>Home</p>
                        <Icon name='home' />
                    </li>
                    <li className='hover:text-lydia'>
                        <p>Time off</p>
                        <Icon name='timeoff' />
                    </li>
                    <li className='hover:text-lydia'>
                        <p>Inbox</p>
                        <Icon name='inbox' />
                    </li>
                    <li className='hover:text-lydia'>
                        <p>Profile</p>
                        <Icon name='profile' />
                    </li>
                </ul>
            </div>

            <div className='cursor-pointer fixed bottom-5 right-5 h-[50px] w-[50px] rounded-full bg-lydia flex justify-center items-center'>
                <Icon name='homeIndicator' />
            </div>
        </section>
    )
}

export default EmployeeLayout