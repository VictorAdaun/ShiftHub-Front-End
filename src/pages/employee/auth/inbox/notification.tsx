import React from 'react'
import EmployeeLayout from '../../../../layouts/employee'
import Icon from '../../../../components/icon';
import PrimaryButton from '../../../../components/button/primary-button';
import Empty from "../../../../assets/illustrations/NewBeginnings.svg"



function EmployeeNotification() {

    const empty = false

    return (
        <section className='w-full [&>div]:w-full'>
            <div className={empty ? `border border-solid p-2 border-grayscale-30 h-[400px] w-full my-4 flex justify-center items-center` : `w-full`}>
                {empty ?
                    <div className='empty text-center mx-auto w-[30%]'>
                        <img src={Empty} alt='empty state' className='w-[150px] h-[150px] mx-auto' />
                        <h3>No activity yet!</h3>
                        <p className='text-grayscale-60 mb-4'>Once you have any activity, they’d pop up here</p>
                    </div> :
                    <div>
                        {[1, 2, 3].map((notif) => {
                            return (
                                <div className="notif w-full my-4 p-4 bg-grayscale-10 rounded-md flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#E5E1FC66] h-[48px] w-[48px] rounded-full flex items-center justify-center">
                                            <p className="text-lydia">T</p>
                                        </div>
                                        <div>
                                            <p className="text-grayscale-60 text-sm"><span className="text-grayscale-100">Theresa A.</span> is requesting a <span className="text-grayscale-100">Shift swap</span></p>
                                            <em className="text-sm text-grayscale-60 not-italic">2 hours ago</em>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-lydia text-sm">View</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>}
            </div>
        </section>
    )
}

export default EmployeeNotification;