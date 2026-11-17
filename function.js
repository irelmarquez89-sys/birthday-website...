
const nameInput = document.getElementById("username");
const errorMessage = document.getElementById("error-message");
const hintMessage = document.getElementById("hint-message");
const nameForm = document.getElementById("name-form");

nameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim().toLowerCase();

    if (name === "erma") {
        // Redirect if the name is correct
        window.location.href = "verification.html";
    } else {
        // Show error and hint together
        errorMessage.classList.add("show");
        hintMessage.classList.add("show");

        // Add red input border and shake animation
        nameInput.classList.remove("error");

        // Restart the shake animation
        void nameInput.offsetWidth;
        nameInput.classList.add("error");
    }
});

// Hide the error and hint when the user starts typing
nameInput.addEventListener("input", function () {
    errorMessage.classList.remove("show");
    hintMessage.classList.remove("show");
    nameInput.classList.remove("error");
});