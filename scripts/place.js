// ===============================
// Footer Dates
// ===============================

// Display the current year.
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Display the document's last modified date.
document.getElementById("lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// ===============================
// Weather Data
// ===============================

// Static weather values required by the assignment.
const temperature = 5;
const windSpeed = 10;

// Display the weather values.
document.getElementById("temperature").textContent = temperature;
document.getElementById("wind-speed").textContent = windSpeed;


// ===============================
// Wind Chill Calculation
// ===============================

// Calculate wind chill using the metric formula.
function calculateWindChill(temperature, windSpeed) {
    return 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
}


// ===============================
// Display Wind Chill
// ===============================

const windChillElement = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = `${windChill.toFixed(1)} °C`;
} else {
    windChillElement.textContent = "N/A";
}