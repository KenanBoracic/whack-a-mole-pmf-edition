let bodovi = []
let vrijemeTrajanjaIgre = 30;
let brojac = 0;
let slike = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"]
let krajIgrice;
let prikazivanjeSlika;
let brojZivota = 3;



///////////////////////////////////////////////////////////////
/// PRIKAZ PODATAKA I UZIMANJE DIVOVA I RANDOM SEKUNDE
//////////////////////////////////////////////

function sviDivovi(){
    let divovi = document.querySelectorAll('.polja');
    return Array.from(divovi)
}
////////////////////////////////////////////////////////
function randomSekunde(){
    let broj =Math.random() * (1.5 - 0.5) + 0.5;
    return broj * 1000 ;
}
//////////////////////////////////////////////////////
function ukloniDugme(){
    let dugme = document.getElementById("start");
    dugme.style.display="none";
}
///////////////////////////////////////////////////////////
function prikaziPodatke(){
    let podaci = document.getElementById("podaci");
    podaci.style.display="flex";
}
///////////////////////////////////////////////////////////
function skrivanjePodataka(){
    let podaci = document.getElementById("podaci");
    podaci.style.display="none";
}
///////////////////////////////////////////////////////////
function prikazRezultata(){
    let rez = document.getElementById("krajIgre");
    rez.style.display="flex";
}
function ukloniMrezu(){
    let mreza = document.getElementById("mreza");
    mreza.style.display = "none";
}
function prikaziDugmeZaZvuk(){
    let dugme = document.getElementById("dugmeZaZvuk");
    dugme.style.display = "block";
}
function sakrijDugmeZaZvuk(){
    let dugme = document.getElementById("dugmeZaZvuk");
    dugme.style.display="none";
}
function prikaziZivote(){
    let zivoti = document.getElementById("zivoti");
    zivoti.style.display="flex";
}
///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//UPISIVANJE U HTML ELEMENTE
///////////////////////////////////////////////////////////
function sumaBodova(){
    let suma = 0;
    for(let i=0;i<bodovi.length;i++){
        suma+=bodovi[i]
    }
    return suma;
    
}
/////////////////////////////////////////////////////////////
function upisiUrezultat(){
    let rez = document.getElementById("bodovi");
    rez.innerHTML = "Score: "+ sumaBodova();
}
///////////////////////////////////////////////////////////
function upisiUdinamicneBodove(){
    let dinamicniBodovi = document.getElementById("score");
    dinamicniBodovi.innerHTML = "Score:" + sumaBodova();
}
///////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////
////RAD SA VREMENOM
////////////////////////////////////////////////////////////////////
function upisiVrijeme(){
    let vrijeme = document.getElementById("preostaloVrijeme");
    vrijeme.innerHTML ="Time: " + vrijemeTrajanjaIgre +" "+"s";

}


function povecajVrijeme(broj){
    vrijemeTrajanjaIgre+=broj;
    upisiVrijeme();
}

