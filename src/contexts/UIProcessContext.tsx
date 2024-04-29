import React, {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch} from 'react';

type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

export type UIProcess = {
    isLoading: boolean;
    showAlert: boolean;
    alertMessage: string | null;
    alertSeverity: AlertSeverity | undefined;
}

export interface UIProcessContextInterface {
    uiProcessContext: UIProcess;
    showMessage: (message: string, severity: AlertSeverity ) => void;
    setLoading: (isLoading: boolean) => void;
    hideMessage: () => void;
}

const defaultUIProcessValue: UIProcess = {
    isLoading: false,
    showAlert: false,
    alertMessage: null,
    alertSeverity: undefined,
}

const defaultState: UIProcessContextInterface = {
    uiProcessContext: defaultUIProcessValue,
    showMessage: (message: string, severity: AlertSeverity) => {},
    setLoading: (isLoading: boolean) => {},
    hideMessage: () => {}
} as UIProcessContextInterface;

export const UIProcessContext = createContext(defaultState);

type UIProcessProviderProps = {
    children: ReactNode;
}

export function UIProcessProvider({ children }: UIProcessProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertSeverity | undefined>(undefined);

    const showMessage = (message: string, severity: AlertSeverity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setShowAlert(true);
    };

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    const hideMessage = () => {
        setShowAlert(false);
        setAlertMessage(null);
        setAlertSeverity(undefined);
    };

    const uiProcessContext: UIProcess = {
        isLoading,
        showAlert,
        alertMessage,
        alertSeverity,
    };

    return (
        <UIProcessContext.Provider value={{ uiProcessContext, showMessage, setLoading, hideMessage }}>
            {children}
        </UIProcessContext.Provider>
    )
}