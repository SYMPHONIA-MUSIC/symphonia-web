import React, {createContext, ReactNode, useContext, useState} from 'react';

interface IAppContext {
    loading: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning' | '';
    setLoading: (loading: boolean) => void;
    setMessage: (message: string, severity: 'success' | 'error' | 'info' | 'warning' | '') => void;
}

const AppContext = createContext<IAppContext>({
    loading: false,
    message: '',
    severity: '',
    setLoading: () => {},
    setMessage: () => {},
});

interface AppProviderProps {
    children: ReactNode;
}

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<'success' | 'error' | 'info' | 'warning' | ''>('');

    const showMessage = (message: string, severity: 'success' | 'error' | 'info' | 'warning' | '') => {
        setMessage(message);
        setSeverity(severity);
        // Если нужно, можно добавить логику для скрытия сообщения через некоторое время
    };

    return (
        <AppContext.Provider value={{ loading, message, severity, setLoading, setMessage: showMessage }}>
            {children}
        </AppContext.Provider>
    );
};