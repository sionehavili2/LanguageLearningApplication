import classes from "./TrueFalseUI.module.css";
import { useState,} from "react";

function getRandomInt(min, max) 
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TrueFalseUI = (props) => 
{
    // console.log(props.lessonData);
    const randomNumber = getRandomInt(0,1);
    const exampleArr = props.lessonData.examples;

    return (
        <>
            <h2>TrueFalseUI Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>
            
            <div className={classes.mainContainer}>
                <div>{randomNumber}</div>
                <div>{exampleArr}</div>
                <button>True</button>
                <button>False</button>
            </div>


            
        </>
    );
}

export default TrueFalseUI;