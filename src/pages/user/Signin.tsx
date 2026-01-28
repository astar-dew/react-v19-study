
import { useNavigate } from "react-router-dom";
import MockData from '../../data/User'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import STBasicLabelInput from '../../component/common/input/STBasicLabelInput';

import { Cable, Eye, EyeOff, Flower2, LogIn, UserPlus } from 'lucide-react'
import STBasicButton from '../../component/common/button/STBasicButton';

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

    const { mockUserList } = MockData()

    const [ userList , setUserList ] = useState(mockUserList);

    const [ isPassVisible, setIsPassVisible] = useState(false);
    const [ passwordType , setPasswordType] = useState('password')

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
    //     const { name, value } = e.target;
    //     setFormData(prev =>({...prev, [name]: value}))
    // }


    const visibleUpdate = () => {
        setIsPassVisible(!isPassVisible)
        isPassVisible? setPasswordType('password') :  setPasswordType('text')
    }

    const signIn = () => {
        //mock data에서 정보 확인. 
        const signInResult = mockUserList.filter((user)=> user.userId === watch('loginId') && user.pass === watch('loginPass'));
        
        // console.log('watch login : ',watch('loginId'))
        // console.log('watch loginPass : ',watch('loginPass'))

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
            <div className="flex justify-center bg-black ">
                <div className='flex flex-col items-center bg-white rounded-2xl shadow-xl p-4 space-y-3'>

                    <section className='flex flex-col items-center p-10'>
                        <h1 className=''><Flower2 color={'red'}className='inline'/>Welcom Back!<Flower2 color={'red'}className='inline'/></h1>
                        <h3 className=''>We missed your Please enter your details</h3>
                    </section>

                    <STBasicLabelInput
                        id='loginId'
                        labelText='아이디'
                        placeholder='Enter your Id'
                        labelClassName='block p-2 '
                        inputClassName='border p-2 rounded-2xl'
                        {...register('loginId')}
                    />
                    {errors.loginId && <p>{errors.loginId.message}</p>} 

                    <STBasicLabelInput
                        id='loginPass'
                        type={passwordType}
                        labelText='패스워드'
                        placeholder='Enter Password'
                        labelClassName='block p-2 '
                        inputClassName='border p-2 rounded-2xl'
                        icon={isPassVisible? <EyeOff className="inline" onClick={visibleUpdate}/>
                                            :<Eye className="inline" onClick={visibleUpdate}/> }
                        {...register('loginPass')}
                    />
                    {errors.loginPass && <p>{errors.loginPass.message}</p>} 
                    
                    <STBasicButton
                        className='w-full border m-1 p-4 rounded-2xl' 
                        onClick={signIn}
                    >
                        <LogIn className='inline mr-2'/>Sign In 
                        {/* inline 빼는 방향으로 */}
                    </STBasicButton>

                    <STBasicButton
                        className='w-full border m-1 p-4 rounded-2xl ' 
                        onClick={signUp}
                    >
                        <UserPlus className='inline mr-2'/>Sign Up
                    </STBasicButton>
                    
                </div>
            </div>
        </form>
    )
}

// register의 역할이 궁금함. 
// zod의 실행 로직에 대해서 궁금함. 