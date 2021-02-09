//constant der indeholder URL til billederne i restdb
const medieurl = "https://babushka-dd8a.restdb.io/media/";

//constant der indeholder URL til data i restdb
const url = "https://babushka-dd8a.restdb.io/rest/menu";

let json;

//constant der indeholder API nøglen til data fra restdb
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

let h1 = document.querySelector("h1");


//tjek at DOM er loaded og kør function hentData
document.addEventListener("DOMContentLoaded", start);
let ret;
let filter = "alle";

function start() {
    document.querySelector("#burger").addEventListener("click", toggleMenu)
    const filterknapper = document.querySelectorAll("nav button");
    filterknapper.forEach(knap => knap.addEventListener("click", filterRetter));

    hentData();
}

function filterRetter() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");

    visRetter();
    h1.textContent = this.textContent;
}

//Funktion der henter data fra json fil
async function hentData() {

    //constant der henter data med fetch og her bruges to tidligere constanter.
    const resspons = await fetch(url, options);

    //Constant der indeholder den data vi lige har hentet
    json = await resspons.json();

    //kør function vis med constanten json;
    visRetter();
}



function visRetter() {
    console.log(json);

    //variabel data container til loop view
    const container = document.querySelector(".loop-container");

    //variabel for template til loop vew
    const temp = document.querySelector("template").content;
    container.textContent = "";

    //dataen for hvert element i json hentes og places i template
    json.forEach(ret => {

        if (filter == ret.kategori || filter == "alle") {
            let klon = temp.cloneNode(true);
            klon.querySelector("img").src = medieurl + ret.billede[0];
            klon.querySelector("h2").textContent = ret.navn;
            klon.querySelector("#info").textContent = ret.kortbeskrivelse;
            klon.querySelector("#pris").innerHTML = `${ret.pris} ,-`;

            //Sæt eventlistenner så der kan skiftes til single view
            klon.querySelector(".mad").addEventListener("click", () => visSingle(ret));

            container.appendChild(klon);
        }

    })

    let article1 = document.querySelectorAll("article");
    article1.forEach(article => {
        article.addEventListener("mouseover", mouseover);
        article.addEventListener("mouseout", mouseout);
    });


}

function visSingle(hvad) {
            location.href = `single.html?id=${hvad._id}`;
        }


function mouseover() {
    this.classList.add("hover");
}

function mouseout() {
    this.classList.remove("hover");
}

function toggleMenu() {
    let navBar = document.querySelector("nav");
    if (navBar.style.display === "") {
        navBar.style.display = "block";

    } else {
        navBar.style.display = "";
    }
}

//hentData()
