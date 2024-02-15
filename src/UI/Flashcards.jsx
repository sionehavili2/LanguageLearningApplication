import { count } from "firebase/firestore";
import classes from "./Flashcards.module.css"
import { useState, useEffect } from "react";

const Flashcards = (props) => 
{

    const [arrayIndex, setArrayIndex] = useState(0);
    const exampleArray = props.exampleArray;
    const arrayLength = props.exampleArray.length;
    const displayInfo = exampleArray[arrayIndex].map((string, index) => (<li key={index}>{string}</li>))
    
    return (
        <div className={classes.mainContainer}>
            <ul className={classes.unorderedList}>{displayInfo}
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1)}} disabled={arrayIndex <= 0}>Previous Example</button>
                <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1)}}  disabled={arrayIndex >= arrayLength - 1}>Next Example</button>
            </ul>
        </div>
    )

}

export default Flashcards;