//ratio heure/angle et minute angle
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
  hourZero-= 10;//representante l'heure a l'extreme gauche de la mapMonde
  //stockage de l'heure de maniere seéparée
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
  finMap = fin.offsetLeft;//taille en px de la mapMonde
  setPosition("50%");

  //deplacemnt de l'heure
  var e = document.getElementById('map');
  e.parentElement.addEventListener("mousemove",bouger);//par clique souris
  window.addEventListener("keypress",deplacement);//par touche fléchée

  week();//affichage de la date
}

function secondes(){
  seconde++;
  rotationne(sec,seconde,RATIOS);

  //passages de la minute
  if(seconde >59){
    rotationne(sec, seconde,RATIOS);//remise a zero de l'angle (eviter le retoue en arriere de l'aiguille)
    setTimeout(function(){sec.style.transition = "all 0s linear"},100);
    seconde = 0;
    setTimeout(function(){rotationne(sec, seconde,RATIOS)},450);
    minute++;
    minuteZero++;
    setTimeout(function(){sec.style.transition = "all 0.5s linear"},700);
    //passages de l'heure
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
//fonction de rotation des aiguilles
function rotationne(ele, num, ratio){
  ele.style.transform = "rotate("+(num*ratio).toString()+"deg)";
}

//event listener par click
function bouger(event){
  var e = document.getElementById('pointer');
  mouseX = event.layerX;
}

//deplacement du pointer
function setPosition(reset){
  var e = document.getElementById('pointer');
  if(reset){
      e.style.left = reset;
      return true;
  }
    e.style.left = (mouseX-14).toString()+"px";
    heureMonde(mouseX);
}

function heureMonde(minu){
  //mise a l'heure la position selon la position de la souris sur la map
  heure = hourZero + ((minu/finMap)*24);
  heure.toFixed(4);
  rotationne(min,minute,RATIOS);
  rotationne(heur, heure, RATIOH);
};

//deplacement du pointer(et de l'heure) avec le clavier
function deplacement(event){
    var keycode= event.keyCode;
    var selecteur = document.getElementById('pointer');
    var pointerPos = selecteur.style.left;
    pointerPos = pointerPos.replace(/[%]$/,"");//supression du % pour faciliter les comparaison(evite le depacement de la mapMonde)

    //touche felchée droite
    if(keycode == 39 && pointerPos < 95){
        pointerPos++;
        selecteur.style.left = pointerPos+"%";

    //touhce fléchée gauche
    }else if (keycode == 37 && pointerPos >0) {
        pointerPos--;
        selecteur.style.left = pointerPos+"%";
    }else if (event.key == 'r') {
        init();//reset
        return;
    }
    heure = Math.ceil(hourZero + ((pointerPos/100)*24));
    rotationne(heur,heure,RATIOH);
}

function week(){
  var ele = document.getElementById('test');
  var dat = new Date();
  test.innerText = dat.toDateString();
}
setInterval(secondes,1000);
