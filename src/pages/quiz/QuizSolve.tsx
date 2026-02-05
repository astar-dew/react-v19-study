import { ChangeEvent, useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import MockData from '../../data/User'
import DefaultButton from "../../component/common/button/DefaultButton";
import QuizInput from "../../component/common/input/QuizInput";
import STModal from "../../component/common/modal/STModal";


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
    const quizPack = mockQuizList.filter(( quizlist )=> quizlist.id == location.state.quizPackId); 
    const quiz = quizPack[0].quiz;

    const [ selectAnswerVal, setSelectAnswerVal ] = useState<any>(null);
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const [ currentQuiz, setCurrentQuiz ] = useState<Quiz>();

    const [ dialogTitle, setDialogTitle ] = useState<string>();
    const [ dialogContent, setDialogContent ] = useState<string>();


    // const [ progressPercent, setProgressPercent ] = useState();

    let quizIdx = useRef(0);

    const closeModal = (e:React.MouseEvent,nextSolve:boolean)=>{
        e.preventDefault();
        setIsModalOpen(false)
        if(nextSolve){
            quizIdx.current++;
            setSelectAnswerVal(null)
        }
    }

    const answerSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectAnswerVal(e.target.value)
    }
    
    
    const submitAnswer = () => {
        if(selectAnswerVal===null){
            setDialogTitle('정답을 클릭 해주세요!')
            setIsModalOpen(true)
            return
        }
        
        if(quizIdx.current === quiz.length-1){
            if(quiz[quizIdx.current].answer.correct == selectAnswerVal){
                setDialogTitle('정답 입니다 .')
                setDialogContent('문제집을 클리어 하셨습니다. !')
            }else{
                setDialogTitle('오답 입니다 .')
                setDialogContent('문제집을 클리어 하셨습니다. !')
            }
            setIsModalOpen(true)
            return 
        }

        if(quizIdx.current < quiz.length){
            if(quiz[quizIdx.current].answer.correct == selectAnswerVal){
                setDialogTitle('정답입니다 .')
                setDialogContent('다음문제를 풀겠습니까?')
            }else{
                setDialogTitle('틀렸습니다 .')
                setDialogContent('다음문제를 풀겠습니까?')
            }
            setIsModalOpen(true)
        }
    }

    const handleHint = () => {
        setSelectAnswerVal(quiz[quizIdx.current].answer.correct)
    }

    useEffect(()=>{
        setCurrentQuiz(quiz[quizIdx.current]);
    },[quizIdx.current])

    return( 
    <div className="flex flex-col items-center border ">
        <STModal
            isModalOpen = {isModalOpen}
            dialogTitle = {String(dialogTitle)}
            dialogContent= {dialogContent}
        >
            {quizIdx.current+1 < quiz.length ? 
            <div className="space-x-2 ">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e:React.MouseEvent)=>closeModal(e,true)}
                >
                    다음 문제 풀기
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e:React.MouseEvent)=>closeModal(e,false)}
                    >
                    다시풀기
                </button>
            </div>
            :
            <div className="space-x-2 ">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e:React.MouseEvent)=>{return nav('/quiz-pack')}}
                >
                    문제집 리스트로
                </button>
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={(e:React.MouseEvent)=>closeModal(e,false)}
                >
                    다시풀기
                </button>
            </div>
            }
        </STModal> 
        
        <div className="">
            <p>현재 진행도 : {quizIdx.current+1}/{quiz.length}</p> 
            <progress  value={quizIdx.current+1} max={quiz.length}>qwe</progress>
        </div>

        {/* 시간날 때 해보기 */}
        {/* <div className="w-1/3 bg-black">
            <div className={`w-[${progressPercent}%] bg-indigo-500`}>t</div>
        </div>  */}
        
        <div className="w-1/2 flex flex-col p-3 m-3 bg-[#fbfbfb]">
            <h1 className="text-gray-500"> Question {quizIdx.current+1}</h1>
            <h2 className="mt-2 mb-2">{currentQuiz?.title}</h2>

            <QuizInput
                id='radio1'
                name="answer"
                labelText={String(currentQuiz?.answer?.answer1)}
                type="radio"
                onChange={answerSelectHandler} 
                checked={selectAnswerVal === currentQuiz?.answer?.answer1} 
                value={currentQuiz?.answer?.answer1} 
            />

            <QuizInput
                id='radio2'
                name="answer"
                labelText={String(currentQuiz?.answer?.answer2)}
                type="radio"
                onChange={answerSelectHandler} 
                checked={selectAnswerVal === currentQuiz?.answer?.answer2} 
                value={currentQuiz?.answer?.answer2} 
            />

            <QuizInput
                id='radio3'
                name="answer"
                labelText={String(currentQuiz?.answer?.answer3)}
                type="radio"
                onChange={answerSelectHandler} 
                checked={selectAnswerVal === currentQuiz?.answer?.answer3} 
                value={currentQuiz?.answer?.answer3}
            />

            <QuizInput
                id='radio4'
                name="answer"
                labelText={String(currentQuiz?.answer?.answer4)}
                type="radio"
                onChange={answerSelectHandler} 
                checked={selectAnswerVal === currentQuiz?.answer?.answer4} 
                value={currentQuiz?.answer?.answer4}
            />

            <div className="flex justify-center gap-2">
                <DefaultButton
                    Text='제출'
                    onClick={submitAnswer}
                    className="hover:bg-[#2262c6] hover:text-white"
                />
                <DefaultButton
                    Text='힌트'
                    onClick={handleHint}
                    className="hover:bg-[#2262c6] hover:text-white"
                />
            </div>
        </div>
    </div>
    )
}