import "../style/Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../Context/Socket";

function LoginComponent() {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      navigate("/chat", { state: {user: username, room: room}});
    }
  };

  return (
      <div className="App">
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      </div>
  );
}

export default LoginComponent;