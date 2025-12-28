import type {FC} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

type HomeProps= {
    title?: string
}



export default function Home(){
    // const nav = useNavigate();
    // console.log(localStorage.getItem('loginId'));
    // if(localStorage.getItem('loginId')){
    //     console.log('localstorage 에 ID 있음')
    //     nav('/quiz-list')
    // }

    return (
        <div>
        HOME
        </div>
    )
}




// const Home: FC<HomeProps> = ({title}) => {
//     return (<>
//         <div>
//            {title}
//         </div>
//         </>
//     )
// }

// export default Home
