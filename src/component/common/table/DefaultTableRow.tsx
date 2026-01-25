import { HTMLAttributes } from 'react';
// import { Column } from '@/component/common/type/table.types'

// interface TableRowProps<T> extends HTMLAttributes<HTMLTableRowElement>{
//     row: T;
//     columns: Column<T>[];
//     onRowClick?: (row:T) => void;
// }


// export default function DefaultTableRow<T extends Record<string,any>>({
//     row,
//     columns,
//     onRowClick,
//     className='',
//     ...rowProps
// }:TableRowProps<T>){
//     return (
//         <tr
//             onClick={() => onRowClick?.(row)}
//         >
//             {columns.map((column,idx) => (
//                 <td
//                     key={idx}
//                     {...column.cellProps}
//                 >
//                     {column.render
//                         ? column.render(row[column.key as keyof T],row)
//                         : row[column.key as keyof T]
//                     }
//                 </td>
//             ))}
//         </tr>
//     )
// } 