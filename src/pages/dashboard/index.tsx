import { ReactNode, useEffect, useState, useMemo } from "react";
import { classNames } from "../../utils/functions";
import ArrowUp from "../../assets/svgs/dashboard/summary-card/arrow-trending-up.svg"
import ArrowDown from "../../assets/svgs/dashboard/summary-card/arrow-trending-down.svg"
import FilterIcon from "../../assets/svgs/dashboard/filter.svg"
import SearchIcon from "../../assets/svgs/dashboard/search-icon.svg"
import CustomSelect from "../../components/custom-select";
import bb, { bar, donut } from "billboard.js";
import 'billboard.js/dist/billboard.css'
import Icon from "../../components/icon";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import Avatar from "../../assets/imgs/test_avatar.png"
import Modal from "../../components/modal";
import PrimaryButton from "../../components/button/primary-button";


interface SummaryCardProps {
    title: string;
    amount: number;
    comparsion?: string;
    percentage: number;
    increase: boolean;
}

interface TeamMember {
    name: string;
    imgLink: string;
}

interface TableRowProps {
    name: string;
    department: string;
    priority: string;
    status: string;
    deadline: string;
    assignedTeam: TeamMember[];
    id: number;
}

interface TableDataProps {
    children: ReactNode
}

const mockTeam = [
    {
        id: 0,
        name: "Food Preparation and Cooking",
        department: "Back of House",
        priority: "Very high",
        status: "in-progress",
        deadline: "Aug 04 2023",
        assignedTeam: [

            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
        ]
    },
    {
        id: 1,
        name: "Food Preparation and Cooking",
        department: "Back of House",
        priority: "Very high",
        status: "in-progress",
        deadline: "Aug 04 2023",
        assignedTeam: [
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
        ]
    },
    {
        id: 2,
        name: "Food Preparation and Cooking",
        department: "Back of House",
        priority: "Very high",
        status: "in-progress",
        deadline: "Aug 04 2023",
        assignedTeam: [
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
        ]
    },
    {
        id: 3,
        name: "Food Preparation and Cooking",
        department: "Back of House",
        priority: "Very high",
        status: "review",
        deadline: "Aug 04 2023",
        assignedTeam: [
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
            {
                name: "Stanley",
                imgLink: Avatar
            },
        ]
    }
]


const statusOptions = [
    {
        value: "in-progress",
        label: "In progress",
        color: "#EDA12F",
        bgColor: "#FFF5E6"
    },
    {
        value: "review",
        label: "Review",
        color: "#7B68EE",
        bgColor: "rgba(229, 225, 252, 0.40)"
    },
    {
        value: "completed",
        label: "Completed",
        color: "#069952",
        bgColor: "rgba(230, 255, 243, 0.70)"
    },
    {
        value: "overdue",
        label: "Overdue",
        color: "#E62E2E",
        bgColor: "#FFE6E6"
    },
]

