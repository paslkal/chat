import {Routes, Route} from 'react-router-dom'
import LogIn from './LogIn.jsx'
import Chat from './Chat.jsx'
import SignUp from './SignUp.jsx'
function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  )
}

export default AppRoutes
