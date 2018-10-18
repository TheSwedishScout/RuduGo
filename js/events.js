/*---------------------------------------
|---_____----------__--__-______--_____--|
|--/ ____|---/\---|  \/  |  ____|/ ____|-|
|-| |-------/  \--| \  / | |__  | (___---|
|-| |-|_ |-/ /\ \-| |\/| |  __|--\___ \--|
|-| |__| |/ ____ \| |--| | |____-____) |-|
|--\_____/_/----\_\_|--|_|______|_____/--|
----------------------------------------*/
var game = document.getElementById('game');
//function isPlaying(audio) { return !audio.paused; }

function showImage(id, bild, rubrik) {
    console.log(bild)
    game.classList.add('show')
    let img = document.createElement('img');
    img.src= "images/bilder/" + bild;
    let namn = document.createElement('h1');
    namn.innerText = rubrik
    
    let info = document.createElement('div');
    info.innerText = "Exercitation do do ex sit voluptate aliqua exercitation commodo dolore anim laborum sed consectetur ut exercitation aliquip velit ullamco.";
    game.appendChild(namn);
    game.appendChild(img);
    game.appendChild(info);
}

function gameClear(){
    console.log("clear")
    game.classList.remove('show')
    game.innerHTML = "";
}