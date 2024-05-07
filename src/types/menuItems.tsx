import { Home as HomeIcon, MusicNote as MusicNoteIcon, Announcement as AnnouncementIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

export interface MenuItem {
    name: string;
    icon: React.ElementType;
    path: string;
}

export const menuItems: MenuItem[] = [
    { name: 'Hlavní stránka', icon: HomeIcon, path: '/artist/panel' },
    { name: 'Hudba', icon: MusicNoteIcon, path: '/artist/panel/music' },
    { name: 'Zprávy', icon: AnnouncementIcon, path: '/artist/panel/news' },
    { name: 'Změna informací o účtu', icon: AccountCircleIcon, path: '/artist/panel/account' },
];