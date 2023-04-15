let url = location.href.split("url=")[1].split('&')[0];

let tests = [];

async function getHelloWorld(){
    let data = await (await fetch("/examples/hello_world.test")).json();
    let select = document.querySelector("#selectTest");
    select.innerHTML = "";
    tests.push(...data.tests);
    tests.forEach((test, i)=>{
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = test.name;
        select.appendChild(option)
    })
}

async function getData(){
    let data = await (await fetch(decodeURIComponent(url))).json();
    data = JSON.parse(data.contents);
    let select = document.querySelector("#selectTest");
    select.innerHTML = "";
    tests.push(...data.tests);
    tests.forEach((test, i)=>{
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = test.name;
        select.appendChild(option)
    })
}

async function main(){
    await getHelloWorld();
    await getData();
}

main()