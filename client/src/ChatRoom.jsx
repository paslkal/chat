import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack';
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
import { useEffect, useState } from 'react';
const host = 'localhost'
const port = 5000

const drawerWidth = 240;

export default function ChatRoom() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const getChatId = () => {
    return location.pathname.split('/').filter(Boolean).at(-1)
  }

  const createMessages = async (id) => {
    const response = await fetch(`http://${host}:${port}/chat/${id}`, {
      method: 'POST',
      body: JSON.stringify({message}),
      headers: {"Content-type":"application/json"},
      credentials: 'include'
    })

    if (!response.ok) throw Error('Network response was not ok')

    const {messages} = await response.json()

    return messages
  }

  const fetchMessages = async (id) => {
    const response = await fetch(`http://${host}:${port}/chat/${id}`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) throw Error('Network response was not ok')

    const {messages} = await response.json()

    return messages
  }

  const fetchChats = async () => {
    const response = await fetch(`http://${host}:${port}/chat`, {
      method: 'GET',
      credentials: 'include'
    })

    if (!response.ok) throw Error('Network response was not ok')

    const chats = await response.json()

    return chats
  }

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSend = async () => {
    setMessage('')
    
    try {
      const id = getChatId()

      const fetchedMessages = await createMessages(id)

      setMessages(fetchedMessages)
    } catch (error) {
      console.log(error)
    }
    
    intialMessages.push(message)
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = getChatId()
        const fetchedChats = await fetchChats()
        const fetchedMessages = await fetchMessages(id)
        setChats(fetchedChats)        
        setMessages(fetchedMessages)
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
            Chat app
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
            {
              chats.map((chat, index) => (
                <ListItem key={chat.id} disablePadding>
                  <ListItemButton onClick={() => handleClick(chat.id)}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <ChatIcon /> : <MarkUnreadChatAltIcon />}
                    </ListItemIcon>
                    <ListItemText primary={chat.name} />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction='column' spacing={2}>
          {
            messages.map(message => 
              <Typography>{message}</Typography>
            )
          }
          <Stack direction='row' spacing={2}>
            <Input 
              placeholder='Some message'
              value={message}
              onChange={handleMessage}
              onKeyDown={handleEnter}
            />
            <Button
              variant='contained' 
              endIcon={<SendIcon/>}
              onClick={handleSend}
            >
              Send
            </Button>
          </Stack>
        </Stack>
        
      </Box>
    </Box>
  );
}
