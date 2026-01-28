import { Children, ReactNode } from "react";


interface ISTBasicButton{
    onClick?: (e:React.MouseEvent)=> void,
    inactive? : boolean,
    className : string,
    children? : ReactNode
}

export default function STBasicButton({ onClick,  inactive, className, children }:ISTBasicButton){

    // let isDisabled = inactive? 'disable' : null 
    // 아이콘을 어떻게 받을지?
    //text도 
    // children 은 공백도 체크하는걸로 보임. 
    // MouseEvent
    return(
        <button className={className} onClick={onClick} disabled={inactive} >
            {children}
        </button>
    )

}

// MouseEvent vs React.MouseEvent

//href