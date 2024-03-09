import classes from "./ProgressionUI.module.css";

const ProgressionUI = (props) => 
{
    const isCompleted = props.progressData;

    // const excercisesData = props.progressData.learningExercises;

    return (
    <div>
        <div className={props.progressData[0] && classes.isCompleted}>Introduction</div>
        <div className={props.progressData[1] && classes.isCompleted}>Challenge 1</div>
        <div className={props.progressData[2] && classes.isCompleted}>Challenge 2</div>
        <div className={props.progressData[3] && classes.isCompleted}>Challenge 3</div>
        <div className={props.progressData[4] && classes.isCompleted}>Review Practice</div>
        <div className={props.progressData[5] && classes.isCompleted}>Quiz Mastery</div>
        <div className={props.progressData[6] && classes.isCompleted}>Memory Mini Game</div>    
    </div>
    );
}

export default ProgressionUI;