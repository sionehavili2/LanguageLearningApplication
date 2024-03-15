import ExampleUI from "./Example/ExampleUI.jsx";
import Flashcard from "./Flashcard/Flashcard.jsx";
import TrueFalseUI from "./TrueFalse/TrueFalseUI.jsx";
import MultipleChoiceUI from "./MultipleChoice/MultipleChoiceUI.jsx";
import Matching from "../Matching/Matching.jsx";

const BeginStudySession = (props) => 
{
    switch(props.selectedIndex)
    {
        case 0 : return <ExampleUI {...props}/>
        case 1 : return <TrueFalseUI {...props}/>
        case 2 : return <MultipleChoiceUI {...props}/>
        case 3 : return <Matching {...props}/>
        case 4 : return <Flashcard {...props}/>
        case 5 : return <div>Quiz Master still needs to be finished...</div>
        case 6 : return <div>Memory MiniGame needs to be finished...</div>
        default : return <div>BeginStudySession.jsx error...</div>
    }
};

export default BeginStudySession;