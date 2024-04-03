import React, { useState } from "react";
import "./Section.module.css";
import classes from "./Section.module.css";
import { Link } from "react-router-dom";
import CheckpointUI from "../Checkpoint/CheckpointUI";
import SectionsCompletedCounter from "./SectionsCompletedCounter/SectionsCompletedCounter";

const Section = ({progression, sectionNumber, title, subSections, isOpen, toggleSection, onUserSelected,}) => 
{

  const displaySubSections = subSections.map((str, index) => (
  
    <li className={classes.listItem} key={index}>
      <button className={classes.btn} onClick={()=>onUserSelected(index)}>
        <Link to="/Dashboard/StudySession">{str}</Link>
        <SectionsCompletedCounter progressData={progression[index].exercisesFinished}/>
      </button>
      
    </li>));
  
  return (
    <>
      <div className={isOpen ? classes.sectionHeaderOpen : classes.sectionHeader} onClick={toggleSection}>
        <div>{"Module " + sectionNumber + " : " +title}</div> 
        <span className={isOpen ? classes.arrowOpen : classes.arrow}>{isOpen ? <>&#128899;</> : <>&#128898;</>}</span>
      </div>
      <div className={isOpen ? classes.sectionOpen : classes.section}>
        <div className={classes.sectionContent}>
          <ol className={classes.list}>{displaySubSections}</ol>
        </div>
      </div>
    </>
  );
  
};

export default Section;