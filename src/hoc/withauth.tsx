/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/auth';


const WithAuth = () => {

    const authContext = useAuthContext();
    const { isSigned } = authContext;
    const stIsSigned = localStorage.getItem("isSigned");

    // useEffect(() => {
    //   if(stIsSigned === "false" || !isSigned){
    //     authContext.setData({...authContext})
    //   }
    // }, [])
    

    return (
        stIsSigned === "true" || isSigned ? <Outlet/> : <Navigate to='/auth/login'/>
    );
};

export default WithAuth;
