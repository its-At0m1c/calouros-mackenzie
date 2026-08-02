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
   PESQUISA V3
========================= */

const barraPesquisa = document.getElementById("barraPesquisa");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");

let resultadosPesquisa = [];
let indiceResultadoAtual = 0;

const nomesPaginas = {
    inicio: "🏠 Início",
    faq: "❓ Dúvidas Frequentes",
    sistemas: "💻 Sistemas",
    materiais: "📦 Materiais",
    dicas: "💡 Dicas da Anita",
    representantes: "👥 Representantes",
    primeirasemana: "📅 Primeira Semana",
    contatos: "📞 Contatos",
    outras: "💬 Outras Dúvidas",
    favoritos: "⭐ Favoritos"
};

if(barraPesquisa){

    barraPesquisa.addEventListener("input", pesquisarV3);

}
/* =========================
   MOTOR DA PESQUISA V3
========================= */

function pesquisarV3(){

    const termo = barraPesquisa.value
        .toLowerCase()
        .trim();


    resultadoPesquisa.innerHTML = "";


    if(termo.length < 2){

        resultadosPesquisa = [];
        return;

    }


    resultadosPesquisa = [];


    const paginas = document.querySelectorAll(".pagina");


    paginas.forEach(pagina => {


        const textoPagina = pagina.innerText.toLowerCase();


        if(textoPagina.includes(termo)){


            const inicio = textoPagina.indexOf(termo);


            let trecho = pagina.innerText.substring(
                Math.max(0, inicio - 60),
                inicio + 120
            );


            resultadosPesquisa.push({

                id: pagina.id,

                nome:
                nomesPaginas[pagina.id]
                || pagina.id,


                trecho: trecho + "..."

            });


        }


    });


    mostrarResultadosV3();

}
function mostrarResultadosV3(){

    resultadoPesquisa.innerHTML = "";


    if(resultadosPesquisa.length === 0){

        resultadoPesquisa.innerHTML =
        `
        <div class="semResultado">
            Nenhum resultado encontrado 😢
        </div>
        `;

        return;

    }



    resultadosPesquisa.forEach((resultado, index)=>{


        const item = document.createElement("div");

        item.className = "itemPesquisa";


        item.innerHTML =
        `
        <strong>${resultado.nome}</strong>

        <p>${resultado.trecho}</p>
        `;


        item.onclick = ()=>{

            abrirResultadoPesquisa(resultado);

        };


        resultadoPesquisa.appendChild(item);


    });


}
/* =========================
   ABRIR RESULTADO PESQUISA V3
========================= */

function abrirResultadoPesquisa(resultado){

    const pagina = document.getElementById(resultado.id);


    if(!pagina)
        return;


    // abre a página encontrada
    mostrarPagina(resultado.id);



    // fecha a caixa de resultados
    resultadoPesquisa.innerHTML = "";



    // limpa destaques antigos
    limparDestaquesV3();



    // destaca o termo pesquisado
    destacarTextoV3(
        pagina,
        barraPesquisa.value.trim()
    );



    // leva até a página

    setTimeout(()=>{


        pagina.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });


    },200);



}
/* =========================
   LIMPAR DESTAQUES V3
========================= */

function limparDestaquesV3(){

    document
    .querySelectorAll(".highlightPesquisa")
    .forEach(item=>{


        const pai = item.parentNode;


        pai.replaceChild(

            document.createTextNode(
                item.textContent
            ),

            item

        );


        pai.normalize();


    });

}
/* =========================
   DESTACAR TEXTO V3
========================= */

function destacarTextoV3(elemento, termo){


    if(!termo)
        return;



    const regex = new RegExp(

        termo.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        ),

        "gi"

    );



    const textos = [];


    const walker =
    document.createTreeWalker(

        elemento,

        NodeFilter.SHOW_TEXT,

        null,

        false

    );



    while(walker.nextNode()){

        textos.push(
            walker.currentNode
        );

    }



    textos.forEach(no=>{


        if(!regex.test(no.nodeValue))
            return;



        const span =
        document.createElement("span");



        span.innerHTML =
        no.nodeValue.replace(

            regex,

            match =>
            `<mark class="highlightPesquisa">${match}</mark>`

        );



        no.parentNode.replaceChild(
            span,
            no
        );


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
// MENU MOBILE
// =========================

function toggleMenu() {
    document.querySelector(".sidebar").classList.toggle("aberta");
    const menuMobile = document.getElementById("menuMobile");
const sidebar = document.querySelector(".sidebar");

}