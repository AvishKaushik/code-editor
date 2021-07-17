import React from 'react';

// Codemirror Libraries for adding editor themes and making editor
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

// Imporing react-codemirror2 library and files which will help us to work with code mirror with an ease
import {Controlled as CodeEditor} from 'react-codemirror2';

export default function Editor(props) {

    // Taking all the arguments which will help to create editor as per the needs
    // We will use these arguments to make editor compatible to the required language
    const {
        language,
        displayName,
        value,
        onChange
    } = props

    // This function will help to take the data from the editor and store in the proided form
    function handleChange(editor,data,value) {
        onChange(value);
    }

    return (
        <div className="editor-part">
            <div className="editor-title">
                {displayName}
            </div>
            <CodeEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    keymap: 'sublime',
                    theme: 'ambiance',
                    lineNumbers: true
                }}
            />
        </div>
    )
}

