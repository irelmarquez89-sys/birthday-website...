/* ===== SETTINGS ===== */
const CORRECT_ANSWER = "Pancake";                 // the right answer
const WRONG_MESSAGE = "WRONG, ARE YOU MY BABIEE?"; // shown on top of the dog image
const NEXT_PAGE = "birthday1.html";//                   // page to go to after a correct answer (change to your page)
const SUCCESS_IMAGE = "ganda.jpg";              // image shown when the answer is right (swap in your own file)
const REDIRECT_DELAY = 3200;                      // milliseconds the image stays before moving to the next page

/* ===== ELEMENTS ===== */
const box = document.querySelector(".food-box");
const result = document.getElementById("result");
const errorMsg = document.getElementById("errorMsg");
const dog = document.querySelector(".dog");
const radios = document.querySelectorAll('input[name="food"]');

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== HELPERS ===== */
function showSuccessImage() {
    const overlay = document.createElement("div");
    overlay.className = "success-overlay";

    const img = document.createElement("img");
    img.className = "success-image";
    img.src = SUCCESS_IMAGE;
    img.alt = "Correct answer";

    const caption = document.createElement("p");
    caption.className = "success-caption";
    caption.textContent = "CORRECT MY BABIEE! WAIT LOADING LANG🎉";

    overlay.appendChild(img);
    overlay.appendChild(caption);
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
        overlay.classList.add("visible");
    });
}

function clearStates() {
    radios.forEach(function (r) { r.classList.remove("wrong", "correct"); });
    result.textContent = "";
    result.classList.remove("success");
}

function showError() {
    errorMsg.textContent = WRONG_MESSAGE;
    // remove and re-add "show" so the pop animation replays on every wrong answer
    errorMsg.classList.remove("show");
    void errorMsg.offsetWidth;
    errorMsg.classList.add("show");
}

function hideError() {
    errorMsg.classList.remove("show");
    errorMsg.textContent = "";
}

// Web Animations API: shakes without clashing with the box's entrance animation
function shake(element, distance) {
    if (reduceMotion) return;
    element.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(-" + distance + "px)" },
            { transform: "translateX(" + distance + "px)" },
            { transform: "translateX(-" + distance + "px)" },
            { transform: "translateX(" + distance + "px)" },
            { transform: "translateX(0)" }
        ],
        { duration: 500, easing: "ease-in-out" }
    );
}

/* ===== MAIN LOGIC ===== */
radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
        clearStates();

        if (radio.value === CORRECT_ANSWER) {
            // RIGHT: celebrate, lock the choices, show the image, then go to the next page
            radio.classList.add("correct");
            hideError();
            result.textContent = "CORRECT MY BABIEE! WAIT LOADING LANG🎉";
            result.classList.add("success");

            radios.forEach(function (r) { r.disabled = true; });

            showSuccessImage();

            setTimeout(function () {
                window.location.href = NEXT_PAGE;
            }, REDIRECT_DELAY);
        } else {
            // WRONG: red error state, shake, and message above the dog
            radio.classList.add("wrong");
            showError();
            shake(box, 12);
            shake(dog, 8);
        }
    });
});


const questionColors = [
    "#ffffff",
    "#ffb7b7",
    "#fc8484",
    "#ffb6b6"
];

function createQuestionMark() {
    const mark = document.createElement("div");

    mark.className = "question-mark";
    mark.textContent = "?";

    mark.style.left = Math.random() * 100 + "vw";
    mark.style.color =
        questionColors[
            Math.floor(Math.random() * questionColors.length)
        ];

    mark.style.fontSize = (20 + Math.random() * 25) + "px";
    mark.style.animationDuration = (5 + Math.random() * 7) + "s";
    mark.style.animationDelay = Math.random() * 2 + "s";

    document.body.appendChild(mark);

    // Remove after falling to keep the page lightweight
    setTimeout(() => {
        mark.remove();
    }, 15000);
}

// Create falling question marks continuously
setInterval(createQuestionMark, 350);
