
import { forwardRef, InputHTMLAttributes } from "react";

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement>{
    styleClass?: string;
}

const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
    ({styleClass, ...props},ref)=>{
        return (
        <input
            ref={ref}
            className={styleClass}
            {...props}
        />
        )
    }
)

export default DefaultInput;

// 추가적으로 className 에 들어가는
// styleformat을 넣는 방법으로 진행하고 싶음. 


// forwardRef : ref prop을 넘겨서 그 내부에 있는 HTML 엘리먼트에 접근을 하게 해주는
// useRef : 컴포넌트 내부에서 DOM 요소나 값을 참조하기 위해 사용하는 Hook
// forwardRef : 부모 컴포넌트가 자식 컴포넌트의 DOM요소나 ref에 접근할 수 있도록 ref를 전달하는 함수

// ref에 register 를 받고 
// props에서 id type 등을 받음. 


// 처음 작성한 파일
// interface DefaultInputProps{
//     handleChange? : (e:React.ChangeEvent<HTMLInputElement>) => void;
//     styleClass? : string
// }

// export default function DefaultInput({handleChange,styleClass, ...props}:DefaultInputProps){

//     return (
//         <input className={styleClass? styleClass: 'border'} onChange={handleChange} {...props}>
//         </input>
//     )
// }