import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICardTitle{
    className?:string;
    children:ReactNode;
}



export default function CardTitle({className, children} : ICardTitle){
    return(
        <div className={twMerge(className,'')}>
            {children}
        </div>
    )
}