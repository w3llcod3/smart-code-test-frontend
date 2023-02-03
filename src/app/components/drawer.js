import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

export default function TemporaryDrawer() {
    const tabs = [
        { text: 'Members', href: '/members' },
        { text: 'Absences', href: '/absences' },
    ]
    const router = useRouter()

    return (
        <Drawer
            anchor='left'
            open={true}
            variant='permanent'
            sx={{
                width: '200px',
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 200,
                    boxSizing: "border-box"
                },
                
            }}
            
        >
            <Box sx={{ backgroundColor: '#111827', width: '100%', height: '100%' }}>
            <List >
                {tabs.map(item => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton href={item.href} 
                         sx={{
                            backgroundColor: router.route === item.href && '#d2d2d2',
                            // borderRadius: 1,
                            color: router.route === item.href ? 'green' : 'gray',
                            fontWeight: router.route === item.href ? 'bold' : 'light',
                            justifyContent: 'flex-center',
                            px: 3,
                            textAlign: 'center',
                            textTransform: 'none',
                            width: '100%',
                            '&:hover': {
                              backgroundColor: '#d2d2d2'
                            }
                          }}
                          >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            </Box>
        </Drawer>
    );
}