import { useState } from "react";
import CheckpointUI from "../Checkpoint/CheckpointUI";
import CustomStudySession from "../CustomStudySession/CustomStudySession";
import BeginStudySession from "../StudySession/BeginStudySession";
import classes from "./PracticeBank.module.css";
import PracticeBankModuleTemplate from "../../ModuleData/PracticeBankModuleTemplate";
import { connectStorageEmulator } from "firebase/storage";

function getExamplesReady(newData) 
{
    const keyArr = newData.keys;
    const valArr = newData.values;

    let examplesArray = [];
    for(let i = 0; i < keyArr.length; i++)
    {
        examplesArray.push([keyArr[i], valArr[i]]);
    }

    return examplesArray;
}

function setupModuleData(exampleData)
{
    console.log(PracticeBankModuleTemplate);
    let customModule = PracticeBankModuleTemplate;
    console.log(customModule.lessons[0].examples);
    customModule.lessons[0].examples = getExamplesReady(exampleData);
    return(customModule);
}

const PracticeBank = (props) => 
{
    const [checkpointSelected, setCheckpointSelected] = useState(null);
    const [moduleData, setModuleData] = useState(setupModuleData(props.practiceBankData));


    console.log(moduleData);

    const modTitle = moduleData.moduleTitle;
    const lessonTitle = moduleData.lessonTitles;
    const lessonArr =  moduleData.lessons[0];

    console.log(modTitle);
    console.log(lessonTitle);
    console.log(lessonArr);

    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr, disableBankAddBtn:true};

    return(
        <div className={classes.mainContainer}>
            <h2 className={classes.title}>Personal Practice Bank</h2>
            {
                checkpointSelected === null 
                ?
                    <>
                        <CheckpointUI progressData={null} onSelectedCheckpoint={(cpIndex)=>{ console.log("check point selected"); setCheckpointSelected(cpIndex)}}/>
                    </>
                :
                    <>
                        {/* <CustomStudySession customLessonData={isDataReady} selectedIndex={checkpointSelected}/> */}
                        <BeginStudySession {...lessonInfo} selectedIndex={checkpointSelected} onReturnToCheckPointSelection={()=>{setCheckpointSelected(null)}} 
                            onSessionOver={(finishedCpIndex)=> 
                            {    
                                // if(finishedCpIndex === -1)
                                // {
                                //     console.log("user did not pass.");
                                // }
                                // else if(progressArr[finishedCpIndex] === false)
                                // {
                                //     console.log("finished and updating user progression...");
                                //     progressArr[finishedCpIndex] = true;
                                //     props.onUpdateProgress([...progressArr]);
                                // }
                                // else console.log("section is already finished");
                                console.log("no need to do anything")
                            }}

                            onAddToPracticeBank={(addToPB)=>{props.onAddToPersonalPracticeBank(addToPB);}}

                            practiceBank={props.practiceBank}
                        />
                    </>
            }
        </div>
    )
};

export default PracticeBank;