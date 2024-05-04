import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export const PrivateRoutes = () => {
    // const { isUser } = useAuth();
    // console.log(isUser);
    const isUser=localStorage.getItem('isUserAuthenticated');
    
    return (
        // isUser ? <Outlet /> : <Navigate to='/login' />
       isUser?<Outlet/>:<Navigate to='/login' />
    );
};
