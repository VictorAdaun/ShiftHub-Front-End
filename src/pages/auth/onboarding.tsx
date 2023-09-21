import React, { useState } from 'react'
import AuthLayout from "../../layouts/auth"
import Trash from "../../assets/trash.svg"
import Plus from "../../assets/Plus.svg"
// import ReactPortal from '../../Reactportal'
import Modal from '../../components/modal'
import PrimaryButton from '../../components/button/primary-button'
import Close from '../../assets/svgs/close-circle.svg'
import Avatar from "../../assets/imgs/sample-avatar.png"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../utils/constants"
import FormError from "../../components/form/form-error"
import CreatableSelect from "react-select/creatable"
import Icon from '../../components/icon'

interface IFormInput {
    company_name: string,
    company_address: string,
    week: string,
    department: string,
    roles: Array<{ value, label }>,
    employee_name: string,
    employee_mail: string,
    employee_role: string,
    employee_type: string,
}

const schema = yup
    .object({
        company_name: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        company_address: yup.string()
            .required(constants.FIELD_REQUIRED_MESSAGE),
        week: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        departments: yup.array().of(yup.object().shape({
            departmentName: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
            roles: yup.array().of(yup.object().shape({
                value: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
                label: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
            })).required(constants.FIELD_REQUIRED_MESSAGE),
        })),
        employee_name: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        employee_mail: yup.string().required(constants.FIELD_REQUIRED_MESSAGE).email("This field should contain a valid email"),
        employee_role: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        employee_type: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    })
    .required();

type optionType = {
    value: string;
    label: string;
}


