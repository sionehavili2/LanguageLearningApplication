import { count } from "firebase/firestore";
import classes from "./ExampleUI.module.css"
import { useState } from "react";

const ExampleUI = (props) => 
{    
    const [arrayIndex, setArrayIndex] = useState(0);
    const exampleArray = props.currentModuleData.lessons[props.lessonIndex].examples;
    const arrayLength  = props.currentModuleData.lessons[props.lessonIndex].examples.length;
    const displayInfo = exampleArray[arrayIndex].map((string, index) => (<li key={index}>{string}</li>));
    
    return (
        <>
            <h2>Example Component</h2>
            <h2>Module Title : {props.currentModuleData.moduleTitle}</h2>
            <h3>Lesson Title : {props.currentModuleData.lessonTitles[props.lessonIndex]}</h3>
            <h4>Intro : {props.currentModuleData.lessons[props.lessonIndex].intro}</h4>
            
            <div className={classes.mainContainer}>
                <ul className={classes.unorderedList}>{displayInfo}
                    <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1)}} disabled={arrayIndex <= 0}>Previous Example</button>
                    <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1)}}  disabled={arrayIndex >= arrayLength - 1}>Next Example</button>
                </ul>
                <div className={classes.exampleCounter}>Example {arrayIndex + 1}/{exampleArray.length}</div>
            </div>
        </>
    );

}

export default ExampleUI;