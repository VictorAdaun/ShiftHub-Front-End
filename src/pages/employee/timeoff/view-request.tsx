import React from 'react'
import EmployeeLayout from '../../../layouts/employee'
import Icon from '../../../components/icon';
import PrimaryButton from '../../../components/button/primary-button';


function TimeoffViewrequest() {

    return (
        <EmployeeLayout>
            <section className='w-[90%] mx-auto [&>div]:w-full'>
                <div className='header flex justify-between items-center'>
                    <div className='cursor-pointer rotate-180'>
                        <Icon name='right' />
                    </div>
                    <h2>Personal Leave</h2>
                    <p></p>
                </div>

                <section className='w-[80%] md:w-1/2 mx-auto'>
                    <div className='my-4 [&>div]:my-4 text-sm [&>.text-row]:flex [&>.text-row]:gap-2 [&>.text-row]:items-center [&>.text-row]:justify-start [&>.text-row]:gap-8 [&>.text-row]:text-left'>
                        <div className='text-row'>
                            <h3 className='text-grayscale-60'>Timeoff Type</h3>
                            <p>Personal Leave</p>
                        </div>
                        <div className='text-row'>
                            <h3 className='text-grayscale-60'>Period</h3>
                            <p>12/10/2023 - 13/10/2023</p>
                        </div>
                        <div className='text-row'>
                            <h3 className='text-grayscale-60'>State</h3>
                            <p>Approved</p>
                        </div>
                    </div>

                    <div className='field text-sm'>
                        <label>Reason</label>
                        <div className='text-grayscale-60 border border-solid border-grayscale-40 p-4 my-4 h-[300px]'>I would like to request time off on [date] to attend a close friend's wedding ceremony. This is a significant event in my personal life, and I would greatly appreciate the opportunity to celebrate this special occasion with my friend. I will ensure that my responsibilities are covered during my absence to minimize any disruptions to the team.</div>
                    </div>

                    <PrimaryButton type='submit'>Review Request</PrimaryButton>
                </section>
            </section>
        </EmployeeLayout>
    )
}

export default TimeoffViewrequest;