import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import initStore, { history } from './ducks/store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import "./app.css";
import SagasManager from './ducks/helpers/sagasManager';
import { MainPage } from "./components/MainPage";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import NotFound from './components/NotFound';

const store = initStore({});
store.runSaga(SagasManager.getRootSaga());

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={ MainPage }/>
                <Route path="/article/:id" component={ Article }/>
                <Route path="/add" component={ AddArticle }/>
                <Route path="*" component={ NotFound }/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
