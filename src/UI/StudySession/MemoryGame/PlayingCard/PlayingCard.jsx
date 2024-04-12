import "./PlayingCard.css"
import { useState, useEffect } from "react";

const PlayingCard = (props) => {

  const [isFlipped, setIsFlipped] = useState(false);


  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={()=>{setIsFlipped(!isFlipped); console.log(props.indexValue)}} value={props.indexValue}>
      <div className="front"></div>
      <div className="back">{props.backText ? props.backText : "EMPTY"}</div>
    </div>
  );
}

export default PlayingCard;