import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {auth, registerWithEmailAndPassword,signInWithGoogle,logout} from "../firebase";
import "./Register.css";
import Login from "../pages/Login";
import UserLogStatus from "../UI/UserLogStatus/UserLogStatus";


function Register() 
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  //Changed useHistory to useNavigate
  const history = useNavigate("/dashboard");

  const register = () => 
  {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => 
  {
    if (loading) return;
    
    if (user) history();
  }, [user, loading]);

  
  if(user)
  {
    return (
      <>
        <h2>You are currently logged in as, <>{user?.email}</></h2>
        <h4>You must logout to sign-up a new user.</h4>
        <UserLogStatus name={name} user={user} logout={logout}/>
      </>
    );
  }
  else if(!user) 
  {

    return (
      <>
        <div className="register">
          <h2>Looking to learn the Tongan language? Sign-up to begin!</h2>
          <div className="register__container">
            <input
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button className="register__btn" onClick={register}>
              Sign-up
            </button>
            {/* <button
              className="register__btn register__google"
              onClick={signInWithGoogle}
            >
              Sign-up with Google
            </button> */}
            <div>
              Already have an account? <Link to="/">Login</Link> now.
            </div>
          </div>
        </div>  
      </>
    );
  }
  else return <div>Error... Please check Home.jsx code</div>

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Register;