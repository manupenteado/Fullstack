//js will find these elements to manipulate by this id
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");




//when the event of cliking on the drop area happens, its like clicking to open the file window
dropArea.addEventListener("click", () => fileInput.click());




//when the event of change in file inputs happens (a new one or a replacement), it calls for the function that handles the files
//manual selection
fileInput.addEventListener("change", (event) => {handleFiles(event.target.files);});




//it stops from opening the file (default)
dropArea.addEventListener("dragover", (event) => {event.preventDefault();});



dropArea.addEventListener("drop", (event) => {

    //it stops from opening the file (default)
    event.preventDefault();
    
    //gets the files that were trasfered
    const files = event.dataTransfer.files;

    //if some file exists...
    //only happens if you "drop" the file
    if (files.length > 0) {
        handleFiles(files);
        //synchronizing what "droped" with the fileInput
        fileInput.files = files;
    }
});





function handleFiles(files) {

    //gets the first file
    const file = files[0];

    //if there's none, it leaves the function
    if (!file) return;

    //limiting the type of file
    if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPG or PNG files are allowed!");
        return;
    }
    //limiting the size of the file
    if (file.size > 500 * 1024) {
        alert("File too large.");
        return;
    }

    //identifys the name od the file by this id
    const fileNameDisplay = document.getElementById("file-name");
    //identifys where to put the preview of the photo by this id
    const imagePreview = document.getElementById("image-preview"); 

    //class on css once a file is added
    dropArea.classList.add("file-uploaded");

    // Cria a preview da imagem
    const reader = new FileReader();
    reader.onload = function(e) {
        // cleans last content
        imagePreview.innerHTML = "";

        // creates the image and defines it
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "200px";
        img.style.borderRadius = "10px"; 

        // add the image to the container
        imagePreview.appendChild(img);

        //shows the image
        imagePreview.style.display = "block";
    };
    
   reader.readAsDataURL(file);

    //gets the file's name
    fileNameDisplay.textContent = file.name;
    //shows the file's name
    fileNameDisplay.style.display = "block"; 

}//end of handle




//it saves the data of the ticket
function saveTicketData(fullName, email, githubUsername, avatar) {
    //definining the object
    const ticketData = {
        fullName,
        email,
        githubUsername,
        avatar,
    };

    //the object (ticketData) is "changed" into string by JSON so the localstorage can process it
    //then it saves the data as a string, when the navegator is closed, the memory is deleted
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
}




//gets the information of the ticket
function loadTicketData() {

    //it changes back from string to object by the 
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));

    //checks if ticketData exists 
    if (ticketData) {

        //it searches for all the elements that the class is ".tick-..." and shows its content
        document.querySelectorAll(".tick-name").forEach(el => {
            el.textContent = ticketData.fullName;
        });

        document.querySelectorAll(".tick-email").forEach(el => {
            el.textContent = ticketData.email;
        });
        document.querySelectorAll(".tick-git").forEach(el => {
            el.textContent = ticketData.githubUsername;
        });

        //defines the id of the image
        const avatarImg = document.getElementById("ticket-avatar");
        //gets the src of the image
        avatarImg.src = ticketData.avatar;
        //shows the image
        avatarImg.style.display = "block";
    }
}





//gets the information of the form using the id once the event "submit" (pressing the button) happens
document.getElementById("registrationForm").addEventListener("submit", (event) => {

    //it stops from realoading the page once the form is submited 
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const githubUsername = document.getElementById("githubUsername").value;
    const avatarFile = document.getElementById("file-input").files[0];

    //if the user dont fill it all:
    if (!fullName || !email || !githubUsername || !avatarFile) {
        alert("Please, make sure you fill in all the fields and upload a photo.");
        return;
    }

    //object that will read the data
    const reader = new FileReader();

    //callback function that will be executed once the file read is ended
    reader.onload = function (e) {

        //cont to put the image in
        const avatarUrl = e.target.result;

        //calls the savetickectdata to save the informtion
        saveTicketData(fullName, email, githubUsername, avatarUrl);

        //redirects to this page if everything was filled out correctly
        window.location.href = "tick.html"; 
    };

    //read and convert avatarFile to URL
    reader.readAsDataURL(avatarFile);
});




//if the page i'm in ends with tick.html, it loads the data
if (window.location.pathname.endsWith("tick.html")) {
    loadTicketData();
}