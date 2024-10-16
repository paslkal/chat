import { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useLocation} from 'react-router-dom'

const socket = io.connect('http://localhost:5000')

function Chat() {
  return(
    <h1>
    Chat
    </h1>
  )
}

export default Chat