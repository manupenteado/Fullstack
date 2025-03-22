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

    alert(`✅ Arquivo "${file.name}" carregado com sucesso!`);
}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const githubUsername = document.getElementById("githubUsername").value;
    const fileInput = document.getElementById("file-input");

    if (!fullName || !email || !githubUsername) {
        alert("Please fill out all fields!");
        return;
    }

    if (fileInput.files.length === 0) {
        alert("Please upload an avatar!");
        return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("githubUsername", githubUsername);
    formData.append("avatar", fileInput.files[0]);

    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }    
    // Aqui você pode enviar os dados para o servidor
    // Exemplo usando fetch:
    fetch("https://seuservidor.com/api/register", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert("✅ Registration successful!");
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Registration failed. Please try again.");
    });
});