import {combineReducers} from "redux";
import {statusReducer} from "./StatusReducer";

export const rootReducer = combineReducers({
    status: statusReducer
});
