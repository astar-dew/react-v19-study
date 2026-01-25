

interface ISTBasicLabelInput{
    id :string,
    labelText : string, 
    type? : 'text'| 'password' |'image' | 'date' | 'email'  ,
    className? : string,
    val? : string,
}

export default function STBasicLabelInput({id, labelText, type='text', className, val}:ISTBasicLabelInput){

    return(
        <div>
            <label htmlFor={id}>{labelText}</label>
            <input id={id} className={className} type={type} value={val}/>
        </div>
    )
}

// onChange, placeHolder,  
// [label 체크 사항]
// 1. position 부분을 체크해야하지 않을까?  
// 2. htmlFor - input id 일치
// 3. form submit 시 어떻게 처리할지 
//     useState로 할지 어떤 방식으로 할지에 대해서. 

// #. zod ,reg

// css position 
// static(default), relative, fixed, absolute, 
// sticky(이부분은 스크롤 헤더? 부분에 적합할 듯)
// 

// [전체 설계] input 은 렌더링 되어야하지 않는지
// 1. 전체 구성으로 컴포넌트 구성
// 2. basic Input 을 가져와서 input label을 구성 
