import classes from "./MultipleChoiceUI.module.css";
import { useState, useEffect, useSyncExternalStore } from "react";
import { getRandomInt } from "../../../computeFunctions";
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
    const [questionSolutions, setQuestionSolutions] = useState(null);
    const [displayExamples, setDisplayExamples] = useState(setupMultipleChoice(exampleArr, exampleIndex));
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {setSelectedOption(event.target.value)};

    useEffect(()=>
    {
        console.log(displayExamples);
        let comparee = displayExamples[0];
        let solution = displayExamples[1];
        let AllSolutions = displayExamples.slice(1);
        const shuffledSolutions = shuffle(AllSolutions);
        console.log(shuffledSolutions);
        setQuestionSolutions(shuffledSolutions);

    },[displayExamples]);

    return (
        <div>
        
            <h2>MultipeChoiceUI Component</h2>
            <h2>Module Title : {props.moduleTitle}</h2>
            <h3>Lesson Title : {props.lessonTitle}</h3>
            <h4>Intro : {props.lessonData.intro}</h4>

            <h4>Multiple choice. Please select the correct Translation</h4>

            <div className={classes.mainContainer}>

                <>{questionSolutions && questionSolutions.map((singleSolution,index) => (<li key={index}><button>{singleSolution}</button></li>))}</>
   

            </div>

            <p>Selected option: {selectedOption}</p>
            <div>{exampleIndex + 1}/{exampleArr.length}</div>
        </div>

        /* 


        <form>
            <label>
                <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={handleOptionChange}/>
                <>Option 1</>
            </label>

            <br />

            <label>
                <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={handleOptionChange}/>
                <>Option 2</>
            </label>
            
        </form>
        */
    );
    }

export default MultipleChoiceUI;