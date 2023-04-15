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

    eval(code);
    out = out.trim();

    let match = out.match(test.regex);
    if(!match){
        if(test.example){
            out = `${out}\nEXAMPLE: \n${test.example}`
        }
        out = `${out}\n\nERROR\nEXPECTED: ${test.regex}`
    }else{
        out = `${out}\nOK`
    }


    return out;
}
