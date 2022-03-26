import React, { useEffect, useState, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import userIcon from "../../../src/assets/images/user_icon.png";

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
    
    return(
        <div className={"navbar"}>
            <div className="accountDiv">                  
                <button className="btn-profile" onClick={() => setDropdown(!dropdown)}>
                    <img src={userIcon} alt='image' className="navbar-userIcon" style={styles.normalIcon}/>
                </button>
                {dropdown && (
                    <div className="dropdown">
                        <ul>
                        <li><img src={userIcon} className="navbar-userIcon" style={styles.largeIcon}/>{props.username}</li>
                        <li>My profile</li>
                        <li>Log out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>       
    )
}

export default NavbarComponent;