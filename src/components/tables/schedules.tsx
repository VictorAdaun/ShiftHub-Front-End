import React, { useState } from "react"
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from "@tanstack/react-table"
import "../../styles/schedule.scss"
import Icon from "../../components/icon"
import Avatar_1 from "../../assets/imgs/test_avatar.png"
import Scheduledrawer from "../../components/drawers/schedule-drawer"
import { useAuthContext } from "../../context/auth"
import "../../styles/schedule.scss"

interface extraDataType {
    dropDown: string;
    dayHeader: string;
    dayHeaderId: string;
}

interface ReactTableProps<T extends object> {
    data: T[];
    columns: Array<ColumnDef<T>>;
    extraData: extraDataType;
}


export const SchedulesTable = <T extends object>({ data, columns, extraData }: ReactTableProps<T>) => {
    const ctx = useAuthContext();


    const getShiftsForDays = (day) => {
        const shifts = ctx.scheduleData?.filter(shift => shift.availability[day.toLowerCase()]);
        return shifts.map(shift => {
            return {
                id: shift.availability[day.toLowerCase()].id,
                shift: shift.shift,
                start_time: shift.availability[day.toLowerCase()].start_time,
                end_time: shift.availability[day.toLowerCase()].end_time,
                duration: shift.availability[day.toLowerCase()].duration,
                availability: shift.availability[day.toLowerCase()].availability,
                individuals: shift.availability[day.toLowerCase()].individuals,
                availableWorkers: shift.availability[day.toLowerCase()].availableWorkers,
                neededWorkers: shift.availability[day.toLowerCase()].neededWorkers,
            };
        });
    }


    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [drawerDetails, setDrawerDetails] = useState(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


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
                        <h2>{drawerDetails?.day}</h2>
                        <Icon name="closeLight" />
                    </div>
                    <div className="shift-details flex items-center gap-2 mb-4 text-sm">
                        {drawerDetails?.start_time ? <span className="font-normal pr-2 border-r-2 border-solid border-grayscale-20"><em className="not-italic text-grayscale-60 mr-[1px]">Shift: </em>{getTimeOfDay(drawerDetails.start_time)}</span> : null}
                        
                        <div className="lhs-status flex items-center gap-2">
                            {drawerDetails?.availability === false ?
                                <div className="status booked">
                                    <div className="h-[6px] w-[6px] bg-[#2D8A39] rounded-full"></div>
                                    <p>Booked</p>
                                </div>
                                : drawerDetails?.availability === true ?
                                    <div className="status available">
                                        <div className="h-[6px] w-[6px] bg-[#EDA12F] rounded-full"></div>
                                        <p>Available</p>
                                    </div>
                                    :
                                    <div className="status empty bg-grayscale-40 text-grayscale-0">
                                        <div className="h-[6px] w-[6px] bg-white rounded-full"></div>
                                        <p>Empty</p>
                                    </div>
                            }
                            <em className="not-italic text-sm font-normal text-grayscale-60">{drawerDetails?.availability !== undefined ? <em>{`${drawerDetails?.availableWorkers}/${drawerDetails?.neededWorkers + drawerDetails?.availableWorkers}`}</em> : null}</em>
                        </div>
                    </div>
                    <div className="employees">
                        <p className="text-grayscale-100">Employees</p>
                        {
                            drawerDetails?.individuals?.map((employee, idx) => {
                                return (
                                    <div className="employee flex items-center justify-start self-stretch gap-2 my-4">
                                        <p className="text-grayscale-60">{idx + 1}</p>
                                        <img className="h-[40px] w-[40px]" src={Avatar_1} alt="avatar" />
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

            {extraData.dropDown === "Weekly" ?
                <table className='scheduleTable w-full text-left text-sm border-separate my-8'>
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

                                                cellDetails["day"] = cell.id.split("_")[1]

                                                console.log(cellDetails)

                                                setDrawerDetails(cellDetails)

                                                setIsDrawerOpen(true)
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
                        <p>{extraData.dayHeader}</p>
                    </div>
                    <section className="intervals">
                        {["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm"].map((span) => (
                            <span>{span}</span>
                        ))}
                    </section>
                    <section className="calendar">
                        {
                            getShiftsForDays(extraData.dayHeaderId).map((session) => {

                                console.log(getShiftsForDays(extraData.dayHeaderId))

                                if (session.start_time === undefined) {
                                    return;
                                }

                                const sessionStartTime = new Date();
                                sessionStartTime.setHours(Number(session.start_time.split(":")[0]))
                                sessionStartTime.setMinutes(0, 0, 0);

                                const startTime = new Date();
                                startTime.setHours(8);
                                startTime.setMinutes(0, 0, 0);

                                const getColumnStart = () => {
                                    const distanceInMilliseconds = sessionStartTime.getTime() - startTime.getTime();
                                    const distanceInMinutes = distanceInMilliseconds / 60000;
                                    return distanceInMinutes / 15 + 2;
                                }

                                const getColumnSpan = () => {

                                    return (Number(session.duration) * 60) / 15;
                                }

                                return (
                                    <div className={`session bg-lydia text-white grid`} style={{
                                        gridColumn: `${getColumnStart()} / span ${getColumnSpan()}`,
                                        gridRow: session.shift === "Morning" ? 2 : session.shift === "Afternoon" ? 4 : 5,
                                        width: Number(session.duration) <= 1 ? "fit-content" : "auto"
                                    }}>
                                        <div className="lhs-status">
                                            {!session.availability ?
                                                <div className="status booked">
                                                    <Icon name="booked" />
                                                    <p>Booked</p>
                                                </div> :
                                                <div className="status available">
                                                    <Icon name="available" />
                                                    <p>Available</p>
                                                </div>}
                                            <em>{`${session.availableWorkers}/${session.neededWorkers + session.availableWorkers}`}</em>
                                        </div>
                                    </div>
                                );
                            })}
                    </section>
                </div>}
        </div>
    )
}
