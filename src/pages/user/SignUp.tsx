
import DefaultButton from '../../component/button/DefaultButton';
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import MockData from '../../data/User'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { REGEX } from '../../format/SignUpReg'
// import { zodResolver } from '@hookform/resolvers/zod';

type SignupForm = {
    loginId: string,
    signUpPass: string,
    signUpPassCheck: string,
    email: string,
}

const schema = z.object({
    loginId : z.string().min(3, {message:'아이디를 입력해주세요'}),
    signUpPass : z.string().regex(REGEX.PASSWORD, {message: "비밀번호 (8자 이상, 영문+숫자+특수문자)"}),
    signUpPassCheck : z.string().regex(REGEX.PASSWORD, {message: "비밀번호 (8자 이상, 영문+숫자+특수문자)"}),
    // email : z.string().regex(REGEX.EMAIL),
    email : z.email({message:'email 형식에 맞춰서 입력해주세요'}),
})


export default function SignUp(){

    const [ formData , setFormData ] = useState<SignupForm>({
        loginId:'',
        signUpPass: '',
        signUpPassCheck:'',
        email: ''
    }); 

    const [idDupleCheck , setIdDupleCheck] = useState(false);
    const { mockUserList } = MockData();

    const {register, formState: {errors}, handleSubmit} = useForm<SignupForm>({
        resolver: zodResolver(schema),
        defaultValues:{
            loginId: '',
            signUpPass: '',
            signUpPassCheck: '',
            email: '',
        }
    });


    const handleChange = (e:React.ChangeEvent< HTMLInputElement | HTMLSelectElement >) => {
        // ChangeEvent 합성 이벤트. -> 크로스 브라우징, 성능 최적화
        //HTMLInputElement: <input> 태그에서 발생한 이벤트임을 명시
        // => 제네릭을 넣지 않으면 
        //HTMLSelectElement: <select> 태그에서 발생한 이벤트임을 명시
        // TypeScript는 e.target이 정확히 무엇인지 알 수 없어 value나 name 같은 속성에 접근할 때 에러를 발생시킵니다.
        const { name, value, type } = e.target;
        if( type=='checkBox' ){
            // setFormData(prev =>({...prev, [name]: checked}))
        }else{
            setFormData(prev =>({...prev, [name]: value}))
        }
    }

    // handleSubmit = () => {
    //     //validator

    //     if(formData.signUpPass === formData.signUpPassCheck){
    //         alert('비밀번호를 확인해주세요!');
    //         return ;
    //     }
    // }

    const handleDuplCheck = (e:React.MouseEvent) => {
        e.preventDefault();
        const duplResult = mockUserList.find((user) =>  formData.loginId == user.name )
        if(formData.loginId===''){
            alert('아이디를 입력해주세요');
            return ;
        }
        if(duplResult == null){
            setIdDupleCheck(true);
            alert('사용가능한 아이디입니다.')
            return ;
        }else{
            alert('중복된 ID 입니다. 다른아이디로 생성해주세요')
        }
    }
    
    // const [dupl,setDupl] = useState(false);
    // 중복체크는 어떻게 처리할지?
    const signUp = () => {
        //check 하는 로직, 각 인풋의 validate 어떻게 할것인지.
        //메모이제이션 19버전부터는 사용하지 않음. 
        alert('signup')
        console.log('form data',document.getElementsByTagName('form'));
    }



    const userValid = z.object({
        loginId: z.string(),
        SignUpPass: z.string(),
        email: z.string(),
    })

    const idDuplCheck = () => {
        //mock data check
        alert('duple check')
        //중복 없을 시state true
        // setDupl(true);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  p-4">
            <form id="signUpForm" action="#" onChange={()=>handleChange} onSubmit={handleSubmit((e)=>console.log(e))}>
                <div className='flex flex-col bg-white rounded-2xl shadow-xl p-4'>
                    <label htmlFor="loginId">id</label>
                    <div>
                        <input id="loginId" className='border p-2' type="text" {...register('loginId')} />
                        <button onClick={handleDuplCheck}>중복 확인</button>
                        {/* <DefaultButton buttonText='중복 확인' handleClick={handleDuplCheck}/> */}
                    </div>

                    <label htmlFor="signUpPass">password</label>
                    <input id="signUpPass" className='border p-2' type="password" {...register('signUpPass')}/>
                    {errors.signUpPass&&<p>{errors.signUpPass.message}</p>}
                    {/* <input id="signUpPass" name="signUpPass" className='border p-2' type="password" {...register('signUpPass')}/> 
                     regiter 등록 시 name으로 셋팅되는듯*/} 

                    <label htmlFor="signUpPassCheck">password check</label>
                    <input id="signUpPassCheck" className='border p-2' type="password" {...register('signUpPassCheck')} />
                    {errors.signUpPassCheck&&<p>{errors.signUpPassCheck.message}</p>}

                    <label htmlFor="email">eamil</label>
                    <input id="email" placeholder={'test@xxx.com'}className='border p-2' type="text" {...register('email')} />
                    {errors.email&&<p>{errors.email.message}</p>}

                    {/* <label htmlFor="gender">gender</label> 
                    <div>남자<input type="radio" disabled value={'남'} checked={true}/></div>
                    <div>여자<input type="radio" disabled value={'여'}/></div> */}
                    {/* radio 어케 처리했는지 까먹음.  */}
                    {/* <input id="gender" placeholder={'test'}className='border p-2' type="password" /> */}
                    <button >가입</button>
                    {/* <DefaultButton buttonText='sign up' handleClick={signUp}/>  */}

                </div>
            </form>
        </div>
    )

}




    
