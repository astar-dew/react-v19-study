
import DefaultButton from '../../component/common/button/DefaultButton';
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import MockData from '../../data/User'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { REGEX } from '../../format/SignUpReg'
import STBasicButton from '../../component/common/button/STBasicButton';
import STBasicLabelInput from '../../component/common/input/STBasicLabelInput';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import STBasicLabelButtonInput from '../../component/common/input/STBasicLabelButtonInput';
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

    const [ passwordType, setPasswordType ] = useState('password')
    const [ isPassVisible, setIsPassVisible ] = useState(false)

    const visibleUpdate = () => {
        setIsPassVisible(!isPassVisible)
        setPasswordType(isPassVisible? 'text' : 'password')
    }

    const {register, formState: {errors}, handleSubmit, watch} = useForm<SignupForm>({
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
            console.log('handle change')
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

    const handleIDDuplCheck = (e:React.MouseEvent) => {
        e.preventDefault();
        
        const duplResult = mockUserList.find((user) =>  formData.loginId == user.name )
        if(watch('loginId')===''){
            alert('아이디를 입력해주세요');
            return ;
        }
        if(duplResult == null){
            // id에 다른 값누르면 
            // 다시 중복확인을 하게 해야함.
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
        // check 하는 로직, 각 인풋의 validate 어떻게 할것인지.
        // 메모이제이션 19버전부터는 사용하지 않음. 

        // loginId: '',
        // signUpPass: '',
        // signUpPassCheck: '',
        // email: '',
    }



    const userValid = z.object({
        loginId: z.string(),
        SignUpPass: z.string(),
        email: z.string(),
    })


    return(
        <form id="signUpForm" onChange={()=>handleChange} onSubmit={handleSubmit((e)=>console.log(e))}>
            <div className="flex justify-center items-center  bg-black min-h-screen ">
                <div className='flex flex-col bg-white space-y-6 rounded-2xl shadow-xl p-4'>

                    {/* <STBasicLabelButtonInput
                        id='loginId'
                        labelText='아이디'
                        placeholder='Enter your Id'
                        // labelClassName='block'
                        inputClassName='w-full border rounded-2xl'
                        {...register('loginId')}
                        button={
                            <STBasicButton
                                className='border-2'
                                onClick={handleIDDuplCheck}
                            >중복확인</STBasicButton>}
                    /> */}

                    <STBasicLabelInput
                        id='loginId'
                        labelText='아이디'
                        placeholder='Enter your Id'
                        // labelClassName='block'
                        inputClassName='w-full border rounded-2xl'
                        {...register('loginId')}
                        icon={
                            <STBasicButton
                                className='border-2'
                                onClick={handleIDDuplCheck}
                            >중복확인</STBasicButton>}
                    />

                    <STBasicLabelInput
                        id='signUpPass'
                        type={passwordType}
                        labelText='패스워드'
                        placeholder='Enter Password'
                        labelClassName='block p-2 '
                        inputClassName='w-full border p-2 rounded-2xl'
                        icon={isPassVisible? 
                            <Eye className="inline" onClick={visibleUpdate}/> : 
                            <EyeOff className="inline" onClick={visibleUpdate}/> }
                        {...register('signUpPass')}
                    />

                    <STBasicLabelInput
                        id='signUpPassCheck'
                        type={passwordType}
                        labelText='패스워드 확인'
                        placeholder='Enter Password'
                        labelClassName='block p-2 '
                        inputClassName='w-full border p-2 rounded-2xl'
                        {...register('signUpPassCheck')}
                    />

                    <STBasicLabelInput
                        id='email'
                        labelText='이메일'
                        placeholder='Enter your Email'
                        labelClassName='block p-2 '
                        inputClassName='border p-2 rounded-2xl'
                        {...register('email')}
                    />

                    <STBasicButton
                        className='border mt-4 p-4 rounded-2xl ' 
                        onClick={signUp}
                    >
                        <UserPlus className='inline mr-2'/>가입
                    </STBasicButton>

                </div>
            </div>
        </form>
    )
}

// 



    
