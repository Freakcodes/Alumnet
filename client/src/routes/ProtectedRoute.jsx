import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export const PrivateRoutes = () => {
    // const { isUser } = useAuth();
    // console.log(isUser);
    const isUser=Cookies.get('accessToken');
    
    if(isUser!=null){
        return(
            <Outlet/>
        )
    }else{

        return(
            <Navigate to='/auth/login'/>
        )
       
    }
    
    // return (
    //     // isUser ? <Outlet /> : <Navigate to='/login' />
    //    isUser?<Outlet/>:<Navigate to='/login' />
    // );
};
