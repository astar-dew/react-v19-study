import { ChangeEvent, useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MockData from '../../data/User'


interface Quiz {
  quizid: number;
  title: string;
  answer: {
    answer1: string|number;
    answer2: string|number;
    answer3: string|number;
    answer4: string|number;
    correct: string|number;
  };
}

interface QuizPack {
  id: string;
  created: string;
  name: string;
  email: string;
  company: string;
  quiz: Quiz[];  // ← 빈 객체 불가능하도록 명시
}

export default function QuizSolve(){
    const location = useLocation();
    const nav = useNavigate();

    const { mockQuizList } = MockData();
    const quizPack = mockQuizList.filter(( quizlist )=> quizlist.id == location.state.quizPackId); // 여기서 데이터 구조안봄.
    const quiz = quizPack[0].quiz;

    // 클로드 참고, 마지막 문제에서 이슈가 있음. 
    function* quizGenerator(items:{}[]){
        for(let item of items){
            yield item
        }
    }

    // const generatorRef = useRef()//초기 렌더링 이후 렌더링 x
    // const [ generator ] = useState(()=> quizGenerator(quiz));
    const [ selectAnswerVal, setSelectAnswerVal ] = useState<any>();
    const [ currentQuiz, setCurrentQuiz ] = useState<Quiz>();
    let quizIdx = useRef(0);
    // const [ currentIdx, setCurrentIdx] = useState<number>(0);

    const answerSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectAnswerVal(e.target.value)
    }

    const submitAnswer = () => {
        // 정답 체크 
        quizIdx.current++;
        if(quizIdx.current === quiz.length){
            window.confirm(' clear ')
            nav('/quiz-pack')
        }

        if(quizIdx.current < quiz.length){
            setCurrentQuiz(quiz[quizIdx.current])
            
            if(quiz[quizIdx.current].answer.correct == selectAnswerVal){
                window.confirm(' 정답입니다 \n 다음문제를 풀겠습니까?')
            }else{
                window.confirm('틀렸습니다 \n 다음문제를 풀겠습니까?')
            }
            setSelectAnswerVal(null)
        }
    }

    const handleHint = () => {
        setSelectAnswerVal(quiz[quizIdx.current].answer.correct)
    }

    useEffect(()=>{
        setCurrentQuiz(quiz[quizIdx.current]);
    },[quizIdx])



    return( 

    //정답 클릭 및 정답 제출 
    <div className="flex flex-col ">
        {currentQuiz?.title}
        
        <div>
            <input 
                id="radio1" 
                name= "answer" 
                type="radio" 
                onChange={answerSelectHandler} 
                checked={selectAnswerVal==currentQuiz?.answer?.answer1} 
                value={currentQuiz?.answer?.answer1} 
            />
            <label htmlFor="radio1">{currentQuiz?.answer?.answer1}</label>
        </div>
        <div>
            <input 
                id="radio2" 
                name= "answer" 
                type="radio" 
                onChange={answerSelectHandler}
                checked={selectAnswerVal==currentQuiz?.answer?.answer2}
                value={currentQuiz?.answer?.answer2} 
            />
            <label htmlFor="radio2">{currentQuiz?.answer?.answer2}</label>
        </div>
        <div>
            <input 
                id="radio3" 
                name= "answer" 
                type="radio" 
                onChange={answerSelectHandler}
                checked={selectAnswerVal==currentQuiz?.answer?.answer3}
                value={currentQuiz?.answer?.answer3}
            />
            <label htmlFor="radio3">{currentQuiz?.answer?.answer3}</label>
        </div>
        <div>
            <input 
                id="radio4"
                name= "answer" 
                type="radio" 
                onChange={answerSelectHandler}
                checked={selectAnswerVal==currentQuiz?.answer?.answer4}
                value={currentQuiz?.answer?.answer4}
            />
            <label htmlFor="radio4">{currentQuiz?.answer?.answer4}</label>
        </div>

        <div>현재 진행도 : {quizIdx.current+1}/{quiz.length}</div>

        <button onClick={submitAnswer}>제출 </button>
        <button onClick={handleHint}>힌트 </button>
    </div>)
}