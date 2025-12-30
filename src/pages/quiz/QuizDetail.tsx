
import { useNavigate, useLocation } from "react-router-dom";
// import path from "path";
import MockData from '../../data/User'
import { useAuthStore } from "../../store/AuthStore";

export default function QuizDetail(){
    const nav = useNavigate();
    const location = useLocation();
    
    const { mockQuizList } = MockData()

    
    const quizId = location.state.id;
    // rendering 되는지는 어떻게 확인할까 , 
    const { loginId } = useAuthStore();  
    const detailQuiz = mockQuizList.filter((quiz)=>quiz.id == quizId)


    // reactDevltool 에서 삭제,수정 볼수 있는지도 확인 필요

    const handleModify = () => {
        // input의 타입을 바꿀것인지 생각 필요
        
    }
    const handleDel = () => {
        window.confirm('삭제하겠습니까?');
    }

    // sqlinjection check 필요
    const solveProblem = () => {
        nav(`/quiz-pack/${quizId}/quiz/1`,{state:{quizPackId:quizId, quizid: 1}})
        // nav(path.join(`/quiz-pack/`,quizId,)) path 가 없네. 
    }



    return(
        <div>
            detail page

            <div>{detailQuiz[0]?.name}</div>

            <div>{detailQuiz[0]?.company}</div>
            <div>{detailQuiz[0]?.email}</div> 


            {/* 권한 . 자신의 글 일 때 , 관리자 일 때만 보이게.  
               user 에 타입 필요.
            */}
            {detailQuiz[0]?.quiz.length != 0 && 
                <button onClick={solveProblem}>문제 풀기</button>
            }

            <br />
            {loginId == detailQuiz[0]?.created && <>
            <button onClick={handleModify}>수정</button>
            <button onClick={handleDel}>삭제</button>
            </>
            }

        </div>
    )
}