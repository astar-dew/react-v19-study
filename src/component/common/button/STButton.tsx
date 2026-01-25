import { ButtonHTMLAttributes,forwardRef, useState } from 'react';
import ButtonStyleVariant from '../../common/button/ButtonVariant'



interface STButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant?: 'primary'|'secondary'| 'danger' ,
    text?: string ,
    className?: string , 
}

//children, props 를 생각해서 받아보자,
const STButton = forwardRef<HTMLButtonElement,STButtonProps>(
    ({text, className,variant='primary', ...props},ref) =>{
        console.log('props ',props)
    return (<button 
                className={ className || ButtonStyleVariant[variant]} 
                ref={ref} 
                {...props}
            >
                {text || 'button'}
            </button>)
})

export default STButton;


interface IProps {
    text: string
    className?: string
    size: "sm"|"md"|"lg"
    onClick?: () => void
}

const SwButton: React.FC<IProps> = ({text, className, onClick}) => {
    return <button className={`${className}`} onClick={onClick}>{text}</button>
}

<SwButton text={'클릭'} size='md' onClick={() => {}}/>


//복잡하게 느껴짐 좀 더 간단하게. 
// 라이브러리보단 쉽게 쓸수있게 구현하는게 좋을 듯. 


// ref는 일반 props가 아니라 React의 특수한 속성이라
//  forward Ref를 사용.

//props에다가 onClick 받고 기본 내용을 받아보자. 

// check해야할점이 
// <Button [A] [C]={true} [D]={()=>{}}> [B]</Button>
// props 로 받을때 A, B의 차이는 어떻게 되는지 ?

// Button props 
// alignContent : 'start' | 'center'| 'end'
// size: 'small' | 'medium' | 'large'
// variant: 'default' | 'primary' | 'danger' ...
// as 
// href 
// block
// children(required)

// ButtonGroup props
// 붙어있는 버튼 / 잘라져있는 버튼 


//상속 받고 하진 않고 시작해보기
// 일단 스타일링을 해놓고 
// 중복되는 내용을 뽑아서 디자인시스템 같이 전역변수로 선언해서 가져오는 방식으로 진행

//variant 관련된 변수 라이브러리는 cva , clsx, 


//not-peer-has-checked