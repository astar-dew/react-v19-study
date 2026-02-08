import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ICardFooter{
    className?:string;
    children:ReactNode;
}



export default function CardFooter({className, children} : ICardFooter){
    return(
        <div className={twMerge(className,'bottom-[0px]')}>
            {children}
        </div>
    )
}