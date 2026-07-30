/* ==========================================
   GUIA DOS CALOUROS - JAVASCRIPT
   Funcionalidades principais
========================================== */


/* =========================
   POPUP DE BOAS-VINDAS
========================= */


const popup = document.getElementById("popup");
const fecharPopup = document.getElementById("fecharPopup");


if (fecharPopup) {

    fecharPopup.addEventListener("click", () => {

        popup.style.display = "none";

    });

}




/* =========================
   MENU ENTRE PÁGINAS
========================= */
function mostrarPagina(id) {


    const paginas = document.querySelectorAll(".pagina");


    paginas.forEach(pagina => {

        pagina.classList.remove("ativa");

    });



    const paginaEscolhida = document.getElementById(id);


    if (paginaEscolhida) {

        paginaEscolhida.classList.add("ativa");

    }



    const botoes = document.querySelectorAll(".menu-btn");


    botoes.forEach(botao => {

        botao.classList.remove("active");

    });



    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


}




/* =========================
   ACCORDION
========================= */


const accordions = document.querySelectorAll(".accordion-btn");


accordions.forEach(botao => {


    botao.addEventListener("click", () => {


        const conteudo = botao.nextElementSibling;



        if (conteudo.style.display === "block") {


            conteudo.style.display = "none";


        } else {


            conteudo.style.display = "block";


        }


    });


});




/* =========================
   COPIAR EMAIL
========================= */


const botoesCopiar = document.querySelectorAll(".copiar-btn");


botoesCopiar.forEach(botao => {


    botao.addEventListener("click", () => {


        const email = botao.dataset.email;


        navigator.clipboard.writeText(email);



        mostrarToast();



    });


});




/* =========================
   TOAST
========================= */


function mostrarToast(){


    const toast = document.getElementById("toast");


    if(!toast) return;



    toast.classList.add("mostrar");



    setTimeout(()=>{


        toast.classList.remove("mostrar");


    },2500);


}




/* =========================
   LOADING
========================= */


window.addEventListener("load",()=>{


    const loading = document.getElementById("loading");


    if(loading){


        loading.style.display="none";


    }


});




/* =========================
   VOLTAR AO TOPO
========================= */


const voltarTopo = document.getElementById("voltarTopo");



window.addEventListener("scroll",()=>{


    if(window.scrollY > 400){


        voltarTopo.style.display="block";


    } else {


        voltarTopo.style.display="none";


    }


});




if(voltarTopo){


    voltarTopo.addEventListener("click",()=>{


        window.scrollTo({

            top:0,

            behavior:"smooth"

        });


    });


}
// =========================
// PESQUISA INTELIGENTE
// =========================

const barraPesquisa = document.getElementById("barraPesquisa");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");


barraPesquisa.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        pesquisar();

    }

});


function pesquisar(){

    let termo = barraPesquisa.value.toLowerCase().trim();


    if(termo === ""){

        return;

    }


    // remove marcações antigas

    document.querySelectorAll(".highlight").forEach(el=>{

        el.outerHTML = el.innerHTML;

    });



    let paginas = document.querySelectorAll(".pagina");

    let encontrado = false;



    for(let pagina of paginas){


        let texto = pagina.innerText.toLowerCase();


        if(texto.includes(termo)){


            // abre a página encontrada

            mostrarPagina(pagina.id);



            destacarTexto(pagina, termo);



            encontrado=true;

            break;


        }


    }



    if(encontrado){

        mostrarResultado("Encontrado 💖");

    }

    else{

        mostrarResultado("Nada encontrado 😭");

    }


}



function destacarTexto(elemento, termo){


    let walker = document.createTreeWalker(

        elemento,

        NodeFilter.SHOW_TEXT

    );


    let textos=[];


    while(walker.nextNode()){

        textos.push(walker.currentNode);

    }



    textos.forEach(texto=>{


        if(texto.nodeValue.toLowerCase().includes(termo)){


            let span=document.createElement("span");


            let regex=new RegExp(termo,"gi");


            span.innerHTML = texto.nodeValue.replace(

                regex,

                match=>`<span class="highlight">${match}</span>`

            );


            texto.replaceWith(span);


        }


    });


}



function mostrarResultado(msg){


    if(!resultadoPesquisa) return;


    resultadoPesquisa.innerHTML = msg;


    resultadoPesquisa.style.display = "block";


    setTimeout(()=>{


        resultadoPesquisa.style.display="none";


    },2000);


}