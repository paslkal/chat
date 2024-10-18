import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChatIcon from '@mui/icons-material/Chat';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import {useNavigate} from 'react-router-dom';

const drawerWidth = 240;

const chats = [
  { id: 1, name: 'Emilio' },
  { id: 2, name: 'Papa' },
  { id: 3, name: 'Mama' },
  { id: 4, name: 'Evelena' }
];

export default function ChatRoom() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {chats.map((chat, index) => (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton onClick={() => handleClick(chat.id)}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <ChatIcon /> : <MarkUnreadChatAltIcon />}
                  </ListItemIcon>
                  <ListItemText primary={chat.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>
          Сообщения
        </Typography>
      </Box>
    </Box>
  );
}
