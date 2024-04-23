import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { query, collection, getDocs, where, updateDoc } from "firebase/firestore";
import Login from "./Login";
import UserLogStatus from "../UI/UserLogStatus/UserLogStatus";
import PracticeBank from "../UI/PracticeBank/PracticeBank";

const Home = () => 
{
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate("/Login");
  const [practiceBankData, setPracticeBankData] = useState(null);
  const [isPractice, setIsPractice] = useState(false);
  const [userDocRef, setUserDocRef] = useState();

  //Fetch username to display
  const fetchUserName = async () => 
  {
    try 
    {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const userData = doc.docs[0].data();
      setName(userData.name);
      setUserDocRef(doc.docs[0].ref);

      if(userData && userData.personalPracticeBank)
      {
        setPracticeBankData(userData.personalPracticeBank);
      }
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

  
  if(practiceBankData !== null && isPractice === true)
  {
     return(
      <PracticeBank 
        practiceBankData={practiceBankData}
        onUpdatePracticeBank={async (newPracticeBank)=>
        {
          const newKeyValObject = 
          {
            values: newPracticeBank[0],
            keys: newPracticeBank[1],
          };

          await updateDoc(userDocRef, { personalPracticeBank : newKeyValObject})
          .then(() => {console.log("Practice Bank updated successfully"); setPracticeBankData(newKeyValObject);})
          .catch((error) => {console.error("Error updating practice bank:", error);});
        }}
      />)
  }
  else if(!user)
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
      <button onClick={()=>{setIsPractice(true)}}>Access Practice Bank</button>
      {/* <StringDisplayCard string={Module0[0].intro}/> */}
      <div>----</div>
      {/* <Flashcards exampleArray={Module0[0].examples}/> */}
      <UserLogStatus name={name} user={user} logout={logout}/>      
    </>
    );
  }
  else return <div>Error... Please check Home.jsx code</div>

};

export default Home;