import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/Navbar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const styles = {
    largeIcon: {
      width: 40,
      height: 40,
      color: "white"
    }
  };

function NavbarComponent(props) {
    return(
        <div className={"navbar"}>
            <div className="accountDiv">                     
                <button className="btn-profile" data-toggle="dropdown">
                    <AccountCircleIcon style={styles.largeIcon}/>
                </button>
            </div>
        </div>       
    )
}

export default NavbarComponent;