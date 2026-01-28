
import {Routes, Route} from 'react-router-dom'
import NoMatch from './Nomatch'
import Home from './Home'
import Signin from '../pages/user/Signin'
import SignUp from '../pages/user/SignUp'

import PrivateRoute from './PrivateRoute'
import QuizList from '../pages/quiz/QuizList'
import QuizDetail from '../pages/quiz/QuizDetail'
import QuizSolve from '../pages/quiz/QuizSolve'
import UserDetail from '../pages/user/UserDetail'
import {Layout2} from './layout/index'


//Router Switch,Route

export default function RouteSetup(){
    return(
        <Routes>
            <Route path="/" element={<PrivateRoute/>}/>

            <Route path='/' element={<Layout2/>}>            
                <Route path="/welcome" element={<Home/>}/>
                <Route path="/quiz-pack" element={<QuizList/>}/>
                <Route path="/quiz-pack/:id" element={<QuizDetail/>}/>
                <Route path="/quiz-pack/:id/quiz/:quizid" element={<QuizSolve/>}/>
                <Route path="/user/:userid" element={<UserDetail/>}/>
            </Route>

            <Route path="/sign-in" element={<Signin/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    )
}