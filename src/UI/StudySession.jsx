import Flashcards from "./Flashcards";
import classes from "./StudySession.module.css";

const StudySession = (props) => 
{

    return (
       <div className={classes.mainContainer}>
            
            <>
                <h2>Flashcard Component</h2>
                <h3>{props.moduleData.moduleTitle}</h3>
                <h4>{props.moduleData.lessons[props.lessonIndex].intro}</h4>
                <Flashcards exampleArray={props.moduleData.lessons[props.lessonIndex].examples}/>
            </>

       </div>
    );
}

export default StudySession;