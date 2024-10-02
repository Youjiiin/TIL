let clockInterval;
const clockElement = document.getElementById('clock');
const toggleButton = document.getElementById('toggleButton');

// 시계
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

toggleButton.addEventListener('click', function () {
    if (toggleButton.textContent === 'Show') {
        clockElement.style.display = 'block';
        toggleButton.textContent = 'Hide';
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
    } else {
        clockElement.style.display = 'none';
        toggleButton.textContent = 'Show';
        clearInterval(clockInterval);
    }
});
