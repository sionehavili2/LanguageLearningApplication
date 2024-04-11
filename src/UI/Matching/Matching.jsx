import { useState, useEffect } from "react";
import  shuffle  from "lodash/shuffle";
import classes from "./Matching.module.css";

function allValuesTrue(arr) {
  return arr.every(value => value === true);
}

function getIndexes(exampleArray)
{
    let firstIndex, secondIndex;
    if (exampleArray.length === 2) { firstIndex = 0; secondIndex = 1;}
    else if(exampleArray.length === 3) { firstIndex = 1; secondIndex = 2;}
    else console.log("Error! [Matching.jsx] function handleUserChoiceBtn() has an array length it was not expecting : " + exampleArr[selectedIndex].length);
    return [firstIndex, secondIndex];
}

function setupMatches(allExamples)
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

    return [comparees, shuffle(solutions)];
}

const Matching = (props) => 
{
    const [exampleArr] = useState(props.lessonData.examples);
    const [examplePairs, setExamplePairs] = useState(setupMatches(exampleArr));
    // State to track the index of the currently clicked button
    const [leftClickedIndex, setLeftClickedIndex] = useState(null);
    const [rightClickedIndex, setRightClickedIndex] = useState(null);
    // State to track clicked buttons (comparees) 
    const [disabledCompareeBtns, setDisabledCompareeBtns] = useState(new Array(exampleArr.length).fill(false));
    // State to track clicked buttons (solutions)
    const [disabledSolutionsBtns, setDisabledSolutionsBtns] = useState(new Array(exampleArr.length).fill(false));
    const [displayResponse, setDisplayResponse] = useState(null);
    const [displayWarning, setDisplayWarning] = useState(null);
    //trackse when user is finished
    const [isFinished, setIsFinished] = useState(false);

    
    // Function to handle button click and update state
    const handleUserChoiceBtn = (keyIndex, valueIndex, userSelectedValue) => 
    {
        if(keyIndex === null) 
        {
            setDisplayWarning(true);
            setTimeout(() => {setDisplayWarning(null)}, 2000);
            return;
        }

        let thisArr = exampleArr[keyIndex];
        let indexes = getIndexes(thisArr);
        let secondIndex = getIndexes(thisArr)[1];
        let actualValue = thisArr[secondIndex];

        if(userSelectedValue === actualValue)
        {
            const newCompareeBtns = [...disabledCompareeBtns];
            newCompareeBtns[keyIndex] = true;
            setDisabledCompareeBtns(newCompareeBtns);

            const newSolutionsBtns = [...disabledSolutionsBtns];
            newSolutionsBtns[valueIndex] = true;
            setDisabledSolutionsBtns(newSolutionsBtns);
            setDisplayResponse(true);
        }
        else
        {
            setDisplayResponse(false);
        }
        setLeftClickedIndex(null);
        setRightClickedIndex(null);
        
        setTimeout(() => {setDisplayResponse(null)}, 800);
    }

    //Updates user progression to parent component when all have been finished
    useEffect(()=>{if(displayResponse === null && allValuesTrue(disabledCompareeBtns)){props.onFinished(true); 
        setIsFinished(true);
        setTimeout(() => {setDisplayResponse(true)}, 800);
 }},[displayResponse])


    
    return (
        <>
            <h2 className={classes.title}>{props.moduleTitle}</h2>
            <div className={classes.subTitles}>
                <h2>{props.lessonTitle} Practice Quiz</h2>
                <h4>{props.lessonData.intro}</h4>
            </div>



            <div className={classes.mainContainer}>
                <h2>Select any word/term and from the left and click its solution on the right</h2>

                <div className={classes.examplesContainer}>
                    <ul className={classes.compareesContainer}>{examplePairs[0].map((exampleString,index)=>(<li key={index}><button onClick={() => setLeftClickedIndex(index === leftClickedIndex ? null : index)} className={leftClickedIndex === index ? classes.selectedBtn : 'black' } disabled={disabledCompareeBtns[index]}>{exampleString}</button></li>))}</ul>
                    <ul className={classes.solutionsContainer}>{examplePairs[1].map((exampleString,index)=>(<li key={index}><button value={exampleString} onClick={(e) => {setRightClickedIndex(index === rightClickedIndex ? null : index); handleUserChoiceBtn(leftClickedIndex, index, e.target.value)}} className={'black'} disabled={disabledSolutionsBtns[index]} >{exampleString}</button></li>))}</ul>
                </div>
            </div>


            {
                (displayWarning != null || displayResponse != null) &&  

                <div className={classes.responseContainer}>
                    <div className={classes.response}>
                        <>{!isFinished && displayResponse != null && (displayResponse === true ? <h2 className={classes.rightAnswer}>Correct!</h2> : <h2 className={classes.wrongAnswer}>Incorrect. Try Again.</h2>)}</>
                        <>{displayWarning != null && (<h2 className={classes.warning}>Select from the left column first, then select it's answer from the left column</h2>)}</>
                        <>{isFinished && 
                            <>
                                <h3 className={classes.finishedResponse}>You are finished!</h3>
                                <button 
                                    className={ isFinished ? classes.returnBtn : classes.disabledReturnBtn} 
                                    onClick={()=>{props.onReturnToCheckPointSelection()}}
                                    disabled={!isFinished}
                                    >Return to Checkpoint Selection
                                </button>   
                            </>
                        }</>
                    </div>
                </div>
            }
            
   
            {/* <>{allValuesTrue(disabledCompareeBtns) && <h2>You are Finished !<button onClick={()=>{props.onReturnToCheckPointSelection()}}>Return to Checkpoint Selection</button></h2>}</> */}
            
        </>
    );

}

export default Matching;