import { useState, useEffect } from "react";
import classes from "./StringDisplayCard.module.css";

const StringDisplayCard = (props) => 
{

    let displayThis;
    if(Array.isArray(props.string)) 
    {
        const arraySize = props.string.length;
        console.log(props.string);
        
        console.log("..............     ");
        console.log(props.string[0]);
        // displayThis = props.string.map((stringVal, index)=><li key={index}>{stringVal}</li>)
        displayThis = props.string.map((stringArray, index) => (
                <li key={index}>{stringArray} </li>

        ));

    }
    else 
    {   
        displayThis = props.string;
    }


    return (
        <>
            <div>String display card...</div>
            <ul className={classes.cardContainer}>{displayThis}</ul>
            <div> 'ā': {'\u0101'}</div>
        </>
    );
}

export default StringDisplayCard;
