import { useHref } from "react-router-dom";
import classes from "./TrueFalseUI.module.css";
import { useState, useEffect} from "react";
import { getRandomInt } from "../../../computeFunctions";

function setupTrueFalse(isQuestionTrue, allExamples, allExamplesIndex)
{
    const singleExampleArr = allExamples[allExamplesIndex];

    let firstIndex, secondIndex;
    if (singleExampleArr.length === 2)
    {
        firstIndex = 0;
        secondIndex = 1;
    }
    else if(singleExampleArr.length === 3)
    {
       firstIndex = 1;
       secondIndex = 2;
    }
    else console.log("Error! [TrueFalseUI.jsx] function setupTrueFalse() has an array length it was not expecting : " + singleExampleArr.length);

    let comparee;
    if(isQuestionTrue === true) {comparee = singleExampleArr[secondIndex];}
    else 
    if (isQuestionTrue === false)
    {
        let getRandomIndex = null;
        while(getRandomIndex === null || getRandomIndex === allExamplesIndex) {getRandomIndex = getRandomInt(0,allExamples.length -1);}        
        comparee = allExamples[getRandomIndex][secondIndex];
    }
    else console.log("Error! [TrueFalseUI.jsx] function setupTrueFalse() passed argument IsQuestionTrue is producing an unexpected result");
    
    return singleExampleArr[firstIndex] + " : " + comparee;
}



const TrueFalseUI = (props) => 
{
    //1. Get Random Number to determine whether the question is true or false
    const [isQuestionTrue, setIsQuestionTrue] = useState(getRandomInt(0,1) === 0 ? false : true);
    const [userSelected, setUserSelected] = useState(null);
    const [exampleIndex, setExampleIndex] = useState(0);
    const [displayExamples, setDisplayExamples] = useState();
    const [correctAnswerCnt, setCorrectAnswerCnt] = useState(0);
    const [exampleArr] = useState(props.lessonData.examples);


    function handleNextQuestion() 
    {
        setIsQuestionTrue(getRandomInt(0,1) === 0 ? false : true);
        setExampleIndex(currIndex => currIndex+1);
        setUserSelected(null);
        setDisplayExamples(null);
    }

    useEffect(()=>{setDisplayExamples(setupTrueFalse(isQuestionTrue, exampleArr, exampleIndex));},[displayExamples]);

    useEffect(()=>{if(userSelected != null && userSelected === isQuestionTrue){setCorrectAnswerCnt(correctAnswerCnt + 1)}},[userSelected]);

    return (
        <>
            <h2>TrueFalseUI Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>
            
            <h4>Is the following True or False?</h4>
            <div className={classes.mainContainer}>

                <h4>{displayExamples ? displayExamples : "Loading..."}</h4>
                <>
                {
                    userSelected === null ?

                        <>
                            <button onClick={()=>{setUserSelected(true)}}>True</button>
                            <button onClick={()=>{setUserSelected(false)}}>False</button>
                        </>
                    : 
                        <>
                            <>{userSelected === isQuestionTrue ? <div className={classes.rightAnswer}>CORRECT</div> : <div className={classes.wrongAnswer}>That is NOT Correct</div>}</>
                            <>{exampleIndex < exampleArr.length - 1 && <button onClick={handleNextQuestion}>Next Question</button>}</>
                            <>{exampleIndex === exampleArr.length - 1 && 

                                <>
                                    <>{correctAnswerCnt / exampleArr.length >= .75 ? <h3 className={classes.rightAnswer}>PASS</h3> : <h3 className={classes.wrongAnswer}>You Did not pass the Challenge</h3>}</>
                                    <button onClick={()=>{correctAnswerCnt / exampleArr.length >= .75 ? props.onFinished() : props.onDNF()}}>Finish Challenge</button>
                                </>

                            }</>
                        </>
                }
                </>

                <div>{exampleIndex + 1}/{exampleArr.length}</div>

            </div>
            <div>Total Correct : {correctAnswerCnt} / {exampleArr.length}</div>
        </>
    );
}

export default TrueFalseUI;