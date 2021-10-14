import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import isAdmin from './Common/isAdmin';
import LightningTableList from './Home/LightningTableList';
import LightningTableState from './Home/LightningTableState';
import RegisterForm from './Admin/RegisterForm';
import ManagementUser from './Admin/ManagementUser';
import ManagementStock from './Admin/ManagementStock';
import Token from './Common/Token';
import User from './User/User';
import Report from './User/Report';
import Status from './Common/Status';
import BankAccount from './User/BankAccount';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const myReducer = combineReducers({
    LightningTableList,
    LightningTableState,
    User,
    RegisterForm,
    Token,
    isAdmin,
    Report,
    BankAccount,
    Status,
    ManagementUser,
    ManagementStock
});


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['isAdmin', 'Token', 'User']
}

const persistedReducer = persistReducer(persistConfig, myReducer)

let store = createStore(persistedReducer,
    composeEnhancers(applyMiddleware(thunk)))
let persistor = persistStore(store)
export default {
    store, persistor
}