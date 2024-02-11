import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon'
import Empty from "../../assets/illustrations/NewBeginnings.svg"
import Avatar from "../../assets/imgs/sample-avatar.png"
import PrimaryButton from '../../../components/button/primary-button'
import Shift from '../../../components/employee/overview/shift/shift'

function Upcomingshifts() {
    return (
        <EmployeeLayout>
            <div className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center my-4'>
                    <div className='rotate-180 cursor-pointer'>
                        <Icon name='right' />
                    </div>
                    <p className='font-bold'>Upcoming Shifts</p>
                    <div className='cursor-pointer'>
                        <Icon name='search' />
                    </div>
                </div>


                <div className='calendar-head mb-4'>
                    <h2>Sept 2023</h2>
                    <div className='grid grid-cols-[repeat(7,1fr)] gap-2 my-4'>
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => {
                            const active = 'We' === day ? 'active' : '';
                            return (
                                <div className='text-center'>
                                    <h3 className='text-grayscale-50 p-2'>{day}</h3>
                                    <p className={active ? `p-2 bg-lydia rounded-md text-white relative` : `p-2 relative`}>18 <div className={active ? `bg-white rounded-full h-[5px] w-[5px] absolute top-[10px] right-[10px]` : `not-visible`}></div></p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className='shift-window'>
                    <hr className='border border-solid border-grayscale-40 my-4 w-full' />
                    <div>
                        <h2 className='text-grayscale-60'>Morning Shift</h2>
                    </div>
                    <div className='shifts h-[300px] pl-4'>
                        <Shift shift='open' />
                        <Shift />
                    </div>
                </div>

                <div className='shift-window'>
                    <hr className='border border-solid border-grayscale-40 my-4 w-full' />
                    <div>
                        <h2 className='text-grayscale-60'>Afternoon Shift</h2>
                    </div>
                    <div className='shifts h-[300px] pl-4'>
                        <Shift />
                    </div>
                </div>

                <div className='shift-window'>
                    <hr className='border border-solid border-grayscale-40 my-4 w-full' />
                    <div>
                        <h2 className='text-grayscale-60'>Evening Shift</h2>
                    </div>
                    <div className='shifts h-[300px] pl-4'>

                    </div>
                </div>
            </div>
        </EmployeeLayout>
    )
}

export default Upcomingshifts