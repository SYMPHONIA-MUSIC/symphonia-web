import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {CurrentMusicInfo} from "./MusicPlayerContext";

type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

export type UIProcess = {
    isLoading: boolean;
    showAlert: boolean;
    alertMessage: string | null;
    alertSeverity: AlertSeverity | undefined;
}

export interface UIProcessContextInterface {
    uiProcessContext: UIProcess;
    showMessage: (message: string, severity: AlertSeverity) => void;
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
};

export const UIProcessContext = createContext(defaultState);

type UIProcessProviderProps = {
    children: ReactNode;
}

export function UIProcessProvider({ children }: UIProcessProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<AlertSeverity | undefined>(undefined);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showMessage = (message: string, severity: AlertSeverity) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setAlertMessage(message);
        setAlertSeverity(severity);
        setShowAlert(true);

        timeoutRef.current = setTimeout(() => {
            hideMessage();
        }, 5000);
    };

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    const hideMessage = () => {
        setShowAlert(false);
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
    );
}