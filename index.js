/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './src/Main';
import {name as appName} from './app.json';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/storages/store';

const {store, persistor} = storage();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
