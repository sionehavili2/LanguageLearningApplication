import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import Login from "./Login";


const Home = () => 
{
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate("/Login");

  //Fetch username to display
  const fetchUserName = async () => 
  {
    try 
    {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } 
    catch (err) 
    {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => 
  {
    if (loading) return;
    //If user login data does not exist, Navigate user back to login page
    if (!user) return navigate();
    //Else fetch useraname
    fetchUserName();

  }, [user, loading]);

  if(!user)
  {
    return (
      <>
        <Login/>
      </>
    );
  }
  else if(user) 
  {

    return (
    <>
      <h2>You are on the Home Page Welcome, <>{user?.email}</></h2>
      <div>Head to the <Link to="/Dashboard"> Dashboard </Link>to begin learning!</div>
      {/* <StringDisplayCard string={Module0[0].intro}/> */}
      <div>----</div>
      {/* <Flashcards exampleArray={Module0[0].examples}/> */}
      <div className="dashboard">
        <div className="dashboard__container">
          <button className="dashboard__btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </>
    );
  }
  else return <div>Error... Please check Home.jsx code</div>

};

export default Home;