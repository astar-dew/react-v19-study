import {  ReactNode } from "react"


interface STBasicLabelButtonInput{
    id :string,
    labelText : string, 
    type? :  string, //'text'| 'password' | 'email'  , 왜 이런 타입일 때 문제일까? 
    labelClassName? : string,
    inputClassName? : string,
    val? : string,
    required? : boolean 
    placeholder? : string
    button? : ReactNode
}

export default function STBasicLabelButtonInput({required,button,id, placeholder, labelText, 
        type='text', labelClassName, inputClassName, val , ...props}:STBasicLabelButtonInput){
    return(
        <div className="flex flex-col">
            <label htmlFor={id} className={labelClassName}>{required?'*':''}{labelText}</label>
            {/* <span className="flex items-center border-2"> */}
            <span className={inputClassName}>
                <input id={id}  className="focus:outline-none" type={type} value={val} placeholder={placeholder} {...props}/>
                {button && <span >{button}</span>}
            </span>
        </div>
    )
}

// onChange, placeHolder,  
// label input 에 button을 추가 