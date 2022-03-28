import React from "react";
import PersonIcon from '@mui/icons-material/Person';

function NavbarConnectedUsersComponent(props){
    const usersList = props.connectedUsers;
    return (
        <div className="navbar-list">
            {usersList.map(({ username }) => {
                return (
                    <span className="navbar-list-users"><PersonIcon/>{username}</span>
                )
            })}
        </div>
    )
}

export default NavbarConnectedUsersComponent;