import { Mosaic, MosaicWindow, MosaicNode, ExpandButton } from 'react-mosaic-component';
import { useState, useCallback } from 'react';
import CodeEditor from '../code-editor/CodeEditor';
import Terminal from '../terminal/Terminal';
import BrowserWindow from '../browser-window/BrowserWindow';
import FileExplorer from '../file-explorer/FileExplorer';
import './styles.css'


const MAP = {
    "Files": () => <FileExplorer />,
    "Editor": ({setCodeEditorText}) => <CodeEditor setCodeEditorText={setCodeEditorText} />,
    "Preview": ({isWindowResizing}) => <BrowserWindow isWindowResizing={isWindowResizing} />,
};

const DraggableWindow = ({setCodeEditorText, setLayout, layout}) => {

    const [isWindowResizing, setIsWindowResizing] = useState(false);
    

    const handleChange = useCallback((e) => {
        setLayout(e);
        setIsWindowResizing(true)
    }, [])

    const handleRelease = useCallback((e) => {
        setIsWindowResizing(false)
    }, []);

    return (
        <Mosaic
            renderTile={(id, path) => (
                <MosaicWindow 
                    path={path}
                    title={id}
                    toolbarControls={[]}
                >
                    {MAP[id]({ setCodeEditorText, isWindowResizing })}
                </MosaicWindow>
            )}
            onChange={handleChange}
            onRelease={handleRelease}
            value={layout}
            // initialValue={position}
        />
    )

}

export default DraggableWindow;