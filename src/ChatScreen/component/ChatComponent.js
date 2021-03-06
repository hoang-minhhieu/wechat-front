import React, { useEffect, useState, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import NavbarContainer from "../../Navbar/container/NavbarContainer";
import "../style/Chat.css";
import { useLocation } from 'react-router-dom';
import { SocketContext } from "../../Context/Socket";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Picker from 'emoji-picker-react';
import NavbarConnectedUsersComponent from "../../Navbar/component/NavbarConnectedUsersComponent";

function ChatComponent() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showEmojiPicker, setIsToggled] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const location = useLocation();
  const socket = useContext(SocketContext);
  const username = location.state.username;
  const room = location.state.room
  const userColor = location.state.userColor;

  /**
   * Send message in chat
   */
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const DateTime = new Date();
      const messageData = {
        room: room,
        author: username,
        userColor: userColor,
        message: currentMessage,
        time:
          DateTime.getHours() +
          ":" +
          DateTime.getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    socket.on("receive_list_users", (data) => {
      setConnectedUsers(data);
    });
    socket.on("receive_total_users", (data) => {
      setTotalUsers(data);
    });
  }, [socket]);
  

  /**
   * Handle event when select an emoji
   * @param {*} event 
   * @param {*} emojiObject 
   */
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    setCurrentMessage(currentMessage + emojiObject.emoji);
  };

  /**
   * Toggle emoji board
   */
  function toggleEmojiPicker() {
    setIsToggled(!showEmojiPicker)
  }

  return (
    <section className="chat-screen">
      <NavbarContainer username={username}/>
      <div className="chat-window">
        <div className="chat-list-users">
          <p>Connected users: {totalUsers}</p>
          <NavbarConnectedUsersComponent connectedUsers={connectedUsers}/>
        </div>  
        <div className="chat-zone">        
          <div className="chat-body">
            <ScrollToBottom className="message-container">
            <p>Welcome to the chat room {room}!</p>
              {messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <span style={{color: messageContent.userColor}} id="author">{messageContent.author}</span> : <span id="content">{messageContent.message}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Send a message"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <div className="chat-selecticon">
              <div className="chat-emojiPicker" onClick={() => toggleEmojiPicker()}>
                <InsertEmoticonIcon></InsertEmoticonIcon>
              </div>
              {showEmojiPicker ? <Picker className="emojiPicker" onEmojiClick={onEmojiClick}/> : <></>}
            </div>
          </div>         
        </div> 
      </div>
      <div className="footer"></div>
    </section>    
  );
}

export default ChatComponent;