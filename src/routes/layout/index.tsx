import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import DefaultNav from "./DefaultNav";
import DefaultFooter from "./DefaultFooter";




// export default function Layout(){
//     return (
//     <div className="flex flex-row">
//         <DefaultNav/>
//         <section className="flex-col">
//             <DefaultHeader/>
//             <Outlet/>
//         </section>
//         <DefaultFooter/>
//     </div>)
// }

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
        <div className="flex flex-row">
            <DefaultNav/>
            <section className="flex-col">
                <DefaultHeader/>
                <Outlet/>
            </section>
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