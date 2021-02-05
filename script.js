//variabel data container til loop view
let container = document.querySelector(".loop-container");

//variabel for template til loop vew
let temp = document.querySelector("template");

//constant der indeholder URL til billederne i restdb
const medieurl = "https://babushka-dd8a.restdb.io/media/";

//constant der indeholder URL til data i restdb
const url = "https://babushka-dd8a.restdb.io/rest/menu";

//constant der indeholder API nøglen til data fra restdb
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

//tjek at DOM er loaded og kør function hentData
document.addEventListener("DOMContentLoaded", hentData);

//Funktion der henter data fra json fil
async function hentData() {

    //constant der henter data med fetch og her bruges to tidligere constanter.
    const resspons = await fetch(url, options);

    //Constant der indeholder den data vi lige har hentet
    const json = await resspons.json();

    //kør function vis med constanten json;
    vis(json);
}

function vis(json) {
    console.log(json);

    //dataen for hvert element i json hentes og places i template
    json.forEach(ret => {
        let klon = temp.cloneNode(true).content;
        klon.querySelector("img").src = medieurl + ret.billede[0];
        klon.querySelector("h2").textContent = ret.navn;
        klon.querySelector("#info").textContent = ret.kortbeskrivelse;
        klon.querySelector("#pris").innerHTML = `${ret.pris} ,-`;

        container.appendChild(klon);

    })
}

hentData()
