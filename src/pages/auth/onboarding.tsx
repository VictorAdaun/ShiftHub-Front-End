import React, { useState } from 'react';
import AuthLayout from "../../layouts/auth";
import Trash from "../../assets/trash.svg";
import Plus from "../../assets/Plus.svg";
// import ReactPortal from '../../Reactportal';
import Modal from '../../components/modal';

function Onboarding() {

    const [onboardStep, setOnboardStep] = useState(1);
    const [isInviteModalOpen, setInviteModalOpen] = useState(true);

    return (
        <AuthLayout>
            {/* <ReactPortal wrapperId="portal"> */}
                <Modal handleClose={() => setInviteModalOpen(false)} isOpen={isInviteModalOpen}>
                    <div className="">
                        <p>Hellooo</p>
                    </div>
                </Modal>
            {/* </ReactPortal> */}
            <div className="onboarding w-2/4 h-auto mx-auto my-12 text-center">
                <div className="timeline flex justify-between items-center mx-auto mb-4 w-3/4 mt-10">
                    <div className=" w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia">
                        <span className="text-sm font-normal text-lydia">1</span>
                    </div>
                    <hr className="w-1/3 border-lydia border-t-2 border-dotted"></hr>
                    <div className=" w-8 h-8 rounded-full flex items-center justify-center border border-solid border-[#D0D5DD]">
                        <span className="text-sm font-normal text-[#5F6D7E]">2</span>
                    </div>
                    <hr className="w-1/3 border-[#D0D5DD] border-t-2 border-dotted"></hr>
                    <div className=" w-8 h-8 rounded-full flex items-center justify-center border border-solid border-[#D0D5DD]">
                        <span className="text-sm font-normal text-[#5F6D7E]">3</span>
                    </div>
                </div>
                {onboardStep === 1 ?
                    <>
                        <h1 className="my-2 text-2xl">Let's get to know you</h1>
                        <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">Don't worry this only takes 2 minutes</p>
                    </> : onboardStep === 2?
                    <>
                        <h1 className="my-2 text-2xl">Let's organize your schedules!</h1>
                        <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">We’ll create separate schedules based on the departments you add. You can always add more later.</p>
                    </> : 
                    <>
                        <h1 className="my-2 text-2xl">Collaborate with your teammates</h1>
                        <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">Add managers and employees and see how your entire team’s workflow improves with EZ Scheduler.</p>
                    </>
                }

                <form className="w-full">
                    {onboardStep === 1 ?
                        <div className='first-step'>
                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="name" className="text-sm">Company Name</label>
                                <input type="text" name="name" id="name" placeholder="e.g John Doe's Restaurant" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                            </div>

                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="address" className="text-sm">Company Address</label>
                                <input type="text" name="address" id="address" placeholder="Enter an address or city" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                <em className="not-italic text-sm font-light tracking-wide text-[#667085]">This helps us give you accurate, location-based compliance info</em>
                            </div>

                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="address" className="text-sm">What day of the week do your schedules start?</label>
                                <select name="freq" id="freq" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                    <option value="Monday">Monday</option>
                                </select>
                            </div>

                            <button type='button' className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm" onClick={() => setOnboardStep(2)}>Continue</button>
                        </div>
                        : onboardStep === 2 ? <div className='second-step'>
                            <div className='department flex flex-row gap-4 border border-solid border-[#D0D5DD] p-4 items-start'>
                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="dept" className="text-sm">Department</label>
                                    <input type="text" name="dept" id="dept" placeholder="e.g Kitchen" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                </div>
                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="roles" className="text-sm">Roles?</label>
                                    <select name="roles" id="roles" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                        <option value="Chef">Chef</option>
                                    </select>
                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>Choose from popular roles or type to create new roles.</em>
                                </div>
                                <img src={Trash} alt='trash' className='mt-8' />
                            </div>
                            <p className='flex gap-2 text-left text-sm font-light tracking-wide text-lydia mt-2'><img src={Plus} alt="plus" />Add department</p>
                            <button type='button' className="w-full mt-8 py-2 border-none text-white bg-lydia rounded-md text-sm" onClick={() => setOnboardStep(3)}>Continue</button>
                        </div> :
                            <div className='third-step'>
                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employeeName" className="text-sm">Employee Name</label>
                                    <input type="text" name="employeeName" id="employeeName" placeholder="e.g John Doe" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employeeEmail" className="text-sm">Employee’s Email Address</label>
                                    <input type="email" name="employeeEmail" id="employeeEmail" placeholder="e.g. johndoe@email.com" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="role" className="text-sm">What would their role be?</label>
                                    <select name="role" id="role" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                        <option value="chef">Chef</option>
                                    </select>
                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>This is based off the departments created</em>
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employeeType" className="text-sm">Employee Type</label>
                                    <select name="employeeType" id="employeeType" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                        <option value="typeA">Type A</option>
                                    </select>
                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>This can be updated in-app</em>
                                </div>

                                <button type='button' className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm" onClick={() => setOnboardStep(1)}>Send Invite</button>
                                <button type='button' className="w-full py-2 border-none bg-white text-lydia rounded-md text-sm mt-4" onClick={() => setOnboardStep(1)}>Skip for now</button>
                            </div>
                    }
                </form>
            </div>
        </AuthLayout>
    )
}

export default Onboarding