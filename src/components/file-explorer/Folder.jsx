import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { selectFile, addFile, addFolder } from "../../redux/features/webcontainerSlice";
import { useWebContainerContext } from "../../redux/WebContainerContext";
import moreThan from '../../assets/moreThan.svg';
import addFileIcon from '../../assets/addFile.svg';
import addDirectory from '../../assets/addDirectory.svg';
import downArrow from '../../assets/downArrow.svg'


function Folder({ name, explorer, firstTime, path }) {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })
    const dispatch = useDispatch()
    const { webcontainerInstance } = useWebContainerContext()
    const selectedFilePath = useSelector(state => state.webcontainer.selectedFile.path)

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })
    }

    const onAddFolder = async (e) => {
        if (e.keyCode === 13 && e.target.value) {
            //add logic
            // handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({ ...showInput, visible: false })
            if(showInput.isFolder) {
                dispatch(addFolder({
                    path: `${path}/${e.target.value}`, 
                    wcInstance: webcontainerInstance,
                    fileName: e.target.value
                }))
            }
            else {
                dispatch(addFile({
                    path: `${path}/${e.target.value}`, 
                    wcInstance: webcontainerInstance,
                    fileName: e.target.value
                }))
                
            }
        }
    }

    if (firstTime) {
        return Object.keys(explorer).map((exp, idx) => {
            return (
                <Folder 
                    explorer={explorer[exp]}
                    name={exp}
                    firstTime={false}
                    key={idx}
                    path={exp}  
                />
            )
        })
    }

    if (explorer.hasOwnProperty('directory')) {
        return <div style={{ marginTop: 5 }}>
            <div
                className="flex cursor-pointer p-1 justify-between mt-1"
                onClick={(e) => {
                    setExpand((a) => {
                        return !a
                    })
                }
                }
            >
                <div className="flex items-center">
                    {
                        expand ?
                            <img src={downArrow} className="w-4" /> :
                            <img src={moreThan} className="w-4" />
                    }
                    <span>📁{name}</span>
                </div>
                <div className="flex items-center">
                    <img src={addFileIcon} className="w-4 text-blue-200" onClick={e => handleNewFolder(e, false)}/>
                    <img src={addDirectory} className="w-4" onClick={e => handleNewFolder(e, true)}/>
                </div>
            </div>
            <div
                style={{ display: expand ? "block" : "none" }}
                className="pl-8 "
            >
                {
                    showInput.visible && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input
                                type="text"
                                onKeyDown={onAddFolder}
                                onBlur={() => setShowInput(() => ({ ...showInput, visible: false }))}
                                className="inputContainer__input"
                                autoFocus
                            />
                        </div>
                    )
                }
                {Object.keys(explorer.directory).map((exp, idx) => {
                    return (
                        <Folder
                            explorer={explorer.directory[exp]}
                            name={exp}
                            firstTime={false}
                            key={idx}
                            path={`${path}/${exp}`}
                        />
                    )
                })}
            </div>
        </div>
    }
    else {
        return <span className="w-full block">
            <span className={`flex flex-col pl-1 cursor-pointer ${selectedFilePath === path ? "bg-blue-200" : ""}`}
                onClick={(e) => {
                    dispatch(selectFile(path))
                }
                }>📄 {name}</span>
        </span>
    }
}

export default React.memo(Folder);