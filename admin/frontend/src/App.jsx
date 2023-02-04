import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import axios from 'axios';
import Home from './pages/home/Home';
function App() {

  const socket = useRef(null);

  useEffect(() => {
  socket.current = io("ws://localhost:4000");
  }, [])

  useEffect(() => {
    console.log('hi')
    socket.current?.on("sendPending", (data) => {
      console.log(data);
    });
  }, []);

  const sendReq = async () => {
    const res = await axios.get('http://localhost:4001/exe');
    console.log(res);
  }

  return (
    <>
        <Home />
    </>
  )
}

export default App
