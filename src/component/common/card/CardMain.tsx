import { ReactNode } from "react";
import STBasicPhrase from "../phrase/STBasicPhrase";



interface ICardMain{
    className: string;
    children: ReactNode
} 

export default function CardMain({className,children}:ICardMain){

    return(
        <div className={className}>
            {children}
            {/* <STBasicPhrase as="h1" className="text-purple">
                test
            </STBasicPhrase> */}
        </div>
    )
}