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

    let error = "";
    try{
        eval(code);
    }catch (ex) {
        error = String(ex);
    }

    out = out.trim();

    let chars = Array.from(code).reduce((prev, curr) => {
        if (curr.charCodeAt(0) > 32 && curr.charCodeAt(0) < 127) {
            return prev + 1;
        }
        return prev;
    }, 0)

    let match = out.match(test.regex);
    if(!match){
        if(test.example){
            out = `${out}\nEXAMPLE: \n${test.example}`
        }
        out = `${out}\n\nERROR\nEXPECTED: ${test.regex}`
    }else{
        out = `${out}\nOK`
    }
    out = `${out}\nCHARS: ${chars}`
    if(error){
        out = `${out}\nERROR: ${error}`
    }


    return out;
}
