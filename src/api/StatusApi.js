import * as request from "superagent";
var Actions = require("../actions/Actions.js");

module.exports = {
    get: () => {
        Actions.loadingStatus();
        request.get("/api/status")
            .end((err, response) => {
                if (response.ok) {
                    Actions.gotStatus(response.body);
                } else {
                    Actions.gotStatus(null);
                }
            });
    }
};
