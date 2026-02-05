import { ButtonHTMLAttributes, forwardRef } from "react";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className? : string;
    Text? : string;
}


const DefaultButton = forwardRef<HTMLButtonElement,DefaultButtonProps>(
    ({className,Text, ...props}) => {
        return (
            // <button className={'border p-3  rounded-xl' || className} {...props}>
            <button className={ `${className} border p-3  rounded-xl`} {...props}>
                {/* tailwind  */}
                {Text || 'button'}
            </button>
        )
    }
);

export default DefaultButton;

// interface DefaultButtonProps{
//     buttonText:string;
//     handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
//     styleClass: string | 'border p-3 bg-gray-700 text-slate-50 rounded-xl'
//     //class style을 변수로 저장해서 가져오는 
//     // 방식이 있다면 그렇게 진행하려함
//     //React.MouseEvent 와 MouseEvent 가 따로 있는듯함. 
// }

// export default function DefaultButton( {buttonText, handleClick, styleClass}:DefaultButtonProps){

//     return(
//         <button className={styleClass} onClick={handleClick}>
//             {buttonText}
//         </button>
//     )
// }



//어차피 className을 받고 사용할때는 className을 사용한다. 
//ButtonText -> text로 간결하게 워딩을 사용한다.