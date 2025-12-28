import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import DefaultFooter from "./DefaultFooter";


export default function Layout(){
    return (
        <>
            <DefaultHeader/>
            <Outlet/>
            <DefaultFooter/> 
        </>
    )
}