import "../style/Register.css";
import { useState, useContext } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import UserPool from "../../../UserPool";
import { useNavigate } from "react-router-dom";

function RegisterComponent(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [hasError, setHasError] = useState(false)
    const [isToggled, setIsToggled] = useState(false)
    const [isConfirmToggled, setIsConfirmToggle] = useState(false)
    const navigate = useNavigate();

    /**
     * Handle register event
     * @param {*} event 
     */
    function handleSubmit(event) {
        event.preventDefault();
        if (password !== confirmPassword)
            setHasError(true)
        var attributeList = [];
        var dataEmail = {
            Name: 'email',
            Value: email,
        };
        attributeList.push(dataEmail);
        //Sign up and create user on Cognito
        UserPool.signUp(username, password, attributeList, null, (err, data)=> {
            if (err) {
                setHasError(true)
                console.error(err);
            } else 
                navigate("/login")
        })
    };

    /**
     * Show/hide password
     */
    function togglePassword() {
        const pw = document.getElementById("password");
        const type = pw.getAttribute("type") === "password" ? "text" : "password";
        pw.setAttribute("type", type);
        setIsToggled(!isToggled);
    };

    /**
     * Show/hide confirm password
     */
    function toggleConfirmPassword() {
        const pw = document.getElementById("confirmpassword");
        const type = pw.getAttribute("type") === "password" ? "text" : "password";
        pw.setAttribute("type", type);
        setIsConfirmToggle(!isConfirmToggled);
    };

    /**
     * Handle value change on input
     * @param {*} e 
     * @param {*} setter 
     */
    function handleInputChange(e, setter) {
        setHasError(false)
        setter(e.target.value)
    }

    /**
     * Show message when error
     * @returns 
     */
    function ShowError() {
        return <span
            className='register-error-banner'>Password not long enough or different than confirm password</span>
    }

    return (
        <div className="App">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-card-body">
                        <div>
                            <button
                                className="register-back"
                                onClick={() => navigate("/login")}
                            >
                            Back to log in
                            </button>
                        </div>
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
                                        value={email}
                                        onChange={(e) => handleInputChange(e, setEmail)}
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
                                Sign up
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