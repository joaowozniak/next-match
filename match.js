// Retrieve the HTML element with the id "match-info"
const matchInfo = document.getElementById("match-info");

// Fetch the HTML content of the SL Benfica's calendar page
fetch("https://www.slbenfica.pt/pt-pt/futebol/calendario")
    .then(response => response.text())
    .then(html => {
        // Load the HTML content into a Cheerio instance
        const $ = cheerio.load(html);

        // Find all the match elements on the page
        const matchElements = $('.sched-info');

        // Find the first match element with a date that is in the future
        const nextMatchElement = matchElements.toArray().find(element => {
            const dateStr = $(element).find('.sched-date').text();
            const matchDate = new Date(dateStr);
            return matchDate > new Date();
        });

        // If no upcoming matches were found, display a message
        if (!nextMatchElement) {
            matchInfo.textContent = "There are no upcoming matches.";
            return;
        }

        // Retrieve the date, opponent, and location of the next match
        const date = $(nextMatchElement).find('.sched-date').text();
        const opponent = $(nextMatchElement).find('.sched-vs').text();
        const location = $(nextMatchElement).find('.sched-venue').text();

        // Update the HTML content of the "match-info" element with the retrieved match information
        matchInfo.textContent = `The next SL Benfica match is ${date} against ${opponent} at ${location}.`;
    })
    .catch(error => {
        // If an error occurs, update the HTML content of the "match-info" element with an error message
        matchInfo.textContent = "An error occurred while retrieving the match information.";
        console.error(error);
    });
