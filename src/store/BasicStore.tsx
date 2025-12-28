import {create} from 'zustand';
// import { persist } from 'zustand/middleware';

//type 하고 interface 의 차이는 뭘까??
// interface / 객체나 클래스 구조 정의, 라이브러리 API 정의 ( 확장 가능성 ), React 컴포넌트props
// Type / Union, Turple 같은 복잡한 타입, Utility Types 활용, 함수타입 정의   
// 회사 convention 에 따라 사용.


type stateProps = {
    count:number
}

interface User{
    id: string,
    Auth: string,
}

interface AuthState {
    user : User | null,
}

// 상태관리 
// 어떤 데이터를 관리하는게 좋은지 
// 어느 페이지든 사용해야하는 데이터

// create 만드는거. 
// user 정보를 저장하는게 적합한지 궁금. jwt 가 session 적합할거같음. 
// 새로 고침하면 유지가 되나? 기본 state는 안되는데. -> 새로고침 시 기본값으로 초기화 . 

const userAuthStore = create((set)=>({


    // count: 0,
    // increment: () => set((state: stateProps) => ({count: state.count+1})),
    // decrement: () => set((state: stateProps) => ({count: state.count-1}))

}));




export default userAuthStore;