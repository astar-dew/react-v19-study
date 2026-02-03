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
        <div className=' min-h-screen w-full'>
            HOME

        </div>
    )
}


// 일단 여기서 테스트했을때 home 글자만 있을때 그 박스라인에 컴팩트하게 잡힘.

// const Home: FC<HomeProps> = ({title}) => {
//     return (<>
//         <div>
//            {title}
//         </div>
//         </>
//     )
// }

// export default Home
