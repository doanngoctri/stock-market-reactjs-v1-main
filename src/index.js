import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import index from './reducers/index';

ReactDOM.render(
  <Provider store={index.store}>
    <PersistGate loading={null} persistor={index.persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
 ,
  document.getElementById('root')
);