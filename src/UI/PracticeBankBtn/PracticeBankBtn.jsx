import classes from "./PracticeBankBtn.module.css";
import { useState, useEffect } from "react";

const PracticeBankBtn = (props) => 
{
    const [isAdded, setIsAdded] = useState(false);
    const [isRemoveBtn, setIsRemoveBtn] = useState(false);
        
    useEffect(()=>
    {
        if(props.practiceBank)
        {
            console.log(exampleKey);
            console.log(keys[i]);
            console.log("-----")
            console.log(exampleValue);
            console.log(values[i]);
            
            if(exampleKey === keys[i] && exampleValue === values[i])
            {
        
                setIsAdded(true);
                console.log("it is already here!");
            }
            console.log("is added is " + (isAdded ? "true" : "false"));
        }
        else{setIsRemoveBtn(true)}
    },[props.currentExample]);

    return( 
        <>
        {
            isRemoveBtn === true 
            ?
                <button 
                    className={classes.removeBtn}
                    onClick={(exampleToRemove)=>{props.handleRemoveFromPracticebank(exampleToRemove)}}
                >
                    Remove From Practice Bank
                </button>
            :
                <button 
                    {...props} 
                    onClick={()=>{props.handleOnClick(props.exampleValue); setIsAdded(true)}} 
                    className={isAdded ? classes.isAdded : classes.isNotAdded}
                    disabled={isAdded}
                >
                    {isAdded ? "Added to Bank" : "Add to Personal Practice Bank"}
                </button>
        }
        </>
    );
}

export default PracticeBankBtn;7