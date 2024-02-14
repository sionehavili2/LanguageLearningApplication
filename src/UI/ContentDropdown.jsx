import { useState } from "react";
import Section from "./Section";
import classes from "./ContentDropdown.module.css";

const ContentDropdown = () =>
{
    const testData = 
    [
        {
          title: "Basic Fundamentals",
          subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
          content:
              "In my academic journey, I've taken a variety of courses, ranging from Advanced Database Programming to Game Development with Unity and MERN Web Development. These courses have not only improved my technical skills but also deepened my understanding of the theoretical principles essential for effective software design.",
        },
        {
          title: "Educational Achievements",
          subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
          content:
              "In addition to pursuing my Bachelor's degree, I've earned an Associate of Applied Science in Computer Science from Weber State University and an Associate of Science In Computer Science And Information Systems from Salt Lake Community College. These academic milestones, coupled with certifications in Software Development and Computer Science Fundamentals, underscore my commitment to continuous learning.",
        },
        {
          title: "Technical Proficiency",
          subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
          content:
              "My proficiency extends beyond languages and frameworks to include Microsoft Excel, SQL, MongoDB, and Firebase. I am adept at employing Object-Oriented Programming (OOP) principles to build scalable and efficient applications. Whether it's diving into the intricacies of MIPS Assembly or crafting dynamic user interfaces with React JS, I thrive on the challenge of turning concepts into tangible, functional solutions.",
        },
        {
          title: "Aspirations and Problem-Solving Approach",
          subSections: ["Spellings, Sounds, and Pronunciations", "Pre-Lesson (Basics)"],
          content:
              "Looking ahead, my focus is on contributing to the dynamic field of computer science, with a keen interest in web development and software engineering. I am not merely a coder; I approach challenges as opportunities for creative problem-solving. My goal is to bridge the gap between technology and user experience, delivering solutions that are not just functional but also intuitive and user-friendly.",
        },
    ];
  
   
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
      return prevOpenSections.length === testData.length ? [] : Array.from({ length: testData.length }, (_, i) => i);
    });
  };

  return (
    <div>
      <div className={classes.titleContainer}>
        <h2>Modules</h2>
        <button className={classes.button} onClick={toggleAllSections}>
          {openSections.length === testData.length
            ? "Collapse All"
            : "Expand All"}
        </button>
      </div>

      {testData.map((section, index) => (
        <Section
          key={index}
          sectionNumber={index}
          subSections={section.subSections}
          title={section.title}
          content={section.subSections}
          isOpen={openSections.includes(index)}
          toggleSection={() => toggleSection(index)}
        />
      ))}
    </div>
  );
}

export default ContentDropdown;