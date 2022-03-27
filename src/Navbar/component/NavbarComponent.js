import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import userIcon from "../../../src/assets/images/user_icon.png";
import Pool from "../../UserPool";
import { SocketContext } from "../../Context/Socket";

const styles = {
    normalIcon:{
        width: 40,
        height: 40
    },
    largeIcon: {
      width: 60,
      height: 60
    }
  };

function NavbarComponent(props) {
    const navigate = useNavigate(); 
    const [dropdown, setDropdown] = useState(false); 
    const socket = useContext(SocketContext);
    
    function handleLogoutClick(){       
        const user = Pool.getCurrentUser();
        if (user) {
            user.signOut();
            socket.emit("disconnect");
            navigate("/login")
        }
    }

    return(
        <div className={"navbar"}>
            <div className="accountDiv">                  
                <button className="btn-profile" onClick={() => setDropdown(!dropdown)}>
                    <img src={userIcon} alt="navbar-icon" className="navbar-userIcon" style={styles.normalIcon}/>
                </button>
                {dropdown && (
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-item"
                            onClick={() => navigate("/login")}>My profile</div>
                        <div className="dropdown-item"
                            href="/#"
                            onClick={() => handleLogoutClick()}>Log out</div>
                    </div>
                )}
            </div>
        </div>       
    )
}

export default NavbarComponent;