import classes from "./CheckpointUI.module.css";

const CheckpointUI = (props) => 
{
    const lessonNames = ["Introduction", "True or False Challenge", "Flashcard Review", "Multiple Choice Challenge", "Match Review", "Quiz Mastery", "Memory Mini Game"];
    return (
        <div className={classes.mainContainer}>
            <h3>Select a checkpoint to begin</h3>
            <ul>{props.progressData.map((isCompleted,index)=>(<li key={index}><button onClick={()=>{props.onSelectedCheckpoint(index)}} className={isCompleted ? classes.isCompleted : classes.isNotCompleted}>{index + 1}. {lessonNames[index]}</button></li>))}</ul>
        </div>
    );
}

export default CheckpointUI;