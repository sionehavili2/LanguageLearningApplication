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
    
    return [singleExampleArr[firstIndex], comparee];
}


const TrueFalseUI = (props) => 
{
    //1. Get Random Number to determine whether the question is true or false
    const [isQuestionTrue, setIsQuestionTrue] = useState(getRandomInt(0,1) === 0 ? false : true);
    const [exampleArr] = useState(props.lessonData.examples);
    const [exampleIndex, setExampleIndex] = useState(0);

    const [userSelected, setUserSelected] = useState(null);
    const [correctAnswerCnt, setCorrectAnswerCnt] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    const [displayExamples, setDisplayExamples] = useState(setupTrueFalse(isQuestionTrue, exampleArr, exampleIndex));


    function handleNextQuestion() 
    {
        const isNewQuestionTrue = getRandomInt(0,1) === 0 ? false : true;
        const nextExampleIndex = exampleIndex + 1;

        setIsQuestionTrue(isNewQuestionTrue);
        setExampleIndex(nextExampleIndex);
        setDisplayExamples(setupTrueFalse(isNewQuestionTrue, exampleArr, nextExampleIndex));   
        setUserSelected(null);
    }
    
    useEffect(()=>{
        
        if(userSelected != null)
        {   
            userSelected === isQuestionTrue && setCorrectAnswerCnt(correctAnswerCnt + 1);
            if(exampleIndex + 1 === exampleArr.length) 
            {
                props.onFinished(correctAnswerCnt / exampleArr.length >= .75 ? true : false); 
                setIsFinished(true);
            }
        }
    },[userSelected]);

    return (
        
        <div className={classes.rootContainer}>
            <div className={classes.title}>Determine whether the following translation/vocabulary is true or false</div>            
            <div>Total Correct : {correctAnswerCnt} / {exampleArr.length}</div>
            <div>
                <div className={classes.mainContainer}>
                    <div>{exampleIndex + 1}/{exampleArr.length}</div>
                    <h4>True or False?</h4>
                        <h2 className={classes.example}>{displayExamples 
                        ? 
                        <div>
                            <span className={classes.firstExample}>{displayExamples[0]}</span>
                            <br/>
                            <span className={classes.secondExample}>{displayExamples[1]}</span>
                        </div> 
                        : "Loading..."}
                        </h2>
                    <>
                    {
                        userSelected === null ?

                            <div className={classes.btnContainer}>
                                <button className={classes.trueBtn} onClick={()=>{setUserSelected(true)}}>True</button>
                                <button className={classes.falseBtn} onClick={()=>{setUserSelected(false)}}>False</button>
                            </div>
                        : 
                            <>
                                <>{userSelected === isQuestionTrue ? <div className={classes.rightAnswer}>CORRECT!</div> : <div className={classes.wrongAnswer}>That is NOT Correct</div>}</>
                                <>{exampleIndex < exampleArr.length - 1 && <button className={classes.answerBtn} onClick={handleNextQuestion}>Next Question</button>}</>
                                <>{exampleIndex === exampleArr.length - 1 && 

                                    <>
                                    </>

                                }</>
                            </>
                    }
                    </>


                <>{
                    isFinished && !isDismissed &&
                    <>
                        <div className={classes.finishedResponse}>
                            <>{correctAnswerCnt / exampleArr.length >= .75 ? <h3 className={classes.rightAnswer}> {props.lessonTitle} Challenge PASSED!</h3> : <h3 className={classes.wrongAnswer}>You did not pass the Challenge.</h3>}</>
                            <button 
                                className={isFinished ? classes.returnBtn : classes.disabledReturnBtn} 
                                onClick={()=>{props.onReturnToCheckPointSelection()}}
                                disabled={!isFinished}
                            >        
                                Return to Checkpoint Selection
                            </button>
                        </div>
                    </>
                }</>

                </div>
            </div>




        </div>
    );
}

export default TrueFalseUI;