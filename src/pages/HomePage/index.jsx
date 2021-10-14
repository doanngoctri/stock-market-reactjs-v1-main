import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useDispatch , useSelector} from 'react-redux';
import * as Action from '../../actions/User/index';
import LightningTable from '../../components/HomePage/LightningTable';
function HomePage(props) {

    const role = JSON.parse(localStorage.getItem("role"));

    //const history = useHistory();
    // const StockList = useSelector(state => state.StockList)
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(Action.fectchListAll());
    // });
    const user = useSelector(state => state.User);
    const token = JSON.parse(localStorage.getItem("user"));
    if (user === null && token !== null) {
        dispatch(Action.GetUserFromLocal(token));
    }
    const [, setTick] = useState(0);
    useEffect(() => {
        setTick(tick => tick + 1);
    }, [user]);
    return (
        <>
            <LightningTable />
        </>
    );

}

export default HomePage;

