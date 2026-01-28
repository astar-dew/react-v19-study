import { Bell, BookOpenText, LayoutDashboard } from "lucide-react";



export default function DefaultNav(){
    return(
        <nav id="nav" className="w-1/6 bg-indigo-500 z-30">
            <div>
                Home
            </div>

            <ul>
                <li><LayoutDashboard className="inline"/>대시보드</li>
                <li><BookOpenText className="inline"/>문제집</li>
                <li><Bell className="inline"/>공지사항</li>
            </ul>
        </nav>
    )
}