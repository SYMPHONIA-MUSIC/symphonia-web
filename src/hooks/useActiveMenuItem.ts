import { useLocation } from 'react-router-dom';

export const useActiveMenuItem = (): string => {
    const location = useLocation();
    return location.pathname;
};
