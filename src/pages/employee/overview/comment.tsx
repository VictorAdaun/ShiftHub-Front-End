import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon'
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import Avatar from "../../../assets/imgs/sample-avatar.png"
import PrimaryButton from '../../../components/button/primary-button'


function Comment() {
    return (
        <EmployeeLayout>
            <div className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center my-4'>
                    <div className='rotate-180 cursor-pointer'>
                        <Icon name='right' />
                    </div>
                    <p className='font-bold'>Comments</p>
                    <div className='cursor-pointer'>
                        <Icon name='search' />
                    </div>
                </div>

                {/* <div className='h-[500px] my-4 flex flex-col justify-center items-center'>
                    <div className='text-center'>
                        <img src={Empty} alt='empty state' className='w-[150px] h-[150px] mx-auto' />
                        <h1 className='font-bold'>No activities yet!</h1>
                        <p className='text-grayscale-60'>Once you have any activity, they’d pop up here</p>
                    </div>
                </div> */}

                <div className='h-[500px] my-8 flex flex-col justify-start items-start'>
                    <div className='comments text-sm'>
                        {[1, 2, 3, 4].map((comment) => {
                            return (
                                <div className='comment flex gap-2 items-center mb-8'>
                                    <img src={Avatar} alt='Dummy Avatar' />
                                    <div>
                                        <div className='mb-2'>
                                            <h2 className='font-bold'>John Doe</h2>
                                            <p>I'd like to ask you if there are anything missing from this task</p>
                                        </div>

                                        <div className='flex items-center gap-4'>
                                            <p className='text-grayscale-60'>2 hours ago</p>
                                            <p className='text-lydia'>Reply</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <PrimaryButton className='!border !border-solid !border-grayscale-40' inverted>Ask a new question</PrimaryButton>
                </div>


            </div>
        </EmployeeLayout>
    )
}

export default Comment