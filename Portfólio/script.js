document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    
    const firstName = "Emanuele"; 
    const lastName = "Penteado"; 
    
    setTimeout(function() {
        loadingScreen.classList.add('fade-out'); 
        loadingScreen.addEventListener('transitionend', function() {
        loadingScreen.style.display = 'none';
        content.style.display = 'flex';
        content.classList.add('show');
            
    document.getElementById('first-name').classList.add('active');
    typeWriter(document.getElementById('first-name'), firstName, 250, function() {
        document.getElementById('last-name').classList.add('active');
        typeWriter(document.getElementById('last-name'), lastName, 250);
    });
        });
    }, 1000);


    
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.textContent = ''; 
        
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
        
        function typing() {
            if (i < text.length) {
                element.textContent = text.substring(0, i+1);
                i++;
                setTimeout(typing, speed);
            } else {
                if (callback) callback();
            }
        }
        typing();
    }
});