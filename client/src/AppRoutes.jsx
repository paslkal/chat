import {Routes, Route} from 'react-router-dom'
import Log from './Log.jsx'
import Chat from './Chat.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Log/>}/>
      <Route path='/chat' element={<Chat/>}/>
    </Routes>
  )
}

export default AppRoutes
