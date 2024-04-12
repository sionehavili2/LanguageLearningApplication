import { useState, useEffect } from "react";
import  shuffle  from "lodash/shuffle";
import classes from "./MemoryGame.module.css";
import PlayingCard from "./PlayingCard/PlayingCard.jsx"

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

function getCardDeck(exampleArray) 
{
    console.log(exampleArray)
    let indexes = getIndexValues(exampleArray[0]);
    let firstIndex = indexes[0];
    let secondIndex = indexes[1];

    let allCards = [];
    let currIndex = 0;

    exampleArray.forEach(element => 
    {
        console.log("index: " + currIndex);
        console.log(element[firstIndex]);
        console.log(element[secondIndex]);


        //Push a playing card on
        allCards.push(<PlayingCard indexValue={currIndex} backText={element[firstIndex]}/>)
        //Push its matching Valud on as well
        allCards.push(<PlayingCard indexValue={currIndex} backText={element[secondIndex]}/>)

        currIndex++;
    });

    return (shuffle([...allCards]))
}

const MemoryGame = (props) => 
{
    // const [examples] = useState(shuffle(props.lessonData.examples));
    const [cardIndex1, setCardIndex1] = useState(null);
    const [cardIndex2, setCardIndex2] = useState(null);

    const onSelectCard = (cardIndex) => 
    {
        if(cardIndex1 === null)
            setCardIndex1(cardIndex);
        else if(cardIndex2 === null)
            setCardIndex2(cardIndex);
        else
        {
            console.log("2 cards are already selected...")
        }

    };

    const cardDeck = getCardDeck(props.lessonData.examples, onSelectCard);

    return (
        <>
            <div className={classes.mainContainer}>{cardDeck}</div>
        </>
    );
}

export default MemoryGame;