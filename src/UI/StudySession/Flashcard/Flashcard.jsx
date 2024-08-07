import React, { useState, useEffect } from 'react';
import classes from "./Flashcard.module.css";
import PracticeBankBtn from '../../PracticeBankBtn/PracticeBankBtn';

function getSides(exampleArray) {
  let side1 = null;
  let side2 = null;

  side1 = (<li>{exampleArray[0]}</li>);
  side2 = (<li>{exampleArray[1]}</li>);

  return [side1, side2];
}

const Flashcard = (props) => {
  const [exampleArrayIndex, setArrayIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const[isDismissed, setIsDismissed] = useState(false);

  const exampleArr = props.lessonData.examples;
  const exampleArrLength = props.lessonData.examples.length;
  console.log(props.lessonData.examples[exampleArrayIndex])
  const sidesOfCard = getSides(props.lessonData.examples[exampleArrayIndex]);

  useEffect(() => {
    if ((exampleArrayIndex + 1) === exampleArr.length) {
      setIsFinished(true);
      props.onFinished(true);
    }
  }, [exampleArrayIndex]);

    useEffect(()=>{
      if(isFinished)
      {
          setIsDismissed(false);
          const timer = setTimeout(() => {setIsDismissed(true)}, 2000);
      }
      
  },[isFinished]);

  const handleFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handlePrevious = () => {
    setArrayIndex(prevIndex => prevIndex - 1);
  };

  const handleNext = () => {
    setArrayIndex(prevIndex => prevIndex + 1);
  };

  return (
    <>
      
      <div className={classes.mainContainer}>

        <div className={classes.flashcardContainer}>

            <div>{
                isFinished && !isDismissed &&
                <div className={classes.responseContainer}>
                    <h2 className={classes.finishedResponse}>
                        {props.lessonTitle} Flashcard Review has been completed!
                    </h2>
                </div>
            }</div>
            
            <div className={classes.exampleCounter}>Flashcard {exampleArrayIndex + 1}/{exampleArr.length}</div>
            <ul className={`${classes.unorderedList} ${classes.card} ${isCardFlipped ? classes.flipped : classes.notFlipped}`}>
            <li className={classes.cardFront}><h1>{sidesOfCard[0]}</h1></li>
            <li className={classes.cardBack}><h1>{sidesOfCard[1]}</h1></li>
            
            </ul>
            <button className={isCardFlipped ? classes.flipBtnBack : classes.flipBtnFront} onClick={handleFlip}>Flip</button>
            <div>{(sidesOfCard && props.isPracticeBankOn === true) && <PracticeBankBtn practiceBank={props.practiceBank} handleOnClick={()=>{props.onAddToPracticeBank(sidesOfCard);}} currentExample={exampleArr[exampleArrayIndex]}/>}</div>
            
        </div>

        <div className={classes.allBtns}>
            <button onClick={handlePrevious} disabled={exampleArrayIndex <= 0}><>&#8592;</> Previous</button>
            <button onClick={handleNext} disabled={exampleArrayIndex >= exampleArrLength - 1}>Next <>&#8594;</></button>
        </div>



      </div>



      <>
        <button 
          className={ isFinished ? classes.returnBtn : classes.disabledReturnBtn} 
          onClick={() => { props.onReturnToCheckPointSelection() }}
          disabled={!isFinished}
          >Return to Checkpoint Selection</button>
      </>
    </>
  );
}

export default Flashcard;

// const Flashcard = (props) => {
//   const [exampleArrayIndex, setArrayIndex] = useState(0);
//   const [isCardFlipped, setIsCardFlipped] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);

//   const exampleArr = props.lessonData.examples;
//   const exampleArrLength = props.lessonData.examples.length;

//   const sidesOfCard = getSides(props.lessonData.examples[exampleArrayIndex]);

//   useEffect(() => {
//     if ((exampleArrayIndex + 1) === exampleArr.length) {
//       setIsFinished(true);
//       props.onFinished(true);
//     }
//   }, [exampleArrayIndex]);

//   return (
//     <>
//       <h2>Flashcard Component</h2>
//       <h2>Module Title : {props.moduleTitle}</h2>
//       <h3>Lesson Title : {props.lessonTitle}</h3>
//       <h4>Intro : {props.lessonData.intro}</h4>

//       <div className={classes.mainContainer}>
//         <ul className={`${classes.unorderedList} ${classes.card} ${isCardFlipped ? classes.flipped : ''}`}>
//           <li className={classes.cardFront}>{sidesOfCard[0]}</li>
//           <li className={classes.cardBack}>{sidesOfCard[1]}</li>
//           <button onClick={() => { setIsCardFlipped(!isCardFlipped) }}>Flip</button>
//         </ul>
//         <div className={classes.exampleCounter}>Flashcard {exampleArrayIndex + 1}/{exampleArr.length}</div>
//         <button onClick={() => { setArrayIndex(currentIndex => currentIndex - 1); setIsCardFlipped(false); }} disabled={exampleArrayIndex <= 0}>Previous Flashcard</button>
//         <button onClick={() => { setArrayIndex(currentIndex => currentIndex + 1); setIsCardFlipped(false); }} disabled={exampleArrayIndex >= exampleArrLength - 1}>Next Flashcard</button>
//         <>{isFinished && <h2>You are Finished !<button onClick={() => { props.onReturnToCheckPointSelection() }}>Return to Checkpoint Selection</button></h2>}</>
//       </div>

//     </>
//   );

// }

//export default Flashcard;


// import classes from "./Flashcard.module.css"
// import { useState,useEffect } from "react";

// function getSides ( exampleArray ) 
// {
//     let side1 = null;
//     let side2 = null;
//     if(exampleArray.length === 3) 
//     {
//         side1 = (<><li>{exampleArray[0]}</li><li>{exampleArray[1]}</li></>);
//         side2 = (<><li>{exampleArray[0]}</li><li>{exampleArray[2]}</li></>);

//     }
//     else if (exampleArray.length === 2)
//     {

//         side1 = (<li>{exampleArray[0]}</li>);
//         side2 = (<li>{exampleArray[1]}</li>);
//     }
//     else console.log("getSides() function errror: Array length does not match any expected sizes");

//     return [side1, side2];
// }

// const Flashcard = (props) => 
// {
//     const [exampleArrayIndex, setArrayIndex] = useState(0);
//     const [isCardFront, setIsCardFront] = useState(false);
//     const [isFinished, setIsFinished] = useState(false);

//     const exampleArr = props.lessonData.examples;
//     const exampleArrLength  = props.lessonData.examples.length;

//     const sidesOfCard = getSides(props.lessonData.examples[exampleArrayIndex]);

//         useEffect(()=>{ if((exampleArrayIndex + 1) === exampleArr.length){setIsFinished(true);props.onFinished(true);}},[exampleArrayIndex]);

//     return (
//         <>
//             <h2>Flashcard Component</h2>
//             <h2>Module Title : {props.moduleTitle}</h2>
//             <h3>Lesson Title : {props.lessonTitle}</h3>
//             <h4>Intro : {props.lessonData.intro}</h4>

//             <div className={classes.mainContainer}>
//                 <ul className={classes.unorderedList}>
//                     {isCardFront === false ? sidesOfCard[0] : sidesOfCard[1]}
//                     <button onClick={()=>{setIsCardFront(isCardFront === true ? false : true)}}>Flip To {isCardFront ? "Front" : "Back"} of Card</button>
//                 </ul>
//                 <div className={classes.exampleCounter}>Flashcard {exampleArrayIndex + 1}/{exampleArr.length}</div>
//                 <button onClick={()=>{setArrayIndex(currentIndex => currentIndex - 1); setIsCardFront(false);}} disabled={exampleArrayIndex <= 0}>Previous Flashcard</button>
//                 <button onClick={()=>{setArrayIndex(currentIndex => currentIndex + 1); setIsCardFront(false);}}  disabled={exampleArrayIndex >= exampleArrLength - 1}>Next Flashcard</button>
//                 <>{isFinished &&  <h2>You are Finished !<button onClick={()=>{props.onReturnToCheckPointSelection()}}>Return to Checkpoint Selection</button></h2>}</>
//             </div>
            
//         </>
//     );

// }

// export default Flashcard;