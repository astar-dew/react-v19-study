import { forwardRef } from "react";
// import DefaultTableRow  from "./DefaultTableRow"

// import { Column, TableProps } from '@/component/common/type/table.types'

// interface DefaultTableProps<T>{
//     headerColumn: string[],
//     rowData: T[][] //[[],[],[]...]
// } 

interface DefaultTableProps<T> {
    columns: {
        key: keyof T;
        header: string;
        render?: (value: T[keyof T], row: T) => React.ReactNode; // 이건 왜이케 됨? 왜있는건지 모르것네.
    }[];
    data: T[];
    tableStyle?:string;
    trStyle?:string;
    tdStyle?:string;
}

export default function DefaultTalbe<T>({
    columns,
    data,
    tableStyle,
    trStyle,
    tdStyle
}:DefaultTableProps<T>){
    return (
        <table className={tableStyle}>
            <thead>
                <tr className={trStyle}>
                    {columns.map((col, idx)=>
                        <th key={idx}>{col.header}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => 
                    <tr>
                        {columns.map((col)=> 
                            <td className={tdStyle}>{String(row[col.key])}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}


// export default function DefaultTable<T extends Record<string,any>>({
//     data,
//     columns,
//     onRowClick,
//     tableClassName='',
//     wrapperClassName='',
//     ...tableProps
//     // tableClassName ,wrapperClassName의 
//     // 어떻게 관리하고 쓸것인지
// }: TableProps<T>){
//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         {columns.map((column,idx)=>(
//                             <th
//                                 key={idx}
//                                 {...column.headerProps}
//                             >
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row,rowIdx) => (
//                         <DefaultTableRow<T>
//                             key={rowIdx}
//                             row={row}
//                             columns={columns}
//                             onRowClick={onRowClick}
//                         />
//                     ))}

//                 </tbody>
//             </table>
//         </div>
//     )
// }
