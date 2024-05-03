import { createContext, useContext,useState } from "react";

export const AuthContext=createContext(null);

export const CounterProvider=(props)=>{
    const [user,setUser]=useState({});
    return(
        <AuthContext.Provider value={{user,setUser}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export const  useAuth=()=>{
    const auth=useContext(AuthContext);
    return auth;
}