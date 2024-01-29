import { useState, useMemo } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { selectFile, addFile, addFolder } from "../../redux/features/webcontainerSlice";
import { useWebContainerContext } from "../../redux/WebContainerContext";

function Folder({ name, explorer2, firstTime, path }) {

    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: null
    })
    const dispatch = useDispatch()
    const { webcontainerInstance } = useWebContainerContext()

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
        return Object.keys(explorer2).map((exp) => {
            return (
                <Folder 
                    explorer2={explorer2[exp]}
                    name={exp}
                    firstTime={false}
                    key={uuidv4()}
                    path={exp}  
                />
            )
        })
    }

    if (explorer2.hasOwnProperty('directory')) {
        return <div style={{ marginTop: 5 }}>
            <div className="folder" onClick={() => setExpand((a) => !a)}>
                <span>📁{name}</span>
                <div>
                    <button onClick={e => handleNewFolder(e, true)}>Folder +</button>
                    <button onClick={e => handleNewFolder(e, false)}>File +</button>
                </div>
            </div>
            <div style={{ display: expand ? "block" : "none", paddingLeft: "2rem" }}>
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

                {Object.keys(explorer2.directory).map((exp) => {
                    return (
                        <Folder 
                            explorer2={explorer2.directory[exp]}
                            name={exp} 
                            firstTime={false} 
                            key={uuidv4()} 
                            path={`${path}/${exp}`}
                        />
                    )
                })}
            </div>
        </div>
    }
    else {
        return <span className="file" onClick={() => dispatch(selectFile(path))}>📄 {name}</span>
    }
}

export default Folder;