import { useState, useEffect } from "react";
import classes from "./PlayingCard.module.css";
import { join } from "lodash";

const PlayingCard = (props) => {

  const [isFlipped , setIsFlipped] = useState();

  useEffect(()=>
  {

    if(props.isFlipped === true) {setIsFlipped(true); console.log("set flip to true..")}
    else if(props.isFlipped === false){setTimeout(() => {setIsFlipped(false)}, 500); console.log("set flip to false");}
    else if (props.isFlipped === null){setTimeout(() => {setIsFlipped(null)}, 500); console.log("set flip to empty(null)")}
  },[props.isFlipped]);

  return (
    <div className={classes.cardSpot}>
      {isFlipped === null && <div className={classes.noCard}>{props.displayText}</div>}
      {isFlipped === false && (<div onClick={()=>{props.onSelected(props.keyIndex, props.matchIndex)}} className={classes.cardFront}>{props.matchIndex}</div>)}
      {isFlipped === true && (<div className={classes.cardBack}>{props.displayText}</div>)}
    </div>
  );
};

export default PlayingCard;
