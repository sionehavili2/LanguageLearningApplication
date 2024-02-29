import classes from "./Flashcard.module.css"
import { useState, } from "react";

const Flashcard = (props) => 
{
    const [exampleArrayIndex, setArrayIndex] = useState(0);
    const [isCardFront, setIsCardFront] = useState(false);
    const exampleArray = props.lessonData.examples;
    const arrayLength  = props.lessonData.examples.length;
    // console.log(props.lessonData.exampleTitles);
    // console.log(props.lessonData.examples[0][0]);
    // console.log(props.lessonData.exampleTitles[props.lessonData.examples[0][0]]);

    const side1 = props.lessonData.exampleTitles ? props.lessonData.exampleTitles[props.lessonData.examples[0][0]] : props.lessonData.examples[0];
    const side2 = exampleArray[exampleArrayIndex].map((singleString, index) => (index > 0 && <li key={index}>{singleString}</li>))
    console.log(side1);
    return (
        <>
            <h2>Flashcard Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>

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