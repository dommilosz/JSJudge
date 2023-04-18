let url = location.href.split("url=")[1]?.split('&')[0];

let tests = [];

async function getTestsFromIndex() {
    let data = await (await fetch("tests.index")).text();
    for (let index of data.split("\n")) {
        await getTestsFromUrl(index);
    }
}

async function getTestsFromUrl(url) {
    let data = await (await fetch(url)).json();
    let select = document.querySelector("#selectTest");
    select.innerHTML = "";
    tests.push(...data.tests);
    tests.forEach((test, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = test.name;
        select.appendChild(option)
    })
}

async function main() {
    if (url)
        await getTestsFromUrl(decodeURIComponent(url));
    await getTestsFromIndex();
}

main()