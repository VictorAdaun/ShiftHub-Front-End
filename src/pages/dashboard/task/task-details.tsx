import React, { useMemo, useState, useEffect } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import TaskSidebar from "../../../components/task/task-sidebar"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../../utils/constants"
import FormError from "../../../components/form/form-error"
import { useNavigate } from "react-router-dom"

interface IFormInput {
    title: string,
    description: string,
    priority: string,
    startDate: string,
    endDate: string,
}

const schema = yup
    .object({
        title: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        description: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        priority: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        startDate: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        endDate: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
    })
    .required();


function TaskDetails() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });


    const handleTaskDetails = (data: IFormInput) => {

        data["startDate"] = new Date(data["startDate"]).toISOString() 

        data["endDate"] = new Date(data["endDate"]).toISOString() 

        localStorage.setItem("taskDetails", JSON.stringify(data))

        console.log(data)

        navigate("/task/create-task/task-list")
    }


    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <div className="flex gap-2" key={id}>
                                {path !== "" ? <p className="capitalize last:text-lydia">{path}</p> : null}
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </div>
                        );
                    })}
                </div>
                <div className="heading flex items-center mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Task</h2>
                        <p className="text-sm text-grayscale-60">Tres vubösm trens. Pode kanade för plaskap. </p>
                    </div>
                </div>

                <section className="my-8 flex gap-16">
                    <div className="task-left w-1/4">
                        <TaskSidebar />
                    </div>
                    <form className="task-right w-1/2" onSubmit={handleSubmit(handleTaskDetails)}>
                        <div className="field flex flex-col gap-2 mb-4">
                            <label>Task Name</label>
                            <input
                                name="title"
                                {...register("title")}
                                placeholder="e.g work review"
                                className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 placeholder:text-grayscale-60 text-grayscale-60 text-sm placeholder:text-sm" />
                            {errors.title && <FormError error={errors.title.message} />}
                        </div>
                        <div className="field flex flex-col gap-2 my-4">
                            <label>Task Description</label>
                            <input
                                name="description"
                                {...register("description")}
                                placeholder="Input text"
                                className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60 placeholder:text-grayscale-60 text-sm placeholder:text-sm" />
                            {errors.description && <FormError error={errors.description.message} />}
                        </div>
                        <div className="field flex flex-col w-full text-left relative my-4">
                            <label>Priority</label>
                            <div className="flex w-full">
                                <Controller
                                    name="priority"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            defaultValue={""}
                                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2"
                                        >
                                            <option value="" disabled>Please select one...</option>
                                            <option value="VERY_HIGH">VERY HIGH</option>
                                            <option value="HIGH">HIGH</option>
                                            <option value="MEDIUM">MEDIUM</option>
                                            <option value="LOW">LOW</option>
                                        </select>
                                    )}
                                />
                                {errors.priority && <FormError error={errors.priority.message} />}
                            </div>
                            <em className="text-grayscale-60 not-italic mt-2 text-sm">This is to determine priority levels</em>
                        </div>
                        <div className="flex gap-4 my-4">
                            <div className="field flex flex-col w-full text-left relative">
                                <label>Start time</label>
                                <div className="flex w-full">
                                    <input
                                        type="date"
                                        name="startDate"
                                        {...register("startDate")}
                                        placeholder="Start Date"
                                        className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60 text-sm placeholder:text-sm" />
                                    {errors.startDate && <FormError error={errors.startDate.message} />}
                                </div>
                            </div>
                            <div className="field flex flex-col w-full text-left relative">
                                <label>End time</label>
                                <div className="flex w-full">
                                    <input
                                        type="date"
                                        name="endDate"
                                        {...register("endDate")}
                                        placeholder="End Date"
                                        className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60 text-sm placeholder:text-sm" />
                                    {errors.endDate && <FormError error={errors.endDate.message} />}
                                </div>
                            </div>
                        </div>
                        <PrimaryButton type="submit" className="!px-4 !py-4 disabled:bg-[#F9FAFB] disabled:text-grayscale-40" >Continue</PrimaryButton>
                    </form>
                </section>
            </div>
        </>
    );
}

export default TaskDetails;
