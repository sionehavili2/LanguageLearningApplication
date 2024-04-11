
import { useState, useEffect} from "react";
import classes from "./InteractiveQuiz.module.css";
import  shuffle  from "lodash/shuffle";
import { values } from "lodash";

function getIndexes(exampleArray)
{
    let firstIndex, secondIndex;
    if (exampleArray.length === 2) { firstIndex = 0; secondIndex = 1;}
    else if(exampleArray.length === 3) { firstIndex = 1; secondIndex = 2;}
    else console.log("Error! [Matching.jsx] function handleUserChoiceBtn() has an array length it was not expecting : " + exampleArr[selectedIndex].length);
    return [firstIndex, secondIndex];
}

function extractKeyValuePairs(allExamples)
{
    let indexes = getIndexes(allExamples[0]);
    let firstIndex = indexes[0];
    let secondIndex = indexes[1];
    let comparees = [];
    let solutions = [];

    allExamples.forEach(element => 
    {
        comparees.push(element[firstIndex]);
        solutions.push(element[secondIndex]);
    });
    return [comparees, solutions];
}

function allValuesSelected(arr) {
  return arr.every(value => value !== false);
}

const InteractiveQuiz = (props) =>
{
    //Raw Data 
    const [allExamplesArr] = useState(props.lessonData.examples);
    const [keyValuePairs] = useState(extractKeyValuePairs(allExamplesArr));
    //Refined Data
    const [keys] = useState(keyValuePairs[0]);
    const [keyValues] = useState(keyValuePairs[1]);

    //Tracks OG values and their original positions
    const [values, setValue] = useState(shuffle([...keyValues]));
    const [displayValues, setDisplayValues] = useState([...values]);
    //Tracks the index of the given index position of the value
    const [valueIndexes, setValueIndexes] = useState(new Array(keys.length).fill(null));    

    //Tracks whether key buttons are disabled. false if disabled, value to display if not disabled.
    const [disableKeys, setDisableKeys] = useState(new Array(keys.length).fill(false));
    //Tracks whether value buttons are disabled,
    const [disableVals, setDisableVals] = useState(new Array(displayValues.length).fill(false));

    //Tracks the index of a selected key
    const [keyIndex, setKeyIndex] = useState(null);
    //Tracks index of selected value
    const [valIndex, setValIndex] = useState(null);

    //Tracks whether user has submitted the quiz or not
    const[isReadyToSubmit, setIsReadyToSubmit] = useState(false);

    //Tracks user score to display once calculated
    const[userScore, setUserScore] = useState(null);

    useEffect(()=>
    {
        //If BOTH key and value are selected
        if(keyIndex !== null && valIndex !== null)
        {
            //A. Check if there is anything in keyIndex position (If there is, we must return it and update value btns.
            const isKeyPositionEmpty = disableKeys[keyIndex] === false ? true : false;

            if(isKeyPositionEmpty)
            {
                console.log("key position empty....");
                //1. Extract Value string
                const displayStr = displayValues[valIndex];

                //2. Store Value String
                disableKeys[keyIndex] = displayStr;
                setDisableKeys([...disableKeys]);

                //3. Store Value Index by KeyIndex
                valueIndexes[keyIndex] = valIndex;
                setValueIndexes([...valueIndexes]);

                //4. Update Val Btn to be disabled 
                disableVals[valIndex] = true;
                setDisableVals([...disableVals]);
            }

            //N. Cleanup
            setKeyIndex(null);
            setValIndex(null);
        }
        //If ONLY key index is selected
        else if (keyIndex !== null)
        {            
            //A. Check if there is anything in keyIndex position (If there is, we must return it and update value btns.
            const isKeyPositionEmpty = disableKeys[keyIndex] === false ? true : false;

            if(isKeyPositionEmpty)
            {
                console.log("key position is empty");
                console.log("use KeyValues to check if values are correct")
            }
            else
            {
                console.log("Key position is not empty!")
                //1. Reset Key button to empty
                disableKeys[keyIndex] = false;
                setDisableKeys([...disableKeys]);

                //2. Retrieve valIndex
                const thisValIndex = valueIndexes[keyIndex];

                //3. Reset and Update index for val
                valueIndexes[keyIndex] = null;
                setValueIndexes([...valueIndexes]);

                //4. Update Val Btn to be enabled 
                disableVals[thisValIndex] = false;
                setDisableVals([...disableVals]);

                setKeyIndex(null);
            }
        }

    },[keyIndex,valIndex]);

    useEffect(()=>
    {
        if(isReadyToSubmit)
        {
            const userAnswers = disableKeys;
            const correctAnswers = keyValues;
            
            let correctCount = 0;
            keys.forEach((keyString,index)=> {userAnswers[index] === correctAnswers[index] && correctCount++;});
            setUserScore(correctCount);
            props.onFinished(correctCount / keys.length >= .90 ? true : false);
        }

    },[isReadyToSubmit]);

    return (
    <div className={classes.mainContainer}>
    {
        isReadyToSubmit ?
        <>
            <div className={classes.userFeedback}>
                <div>{userScore !== null ? ("User Score: " + parseFloat(userScore / keys.length).toFixed(2) * 100 + "%") : "Calculating Score..." }</div>
                {userScore && userScore / keys.length >= .90 ? <h4 className={classes.rightAnswer}>YOU PASSED! {" (Requirement: 90%)"}</h4> : <h4 className={classes.wrongAnswer}>You Did not pass the Quiz {"(Requirement: 90%)"}</h4>}
                <button onClick={()=>{props.onReturnToCheckPointSelection()}}>Return to checkpoint selection</button>
            </div>

        </>

        :
        <>
            <h2 className={classes.title}>{props.moduleTitle}</h2>
            <div className={classes.subTitles}>
                <h2>{props.lessonTitle} Mastery Quiz</h2>
                <h4>{"Complete the Mastery Quiz to show you have gained a solid foundation of " + props.lessonTitle}.</h4>
            </div>
            <div className={classes.quizContainer}>

                <ul className={!allValuesSelected(disableVals) ? classes.compareesContainer : classes.allCompareesSelected}>
                    {keys.map((stringVal, index)=>
                    (
                        <li key={index}>
                            <span className={classes.displayVals}>{stringVal}</span>
                            <button 
                                onClick={()=>{setKeyIndex(index)}}
                                className={keyIndex === index ? classes.selectedBtn : 'red' }
                            >
                                <>{disableKeys[index] === false ? "Empty" : disableKeys[index]}</>
                            </button>
                        </li>
                    ))}
                </ul>


                <ul className={!allValuesSelected(disableVals) ? classes.solutionsContainer : classes.allSolutionsSelected}>
                    {displayValues.map((stringVal, index)=>
                    (
                        <li key={index}>
                            <button
                                disabled={disableVals[index]}
                                onClick={()=>{setValIndex(index)}}
                                className={valIndex === index ? classes.selectedBtn : 'red' }

                            >
                                <>{stringVal}</>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <>{<h2>
                <button 
                onClick={()=>{setIsReadyToSubmit(true)}} 
                disabled={!allValuesSelected(disableVals)}
                className={!allValuesSelected(disableVals) ? classes.disableBtn : classes.enableBtn}
                >Submit Interactive Quiz
                
                </button>
            </h2>}</>
        </>
       
    }</div>);
};

export default InteractiveQuiz;