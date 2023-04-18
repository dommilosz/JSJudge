function run_test(code, test) {
    let out = "";

    console.log2 = console.log;
    console.log = (args)=>{
        out += `${args}\n`
    }
    alert = (args)=>{
        out += `${args}\n`
    }
    document.write = (args)=>{
        out += `${args}`
    }

    let chars = Array.from(code).reduce((prev, curr) => {
        if (curr.charCodeAt(0) > 32 && curr.charCodeAt(0) < 127) {
            return prev + 1;
        }
        return prev;
    }, 0)

    let error = "";
    try{
        eval(`${test?.scripts?.pre};\n\n${code}`);
    }catch (ex) {
        error = String(ex);
    }

    out = out.trim();

    try{
        eval(test?.scripts?.post);
    }catch (ex) {
        error = String(ex);
    }

    let match;
    let expected = test.regex;

    if(test.regex){
        match = out.match(test.regex);
    }else{
        let correctOut = "";
        eval(`correctOut=String(${test.scripts.validator})`);
        expected = correctOut;
        match = out.trim() === correctOut.trim();
    }


    out = `Your output:\n${out}\nStatus: ${match?"OK":"ERROR"}`

    if(!match){
        if(test.example){
            out = `${out}\nEXAMPLE: \n${example}`
        }
        out = `${out}\n\nERROR\nEXPECTED: ${expected}`
    }

    out = `${out}\nCHARS: ${chars}`
    if(error){
        out = `${out}\nERROR: ${error}`
    }


    return out;
}
