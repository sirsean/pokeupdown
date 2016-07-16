var Actions = require("../actions/Actions.js");

function tick() {
    Actions.loadStatus();
}

var poller;

export function stopPolling() {
    if (poller) {
        clearInterval(poller);
    }
}

export function startPolling() {
    stopPolling();
    poller = setInterval(tick, 2000);
}

