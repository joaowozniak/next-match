const API_TOKEN = "a04035d2da9542648a0f7cefe80f0e17";
const TEAM_ID = 64; // The ID for Sport Lisboa e Benfica in the football-data.org API

// Function to retrieve the next match for the given team ID
async function getNextMatch(teamId) {
    const apiUrl = `https://api.football-data.org/v2/teams/${teamId}/matches?status=SCHEDULED`;

    const response = await fetch(apiUrl, {
        headers: {
            "X-Auth-Token": API_TOKEN
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.matches.length === 0) {
        return "No upcoming matches found";
    }

    const nextMatch = data.matches[0];
    const matchDate = new Date(nextMatch.utcDate);
    const matchDateString = matchDate.toLocaleDateString();
    const matchTimeString = matchDate.toLocaleTimeString();

    return `Next match: ${nextMatch.homeTeam.name} vs ${nextMatch.awayTeam.name} on ${matchDateString} at ${matchTimeString}`;
}

// Function to update the HTML with the next match information
async function updateMatchInfo() {
    const matchInfoEl = document.getElementById("match-info");

    try {
        const matchInfo = await getNextMatch(TEAM_ID);
        matchInfoEl.textContent = matchInfo;
    } catch (error) {
        matchInfoEl.textContent = "Error retrieving match information";
        console.error(error);
    }
}

// Call the updateMatchInfo function when the page is loaded
window.addEventListener("load", updateMatchInfo);
