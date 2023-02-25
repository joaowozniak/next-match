// Retrieve the HTML element with the id "match-info"
const matchInfo = document.getElementById("match-info");

// Fetch the HTML content of the SL Benfica's calendar page
fetch("https://www.slbenfica.pt/pt-pt/futebol/calendario", {
    headers: {
        "Content-Type": "application/json",
        'user-agent': 'accept'
    }
})
    .then(response => response.text())
    .then(html => {
        // Load the HTML content into a Cheerio instance
        const $ = cheerio.load(html);

        // Find the first match element with a date that is in the future
        const nextMatchElement = $('.sched-info').toArray().find(element => {
            const dateStr = $(element).find('.sched-date').text();
            const matchDate = new Date(dateStr);
            return matchDate > new Date();
        });

        // If no upcoming matches were found, display a message
        if (!nextMatchElement) {
            matchInfo.textContent = "There are no upcoming matches.";
            return;
        }

        // Retrieve the home team, away team, and fixture hour of the next match
        const homeTeam = $(nextMatchElement).find('.home-team').text().trim();
        const awayTeam = $(nextMatchElement).find('.away-team').text().trim();
        const fixtureHour = $(nextMatchElement).find('.match-time').text().trim();

        // Update the HTML content of the "match-info" element with the retrieved match information
        matchInfo.textContent = `The next SL Benfica match is ${homeTeam} vs ${awayTeam} at ${fixtureHour}.`;
    })
    .catch(error => {
        // If an error occurs, update the HTML content of the "match-info" element with an error message
        matchInfo.textContent = "An error occurred while retrieving the match information.";
        console.error(error);
    });
