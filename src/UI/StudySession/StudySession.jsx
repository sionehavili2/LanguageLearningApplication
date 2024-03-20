import CheckpointUI from "../Checkpoint/CheckpointUI.jsx";
import BeginStudySession from "./BeginStudySession.jsx";

import classes from "./StudySession.module.css";
import { useState } from "react";

function updateArrayAtIndex(array, index, newValue) {
  // Make a copy of the original array to avoid mutating the original array directly
  const newArray = [...array];
  // Update the value at the specified index
  newArray[index] = newValue;
  // Return the modified array
  return newArray;
}

const StudySession = (props) => 
{
    const[checkpointSelected, setCheckpointSelected] = useState(null);

    const modTitle = props.moduleData[props.moduleIndex].moduleTitle;
    const lessonTitle = props.moduleData[props.moduleIndex].lessonTitles[props.lessonIndex];
    const lessonArr =  props.moduleData[props.moduleIndex].lessons[props.lessonIndex];
    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};
    const allUserProgress = props.userProgress[props.moduleIndex].moduleLessons[props.lessonIndex];
    const progressArr = allUserProgress.exercisesFinished;

    console.log(props.userProgress);

    return (
        <div className={classes.mainContainer}>
        {
            checkpointSelected != null ?

                <BeginStudySession {...lessonInfo} selectedIndex={checkpointSelected} onCompletedSession={(finishedCpIndex)=> 
                {
                    setCheckpointSelected(null);
                    console.log("Finished CP Index: " + finishedCpIndex);
                    console.log(progressArr[finishedCpIndex]);
                    if(progressArr[finishedCpIndex] === false)
                    {
                        progressArr[finishedCpIndex] = true;
                        props.onUpdateProgress([...progressArr]);
                        //You have now changed the array to correctly reflect the udpate, you now must send it to parent component in order for parent component to send it to update.
                    }
                }}/>
            :
                <CheckpointUI progressData={progressArr} onSelectedCheckpoint={(cpIndex)=>{setCheckpointSelected(cpIndex)}}/>
        }
        </div>
    );
}

export default StudySession;