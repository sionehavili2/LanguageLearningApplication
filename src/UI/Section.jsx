import React, { useState } from "react";
import "./Section.module.css";
import classes from "./Section.module.css";

const Section = ({sectionNumber, title, content, isOpen, toggleSection }) => 
{
  const arrow = "&#9650;";

  const displaySubSections = content.map((str, index) => (<li key={index}>{str}</li>));
  
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