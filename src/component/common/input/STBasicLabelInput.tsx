import { ReactNode } from "react"
import { twMerge } from 'tailwind-merge'

interface ISTBasicLabelInput{
    id :string,
    labelText? : string, 
    type? :  string, //'text'| 'password' | 'email'  , 왜 이런 타입일 때 문제일까? 
    labelClassName? : string,
    inputClassName? : string,
    val? : string,
    required? : boolean 
    placeholder? : string
    icon? : ReactNode
}

export default function STBasicLabelInput({required,icon,id, placeholder, labelText, 
        type='text', labelClassName, inputClassName, val , ...props}:ISTBasicLabelInput){
    return(
        <div className="flex flex-col">
            <label htmlFor={id} className={labelClassName}>{required?'*':''}{labelText}</label>
            {/* <span className="flex items-center border-2"> */}
            <span className={`${inputClassName} flex items-cemter`}>
            {/* <span className={twMerge(inputClassName,'w-full')}> */}

                <input id={id}  className="flex-1 focus:outline-none" type={type} value={val} placeholder={placeholder} {...props}/>
                {icon && <span className="float-right">{icon}</span>}
            </span>
        </div>
    )
}

// onChange, placeHolder,  
// [label 체크 사항]
// 1. position 부분을 체크해야하지 않을까?  
// 2. htmlFor - input id 일치
// 3. form submit 시 어떻게 처리할지 
//     useState로 할지 어떤 방식으로 할지에 대해서.
// 4. required 표시 
// 5. caption과 validation 

// #. zod ,reg
// 기본 디자인이 있었으면 하는데. 
// <FormControl>
//   <FormControl.Label>Label</FormControl.Label>
//   <TextInput />
// </FormControl>

// css position 
// static(default), relative, fixed, absolute, 
// sticky(이부분은 스크롤 헤더? 부분에 적합할 듯)
// 

// [전체 설계] input 은 렌더링 되어야하지 않는지
// 1. 전체 구성으로 컴포넌트 구성
// 2. basic Input 을 가져와서 input label을 구성 


// tailwind tailwind-merge, clsx