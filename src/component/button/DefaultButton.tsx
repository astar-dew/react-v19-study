// import {Button} from '@material-tailwind/react'


interface DefaultButtonProps{
    buttonText:string;
    handleClick: () => void;
}

export default function DefaultButton( {buttonText, handleClick}:DefaultButtonProps){

    return(
        <button className="border p-3" onClick={handleClick}>
            {buttonText}
        </button>
    )
}