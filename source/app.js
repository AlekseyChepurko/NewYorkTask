import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import initStore, { history } from './ducks/store';
import { Router, Route, Switch } from 'react-router-dom';
import "./app.css";
import SagasManager from './ducks/helpers/sagasManager';
import { MainPage } from "./components/MainPage";
import Article from "./components/Article";
import NotFound from './components/NotFound';

const store = initStore({});
store.runSaga(SagasManager.getRootSaga());

ReactDOM.render(
    <Provider store={ store }>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={ MainPage }/>
                <Route path="/article/:id" component={ Article }/>
                <Route path="*" component={ NotFound }/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
