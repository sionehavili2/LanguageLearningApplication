import { useState, useEffect } from "react";
import  shuffle  from "lodash/shuffle";
import classes from "./MemoryGame.module.css";
import PlayingCard from "./PlayingCard/PlayingCard.jsx"

//checks the offset within the moduleData to use the proper index
function getIndexValues(singleExampleArr)
{

    let firstIndex, secondIndex;
    if (singleExampleArr.length === 2)
    {
        firstIndex = 0;
        secondIndex = 1;
    }
    else if(singleExampleArr.length === 3)
    {
        firstIndex = 1;
        secondIndex = 2;
    }
    else console.log("Error! function has an array length it was not expecting : " + singleExampleArr.length + "\nReceived VAl: " + singleExampleArr);
    
    return [firstIndex, secondIndex];
}

function initializeDeck(exampleArray)
{
    //get proper indexes
    let indexes = getIndexValues(exampleArray[0]);
    let firstIndex = indexes[0];
    let secondIndex = indexes[1];


    let returnDeck = [];
    let matchIndex = 0;
    
    exampleArray.forEach(element => 
    {
        //extract card info
        let cardInfo = [];
        cardInfo.push(matchIndex);
        cardInfo.push(element[firstIndex]);

        //extract matching card info
        let matchingCardInfo = [];
        matchingCardInfo.push(matchIndex);
        matchingCardInfo.push(element[secondIndex]);

        //add both to deck
        returnDeck.push(cardInfo);
        returnDeck.push(matchingCardInfo);

        //increment match index
        matchIndex++;
    });

    return shuffle(returnDeck);
}


const MemoryGame = (props) => 
{
    const totalMatches = props.lessonData.examples.length;
    const [matchCount, setMatchCount] = useState(0);
    const [deckState ,setDeckState] = useState(Array(props.lessonData.examples.length * 2).fill(false));
    const [deck, setDeck] = useState(initializeDeck(props.lessonData.examples));
    const [userSelect, setUserSelect] = useState(null);
    const [displayFeedback, setDisplayFeedback] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    function handleSelected(index, matchIndex) 
    {
        //update that card to be flipped
        deckState[index] = true;
        setDeckState([...deckState]);

        //if no previous card has been selected, this is the first card
        if(userSelect === null)
        {
            // console.log("1st card selected. setting to userselect");
            setUserSelect([index,matchIndex]);
        }
        //else another card has already been selected you are ready to compare
        else
        {
            // console.log("2nd card selected READY TO COMPARE");

            let firstIndex = userSelect[0];
            let firstMatchIndex = userSelect[1];
            //if match is correct, set cards to null (empty)
            if(firstMatchIndex === matchIndex)
            {
                // console.log("CORRECT MATCH!!!");

                deckState[index] = null;
                deckState[firstIndex] = null;
                //display userfeedback (true = display will show user was correct)
                setDisplayFeedback(true);
                //increment match count
                setMatchCount(currentCount => currentCount+1);
            }
            //else if match is incorrect set cards to false (unflip)
            else
            {
                // console.log("incorrect match!....");
                deckState[index] = false;
                deckState[firstIndex] = false;
                //false = display will show user isincorrect
                setDisplayFeedback(false);
            }
            //reset user selected
            setUserSelect(null);
            //time to remove display and update cards
            setTimeout(() => {setDisplayFeedback(null); setDeckState([...deckState]);}, 1000);
        }
    }
    
    useEffect(()=>
    {
        if(matchCount === totalMatches)
        {
            props.onFinished(true);
            setTimeout(() => {setIsFinished(true);}, 1100);
        }
    },[matchCount])

    return (
        <div className={classes.container}>

            <h4>{"Play a game of Memory! Select a card and its translation"}</h4>
            <div className={classes.quizContainer}></div>

            <div>Matches {matchCount} / {totalMatches}</div>

            <div className={classes.mainContainer}>
                {isFinished === true && (
                    <div className={classes.feedbackContainer}>
                        <div className={classes.goodFeedback}>
                                <div>You are Finished!</div>
                             <button className={classes.returnBtn} onClick={()=>{props.onReturnToCheckPointSelection()}}>Return to checkpoint selection</button>
                        </div>
                                           
                    </div>)}
                {displayFeedback === true && (<div className={classes.feedbackContainer}><div className={classes.goodFeedback}>Correct Match!</div></div>)}
                {displayFeedback === false && (<div className={classes.feedbackContainer}><div className={classes.badFeedback}>No Match...</div></div>)}
        
                <>{deck.map((cardArray, index) => (<PlayingCard key={index} keyIndex={index} matchIndex={cardArray[0]} displayText={cardArray[1]} isFlipped={deckState[index]} onSelected={(index,matchIndex)=>{handleSelected(index,matchIndex)}} />))}</>
            </div>

        </div>
    );
}

export default MemoryGame;