import CheckpointUI from "../Checkpoint/CheckpointUI.jsx";
import BeginStudySession from "./BeginStudySession.jsx";

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
            {
                checkpointSelected != null ?

                    <BeginStudySession {...lessonInfo} selectedIndex={checkpointSelected} onCompletedSession={(finishedCpIndex)=> 
                    {
                        setCheckpointSelected(null);
                        if(finishedCpIndex === -1)
                        {
                            console.log("It was not finished")
                        }
                        else if(progressArr[finishedCpIndex] === false)
                        {
                            console.log("finished and updating");
                            progressArr[finishedCpIndex] = true;
                            props.onUpdateProgress([...progressArr]);
                        }
                    }}/>
                :
                    <CheckpointUI progressData={progressArr} onSelectedCheckpoint={(cpIndex)=>{setCheckpointSelected(cpIndex)}}/>
            }
            </div>
        </>
    );
}

export default StudySession;