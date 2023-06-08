import { createContext, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [error,setError] = useState(null)

    //Register
    const register = async (user)=>{
        console.log(user);
    }

    //Login
    //in strapi 
    const login = async ({email:identifier,password})=>{
        console.log({identifier,password});
    }

    //Logout
    const logout = async ()=>{
        console.log('logout');
    }

    //check if user is logged in
    const checkUserLoggedIn = async (user)=>{
        console.log('check');
    }

    return (
        <AuthContext.Provider value={{user,error,register,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;