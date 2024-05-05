import { createContext, useContext,useEffect,useState } from "react";


export const AuthContext=createContext(null);

export const CounterProvider=(props)=>{
    
    const [UserData,setUserData]=useState([]);
   
    return(
        <AuthContext.Provider value={{UserData,setUserData}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export const  useAuth=()=>{
    const auth=useContext(AuthContext);
    return auth;
}