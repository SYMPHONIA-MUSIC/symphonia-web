'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import type { NavItemConfig } from '../../types/nav';
// import { paths } from '../../paths';
// import { isNavItemActive } from '../../lib/is-nav-item-active';
// import { useLocation } from 'react-router-dom';

import { navItems } from './config';
import { navIcons } from './nav-icons';
import {useTheme} from "@mui/material/styles";

export function SideNav(): React.JSX.Element {
    const theme = useTheme();

    return (
        <Box
            sx={{
                '--SideNav-background': theme.palette.background.alternate,
                '--SideNav-color': 'var(--mui-palette-common-white)',
                '--NavItem-color': 'var(--mui-palette-neutral-300)',
                '--NavItem-hover-background': theme.palette.background.default,
                '--NavItem-active-background': theme.palette.background.default,
                '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
                '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
                '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
                '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
                '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
                bgcolor: theme.palette.background.alternate,
                color: theme.palette.text.primary,
                display: { xs: 'none', lg: 'flex' },
                flexDirection: 'column',
                height: '100%',
                left: 0,
                maxWidth: '100%',
                position: 'fixed',
                scrollbarWidth: 'none',
                top: 0,
                width: 'var(--SideNav-width)',
                zIndex: 'var(--SideNav-zIndex)',
                '&::-webkit-scrollbar': { display: 'none' },
            }}
        >
            <Stack  sx={{ p: 3 }}>
                <Box sx={{ display: 'inline-flex' }}>
                    <img src="/logo/artist-logo.svg" alt="Logo" height="64" width="288"/>
                </Box>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'var(--mui-palette-neutral-950)',
                        border: '1px solid var(--mui-palette-neutral-700)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        p: '4px 12px',
                    }}
                >
                </Box>
            </Stack>
            <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
                {renderNavItems({ items: navItems })}
            </Box>
        </Box>
    );
}

function renderNavItems({ items = [] }: { items?: NavItemConfig[]; }): React.JSX.Element {
    const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
        const { key, ...item } = curr;

        acc.push(<NavItem key={key} {...item} />);

        return acc;
    }, []);

    return (
        <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {children}
        </Stack>
    );
}


function NavItem({ disabled, external, href, icon, title }: NavItemConfig): React.JSX.Element {
    const Icon = icon ? navIcons[icon] : null;

    return (
        <li>
            <Box
                {...(href ? {
                    component: external ? 'a' : 'div', // Если нужна навигация внутри приложения, используйте 'RouterLink' вместо 'div'
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noreferrer' : undefined,
                } : { role: 'button' })}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    color: 'var(--NavItem-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flex: '0 0 auto',
                    gap: 1,
                    p: '6px 16px',
                    position: 'relative',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    ...(disabled && {
                        bgcolor: 'var(--NavItem-disabled-background)',
                        color: 'var(--NavItem-disabled-color)',
                        cursor: 'not-allowed',
                    }),
                }}
            >
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
                    {Icon && (
                        <Icon
                            fontSize="var(--icon-fontSize-md)"
                        />
                    )}
                </Box>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography
                        component="span"
                        sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </li>
    );
}
