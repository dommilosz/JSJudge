import {basicSetup, EditorView} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {getTests, tests} from "./getTests";
import {run_test} from "./judge";

let g_codeEditor = new EditorView({
    extensions: [basicSetup, javascript()],
    parent: document.querySelector("#divCodeMirror")
})

export function main() {
    setupEditor();
    getTests();
    window.onkeydown = onKeyDown;
    window.onbeforeunload = onBeforeUnload;
}


async function setupEditor() {
    let text = await (await fetch("../examples/hello_world.js")).text();
    g_codeEditor.dispatch({
        changes: {from: 0, to: g_codeEditor.state.doc.length, insert: text}
    })
}

function onBeforeUnload() {
    return "Your work will be lost if you close the page."
}


function onKeyDown(ev) {
    if (!ev.ctrlKey)
        return

    if (ev.key == "Enter") {
        ev.preventDefault()
        run()
    }
}


export function run() {
    let test = document.getElementById("selectTest").value;
    console.log(`Running: test: ${test}`);

    let divText = document.getElementById("divOutputText");
    let inputName = document.getElementById("input_name").value;

    let code = g_codeEditor.state.doc.toString();
    let evalCode = run_test(code, tests[test], inputName);
    divText.innerHTML = evalCode;
    divText.style.whiteSpace = "no-wrap"
}