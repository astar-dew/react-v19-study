import { Navigate } from "react-router-dom";

export default function PrivateRoute(){

    let movePath = '/';
    if(localStorage.getItem('loginId')){
        movePath='/quiz-pack'
    }else{
        movePath='/sign-in'
    }

    return(
        <Navigate to={movePath}></Navigate>
    )
}