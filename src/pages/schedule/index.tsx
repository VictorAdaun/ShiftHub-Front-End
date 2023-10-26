// import { useNavigate } from "react-router-dom";
// import PrimaryButton from "../../components/button/primary-button";
// import SecondaryButton from "../../components/button/secondary-button";


import React, { useMemo } from "react"
import mData from "../../utils/MOCK_DATA.json"
// import type { ColumnDef } from "@tanstack/react-table"
import { Schedules } from "../../components/tables/schedules"

// type col = {    
//     id: number,
//     first_name: string,
//     last_name: string,
//     availability: string,
//     start_time: string,
//     end_time: string,
// }


function Schedule() {
    //   const navigate = useNavigate()

    const data = useMemo(() => mData, [])

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
                accessorKey: 'availability.monday.availability',
            },
            {
                header: () => (
                    <div>
                        <p>Tuesday</p>
                        <em>{columnDateGenerator(1)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: 'availability.tuesday.availability',
            }, {
                header: () => (
                    <div>
                        <p>Wednesday</p>
                        <em>{columnDateGenerator(2)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: 'availability.wednesday.availability',
            },
            {
                header: () => (
                    <div>
                        <p>Thursday</p>
                        <em>{columnDateGenerator(3)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: 'availability.thursday.availability',
            }, {
                header: () => (
                    <div>
                        <p>Friday</p>
                        <em>{columnDateGenerator(4)}</em>
                    </div>
                ),
                cell: (row) => row.renderValue(),
                accessorKey: 'availability.friday.availability',
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
                    return <p>{row.availability.saturday.availability}</p>
                },
            },
        ], []
    )


    return (
        <>
            <Schedules data={data} columns={columns} />
        </>
    );
}

export default Schedule;
