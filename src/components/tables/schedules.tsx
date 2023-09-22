import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef } from "@tanstack/react-table"
import "../../styles/schedule.css"


interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
}


export const Schedules = <T extends object>({ data, columns }: ReactTableProps<T>) => {


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>
            <p>Schedule Table</p>
            <table className='table w-3/4 mx-auto text-left text-sm border-separate'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className=''>
                            {headerGroup.headers.map((header) => <th className="px-6 py-4 " scope='col' key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>)}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <>
                            <tr className='h-[160px]' key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td className='whitespace-nowrap px-6 py-4' key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                ))}
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
