import ExampleUI from "../StudySession/Example/ExampleUI.jsx";
import Flashcard from "../StudySession/Flashcard/Flashcard.jsx";
import TrueFalseUI from "../StudySession/TrueFalse/TrueFalseUI.jsx";
import MultipleChoiceUI from "../StudySession/MultipleChoice/MultipleChoiceUI.jsx";
import Matching from "../Matching/Matching.jsx";
import InteractiveQuiz from "../InteractiveQuiz/InteractiveQuiz.jsx";
import MemoryGame from "../../UI/StudySession/MemoryGame/MemoryGame.jsx";

const CustomStudySession = (props) => 
{
    switch(props.selectedIndex)
    {
        case 0 : return <ExampleUI {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        case 1 : return <TrueFalseUI {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        case 2 : return <Flashcard {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        case 3 : return <MultipleChoiceUI {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        case 4 : return <Matching {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        case 5 : return <InteractiveQuiz {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}} />
        case 6 : return <MemoryGame {...props} onFinished={(isFinished)=>{props.onSessionOver(isFinished ? props.selectedIndex : -1)}}/>
        default : return <div>BeginStudySession.jsx error...</div>
    };
};

export default CustomStudySession;