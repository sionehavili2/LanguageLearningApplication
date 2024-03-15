import React, { useEffect, useState, useTransition } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, setDoc, where, addDoc, doc as docRef, updateDoc} from "firebase/firestore";
import UserLogStatus from "../UI/UserLogStatus/UserLogStatus";
import StudySession from "../UI/StudySession/StudySession";
import ContentDropdown from "../UI/ContentDropDown/ContentDropdown";


//Importing Data Modules
import Module0 from "../ModuleData/Module0";
import Module1 from "../ModuleData/Module1";

const allModules = [Module0,Module1];
const moduleTitles = allModules.map((module)=>(module.moduleTitle));
const lessonTitles = allModules.map((module)=>(module.lessonTitles));

const progressStruct = 
[
  {
    moduleLessons : 
    [
      {exercisesFinished : [true,true,true,true,true,true,true]},
      {exercisesFinished : [true,true,true,true,true,true,false]},
      {exercisesFinished : [true,true,true,true,true,false,false]},
      {exercisesFinished : [true,true,true,true,false,false,false]},
      {exercisesFinished : [true,true,true,false,false,false,false]},
      {exercisesFinished : [true,true,false,false,false,false,false]},
    ]
  },

  {
    moduleLessons : 
    [
      {exercisesFinished : [true,true,false,false,false,false,false]},
      {exercisesFinished : [true,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
    ]
  },
  
];

function Dashboard() 
{
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userSelection, setUserSelection] = useState(false);
  const navigate = useNavigate("/Login");
  const navigateStartSession = useNavigate("/Dashboard/StudySession");
  const [userProgressData, setUserProgressData] = useState();

  // //Retreives User Data from Backend
  const fetchUserName = async () => 
  {
    try 
    {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const userData = doc.docs[0].data();
      setName(userData.name);

      if(userData && userData.userProgression) 
      {
        let tempArr = [];
        userData.userProgression.forEach(element => {tempArr.push(element)});
        setUserProgressData([...tempArr]);
      }
      else 
      {
        if (doc.empty) 
        {
          // If the query doesn't return any documents, it means the user document doesn't exist yet
          // Create a new user document with the provided data
          await setDoc(docRef(db, "users", user?.uid), { userProgression: progressStruct });
          console.log("New user document created with user progression data");
        } 
        else 
        {
          // If the query returns a document, update the existing user document with the provided data
          const userDocRef = doc.docs[0].ref;
          await updateDoc(userDocRef, { userProgression: progressStruct });
          console.log("User progression data updated successfully");
        }
        setUserProgressData(progressStruct);
      }
    } 
    catch (err) 
    {
      console.error(err);
      alert("An error occured while fetching user data [Dashboard.jsx]");
    }
  };

  //Use Efffect for loading info from backend
  useEffect(() => 
  {
    if (loading) return;
    //If user login data does not exist, Navigate user back to login page
    if (!user) return navigate();
    if (user && userSelection) return navigateStartSession();
    fetchUserName();
  }, [user, loading]);

  return (
      <div>
        <>
          {userSelection === false ? 
            <ContentDropdown userProgress={userProgressData} moduleTitles={moduleTitles} lessonTitles={lessonTitles} onUserSelection={(moduleIndex, lessonIndex)=>setUserSelection([moduleIndex, lessonIndex])}/> 
            : 
            <StudySession userProgress={userProgressData} moduleIndex={userSelection[0]} lessonIndex={userSelection[1]} moduleData={allModules}  />}
        </>

        <UserLogStatus name={name} user={user} logout={logout}/>
      </div>

  );
}
export default Dashboard;


