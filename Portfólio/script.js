document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    
    // Nomes para o efeito de digitação
    const firstName = "Emanuele"; // Seu primeiro nome
    const lastName = "Penteado"; // Seu último nome
    
    setTimeout(function() {
        loadingScreen.classList.add('fade-out'); 
        loadingScreen.addEventListener('transitionend', function() {
        loadingScreen.style.display = 'none';
        content.style.display = 'flex';
        content.classList.add('show');
            
    // Dentro do eventListener transitionend:
    // Dentro do eventListener 'transitionend':
    document.getElementById('first-name').classList.add('active');
    typeWriter(document.getElementById('first-name'), firstName, 250, function() {
        // Começa o last-name APÓS o first-name terminar
        document.getElementById('last-name').classList.add('active');
        typeWriter(document.getElementById('last-name'), lastName, 250);
    });
        });
    }, 1000);


    
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = ''; // Limpa completamente o conteúdo
        
        // Primeiro garantimos que não há conteúdo
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
        
        function typing() {
            if (i < text.length) {
                // Adiciona letra por letra usando textContent
                element.textContent = text.substring(0, i+1);
                i++;
                setTimeout(typing, speed);
            } else {
                element.classList.remove('typewriter-cursor');
                if (callback) callback();
            }
        }
        typing();

    }
});