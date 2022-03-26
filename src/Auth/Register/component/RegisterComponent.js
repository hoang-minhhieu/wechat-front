import "../style/Register.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../Context/Socket";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RegisterComponent(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [hasError, setHasError] = useState(false)
    const [isToggled, setIsToggled] = useState(false)
    const [isConfirmToggled, setIsConfirmToggle] = useState(false)

    //Handler du login selon le type (client ou vendeur) et redirige vers la homepage
    function handleSubmit(event) {
        event.preventDefault();
        console.log("TOTO: ", password)
    };

    //Toggler de la visiblité des champs de mdp
    function togglePassword() {
        const pw = document.getElementById("password");
        const type = pw.getAttribute("type") === "password" ? "text" : "password";
        pw.setAttribute("type", type);
        setIsToggled(!isToggled);
    };

    //Toggler de la visiblité des champs de mdp
    function toggleConfirmPassword() {
        const pw = document.getElementById("confirmpassword");
        const type = pw.getAttribute("type") === "password" ? "text" : "password";
        pw.setAttribute("type", type);
        setIsConfirmToggle(!isConfirmToggled);
    };

    //Handler des champs d'input
    function handleInputChange(e, setter) {
        setHasError(false)
        setter(e.target.value)
    }

    function ShowError() {
        return <span
            className='login-error-banner badge badge-danger d-block p-2'>Identifiant ou mot de passe incorrect</span>
    }

    return (
        <div className="App">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-card-body">
                        <h3>Create a new account</h3>
                        {hasError && <ShowError />}
                        <form onSubmit={handleSubmit}>
                            <label first="ok">Nickname</label>
                            <div className="register-block">
                                <div className="control register-input-center">
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
                            <label first="ok">Email</label>
                            <div className="register-block">
                                <div className="control register-input-center">
                                    <input
                                        className="input"
                                        required={true}
                                        type="email"
                                        id="username"
                                        aria-describedby="emailHelp"
                                        value={username}
                                        onChange={(e) => handleInputChange(e, setUsername)}
                                    />
                                </div>
                            </div>
                            <div className="register-card-row">                              
                                <div className="register-block-password">
                                <label>Password</label>
                                    <div className="control register-input-center">
                                        <input
                                            required={true}
                                            className="input"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => handleInputChange(e, setPassword)}
                                        />
                                        {password.length > 0 ? <span toggle="#password" className="togglePassword"
                                            onClick={() => togglePassword()}> {isToggled ?
                                                <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </span> : <span className="blank"></span>} 
                                    </div>
                                </div>
                                <div className="register-block-password">
                                <label>Confirm Password</label>                              
                                    <div className="control register-input-center">
                                        <input
                                            required={true}
                                            className="input"
                                            type="password"
                                            id="confirmpassword"
                                            value={confirmPassword}
                                            onChange={(e) => handleInputChange(e, setConfirmPassword)}
                                        />
                                        {confirmPassword.length > 0 ? <span toggle="#confirmpassword" className="togglePassword"
                                            onClick={() => toggleConfirmPassword()}> {isConfirmToggled ?
                                                <VisibilityIcon/> : <VisibilityOffIcon/>}
                                        </span> : <span className="blank"></span>} 
                                    </div>
                                </div>
                            </div>
                            <div className="register-bottom-container">
                            <div>
                                <button
                                    className="f-right"
                                >
                                <span>Sign up</span>
                                </button>
                            </div>
                        </div>                                                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;