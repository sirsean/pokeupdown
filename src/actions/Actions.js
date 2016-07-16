import {store} from "../stores/Store";

module.exports = {
    initialLoad: function() {
        store.dispatch({
            type: "INITIAL_LOAD"
        });
    },
    loadStatus: function() {
        store.dispatch({
            type: "LOAD_STATUS"
        });
    },
    loadingStatus: function() {
        store.dispatch({
            type: "LOADING_STATUS"
        });
    },
    gotStatus: function(status) {
        store.dispatch({
            type: "GOT_STATUS",
            status: status
        });
    }
};
