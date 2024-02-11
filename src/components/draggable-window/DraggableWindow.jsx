import { Mosaic, MosaicWindow, MosaicNode, ExpandButton } from 'react-mosaic-component';
import { useState, useCallback } from 'react';
import CodeEditor from '../code-editor/CodeEditor';
import Terminal from '../terminal/Terminal';
import BrowserWindow from '../browser-window/BrowserWindow';
import FileExplorer from '../file-explorer/FileExplorer';
import './styles.css'


const TITLE_MAP = {
    "Files": () => <FileExplorer />,
    "Editor": ({setCodeEditorText}) => <CodeEditor setCodeEditorText={setCodeEditorText} />,
    "Preview": ({isWindowResizing}) => <BrowserWindow isWindowResizing={isWindowResizing} />,
};

const position = {
    direction: 'row',
    first: {
        direction: 'row',
        first: 'Files',
        second: 'Editor',
        splitPercentage: "30"
    },
    second: 'Preview',
    splitPercentage: "60"
}

const DraggableWindow = ({setCodeEditorText}) => {

    const [isWindowResizing, setIsWindowResizing] = useState(false);
    const handleChange = useCallback((e) => {
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
                    {TITLE_MAP[id]({ setCodeEditorText, isWindowResizing })}
                </MosaicWindow>
            )}
            onChange={handleChange}
            onRelease={handleRelease}
            initialValue={position}
        />
    )

}

export default DraggableWindow;