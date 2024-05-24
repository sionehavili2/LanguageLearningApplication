import CheckpointUI from "../Checkpoint/CheckpointUI.jsx";
import BeginStudySession from "./BeginStudySession.jsx";
import TitleAndSection from "../TitleAndSection/TitleAndSection.jsx";
import classes from "./StudySession.module.css";
import { useState } from "react";

const StudySession = (props) => 
{
    const[checkpointSelected, setCheckpointSelected] = useState(null);
    const modTitle = props.moduleData[props.moduleIndex].moduleTitle;
    const lessonTitle = props.moduleData[props.moduleIndex].lessonTitles[props.lessonIndex];
    const lessonArr =  props.moduleData[props.moduleIndex].lessons[props.lessonIndex];
    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};
    const allUserProgress = props.userProgress[props.moduleIndex].moduleLessons[props.lessonIndex];
    const progressArr = allUserProgress.exercisesFinished;

    // console.log(props.userProgress);

    return (
        
        <>
            <div className={classes.mainContainer}>
            <TitleAndSection {...lessonInfo} />
            {
                checkpointSelected != null ?

                    <>
                        <BeginStudySession 
                            {...lessonInfo} 
                            selectedIndex={checkpointSelected} 
                            onReturnToCheckPointSelection={()=>{setCheckpointSelected(null)}}
                            isPracticeBankOn={true} 
                            onSessionOver={(finishedCpIndex)=> 
                            {    
                                if(finishedCpIndex === -1)
                                {
                                    // console.log("user did not pass.");
                                }
                                else if(progressArr[finishedCpIndex] === false)
                                {
                                    // console.log("finished and updating user progression..."); 
                                    progressArr[finishedCpIndex] = true;
                                    props.onUpdateProgress([...progressArr]);
                                }
                                // else console.log("section is already finished");
                            }}

                            onAddToPracticeBank={(addToPB)=>{props.onAddToPersonalPracticeBank(addToPB);}}

                            practiceBank={props.practiceBank}
                        />
                    </>
                :
                    <>
                        {/* <h2 className={classes.title}>{modTitle}</h2> */}
                        <CheckpointUI progressData={progressArr} onSelectedCheckpoint={(cpIndex)=>{setCheckpointSelected(cpIndex)}}/>
                    </>
            }
            </div>
        </>
    );
}

export default StudySession;