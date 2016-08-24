

const RATIOH = 15;
const RATIOS = 6;

/*varaibles contenant les element html des aiguilles*/
var sec ;
var min ;
var heur;

//varaibles contenant la valeur numerique de l'heure
var seconde;
var minute;
var heure;


var ro = 0;
var ex;//milieux de la mapMonde
var finMap;//taille en px de la mapMonde
var mouseX = 0;//valeur x de la position de la souris sur la mapMonde
var facteur;//facteur servant a la conversion distance sur mapMonde en minute

function init(){
  var dat  = new Date();
  //recuperation des valeur numerique de l'heure
  seconde = dat.getSeconds();
  minute = dat.getMinutes();
  heure = dat.getHours();

  //recuperation des element html de l'horloge
  sec = document.getElementById('seconde');
  min = document.getElementById('minute');
  heur = document.getElementById('heure');

  rotationne(sec,seconde,RATIOS);
  rotationne(min,minute,RATIOS); rotationne(heur, heure, RATIOH);

  var ligne = document.getElementById('pointer');
  var fin = document.getElementById('fin');
  finMap = fin.offsetLeft;
  setPosition("43%");
  ex = ligne.offsetLeft;
  ro = ex;

  var e = document.getElementById('map');
  e.parentElement.addEventListener("mousemove",bouger);
}

function seconde(){
  var dat = new Date();
  seconde++;
  rotationne(sec,seconde,RATIOS);
  sec.style.transition = "all 0.5s linear";

  if(seconde == 60){
    sec.style.transition = "all 0s linear";
    seconde = 0;
    rotationne(sec, seconde,RATIOS);
    minute++;

    if(minute == 60){
      minute = 0;
      heure++;
      if(heure == 23)
      heure = 0;
      rotationne(heur, heure, RATIOH);
    }
    rotationne(min,minute,RATIOS);
  }
}

function rotationne(ele, num, ratio){
  ele.style.transform = "rotate("+(num*ratio).toString()+"deg)";
}

function bouger(event){
  var e = document.getElementById('pointer');
  mouseX = event.layerX;
}

function setPosition(reset){
  var e = document.getElementById('pointer');
  if(reset){
    e.style.left = reset;
  }else{
    e.style.left = (mouseX-14).toString()+"px";
    facteur = 1440/finMap;
    var envoie = mouseX * facteur - (Math.abs(ex-ro)+720);
    console.log("mouseX ", mouseX)
    envoie = Math.ceil(envoie);
    heureMonde(envoie);
  }
}

function heureMonde(minu){
  if(minu > 0){
    for (var i = minute; i < minu ; i++) {
      minute++;
      // console.log("minute ",minute);
      if(minute == 60){
        minute = 0;
        heure++;
        // console.log('heure ',heure);
        // rotationne(heur, heure, RATIOH);
        if(heure ==23)
        heure = 0;
      }
      // console.log("bonjour+");
      // rotationne(min,minute,RATIOS);
    }
  }
  else if (minu < 0) {
    for (var i = minu; i < 0; i++) {
      minute--;
      if(minute == 0){
        minute = 60;
        heure--;
        if(heure == 0 )
        heure = 23;
      }
      // console.log("bonjour-");
    }
  }
  var ligne = document.getElementById('pointer');
  ex = ligne.offsetLeft;
  console.log("minute ",minute,",heure ",heure);
  console.log("minu ",minu,",minu/60 ", minu/60);
  rotationne(min,minute,RATIOS);
  rotationne(heur, heure, RATIOH);
}

setInterval(seconde,1000);
