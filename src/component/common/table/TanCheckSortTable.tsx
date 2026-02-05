import React, { HTMLProps, useState } from 'react'
import { makeData, makeDatafrom, Person,QuizList } from '../../../data/makeData'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { faker } from '@faker-js/faker'

import { ArrowDown, ArrowUp } from 'lucide-react'



/// params :  columns, select, order, data, pagination, 
/// static : table design , 
//  ??     : useReactTable 의 옵션은 어떤식으로 할지  

/// 기능을 크게 : sort, paging, checkbox 

export default function TanCheckSortTable(){

    const [rowSelection, setRowSelection] = React.useState({})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [enabled, setEnabled] = useState(false)
    // const [data, setData] = useState(() => makeData(1_000))


    const newQuizList = ():QuizList => {
        return {
            id: faker.number.int(100),
            created: faker.person.lastName(),
            name: faker.book.title(),
            email: '-',
            company: faker.company.name()
        }
    }

    const [data, setData] = useState(() => makeDatafrom<QuizList>(newQuizList, 100))

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })
    
    const columns = React.useMemo<ColumnDef<QuizList>[]>(
        () => [
        {
            id:'select',
            header: ({ table })=> (
                <IndeterminateCheckbox
                    {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllRowsSelectedHandler(),
                    }}
                />
            )
            ,
            cell: ({ row }) => (
                <IndeterminateCheckbox
                    {...{
                        checked: row.getIsSelected(),
                        disabled: !row.getCanSelect(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler(),
                    }}
                />
            )
        },
        {
            accessorKey: 'id',
            header: () => <div className='inline'>id</div>,
            cell: (info) => info.getValue(),
            // enableSorting: false
            //this column will sort in ascending order by default since it is a string column
        },
        {
            id: 'created',
            header: () => <span>출제자</span>,
            cell: (info) => info.getValue(),
            accessorFn: (row) => row.created,
            sortUndefined: 'last', //force undefined values to the end
            sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
        },
        {
            accessorKey: 'name',
            header: () => '문제집 명',
            //this column will sort in descending order by default since it is a number column
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            sortUndefined: 'last', //force undefined values to the end
        },
        {
            accessorKey: 'company',
            header: '소속',
            // sortingFn: sortStatusFn, //use our custom sorting function for this enum column
        },
    ],[])

    const table = useReactTable({
        data,
        columns,
        state: {
          rowSelection,
          sorting,
          pagination
        },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true, //enable row selection for all rows
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })


    
    return (<div className="p-2">
          
          <div className="h-2" />
          <table className='border-2 w-full text-center border-separate rounded-2xl'>
            {/* hheeeaderrrrrrrrr */}
            <thead className='border-2'>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan} className='relative p-2'>
                        {header.isPlaceholder ? null : (
                        <div
                            className={
                                header.column.getCanSort() ? 'cursor-pointer select-none': ''
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                                header.column.getCanSort()
                                    ? header.column.getNextSortingOrder() === 'asc'
                                    ? 'Sort ascending'
                                    : header.column.getNextSortingOrder() === 'desc'
                                        ? 'Sort descending'
                                        : 'Clear sort'
                                    : undefined
                            }
                        >
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                            )}
                            {{
                                asc: <ArrowUp color={'red'} className='inline'/>,
                                desc: <ArrowDown color={'red'} className='inline'/>,
                            }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>

            {/* booooooooooooddddy */}
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
            {/* <tfoot>
              <tr>
                <td className="p-1">
                  <IndeterminateCheckbox
                    {...{
                      checked: table.getIsAllPageRowsSelected(),
                      indeterminate: table.getIsSomePageRowsSelected(),
                      onChange: table.getToggleAllPageRowsSelectedHandler(),
                    }}
                  />
                </td>
                <td colSpan={20}>Page Rows ({table.getRowModel().rows.length})</td>
              </tr>
            </tfoot> */}
          </table>
          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
                
              {'>>'}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                min="1"
                max={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>
          {/* {table.getPageCount()} */}

        </div>
    )

}


// function propTest({name, id, className, ...rest}:{name:string} & HTMLProps<HTMLInputElement>){

//     return(
//         <input className={className} value={name} {...rest}/>
//     )
// }

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}
