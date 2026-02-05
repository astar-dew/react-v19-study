import { forwardRef, InputHTMLAttributes } from "react";


interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement>{
    labelText?:string 
    className?:string
}


const QuizInput = forwardRef<HTMLInputElement,LabelInputProps >(
    ({labelText,className, checked, ...props}, ref) => {
    let labelCss =`w-full has-checked:bg-white`
    let inputCss = `group-hover:bg-black`

    return(
        <div className="w-full flex flex-row group border-2 border-gray-100 p-2 m-2  hover:border-l-indigo-500 hover:border-l-4 hover:bg-white ">
            <label 
                htmlFor={props.id}
                className={`${className?className:''} ${labelCss}`}
            >
                {labelText ? labelText : props.id}
            </label>
            <input 
                id={props.id}
                ref={ref}
                className={`${className?className:''} ${inputCss} `}
                checked = {checked}
                {...props}
            />
        </div>
    )
});

export default QuizInput;