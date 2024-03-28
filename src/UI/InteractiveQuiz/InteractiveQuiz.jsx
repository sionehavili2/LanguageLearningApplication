
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

    useEffect(()=>
    {
        //If BOTH key and value are selected
        if(keyIndex !== null && valIndex !== null)
        {
            console.log("BOTH Key AND Value are SELECTED");

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
            else
            {
                console.log("Youll need to extract data...")

            }



            //N. Cleanup
            setKeyIndex(null);
            setValIndex(null);
            console.log("Key and Val RESET...");
        }
        //If ONLY key index is selected
        else if (keyIndex !== null)
        {            
            //A. Check if there is anything in keyIndex position (If there is, we must return it and update value btns.
            const isKeyPositionEmpty = disableKeys[keyIndex] === false ? true : false;

            if(isKeyPositionEmpty)
            {
                console.log("key position is empty");
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

            }
            setKeyIndex(null);
        }

    },[keyIndex,valIndex]);

    return (
    <>
        {keys.map((stringVal, index)=>
        (
            <li key={index}>
                <>{stringVal}</>
                <button onClick={()=>{setKeyIndex(index)}}>
                    <>{disableKeys[index] === false ? "Empty" : disableKeys[index]}</>
                </button>
            </li>
        ))}


        {displayValues.map((stringVal, index)=>
        (
            <li key={index}>
                <button
                    disabled={disableVals[index]}
                    onClick={()=>{setValIndex(index)}}
                >
                    <>{stringVal}</>
                </button>
            </li>
        ))}

    </>);

};


export default InteractiveQuiz;






