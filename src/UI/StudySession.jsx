import Flashcards from "./Flashcards";
import classes from "./StudySession.module.css";

const StudySession = (props) => 
{

    return (
       <div className={classes.mainContainer}>
            
            <>
                <Flashcards lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]}/>
            </>

       </div>
    );
}

export default StudySession;