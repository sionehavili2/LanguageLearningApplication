import classes from "./MultipleChoiceUI.module.css";
import { useState, useEffect } from "react";
import  shuffle  from "lodash/shuffle";

function setupMultipleChoice (allExamples, allExamplesIndex) 
{
    if(allExamples.length < 4) alert("ERROR! [MultipileChoiceUI.jsx] function setupMultipleChoice() has receieved an example array that is less than length4");
    
    //1. Start by retrieving the target word and its defintion.
    let singleExampleArr = [...allExamples[allExamplesIndex]];

    //2. Sets index (for answers) based on length
    let secondIndex;
    if (singleExampleArr.length === 2) { secondIndex = 1;}
    else if(singleExampleArr.length === 3){ secondIndex = 2;}
    else console.log("Error! [TrueFalseUI.jsx] function setupTrueFalse() has an array length it was not expecting : " + singleExampleArr.length);

    // //Retrieves 3 other possible answers
    let currentIndex = allExamplesIndex;
    while(singleExampleArr.length < 5)
    {
        currentIndex < allExamples.length - 1 ? currentIndex++ : currentIndex = 0;
        let newVal = allExamples[currentIndex];
        singleExampleArr.push(newVal[secondIndex])
    }
    return [...singleExampleArr];
}

const MultipleChoiceUI = (props) => 
{
    const [exampleIndex, setExampleIndex] = useState(0);
    const [exampleArr] = useState(props.lessonData.examples);
    const [allSolutions, setAllSolutions] = useState(null);
    const [comparee, setComparee] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(null);
    const [examples, setExamples] = useState(setupMultipleChoice(exampleArr, exampleIndex));

    function handleNextQuestion()
    {
        let newIndex = exampleIndex + 1;
        setExampleIndex(newIndex);
        setAllSolutions(null);
        setComparee(null);
        setAnswer(null);
        setResult(null);
        setExamples(setupMultipleChoice(exampleArr, newIndex));
    }

    useEffect(()=>
    {
        setComparee(examples[0]);
        setAnswer(examples[1]);
        setAllSolutions(shuffle(examples.slice(1)));
    },[examples]);

    return (
        <div>
            <h2>MultipeChoiceUI Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>
            <div>Result: {result}</div>
            <h3>Multiple choice. Please select the correct translation for : {comparee}</h3>
            <div className={classes.mainContainer}>

                <>{allSolutions && allSolutions.map((singleSolution,index) => (<li key={index}><button value={singleSolution} onClick={(e)=>{setResult(answer === e.target.value ? true : false)}} disabled={result != null}>{singleSolution}</button></li>))}</>
                

            </div>
            <>{result != null && (result === true ? <div className={classes.rightAnswer}>"Correct!"</div> : <div className={classes.wrongAnswer}>"Incorrect. Correct answer is :"{answer}</div>)}</>
            <>{result != null && <button onClick={handleNextQuestion}>Next Question</button>}</> 
            <div>{exampleIndex + 1}/{exampleArr.length}</div>
        </div>
    );
}

export default MultipleChoiceUI;