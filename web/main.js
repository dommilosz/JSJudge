let g_codeEditor = null

function main() {
    setupEditor()
    onResize()

    document.body.onresize = onResize
    window.onkeydown = onKeyDown
    window.onbeforeunload = onBeforeUnload
}


function setupEditor() {
    g_codeEditor = CodeMirror(document.getElementById("divCodeMirror"),
        {
            lineNumbers: true, matchBrackets: true, indentWithTabs: true, highlightSelectionMatches: true,
            tabSize: 4, indentUnit: 4, mode: "z80"
        })

    fetch("../examples/hello_world.js")
        .then(r => r.text())
        .then(r => g_codeEditor.setValue(r))

    g_codeEditor.refresh()
}

function onResize() {
    let rectInput = document.getElementById("divCodeMirror").getBoundingClientRect()
    g_codeEditor.setSize(rectInput.width, rectInput.height)
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


function run() {
    let test = document.getElementById("selectTest").value;
    console.log(`Running: test: ${test}`);

    let divText = document.getElementById("divOutputText");
    let inputName = document.getElementById("input_name").value;

    let code = g_codeEditor.getValue();
    let evalCode = run_test(code, tests[test], inputName);
    divText.innerHTML = evalCode;
    divText.style.whiteSpace = "no-wrap"
}