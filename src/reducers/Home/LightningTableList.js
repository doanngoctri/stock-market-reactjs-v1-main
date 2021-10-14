import * as types from '../../constants/LightningTable/ActionType';
const initialState = [];

let LightningTableList = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_STOCKS:
            state = action.stocks;
            return [...state];
        case types.LIST_CHANGE_STOCKS:
            let element = action.stocks;
            let index = findIndex(state, element);
            state[index] = element;
            return [...state]
        default: return state;
    }

}

let findIndex = (stocks, element) => {
    let result = -1;
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].macp === element.macp) { result = i; break; }
    }
    return result;
}
export default LightningTableList;