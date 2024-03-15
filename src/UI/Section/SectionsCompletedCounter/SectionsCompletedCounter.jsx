import classes from "./SectionsCompletedCounter.module.css";

const SectionsCompletedCounter = (props) => 
{
    // const isCompleted = props.progressData;
    // const excercisesData = props.progressData.learningExercises;
    // console.log(props.progressData);

    let finishedCount = 0;
    props.progressData.forEach(element => {if(element) finishedCount++;});
    // console.log(finishedCount);

    return (<div className={finishedCount === props.progressData.length ? classes.isCompleted : ""}>{finishedCount}/{props.progressData.length} Lessons Completed</div>);
}

export default SectionsCompletedCounter;