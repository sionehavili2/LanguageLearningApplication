import { count } from "firebase/firestore";
import classes from "./ExampleUI.module.css"
import { useState, useEffect } from "react";

function isInteger(arg) {
  return typeof arg === 'number' && Number.isInteger(arg);
}

const ExampleUI = (props) => 
{    

    const [arrayIndex, setArrayIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const[isDismissed, setIsDismissed] = useState(false);

    const exampleArr = props.lessonData.examples;
    const exampleArrLength  = props.lessonData.examples.length;

    // const mapExamples = exampleArr[arrayIndex].map((string, index)=>(<li key={index}>{string}</li>));
    const mapExamples = exampleArr[arrayIndex].map((string, index)=>
    {
        if(index === 0)
            return (<li key={index}><h1>{string}</h1></li>);
        else 
        if (index === 1)
            return (<li key={index}><h2>{string}</h2></li>);
        else
            return (<li key={index}><h3>{string}</h3></li>);
    });



    useEffect(()=>{if(arrayIndex + 1 === exampleArrLength){props.onFinished(true); setIsFinished(true)}},[arrayIndex]);

    useEffect(()=>{
        if(isFinished)
        {
            setIsDismissed(false);
            const timer = setTimeout(() => {setIsDismissed(true)}, 2000);
        }
        
    },[isFinished]);
    
    return (
        <>
            <h2 className={classes.title}>{props.moduleTitle}</h2>
            <div className={classes.subTitles}>
                <h2>{props.lessonTitle} Introduction</h2>
                <h4>{props.lessonData.intro}</h4>
            </div>
            
            <div className={classes.mainContainer}>
                <span className={classes.exampleCounter}>Example {arrayIndex + 1}/{exampleArr.length}</span>
                <ul className={classes.unorderedList}>
                    <>{props.lessonData.exampleTitles && <li>{props.lessonData.exampleTitles[arrayIndex]}</li>}</>
                    <>{mapExamples}</>
                    <button className={classes.btn} onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1)}} disabled={arrayIndex <= 0}>Previous</button>
                    <button className={classes.btn} onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1)}}  disabled={arrayIndex >= exampleArrLength - 1}>Next</button>
                </ul>
                <>{isFinished && !isDismissed &&
                    <>
                        <h2 className={classes.finishedResponse}>
                            {props.lessonTitle} introduction has been completed!
                        </h2>
         
                    </>
                }</>
                
                <button 
                    className={ isFinished ? classes.returnBtn : classes.disabledReturnBtn} 
                    onClick={()=>{props.onReturnToCheckPointSelection()}}
                    disabled={!isFinished}
                >        
                    Return to Checkpoint Selection
                </button>
            </div>
        </>
    );

}

export default ExampleUI;