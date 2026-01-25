import { forwardRef } from "react";

interface STInputProps {
    
}

const STInput = forwardRef<HTMLInputElement,STInputProps>(
    ({...props},ref)=>{
        return(
            <input type="text" 

            />
        )
    }
)

export default STInput;


//1. validation 설계, zod사용 등 
//2. type으로 파라미터를 각각 받을 수 있게 만들지. 
//3. 