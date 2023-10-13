import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import TaskSidebar from "../../../components/task/task-sidebar"


function AssignTask() {

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
                    <div className="btn-group flex gap-2 w-1/4 ml-auto">
                        <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                            Duplicate Task
                        </PrimaryButton>
                        <PrimaryButton className="!px-2 !py-4">
                            Publish
                        </PrimaryButton>
                    </div>
                </div>

                <section className="my-8 flex gap-16">
                    <div className="task-left w-1/4">
                        <TaskSidebar/>
                    </div>
                    <div className="task-right w-1/2">
                        <div>
                            <p>Assign by shifts</p>
                            <em className="text-grayscale-60 not-italic text-sm">The tasks will apply to everyone within the selected shift</em>
                        </div>
                        <div className="flex gap-2 my-4 font-light">
                            <div className="border border-solid border-grayscale-40 py-2 w-1/3 rounded-md flex items-center justify-center gap-2">
                                <Icon name="morning" />
                                <p>Morning</p>
                            </div>
                            <div className="border border-solid border-grayscale-40 py-2 w-1/3 rounded-md flex items-center justify-center gap-2">
                                <Icon name="noon" />
                                <p>Afternoon</p>
                            </div>
                            <div className="border border-solid border-grayscale-40 py-2 w-1/3 rounded-md flex items-center justify-center gap-2">
                                <Icon name="evening" />
                                <p>Evening</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <hr className="w-full" />
                            <p className="w-full text-grayscale-60 text-sm">Or, assign by employees</p>
                            <hr className="w-full" />
                        </div>
                        <div>
                            <div className="flex justify-between items-center my-8 bg-grayscale-10 p-2">
                                <div className="flex gap-4 items-center">
                                    <p className="bg-[#F2F4F7] text-[#475467] h-[40px] w-[40px] flex items-center justify-center p-4 rounded-full">DW</p>
                                    <div>
                                        <p>Demi Wilkinson</p>
                                        <em className="text-grayscale-60 not-italic">demi@email.com</em>
                                    </div>
                                </div>
                                <div className="text-sm flex gap-4">
                                    <p className="pr-4 border-r-2 border-solid border-grayscale-30">Assign Task Lead</p>
                                    <p className="text-[#E62E2E]">Remove</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center my-8 p-2">
                                <div className="flex gap-4 items-center">
                                    <p className="bg-[#F2F4F7] text-[#475467] h-[40px] w-[40px] flex items-center justify-center p-4 rounded-full">DW</p>
                                    <div>
                                        <p>Demi Wilkinson</p>
                                        <em className="text-grayscale-60 not-italic">demi@email.com</em>
                                    </div>
                                </div>
                                <div className="text-sm flex gap-4">
                                    <p className="text-[#E62E2E]">Remove</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center my-8 p-2">
                                <div className="flex gap-4 items-center">
                                    <p className="bg-[#F2F4F7] text-[#475467] h-[40px] w-[40px] flex items-center justify-center p-4 rounded-full">DW</p>
                                    <div>
                                        <p>Demi Wilkinson</p>
                                        <em className="text-grayscale-60 not-italic">demi@email.com</em>
                                    </div>
                                </div>
                                <div className="text-sm flex gap-4">
                                    <p className="text-[#E62E2E]">Remove</p>
                                </div>
                            </div>
                        </div>
                        <div className="field flex flex-col w-full text-left relative my-4">
                            <label>Team Member</label>
                            <div className="flex w-full">
                                <select className="appearance-none border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60">
                                    <option>Select team member</option>
                                </select>
                                <Icon name="down" className="absolute right-[5px] top-[40px]" />
                            </div>
                        </div>
                        <PrimaryButton className="!px-4 !py-4 disabled:bg-[#F9FAFB] disabled:text-grayscale-40">Save and Publish Task</PrimaryButton>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AssignTask;