//////////////////////////////////////////////
function smanjivanjeVremena(){
    vrijemeTrajanjaIgre -= 1;

    if(vrijemeTrajanjaIgre == 0){
        clearInterval(krajIgrice)
        krajIgre();
        
        
    }
    else {
        upisiVrijeme();
    }
    
}
//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// PRIKAZZ SLIKA U MREZU
//////////////////////////////////////////////////////
function prikazSlike(){
    let divovi = sviDivovi();

    let randomIndexSlike = Math.floor(Math.random() * slike.length);
    let slika = "img/"+slike[randomIndexSlike];
    
    let randomIndexDiva = Math.floor(Math.random()*divovi.length)
    //uklanjam pozadinu za svaki div
    divovi.forEach(div =>{
        div.style.backgroundImage="";
        div.jeKliknut = false;
    });

    let trenutniDiv = divovi[randomIndexDiva];
    trenutniDiv.style.backgroundImage = `url(${slika})`;
    trenutniDiv.style.backgroundPosition = "center";
    trenutniDiv.style.backgroundSize = "cover"
    
    trenutniDiv.addEventListener("click",function(){
        provjeraKlika(trenutniDiv);
    })

    //uklanjanje bonusa 2 iz liste 
    if(randomIndexSlike == 4){
        brojac++;
        
    }
    if (brojac === 2) {
        slike.splice(4, 1);
        brojac = 100;

    }

}
////////////////////////////////////////////////////
function provjeraKlika(div){
    if (div.jeKliknut) {
        return; 
    }

    
    div.jeKliknut = true;

   switch (div.style.backgroundImage){
        case 'url("img/1.jpg")':
            bodovi.push(5);
            zvukUdarca()
            break;
        case 'url("img/2.jpg")':
            bodovi.push(50);
            zvukUdarca()
            break;
        case 'url("img/3.jpg")':
            bodovi.push(-30);
            zvukFaila();
            brojZivota--;
            break;
        case 'url("img/4.jpg")':
            bodovi = [0];
            zvukFaila();
            brojZivota --;
            break;
        case 'url("img/5.jpg")':
            povecajVrijeme(5);
            bonusSekunde()
            break;
        case 'url("img/6.jpg")':
            bodovi.push(20);
            zvukUdarca()
            break;
        case 'url("img/7.jpg")':
            bodovi.push(10);
            zvukUdarca()
            break;
        default:
            console.log("nije slika");
    }
    console.log(bodovi)
    div.style.backgroundImage = ""
    upisiUdinamicneBodove();
    zivoti();

}
///////////////////////////////////////////////// -----------------------------
function prikazSlikeRandomSekundi(){
    setInterval(prikazSlike,randomSekunde())
}
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////KRAJJJ IGREEEE
//////////////////////////////
function krajIgre(){
    clearInterval(krajIgrice);
    vrijemeTrajanjaIgre = 0;

    ugasiZvukIgrice();
    ukloniMrezu();
    skrivanjePodataka()
    prikazRezultata()

    upisiUrezultat();

    sakrijDugmeZaZvuk();

}
//////////////////////////////////////////////
//// RAD SA ZVUKOM
////////////////////////////////////////////////////
function zvukUdarca(){
    let zvuk = document.getElementById("zvukUdarca");
    zvuk.play();

}

function zvukFaila(){
    let zvuk = document.getElementById("zvukFaila");
    zvuk.play();
}

function zvukIgrice(){
    
    let zvuk = document.getElementById("zvukIgrice");
    zvuk.play();
}
function ugasiZvukIgrice(){
    let zvuk = document.getElementById("zvukIgrice");
    zvuk.pause();
   

}
function ugasiZvuk(){
    let ugaseno = false;
    
    let zvukIgrice = document.getElementById("zvukIgrice");


    if(zvukIgrice.paused){
        zvukIgrice.play();
        
    }
    else{
        zvukIgrice.pause();
        
    }
}
function bonusSekunde(){
    let zvuk = document.getElementById("bonusSekunde");
    zvuk.play();
}
///////////////////////////////////////////
//ZIVOTI
/////////////////////////////////////////////
function zivoti(){
    if(brojZivota == 2){
        document.getElementById("zivot3").style.visibility = "hidden";

    }
    if(brojZivota == 1){
        document.getElementById("zivot2").style.visibility = "hidden";

    }
    if(brojZivota==0){
        document.getElementById("zivoti").style.display = "none";
        krajIgre();
    }
    
}

//-----------------------
// GLAVNA FUNKCIJA
//------------------------
function startGame(){
    ukloniDugme();
    prikaziPodatke();
    prikaziZivote()
    zvukIgrice();
    
    // krajIgrice se poziva svake sekunde te se tako smanjuje vrijeme
    krajIgrice = setInterval(smanjivanjeVremena,1000);
    prikazSlikeRandomSekundi();
    prikaziDugmeZaZvuk();
}
