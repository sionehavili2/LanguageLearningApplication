import classes from "./Flashcard.module.css"
import { useState,useEffect } from "react";

function getSides ( exampleArray ) 
{
    let side1 = null;
    let side2 = null;
    if(exampleArray.length === 3) 
    {
        side1 = (<><li>{exampleArray[0]}</li><li>{exampleArray[1]}</li></>);
        side2 = (<><li>{exampleArray[0]}</li><li>{exampleArray[2]}</li></>);

    }
    else if (exampleArray.length === 2)
    {

        side1 = (<li>{exampleArray[0]}</li>);
        side2 = (<li>{exampleArray[1]}</li>);
    }
    else console.log("getSides() function errror: Array length does not match any expected sizes");

    return [side1, side2];
}

const Flashcard = (props) => 
{
    const [exampleArrayIndex, setArrayIndex] = useState(0);
    const [isCardFront, setIsCardFront] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const exampleArr = props.lessonData.examples;
    const exampleArrLength  = props.lessonData.examples.length;

    const sidesOfCard = getSides(props.lessonData.examples[exampleArrayIndex]);

        useEffect(()=>{ if((exampleArrayIndex + 1) === exampleArr.length){setIsFinished(true);props.onFinished(true);}},[exampleArrayIndex]);

    return (
        <>
            <h2>Flashcard Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>

            <div className={classes.mainContainer}>
                <ul className={classes.unorderedList}>
                    {isCardFront === false ? sidesOfCard[0] : sidesOfCard[1]}
                    <button onClick={()=>{setIsCardFront(isCardFront === true ? false : true)}}>Flip To {isCardFront ? "Front" : "Back"} of Card</button>
                </ul>
                <div className={classes.exampleCounter}>Flashcard {exampleArrayIndex + 1}/{exampleArr.length}</div>
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1); setIsCardFront(false);}} disabled={exampleArrayIndex <= 0}>Previous Flashcard</button>
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1); setIsCardFront(false);}}  disabled={exampleArrayIndex >= exampleArrLength - 1}>Next Flashcard</button>
                <>{isFinished &&  <h2>You are Finished !<button onClick={()=>{props.onReturnToCheckPointSelection()}}>Return to Checkpoint Selection</button></h2>}</>
            </div>
            
        </>
    );

}

export default Flashcard;