function Dashboard() {
    const barChartConfig = {
        data: {
            columns: [
                ["Interfaces", 30, 40, 10, 40, 15, 65, 30, 40, 10, 40, 15, 65],
                ["Build-ups", 20, 10, 20, 60, 25, 75, 30, 40, 10, 40, 15, 65],
            ],
            colors: {
                Interfaces: "#7B68EE",
                "Build-ups": "#49CCF9"
            },
            type: bar(),
        },
        bar: {
            width: {
                ratio: 0.5
            }
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
        bindto: "#work_performance"
    }

    useEffect(() => {
        bb.generate(barChartConfig)
    })


    const [pendingRequest, setPendingRequest] = useState(false)

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    const [isCloseTaskModalOpen, setIsCloseTaskModalOpen] = useState(false)

    const [isAddCollabModalOpen, setIsAddCollabModalOpen] = useState(false)


    const SummaryCard = ({ title, amount, comparsion, percentage, increase = false }: SummaryCardProps) => {
        return (
            <div>
                <h3 className="mb-6 text-body-large text-grayscale-100">{title}</h3>
                <div>
                    <div className="flex gap-4 mb-2">
                        <h1 className="text-grayscale-100 text-h-4 leading-[-0.5px] font-bold capitalize">
                            {amount}
                        </h1>
                        <div className={classNames("flex items-center gap-2 py-1 px-2 rounded-md", !increase ? "bg-danger-0" : "bg-success-0")}>
                            <div>
                                {
                                    increase ? <img src={ArrowUp} alt="Trending Up" /> : <img src={ArrowDown} alt="Trending Down" />
                                }
                            </div>
                            <h6 className={classNames("leading-[-0.25px]", !increase ? "text-danger-1" : "text-success-40")}>
                                {`${percentage}%`}
                            </h6>
                        </div>
                    </div>
                    <h5 className="text-body-sm leading-[-0.25px] text-grayscale-60">
                        {comparsion ? comparsion : title}
                    </h5>
                </div>
            </div>
        )
    }

    const TableData = ({ children }: TableDataProps) => {
        return (
            <td className="py-3 px-6 !h-auto relative">
                {children}
            </td>
        )
    }

    const TableRow = ({ id, name, department, priority, status, deadline, assignedTeam }: TableRowProps) => {
        const [statusValue, setStatusValue] = useState(status)

        const [tableMenuId, setTableMenuId] = useState(null)

        return (
            <tr>
                <TableData>
                    <div>
                        <h3 className="text-body-sm text-grayscale-100">{name}</h3>
                        <h3 className="text-body-sm text-grayscale-60">{department}</h3>
                    </div>
                </TableData>
                <TableData>
                    <h3 className="text-body-sm text-grayscale-60">{priority}</h3>
                </TableData>
                <TableData>
                    <CustomSelect
                        value={statusValue}
                        setValue={setStatusValue}
                        values={statusOptions}
                    />
                </TableData>
                <TableData>
                    <h3 className="text-body-sm text-grayscale-60">{deadline}</h3>
                </TableData>
                <TableData>
                    <div>
                        <div className="flex flex-row !justify-start">
                            {
                                [assignedTeam[0], assignedTeam[1], assignedTeam[2]].map((member, idx) => {
                                    return (
                                        <div className="h-[32px] w-[32px] -ml-2 first:ml-0" key={idx}>
                                            <img
                                                src={member?.imgLink}
                                                alt={member?.name}
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                    )
                                })
                            }
                            {assignedTeam.length - 3 <= 0 ? null :
                                <div className="-ml-2 h-[32px] w-[32px] rounded-full bg-lydia flex items-center justify-center text-white text-sm">
                                    +{assignedTeam.length - 3}
                                </div>}
                        </div>

                    </div>
                </TableData>
                <TableData>
                    <button onClick={() => setTableMenuId((prev) => {
                        if (prev === id) {
                            return null;
                        } else {
                            return id;
                        }
                    })}><Icon name="darkDot" /></button>
                    {tableMenuId === id ?
                        <div className={`z-[5] w-[150px] rounded-md bg-white text-grayscale-60 absolute py-2 right-0 shadow-md flex flex-col [&>p]:cursor-pointer [&>p]:flex [&>p]:gap-4 [&>p]:items-center [&>p]:w-full [&>p]:px-4 [&>p]:py-2 [&>p>img]:h-[20px] [&>p>img]:w-[20px] text-sm`}>
                            <p className="hover:bg-[#E5E1FC66]" onClick={() => console.log(id)}><Icon name="brush" /> Edit Task</p>
                            <p className="hover:bg-[#E5E1FC66]" onClick={() => setIsTaskModalOpen(true)}><Icon name="eye" /> View Task</p>
                            <p className="hover:bg-[#E5E1FC66]"><Icon name="closeGrey" /> Close Task</p>
                        </div> : null}
                </TableData>
            </tr>
        )
    }

    const dueDate = "21/11/03"

    const dummyTask = "Progress"

    return (

        <div className="py-6 px-8">
            {/* // Modals */}
            <Modal
                handleClose={() => setIsTaskModalOpen(false)}
                isOpen={isTaskModalOpen}
            >
                <div className="task-modal text-center w-[544px] bg-white rounded-md p-4 !text-left">
                    <h2 className="font-bold">Guest Seating and Reservations</h2>
                    <div className="heading flex items-center gap-4 mt-2 [&>p]:capitalize [&>p]:text-sm">
                        <p className="bg-[#FFF5E6] text-[#EDA12F] py-2 px-4 rounded-full">{dummyTask ? "IN PROGRESS" : dummyTask}</p>
                        <div className="seperator w-[2px] h-[16px] bg-grayscale-20 rounded-md"></div>
                        <p><em className="text-grayscale-60 not-italic mr-2">Priority:</em>Low</p>
                        <div className="seperator w-[2px] h-[16px] bg-grayscale-20 rounded-md"></div>

                        <p className={`flex items-center gap-2 ${dummyTask ? "text-[#E62E2E]" : "text-lydia"} `}>
                            {dummyTask ?
                                <p className="text-grayscale-60 text-sm">Completed on {dueDate}</p> :
                                dummyTask ?
                                    <>
                                        <Icon name="redTimer" />
                                        <p className="text-grayscale-60 text-sm"> Overdue on {dueDate}</p>
                                    </>
                                    :
                                    <em className="text-sm text-grayscale-60 not-italic">Due by {dueDate}</em>
                            }
                        </p>
                    </div>

                    <div className="my-4 flex justify-start gap-[30px] gap-4 items-center">
                        <div className="flex">
                            <div className="flex [&>img]:w-[40px] [&>img]:h-[40px]">
                                <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                                <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                                <img className="mr-[-8px]" src={Avatar} alt="avatar" />
                            </div>
                            <div className="-ml-2 h-[40px] w-[40px] rounded-full bg-lydia flex items-center justify-center text-white text-sm">
                                +3
                            </div>
                            <div className="h-[38.5px] w-[38.5px] border border-dashed border-grayscale-30 flex items-center justify-center rounded-full ml-2 cursor-pointer" onClick={() => setIsAddCollabModalOpen(true)}><Icon name="addNaked" /></div>
                        </div>
                    </div>

                    <div className="text-sm text-grayscale-60">
                        <h3 className="font-bold text-grayscale-100">Description</h3>
                        <p className="py-2">Lörem ipsum nikyst päde päkus. Neser kalsongbadare. Håtysamma bolall, prengar. Sharenting ande. Tvodd gigall, dent nihet, innan enogon. </p>

                        <div className="tasks">
                            {[1, 2, 3].map((task) => {
                                return (
                                    <div className="py-2 flex gap-2">
                                        <input type="checkbox" />
                                        <p>Determine the availability of tables for the requested date and time.</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center w-full mt-8">
                        <div className="flex gap-2 w-full justify-between">
                            <PrimaryButton className="!py-[10px] px-[10px] !border !border-solid !text-grayscale-100 !border-grayscale-40 !bg-white flex gap-2 flex-row justify-center items-center">
                                <Icon name="brush" />
                                Edit task
                            </PrimaryButton>
                            <PrimaryButton className="!py-[10px] px-[10px]" onClick={() => setIsCloseTaskModalOpen(true)}>
                                Close task
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                handleClose={() => setIsCloseTaskModalOpen(false)}
                isOpen={isCloseTaskModalOpen}
            >
                <div className="delete-modal shadow-md text-center w-[544px] bg-white rounded-md p-4 !text-left">
                    <Icon name="closeGreyNaked" className="ml-auto" />
                    <div className="flex items-start gap-8 mb-8">
                        <div className="h-[40px] w-[40px] rounded-full bg-[#E5E1FC66] flex items-center justify-center">
                            <Icon name="tickCircle" />
                        </div>
                        <div className="w-3/4">
                            <h3 className="font-bold">Close Task</h3>
                            <p className="text-sm text-[#667085]">
                                Are you sure you want to close this task? This action cannot be undone.
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
                            <PrimaryButton className="!py-[10px] px-[10px] !bg-lydia">
                                Confirm
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                handleClose={() => setIsAddCollabModalOpen(false)}
                isOpen={isAddCollabModalOpen}
            >
                <div className="delete-modal text-center w-[544px] bg-white rounded-md p-4 !text-left shadow-lg">
                    <div className="w-[90%] mx-auto">
                        <div className="flex items-center justify-between my-4">
                            <div className="p-4 border border-solid border-grayscale-40 rounded-md w-fit">
                                <Icon name="profileAddDark" />
                            </div>
                            <div>
                                <Icon name="closeGreyNaked" className="ml-auto" />
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold">Add more collaborators</h2>
                            <p className="text-sm">The following users would receive task notifications:</p>
                        </div>

                        <div className="my-4">
                            {[1, 2, 3].map((member) => {
                                return (
                                    <div className="flex justify-between items-center my-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="h-[40px] w-[40px] rounded-full bg-[#F2F4F7] text-[#475467] flex items-center justify-center">CW</div>
                                            <div>
                                                <p>Candice Wu</p>
                                                <p className="text-grayscale-60 text-sm">candice@email.com</p>
                                            </div>
                                        </div>
                                        <p className="text-[#E62E2E] text-sm">Remove</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="memberField flex flex-col">
                            <label>Team member</label>
                            <select className="w-full p-2 border border-solid border-grayscale-40 rounded-md mt-2 mb-4 outline-none" defaultValue={""}>
                                <option disabled value={""}>Select team member</option>
                            </select>
                        </div>

                        <div className="flex justify-between items-center w-full gap-2">
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

            <div className="mb-6">
                <h3 className="text-body-large text-grayscale-60 mb-2">Hello, Gabrielle Doe ✨</h3>
                <h5 className="text-h-5 text-grayscale-100 font-bold">Here's what's happening</h5>
            </div>
            <div className="border border-grayscale-30 p-6 rounded-xl">
                <select className="mb-8 text-grayscale-60">
                    <option>Weekly</option>
                    <option>Daily</option>
                    <option>Monthly</option>
                </select>
                <div className="flex w-full">
                    <div className="grid grid-cols-summary-cards-grid gap-y-[54px] w-[40%]">
                        <SummaryCard
                            title="Total Employees"
                            amount={300}
                            increase
                            percentage={6.7}
                            comparsion="Employees"
                        />
                        <SummaryCard
                            title="Total Shifts Covered"
                            amount={50}
                            increase={false}
                            percentage={3}
                            comparsion="Shifts covered"
                        />
                        <SummaryCard
                            title="Total Work Hours"
                            amount={4500}
                            increase={false}
                            percentage={4}
                            comparsion="Hours/week"
                        />
                        <SummaryCard
                            title="Total Shifts Canceled"
                            amount={300}
                            increase
                            percentage={4}
                            comparsion="Shifts canceled"
                        />
                    </div>
                    <div className="relative top-[-15.5px] border border-grayscale-30 rounded-[10px] bg-grayscale-white w-[60%]">
                        <div className="flex justify-between items-center p-4">
                            <h3 className="text-body-large text-grayscale-100 leading-[-0.16px] capitalize">
                                work performance
                            </h3>
                            <button>
                                <Icon name="darkDot" />
                            </button>
                        </div>
                        <div className="relative">
                            <div id="legend" className="flex absolute top-[0px] right-[20px]"></div>
                            <div id="work_performance"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-6 my-8">
                <div className="rounded-xl border border-grayscale-30 w-[50%]">
                    <h3 className="py-4 px-5 text-body-large text-grayscale-100 tracking-standard">
                        Pending Requests
                    </h3>
                    <div className="flex mb-6 py-1 px-2 bg-grayscale-10">
                        <button className={`py-[11px] px-2 font-normal w-full ${pendingRequest ? "text-grayscale-60 " : "bg-grayscale-white shadow-level-2 rounded-[7px]"}`} onClick={() => setPendingRequest(false)}>
                            Timeoff (5)
                        </button>
                        <button className={`py-[11px] px-2 font-normal w-full ${!pendingRequest ? "text-grayscale-60 " : "bg-grayscale-white shadow-level-2 rounded-[7px]"}`} onClick={() => setPendingRequest(true)}>
                            Time Attendance (8)
                        </button>
                    </div>
                    {!pendingRequest ?
                        <div className="last:border-0">
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>1 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>1 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>1 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>1 day - Sick</span>
                            </div>
                        </div> :
                        <div className="last:border-0">
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>2 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>2 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>2 day - Sick</span>
                            </div>
                            <div className="flex justify-between px-4 py-3 gap-3 text-grayscale-60 border-b border-b-grayscale-30 last:border-0">
                                <span>Victor Adaun</span>
                                <span>2 day - Sick</span>
                            </div>
                        </div>}
                </div>
                <div className="flex w-[50%] h-auto border border-grayscale-30 rounded-xl text-sm">
                    <div className="w-1/2">
                        <div className="flex justify-between p-4 w-full">
                            <h3>Days Time Off Taken</h3>
                            <select className="mb-2 text-grayscale-60 outline-none">
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div className="h-fit w-[200px] mx-auto">
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
                                    <p className="text-grayscale-60">Days</p>
                                </div>
                            </CircularProgressbarWithChildren>
                            <p className="text-grayscale-60 text-center my-8 w-full">Total time off taken by employees in this month</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex justify-between p-4 w-full">
                            <h3>Employee Timeoff</h3>
                            <select className="mb-2 text-grayscale-60 outline-none">
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div className="h-fit w-[200px] mx-auto">
                            <CircularProgressbarWithChildren
                                value={13}
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
                                    <h1 className="text-3xl font-bold">13%</h1>
                                    <p className="text-grayscale-60">of employees</p>
                                </div>
                            </CircularProgressbarWithChildren>
                            <p className="text-grayscale-60 text-center my-8 w-full">Total employees who took time off this month</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-3 px-6 border border-grayscale-30 rounded-xl mb-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center gap-2 w-full">
                            <div>
                                <img src={SearchIcon} alt="Search Icon" />
                            </div>
                            <input type="text" placeholder="Search by name, task, status..." className="w-full outline-none" />
                        </div>
                        <button>
                            <img src={FilterIcon} alt="Filter Icon" />
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="border border-grayscale-30 rounded-xl">
                    <h3 className="text-body-large py-4 px-6">All Teams/ Tasks</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="font-normal text-body-sm [&>th]:text-grayscale-60 text-left">
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Priority</th>
                                <th className="py-4 px-6 flex gap-2">Status <Icon name="greyDown" /></th>
                                <th className="py-4 px-6">Deadline</th>
                                <th className="py-4 px-6">Assigned Team</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mockTeam.map((row, idx) => {
                                    return (
                                        <TableRow
                                            key={idx}
                                            name={row.name}
                                            department={row.department}
                                            priority={row.priority}
                                            status={row.status}
                                            deadline={row.deadline}
                                            assignedTeam={row.assignedTeam}
                                            id={row.id}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard