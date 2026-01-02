
import { useNavigate, useLocation } from "react-router-dom";
// import path from "path";
import MockData from '../../data/User'
import { useAuthStore } from "../../store/AuthStore";
import { useState, ChangeEvent, useEffect } from "react";

export default function QuizDetail(){
    const nav = useNavigate();
    const location = useLocation();
    
    const { mockQuizList } = MockData()

    const quizId = location.state.id;
    // rendering 되는지는 어떻게 확인할까 , 
    // 퀴즈 리스트 보는 화면도 만들어야할듯 ? 
    const { loginId } = useAuthStore();  
    const [ isModify , setIsModify ] = useState<boolean>(true);

    const detailQuiz = mockQuizList.filter((quiz)=>quiz.id == quizId)


    // reactDevltool 에서 삭제,수정 볼수 있는지도 확인 필요

    const handleModify = () => {
        //권한 체크를 해야할지 
        setIsModify(!isModify)
        if(isModify==false){
            //user 정보 수정 완료를 해야하는데
        }
    }

    const inputChangeHanlder = (e: ChangeEvent<HTMLInputElement>)=>{
        console.log('input : ',e.target)
    }

    const handleDel = () => {
        if(window.confirm('삭제하겠습니까?')){
            alert('삭제했습니다.')
        }else{
        }
    }

    // sqlinjection check 필요
    const solveProblem = () => {
        nav(`/quiz-pack/${quizId}/quiz/1`,{state:{quizPackId:quizId, quizid: 1}})
    }


    //effect "부수 효과(side effect)"를 처리하기 위한 Hook입니다.
    //     컴포넌트 렌더링 외부에 영향을 주는 작업
    //     React의 주요 작업(UI 렌더링) 이외의 작업
    useEffect(()=>{
    },[])


    return(
        <div>
            <h1>detail page</h1>

            <input type="text" onChange={inputChangeHanlder} disabled={isModify} value={detailQuiz[0]?.name}/>
            <input type="text" disabled={isModify} value={detailQuiz[0]?.company}/>
            <input type="text" disabled={isModify} value={detailQuiz[0]?.email}/>


            {/* 권한 . 자신의 글 일 때 , 관리자 일 때만 보이게.  
               user 에 타입 필요.
            */}
            {detailQuiz[0]?.quiz.length != 0 && 
                <button onClick={solveProblem}>문제 풀기</button>
            }

            <br />
            {loginId == detailQuiz[0]?.created &&
            <>
                <button onClick={handleModify}>{isModify == true? "수정하기" : "수정 적용"}</button>
                <button onClick={handleDel}>삭제</button>
            </>
            }

        </div>
    )
}