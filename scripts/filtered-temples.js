
/* ==========================================
   Temple Data
========================================== */

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-75244-main.jpg"
    },
    {
        templeName: "Johannesburg South Africa Temple",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22475-main.jpg"
    },
    {
        templeName: "Durban South Africa Temple",
        location: "Durban, South Africa",
        dedicated: "2020, February, 16",
        area: 19860,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-72674-main.jpg"
    }
];


/* ==========================================
   Generate Temple Cards
========================================== */

const templesContainer = document.querySelector("#temples-container");

function displayTemples(templeList) {
    // Clear the existing cards before displaying a new list.
    templesContainer.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("figure");
        card.classList.add("temple-card");

        // Build the image with native lazy loading.
        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        const caption = document.createElement("figcaption");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;


const location = document.createElement("p");
const locationLabel = document.createElement("span");
locationLabel.classList.add("label");
locationLabel.textContent = "Location: ";
location.append(locationLabel, document.createTextNode(temple.location));

const dedicated = document.createElement("p");
const dedicatedLabel = document.createElement("span");
dedicatedLabel.classList.add("label");
dedicatedLabel.textContent = "Dedicated: ";
dedicated.append(dedicatedLabel, document.createTextNode(temple.dedicated));

const area = document.createElement("p");
const areaLabel = document.createElement("span");
areaLabel.classList.add("label");
areaLabel.textContent = "Area: ";
area.append(
    areaLabel,
    document.createTextNode(`${temple.area.toLocaleString()} sq ft`)
);

        caption.append(name, location, dedicated, area);
        card.append(image, caption);
        templesContainer.appendChild(card);
    });
}


/* ==========================================
   Footer Dates
========================================== */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;



/* ==========================================
   Temple Filtering
========================================== */

// Find the navigation links.
const filterLinks = document.querySelectorAll("nav a[data-filter]");

// Display the selected group of temples.
function filterTemples(filter) {
    let filteredTemples = [];

    switch (filter) {
        case "home":
            // Display every temple.
            filteredTemples = temples;
            break;

        case "old":
            // Temples dedicated before 1900.
            filteredTemples = temples.filter((temple) => {
                const dedicationYear = Number(temple.dedicated.split(",")[0]);
                return dedicationYear < 1900;
            });
            break;

        case "new":
            // Temples dedicated after 2000.
            filteredTemples = temples.filter((temple) => {
                const dedicationYear = Number(temple.dedicated.split(",")[0]);
                return dedicationYear > 2000;
            });
            break;

        case "large":
            // Temples larger than 90,000 square feet.
            filteredTemples = temples.filter((temple) => {
                return temple.area > 90000;
            });
            break;

        case "small":
            // Temples smaller than 10,000 square feet.
            filteredTemples = temples.filter((temple) => {
                return temple.area < 10000;
            });
            break;

        default:
            // Fall back to displaying every temple.
            filteredTemples = temples;
    }

    // Update the gallery with the selected temples.
    displayTemples(filteredTemples);
}

// Respond when a navigation filter is clicked.
filterLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedFilter = link.dataset.filter;
        filterTemples(selectedFilter);
    });
});


/* ==========================================
   Hamburger Menu
========================================== */

// Preserve the mobile navigation interaction.
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    menuButton.textContent =
        navigation.classList.contains("open") ? "✖" : "☰";

    menuButton.setAttribute(
        "aria-label",
        navigation.classList.contains("open")
            ? "Close Navigation Menu"
            : "Open Navigation Menu"
    );
});


/* ==========================================
   Initial Display
========================================== */

// Show all temples when the page first loads.
displayTemples(temples);