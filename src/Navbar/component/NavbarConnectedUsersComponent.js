import React from "react";
import { useLocation } from "react-router-dom";

function NavbarConnectedUsersComponent(props){
    const location = useLocation();
    let usersList = new Map();
    usersList = props.connectedUsers;
    return (
        <ul>
            {usersList.forEach( (value, key, map) => {
                return (
                    <li
                        key={key}>
                        <span>
                            <span className="filter-home-category-vendor-label">{value}</span>
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}

export default NavbarConnectedUsersComponent;