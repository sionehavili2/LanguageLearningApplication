import React, { useState } from "react";
import "./Section.module.css";
import classes from "./Section.module.css";
import { Link } from "react-router-dom";
import { clearIndexedDbPersistence } from "firebase/firestore";

const Section = ({sectionNumber, title, subSections, isOpen, toggleSection, onUserSelected,}) => 
{
  const arrow = "&#9650;";
  const displaySubSections = subSections.map((str, index) => (<li key={index}><button onClick={()=>onUserSelected(index)}>{str}</button></li>));
  
  return (
    <>
      <div className={isOpen ? classes.sectionHeaderOpen : classes.sectionHeader} onClick={toggleSection}>
        <div>{"Module " + sectionNumber + " : " +title}</div> 
        <span className={isOpen ? classes.arrowOpen : classes.arrow}>{isOpen ? <>&#128899;</> : <>&#128898;</>}</span>
      </div>

      <div className={isOpen ? classes.sectionOpen : classes.section}>
        <div className={classes.sectionContent}>
          <ol>{displaySubSections}</ol>
        </div>
      </div>
    </>
  );
  
};

export default Section;