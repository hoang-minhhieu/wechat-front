import "../style/Login.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../Context/Socket";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../../UserPool";

function LoginComponent() {
  const socket = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [guest, setGuestMode] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isToggled, setIsToggle] = useState(false)
  const pw = document.getElementById("password");

  /**
   * Generate random color to assign to each user
   * @returns 
   */
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

  /**
   * User connect to a room
   * Navigate to Chat screen with user infos
   */
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room, username);
      navigate("/chat", { state: { username: username, userColor: getRandomColor(), room: room}});
    }
  };

  /**
   * Handle login event
   */
  function handleSubmit(event) {
    event.preventDefault();
    //Join room directly if connect as guest
    if (guest)
      joinRoom()
    else {
      //Verify account on Cognito
      const user = new CognitoUser({
        Username: username,
        Pool: UserPool,
      })

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      })

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          socket.emit("join_room", room, username);
          navigate("/chat", { state: { username: username, userColor: getRandomColor(), room: room}});       
        },
        onFailure: (err) => {
          setHasError(true)
          console.log("onFailure: ", err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
        }
      })
    }
  };


  /**
   * Show/hide password
   */
  function togglePassword() {
    const type = pw.getAttribute("type") === "password" ? "text" : "password";
    pw.setAttribute("type", type);
    setIsToggle(!isToggled);
  };

  /**
   * Handle when value input change
   * @param {*} e 
   * @param {*} setter 
   */
  function handleInputChange(e, setter) {
    setHasError(false)
    setter(e.target.value)
  }

  /**
   * When error show message
   * @returns 
   */
  function ShowError() {
      return <span
          className='login-error-banner'>Username or password incorrect</span>
  }

  return (
    <div className="App">
      <div className="login-container">
          <div className="login-card">
              <div className="login-card-body">
                  <h3>Connect to Wechat</h3>
                  {hasError && <ShowError />}
                  <form onSubmit={handleSubmit}>
                    {guest ? <>
                      <label first="ok">Nickname</label>
                      <div className="login-block">
                          <div className="control login-input-center">
                              <input
                                  className="input"
                                  required={true}
                                  type="text"
                                  id="username"
                                  aria-describedby="emailHelp"
                                  value={username}
                                  onChange={(e) => handleInputChange(e, setUsername)}
                              />
                          </div>
                      </div>                     
                    </> : <>
                    <label first="ok">Username</label>
                      <div className="login-block">
                          <div className="control login-input-center">
                              <input
                                  className="input"
                                  required={true}
                                  type="text"
                                  id="username"
                                  value={username}
                                  onChange={(e) => handleInputChange(e, setUsername)}
                              />
                          </div>
                      </div>
                      <label>Password</label>
                      <div className="login-block">
                          <div className="control login-input-center">
                              <input
                                  required={true}
                                  className="input"
                                  type="password"
                                  id="password"
                                  value={password}
                                  onChange={(e) => handleInputChange(e, setPassword)}
                              />
                              {password.length > 0 && <span toggle="#password" className="togglePassword"
                                  onClick={() => togglePassword()}> {isToggled ?
                                      <VisibilityIcon/> : <VisibilityOffIcon/>}
                              </span>}
                          </div>
                      </div>                            
                    </>}             
                      <label>Room</label>
                      <div className="login-block">
                          <div className="control login-input-center">
                              <input
                                  required={true}
                                  className="input"
                                  type="text"
                                  id="room"
                                  value={room}
                                  onChange={(e) => handleInputChange(e, setRoom)}
                              />
                          </div>
                      </div>
                      <div className="login-bottom-container">
                          <div className="forgotPassword">
                              <a href="/forgotpassword">Forgot password?</a>
                          </div>
                          <div>
                              <button
                                  className="f-right"
                              >
                                  <span>Join the chat</span>
                              </button>
                          </div>
                      </div>
                      <div className="newUser">
                          <label>New user? <div onClick={() => navigate("/register")}>Sign up!</div></label>
                      </div>
                      {guest ? <>
                        <div className="guest">
                          <label>or log in with your <div onClick={() => setGuestMode(false)}>account</div></label>
                        </div>
                        </> : <>
                        <div className="guest">
                            <label>or log in as <div onClick={() => setGuestMode(true)}>guest</div></label>
                        </div>
                      </>}                 
                      
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
}

export default LoginComponent;