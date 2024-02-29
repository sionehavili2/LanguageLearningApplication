import ExampleUI from "./ExampleUI.jsx";
import Flashcard from "./Flashcard.jsx";

import classes from "./StudySession.module.css";

const StudySession = (props) => 
{

    return (
        <>
            <div className={classes.mainContainer}>
                    
                    <>
                        <ExampleUI lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]}/>
                    </>

            </div>
            <div className={classes.mainContainer}>
                    
                    <>
                        <Flashcard lessonIndex={props.lessonIndex}  currentModuleData={props.moduleData[props.moduleIndex]}/>
                    </>

            </div>
        </>
       
    );
}

export default StudySession;