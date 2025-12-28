import { Component } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export default function PrivateRoute(){

    const nav = useNavigate();
    let movePath = '/';
    if(localStorage.getItem('loginId')){
        console.log('localstorage 에 ID 있음')
        movePath='/quiz-list'
    }else{
        console.log('로그인 하라우')
        movePath='/sign-in'
    }

    return(
        <Navigate to={movePath}></Navigate>

    )
}