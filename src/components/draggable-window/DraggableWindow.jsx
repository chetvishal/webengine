import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import { useState, useCallback } from 'react';
import CodeEditor from '../code-editor/CodeEditor';
import Terminal from '../terminal/Terminal';
import BrowserWindow from '../browser-window/BrowserWindow';
import FileExplorer from '../file-explorer/FileExplorer';
import 'react-mosaic-component/react-mosaic-component.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

// export type ViewId = 'a' | 'b' | 'c' | 'new';

const TITLE_MAP = {
    a: () => <FileExplorer />,
    b: ({setCodeEditorText}) => <CodeEditor setCodeEditorText={setCodeEditorText} />,
    c: ({isWindowResizing}) => <BrowserWindow isWindowResizing={isWindowResizing} />,
};

const position = {
    direction: 'row',
    first: {
        direction: 'row',
        first: 'a',
        second: 'b',
        splitPercentage: "30"
    },
    second: 'c',
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
                <MosaicWindow path={path} >
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