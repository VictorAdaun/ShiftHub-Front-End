import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Avatar from "../../../assets/imgs/sample-avatar.png"
import { useSearchParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"


function View() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const taskInputRef = useRef(null)

    const [searchParams, setSearchParams] = useSearchParams()

    // Get task request
    const fetchTask = async () => {
        const { data } = await axiosInstance.get(`/api/task/${searchParams.get("id")}`)
        return data.result
    }
    const taskQuery = useQuery("task",
        fetchTask, {
        enabled: true,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    const fetchDashboard = async () => {
        const { data } = await axiosInstance.get(`/api/team/dashboard/count`)
        return data.result
    }
    const dashboardQuery = useQuery("dashboard",
        fetchDashboard, {
        enabled: true,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    const dueDate = new Date(taskQuery.data?.tasks.endDate).toString().substring(0, 15)


    // Task functions
    const [tasks, setTasks] = useState([1, 2, 3])

    const addTask = () => {
        if (taskInputRef.current.value !== "") {
            setTasks([...tasks, taskInputRef.current.value])
            taskInputRef.current.value = ""
        }
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((item, index) => index !== id))
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

                {taskQuery.isLoading ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                    <img src={MainLoader} alt="main loader" />
                </section> : taskQuery.isSuccess && taskQuery.data !== undefined && taskQuery.data !== null ?
                    <>
                        <div className="heading flex items-center mt-4">
                            <div className="heading-left w-2/3">
                                <h2 className="text-[25px]">{taskQuery.data.tasks.title}</h2>

                                <div className="flex items-center gap-4 mt-2 [&>p]:capitalize [&>p]:text-sm">
                                    <p className="bg-[#FFF5E6] text-[#EDA12F] py-2 px-4 rounded-full">{taskQuery.data.tasks.status === "IN_PROGRESS" ? "IN PROGRESS" : taskQuery.data.tasks.status}</p>
                                    <div className="seperator w-[2px] h-[16px] bg-grayscale-20 rounded-md"></div>
                                    <p><em className="text-grayscale-60 not-italic mr-2">Priority:</em>{taskQuery.data.tasks.priority}</p>
                                    <div className="seperator w-[2px] h-[16px] bg-grayscale-20 rounded-md"></div>

                                    <p className={`flex items-center gap-2 ${taskQuery.data.tasks.status === "OVERDUE" ? "text-[#E62E2E]" : "text-lydia"} `}>

                                        {taskQuery.data.tasks.status === "COMPLETED" ?
                                            <p className="text-grayscale-60 text-sm">Completed on {dueDate}</p> :
                                            taskQuery.data.tasks.status === "OVERDUE" ?
                                                <>
                                                    <Icon name="redTimer" />
                                                    <p className="text-grayscale-60 text-sm"> Overdue on {dueDate}</p>
                                                </>
                                                :
                                                <em className="text-sm text-grayscale-60 not-italic">Due by {dueDate}</em>
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="btn-group flex gap-2 w-1/4 ml-auto">
                                <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                                    Edit Task
                                </PrimaryButton>
                                <PrimaryButton className="!px-2 !py-4">
                                    Close Task
                                </PrimaryButton>
                            </div>
                        </div>

                        <section className="my-8 w-[80%]">
                            <div className="row mb-8 flex justify-start gap-[30px] gap-4 items-center">
                                <p className="text-grayscale-60">Assigned to:</p>
                                <div className="flex">
                                    <div className="flex">
                                        <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                                        <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                                        <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                                    </div>
                                    <div className="h-[50px] w-[50px] border border-dashed border-grayscale-30 flex items-center justify-center rounded-full ml-4"><Icon name="addNaked" /></div>
                                </div>
                            </div>

                            <div className="row mb-8 justify-start gap-8 flex">
                                <p className="text-grayscale-60">Description:</p>
                                <p>Lörem ipsum nikyst päde päkus. Neser kalsongbadare. Håtysamma bolall, prengar. Sharenting ande. Tvodd gigall, dent nihet, innan enogon. </p>
                            </div>

                            <div className="row flex mb-8 justify-start gap-8">
                                <p className="text-grayscale-60 whitespace-nowrap">Task List (6):</p>
                                <div>
                                    {tasks.map((task, id) => {
                                        return (
                                            <div key={id} className="flex items-center gap-4 justify-between first:pt-0 py-4 border-b border-grayscale-40 border-solid mb-4">
                                                <p className="text-grayscale-100 whitespace-normal w-3/4">Assign available tables to confirmed reservations based on group size and preferences.</p>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Icon name="checkGrey" />
                                                    </div>
                                                    <div className="cursor-pointer h-[16px] w-[16px]" onClick={() => deleteTask(id)}>
                                                        <Icon name="trash" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="relative">
                                        <input name="addTask" ref={taskInputRef} placeholder="Add a task..." className="border-b border-grayscale-40 border-solid my-4 w-full py-4 outline-none" />
                                        <div className="absolute right-0 top-[30px] h-[16px] w-[16px] cursor-pointer" onClick={() => addTask()}>
                                            <Icon name="add" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                    :
                    <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                        <p className="text-grayscale-100">Task not found</p>
                    </section>
                }
            </div>
        </>
    );
}

export default View;
