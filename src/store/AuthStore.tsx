import {create} from 'zustand'

interface AuthState{
    loginId: string| null;
    setLoginId: (id:string | null) => void;
    logout: ()=> void;
    initialize: ()=> void;
}

export const useAuthStore = create<AuthState>((set)=>({
    loginId: null,
    setLoginId: (id)=>{
        set({loginId:id});
        if(id){
            localStorage.setItem("loginId",id)
        }
    },
    logout: () => {
        set({loginId: null})
        localStorage.removeItem("loginId")
    },
    initialize: () => {
        const id = localStorage.getItem("loginId")
        set({loginId: id})
    }
}))