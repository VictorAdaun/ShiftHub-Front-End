import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import Empty from "../../../assets/illustrations/NewBeginnings.svg"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom"
import MainLoader from "../../../assets/mainLoader.gif"
import { useQueryClient } from "react-query"

function Task() {
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const [status, setStatus] = useState("")

    // Fetch tasks
    const fetchTasks = async () => {
        const { data } = await axiosInstance.get(status === "" ? "/api/tasks/company" : `/api/tasks/company?status=${status}`)
        return data.result.data
    }
    const tasksQuery = useQuery(["tasks", status],
        fetchTasks, {
        enabled: true,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    // Edit tasks
    const editTaskRequest = (data) => {
        return axiosInstance.put(`/task-update/${data}`)
    }

    const editTaskMutation = useMutation({
        mutationFn: editTaskRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            queryClient.invalidateQueries("tasks")
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })

    // Delete tasks
    const deleteTaskRequest = (data) => {
        return axiosInstance.delete(`/api/task/delete/${data}`)
    }

    const deleteTaskMutation = useMutation({
        mutationFn: deleteTaskRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            queryClient.invalidateQueries("tasks")
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })

    return (
        <>
            <ToastContainer />
            <div className="container w-[90%] mx-auto mt-8 mb-[75px] h-auto">
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
                            View drafts
                        </PrimaryButton>
                        <PrimaryButton className="!px-2 !py-4" onClick={() => navigate("/task/create-task")}>
                            Create new task
                        </PrimaryButton>
                    </div>
                </div>

                <div className="btn-bar flex justify-between mt-8">
                    <div className="flex gap-4 items-center">
                        <PrimaryButton className={`px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2 ${status === "OVERDUE" ? "!border-lydia !text-lydia" : null}`} onClick={() => setStatus("OVERDUE")}>
                            Overdue
                        </PrimaryButton>
                        <PrimaryButton className={`px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2 ${status === "COMPLETED" ? "!border-lydia !text-lydia" : null}`} onClick={() => setStatus("COMPLETED")}>
                            Completed
                        </PrimaryButton>
                        <PrimaryButton className={`px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2 ${status === "IN_PROGRESS" ? "!border-lydia !text-lydia" : null}`} onClick={() => setStatus("IN_PROGRESS")}>
                            In-progress
                        </PrimaryButton>
                        <PrimaryButton className={`px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2 ${status === "" ? "!border-lydia !text-lydia" : null}`} onClick={() => setStatus("")}>
                            All
                        </PrimaryButton>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <Icon name="search" />
                            <input type="text" placeholder="Search" className="w-24 outline-none h-full text-grayscale-60 placeholder:text-grayscale-60 text-sm" />
                        </div>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit flex gap-2 items-center">
                            <Icon name="sort" />
                            Sort
                        </PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit flex gap-2 items-center">
                            <Icon name="filter" />
                            Filter
                        </PrimaryButton>
                    </div>
                </div>

                {tasksQuery.isLoading ? <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                    <img src={MainLoader} alt="main loader" />
                </section>
                    : tasksQuery.data?.data.length < 1 ?
                        <section className="w-full h-[500px] my-8 border border-solid border-grayscale-30 rounded-md flex flex-col items-center justify-center gap-2">
                            <img src={Empty} alt="no schedule" />
                            <h2>No tasks have been created</h2>
                            <p className="text-grayscale-60 text-sm">Create and publish your tasks</p>
                            <PrimaryButton className="!px-4 !py-4 !w-fit mt-2">
                                Get Started
                            </PrimaryButton>
                        </section> :
                        <section className="tasks">
                            {tasksQuery.data?.data.map((task, id) => {

                                const dueDate = new Date(task.endDate).toString().substring(0, 15)

                                return (
                                    <div key={id} className="swap w-full my-4 p-4 border border-solid border-grayscale-30 rounded-md flex justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <p className="text-grayscale-100">{task.title}</p>
                                                {task.status === "COMPLETED" ? <p className="text-grayscale-60 text-sm">Completed on {dueDate}</p> : task.status === "OVERDUE" ? <p className="text-grayscale-60 text-sm">Overdue on {dueDate}</p> :
                                                <em className="text-sm text-grayscale-60 not-italic">Due by {dueDate}</em>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <div className="cursor-pointer">
                                                <Icon name="tickSm" />
                                            </div>
                                            <p className="cursor-pointer text-[#E62E2E]" onClick={()=> deleteTaskMutation.mutate(task.id)}>Delete</p>
                                            <Link to={`/task/view?id=${task.id}`} className="text-lydia">View</Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </section>}
            </div>
        </>
    );
}

export default Task;
