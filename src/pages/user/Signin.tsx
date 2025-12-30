
import DefaultButton from '../../component/button/DefaultButton';
import { useNavigate } from "react-router-dom";
import MockData from '../../data/User'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

type SignInForm = {
    loginId: string,
    loginPass: string
    
}

const formSchem = z.object({
    loginId: z.string().min(3,{message: '아이디는 3자 이상입니다.'}),
    loginPass: z.string().min(5,{message: '비밀번호를 확인해주세요.'})
})

//홈으로 들어올때 cookie or localStorage 가 없으면 
// 로그인 페이지로
export default function Signin(){
    const nav = useNavigate();

    const {mockUserList} = MockData()

    const [userList , setUserList] = useState(mockUserList);

    // const [ formData , setFormData ] = useState<SignInForm>({
    //         loginId:'',
    //         loginPass: '',
    // }); 

    const {register, formState: {errors}, handleSubmit, watch} = useForm<SignInForm>({
        resolver: zodResolver(formSchem),
        defaultValues: {
            loginId: '',
            loginPass: ''
        }
    })

    // const handleChange = (e:React.ChangeEvent< HTMLInputElement >) => {
    //     // ChangeEvent 합성 이벤트. -> 크로스 브라우징, 성능 최적화
    //     // HTMLInputElement: <input> 태그에서 발생한 이벤트임을 명시
    //     // => 제네릭을 넣지 않으면 
    //     // HTMLSelectElement: <select> 태그에서 발생한 이벤트임을 명시
    //     // TypeScript는 e.target이 정확히 무엇인지 알 수 없어 value나 name 같은 속성에 접근할 때 에러를 발생시킵니다.
    //     console.log('handle event : ',e)
    //     const { name, value } = e.target;
    //     setFormData(prev =>({...prev, [name]: value}))
    // }

    const signIn = () => {
        //mock data에서 정보 확인. 
        const signInResult = mockUserList.filter((user)=> user.userId === watch('loginId') && user.pass === watch('loginPass'));

        //local storage 에 저장 (새로 고침에도 데이터 유지), usestate에 저장 (새로고침 전 데이터 유지 )
        if(signInResult.length == 0){
            alert('회원 정보를 다시 입력해주세요')
            return 
        }

        if(signInResult.length == 1){
            localStorage.setItem('loginId', watch('loginId'))
            nav('/quiz-pack')
        }
    }

    const signUp = () => {
        nav('/sign-up')
    }

    
    
    return (
        <form id="signInForm" onSubmit={handleSubmit((e)=>{})} >
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  p-4">
                <div className='flex flex-col bg-white rounded-2xl shadow-xl p-4'>
                        <label htmlFor="loginId">id</label>
                        <input id="loginId" className='border p-2' type="text"  {...register('loginId')}/>
                        {errors.loginId&&<p>{errors.loginId.message}</p>}

                        <label htmlFor="loginPass">password</label>
                        <input id="loginPass" className='border p-2' type="password"  {...register('loginPass')} />
                        {errors.loginPass&&<p>{errors.loginPass.message}</p>}

                        <div className='flex justify-center'>
                            <DefaultButton buttonText='sign in' handleClick={signIn}/> 
                            <DefaultButton buttonText='sign up' handleClick={signUp}/> 
                        </div>
                </div>
            </div>
        </form>
    )
}