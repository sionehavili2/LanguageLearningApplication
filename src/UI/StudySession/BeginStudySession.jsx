import ExampleUI from "./Example/ExampleUI.jsx";
import Flashcard from "./Flashcard/Flashcard.jsx";
import TrueFalseUI from "./TrueFalse/TrueFalseUI.jsx";
import MultipleChoiceUI from "./MultipleChoice/MultipleChoiceUI.jsx";
import Matching from "../Matching/Matching.jsx";

const BeginStudySession = (props) => 
{
    console.log(props);
    switch(props.selectedIndex)
    {
        case 0 : return <ExampleUI {...props} onFinished={()=>{props.onCompletedSession(0)}}/>
        case 1 : return <TrueFalseUI {...props} onFinished={()=>{props.onCompletedSession(1)}} onDNF={()=>{props.onCompletedSession(-1)}}/>
        case 2 : return <MultipleChoiceUI {...props} onFinished={()=>{props.onCompletedSession(2)}} onDNF={()=>{props.onCompletedSession(-1)}}/>
        case 3 : return <Matching {...props} onFinished={()=>{props.onCompletedSession(3)}}/>
        case 4 : return <Flashcard {...props} onFinished={()=>{props.onCompletedSession(4)}}/>
        case 5 : return <div>Quiz Master still needs to be finished...</div>
        case 6 : return <div>Memory MiniGame needs to be finished...</div>
        default : return <div>BeginStudySession.jsx error...</div>
    }
};

export default BeginStudySession;