
function initialLoad(state={}, action) {
    return Object.assign({}, state, {
        loading: false,
        status: null
    });
}

function loadingStatus(state={}, action) {
    return Object.assign({}, state, {
        loading: true
    });
}

function gotStatus(state={}, action) {
    let status = null;
    if (action.status != null) {
        status = {
            durations: action.status.durations,
            lastChecked: new Date(action.status.last_checked)
        };
    }
    return Object.assign({}, state, {
        loading: false,
        status: status
    });
}

let funcs = {
    "INITIAL_LOAD": initialLoad,
    "LOADING_STATUS": loadingStatus,
    "GOT_STATUS": gotStatus
};

export function statusReducer(state={}, action) {
    let f = funcs[action.type];
    if (f) {
        return f(state, action);
    } else {
        return state;
    }
}
