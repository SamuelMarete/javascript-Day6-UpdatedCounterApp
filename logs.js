// Load log entries from localStorage
function loadLogEntries() {
    const logEntries = JSON.parse(localStorage.getItem('log')) || [];
    const logList = document.getElementById('log-entries');
    const totalElement = document.getElementById('total');

    // Clear existing log entries
    logList.innerHTML = '';

    // Calculate the current total
    let total = 0;
    logEntries.forEach(entry => {
        const message = entry.split(': ')[1];
        if (message.includes('Added')) {
            total++;
        } else if (message.includes('Subtracted')) {
            total--;
        }
    });

    // Display the current total
    totalElement.textContent = `Current Total: ${total}`;

    // Classify log entries per day
    const logEntriesPerDay = {};
    logEntries.forEach(entry => {
        const date = entry.split(' ')[0];
        if (!logEntriesPerDay[date]) {
            logEntriesPerDay[date] = [];
        }
        logEntriesPerDay[date].push(entry);
    });

    // Display log entries per day
    Object.keys(logEntriesPerDay).forEach(date => {
        const logEntriesForDate = logEntriesPerDay[date];
        const logEntryElement = document.createElement('div');
        logEntryElement.innerHTML = `
            <h3>${date}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Event</th>
                        <th>Passengers</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        `;
        logList.appendChild(logEntryElement);
        const logEntryTableBody = logEntryElement.querySelector('tbody');
        let cumulativeTotal = 0;
        logEntriesForDate.forEach(entry => {
            const logEntryTime = entry.split(' ')[1];
            const logEntryEvent = entry.split(': ')[1];
            let logEntryPassengers = 0;
            if (logEntryEvent.includes('Added')) {
                logEntryPassengers = 1;
                cumulativeTotal++;
            } else if (logEntryEvent.includes('Subtracted')) {
                logEntryPassengers = -1;
                cumulativeTotal--;
            }
            const logEntryTableRow = document.createElement('tr');
            logEntryTableRow.innerHTML = `
                <td>${logEntryTime}</td>
                <td>${logEntryEvent}</td>
                <td>${logEntryPassengers}</td>
                <td>${cumulativeTotal}</td>
            `;
            logEntryTableBody.appendChild(logEntryTableRow);
        });
    });
}

// Load log entries when the page loads
window.onload = loadLogEntries;