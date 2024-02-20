import Flashcards from "./Flashcards";

const StudySession = (props) => 
{

    return (
       <>
        <h3>{props.moduleData.moduleTitle}</h3>
        <h4>{props.moduleData.lessons[props.lessonIndex].intro}</h4>
        <Flashcards exampleArray={props.moduleData.lessons[props.lessonIndex].examples}/>
       </>
    );
}

export default StudySession;