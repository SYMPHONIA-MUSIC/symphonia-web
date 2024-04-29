import React, {useContext} from 'react';
import { Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import {UIProcessContext} from "../../contexts/UIProcessContext";

const GlobalLoadingAndAlerts: React.FC = () => {
    const { uiProcessContext, hideMessage } = useContext(UIProcessContext)

    return (
        <>
            <Backdrop open={uiProcessContext.isLoading} style={{ zIndex: 1200 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={uiProcessContext.showAlert} autoHideDuration={6000}>
                <Alert elevation={6} variant="filled" severity={uiProcessContext.alertSeverity} onClose={() => hideMessage()}>
                    {uiProcessContext.alertMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default GlobalLoadingAndAlerts;
