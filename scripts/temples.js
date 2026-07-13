// ===============================
// Footer Dates
// ===============================

// Display the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Display the document's last modified date
document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// ===============================
// Hamburger Menu
// ===============================

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.textContent =
        navigation.classList.contains("open") ? "✖" : "☰";
});