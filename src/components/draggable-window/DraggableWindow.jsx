import { Mosaic, MosaicWindow, MosaicNode } from 'react-mosaic-component';
import { useState } from 'react';
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
    c: () => <BrowserWindow />,
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

    return (
        <Mosaic
            renderTile={(id, path) => (
                <MosaicWindow path={path} >
                    {TITLE_MAP[id]({setCodeEditorText})}
                </MosaicWindow>
            )}
            initialValue={position}
        />
    )

}

export default DraggableWindow;