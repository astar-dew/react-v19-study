import { useEffect } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAuthStore } from '../../store/AuthStore'
import { Bell, Crown, Headset, LogOut, Search, Settings, UserRound } from 'lucide-react'
// import type {FC} from 'react'


type headerProp = {
    headerTitle?:string
}

// const DefaultHeader: FC<headerProp> = ({}) =>{
//     return (
//         <div>
//             <div className='flex bg-gray-200 p-4'>
//                 <Link to='/' className='ml-4'>Home</Link> 
//                 <Link to='/welcome' className='ml-4 text-4'>welcome</Link>
//             </div>
//         </div>
//     )
// }

// export default DefaultHeader;

export default function DefaultHeader({headerTitle} : headerProp){
    //rendering 순서 체크가 필요할듯
    ///컴포넌트 렌더링을 할떄마다 localstorage 읽음. -> useEffect를 사용

    // 1. 서버 사이드 렌더링(SSR) 대응: localStorage는 브라우저에만 있어서 서버에서 에러 발생 가능
    // 2. 렌더링 최적화: useEffect는 DOM이 그려진 후 실행되어 렌더링을 막지 않음
    // 3. React 규칙 준수: 부수효과(side effect)는 useEffect에서 처리하는 게 권장사항
    
    //try 1
    // const [signInId,setSignInId] = useState<String|null>(null);
    // useEffect(()=>{
    //     const loginId = localStorage.getItem('loginId')
    //     setSignInId(loginId);
    //     console.log('loginId',loginId);
    // },[])

    const {loginId,logout,initialize} = useAuthStore();
    //initialize 를 걍 두면 로그인 시 로그인페이지로 이동 안함. 
    useEffect(()=>{
       initialize();
    },[])
    // initialize();
    const nav = useNavigate();
    const loc = useLocation();
    const handleLogout = () => {
        logout()
        nav('/')
    }


    const date = new Date();
    let localTime = date.getHours();
    let Greeing = '';
    if(localTime > 6 && localTime <11 ){
        Greeing = 'Morning'
    }else if(localTime >= 11 && localTime <6){
        Greeing = 'afternoon'
    }else{
        Greeing = 'evening'
    }



    const handleLinkHighlight = () => {
        //리팩토링이 필요할듯?
        if(loc.pathname.includes('quiz-list')){

        }else if(loc.pathname.includes('quiz')){

        }
    }

    const iconClickTest = () => {
        console.log('icon click ! ')
    }
    //path가 바뀔때마다 재호출이므로 
    // api 호출일때는 불필요한 렌더링이 생길 수 있음. -> 조금더 찾아보자. 
    useEffect(()=>{

    },[loc.pathname])


    return (
        <header className='flex flex-row h-12 p-3 m-3 bg-white items-center'>
            {/* sub title - 처음은 그냥 pharse로 하면 될듯. */}
            <div className='basis-1/2'>
                <h1 className='inline font-bold text-lg'>Good {Greeing} , {loginId}</h1>
            </div>
            {/* 검색 + 알림 + user정보 */}
            <div className='basis-1/2 '>
                <div className='flex flex-row gap-3 float-end'>
                    <Search onClick={iconClickTest} />
                    <Bell />
                    {
                        loginId && 
                        <Menu as="div">
                            <MenuButton>{loginId}</MenuButton>
                            <MenuItems className='border-2 rounded-2xl p-2 m-2 space-y-2 absolute right-1 bg-white'>
                                <MenuItem >
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]'>
                                        <UserRound />
                                        {loginId}
                                    </div>
                                </MenuItem>
                                <div className='border-y-0 border-b'></div>
                                <MenuItem >
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]'>
                                        <UserRound />
                                        View Profile
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]'>
                                        <Settings />Account Settings
                                    </div>
                                </MenuItem>
                                <div className='border-y-0 border-b'></div>
                                <MenuItem>
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]'>
                                        <Headset />Support
                                    </div>
                                </MenuItem>
                                <MenuItem>
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]'>
                                        <Crown />Upgrade Account
                                    </div>
                                </MenuItem>
                                <div className='border-y-0 border-b'></div>
                                <MenuItem>
                                    <div className='flex flex-row gap-x-2 hover:cursor-pointer hover:bg-[#f6f8fa]' onClick={handleLogout}>
                                        <LogOut />logout
                                    </div>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    }

                </div>
            </div>

        </header>


    )
}



//해당 메뉴에 하이라이트 
// 





        // <header className=' flex justify-between bg-gray-200 p-4'>
        //     <div className=''>
        //         <Link to='/welcome' >Home</Link> 
        //     </div>
        //     <div className='flex flex-row space-x-4'>
        //         <Link to='/quiz-pack'>문제집</Link>
        //         <div>유저정보</div>
        //     </div>
        //     <div className=''>
        //         {loginId && 
        //         <Menu as="div" className="relative inline-block">
        //             <MenuButton className="inline-flex rounded-md bg-white/10 text-sm font-semibold  hover:bg-white/20">
        //                 {loginId}
        //             </MenuButton>

        //             <MenuItems
        //                 transition
        //                 className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-leave:duration-75 data-enter:ease-out data-leave:ease-in"
        //             >
        //                 <div className="py-1">
        //                     <MenuItem>
        //                         <Link
        //                             to="#"
        //                             className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-none"
        //                         >
        //                             Account settings
        //                         </Link>
        //                     </MenuItem>

        //                     <form action="#" method="POST">
        //                         <MenuItem>
        //                         <button
        //                             type="submit"
        //                             className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-none"
        //                             onClick={handleLogout}
        //                         >
        //                             Sign out
        //                         </button>
        //                         </MenuItem>
        //                     </form>
        //                 </div>
        //             </MenuItems>
        //         </Menu>}
                
        //     </div>
        // </header>