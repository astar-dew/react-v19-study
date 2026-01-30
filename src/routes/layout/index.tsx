import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import DefaultNav from "./DefaultNav";
import DefaultFooter from "./DefaultFooter";


export const Layout1 = () => {

    return(
        <div>
            <DefaultHeader/>
            <section className="flex">
            <DefaultNav/>
            <Outlet/>
            </section>
            <DefaultFooter/>
        </div>
    )
}


export const Layout2 = () => {
    return(
        <div className="flex flex-row min-h-screen">
            <DefaultNav/>
            <div className="w-full flex-col rounded-xl">
                <DefaultHeader/>
                <Outlet/>
            </div>
            <DefaultFooter/>
        </div>
    )
}


 


// <DefaultHeader/>
//   <section className="flex">
//    <DefaultNav/>
//    <Outlet/>
//   </section>
// <DefaultFooter/>