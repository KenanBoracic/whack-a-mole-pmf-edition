function novaIgra(){
    const dugmad = document.querySelectorAll(".button");
    const izborPolja = document.getElementById("izborPolja");

    dugmad.forEach((dugme,index)=>{
        dugme.style.display="none";
       })
    izborPolja.style.display="block"

}

