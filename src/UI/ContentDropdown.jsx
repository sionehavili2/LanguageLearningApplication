import { useState } from "react";
import Section from "./Section";
import classes from "./ContentDropdown.module.css";


const ContentDropdown = (props) =>
{   
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (index) => {
      setOpenSections((prevOpenSections) => {
      const isOpen = prevOpenSections.includes(index);
      return isOpen
          ? prevOpenSections.filter((i) => i !== index)
          : [...prevOpenSections, index];
      });
  };

  const toggleAllSections = () => {
    setOpenSections((prevOpenSections) => {
      return prevOpenSections.length === props.moduleTitles.length ? [] : Array.from({ length: props.moduleTitles.length }, (_, i) => i);
    });
  };

  /* Map all modules.  */
  return (
    <div>

      <div className={classes.titleContainer}>
        <h2>Modules</h2>
        <button className={classes.button} onClick={toggleAllSections}>{openSections.length === props.moduleTitles.length ? "Collapse All": "Expand All"}</button>
      </div>

      <>
        {props.moduleTitles.map((titleString, index) => (
          <Section
            key={index}
            sectionNumber={index}
            subSections={props.lessonTitles[index]}
            title={titleString}
            isOpen={openSections.includes(index)}
            toggleSection={() => toggleSection(index)}
            onUserSelected={(indexValue) => props.onUserSelection(index,indexValue)}
          />
        ))}
      </>

    </div>
  );
}

export default ContentDropdown;