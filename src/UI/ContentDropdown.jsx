import { useState } from "react";
import Section from "./Section";
import classes from "./ContentDropdown.module.css";

//Importing Data Modules
import Module0 from "../ModuleData/Module0";
import Module1 from "../ModuleData/Module1";

const allModules = [Module0,Module1];

const ContentDropdown = (props) =>
{   
  console.log(allModules);
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
      return prevOpenSections.length === props.displayContent.length ? [] : Array.from({ length: props.displayContent.length }, (_, i) => i);
    });
  };

  /* Map all modules.  */
  return (
    <div>
      <button onClick={()=>{props.onUserSelection(3)}}>CLICK BUTTON</button>

      <div className={classes.titleContainer}>
        <h2>Modules</h2>
        <button className={classes.button} onClick={toggleAllSections}>{openSections.length === props.displayContent.length ? "Collapse All": "Expand All"}</button>
      </div>

      <>
      
        {allModules.map((module, index) => (
          <Section
            key={index}
            sectionNumber={index}
            subSections={module.lessonTitles}
            title={module.moduleTitle}
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