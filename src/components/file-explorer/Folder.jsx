import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { selectFile, addFile, addFolder, deleteFile, renameFile } from "../../redux/features/webcontainerSlice";
import { useWebContainerContext } from "../../redux/WebContainerContext";
import moreThan from '../../assets/moreThan.svg';
import downArrow from '../../assets/downArrow.svg'
import { TrashIcon, PencilIcon, DocumentPlusIcon, FolderPlusIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import cloneDeep from 'lodash/cloneDeep'


function Folder({ name, explorer, firstTime, path }) {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })
    const dispatch = useDispatch()
    const { webcontainerInstance } = useWebContainerContext()
    const selectedFilePath = useSelector(state => state.webcontainer.selectedFile.path)
    const [isRenaming, setIsRenaming] = useState(false);
    const [rename, setRename] = useState();
    const [hovering, setHovering] = useState(false);

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder
        })
    }

    const handleDelete = (e, isDirectory) => {
        e.stopPropagation();
        if(isDirectory)
            dispatch(deleteFile({path, wcInstance: webcontainerInstance, isDirectory: true}))
        else
            dispatch(deleteFile({path, wcInstance: webcontainerInstance, isDirectory: false}))
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

    const onRenameSubmit = (e) => {
        e.preventDefault();
        if(!(name === rename))
            dispatch(renameFile({
                path: path, 
                wcInstance: webcontainerInstance,
                newName: rename,
                endCb: () => setIsRenaming(i => !i)
            }))
        else 
            setIsRenaming(i => !i)
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
        return <div style={{ marginTop: 5 }} key={name}>
            <div
                className={`flex cursor-pointer p-1 justify-between mt-1 hover:bg-gray-100 `}
                onClick={(e) => {
                    setExpand((a) => {
                        return !a
                    })
                }
                }
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <div className="flex items-center">
                    {
                        expand ?
                            <ChevronDownIcon className="w-4" /> :
                            <ChevronRightIcon className="w-4" />
                    }
                    {
                        isRenaming ?
                            <>
                            📁<input type="text" value={rename} onChange={(e) => setRename(e.target.value)} className="border" autoFocus/>
                            <span>submit</span>
                            </> :
                            <span>📁{name}</span>
                    }
                </div>
                <div className={`flex items-center ${hovering ? "" : "invisible"}`}>
                    <DocumentPlusIcon className="w-4 text-gray-400" onClick={e => handleNewFolder(e, false)}/>
                    <FolderPlusIcon className="w-4 text-gray-400"/>
                    <PencilIcon className="w-4 text-gray-400" onClick={(e) => {
                        e.stopPropagation()
                        setRename(name)
                        setIsRenaming((i) => !i)
                    }}/>
                    <TrashIcon className="w-4 text-gray-400" onClick={e => handleDelete(e, true)}/>
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
        return <span
            className={`w-full flex justify-between ${selectedFilePath === path ? "bg-blue-200" : "hover:bg-gray-100"} pr-1 cursor-pointer`}
            key={name}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={(e) => {
                dispatch(selectFile(path))
            }
            }
        >
            {
                isRenaming ?
                    <>
                        <form onSubmit={onRenameSubmit}>
                            📄<input type="text" value={rename} onChange={(e) => setRename(e.target.value)} className="border" autoFocus />
                        </form>
                    </> :
                    <>
                        <span className={`flex flex-col pl-1 cursor-pointer `}>
                            📄 {name}
                        </span>
                        <div className={`flex items-center ${hovering ? "" : "invisible"}`}>
                            <PencilIcon className="w-4 cursor-pointer text-gray-400"
                                onClick={() => {
                                    setRename(name)
                                    setIsRenaming(i => !i)
                                }}
                            />
                            <TrashIcon className="w-4 cursor-pointer text-gray-400" onClick={e => handleDelete(e, false)} />
                        </div>
                    </>
            }
        </span>
    }
}

export default React.memo(Folder);