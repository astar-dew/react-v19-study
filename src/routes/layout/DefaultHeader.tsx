import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
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
    const [signInId,setSignInId] = useState<String|null>(null);
    useEffect(()=>{
        const loginId = localStorage.getItem('loginId')
        setSignInId(loginId);
        console.log('loginId',loginId);

    },[])

    return (
    <header>
        <div>
            <div className='flex bg-gray-200 p-4'>
                <Link to='/' className='ml-4'>Home</Link> 
                <Link to='/welcome' className='ml-4 text-4'>welcome</Link>
                {signInId && 
                <Menu as="div" className="relative inline-block">
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-white/5 hover:bg-white/20">
                        {signInId}
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">
                        <MenuItem>
                            <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:text-white data-[focus]:outline-none"
                            >
                            Account settings
                            </a>
                        </MenuItem>

                        <form action="#" method="POST">
                            <MenuItem>
                            <button
                                type="submit"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-300 data-[focus]:bg-white/5 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                Sign out
                            </button>
                            </MenuItem>
                        </form>
                        </div>
                    </MenuItems>
                    </Menu>}

            </div>
            <div>
                {/* signout 도 drop menu 형식으로 진행 */}
                {/* {signInId && <div>{signInId}</div>} */}
                
            </div>
        </div>
    </header>
    )
}