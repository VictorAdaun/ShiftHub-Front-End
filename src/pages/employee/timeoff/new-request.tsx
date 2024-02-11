import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon';
import PrimaryButton from '../../../components/button/primary-button';


function TimeoffNewrequest() {

    return (
        <EmployeeLayout>
            <section className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center'>
                    <div className='cursor-pointer rotate-180'>
                        <Icon name='right' />
                    </div>
                    <h2>New Request</h2>
                    <p></p>
                </div>

                <form className='text-sm w-[80%] md:w-1/2 mx-auto [&>.field]:flex [&>.field]:flex-col [&>.field>input]:rounded-md my-4'>
                    <div className='field mb-2'>
                        <label>Time Off Type *</label>
                        <input className='text-grayscale-60 placeholder:text-grayscale-25 border border-solid border-grayscale-40 p-4 my-2' type='text' placeholder='Please select time off type' />
                    </div>

                    <h2>Period *</h2>
                    <div className='flex gap-4 justify-between items-center [&>div]:w-[48%] [&>.field]:flex [&>.field]:flex-col [&>.field>input]:rounded-md my-2 w-full'>
                        <div className='field'>
                            <label>Start Date</label>
                            <input className='text-grayscale-60 placeholder:text-grayscale-25 border border-solid border-grayscale-40 p-4 my-2' type='text' placeholder='DD/MM/YYYY' />
                        </div>
                        <div className='field'>
                            <label>End Date</label>
                            <input className='text-grayscale-60 placeholder:text-grayscale-25 border border-solid border-grayscale-40 p-4 my-2' type='text' placeholder='DD/MM/YYYY' />
                        </div>
                    </div>

                    <div className='field'>
                        <label>Reason</label>
                        <input className='text-grayscale-60 placeholder:text-grayscale-25 border border-solid border-grayscale-40 p-4 my-2 h-[300px]' type='text' placeholder='You can add a few comments for your request'/>
                    </div>

                    <PrimaryButton type='submit'>Submit Request</PrimaryButton>
                </form>
            </section>
        </EmployeeLayout>
    )
}

export default TimeoffNewrequest;