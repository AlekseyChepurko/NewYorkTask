import React from 'react';
import ReactDOM from 'react-dom';
import initStore, { history } from './ducks/store';
import SagasManager from './ducks/helpers/sagasManager';

const store = initStore({});
store.runSaga(SagasManager.getRootSaga());

ReactDOM.render(
  <div>hello world</div>,
    document.getElementById('root')
);
