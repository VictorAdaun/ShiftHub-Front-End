import React, { useState } from 'react'
import EmployeeLayout from '../../../../layouts/employee'
import Icon from '../../../../components/icon';
import PrimaryButton from '../../../../components/button/primary-button';
import Empty from "../../../../assets/illustrations/NewBeginnings.svg"
import Modal from '../../../../components/modal';


function EmployeeRequests() {

    const empty = false

    const [isViewReceivedModalOpen, setIsViewReceivedModalOpen] = useState(false)

    const [isViewSentModalOpen, setIsViewSentModalOpen] = useState(false)

    return (
        <section className='w-full [&>div]:w-full'>

            <Modal
                handleClose={() => setIsViewReceivedModalOpen(false)}
                isOpen={isViewReceivedModalOpen}
            >
                <div className='bg-white p-4 rounded-md w-full md:w-[500px]'>
                    <h2 className='font-bold'>Received</h2>
                    <div className='received flex gap-2 items-start my-4'>
                        <div className="bg-[#E5E1FC66] h-[48px] w-[48px] rounded-full flex items-center justify-center">
                            <p className="text-lydia">T</p>
                        </div>
                        <div className='w-full'>
                            <p className='text-sm'>Theresa A.</p>

                            <div className='border border-solid border-grayscale-30 px-2 py-4 rounded-md my-2'>
                                <div className='text-sm border-l-[4px] border-solid border-[#EDA12F] rounded-tl-[3px] rounded-bl-[3px] pl-4 flex justify-between items-start'>
                                    <div>
                                        <p className='text-grayscale-60'>Mon 04 Sept, 2023</p>
                                        <p className='font-bold my-2'>08:00am - 10:00am</p>
                                        <p className='text-grayscale-60'>Back of house</p>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <p>Pending</p>
                                        <Icon name='right' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='available-shift'>
                        <h2>Available shifts</h2>
                        <div>
                            {[1, 2].map((shift) => {
                                return (
                                    <div className='border border-solid border-grayscale-30 px-2 py-4 rounded-md my-2'>
                                        <div className='text-sm border-l-[4px] border-solid border-lydia rounded-tl-[3px] rounded-bl-[3px] pl-4 flex justify-between items-start'>
                                            <div>
                                                <p className='text-grayscale-60'>Mon 04 Sept, 2023</p>
                                                <p className='font-bold my-2'>08:00am - 10:00am</p>
                                                <p className='text-grayscale-60'>Back of house</p>
                                            </div>

                                            <div className='flex items-center gap-2 custom-check'>
                                                <label className="container">
                                                    <input type="radio" name="radio" />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className='my-4 flex gap-2'>
                        <PrimaryButton inverted>Close</PrimaryButton>
                        <PrimaryButton>Swap</PrimaryButton>
                    </div>
                </div>
            </Modal>

            <Modal
                handleClose={() => setIsViewSentModalOpen(false)}
                isOpen={isViewSentModalOpen}
            >
                <div className='bg-white p-4 rounded-md w-full md:w-[500px]'>
                    <h2 className='font-bold'>Sent</h2>

                    <div className='border border-solid border-grayscale-30 px-2 py-4 rounded-md my-2'>
                        <div className='text-sm border-l-[4px] border-solid border-lydia rounded-tl-[3px] rounded-bl-[3px] pl-4 flex justify-between items-start'>
                            <div>
                                <p className='text-grayscale-60'>Mon 04 Sept, 2023</p>
                                <p className='font-bold my-2'>08:00am - 10:00am</p>
                                <p className='text-grayscale-60'>Back of house</p>
                            </div>
                        </div>
                    </div>

                    <PrimaryButton className='!bg-[#E62E2E]'>Withdraw</PrimaryButton>
                </div>
            </Modal>

            <div className={empty ? `border border-solid p-2 border-grayscale-30 h-[400px] w-full my-4 flex justify-center items-center` : `w-full`}>
                {empty ?
                    <div className='empty text-center mx-auto w-[30%]'>
                        <img src={Empty} alt='empty state' className='w-[150px] h-[150px] mx-auto' />
                        <h3>No activity yet!</h3>
                        <p className='text-grayscale-60 mb-4'>Once you have any activity, they’d pop up here</p>
                    </div> :
                    <div>
                        <div>
                            <div className='flex justify-between items-center my-4'>
                                <h2>Sent</h2>
                                <p className='text-lydia text-sm'>View all</p>
                            </div>

                            <div>
                                {[1, 2].map((request) => {
                                    return (
                                        <div className='border border-solid border-grayscale-30 px-2 py-4 rounded-md my-2'>
                                            <div className='text-sm border-l-[4px] border-solid border-[#EDA12F] rounded-tl-[3px] rounded-bl-[3px] pl-4 flex justify-between items-start'>
                                                <div>
                                                    <p className='text-grayscale-60'>Mon 04 Sept, 2023</p>
                                                    <p className='font-bold my-2'>08:00am - 10:00am</p>
                                                    <p className='text-grayscale-60'>Back of house</p>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                    <p>Pending</p>
                                                    <Icon name='right' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between items-center my-4'>
                                <h2>Received</h2>
                                <p className='text-lydia text-sm'>View all</p>
                            </div>

                            <div>
                                {[1, 2, 3].map((request) => {
                                    return (
                                        <div className='border border-solid border-grayscale-30 px-2 py-4 rounded-md my-2'>
                                            <div className='text-sm border-l-[4px] border-solid border-[#EDA12F] rounded-tl-[3px] rounded-bl-[3px] pl-4 flex justify-between items-start'>
                                                <div>
                                                    <p className='text-grayscale-60'>Mon 04 Sept, 2023</p>
                                                    <p className='font-bold my-2'>08:00am - 10:00am</p>
                                                    <p className='text-grayscale-60'>Back of house</p>
                                                </div>

                                                <div className='flex items-center gap-2'>
                                                    <p>Pending</p>
                                                    <Icon name='right' />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default EmployeeRequests;