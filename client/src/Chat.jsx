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
import { useState, useEffect } from 'react';

const host = 'localhost'
const port = 5000

const drawerWidth = 240;

export default function Chat() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const [chats, setChats] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${host}:${port}/chat`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) throw Error('Network response was not ok')
  
        const chats = await response.json()
  
        setChats(chats)

        console.log(chats)
        
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchData()
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Chat App
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
          Выберите чат слева, чтобы увидеть сообщения.
        </Typography>
      </Box>
    </Box>
  );
}
