import * as types from '../../constants/LightningTable/ActionType';
import callApi from '../../utils/apiCaller';


export const FetchListStocksRequest = () => {
    return (dispatch) => {
        return callApi('banggiatructuyen', 'GET', null).then(res => {
            dispatch(FetchListStocks(res.data));
        })
    }
}


export const FetchListStocks = (stocks) => {
    return {
        type: types.FETCH_STOCKS,
        stocks
    }
}

// FETCH CHANGE STOCKS
export const FetchChangeListStocks = (stocks) => {
    return {
        type: types.LIST_CHANGE_STOCKS,
        stocks
    }
}

// FETCH GET 1 STOCK

const GetStock = stock => {
    return {
        type: types.ORDER_STOCKS,
        stock
    }
}