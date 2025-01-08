let count = 0;

// Load saved count and log from localStorage
function loadData() {
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
        count = parseInt(savedCount, 10);
        document.getElementById('count-el').textContent = count;
    }
}

// Increment the counter
function increment() {
    count++;
    updateCounter();
    logEntry(`Added 1 passenger. Total: ${count}`);
}

// Decrement the counter (prevent negative values)
function decrement() {
    if (count > 0) {
        count--;
        updateCounter();
        logEntry(`Subtracted 1 passenger. Total: ${count}`);
    }
}

// Reset the counter
function reset() {
    count = 0;
    updateCounter();
    logEntry(`Counter reset to 0.`);
}

// Update the counter display
function updateCounter() {
    document.getElementById('count-el').textContent = count;
    saveData();
}

// Add a log entry
function logEntry(message) {
    const timestamp = new Date().toLocaleString();
    const entry = `${timestamp}: ${message}`;
    saveLog(entry);
}

// Save count and log to localStorage
function saveData() {
    localStorage.setItem('count', count);
}

function saveLog(entry) {
    const log = JSON.parse(localStorage.getItem('log')) || [];
    log.push(entry);
    localStorage.setItem('log', JSON.stringify(log));
}

// Add event listeners
document.getElementById('increment-btn').addEventListener('click', increment);
document.getElementById('decrement-btn').addEventListener('click', decrement);
document.getElementById('reset-btn').addEventListener('click', reset);

// Load data when the page loads
window.onload = loadData;