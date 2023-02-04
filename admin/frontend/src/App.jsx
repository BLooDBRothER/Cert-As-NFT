import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

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


  return (
    <div className="App">
      <button>Test</button>
    </div>
  )
}

export default App
