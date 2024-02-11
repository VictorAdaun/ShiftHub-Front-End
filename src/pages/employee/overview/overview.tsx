import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon'
import Shift from '../../../components/employee/overview/shift/shift'
import PrimaryButton from '../../../components/button/primary-button'
import SecondaryButton from '../../../components/button/secondary-button'
import Empty from "../../../assets/illustrations/NewBeginnings.svg"

function Overview() {
    return (
        <EmployeeLayout>
            <section className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='greeting flex justify-between items-center'>
                    <div className='flex gap-4 items-center'>
                        <div className='h-[40px] w-[40px] flex items-center justify-center rounded-full bg-grayscale-40 text-grayscale-0'>DA</div>
                        <div>
                            <h2 className='font-bold'>Welcome Back!</h2>
                            <p className='text-grayscale-60 text-sm'>Daniel Anozie</p>
                        </div>
                    </div>
                    <div className='cursor-pointer'>
                        <Icon name='notif' />
                    </div>
                </div>

                <div className='my-8 h-[200px] rounded-md border border-solid border-grayscale-30 [&>div]:w-full [&>div]:p-2'>
                    <div className='content border-b border-solid border-grayscale-30 h-0.4'>
                        <Shift shift='next' />
                    </div>
                    <div className='button'>
                        <PrimaryButton disabled className='flex gap-2 items-center justify-center disabled:bg-grayscale-20 disabled:text-grayscale-40'><Icon name='timer' /> Clock in</PrimaryButton>
                        <SecondaryButton disabled className='border-none disabled:text-grayscale-40'>Clock in without a shift</SecondaryButton>
                    </div>
                </div>

                <div>
                    <div className='flex justify-between items-center'>
                        <h2>Upcoming Shifts</h2>
                        <p className='text-grayscale-40'>View all</p>
                    </div>

                    <div className='my-8 h-[172px] rounded-md border border-solid border-grayscale-30 [&>div]:w-full [&>div]:p-2'>
                        <div className='content border-b border-solid border-grayscale-30 h-1/2'>
                            <Shift shift='upcoming' />
                        </div>
                        <div className='flex items-center justify-between h-1/2'>
                            <p>Open Shifts (4)</p>
                            <div>
                                <Icon name='right' />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex justify-between items-center'>
                        <h2>Recently assigned tasks</h2>
                        <div>
                            <Icon name='search' />
                        </div>
                    </div>

                    <div className='h-[300px] rounded-md border border-solid border-grayscale-30 my-4 flex flex-col justify-center items-center'>
                        <div className='text-center'>
                            <img src={Empty} alt='empty state' className='w-[150px] h-[150px] mx-auto' />
                            <h1 className='font-bold'>No assigned tasks!</h1>
                            <p className='text-grayscale-60'>You dont have any assigned tasks, once you do they’d appear here.</p>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[126px] border border-solid border-grayscale-30 mb-4 [&>div]:p-4 rounded-md'>
                    <div className='flex items-center justify-between border-b border-solid border-grayscale-30 h-1/2'>
                        <div>
                            <p>Customer Service and Interaction</p>
                            <p className='text-sm text-[#E62E2E]'>Due in 20 mins</p>
                        </div>
                        <div className='rotate-90'>
                            <Icon name='right' />
                        </div>
                    </div>

                    <div className='flex items-center justify-between h-1/2'>
                        <p>View details</p>
                        <div>
                            <Icon name='right' />
                        </div>
                    </div>
                </div>

                <div className='w-full mb-4 h-auto border border-solid border-grayscale-30 [&>div]:p-4 rounded-md'>
                    <div className='flex items-center justify-between border-b border-solid border-grayscale-30 h-1/3'>
                        <div>
                            <p>Guest Sitting and reservations</p>
                            <p className='text-sm text-[#E62E2E]'>Due in 20 mins</p>
                        </div>
                        <div className='rotate-90'>
                            <Icon name='right' />
                        </div>
                    </div>

                    <section className='flex flex-col items-start justify-center h-auto'>
                        {Array(5).fill(1).map((detail) => {
                            return (
                                <div className="flex justify-start items-center gap-2 w-full pl-4 border-b border-solid border-grayscale-30 h-[60px]">
                                    <input type='checkbox' />
                                    <p>Receive and record incoming reservation requests from customers.</p>
                                </div>
                            );
                        })}
                    </section>

                    <div className='flex items-center justify-between h-1/3'>
                        <p>View details</p>
                        <div>
                            <Icon name='right' />
                        </div>
                    </div>
                </div>
            </section>
        </EmployeeLayout>
    )
}

export default Overview