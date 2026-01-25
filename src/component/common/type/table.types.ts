import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'


export interface Column<T>{
    key: keyof T | string;
    header: string;
    render? : (value: any, row: T) => React.ReactNode;
    width?: string;
    headerProps? : ThHTMLAttributes<HTMLTableCellElement>;
    cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement>{
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row:T) => void;
    tableClassName?: string;
    wrapperClassName?: string;
}


// keyof란?
// 객체 타입의 모든 키(key)를 유니온 타입으로 추출하는 TypeScript 연산자입니다.

//인터넷 참고해서 함. 
