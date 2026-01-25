

interface ISTBasicInput{
    type : 'text'| 'password' |'image' | 'date' | 'email'  ,
    className? : string,
    val : string,
}

export default function STBasicInput({type='text',className, val}:ISTBasicInput){

    return(
        <input className={className} type={type} value={val}>
        </input>
    )
}

// onChange, placeHolder,  
//

// ref 는 렌더링 되지 않아도 되는값 인데 
// input 은 렌더링 되어야하지 않는지