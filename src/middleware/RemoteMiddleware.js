var StatusApi = require("../api/StatusApi.js");
import {startPolling} from "../poller/Poller";

export default store => next => action => {
    if (action.type == "INITIAL_LOAD") {
        StatusApi.get();
    } else if (action.type == "LOAD_STATUS") {
        StatusApi.get();
    }
}
