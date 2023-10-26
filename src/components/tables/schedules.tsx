import React, { useState, useEffect } from "react"
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from "@tanstack/react-table"
import "../../styles/schedule.scss"
import Icon from "../../components/icon"
import Avatar_1 from "../../assets/imgs/test_avatar.png"
import Avatar_2 from "../../assets/imgs/test_avatar_2.png"
import mData from "../../utils/MOCK_DATA.json"
import PrimaryButton from "../button/primary-button"
import Scheduledrawer from "../../components/drawers/schedule-drawer"

interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
}


export const SchedulesTable = <T extends object>({ data, columns }: ReactTableProps<T>) => {

    const getShiftsForDays = (day) => {
        const shifts = mData.filter(shift => shift.availability[day.toLowerCase()]);
        return shifts.map(shift => {
            return {
                id: shift.id,
                shift: shift.shift,
                start_time: shift.availability[day.toLowerCase()].start_time,
                duration: shift.availability[day.toLowerCase()].duration,
                individuals: shift.availability[day.toLowerCase()]
            };
        });
    }

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDateRange = (currentDate) => {
        const formattedDate = new Date(currentDate);
        const endDate = new Date(formattedDate);
        endDate.setDate(endDate.getDate() + 6);


        const startMonth = months[formattedDate.getMonth()];
        const startDay = formattedDate.getDate();
        const endDay = endDate.getDate();
        const endMonth = months[endDate.getMonth()]

        return startMonth === endMonth ? `${startMonth} ${startDay} - ${endDay}` : `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }


    const formattedDayRange = (date, day) => {
        const formattedDate = new Date(date);
        formattedDate.setDate(formattedDate.getDate() + day)

        const startMonth = months[formattedDate.getMonth()];
        const startDay = formattedDate.getDate();


        return `${startMonth} ${startDay}`;
    }

    const formatDateHeader = (inputDate) => {

        const dateParts = inputDate.split(' ');
        const monthIndex = months.findIndex(month => month === dateParts[0]);

        const formattedDate = new Date(new Date().getFullYear(), monthIndex, parseInt(dateParts[1], 10));

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[formattedDate.getDay()];

        const dayOfMonth = formattedDate.getDate().toString().padStart(2, '0');
        const dayOfYear = formattedDate.getFullYear().toString().substring(2);

        return `${dayName}, ${dayOfMonth}/${dayOfYear}`;
    }

    // useEffect(() => {
    //     console.log(getShiftsForDays("Wednesday"))
    // }, [])

    const [currentNumber, setCurrentNumber] = useState(0)

    const [currentDate, setCurrentDate] = useState(new Date())

    const [dropDown, setDropdown] = useState("Weekly")

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [drawerDetails, setDrawerDetails] = useState(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    const dayHeader = formatDateHeader(formattedDayRange(currentDate, currentNumber)).split(",")[0]

    const getTimeOfDay = (timeString) => {
        const time = parseInt(timeString?.split(':')[0]);
      
        if (time >= 5 && time < 12) {
          return 'Morning';
        } else if (time >= 12 && time < 15) {
          return 'Afternoon';
        } else {
          return 'Evening';
        }
      }

    return (
        <div>
            <Scheduledrawer isOpen={isDrawerOpen} handleClose={() => setIsDrawerOpen(false)}>
                <div className="w-[80%] mx-auto">
                    <div className="heading flex justify-between mb-4">
                        <h2>Monday 04/23</h2>
                        <Icon name="closeLight" />
                    </div>
                    <div className="shift-details flex items-center gap-2 mb-4 text-sm">
                        <span className="font-normal pr-2 border-r-2 border-solid border-grayscale-20"><em className="not-italic text-grayscale-60 mr-[1px]">Shift:</em>{getTimeOfDay(drawerDetails?.start_time)}</span>
                        <div className="lhs-status flex items-center gap-2">
                            {!drawerDetails?.availability ?
                                <div className="status booked flex gap-2 text-[#2D8A39] bg-[#F0FAF0] p-2 rounded-[20px]">
                                    <Icon name="booked" />
                                    <p>Booked</p>
                                </div> :
                                <div className="status available flex gap-2 text-[#EDA12F] bg-[#FFF5E6] p-2 rounded-[20px]">
                                    <Icon name="available" />
                                    <p>Available</p>
                                </div>}
                            <em className="not-italic text-sm font-normal text-grayscale-60">7/7</em>
                        </div>
                    </div>
                    <div className="employees">
                        <p className="text-grayscale-100">Employees</p>
                        {
                            drawerDetails?.individuals.map((employee, idx ) => {
                                return(
                                    <div className="employee flex items-center justify-start self-stretch gap-2 my-4">
                                        <p className="text-grayscale-60">{idx + 1}</p>
                                        <img className="h-[40px] w-[40px]" src={Avatar_1} alt="avatar"/>
                                        <div className="text-sm">
                                            <p>{employee.name}</p>
                                            <em className="text-grayscale-60 not-italic">{employee.email}</em>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </Scheduledrawer>
            <div className="btn-bar flex justify-between mt-8">
                <div className="flex gap-4">
                    <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit flex gap-2">
                        Filter
                        <Icon name="filter" />
                    </PrimaryButton>
                    <div className="relative z-[0]">
                        <PrimaryButton className="px-[16px]  !w-[105px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 flex gap-2" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            {dropDown}
                            <Icon name="downLight" />
                        </PrimaryButton>
                        {isDropdownOpen ?
                            <div className="options bg-white h-auto w-[105px] absolute top-[55px] !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm p-[16px] flex flex-col gap-2">
                                <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                    setDropdown("Weekly")
                                    setIsDropdownOpen(false)
                                }}>Weekly</p>
                                <p className="cursor-pointer hover:text-grayscale-40" onClick={() => {
                                    setDropdown("Daily")
                                    setIsDropdownOpen(false)
                                }}>Daily</p>
                            </div> : null}
                    </div>
                    <div className="flex !border !border-solid !border-grayscale-30 rounded-md text-grayscale-60 text-sm items-center">
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                            onClick={() => {
                                if (dropDown === "Daily") {
                                    if (currentNumber > 0) {
                                        setCurrentNumber(currentNumber - 1)
                                    }
                                }
                            }}>
                            <Icon name="leftLight" />
                        </PrimaryButton>
                        <span>{dropDown === "Weekly" ? formattedDateRange(currentDate) :
                            <p>{formattedDayRange(currentDate, currentNumber)}</p>}</span>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !w-fit"
                            onClick={() => {
                                if (dropDown === "Daily") {
                                    if (currentNumber < 6) {
                                        setCurrentNumber(currentNumber + 1)
                                    }
                                }
                            }}
                        >
                            <Icon name="rightLight" />
                        </PrimaryButton>
                    </div>
                </div>
                <div className="flex !border !border-solid !border-grayscale-30 rounded-md items-center gap-2 pl-4">
                    <Icon name="search" />
                    <input type="text" placeholder="Search" className="outline-none h-full text-grayscale-60" />
                </div>
            </div>
            {dropDown === "Weekly" ?
                <table className='table w-full text-left text-sm border-separate my-8'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => {
                            return (
                                <tr key={headerGroup.id} className=''>
                                    {headerGroup.headers.map((header) => <th className="px-4 py-4" scope='col' key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>)}
                                </tr>
                            )
                        })}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => {
                            return (
                                <>
                                    <tr className='h-[160px]' key={row.id}>
                                        {row.getVisibleCells().map(cell => (
                                            <td className='whitespace-nowrap px-4 py-4 cursor-pointer' key={cell.id} onClick={() => {
                                                // we're taking the id 0 from 0_Monday and using it to find current row and current cell details
                                                const cellDetails = data[cell.id.split("_")[0]].availability[cell.column.id.toLowerCase()]

                                                setDrawerDetails(cellDetails)

                                                setIsDrawerOpen(true)
                                                table.getHeaderGroups().map(headerGroup => {
                                                    console.log(headerGroup)
                                                })
                                                console.log(cell)
                                            }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                        ))}
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
                :
                <div className="schedule_day w-full">
                    <div className="time">
                        <p>{formatDateHeader(formattedDayRange(currentDate, currentNumber))}</p>
                    </div>
                    <section className="intervals">
                        {["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"].map((span) => (
                            <span>{span}</span>
                        ))}
                    </section>
                    <section className="calendar">
                        {
                            getShiftsForDays(dayHeader).map((session) => {
                                const sessionStartTime = new Date();
                                sessionStartTime.setHours(Number(session.start_time.split(":")[0]))
                                sessionStartTime.setMinutes(0, 0, 0);

                                const startTime = new Date();
                                startTime.setHours(8);
                                startTime.setMinutes(0, 0, 0);

                                const getColumnStart = () => {
                                    const distanceInMilliseconds = sessionStartTime.getTime() - startTime.getTime();
                                    const distanceInMinutes = distanceInMilliseconds / 60000;
                                    return distanceInMinutes / 15 + 1;
                                }

                                const getColumnSpan = () => {

                                    return (Number(session.duration.split("")[0]) * 60) / 15;
                                }

                                return (
                                    <div className={`session bg-lydia text-white grid`} style={{
                                        gridColumn: `${getColumnStart()} / span ${getColumnSpan()}`,
                                        gridRow: session.shift === "Morning" ? 2 : session.shift === "Afternoon" ? 4 : 5,
                                        width: Number(session.duration.split("")[0]) <= 2 ? "fit-content" : "auto"
                                    }}>
                                        <div className="lhs-status">
                                            {!session.individuals.availability ?
                                                <div className="status booked">
                                                    <Icon name="booked" />
                                                    <p>Booked</p>
                                                </div> :
                                                <div className="status available">
                                                    <Icon name="available" />
                                                    <p>Available</p>
                                                </div>}
                                            <em>7/7</em>
                                            <p>{session.individuals.individuals[0].name}</p>
                                        </div>
                                        {!(Number(session.duration.split("")[0]) === 2) ?
                                            <div className="avatars">
                                                <img src={Avatar_1} alt="test avatar" />
                                                <img src={Avatar_2} alt="test avatar 2" />
                                            </div> : null}
                                    </div>
                                );
                            })}
                    </section>
                </div>}
        </div>
    )
}
