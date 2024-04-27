import React from 'react';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useAppContext } from './AppContext';

const GlobalLoadingAndAlerts: React.FC = () => {
    const { loading, message, severity, setMessage } = useAppContext();

    return (
        <>
            <Backdrop open={loading} style={{ zIndex: 1200 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={!!message} autoHideDuration={6000} onClose={() => setMessage('', '')}>
                <Alert elevation={6} variant="filled" severity={severity} onClose={() => setMessage('', '')}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default GlobalLoadingAndAlerts;
