import { useState, useEffect} from "react";
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
    // console.log(PracticeBankModuleTemplate);
    let customModule = PracticeBankModuleTemplate;
    // console.log(customModule.lessons[0].examples);
    customModule.lessons[0].examples = getExamplesReady(exampleData);
    return(customModule);
}

function removeExampleFromPBank(exampleIndex, currModuleData)
{
    console.log("removing this example!:");
    console.log(currModuleData.lessons[0].examples[exampleIndex]);
    currModuleData.lessons[0].examples.splice(exampleIndex, exampleIndex + 1);
    console.log("it should now be gone...");
    console.log(currModuleData.lessons[0].examples);

    return currModuleData;
}

function extractKeysAndValues(exampleArr)
{

    let allKeys = [];
    let allVals = [];

    for(let i = 0 ; i < exampleArr.length ; i++)
    {
        let singleArr = exampleArr[i];
        allKeys.push(singleArr[0]);
        allVals.push(singleArr[1]);
    }
    return [allKeys,allVals];
}

const PracticeBank = (props) => 
{
    const [checkpointSelected, setCheckpointSelected] = useState(null);
    const [moduleData, setModuleData] = useState(setupModuleData(props.practiceBankData));

    const modTitle = moduleData.moduleTitle;
    const lessonTitle = moduleData.lessonTitles;
    const lessonArr =  moduleData.lessons[0];

    // console.log(modTitle);
    // console.log(lessonTitle);
    // console.log(lessonArr);

    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};

    useEffect(()=>{setModuleData(setupModuleData(props.practiceBankData))},[props.practiceBankData]);

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

                            handleRemoveFromPracticebank={(exampleIndex)=>
                            {
                                const updatedPracticeBank = removeExampleFromPBank(exampleIndex, moduleData);
                                const updatedExamples = updatedPracticeBank.lessons[0].examples;
                                const keyVals = extractKeysAndValues(updatedExamples);
                                console.log(keyVals);
                                props.onUpdatePracticeBank(keyVals);
                            }}

                            practiceBank={props.practiceBank}
                        />
                    </>
            }
        </div>
    )
};

export default PracticeBank;