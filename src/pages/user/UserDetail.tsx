
import { useLocation, useNavigate } from 'react-router-dom'
import ChanceUser from '../../data/User'

export default function UserDetail(){

    const location = useLocation();
    const { mockUserList } = ChanceUser();
    // server 쪽 연동할때 location 부분 수정이 필요하지 않을까?
    const detailUser = mockUserList.filter((user)=>user.userId === location.state.userid)
    const nav = useNavigate();

    const historyBack = () => {
        nav(-1);
    }

    return(
    <div >
        User detail 
        <br />
        <div>{detailUser[0]?.userId}</div>
        <div>{detailUser[0]?.email}</div>
        <div>{detailUser[0]?.company}</div>
        <button onClick={historyBack}>뒤로가기</button>
    </div>
    )
}