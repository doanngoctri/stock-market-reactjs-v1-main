import Header from 'components/Common/Header';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Logout from '../../components/Logout';
import NotFoundPage from '../../pages/NotFoundPage';
import routerUser from '../../routes/routerUser';

const showContentPages = (routes) => {
    if (routerUser.length > 0) {
        return routes.map((route, index) => {
            return <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
        })
    }
}
function User(props) {
    return (
        <>
            <Header />
            <Switch>
                {showContentPages(routerUser)}
                <Route path="/logout" exact component={Logout}></Route>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </>
    );

}

export default User;

