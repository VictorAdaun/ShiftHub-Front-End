import React, { useState } from "react"
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table'
import type { ColumnDef } from "@tanstack/react-table"
import Icon from "../../components/icon"



interface ReactTableProps<T extends object> {
    data: T[];
    columns: Array<ColumnDef<T>>;
}


export const EmployeesTable = <T extends object>({ data, columns }: ReactTableProps<T>) => {


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const [showViewOptions, setShowViewOptions] = useState(false)


    return (
        <div>
            <div className="w-full flex justify-between items-center mt-8 border border-b-0 border-solid border-grayscale-30 rounded-t-md p-4 text-sm  text-grayscale-100 relative">
                <p>All Teams/ Tasks</p>
                <div className="cursor-pointer" onClick={()=> setShowViewOptions((prev)=> !prev)}>
                    <Icon name="darkDot" />
                </div>
                {showViewOptions ?
                <div className="absolute right-0 top-[50px] h-auto w-[300px] bg-white shadow-md rounded-md p-4 text-sm">
                    <h1 className="text-[16px]">View Option</h1>
                    <div>
                        <div className="field flex justify-between my-4">
                            <p className="text-grayscale-60">Shown</p>
                            <p className="text-lydia">Hide All</p>
                        </div>
                        {["Attendance", "Shifts Completed", "Sick days", "Average Shift Duration", "Punctuality scores", "Late Arrivals"].map((row,id) => {
                            return (
                                <div className="field flex justify-between mb-4" key={id}>
                                    <div className="flex gap-4">
                                        <div className="flex">
                                            <Icon name="dot" />
                                            <Icon name="dot" />
                                        </div>
                                        <p className="text-grayscale-80">{row}</p>
                                    </div>
                                    <div className="cursor-pointer">
                                        <Icon name="visible" />
                                    </div>
                                </div>
                            );
                        })}

                        <hr className="my-4"/>

                        <div className="field flex justify-between my-4">
                            <p className="text-grayscale-60">Hidden</p>
                            <p className="text-lydia">Show All</p>
                        </div>

                        {["Attendance", "Shifts Completed", "Sick days", "Average Shift Duration", "Punctuality scores", "Late Arrivals"].map((row,id) => {
                            return (
                                <div className="field flex justify-between mb-4" key={id}>
                                    <div className="flex gap-4">
                                        <div className="flex">
                                            <Icon name="dot" />
                                            <Icon name="dot" />
                                        </div>
                                        <p className="text-grayscale-80">{row}</p>
                                    </div>
                                    <div className="cursor-pointer">
                                        <Icon name="notVisible" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> : null}
            </div>
            <table className='employeeTable w-full text-left text-sm border-separate text-grayscale-60'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => {
                        return (
                            <tr key={headerGroup.id} className=''>
                                {headerGroup.headers.map((header) => <th className="text-grayscale-60" scope='col' key={header.id}>
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
                                <tr className='' key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className='whitespace-nowrap h-[40px]' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                    ))}
                                </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>
            <div className="w-full flex justify-between items-center mb-4 border border-t-0 border-solid border-grayscale-30 rounded-b-md p-4 text-sm  text-grayscale-60 [&>button]:flex [&>button]:gap-2 [&>button]:items-center">
                <button onClick={() => table.previousPage()} className="disabled:cursor-not-allowed" disabled={!table.getCanPreviousPage()}><Icon name="arrowLeftLong" /> Prev
                </button>

                <div className="flex items-center">
                    <span className="mr-2">Page</span>
                    <input className="w-8 border border-solid border-grayscale-30 rounded-md p-2 text-sm  text-grayscale-60 text-center outline-none" type="string" onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)} />
                    <span className="mx-2">of {table.getPageCount()}</span>
                </div>

                <button onClick={() => table.nextPage()} className="disabled:cursor-not-allowed" disabled={!table.getCanNextPage()} >Next <Icon name="arrowRightLong" /></button>
            </div>
        </div>
    )
}
