import {Routes, Route} from 'react-router-dom'
import LogIn from './LogIn.jsx'
import Chat from './Chat.jsx'
import SignUp from './SignUp.jsx'
import ChatRoom from './ChatRoom.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/chat/:id' element={<ChatRoom />} />
      <Route path='*' element={<Chat/>}></Route> 
    </Routes>
  )
}

export default AppRoutes
