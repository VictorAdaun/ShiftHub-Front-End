import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import TaskSidebar from "../../../components/task/task-sidebar"

function TaskDetails() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

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
                    <div className={`btn-group flex gap-2 ml-auto`}>
                        <PrimaryButton className="!px-4 !py-4">
                            Create new task
                        </PrimaryButton>
                    </div>
                </div>

                <section className="my-8 flex gap-16">
                    <div className="task-left w-1/4">
                    <TaskSidebar/>
                    </div>
                    <div className="task-right w-1/2">
                        <div className="field flex flex-col gap-2 mb-4">
                            <label>Task Name</label>
                            <input name="task_name" placeholder="e.g work review" className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60"/>
                        </div>
                        <div className="field flex flex-col gap-2 my-4">
                            <label>Task Description</label>
                            <input name="task_desc" placeholder="Input text" className="p-2 border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60"/>
                        </div>
                        <div className="field flex flex-col w-full text-left relative my-4">
                            <label>Priority</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Please select one</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                            <em className="text-grayscale-60 not-italic mt-2">This is to determine priority levels</em>
                        </div>
                        <div className="flex gap-4 my-4">
                            <div className="field flex flex-col w-full text-left relative">
                                <label>Start time</label>
                                <div className="flex w-full">
                                    <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                        <option>e.g 8:00am</option>
                                    </select>
                                    <Icon name="down" className="absolute right-[5px] top-[40px]" />
                                </div>
                            </div>
                            <div className="field flex flex-col w-full text-left relative">
                                <label>End time</label>
                                <div className="flex w-full">
                                    <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                        <option>e.g 12:00pm</option>
                                    </select>
                                    <Icon name="down" className="absolute right-[5px] top-[40px]" />
                                </div>
                            </div>
                        </div>
                        <PrimaryButton className="!px-4 !py-4 disabled:bg-[#F9FAFB] disabled:text-grayscale-40" disabled>Continue</PrimaryButton>
                    </div>
                </section>
            </div>
        </>
    );
}

export default TaskDetails;
