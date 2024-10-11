import { useEffect, useState } from "react"
import io from 'socket.io-client'
import {useLocation} from 'react-router-dom'

const socket = io.connect('http://localhost:5000')

function Chat() {
  const {search} = useLocation()
  const [params, setParams] = useState(null)

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))
    setParams(searchParams)
    socket.emit('join', searchParams)

    socket.on('message', ({data}) => {
      console.log(data)
    })
  }, [search])

  return(
    <>
    Chat
    </>
  )
}

export default Chat