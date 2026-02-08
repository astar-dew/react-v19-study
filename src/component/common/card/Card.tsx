import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"


interface ICard{
    children: ReactNode
    className:string
    ratio: '1/1' | '16/9' | '4/3' | '3/2' 
}

export default function Card({className, children, ratio, ...props}:ICard){

    const aspectRatioMap = {
        '1/1' : 'aspect-square',
        '16/9' : 'aspect-video',
        '4/3' : 'aspect-[4/3]',
        '3/2' : 'aspect-[3/2]',
    }

    return(
        <div className={twMerge(`border-2 shadow-md rounded-2xl bg-[#c1d2ed80] hover:bg-[#e3e3e3] 
                        ${aspectRatioMap[ratio]}`,className)}
            {...props}
        >
            {children}
        </div>
    )
}