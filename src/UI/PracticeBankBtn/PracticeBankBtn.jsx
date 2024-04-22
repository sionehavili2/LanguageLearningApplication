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
            let keys = props.practiceBank.keys;
            let values = props.practiceBank.values;

            let exampleKey = props.currentExample[0];
            let exampleValue = props.currentExample[1];

            setIsAdded(false);
            for(let i = 0; i < keys.length; i++)
            {
                if(exampleKey === keys[i] && exampleValue === values[i])
                {
                    setIsAdded(true);
                }
            }
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