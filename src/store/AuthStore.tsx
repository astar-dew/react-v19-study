import {create} from 'zustand'

interface AuthState{
    loginId: string| null;
    setLoginId: (id:string | null) => void;
    logout: ()=> void;
    initialize: ()=> void;
}

export const useAuthStroe = create<AuthState>()