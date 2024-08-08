import { useState, useEffect } from "react";
import classes from "./PlayingCard.module.css";

const PlayingCard = (props) => {

  const [isFlipped , setIsFlipped] = useState();

  useEffect(()=>
  {
    if(props.isFlipped === true) {setIsFlipped(true);}
    else if(props.isFlipped === false){setTimeout(() => {setIsFlipped(false)}, 500);}
    else if (props.isFlipped === null){setTimeout(() => {setIsFlipped(null)}, 500);}
  },[props.isFlipped]);

  return (
    <div className={classes.cardSpot +" "+ `${classes.unorderedList} ${classes.card} ${isFlipped ? classes.flipped : classes.notFlipped}`}>
      {isFlipped === false && (<div onClick={()=>{props.onSelected(props.keyIndex, props.matchIndex)}} className={classes.cardFront}></div>)}
      {isFlipped === true && (<div className={classes.cardBack}>{props.displayText}</div>)}
      {isFlipped === null && <div className={classes.noCard}>{props.displayText}</div>}
    </div>
  );
};

export default PlayingCard;

            // <ul className={`${classes.unorderedList} ${classes.card} ${isCardFlipped ? classes.flipped : classes.notFlipped}`}>
            // <li className={classes.cardFront}><h1>{sidesOfCard[0]}</h1></li>
            // <li className={classes.cardBack}><h1>{sidesOfCard[1]}</h1></li>
            
            // </ul>

