import { forwardRef, InputHTMLAttributes } from "react";


interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement>{
    placeHolder?: string
    labelText?:string 
    className?:string
}


const LabelInput = forwardRef<HTMLInputElement,LabelInputProps >(
    ({placeHolder,labelText,className, ...props}, ref) => {
    let inputCss = `
        peer w-full px-4 pt-6 pb-2
        border-2 rounded-lg
        bg-transparent
        text-gray-900
        focus:outline-none focus:border-blue-500
        transition-all duration-200
    `
    let labelCss =`
        absolute left-4 top-1/2 -translate-y-1/2
        text-gray-500
        transition-all duration-200
        peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500
        peer-[:not(:placeholder-shown)]:top-2 
        peer-[:not(:placeholder-shown)]:text-xs
    `

    return(
    <div className="w-full relative">
        {/* Floating Label */}
        <input 
            placeholder={placeHolder}
            ref={ref}
            className={`${className} ${inputCss}`}
            {...props}
        />
        <label 
            htmlFor={props.id}
            className={`${className} ${labelCss}`}
        >
            {labelText ? labelText : props.id}
        </label>
    </div>
    // <div className="w-1/2 box-border mt-auto relative">
    //     <label htmlFor={props.id}>{labelText? labelText : props.id}</label>
    //     <input 
    //         placeholder={placeHolder}
    //         ref = {ref}
    //         className={props.className || 'border-0 rounded-2xl'}
    //         {...props}
    //     />
    // </div>
    )
});

export default LabelInput;