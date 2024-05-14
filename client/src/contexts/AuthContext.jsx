import { createContext, useContext,useEffect,useState } from "react";


export const AuthContext=createContext(null);

export const CounterProvider=(props)=>{
    
    const [UserData,setUserData]=useState([]);
    const [userType,setUserType]=useState("");
    const [avatar,setAvatar]=useState(localStorage.getItem('avatar'));
    
    return(
        <AuthContext.Provider value={{UserData,setUserData,userType,setUserType,avatar,setAvatar}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export const  useAuth=()=>{
    const auth=useContext(AuthContext);
    return auth;
}