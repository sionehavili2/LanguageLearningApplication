import classes from "./TitleAndSection.module.css";

const TitleAndSection = (props) => 
{
    return (
        <>
            <h2 className={classes.title}>{props.moduleTitle}</h2>
            <div className={classes.subTitles}>
                <h2>{props.lessonTitle}</h2>
                <h4>{props.lessonData.intro}</h4>
            </div>
        </>
    );

}

export default TitleAndSection;