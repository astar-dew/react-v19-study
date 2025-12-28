
import { useNavigate, useLocation } from "react-router-dom";

import MockData from '../../data/User'

export default function QuizDetail(){
    const nav = useNavigate();
    const location = useLocation();
    
    const { mockQuizList } = MockData()

    
    const quizId = location.state.id;
    console.log('location.state.id',location.state.id);
    console.log('location.state.id',typeof location.state.id);


    const detailQuiz = mockQuizList.filter((quiz)=>quiz.id == quizId)

    console.log('show ', detailQuiz);

    return(
        <div>
            detail page

            <div>{detailQuiz[0]?.name}</div>

            <div>{detailQuiz[0]?.company}</div>
            <div>{detailQuiz[0]?.email}</div> 


            {/* 권한 . 자신의 글 일 때 , 관리자 일 때만 보이게.  
               user 에 타입 필요.
            
            */}
            <button>수정</button>
            <button>삭제</button>

        </div>
    )
}