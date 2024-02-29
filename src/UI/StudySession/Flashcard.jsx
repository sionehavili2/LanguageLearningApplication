import classes from "./Flashcard.module.css"
import { useState, useEffect} from "react";

const Flashcard = (props) => 
{
    const [exampleArrayIndex, setArrayIndex] = useState(0);
    const [isCardFront, setIsCardFront] = useState(false);

    const arrayLength  = props.currentModuleData.lessons[props.lessonIndex].examples.length;
    const exampleArray = props.currentModuleData.lessons[props.lessonIndex].examples;

    const side1 = exampleArray[exampleArrayIndex][0];
    const side2 = exampleArray[exampleArrayIndex].map((singleString, index) => (index > 0 && <li key={index}>{singleString}</li>))

    // useEffect(()=>{},[exampleArrayIndex]);

    return (
        <>
            <h2>Flashcard Component</h2>
            <h2>Module Title : {props.currentModuleData.moduleTitle}</h2>
            <h3>Lesson Title : {props.currentModuleData.lessonTitles[props.lessonIndex]}</h3>
            <h4>Intro : {props.currentModuleData.lessons[props.lessonIndex].intro}</h4>
        
            <div className={classes.mainContainer}>
                <ul className={classes.unorderedList}>
                    {isCardFront === true ? side2 : side1}
                    <button onClick={()=>{setIsCardFront(isCardFront === true ? false : true)}}>Flip To {isCardFront ? "Front" : "Back"} of Card</button>
                </ul>
                <div className={classes.exampleCounter}>Flashcard {exampleArrayIndex + 1}/{exampleArray.length}</div>
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1); setIsCardFront(false);}} disabled={exampleArrayIndex <= 0}>Previous Flashcard</button>
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1); setIsCardFront(false);}}  disabled={exampleArrayIndex >= arrayLength - 1}>Next Flashcard</button>
            </div>
            
        </>
    );

}

export default Flashcard;