
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react";

interface ITanTable <T>{
    tableData: T[],
    columns : ColumnDef<T,any>[], // 이해 필요
    initialState?: {}
}

export default function TanTable<T>({tableData,columns, initialState}:ITanTable<T>){

    const [data,_setTableData] = useState([...tableData])
    const table = useReactTable({
        data,
        columns, 
        getCoreRowModel: getCoreRowModel(),
        initialState: initialState
    })

    return(
        <div className="w-full">
            <table className="w-full border-t-2 border-b-2 border-[#f7f7f7]">
                <thead className="">
                    {table.getHeaderGroups().map((headerGRoup)=>(
                        <tr key={headerGRoup.id} >
                            {headerGRoup.headers.map((header) => (
                                <th key={header.id} className="h-[50px]">
                                    {header.isPlaceholder? 
                                        null :
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody >
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-t-2 border-b-2 h-[50px] border-[#f7f7f7]  hover:bg-[#f7f7f7]">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell , cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

//table css rouneded 가 왜 적용이 안되는 것처럼 보이는건지. 