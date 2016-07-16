import remoteMiddleware from "../middleware/RemoteMiddleware";

let middlewares = [
    remoteMiddleware
];

export default store => next => action => {
    console.log(action);
    let result = next(action);
    console.log(store.getState());
    middlewares.forEach(function(middleware) {
        middleware(store)(next)(action);
    });
    return result;
}
