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
    if(window.innerWidth <= 768){

    document.querySelector(".sidebar").classList.remove("aberta");
    }
    
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
/* =========================
   PESQUISA INTELIGENTE V2
========================= */

const barraPesquisa = document.getElementById("barraPesquisa");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");

if (barraPesquisa) {

    barraPesquisa.addEventListener("input", pesquisar);

}

function pesquisar() {

    limparPesquisa();

    const termo = barraPesquisa.value
        .trim()
        .toLowerCase();

    if (termo === "") {

        resultadoPesquisa.textContent = "";
        return;

    }

    const paginas = document.querySelectorAll(".pagina");

    let totalResultados = 0;
    let primeiraOcorrencia = null;

    paginas.forEach(pagina => {

        const texto = pagina.innerText.toLowerCase();

        if (!texto.includes(termo))
            return;

        mostrarPagina(pagina.id);

        const encontrados = destacarTexto(pagina, termo);

        totalResultados += encontrados;

        if (!primeiraOcorrencia) {

            primeiraOcorrencia =
                pagina.querySelector(".highlight");

        }

    });

    if (totalResultados > 0) {

        resultadoPesquisa.textContent =
            `${totalResultados} resultado(s) encontrado(s).`;

        if (primeiraOcorrencia) {

            setTimeout(() => {

                primeiraOcorrencia.scrollIntoView({

                    behavior: "smooth",
                    block: "center"

                });

            }, 250);

        }

    } else {

        resultadoPesquisa.textContent =
            "Nenhum resultado encontrado.";

    }

}

function destacarTexto(elemento, termo) {

    let encontrados = 0;

    const walker = document.createTreeWalker(

        elemento,
        NodeFilter.SHOW_TEXT,
        null,
        false

    );

    const textos = [];

    while (walker.nextNode()) {

        textos.push(walker.currentNode);

    }

    textos.forEach(no => {

        if (!no.nodeValue.trim())
            return;

        const regex = new RegExp(
            termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "gi"
        );

        if (!regex.test(no.nodeValue))
            return;

        encontrados +=
            (no.nodeValue.match(regex) || []).length;

        const span = document.createElement("span");

        span.innerHTML = no.nodeValue.replace(

            regex,

            match => `<mark class="highlight">${match}</mark>`

        );

        no.parentNode.replaceChild(span, no);

    });

    return encontrados;

}

function limparPesquisa() {

    document
        .querySelectorAll(".highlight")
        .forEach(item => {

            const pai = item.parentNode;

            pai.replaceChild(

                document.createTextNode(item.textContent),

                item

            );

            pai.normalize();

        });

}

// =========================
// MENU MOBILE
// =========================

function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("aberta");
    const menuMobile = document.getElementById("menuMobile");
const sidebar = document.querySelector(".sidebar");

}