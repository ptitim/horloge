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

var minuteZero;
var hourZero;

var ro = 0;
var ex;//milieux de la mapMonde
var finMap;//taille en px de la mapMonde
var mouseX = 0;//valeur x de la position de la souris sur la mapMonde
var facteur;//facteur servant a la conversion distance sur mapMonde en minute
var largeur;//largeur du body

function init(){
  var minimum = new Date;
  var dat  = new Date();
  //recuperation des valeur numerique de l'heure
  hourZero = minimum.getUTCHours();
  minuteZero = minimum.getUTCMinutes();
  hourZero-= 10;
  seconde = dat.getSeconds();
  minute = dat.getMinutes();
  heure = dat.getHours();

  //recuperation des element html de l'horloge
  sec = document.getElementById('seconde');
  min = document.getElementById('minute');
  heur = document.getElementById('heure');

  rotationne(sec,seconde,RATIOS);
  rotationne(min,minute
  ,RATIOS); rotationne(heur, heure, RATIOH);

  var ligne = document.getElementById('pointer');
  var fin = document.getElementById('fin');
  var largeur = document.body.clientWidth;
  finMap = fin.offsetLeft;
  setPosition("45%");
  ex = ligne.offsetLeft;
  ro = ex;

  var e = document.getElementById('map');
  e.parentElement.addEventListener("mousemove",bouger);
  window.addEventListener("keypress",deplacement);
}

function secondes(){
  seconde++;
  console.log(seconde);
  rotationne(sec,seconde,RATIOS);

  if(seconde >59){
    // rotationne(sec,seconde,RATIOS);
    // seconde++;
    console.log("rotate");
    rotationne(sec, seconde,RATIOS);
    setTimeout(function(){sec.style.transition = "all 0s linear"},100);
    console.log(seconde);
    seconde = 0;
    setTimeout(function(){rotationne(sec, seconde,RATIOS)},450);
    minute++;
    minuteZero++;
    setTimeout(function(){sec.style.transition = "all 0.5s linear"},700);

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
    heureMonde(mouseX);
  }
}

function heureMonde(minu){
  //mise a l'heure la position selon la position de la souris sur la map
  heure = Math.ceil(hourZero + ((minu/finMap)*24));
  rotationne(min,minute,RATIOS);
  rotationne(heur, heure, RATIOH);
};



//fonciton de drag du pointer
function test(e){
    console.log("click");
    e.addEventListener("mousemove",truc);
    window.addEventListener("mouseup",testno);
    // window.addEventListener("mouseup",setPosition);
};

function testno(){
    console.log("declick");
    var e = document.getElementById('pointer');
    e.removeEventListener("mousemove",truc);
};

function truc(event){
    var e = document.getElementById('pointer').parentElement;
    var placement = event.clientX;///finMap;
    console.log(placement);
    // e.style.left = placement.toString()+"%";
};

//deplacement du pointer(et de l'heure) avec le clavier
function deplacement(event){
    var keycode= event.keyCode;
    console.log(event);
    var selecteur = document.getElementById('pointer');
    var pointerPos = selecteur.style.left;
    pointerPos = pointerPos.replace(/[%]$/,"");
    console.log(pointerPos);
    if(keycode == 39 && pointerPos < 95){
        pointerPos++;
        console.log(pointerPos+" droite");
        selecteur.style.left = pointerPos+"%";
    }else if (keycode == 37 && pointerPos >0) {
        pointerPos--;
        console.log(pointerPos+" gauche");
        selecteur.style.left = pointerPos+"%";
    }else if (event.key == 'r') {
        init();
        return;
    }
    heure = Math.ceil(hourZero + ((pointerPos/100)*24));
    rotationne(heur,heure,RATIOH);
}

setInterval(secondes,1000);
