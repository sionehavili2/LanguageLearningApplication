import CheckpointUI from "../Checkpoint/CheckpointUI.jsx";
import BeginStudySession from "./BeginStudySession.jsx";

import classes from "./StudySession.module.css";
import { useState, useTransition } from "react";

const StudySession = (props) => 
{
    const[checkpointSelected, setCheckpointSelected] = useState(null);
    const modTitle = props.moduleData[props.moduleIndex].moduleTitle;
    const lessonTitle = props.moduleData[props.moduleIndex].lessonTitles[props.lessonIndex];
    const lessonArr =  props.moduleData[props.moduleIndex].lessons[props.lessonIndex];

    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};


    return (
        <>
            <CheckpointUI progressData={props.userProgress[props.moduleIndex].moduleLessons[props.lessonIndex].exercisesFinished} onSelectedCheckpoint={(cpIndex)=>{setCheckpointSelected(cpIndex)}}/>
            {checkpointSelected != null && <BeginStudySession {...lessonInfo} selectedIndex={checkpointSelected}/>}
        </>
       
    );
}

export default StudySession;