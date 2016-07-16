
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
    return Object.assign({}, state, {
        loading: false,
        status: action.status
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
