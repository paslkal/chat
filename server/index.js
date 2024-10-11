// const express = require('express')
// const http = require('http')
// const {Server} = require('socket.io')
// const cors = require('cors')
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { router } from './route.js'

const app = express()

app.use(cors({origin: "*"}))
app.use(router)

const server = http.createServer(app)

const port = process.env.PORT || 5000
const host = '0.0.0.0'

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
})/*.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    process.exit(1);
  }
});*/
