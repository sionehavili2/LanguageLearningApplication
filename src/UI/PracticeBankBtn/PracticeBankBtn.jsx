import classes from "./PracticeBankBtn.module.css";
import { useState, useEffect } from "react";

const PracticeBankBtn = (props) => 
{
    const [isAdded, setIsAdded] = useState(false);
        
    useEffect(()=>
    {
        let keys = props.practiceBank.keys;
        let values = props.practiceBank.values;

        let exampleKey = props.currentExample[0];
        let exampleValue = props.currentExample[1];

        setIsAdded(false);
        for(let i = 0; i < keys.length; i++)
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
    },[props.currentExample]);

    return( 
        <button 
            {...props} 
            onClick={()=>{props.handleOnClick(props.exampleValue); setIsAdded(true)}} 
            className={isAdded ? classes.isAdded : classes.isNotAdded}
            disabled={isAdded}
        >
            {isAdded ? "Added to Bank" : "Add to Personal Practice Bank"}
        </button>
    );
}

export default PracticeBankBtn;7