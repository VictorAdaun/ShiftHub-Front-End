import { classNames } from "../../utils/functions";
import ArrowUp from "../../assets/svgs/dashboard/summary-card/arrow-trending-up.svg"
import ArrowDown from "../../assets/svgs/dashboard/summary-card/arrow-trending-down.svg"
import FilterIcon from "../../assets/svgs/dashboard/filter.svg"
import SearchIcon from "../../assets/svgs/dashboard/search-icon.svg"
import { ReactNode } from "react";


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
}

interface TableDataProps{
    children: ReactNode
}

const mockTeam = [
    {
        name: "Food Preparation and Cooking",
        department: "Back of House",
        priority: "Very high",
        status: "",
        deadline: "Aug 04 2023",
        assignedTeam: [
            {
                name: "Stanley",
                imgLink: "https://res.cloudinary.com/ecx/image/upload/v1640365918/Avant-Garde/Team/18_1_8_ytyr8l.png"
            },
            {
                name: "Stanley",
                imgLink: "https://res.cloudinary.com/ecx/image/upload/v1640365918/Avant-Garde/Team/18_1_8_ytyr8l.png"
            },
            {
                name: "Stanley",
                imgLink: "https://res.cloudinary.com/ecx/image/upload/v1640365918/Avant-Garde/Team/18_1_8_ytyr8l.png"
            },
            {
                name: "Stanley",
                imgLink: "https://res.cloudinary.com/ecx/image/upload/v1640365918/Avant-Garde/Team/18_1_8_ytyr8l.png"
            },
            {
                name: "Stanley",
                imgLink: "https://res.cloudinary.com/ecx/image/upload/v1640365918/Avant-Garde/Team/18_1_8_ytyr8l.png"
            },
        ]
    }
]


function Dashboard() {


    const SummaryCard = ({title, amount, comparsion, percentage, increase=false}:SummaryCardProps) => {
        return (
            <div>
                <h3 className="mb-6 text-body-large text-grayscale-100">{ title }</h3>
                <div>
                    <div className="flex gap-4 mb-2">
                        <h1 className="text-grayscale-100 text-h-4 leading-[-0.5px] font-bold capitalize">
                            {amount}
                        </h1>
                        <div className={classNames("flex items-center gap-2 py-1 px-2 rounded-md", !increase ? "bg-danger-0" : "bg-success-0")}>
                            <div>
                                {
                                    increase ? <img src={ArrowUp} alt="Trending Up"/> : <img src={ArrowDown} alt="Trending Down"/>
                                }
                            </div>
                            <h6 className={ classNames("leading-[-0.25px]", !increase ? "text-danger-1" : "text-success-40")}>
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

    const TableData = ({ children }:TableDataProps ) => {
        return (
            <td className="py-3 px-6">
                {children}
            </td>
        )
    }

    const TableRow = ({ name, department, priority, status, deadline, assignedTeam }:TableRowProps) => {
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
                    <select value={status}>
                        <option>In progress</option>
                        <option>Review</option>
                        <option>Completed</option>
                        <option>Overdue</option>
                    </select>
                </TableData>
                <TableData>
                    <h3 className="text-body-sm text-grayscale-60">{deadline}</h3>
                </TableData>
                <TableData>
                    <div>
                        <div className="flex">
                            {
                                assignedTeam.map((member, idx) => {
                                    return (
                                        <div className="h-8 w-8 -ml-4 first:ml-0" key={idx}>
                                            <img
                                                src={member.imgLink}
                                                alt={member.name}
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </TableData>
                <TableData>
                    <button>...</button>
                </TableData>
            </tr>
        )
    }


    return (
        <div className="py-6 px-8">
            <div className="mb-6">
                <h3 className="text-body-large text-grayscale-60 mb-2">Hello, Gabrielle Doe ✨</h3>
                <h5 className="text-h-5 font-medium text-grayscale-100">Here's what's happening</h5>
            </div>
            <div className="border border-grayscale-30 p-6 rounded-xl">
                <select className="mb-2">
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
                    <div className="border border-grayscale-30 rounded-[10px] bg-grayscale-white w-[60%]">
                        <div className="flex justify-between items-center p-4">
                            <h3 className="text-body-large text-grayscale-100 leading-[-0.16px] capitalize">
                                work performance
                            </h3>
                            <button>
                                ...
                            </button>
                        </div>
                        <div>

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
                        <button className={classNames("py-[11px] px-2 font-normal w-full", "bg-grayscale-white shadow-level-2 rounded-[7px]")}>
                            Timeoff (5)
                        </button>
                        <button className="text-grayscale-60 py-[11px] px-2 font-normal w-full">
                            Time Attendance (8)
                        </button>
                    </div>
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
                    </div>
                </div>
                <div className="flex w-[50%] border border-grayscale-30 rounded-xl">
                    <div>
                        <div className="flex justify-between p-4 w-full">
                            <h3>Days Time Off Taken</h3>
                            <select className="mb-2">
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div>
                            {/* Graph */}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between p-4 w-full">
                            <h3>Employee Timeoff</h3>
                            <select className="mb-2">
                                <option>Weekly</option>
                                <option>Daily</option>
                                <option>Monthly</option>
                            </select>
                        </div>
                        <div>
                            {/* Graph */}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-3 px-6 border border-grayscale-30 rounded-xl mb-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex items-center gap-2 w-full">
                            <div>
                                <img src={SearchIcon} alt="Search Icon"/>
                            </div>
                            <input type="text" placeholder="Search by name, task, status..." className="w-full"/>
                        </div>
                        <button>
                            <img src={FilterIcon} alt="Filter Icon"/>
                        </button>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="border border-grayscale-30 rounded-xl">
                    <h3 className="text-body-large py-4 px-6">All Teams/ Tasks</h3>
                    <table className="w-full">
                        <thead>
                            <tr className="font-normal text-body-sm text-grayscale-60 text-left">
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Priority</th>
                                <th className="py-4 px-6">Status</th>
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