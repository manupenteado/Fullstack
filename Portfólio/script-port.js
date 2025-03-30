// Espera o carregamento completo da página

document.addEventListener("DOMContentLoaded", function () {
    // Aguarda 2 segundos (2000ms) e remove o loader
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("content").style.display = "block";
 },2000);
});