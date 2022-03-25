import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/Navbar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavbarComponent(props) {
    return(
        <div id={"navbar-light"} className={"navbar navbar-expand-lg navbar-light"}>
            <div className="accountDiv">                     
                <button id="btn-profile" data-toggle="dropdown">
                    <AccountCircleIcon/>
                </button>
            </div>
        </div>       
    )
}

export default NavbarComponent;