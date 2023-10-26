import React, { useMemo, useState } from "react"
import "../../../styles/schedule.scss"
import mData from "../../../utils/MOCK_DATA.json"
import { SchedulesTable } from "../../../components/tables/schedules"
import Icon from "../../../components/icon"
import Avatar_1 from "../../../assets/imgs/test_avatar.png"
import Avatar_2 from "../../../assets/imgs/test_avatar_2.png"
import PrimaryButton from "../../../components/button/primary-button"



function SingleSchedule() {

    const data = useMemo(() => mData, [])

    const paths = useMemo(() => (location.pathname.split("/")), [])

    const columnDateGenerator = (moreDays?: number) => {
        const currentDay = new Date();

        const yyyy = String(currentDay.getFullYear()).substring(2, 4) as string
        let dd = currentDay.getDate() + moreDays as number | string

        if (Number(dd) < 10) {
            dd = "0" + String(dd)
        }

        return `${dd}/${yyyy}`
    }


    const columns = useMemo(
        () => [
            {
                header: 'Shifts',
                cell: (row) => row.renderValue(),
                accessorKey: 'shift',
                accessorFn: (row) => {
                    return (
                        <div>
                            <p>{row.shift}</p>
                            <em>{row.shift === "Morning" ? "08:00 - 12am" : row.shift === "Afternoon" ? "12:00 - 04pm" : "04 - 08pm"}</em>
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Monday</p>
                        <em>{columnDateGenerator(0)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Monday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.monday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>7/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Tuesday</p>
                        <em>{columnDateGenerator(1)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Tuesday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.tuesday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>6/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            }, {
                header: () => (
                    <div>
                        <p>Wednesday</p>
                        <em>{columnDateGenerator(2)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Wednesday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.wednesday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>7/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Thursday</p>
                        <em>{columnDateGenerator(3)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Thursday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.thursday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>7/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            }, {
                header: () => (
                    <div>
                        <p>Friday</p>
                        <em>{columnDateGenerator(4)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Friday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.friday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>4/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            },
            {
                header: () => (
                    <div>
                        <p>Saturday</p>
                        <em>{columnDateGenerator(5)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: "Saturday",
                accessorFn: (row) => {
                    // console.log(row)
                    return (
                        <div className="cell">
                            <div className="container">
                                {!row.availability.saturday.availability ?
                                    <div className="status booked">
                                        <Icon name="booked" />
                                        <p>Booked</p>
                                    </div> :
                                    <div className="status available">
                                        <Icon name="available" />
                                        <p>Available</p>
                                    </div>}
                                <em>5/7</em>
                            </div>
                            <div className="avatars">
                                <img src={Avatar_1} alt="test avatar" />
                                <img src={Avatar_2} alt="test avatar 2" />
                            </div>
                        </div>
                    )
                },
            },
        ], []
    )


    return (
        <>
            <div className="container w-[90%] mx-auto mt-8 h-auto">
                <div className="breadcrumbs flex gap-2 text-grayscale-60 font-normal">
                    <Icon name="calendar" />
                    {paths.map((path, id) => {

                        return (
                            <>
                                <p className="capitalize last:text-lydia">{path}</p>
                                {id > 0 && id !== (paths.length - 1) ? <Icon name="right" /> : null}
                            </>
                        );
                    })}
                </div>
                <div className="heading flex mt-4">
                    <div className="heading-left w-2/3">
                        <h2 className="text-[25px]">Schedule</h2>
                        <p className="text-sm text-grayscale-60">Understand where the problem lies and act efficiently before it is too late</p>
                    </div>
                    <div className="btn-group w-1/3 flex gap-8 items-center">
                        <PrimaryButton className="w-fit">Publish Schedule</PrimaryButton>
                        <PrimaryButton className="px-[16px] !bg-white !text-grayscale-60 !border !border-solid !border-grayscale-30 !w-fit"><Icon name="ellipsis" /></PrimaryButton>
                    </div>
                </div>

                <SchedulesTable data={data} columns={columns} />
            </div>
        </>
    );
}

export default SingleSchedule;
