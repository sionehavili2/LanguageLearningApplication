import React, { useEffect, useState, useTransition } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, setDoc, where, addDoc, doc as docRef, updateDoc} from "firebase/firestore";
import StudySession from "../UI/StudySession/StudySession";
import ContentDropdown from "../UI/ContentDropDown/ContentDropdown";
import Login from "../pages/Login";

//Importing Data Modules
import Module0 from "../ModuleData/Module0";
import Module1 from "../ModuleData/Module1";
import Module2 from "../ModuleData/Module2";
import Module3 from "../ModuleData/Module3";

const allModules = [Module0,Module1,Module2,Module3];
const moduleTitles = allModules.map((module)=>(module.moduleTitle));
const lessonTitles = allModules.map((module)=>(module.lessonTitles));

// const progressStruct = 
// [
//   {
//     moduleLessons : 
//     [
//       {exercisesFinished : [true,true,true,true,true,true,true]},
//       {exercisesFinished : [true,true,true,true,true,true,false]},
//       {exercisesFinished : [true,true,true,true,true,false,false]},
//       {exercisesFinished : [true,true,true,true,false,false,false]},
//       {exercisesFinished : [true,true,true,false,false,false,false]},
//       {exercisesFinished : [true,true,false,false,false,false,false]},
//     ]
//   },

//   {
//     moduleLessons : 
//     [
//       {exercisesFinished : [true,true,false,false,false,false,false]},
//       {exercisesFinished : [true,false,false,false,false,false,false]},
//       {exercisesFinished : [false,false,false,false,false,false,false]},
//       {exercisesFinished : [false,false,false,false,false,false,false]},
//       {exercisesFinished : [false,false,false,false,false,false,false]},
//     ]
//   },
  
// ];

const progressStruct = 
[
  {
    moduleLessons : 
    [
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
    ]
  },

  {
    moduleLessons : 
    [
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
    ]
  },  

  {
    moduleLessons : 
    [
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
      {exercisesFinished : [false,false,false,false,false,false,false]},
    ]
  }, 
  
  {
    moduleLessons : 
    [
      {exercisesFinished : [false,false,false,false,false,false,false]},
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
  const [userProgressData, setUserProgressData] = useState();
  const [personalPracticeBank, setPersonalPracticeBank] = useState();
  const [userDocRef, setUserDocRef] = useState();
  const navigate = useNavigate("/Login");
  const navigateStartSession = useNavigate("/Dashboard/StudySession");

  // //Retreives User Data from Backend
  const fetchUserData = async () => 
  {
    try 
    {
      
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const userData = doc.docs[0].data();
      setName(userData.name);
      setUserDocRef(doc.docs[0].ref);

      // if (doc.empty) 
      // {
      //   // If the query doesn't return any documents, it means the user document doesn't exist yet
      //   // Create a new user document with the provided data
      //   // await setDoc(docRef(db, "users", user?.uid), { userProgression: progressStruct });
      //   //await setDoc(docRef(db, "users", user?.uid), { personalPracticeBank : [] });        \
      //   await setDoc(docRef(db, "users", user?.uid), { personalPracticeBank : {pairs:[]} });

      //   console.log("New user document created with user progression data");
      // } 
      // else 
      // {
      //   // If the query returns a document, update the existing user document with the provided data
      //   const userDocRef = doc.docs[0].ref;
      //   // await updateDoc(userDocRef, { personalPracticeBank : [] });
        // await updateDoc(docRef(db, "users", user?.uid), { personalPracticeBank : {pairs:[]} }).then(console.log("pairs should be set..."));
          // await setDoc(docRef(db, "users", user?.uid), { personalPracticeBank : {pairs:[]} }).then(console.log("pairs should be set..."))

      //   console.log("User progression data updated successfully");
      // }
      // setUserProgressData(progressStruct);

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

      if(userData && userData.personalPracticeBank)
      {
        setPersonalPracticeBank(userData.personalPracticeBank);
      }
      else
      {
        if (doc.empty) 
        {
          // If the query doesn't return any documents, it means the user document doesn't exist yet
          // Create a new user document with the provided data
          // await setDoc(docRef(db, "users", user?.uid), { userProgression: progressStruct });
          //await setDoc(docRef(db, "users", user?.uid), { personalPracticeBank : [] });        \
          await setDoc(docRef(db, "users", user?.uid),  { personalPracticeBank : {keys:[], values:[]}}).then(console.log("pairs should be set..."));

          console.log("New user document created with user progression data");
        } 
        else 
        {
          // If the query returns a document, update the existing user document with the provided data
          // await updateDoc(userDocRef, { personalPracticeBank : [] });
          await updateDoc(userDocRef, { personalPracticeBank : {keys:[], values:[]}}).then(console.log("pairs should be set..."));
          console.log("User progression data updated successfully");
        }
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
    fetchUserData();

    // return()=>{console.log("cleanup...");}
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
        <div>
          <>
          {userSelection === false ?

            <ContentDropdown userProgress={userProgressData} moduleTitles={moduleTitles} lessonTitles={lessonTitles} onUserSelection={(moduleIndex, lessonIndex)=>setUserSelection([moduleIndex, lessonIndex])}/> 
            : 
            <>
              <div className="mainDashboardBtnContainer"><button className="mainDashboardBtn"  onClick={()=>{setUserSelection(false)}}>Return To Main Dashboard</button></div>
              <StudySession 
                userProgress={userProgressData} 
                moduleIndex={userSelection[0]} 
                lessonIndex={userSelection[1]} 
                moduleData={allModules}
                practiceBank={personalPracticeBank}
                onAddToPersonalPracticeBank={(addToBank)=>
                {
                    console.log("Dashbaord has received this to be added to practice bank: " + addToBank);
                    // Update the document in Firestore with the modified user progress data
                    const updateProgress = async ()=>
                    {
                      //push data to personal practice bank
                      personalPracticeBank.keys.push(addToBank[0]);
                      personalPracticeBank.values.push(addToBank[1]);
                      setPersonalPracticeBank(personalPracticeBank);

                      await updateDoc(userDocRef, { personalPracticeBank: personalPracticeBank })
                      .then(() => {console.log("Practice Bank updated successfully");})
                      .catch((error) => {console.error("Error updating practice bank:", error);});
                    }

                    updateProgress();
                }} 
                onUpdateProgress={ async (updatedArray)=>
                {
                    const updatedUserProgress = [...userProgressData];
                    updatedUserProgress[userSelection[0]].moduleLessons[userSelection[1]].exercisesFinished = updatedArray;

                    await updateDoc(userDocRef, { userProgression: updatedUserProgress })
                    .then(() => {console.log("User progress data updated successfully");})
                    .catch((error) => {console.error("Error updating user progress data:", error);});

                }}
                />
            </>
          }
          </>

        </div>

    );
  }
  else return <div>Error... Please check Home.jsx code</div>
}
export default Dashboard;

    // const allUserProgress = props.userProgress[props.moduleIndex].moduleLessons[props.lessonIndex].exercisesFinished;


