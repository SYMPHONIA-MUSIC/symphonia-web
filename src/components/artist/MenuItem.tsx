import React from 'react';
import {ListItem, ListItemIcon, ListItemText, Theme} from '@mui/material';
import {MenuItem} from "../../types/menuItems";
import {useNavigate} from "react-router-dom";

interface MenuItemProps extends MenuItem {
    active: boolean;
    theme: Theme;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ name, icon: Icon, path, active, theme }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(path);
    };

    return (
        <ListItem button selected={active} onClick={handleClick}
          sx={{
              '&.Mui-selected': {
                  borderRight: active ? ` 4px solid ${theme.palette.primary.main}` : 'none',
              },
          }}
        >
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItem>
    );
};

export default MenuItemComponent;