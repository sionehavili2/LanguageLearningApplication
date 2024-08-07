import classes from "./ExampleUI.module.css"
import { useState, useEffect } from "react";
import PracticeBankBtn from "../../PracticeBankBtn/PracticeBankBtn";

const ExampleUI = (props) => 
{    

    const [arrayIndex, setArrayIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const [exampleArr, setExampleArr] = useState(props.lessonData.examples);
    const exampleArrLength  = props.lessonData.examples.length;
    // const exampleArr = props.customLessonData ? props.customLessonData : props.lessonData.examples;
    // const exampleArrLength  = props.customLessonData ? props.customLessonData.length : props.lessonData.examples.length;
    // const mapExamples = exampleArr[arrayIndex].map((string, index)=>(<li key={index}>{string}</li>));

    console.log(exampleArr[arrayIndex]);
    const mapExamples = exampleArr[arrayIndex].map((string, index)=>
    {
        return (<li className={index === 0 ? classes.comparee : classes.compareeSolution} key={index}><h2>{string}</h2></li>);
    });

    useEffect(()=>{if(arrayIndex + 1 === exampleArrLength){props.onFinished(true); setIsFinished(true)}},[arrayIndex]);

    useEffect(()=>{
        if(isFinished)
        {
            setIsDismissed(false);
            const timer = setTimeout(() => {setIsDismissed(true)}, 2000);
        }
    },[isFinished]);

    useEffect(()=>{setExampleArr([...props.lessonData.examples])},[props.lessonData.examples])
    
    return (
        <>            
            <div className={classes.mainContainer}>
                <div className={classes.title}>Learn and familiarize yourself with the terms/vocabulary for this module </div>
                <span className={classes.exampleCounter}>Example {arrayIndex + 1}/{exampleArr.length}</span>
                <ul className={classes.unorderedList}>
                    <>{props.lessonData.exampleTitles && <li>{props.lessonData.exampleTitles[arrayIndex]}</li>}</>
                    <>{mapExamples}</>
                    <button className={classes.btn} onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1)}} disabled={arrayIndex <= 0}>Previous</button>
                    <button className={classes.btn} onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1)}}  disabled={arrayIndex >= exampleArrLength - 1}>Next</button>
                    {props.isPracticeBankOn === true &&<PracticeBankBtn practiceBank={props.practiceBank} onRemoveFromPracticeBank={()=>{console.log("remove it"); props.handleRemoveFromPracticebank(arrayIndex)}} handleOnClick={()=>{props.onAddToPracticeBank(exampleArr[arrayIndex]);}} currentExample={exampleArr[arrayIndex]} exampleArrayLength={exampleArrLength}/>}
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