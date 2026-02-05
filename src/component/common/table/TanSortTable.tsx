
import React, { useState } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from '../../../data/makeData'
import { ArrowDown, ArrowUp, Check } from 'lucide-react'
import { Button, Checkbox, Field, Label } from '@headlessui/react'

//csr table ,manualPagination

// import { CheckIcon } from '@heroicons/react/16/solid'

//custom sorting logic for one of our enum columns
const sortStatusFn: SortingFn<Person> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status
  const statusB = rowB.original.status
  const statusOrder = ['single', 'complicated', 'relationship']
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB)
}

export default function TanSortTable() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [enabled, setEnabled] = useState(false)

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'select',
        header: () => 
                    <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        className="group size-6 rounded-md 
                            bg-white/10 p-1 ring-1 
                            ring-white/15 ring-inset 
                            focus:not-data-focus:outline-none 
                            data-checked:bg-white 
                            data-focus:outline 
                            data-focus:outline-offset-2 
                            data-focus:outline-white"
                    >
                        <input type='checkbox' className=" size-4 fill-black group-data-checked:block" />
                    </Checkbox>,
        cell: () => <Checkbox
                        checked={enabled}
                        onChange={setEnabled}
                        className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset focus:not-data-focus:outline-none data-checked:bg-white data-focus:outline data-focus:outline-offset-2 data-focus:outline-white"
                    >
                        <input type='checkbox' className=" size-4 fill-black group-data-checked:block" />
                    </Checkbox>,
        // sortStatusFn: null, 임의로 추가했는데 잘안됨. 
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorKey: 'firstName',
        header: () => <div className='inline'>성</div>,
        cell: (info) => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>이름</span>,
        sortUndefined: 'last', //force undefined values to the end
        sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      },
      {
        accessorKey: 'age',
        header: () => '나이',
        //this column will sort in descending order by default since it is a number column
      },
      {
        accessorKey: 'visits',
        header: () => <span>방문수</span>,
        sortUndefined: 'last', //force undefined values to the end
      },
      {
        accessorKey: 'status',
        header: '상태',
        sortingFn: sortStatusFn, //use our custom sorting function for this enum column
      },
      {
        accessorKey: 'progress',
        header: '프로필 진행',
        // enableSorting: false, //disable sorting for this column
      },
      {
        accessorKey: 'rank',
        header: '랭크',
        invertSorting: true, //invert the sorting order (golf score-like where smaller is better)
      },
      {
        accessorKey: 'createdAt',
        header: '가입일',
        // sortingFn: 'datetime' //make sure table knows this is a datetime column (usually can detect if no null values)
      },
    ],
    [],
  )

  const [data, setData] = useState(() => makeData(1_000))
  const refreshData = () => setData(() => makeData(10_000)) //stress test with 100k rows
  const [curPage,setCurPage] = useState(1);

   const pagemove = (page:number) => {
    setCurPage(page)
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      sorting,
      pagination
    },
    // initialState: {
    //     pagination: {
    //         pageIndex:..,
    //         pageSize:..
    //     }
    // },
    // manualPagination: true, //csr(false 시), ssr(true 시)
    onPaginationChange: setPagination,
    // rowCount: dataQuery.data?.rowCount, 이건 예제에 있는데 dataQuery 가 뭔지 모르것음. 
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering - default on/true
    // enableMultiSort: false, //Don't allow shift key to sort multiple columns - default on/true
    // enableSorting: false, // - default on/true
    // enableSortingRemoval: false, //Don't allow - default on/true
    // isMultiSortEvent: (e) => true, //Make all clicks multi-sort - default requires `shift` key
    // maxMultiSortColCount: 3, // only allow 3 columns to be sorted at once - default is Infinity
  })

  //access sorting state from the table instance
  console.log(table.getState().sorting)

 

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className="border-2">
        <thead className='border-2'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th className={`border-2 min-w-[130px] max-w-[200px]`} key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() // select-none 이 있으면 헤더 클릭 시 화면이 안움직이는듯.
                            ? 'cursor-pointer select-none'
                            : ''
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
                        //   asc: ' 🔼',
                        //   desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(table.getState().pagination.pageSize*(curPage-1), table.getState().pagination.pageSize*curPage)
            .map((row) => {
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
      </table>

      <div className='test'>
        <Button
            className={`border-2`}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            >
            {'<< '}
        </Button>
        <Button
            className={`border-2`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            {'< '}
        </Button>

        {[1,2,3,4,5,6,7,8,9,10].map((a) => 
            <span className='border-2 hover:cursor-pointer' onClick={() =>pagemove(table.getState().pagination.pageIndex+a)}>
                {table.getState().pagination.pageIndex+a}
            </span>
            // /quiz-pack/${table.getState().pagination.pageIndex+a} 이것도 고쳐야함. 
        )}

          {table.getState().pagination.pageIndex + 1} 
        <Button
            className={`border-2`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            {' >'}
        </Button>
        <Button
            className={`border-2`}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            >
            {' >>' }
            </Button>
        <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
                table.setPageSize(Number(e.target.value))
            }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    {pageSize}
                </option>
            ))}
        </select>

            <button onClick={()=>table.resetRowSelection()}>
                reset
            </button>
      </div>



      <div className='border-2 m-2 p-2'>
        <div>{table.getRowModel().rows.length.toLocaleString()} Rows</div>
        <div>
            <button onClick={() => rerender()}>Force Rerender</button>
        </div>
        <div>
            <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
        <pre>{JSON.stringify(sorting, null, 2)}</pre>
      </div>
    </div>
  )
}
