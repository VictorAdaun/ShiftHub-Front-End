import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon'

function TaskDetails() {
    return (
        <EmployeeLayout>
            <div className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center my-4'>
                    <div className='rotate-180 cursor-pointer'>
                        <Icon name='right' />
                    </div>
                    <p className='font-bold'>Details</p>
                    <div className='cursor-pointer'>
                        <Icon name='messageBox' />
                    </div>
                </div>

                <div className='content text-sm'>
                    <h2 className='font-bold'>Customer Service and Interaction</h2>
                    <div className='details [&>div]:flex [&>div]:gap-16 [&>div]:items-center [&>div]:justify-start [&>div>h2]:text-grayscale-60 [&>div]:my-4'>
                        <div>
                            <h2>Start time</h2>
                            <p>8:00am - Mon 23, 2023</p>
                        </div>

                        <div>
                            <h2>End Time</h2>
                            <p>12:00pm - Mon 23, 2023</p>
                        </div>

                        <div>
                            <h2>Participants</h2>
                        </div>

                        <h2 className='text-grayscale-60'>High Priority</h2>
                    </div>

                    <div className='description my-8'>
                        <h2>Description</h2>
                        <p className='text-grayscale-60 my-2'>This task should provide guidance to efficiently handle guest seating and reservation-related responsibilities for an enhanced dining experience</p>
                    </div>

                    <div className='tasks'>
                        <p>Tasks:</p>

                        <div className=''>
                            {Array(4).fill(1).map((task) => {
                                return (
                                    <div className='flex items-center gap-4 justify-start my-4'>
                                        <input type='checkbox' />
                                        <p>This task should provide guidance to efficiently handle guest seating and reservation-related responsibilities for an enhanced dining experience</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className='relative w-[388px] my-8'>
                        <input type='text' className='absolute outline-none border border-solid border-grayscale-30 rounded-md p-4 w-full' placeholder='Ask a question or leave a comment' />
                        <div className='absolute right-[10px] top-[15px] cursor-pointer'>
                            <Icon name='send' />
                        </div>
                    </div>
                </div>
            </div>
        </EmployeeLayout>
    )
}

export default TaskDetails