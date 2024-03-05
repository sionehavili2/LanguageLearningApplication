import { count } from "firebase/firestore";
import classes from "./ExampleUI.module.css"
import { useState } from "react";

function isInteger(arg) {
  return typeof arg === 'number' && Number.isInteger(arg);
}

const ExampleUI = (props) => 
{    

    const [arrayIndex, setArrayIndex] = useState(0);

    const exampleArr = props.lessonData.examples;
    const exampleArrLength  = props.lessonData.examples.length;


    const mapExamples = exampleArr[arrayIndex].map((string, index)=>(<li key={index}>{string}</li>))
    
    
    return (
        <>
            <h2>Example Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>
            
            <div className={classes.mainContainer}>
                <ul className={classes.unorderedList}>
                    <>{props.lessonData.exampleTitles && <li>{props.lessonData.exampleTitles[arrayIndex]}</li>}</>
                    <>{mapExamples}</>
                    <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1)}} disabled={arrayIndex <= 0}>Previous Example</button>
                    <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1)}}  disabled={arrayIndex >= exampleArrLength - 1}>Next Example</button>
                </ul>
                <div className={classes.exampleCounter}>Example {arrayIndex + 1}/{exampleArr.length}</div>
            </div>
        </>
    );

}

export default ExampleUI;