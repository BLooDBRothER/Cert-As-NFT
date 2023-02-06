import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Home from "./pages/home/Home";

function App() {
  // const socket = useRef(null);
  // const [rows, setRows] = useState();

  // useEffect(() => {
  //   console.log('eff', rows);
  // }, [rows])

  // useEffect(() => {
  //   console.log("hi");
  //   socket.current?.on("sendPending", (data) => {
  //     console.log(data);
  //     setRows([data]);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:4000");
  // }, []);
  return (
    <>
      <Home />
    </>
  );
}

export default App;
