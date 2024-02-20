import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import ContentDropdown from "../UI/ContentDropdown";
import UserLogStatus from "../UI/UserLogStatus";
import StudySession from "../UI/StudySession";



const testData = 
[
    {
      title: "Basic Fundamentals",
      subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
    },
    {
      title: "Educational Achievements",
      subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
    },
    {
      title: "Technical Proficiency",
      subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
    },
    {
      title: "Aspirations and Problem-Solving Approach",
      subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
    }
];



function Dashboard() 
{
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userSelection, setUserSelection] = useState(false);
  const navigate = useNavigate("/Login");
  
  //Retreives User Data from Backend
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

  //Use Efffect for loading info from backend
  useEffect(() => 
  {
    if (loading) return;
    //If user login data does not exist, Navigate user back to login page
    if (!user) return navigate();
    fetchUserName();
  }, [user, loading]);


  return (
    <>
      <>
        {userSelection === false ? <ContentDropdown displayContent={testData} onUserSelection={(moduleIndex, lessonIndex)=>{setUserSelection([moduleIndex, lessonIndex])}}/> : <div><StudySession/>{userSelection}</div>}
      </>
      <UserLogStatus name={name} user={user} logout={logout}/>
    </>
  );
}
export default Dashboard;