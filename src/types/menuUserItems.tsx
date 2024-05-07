import {MenuItem} from "./menuItems";
import {
    Home as HomeIcon,
    Audiotrack as AudiotrackIcon,
    PeopleAlt as PeopleAltIcon,
    EmojiEvents as EmojiEventsIcon,
    Diversity1 as Diversity1Icon,
    Favorite as FavoriteIcon,
    LibraryMusic as LibraryMusicIcon
} from "@mui/icons-material";

export const mainMenuItems: MenuItem[] = [
    { name: 'Domovská stránka', icon: HomeIcon, path: '/user/panel' },
    { name: 'Pozndej hudbu', icon: AudiotrackIcon, path: '/artist/panel' },
    { name: 'HEAR WITH ME', icon: PeopleAltIcon, path: '/artist/panel' },
    { name: 'Top charty', icon: EmojiEventsIcon, path: '/artist/panel' },
    { name: 'Výběr kamarádů', icon: Diversity1Icon, path: '/artist/panel' }
]

export const mineMusic: MenuItem[] = [
    { name: 'Oblíbené písně', icon: FavoriteIcon, path: '/user/panel' },
    { name: 'Moje alba', icon: LibraryMusicIcon, path: '/artist/panel' },
]