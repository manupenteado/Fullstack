const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    console.log("Arquivo carregado:", files[0]); // Verifique no console do navegador
    handleFiles(files);
});

dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.background = "rgba(255, 255, 255, 0.2)";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "rgba(255, 255, 255, 0.1)";
});

dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.background = "rgba(255, 255, 255, 0.1)";
    handleFiles(event.dataTransfer.files);
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
        // Preenche as informações do ticket
        document.getElementById("ticket-fullName").textContent = ticketData.fullName;
        document.getElementById("ticket-email").textContent = ticketData.email;
        document.getElementById("ticket-githubUsername").textContent = ticketData.githubUsername;

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