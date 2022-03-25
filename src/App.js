import "./App.css";
import ChatContainer from "./ChatScreen/container/ChatContainer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginContainer from "./Auth/Login/container/LoginContainer";
import {SocketContext, socket} from './Context/Socket';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginContainer/>} />
          <Route path="/chat" element={<ChatContainer/>} />
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </Router>
    </SocketContext.Provider>  
  );
}

export default App;