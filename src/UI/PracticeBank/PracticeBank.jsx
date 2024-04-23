import { useState, useEffect} from "react";
import CheckpointUI from "../Checkpoint/CheckpointUI";
import BeginStudySession from "../StudySession/BeginStudySession";
import classes from "./PracticeBank.module.css";
import PracticeBankModuleTemplate from "../../ModuleData/PracticeBankModuleTemplate";
import { connectStorageEmulator } from "firebase/storage";
import ManagePracticeBank from "../ManagePracticeBank/ManagePracticeBank";

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
    const [isManageBank, setIsManageBank] = useState(false);

    const modTitle = moduleData.moduleTitle;
    const lessonTitle = moduleData.lessonTitles;
    const lessonArr =  moduleData.lessons[0];

    const lessonInfo = { moduleTitle:modTitle, lessonTitle:lessonTitle, lessonData:lessonArr};
    
    return(
        <div className={classes.mainContainer}>
        {
            isManageBank === true ?
            <>
                <ManagePracticeBank 
                    practiceBank={props.practiceBankData}
                    onSelectedCheckpoint={(cpIndex)=>{setCheckpointSelected(cpIndex); setIsManageBank(false);}}
                    onNewPracticeBank={(newBankArr)=>{props.onUpdatePracticeBank(newBankArr)}}
                />
            </>
            :
            <>
                <h2 className={classes.title}>Personal Practice Bank</h2>
                {
                    checkpointSelected === null 
                    ?
                        <>
                            <CheckpointUI examplesArrayLength={moduleData.lessons[0].examples.length} progressData={null} onSelectedCheckpoint={(cpIndex)=>{ console.log("check point selected"); setCheckpointSelected(cpIndex)}}/>
                            <button onClick={()=>{setIsManageBank(true)}}>Manage Practice Bank</button>
                        </>
                    :
                        <>
                            <BeginStudySession 
                                {...lessonInfo}
                                selectedIndex={checkpointSelected} 
                                onReturnToCheckPointSelection={()=>{setCheckpointSelected(null)}} 
                                onSessionOver={(finishedCpIndex)=>{console.log("no need to do anything")}}
                                onAddToPracticeBank={(addToPB)=>{props.onAddToPersonalPracticeBank(addToPB);}}
                                practiceBank={props.practiceBank}
                                isPracticeBankOn={false}
                            />
                        </>
                }
            </>
        }
        </div>
    )
};

export default PracticeBank;