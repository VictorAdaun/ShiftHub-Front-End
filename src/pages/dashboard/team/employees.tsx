import React, { useMemo, useState, useRef } from "react"
import "../../../styles/schedule.scss"
import Icon from "../../../components/icon"
import PrimaryButton from "../../../components/button/primary-button"
import { useSearchParams } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import { AxiosError } from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLoader from "../../../assets/mainLoader.gif"
import { EmployeesTable } from "../../../components/team/employeeTable"
import MData from "../../../utils/MOCK_DATA.json"
import { TeamTable } from "../../../components/team/teamTable"
import { useAuthContext } from "../../../context/auth"

function Employees() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const [search, setSearch] = useState<string>("")

    const ctx = useAuthContext()

    // const [inviteId, setInviteId] = useState(null)


    // Table details
    const data = useMemo(() => MData, [])

    const headers = ['Employee', 'Attendance', 'Shift completed', 'Sick days', 'Average Shift Duration'];
    const accessors = ['employee', 'attendance', 'shiftCompleted', 'sickDays', 'averageShiftDuration'];

    const columns = useMemo(() => headers.map((header, index) => {
        const column = {
            header: () => (
                <p className="flex gap-2 items-center">
                    {header} <Icon name="greyDown" />
                </p>
            ),
            accessorKey: accessors[index],
            cell: (row) => row.renderValue(),
        };


        if (header === 'Employee') {
            column["accessorFn"] = (row) => {
                return (
                    <div>
                        <p>{row.employee}</p>
                    </div>
                )
            };
        }

        return column;
    }), [])

    const tHeaders = ['Employee', 'Attendance', 'Shift completed', 'Sick days', 'Average Shift Duration'];
    const tAccessors = ['employee', 'attendance', 'shiftCompleted', 'sickDays', 'averageShiftDuration'];

    const teamColumns = useMemo(() => tHeaders.map((header, index) => {
        const column = {
            header: () => (
                <p className="flex gap-2 items-center">
                    {header !== 'view' ? <>{header} <Icon name="greyDown" /></> : <p className="text-[#fff]">View</p>}
                </p>
            ),
            accessorKey: tAccessors[index],
            cell: (row) => row.renderValue(),
        };

        if (header === 'Employee') {
            column["accessorFn"] = (row) => {
                return (
                    <div>
                        <p>{row.employee}</p>
                    </div>
                )
            };
        }

        return column;
    }), [])

    // Page API calls
    const fetchEmployees = async () => {
        const { data } = await axiosInstance.get("/api/team/dashboard/count")
        return data.result.data
    }
    const employeesQuery = useQuery("employees",
        fetchEmployees, {
        onSuccess: (data) => {
            console.log(data)
        },
    })

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
                        <h2 className="text-[25px]">Employees</h2>
                        <p className="text-sm text-grayscale-60">Here are all the employees at your company. </p>
                    </div>
                    <div className="btn-group flex gap-2 w-1/4 ml-auto">
                        <PrimaryButton className="!px-2 !py-4 bg-white !text-grayscale-100 border !border-solid border-grayscale-40">
                            Import CSV
                        </PrimaryButton>
                        <PrimaryButton className="!px-2 !py-4">
                            Add Employee
                        </PrimaryButton>
                    </div>
                </div>

                <section>
                    <div className="dashboard flex gap-8 my-8">
                        {["totalEmployees", "activeEmployees", "scheduledShift", "shiftCoverage"].map((item, id) => {
                            return (
                                <div className="card w-1/4 border border-solid border-grayscale-30 p-4 rounded-md" key={id}>
                                    <div className="h-[30px] w-[30px] bg-[#E5E1FC66] rounded-md flex items-center justify-center mb-2">
                                        <Icon name={item} />
                                    </div>
                                    <p className="text-grayscale-60">{item === "totalEmployees" ? "Total Employees" : item === "activeEmployees" ? "Active Employees" : item === "scheduledShift" ? "Scheduled Shifts" : "Shift Coverage"}</p>
                                    <div className="flex my-4">
                                        <h2 className="font-bold text-3xl mr-4">300</h2>
                                        <p className="flex gap-2 items-center bg-[#E5E1FC66] text-lydia py-[3px] px-2 rounded-md"> <Icon name="arrowTrending" /> 6.7%</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="relative">
                        <div className="absolute top-4 left-4">
                            <Icon name="search" />
                        </div>
                        <input type="text" placeholder="Search by employee name, role" className="border border-solid border-grayscale-30 rounded-md w-full p-4 text-sm placeholder:text-sm text-grayscale-60 placeholder:text-grayscale-60 pl-10" />
                    </div>

                    <EmployeesTable data={data} columns={columns} />

                    <div className="my-4 flex items-center justify-between">
                        <div>
                            <h1 className="text-[24px]">Team Invites</h1>
                            <p className="text-grayscale-60">Manage your team invites</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p>Today</p>
                            <div className="flex">
                                <div className="p-2 border border-solid border-grasycale-60 rounded-l-md border-r-0">
                                    <Icon name="arrowLeftLong" />
                                </div>
                                <div className="p-2 border border-solid border-grasycale-60 rounded-r-md">
                                    <Icon name="arrowRightLong" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <TeamTable data={data} columns={teamColumns} />
                </section>
            </div>
        </>
    );
}

export default Employees;
