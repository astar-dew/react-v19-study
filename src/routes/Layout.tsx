import { Outlet } from "react-router-dom";
import DefaultHeader from './layout/DefaultHeader'
import DefaultFooter from './layout/DefaultFooter'


export default function Layout(){
    return (
    <>
        <DefaultHeader/>
        <Outlet/>
        <DefaultFooter/>
    </>)
}
// , 모니터 판매  