import { getProductsReducer} from "./Productsreducer"

import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata : getProductsReducer
});

export default rootreducers;