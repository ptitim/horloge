

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
  rotationne(min,minute,RATIOS); rotationne(heur, heure, RATIOH);

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

function seconde(){
  var dat = new Date();
  seconde++;
  // console.log(seconde);
  rotationne(sec,seconde,RATIOS);
  sec.style.transition = "all 0.5s linear";

  if(seconde == 60){
    // console.log(seconde);
    seconde = 0;
    sec.style.transition = "all 0s linear";
    rotationne(sec, seconde,RATIOS);
    minute++;
    minuteZero++;

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
  heure = Math.ceil(hourZero + ((minu/finMap)*24));

  console.log("minute ",minute,",heure ",heure);
  console.log("minu ",minu,",minu/60 ", minu/60);

  rotationne(min,minute,RATIOS);
  rotationne(heur, heure, RATIOH);
};

setInterval(seconde,1000);

function test(e){
    // var element = document.getElementById('pointer');
    console.log("click");
    e.addEventListener("mousemove",truc);
    document.addEventListener("onmouseup",testno);
};


function testno(){
  console.log("declick");
    var e = document.getElementById('pointer');
    e.removeEventListener("mousemove",truc);
};

function truc(event){
    var e = document.getElementById('pointer');
    var placement = event.clientX/finMap;
    placement*=100;
    e.style.left = placement.toString()+"%";
};

function deplacement(event){
    var keycode= event.keyCode;
    console.log(keycode);
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
    }
    heure = Math.ceil(hourZero + ((pointerPos/100)*24));
    rotationne(heur,heure,RATIOH);
}
