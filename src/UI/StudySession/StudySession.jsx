import ExampleUI from "./Example/ExampleUI.jsx";
import Flashcard from "./Flashcard/Flashcard.jsx";
import TrueFalseUI from "./TrueFalse/TrueFalseUI.jsx";
import MultipleChoiceUI from "./MultipleChoice/MultipleChoiceUI.jsx";
import Matching from "../Matching/Matching.jsx";

import classes from "./StudySession.module.css";

import { auth, db, logout } from "../../firebase.jsx";
import { query, collection, getDocs, where } from "firebase/firestore";


const StudySession = (props) => 
{
    const modTitle = props.moduleData[props.moduleIndex].moduleTitle;
    const lessonTitle = props.moduleData[props.moduleIndex].lessonTitles[props.lessonIndex];
    const lessonArr =  props.moduleData[props.moduleIndex].lessons[props.lessonIndex];

    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};

    return (
        <>
            {/* <div className={classes.mainContainer}>
                    
                    <>
                        <ExampleUI {...lessonInfo}/>
                    </>

            </div>

            <div className={classes.mainContainer}>
                    
                    <>
                        <Flashcard {...lessonInfo}/>
                    </>

            </div>
                        
            <div className={classes.mainContainer}>
                    
                    <>
                        <TrueFalseUI lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]} {...lessonInfo}/>
                    </>

            </div> 
            <div className={classes.mainContainer}>
                    
                    <>
                        <TrueFalseUI lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]} {...lessonInfo}/>
                    </>

            </div>

            <div className={classes.mainContainer}>
                    
                    <>
                        <MultipleChoiceUI lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]} {...lessonInfo}/>
                    </>

            </div> */}

            <div className={classes.mainContainer}>
                    
                <>
                    <Matching {...lessonInfo}/>
                </>

            </div>
        </>
       
    );
}

export default StudySession;