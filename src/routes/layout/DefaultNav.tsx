import { Bell, BookOpenText, LayoutDashboard } from "lucide-react";
import { useNavigate , useLocation} from "react-router-dom";
import Logo1 from '../../asset/svg/jinus.svg'
import { useEffect } from "react";

export default function DefaultNav(){

    const nav = useNavigate();
    const loc = useLocation();

    const NavList = [
        {icon : <LayoutDashboard className="inline mr-2"/>, navText: '대시보드', path: 'dashboard'},
        {icon : <BookOpenText className="inline mr-2"/>, navText: '문제집', path: 'quiz-pack' },
        {icon : <Bell className="inline mr-2"/>, navText: '공지사항' , path: 'notice'},
    ]

    const moveNav = (path:string) => {
        nav(`/${path}`)
    }

    function checkHighLight(NavPath:string,locPath:string) {
        if(locPath.includes(NavPath)){
            return true;
        }else{
            return false;
        }
    }

    return(
        <div className="flex flex-col w-1/6 bg-white">
            <div className="flex flex-row text-[#2262c6] text-blod hover:cursor-pointer m-3 p-3"  
                    onClick={()=>moveNav('welcome')}>
                <span className="w-1/3 flex flex-row gap-2">
                    <img src={Logo1}  alt="logo" />
                    <h2 className="font-bold text-xm "> Astar-Dew </h2>
                </span>
            </div>
            <nav className="justify-around text-white bg-[#2262c6] min-h-screen rounded-tr-xl" >
                {NavList.map((Nav)=>(
                    <div className={`m-3 p-3 rounded-xl ${checkHighLight(Nav.path, loc.pathname) ? 'bg-white text-[#2262c6]' :''}
                            hover:bg-white hover:text-[#2262c6] hover:font-bold hover:cursor-pointer `} 
                            onClick={()=>moveNav(Nav.path)}>
                        { Nav.icon } { Nav.navText }
                    </div>
                ))}
            </nav>
        </div>
    )
}