function Onboarding() {
    const options: optionType[] = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const {
        register,
        handleSubmit,
        trigger,
        control,
        formState: {
            errors
        }
    } = useForm({
        resolver: yupResolver(schema), defaultValues: {
            departments: [{ departmentName: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "departments"
    });

    const handleSignup = (data: IFormInput) => {
        console.log(data)
    }

    const [onboardStep, setOnboardStep] = useState(1);
    const [isInviteModalOpen, setInviteModalOpen] = useState(false);
    const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);

    const appendDept = () => {
        append({ departmentName: '' })
    }

    return (
        <AuthLayout>
            {/* <ReactPortal wrapperId="portal"> */}
            <Modal handleClose={() => setInviteModalOpen(false)} isOpen={isInviteModalOpen}>
                <div className="invite-modal text-center w-3/4">
                    <img src={Close} alt="close" className='ml-auto' />
                    <div className='mx-auto mb-2 flex items-center justify-center'>
                        <img src={Avatar} alt='avatar' />
                    </div>
                    <h3>Your employee has been added</h3>
                    <p className='text-sm text-[#667085] mt-2 mb-8'>Keep building your team</p>
                    <PrimaryButton onClick={() => console.log("holdd")}>Add another employee</PrimaryButton>
                    <PrimaryButton inverted onClick={() => setOnboardStep(1)}>Skip for now</PrimaryButton>
                </div>
            </Modal>
            {/* </ReactPortal> */}

            <Modal handleClose={() => setWelcomeModalOpen(false)} isOpen={isWelcomeModalOpen}>
                <div className="welcome-modal flex text-left w-full h-full">
                    <div className='w-1/2 bg-welcome-image bg-no-repeat bg-cover bg-center'>
                    </div>
                    <div className='w-1/2 flex flex-col justify-center items-start m-auto h-[90%] px-4'>
                        <img src={Close} alt="close" className='ml-auto mb-4' />
                        <h3 className='mb-2'>Welcome to EZ Scheduler, John Doe</h3>
                        <p className='text-[10px] text-[#667085] mb-4'>Lörem ipsum faliga makroter att märell, nysonat, i mikronomi. Bett vinstvarning hexadossade käpåktigt. Sona metagraf emedan pidys. Talpenna curlingförälder gåsam, i tenyns trefasamma. </p>
                        <PrimaryButton className='mt-auto ml-auto' sm onClick={() => console.log("holdd")}>
                            Continue
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>

            <div className="onboarding w-[80%] md:w-full max-w-[425px] h-auto mx-auto my-12 text-center">
                <div className="timeline flex justify-between items-center mx-auto mb-4 w-3/4 mt-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep > 1 ? "bg-lydia" : null}`}>
                        {onboardStep > 1 ? <Icon name='check'/> : <span className="text-sm font-normal text-lydia">1</span>}
                    </div>
                    <hr className="w-1/3 border-lydia border-t-2 border-dotted"></hr>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep === 3 ? "bg-lydia" : null}`}>
                        {onboardStep === 3 ? <Icon name='check'/> : <span className="text-sm font-normal text-lydia">2</span> }
                    </div>
                    <hr className={`w-1/3 border-[#D0D5DD] border-t-2 border-dotted ${onboardStep === 3 ? "border-lydia" : null}`}></hr>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-solid border-lydia ${onboardStep >= 4 ? "bg-lydia" : null}`}>
                        {onboardStep >= 4 ? <Icon name='check'/> : <span className="text-sm font-normal text-lydia">3</span>}
                    </div>
                </div>
                {onboardStep === 1 ?
                    <>
                        <h1 className="my-2 text-2xl">Let's get to know you</h1>
                        <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">Don't worry this only takes 2 minutes</p>
                    </> : onboardStep === 2 ?
                        <>
                            <h1 className="my-2 text-2xl">Let's organize your schedules!</h1>
                            <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">We’ll create separate schedules based on the departments you add. You can always add more later.</p>
                        </> :
                        <>
                            <h1 className="my-2 text-2xl">Collaborate with your teammates</h1>
                            <p className="text-lg mb-4 font-light tracking-wide text-[#667085]">Add managers and employees and see how your entire team’s workflow improves with EZ Scheduler.</p>
                        </>
                }

                <form className="w-full" onSubmit={handleSubmit(handleSignup)}>
                    {onboardStep === 1 ?
                        <div className='first-step'>
                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="company_name" className="text-sm">Company Name</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    id="company_name"
                                    placeholder="e.g John Doe's Restaurant"
                                    {...register("company_name")}
                                    className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                {errors.company_name && <FormError error={errors.company_name.message} />}
                            </div>

                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="company_address" className="text-sm">Company Address</label>
                                <input
                                    type="text"
                                    name="company_address"
                                    id="company_address"
                                    placeholder="Enter an address or city"
                                    {...register("company_address")}
                                    className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                <em className="not-italic text-sm font-light tracking-wide text-[#667085]">This helps us give you accurate, location-based compliance info</em>
                                {errors.company_address && <FormError error={errors.company_address.message} />}
                            </div>

                            <div className="field flex flex-col items-start gap-2 mb-6">
                                <label htmlFor="week" className="text-sm">What day of the week do your schedules start?</label>
                                <select
                                    name="week"
                                    id="week"
                                    {...register("week")}
                                    className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                    <option value="Monday">Monday</option>
                                </select>
                                {errors.week && <FormError error={errors.week.message} />}
                            </div>

                            <PrimaryButton type="button" onClick={async () => {
                                const isValid =
                                    await trigger([
                                        "company_name",
                                        "company_address",
                                        "week"])
                                if (!isValid) return;

                                setOnboardStep(2)
                            }}>Continue</PrimaryButton>
                        </div>
                        : onboardStep === 2 ?
                            <div className='second-step'>
                                {fields.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='department flex flex-row gap-4 border border-solid border-[#D0D5DD] p-4 items-start mb-8'>
                                                <div className="field flex flex-col items-start gap-2 mb-4 w-full">
                                                    <label htmlFor="department" className="text-sm">Department</label>
                                                    <input
                                                        type="text"
                                                        name="department"
                                                        id="department"
                                                        placeholder="e.g Kitchen"
                                                        {...register(`departments.${index}.departmentName`)}
                                                        className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                                    {errors.departments?.[index]?.departmentName && <FormError error={errors.departments?.[index]?.departmentName.message} />}
                                                </div>

                                                <div className="field flex flex-col items-start gap-2 mb-4 w-full">
                                                    <label htmlFor="roles" className="text-sm">Roles?</label>
                                                    <Controller
                                                        name={`departments.${index}.roles`}
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <CreatableSelect
                                                                classNames={{
                                                                    control: () => "",
                                                                    container: () => 'w-full'
                                                                }}
                                                                {...field} isMulti options={options} />
                                                        )}
                                                    />
                                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>Choose from popular roles or type to create new roles.</em>
                                                    {errors.departments?.[index]?.roles && <FormError error={errors.departments?.[index]?.roles.message} />}
                                                </div>
                                                <img onClick={() => remove(index)} src={Trash} alt='trash' className='cursor-pointer mt-8' />
                                            </div>
                                        </div>)
                                })}
                                <p className='flex gap-2 text-left text-sm font-light tracking-wide text-lydia my-4 cursor-pointer' onClick={() => appendDept()}><img src={Plus} alt="plus" />Add department</p>
                                <PrimaryButton type="button" onClick={async () => {
                                    const isValid =
                                        await trigger([
                                            "departments"])
                                    if (!isValid) return;

                                    setOnboardStep(3)
                                }}>Continue</PrimaryButton>
                            </div> :
                            <div className='third-step'>
                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employee_name" className="text-sm">Employee Name</label>
                                    <input
                                        {...register("employee_name")}
                                        type="text"
                                        name="employee_name"
                                        id="employee_name"
                                        placeholder="e.g John Doe"
                                        className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                    {errors.employee_name && <FormError error={errors.employee_name.message}/>}
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employee_mail" className="text-sm">Employee’s Email Address</label>
                                    <input
                                        {...register("employee_mail")}
                                        type="email"
                                        name="employee_mail"
                                        id="employee_mail"
                                        placeholder="e.g. johndoe@email.com"
                                        className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                                        {errors.employee_mail && <FormError error={errors.employee_mail.message}/>}
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employee_role" className="text-sm">What would their role be?</label>
                                    <select
                                        {...register("employee_role")}
                                        name="employee_role"
                                        id="employee_role"
                                        className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                        <option value="chef">Chef</option>
                                    </select>
                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>This is based off the departments created</em>
                                    {errors.employee_role && <FormError error={errors.employee_role.message}/>}
                                </div>

                                <div className="field flex flex-col items-start gap-2 mb-6">
                                    <label htmlFor="employee_type" className="text-sm">Employee Type</label>
                                    <select
                                        {...register("employee_type")}
                                        name="employee_type"
                                        id="employee_type"
                                        className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2">
                                        <option value="typeA">Type A</option>
                                    </select>
                                    <em className='not-italic text-sm font-light tracking-wide text-[#667085]'>This can be updated in-app</em>
                                    {errors.employee_type && <FormError error={errors.employee_type.message}/>}
                                </div>

                                <button type='button' className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm" onClick={() => setOnboardStep(1)}>Send Invite</button>
                                <button type='submit' className="w-full py-2 border-none bg-white text-lydia rounded-md text-sm mt-4">Skip for now</button>
                            </div>
                    }
                </form>
            </div>
        </AuthLayout>
    )
}

export default Onboarding