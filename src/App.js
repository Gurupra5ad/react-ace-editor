import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import brace from "brace";
import { IntegrationTests } from "./example-input";

import "brace/mode/python";

import "brace/theme/tomorrow_night";

const markers = [
  {
    startRow: 3,
    endRow: 4,
    startCol: 2,
    type: "text",
    className: "test-marker",
  },
];

const annotations = [
  {
    row: 3, // must be 0 based
    column: 4, // must be 0 based
    text: "error.message", // text to show in tooltip
    type: "error",
  },
];

// const reactAceComponent = this.refs.reactAceComponent;
// const editor = reactAceComponent.ace_editor;

// editor.commands.on("exec", function(e) {
//   if (e.command.readOnly)
//       return;
//   var editableRow = editor.session.getLength() - 1;
//   var deletesLeft = e.command.name === "backspace" || e.command.name === "removewordleft";
//   debugger
//   var notEditable = editor.selection.getAllRanges().some(function(r) {
//       if (deletesLeft && r.start.column === 0 && r.end.column === 0) return true;
//       return r.start.row !== editableRow || r.end.row !== editableRow;
//   });
//   if (notEditable)
//       e.preventDefault();
// });

function getDelay() {
  return Math.round(Math.random() * 0) + 1;
}

const Editor = (
  { useDelay } = {
    useDelay: false,
  }
) => {
  const [textValue, setTextValue] = React.useState("");

  React.useEffect(() => {
    if (useDelay) {
      let counter = 0;
      let timeout;

      function updateTextAndCounter() {
        setTextValue(IntegrationTests.slice(0, counter));
        counter++;
        if (counter < IntegrationTests.length) {
          timeout = setTimeout(updateTextAndCounter, getDelay());
        }
      }

      timeout = setTimeout(updateTextAndCounter, getDelay());
      return () => {
        if (typeof timeout !== "undefined") {
          clearTimeout(timeout);
        }
      };
    } else {
      setTextValue(IntegrationTests.slice(0, IntegrationTests.length));
    }
  }, [useDelay]);

  return (
    <div>
      <AceEditor
        mode="typescript"
        theme="tomorrow_night"
        width="100%"
        name="ace_editor"
        editorProps={{
          $blockScrolling: false,
        }}
        value={textValue}
        showGutter={true}
        fontSize={20}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        markers={markers}
        annotations={annotations}
      />{" "}
    </div>
  );
};

export default Editor;
