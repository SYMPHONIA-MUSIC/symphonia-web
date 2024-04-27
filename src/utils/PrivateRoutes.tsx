import React, {useEffect, useState} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {checkAuthentication} from "./AuthChecker";

const PrivateRoutes = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            const authenticated = await checkAuthentication();
            setIsAuth(authenticated);
        };

        authenticate();
    }, []);

    return (
        isAuth ? <Outlet /> : <Navigate to="/artist/login" />
    );
}

export default PrivateRoutes;
