import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon';
import PrimaryButton from '../../../components/button/primary-button';
import Empty from "../../../assets/illustrations/NewBeginnings.svg"


function TimeoffOverview() {

    const empty = false

    return (
        <EmployeeLayout>
            <section className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center'>
                    <h2>Time Offs</h2>
                    <div className='h-[50px] w-[50px] bg-grayscale-30 rounded-full flex items-center justify-center'>
                        <Icon name='addBlack' />
                    </div>
                </div>

                <div className='stats p-4 border border-solid border-grayscale-30 rounded-md flex justify-between items-center my-8'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-[#E5E1FC66] h-[50px] w-[50px] rounded-md flex items-center justify-center'>
                            <Icon name='sparkle' />
                        </div>
                        <div className='text-field text-sm'>
                            <h3 className='text-grayscale-60'>Allowance</h3>
                            <p>20 days</p>
                        </div>
                    </div>

                    <div className='text-field text-sm'>
                        <h3 className='text-grayscale-60'>Used</h3>
                        <p>20 days</p>
                    </div>

                    <div className='text-field text-sm'>
                        <h3 className='text-grayscale-60'>Remaining</h3>
                        <p>0 days</p>
                    </div>
                </div>

                <div className='requests my-8'>
                    <h2 className='mb-4'>Requests</h2>
                    <div className={empty ? `border border-solid p-2 border-grayscale-30 h-[400px] w-full` : `w-full`}>
                        {empty ?
                            <div className='empty text-center mx-auto w-[30%]'>
                                <img src={Empty} alt='empty state' className='w-[150px] h-[150px] mx-auto' />
                                <h3>You havent picked any shifts</h3>
                                <p className='text-grayscale-60 mb-4'>Once your manager sets up, you’ll be able to pick shifts</p>
                                <PrimaryButton className='!w-fit !px-4'>Get Started</PrimaryButton>
                            </div> :
                            <div>
                                {[1, 2, 3].map((request) => {
                                    return (
                                        <div className='request p-4 border border-solid border-grayscale-30 rounded-md flex justify-between items-center my-8'>
                                            <div className='flex items-start gap-4'>
                                                <div className='bg-[#E5E1FC66] h-[50px] w-[50px] rounded-md flex items-center justify-center'>
                                                    <Icon name='clockLydia' />
                                                </div>
                                                <div className='text-field text-sm [&>p]:text-grayscale-60'>
                                                    <h3>Sick Leave</h3>
                                                    <p className='my-2'>2/10/2023 - 4/10/2023</p>
                                                    <p>2 day(s)</p>
                                                </div>
                                            </div>

                                            <div className='text-field text-sm flex gap-2 items-center'>
                                                <h3 className='text-[#18B368]'>Approved</h3>
                                                <div>
                                                    <Icon name='right' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>}
                    </div>
                </div>
            </section>
        </EmployeeLayout>
    )
}

export default TimeoffOverview;