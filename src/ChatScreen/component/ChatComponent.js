import React, { useEffect, useState, useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import NavbarContainer from "../../Navbar/container/NavbarContainer";
import "../style/Chat.css";
import { useLocation } from 'react-router-dom';
import { SocketContext } from "../../Context/Socket";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Picker from 'emoji-picker-react';

function ChatComponent() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showEmojiPicker, setIsToggled] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const location = useLocation();
  const socket = useContext(SocketContext);
  const username = location.state.username;
  const room = location.state.room
  const userColor = location.state.userColor;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        userColor: userColor,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
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
  }, [socket]);
  
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setCurrentMessage(currentMessage + emojiObject.emoji);
  };

  function toggleEmojiPicker() {
    setIsToggled(!showEmojiPicker)
  }

  return (
    <div className="chat-screen">
      <NavbarContainer username={username}/>
      <div className="chat-zone">        
        <div className="chat-body">
          <ScrollToBottom className="message-container">
          <p>Welcome to the chat room!</p>
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
  );
}

export default ChatComponent;