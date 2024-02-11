import React, { useMemo, useState, useEffect } from "react"
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
import { useAuthContext } from "../../../context/auth"
import bb, { bar, donut } from "billboard.js";
import 'billboard.js/dist/billboard.css'
import "../../../styles/chart.scss"
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from "../../../components/modal"



function Employee() {

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const [isDetailsMenuOpen, setIsDetailsMenuOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false)

    const ctx = useAuthContext();


    // Graph Data
    const barChartConfig = {
        data: {
            columns: [
                ["Attendance", 30, 40, 10, 40, 15, 65, 30, 40, 10, 40, 15, 65],
                ["Shifts Completed", 20, 10, 20, 60, 25, 75, 30, 40, 10, 40, 15, 65],
            ],
            type: bar(),
            groups: [
                [
                    "Attendance",
                    "Shifts Completed"
                ]
            ],
            colors: {
                Attendance: "#7B68EE",
                "Shifts Completed": "#49CCF9"
            },
        },

        legend: {
            position: "inset",  // bottom, right, inset
            inset: {
                anchor: "top-right",
                x: 40,
                y: 0,
                step: 2
            },
            padding: 10,
            item: {
                tile: {
                    width: 15,
                    height: 15,
                    type: "circle" as const,
                    r: 5
                }
            },
            contents: {
                bindto: "#legend",
                template: "<span style='display: flex; gap: 3px; align-items: center; color:#000;padding:10px;'><span style='height:10px; width: 10px; border-radius: 2px; background-color: {=COLOR}; display: block'></span>{=TITLE}</span>"
            }
        },
        bar: {
            width: {
                ratio: 0.25
            }
        },
        grid: {
            y: {
                show: false
            },
        },
        axis: {
            y: {
                max: 100,
                min: 10,
                tick: {
                    values: [0, 25, 50, 75, 100],
                    format: function (d) {
                        return d + "%";
                    },
                    outer: false,
                    show: false,
                },
            },
            x: {
                type: "category" as const,
                categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                tick: {
                    outer: false,
                    show: false,
                },
            }
        },
        bindto: "#top_counterparties"
    }

    useEffect(() => {
        bb.generate(barChartConfig)
    })

    return (
        <>
            {/* Modals */}
            <Modal
                handleClose={() => setIsBlacklistModalOpen(false)}
                isOpen={isBlacklistModalOpen}
            >
                <div className="delete-modal text-center w-[544px] bg-white rounded-md p-4 !text-left">
                    <Icon name="closeGreyNaked" className="ml-auto" />
                    <div className="flex items-start gap-8 mb-8">
                        <div className="h-[40px] w-[40px] rounded-full bg-[#E5E1FC66] flex items-center justify-center">
                            <Icon name="face" />
                        </div>
                        <div className="w-3/4">
                            <h3 className="font-bold">Blacklist Kelly Casper</h3>
                            <p className="text-sm text-[#667085]">
                                Are you sure you want to blacklist Kelly Casper? This action can be undone.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-[85%] ml-auto">
                        <div className="flex gap-2 text-sm items-center">
                            <input type="checkbox" name="noShow" />
                            <p>Don't show this again</p>
                        </div>
                        <div className="flex gap-2 w-1/3">
                            <PrimaryButton className="!py-[10px] px-[10px] !border !border-solid !text-grayscale-100 !border-grayscale-40 !bg-white">
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="!py-[10px] px-[10px]">
                                Confirm
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                handleClose={() => setIsDeleteModalOpen(false)}
                isOpen={isDeleteModalOpen}
            >
                <div className="delete-modal text-center w-[544px] bg-white rounded-md p-4 !text-left">
                    <Icon name="closeGreyNaked" className="ml-auto" />
                    <div className="flex items-start gap-8 mb-8">
                        <div className="h-[40px] w-[40px] rounded-full bg-[#E5E1FC66] flex items-center justify-center">
                            <Icon name="face" />
                        </div>
                        <div className="w-3/4">
                            <h3 className="font-bold">Delete Kelly Casper</h3>
                            <p className="text-sm text-[#667085]">
                            Are you sure you want to delete Kelly Casper? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center w-[85%] ml-auto">
                        <div className="flex gap-2 text-sm items-center">
                            <input type="checkbox" name="noShow" />
                            <p>Don't show this again</p>
                        </div>
                        <div className="flex gap-2 w-1/3">
                            <PrimaryButton className="!py-[10px] px-[10px] !border !border-solid !text-grayscale-100 !border-grayscale-40 !bg-white">
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="!py-[10px] px-[10px] !bg-[#E62E2E]">
                                Confirm
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

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
                        <h2 className="text-[25px]">Kelly Casper</h2>
                    </div>
                    <div className="btn-group flex gap-2 w-1/6 ml-auto">
                        <PrimaryButton className="!px !py-4">
                            Generate Report
                        </PrimaryButton>
                    </div>
                </div>

                <div className="details border border-solid border-[#EAEBF0] rounded-md my-8">
                    <div className="w-full border-b border-solid border-[#EAEBF0] p-4 flex justify-between relative">
                        <p>Employee Details</p>
                        <div className="cursor-pointer" onClick={() => setIsDetailsMenuOpen((prev => !prev))}>
                            <Icon name="darkDot" />
                        </div>
                        {isDetailsMenuOpen ?
                            <div className="rounded-md bg-white text-grayscale-60 absolute py-2 top-[30px] right-[30px] shadow-md flex flex-col [&>p]:cursor-pointer [&>p]:flex [&>p]:gap-4 [&>p]:items-center [&>p]:w-full [&>p]:px-8 [&>p]:py-2">
                                <p className="hover:bg-[#E5E1FC66] cursor-pointer" onClick={()=> setIsBlacklistModalOpen(true)}><Icon name="blacklist" /> Blacklist</p>
                                <p className="hover:bg-[#E5E1FC66] cursor-pointer" onClick={()=> setIsDeleteModalOpen(true)}><Icon name="trash" /> Delete</p>
                            </div> : null}
                    </div>

                    <div className="flex gap-32 px-4 py-8">
                        <div className="h-[70px] w-[70px] rounded-full bg-[#000]">
                        </div>
                        <div className="column [&>div>em]:not-italic [&>div>em]:text-grayscale-60">
                            <div className="field mb-4">
                                <em>Full Name:</em>
                                <p>Kelly Casper</p>
                            </div>

                            <div className="field">
                                <em>Email:</em>
                                <p>kellycasper@email.com</p>
                            </div>
                        </div>
                        <div className="column [&>div>em]:not-italic [&>div>em]:text-grayscale-60">
                            <div className="field mb-4">
                                <em>Department:</em>
                                <p>Back of house</p>
                            </div>

                            <div className="field">
                                <em>Contract:</em>
                                <p>Full-time Employee</p>
                            </div>
                        </div>
                        <div className="column [&>div>em]:not-italic [&>div>em]:text-grayscale-60">
                            <div className="field mb-4">
                                <em>Job Role:</em>
                                <p>Manager</p>
                            </div>

                            <div className="field">
                                <em>Location:</em>
                                <p>New York</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="details border border-solid border-[#EAEBF0] rounded-md my-8">
                    <div className="w-full border-b border-solid border-[#EAEBF0] p-4 flex justify-between relative">
                        <p>Top Counterparties</p>
                        <select className="mb-2 text-grayscale-60 text-sm outline-none">
                            <option>Yearly</option>
                            <option>Monthly</option>
                        </select>
                    </div>

                    <div className="flex px-4 py-8 items-center justify-center relative">
                        <div id="top_counterparties"></div>
                        <div id="legend" className="absolute top-[0px] right-[20px] flex"></div>
                    </div>
                </div>

                <div className="dashboard border border-solid border-[#EAEBF0] rounded-md my-8 flex">
                    <div className="totalHours w-1/2 h-auto p-4 border-r border-solid border-[#EAEBF0] flex flex-col justify-center gap-10">
                        <div className="heading flex items-center justify-between ">
                            <p className="text-sm">Total Hours Worked:</p>
                            <div className="flex items-center gap-4">
                                <div className="flex text-grayscale-60 text-sm items-center border border-solid border-grayscale-30 rounded-md">
                                    <PrimaryButton className="px-[5px] py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                        <Icon name="leftLight" />
                                    </PrimaryButton>
                                    <span><p>September</p></span>
                                    <PrimaryButton className="px-[5px] py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                        <Icon name="rightLight" />
                                    </PrimaryButton>
                                </div>
                                <select className="text-grayscale-60 text-sm outline-none">
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-[200px] w-[200px] mx-auto">
                            <CircularProgressbarWithChildren
                                value={45}
                                strokeWidth={12}
                                styles={{
                                    path: {
                                        stroke: `#7B68EE`,
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 0.4s ease 0s',
                                    },
                                    trail: {
                                        stroke: `#E5E1FC66`,
                                    },
                                }}
                            >
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold">45</h1>
                                    <p className="text-grayscale-60">Hours</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                        <p className="text-grayscale-60 mx-auto text-sm my-2 w-fit">Total time off taken in this month</p>
                    </div>
                    <div className="overtimeHours w-1/2 p-4 border-r border-solid border-[#EAEBF0] flex flex-col justify-center gap-10">
                        <div className="heading flex items-center justify-between ">
                            <p className="text-sm">Overtime Hours:</p>
                            <div className="flex items-center gap-4">
                                <div className="flex text-grayscale-60 text-sm items-center border border-solid border-grayscale-30 rounded-md">
                                    <PrimaryButton className="px-[5px] py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                        <Icon name="leftLight" />
                                    </PrimaryButton>
                                    <span><p>September</p></span>
                                    <PrimaryButton className="px-[5px] py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                        <Icon name="rightLight" />
                                    </PrimaryButton>
                                </div>
                                <select className="text-grayscale-60 text-sm outline-none">
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-[200px] w-[200px] mx-auto">
                            <CircularProgressbarWithChildren
                                value={70}
                                strokeWidth={12}
                                styles={{
                                    path: {
                                        stroke: `#49CCF9`,
                                        strokeLinecap: 'butt',
                                        transition: 'stroke-dashoffset 0.4s ease 0s',
                                    },
                                    trail: {
                                        stroke: `#E5E1FC66`,
                                    },
                                }}
                            >
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold">70</h1>
                                    <p className="text-grayscale-60">Hours</p>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                        <p className="text-grayscale-60 mx-auto text-sm my-2 w-fit">Total over time taken in this week</p>
                    </div>
                </div>

                <div className="stats my-4 border border-solid border-grayscale-30 rounded-md">
                    <div className="heading flex items-center justify-between w-full border-b border-solid border-[#EAEBF0] p-4">
                        <p className="text-[18px] font-bold">Stats</p>
                        <div className="flex items-center gap-4">
                            <div className="flex text-grayscale-60 text-sm items-center border border-solid border-grayscale-30 rounded-md">
                                <PrimaryButton className="px-[5px] !py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                    <Icon name="leftLight" />
                                </PrimaryButton>
                                <span><p>September</p></span>
                                <PrimaryButton className="px-[5px] !py-[10px] !bg-white !text-grayscale-60 !w-fit">
                                    <Icon name="rightLight" />
                                </PrimaryButton>
                            </div>
                            <select className="text-grayscale-60 text-sm outline-none">
                                <option>Weekly</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] p-4">
                        {["totalEmployees", "activeEmployees", "scheduledShift", "shiftCoverage", "totalEmployees", "activeEmployees", "scheduledShift", "shiftCoverage", "totalEmployees", "activeEmployees", "scheduledShift", "shiftCoverage"].map((item, id) => {
                            return (
                                <div className={`card w-full ${id === 1 || id === 2 || id === 3 ? "border-t-0" : id === 4 || id === 8 ? "border-l-0" : id === 0 ? "border-l-0 border-t-0" : null} border border-r-0 border-b-0 border-solid border-grayscale-30 p-4`} key={id}>
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
                </div>
            </div>
        </>
    );
}

export default Employee;
