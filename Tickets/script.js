const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");

// Abre a janela de arquivos ao clicar na área
dropArea.addEventListener("click", () => fileInput.click());

// Processa arquivos selecionados manualmente
fileInput.addEventListener("change", (event) => {
    handleFiles(event.target.files);
});

// Previne comportamento padrão e destaca a área
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("highlight"); // Adicione uma classe de destaque (opcional)
});

// Remove o destaque ao sair
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("highlight");
});

// Processa arquivos soltos na área
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("highlight");
    
    const files = event.dataTransfer.files;
    if (files.length) {
        console.log("Arquivo solto:", files[0]);
        handleFiles(files);
        
        // Atualiza o input file (opcional, se quiser refletir no formulário)
        fileInput.files = files;
    }
});


function handleFiles(files) {
    const file = files[0];
    if (!file) return;

    console.log("Tipo do arquivo:", file.type); // Depuração
    console.log("Tamanho do arquivo:", file.size); // Depuração

    // Verificar tipo de arquivo
    if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Apenas arquivos JPG ou PNG são permitidos!");
        return;
    }

    // Verificar tamanho do arquivo (máximo 500KB)
    if (file.size > 500 * 1024) {
        alert("O arquivo deve ter no máximo 500KB!");
        return;
    }

    // Esconde o ícone e o texto, e exibe o nome do arquivo
    const dropArea = document.getElementById("drop-area");
    const fileNameDisplay = document.getElementById("file-name");

    dropArea.classList.add("file-uploaded"); // Adiciona a classe para estilização
    fileNameDisplay.textContent = file.name; // Exibe o nome do arquivo
    fileNameDisplay.style.display = "block"; // Mostra o elemento do nome do arquivo

}

// Função para salvar os dados no localStorage
function saveTicketData(fullName, email, githubUsername, avatar) {
    const ticketData = {
        fullName,
        email,
        githubUsername,
        avatar,
    };
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
}

// Função para carregar os dados na página do ticket
function loadTicketData() {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    if (ticketData) {
        // Seleciona todos os elementos com a classe "ticket-fullName" e preenche com o nome
        document.querySelectorAll(".tick-name").forEach(el => {
            el.textContent = ticketData.fullName;
        });

        document.querySelectorAll(".tick-email").forEach(el => {
            el.textContent = ticketData.email;
        });
        document.querySelectorAll(".tick-git").forEach(el => {
            el.textContent = ticketData.githubUsername;
        });

        // Exibe a foto do avatar
        const avatarImg = document.getElementById("ticket-avatar");
        avatarImg.src = ticketData.avatar;
        avatarImg.style.display = "block";
    }
}


// Evento de envio do formulário
document.getElementById("registrationForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const githubUsername = document.getElementById("githubUsername").value;
    const avatarFile = document.getElementById("file-input").files[0];

    if (!fullName || !email || !githubUsername || !avatarFile) {
        alert("Por favor, preencha todos os campos e carregue uma foto.");
        return;
    }

    // Converte a imagem para uma URL de dados
    const reader = new FileReader();
    reader.onload = function (e) {
        const avatarUrl = e.target.result;
        saveTicketData(fullName, email, githubUsername, avatarUrl);
        window.location.href = "tick.html"; // Redireciona para a página do ticket
    };
    reader.readAsDataURL(avatarFile);
});

// Carrega os dados ao abrir a página do ticket
if (window.location.pathname.endsWith("tick.html")) {
    loadTicketData();
    
}