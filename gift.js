
const albumPage = document.getElementById("albumPage");
const pageNumber = document.getElementById("pageNumber");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentPage = 0;
let isAnimating = false;

// ===================================
// 12 BOOK PAGES
// ===================================

const pages = [

    // PAGE 1 - FRONT COVER
    {
        type: "cover",
        title: "LOVE STORY",
        subtitle: "OUR BOOK OF MEMORIES",
        decoration: "♥"
    },

    // PAGE 2
    {
        title: "MY LOVE",
        image: "img1.jpg",
        message: "Maraming salamat babie sa lahat"
    },

    // PAGE 3
    {
        title: "MY BABIEE",
        image: "img2.jpg",
        message: "Kahit anong mangyare sayong sayo ako uuwi"
    },

    // PAGE 4
    {
        title: "MY HAPPINESS",
        image: "img3.jpg",
        message: "the most beautiful curve you have is your smila(naka pwet isipin mo)"
    },

    // PAGE 5
    {
        title: "MY ANGRY BIRD",
        image: "img4.jpg",
        message: "sana malaman mo lang na kung gaano ka ka-special sa buhay ko "
    },

    // PAGE 6
    {
        title: "MY SAFE PLACE",
        image: "img5.jpg",
        message: "Maraming salamat sa lahat at sa pag iintindi sakin(kahit minamanyak moko)"
    },

    // PAGE 7
    {
        title: "MY GIRL",
        image: "img6.jpg",
        message: "I pray our relationship would last forever"
    },

    // PAGE 8
    {
        title: "MY BUBWIT",
        image: "img7.jpeg",
        message: "more moments with you and more katarantaduhan"
    },

    // PAGE 9
    {
        title: "MY FUTURE WIFE",
        image: "img8.jpg",
        message: "One day mailalagay ko din sa daliri mo ang pangarap at pangako na tutuparin ko"
    },

    // PAGE 10
    {
        title: "MY FAVOURITE",
        image: "img9.jpg",
        message: "Kahit ano ang mangyare sayong sayo lang etong puso ko at pagmamahal ko"
    },

    // PAGE 11
    {
        title: "MY GANDA",
        image: "img10.jpg",
        message: "maraming salamat babiee, maraming maraming salamat"
    },

    // PAGE 12 - BACK COVER
    {
        type: "back",
        title: "FOREVER YOURS",
        subtitle: "I LOVEYOUUUU BABIE!!!",
        decoration: "♥"
    }

];


// ===================================
// CREATE PAGE CONTENT
// ===================================

function createPage(page, number) {

    if (page.type === "cover" || page.type === "back") {

        return `
            <div class="memory-page book-cover">

                <span class="cover-heart">
                    ${page.decoration}
                </span>

                <h2>${page.title}</h2>

                <p>${page.subtitle}</p>

                <span class="cover-heart">♥</span>

                <span class="number">
                    ${number + 1} / 12
                </span>

            </div>
        `;

    }

    return `
        <div class="memory-page">

            <h3>${page.title}</h3>

            <img
                src="${page.image}"
                alt="${page.title}"
            >

            <p>${page.message}</p>

            <span class="number">
                ${number + 1} / 12
            </span>

        </div>
    `;

}


// ===================================
// UPDATE BUTTONS
// ===================================

function updateControls() {

    pageNumber.textContent =
        `${currentPage + 1} / ${pages.length}`;

    prevButton.disabled =
        currentPage === 0 || isAnimating;

    nextButton.disabled =
        currentPage === pages.length - 1 || isAnimating;

}


// ===================================
// DISPLAY CURRENT PAGE
// ===================================

function showPage() {

    albumPage.innerHTML =
        createPage(pages[currentPage], currentPage);

    updateControls();

}


// ===================================
// PAGE TURN ANIMATION
// ===================================

function turnPage(direction) {

    if (isAnimating) return;

    const nextIndex = currentPage + direction;

    // CHECK PAGE LIMITS
    if (
        nextIndex < 0 ||
        nextIndex >= pages.length
    ) {
        return;
    }

    isAnimating = true;

    updateControls();

    const oldContent =
        createPage(pages[currentPage], currentPage);

    const newContent =
        createPage(pages[nextIndex], nextIndex);

    // CREATE FLIPPING SHEET
    const flippingSheet =
        document.createElement("div");

    flippingSheet.className =
        direction === 1
            ? "flip-page"
            : "flip-page backward";

    // SET CORRECT FRONT AND BACK
    if (direction === 1) {

        // NEXT: OLD PAGE FLIPS AWAY
        flippingSheet.innerHTML = `
            <div class="flip-front">
                ${oldContent}
            </div>

            <div class="flip-back">
                ${newContent}
            </div>
        `;

    } else {

        // PREVIOUS: CURRENT PAGE FLIPS BACK
        flippingSheet.innerHTML = `
            <div class="flip-front">
                ${oldContent}
            </div>

            <div class="flip-back">
                ${newContent}
            </div>
        `;

    }

    // DISPLAY NEW PAGE UNDERNEATH
    albumPage.innerHTML = newContent;

    albumPage.appendChild(flippingSheet);

    // UPDATE PAGE INDEX
    currentPage = nextIndex;

    updateControls();

    // WAIT FOR ANIMATION TO FINISH
    flippingSheet.addEventListener(
        "animationend",
        function() {

            flippingSheet.remove();

            isAnimating = false;

            showPage();

        },
        { once: true }
    );

}


// ===================================
// NEXT BUTTON
// ===================================

nextButton.addEventListener("click", function() {

    turnPage(1);

});


// ===================================
// PREVIOUS BUTTON
// ===================================

prevButton.addEventListener("click", function() {

    turnPage(-1);

});


// ===================================
// INITIALIZE BOOK
// ===================================

showPage();

// EXIT BUTTON
const exitButton = document.getElementById("exitButton");

let exitClicked = false;

exitButton.addEventListener("click", function() {

    if (!exitClicked) {

        exitButton.textContent = "READY TO EXIT?";

        exitClicked = true;

    } else {

        window.location.href = "last.html";

    }

});