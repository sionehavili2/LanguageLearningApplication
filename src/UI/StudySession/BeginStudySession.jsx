import ExampleUI from "./Example/ExampleUI.jsx";
import Flashcard from "./Flashcard/Flashcard.jsx";
import TrueFalseUI from "./TrueFalse/TrueFalseUI.jsx";
import MultipleChoiceUI from "./MultipleChoice/MultipleChoiceUI.jsx";
import Matching from "../Matching/Matching.jsx";
import InteractiveQuiz from "../InteractiveQuiz/InteractiveQuiz.jsx";



const BeginStudySession = (props) => 
{
    // console.log(props);
    switch(props.selectedIndex)
    {
        case 0 : return <ExampleUI {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 1 : return <TrueFalseUI {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 2 : return <Flashcard {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 3 : return <MultipleChoiceUI {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 4 : return <Matching {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 5 : return <InteractiveQuiz {...props} onFinished={(isFinished)=>{props.onCompletedSession(isFinished ? props.selectedIndex : -1)}}/>
        case 6 : return <div>Memory MiniGame needs to be finished...</div>
        default : return <div>BeginStudySession.jsx error...</div>
    }
};

export default BeginStudySession;