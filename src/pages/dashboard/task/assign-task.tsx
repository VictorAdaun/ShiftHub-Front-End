import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import TaskSidebar from "../../../components/task/task-sidebar"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

function AssignTask() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const navigate = useNavigate()

    // Fetch employees
    const fetchEmployees = async () => {
        const { data } = await axiosInstance.get("/api/team/dashboard/users")
        return data.result.data
    }
    const employeesQuery = useQuery("employees",
        fetchEmployees, {
        enabled: true,
        onSuccess: (data) => {
            console.log(data)
        },
    })

    // Create task
    const createTaskRequest = (data) => {
        return axiosInstance.post(`/api/task/create/`, data)
    }

    const createTaskMutation = useMutation({
        mutationFn: createTaskRequest,
        onSuccess: (data) => {

            toast.success(data.data.result.message)

            localStorage.removeItem("taskDetails")
            localStorage.removeItem("taskList")
            navigate("/task")

        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })

    const [employees, setEmployees] = useState([])

    const [isTeamLead, setIsTeamLead] = useState(null)

    const publishTask = () => {
        const taskDetails = JSON.parse(localStorage.getItem("taskDetails"))
        const taskList = JSON.parse(localStorage.getItem("taskList"))

        const sortedEmployees = employees.map((employee) => {
            return {
                id: employee,
                isTeamLead: isTeamLead === employee ? true : false
            }
        })

        const payload = {
            title: taskDetails.title,
            description: taskDetails.description,
            priority: taskDetails.priority,
            startDate: taskDetails.startDate,
            endDate: taskDetails.endDate,
            notes: taskList,
            employees: sortedEmployees,
            assignType: "MEMBERS",
            status: "IN_PROGRESS",
            isDraft: false
        }

        createTaskMutation.mutate(payload)

        console.log(sortedEmployees)
    }

    return (
        <>
            <ToastContainer/>
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
                        <TaskSidebar />
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
                            {employees.map((employee, id) => {

                                const employeeDetails = employeesQuery.data?.data.find((item) => item.id === employee)

                                const initials = employeeDetails?.firstName.split("")[0] + employeeDetails?.lastName.split("")[0]
                                return (
                                    <div key={id} className="flex justify-between items-center my-8 bg-grayscale-10 p-2">
                                        <div className="flex gap-4 items-center">
                                            <p className="bg-[#F2F4F7] text-[#475467] h-[40px] w-[40px] flex items-center justify-center p-4 rounded-full uppercase">{initials}</p>
                                            <div>
                                                <p>{employeeDetails.fullName}</p>
                                                <em className="text-grayscale-60 not-italic">{employeeDetails.email}</em>
                                            </div>
                                        </div>
                                        <div className="text-sm flex gap-4">
                                            {isTeamLead === employee ?
                                                <p className="pr-4 border-r-2 border-solid border-grayscale-30 cursor-pointer" onClick={() => setIsTeamLead(null)}>Remove Task Lead</p> : null}
                                            {!isTeamLead ? <p className="pr-4 border-r-2 border-solid border-grayscale-30 cursor-pointer" onClick={() => setIsTeamLead(employee)}>Assign Task Lead</p> : null}
                                            <p className="text-[#E62E2E] cursor-pointer" onClick={() => {
                                                setEmployees((prev) => (
                                                    prev.filter((item) => item !== employee)
                                                ))
                                            }}>Remove</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="field flex flex-col w-full text-left relative my-4">
                            <label>Team Member</label>
                            <div className="flex w-full">
                                <select className="border border-solid border-grayscale-40 rounded-md p-[10px] outline-none w-full mt-2 text-grayscale-60"
                                    defaultValue={""}
                                    onChange={(e) => {
                                        if (employees.includes(e.target.value)) return

                                        setEmployees([...employees, e.target.value])
                                    }}
                                >
                                    <option disabled value={""}>Select team member</option>
                                    {employeesQuery.data?.data.map((employee, id) => {
                                        return (
                                            <option key={id} value={employee.id}>{employee.fullName}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <PrimaryButton className="!px-4 !py-4 disabled:bg-[#F9FAFB] disabled:text-grayscale-40" disabled={employees.length < 1} onClick={() => publishTask()}>Save and Publish Task</PrimaryButton>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AssignTask;
