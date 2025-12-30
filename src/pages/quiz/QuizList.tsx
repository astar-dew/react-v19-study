
import { Navigate, Link, useNavigate } from "react-router-dom";
import ChanceUser from '../../data/User'
import { useEffect } from "react";

//홈으로 들어올때 cookie 가 없으면 
// 로그인 페이지로

// ChanceUser.generateUser()

type UsersProps = {
    id: string,
    name: string,
    email: string,
    company: string,
}

export default function QuizList(){

    // const {generateUser,generateUsers,mockUser} = ChanceUser()

    const { mockQuizList } = ChanceUser()

    const nav = useNavigate();

    // const tableList:UsersProps[] = generateUsers()

    // const userInfo={}};
    // useEffect(()=>{
    //     return () => {userInfo = generateUser()}
    // },[]);   chance 모듈이 뭔가 있는듯. 왜 안되지. 

    const movetoQuizDetail = (id:string) => {
        nav(`/quiz-pack/${id}`,{state:{id: id}})
    }

    const movetoUserDetail = (userid:string) => {
        nav(`/user/${userid}`,{state:{userid: userid}})
    }

    return (
        <div className="flex items-center ">
            
            <table className="border-spacing-2 bg-slate-400 bg-clip-border">

                <tr>
                    <th>idx</th>
                    <th>생성자</th>
                    <th>문제집명</th>
                    <th>Email</th>
                </tr>
                {mockQuizList.map((list,idx)=>
                    <tr>
                        <td>{idx+1}</td>
                        <td onClick={()=>movetoUserDetail(list.created)}>{list.created}</td>
                        <td onClick={()=>movetoQuizDetail(list.id)}>{list.name}</td> 
                        <td>{list.email}</td>
                    </tr>
                )} 
                {/* <tr>
                    <td>{mockUser?.name}</td>
                    <td>{mockUser?.email}</td>

                </tr> */}
            </table>
        </div>
    )
}