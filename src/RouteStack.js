import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Layout from './components/common/layout';
import Login from './components/login';
import Loader, { StaticLoader } from './components/common/loader';
import Error from './components/common/error';
import Warning from './components/common/warning';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';

import routes from './routes.json';

class RouteStack extends React.Component {
    render() {
        return (
            <Router>
                <React.Suspense fallback={StaticLoader}>
                    <Switch>
                        <Route exact path="/login" component={Login}></Route>
                        {
                            this.props.credentials.TokenKey &&
                            routes.routes.map(x => {
                                return <Route key={x.name} exact={x.exact} path={x.path} component={Layout} />
                            })
                        }
                        <Redirect to={this.props.credentials.TokenKey? '/dashboard' : '/login' } />
                    </Switch>
                </React.Suspense>
                <Loader />
                <Error />
                <Warning />
                <ToastContainer />
            </Router>
        )
    }
}

const mapStateToProps = state => {
    let { credentials } = state;
    return { credentials }
};

export default connect(mapStateToProps)(RouteStack);